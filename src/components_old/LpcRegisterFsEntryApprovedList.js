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
import { withRouter, Link,useHistory, useLocation } from "react-router-dom";
import TablePage from '../utils/TablePage';

function LpcRegisterFsEntryApprovedList() {
	
	let history = useHistory();

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	
 
	const [usrLevel,setUsrLevel]=useState('');
	const {state}=useLocation(); 
	
	const [lightTheme, setLightTheme] = useState(true);
	const [disabled,setDisabled]=useState(false);
	const [me,setMe]=useState('');
	const [status,setStatus]=useState('');

	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if(!fetching)
			setDisabled(true);
			await axios.get('/lpcRegisters/fsEntryApprovedList?search=' + search + '&me=' + me+ '&status=' + status)
				.then((response) => {
					setData(response.data);
					console.log(">>>>Usr Level is----:" + response.data[0].usrLevel);
					 
					setUsrLevel(response.data[0].usrLevel);
					setDisabled(false);
				})
				.catch((error) => {
					//console.log(error);
					setDisabled(false);
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

	}, [update, search, me, status]);

 
 
 
	const columns = useMemo(() => [
		 
		 
		
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
			Header: "Fs Basic Pay",
			accessor: 'fsBasicPay',
		},
		
		{
			Header: "Fs Da",
			accessor: 'fsDa',
		},
		
		{
			Header: "Fs Encash Amount",
			accessor: 'fsEncashAmount',
		},
		{
			Header: "Fs Encash Days",
			accessor: 'fsEncashDays',
		},
		
		{
			Header: "WithHeld Amount",
			accessor: 'withheldAmount',
		},
		
		{
			Header: "Leave Encash Payment Amount",
			accessor: 'fsLeaveEncashmentPaymentAmount',
		},
		{
			Header: "Fs Fund",
			accessor: 'fsFund',
		},
		{
			Header: "Dli",
			accessor: 'dli',
		},
		{
			Header: "Service Gratuity",
			accessor: 'serviceGratuity',
		},
		
		
		{
			Header: "Qe",
			accessor: 'monthEnding',
			Filter: SelectColumnFilter,   
			filter: 'monthEnding',
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
			Header: "Whether Misc Fs",
			accessor: 'whetherMiscFs',
			Cell: ({ row }) => (
				<div>
				
					 {data[row.index]['cancelled'] === true ? 'Y' : 'N'}
				</div>
			)
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
	const handleBack =() => {
		history.push("/lpcRegisters");
	}
	
	const handleApprovalChange = (e) => {
		console.log(e.target.value);
		setStatus(e.target.value);

	};
	
	return (
		 <div className={lightTheme ? 'theme-light' : 'theme-dark'} style={disabled ?{pointerEvents: "none",opacity :"0.4"}:{}}>
		<div className="min-h-screen bg-gray-100 text-gray-900">
		 	<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
				 
					<h1 className="text-xl font-semibold">Fs Entry Approved List</h1>
				 
				 
				 
					
					<div className="flexContainer">
					<div>
						<input type="text" name="search" 
						onChange={e => setInputText(e.target.value)}
							onKeyPress={handleKeyPress}
							className="pl-2 -ml-2 inputField flex-initial" />
							</div>
							<div>
							<input type="text" name="me" placeholder="month Ending in mmyyyy"
								onBlur={e => setMe(e.target.value)}
							//	onBlur={handleSubmit}
								className="pl-2 -ml-2 inputField flex-initial" />
							
							</div>
							<div>
							<select name="approval" placeholder="status" className="form-control py-0"
								onBlur={e => setStatus(e.target.value)} onChange={handleApprovalChange} >
								<option value="select">--Select--</option>
								<option key="1" value="approved">Approved</option>
								<option key="2" value="notApproved">Not Approved</option>
 							</select>
						</div>
							 
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
						 <br/>
						 <br/>
						 <div>
						<button className=" w-46 ml-8 p-0 h-6 -mt-2"  onClick={handleBack} >Close</button>
						 </div>
					</div>					
				</div>
				 
				<div className="-mt-2 max-h-1 py-0">
					<Table columns={columns} data={data} className="table-auto" />
				</div>
				 
			</main>
			 
				 
		</div>
		</div>
	 
	);
}

export default withRouter(LpcRegisterFsEntryApprovedList);

