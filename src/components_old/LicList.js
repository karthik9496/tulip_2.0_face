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
import { withRouter, Link } from "react-router-dom";
import TablePage from '../utils/TablePage';
 

function Lic() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	const [page,setPage]=useState(0);
	const [pageSize, setPageSize] = useState(0);
	const[usrLevel,setUsrLevel]=useState(0);
	const[mesg,setMesg]=useState('');
	const[approved,setApproved]=useState(true);
	const[fileName,setFileName]=useState("");
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
		async function fetchData() {
			if(!fetching)
			await axios.get('/lics?cdaoNo='+cdaoNo+'&policyNo='+policyNo)
				.then((response) => {
					console.log(response.data);
					setData(response.data);
					 
				})
				.catch((error) => {
					//console.log(error);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					if (error.response)
						setServerErrors(error.response.data.error);
					else
						setServerErrors(error.Error);
				})
		}
		fetchData();
		return () => { fetching = true; }

	}, [update, cdaoNo,policyNo,policyAmount,premiumAmount]);
	
	  useEffect(() => {
		let fetching = false;
		async function fetchUsrData() {
			if(!fetching)
			console.log(">>>>Usr Level is -----:" + usrLevel);
			await axios.get(`/cbillFunds/userDesg`)
				.then((response) => {
					console.log(">>>>Usr Level is----:" + response.data);
					setUsrLevel(response.data);
					
				})
				.catch((error) => {
					//console.log(error);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					if (error.response)
						setServerErrors(error.response.data.error);
					else
						setServerErrors(error.Error);
				})
		}
		fetchUsrData();
		return () => { fetching = true; }

	}, [data]);
	
	 async function approve(id) {
		await axios.put(`/lics/policyStatusUpdation/approve/${id}`)
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
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}
	 
	 
	const columns = useMemo(() => [
		 	
				 
		{
			Header: 'Action',
			Cell: ({ row }) => (
				 <div>
				 <div>
				 {usrLevel<30 &&
					 <Link to={"/lics/" + row.original.id}>
					<button
						 className="w-30 m-0 p-0 bg-red-500 hover:bg-red-700 "
						 
					>	Policy Updation 	</button>
					</Link>
					
					} 
					</div>
					 {row.original.action!==null && row.original.action==='submission' &&
					<button
						className="w-32 m-0 p-0 bg-red-500 hover:bg-red-700 "
						onClick={() => approve(row.original.id)}
					>	Approve 	</button>
					 
					 }
					 </div>
					 
					) 
			 	 
		},	 
		 
		
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
			accessor: 'employee.officerName',// Change this
		},
		{
			Header: "Policy No",
			accessor: 'policyNo',
		},
		
		{
			Header: "Policy Amount",
			accessor: 'policyAmount',
		},
		
		{
			Header: "Premium Amount",
			accessor: 'premiumAmount',
		},
		
		{
			Header: "Premium Due Me",
			accessor: 'premiumDueMe',// Change this
		},
		 
		
		{
			Header: "Policy Commencement Date",
			accessor: 'policyCommencementDate',// Change this
		},
		{
			Header: "Policy Maturity Date",
			accessor: 'policyMaturityDate',// Change this
		},
		{
			Header: "Last Premium Paid",
			accessor: 'lastPremiumPaidMonth',// Change this
		},
		 {
			Header: "Policy Status",
			accessor: 'policyStatus',
		},
	 
		
		{
			Header: "Record Status",
			accessor: 'recordStatus',
		},
		
		
		
		{
			Header: "Reason",
			accessor: 'reason',
		},
		
		{
			Header: "Remarks",
			accessor: 'remarks',
		},
		
		
		 
	], [data])
	
	

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
    
    //Callback for child components (Foreign Keys)
	const callback = (childData) => {
		//console.log("Parent Callback");
		 
		
		if(childData.fk==='employee')
			setEmpId(childData.entity.id)
		//console.log(errors);
	 
	};

	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
					<h1 className="text-xl font-semibold">Lic Master</h1>
					<div className="text-red-500">{mesg}</div>
					 
					<div className="flexContainer">
					<div>
					<input type="text" name="policyNo" placeholder="policyNo"
						onBlur={e => setPolicyNo(e.target.value)}							
							className="pl-2 -ml-2 inputField flex-initial" />
						</div>
						<div>	
						<input type="text" name="cdaoNo" placeholder="Cdao No"
						onBlur={e => setCdaoNo(e.target.value)}							
							className="pl-2 -ml-2 inputField flex-initial" />
							</div>
							 
							<div>
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
						</div>
						
						{
					 <Link to={"/lics/generateRetireReport"}>
					<button
						 className="w-26 m-0 p-0"
						 
					>	Generate Retirement Report 	</button>
					</Link>
					 }
						 
					</div>		
					 
					<div className="-mt-2 max-h-1 py-0 ml-0">
				 
					<TablePage columns={columns} data={data} newpage={page} parentCallback={handleP}  newPageSize={pageSize}
              parentCallbackPageSize={handlePageSize}className="table-auto" />
				  
				 
				</div>		
				 
				</div>
				
				 
			</main>
			
		</div>
		 
	);
}

export default withRouter(Lic);

