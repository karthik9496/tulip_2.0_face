/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 18 April 2022
 *
 * Modified By :
 */

import { useState, useEffect, useMemo } from "react";
import Table, { SelectColumnFilter } from "../utils/Table"; //
import axios from "axios";
import { withRouter, Link } from "react-router-dom";

function CbillMedicalList() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");

  const [mesg, setMesg] = useState("");
  const [dakId, setDakId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(">>>>>:" + dakId);
    let fetching = false;
    async function fetchData() {
      if (!fetching) console.log("dakid---:" + dakId);

      await axios
        .get("/cbillMedicals?search=" + search + "&dakId=" + dakId)
        .then((response) => {
          if (response.data[1] !== null) {
            setData(response.data[1]);
          } else {
            setMesg(response.data[0]);
          }
          console.log(response.data[1]);
        })
        .catch((error) => {
          //console.log(error);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          if (error.response) setServerErrors(error.response.data.error);
          else setServerErrors(error.Error);
        });
    }
    fetchData();
    return () => {
      fetching = true;
    };
  }, [update, search, dakId]);

  async function submit(id) {
    await axios
      .put(`/cbillMedicals/submitOutPatientClaim/${id}`)
      .then((response) => {
        console.log(data);
        setMesg(response.data);
        let updatedRecords = [...data].filter((i) => i.id !== id);
        //console.log(updatedRecords);
        setData(updatedRecords);
      })
      .catch((error) => {
        console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });
  }

async function rollback(id) {
    await axios
      .put(`/cbillMedicals/rollback/${id}`)
      .then((response) => {
        setMesg(response.data);
        let updatedRecords = [...data].filter((i) => i.id !== id);
        console.log(updatedRecords);
        setData(updatedRecords);
        setUpdate(!update);
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
      .put(`/cbillMedicals/approveOutPatientClaim/${id}`)
      .then((response) => {
        setMesg(response.data);
        let updatedRecords = [...data].filter((i) => i.id !== id);
        console.log(updatedRecords);
        setData(updatedRecords);
        setUpdate(!update);
      })
      .catch((error) => {
        console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });
  }

  const columns = useMemo(
    () => [
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div>
            <div>
              {row.original.action != null &&
                row.original.action.includes("edit") && (
                  <Link to={"/cbillMedicals/" + row.original.id}>
                    <button className=" w-16 m-0 p-0 "> Edit </button>
                  </Link>
                )}{" "}
              {row.original.action != null &&
                !row.original.action.includes("appro") &&
                !row.original.action.includes("edit") && (
                  <button
                    className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
                    onClick={() => submit(row.original.id)}
                  >
                    {" "}
                    Submit{" "}
                  </button>
                )}{" "}
              {row.original.action != null &&
                row.original.action.includes("appro") && (
                  <button
                    className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
                    onClick={() => approve(row.original.id)}
                  >
                    {" "}
                    Approve{" "}
                  </button>
                )}
                
                {row.original.action != null &&
                row.original.action.includes("appro") && (
                  <button
                    className="w-20 m-2 p-0 bg-red-800 hover:bg-red-700 "
                    onClick={() => rollback(row.original.id, data)}
                  >
                    {" "}
                    RollBack{" "}
                  </button>
                )}
            </div>
          </div>
        ),
      },
      {
        Header: "Dak",
        accessor: "dak.dakidNo",
        Cell: ({ row }) => (
          <div>
            {row.original.dak !== null && row.original.manualRejection ? (
              <label className="text-red-600">{row.original.dak.dakidNo}</label>
            ) : (
              <label className="text-green-600">
                {row.original.dak.dakidNo}
              </label>
            )}
          </div>
        ),
      },

      {
        Header: "Cdao No",
        accessor: "employee.cdaoNo", // Change this
      },

      {
        Header: "Check Digit",
        accessor: "employee.checkDigit",
      },

      {
        Header: "Inpatient Outpatient",
        accessor: "inpatientOutpatient",
        Filter: SelectColumnFilter,
        filter: "inpatientOutpatient", // Change this
      },

      {
        Header: "Family Detail",
        accessor: "familyDetail.nameOfMember", // Change this
      },

      {
        Header: "Name Of Patient",
        accessor: "nameOfPatient",
      },

      {
        Header: "Relation Ship",
        accessor: "relationShip",
      },

      {
        Header: "Place Fell Ill",
        accessor: "placeFellIll",
      },

      {
        Header: "Hospital Name",
        accessor: "hospitalName",
      },

      {
        Header: "From Period",
        accessor: "fromPeriod",
      },

      {
        Header: "To Period",
        accessor: "toPeriod",
      },

      {
        Header: "Medical Test Name",
        accessor: "medicalTestName",
      },

      {
        Header: "Amount Claimed",
        accessor: "amountClaimed",
      },

      {
        Header: "Approval Amount",
        accessor: "amountPassed",
      },
      {
        Header: "Payment Auth No",
        accessor: "paymentAuthorityNo",
      },
      {
        Header: "Payment Auth Date",
        accessor: "paymentAuthorityDate",
      },
      {
        Header: "Payment Auth  Amount",
        accessor: "paymentAuthorityAmount",
      },

      {
        Header: "Qe",
        accessor: "qe",
      },

      {
        Header: "Record Status",
        accessor: "recordStatus",
      },

      {
        Header: "Rejection Reason",
        accessor: "rejectionReason",
      },

      {
        Header: "Auditor Date",
        accessor: "auditorDate",
      },

      {
        Header: "Aao Date",
        accessor: "aaoDate",
      },

      {
        Header: "Ao Date",
        accessor: "aoDate",
      },

      {
        Header: "Approved",
        accessor: "approved",
      },

      {
        Header: "Remarks",
        accessor: "sectionRemarks",
      },
    ],
    [data]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputText);
    setSearch(inputText);
  };

  const handleKeyPress = (event) => {
    // look for the `Enter` keyCode
    if (event.keyCode === 13 || event.which === 13) {
      handleSubmit(event);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-2 ml-4">
          <div className="text-red-500">{mesg}</div>
          <h1 className="text-xl font-semibold">Medical Claims</h1>
          <div className="flexContainer">
            <div>
              <input
                type="text"
                name="search"
                onChange={(e) => setInputText(e.target.value)}
                placeholder="armyNo"
                onKeyPress={handleKeyPress}
                className="pl-2 -ml-2 inputField flex-initial"
              />
            </div>
            <div>
              <input
                type="text"
                name="dakId"
                placeholder="dakid"
                onBlur={(e) => setDakId(e.target.value)}
                className="pl-2 -ml-2 inputField flex-initial"
              />
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              className="w-16 m-0 p-0"
            >
              Search
            </button>
          </div>
        </div>
      </main>
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="-mt-2 max-h-1 py-0">
          {loading && (
            <>
              <div class="flex justify-center items-center">
                <div
                  class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </>
          )}
          <Table columns={columns} data={data} className="table-auto" />
        </div>
      </main>
    </div>
  );
}

export default withRouter(CbillMedicalList);
