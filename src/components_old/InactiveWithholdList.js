import { useState, useEffect, useMemo } from "react";
import Table, { SelectColumnFilter } from "../utils/Table"; //
import axios from "axios";

import { withRouter, Link, useLocation } from "react-router-dom";

function InactiveWithholdList() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");

  const [selectionType, setSelectionType] = useState("");
  const location = useLocation();
  const [loggedInUsr, setLoggedInUsr] = useState({});

  useEffect(() => {
    setLoggedInUsr(JSON.parse(sessionStorage.getItem("usr")));
    console.log(JSON.parse(sessionStorage.getItem("usr")))
  }, []);



  useEffect(() => {
    let fetching = false;
    async function fetchData() {
      if (!fetching){
          await axios
            .get("/withholdPay/inactive?search=" + search)
            .then((response) => {
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
            Header: "Cdao No",
            accessor:"cdaoNo",
          },
    
          {
            Header: "Officer Name",
            accessor:"employee.officerName",
          },
    
          {
            Header: "Basic Pay",
            Cell: ({ row }) => (
              <div>
                {row.original.basicPay===true?<span className="text-red-500">Y</span>:<span className="text-green-500">N</span>}
              </div>
            )
          },
          {
            Header: "DA",
            Cell: ({ row }) => (
              <div>
                {row.original.da===true?<span className="text-red-500">Y</span>:<span className="text-green-500">N</span>}
              </div>
            )
          },
    
          {
            Header: "MSP",
            Cell: ({ row }) => (
              <div>
                {row.original.msp===true?<span className="text-red-500">Y</span>:<span className="text-green-500">N</span>}
              </div>
            )
      },
        {
        Header: "Percentage",
        accessor:"withholdPercentage",
      },
           {
        Header: "Amount",
        accessor:"amount",
      },

    
          {
            Header: "Approved", Cell: ({ row }) => (
              <div>
                {row.original.approved===true?<span className="text-red-500">Approved</span>:<span className="text-green-500">Not Approved</span>}
              </div>
            )
          },
    
          {
            Header: "From Date",
            accessor:"fromDate",
          },
    
          {
            Header: "To Date",
            accessor:"toDate",
          },
          {
            Header: "Punch Dates",
            Cell: ({ row }) => (
              <div className="text-xs">
                {row.original.auditorDate!=null?<span className="text-blue-700 font-bold">Aud: {row.original.auditorDate}<br></br></span>:""}
                {row.original.aaoDate!=null?<span className="text-green-700 font-bold">AAO: {row.original.aaoDate}<br></br></span>:""}
                {row.original.aoDate!=null?<span className="text-red-700 font-bold">AO: {row.original.aoDate}</span>:""}
              </div>
            )
          },
          {
            Header: "Remarks",
            accessor:"remarks",
          },
          {
            Header: "Record Status",
            accessor:"recordStatus",
          },
     
    ],
    [data]
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-2 ml-4">
          <h1 className="text-xl font-semibold">Inactive Withholds</h1>
          <div className="flexContainer">
            <input
              type="text"
              name="search"
              placeholder="CDAO NO"
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-2 -ml-2 inputField flex-initial"
            />
            

            <div>
              <Link to={"/withholdPay"}>
                <button className=" w-32 ml-8 p-0 h-6 -mt-2">Active </button>
              </Link>
            </div>

            
          </div>

          <div>
            <h1 className="text-xl font-semibold">{location.state}</h1>
          </div>
        </div>

        <div className="-mt-2 max-h-1 py-0">
          <Table columns={columns} data={data} className="table-auto" />
       
        </div>
      </main>
    </div>
  );
}

export default withRouter(InactiveWithholdList);
