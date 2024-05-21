import { useState, useEffect, useMemo } from 'react';
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { withRouter, Link } from "react-router-dom";

function UnitList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');

	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if(!fetching)
			await axios.get(`/corpss?search=${search}`)
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
			Header: 'Action',
			Cell: ({ row }) => (
				<div>
					<Link to={"/corpss/" + row.original.id}>
						<button className=" w-16 m-0 p-0 " > Edit </button>
					</Link>
					 
				</div>
			)
		},
		{
			Header: "Corps Code",
			accessor: 'unitCode',
		},
		
		 
		{
			Header: "Corps Name",
			accessor: 'unitName',
		},
		
		 
		{
			Header: "Address1",
			accessor: 'address1',
		},
		
		{
			Header: "Address2",
			accessor: 'address2',
		},
		
		{
			Header: "Address3",
			accessor: 'address3',
		},
		
		{
			Header: "Station",
			accessor: 'station',
		},
		
		{
			Header: "Pin Code",
			accessor: 'pinCode',
		},
		
		{
			Header: "Email",
			accessor: 'email',
		},
		
		{
			Header: "Phone1",
			accessor: 'phone1',
		},
		
		{
			Header: "Phone2",
			accessor: 'phone2',
		},
		
		{
			Header: "Fax",
			accessor: 'fax',
		},
		
		{
			Header: "Co Rank",
			accessor: 'coRank',
		},
		
		{
			Header: "Co Name",
			accessor: 'coName',
		},
		
		 
		{
			Header: "Raised Date",
			accessor: 'raisedDate',
		},
		
		{
			Header: "Closed Date",
			accessor: 'closedDate',
		},
		
		 
		 
		{
			Header: "Record Status",
			accessor: 'recordStatus',
		},
		
		{
			Header: "Approved",
			accessor: 'approved',
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
					<h1 className="text-xl font-semibold">Corps</h1>
					<div className="flexContainer">
						<input type="text" name="search" placeholder=" Name or Code"
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

export default withRouter(UnitList);

