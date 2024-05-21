import { useState, useEffect, useMemo } from 'react';
import Table, { SelectColumnFilter } from '../utils/Table'  // new
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
//import { Button, ButtonGroup } from 'react-bootstrap';
//import useFetch from '../utils/UseFetch';
//const API_URL = "http://localhost:3000/usrs";

function GrievanceList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);


	useEffect(() => {
		let ignore = false;
		async function fetchData() {
			const result = await axios('/grievances');
			//console.log(result.data);
			if (!ignore) setData(result.data);
		}
		fetchData();
		return () => { ignore = true; }

	}, [update]);


	async function remove(id) {
		await axios.delete(`/grievances/${id}`)
			.then(() => {
				//console.log(data);
				let updatedRecords = [...data].filter((i) => i.id !== id);
				//console.log(updatedRecords);
				setData(updatedRecords);
				setUpdate(!update);
			});
	}


	const columns = useMemo(() => [
		{
			Header: 'Action',
			Cell: ({ row }) => (
				<div>
					<Link to={"/usrs/" + row.original.id}>
						<button
							className=" rounded  pl-2 pr-2  bg-green-500 border-green-1000 hover:bg-green-700 text-white font-bold"
						>
							Edit
              				</button>
					</Link>
					{'    '}
					<button
						className=" rounded  pl-2 pr-2 bg-red-500 hover:bg-red-700 text-white font-bold"
						onClick={() => remove(row.original.id)}
					>
						Delete
              			</button>

				</div>
			)
		},
		{
			Header: "Name",
			accessor: 'usrName',
		},
		{
			Header: "Designation",
			accessor: 'dadDesignation.designationAbbr',
		},
		{
			Header: "Login Name",
			accessor: 'loginName',
		}
		/*
		{
			Header: "Login Name",
			accessor: 'loginName',
			Filter: SelectColumnFilter,  // new
			filter: 'includes',
		},
		*/
	], [remove])

	//const data = React.useMemo(() => getData(), [])
	/*
		return (
			<>
				<h2>Hello React!</h2>
				<div>
					<Table columns={columns} data={data} />
				</div>
			</>
		);
	*/
	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="">
					<h1 className="text-xl font-semibold">Users</h1>
				</div>
				<div className="mt-6 max-h-1">
					<Table columns={columns} data={data} className="table-auto" />
				</div>
			</main>
		</div>
	);
}

export default withRouter(GrievanceList);


