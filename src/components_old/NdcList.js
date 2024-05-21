import { useState, useEffect, useMemo } from "react";

import Table, { SelectColumnFilter } from "../utils/Table";
import axios from "axios";
import { withRouter, Link, useHistory } from "react-router-dom";
import { BasicLoadingIcon } from "../utils/Icons";

function NdcList() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const [mesg, setMesg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let fetching = false;
    async function fetchData() {
      setLoading(true);
      if (!fetching)
        await axios
          .get("/ndcs?search=" + search)
          .then((response) => {
            setLoading(false);
            setData(response.data);
            /* if (response.data != null) {
              //	console.log(">>>>>Search CdaoNo---:" + response.data.cdaoNo);
              setData(response.data);
            } */
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

  async function approve(id) {
    await axios
      .put(`/ndcs/${id}/approve`)
      .then((response) => {
        setMesg(response.data);
        setData([]);
      })
      .catch((error) => {
        console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });
  }

  async function print(id) {
    await axios
      .get(`/ndcs/printNdc/${id}`)
      .then((response) => {
        //console.log(data);
        const url = window.open(
          `${process.env.REACT_APP_BASE_URL}/files/${response.data}`
        );
      })
      .catch((error) => {
        console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });
  }
  async function submit(id) {
    await axios
      .put(`/ndcs/submit/${id}`)
      .then((response) => {
        //console.log(data);
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

  const columns = useMemo(
    () => [
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div>
            {row.original.action != null &&
              row.original.action.includes("edit") && (
                <Link to={"/ndcs/" + row.original.id}>
                  <button className=" w-16 m-0 p-0 "> Edit </button>
                </Link>
              )}{" "}
            {row.original.action != null &&
              row.original.action.includes("edit") &&
              row.original.recordStatus != null &&
              row.original.recordStatus === "V" && (
                <button
                  className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
                  onClick={() => submit(row.original.id)}
                >
                  {" "}
                  Submit{" "}
                </button>
              )}{" "}
            {row.original.action != null &&
              row.original.action.includes("subm") && (
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
              )}{" "}
            {row.original.recordStatus != null &&
              row.original.recordStatus === "V" && (
                <button
                  className="w-20 m-0 p-0 bg-red-500 hover:bg-red-700 "
                  onClick={() => print(row.original.id)}
                >
                  {" "}
                  Print NDC{" "}
                </button>
              )}
          </div>
        ),
      },

      {
        Header: "CDAONo",
        accessor: "employee.cdaoNo",
      },
      {
        Header: "Dak",
        accessor: "dak.dakidNo",
      },

      {
        Header: "Month",
        accessor: "me", // Change this
      },

      {
        Header: "Outstanding Amount",
        accessor: "amountOutstanding",
      },
      {
        Header: "Ndc Date",
        accessor: "ndcDate",
      },

      {
        Header: "Record Status",
        accessor: "recordStatus",
      },
      {
        Header: "Remarks",
        accessor: "remarks",
      },
      {
        Header: "Reason",
        accessor: "reason",
      },

      /*
		{
			Header: "Login Name",
			accessor: 'loginName',
			Filter: SelectColumnFilter,  // new
			filter: 'includes',
		},
		*/
    ],
    [data]
  );

  const handleKeyPress = (event) => {
    // look for the `Enter` keyCode
    if (event.keyCode === 13 || event.which === 13) {
      handleSubmit(event);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputText);
    setSearch(inputText);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-2 ml-4">
          <h1 className="text-xl font-semibold">NDC List</h1>
          <div className="flexContainer">
            <input
              type="text"
              name="search"
              placeholder="CDAO No"
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
              <Link to={"/ndcs/approvedList"}>
                <button className=" w-32 ml-8 p-0 h-6 -mt-2">Processed </button>
              </Link>
            </div>
          </div>
        </div>
        {mesg}

        {loading ? (
          <div className="flex justify-center items-center fixed top-1/4 w-1/2 z-50">
            <p className="mr-2 text-2xl text-green-600">Fetching Data</p>
            <BasicLoadingIcon className="ml-1 mt-1 h-10 w-10 animate-spin text-green-600" />
          </div>
        ) : (
          <div className="-mt-2 max-h-1 py-0">
            <Table columns={columns} data={data} className="table-auto" />
          </div>
        )}
      </main>
    </div>
  );
}

export default withRouter(NdcList);
