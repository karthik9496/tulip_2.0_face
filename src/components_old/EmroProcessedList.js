import { useState, useEffect, useMemo } from "react";
import Table, { SelectColumnFilter } from "../utils/Table";
import axios from "axios";

import { withRouter, Link, useLocation,useHistory } from "react-router-dom";
import { BasicLoadingIcon } from "../utils/Icons";

function EmroProcessedList() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const [dakId,setDakId]=useState('');

  const [cdaoNo, setCdaoNo] = useState("");
  const [name, setName] = useState("");
  const [empId, setEmpId] = useState("");
  const [selectionType, setSelectionType] = useState("");
  const location = useLocation();
  const [loading, setLoading] = useState(false);
   
  const [mesg,setMesg]=useState('');
  const [secNameList,setSecNameList]=useState([]);
  const [secName,setSecName]=useState('');
  const [disabled,setDisabled]=useState(false);
  const [pmGenerated,setPmGenerated]=useState('');
  const [dakIdNo,setDakIdNo]=useState('');
  let history = useHistory();

  useEffect(() => {
    let fetching = false;
    async function fetchData() {
      setLoading(true);
      if (!fetching)
      console.log("-------------------------:" + dakId);
          await axios.get("/emros/approvedList")
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
  }, [update]);

  
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
 
  const columns = useMemo(
    () => [
  	 
 	   {
	 
        Header: "DakIdNo-Accounts Section",
        accessor: "dakIdNo",
      },		
	 
      {
	 
        Header: "DakId-Accounts Section",
        accessor: "dakAccountsSec",
      },
       {
	 
        Header: "Audit Section",
        accessor: "auditSection",
      },	
      {
	 
        Header: "Min No",
        accessor: "minNo",
      },
      {
	 
        Header: "Transaction No",
        accessor: "transactionNo",
      },

      {
        Header: "Transaction Date",
        accessor: "transactionDate",
      },

      {
        Header: "Depositor Name",
        accessor: "depositorName",
      },

      {
        Header: "Amount",
        accessor: "amount",
      },

      {
        Header: "Payment Natute",
        accessor: "paymentNature",
      },
       {
        Header: "Emro Office",
        accessor: "emroOffice",
      },
       {
        Header: "Remarks",
        accessor: "remarks",
      },
      {
        Header: "Pm Generated",
        accessor: "pmGenerated",
        Cell: ({ row }) => (
          <div>{data[row.index]["pmGenerated"] === true ? "true" : "false"}</div>
        ),
      },
      {
        Header: "Upload File Name",
        accessor: "uploadFileName",
      },
    ],
    [data]
  );
  
 const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputText);
    setDakId(inputText);
     

  };
  const handleBack =() => {
		history.push("/emros");
	//	setUsrLevel(usrLevel);
	}

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-2 ml-4">
          <h1 className="text-xl font-semibold">Emros Processed List</h1>
           <div className="text-red-500">{mesg}</div>
          <div className="flexContainer">
           		 
							
							<div>	
						<input type="text" name="dakid" placeholder="Dak-Id"
						onChange={e => setDakId(e.target.value)}	
						 
 							className="pl-2 -ml-2 inputField flex-initial" />
							</div>
							 <div>
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
						 </div>

           <div>
						<button className=" w-42 ml-8 p-0 h-6 -mt-2"  onClick={handleBack} >Back to Closing List</button>
						 
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

export default withRouter(EmroProcessedList);
