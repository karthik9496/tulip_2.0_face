import { useState, useEffect, useMemo } from "react";

import Table, { SelectColumnFilter } from "../utils/Table";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { BasicLoadingIcon } from "../utils/Icons";

function DemandRegisterList() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Falcon | Demand Register";
    let fetching = false;
    async function fetchData() {
      setLoading(true);
      if (!fetching)
        await axios
          .get("/demandRegisters?search=" + search)
          .then((response) => {
            setLoading(false);
            setData(response.data);
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
  }, [update, search]);

  const columns = useMemo(
    () => [
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div>
            {data[row.index]["settled"] === false &&
              row.original.origin === "DTS" && (
                <Link to={"/demandRegisters/drEdit/dts/" + row.original.drId}>
                  <button className=" w-16 m-0 p-0 "> Edit </button>
                </Link>
              )}
          </div>
        ),
      },

      {
        Header: "Dak-Id",
        accessor: "dakidNo",
        Cell: ({ row }) => (
          <div>
            <div>
              <label>{row.original.dakidNo}</label>
              {/* pcdao -- to show adv_id and trans_id for dts tickets */}
            </div>
            {row.original.advId != null && row.original.advId != "" && (
              <div>
                {/* <label>
                  {row.original.advId}_{row.original.transId}
                </label> */}

                <label>Adv Id: {row.original.advId}</label>
              </div>
            )}
            {row.original.transId != null && row.original.transId != "" && (
              <div>
                {/* <label>
                  {row.original.advId}_{row.original.transId}
                </label> */}

                <label>Trans Id: {row.original.transId}</label>
              </div>
            )}
          </div>
        ),
      },

      {
        Header: "CdaoNo",
        accessor: "cdaoNo",
      },

      {
        Header: "Demand Amount",
        accessor: "amount",
        Cell: ({ row }) => (
          <div>
            <label>Amount: {row.original.amount}</label>
            {row.original.penalAmt && (
              <label>Penal Interest: {row.original.penalAmt}</label>
            )}
          </div>
        ),
      },

      /* {
        Header: "Penal Interest",
        accessor: "penalAmt",
      }, */

      {
        Header: "Recovered Amount",
        Cell: ({ row }) => (
          <div>
            {row.original.recoveryDate && row.original.settled && (
              <label>{row.original.amount + row.original.penalAmt}</label>
            )}
          </div>
        ),
      },

      /* {
        Header: "Demand Date",
        accessor: "demandDate",
      }, */

      {
        Header: "Advance Details",
        //accessor: "demandDate",
        Cell: ({ row }) => (
          <div className="text-sm text-black">
            <div>Demand Date: {row.original.demandDate}</div>
            {row.original.dvNo && <div>Dv No: {row.original.dvNo}</div>}
            {row.original.origin && <div>Origin: {row.original.origin}</div>}
          </div>
        ),
      },

      /* {
        Header: "DV No",
        accessor: "dvNo",
      }, */

      /* {
        Header: "Demand Origin",
        accessor: "origin",
      }, */

      {
        Header: "Advance Type",
        accessor: "demandType",
        Filter: SelectColumnFilter,
        filter: "demandType",
      },
      //pcdao 30062022 added below block in single column
      {
        Header: "Journey Details",
        Cell: ({ row }) => (
          <div>
            <div>
              <label>Journey Start Date: {row.original.journeyStartDate}</label>
            </div>
            <div>
              <label>Journey End Date: {row.original.journeyEndDate}</label>
            </div>
            <div>
              <label>Journey Station From: {row.original.stationFrom}</label>
            </div>
            <div>
              <label>Journey Station To: {row.original.stationTo}</label>
            </div>
          </div>
        ),
      },

      {
        Header: "Settled",
        accessor: (row) => (row.settled === true ? "true" : "false"),
        Filter: SelectColumnFilter,
        filter: "settled",
        Cell: ({ row }) => (
          <div>
            {row.original.settled && (
              <div>
                Settled : {data[row.index]["settled"] === true ? "Y" : "N"}
              </div>
            )}
            <div>
              {row.original.settlementMonth && row.original.settled && (
                <label>{row.original.settlementMonth}</label>
              )}
            </div>
            <div>
              {row.original.settlementDate && row.original.settled && (
                <label>{row.original.settlementDate}</label>
              )}
            </div>

            <div>
              {row.original.settlementDak && (
                <label>{row.original.settlementDak}</label>
              )}
            </div>

            <div className="break-normal whitespace-normal">
              {row.original.settlementRemarks && row.original.settled && (
                <label>{row.original.settlementRemarks}</label>
              )}
            </div>
            <div>
              {row.original.recoveryDate && row.original.settled && (
                <label>Recovery Date: {row.original.recoveryDate}</label>
              )}
            </div>
          </div>
        ),
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
          <h1 className="text-xl font-semibold">Demand Register</h1>
          <div className="flexContainer">
            <input
              type="text"
              name="search"
              placeholder="CDAO No, Demand Origin"
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

            <div>
              <Link to={"/demandRegisters/newDemand/showManual"}>
                <button className=" w-36 ml-8 p-0 h-6 -mt-2">
                  Create Demand
                </button>
              </Link>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center fixed top-1/4 w-full z-50">
            <p className="mr-2 text-2xl text-green-600">Fetching Data</p>
            <BasicLoadingIcon className="ml-1 mt-1 h-10 w-10 animate-spin text-green-600" />
          </div>
        ) : (
          <div className="mt-2 max-h-1 py-0">
            <Table columns={columns} data={data} className="table-auto" />
          </div>
        )}
      </main>
    </div>
  );
}

export default withRouter(DemandRegisterList);
