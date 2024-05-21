import { useState, useEffect, useMemo } from "react";
import Table, { SelectColumnFilter } from "../utils/Table";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { BasicLoadingIcon } from "../utils/Icons";

function UsrList() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Falcon | User List";
    let fetching = false;
    async function fetchData() {
      setLoading(true);
      if (!fetching)
        await axios
          .get("/usrs?search=" + search)
          .then((response) => {
            setLoading(false);
            console.log(response.status);
            setData(response.data);
            setValid(true);
          })
          .catch((error) => {
            setLoading(false);
            //console.log(error);
            console.log(error.response.status);
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

  async function disable(id) {
    await axios
      .put(`/usrs/${id}/disableUsr`)
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
  async function remove(id) {
    await axios
      .delete(`/usrs/${id}`)
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
            <Link to={"/usrs/" + row.original.id}>
              <button className=" w-16 m-0 p-0 "> Edit </button>
            </Link>{" "}
            <button
              className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
              onClick={() => disable(row.original.id)}
            >
              {" "}
              Disable{" "}
            </button>{" "}
            <Link to={"/usrs/" + row.original.id + "/rols"}>
              <button className=" w-16 m-0 p-0 "> Roles </button>
            </Link>{" "}
            <Link to={"/usrs/" + row.original.id + "/password"}>
              <button className=" w-20 m-0 p-0 "> Password </button>
            </Link>
          </div>
        ),
      },

      {
        Header: "Enabled",
        accessor: "enabled",
        Cell: ({ row }) => (
          <div>{data[row.index]["enabled"] === true ? "Y" : "N"}</div>
        ),
      },

      {
        Header: "Usr Name",
        accessor: "usrName",
      },

      {
        Header: "Login Name",
        accessor: "loginName",
      },

      {
        Header: "Account No",
        accessor: "accountNo",
      },

      {
        Header: "Designation",
        accessor: "designation.abbr", // Change this
        Filter: SelectColumnFilter,
        filter: (rows, id, filterValue) =>
          rows.filter(
            (row) =>
              row.original.designation.abbr != null &&
              filterValue === row.original.designation.abbr
          ),
      },

      {
        Header: "Gender",
        accessor: "gender",
      },

      /* {
        Header: "Section",
        accessor: "section.id", 
      },

      {
        Header: "Phone1",
        accessor: "phone1",
      },

      {
        Header: "Phone2",
        accessor: "phone2",
      },

      {
        Header: "Phone3",
        accessor: "phone3",
      },

      {
        Header: "Email",
        accessor: "email",
      },

      {
        Header: "From Date",
        accessor: "fromDate",
      },

      {
        Header: "To Date",
        accessor: "toDate",
      },

      {
        Header: "Last Password Changed Date",
        accessor: "lastPasswordChangedDate",
      },

      {
        Header: "Last Successful Login",
        accessor: "lastSuccessfulLogin",
      },

      {
        Header: "Last Failed Login",
        accessor: "lastFailedLogin",
      },

      {
        Header: "Failed Attempts",
        accessor: "failedAttempts",
      },

      {
        Header: "Last Logged In Ip Address",
        accessor: "lastLoggedInIpAddress",
      },

      {
        Header: "Ip Address Last Successful Login",
        accessor: "ipAddressLastSuccessfulLogin",
      },

      {
        Header: "Ip Address Last Failed Login",
        accessor: "ipAddressLastFailedLogin",
      },

      {
        Header: "Scanned Signature",
        accessor: "scannedSignature",
      },

      {
        Header: "Logged In",
        accessor: "loggedIn",
      },

      {
        Header: "Record Status",
        accessor: "recordStatus",
      },

      {
        Header: "Approved",
        accessor: "approved",
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
        <div className="mt-2 -ml-2">
          <h1 className="text-xl font-semibold">Usrs</h1>
          <div className="flexContainer">
            <input
              type="text"
              name="search"
              placeHolder=" Usr Name,Account No,Phone1"
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-2 -ml-2 inputField flex-initial h-6"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-16 m-0 p-0 h-6"
            >
              Search
            </button>
            <div>
              {valid === true && (
                <Link to={"/usrs/new/"}>
                  <button className=" w-20 ml-8 p-0 h-6 -mt-2">
                    {" "}
                    Add User{" "}
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center fixed top-1/4 w-full z-50">
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

export default withRouter(UsrList);
