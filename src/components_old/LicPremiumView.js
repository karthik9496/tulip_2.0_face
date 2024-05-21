/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By : 
 */

import { useState, useEffect, useMemo } from 'react';
 
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { withRouter, Link ,useParams, useHistory} from "react-router-dom";
import TablePage from '../utils/TablePage';
 

const LicPremiumView = () => {

	
	 let { id } = useParams();
	 let history = useHistory();
	
	
	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	const [page,setPage]=useState(0);
	const [pageSize, setPageSize] = useState(0);
	const [usrLevel,setUsrLevel]=useState(0);
	const [mesg,setMesg]=useState('');
	const [approved,setApproved]=useState(true);
	const [fileName,setFileName]=useState("");
	const [disabled,setDisabled]=useState(false);
	const [validRec,setValidRec]=useState('');
	const [amount,setAmount]=useState('');
	const [dakidNo,setDakidNo]=useState('');
	const [cdaoNo,setCdaoNo]=useState('');
	const [policyNo,setPolicyNo]=useState('');
	const [policyAmount,setPolicyAmount]=useState('');
	const [premiumAmount,setPremiumAmount]=useState('');
	const [empId, setEmpId] = useState(0);
	const [licDemandsData, setLicDemandsData]=useState([]);
	  

	
	
	 useEffect(() => {
     let fetching = false;
     let unmounted = false;
     async function fetchLicDemandData() {
       	console.log("record id --line 47-- :" + id);
 
       if (!fetching)
         await axios.get(`/licDemandTransactions/${id}/licDemands`)
           .then((response) => {
              setLicDemandsData(response.data);
           })
           .catch((error) => {
             //console.log(error);
             //console.log(error.response.status);
             //console.log(error.response.headers);
             if (error.response) setServerErrors(error.response.data.error);
             else setServerErrors(error.Error);
           });
     }
     fetchLicDemandData();
 
     return () => {
       fetching = true;
       unmounted = true;
     };
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [empId]);
	 
	 const columns = useMemo(() => [
 
          
         {
			Header: "Cdao No",
			accessor: 'cdaoNo',
		},
		
		{
			Header: "Cdao Check Digit",
			accessor: 'employee.checkDigit',
		},
		
		{
			Header: "Officer Name",
			accessor: 'employee.officerName', 
		},
		{
			Header: "Policy No",
			accessor: 'policyNo',
		},
		
		{
			Header: "Premium Amount",
			accessor: 'premiumAmount',
		},
		
		{
			Header: "Premium Due",
			accessor: 'premiumDueMe', 
		},
		 
       ],
       [licDemandsData]
     );
	
	

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(inputText);
		setSearch(inputText);
	}

	const handleKeyPress = (event) => {
		// look for the `Enter` keyCode
		if (event.keyCode === 13 || event.which === 13) {
			handleSubmit(event)
		}
	}
	const handleP = (pp)=>{
		console.log(pp); 
		setPage(pp);
	}
	const handlePageSize = (pp) => {
      console.log(pp);
      setPageSize(pp);
    };
    
    const returnToList =() => {
		history.push("/lics");
	}

	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
					<h1 className="text-xl font-semibold">Lic Premium / Demands Master</h1>
					<div className="text-red-500">{mesg}</div>
					 
	 	
					 
					<div className="-mt-2 max-h-1 py-0 ml-0">
				 
					<TablePage columns={columns} data={licDemandsData} newpage={page} parentCallback={handleP}  newPageSize={pageSize}
              parentCallbackPageSize={handlePageSize}className="table-auto" />
              
              <div>
					 
						 <button className="w-40 m-2 p-0 bg-green-500 hover:bg-green-700"  onClick={returnToList}>Back To Main List</button>
						</div>
				  
				 
				</div>		
				 
				</div>
				
				 
			</main>
			
		</div>
		 
	);
}

export default withRouter(LicPremiumView);

