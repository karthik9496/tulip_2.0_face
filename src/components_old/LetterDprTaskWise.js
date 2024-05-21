import { useState, useMemo } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import TablePage, { SelectColumnFilter } from "../utils/TablePage";
import { BasicLoadingIcon } from "../utils/Icons";
import { useCurrentDateInYYYYMMDD } from "../utils/Hooks";

const LetterDprTaskWise = () => {
  const [data, setData] = useState([]);
  const [serverErrors, setServerErrors] = useState("");
  const [fromDateStr, setFromDateStr] = useState(useCurrentDateInYYYYMMDD());
  const [toDateStr, setToDateStr] = useState(useCurrentDateInYYYYMMDD());
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [auditorList, setAuditorList] = useState([]);
  const [aaoList, setAaoList] = useState([]);
  const [aoList, setAoList] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(200);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  const generateLetterDPR = () => {
    async function fetchData() {
      setServerErrors("");
      try {
        setLoading(true);
        const response = await axios.get(
          `/letters/dpr/taskWise?fromDateStr=${fromDateStr}&toDateStr=${toDateStr}`
        );
        setData(response.data);
      } catch (error) {
        if (error.response)
          setServerErrors(
            error.response.status +
              " -- " +
              error.response.statusText +
              ". Please Contact EDP"
          );
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  };

  async function generateTaskWiseDprPdf(fromDateStr, toDateStr) {
    try {
      setLoading(true);
      setGeneratingPdf(true);
      const response = await axios.get(
        `/letters/print/taskWiseDpr?fromDate=${fromDateStr}&toDate=${toDateStr}`
      );
      window.open(
        `${process.env.REACT_APP_BASE_URL}/files/${response.data}?path=uploads/letters/reports`
      );
    } catch (error) {
      if (error.response)
        setServerErrors(
          error.response.status +
            " -- " +
            error.response.statusText +
            ". Please Contact EDP"
        );
    } finally {
      setLoading(false);
      setGeneratingPdf(false);
    }
  }

  const handleInputFromDateChange = (e) => {
    setFromDateStr(e.target.value);
  };

  const handleInputToDateChange = (e) => {
    setToDateStr(e.target.value);
  };

  const ShowLetterDPR = () => {
    const handlePageNo = (pp) => {
      setPage(pp);
    };

    const handlePageSize = (pp) => {
      setPageSize(pp);
    };

    async function breakUp(task, section, fromDateStr, toDateStr) {
      try {
        const response = await axios.get(
          `/letters/dpr/taskWise/${section}/${task}/dprBreakup?fromDateStr=${fromDateStr}&toDateStr=${toDateStr}`
        );

        if (response.data[0]) {
          setAuditorList(response.data[0]);
        }
        if (response.data[1]) {
          setAaoList(response.data[1]);
        }
        if (response.data[2]) {
          setAoList(response.data[2]);
        }
      } catch (error) {
        if (error.response)
          setServerErrors(
            error.response.status +
              " -- " +
              error.response.statusText +
              ". Please Contact EDP"
          );
      }
    }

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
                  setSectionName(row.original.sectionname);
                  setTask(row.original.task);
                  breakUp(
                    row.original.task,
                    row.original.sectionname,
                    fromDateStr,
                    toDateStr
                  );
                  document.getElementById("dprBreakUp").scrollIntoView();
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
            <h1 className="text-xl font-semibold ml-4">Daily Letters Report</h1>
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
              parentCallback={handlePageNo}
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
                {sectionName && task ? (
                  <h1 class="text-green-700 text-4xl mb-8" align="center">
                    Section - {sectionName} / Task - {task}
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
                          <th>Letter Date</th>
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
                        <th>Letter Date</th>
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
                        <th>Letter Date</th>
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
            Letter DPR - Task Wise
          </h1>
          {serverErrors && (
            <p className="font-semibold text-red-500 text-xl text-center">
              {serverErrors}
            </p>
          )}
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
              onClick={generateLetterDPR}
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
              <ShowLetterDPR />
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default withRouter(LetterDprTaskWise);
