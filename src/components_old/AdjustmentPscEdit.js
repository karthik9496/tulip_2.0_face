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
import { format } from 'date-fns'

import { yupResolver } from '@hookform/resolvers/yup';
import LiveSearch from '../utils/LiveSearch';

//import DatePicker  from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";
//import addDays from 'date-fns/addDays'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

const schema = yup.object({
      //employee: yup.object().required('Required'),
      payCode: yup.object().required('Required'),
      fromDate: yup.string().required('Required'),
     
});


const AdjustmentPscEdit = () => {
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
	const	[disabled,setDisabled]=useState(false);
	const [adjPayCode,setAdjPayCode]=useState([]);
	const [selectedPayCode,setSelectedPayCode]=useState({});
	const [empId, setEmpId] = useState(0);
	const [dakidNo,setDakIdNo]=useState('');
	
	const [checked, setChecked]=useState(false);
    const [buttonState, setButtonState] = useState('');
	 
	
	console.log("------------------------------id-----:" + id);
	useEffect(() => {
		let isCancelled = false;
	 
		 
			
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get('/adjustments/psc/' + id)
					.then((response) => {
						 
						record = response.data;
						 
						 
						if(response.data['payCode']!==null){
							setSelectedPayCode(response.data['payCode']);
						}
						 
						if(response.data['dak']!==null){
							console.log("--dak--:"+ response.data['dak'].id);
							setDakIdNo(response.data['dak'].dakidNo);
						}
						
						if(record.chargedExpenditure){
							setChecked(true);
						setValue('chargedExpenditure',true);
						}
							console.log(record.fromDate+"--"+record.toDate);
						const fields = [
						'id', 'employee', 'batchNo', 'armyNo', 'checkDigit', 'transcriptionType', 'unit', 'do2ReferenceNo', 
						'payCode', 'fromDate', 'toDate', 'amount', 'adjCb', 'monthEnding', 'pageNo', 'recordStatus',
						 'rejectionReason', 'dak', 'auditorDate', 'aaoDate', 'aoDate', 'task', 'payCode', 'itAdjustment', 
						 'approved',  'remarks', 'hoo', 'hooDate', 'paid','module' ,'action','chargedExpenditure'	
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
		 
			async function fetchAdjPayCode() {			
				await axios.get(`/payCodes/adj/paycodes`)
					.then((response) => {
						setAdjPayCode(response.data);
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

			}
			fetchAdjPayCode();
			 
		

	}, []);
	 
	 
	
	useEffect(() => {
	 
		 
			async function fetchCurrentMe() {
			 
				 
				await axios.get(`/miscs/currentMe`)
					.then((response) => {
						console.log(response.data+"--"+response.data.length);
						 
						if(response.data!==null){
							setMe(response.data);
							}
						 
						 
						 
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

			 
				
			}

			fetchCurrentMe();
			 
		

	}, []);


	const handleAdjPayCodeChange = (e) => {
		console.log(">>>" + e.target.value);
		console.log(e.target.selectedIndex-1);
		 
		setSelectedPayCode(adjPayCode[e.target.selectedIndex-1]);		 
		setValue('payCode', adjPayCode[e.target.selectedIndex-1]);
		 
	};
	 
	 
	
	const returnToList =() => {
		history.push('/adjustments/psc');
	}

	const onSubmit = (data, event) => {
		event.preventDefault();
		console.log(data);
		if(disabled)
			return;
			
			setDisabled(true);
		if (data.id) {
			axios.put("/adjustments/psc/" + data.id, data)
				.then((response) => { 
					
					console.log(response.data.recordStatus+"--"+response.data.rejectionReason);
					 if(response.data.employee!==null && response.data.payCode!==null){
						 if(response.data.rejectionReason!==null)
					 		setServerErrors("DAK id : "+response.data.dak.dakidNo+" : "+response.data.employee.cdaoNo+" : "+response.data.payCode.payCode+" : + Amt : "+response.data.amount+":"+ response.data.rejectionReason);
					 	else
					 		setServerErrors("DAK id : "+response.data.dak.dakidNo+" : "+response.data.employee.cdaoNo+" : "+response.data.payCode.payCode+" : + Amt : "+response.data.amount);
					 }else
					 	setServerErrors(response.data.rejectionReason);
					 
					 
				})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		} else {
			console.log("before post");
			axios.post("/adjustments/psc", data)
				.then((response) => { 
					 console.log(response.data.recordStatus+"--"+response.data.rejectionReason);
					 if(response.data.employee!==null && response.data.payCode!==null){
						  if(response.data.rejectionReason!==null)
					 		setServerErrors("DAK id : "+response.data.dak.dakidNo+" : "+response.data.employee.cdaoNo+" : "+response.data.payCode.payCode+" : + Amt : "+response.data.amount+":"+ response.data.rejectionReason);
					 	else
					 		setServerErrors("DAK id : "+response.data.dak.dakidNo+" : "+response.data.employee.cdaoNo+" : "+response.data.payCode.payCode+" : + Amt : "+response.data.amount);
					 }
					 	
					 else
					 	setServerErrors(response.data.rejectionReason);
					 	
					 	 
					 	setDisabled(false);
					 let record = response.data;
					  console.log(record.fromDate+"--"+record.toDate);
					 const fields = ['unit','employee','payCode', 'fromDate', 'toDate', 'amount', 'adjCb', 'monthEnding'];
					fields.forEach(field => setValue(field, record[field]));
					
					console.log(format(new Date(record.fromDate.toString()),'yyyy-MM-dd'))
					 setEntity(record);
					 if(record.fromDate && record.toDate){
					 	let newFromDate=format(new Date(record.fromDate.toString()),'yyyy-MM-dd');
					 	let newToDate=format(new Date(record.toDate.toString()),'yyyy-MM-dd');
					 	setValue("fromDate",newFromDate);
					 	setValue("toDate",newToDate);	
					 }
					  
					 	
					 
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
			url: "employees/all/bListed",
			searchList: ['task','cdaoNo', 'checkDigit', 'officerName'], //XXXXXXXXX Add search fields
			fkEntity: "employee",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
		 
		unit: {
			title: "Unit",
			url : "units",
			searchList : ['unitCode','unitName'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "unit",
		},
		adjPayCode: {
			title: "Pay Code",
			url : "payCodes/adj/paycodes",
			searchList : ['payCode','debitCredit'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "payCode",
		},
		cbPayCode: {
			title: "Pay Code",
			url : "payCodes/cb/paycodes",
			searchList : ['payCode','debitCredit'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "payCode",
		},
		allPayCode: {
			title: "Pay Code",
			url : "payCodes",
			searchList : ['payCode','debitCredit'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "payCode",
		},
		itAdjPayCode: {
			title: "Pay Code",
			url : "payCodes/itadj/paycodes",
			searchList : ['payCode','debitCredit'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "payCode",
		},
		dak: {
			title: "Dak",
			url : "daks",
			searchList : ['id'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "dak",
		},
		 
	}

	//Callback for child components (Foreign Keys)
	const callback = (childData) => {
		console.log("Parent Callback"+childData.fk);
		//setEntity(prev => ({ ...prev, [childData.fk]: childData.entity }));
		setValue(childData.fk, childData.entity);
		//console.log(errors);
		if(childData.fk==='employee')
			setEmpId(childData.entity.id)
		clearErrors(childData.fk);
	};

	const errorCallback = (err) => {
		//console.log(err);
		setServerErrors(err);
	}

	const handleInputChange = (e) => {
		//console.log(e.target.value);
	};
	const handleChargedExpenditure = (e) => {
		//console.log(e.target.checked);
	 
			setChecked(e.target.checked);
			setValue('chargedExpenditure',e.target.checked);
			 
	 
	};
	const updateButtonState = (e) => {
		console.log("updating button state " + e);
		setButtonState(e);
	};

	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4" >

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Adjustment </h1>
					<div className="text-red-500">{serverErrors}</div>
					<Tabs
						id="AdjustmentEdit"
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className="mb-3" >
						<Tab eventKey="page1" title="Page 1" className="h-120">
		 
					  
							
							<div className="grid grid-cols-2 gap-0">
							
							
								
								<div>
									<label>Month Ending</label>
									{me}
								</div>
								
								<div>
									<label>DakId No</label>
									{dakidNo}
								</div>
							    
						
								<div >
									<LiveSearch name="employee" onChange={handleInputChange}
										parentData={parentData.employee} parentCallback={callback} 
										fkEntity={entity.employee} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.employee?.message}</div>
								</div>	
								 		
								 		<div>
						<label>Charged Expenditure</label>
						<input type="checkbox" name="mr" onChange={handleChargedExpenditure} checked={checked} onClick={() => updateButtonState('ce')}/>
						
						 	 					
							 
						 
						</div>				
								
								<div>
									<label>From Date</label>
									<input type="date" name="fromDate" {...register("fromDate")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.fromDate?.message}</div>
								</div>						
						
								
								<div>
									<label>To Date</label>
									<input type="date" name="toDate" {...register("toDate")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.toDate?.message}</div>
								</div>		
								
							 
								
								<div >
							<b>Pay Code</b>
							<select className="form-control py-0"
								 
								value={selectedPayCode.payCode}
								onChange={handleAdjPayCodeChange}>
								<option key={0} value={0}>---select---</option>
								{adjPayCode.map((item) => (
									<option key={item.id} value={item.payCode}> {item.payCode}:{item.debitCredit} </option>
								))}
							</select>
						</div>
								
						 
								<div>
									<label>Amount</label>
									<input type="text" name="amount" {...register("amount")}
										className="form-control py-0"	/>
									<div className="text-red-500">{errors.amount?.message}</div>
								</div>
								
								 					
						
								<div>
									<label>Page No</label>
									<input type="text" name="pageNo" {...register("pageNo")}
										className="form-control py-0"	/>
									<div className="text-red-500">{errors.pageNo?.message}</div>
								</div>
								
								<div>
									<label>Remarks/Working Sheet</label>
									<textarea type="text" name="remarks" {...register("remarks")}
										className="form-control py-0" />
									<div className="text-red-500">{errors.remarks?.message}</div>
								</div>
							</div>
						 
							 
						 
				 
						</Tab>

						 
						
						
						<Tab eventKey="help" title="Help" >
							<h1>Help</h1>
							<ul className="list-disc">
								
								<li>Point 1 : Please note the nature of the Pay Code selected -- DEBIT(D)/CREDIT(C) and read the next two points for feeding the amount</li>
								<li>Point 2 : For CREDIT items, amount entered with (-) sign will be debited and amount entered without sign will be credited in the IRLA.</li>
								<li>Point 3 : For DEBIT items,  amount entered with (-) sign will be credited and amount entered without sign will be debited in the IRLA.</li>
							</ul>
						</Tab>
											
					</Tabs>
						
					 
					<div className="grid grid-cols-2 gap-0">
					<div className="px-3 ...">
						<button type="submit" disabled={disabled}>Save</button>
						</div>
						<div className="px-3 ...">
						<button type="button" onClick={returnToList} >Done</button>
						</div>
					</div>
				 

				</form>
			</div>
		</div>
	);
};

export default withRouter(AdjustmentPscEdit);