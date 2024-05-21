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

function Do2ControlBatchPrepareList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	const [me,setMe]=useState('');
	const [task,setTask]=useState('0');
	const [batchSize,setBatchSize]=useState(0);
	const [disabled,setDisabled]=useState(false);
	const [requiredBatchSize,setRequiredBatchSize]=useState(0);
	const [batchCounter,setBatchCounter]=useState(0);
	const [loading,setLoading]=useState(false);
	
	
	
	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			 
			if(!fetching)
			await axios.get(`/do2Controls/prepareBatch/viewAll?me=${me}&task=${task}`)
				.then((response) => {
					setData(response.data);
					console.log(response.data.length);
					var i;
					var counter=0;
					if(task.length>1){
						response.data.map((d)=>(counter=counter+d.totalItems));
					 
					setBatchSize(counter);
					console.log(counter+"--"+response.data.length);
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

	}, [update, me,task]);
const handleCheckBox =index=> (e) =>{
		   console.log(e.target.checked);
			data[index].selected=e.target.checked;
			updateBatchCounter();
		 
	}
 
	const updateCheckBoxAll = (e) =>{
		   
		   
			  let newData=[...data];
			  let count=0;
			for(var k in newData){
				newData[k].selected=e.target.checked;
				if(e.target.checked)
				count=count+newData[k].totalItems;
			}
			setData(newData);
			setBatchCounter(count);
		 
		 
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
	
	const download = (fileName) => {
		console.log(fileName);
		axios({
			url: `/do2Controls/summaryReport/load/` + fileName, 
			method: 'GET',
			responseType: 'blob', // important
		}).then((response) => {
			//console.log(response.data);
			const url = window.URL.createObjectURL(new Blob([response.data],{type:"application/pdf"}));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', fileName);
		 
			document.body.appendChild(link);
			link.click();
		});
	}

async function createBatch  () {
	console.log(task);
		if(disabled)
		return;
	 
	let selected=false;
	 
	var proceed=window.confirm("You are about to prepare batch task wise . Please confirm.");
	console.log(proceed);
	if(!proceed)
		return;

		
		setDisabled(true);
		setLoading(true); 
		let fname='';
		axios.put(`/do2Controls/newBatch/taskwise`)
		.then((response) => {	 
			 console.log(response.data[0]);
			 console.log(response.data[1]);
			 fname=response.data[0];
			 if(response.data[1]!==null && response.data[1]!=='ok')
			 	setServerErrors(response.data[1]);
			 setDisabled(false);
			 setLoading(false);
			 console.log(fname);
		if(fname!=null && fname.length>0){
			axios({
			url: `/do2Controls/topsheet/load/` + fname, 
			method: 'GET',
			responseType: 'blob', // important
		}).then((res) => {
			//console.log(response.data);
			const url =URL.createObjectURL(new Blob([res.data],{type:"application/pdf"}));
			const pdfWindow=window.open();
			pdfWindow.location.href=url;
			const link=pdfWindow.location.href;
			//const link = document.createElement('a');
			//link.href = url;
			try{
			link.setAttribute('download', fname);
		 
			//document.body.appendChild(link);
			link.click();
			}catch(err){
				
			}
		});
		}
			 
        // Clean up and remove the link
      //  link.parentNode.removeChild(link);
			setData([]);
			setUpdate(true);
			setBatchCounter(0);
			 
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


	const columns = useMemo(() => [
		{
			Header: <input type="checkbox" onChange={updateCheckBoxAll} />,
			accessor : "select",
			Cell: ({ row }) => (
				<div>
					 
						<input type="checkbox" onChange={handleCheckBox(row.index)}  checked={data[row.index]['selected']}  />
						 
					 
				</div>
				
			)
			 
		},
		 
		{
			Header: "Id",
			accessor: 'id',
		},
		{
			Header: "Month Ending",
			accessor: 'monthEnding',
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
			Header: "Task",
			accessor: 'task',
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
			Header: "Hard Copy Verified",
			accessor: 'hardCopyVerified',
		},
		
		{
			Header: "No Hc",
			accessor: 'noHc',
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
					<h1 className="text-xl font-semibold">Do2 Controls</h1>
					
					<div className="flexContainer">
						<input type="text" name="me" placeholder="mmyyyy" 
						onChange={e => setMe(e.target.value)}
							
							className="pl-2 -ml-2 inputField flex-initial" />&nbsp;&nbsp;&nbsp;&nbsp;
							
							<input type="text" name="task" placeholder="task" 
						onChange={e => setTask(e.target.value)}
							
							className="pl-2 -ml-2 inputField flex-initial" />&nbsp;&nbsp;&nbsp;&nbsp;
							
							
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
						 &nbsp;&nbsp;&nbsp;&nbsp;
						<br/>
						<div>
						<p class="text-2xl">Total Items in selected Batch : {batchCounter}</p>
						</div>
					</div>					
				</div>
				<div className="text-red-500">{serverErrors}</div>
				<div className="-mt-2 max-h-1 py-0">
				{loading && <>
						 
						 <div class="flex justify-center items-center">
  <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
						</>	
						}
			<br/><br/>
					<Table columns={columns} data={data} className="table-auto" />
					<div className="flexContainer">
					<div>
					<button type="button" onClick={createBatch} className="w-32 m-0 p-0">Prepare Batch</button>
				</div>
				<div>
							<Link to={"/do2Controls/topsheet/load/all"}>
								<button className=" w-32 ml-8 p-0 h-6 -mt-2" > View Top Sheet </button>
							</Link>
						</div>
						</div>
				</div>
				
				
			</main>
			
		</div>
	);
}

export default withRouter(Do2ControlBatchPrepareList);

