/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By :
 */

import { useState, useEffect, useMemo } from "react";
import Table, { SelectColumnFilter } from "../utils/Table"; //
import { withRouter, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Link } from "react-router-dom";

const TBillInfoEdit = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm({
    //resolver: yupResolver(schema)
  });

  let { id } = useParams();
  console.log(id);

  let history = useHistory();
  const [serverErrors, setServerErrors] = useState([]);
  const [entity, setEntity] = useState({});
  const [state, setState] = useState({});
  const [key, setKey] = useState("page1");
  const [action, setAction] = useState("");
  const [tBillData, setTBillData] = useState([]);
  const [tBillFamData, setTBillFamData] = useState([]);
  const [tBillDisData, setTBillDisData] = useState([]);
  const [tBillPmData, setTBillPmData] = useState([]);
  const [tBillCsData, setTBillCsData] = useState([]);
  const [rejectionList, setRejectionList] = useState([]);
  const [drList, setDrList] = useState([]);
  const [dakType, setDakType] = useState("");
  const [billType, setBillType] = useState("");
  const [rank, setRank] = useState("");
  const [sectionName, setSectionName] = useState("");

  useEffect(() => {
    let isCancelled = false;
    let fetching = false;
    let unmounted = false;

    async function fetchTBillData() {
      console.log("########id is---:" + id);
      await axios
        .get(`/cbillTadaLtcs/${id}/tbillInfo`)
        .then((response) => {
          console.log("&&&&&&&&:" + response.data["status"]);

          setAction(response.data["status"]);
          setTBillData(response.data["cbill"]);
          console.log("-------" + tBillData[0]);
          if (response.data["familyDetailList"] !== null)
            setTBillFamData(response.data["familyDetailList"]);
          if (response.data["disallowanceList"] !== null)
            setTBillDisData(response.data["disallowanceList"]);
          if (response.data["pmList"] !== null)
            setTBillPmData(response.data["pmList"]);
          if (response.data["csList"] !== null)
            setTBillCsData(response.data["csList"]);
          if (response.data["rejectionList"] !== null)
            setRejectionList(response.data["rejectionList"]);
          if (response.data["drList"] != null)
            setDrList(response.data["drList"]);
        })
        .catch((error) => {
          console.log(error);
          //	console.log(error.response.status);
          //	console.log(error.response.headers);
          if (error.response) setServerErrors(error.response.data.error);
          else setServerErrors(error.Error);
        });
    }
    fetchTBillData();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function submitCbill(id) {
    await axios
      .put(`/cbillTadaLtcs/${id}/submitCbill`)
      .then((response) => {
        //console.log(data);
        //let updatedRecords = [...data].filter((i) => i.id !== id);
        //	console.log(updatedRecords);
        //setData(updatedRecords);
        //setUpdate(!update);
        history.push({ pathname: "/cbillTadaLtcs", state: response.data });
        //history.push("/cbillTadaLtcs");
      })
      .catch((error) => {
        console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });
  }
  async function approve(id) {
    await axios
      .put(`/cbillTadaLtcs/${id}/approveCbill`)
      .then((response) => {
        //console.log(data);
        //let updatedRecords = [...data].filter((i) => i.id !== id);
        //console.log(updatedRecords);
        //setData(updatedRecords);
        //setUpdate(!update);
        history.push({ pathname: "/cbillTadaLtcs", state: response.data });
      })
      .catch((error) => {
        console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });
  }

  const onError = (errors, e) => {
    console.log(errors, e);
  };

  const returnToList = () => {
    history.push("/cbillTadaLtcs");
  };

  const ShowRejectionInfo = () => {
    const columns = useMemo(
      () => [
        {
          Header: "Caption",
          accessor: "caption",
        },
        {
          Header: "Remarks",
          accessor: "remarks", // Change this
          Cell: ({ row }) => (
            <div>
              {row.original.caption === "Other" && (
                <input
                  type="text"
                  value={rejectionList[row.index]["otherRejection"]}
                />
              )}
              {row.original.caption !== "Other" && (
                <label>{row.original.remarks} </label>
              )}
            </div>
          ),
        },
      ],
      [rejectionList]
    );

    return (
      <div className="h-48 bg-green-100 text-gray-900">
        <main className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">
          <div className=" "></div>
          <div className="-mt-2 max-h-0 py-0 ml-0">
            <Table
              columns={columns}
              data={rejectionList}
              className="table-auto"
            />
          </div>
        </main>
      </div>
    );
  };

  const ShowFamilyInfo = () => {
    const columns = useMemo(
      () => [
        {
          Header: "CDAO No",
          accessor: "cdaoNo",
        },

        {
          Header: "Name Of Family Member",
          accessor: "nameOfFamilyMember",
        },

        {
          Header: "Date of Birth",
          accessor: "dob",
        },

        {
          Header: "Relation",
          accessor: "relation",
        },
      ],
      [tBillFamData]
    );

    return (
      <div className="h-48 bg-green-100 text-gray-900">
        <main className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">
          <div className=" "></div>
          <div className="-mt-2 max-h-0 py-0 ml-0">
            <Table
              columns={columns}
              data={tBillFamData}
              className="table-auto"
            />
          </div>
        </main>
      </div>
    );
  };

  const ShowDisallowanceInfo = () => {
    const columns = useMemo(
      () => [
        {
          Header: "Disallowance Name",
          accessor: "disallowanceName",
          Cell: ({ row }) => (
            <div>
              <div>
                <label>{row.original.disallowanceName}</label>
              </div>
              <div>
                {row.original.remarks && (
                  <label>Remarks : {row.original.remarks}</label>
                )}
              </div>
            </div>
          ),
        },

        {
          Header: "Amount Claimed",
          accessor: "itemAmountClaimed",
        },

        {
          Header: "Amount Admitted",
          accessor: "amountAdmitted",
        },
      ],
      [tBillDisData]
    );

    return (
      <div className="h-64 bg-green-100 text-gray-900">
        <main className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">
          <div className=" "></div>
          <div className="-mt-2 max-h-0 py-0 ml-0">
            <Table
              columns={columns}
              data={tBillDisData}
              className="table-auto"
            />
          </div>
        </main>
      </div>
    );
  };

  const ShowPmInfo = () => {
    const columns = useMemo(
      () => [
        {
          Header: "Dak-Id",
          accessor: "dakidNo",
        },

        {
          Header: "Receipt Side",

          columns: [
            {
              Header: "Code Head",
              accessor: "receiptCodeHead",
            },
            {
              Header: "Plus Receipt",
              accessor: "receiptPlusAmount",
            },
            {
              Header: "Minus Receipt",
              accessor: "receiptMinusAmount",
            },
          ],
        },

        {
          Header: "Charges Side",

          columns: [
            {
              Header: "Code Head",
              accessor: "chargeCodeHead",
            },
            {
              Header: "Plus Charge",
              accessor: "chargePlusAmount",
            },
            {
              Header: "Minus Charge",
              accessor: "chargeMinusAmount",
            },
          ],
        },
        {
          Header: "Record Status",
          accessor: "recordStatus",
        },
      ],
      [tBillPmData]
    );

    return (
      <div className="h-64 bg-green-100 text-gray-900">
        <main className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">
          <div className=" "></div>
          <div className="-mt-2 max-h-0 py-0 ml-0">
            <Table
              columns={columns}
              data={tBillPmData}
              className="table-auto"
            />
          </div>
        </main>
      </div>
    );
  };

  const ShowCsInfo = () => {
    const columns = useMemo(
      () => [
        {
          Header: "Dak-Id",
          accessor: "dakidNo",
        },

        {
          Header: "Bank Name",
          accessor: "bankDetails",
        },

        {
          Header: "IFSC",
          accessor: "ifscCode",
        },

        {
          Header: "Bank Account Number",
          accessor: "bankAccountNo",
        },

        {
          Header: "Amount",
          accessor: "amount",
        },

        {
          Header: "Cheque Slip Date",
          accessor: "chequeSlipDate",
        },

        {
          Header: "Record Status",
          accessor: "recordStatus",
        },
      ],
      [tBillCsData]
    );

    return (
      <div className="h-48 bg-green-100 text-gray-900">
        <main className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">
          <div className=" "></div>
          <div className="-mt-2 max-h-0 py-0 ml-0">
            <Table
              columns={columns}
              data={tBillCsData}
              className="table-auto"
            />
          </div>
        </main>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <form>
          <div className="container">
            <h1 class="text-blue-600" align="center">
              Bill Details
            </h1>

            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>DakId/AdvId/TransId</th>
                  <th>Section Name</th>
                  <th>Task No</th>
                  <th>Rank/Officer Name/Cdao No</th>
                  <th>Basic Pay/Pay Level</th>
                  <th>Type of Claim</th>
                  <th>Claim Date</th>
                  <th>Block Year</th>
                </tr>
                {tBillData &&
                  tBillData.map((tb) => (
                    <tr key={tb.dakidNo}>
                      <td>
                        DakId : {tb.dakidNo} <br />
                        Adv Id : {tb.advId}
                        <br />
                        Dts Id : {tb.transId}
                        <br />
                        {}
                        <br />
                      </td>
                      <td>
                        {tb.sectionName}
                        <br />
                        {}
                        <br />
                        {}
                        <br />
                        {}
                        <br />
                        {}
                      </td>
                      <td>
                        {tb.taskNo}
                        <br />
                        {}
                        <br />
                        {}
                        <br />
                        {}
                        <br />
                        {}
                      </td>
                      <td>
                        Rank : {tb.rankName}
                        <br />
                        Officer Name: {tb.empName} <br />
                        CDAO_No : {tb.cdaoNo}
                      </td>
                      <td>
                        Basic Pay : {tb.basicPay}
                        <br />
                        Pay Level: {tb.payLevel}
                        <br />
                        {}
                        <br />
                        {}
                      </td>
                      <td>
                        {tb.typeOfClaim}
                        <br />
                        {}
                        <br />
                        {}
                      </td>
                      <td>
                        {tb.billDate}
                        <br />
                        {}
                        <br />
                        {}
                        <br />
                        {}{" "}
                      </td>
                      <td>{tb.blockYear}</td>
                    </tr>
                  ))}
                <tr>
                  <th>Movement Order/Movement Order Date</th>
                  <th>Station From/Station To</th>
                  <th colspan="2">From Date/To Date</th>
                  <th colspan="2">Passing Details</th>
                  <th>No of Members</th>
                  <th>TA Rule</th>
                </tr>

                {tBillData &&
                  tBillData.map((tb) => (
                    <tr key={tb.dakidNo}>
                      <td>
                        {" "}
                        Movement Order No : {tb.movementOrderNo} <br />
                        Movement Order Date : {tb.movementOrderDate}
                        <br />
                        {}
                        <br />
                        {}
                        <br />
                      </td>

                      <td>
                        Station From : {tb.journeyStationFrom}
                        <br />
                        Station To :{tb.journeyStationTo}
                        <br />
                        {}
                        <br />
                        {}
                        <br />
                      </td>
                      <td colspan="2">
                        From Date : {tb.journeyStartDate}
                        <br />
                        To Date: {tb.journeyEndDate} <br />
                        {}
                        <br />
                        {}
                        <br />
                      </td>

                      <td colspan="2">
                        Amount Claimed : {tb.amountClaimed}
                        <br />
                        Amount Passed:{tb.amountPassed}
                        <br />
                        Amount Disallowed:{tb.amountDisallowed}
                        <br />
                        Advance Amount:{tb.advanceAmount}
                        <br />
                        Mro Amount:{tb.mroAmount}
                        <br />
                        Penal Interest:{tb.penalInterest}
                        <br />
                        Adjustment Amount:{tb.adjustmentAmount}
                      </td>
                      <td className="align-middle">{tb.numberOfMembers} </td>
                      <td>
                        {tb.taRule}
                        <br />
                        {}
                        <br />
                        {}
                        <br />
                        {}
                        <br />{" "}
                      </td>
                    </tr>
                  ))}

                <tr>
                  <th>Fare Details</th>

                  <th colspan="2">Auditor Name</th>
                  <th colspan="2">AAO Name</th>
                  <th>AO Name</th>
                  <th>Record Status</th>
                  <th>Reason</th>
                </tr>

                {tBillData &&
                  tBillData.map((tb) => (
                    <tr key={tb.dakidNo}>
                      <td>
                        Fare:{tb.totalFare}
                        <br />
                        Food:{tb.foodCharges}
                        <br />
                        Lodging:{tb.lodgingCharges}
                        <br />
                        Distance:{tb.distance}
                        <br />
                        CTG:{tb.ctg}
                        <br />
                        Baggage Qty:{tb.baggageQuantity}
                        <br />
                        Baggage Amount:{tb.baggageAmount}
                        <br />
                        Conveyance Type:{tb.conveyanceType}
                        <br />
                        Conveyance Amount:{tb.conveyanceAmount}
                        <br />
                        RMA:{tb.rma}
                      </td>

                      <td colspan="2">
                        Auditor Name : {tb.auditorName}
                        <br />
                        Auditor Date: {tb.auditorDate}
                        <br />
                        {}
                        <br />
                        {}
                        <br />
                        {}
                        <br />
                        {}{" "}
                      </td>
                      <td colspan="2">
                        AAO Name :{tb.aaoName}
                        <br /> AAO Date:{tb.aaoDate}
                        <br />
                        {}
                        <br />
                        {}
                        <br />
                        {}
                        <br />
                      </td>
                      <td>
                        AO Name : {tb.aoName}
                        <br />
                        AO Date:{tb.aoDate}
                        <br />
                        {}
                        <br />
                        {}
                        <br />
                        {}
                        <br />
                        {}
                        <br />
                      </td>
                      <td>
                        Record Status : {tb.recordStatus}
                        <br />
                        Approved:{tb.approved}
                        <br />
                        {}
                        <br />
                        {}
                        <br />
                        {}
                        <br />
                        {}
                        <br />
                      </td>
                      <td>
                        {tb.reason}
                        <br />
                        <br />
                        Remarks : {tb.remarks}
                      </td>
                    </tr>
                  ))}
              </thead>

              <tbody>
                {tBillData.length === 0 && (
                  <tr>
                    <td colspan="4" align="center">
                      No Bill Details Avaialble{" "}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <br />
          </div>

          <div className="container">
            <h1 class="text-blue-600" align="center">
              Rejection Details
            </h1>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Caption</th>
                  <th>Remarks</th>
                </tr>
                {rejectionList &&
                  rejectionList.map((tr) => (
                    <tr key={tr.dakidNo}>
                      <td>{tr.caption}</td>
                      <td>{tr.remarks}</td>
                    </tr>
                  ))}
              </thead>

              <tbody>
                {rejectionList.length === 0 && (
                  <tr>
                    <td colspan="2" align="center">
                      No Rejection Details Avaialble{" "}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <br />
          </div>

          <div className="container">
            <h1 class="text-blue-600" align="center">
              Demands Settled{" "}
            </h1>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>DakId</th>
                  <th>Demand Date</th>
                  <th>Journey Start Date</th>
                  <th>Journey End Date</th>
                  <th>Amount</th>
                  <th>Station From</th>
                  <th>Station To</th>
                  <th>DV No</th>
                </tr>
                {drList &&
                  drList.map((tr) => (
                    <tr key={tr.dakidNo}>
                      <td>{tr.dakidNo}</td>
                      <td>{tr.demandDate}</td>
                      <td>{tr.journeyStartDate}</td>
                      <td>{tr.journeyEndDate}</td>
                      <td>{tr.amount}</td>
                      <td>{tr.stationFrom}</td>
                      <td>{tr.stationTo}</td>
                      <td>{tr.dvNo}</td>
                    </tr>
                  ))}
              </thead>

              <tbody>
                {drList.length === 0 && (
                  <tr>
                    <td colspan="2" align="center">
                      No demands settled with this bill{" "}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <br />
          </div>

          <div className="container">
            <h1 class="text-blue-600" align="center">
              Family Infomation
            </h1>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Name Of Family Member</th>
                  <th>Gender</th>
                  <th>Relation</th>
                  <th>Date Of Birth</th>
                </tr>
                {tBillFamData &&
                  tBillFamData.map((tf) => (
                    <tr key={tf.dakidNo}>
                      <td>{tf.nameOfFamilyMember}</td>
                      <td>{tf.gender}</td>
                      <td>{tf.relation}</td>
                      <td>{tf.dob}</td>
                    </tr>
                  ))}
              </thead>

              <tbody>
                {tBillFamData.length === 0 && (
                  <tr>
                    <td colspan="4" align="center">
                      No Family Details Avaialble{" "}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <br />
          </div>

          <div className="container">
            <h1 class="text-blue-600" align="center">
              Disallowance Info
            </h1>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Disallowance Name</th>
                  <th>Remarks</th>
                  <th>Amount Claimed</th>
                  <th>Amount Admitted</th>
                  <th>Receipt</th>
                </tr>
                {tBillDisData &&
                  tBillDisData.map((td) => (
                    <tr key={td.dakidNo}>
                      <td>{td.disallowanceName}</td>
                      <td>{td.remarks}</td>
                      <td>{td.itemAmountClaimed}</td>
                      <td>{td.amountAdmitted}</td>
                      <td>{td.receiptNo}</td>
                    </tr>
                  ))}
              </thead>

              <tbody>
                {tBillDisData.length === 0 && (
                  <tr>
                    <td colspan="5" align="center">
                      No Disallowance Details available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <br />
          </div>

          <div className="container">
            <h1 class="text-blue-600" align="center">
              Punching Media Details
            </h1>
            <table className="table   table-bordered">
              <thead>
                <tr>
                  <th colSpan={3}>Receipt Side</th>
                  <th colSpan={3}>Charges Side</th>
                </tr>

                <tr>
                  <th>Code Head</th>
                  <th>Plus Receipt</th>
                  <th>Minus Receipt</th>
                  <th>Code Head</th>
                  <th>Plus Charge</th>
                  <th>Minus Charge</th>
                </tr>

                {tBillPmData &&
                  tBillPmData.map((tp) => (
                    <tr key={tp.dakidNo}>
                      <td>{tp.receiptCodeHead}</td>
                      <td>{tp.receiptPlusAmount}</td>
                      <td>{tp.receiptMinusAmount}</td>
                      <td>{tp.chargeCodeHead}</td>
                      <td>{tp.chargePlusAmount}</td>
                      <td>{tp.chargeMinusAmount}</td>
                    </tr>
                  ))}
              </thead>

              <tbody>
                {tBillPmData.length === 0 && (
                  <tr>
                    <td colspan="6" align="center">
                      No PM Details Avaialble{" "}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <br />
          </div>

          <div className="container">
            <h1 class="text-blue-600" align="center">
              Cheque Slip Details
            </h1>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Bank Name</th>
                  <th>IFSC</th>
                  <th>Bank Account Number</th>
                  <th>Amount</th>
                  <th>Cheque Slip Date</th>
                </tr>

                {tBillCsData &&
                  tBillCsData.map((tc) => (
                    <tr key={tc.dakidNo}>
                      <td>{tc.bankDetails}</td>
                      <td>{tc.ifscCode}</td>
                      <td>{tc.bankAccountNo}</td>
                      <td>{tc.amount}</td>
                      <td>{tc.chequeSlipDate}</td>
                    </tr>
                  ))}
              </thead>

              <tbody>
                {tBillCsData.length === 0 && (
                  <tr>
                    <td colspan="5" align="center">
                      No Cheque Slip Bill Details Available{" "}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div align="center">
            {" "}
            {action === "Submission by AAO." && (
              <button
                className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
                onClick={() => submitCbill(id)}
              >
                {" "}
                Submit{" "}
              </button>
            )}{" "}
            {(action === "Approval by AO." ||
              action === "Approval by AAO.") && (
              <button
                className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
                onClick={() => approve(id)}
              >
                {" "}
                Approve{" "}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(TBillInfoEdit);
