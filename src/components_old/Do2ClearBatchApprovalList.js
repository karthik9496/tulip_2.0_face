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

function Do2ClearBatchApprovalList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	const [me,setMe]=useState('');
	const [task,setTask]=useState('0');
	const [batchNo,setBatchNo]=useState('');
	const [batchSize,setBatchSize]=useState(0);
	const [disabled,setDisabled]=useState(false);
	const [requiredBatchSize,setRequiredBatchSize]=useState(0);
	const [batchCounter,setBatchCounter]=useState(0);
	const [rejectedItems,setRejectedItems]=useState([]);
	
	
	
	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			 
			if(!fetching)
			await axios.get(`/do2Controls/verifyHc/approval?me=${me}&batchNo=${batchNo}`)
				.then((response) => {
					setData(response.data);
					console.log(response.data.length);
					 
					 
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

	}, [update, me,batchNo]);
	
	useEffect(() => {
		let fetching = false;
		async function fetchRejectedData() {
			if(me && batchNo)
			if(!fetching)
			await axios.get(`/do2XmlRejectedItems/rejectedItems/fetchList?batchNo=${batchNo}&me=${me}`)
				.then((response) => {
					setRejectedItems(response.data);
					console.log(response.data.length);
					 
					 
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
		fetchRejectedData();
		return () => { fetching = true; }

	}, [update, me,batchNo]);
	
const handleCheckBox =index=> (e) =>{
		   console.log(e.target.checked);
			data[index].selected=e.target.checked;
			updateBatchCounter();
		 
	}
 
	const updateCheckBoxAll = (e) =>{
		   
		   
			  let newData=[...data];
			for(var k in newData){
				newData[k].selected=e.target.checked;
			}
			setData(newData);
		 
		 
	}
	
	function updateBatchCounter (){
		if(data){
			let counter=batchCounter;
			for(var i=0;i<data.length;i++){
			if(data[i].selected==true){
				counter+=data[i].totalItems
				
			}
			setBatchCounter(counter);
		}
		}
	}

async function clearBatch  () {
	console.log(batchNo);
	if(batchNo.length<1){
		alert("No batch selected.");
		return;
	}
	if(me.length!=6){
		alert("Month not selected. Please fill month in mmyyyy format");
		return;
	}
	
	let selected=false;
	 
	let usrLevel=0;
	
	var proceed;
	 
	proceed=window.confirm('You are about to approve batch '+batchNo+' for month '+me+'  for processing. Please confirm.');
	console.log(proceed);
	if(!proceed)
		return;
	if(disabled)
		return;
		
		setDisabled(true);
		 
		axios.post(`/do2Controls/hcVerified/approve/${me}/${batchNo}`,data)
		.then((response) => {	 
			 console.log(response.data);
			   if(response.data)
			  	setServerErrors(response.data);
			  	setData([]);
			 setDisabled(false)
       
		});
	}
	
	async function remove(id) {
		await axios.delete(`/do2Controls/${id}`)
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

const ShowList=()=>{
	
	const cols = useMemo(() => [
		 
		{
			Header: "Do2 Control",
			accessor: 'do2Control.id',// Change this
		},
		
		{
			Header: "Do2 Item No",
			accessor: 'do2ItemNo',
		},
		
		{
			Header: "Do2 Description",
			accessor: 'do2Description',
		},
		
		{
			Header: "Rejection Reason",
			accessor: 'rejectionReason',
		},
		
		 
		
		{
			Header: "Army No",
			accessor: 'armyNo',
		},
		
		{
			Header: "Check Digit",
			accessor: 'checkDigit',
		},
		
		{
			Header: "Reviewed Imported",
			accessor: 'reviewedImported',
		},
		
		
		 
	], [rejectedItems])

	const columns = useMemo(() => [
		
		 
		{
			Header: "MR",
			accessor: 'id',
			Cell : ({row})=>(
				<div>
				{row.original.mr!==null && row.original.mr>0 &&
				<div>Contains Manual Rejection</div>
				}
				</div>
			)
		},
		{
			Header: "Month Ending",
			accessor: 'monthEnding',
		},
		
		{
			Header: "Hard Copy Verified",
			accessor: 'hardCopyVerified',
			Cell : ({row})=>(
				<div>
				{row.original.hardCopyVerified!=null &&
				<div>{row.original.hardCopyVerified === true ? 'true' : 'false'}</div>
				}
				</div>
			)
		},
		
		{
			Header: "No Hc",
			accessor: 'noHc',
			Cell : ({row})=>(
				<div>
				{row.original.noHc!=null &&
				<div>{row.original.noHc === true ? 'true' : 'false'}</div>
				}
				</div>
			)
		},
		{
			Header: "Dt Of Receipt",
			accessor: 'dtOfReceipt',
		},
		{
			Header: "Unit Code",
			accessor: 'unitCode',
		},
		{
			Header: "Batch Number",
			accessor: 'batchNumber',
		},
		{
			Header: "Batch Dt",
			accessor: 'batchDt',
		},
		{
			Header: "Do2 Type",
			accessor: 'do2Type',
		},
		{
			Header: "Do2 No",
			accessor: 'do2No',
		},
		{
			Header: "Do2 Year",
			accessor: 'do2Year',
		},
		{
			Header: "Do2 Date",
			accessor: 'do2Date',
		},
		
		{
			Header: "Total Items",
			accessor: 'totalItems',
		},
		
		{
			Header: "Imported Items",
			accessor: 'importedItems',
		},
		
		
		 
		
		{
			Header: "Task",
			accessor: 'task',
		},
		
		{
			Header: "Imported",
			accessor: 'imported',
		},
		
		{
			Header: "Input File Name",
			accessor: 'inputFileName',
		},
		
		{
			Header: "Batch File Name",
			accessor: 'batchFileName',
		},
		
		
		
		{
			Header: "Missing Do2",
			accessor: 'missingDo2',
		},
		
		{
			Header: "Misdo2rep Gen Dt",
			accessor: 'misdo2repGenDt',
		},
		
		
		
		
		
		
		{
			Header: "Ack Date",
			accessor: 'ackDate',
		},
		
		{
			Header: "Feed Back Date",
			accessor: 'feedBackDate',
		},
		
		{
			Header: "Specimen Signature",
			accessor: 'specimenSignature.id',// Change this
		},
		
		{
			Header: "Core Validity",
			accessor: 'coreValidity',
		},
		
		{
			Header: "Input File Type",
			accessor: 'inputFileType',
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
		
		
		/*
		{
			Header: "Login Name",
			accessor: 'loginName',
			Filter: SelectColumnFilter,  // new
			filter: 'includes',
		},
		*/
	], [data])
	
	return (
		 		 <div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
		
				<div className="-mt-2 max-h-0 py-0 ml-0">
					<Table columns={columns} data={data} className="table-auto" />
					 
					{rejectedItems && rejectedItems.length>0 && <>
					<label>Rejected Items</label>
					<Table columns={cols} data={rejectedItems} className="table-auto" />
					</>
					}
					 
				</div>
				
				<div>
					
				</div>
				</main>
				</div>
			 
	);
	
	}

const ShowRejectedList=()=>{

	const cols = useMemo(() => [
		 
		{
			Header: "Do2 Control",
			accessor: 'do2Control.id',// Change this
		},
		
		{
			Header: "Do2 Item No",
			accessor: 'do2ItemNo',
		},
		
		{
			Header: "Do2 Description",
			accessor: 'do2Description',
		},
		
		{
			Header: "Rejection Reason",
			accessor: 'rejectionReason',
		},
		
		 
		
		{
			Header: "Army No",
			accessor: 'armyNo',
		},
		
		{
			Header: "Check Digit",
			accessor: 'checkDigit',
		},
		
		{
			Header: "Reviewed Imported",
			accessor: 'reviewedImported',
		},
		
		
		 
	], [rejectedItems])
	
	
	
	}
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(inputText);
		//setSearch(inputText);
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
				<div className="text-red-500">{serverErrors}</div>
					<h1 className="text-xl font-semibold">Clear Do2 Batch - Approval List</h1>
					<div className="flexContainer">
					<div>
						<input type="text" name="me" placeholder="mmyyyy" 
						onChange={e => setMe(e.target.value)}
							
							className="pl-2 -ml-2 inputField flex-initial" /> 
							</div>
							<div>
							<input type="text" name="batchNo" placeholder="batchNo" 
						onChange={e => setBatchNo(e.target.value)}
							
							className="pl-2 -ml-2 inputField flex-initial" /> 
							</div>
							<div>
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
						</div>
						<div>
						{me && batchNo &&  
						<button type="button" onClick={clearBatch}  className="w-16 m-0 p-0" >Approve</button>
						}
						</div>
						 
						 
					</div>	
					<ShowList/>
				  
							 					 
						 
							
						 
					 
				</div>
				 
				
				 
			</main>
			
		</div>
	);
}

export default withRouter(Do2ClearBatchApprovalList);

