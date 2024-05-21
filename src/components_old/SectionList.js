import { useState, useEffect, useMemo } from 'react';
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { withRouter, Link } from "react-router-dom";

function SectionList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');

	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if(!fetching)
			await axios.get('/sections?search='+search)
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
		await axios.delete(`/sections/${id}`)
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
					<Link to={"/sections/" + row.original.id}>
						<button className=" w-16 m-0 p-0 " > Edit </button>
					</Link>
					{' '}
					<button
						className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
						onClick={() => remove(row.original.id)}
					>	Delete 	</button>
				</div>
			)
		},
		{
			Header: "Section Name",
			accessor: 'sectionName',
		},
		
		{
			Header: "Section Group",
			accessor: 'sectionGroup',
		},
		
		{
			Header: "Dak Group Dest",
			accessor: 'dakGroupDest',
		},
		
		{
			Header: "Dak Group Src",
			accessor: 'dakGroupSrc',
		},
		
		{
			Header: "Dak Entry",
			accessor: 'dakEntry',
		},
		
		{
			Header: "Task Marking At Rsec",
			accessor: 'taskMarkingAtRsec',
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
					<h1 className="text-xl font-semibold">Sections</h1>
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

export default withRouter(SectionList);

