import { useState, useEffect, useMemo } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import LiveSearch from "../utils/LiveSearch";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Modal from "../utils/Modal";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import GrievanceTransferLog from "./GrievanceTransferLog";
import Table from "../utils/Table";

const GrievanceEdit = () => {
  let { id } = useParams();
  let history = useHistory();

  const [serverErrors, setServerErrors] = useState([]);
  const [entity, setEntity] = useState({});
  const [mesg, setMesg] = useState("");
  const [buttonState, setButtonState] = useState();
  const [reallocatedSectionGroup, setReallocatedSectionGroup] = useState("");
  const [loading, setLoading] = useState(true);
  const [showTransferMenu, setShowTransferMenu] = useState(false);
  const [quillRemarks, setQuillRemarks] = useState("");
  const [newGrievance, setNewGrievance] = useState(false);
  const [uploadFile, setUploadFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [quillBrief, setQuillBrief] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [disabled, setDisabled] = useState(false);

  const [ssUser, setSSUser] = useState(false);
  const [usrLevel, setUsrLevel] = useState(0);
  const [allowGrievanceTransfer, setAllowGrievanceTransfer] = useState(true);
  const [previousGrievanceData, setPreviousGrievanceData] = useState([]);

  const [relatedGrievanceData, setRelatedGrievanceData] = useState([]);
  const [sectionGroupList, setSectionGroupList] = useState([
    "Accounts",
    "AFL",
    "D-Section",
    "EDP",
    "FSR",
    "Hindi-Cell",
    "LIC",
    "LWSSAUDIT",
    "NR CELL",
    "PENSION CELL",
    "PSC",
    "RENT CELL",
    "R-Section",
    "LWING",
    "TWING",
    "TWARRANT",
    "Tech",
    "TAPC",
    "IT CELL",
    "FPC",
    "RTI",
    "T-COURSE",
  ]);

  const schema = yup.object({
    employee: yup.object().required("Select Officer"),
    emailId:
      newGrievance &&
      yup.string().email().required("Email Id must be filled in"),
    sectionGroup:
      newGrievance && yup.string().required("Section Must be selected"),
    subject: newGrievance && yup.string().required("Please fill in subject"),
    grievanceBrief: yup.string().required("Required"),
    remarks:
      !newGrievance &&
      yup.string().nullable().required("Remarks must be filled in."),
  });

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

  const quillModuleNoToolBar = {
    toolbar: [
      // [{ header: [1, 2, 3, 4, 5, 6] }],
      // [{ align: [] }],
      // ["link", "image"],
      // ["clean"],
    ],
  };

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
  const quillModuleNoBar = {
    toolbar: false,
  };
  const quillFormats = ["bold", "italic", "list", "underline"];

  useEffect(() => {
    if (id !== "new" && !showTransferMenu) window.scrollTo(0, 0);
    if (id !== "new" && showTransferMenu) window.scrollTo(0, 500);
  }, [showTransferMenu]);

  useEffect(() => {
    if (id === "new") setNewGrievance(true);
  }, []);

  useEffect(() => {
    let isCancelled = false;
    if (id !== "new") {
      async function fetchData() {
        let record = "";
        await axios
          .get("/grievances/" + id)
          .then((response) => {
            record = response.data;
            console.log("record", record);
            setEntity(record);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });

        const fields = [
          "id",
          "grievanceSource",
          "monthEnding",
          "unit",
          "section",
          "employee",
          "cdaoNo",
          "checkDigit",
          "webId",
          "emailId",
          "grievanceDate",
          "subject",
          "referenceNo",
          "grievanceBrief",
          "disposalNo",
          "disposalDate",
          "disposalRemarks",
          "remarks",
          "auditorDate",
          "aaoRemarks",
          "aaoDate",
          "aoRemarks",
          "aoDate",
          "recordStatus",
          "approved",
          "action",
          "responseText",
          "sendMessage",
        ];

        fields.forEach((field) => setValue(field, record[field]));
        if (record["sendMessage"] !== true) setValue("sendMessage", false);
        if (!isCancelled) {
          setEntity(record);
        }

        setQuillRemarks(record["remarks"]);

        let lastTransferDate = new Date(record["grievanceDate"]);
        lastTransferDate.setDate(lastTransferDate.getDate() + 350);
        setAllowGrievanceTransfer(lastTransferDate > new Date());
      }

      fetchData();
      return () => {
        isCancelled = true;
      };
    }
  }, []);

  useEffect(() => {
    function isSSUser() {
      let usr = JSON.parse(sessionStorage.getItem("usr"));
      setUsrLevel(usr?.designation.designationLevel);
      if (usr?.usrName === "SysAdmin") {
        setSSUser(true);
      } else {
        usr?.sectionList?.forEach((section) => {
          if (
            section.sectionName === "LWSSAUDIT" ||
            section.sectionName === "TSS"
          ) {
            setSSUser(true);
          }
        });
      }
    }
    isSSUser();
  }, []);

  useEffect(() => {
    let fetching = false;
    async function fetchData() {
      if (!fetching)
        await axios
          .get(
            `/grievances/previousRecord?search=${entity.cdaoNo}&webId=${entity.webId}`
          )
          .then((response) => {
            console.log("processed", response.data);
            setPreviousGrievanceData(response.data);
            if (response.data != null) {
              //	console.log(">>>>>Search CdaoNo---:" + response.data.cdaoNo);
              // setData(response.data);
            }
          })
          .catch((error) => {
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
    }
    if (entity?.cdaoNo) fetchData();

    return () => {
      fetching = true;
    };
  }, [entity.cdaoNo, entity.webId]);

  useEffect(() => {
    let fetching = false;
    async function fetchData() {
      if (!fetching)
        await axios
          .get(
            `/grievances/relatedRecords?webId=${entity.webId}&id=${entity.id}`
          )
          .then((response) => {
            console.log("processed", response.data);
            setRelatedGrievanceData(response.data);
            if (response.data != null) {
              //	console.log(">>>>>Search CdaoNo---:" + response.data.cdaoNo);
              // setData(response.data);
            }
          })
          .catch((error) => {
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
    }
    if (entity?.cdaoNo && entity.responseFlag != null) fetchData();

    return () => {
      fetching = true;
    };
  }, [entity.webId, entity.id]);

  const handleFileChange = (e) => {
    e.preventDefault();
    setSelectedFile(e.target.files[0]);
  };

  function redirectTo(url) {
    history.push(url);
  }

  const onSubmit = (data, event) => {
    console.log(data);
    event.preventDefault();
    if (buttonState === "submitGrievance") {
      axios
        .put(`/grievances/submitGrievance/${id}`, data)
        .then(() => {
          history.push("/grievances");
        })
        .catch((error) => {
          setMesg(error.response.data);
        });
    } else if (buttonState === "approveGrievance") {
      axios
        .put(`/grievances/approve/${id}`, data)
        .then(() => {
          history.push("/grievances");
        })
        .catch((error) => {
          setMesg(error.response.data);
        });
    } else if (buttonState === "transferGrievance") {
      axios
        .put(`/grievances/transfer/${reallocatedSectionGroup}`, data)
        .then((response) => {
          if (response.status === 200) {
            setResponseText(response.data);
            setOpenModal(true);
          } else {
            setResponseText("Some Error Occurred. Please Contact EDP.");
            setOpenModal(true);
          }
          //history.push("/grievances");
        })
        .catch((error) => {
          setMesg(error.response.data);
        });
    } else if (buttonState === "addGrievance" && !disabled) {
      setDisabled(true);
      const formData = new FormData();
      if (selectedFile && data.attachmentFlag)
        formData.append("file", selectedFile);
      formData.append(
        "entity",
        new Blob([JSON.stringify(data)], {
          type: "application/json",
        })
      );

      axios
        .post("/grievances/addGrievance", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setResponseText(response.data);
            setOpenModal(true);
            /* reset();
            setReallocatedSectionGroup("");
            setQuillBrief(""); */
          } else {
            setResponseText("Some Error Occurred. Please Contact EDP.");
            setOpenModal(true);
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    } else if (buttonState === "rollbackGrievance") {
      axios
        .put(`/grievances/rollback/${data.id}`, data)
        .then((response) => {
          setDisabled(true);
          setResponseText(response.data);
          window.scrollTo(0, 0);
        })
        .catch((error) => {
          setMesg(error.response.data);
        });
    } else if (buttonState === "saveGrievance") {
      axios
        .put(`/grievances/save`, data)
        .then((response) => {
          //setDisabled(true);
          history.push("/grievances");
        })
        .catch((error) => {
          setResponseText("Some Error Occurred. Please Contact EDP.");
          setMesg(error.response.data);
        });
    }
  };

  const parentData = {
    employee: {
      title: "CDA A/c No",
      url: "employees",
      searchList: ["cdaoNo", "officerName"],
      fkEntity: "employee",
      preload: false,
    },
  };

  const callback = (childData) => {
    setEntity((prev) => ({ ...prev, [childData.fk]: childData.entity }));
    setValue(childData.fk, childData.entity);
    clearErrors(childData.fk);
  };

  const errorCallback = (err) => {
    setServerErrors(err);
  };

  const onError = (errors, e) => console.log(errors, e);

  const ShowPreviousGrievances = () => {
    const columns = useMemo(
      () => [
        {
          Header: "Action",
          Cell: ({ row }) => (
            <div>
              {row.original.approved != null &&
              row.original.approved === true ? (
                <button
                  onClick={() => {
                    window.open(
                      `/grievances/${row.original.id}`,
                      "_blank",
                      "width=1000, height=900, left=500, top=80"
                    );
                  }}
                  className=" w-20 m-1 p-0 bg-red-500"
                >
                  View
                </button>
              ) : (
                ""
              )}
            </div>
          ),
        },
        {
          Header: "Section",
          accessor: "section.sectionName",
        },

        {
          Header: "Dak Id",
          accessor: "webId",
        },
        /* {
          Header: "Section",
          accessor: "section.sectionName",
        },
        {
          Header: "Task",
          accessor: "taskNo",
        }, */
        {
          Header: "Cdao No",
          accessor: "cdaoNo",
          Cell: ({ row }) => (
            <div>
              <label>
                {row.original.cdaoNo}
                {row.original.checkDigit}
              </label>
            </div>
          ),
        },

        {
          Header: "Name",
          accessor: "employee.officerName",
          Cell: ({ row }) => (
            <div>
              <label>
                {row.original.employee.rank.rankName}{" "}
                {row.original.employee.officerName}
              </label>
            </div>
          ),
        },
        {
          Header: "Grievance Date",
          accessor: "grievanceDate",
        },
        {
          Header: "Pendency Status",
          accessor: "pendencyStatus",
        },
        {
          Header: "Disposal Date",
          accessor: "disposalDate",
          Cell: ({ row }) => (
            <div>
              <p className="text-green-800"> {row.original.disposalDate}</p>
            </div>
          ),
        },
        {
          Header: "Attachment",
          accessor: "attachmentFlag",
          Cell: ({ row }) => (
            <div>
              {row.original.attachmentFlag === true ? (
                <p className="text-green-500">Y</p>
              ) : (
                <p className="text-red-500">N</p>
              )}
            </div>
          ),
        },
        {
          Header: "Subject",
          accessor: "subject",

          Cell: ({ row }) => (
            <div>
              <label className="break-normal whitespace-normal w-96 text-sm ">
                {row.original.subject}
              </label>
            </div>
          ),
        },
      ],
      [previousGrievanceData]
    );

    return (
      <div className="m-2 max-h-full p-0 ">
        <div className="h-120  text-gray-700">
          <p className="font-semibold text-xl">Previous Grievances</p>
          <hr className="h-2" />
        </div>
        <Table
          columns={columns}
          data={previousGrievanceData}
          //tableHeading="Previous Grievances"
          className="table-auto"
        />
      </div>
    );
  };

  const ShowRelatedGrievances = () => {
    const columns = useMemo(
      () => [
        {
          Header: "Action",
          Cell: ({ row }) => (
            <div>
              <button
                onClick={() => {
                  window.open(
                    `/grievances/${row.original.id}`,
                    "_blank",
                    "width=1000, height=900, left=500, top=80"
                  );
                }}
                className=" w-20 m-1 p-0 bg-red-500"
              >
                View
              </button>
            </div>
          ),
        },

        {
          Header: "Dak Id",
          accessor: "webId",
        },
        /* {
          Header: "Section",
          accessor: "section.sectionName",
        },
        {
          Header: "Task",
          accessor: "taskNo",
        }, */
        {
          Header: "Cdao No",
          accessor: "cdaoNo",
          Cell: ({ row }) => (
            <div>
              <label>
                {row.original.cdaoNo}
                {row.original.checkDigit}
              </label>
            </div>
          ),
        },

        {
          Header: "Name",
          accessor: "employee.officerName",
          Cell: ({ row }) => (
            <div>
              <label>
                {row.original.employee.rank.rankName}{" "}
                {row.original.employee.officerName}
              </label>
            </div>
          ),
        },
        {
          Header: "Grievance Date",
          accessor: "grievanceDate",
        },
        {
          Header: "Disposal Date",
          accessor: "disposalDate",
        },
        {
          Header: "Attachment",
          accessor: "attachmentFlag",
          Cell: ({ row }) => (
            <div>
              {row.original.attachmentFlag === true ? (
                <p className="text-green-500">Y</p>
              ) : (
                <p className="text-red-500">N</p>
              )}
            </div>
          ),
        },
        {
          Header: "Subject",
          accessor: "subject",

          Cell: ({ row }) => (
            <div>
              <label className="break-normal whitespace-normal w-96 text-sm ">
                {row.original.subject}
              </label>
            </div>
          ),
        },
      ],
      [relatedGrievanceData]
    );

    return (
      <div className="m-2 max-h-full p-0 ">
        <div className="h-120  text-gray-700">
          <p className="font-semibold text-xl">Related Grievances</p>
          <hr className="h-2" />
        </div>
        <Table
          columns={columns}
          data={relatedGrievanceData}
          //tableHeading="Previous Grievances"
          className="table-auto"
        />
      </div>
    );
  };

  return (
    <div
      className={`mx-auto pb-32 ${
        !newGrievance
          ? entity?.approved
            ? " w-11/12 rounded-2xl"
            : "w-11/12"
          : "w-7/12"
      }`}
    >
      <div
        className={`mt-2 pb-4  ${
          !newGrievance ? " bg-white shadow-2xl rounded-2xl" : ""
        }`}
      >
        <div className="w-full mx-auto">
          {!newGrievance || ssUser ? (
            <form
              style={openModal ? { pointerEvents: "none", opacity: "0.2" } : {}}
              onSubmit={handleSubmit(onSubmit, onError)}
              className={`pb-4 shadow-none rounded-2xl ${
                !newGrievance ? "bg-white" : "bg-gray-50"
              }`}
            >
              {!entity.approved === true ? (
                <p className="text-center text-4xl  underline font-medium">
                  {id === "new" ? "Add" : "Edit"} Grievance
                </p>
              ) : (
                <p className="text-center text-4xl  underline">
                  View Grievance
                </p>
              )}
              <div className="text-red-500 text-2xl mb-2 font-bold">
                {responseText}
              </div>

              <div id="GrievanceEdit" className="mb-1">
                {!newGrievance ? (
                  <div className="">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-xl  font-bold">
                          Dak Id:{" "}
                          <span className="text-blue-700">{entity?.webId}</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-xl font-bold">
                          {entity.employee?.rank.rankName}{" "}
                          {entity.employee?.officerName}
                          {" - "}
                          {entity.section?.sectionName}
                          {" / "}
                          {entity.employee?.task}
                          {" / "}
                          {entity.employee?.cdaoNo +
                            entity.employee?.checkDigit}
                        </p>
                      </div>
                      <div>
                        <p className="mb-2 text-xl  font-bold">
                          Section Name:-{" "}
                          <span className="text-red-500">
                            {entity.section?.sectionName}
                          </span>
                        </p>
                      </div>
                      {entity.responseFlag === "E" && (
                        <div>
                          <p className="bg-red-500 text-white text-xl font-bold px-3 rounded-full animate-bounce">
                            Escalated
                          </p>
                        </div>
                      )}
                      {entity.responseFlag === "R" && (
                        <div>
                          <p className="bg-red-500 text-white text-xl font-bold px-3 rounded-full animate-bounce">
                            Reply
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex grid-cols-3 gap-0 ">
                      {/* <div>
                        <label>Web Id</label>
                        <input
                          type="text"
                          name="webId"
                          className="form-control py-0 w-36 mr-14"
                          {...register("webId")}
                          readOnly
                        />
                        <div className="text-red-500">
                          {errors.webId?.message}
                        </div>
                      </div> */}
                      {/* <div>
                        <label>Grievance Source</label>

                        <select
                          name="grievanceSource"
                          {...register("grievanceSource")}
                          className="form-control py-0  w-36 bg-gray-200"
                        >
                          <option value="W">Web Portal</option>
                        </select>

                        <div className="text-red-500">
                          {errors.grievanceSource?.message}
                        </div>
                      </div> */}
                      <div>
                        <label>Grievance Date</label>
                        <input
                          type="date"
                          name="grievanceDate"
                          {...register("grievanceDate")}
                          readOnly={!newGrievance}
                          className="form-control py-0 w-40 bg-gray-200 mr-14"
                        />
                      </div>
                      {entity?.approved ? (
                        <div>
                          <label>Disposal Date</label>
                          <input
                            type="date"
                            name="disposalDate"
                            {...register("disposalDate")}
                            readOnly={!newGrievance}
                            className="form-control py-0 w-40 bg-gray-200 mr-14"
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex">
                      <div className="w-80">
                        <LiveSearch
                          name="employee"
                          parentData={parentData.employee}
                          parentCallback={callback}
                          fkEntity={entity.employee}
                          errCallback={errorCallback}
                          readOnly={disabled}
                        />
                        <div className="text-red-500 ">
                          {errors.employee?.message}
                        </div>
                      </div>

                      <div className="">
                        <label className="">Select Section Group</label>
                        <div>
                          <select
                            className="w-36 -m-2 p-0 bg-white"
                            disabled={disabled}
                            value={reallocatedSectionGroup}
                            onChange={(e) => {
                              setValue("sectionGroup", e.target.value);
                              setReallocatedSectionGroup(e.target.value);
                            }}
                          >
                            <option key="0" value={""}>
                              --Section--
                            </option>
                            {sectionGroupList.map((item, index) => (
                              <option key={index} value={item.toString()}>
                                {" "}
                                {item.toString()}{" "}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="text-red-500 ">
                          {errors.sectionGroup?.message}
                        </div>
                      </div>
                      <div className="" style={{ flexBasis: "40%" }}>
                        <label>Email Id</label>
                        <input
                          autoComplete="off"
                          wrap="hard"
                          type="text"
                          name="emailId"
                          placeholder="email id"
                          readOnly={disabled}
                          {...register("emailId")}
                          className="form-control py-0"
                          style={{
                            wordWrap: "break-word",
                            wordBreak: "break-all",
                          }}
                        />
                        <div className="text-red-500 ">
                          {errors.emailId?.message}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <div className="mt-3">
                    <div className={`${!newGrievance ? "w-9/12" : ""}`}>
                      <label>Reference No</label>
                      <input
                        autoComplete="off"
                        type="text"
                        name="referenceNo"
                        {...register("referenceNo")}
                        className="form-control py-1 "
                        readOnly={!newGrievance || disabled}
                      />
                      <div className="text-red-500">
                        {errors.referenceNo?.message}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className={`mt-3 flex`}>
                    <div
                      style={
                        !newGrievance
                          ? { flexBasis: "75%" }
                          : { flexBasis: "60%", marginRight: "" }
                      }
                    >
                      <label>Subject</label>
                      <textarea
                        readOnly={!newGrievance || disabled}
                        type="text"
                        name="subject"
                        {...register("subject")}
                        className="form-control py-1 resize-none"
                      />
                      <div className="text-red-500">
                        {errors.subject?.message}
                      </div>
                    </div>
                    {entity?.attachmentFlag ? (
                      <div
                        className="flex flex-col"
                        style={{ alignSelf: "flex-end" }}
                      >
                        <button
                          className="w-48 "
                          name="view"
                          type="button"
                          onClick={() => {
                            window.open(
                              `${process.env.REACT_APP_BASE_URL}/files/openpdf/grievance-${entity.webId}.pdf?path=uploads/grievances`,
                              "_blank",
                              "width=1300, height=900, left=800, top=80"
                            );
                          }}
                        >
                          View Attachment
                        </button>
                        <button
                          className="w-48 "
                          name="download"
                          type="button"
                          onClick={() => {
                            window.open(
                              `${process.env.REACT_APP_BASE_URL}/files/grievance-${entity.webId}.pdf?path=uploads/grievances`
                            );
                          }}
                        >
                          Download Attachment
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                    {newGrievance ? (
                      <div className="mt-2" style={{ flexBasis: "40%" }}>
                        <label className="flex mb-2">
                          <input
                            className="w-5 h-5 mr-2"
                            type="checkbox"
                            disabled={disabled}
                            onChange={(e) => {
                              setValue("attachmentFlag", e.target.checked);
                              setUploadFile(!uploadFile);
                            }}
                          />
                          <span>Upload Attachment File</span>
                        </label>
                        {uploadFile && (
                          <input
                            type="file"
                            className="bg-white p-1 w-full "
                            name="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                          />
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {!newGrievance &&
                entity?.grievanceSource != "E" &&
                (entity.responseFlag == "R" || entity.responseFlag == "E") &&
                entity.responseText ? (
                  <div className="mx-3 ">
                    <label className="text-red-400 italic">
                      **Officer Response
                    </label>
                    <ReactQuill
                      className={`form-control pt-0 px-0   ${
                        !newGrievance ? "bg-red-100" : "bg-white"
                      }`}
                      theme="snow"
                      readOnly={!newGrievance || disabled}
                      modules={quillModuleNoBar}
                      value={!newGrievance ? entity.responseText : ""}
                    />

                    <div className="text-red-500 ">
                      {errors.responseText?.message}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="mt-4">
                  <div
                    className={`grid gap-0  ${
                      !newGrievance ? "grid-cols-2" : "grid-cols-1"
                    }`}
                  >
                    {/* <div className="col-span-1 ...">
                  <label>Grievance Brief</label>
                  <textarea
                    readOnly
                    type="text"
                    name="grievanceBrief"
                    {...register("grievanceBrief")}
                    className="form-control p-3 h-72"
                  />
                  <div className="text-red-500">
                    {errors.grievanceBrief?.message}
                  </div>
                </div> */}
                    {/* <div>
                  <label className="text-xl text-gray-600">
                    Dak Id: <span className="text-blue-800"
                    dangerouslySetInnerHTML={{__html: entity.grievanceBrief}}></span>
                  </label>
                </div> */}

                    {/* <div>
                  <label>Remarks</label>
                  <textarea
                    type="text"
                    name="remarks"
                    {...register("remarks")}
                    readOnly={entity.approved}
                    className="form-control p-3 h-72"
                  />
                  <div className="text-red-500">{errors.remarks?.message}</div>
                </div> */}
                    {!newGrievance && entity?.grievanceSource != "E" ? (
                      <div>
                        <label>Grievance Brief</label>
                        <ReactQuill
                          className={`form-control pt-0 px-0 pb-10 h-96 ${
                            !newGrievance ? "bg-gray-100" : "bg-white"
                          }`}
                          theme="snow"
                          readOnly={!newGrievance || disabled}
                          modules={
                            id === "new"
                              ? quillModuleToolBar
                              : quillModuleNoToolBar
                          }
                          value={
                            !newGrievance ? entity.grievanceBrief : quillBrief
                          }
                          onChange={(grievanceBrief) => {
                            setQuillBrief(grievanceBrief);
                            setValue("grievanceBrief", grievanceBrief);
                          }}
                        />
                        {/* <JoditEditor
                    ref={editor}
                    value={quillRemarks}
                    config={reactJoditConfig}
                    //tabIndex={1} // tabIndex of textarea
                    //onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={(remarks) => {
                      setQuillRemarks(remarks);
                      setValue("remarks", remarks);
                    }} 
                  />*/}
                        <div className="text-red-500 ">
                          {errors.grievanceBrief?.message}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label className="mb-1">Grievance Brief</label>
                        <textarea
                          //tyle={{ minHeight: "100%" }}
                          type="text"
                          name="grievanceBrief"
                          {...register("grievanceBrief")}
                          readOnly={!newGrievance}
                          className="form-control p-3 h-96"
                        />
                      </div>
                    )}
                    {!newGrievance ? (
                      <div>
                        <label className="">Remarks</label>
                        {entity?.grievanceSource !== "E" ? (
                          <ReactQuill
                            className={`form-control pt-0 px-0 pb-10 h-96 ${
                              entity?.approved ? "bg-gray-200" : "bg-white"
                            }`}
                            theme="snow"
                            readOnly={entity?.approved || disabled}
                            modules={quillModuleToolBar}
                            formats={quillFormats}
                            value={quillRemarks}
                            onChange={(remarks) => {
                              setQuillRemarks(remarks);
                              setValue("remarks", remarks);
                            }}
                          />
                        ) : (
                          <textarea
                            //tyle={{ minHeight: "100%" }}
                            type="text"
                            name="remarks"
                            {...register("remarks")}
                            readOnly={entity.approved}
                            className="form-control p-3 h-96"
                          />
                        )}
                        {/* <textarea type="text" {...register("remarks")} /> */}
                        {/* <JoditEditor
                    ref={editor}
                    value={quillRemarks}
                    config={reactJoditConfig}
                    //tabIndex={1} // tabIndex of textarea
                    //onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={(remarks) => {
                      setQuillRemarks(remarks);
                      setValue("remarks", remarks);
                    }} 
                  />*/}
                        <div className="text-red-500 ">
                          {errors.remarks?.message}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              {/* <div className="grid grid-cols-2">
                <div></div>
                <div className="flex">
                  <input
                    type="checkbox"
                    className=" mt-2 w-8 h-8 border-transparent focus:border-transparent focus:ring-0"
                    {...register("sendMessage")}
                    style={{ accentColor: "red" }}
                  />

                  <label className="mt-3 mx-2 text-red-500">
                    Click to send Notification regarding the Grievance **
                  </label>
                </div>{" "}
              </div> */}

              {!entity?.approved && !loading && (
                <div className="flex mt-2">
                  {!entity?.approved &&
                  entity.usrLevel == 40 &&
                  allowGrievanceTransfer ? (
                    <div className="w-40 m-auto">
                      <button
                        style={disabled ? { pointerEvents: "none" } : {}}
                        className="w-32  mx-auto"
                        type="submit"
                        name="transferGrievance"
                        onClick={() => {
                          !showTransferMenu
                            ? setShowTransferMenu(true)
                            : setShowTransferMenu(false);
                          //setButtonState("transferGrievance");
                        }}
                      >
                        Transfer
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                  {usrLevel > 40 ? (
                    <button
                      style={disabled ? { pointerEvents: "none" } : {}}
                      type="submit"
                      name="rollbackGrievance"
                      className="w-32 mx-auto"
                      onClick={() => setButtonState("rollbackGrievance")}
                    >
                      Send Back to AO
                    </button>
                  ) : (
                    ""
                  )}
                  {!entity.approved ? (
                    <button
                      style={disabled ? { pointerEvents: "none" } : {}}
                      className="w-32 mx-auto"
                      type="submit"
                      name="saveGrievance"
                      onClick={() => setButtonState("saveGrievance")}
                    >
                      Save Draft
                    </button>
                  ) : (
                    ""
                  )}

                  {entity.action === "edit" ? (
                    <button
                      style={disabled ? { pointerEvents: "none" } : {}}
                      className="w-32 mx-auto"
                      type="submit"
                      name="submitGrievance"
                      onClick={() => setButtonState("submitGrievance")}
                    >
                      Submit
                    </button>
                  ) : (
                    ""
                  )}
                  {entity.action === "approve" ? (
                    <button
                      style={disabled ? { pointerEvents: "none" } : {}}
                      type="submit"
                      className="w-32 mx-auto"
                      name="approveGrievance"
                      onClick={() => setButtonState("approveGrievance")}
                    >
                      Approve
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              )}

              {showTransferMenu && !disabled ? (
                <div className="">
                  <div className="mt-2 ml-4">
                    <b>Transfer to </b>
                    <select
                      className="w-22 m-0 p-0"
                      disabled={loading}
                      value={reallocatedSectionGroup}
                      onChange={(e) =>
                        setReallocatedSectionGroup(e.target.value)
                      }
                    >
                      <option key="0" value={""}>
                        --Transfer Section--
                      </option>
                      {sectionGroupList.map((item, index) => (
                        <option key={index} value={item.toString()}>
                          {" "}
                          {item.toString()}{" "}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-2 ml-4">
                    <button
                      type="submit"
                      onClick={() => setButtonState("transferGrievance")}
                      className="w-44 m-2 p-1"
                    >
                      Transfer Grievance
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}

              {newGrievance ? (
                <div className="w-40 m-auto ">
                  <button
                    className={disabled ? "hover:bg-green-500" : ""}
                    style={disabled ? { pointerEvents: "none" } : {}}
                    type="submit"
                    name="addGrievance"
                    onClick={() => {
                      setButtonState("addGrievance");
                    }}
                  >
                    Add Grievance
                  </button>
                </div>
              ) : (
                ""
              )}
            </form>
          ) : (
            <div className="mt-16">
              <p className="text-3xl text-red-500 font-bold text-left">
                Facility Available only for TWSS and LWSS
              </p>
            </div>
          )}
        </div>
        <div>{!loading ? <GrievanceTransferLog id={id} /> : ""}</div>
        <div className="px-0">
          {!loading && !entity.approved && relatedGrievanceData.length > 0 ? (
            <ShowRelatedGrievances />
          ) : (
            ""
          )}
        </div>
        <div className="px-0">
          {!loading && !entity.approved && previousGrievanceData.length > 0 ? (
            <ShowPreviousGrievances />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center ">
        {openModal && (
          <Modal
            setOpenModal={setOpenModal}
            heading={responseText}
            onContinueClick={() => redirectTo("/grievances")}
          ></Modal>
        )}
      </div>
    </div>
  );
};

export default withRouter(GrievanceEdit);
