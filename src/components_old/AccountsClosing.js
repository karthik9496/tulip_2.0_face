/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 18 April 2022
 *
 * Modified By : 
 */

import { useState, useEffect,useMemo } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import * as yup from "yup";
import Table0Pagination  from '../utils/Table0Pagination'  //
import Table  from '../utils/Table'  // 

import { yupResolver } from '@hookform/resolvers/yup';
import LiveSearch from '../utils/LiveSearch';

//import DatePicker  from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";
//import addDays from 'date-fns/addDays'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

const schema = yup.object({
      
});


const AccountsClosing = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [key, setKey] = useState('page1');
	const [data,setData]=useState([]);
	const [miscList,setMiscList]=useState([]);
	const [isLoading,setLoading]=useState(true);
	const [disabled,setDisabled]=useState(false);
	const [mpsDisabled,setMpsDisabled]=useState(false);
	const [allClosed,setAllClosed]=useState(false);
	const [closingDone,setClosingDone]=useState(false);
	const [ecsGenDone,setEcsGenDone]=useState(false);
	const [payBatch,setPayBatch]=useState('');
	
	useEffect(() => {
		let isCancelled = false;
		 
			async function fetchData() {
				let record = '';
				await axios.get('/jobs/closingInfo/fetchAll')
					.then((response) => {
						record = response.data;
						setLoading(false);
						console.log(record[0].allClosed);
						if(record[0].allClosed)
						 	setAllClosed(true);
						 if(record[0].ecsGenDone)
						 	setEcsGenDone(true);
						 if(record[0].cmpBatch)
						 	setPayBatch(record[0].cmpBatch);
						if(record[0].allClosed && record[0].ecsGenDone){
							setServerErrors("Regular Closing And ECS Done.");
							setClosingDone(true);
						}
						setData(record);
						if(record[0].miscList!=null)
							setMiscList(record[0].miscList);
						else if(record[1].miscList!=null)
							setMiscList(record[1].miscList);
					
					})
					.catch((error) => {
						//console.log(error);
						//console.log(error.response.status);
						//console.log(error.response.headers);
						if(error.response)
							setServerErrors(error.response.data.error);
						else
							setServerErrors(error.Error);
					});


				if (!isCancelled) {
					setEntity(record);
					setState(prev => ({ ...prev, state: record }));
				}
			}

			fetchData();
			return () => {
				isCancelled = true;
			};
		 

	}, []);
	
	async function startScheduler() {
		setDisabled(true);
		await axios.put(`/jobs/accountsClosing/startScheduler`)
			.then((response) => {
				//console.log(data);
				 setDisabled(false);
				 setServerErrors(response.data);
			})
			.catch((error) => {
				setDisabled(false);
				console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}
	
	async function startBatchScheduler() {
		setDisabled(true);
		await axios.put(`/jobs/accountsClosingSelected/startScheduler`)
			.then((response) => {
				//console.log(data);
				 setDisabled(false);
				 setServerErrors(response.data);
			})
			.catch((error) => {
				setDisabled(false);
				console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}
	
	async function startEcsGenScheduler() {
		setDisabled(true);
		await axios.put(`/jobs/ecsgen/startScheduler`)
			.then((response) => {
				//console.log(data);
				 setDisabled(false);
				 setServerErrors(response.data);
			})
			.catch((error) => {
				setDisabled(false);
				console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}
	
	async function startNeClosingScheduler() {
		setDisabled(true);
		await axios.put(`/jobs/neClosing/startScheduler`)
			.then((response) => {
				//console.log(data);
				 setDisabled(false);
				 setServerErrors(response.data);
			})
			.catch((error) => {
				setDisabled(false);
				console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}
	
	async function startMpsScheduler() {
		setMpsDisabled(true);
		await axios.put(`/jobs/mps/startScheduler`)
			.then((response) => {
				//console.log(data);
				 setMpsDisabled(false);
				 setServerErrors(response.data);
			})
			.catch((error) => {
				setMpsDisabled(false);
				console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}
	async function startMpsBatchScheduler() {
		setMpsDisabled(true);
		await axios.put(`/jobs/mps/startBatchScheduler`)
			.then((response) => {
				//console.log(data);
				 setMpsDisabled(false);
				 setServerErrors(response.data);
			})
			.catch((error) => {
				setMpsDisabled(false);
				console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}

	async function scheduleClosing() {
		setDisabled(true);
		await axios.put(`/jobs/accountsClosing/scheduleJob`)
			.then((response) => {
				//console.log(data);
				 setDisabled(false);
				 setServerErrors(response.data);
			})
			.catch((error) => {
				setDisabled(false);
				console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}
	async function scheduleEcsGen() {
		setDisabled(true);
		await axios.put(`/jobs/ecsGen/scheduleJob`)
			.then((response) => {
				//console.log(data);
				 setDisabled(false);
				 setServerErrors(response.data);
			})
			.catch((error) => {
				setDisabled(false);
				console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}

async function scheduleNeClosing() {
		setDisabled(true);
		await axios.put(`/jobs/neClosing/scheduleJob`)
			.then((response) => {
				//console.log(data);
				 setDisabled(false);
				 setServerErrors(response.data);
			})
			.catch((error) => {
				setDisabled(false);
				console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}
	
	async function scheduleMps() {
		setMpsDisabled(true);
		await axios.put(`/jobs/mps/scheduleJob`)
			.then((response) => {
				//console.log(data);
				 setMpsDisabled(false);
				 setServerErrors(response.data);
			})
			.catch((error) => {
				setMpsDisabled(false);
				console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}

async function neNominalRoll() {
		setDisabled(true);
		await axios.get(`/employeeDeductions/neClosing/nominalRoll`)
			.then((response) => {
				//console.log(data);
				 setDisabled(false);
				 setServerErrors(response.data);
			})
			.catch((error) => {
				setDisabled(false);
				console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}
 
	async function pmcs() {
		setDisabled(true);
		await axios.post(`/employeeDeductions/payPmCs/generate/${payBatch}`)
			.then((response) => {
				//console.log(data);
				 setDisabled(false);
				 setServerErrors(response.data);
			})
			.catch((error) => {
				setDisabled(false);
				console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}
	const onError = (errors, e) => console.log(errors, e);

	 

	//Callback for child components (Foreign Keys)
	const callback = (childData) => {
		//console.log("Parent Callback");
		//setEntity(prev => ({ ...prev, [childData.fk]: childData.entity }));
		setValue(childData.fk, childData.entity);
		//console.log(errors);
		clearErrors(childData.fk);
	};

	const errorCallback = (err) => {
		//console.log(err);
		setServerErrors(err);
	}

	const handleInputChange = (e) => {
		//console.log(e.target.value);
	};
	
	const ShowMiscList=() =>{
		 
		
		const columns = useMemo(() => [

		 {
			Header: "Misc Id",
			accessor: 'id',
		},

		{
			Header: "Key1",
			accessor: 'key1',
		},

		 {
			Header: "Value1",
			accessor: 'value1',
		},
		{
			Header: "Value2",
			accessor: 'value2',
		},
		{
			Header: "Start Id",
			accessor: 'number1',
		},
		{
			Header: "End Id",
			accessor: 'number2',
		},
		 		
	], [miscList,setMiscList])
	
	return (
		<div class="inline-flex">
			<main className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">
				 
				<div className="-mt-2 max-h-0 py-0 ml-0">
					<Table columns={columns} data={miscList} className="table-auto" />
				</div>
			</main>

		</div>
	);
	}
	const columns = useMemo(() => [
		 
		{
			Header: "Month",
			accessor: 'me',// Change this
		},
		
		{
			Header: "Type",
			accessor: 'accountsType',// Change this
		},
		{
			Header: "Total IRLA (R)",
			accessor: 'totalNoOfAccounts',
		},
		
		{
			Header: "Accounts Closed",
			accessor: 'accountsClosed',
		},
		{
			Header: "ECS Generated",
			accessor: 'ecsGenerated',
		},
		
		{
			Header: "Cmp Batch",
			accessor: 'cmpBatch',
		},
		
		{
			Header: "MinId",
			accessor: 'minId',
		},
		
		{
			Header: "MaxId",
			accessor: 'maxId',
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
			<main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">

				 
					<h1 > Accounts Closing </h1>
					<div className="text-red-500">{serverErrors}</div>
					 
						 {isLoading && <>
						 
						 <div class="flex justify-center items-center">
  <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
						</>	
						}

						
						{ !isLoading && <>
						 <div className="-mt-2 max-h-1 py-0">
					<Table0Pagination columns={columns} data={data} className="table-auto"   />
					
					{!allClosed && !closingDone &&
					<div class="inline-flex"> 
					<div>
					<button onClick={scheduleClosing} disabled={disabled} >
					 {disabled && (
						<span className="spinner-grow spinner-grow-sm"></span>
					)
						
					}
					Schedule Closing Job</button>
					</div>
					{'    '}
					<div>
					<button onClick={startScheduler} disabled={disabled} >
					  
					Start Scheduler</button>
					</div>
					{'    '}
					<div>
					<button onClick={startBatchScheduler} disabled={disabled} >
					  
					Start Batch Scheduler</button>
					</div>
					</div>
					}
					{allClosed && !closingDone &&
					<div className="inline-flex"> 
					<div>
					<button onClick={scheduleEcsGen} disabled={disabled} >
					 {disabled && (
						<span className="spinner-grow spinner-grow-sm"></span>
					)
						
					}
					Schedule ECS Generation</button>
					</div>
					{'    '}
					<div>
					<button onClick={startEcsGenScheduler} disabled={disabled} >
					  
					Start Scheduler</button>
					</div>
					</div>
					}
					{allClosed && ecsGenDone &&
					<div className="inline-flex"> 
					<div>
					<button onClick={pmcs} disabled={disabled} >
					 {disabled && (
						<span className="spinner-grow spinner-grow-sm"></span>
					)
						
					}
					Neft PM/CS</button>
					</div>
				 
					</div>
					}
					{allClosed &&    <>
						<div className="inline-flex"> 
					<div>
					<button onClick={scheduleMps} disabled={disabled} >
					 {disabled && (
						<span className="spinner-grow spinner-grow-sm"></span>
					)
						
					}
					Schedule MPS Generation</button>
					</div>
					{'    '}
					<div>
					<button onClick={startMpsScheduler} disabled={disabled} >
					  
					Start MPS Scheduler</button>
					</div>
					
					 <div>
					<button onClick={startMpsBatchScheduler} disabled={disabled} >
					  
					Start MPS-Batch Scheduler</button>
					</div>
					
					</div></>
					}
					{allClosed && ecsGenDone &&  <>
						<div className="inline-flex"> 
					<div>
					<button onClick={scheduleNeClosing} disabled={disabled} >
					 {disabled && (
						<span className="spinner-grow spinner-grow-sm"></span>
					)
						
					}
					Schedule NE Closing</button>
					</div>
					{'    '}
					<div>
					<button onClick={startNeClosingScheduler} disabled={disabled} >
					  
					Start Scheduler</button>
					</div>
					
					{'    '}
					<div>
					<button onClick={neNominalRoll} disabled={disabled} >
					  
					Ne Nominal Roll</button>
					</div>
					
					</div></>
					}
					<div>
							<ShowMiscList/>
							</div>
				</div>
				</>
				}
						
					 
				 
			</main>
		</div>
	);
	
};

export default withRouter(AccountsClosing);