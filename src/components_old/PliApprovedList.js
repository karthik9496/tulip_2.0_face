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
import { withRouter, Link } from "react-router-dom";

function PliApprovedList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	const [policyNo,setPolicyNo]=useState("");
	const [action,setAction]=useState("");
	const [disabled,setDisabled]=useState(false);
	
	useEffect(()=>{
		//
	},[action,setAction])

	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if(!fetching)
			await axios.get('/plis/approvedList?cdaoNo='+search+'&policyNo='+policyNo)
				.then((response) => {
					 	
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

	}, [update, search,policyNo]);


	async function remove(id) {
		await axios.delete(`/plis/${id}`)
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
const updateCheckBoxAll = (e) =>{		   
		let newData=[...data];
		for(var k in newData){
			newData[k].select=e.target.checked;
		}
		setData(newData);		 
	}
	
	const handleCheckBox = index=>(e) =>{
		console.log(e.target.checked+"--"+index);			  
		console.log(e.target.checked);
		let item = data[index];
		 
		item['select'] = e.target.checked;
		let newData = [...data];
		newData[index] = item;
		setData(newData);		 
	}

	const columns = useMemo(() => [
		 
		{
			Header: "Dak",
			accessor: 'dak.dakidNo',// Change this
		},
		{
			Header: "Officer",
			accessor: 'employee',
			Cell: ({ row }) => (
				 
				  <div>
				   {row.original.cdaoNo}{row.original.checkDigit}<br/>
				   {row.original.employee && <>
				    
				    {row.original.employee.rank && <>
				    
				    {row.original.employee.rank.rankName}
				    </>
				    }
				    {'/'}
				    {row.original.employee.officerName}
				    </>
				    }
				  </div>				   
				 
			)
		},
		
		 
		
		{
			Header: "LetterNo",
			accessor: 'letterNo',
		},
		
		{
			Header: "Letter Date",
			accessor: 'letterDate',
		},
		
		 
		
		{
			Header: "Policy No",
			accessor: 'policyNo',
		},
		
		{
			Header: "Commencement Date",
			accessor: 'policyDate',
		},
		
		{
			Header: "Maturity Date",
			accessor: 'maturityDate',
		},
		
		 
		
		{
			Header: "Premium Rate",
			accessor: 'premiumRate',
		},
		
		 
		
		{
			Header: "Month",
			accessor: 'monthEnding',
		},
		
		 
		
		 
		
		{
			Header: "Surrender Date",
			accessor: 'surrenderDate',
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
			Header: "Record Status",
			accessor: 'recordStatus',
		},
		
		{
			Header: "Approved",
			accessor: 'approved',
				Cell: ({ row }) => (
				<div>
				  <div>
				    {row.original.approved && row.original.approved.toString()}
				  </div>				   
				</div>
			)
		},
		
		{
			Header: "Arrears Required",
			accessor: 'arrearsRequired',
		},
		
		{
			Header: "Remarks",
			accessor: 'remarks',
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
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
					<h1 className="text-xl font-semibold">Plis - Approved List</h1>
					<div className="text-red-500">{serverErrors}</div>
					<div className="flexContainer">
					<div>
						<input type="text" name="search" 
						onChange={e => setInputText(e.target.value)} placeholder="cdao no"
							onKeyPress={handleKeyPress}
							className="pl-2 -ml-2 inputField flex-initial" />
							</div>
							<div>
							<input type="text" name="policyNo" placeholder="policy no" onChange={e => setPolicyNo(e.target.value)} />
							</div>
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
						
						 
						 
						 
					</div>					
				</div>
				 <div className="-mt-2 max-h-1 py-0">
					<Table columns={columns} data={data} className="table-auto" />
				</div>
			</main>
		</div>
	);
}

export default withRouter(PliApprovedList);

