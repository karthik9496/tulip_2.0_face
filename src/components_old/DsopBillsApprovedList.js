import { useState, useEffect, useMemo } from 'react';
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { withRouter, Link,useLocation  } from "react-router-dom";

function DsopBillsApprovedList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState('');
	const [inputText, setInputText] = useState('');
	const [selectionType,setSelectionType]=useState('');
	 const location=useLocation();
	 const [fileName,setFileName]=useState('');
	const [value, setValue]=useState('');
	const [search1, setSearch1] = useState('');
	const [lightTheme, setLightTheme] = useState(true);
	const [disabled,setDisabled]=useState(false);
	
	useEffect(() => {
		setDisabled(true);
		let fetching = false;
		async function fetchData() {
			
			if (!fetching)
			
			console.log(">>>>>>>>>>>>>>>>>>>selectionType");
			  await axios.get(`/cbillFunds/dsopBills/approved?search=` + search)
					.then((response) => {
						setData(response.data);
						 
						setDisabled(false);
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

	}, [update, search]);

  
	
	const columns = useMemo(() => [
 
		{
			Header: "Dak",
			accessor: 'dak.id', 
				Cell: ({ row }) => (
				<div>
				<div>
				{row.original.dak!==null &&
				<label>Dak_Id:{row.original.dak.id}</label>
				}
				 </div>
				 
				 
				  
				</div>
				
				)
		},
		
		{
			Header: "Officer Name",
			accessor: 'employee.officerName', 
		},

		{
			Header: "Cda No",
			accessor: 'cdaoNo',
		},

		{
			Header: "Check Digit",
			accessor: 'checkDigit',
		},
		{
			Header: "Fund Purpose",
			accessor: 'fundPurpose.purpose',// Change this
		},
		
	 
		
		{
			Header: "Temp Final",
			accessor: 'tempFinal',
		},
		
		{
			Header: "DV No",
			accessor: 'dvNo',
		},
		
		{
			Header: "DP Sheet No",
			accessor: 'dpSheetNo',
		},
		
		{
			Header: "DP Sheet Date",
			accessor: 'dpSheetDate',
		},
		{
			Header: "CMP Date",
			accessor: 'cmpDate',
		},
		{
			Header: "Payment Ref No",
			accessor: 'cmpBatch',
		},
		
		{
			Header: "Total Instalment",
			accessor: 'totalInstalment',
		},
		
		{
			Header: "Rate",
			accessor: 'rate',
		},
		
		{
			Header: "Consolidated Amount",
			accessor: 'consolidatedAmount',
		},
		
		{
			Header: "Approval Amount",
			accessor: 'approvalAmount',
		},
		
		{
			Header: "Reason",
			accessor: 'reason',
		},
		
		{
			Header: "Remarks",
			accessor: 'remarks',
		},
		
		{
			Header: "Special Sanction",
			accessor: 'specialSanction',
		},
		
		{
			Header: "Month Ending",
			accessor: 'monthEnding',
		},
		
		{
			Header: "Recovery Start Date",
			accessor: 'recoveryStartDate',
		},
		
		{
			Header: "Record Status",
			accessor: 'recordStatus',
		},
		
		{
			Header: "Approved",
			accessor: 'approved',
		},
		
  
	], [data])


	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(inputText);
		setSearch(inputText);
		console.log(value);
		setSearch1(value);
	}
	
	const handleAmountPassed = (event) => {
		event.preventDefault();
		//console.log(inputText);
		//setSearch(inputText);
		//console.log(value);
		setSearch1(value);
		setSelectionType('approved');
	}


	const handleKeyPress = (event) => {
		// look for the `Enter` keyCode
		if (event.keyCode === 13 || event.which === 13) {
			handleSubmit(event)
		}
	}

	return (
		<div className={lightTheme ? 'theme-light' : 'theme-dark'} style={disabled ?{pointerEvents: "none",opacity :"0.4"}:{}}>
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
					<h1 className="text-xl font-semibold">Approved Fund Bills</h1>
					<div className="flexContainer">
						<input type="text" name="search" placeholder="Army No"
							onChange={e => setInputText(e.target.value)}
							onKeyPress={handleKeyPress}
							className="pl-2 -ml-2 inputField flex-initial" />
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
						<div>
							<Link to={"/cbillFunds"}>
								<button className=" w-32 ml-8 p-0 h-6 -mt-2" >Pending </button>
							</Link>
						</div>
						 
						 <div>
						 Click on Pending button to go back to Pending List
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
		</div>
	);
}

export default withRouter(DsopBillsApprovedList);

