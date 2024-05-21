/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By : 
 */

import { useState, useEffect, useMemo } from 'react';
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { format } from 'date-fns'
import { withRouter, Link } from "react-router-dom";

function Do2List() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	const [desc,setDesc]=useState('');
	const [loading,setLoading]=useState(false);
	const [icno,setIcno]=useState('');

	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			setLoading(true);
			if(!fetching)
			await axios.get('/do2s?cdaoNo='+search+'&desc='+desc+'&icno='+icno)
				.then((response) => {
					if(response.data[0])
					setData(response.data[0]);
					setLoading(false);
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

	}, [update, search,desc,icno]);

	async function downloadAttachment(id) {
		 
		axios({
			url: `/do2s/attachment/download/` + id, 
			method: 'GET',
			responseType: 'blob', // important
		}).then((response) => {
			//console.log(response.data);
			if(response.data!==null){
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', "a1.pdf");
		 
			document.body.appendChild(link);
			link.click();
			}
		});
	}
	
	async function remove(id) {
		await axios.delete(`/do2s/${id}`)
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
					{((row.original.status && row.original.status!=='V') || (row.original.status===null)) &&
					<Link to={{pathname:"/do2s/"+row.original.id, secState:'lw'}}>
						<button className=" w-16 m-0 p-0 " > Edit </button>
					</Link>
					}
					{' '}
					{((row.original.status && row.original.status!=='V') || (row.original.status===null)) && 
					(row.original.transcriptionType && row.original.transcriptionType==='T') &&
					 <button
						className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
						onClick={() => remove(row.original.id)}
					>	Delete 	</button>
					}
					{' '}
					<br/><br/>
					{row.original.transcriptionType && row.original.transcriptionType==='D' && row.original.attachment!==null && <> 
					 
						<button className=" w-22 m-0 p-0 " onClick={()=>downloadAttachment(row.original.id)}> {row.original.disabled && (
						<span className="spinner-grow spinner-grow-sm"></span>
					)
						
					} Attachment </button>
					 
					</>
					}
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
			Header: "From Date",
			accessor: 'fromDate',
				Cell: ({ row }) => (
				<div>
				<div>
				 {row.original.fromDate!==null && format(new Date(row.original.fromDate.toString()),'dd/MM/yyyy')} 
				 </div>
				   
				</div>
				
				)
			
		},
		 
		{
			Header: "To Date",
			accessor: 'toDate',
				Cell: ({ row }) => (
				<div>
				<div>
				 {row.original.toDate!==null && format(new Date(row.original.toDate.toString()),'dd/MM/yyyy')} 
				 </div>
				   
				</div>
				
				)
			
		},
		
		{
			Header: "Data1",
			accessor: 'data1',
		},
		
		{
			Header: "Data2",
			accessor: 'data2',
		},
		
		{
			Header: "Data3",
			accessor: 'data3',
		},
		
		{
			Header: "Data4",
			accessor: 'data4',
		},
		
		
		
		{
			Header: "Batch No",
			accessor: 'batchNo',
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
			Header: "Transcription Type",
			accessor: 'transcriptionType',
		},
		
		 
		
		{
			Header: "Input Month Ending",
			accessor: 'inputMonthEnding',
		},
		{
			Header: "Accepted Month Ending",
			accessor: 'acceptedMonthEnding',
		},
		
		
		{
			Header: "Review Month Ending",
			accessor: 'reviewMonthEnding',
		},	
		 
		{
			Header: "DakId",
			accessor: 'dakidNo', 
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
			Header: "Status",
			accessor: 'status',
		},
		
		{
			Header: "Approved",
			accessor: 'approved',
				Cell: ({ row }) => (
				<div>
				<div>
				 {row.original.approved && row.original.approved===true? 'Yes':'No'} 
				 </div>
				   
				</div>
				
				)
			
		},
		
		 
		
		 
		
		{
			Header: "Reason",
			accessor: 'reason',
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
			<main className="max-w-11/12xl mx-auto px-4 sm:px-6 lg:px-8 pt-0">
				<div className="mt-2 ml-4">
					<h1 className="text-xl font-semibold">Do2s</h1>
					<div className="flexContainer">
					<div>
						<input type="text" name="search" 
						onChange={e => setInputText(e.target.value)}
							onKeyPress={handleKeyPress} placeholder="cdao no"
							className="pl-2 -ml-2 inputField flex-initial" />
							</div>
							<div>
						<input type="text" name="desc" 
						onChange={e => setDesc(e.target.value)}
							onKeyPress={handleKeyPress} placeholder="desc"
							className="pl-2 -ml-2 inputField flex-initial" />
							</div>
							<div>
						<input type="text" name="icno" 
						onChange={e => setIcno(e.target.value)}
							onKeyPress={handleKeyPress} placeholder="icno"
							className="pl-2 -ml-2 inputField flex-initial" />
							</div>
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
						<div>
							<Link to={{pathname:"/do2s/new", secState:'lw'}}>
								<button className=" w-32 ml-8 p-0 h-6 -mt-2" > Add Do2 </button>
							</Link>
						</div>
						<div>
							<Link to={{pathname:"/do2Pendency"}}>
								<button className=" w-32 ml-8 p-0 h-6 -mt-2" > Pendency </button>
							</Link>
						</div>
					</div>					
				</div>
				<div className="-mt-2 max-h-1 py-0">
				 {loading && <>
						 
						 <div className="flex justify-center items-center">
  <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>
						</>	
						}
					<Table columns={columns} data={data} className="table-auto" />
				</div>
			</main>
		</div>
	);
}

export default withRouter(Do2List);

