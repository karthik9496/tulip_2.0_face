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
			await axios.get('/units?search='+search)
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
		await axios.delete(`/units/${id}`)
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
					<Link to={"/units/" + row.original.id}>
						<button className=" w-16 m-0 p-0 " > Edit </button>
					</Link>
					 
				</div>
			)
		},
		{
			Header: "Unit Code",
			accessor: 'unitCode',
		},
		
		 	
		
		{
			Header: "Unit Name",
			accessor: 'unitName',
		},
		
		{
			Header: "Sus No",
			accessor: 'susNo',
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
			Header: "Unit Category",
			accessor: 'unitCategory.id',// Change this
		},
		
		{
			Header: "Unit Subarea",
			accessor: 'unitSubarea.id',// Change this
		},
		
		{
			Header: "Unit Brigade",
			accessor: 'unitBrigade.id',// Change this
		},
		
		{
			Header: "Unit Command",
			accessor: 'unitCommand.id',// Change this
		},
		
		{
			Header: "Unit Corps",
			accessor: 'unitCorps.id',// Change this
		},
		
		{
			Header: "Unit Battalion",
			accessor: 'unitBattalion.id',// Change this
		},
		
		{
			Header: "Field Peace",
			accessor: 'fieldPeace',
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
			Header: "Regular Ta",
			accessor: 'regularTa',
		},
		
		{
			Header: "Inter Service",
			accessor: 'interService',
		},
		
		{
			Header: "Para Unit",
			accessor: 'paraUnit',
		},
		
		{
			Header: "Enroll Publish",
			accessor: 'enrollPublish',
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
				
					 {data[row.index]['approved'] === true ? 'Y' : 'N'}
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
					<h1 className="text-xl font-semibold">Units</h1>
					<div className="flexContainer">
						<input type="text" name="search" placeholder=" Name, No., SUS"
						onChange={e => setInputText(e.target.value)}
							onKeyPress={handleKeyPress}
							className="pl-2 -ml-2 inputField flex-initial" />
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button> 
						<div>
							<Link to={"/units/new/"}>
								<button className=" w-32 ml-8 p-0 h-6 -mt-2" > Create Unit</button>
							</Link>
						</div>	
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

