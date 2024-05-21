import { useState, useEffect, useMemo } from "react";
import { withRouter, useParams, useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import TablePage, { SelectColumnFilter } from "../utils/TablePage";
import { BasicLoadingIcon } from "../utils/Icons";
import { useCurrentDateInYYYYMMDD } from "../utils/Hooks";

const TwingReport = () => {
  let { id } = useParams();

  let history = useHistory();

  const [data, setData] = useState([]);
  const [serverErrors, setServerErrors] = useState("");

  const [fromDateStr, setFromDateStr] = useState(useCurrentDateInYYYYMMDD());
  const [toDateStr, setToDateStr] = useState(useCurrentDateInYYYYMMDD());

  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [showOldestDate, setShowOldestDate] = useState(false);
  const [reportType, setReportType] = useState("");
  const [showSelectMenu, setShowSelectMenu] = useState(false);
  const [ssUser, setSSUser] = useState(false);
  const [usrLevel, setUsrLevel] = useState(0);

  useEffect(() => {
    function isSSUser() {
      let usr = JSON.parse(sessionStorage.getItem("usr"));
      setUsrLevel(usr?.designation.designationLevel);
      if (usr?.usrName === "SysAdmin") {
        setSSUser(true);
      } else {
        usr?.sectionList?.forEach((section) => {
          if (section.sectionName === "TSS") {
            setSSUser(true);
          }
        });
      }
    }
    isSSUser();
  }, []);

  async function generateReport() {
    setServerErrors("");
    try {
      setLoading(true);
      const response = await axios.get(
        `/reports/twing/${reportType}?fromDateStr=${fromDateStr}&toDateStr=${toDateStr}`
      );
      if (reportType === "rejectionReport") {
        console.log("fileName", response.data);
        window.open(`${process.env.REACT_APP_BASE_URL}/files/${response.data}`);
      } else {
        setData(response.data);
        if (reportType != "billPunched") setShowOldestDate(true);
        else setShowOldestDate(false);
        setTotalCount(
          response.data.reduce(function (accumulator, newValue) {
            return accumulator + newValue.count;
          }, 0)
        );
      }
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

  const fontStyle = {
    fontFamily: "Helvetica",
    fontSize: 17,
  };

  let totalCounter = 0;

  return (
    <div className="text-gray-900 bg-white">
      {serverErrors && (
        <p className="font-semibold text-red-500 text-xl text-center my-2">
          {serverErrors}
        </p>
      )}
      <main
        className="pt-4"
        style={loading ? { pointerEvents: "none", opacity: "0.4" } : {}}
      >
        <div className="flex flex-col items-start sticky top-24 ml-36 p-2 w-96">
          <div className="flex flex-col items-center p-2 bg-white rounded-3xl shadow-2xl">
            <h1 className="" style={{ fontFamily: "Helvetica" }}>
              Reports
            </h1>
            <div className="">
              <div className="flex">
                <div>
                  <label>From Date</label>
                  <input
                    type="date"
                    name="FromDate"
                    placeholder="dd-mm-yyyy"
                    onChange={(e) => setFromDateStr(e.target.value)}
                    value={fromDateStr}
                    readOnly={reportType === "billPendency" ? true : false}
                  />
                </div>
                <div>
                  <label>To date</label>
                  <input
                    type="date"
                    name="ToDate"
                    placeholder="dd-mm-yyyy"
                    onChange={(e) => setToDateStr(e.target.value)}
                    value={toDateStr}
                    readOnly={reportType === "billPendency" ? true : false}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <select
                className="bg-gray-100  text-gray-900 rounded-lg w-72 p-1 mt-2 text-lg"
                onChange={(e) => {
                  if (e.target.value === "billPendency") {
                    setFromDateStr(useCurrentDateInYYYYMMDD);
                    setToDateStr(useCurrentDateInYYYYMMDD);
                  }
                  setReportType(e.target.value);
                  setData([]);
                }}
                style={fontStyle}
              >
                <option key={0} value={0} className="bg-green-200 ">
                  -select-
                </option>
                <option key={1} value="billPendency" className="bg-green-200">
                  Bill Pendency
                </option>
                <option key={2} value="billPunched" className="bg-green-200 ">
                  Bill Punched
                </option>
                {ssUser ? (
                  <option
                    key={3}
                    value="rejectionReport"
                    className="bg-green-200 "
                  >
                    Rejection Report
                  </option>
                ) : (
                  ""
                )}
              </select>
              {/* <div className="w-full cursor-pointer">
                <div>
                  <li
                    className="list-none hover:bg-green-500"
                    //onClick={setShowSelectMenu(true)}
                  >
                    --Select--
                  </li>
                </div>
                {true && (
                  <div>
                    <li
                      className="list-none hover:bg-green-500"
                      onClick={(e) => setReportType("billPendency")}
                    >
                      Bill Pending
                    </li>
                    <li className="list-none hover:bg-green-500">
                      Bill Punched
                    </li>
                  </div>
                )}
              </div> */}
              <button type="submit" onClick={generateReport} className="w-32">
                Generate
              </button>
            </div>
          </div>
        </div>

        <div
          className="-mt-48 p-0 shadow-lg rounded-xl noScrollBar scro"
          style={{ marginLeft: "650px", maxHeight: "670px", overflow: "auto" }}
        >
          {data.length > 0 ? (
            <>
              <table className="w-full  text-sm text-left  text-gray-500 shadow-lg bg-white ">
                <thead className=" text-xs text-white uppercase bg-green-500 sticky top-0">
                  <tr>
                    <th
                      scope="col"
                      class="px-10 py-2 text-lg"
                      style={fontStyle}
                    >
                      Taskholder
                    </th>
                    {reportType === "billPunched" ? (
                      <th
                        scope="col"
                        class="px-10 py-2 text-lg text-center"
                        style={fontStyle}
                      >
                        Present Section
                      </th>
                    ) : (
                      <th
                        scope="col"
                        class="px-10 py-2 text-lg text-center"
                        style={fontStyle}
                      >
                        Section
                      </th>
                    )}
                    <th
                      scope="col"
                      class="px-10 py-2 text-lg text-center"
                      style={fontStyle}
                    >
                      Task No
                    </th>

                    <th
                      scope="col"
                      class="px-10 py-2 text-lg text-center"
                      style={fontStyle}
                    >
                      Count
                    </th>
                    {showOldestDate && (
                      <th
                        scope="col"
                        class="px-10 py-2 text-lg text-center"
                        style={fontStyle}
                      >
                        Oldest Date
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr
                      className="tr-even-white-bg border-b hover:bg-gray-100"
                      key={index}
                    >
                      <td
                        className="px-10 py-2 text-gray-700 "
                        style={fontStyle}
                      >
                        {row.usrName}
                      </td>
                      <td className="px-10 py-2 text-center" style={fontStyle}>
                        {row.sectionname}
                      </td>
                      <td className="px-10 py-2 text-center" style={fontStyle}>
                        {row.task}
                      </td>
                      <td className="px-10 py-2 text-center" style={fontStyle}>
                        {row.count}
                      </td>
                      {showOldestDate && (
                        <td
                          className="px-10 py-2 text-center"
                          style={fontStyle}
                        >
                          {row.oldestDate}
                        </td>
                      )}
                    </tr>
                  ))}

                  <tr className="bg-gray-200 sticky bottom-0 font-bold">
                    <td></td>
                    <td></td>
                    <td
                      className="px-6 py-2 text-center text-black"
                      style={fontStyle}
                    >
                      TOTAL
                    </td>
                    <td
                      className="px-6 py-2 text-center text-black"
                      style={fontStyle}
                    >
                      {totalCount}
                    </td>
                    {showOldestDate && <td></td>}
                  </tr>
                </tbody>
              </table>
            </>
          ) : (
            ""
          )}
        </div>
      </main>
      {reportType === "billPunched" ? (
        <p className="text-red-500 italic mt-4 mr-4 text-right">
          ** Note: the data is shown wrt user irrespective of sections
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default withRouter(TwingReport);
