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

function FsApprovalList() {
	
	let history = useHistory();

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	const [fsApproveList, setFsApproveList]=useState([]);
	const [page,setPage]=useState(0);
	const [usrLevel,setUsrLevel]=useState('');
	const [mesg,setMesg]=useState('');
	const [disabled,setDisabled]=useState(false);
	const {state}=useLocation();
 
 	useEffect(() => {
	let fetching = false;	 
 	async function fetchFsApproveData() {
		
 		if(!fetching)
			await axios.get(`/lpcRegisters/fsApprovalList?search=`+search)
				.then((response) => {
					setFsApproveList(response.data);
					setUsrLevel(response.data[0].usrLevel);
					console.log(">>>>Usr Level is----:" + usrLevel);
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
		fetchFsApproveData();
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

	}, [update,state,usrLevel]);
	async function rollBack(id, armyNo) {
		var proceed=window.confirm('You have selected ROLL BACK for army no: '+armyNo+". Please confirm.");
		console.log(proceed);
		if(!proceed)
		return;
		await axios.put(`/lpcRegisters/rollBackFsEntry/${id}`)
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
	/*async function cancel(id, armyNo) {
		var proceed=window.confirm('You have selected army no: '+armyNo+ "  " +"for  FS Cancellation . Please confirm.");
		console.log(proceed);
		if(!proceed)
		return; 
		await axios.put(`/lpcRegisters/cancelFsEntry/${id}`)
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
	}*/
	async function approve(id,cdaoNo) {
		var proceed=window.confirm('You have selected Cdao No: '+cdaoNo+ "  " +"for Approval/Submission . Please confirm.");
		console.log(proceed);
		if(!proceed)
		return;   
		await axios.put(`/lpcRegisters/fsApprove/${id}`)
			.then((response) => {
				console.log("reponse status--------------"+response.status);
				setMesg(response.data);
				let updatedRecords = [...data].filter((i) => i.id !== id);
				console.log(updatedRecords);
				setData(updatedRecords);
				setUpdate(!update);
			//	history.push({ pathname: '/lpcRegisters/fsClosingList', state: response.data });
			})
			.catch((error) => {
			//	console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}

	const handleCheckBox = index=>(e) =>{
		//console.log(Table.page)
		   console.log(e.target.checked+"--"+index);
			 
		   console.log(e.target.checked);
			let item = fsApproveList[index];
		 
		item['select'] = e.target.checked;
		let newData = [...fsApproveList];
		newData[index] = item;
		setFsApproveList(newData);
		 
		 
		 
	}
	 
	
	const updateCheckBoxAll = (e) =>{
		  // console.log("..."+e.target.checked+"--"+index);
		   
			  let newData=[...fsApproveList];
			for(var k in newData){
				newData[k].select=e.target.checked;
			}
			setFsApproveList(newData);
			 
		 
		 
	}
	
	
	const columns=useMemo(()=>[
		
		 
				{
			Header: 'Action',
			Cell: ({ row }) => (
				<div>
				{console.log("usrlevel---:"+ usrLevel)}
				{usrLevel<30 &&
				<>
					 {((row.original.cancelled==null || row.original.cancelled===false) &&
					   (row.original.fsApproved==null || row.original.fsApproved===false) && 
					   row.original.rejectionReason==='Reclosing Done') &&
					 
						<button
						className="w-16 m-0 p-0 bg-green-500 hover:bg-red-700 "
						onClick={() => approve(row.original.id, row.original.cdaoNo)}
					>	Submit 	</button>
					 
					}
					</>
					}
					
					{usrLevel===30 &&
				<>
					 {((row.original.cancelled==null || row.original.cancelled===false) &&
					   (row.original.fsApproved==null ||row.original.fsApproved===false) && 
					   row.original.rejectionReason.includes('FS Submitted by Auditor')) &&
					 
						<button
						className="w-16 m-0 p-0 bg-green-500 hover:bg-red-700 "
						onClick={() => approve(row.original.id, row.original.cdaoNo)}
					>	Submit 	</button>
					 
					}
					</>
					}
					
					{usrLevel>30 &&
				<>
					 {((row.original.cancelled==null || row.original.cancelled===false) &&
					   (row.original.fsApproved==null || row.original.fsApproved===false))  &&
					 
						<button
						className="w-16 m-0 p-0 bg-green-500 hover:bg-green-700 "
						onClick={() => approve(row.original.id, row.original.cdaoNo)}
					>	Approve 	</button>
					 
					}
					</>
					}
					 
				 
				 
				 
					 </div>
			)
		},
		
		{
			Header: "FS Type",
			accessor: 'dak.dakType.description',
			Cell: ({ row }) => (
				<div>

					<label>{row.original.dak.dakType.description}</label>
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
				
					 {fsApproveList[row.index]['entryApproved'] === true ? 'Y' : 'N'}
				</div>
			)
		},
		
		{
			Header: "Fs Approved",
			accessor: 'fsApproved',
			Cell: ({ row }) => (
				<div>
				
					 {fsApproveList[row.index]['fsApproved'] === true ? 'Y' : 'N'}
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
		
		 
		 
	 
		
	 
	],[fsApproveList,page,setPage])
	
 
	
	
	 

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
		history.push("/lpcRegisters/fsClosingList");
	//	setUsrLevel(usrLevel);
	}
	
	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
			  
				<div className="text-red-500">{serverErrors}</div>
					<div className="text-red-500">{mesg}</div>
					 
					{state==='reg' &&
					<h1 className="text-xl font-semibold ml-4">Regular Fs Approval</h1>
					}
					{state==='misc' &&
					<h1 className="text-xl font-semibold ml-4">Misc(OTR) Fs Approval</h1>
					}
					 
						<br/>
						 
						
	 					<div className="flexContainer">
	 					<label>Cdao No:  </label>
						<input type="text" name="search" 
						onChange={e => setInputText(e.target.value)}
						onKeyPress={handleKeyPress}
						className="ml-18 pl-2 -ml-2 inputField flex-initial" />
							
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
						 <div>
						<button className=" w-38 ml-8 p-0 h-6 -mt-2"  onClick={handleBack} >Back to Closing List</button>
						 
						 </div>
								</div>

						
				 <div className="-mt-2 max-h-1 py-0">
					<Table columns={columns} data={fsApproveList} className="table-auto" />
				</div>
				 
				   
			</div>

		</div>
	);
}

export default withRouter(FsApprovalList);

