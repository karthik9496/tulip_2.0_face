import { useState, useEffect, useMemo } from 'react';
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { withRouter, Link } from "react-router-dom";

function UsrList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);


	useEffect(() => {
		let ignore = false;
		async function fetchData() {
			await axios.get('/usrs')
				.then((response) => {
					if (!ignore) setData(response.data);
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
		return () => { ignore = true; }

	}, [update]);


	async function remove(id) {
		await axios.delete(`/usrs/${id}`)
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
				<div className="leading-none py-0">
					<Link to={"/usrs/" + row.original.id}>
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
			Header: "Usr Name",
			accessor: 'usrName',
		},
		
		{
			Header: "Login Name",
			accessor: 'loginName',
		},
		
		{
			Header: "Account No",
			accessor: 'accountNo',
		},
		
		{
			Header: "Dad Designation",
			accessor: 'dadDesignation.designationAbbr',
		},
		
		{
			Header: "Gender",
			accessor: 'gender',
		},
		
		{
			Header: "Section",
			accessor: 'section.sectionName',
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
			Header: "Phone3",
			accessor: 'phone3',
		},
		
		{
			Header: "Email",
			accessor: 'email',
		},
		
		{
			Header: "Enabled",
			accessor: 'enabled',
		},
		
		{
			Header: "From Date",
			accessor: 'fromDate',
		},
		
		{
			Header: "To Date",
			accessor: 'toDate',
		},
		
		{
			Header: "Passwd",
			accessor: 'passwd',
		},
		
		{
			Header: "Rol Name",
			accessor: 'rolName',
		},
		
		{
			Header: "Last Password Changed Date",
			accessor: 'lastPasswordChangedDate',
		},
		
		{
			Header: "Last Successful Login",
			accessor: 'lastSuccessfulLogin',
		},
		
		{
			Header: "Last Failed Login",
			accessor: 'lastFailedLogin',
		},
		
		{
			Header: "Failed Attempts",
			accessor: 'failedAttempts',
		},
		
		{
			Header: "Last Logged In Ip Address",
			accessor: 'lastLoggedInIpAddress',
		},
		
		{
			Header: "Passwd 1",
			accessor: 'passwd1',
		},
		
		{
			Header: "Passwd 2",
			accessor: 'passwd2',
		},
		
		{
			Header: "Passwd 3",
			accessor: 'passwd3',
		},
		
		{
			Header: "Ip Address Last Successful Login",
			accessor: 'ipAddressLastSuccessfulLogin',
		},
		
		{
			Header: "Ip Address Last Failed Login",
			accessor: 'ipAddressLastFailedLogin',
		},
		
		{
			Header: "Scanned Signature",
			accessor: 'scannedSignature',
		},
		
		{
			Header: "Logged In",
			accessor: 'loggedIn',
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

export default withRouter(UsrList);

