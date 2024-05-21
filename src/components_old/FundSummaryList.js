/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By : 
 */

import { useState, useEffect, useMemo ,moment} from 'react';
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { withRouter, Link, useLocation,useHistory,useParams } from "react-router-dom";

function FundSummaryList() {
	
	let { id } = useParams();

	let history = useHistory();
	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	const [lpcData,setLpcData]=useState([]);
	const [disabled,setDisabled]=useState(false);
	const [mesg,setMesg]=useState('');
	const [lpcId,setLpcId]=useState(0);
	const [lastDate,setLastDate]=useState('');
	const [lastDatePlus,setLastDatePlus]=useState('');
	const [usrLevel,setUsrLevel]=useState('');

	const {state}=useLocation();
	
	 
	
	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if(!fetching)
			await axios.get(`/lpcRegisters/getEmployee/${id}`)
				.then((response) => {
				//	console.log("-----------action--lpcdata---------:" + response.data['action']);
					setLpcData(response.data['action']);
					 
					 

					 
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

	}, [id]);
	
	useEffect(() => {
		let fetching = false;
		async function fetchUsrData() {
			if (!fetching)
		//		console.log(">>>>Usr Level is -----:" + usrLevel);
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

	}, [data]);

	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if(!fetching)
			console.log("---------------------state----:"+ id)
			await axios.get(`/fundSummarys/fetchFundSummarys/${id}`)
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

	}, [id]);


	async function remove(id) {
		await axios.delete(`/fundSummarys/${id}`)
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
	
	async function reClose() {
		setDisabled(true);
		await axios.put(`/lpcRegisters/regFsClosing/reClose/${id}`)
			.then((response) => {
				setMesg(response.data);
				//console.log(data);
				 
				setDisabled(false);
			})
			.catch((error) => {
				console.log(error);
				setDisabled(false);
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
					 
						{(lpcData!==null && lpcData==="edit") &&
							<Link to={"/fundSummarys/manualEdit/" + row.original.id}>
								<button className="w-32 m-0 p-0 bg-gray-500 hover:bg-gray-700 " > Edit </button>
							</Link>
						}
					</div>
					</div>
					)
			 
		},
		{
			Header: "Cdao No",
			accessor: 'cdaNo',// Change this
		},
		{
			Header: "Officer Name",
			accessor: 'employee.officerName',// Change this
		},
		{
			Header: "Month Ending",
			accessor: 'monthEnding',
		},
		
		{
			Header: "Opening Balance",
			accessor: 'openingBalance',
		},
		{
			Header: "Sub Total",
			accessor: 'subTotal',
		},
		
		{
			Header: "Refund Total",
			accessor: 'refundTotal',
		},
		
		{
			Header: "Interest Adjusted",
			accessor: 'interestAdjusted',
		},
		
		{
			Header: "Transfer Out Amount",
			accessor: 'transferOutAmount',
		},
		
		{
			Header: "Other Adjustment",
			accessor: 'otherAdjustment',
		},
		 
		
		{
			Header: "Debit Total",
			accessor: 'debitTotal',
		},
		
		{
			Header: "Yearly Interest",
			accessor: 'yearlyInterest',
		},
		
		{
			Header: "Closing Balance",
			accessor: 'closingBalance',
		},
		
		 
		 
		
		{
			Header: "Employee Type",
			accessor: 'employeeType',
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
	
	const returnToList =() => {
		history.push('/lpcRegisters/fsClosingList');
	}

	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
					<h1 className="text-xl font-semibold">Fund Summarys</h1>
					<div className="text-red-500">{mesg}</div>
					<div className="flexContainer">
					<div>
						<input type="text" name="search" 
						onChange={e => setInputText(e.target.value)}
							onKeyPress={handleKeyPress}
							className="pl-2 -ml-2 inputField flex-initial" />
							</div>
							
							<div>
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0 bg-green-500 hover:bg-green-700 ">Search</button>
						 </div>
						 <div>
						<button type="button" onClick={returnToList} className="w-16 m-0 p-0 bg-green-500 hover:bg-green-700 ">Return</button>
							</div>
							
						{usrLevel<30 &&
						<>
						<div>
							<Link to={"/fundSummarys/new"}>
								<button className=" w-46 ml-8 p-0 h-6 -mt-2" > Add Fund Summary </button>
							</Link>
						</div>
						</>
						}
						
							<div>
						<button type="button" onClick={reClose} className=" w-46 ml-8 p-0 bg-red-500 hover:bg-red-700 h-6 -mt-2">Calculate Interest</button>
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

export default withRouter(FundSummaryList);

