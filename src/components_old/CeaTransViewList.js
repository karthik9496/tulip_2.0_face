import { useState, useEffect, useMemo } from 'react';
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import useDebouncedSearch from '../utils/useDebouncedSearch'

function CeaTransViewList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	
 

	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if(!fetching)
			await axios.get('/ceaTransactions/view?search='+search)
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


	 


	const columns = useMemo(() => [
		 
		{
			Header: "CDA_O_No",
			accessor: 'cdaoNo',
		},
		{
			Header: "From Date",
			accessor: 'periodFrom',
		},
		
		{
			Header: "To Date",
			accessor: 'periodTo',
		},
		{
			Header: "Child Name",
			accessor: 'childName',
		},
		{
			Header: "Academic Yr",
			accessor: 'academicYear',
		},
		{
			Header: "Class",
			accessor: 'className',
		},
		{
			Header: "Record Status",
			accessor: 'recordStatus',
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

	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
					<h1 className="text-xl font-semibold">Cea/Hostel Subsidy Transactions</h1>
					<div className="flexContainer">
						<input type="text" name="search" 
						onChange={e => setInputText(e.target.value)}
							onKeyPress={handleKeyPress} placeholder="cdao no"
							className="pl-2 -ml-2 inputField flex-initial" />
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0" >Search</button>
						 
						</div>					
				</div>
				<div className="-mt-2 max-h-1 py-0">
					<Table columns={columns} data={data} className="table-auto" />
				</div>
			</main>
		</div>
	);
}

export default withRouter(CeaTransViewList);

