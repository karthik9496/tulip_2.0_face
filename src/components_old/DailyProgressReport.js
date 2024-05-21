/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By :
 */

import { useState, useEffect, useMemo } from "react";
import { withRouter, useParams, useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Table, { SelectColumnFilter } from "../utils/Table";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import LiveSearch from "../utils/LiveSearch";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from "date-fns/addDays";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { BasicLoadingIcon } from "../utils/Icons";
import { useCurrentDateInYYYYMMDD } from "../utils/Hooks";

const schema = yup.object({});

const DailyProgressReport = () => {
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
  const [entity, setEntity] = useState({});
  const [state, setState] = useState({});

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [fromDateStr, setFromDateStr] = useState(useCurrentDateInYYYYMMDD());
  const [toDateStr, setToDateStr] = useState(useCurrentDateInYYYYMMDD());
  const [formErrors, setFormErrors] = useState({});

  const [loading, setLoading] = useState(true);
  const [mesg, setMesg] = useState();
  const [task, setTask] = useState("");
  const [sectionname, setSectionname] = useState("");

  const [key, setKey] = useState("Page1");
  const [audData, setAudData] = useState([]);
  const [aaoData, setAaoData] = useState([]);
  const [aoData, setAoData] = useState([]);
  const [approvedData, setApprovedData] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const generateDpr = () => {
    let saving = false;

    async function fetchData() {
      setDisabled(true);
      if (!saving)
        //console.log(secId);
        await axios
          .get(`/reports/${fromDateStr}/${toDateStr}/dpr`)
          .then((response) => {
            setDisabled(false);
            console.log("response>>" + response.data);
            //setSh3List(response.data);
            setData(response.data);
            console.log("---Task No>>" + data[1].task);
            setTask(data[3].task);
            console.log("---Section No>>" + data[1].sectionname);
            setSectionname(data[1].sectionname);
          })
          .catch((error) => {
            setDisabled(false);
            //console.log(error);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
    }
    fetchData();

    return () => {
      saving = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  async function breakUp(task, sectionname, fromDateStr, toDateStr) {
    let record = "";

    console.log(">>>>>>>>:" + task);
    console.log(">>>Section Name--:" + sectionname);
    await axios
      .get(
        `/reports/${task}/${sectionname}/${fromDateStr}/${toDateStr}/dprBreakup`
      )
      .then((response) => {
        console.log("response>>" + response.data[1]);

        if (response.data[0]) {
          console.log(">>>>>aud Data--:" + response.data[0]);
          setAudData(response.data[0]);
        }
        if (response.data[1]) {
          console.log(">>>>>aao Data--:" + response.data[1]);
          setAaoData(response.data[1]);
        }
        if (response.data[2]) {
          setAoData(response.data[2]);
        }
        if (response.data[3]) {
          setApprovedData(response.data[3]);
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

  const ShowDpr = () => {
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
              <a
                href="#"
                className="w-32 m-0 p-0 bg-green-500 hover:bg-green-700 "
                onClick={() =>
                  breakUp(
                    row.original.task,
                    row.original.sectionname,
                    fromDateStr,
                    toDateStr
                  )
                }
              >
                {" "}
                {row.original.closingBalance}{" "}
              </a>
            </div>
          ),
        },

        {
          Header: "Rejection Count",
          accessor: "rejectionCount",
        },

        {
          Header: "Rejection Percentage",
          accessor: "rejPercentage",
          Cell: ({ row }) => (
            <div className="w-11 m-0 p-0 bg-red-200 ">
              {row.original.rejPercentage}
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
            <h1 className="text-xl font-semibold ml-4 mb-1">
              Daily Progress Report
            </h1>
            <hr className="mb-4" />
          </div>
          <div className="-mt-2 max-h-full py-0 ml-0">
            <Table
              columns={columns}
              data={data}
              page={50}
              className="table-auto"
            />
          </div>
        </main>
      </div>
    );
  };
  const ShowBreakupAud = () => {
    let date = new Date("createdAt");
    let dateMDY = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;

    const columns = useMemo(
      () => [
        {
          Header: "Dak Id",
          accessor: "dak.dakidNo",
        },
        {
          Header: "CDAo_No",
          accessor: "cdaoNo",
        },
        {
          Header: "Bill Type",
          accessor: "billType.description",
        },
        {
          Header: "Amount",
          accessor: "amountClaimed",
        },

        {
          Header: "Oldest Date",
          accessor: "createdAt",
        },

        {
          Header: "Reason",
          accessor: "reason",
        },
      ],
      [audData]
    );

    return (
      <div className="min-h-full bg-gray-100 text-gray-900">
        <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className=" ">
            <h1 className="text-xl font-semibold ml-4">
              Breakup Details of Auditor
            </h1>
          </div>
          <div className="-mt-2 max-h-full py-0 ml-0">
            <Table
              columns={columns}
              data={audData}
              page={50}
              className="table-auto"
            />
          </div>
        </main>
      </div>
    );
  };

  const ShowBreakupAao = () => {
    let date = new Date("createdAt");
    let dateMDY = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;

    const columns = useMemo(
      () => [
        {
          Header: "Dak Id",
          accessor: "dak.dakidNo",
        },
        {
          Header: "CDAo_No",
          accessor: "cdaoNo",
        },
        {
          Header: "Bill Type",
          accessor: "billType.description",
        },
        {
          Header: "Amount",
          accessor: "amountClaimed",
        },

        {
          Header: "Oldest Date",
          accessor: "createdAt",
        },

        {
          Header: "Reason",
          accessor: "reason",
        },
      ],
      [aaoData]
    );

    return (
      <div className="min-h-full bg-gray-100 text-gray-900">
        <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className=" ">
            <h1 className="text-xl font-semibold ml-4">
              Breakup Details of AAO
            </h1>
          </div>
          <div className="-mt-2 max-h-full py-0 ml-0">
            <Table
              columns={columns}
              data={aaoData}
              page={50}
              className="table-auto"
            />
          </div>
        </main>
      </div>
    );
  };
  const ShowBreakupAo = () => {
    let date = new Date("createdAt");
    let dateMDY = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;

    const columns = useMemo(
      () => [
        {
          Header: "Dak Id",
          accessor: "dak.dakidNo",
        },
        {
          Header: "CDAo_No",
          accessor: "cdaoNo",
        },
        {
          Header: "Bill Type",
          accessor: "billType.description",
        },
        {
          Header: "Amount",
          accessor: "amountClaimed",
        },

        {
          Header: "Oldest Date",
          accessor: "createdAt",
        },

        {
          Header: "Reason",
          accessor: "reason",
        },
      ],
      [aoData]
    );

    return (
      <div className="min-h-full bg-gray-100 text-gray-900">
        <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className=" ">
            <h1 className="text-xl font-semibold ml-4">
              Breakup Details of AO
            </h1>
          </div>
          <div className="-mt-2 max-h-full py-0 ml-0">
            <Table
              columns={columns}
              data={aoData}
              page={50}
              className="table-auto"
            />
          </div>
        </main>
      </div>
    );
  };

  return (
    <div
      className="min-h-full bg-gray-100 text-gray-900"
      style={disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}
    >
      <main className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className=" ">
          <h1 className="text-xl font-semibold ml-4">
            Select From Date--- To Date For Daily Progress Report
          </h1>

          <div>
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
            <input
              type="date"
              name="ToDate"
              placeholder="dd-mm-yyyy"
              onChange={(e) => handleInputToDateChange(e)}
              className="form-control py-0 mt-2"
              value={toDateStr}
            />
          </div>

          <div className="pl-1 -ml-2 mt-2 inputField flex-initial" />
          <button
            type="submit"
            onClick={generateDpr}
            className={`w-40 ml-2 p-0 ${disabled ? "bg-blue-700" : ""}`}
          >
            {!disabled ? (
              "Generate DPR"
            ) : (
              <>
                Generating DPR
                <BasicLoadingIcon className="inline ml-1 -mt-1 h-5 w-5 justify-center animate-spin" />
              </>
            )}
          </button>
        </div>
      </main>

      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex-container">
          <ShowDpr />
        </div>
      </main>

      <main>
        <div className="min-h-full bg-gray-100 text-gray-900">
          <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <form>
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
                      <th>Bill Type</th>
                      <th>Amount</th>
                      <th>Oldest Date</th>
                      <th>Reason</th>
                    </tr>
                  </thead>
                  {audData &&
                    audData.map((taud, index) => (
                      <tr key={taud.dakidNo}>
                        <td>{index + 1}</td>
                        <td>{taud.dakidNo}</td>
                        <td>{taud.cdaoNo}</td>

                        <td>{taud.billType}</td>

                        <td>{taud.amountClaimed}</td>
                        <td>{taud.oldestDate}</td>
                        <td>{taud.reason}</td>
                      </tr>
                    ))}

                  <tbody>
                    {audData.length === 0 && (
                      <tr>
                        <td colspan="7" align="center">
                          No Details for Auditor Avaialble{" "}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <br />
              </div>

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
                      <th>Bill Type</th>
                      <th>Amount</th>
                      <th>Oldest Date</th>
                      <th>Reason</th>
                    </tr>
                  </thead>
                  {aaoData &&
                    aaoData.map((taao, index) => (
                      <tr key={taao.dakidNo}>
                        <td>{index + 1}</td>
                        <td>{taao.dakidNo}</td>
                        <td>{taao.cdaoNo}</td>
                        <td>{taao.billType}</td>
                        <td>{taao.amountClaimed}</td>
                        <td>{taao.oldestDate}</td>
                        <td>{taao.reason}</td>
                      </tr>
                    ))}

                  <tbody>
                    {aaoData.length === 0 && (
                      <tr>
                        <td colspan="7" align="center">
                          No Details for AAO Avaialble{" "}
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
                      <th>Bill Type</th>
                      <th>Amount</th>
                      <th>Oldest Date</th>
                      <th>Reason</th>
                    </tr>
                  </thead>
                  {aoData &&
                    aoData.map((tao, index) => (
                      <tr key={tao.dakidNo}>
                        <td>{index + 1}</td>
                        <td>{tao.dakidNo}</td>
                        <td>{tao.cdaoNo}</td>
                        <td>{tao.billType}</td>
                        <td>{tao.amountClaimed}</td>
                        <td>{tao.oldestDate}</td>
                        <td>{tao.reason}</td>
                      </tr>
                    ))}

                  <tbody>
                    {aoData.length === 0 && (
                      <tr>
                        <td colspan="7" align="center">
                          No Details for AO Avaialble{" "}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <br />
              </div>

              <div className="container">
                <h1 class="text-blue-600" align="center">
                  Breakup Details----Approved but pending CMP Generation
                </h1>
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Sl No</th>
                      <th>Dak Id</th>
                      <th>CDAO No</th>
                      <th>Bill Type</th>
                      <th>Amount</th>
                      <th>Oldest Date</th>
                      <th>Reason</th>
                    </tr>
                  </thead>
                  {approvedData &&
                    approvedData.map((tao, index) => (
                      <tr key={tao.dakidNo}>
                        <td>{index + 1}</td>
                        <td>{tao.dakidNo}</td>
                        <td>{tao.cdaoNo}</td>
                        <td>{tao.billType}</td>
                        <td>{tao.amountClaimed}</td>
                        <td>{tao.oldestDate}</td>
                        <td>{tao.reason}</td>
                      </tr>
                    ))}
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

export default withRouter(DailyProgressReport);
