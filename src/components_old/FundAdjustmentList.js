/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 18 April 2022
 *
 * Modified By : 
 */

import { useState, useEffect, useMemo } from 'react';
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { withRouter, Link } from "react-router-dom";

function FundAdjustmentList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	const [usrLevel, setUsrLevel]=useState('');
	
	const [mesg,setMesg]=useState('');

	useEffect(() => {
		let fetching = false;
		let record='';
		async function fetchData() {
			if(!fetching)
			await axios.get('/fundAdjustments?search='+search)
				.then((response) => {
					setData(response.data);
					record=response.data[0];
					console.log(">>>>>>Usr Level-----:" + record);
					console.log(">>>>>>Usr Level-----:" + response.data[0].usrLevel);
					setUsrLevel(response.data[0].usrLevel); 
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


	 async function submit(id) {
		await axios.put(`/fundAdjustments/submitFundAdj/${id}`)
			.then((response) => {
				//console.log(data);
			    setMesg(response.data);
				let updatedRecords = [...data].filter((i) => i.id !== id);
				//console.log(updatedRecords);
				setData(updatedRecords);
				 
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
	
	
	async function approve(id) {
		await axios.put(`/fundAdjustments/approveFundAdj/${id}`)
			.then((response) => {
				setMesg(response.data);
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
					<div>
					 {row.original.action!=null && row.original.action.includes("edit") &&
					<Link to={"/fundAdjustments/" + row.original.id}>
						<button className=" w-16 m-0 p-0 " > Edit </button>
					</Link>
					}
					 
					 {' '}
					{row.original.action!=null && !row.original.action.includes("appro") && !row.original.action.includes("edit") &&
					<button
						className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
						onClick={() => submit(row.original.id)}
					>	Submit 	</button>
					}
						
					{' '}
					{row.original.action!=null && row.original.action.includes("appro") &&
					<button
						className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
						onClick={() => approve(row.original.id)}
					>	Approve 	</button>
					}
					 </div>
					 
					</div>
			)
		},
		{
			Header: "Employee",
			accessor: 'employee.cdaoNo',// Change this
		},
		
		 
		
		{
			Header: "Check Digit",
			accessor: 'checkDigit',
		},
		
		{
			Header: "Nature",
			accessor: 'nature',
		},
		
		{
			Header: "Amount",
			accessor: 'amount',
		},
		
		{
			Header: "Debit Credit",
			accessor: 'debitCredit',
		},
		
		{
			Header: "Interest Amount",
			accessor: 'interestAmount',
		},
		
		{
			Header: "Debit Month",
			accessor: 'debitMonth',
		},
		
		{
			Header: "Debit Year",
			accessor: 'debitYear',
		},
		
		{
			Header: "Month",
			accessor: 'monthEnding',
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
			Header: "Approved",
			accessor: 'approved',
		},
		
		{
			Header: "Record Status",
			accessor: 'recordStatus',
		},
		
		{
			Header: "Reason",
			accessor: 'reason',
		},
		
		{
			Header: "Remarks",
			accessor: 'remarks',
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
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
				<div className="text-red-500">{mesg}</div>
					<h1 className="text-xl font-semibold">Fund Adjustments</h1>
					<div className="flexContainer">
						<input type="text" name="search" 
						onChange={e => setInputText(e.target.value)}
							onKeyPress={handleKeyPress}
							className="pl-2 -ml-2 inputField flex-initial" />
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
						
						
						{usrLevel<=20 &&
						<>
						<div>
							<Link to={"/fundAdjustments/new"}>
								<button className=" w-46 ml-8 p-0 h-6 -mt-2" > Add Fund Adjustment </button>
							</Link>
						</div>
						</>
						}
						<div>
							<Link to={"/fundAdjustments/fundAdj/approved"}>
								<button className=" w-32 ml-8 p-0 h-6 -mt-2" >Approved List </button>
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

export default withRouter(FundAdjustmentList);

