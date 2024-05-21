import { useState, useEffect, useMemo } from 'react';
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { withRouter, Link } from "react-router-dom";

function UsrListSelf() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	const [valid,setValid]=useState(false);

	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if (!fetching)
				await axios.get('/usrs/self/acct')
					.then((response) => {
						console.log(response.status);
						setData(response.data);
						setValid(true);
					})
					.catch((error) => {
						//console.log(error);
						console.log(error.response.status);
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
					  
					<Link to={"/usrs/self/password"}>
						<button className=" w-20 m-0 p-0 " > Password </button>
					</Link>					
				</div>
			)
		},
		
		{
			Header: "Enabled",
			accessor: 'enabled',
			Cell: ({ row }) => (
				<div>
				
					 {data[row.index]['enabled'] === true ? 'Y' : 'N'}
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
			Header: "Designation",
			accessor: 'designation.abbr',// Change this
		},

		{
			Header: "Gender",
			accessor: 'gender',
		},

		{
			Header: "Section",
			accessor: 'section.id',// Change this
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
			Header: "From Date",
			accessor: 'fromDate',
		},

		{
			Header: "To Date",
			accessor: 'toDate',
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
					<h1 className="text-xl font-semibold">Usrs</h1>
					 
				</div>

				<div className="-mt-2 max-h-1 py-0">
					<Table columns={columns} data={data} className="table-auto" />
				</div>
			</main>
		</div>
	);
}

export default withRouter(UsrListSelf);

