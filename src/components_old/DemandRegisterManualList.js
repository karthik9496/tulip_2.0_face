import { useState, useEffect, useMemo } from 'react';

import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { withRouter, Link } from "react-router-dom";

function DemandRegisterManualList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');

	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if(!fetching)
			await axios.get('/demandRegisters/newDemand/showManual?search='+search)
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


	async function approve(id) {
		await axios.put(`/demandRegisters/approveDemand/${id}`)
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
			Header: 'Action',
			Cell: ({ row }) => (
		<div>
			{row.original.action!=null && row.original.action.includes("edit")   &&
				<Link to={"/demandRegisters/manualDemand/" + row.original.id}>
				<button className=" w-16 m-0 p-0 " > Edit </button>
				</Link>
			}
			 
			{(row.original.action!=null && (row.original.action==='Approval by AAO.' || row.original.action==='Approval by AO.')) &&
				<button
				className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
				onClick={() => approve(row.original.id)}
				>	Approve 	</button>
			}
					
		</div>
		 )
	 },
		 
		{
			Header: "Dak-Id",
			accessor: 'dak.dakidNo',
		},
		
		{
			Header: "CdaoNo",
			accessor: 'employee.cdaoNo',
		},
		
		{
			Header: "Amount",
			accessor: 'amount',
		},
		{
			Header: "Authority No",
			accessor:'authorityNo',
		},
		
		{
			Header: "Authority Date",
			accessor:'authorityDate',
		},
		{
			Header: "Demand Date",
			accessor:'demandDate',
		},
		
		{
			Header: "Demand Month",
			accessor: 'demandMonth',
		},
		
		{
			Header: "Demand Origin",
			accessor: 'demandOrigin',
		},
		
		{
			Header: "Demand Type",
			accessor: 'cdrNo',
		},
		
		{
			Header: "Journey Start Date",
			accessor: 'journeyStartDate',
		},
		
		{
			Header: "Record Status",
			accessor: 'recordStatus',
		},
		{
			Header: "Reason",
			accessor: 'reason',
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
					<h1 className="text-xl font-semibold">Demand Register - Manual</h1>
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

export default withRouter(DemandRegisterManualList);

