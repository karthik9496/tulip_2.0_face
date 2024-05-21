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
import { format } from 'date-fns'
import { withRouter, Link } from "react-router-dom";

function Do2ViewList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	const [loading,setLoading]=useState(false);
	const [ano,setAno]=useState('');
	const [desc,setDesc]=useState('');
	const [me,setMe]=useState('');
	const [anoSearch,setAnoSearch]=useState('');
	const [descSearch,setDescSearch]=useState('');
	const [meSearch,setMeSearch]=useState('');
	const [batch,setBatch]=useState('');
	const [batchSearch,setBatchSearch]=useState('');
	const [status,setStatus]=useState('');
	const [statusSearch,setStatusSearch]=useState('');
	const [fdate,setFdate]=useState('');
	const [fdateSearch,setFdateSearch]=useState('')
	const [do2No,setDo2No]=useState('');
	const [do2ItemNo,setDo2ItemNo]=useState('');
	const [do2ItemNoSearch,setDo2ItemNoSearch]=useState('');
	const [data2,setData2]=useState('');
	const [data2Search,setData2Search]=useState('');
	const [do2NoSearch,setDo2NoSearch]=useState('');
	const [unitCode,setUnitCode]=useState('');
	const [do2Date, setDo2Date]=useState('');
	const [data1,setData1]=useState('');
	const [data1Search,setData1Search]=useState('');
	const [data3,setData3]=useState('');
	const [data3Search,setData3Search]=useState('');
	const [data4,setData4]=useState('');
	const [data4Search,setData4Search]=useState('');
	const [icno,setIcno]=useState('')



	

/*useEffect(() => {
		let fetching = false;
		async function fetchData() {
			setLoading(true);
			console.log(ano+'-'+do2NoSearch);
			if(!fetching)
			await axios.get('/do2s/view/all?search='+anoSearch+'&descCode='+descSearch+'&me='+meSearch+'&batch='+batchSearch+
			'&status='+statusSearch+'&fdate='+fdateSearch+'&refDo2No='+refDo2NoSearch+'&do2No='+do2NoSearch+'&do2ItemNo='+do2ItemNoSearch)
				.then((response) => {
					setLoading(false);
					console.log(response.data);
					setData(response.data);
				})
				.catch((error) => {
					setLoading(false);
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

	}, [anoSearch,descSearch,meSearch,batchSearch,statusSearch,fdateSearch,do2NoSearch,do2ItemNoSearch,refDo2NoSearch]);*/
	
useEffect(() => {
		let fetching = false;
		async function fetchData() {
			setLoading(true);
			console.log(ano+'-'+do2NoSearch);
			if(!fetching)
			await axios.get('/do2s/view/all?search='+anoSearch+'&descCode='+descSearch+'&me='+meSearch+'&batch='+batchSearch+
			'&status='+statusSearch+'&fdate='+fdateSearch+'&do2No='+do2NoSearch+
			'&do2ItemNo='+do2ItemNoSearch+'&unitCode='+unitCode+'&do2Date='+do2Date+'&data1='+data1Search+'&data2='+data2Search+
			'&data3='+data3Search+'&data4='+data4Search+'&icno='+icno)
				.then((response) => {
					setLoading(false);
					console.log(response.data);
					setData(response.data);
				})
				.catch((error) => {
					setLoading(false);
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

	}, [anoSearch,descSearch,meSearch,batchSearch,statusSearch,fdateSearch,
	do2NoSearch,do2ItemNoSearch,unitCode,do2Date,data1Search,data2Search,data3Search,data4Search,icno]);
	

	const convertDate=(e)=> {
		console.log(e);
	};
 
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
	const columns = useMemo(() => [
		 
		 {
			Header: "Attachments",
			accessor: 'attachment',
			Cell: ({ row }) => (
				<div>
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
			Header: "Occurrence",
			accessor: 'occurrenceCode',
			
		},
		
		 
		
		{
			Header: "From Date",
			accessor: 'fromDate',
			Cell: ({ row }) => (
				<div>
				<div>
				{row.original.fromDate && format(new Date(row.original.fromDate.toString()),'dd/MM/yyyy')}
				
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
				
				{row.original.toDate!=null && format(new Date(row.original.toDate.toString()),'dd/MM/yyyy')}
				 </div>
				   
				</div>
				
				)
			
		},
		 
		
		{
			Header: "Status",
			accessor: 'status',
			 
		},
		
	
		{
			Header: "Month",
			accessor: 'monthEnding',// Change this
		},
		
		{
			Header: "Unit Code",
			accessor: 'unitCode',
		},
		
		{
			Header: "Cdao No",
			accessor: 'cdaoNo',
			Cell: ({ row }) => (
				<div>
				<div>
				{row.original.cdaoNo}{row.original.checkDigit}<br/>
				{row.original.officerName && <>
					{row.original.officerName}
					</>
					
				}
				{row.original.rankName &&  <>
				{'/'+row.original.rankName}
				</>
					
				}
				 </div>
				   
				</div>
				
				)
		},
		
		 
		
		{
			Header: "Do2 No/Date",
			accessor: 'do2No',
			Cell: ({ row }) => (
				<div>
				<div>
				{row.original.do2Type}/{row.original.do2No}/{row.original.do2ItemNo}<br/>
				{row.original.do2Date && format(new Date(row.original.do2Date.toString()),'dd/MM/yyyy')}
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
			Header: "Accepted Month",
			accessor: 'acceptedMonthEnding',
		},
		
		 
		{
			Header: "Reason",
			accessor: 'reason',
		},
		{
			Header: "Remarks",
			accessor: 'remarks',
		},
			{
			Header: "Batch No",
			accessor: 'batchNo',
		},
		
		{
			Header: "Transcription",
			accessor: 'transcriptionType',
		},
		
		{
			Header: "Reviewed",
			accessor: 'reviewed',
			Cell: ({ row }) => (
				<div>
				<div>
				{row.original.reviewed && <>
				Y
				</>
				
				} {(!row.original.reviewed || row.original.reviewed===null) && <>
				N
				</>
				
				} 
				 </div>
				   
				</div>
				
				)
		},
		{
			Header: "Review Date",
			accessor: 'reviewDate',
			Cell: ({ row }) => (
				<div>
				<div>
				 
				{row.original.reviewDate && format(new Date(row.original.reviewDate.toString()),'dd/MM/yyyy')}
				 </div>
				   
				</div>
				
				)
		},
		{
			Header: "Created At",
			accessor: 'createdAt',
				Cell: ({ row }) => (
				<div>
				<div>
				{row.original.createdAt && <>
				<label>{format(new Date(row.original.createdAt.toString()),'dd/MM/yyyy')}</label>
				</>
				}
				 </div>
				   
				</div>
				
				)
			
		},
		   
	], [data])

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(inputText);
		setAnoSearch(ano);
		setDescSearch(desc);
		setMeSearch(me);
		setBatchSearch(batch);
		setStatusSearch(status);
		setFdateSearch(fdate);
		setDo2NoSearch(do2No);
		setDo2ItemNoSearch(do2ItemNo);
		setData1Search(data1);
		setData2Search(data2);
		setData3Search(data3);
		setData4Search(data4);
	}

	const handleKeyPress = (event) => {
		// look for the `Enter` keyCode
		if (event.keyCode === 13 || event.which === 13) {
			handleSubmit(event)
		}
	}
	
	const handleAno = (event) => {
		// look for the `Enter` keyCode
		 setAno(event.target.value);
	}
	
	const handleDesc = (event) => {
		// look for the `Enter` keyCode
		 setDesc(event.target.value);
	}

	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
		<main className="max-w-8xl mx-auto">
		<div className="mt-2 ml-4">
					<h1 className="text-xl font-semibold">Do2s search :</h1>
					<div class="shadow-md m-auto">
					<div className="flex flex-wrap">
					<div class="column" >
						<input type="text" name="search" placeholder="army no"
						onChange={e => setAno(e.target.value)}
							 onKeyPress={handleKeyPress}
							className="w-32 m-2 p-1 float-left..." />
						</div>
						<div>	 
							<input type="text" name="desc" placeholder="description"
						onChange={e => setDesc(e.target.value)}
							 onKeyPress={handleKeyPress}
							className="w-32 m-2 p-1 float-left..." />
							</div>
							
							<div>	 
							<input type="text" name="me" placeholder="mmyyyy"
							onChange={e => setMe(e.target.value)}
							 onKeyPress={handleKeyPress}
							className="w-32 m-2 p-1 float-left..."/>
							</div>
							<div>	 
							<input type="text" name="batch" placeholder="batch"
							onChange={e => setBatch(e.target.value)}
							 onKeyPress={handleKeyPress}
							className="w-32 m-2 p-1 float-left..."/>
							</div>
							<div>	 
							<input type="text" name="status" placeholder="status"
							onChange={e => setStatus(e.target.value)}
							 onKeyPress={handleKeyPress}
							className="w-32 m-2 p-1 float-left..."/>
							</div>
							
							<div>	 
							<input type="text" name="fdate" placeholder="from date ddmmyyyy"
							onChange={e => setFdate(e.target.value)}
							 onKeyPress={handleKeyPress}
							className="w-40 m-2 p-1 float-left..."/>
							</div>
							
							<div>	 
							<input type="text" name="do2No" placeholder="do2No"
							onChange={e => setDo2No(e.target.value)}
							 onKeyPress={handleKeyPress}
							className="w-32 m-2 p-1 float-left..."/>
							</div>
							
								<div>	 
							<input type="text" name="do2ItemNo" placeholder="do2ItemNo"
							onChange={e => setDo2ItemNo(e.target.value)}
							 onKeyPress={handleKeyPress}
							className="w-32 m-2 p-1 float-left..."/>
							</div>
							
							<div>	 
							<input type="text" name="unitCode" placeholder="unitCode"
							onChange={e => setUnitCode(e.target.value)}
							 onKeyPress={handleKeyPress}
							className="w-32 m-2 p-1 float-left..."/>
							</div>
							<div>	 
							<input type="text" name="do2Date" placeholder="do2Date"
							onChange={e => setDo2Date(e.target.value)}
							 onKeyPress={handleKeyPress}
							className="w-32 m-2 p-1 float-left..."/>
							</div>
							<div>	 
							<input type="text" name="data1" placeholder="data1"
							onChange={e => setData1(e.target.value)}
							 onKeyPress={handleKeyPress}
							className="w-32 m-2 p-1 float-left..."/>
							</div>
								<div>	 
							<input type="text" name="data2" placeholder="data2"
							onChange={e => setData2(e.target.value)}
							 onKeyPress={handleKeyPress}
							className="w-32 m-2 p-1 float-left..."/>
							</div>
							<div>	 
							<input type="text" name="data3" placeholder="data3"
							onChange={e => setData3(e.target.value)}
							 onKeyPress={handleKeyPress}
							className="w-32 m-2 p-1 float-left..."/>
							</div>
							<div>	 
							<input type="text" name="data4" placeholder="data4"
							onChange={e => setData4(e.target.value)}
							 onKeyPress={handleKeyPress}
							className="w-32 m-2 p-1 float-left..."/>
							</div>
							<div>	 
							<input type="text" name="icno" placeholder="icno"
							onChange={e => setIcno(e.target.value)}
							 onKeyPress={handleKeyPress}
							className="w-32 m-2 p-1 float-left..."/>
							</div>
							 </div>
							 
							 
							 
							</div>
								 
							<div className="flex flex-wrap...">
							<div className="w-32 m-2 p-1 float-left..." >
						<button type="submit" onClick={handleSubmit}>Search</button>
						</div>
						 
						</div>	
						 
									
				</div>
	 </main>
			<main className="max-w-11/12xl mx-auto px-4 sm:px-6 lg:px-8 pt-0">
				
				<div className="-mt-2 max-h-1 py-0">
				 {loading && <>
						 
						 <div class="flex justify-center items-center">
  <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
    <span class="visually-hidden">Loading...</span>
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

export default withRouter(Do2ViewList);

