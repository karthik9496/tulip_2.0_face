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
import { withRouter, Link, useHistory } from "react-router-dom";
import TablePage from '../utils/TablePage';

function AgiPaymentList() {

	let history = useHistory();
	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	
	const [mesg,setMesg]=useState('');
 
	const [loading, setLoading] = useState(true);
	const [page,setPage]=useState(0);
	const [disabled,setDisabled]=useState(false);
	 
	const [batch,setBatch]=useState('');
	const [amount,setAmount]=useState(0);
	const [count,setCount]=useState(0);
	const [usrLevel,setUsrLevel]=useState(0);
	const [batchNo,setBatchNo]=useState('');
	const [dakIdNo,setDakIdNo]=useState('');
	const [fileName,setFileName]=useState('');
	
	 
	 
	 

	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if(!fetching)
			await axios.get('/miscPayments?search='+search)
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
	 
		 async function fetchUsrLevel() {
	 
		await axios.get(`/miscs/usrLevel`)
			.then((response) => {
				//console.log(data);
				 setUsrLevel(response.data);
			})
			.catch((error) => {
				setDisabled(false);
				console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}

			fetchUsrLevel();
			 
		

	}, []);
	 
	 async function submit(id) {
		await axios.put(`/miscPayments/submitAgi/${id}`)
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
		await axios.put(`/miscPayments/approveAgi/${id}`)
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
	 
	
 
	const columns = useMemo(() => [
		{
			Header: 'Action',
			Cell: ({ row }) => (
					<div>
					 {row.original.action!=null && row.original.action.includes("edit") &&
					<Link to={"/miscPayments/" + row.original.id}>
						<button className=" w-16 m-0 p-0 " > Edit </button>
					</Link>
					}
					{' '}
					 
					 
						
					{' '}
					{row.original.action!=null && row.original.action.includes("submission") &&
					<button
						className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
						onClick={() => submit(row.original.id)}
					>	Submit 	</button>
					}
					
					{' '}
					{row.original.action!=null && row.original.action.includes("approval") &&
					<button
						className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
						onClick={() => approve(row.original.id)}
					>	Approve 	</button>
					}
					  
				</div>
			)
		},
		{
			Header: "DakId No",
			accessor: 'dak.dakidNo',
			 
		},
		{
			Header: "Vendor Name",
			accessor: 'transType',
			 
		},
		{
			Header: "Code Head",
			accessor: 'codeHead',
			 
		},
	   
		
		{
			Header: "Month",
			accessor: 'monthEnding',
			Filter: SelectColumnFilter,   
			filter: 'monthEnding',// Change this
		},
		
		 
		 
		
		{
			Header: "Total Amount",
			accessor: 'amount',
		},
		
		 
		
		{
			Header: "Section Remarks",
			accessor: 'sectionRemarks',
		},
		
		 
		 
		{
			Header: "Dv No",
			accessor: 'dvNo',
		},
		
		{
			Header: "Dv Date",
			accessor: 'dvDate',
		},
		
		{
			Header: "Record Status",
			accessor: 'recordStatus',
		},
		
		 
		
		{
			Header: "Rejection Reason",
			accessor: 'rejectionReason',
		},
		
		{
			Header: "Remarks",
			accessor: 'remarks',
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
	 
	
	 function refreshPage() {
    window.location.reload(false);
  }
	 
return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
					<h1 className="text-xl font-semibold">Misc Payment</h1>
					<div className="text-red-500">{mesg}</div>
					<div className="flexContainer">
				 
										<div>
						<input type="text" name="search" 
						onChange={e => setInputText(e.target.value)} placeholder="agi"
							onKeyPress={handleKeyPress}
							className="w-28 m-0 p-0" />
							</div>
							 
						 
							<div>
						<button type="submit" onClick={handleSubmit} className="w-28 m-0 p-0">Search</button>
						 </div>
						 
						 
						<div>
						{usrLevel<30 &&
							<Link to={"/miscPayments/new"}>
								<button className="w-32 m-0 p-0" > Add Misc Payment </button>
							</Link>
							}
						</div>
						 
						 
					</div>		
					<div className="-mt-2 max-h-1 py-0 ml-0">
				 
					<Table columns={columns} data={data} className="table-auto" />
				  
				 
				</div>		
		 
					 	
				</div>
				 
			</main>
			 
		</div>
	);
}

export default withRouter(AgiPaymentList);

