import { useState, useEffect, useMemo } from "react";
import { withRouter, useParams, useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import TablePage, { SelectColumnFilter } from "../utils/TablePage";
import { BasicLoadingIcon } from "../utils/Icons";
import { useCurrentDateInYYYYMMDD } from "../utils/Hooks";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import "react-datepicker/dist/react-datepicker.css";

const schema = yup.object({});
const GrievanceDprTaskWise = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  let { id } = useParams();
  //console.log(id);

  let history = useHistory();

  const [data, setData] = useState([]);
  const [serverErrors, setServerErrors] = useState([]);

  const [fromDateStr, setFromDateStr] = useState(useCurrentDateInYYYYMMDD());
  const [toDateStr, setToDateStr] = useState(useCurrentDateInYYYYMMDD());

  const [loading, setLoading] = useState(false);
  const [mesg, setMesg] = useState();
  const [task, setTask] = useState("");
  const [sectionname, setSectionname] = useState("");

  const [auditorList, setAuditorList] = useState([]);
  const [aaoList, setAaoList] = useState([]);
  const [aoList, setAoList] = useState([]);
  const [woList, setWoList] = useState([]);
  const [jcdaList, setJcdaList] = useState([]);
  const [pcdaList, setPcdaList] = useState([]);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(200);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  function generateTaskWiseDprPdf(fromDateStr, toDateStr) {
    setLoading(true);
    setGeneratingPdf(true);
    axios
      .get(
        `/grievances/print/taskWiseDpr?fromDate=${fromDateStr}&toDate=${toDateStr}`
      )
      .then((response) => {
        setLoading(false);
        setGeneratingPdf(false);
        window.open(
          `${process.env.REACT_APP_BASE_URL}/files/${response.data}?path=uploads/grievances/reports`
        );
      })
      .catch((error) => {
        setLoading(false);
        setGeneratingPdf(false);
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });
  }

  const generateGrievanceDPR = () => {
    let saving = false;

    async function fetchData() {
      if (!saving) {
        setLoading(true);
        await axios
          .get(`/reports/${fromDateStr}/${toDateStr}/grievance-dpr/taskwise`)
          .then((response) => {
            setLoading(false);
            console.log("response>>" + response.data);
            setData(response.data);
            /*console.log("---Task No>>" + data[1].task);
            setTask(data[3].task);
            console.log("---Section No>>" + data[1].sectionname);
            setSectionname(data[1].sectionname); */
          })
          .catch((error) => {
            setLoading(false);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
      }
    }
    fetchData();

    return () => {
      saving = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const handleInputFromDateChange = (e) => {
    console.log(e.target.value);
    //setFromDate(e.target.value);
    // validateFromDate(e.target.value);
    setFromDateStr(e.target.value);
  };

  const handleInputToDateChange = (e) => {
    console.log(e.target.value);
    //setToDate(e.target.value);
    // validateToDate(e.target.value);

    setToDateStr(e.target.value);
  };

  const onError = (errors, e) => console.log(errors, e);

  //All foreign keys.
  // XXXXXX Add search fields and adjust the values as necessary

  const errorCallback = (err) => {
    //console.log(err);
    setServerErrors(err);
  };

  const handleInputChange = (e) => {
    console.log(e.target.value);
    //	console.log("handle input change");
  };

  const ShowGrievanceDPR = () => {
    const handleCallBack = (pp) => {
      console.log(pp);
      setPage(pp);
    };

    const handlePageSize = (pp) => {
      console.log(pp);
      setPageSize(pp);
    };

    async function breakUp(task, sectionname, fromDateStr, toDateStr) {
      let record = "";

      console.log(">>>>>>>>:" + task);
      console.log(">>>Section Name--:" + sectionname);
      await axios
        .get(
          `/reports/grievance-dpr/task-wise/${sectionname}/${task}/dprBreakup?fromDateStr=${fromDateStr}&toDateStr=${toDateStr}`
        )
        .then((response) => {
          console.log("response>>", response.data);

          if (response.data[0]) {
            console.log(">>>>>aud Data--:" + response.data[0]);
            setAuditorList(response.data[0]);
          }
          if (response.data[1]) {
            console.log(">>>>>aao Data--:" + response.data[1]);
            setAaoList(response.data[1]);
          }
          if (response.data[2]) {
            setAoList(response.data[2]);
          }
          if (response.data[3]) {
            setWoList(response.data[3]);
          }
          if (response.data[4]) {
            setJcdaList(response.data[4]);
          }
          if (response.data[5]) {
            setPcdaList(response.data[5]);
          }
        })
        .catch((error) => {
          //console.log(error);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          if (error.response) setServerErrors(error.response.data.error);
          else setServerErrors(error.Error);
        });

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }

    const handleInputFromDateChange = (e) => {
      console.log(e.target.value);
      //setFromDate(e.target.value);
      // validateFromDate(e.target.value);
      setFromDateStr(e.target.value);
    };

    const columns = useMemo(
      () => [
        {
          Header: "Section",
          accessor: "sectionname",
          Filter: SelectColumnFilter,
        },
        {
          Header: "Task",
          accessor: "task",
          Filter: SelectColumnFilter,
        },
        {
          Header: "Usr",
          accessor: "usrName",
        },
        {
          Header: "Opening Balance",
          accessor: "openingBalance",
        },

        {
          Header: "Receipts",
          accessor: "receipts",
        },

        {
          Header: "Disposal",
          accessor: "disposal",
        },
        {
          Header: "Closing Balance",
          accessor: "closingBalance",
          Cell: ({ row }) => (
            <div>
              <p
                className=" text-center w-8 m-0 p-0 bg-green-300 hover:bg-green-500 cursor-pointer"
                onClick={() => {
                  setSectionname(row.original.sectionname);
                  setTask(row.original.task);
                  breakUp(
                    row.original.task,
                    row.original.sectionname,
                    fromDateStr,
                    toDateStr
                  );
                }}
              >
                {" "}
                {row.original.closingBalance}{" "}
              </p>
            </div>
          ),
        },

        {
          Header: "Oldest Date",
          accessor: "oldestDate",
        },
      ],
      [data]
    );

    return (
      <div className="min-h-full bg-gray-100 text-gray-900">
        <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className=" ">
            <h1 className="text-xl font-semibold ml-4">
              Daily Grievance Report
            </h1>
          </div>
          <div className="-mt-2 max-h-full py-0 ml-0">
            <div className="flex flex-row-reverse">
              <button
                className="w-32 bg-blue-500 hover:bg-blue-700"
                onClick={() => generateTaskWiseDprPdf(fromDateStr, toDateStr)}
              >
                Generate Pdf
              </button>
            </div>
            <TablePage
              columns={columns}
              data={data}
              newpage={page}
              parentCallback={handleCallBack}
              newPageSize={pageSize}
              parentCallbackPageSize={handlePageSize}
              className="table-auto"
            />
          </div>
        </main>
        <main>
          <div className="min-h-full bg-gray-100 text-gray-900">
            <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
              <form>
                {sectionname && task ? (
                  <h1 class="text-green-700 text-4xl mb-8" align="center">
                    Section - {sectionname} / Task - {task}
                  </h1>
                ) : (
                  ""
                )}

                {auditorList && (
                  <div className="container">
                    <h1 class="text-blue-600" align="center">
                      Breakup Details----Auditor
                    </h1>
                    <table className="table table-striped table-bordered">
                      <thead>
                        <tr>
                          <th>Sl No</th>
                          <th>Dak Id</th>
                          <th>CDAO No</th>
                          <th>Subject</th>
                          <th>Grievance Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {auditorList && auditorList.length > 0 ? (
                          auditorList.map((row, index) => (
                            <tr key={row.dakidNo}>
                              <td>{index + 1}</td>
                              <td>{row.dakidNo}</td>
                              <td>{row.cdaoNo}</td>
                              <td>{row.reason}</td>
                              <td>{row.oldestDate}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" align="center">
                              No Details for Auditor Available{" "}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    <br />
                  </div>
                )}

                <div className="container">
                  <h1 class="text-blue-600" align="center">
                    Breakup Details----AAO
                  </h1>
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>Sl No</th>
                        <th>Dak Id</th>
                        <th>CDAO No</th>
                        <th>Subject</th>
                        <th>Grievance Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {aaoList && aaoList.length > 0 ? (
                        aaoList.map((row, index) => (
                          <tr key={row.dakidNo}>
                            <td>{index + 1}</td>
                            <td>{row.dakidNo}</td>
                            <td>{row.cdaoNo}</td>
                            <td>{row.reason}</td>
                            <td>{row.oldestDate}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" align="center">
                            No Details for AAO Available{" "}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <br />
                </div>

                <div className="container">
                  <h1 class="text-blue-600" align="center">
                    Breakup Details----SAO/AO
                  </h1>
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>Sl No</th>
                        <th>Dak Id</th>
                        <th>CDAO No</th>
                        <th>Subject</th>
                        <th>Grievance Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {aoList && aoList.length > 0 ? (
                        aoList.map((row, index) => (
                          <tr key={row.dakidNo}>
                            <td>{index + 1}</td>
                            <td>{row.dakidNo}</td>
                            <td>{row.cdaoNo}</td>
                            <td>{row.reason}</td>
                            <td>{row.oldestDate}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" align="center">
                            No Details for SAO/AO Available{" "}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <br />
                </div>

                <div className="container">
                  <h1 class="text-blue-600" align="center">
                    Breakup Details----WO
                  </h1>
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>Sl No</th>
                        <th>Dak Id</th>
                        <th>CDAO No</th>
                        <th>Subject</th>
                        <th>Grievance Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {woList && woList.length > 0 ? (
                        woList.map((row, index) => (
                          <tr key={row.dakidNo}>
                            <td>{index + 1}</td>
                            <td>{row.dakidNo}</td>
                            <td>{row.cdaoNo}</td>
                            <td>{row.reason}</td>
                            <td>{row.oldestDate}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" align="center">
                            No Details for Wing Officer Available{" "}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <br />
                </div>

                <div className="container">
                  <h1 class="text-blue-600" align="center">
                    Breakup Details----Additional CDA
                  </h1>
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>Sl No</th>
                        <th>Dak Id</th>
                        <th>CDAO No</th>
                        <th>Subject</th>
                        <th>Grievance Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jcdaList && jcdaList.length > 0 ? (
                        jcdaList.map((row, index) => (
                          <tr key={row.dakidNo}>
                            <td>{index + 1}</td>
                            <td>{row.dakidNo}</td>
                            <td>{row.cdaoNo}</td>
                            <td>{row.reason}</td>
                            <td>{row.oldestDate}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" align="center">
                            No Details for Additional CDA Available{" "}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <br />
                </div>

                <div className="container">
                  <h1 class="text-blue-600" align="center">
                    Breakup Details----PCDA
                  </h1>
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>Sl No</th>
                        <th>Dak Id</th>
                        <th>CDAO No</th>
                        <th>Subject</th>
                        <th>Grievance Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pcdaList && pcdaList.length > 0 ? (
                        pcdaList.map((row, index) => (
                          <tr key={row.dakidNo}>
                            <td>{index + 1}</td>
                            <td>{row.dakidNo}</td>
                            <td>{row.cdaoNo}</td>
                            <td>{row.reason}</td>
                            <td>{row.oldestDate}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" align="center">
                            No Details for PCDA Available{" "}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <br />
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    );
  };

  return (
    <div className="min-h-screen max-h-full bg-gray-100 text-gray-900">
      <main
        className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4"
        style={loading ? { pointerEvents: "none", opacity: "0.4" } : {}}
      >
        <div className=" ">
          <h1 className="text-3xl font-semibold text-center">
            Grievance DPR - Task Wise
          </h1>
          <div className="flex justify-center">
            <div>
              <label>From Date</label>
              <input
                type="date"
                name="FromDate"
                placeholder="dd-mm-yyyy"
                onChange={(e) => handleInputFromDateChange(e)}
                className="form-control py-0"
                value={fromDateStr}
              />
            </div>

            <div>
              <label>To Date</label>
              <input
                type="date"
                name="ToDate"
                placeholder="dd-mm-yyyy"
                onChange={(e) => handleInputToDateChange(e)}
                className="form-control py-0"
                value={toDateStr}
              />
            </div>
          </div>

          <div className="pl-1 -ml-2 inputField flex-initial" />
          <div className="flex justify-center mt-2">
            <button
              type="submit"
              onClick={generateGrievanceDPR}
              className="w-32 m-0 p-0"
            >
              Generate
            </button>
          </div>
        </div>
      </main>

      {loading ? (
        <div className="flex justify-center items-center fixed top-1/4 w-full z-50">
          <p className="mr-2 text-2xl text-green-600">
            {generatingPdf ? (
              <p className="text-blue-500">Generating Pdf Report</p>
            ) : (
              "Fetching Data"
            )}
          </p>
          <BasicLoadingIcon
            className={`ml-1 mt-1 h-10 w-10 animate-spin ${
              generatingPdf ? "text-blue-500" : "text-green-600"
            }`}
          />
        </div>
      ) : (
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          {data.length > 0 ? (
            <div className="flex-container">
              <ShowGrievanceDPR />
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default withRouter(GrievanceDprTaskWise);
