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

function Do2ClearBatchForProcessing() {

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
	const [usrLevel,setUsrLevel]=useState(0);
	const [rejectedItems,setRejectedItems]=useState([]);
	
	
	
	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			 
			if(!fetching)
			await axios.get(`/do2Controls/verifyHc/pending?me=${me}&batchNo=${batchNo}`)
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
	
	
	useEffect(() => {
		let fetching = false;
		async function fetchUsrLevel() {
			 
			if(!fetching)
			await axios.get(`/miscs/usrLevel`)
				.then((response) => {
					if(response.data)
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
		fetchUsrLevel();
		return () => { fetching = true; }

	}, []);
	
	useEffect(() => {
	
		console.log(me);
		let fetching = false;
		async function fetchQe() {
			if((me && me.length<6) || !me){
			
		
			if (!fetching)
				await axios.get('/miscs/me/currentMe')
					.then((response) => {
						setMe(response.data);
						console.log(response.data);
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
		}
		fetchQe();
		return () => { fetching = true; }

	}, []);

	
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
	
	
	let selected=false;
	let noHcBatch=[];
	if(!data || (data!=null && data.length==0)){
		alert("No batch available for submission");
		return;
	}
	if(batchNo.length<2){
		alert("No batch selected.");
		return;
	}
	
	if(data && batchNo){
		for(var i=0;i<data.length;i++){
			
			if(!batchNo.includes(data[i].batchNumber)){
				alert("Select a batch and submit. Multiple batch cannot be submitted at a time.")
				return;
				
			}
			
			if(data[i].selected===true){
				selected=true;
				 
			}else{
				if(!noHcBatch.includes(data[i].batchNumber))
				noHcBatch.push(data[i].batchNumber);
			 
			}
		}
		console.log(noHcBatch);
		 
	}
	
	
	
	 if(usrLevel>30)
	 	return;
	
	var proceed;
	if(usrLevel<30){
		if(noHcBatch!==null && noHcBatch.length>0)
			proceed=window.confirm('You are about to submit batch  '+batchNo+' for approval by AAO. This contains cases with NO HC. Please confirm.');
		else
		proceed=window.confirm('You are about to submit this batch  '+batchNo+' for approval by AAO. Please confirm.');
		console.log(proceed);
	if(!proceed)
		return;
	if(disabled)
		return;
		
	}
	
	if(usrLevel===30){
		if(noHcBatch!==null && noHcBatch.length>0)
			proceed=window.confirm('You are about to submit batch  '+batchNo+' for approval by SAO/AO. This contains cases with NO HC. Please confirm.');
		else
		proceed=window.confirm('You are about to submit this batch  '+batchNo+' for approval by SAO/AO. Please confirm.');
		console.log(proceed);
	if(!proceed)
		return;
	if(disabled)
		return;
		
	}
	
	
		
		setDisabled(true);
		 
		axios.post(`/do2Controls/hcVerified/submit/${me}/${batchNo}`,data)
		.then((response) => {	 
			 console.log(response.data);
			  setDisabled(false);
			  if(response.data)
			  	setServerErrors(response.data);
			 
       
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
			Header: <div class="flex items-left"><div class="flex items-left"><input type="checkbox" onChange={updateCheckBoxAll} /></div>
			<div class="flex items-left"><label>verified</label></div>
			</div>,
			 
			accessor : 'select',
			Cell: ({ row }) => (
				<div>
					 
						<input type="checkbox" onChange={handleCheckBox(row.index)}  checked={data[row.index]['selected']}  />
						 		 
						 
					 
				</div>
				 
				
			)
			 
		},
		 
		 
		{
			Header: "Month Ending",
			accessor: 'monthEnding',
		},
		{
			Header: "Batch Number",
			accessor: 'batchNumber',
		},
	 		{
			Header: "Unit Code",
			accessor: 'unitCode',
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
					 <div class="flex flex-row ...">
					<div>
					<button type="button" onClick={clearBatch} className="w-32 m-0 p-0">Submit Batch</button>
				</div>
				
				
				</div>
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
					<h1 className="text-xl font-semibold">Do2 Controls</h1>
					<div className="flexContainer">
					<div>
						<input type="text" name="me" value={me} placeholder="mmyyyy" 
						onChange={e => setMe(e.target.value)}
							
							className="pl-2 -ml-2 inputField flex-initial" />
							</div>
							<div>
							
							<input type="text" name="batchNo" placeholder="batchNo" 
						onChange={e => setBatchNo(e.target.value)}
							
							className="pl-2 -ml-2 inputField flex-initial" />
							</div>
							
							
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
						 &nbsp;&nbsp;&nbsp;&nbsp;
						 <div>
							<Link to={"/do2Controls/verifyHc/approval"}>
								<button className=" w-36 ml-8 p-0 h-6 -mt-2" > Pending Approval </button>
							</Link>
						</div>
						 
					</div>					
				</div>
				<div className="-mt-2 max-h-1 py-0">
					<ShowList/>
					
					</div>
					
				
			</main>
			
		</div>
	);
}

export default withRouter(Do2ClearBatchForProcessing);

