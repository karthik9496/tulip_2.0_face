import { useState, useEffect, useMemo } from "react";

import Table, { SelectColumnFilter } from "../utils/Table";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { BasicLoadingIcon } from "../utils/Icons";

function ManualDtsSettlement() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");

  const [dtsData, setDtsData] = useState([]);
  const [lightTheme, setLightTheme] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let fetching = false;

    async function fetchData() {
      if (!fetching) setLoading(true);
      await axios
        .get(
          "/demandRegisters/manualDtsSettlement/showManualDts?search=" + search
        )
        .then((response) => {
          console.log(">>>>>demand register----:" + response.data);

          setDtsData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
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
  }, [search, update]);

  async function submit(id) {
    console.log(">>>>>Demand Register is----:" + id);
    await axios
      .put(`/demandRegisters/submit/${id}/manualDtsSettle`)
      .then((response) => {
        //console.log(data);

        let updatedRecords = [...data].filter((i) => i.id !== id);
        //console.log(updatedRecords);
        setData(updatedRecords);
        setUpdate(!update); //pcdao
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
      .put(`/demandRegisters/approveDts/${id}/manualDtsSettle`)
      .then((response) => {
        let updatedRecords = [...data].filter((i) => i.id !== id); //pcdao
        //console.log(updatedRecords);
        setData(updatedRecords);
        setUpdate(!update);

        //setData([]);
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
              {row.original.status != null &&
                row.original.status.includes("audSubmit") &&
                row.original.cancellationCharges === 0 && (
                  <button
                    className="w-16 m-0 p-0 bg-green-500 hover:bg-green-700 "
                    onClick={() => submit(row.original.dtsIdForReference)}
                  >
                    {" "}
                    Submit{" "}
                  </button>
                )}

              {row.original.status != null &&
                row.original.status.includes("audSubmit") &&
                row.original.cancellationCharges !== 0 && (
                  <Link
                    to={
                      "/demandRegisters/" +
                      row.original.dtsIdForReference +
                      "/manualDtsSettlementOption"
                    }
                  >
                    <button className="w-16 m-0 p-0 bg-red-500 hover:bg-green-700 ">
                      {" "}
                      Action{" "}
                    </button>
                  </Link>
                )}
            </div>

            <div>
              {row.original.status != null &&
                row.original.status === "aaoSubmit" && (
                  <button
                    className="w-32 m-0 p-0 bg-red-500 hover:bg-gray-700 "
                    onClick={() => submit(row.original.dtsIdForReference)}
                  >
                    {" "}
                    Submit{" "}
                  </button>
                )}{" "}
              {row.original.status != null &&
                row.original.status === "aoSubmit" && (
                  <button
                    className="w-32 m-0 p-0 bg-red-500 hover:bg-red-700 "
                    onClick={() => approve(row.original.dtsIdForReference)}
                  >
                    {" "}
                    Approve{" "}
                  </button>
                )}
            </div>
          </div>
        ),
      },

      {
        Header: "CDAONo",
        accessor: "cdaoNo",
        Cell: ({ row }) => (
          <div>
            <div>
              <label>{row.original.transCdaoNo}</label>
            </div>
          </div>
        ),
      },

      {
        Header: "DakId No",
        accessor: "dtsDakForReference",
        Cell: ({ row }) => (
          <div>
            <div>
              <label>
                DakId of Reference Id:{row.original.dtsDakForReference}
              </label>
            </div>
            <div>
              <label>
                DakId of Transaction Id:{row.original.dtsDakForTransaction}
              </label>
            </div>
          </div>
        ),
      },

      {
        Header: "Link Id",
        accessor: "referenceId",
        Cell: ({ row }) => (
          <div>
            <div>
              <label>Reference Id:{row.original.referenceId}</label>
            </div>
            <div>
              <label>Transaction Id:{row.original.transactionId}</label>
            </div>
          </div>
        ),
      },

      {
        Header: "Journey Station",
        accessor: "journeyStationFrom",
        Cell: ({ row }) => (
          <div>
            <div>
              <label>{row.original.journeyStationFrom}</label>
            </div>
            <div>
              <label>{row.original.journeyStationTo}</label>
            </div>
            <div>
              <label>{row.original.transJourneyStationFrom}</label>
            </div>
            <div>
              <label>{row.original.transJourneyStationTo}</label>
            </div>
          </div>
        ),
      },

      {
        Header: "Amount",
        accessor: "refAmount",
        Cell: ({ row }) => (
          <div>
            <div>
              <label>{row.original.refAmount}</label>
            </div>
            <div>
              <label>{row.original.transAmount}</label>
            </div>
          </div>
        ),
      },

      {
        Header: "Cancellation Charges",
        accessor: "cancellationCharges",
        Cell: ({ row }) => (
          <div>
            <div>
              <label>{row.original.cancellationCharges}</label>
            </div>
          </div>
        ),
      },

      {
        Header: "Cancellation Ground",
        accessor: "cancellationGround",
        Cell: ({ row }) => (
          <div>
            <div>
              <label>{row.original.cancellationGround}</label>
            </div>
          </div>
        ),
      },
    ],
    [dtsData]
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
    <div
      className={lightTheme ? "theme-light" : "theme-dark"}
      style={loading ? { pointerEvents: "none", opacity: "0.8" } : {}}
    >
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="mt-2 ml-4">
            <h1 className="text-xl font-semibold">Manual DTS Settlement</h1>
            <div className="flexContainer">
              <input
                type="text"
                name="search"
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-2 -ml-2 inputField flex-initial"
              />
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-16 m-0 p-0"
              >
                Search
              </button>
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center items-center fixed top-1/4 w-full z-50">
              <p className="mr-2 text-2xl text-green-600">Fetching Data</p>
              <BasicLoadingIcon className="ml-1 mt-1 h-10 w-10 animate-spin text-green-600" />
            </div>
          ) : (
            <div className="-mt-2 max-h-1 py-0">
              <Table columns={columns} data={dtsData} className="table-auto" />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default withRouter(ManualDtsSettlement);
