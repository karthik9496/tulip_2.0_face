import { useState, useEffect, useMemo } from 'react';
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { format } from 'date-fns'

import { withRouter, Link,useLocation } from "react-router-dom";

function Do2TaskPendencyBreakup() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	const location=useLocation();
	const taskData=location.state;

	useEffect(() => {
		let fetching = false;
		 
		 console.log(taskData);
		async function fetchData() {
			if(!fetching)
			await axios.get('/do2Pendency/breakup/'+taskData)
				.then((response) => {
					if(response.data && response.data.pendingDo2List)
					setData(response.data.pendingDo2List);
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

	}, [taskData]);


 


	const columns = useMemo(() => [
		  {
    Header: '#',
   Cell: ({ row,index }) =>   (
	   <div>
	   {row.index+1}
	   </div>
   )
	    
  },
		
		{
			Header: 'Officer',
			accessor: 'officerName',
			Cell: ({ row }) => (
				<div>
					<label>{row.original.officerName}{'/'}{row.original.rankName}</label><br/>
 				</div>
			)
		},
		{
			Header: 'CDAO No',
			accessor: 'cdaoNo',
			Cell: ({ row }) => (
				<div>
				
					<label>{row.original.cdaoNo}{row.original.checkDigit}</label><br/>
				</div>
			)
		},
		
		 
		 
		 
		{
			Header: "Occurrence Code",
			accessor: 'occurrenceCode',
		},
		{
			Header: "Do2 No",
			accessor: 'do2No',
		},
		
		{
			Header: "Do2 Item No",
			accessor: 'do2ItemNo',
		},
		{
			Header: "Do2 Date",
			accessor: 'do2Date',
				Cell: ({ row }) => (
				<div>
				<div>
				 {row.original.do2Date!==null && format(new Date(row.original.do2Date.toString()),'dd/MM/yyyy')} 
				 </div> 
				</div>
				
				)
			
		},
		{
			Header: "From/To Date",
			accessor: 'fromDate',
				Cell: ({ row }) => (
				<div>
				<div>
				 {row.original.fromDate!==null && format(new Date(row.original.fromDate.toString()),'dd/MM/yyyy')} 
				 </div><br/>
				 <div>
				 {row.original.toDate!==null && format(new Date(row.original.toDate.toString()),'dd/MM/yyyy')} 
				 </div>
				   
				</div>
				
				)
			
		},
		{
			Header: "Month",
			accessor: 'monthEnding',
		},
		{
			Header: "Status",
			accessor: 'status',
		},
		{
			Header: "Reason",
			accessor: 'reason',
		},
		{
			Header: "Transcription",
			accessor: 'transcriptionType',
		},
		{
			Header: "Created Date",
			accessor: 'createdAt',
				Cell: ({ row }) => (
				<div>
				<div>
				 {row.original.createdAt!==null && format(new Date(row.original.createdAt.toString()),'dd/MM/yyyy')} 
				 </div>
				   
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

	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
					<h1 className="text-xl font-semibold">Do2 pending item list</h1>
					<div className="flexContainer">
						<input type="text" name="search" 
						onChange={e => setInputText(e.target.value)}
							onKeyPress={handleKeyPress}
							className="pl-2 -ml-2 inputField flex-initial" />
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
					 
					</div>					
				</div>
				<div className="-mt-2 max-h-1 py-0">
					<Table columns={columns} data={data} className="table-auto" />
				</div>
			</main>
		</div>
	);
}

export default withRouter(Do2TaskPendencyBreakup);

