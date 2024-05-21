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

function ItSavingList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	
	const [usrLevel, setUsrLevel]=useState('');
	const [mesg,setMesg]=useState('');

	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if(!fetching)
			await axios.get('/itSavings?search='+search)
				.then((response) => {
					if(response.data[1]!==null){
						setData(response.data[1]);
					}else{
						setMesg(response.data[0]);
					}
					
					
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
			await axios.get(`/itSavings/userDesg`)
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

	}, [data]);
	  async function submit(id) {
		await axios.put(`/itSavings/submitITSaving/${id}`)
			.then((response) => {
				 
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
		await axios.put(`/itSavings/approveITSaving/${id}`)
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
					<Link to={"/itSavings/" + row.original.id}>
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
			Header: "Officer Details",
			accessor: 'employee.cdaoNo',// Change this
		},
		
		{
			Header: "Check Digit",
			accessor: 'checkDigit',
		},
		
		{
			Header: "It Saving Section",
			accessor: 'savingSection',// Change this
		},
		
		{
			Header: "Amount",
			accessor: 'amount',
		},
		
		{
			Header: "Assessment Year",
			accessor: 'assessmentYear',
		},
		
		{
			Header: "Document Submitted",
			accessor: 'documentSubmitted',
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
			Header: "Reason",
			accessor: 'reason',
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
			Header: "Voucher No",
			accessor: 'voucherNo',
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
					<h1 className="text-xl font-semibold">It Savings</h1>
					<div className="text-red-500">{mesg}</div>
					<div className="flexContainer">
						<input type="text" name="search" 
						onChange={e => setInputText(e.target.value)}
							onKeyPress={handleKeyPress}
							className="pl-2 -ml-2 inputField flex-initial" />
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
						
						<div>
						<Link to={"/itSavings/viewAll"}>
						<button className=" w-36 ml-8 p-0 h-6 -mt-2" >{" "} View All IT Saving{" "} </button>
						</Link>
						</div>
						{(usrLevel<30) &&
						<>
						<div>
							<Link to={"/itSavings/new"}>
								<button className=" w-32 ml-8 p-0 h-6 -mt-2" > Add It Saving </button>
							</Link>
						</div>
						</>
						}
					</div>					
				</div>
				<div className="-mt-2 max-h-1 py-0">
					<Table columns={columns} data={data} className="table-auto" />
				</div>
			</main>
		</div>
	);
}

export default withRouter(ItSavingList);

