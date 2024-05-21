import { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import LiveSearch from "../utils/LiveSearch";
import Modal from "../utils/Modal";
import { CloseIcon, MaximizeIcon, MinimizeIcon } from "../utils/Icons";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Message = ({ setDisplay, id }) => {
  const [entity, setEntity] = useState({});

  const [minimize, setMinimize] = useState(false);
  const [subject, setSubject] = useState("");
  const [inputText, setInputText] = useState("");
  const history = useHistory();
  const [serverErrors, setServerErrors] = useState([]);
  const [buttonState, setButtonState] = useState();
  const [loggedInUsr, setLoggedInUsr] = useState({});
  const [usrLevel, setUsrLevel] = useState(0);
  const [secItems, setSecItems] = useState([]);
  const [secItem, setSecItem] = useState();
  const [loading, setLoading] = useState(true);
  const [secList, setSecList] = useState([]);

  useEffect(() => {
    let usr = JSON.parse(sessionStorage.getItem("usr"));
    setLoggedInUsr(usr);
    setUsrLevel(usr?.designation?.designationLevel);

    setSecItems(
      usr.sectionList.map(({ id, sectionName }) => ({
        id: id,
        label: sectionName,
      }))
    );
  }, []);

  useEffect(() => {
    let fetching = false;
    async function fetchData() {
      let record = "";
      if (!fetching && id !== "new") {
        await axios
          .get(`/message/${id}`)
          .then((response) => {
            record = response.data;
            setEntity(record);
            setSubject(record.subject);
          })
          .catch((error) => {
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
        const fields = ["id", "cdaoNo", "subject", "reference", "message"];
        fields.forEach((field) => setValue(field, record[field]));
        setSecItem(record.section?.id);
      }
    }
    fetchData();
    return () => {
      fetching = true;
    };
  }, [inputText]);

  const parentData = {
    employee: {
      title: "Select Officer",
      url: "employees",
      searchList: ["cdaoNo", "officerName"],
      fkEntity: "employee",
      preload: false,
    },
  };

  const schema = yup.object({
    employee: id == "new" && yup.object().required("Select Officer"),
    subject: yup.string().required("Subject must be filled in"),
    reference: yup.string().required("Reference Number must be filled in"),
    message: yup.string().required("Message must be filled in."),
  });

  const errorCallback = (error) => {
    console.log(error);
  };

  const callback = (childData) => {
    setEntity((prev) => ({ ...prev, [childData.fk]: childData.entity }));
    setValue(childData.fk, childData.entity);
    setValue("cdaoNo", childData.entity.cdaoNo);
    setValue("checkDigit", childData.entity.checkDigit);
    clearErrors(childData.fk);
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const messageBoxStyling = {
    padding: "0",
    position: "absolute",
    bottom: "48px",
    right: "50px",
    borderRadius: "25px 25px 0 0",
    boxShadow: "2px 2px 30px 5px rgba(20,20,20,0.3)",
    backgroundColor: "white",
    transition: "450ms ",
  };
  const minimizeStyling = {
    transform: "translate(0,520px)",
    transition: "all 400ms",
  };

  const borderStyling = {
    border: "none",
    borderBottom: "2px solid  rgba(200,200,200,1)",
    borderRadius: "0",
    resize: "none",
    fontSize: "18px",
  };
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const onSubmit = (data, event) => {
    event.preventDefault();
    if (id !== "new") {
      if (buttonState === "submitMessage") {
        axios
          .put(`/message/submit`, data)
          .then(() => {
            window.location.reload();
          })
          .catch((error) => {
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
      } else if (buttonState === "approveMessage") {
        axios
          .put(`/message/approve`, data)
          .then(() => {
            window.location.reload();
          })
          .catch((error) => {
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
      } else if (buttonState === "discardMessage") {
        axios
          .put(`/message/discard/${id}`)
          .then(() => {
            window.location.reload();
          })
          .catch((error) => {
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
      }
    } else {
      axios
        .post(`/message/${secItem}`, data)
        .then(() => {
          window.location.reload();
          console.log("message post");
        })
        .catch((error) => {
          if (error.response) setServerErrors(error.response.data.error);
          else setServerErrors(error.Error);
        });
    }
  };
  const onError = (errors, e) => console.log(errors, e);
  const handleSectionChange = (e) => {
    console.log(e.target.selectedIndex + "--" + e.target.value);
    setSecItem(e.target.value);
  };

  return (
    <div className="fixed bottom-0 right-0 w-full" style={{}}>
      <div
        className={`${!minimize ? "w-2/5" : "w-1/5"}`}
        style={{
          ...messageBoxStyling,
          ...(minimize ? minimizeStyling : ""),
          height: Object.keys(errors).length == 0 ? "565px" : "660px",
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="bg-white pb-4"
          style={{
            borderRadius: "25px 25px 0 0",
            borderBottom: "none",
            boxShadow: "none",
          }}
        >
          <div
            className={`h-12 flex items-center justify-between ${
              minimize ? "bg-gray-900" : "bg-gray-500"
            }`}
            style={{ borderRadius: "25px 25px 0 0" }}
          >
            <div className={`text-white text-xl ${minimize ? "" : "ml-6"}`}>
              {minimize
                ? subject.length > 20
                  ? subject.slice(0, 20) + "..."
                  : subject
                : subject.length > 30
                ? subject.slice(0, 30) + "..."
                : subject}
            </div>
            <div className="flex items-center ">
              {!minimize && (
                <div
                  className=""
                  onClick={() => (!minimize ? setMinimize(true) : "")}
                >
                  <MinimizeIcon className="text-white cursor-pointer" />
                </div>
              )}
              {minimize && (
                <div
                  onClick={() => (minimize ? setMinimize(false) : "")}
                  className="-mx-2 py-3  cursor-pointer"
                >
                  <MaximizeIcon className="text-white  h-5 w-5" />
                </div>
              )}
              <div
                className="mx-1 py-2 cursor-pointer"
                onClick={() => setDisplay(false)}
              >
                <CloseIcon className="h-6 w-6 " />
              </div>
            </div>
          </div>

          <div className="px-8 pr-8 pb-3">
            <div className="w-full pt-20">
              <div
                className="z-10"
                style={{ position: "relative", top: "-68px" }}
              >
                <div className="-ml-4" style={{ position: "absolute" }}>
                  <LiveSearch
                    name="employee"
                    onChange={handleInputChange}
                    parentData={parentData.employee}
                    parentCallback={callback}
                    fkEntity={entity.employee}
                    errCallback={errorCallback}
                    className=""
                    readOnly={
                      entity.approved == true || id != "new" ? true : false
                    }
                  />
                </div>
              </div>
              <div className="text-red-500 -mt-4 -ml-2">
                {errors.employee?.message}
              </div>
            </div>
            <div className="my-1">
              <label className="inline mr-2">Section</label>

              <select
                className="m-0 p-0"
                disabled={id != "new" ? true : false}
                value={secItem}
                onChange={handleSectionChange}
              >
                <option key="0" value={""}>
                  --select section--
                </option>
                {secItems.map(({ id, label }) => (
                  <option key={id} value={id}>
                    {" "}
                    {label}{" "}
                  </option>
                ))}
              </select>
            </div>
            <div className="" style={{ position: "relative" }}>
              <textarea
                placeholder="Subject"
                className={`w-full  px-1 h-8  focus:outline-none ${
                  entity.approved ? "bg-gray-100" : ""
                }`}
                style={borderStyling}
                {...register("subject")}
                onChange={(e) => setSubject(e.target.value)}
                readOnly={entity.approved}
              />
            </div>
            <div className="text-red-500 ">{errors.subject?.message}</div>
            <div className="" style={{ position: "relative" }}>
              <textarea
                placeholder="Reference"
                className={`w-full  px-1 h-8  focus:outline-none ${
                  entity.approved ? "bg-gray-100" : ""
                }`}
                style={borderStyling}
                {...register("reference")}
                readOnly={entity.approved}
              />
            </div>
            <div className="text-red-500 ">{errors.reference?.message}</div>
            <div>
              <textarea
                className={`p-1 h-72 w-full  focus:outline-none ${
                  entity.approved ? "bg-gray-100" : ""
                }`}
                placeholder="Start Typing Message...."
                style={borderStyling}
                {...register("message")}
                readOnly={entity.approved}
              />
            </div>
            <div className="text-red-500 ">{errors.message?.message}</div>
            {!entity.approved && (
              <div className="flex justify-between mb-16">
                {usrLevel < 40 ? (
                  <div className="">
                    <button
                      className="w-24 p-1 "
                      type="submit"
                      onClick={() => setButtonState("submitMessage")}
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  ""
                )}
                {usrLevel == 40 ? (
                  <div className="">
                    <button
                      className="w-24 p-1 "
                      type="submit"
                      onClick={() => setButtonState("approveMessage")}
                    >
                      Approve
                    </button>
                  </div>
                ) : (
                  ""
                )}
                {usrLevel >= 30 && id != "new" ? (
                  <div className="">
                    <button
                      className="w-24 p-1  bg-red-500 hover:bg-red-700"
                      type="submit"
                      onClick={() => setButtonState("discardMessage")}
                    >
                      Discard
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default withRouter(Message);
