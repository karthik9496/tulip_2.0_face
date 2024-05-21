import { useState, useEffect, useMemo } from "react";
import Table, { SelectColumnFilter } from "../utils/Table"; //
import axios from "axios";

import { withRouter, Link, useLocation } from "react-router-dom";
import App from "../App";
import { includes } from "lodash";

function ProcessedDidsList() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");

  const location = useLocation();
  const [loggedInUsr, setLoggedInUsr] = useState({});

  useEffect(() => {
    setLoggedInUsr(JSON.parse(sessionStorage.getItem("usr")));
    console.log(JSON.parse(sessionStorage.getItem("usr")));
  }, []);

  useEffect(() => {
    let fetching = false;
    async function fetchData() {
      if (true) {
        await axios
          .get("/dids/processed?search=" + search)
          .then((response) => {
            setData(response.data);
            console.log("data", response.data);
          })
          .catch((error) => {
            //console.log(error);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
      }
    }
    fetchData();
    return () => {
      fetching = true;
    };
  }, [update, search]);

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
  const columns = useMemo(
    () => [
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div>
            {row.original.recordStatus === "V" && (
              <div>
                <Link to={"/dids/" + row.original.id}>
                  <button className="w-16 m-0 p-0 bg-red-400 hover:bg-red-700 ">
                    {" "}
                    View{" "}
                  </button>
                </Link>
              </div>
            )}

            {row.original.action === "subm" &&
              row.original.recordStatus === "P" &&
              row.original.aaoDate === null && (
                <div>
                  {/* <button
                    className="w-16 m-0 p-0 bg-green-500 hover:bg-green-700 "
                    onClick={() => submitWithhold(row.original.id)}
                  >
                    {" "}
                    Submit{" "}
                  </button> */}

                  <Link to={"/dids/" + row.original.id}>
                    <button className="w-16 m-0 p-0 bg-red-400 hover:bg-red-700 ">
                      {" "}
                      View{" "}
                    </button>
                  </Link>
                </div>
              )}

            {row.original.action === "approve" &&
              row.original.recordStatus === "P" &&
              row.original.aoDate === null && (
                <div>
                  {/* <button
                    className="w-16 m-0 p-0 bg-green-500 hover:bg-green-700 "
                    onClick={() => approveWithhold(row.original.id)}
                  >
                    {" "}
                    Approve{" "}
                  </button> */}
                  <Link to={"/dids/" + row.original.id}>
                    <button className="w-16 m-0 p-0 bg-red-400 hover:bg-red-700 ">
                      {" "}
                      View{" "}
                    </button>
                  </Link>
                </div>
              )}
          </div>
        ),
      },
      {
        Header: "Dak ID",
        accessor: "dak.dakidNo",
      },

      {
        Header: "Amount",
        accessor: "didsAmount",
      },

      {
        Header: "Dids Number",
        accessor: "didsNo",
      },

      {
        Header: "Created Date",
        accessor: "createdAt",
        Cell: ({ row }) => (
          <label className="text-gray-600">
            {row.original.createdAt.substring(0, 10)}
          </label>
        ),
      },

      {
        Header: "Punch Dates",
        Cell: ({ row }) => (
          <div className="text-xs">
            {row.original.auditorDate != null ? (
              <span className="text-blue-700 font-bold">
                Aud: {row.original.auditorDate}
                <br></br>
              </span>
            ) : (
              ""
            )}
            {row.original.aaoDate != null ? (
              <span className="text-green-700 font-bold">
                AAO: {row.original.aaoDate}
                <br></br>
              </span>
            ) : (
              ""
            )}
            {row.original.aoDate != null ? (
              <span className="text-red-700 font-bold">
                AO: {row.original.aoDate}
              </span>
            ) : (
              ""
            )}
          </div>
        ),
      },
      {
        Header: "Remarks",
        accessor: "remarks",
      },
      {
        Header: "Record Status",
        accessor: "recordStatus",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
    ],
    [data]
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-2 ml-4">
          <h1 className="text-xl font-semibold">DID VOUCHER VIII</h1>

          <div className="flexContainer">
            <input
              type="text"
              name="search"
              placeholder="DID NO"
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
              <Link to={"/dids"}>
                <button className=" w-32 ml-8 p-0 h-6 -mt-2">
                  Pending DIDS
                </button>
              </Link>
            </div>
          </div>
          <div className="-mt-2 max-h-1 py-0">
            <Table columns={columns} data={data} className="table-auto" />
          </div>

          <div>
            <h1 className="text-xl font-semibold">{location.state}</h1>
          </div>
        </div>
      </main>
    </div>
  );
}

export default withRouter(ProcessedDidsList);
