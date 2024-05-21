import { useState, useEffect, useMemo } from 'react';
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { withRouter, Link } from "react-router-dom";

function EmployeeList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');

	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if(!fetching)
			await axios.get('/employees?search='+search)
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

	}, [update, search]);


	async function remove(id) {
		await axios.delete(`/employees/${id}`)
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
			accessor: 'cdaoNo',
		},
		
		{
			Header: "Check Digit",
			accessor: 'checkDigit',
		},
		
		{
			Header: "Ic No",
			accessor: 'icNo',
		},
		
		{
			Header: "Ic Check Digit",
			accessor: 'icCheckDigit',
		},
		
		{
			Header: "Officer Name",
			accessor: 'officerName',
		},
		
		 
		
		{
			Header: "Present Unit",
			accessor: 'presentUnit.unitName',// Change this
		},
		
		 
		 
		
		{
			Header: "Rank",
			accessor: 'rank.rankName',// Change this
		},
		
		 
		{
			Header: "Sus No",
			accessor: 'susNo',
		},
		
		 
		
		{
			Header: "Date Of Birth",
			accessor: 'dateOfBirth',
		},
		
		{
			Header: "Date Of Commission",
			accessor: 'dateOfCommission',
		},
		
		{
			Header: "Fs Due Date",
			accessor: 'fsDueDate',
		},
		
	 
		
		{
			Header: "Pan",
			accessor: 'pan',
		},
		
		{
			Header: "Month Ending",
			accessor: 'monthEnding',
		},
		
		{
			Header: "Current Record",
			accessor: 'currentRecord',
		},
		
		 
		
		{
			Header: "Gender",
			accessor: 'gender',
		},
		
	 
		
		{
			Header: "Record Status",
			accessor: 'recordStatus',
		},
		
		{
			Header: "Old Ic No",
			accessor: 'oldIcNo',
		},
		
		{
			Header: "Old Ic Check Digit",
			accessor: 'oldIcCheckDigit',
		},
		
		{
			Header: "Date Of Reporting",
			accessor: 'dateOfReporting',
		},
		
		
		/*
		{
			Header: "Login Name",
			accessor: 'loginName',
			Filter: SelectColumnFilter,  // new
			filter: 'includes',
		},
		*/
	], [])

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
					<h1 className="text-xl font-semibold">Employees</h1>
					<div className="flexContainer">
						<input type="text" name="search" placeHolder="Search CDAO No., Name"
						onChange={e => setInputText(e.target.value)}
							onKeyPress={handleKeyPress}
							className="pl-2 -ml-2 inputField flex-initial" />
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

export default withRouter(EmployeeList);

