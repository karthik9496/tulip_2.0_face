import { useState, useEffect, useMemo } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";

const LetterEdit = () => {
  let { id } = useParams();
  let history = useHistory();

  const [data, setData] = useState({});
  const [serverErrors, setServerErrors] = useState([]);
  const [buttonState, setButtonState] = useState();
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [unitCode, setUnitCode] = useState({});
  const [letterDisposed, setLetterDisposed] = useState(false);

  const schema = yup.object({});

  const quillModuleToolBar = {
    toolbar: [
      // [{ header: [1, 2, 3, 4, 5, 6] }],
      // [{ align: [] }],
      ["bold", "italic", "underline"],
      [
        { list: "ordered" },
        { list: "bullet" },
        //{ indent: "-1" },
        //{ indent: "+1" },
      ],
      // ["link", "image"],
      // ["clean"],
    ],
  };

  const quillFormats = ["bold", "italic", "list", "underline"];

  useEffect(() => {
    // console.log("hehwurihwuehruighuih");
    if (id !== "new") {
      async function fetchData() {
        await axios
          .get("/letters/" + id)
          .then((response) => {
            let record = response.data;
            if (!record.unit?.susNo) {
              record = {
                ...record,
                unit: { unitCode: "", susNo: "", unitName: "" },
              };
            }
            if (record.approved == true) {
              setLetterDisposed(true);
            }
            setData(record);
            console.log("letter detail", response.data);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
      }
      fetchData();
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    if (unitCode.length > 5 && unitCode.length < 7) {
      axios
        .get(`/units/unitCode/${unitCode.toUpperCase()}`)
        .then((response) => {
          console.log(response.data);
          if (response.data.susNo) {
            // setData({...data,unit:{...data.unit,...response.data}})
            setData({ ...data, unit: response.data });
          } else {
            setData({ ...data, unit: { unitCode: "" } });
          }
        });
    } else {
      setData({
        ...data,
        unit: {
          ...data.unit,
          unitCode: unitCode,
          susNo: "",
          unitName: "",
        },
      });
    }
  }, [unitCode]);

  useEffect(() => {
    if (buttonState === "submitLetter") {
      console.log("data", data);
      axios
        .put(`/letters/submitLetter/${id}`, data)
        .then(() => {
          history.push("/letter");
        })
        .catch((error) => {
          setServerErrors(error.response.data);
        });
    } else if (buttonState === "approveLetter") {
      console.log("approve data", data);
      axios
        .put(`/letters/approve/${id}`, data)
        .then(() => {
          history.push("/letter");
        })
        .catch((error) => {
          setServerErrors(error.response.data);
        });
    }
    return () => {
      setButtonState("");
    };
  }, [buttonState]);

  return (
    <div className="">
      {data?.dak?.dakidNo && (
        <div className="flex items-center p-3 flex-col">
          <h1 className="text-black font-bold text-4xl underline pb-3 font-mono">
            {!data?.approved ? "Edit" : "Disposed"} Letter
          </h1>
          <div
            className={`${
              !data?.approved ? " w-7/12" : "w-11/12"
            }  rounded-3xl p-3 bg-white`}
            style={{
              boxShadow:
                "rgba(17, 17, 26, 0.3) 0px 8px 54px 10px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
            }}
          >
            <div
              className="bg-white pb-4  "
              style={{
                borderRadius: "25px 25px 0 0",
                borderBottom: "none",
                boxShadow: "none",
              }}
            >
              <div className="flex justify-between my-2  pb-2 flex-wrap">
                <div className="text-xl font-bold">
                  <div>
                    Dak Id:
                    <span className="bg-gray-200 rounded-lg px-2">
                      {data?.dak?.dakidNo}
                    </span>{" "}
                  </div>
                </div>

                <div className="text-xl font-bold">
                  <div>
                    {data?.employee?.rank?.rankName}{" "}
                    {data?.employee?.officerName}{" "}
                  </div>
                  <div className="flex justify-center rounded-lg bg-gray-200 px-2">
                    {data?.section?.sectionName} {"/"} {data?.employee?.task}{" "}
                    {"/"} {data?.employee?.cdaoNo}
                    {data?.employee?.checkDigit}
                  </div>
                </div>
                <div className="text-xl font-bold">
                  <div>
                    Letter date:{" "}
                    <span className=" bg-gray-200 rounded-lg px-2">
                      {data?.letterDate}
                    </span>
                  </div>
                </div>
                {data?.approved && (
                  <div className="text-xl font-bold">
                    <div>Disposal date:</div>
                    <div className=" bg-gray-200 rounded-lg px-2">
                      {data?.disposalDate}
                    </div>
                  </div>
                )}
              </div>
              <div className="px-8">
                <div className="p-0 flex flex-wrap justify-between">
                  <div>
                    <div className="text-xl font-bold -ml-2">Unit Code</div>
                    <input
                      className="px-3 py-1 border-black text-black w-40"
                      name="reference"
                      value={data?.unit?.unitCode}
                      onChange={(e) => {
                        setUnitCode(e.target.value);
                      }}
                      readOnly={letterDisposed}
                    />
                  </div>
                  {data?.unit?.susNo && (
                    <>
                      <div>
                        <div className="text-xl font-bold -ml-2">SUS No</div>
                        <input
                          className="px-3 py-1 border-black text-black w-40"
                          name="susNo"
                          value={data?.unit?.susNo}
                          readOnly
                        />
                      </div>
                      <div>
                        <div className="text-xl font-bold -ml-2">Unit Name</div>
                        <input
                          className="px-3 py-1 border-black text-black w-40"
                          name="unitName"
                          value={data?.unit?.unitName}
                          readOnly
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="flex flex-wrap p-0 justify-between">
                  <div>
                    <div className="text-xl font-bold -ml-2">Reference No:</div>
                    <input
                      className="px-3 py-1 border-black text-black"
                      name="reference"
                      value={data?.reference}
                      onChange={(e) => handleInputChange(e)}
                      readOnly={letterDisposed}
                    />
                  </div>
                  <div>
                    <div className="text-xl font-bold -ml-2">
                      Upload to website
                    </div>
                    <input
                      type="checkbox"
                      name="uploadToWebsite"
                      checked={data?.uploadToWebsite}
                      onChange={(e) => {
                        !letterDisposed &&
                          setData({
                            ...data,
                            uploadToWebsite: e.target.checked,
                          });
                      }}
                      // disabled={letterDisposed}
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-xl font-bold -ml-2">Subject</div>
                  <input
                    className="px-3 py-1 border-black text-black w-full"
                    name="subject"
                    value={data?.subject}
                    onChange={(e) => handleInputChange(e)}
                    readOnly={letterDisposed}
                  />
                </div>
                <div className="mt-2">
                  <div className="text-xl font-bold -ml-2">Reply/Remarks</div>
                  <ReactQuill
                    className={`form-control pt-0 px-0 pb-10 h-96 ${
                      data?.approved ? "bg-gray-200" : "bg-white"
                    }`}
                    theme="snow"
                    readOnly={data?.approved || disabled}
                    modules={quillModuleToolBar}
                    formats={quillFormats}
                    value={data.remarks}
                    onChange={(remarks) => {
                      setData({ ...data, remarks: remarks });
                    }}
                  />
                </div>
                {!data?.approved ? (
                  <div className="flex justify-center text-lg">
                    {data?.action === "edit" ? (
                      <button
                        className="w-32 rounded-full h-10 "
                        type="submit"
                        name="submitLetter"
                        onClick={() => setButtonState("submitLetter")}
                      >
                        Submit
                      </button>
                    ) : (
                      ""
                    )}
                    {data.action === "approve" ? (
                      <button
                        type="submit"
                        className=" rounded-full h-10 w-32 "
                        name="approveLetter"
                        onClick={() => setButtonState("approveLetter")}
                      >
                        Approve
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withRouter(LetterEdit);
