import { useState, useEffect, useMemo } from 'react';

import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { withRouter, Link } from "react-router-dom";

function AllowanceRateList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');

	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if(!fetching)
			await axios.get('/allowanceRates?search='+search)
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
			Header: "Allowance Name",
			accessor: 'allowanceName',
		},
		
		{
			Header: "Sub Allowance Name",
			accessor: 'subAlloawnceName',
		},
		
		{
			Header: "Rank",
			accessor: 'rank.rankName',
		},
		
		{
			Header: "From Date",
			accessor:'fromDate',
		},
		
		{
			Header: "To Date",
			accessor: 'toDate',
		},
		
		{
			Header: "Grade Pay",
			accessor: 'gradePay',
		},
		
		{
			Header: "Rank Pay",
			accessor: 'rankPay',
		},
		
		{
			Header: "City",
			accessor: 'city',
		},
		
		{
			Header: "Pay Start Range",
			accessor: 'payStartRange',
		},
		
		{
			Header: "Pay End Range",
			accessor: 'payEndRange',
		},
		
		{
			Header: "Rate Percentage",
			accessor: 'ratePercentage',
		},
		{
			Header: "Rate Amouont",
			accessor: 'rateAmount',
		},
		
		
		 
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
					<h1 className="text-xl font-semibold">Allowance Rates</h1>
					<div className="flexContainer">
						<input type="text" name="search" 
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

export default withRouter(AllowanceRateList);

