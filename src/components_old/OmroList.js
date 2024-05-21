import { useState, useEffect, useMemo } from "react";
import Table, { SelectColumnFilter } from "../utils/Table";
import axios from "axios";

import { withRouter, Link, useLocation } from "react-router-dom";
import { BasicLoadingIcon } from "../utils/Icons";

function OmroList() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");

  const [cdaoNo, setCdaoNo] = useState("");
  const [name, setName] = useState("");
  const [empId, setEmpId] = useState("");
  const [selectionType, setSelectionType] = useState("");
  const location = useLocation();
  const [loading, setLoading] = useState(false);
   const [emroAdj,setEmroAdj]=useState(false);
    const [lwssMro,setLwssMro]=useState(false);
  const [lwssMroData,setLwssMroData]=useState([]);
  const [mesg,setMesg]=useState('');

  useEffect(() => {
    let fetching = false;
    async function fetchData() {
      setLoading(true);
      if (!fetching)
        if (selectionType === "approved") {
          await axios
            .get("/omros?filter=approved&search=" + search)
            .then((response) => {
              setLoading(false);
              setData(response.data);
              setSelectionType("pending");
            })
            .catch((error) => {
              setLoading(false);
              //console.log(error);
              //console.log(error.response.status);
              //console.log(error.response.headers);
              if (error.response) setServerErrors(error.response.data.error);
              else setServerErrors(error.Error);
            });
        } else {
          await axios
            .get("/omros?search=" + search)
            .then((response) => {
              setLoading(false);
              setData(response.data);
              setSelectionType("pending");
               if(response.data[0]['dak'].dakType.description.includes('MRO from DD/Cheque')){
				setLwssMro(true);
				setLwssMroData(response.data);
				}
               
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
    }
    fetchData();
    return () => {
      fetching = true;
    };
  }, [update, search]);

   async function submitMro(id) {
	console.log(lwssMro);
	if(lwssMro===false){
    await axios.put(`/omros/${id}/submitMro`)
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
      }else if(lwssMro===true){
	await axios.put(`/omros/mro/dd/aaoSubmit/${id}`)
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
  }
  async function rollbackMro(id) {
    await axios
      .put(`/omros/rollbackMro/${id}`)
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

 async function approveMro(id) {
	if(lwssMro===false){
    await axios.put(`/omros/${id}/approveMro`)
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
      }else if(lwssMro===true){
	await axios.put(`/omros/mro/dd/aoApprove/${id}`)
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
  }
  
  async function remove(id) {
    await axios
      .delete(`/omros/${id}`)
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

  const handleClick = () => {
    let fetching = false;
    async function fetchData() {
      if (!fetching)
        await axios
          .get(`/omros?filter=approved`)
          .then((response) => {
            console.log(response.data);
            setData(response.data);
            setSelectionType("approved");
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
  };
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
            {row.original.action != null &&
              !row.original.action.includes("Subm") &&
              !row.original.action.includes("Appr") && (
                <Link to={"/omros/" + row.original.id}>
                  <button className=" w-16 m-0 p-0 "> Edit </button>
                </Link>
              )}{" "}
            {row.original.action === "Submission by AAO." && <>
              <button
                className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
                onClick={() => submitMro(row.original.id)}
              >
                {" "}
                Submit
              </button>
              {" "}
               <button
                className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
                onClick={() => rollbackMro(row.original.id)}
              >
                {" "}
                Rollback{" "}
              </button>
              
            </>}{" "}
            {(row.original.action === "Approval by AO." && emroAdj===false) && <>
              <button
                className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
                onClick={() => approveMro(row.original.id)}
              >
                {" "}
                Approve
              </button>
              {" "}
              <button
                className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
                onClick={() => rollbackMro(row.original.id)}
              >
                {" "}
                Rollback{" "}
              </button>
            </>} {" "}
            {row.original.reason != null &&
              (row.original.reason.includes("Subm") ||
                row.original.reason.includes("Appr")) && (
                <Link to={"/omros/" + row.original.id + "/viewPm"}>
                  <button className=" w-16 m-0 p-0 "> PM </button>
                </Link>
              )}
          </div>
        ),
      },
      {
        Header: "Dak",
        accessor: "dak.dakidNo", // Change this
      },

      {
        Header: "Officer Name",
        accessor: "employee.officerName", // Change this
        Cell: ({ row }) => (
          <div>
            <label>
            {row.original.employee && <>
              {row.original.employee.officerName}
              <br />
              {row.original.employee.cdaoNo}
              {row.original.employee.checkDigit}
              </>
              }
            </label>
          </div>
        ),
      },

      {
        Header: "Min No",
        accessor: "minNo",
      },

      {
        Header: "MRO Date",
        accessor: "mroDate",
      },

      {
        Header: "MRO Amount",
        accessor: "amount",
      },
       {
        Header: "Item Amount",
        accessor: "itemAmount",
      },
       {
        Header: "Project Code",
        accessor: "projectCode",
      },
      {
        Header: "Adjustment Month",
        accessor: "adjustmentMonth",
      },

      {
        Header: "Record Status",
        accessor: "recordStatus",
      },

      {
        Header: "Reason",
        accessor: "reason",
      },
    ],
    [data]
  );
  
  const columns1 = useMemo(
    () => [
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div>
            {row.original.action != null &&
              !row.original.action.includes("Subm") &&
              !row.original.action.includes("Appr") && (
                <Link to={"/omros/" + row.original.id}>
                  <button className=" w-16 m-0 p-0 "> Edit </button>
                </Link>
              )}{" "}
            {row.original.action === "Submission by AAO." && (
              <button
                className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
                onClick={() => submitMro(row.original.id)}
              >
                {" "}
                Submit{" "}
              </button>
            )}{" "}
            {row.original.action === "Approval by AO." && (
              <button
                className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
                onClick={() => approveMro(row.original.id)}
              >
                {" "}
                Approve{" "}
              </button>
            )}{" "}
            {lwssMro===false && row.original.reason != null &&
              (row.original.reason.includes("Subm") ||
                row.original.reason.includes("Appr")) && (
                <Link to={"/omros/" + row.original.id + "/viewPm"}>
                  <button className=" w-16 m-0 p-0 "> View PM </button>
                </Link>
              )}
          </div>
        ),
      },
      {
        Header: "Dak",
        accessor: "dak.dakidNo", // Change this
      },

      {
        Header: "Officer Name",
        accessor: "employee.officerName", // Change this
        Cell: ({ row }) => (
          <div>
            <label>
            {row.original.employee && <>
              {row.original.employee.officerName}
              <br />
              {row.original.employee.cdaoNo}
              {row.original.employee.checkDigit}
              </>
              }
            </label>
          </div>
        ),
      },
      

       
      {
        Header: "DD/Cheque Amount",
        accessor: "amount",
      },
      {
        Header: "Bank Name",
        accessor: "bankName",
      },
       {
        Header: "DD/Cheque No",
        accessor: "ddChequeNo",
      },
      {
        Header: "DD/Cheque Date",
        accessor: "ddChequeDate",
      },
      {
        Header: "Deposit Type",
        accessor: "depositType",
      },
      {
        Header: "Adjustment Me",
        accessor: "adjustmentMonth",
      },

      {
        Header: "Record Status",
        accessor: "recordStatus",
      },

      {
        Header: "Reason",
        accessor: "reason",
      },
    ],
    [lwssMroData]
  );


  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-2 ml-4">
          <h1 className="text-xl font-semibold">Omros</h1>
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
              <Link to={"/omros/approvedList"}>
                <button className=" w-32 ml-8 p-0 h-6 -mt-2">Processed </button>
              </Link>
            </div>
          </div>

          <div>
            <h1 className="text-xl font-semibold">{location.state}</h1>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center fixed top-1/4 w-full z-50">
            <p className="mr-2 text-2xl text-green-600">Fetching Data</p>
            <BasicLoadingIcon className="ml-1 mt-1 h-10 w-10 animate-spin text-green-600" />
          </div>
        ) : (
          <div className="-mt-2 max-h-1 py-0">
            {lwssMro===false &&
            <Table columns={columns} data={data} className="table-auto" />
            }
            {lwssMro===true &&
             <Table columns={columns1} data={data} className="table-auto" />
            }
          </div>
        )}
      </main>
    </div>
  );
}

export default withRouter(OmroList);
