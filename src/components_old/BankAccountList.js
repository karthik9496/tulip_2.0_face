/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By :
 */

import { useState, useEffect, useMemo } from "react";
import Table, { SelectColumnFilter } from "../utils/Table"; //
import axios from "axios";
import { withRouter, Link } from "react-router-dom";

function BankAccountList() {
  const [queryParameters, setQueryParameters] = useState(
    new URLSearchParams(window.location.search)
  );
  console.log(queryParameters.get("search"));

  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");

  //   if (queryParameters.get("search")) {
  //     setSearch(queryParameters.get("search"));
  //   }

  useEffect(() => {
    let fetching = false;
    async function fetchData() {
      if (!fetching)
        await axios
          .get("/bankAccounts?search=" + search)
          .then((response) => {
            console.log("bank account list >> ", response.data);
            setData(response.data);
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
  }, [update, search]);

  async function remove(id) {
    await axios
      .delete(`/bankAccounts/${id}`)
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

  async function approve(id) {
    await axios
      .put(`/bankAccounts/${id}/approve`)
      .then(() => {
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
            {row.original.action === "Editable" && (
              <Link to={"/bankAccounts/" + row.original.id}>
                <button className=" w-16 m-0 p-0 "> Edit </button>
              </Link>
            )}{" "}
            {row.original.action === "Disable" && (
              <Link to={"/bankAccounts/" + row.original.id}>
                <button className=" w-16 m-0 p-0 ">Disable </button>
              </Link>
            )}{" "}
            {row.original.action === "Approve" && (
              <Link to={"/bankAccounts/" + row.original.id}>
                <button className=" w-16 m-0 p-0 "> Approve </button>
              </Link>
              // <button
              //   className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
              //   onClick={() => approve(row.original.id)}
              // >
              //   {" "}
              //   Approve{" "}
              // </button>
            )}
          </div>
        ),
      },
      {
        Header: "Dak",
        accessor: "dak.dakidNo", // Change this
      },
      {
        Header: "CDAONo",
        accessor: "employee.cdaoNo",
        //accessor: 'employee.officerName',
      },

      {
        Header: "Bank",
        accessor: "bank.bankName", // Change this
      },

      {
        Header: "Ifsc",
        accessor: "ifsc",
      },

      {
        Header: "Bank Account No",
        accessor: "bankAccountClearText",
      },

      {
        Header: "Remarks",
        accessor: "remarks",
      },

      {
        Header: "Reason",
        accessor: "reason",
      },

      {
        Header: "Account Type",
        accessor: "accountType",
      },

      {
        Header: "Record Status",
        accessor: "recordStatus",
      },
      {
        Header: "Approved",
        accessor: "approved",
        Cell: ({ row }) => (
          <div>{data[row.index]["approved"] === true ? "Y" : "N"}</div>
        ),
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
      <main className=" mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-2 ml-4">
          <h1 className="text-xl font-semibold">Bank Accounts</h1>
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
              <Link to={"/bankAccounts/new"}>
                <button className=" w-40 ml-8 p-0 h-6 -mt-2">
                  {" "}
                  Add Bank Account{" "}
                </button>
              </Link>
            </div>
            {/* <div>
              <Link to={"/bankAccounts?search=pending"}>
                <button className=" w-40 ml-8 p-0 h-6 -mt-2">
                  {" "}
                  Pending Approval{" "}
                </button>
              </Link>
            </div> */}
            <div>
              <button
                className=" w-40 ml-8 p-0 h-6 -mt-2"
                onClick={() => setSearch("pending")}
              >
                {" "}
                Pending Approval{" "}
              </button>
            </div>
          </div>
        </div>
        <div className="-mt-2 max-h-1 py-0">
          <Table columns={columns} data={data} className="table-auto" />
        </div>
      </main>
    </div>
  );
}

export default withRouter(BankAccountList);
