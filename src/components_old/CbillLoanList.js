import { useState, useEffect, useMemo } from 'react';
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { withRouter, Link } from "react-router-dom";

function CbillLoanList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	
	const [search, setSearch] = useState('');
	const [inputText, setInputText] = useState('');

	const [cdaoNo, setCdaoNo] = useState('');
	const [name, setName] = useState('');
	const [empId, setEmpId] = useState('');
	
	
	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if (!fetching)
			await axios.get('/cbillLoans?search='+search)
				.then((response) => {
					console.log("&&&&&:"+ response.data);
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
		await axios.delete(`/cbillLoans/${id}`)
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
	const columns = useMemo(() => [
		{
			Header: 'Action',
			Cell: ({ row }) => (
				<div>
					<Link to={"/cbillLoans/" + row.original.id}>
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
			Header: "Dak",
			accessor: 'dak.dakidNo',// Change this
		},
		
		{
			Header: "Officer Name",
			accessor: 'employee.officerName',// Change this
		},

		{
			Header: "Cda No",
			accessor: 'employee.cdaoNo',
		},

		{
			Header: "Check Digit",
			accessor: 'employee.checkDigit',
		},
		{
			Header: "Sanction No",
			accessor: 'sanctionNo',// Change this
		},
		
	 	{
			Header: "Sanction Date",
			accessor: 'sanctionDate',// Change this
		},
		
		{
			Header: "Loan Description",
			accessor: 'loanCode.loanName',
		},
		
		{
			Header: "Sanction Amount",
			accessor: 'sanctionAmount',
		},
		
		 
		
		{
			Header: "Month Ending",
			accessor: 'monthEnding',
		},
		
		 
		
		{
			Header: "Record Status",
			accessor: 'recordStatus',
		},
		
		{
			Header: "Approved",
			accessor: 'approved',
		},
		
  
	], [data])


	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="">
					<h1 className="text-xl font-semibold">Cbill Loans</h1>
					<div className="flexContainer">
						<input type="text" name="search" 
						onChange={e => setInputText(e.target.value)}
							onKeyPress={handleKeyPress}
							className="pl-2 -ml-2 inputField flex-initial" />
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
				</div>
				</div>
				<div className="mt-6 max-h-1">
					<Table columns={columns} data={data} className="table-auto" />
				</div>
			</main>
		</div>
	);
}

export default withRouter(CbillLoanList);

