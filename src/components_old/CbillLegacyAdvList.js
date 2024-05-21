import { useState, useEffect, useMemo } from 'react';

import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { withRouter, Link } from "react-router-dom";

function CbillLegacyAdvList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');

	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if(!fetching)
			await axios.get('/cbillLegacyAdvs?search='+search)
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
			Header: "Dak-Id",
			accessor: 'advid',
		},
		
		{
			Header: "Trans-Id",
			accessor: 'transid',
		},
		{
			Header: "CdaoNo",
			accessor: 'cdaca',
		},
		{
			Header: "Rank",
			accessor: 'rank',
		},
			{
			Header: "Name",
			accessor: 'name',
		},
		 
		
		 
		
		{
			Header: "Claim Type",
			accessor: 'typeClaim',
		},
		
		{
			Header: "Claim Date",
			accessor: 'claimDate',
		},
		 
		 
		
		{
			Header: "Date Of Move",
			accessor: 'dateofmove',
		},
		
		{
			Header: "Leave From Date",
			accessor: 'leaveFromDate',
		},
		
		{
			Header: "Leave To Date",
			accessor: 'leaveToDate',
		},
		{
			Header: "From Station",
			accessor: 'fromStation',
		},
		
		{
			Header: "To Station",
			accessor: 'toStation',
		},
		{
			Header: "DV No",
			accessor: 'dvno',
		},
		{
			Header: "Amount Claimed",
			accessor: 'amtclaimed',
		},
		{
			Header: "Advance Drawn",
			accessor: 'advDrawn',
		},
		
		{
			Header: "Amount Admitted",
			accessor: 'amtAdmitted',
		},
		
		{
			Header: "Advance Clear Date",
			accessor: 'adrClDt',
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
					<h1 className="text-xl font-semibold">Cbill Legacy Adv Data</h1>
					<div className="flexContainer">
						<input type="text" name="search" placeholder="CDAO No"
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

export default withRouter(CbillLegacyAdvList);

