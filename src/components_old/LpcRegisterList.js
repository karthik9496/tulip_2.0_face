/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 18 April 2022
 *
 * Modified By : 
 */

import { useState, useEffect, useMemo} from 'react';
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { withRouter, Link,useHistory } from "react-router-dom";
//import TablePage from '../utils/TablePage';

 

function LpcRegisterList() {
	
	let history = useHistory();

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	
 
	const [usrLevel,setUsrLevel]=useState(0);
	const [fs,setFs]=useState(false);
	 
	 
	 
	 
	
	 

	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if(!fetching)
			
			await axios.get(`/lpcRegisters/fsOption?search=`+search)
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

 	 
	useEffect(() => {
		let fetching = false;
		async function fetchUsrData() {
			if(!fetching)
			console.log(">>>>Usr Level is -----:" + usrLevel);
			await axios.get(`/lpcRegisters/userDesg`)
				.then((response) => {
					console.log(">>>>Usr Level is----:" + response.data);
					setUsrLevel(response.data);
					
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
		fetchUsrData();
		return () => { fetching = true; }

	}, []);
	 
 
	 
	
	async function cancel(id) {
		await axios.put(`/lpcRegisters/cancelFsEntry/${id}`)
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
					 {row.original.action!=null && row.original.action.includes("edit") &&
					<Link to={"/lpcRegisters/" + row.original.id}>
						<button className=" w-16 m-0 p-0 " > Edit </button>
					</Link>
					}
					{' '}
					 {row.original.ecsGenerated!=null && row.original.ecsGenerated===false &&
					 row.original.cancelled===false  && row.original.usrLevel > 30 &&
					 
						<button
						className="w-16 m-0 p-0 bg-red-500 hover:bg-green-700 "
						onClick={() => cancel(row.original.id)}
					>	Cancel 	</button>
					 
					}
					 
					  
				 
					 </div>
			)
		},
		 
		
		{
			Header: "Cdao No",
			accessor: 'employee.cdaoNo', 
		},
		
		{
			Header: "Check Digit",
			accessor: 'employee.checkDigit',
		},
		
		{
			Header: "Officer Name",
			accessor: 'employee.officerName', 
		},
		
		{
			Header: "Stop Pay Description",
			accessor: 'stopPayDescription',
		},
		
		
		{
			Header: "Qe",
			accessor: 'qe',
			Filter: SelectColumnFilter,   
			filter: 'qe',
		},
		
		{
			Header: "Discharge Date",
			accessor: 'dischargeDate',
			Filter: SelectColumnFilter,   
			filter: 'dischargeDate',
		},
		
		{
			Header: "Record Status",
			accessor: 'recordStatus',
		},
		
			{
			Header: "Entry Approved",
			accessor: 'entryApproved',
			Cell: ({ row }) => (
				<div>
				
					 {data[row.index]['entryApproved'] === true ? 'Y' : 'N'}
				</div>
			)
		},
		
		{
			Header: "Fs Approved",
			accessor: 'fsApproved',
			Cell: ({ row }) => (
				<div>
				
					 {data[row.index]['fsApproved'] === true ? 'Y' : 'N'}
				</div>
			)
		},
		
		 
		
		
		{
			Header: "Rejection Reason",
			accessor: 'rejectionReason',
		},
		 
		{
			Header: "Entry Auditor Date",
			accessor: 'entryAuditorDate',
		},
		
		{
			Header: "Entry Aao Date",
			accessor: 'entryAaoDate',
		},
		
		{
			Header: "Entry Ao Date",
			accessor: 'entryAoDate',
		},
		
		{
			Header: "Cancelled",
			accessor: 'cancelled',
			Cell: ({ row }) => (
				<div>
				
					 {data[row.index]['cancelled'] === true ? 'Y' : 'N'}
				</div>
			)
		},
		
		 
		
		{
			Header: "Cancelled Ao Date",
			accessor: 'cancelledAoDate',
		},
	 
		
		{
			Header: "Whether Misc Fs",
			accessor: 'whetherMiscFs',
			Cell: ({ row }) => (
				<div>
				
					 {data[row.index]['cancelled'] === true ? 'Y' : 'N'}
				</div>
			)
		},
		 
		
		
		 
	], [data])
	
	 
	 
	const handleBack =() => {
		history.push("/lpcRegisters");
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
	
	return (
		 
		<div className="min-h-screen bg-gray-100 text-gray-900">
		<h1 className="text-xl font-semibold">Final Settlement Register Module</h1>
		<br/>
		<br/>
		 
		 	<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
					
		
					<div className="flexContainer">
					{usrLevel<30 && <>
						<input type="text" name="search" 
						onChange={e => setInputText(e.target.value)}
							onKeyPress={handleKeyPress}
							className="pl-2 -ml-2 inputField flex-initial" />
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
						</>
						}
						{usrLevel<30  &&
						<div>
							<Link to={"/lpcRegisters/new"}>
								<button className=" w-36 ml-8 p-0 h-6 -mt-2" > Add Fs </button>
							</Link>
						</div>
						}
						 
						 
						{usrLevel===30  &&
						<div>
							<Link to={"/lpcRegisters/entryApprovalList"}>
								<button className=" w-36 ml-8 p-0 h-6 -mt-2" > Approval </button>
							</Link>
						</div>
						}
					 
						<div>
							<Link to={"/lpcRegisters/fsentryApprovedList"}>
								<button className=" w-46 ml-8 p-0 h-6 -mt-2" > Fs Entry Approved List </button>
							</Link>
						</div>
						
						 
					</div>		
						
				</div>
				
				 {usrLevel<30 &&
				<div className="-mt-2 max-h-1 py-0">
					<Table columns={columns} data={data} className="table-auto" />
				</div>
				 }
			</main>
			
			 
				 
		</div>
	 
	);
}

export default withRouter(LpcRegisterList);

