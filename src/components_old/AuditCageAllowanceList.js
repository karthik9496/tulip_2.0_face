/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 18 April 2022
 *
 * Modified By : 
 */

import { useState, useEffect, useMemo } from 'react';
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { format } from 'date-fns'
import { withRouter, Link ,useLocation} from "react-router-dom";

function AuditCageAllowanceList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	const [payCode,setPayCode]=useState('');
	const [loading,setLoading]=useState(false);
	const location=useLocation();
	
	useEffect(()=>{
		console.log(location.state);
	},[])
	useEffect(() => {
		let fetching = false;
		setLoading(true);
		
		 
		 
		async function fetchData() {
			if(!fetching)
			await axios.get('/auditCageAllowances?search='+search+'&payCode='+payCode)
				.then((response) => {
					setData(response.data);
					setLoading(false);
				})
				.catch((error) => {
					//console.log(error);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					if (error.response)
						setServerErrors(error.response.data.error);
					else
						setServerErrors(error.Error);
						
					setLoading(false);
				})
		}
		fetchData();
		return () => { fetching = true; }

	}, [update, search,payCode]);


	async function remove(id) {
		await axios.delete(`/auditCageAllowances/${id}`)
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
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}


	const columns = useMemo(() => [
		 
		  {
			Header: "Cdao No",
			accessor: 'employee.cdaoNo',// Change this
		},
		 {
			Header: "Pay Code",
			accessor: 'payCode.payCode',// Change this
		},
		 
		
		
		{
			Header: "From Date",
			accessor: 'auditCage.fromDate',
			Cell: ({ row }) => (
				<div>
				<div>
				<label>{row.original.auditCage.fromDate && format(new Date(row.original.auditCage.fromDate.toString()),'dd/MM/yyyy')}</label>
				 </div>
				   
				</div>
				
				)
			
		},
		{
			Header: "To Date",
			accessor: 'auditCage.toDate',
			Cell: ({ row }) => (
				<div>
				<div>
				<label>{row.original.auditCage.toDate && format(new Date(row.original.auditCage.toDate.toString()),'dd/MM/yyyy')}</label>
				 </div>
				   
				</div>
				
				)
			
		},
		
		
		
		{
			Header: "Amount",
			accessor: 'amount',
		},
		
		{
			Header: "Cage Do2",
			accessor: 'auditCage.do2.description',// Change this
		},
		
		
		{
			Header: "Do2",
			accessor: 'do2.description',// Change this
		},
		{
			Header: "Casualty Date",
			accessor: 'do2.fromDate',
			Cell: ({ row }) => (
				<div>
				<div>
				<label>{row.original.do2.fromDate && format(new Date(row.original.do2.fromDate.toString()),'dd/MM/yyyy')}</label>
				 </div>
				   
				</div>
				
				)
			
		},
		 
		
		
		/*
		{
			Header: "Login Name",
			accessor: 'loginName',
			Filter: SelectColumnFilter,  // new
			filter: 'includes',
		},
		*/
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

	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
					<h1 className="text-xl font-semibold">Audit Cage Allowances</h1>
					<div className="flexContainer">
					<div>
						<input type="text" name="search" 
						onBlur={e => setInputText(e.target.value)} placeholder="cdaoNo"
							 
							className="pl-2 -ml-2 inputField flex-initial" />
							</div>
							<div>	 
							<input type="text" name="batch" placeholder="payCode"
							className="pl-2 -ml-2 inputField flex-initial"
							onBlur={e => setPayCode(e.target.value)}/>
							</div>
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
						 
					</div>					
				</div>
				<div className="-mt-2 max-h-1 py-0">
				 {loading && <>
						 
						 <div class="flex justify-center items-center">
  <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>
						</>	
						}
					<Table columns={columns} data={data} className="table-auto" />
				</div>
			</main>
		</div>
	);
}

export default withRouter(AuditCageAllowanceList);

