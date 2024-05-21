import { useState, useEffect, useMemo } from 'react';

import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { withRouter, Link } from "react-router-dom";

function Schedule3List() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState('');
	const [inputText, setInputText] = useState('');
	const [dpSheetNo, setDpSheetNo] = useState('');

	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if(!fetching)
			await axios.get('/schedule3s/reprintDpSheet?search='+search)
			 
				.then((response) => {
					console.log(response.data);
					if(response.data!==null)
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


	const generateDps = (id) => {
	 	console.log("<<<id of Sch3--:" + id);
			axios.get(`/schedule3s/dpSheet/${id}/reprintDpSheet`)
				.then((response) => {
				console.log(data);
				console.log(response.data);
						 const url = window.open(`${process.env.REACT_APP_BASE_URL}/files/${response.data}`);
			})
				.catch((error) => {
				 
					if (error.response)
						setServerErrors(error.response.data);
					else
						setServerErrors(error);
				});
		

		 
	}


	const columns = useMemo(() => [
		{
			Header: 'Action',
			Cell: ({ row }) => (
				<div>
					 
					<button
						className="w-36 m-0 p-0 bg-red-500 hover:bg-red-700 "
						onClick={() => generateDps(row.original.id)}
					>	Reprint Dp Sheet	</button>
				</div>
			)
		}, 
		{
			Header: "Dak-Id",
			accessor: 'dak.dakidNo',
		},
		
		{
			Header: "Section",
			accessor: 'section.section_name',
		},
		
		{
			Header: "Amount",
			accessor: 'schedule3Amount',
		},
		
		{
			Header: "DP Sheet No",
			accessor:'dpSheetNo',
		},
		
		{
			Header: "DP Sheet Date",
			accessor: 'dpSheetDate',
		},
		
		{
			Header: "Section Code",
			accessor: 'sectionCode',
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
					<h1 className="text-xl font-semibold">DP Sheet Reprint</h1>
					<div className="flexContainer">
						<input type="text" name="search" placeholder="Dp Sheet No"
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

export default withRouter(Schedule3List);

