/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 18 April 2022
 *
 * Modified By : 
 */

import { useState, useEffect } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import * as yup from "yup";

import { yupResolver } from '@hookform/resolvers/yup';
import LiveSearch from '../utils/LiveSearch';

//import DatePicker  from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";
//import addDays from 'date-fns/addDays'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

const schema = yup.object({
       
      
      fromDate: yup.string().required('Required'),
      
      subscription: yup.number().integer().required('Required'),
      refund: yup.number().integer().required('Required'),
       
      fundScheduleNo: yup.string().required('Required'),
      fundScheduleDate: yup.string().required('Required'),
   
});


const FundSubscriptionDeputationEdit = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [key, setKey] = useState('page1');
	const [me,setMe]=useState('');
	const [mesg,setMesg]=useState('');
	
	
	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get('/fundSubscriptionDeputations/' + id)
					.then((response) => {
						record = response.data;
						const fields = [
						'id', 'dak', 'employee', 'fromDate', 'toDate', 'subscription', 'refund', 'fundDebitAmount',
						'fundDebitMonth', 'fundDebitYear', 'fundScheduleNo', 'fundScheduleDate', 'monthEnding', 'so', 'recordStatus',
						'reason', 'auditorDate', 'aaoDate', 'aoDate', 'cdaoNo', 'checkDigit', 'task', 'approved', 'fundUpdated'				
					];
					fields.forEach(field => setValue(field, record[field]));
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
		}

	}, []);
	useEffect(() => {
		 
		let fetching = false;
		let unmounted = false;
		 
		async function fetchCurrentMe() {
		 
			if (!fetching)
				axios.get(`/miscs/currentMe`)
					.then((response) => {
						 setMe(response.data);
					 	 
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
		fetchCurrentMe();

		return () => { fetching = true  }
	}, []);

	const onSubmit = (data, event) => {
		event.preventDefault();
		console.log(data);
		if (data.id) {
			axios.put("/fundSubscriptionDeputations/" + data.id, data)
				.then((response) => { 
					setMesg(response.data);
			//		history.push("/fundSubscriptionDeputations");
				})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		} else {
			axios.post("/fundSubscriptionDeputations", data)
				.then((response) => { 
					setMesg(response.data);
				//	history.push("/fundSubscriptionDeputations");
				})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		}
	}

	const onError = (errors, e) => console.log(errors, e);

	//All foreign keys. 
	// XXXXXX Add search fields and adjust the values as necessary
	const parentData = {
	
	 
		employee: {
			title: "Employee",
			url: "employees/all/effective",
			searchList: ['cdaoNo', 'checkDigit', 'officerName'], //XXXXXXXXX Add search fields
			fkEntity: "employee",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
		 
	}

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
		const returnToList =() => {
		history.push("/fundSubscriptionDeputations");
	}


	return (
		//<div className="max-w-xl mx-auto ">
			//<div className="w-full w-3/4  mx-auto " >
			<div className="min-h-screen bg-gray-100 text-gray-900">
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Fund Subscription Deputation </h1>
					<div className="text-red-500">{mesg}</div>
					<Tabs
						id="FundSubscriptionDeputationEdit"
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className="mb-3"
					>
						<Tab eventKey="page1" title="Page 1" className="h-120">
							<div className="grid grid-cols-2 gap-0">
								 					
								<div>
									<label>Month</label>
									 {me}
								</div>
						
								<div >
									<LiveSearch name="employee" onChange={handleInputChange}
										parentData={parentData.employee} parentCallback={callback}
										fkEntity={entity.employee} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.employee?.message}</div>
								</div>					
								
						
								
								<div>
									<label>From Date</label>
									<input type="date" name="fromDate" {...register("fromDate")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.fromDate?.message}</div>
								</div>						
						
								
								 					
						
								<div>
									<label>Subscription</label>
									<input type="text" name="subscription" {...register("subscription")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.subscription?.message}</div>
								</div>
								
						
								<div>
									<label>Refund</label>
									<input type="text" name="refund" {...register("refund")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.refund?.message}</div>
								</div>
								
						
							   
								
						
								<div>
									<label>Fund Schedule No</label>
									<input type="text" name="fundScheduleNo" {...register("fundScheduleNo")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.fundScheduleNo?.message}</div>
								</div>
								
						
								
								<div>
									<label>Fund Schedule Date</label>
									<input type="date" name="fundScheduleDate" {...register("fundScheduleDate")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.fundScheduleDate?.message}</div>
								</div>						
						
							 
						
							 
								
						
								<div>
									<label>Reason</label>
									<textarea type="text" name="reason" {...register("reason")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.reason?.message}</div>
								</div>
								
						 
								
						
					
		
							</div>
						</Tab>

						<Tab eventKey="page2" title="Page 2" className="h-120">
							<div className="grid grid-cols-2 gap-0">
							<p>Add some fields here or delete this tab.</p>
							</div>
						</Tab>
						
						<Tab eventKey="help" title="Help" >
							<h1>Help</h1>
							<ul className="list-disc">
								<li>Point 1</li>
								<li>Point 2</li>
							</ul>
						</Tab>
											
					</Tabs>
						
						<div className="grid grid-cols-3 gap-0">
					<div className="px-4">
						<button type="submit" >Save</button>
					</div>
					<div className="px-4">
						<button type="submit" onClick={returnToList} >Cancel</button>
					</div>
					<div className="px-4">
						<button type="submit" onClick={returnToList} >Done</button>
					</div>
					</div>

				</form>
			</div>
		</div>
	);
};

export default withRouter(FundSubscriptionDeputationEdit);