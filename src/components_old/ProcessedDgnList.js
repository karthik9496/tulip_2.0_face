import { useState, useEffect, useMemo } from "react";
import Table, { SelectColumnFilter } from "../utils/Table"; //
import axios from "axios";

import { withRouter, Link, useLocation } from "react-router-dom";
import TableCopy from "../utils/TableCopy";

function ProcessedDgnList() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [selectionType, setSelectionType] = useState("");
  const location = useLocation();
  const [loggedInUsr, setLoggedInUsr] = useState({});

  useEffect(() => {
    setLoggedInUsr(JSON.parse(sessionStorage.getItem("usr")));
    console.log(JSON.parse(sessionStorage.getItem("usr")));
  }, []);

  useEffect(() => {
    let fetching = false;
    async function fetchData() {
      if (!fetching) {
        handleProcessedSubmit();
      }
    }
    fetchData();
    return () => {
      fetching = true;
    };
  }, [update, search]);

  const handleProcessedSubmit = async () => {
    await axios
      .get(
        `/dgn/processed?search=${search}&fromDate=${fromDate}&toDate=${toDate}`
      )
      .then((response) => {
        console.log("dgn processed data >> ", response.data);
        setData(response.data);
        setSelectionType("pending");
      })
      .catch((error) => {
        //console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });
  };

  const handleSubmit = (event) => {
    // event.preventDefault();
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
            <Link to={"/dgns/" + row.original.dak.id}>
              <button className=" w-16 m-0 p-0 "> View </button>
            </Link>
          </div>
        ),
      },
      {
        Header: "Dak Id No",
        accessor: "dak.dakidNo",
      },
      {
        Header: "Cda No",
        accessor: "cdaoNo",
      },
      {
        Header: "Cdao No",
        accessor: "employee.cdaoNo",
      },
      {
        Header: "IC No",
        accessor: "employee.icNo",
      },

      {
        Header: "Officer Name",
        accessor: "employee.officerName",
      },

      {
        Header: "Promotion Rank",
        accessor: "rank.rankName",
      },
      {
        Header: "Promotion Date",
        accessor: "promotDate",
      },

      {
        Header: "Corps",
        accessor: "corps.unitName",
      },

      {
        Header: "Dgn Authority",
        accessor: "dgnAuthority",
      },

      {
        Header: "Dgn Date",
        accessor: "dgnDate",
      },
    ],
    [data]
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-2 ml-4">
          <h1 className="text-xl font-semibold">Processed DGN</h1>
          <div className="flexContainer">
            <div className="m-0">
              <label>Cdao No / Dak No</label>
              <input
                className="pl-2 w-60"
                type="text"
                name="search"
                placeholder="Cdao No or Dak Id or mm/yyyy"
                onChange={(e) => {
                  setInputText(e.target.value);
                  console.log(e.target.value);
                }}
                onKeyPress={handleKeyPress}
              />
            </div>
            <div className="m-0">
              <label>From Date</label>
              <input
                className="pl-2 w-60"
                type="date"
                name="fromDate"
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="m-0">
              <label>To Date</label>
              <input
                className="pl-2 w-60"
                type="date"
                name="toDate"
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            <div className="m-0">
              <button
                className="m-0 px-2"
                onClick={() => {
                  handleProcessedSubmit();
                  // handleSubmit();
                }}
              >
                Search
              </button>
            </div>
            <div>
              <Link to={"/dgns"}>
                <button className=" w-32 ml-8 p-0 h-6 -mt-2">
                  Pending DGNs
                </button>
              </Link>
            </div>

            {loggedInUsr?.designation?.designationLevel < 30 ? (
              <div>
                <Link to={"/dgns/new"}>
                  <button className=" bg-red-500 hover:bg-red-600 w-32 ml-8 p-0 h-6 -mt-2">
                    Add Dgn
                  </button>
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>

          <div>
            <h1 className="text-xl font-semibold">{location.state}</h1>
          </div>
        </div>

        <div className="-mt-2 max-h-1 py-0">
          <TableCopy columns={columns} data={data} className="table-auto" />
        </div>
      </main>
    </div>
  );
}

export default withRouter(ProcessedDgnList);
