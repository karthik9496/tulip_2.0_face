import { useState, useEffect, useMemo } from 'react';
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { withRouter, Link,useLocation  } from "react-router-dom";

function FundAdjustmentApprovedList() {

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
	
	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			
			if (!fetching)
			console.log(">>>>>>>>>>>>>>>>>>>selectionType");
			  await axios.get(`/fundAdjustments/fundAdj/approved?search=` + search)
					.then((response) => {
						setData(response.data);
						setSelectionType('approved');
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

	}, [update, search,search1]);

 
		 
 
	
	const columns = useMemo(() => [
		 
		 
		
	{
			Header: "Employee",
			accessor: 'employee.cdaoNo',// Change this
		},
		
		 
		
		{
			Header: "Check Digit",
			accessor: 'checkDigit',
		},
		
		{
			Header: "Nature",
			accessor: 'nature',
		},
		
		{
			Header: "Amount",
			accessor: 'amount',
		},
		
		{
			Header: "Debit Credit",
			accessor: 'debitCredit',
		},
		
		{
			Header: "Interest Amount",
			accessor: 'interestAmount',
		},
		
		{
			Header: "Debit Month",
			accessor: 'debitMonth',
		},
		
		{
			Header: "Debit Year",
			accessor: 'debitYear',
		},
		
		{
			Header: "Qe",
			accessor: 'monthEnding',
		},
		
		 
		
		{
			Header: "Auditor Date",
			accessor: 'auditorDate',
		},
		
		{
			Header: "Aao Date",
			accessor: 'aaoDate',
		},
		
		{
			Header: "Ao Date",
			accessor: 'aoDate',
		},
		
	 
		
		{
			Header: "Approved",
			accessor: 'approved',
			Cell: ({ row }) => (
				<div>
				
					 {data[row.index]['approved'] === true ? 'Y' : 'N'}
				</div>
			)
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
		console.log(value);
		setSearch1(value);
	}
	
	 


	const handleKeyPress = (event) => {
		// look for the `Enter` keyCode
		if (event.keyCode === 13 || event.which === 13) {
			handleSubmit(event)
		}
	}

	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
					<h1 className="text-xl font-semibold">Approved Fund Adjustments List</h1>
					<div className="flexContainer">
						<input type="text" name="search" placeholder="Army No"
							onChange={e => setInputText(e.target.value)}
							onKeyPress={handleKeyPress}
							className="pl-2 -ml-2 inputField flex-initial" />
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
						<div>
							<Link to={"/fundAdjustments"}>
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
	);
}

export default withRouter(FundAdjustmentApprovedList);

