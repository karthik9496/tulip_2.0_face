import { useState, useEffect, useMemo } from "react";
import Table, { SelectColumnFilter } from "../utils/Table";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import useDebouncedSearch from "../utils/useDebouncedSearch";
import { BasicLoadingIcon } from "../utils/Icons";

function FamilyDetailList() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [mesg, setMesg] = useState(" ");

  useEffect(() => {
    let fetching = false;
    async function fetchData() {
      setLoading(true);
      if (!fetching)
        await axios
          .get("/familyDetails?search=" + search)
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

 

  async function submit(id) {
    await axios
      .put(`/familyDetails/submit/${id}`)
      .then((response) => {
        console.log(data);
        setMesg(response.data);
        let updatedRecords = [...data].filter((i) => i.id !== id);
        console.log(updatedRecords);
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
  async function approve(id) {
    await axios
      .put(`/familyDetails/approve/${id}`)
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
  async function rollback(id) {
    await axios
      .put(`/familyDetails/rollback/${id}`)
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
      // {
      //   Header: "Action",
      //   Cell: ({ row }) => (
      //     <div>
      //       <Link to={"/familyDetails/" + row.original.id}>
      //         <button className=" w-16 m-0 p-0 "> Edit </button>
      //       </Link>{" "}
      //       {/* <button
      //         className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
      //         onClick={() => remove(row.original.id)}
      //       >
      //         {" "}
      //         Delete{" "}
      //       </button> */}
      //     </div>
      //   ),
      // },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div>
            <div>
              {row.original.action != null &&
                row.original.action.includes("edit") && (
                  <Link to={"/familyDetails/" + row.original.id}>
                    <button className=" w-16 m-0 p-0 "> Edit </button>
                  </Link>
                )}{" "}
              {row.original.action != null &&
                !row.original.action.includes("approve") &&
                !row.original.action.includes("edit") && (
                  <button
                    className="w-16 m-0 p-0 bg-green-800 hover:bg-red-700 "
                    onClick={() => submit(row.original.id)}
                  >
                    {" "}
                    Submit{" "}
                  </button>
                )}{" "}
              {row.original.action != null &&
                row.original.action.includes("approve") && (
                  <button
                    className="w-20 m-0 p-0 bg-green-500 hover:bg-red-700 "
                    onClick={() => approve(row.original.id)}
                  >
                    {" "}
                    Approve{" "}
                  </button>
                )}
              {row.original.action != null &&
                row.original.action.includes("approve") && (
                  <button
                    className="w-20 m-2 p-0 bg-red-500 hover:bg-red-700 "
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
        Header: "CDA_O_No",
        accessor: "cdaoNo",
      },
      {
        Header: "Name of Member",
        accessor: "nameOfMember",
      },

      {
        Header: "Date of Birth",
        accessor: "dateOfBirth",
      },
      {
        Header: "Relation",
        accessor: "relation.relationName",
      },
      {
        Header: "Dependent",
        accessor: "dependant",
        //    Filter: SelectColumnFilter,
        //  filter: "includes",
        Cell: ({ row }) => (
          <div>
            {row.original.dependant === true ? <span className="text-green-800">Dependent</span> : <span className="text-red-800">Not Dependent</span>}
          </div>
        )
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
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-2 ml-4">
          <h1 className="text-xl font-semibold">Family Detail</h1>
          <div className="flexContainer">
            <input
              type="text"
              name="search"
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="cdao no"
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
              <Link to={"/familyDetails/new/"}>
                <button className=" w-44 ml-8 p-0 h-6 -mt-2">
                  {" "}
                  Create Family Detail{" "}
                </button>
              </Link>
            
            </div>
          </div>
        </div>
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

export default withRouter(FamilyDetailList);
