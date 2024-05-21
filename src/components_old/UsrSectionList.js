/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By :
 */

import { useState, useEffect, useMemo } from "react";
import Table, { SelectColumnFilter } from "../utils/Table";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { BasicLoadingIcon } from "../utils/Icons";

function UsrSectionList() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Falcon | User Section";
    let fetching = false;
    async function fetchData() {
      setLoading(true);
      if (!fetching)
        await axios
          .get("/usrSections?search=" + search)
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

  async function remove(id) {
    await axios
      .delete(`/usrSections/${id}`)
      .then(() => {
        //console.log(data);
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
            <Link to={"/usrSections/" + row.original.id}>
              <button className=" w-16 m-0 p-0 "> Edit </button>
            </Link>{" "}
            {/* <button
              className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
              onClick={() => remove(row.original.id)}
            >
              {" "}
              Delete{" "}
            </button> */}
          </div>
        ),
      },
      {
        Header: "User",
        accessor: "usr.usrName", // Change this
      },

      {
        Header: "Account No",
        accessor: "usr.accountNo", // Change this
      },

      {
        Header: "Section",
        accessor: "section.sectionName", // Change this
        Filter: SelectColumnFilter,
      },

      {
        Header: "Designation",
        accessor: "usr.designation.abbr", // Change this
        Filter: SelectColumnFilter,
        filter: (rows, id, filterValue) =>
          rows.filter(
            (row) =>
              row.original.usr.designation.abbr != null &&
              filterValue === row.original.usr.designation.abbr
          ),
      },

      {
        Header: "Boss",
        Cell: ({ row }) => (
          <div className="text-sm text-gray-500">
            {row.original.usrBoss != null ? row.original.usrBoss.usrName : ""}
          </div>
        ),
        accessor: "usrBoss.usrName", // Change this
        /* Filter: SelectColumnFilter,
        filter: (rows, id, filterValue) =>
          rows.filter(
            (row) =>
              row.original.usrBoss != null &&
              filterValue === row.original.usrBoss.usrName
          ), */
      },
      {
        Header: "Boss Designation",
        accessor: "usrBoss.designation.abbr", // Change this
        Filter: SelectColumnFilter,
        filter: (rows, id, filterValue) =>
          rows.filter(
            (row) =>
              row.original.usrBoss?.designation.abbr != null &&
              filterValue === row.original.usrBoss?.designation.abbr
          ),
      },

      {
        Header: "From Date",
        accessor: "fromDate",
      },

      /* {
        Header: "To Date",
        accessor: "toDate",
      },

      {
        Header: "Current Record",
        accessor: "currentRecord",
      }, */

      /* {
        Header: "Created By",
        accessor: "createdBy.id", // Change this
      }, */

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
          <h1 className="text-xl font-semibold">Usr Sections</h1>
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
            <div>
              <Link to={"/usrSections/new"}>
                <button className=" w-32 ml-8 p-0 h-6 -mt-2">
                  {" "}
                  Add Usr Section{" "}
                </button>
              </Link>
            </div>
            <div>
              <Link to={"/usrSection/nonActive"}>
                <button className=" w-32 ml-8 p-0 h-6 -mt-2">
                  {" "}
                  View Non-Active{" "}
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
          <div className="-mt-2 max-h-1 py-2">
            <Table columns={columns} data={data} className="table-auto" />
          </div>
        )}
      </main>
    </div>
  );
}

export default withRouter(UsrSectionList);
