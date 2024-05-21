/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 18 April 2022
 *
 * Modified By : 
 */

import { useState, useEffect, useMemo } from 'react';
 
import TablePage  from '../utils/TablePageAdj' 
import axios from "axios";
import { format } from 'date-fns'
import { withRouter, Link } from "react-router-dom";

function AdjustmentList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	const [action,setAction]=useState('')
	const [disabled,setDisabled]=useState(false);
	const [selectedSection,setSelectedSection]=useState('');
	const [payCodeSearch,setPayCodeSearch]=useState('');
	const [page,setPage]=useState(0);
	const [usrLevel, setUsrLevel] = useState(0);
	 
	
	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			 
			if(!fetching)
			await axios.get('/adjustments?search='+search+'&payCode='+payCodeSearch)
				.then((response) => {
					 setData(response.data);
					 console.log("--action--:" + response.data['action']);
				})
				.catch((error) => {
					if (error.response)
						setServerErrors(error.response.data.error);
					else
						setServerErrors(error.Error);
				})
		}
		fetchData();
		return () => { fetching = true; }

	}, [update, search,payCodeSearch]);
	
	useEffect(() => {
		let fetching = false;
		async function fetchUsrData() {
			if (!fetching)
				console.log(">>>>Usr Level is -----:" + usrLevel);
			await axios.get(`/initialOccupationReturnTransactions/userDesg`)
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

	}, []);
    useEffect(() => {		 
		async function fetchAction() {
				 
		     await axios.get(`/adjustments/section/action`)
				.then((response) => {
						console.log("I am here " + response.data);
						setAction(response.data);						 
			 	})
				.catch((error) => {
					if(error.response)
						setServerErrors(error.response.data.error);
					else
					 	setServerErrors(error.Error);
			 	});
			 					
		}

		fetchAction();
	},  [update]);

const submitApproveBulk = () => {
		 if(disabled)
		 	return;
	//	console.log(data);
		//console.log("data id--------------"+data.id);
		 setDisabled(true);
			axios.put(`/adjustments/submitApprove/bulk`,data)
				.then((response) => { 
					setDisabled(false);
					console.log(response.data[1]);
					if(response.data[0])
						setData(response.data[0]);
					if(response.data[1])
						setServerErrors(response.data[1]);
				})
				.catch((error) => {
				 
					if (error.response)
						setServerErrors(error.response.data);
					else
						setServerErrors(error);
				});
		

		//history.push("/daks");
	}

	 
	 
	async function remove(id) {
		await axios.delete(`/adjustments/${id}`)
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
	
	async function handleAction() {
		if (action==='submission'){
			await axios.put(`/adjustments/section/bulkSubmitAdjCb}`+data)
			.then((response) => {				
				 // handle message
			})
			.catch((error) => {
				console.log(error);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
		}
		if (action==='approval'){
			await axios.put(`/adjustments/section/bulkApproveAdjCb}`+data)
			.then((response) => {				
				 // handle message
			})
			.catch((error) => {
				console.log(error);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
		}
		
	}

    async function submit(id) {
		await axios.put(`/adjustments/submitAdjCb/${id}`)
			.then((response) => {
				//console.log(data);
			//	setMesg(response.data);
				let updatedRecords = [...data].filter((i) => i.id !== id);
				//console.log(updatedRecords);
				setData(updatedRecords);
				 
			})
			.catch((error) => {
				console.log(error);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}
	
	
	async function approve(id) {
		await axios.put(`/adjustments/approveAdjCb/${id}`)
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
	
	const handleCheckBox = index=>(e) =>{
		console.log(e.target.checked+"--"+index);			  
		console.log(e.target.checked);
		let item = data[index];
		 
		item['select'] = e.target.checked;
		let newData = [...data];
		newData[index] = item;
		setData(newData);		 
	}
	 
	
	const updateCheckBoxAll = (e) =>{		   
		let newData=[...data];
		for(var k in newData){
			newData[k].select=e.target.checked;
		}
		setData(newData);		 
	}
	
	 const ShowList=()=>{

	const columns = useMemo(() => [
		 {			
			Header: <div>
			{
				(action==="submission" || action==="approval") && 
				<input type="checkbox" onChange={updateCheckBoxAll}/>
				
			}
			{
				(action!=="submission" && action!=="approval") &&
				 <div>
				    <label>Action</label>
				  </div>	
				
			}
			</div>,
			accessor : "select",	
			Cell: ({ row }) => (	
					<div>
					 {row.original.action==='Editable' && 
					<Link to={"/adjustments/"+ row.original.id}>
						<button className=" w-16 m-0 p-0 " > Edit </button>
					</Link>
					}
					 
					{' '}
					{(row.original.action==='submission' || row.original.action==='approval')  &&	<>				
					 <div>
						<input type="checkbox" onChange={handleCheckBox(row.index)} checked={data[row.index]['select']}/>
						</div>	
						<div><label>{row.original.action}</label></div>			 
				</>
					}
					 </div>
			)
		},
	 	{
			Header: "Cdao No",
			accessor: 'cdaoNo',
			Cell: ({ row }) => (
				<div>
				  <div>
				   {row.original.cdaoNo}{row.original.checkDigit}<br/>
				   {row.original.employee.officerName}<br/>{row.original.employee.statusCode.statusName}
				  </div>				   
				</div>
				
			)
		},
		
		 {
			Header: "Dakid No",
			accessor: 'dak.dakidNo',
			 
		},
		
		{
			Header: "Unit/Task",
			accessor: 'unit.unitCode',
			Cell: ({ row }) => (
				<div>
				  <div>
				    {row.original.employee!=null && (<>
				    {row.original.employee?.presentUnit?.unitCode}/{row.original.employee.task}
				    </>)}
				  </div>				   
				</div>
				
			)
		},
		
		{
			Header: "Pay Code",
			accessor: 'payCode.payCode',
		},		
		
		{
			Header: "Pay Code Str",
			accessor: 'payCodeStr',
		},
		
		{
			Header: "From Date",
			accessor: 'fromDate',
			Cell: ({ row }) => (
				<div>
				  <div>
				  <label>{format(new Date(row.original.fromDate.toString()),'dd/MM/yyyy')}</label>
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
				  {row.original.toDate && <>
				      <label>{format(new Date(row.original.toDate.toString()),'dd/MM/yyyy')}</label>
				      </>
				      }
				  </div>				   
				</div>
				
			)
		},
		{
			Header: "Page No",
			accessor: 'pageNo',
		},
		{
			Header: "Amount",
			accessor: 'amount',
		},
		
		{
			Header: "Record Status",
			accessor: 'recordStatus',
		},
		
		{
			Header: "Approved",
			accessor: 'approved',
			Cell: ({ row }) => (
				<div>
				  <div>
				    <label>{row.original.approved.toString()}</label>
				  </div>				   
				</div>
			)
		},
		
	
		
		{
			Header: "Month",
			accessor: 'monthEnding',
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
			Header: "Sys/Man",
			accessor: 'transcriptionType',
		},	
		{
			Header: "Aud",
			accessor: 'auditorDate',
			Cell: ({ row }) => (
				 
				  <div>
				  {row.original.auditor && row.original.auditorDate!==null && <>
				    {row.original.auditor.name}<br/>{format(new Date(row.original.auditorDate.toString()),'dd/MM/yyyy')}
				    </>
				    }
				  </div>				   
				 
			)
		},		
		{
			Header: "AAO",
			accessor: 'aaoDate',
			Cell: ({ row }) => (
				 
				  <div>
				  {row.original.aao && <>
				    {row.original.aao.name}<br/>{format(new Date(row.original.aaoDate.toString()),'dd/MM/yyyy')}
				    </>
				    }
				  </div>				   
				 
			)
		},	
		
		 
	], [data, action])
	
	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				 
				<div className="-mt-2 max-h-0 py-0 ml-0">
					<TablePage columns={columns} data={data} newpage={page} parentCallback={handleCallBack} className="table-auto" />
					 {(action==='submission' || action==='approval') && <> 
				 <div  className="mt-2 ml-4">
						 
						 
							<button type="button" onClick={submitApproveBulk}  className=" mt-3  w-40  " >Submit/Approve</button>
						 
					</div><br/><br/>
					</>
					}
				</div>
			</main>

		</div>
	);
	
	}

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
	const handleCallBack = (pp)=>{
		console.log(pp); 
		setPage(pp);
	}

	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
				<div className="text-red-500">{serverErrors}</div>
					<h1 className="text-xl font-semibold">Adjustment</h1>
					
					 
					 
					<div className="flexContainer">
					<div>
						<input type="text" name="search" 
						onChange={e => setInputText(e.target.value)} placeholder="army no"
							onKeyPress={handleKeyPress}
							className="pl-2 -ml-2 inputField flex-initial" />
							</div>
							
							<div>
						<input type="text" name="search" 
						onChange={e => setPayCodeSearch(e.target.value)} placeholder="pay code"
							onKeyPress={handleKeyPress}
							className="pl-2 -ml-2 inputField flex-initial" />
							</div>
							<div>
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
						</div>
						{usrLevel<30 &&
						<div>
							<Link to={"/adjustments/new"}>
								<button className=" w-48 ml-8 p-0 h-6 -mt-2" > Add Adjustment  </button>
							</Link>
						</div>
						}
						<div>
							<Link to={"/adjustments/section/approved"}>
								<button className=" w-48 ml-8 p-0 h-6 -mt-2" > Approved Adjustments</button>
							</Link>
						</div>
					</div>
					 			
				</div>	
				
				 	 
				<div>
					
				<ShowList/>
				
					</div>
			</main>
		</div>
		
	);
}

export default withRouter(AdjustmentList);

