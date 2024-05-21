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


const IncrGeneration = () => {
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
	const [status,setStatus]=useState('');
	const [qe,setQe]=useState('');
	
	useEffect(() => {
		let isCancelled = false;
		 
			async function fetchData() {
				let record = '';
				await axios.get('/jobs/sysGen/incrGeneration/checkStatus')
					.then((response) => {
						console.log(response.data[0]);
						if(response.data[0])
							setStatus(response.data[0]);
						if(response.data[1])
							setMiscList(response.data[1]);
						 
						setLoading(false);
						 
						 
					
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
	
	 
	useEffect(() => {
		let isCancelled = false;
		 
			async function fetchCurrentQe() {
				let record = '';
				await axios.get('/miscs/currentMe')
					.then((response) => {
						record = response.data;
						setQe(response.data);
						 
					
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

			fetchCurrentQe();
			return () => {
				isCancelled = true;
			};
		 

	}, []);
	 
	
	  

 

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
	
	async function startScheduler() {
		setDisabled(true);
		await axios.put(`/jobs/incr/startScheduler`)
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
	async function startIncrGeneration() {
		setDisabled(true);
		await axios.post(`/jobs/incr/scheduleJob`)
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
			Header: "Int Number1",
			accessor: 'intNumber1',
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
		<div className="inline-flex">
			<main className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">
				 
				<div className="-mt-2 max-h-0 py-0 ml-0">
					<Table columns={columns} data={miscList} className="table-auto" />
				</div>
			</main>

		</div>
	);
	}
	 

	return (
		 
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">

				 
					<h1 > Increment Generation </h1>
					<div className="text-red-500">{serverErrors}</div>
					 
						 <div><label>Month {qe} </label></div>
						 
						 <div>
						 <br/>
						 </div>
						 
						 <div className="inline-flex">
					<button onClick={startIncrGeneration} disabled={disabled} >
					  
					   {disabled && (
						<span className="spinner-grow spinner-grow-sm"></span>
					)
						
					}
					Start Incr Generation</button>
					</div>
					
					
							 
						 <div className="inline-flex">
					<button onClick={startScheduler} disabled={disabled} >
					  
					   {disabled && (
						<span className="spinner-grow spinner-grow-sm"></span>
					)
						
					}
					Restart Scheduler</button>
					</div>
					
						 <div className="-mt-2 max-h-1 py-0">
					 
					 
					</div>
					{'    '}
					
					{miscList.length>0 && 
				 					<div>
							<ShowMiscList/>
							</div>
							}
				 
						
					 
				 
			</main>
		</div>
	);
	
};

export default withRouter(IncrGeneration);