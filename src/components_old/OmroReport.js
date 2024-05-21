import { useState, useEffect, useMemo } from "react";
import { withRouter, useParams, useHistory, Link } from "react-router-dom";
import axios from "axios";

const OmroReport = () => {
  let { id } = useParams();

  let history = useHistory();

  const [data, setData] = useState([]);
  const [serverErrors, setServerErrors] = useState("");

  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [showOldestDate, setShowOldestDate] = useState(false);
  const [reportType, setReportType] = useState("");
  const [showSelectMenu, setShowSelectMenu] = useState(false);

  async function generateReport() {
    setServerErrors("");

    if (reportType == "") {
      alert("please select proper report type.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`/reports/omro/${reportType}`);
      setData(response.data);
      console.log(response.data);
      window.open(
        `${process.env.REACT_APP_BASE_URL}/files/${response.data}?path=uploads/reports/omro`
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
    }
  }

  const fontStyle = {
    fontFamily: "Helvetica",
    fontSize: 17,
  };

  return (
    <div className="text-gray-900 bg-white">
      {serverErrors && (
        <p className="font-semibold text-red-500 text-xl text-center my-2">
          {serverErrors}
        </p>
      )}
      <main
        className="flex justify-center"
        style={loading ? { pointerEvents: "none", opacity: "0.4" } : {}}
      >
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="">
            <h1 className=" text-black" style={{ fontFamily: "Helvetica" }}>
              Reports
            </h1>

            <div className="">
              <select
                className="bg-gray-100  text-gray-900 rounded-lg w-72 p-1 mt-2 text-lg"
                onChange={(e) => {
                  setReportType(e.target.value);
                  console.log(e.target.value);
                }}
                style={fontStyle}
              >
                <option key={0} value={0} className="">
                  -select-
                </option>
                <option key={1} value="approvedNotSettled" className="">
                  Approved but not Settled
                </option>
                <option key={2} value="settled" className="">
                  Settled
                </option>
                <option key={3} value="inProgress" className="">
                  In Progress
                </option>
              </select>

              <button onClick={generateReport} className="w-32">
                Generate
              </button>
            </div>
          </div>
        </div>

        <div>
          {/* {data.length > 0 ? (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Dak Id</th>
                    <th>Section</th>
                    <th>Amount</th>
                    <th>Reference No</th>
                    <th>Created Date</th>
                    <th>CDAO No</th>
                    <th>User</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index}>
                      <td>{row?.dak.dakidNo}</td>
                      <td>{row?.dak.section.sectionName}</td>
                      <td>{row?.amount}</td>
                      <td>{row?.minNo || row?.dak.referenceNo}</td>
                      <td>{row?.createdAt.slice(0, 10)}</td>
                      <td>
                        {row?.employee.cdaoNo}
                        {row?.employee.checkDigit}
                      </td>
                      <td>{row?.usr?.usrName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            ""
          )} */}
          {/* {data.length > 0 ? (
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
          )} */}
        </div>
      </main>
    </div>
  );
};

export default withRouter(OmroReport);
