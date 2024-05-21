/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By : 
 */

import { useState, useEffect, useRef } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import * as yup from "yup";

import { yupResolver } from '@hookform/resolvers/yup';
import LiveSearch from '../utils/LiveSearch';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import addDays from 'date-fns/addDays'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'


const schema = yup.object({
	 
	employee: yup.object().required('Required'),
	demandDate:yup.date().required('Required'), 
	 
});

 

const DemandRegisterManualEdit = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();
	//console.log(id);

	let history = useHistory();
 
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [loading, setLoading] = useState(true);
	const [empId,setEmpId]=useState(0);
	 
 
	

	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get('/demandRegisters/manualDemand/' + id)
					.then((response) => {
						record = response.data;
					})
					.catch((error) => {
						//console.log(error);
						//console.log(error.response.status);
						//console.log(error.response.headers);
						if (error.response)
							setServerErrors(error.response.data.error);
						else
							setServerErrors(error.Error);
					});
   
     
				const fields = [
					'id', 'dak', 'employee', 'cdaoNo', 'checkDigit', 'settlementDak', 'unit', 'advanceType',
					'amount', 'demandDate', 'demandMonth', 'demandOrigin', 'authorityNo','value1','value2',
					'authorityDate', 'cdrNo', 'demandApproved', 'reason', 'settled', 'journeyStartDate',
					'email', 'auditorDemandDate', 'aaoDemandDate', 'aoDemandDate', 'recordStatus'
				];
				
				 
				 
				fields.forEach(field => setValue(field, record[field]));
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

	}, [id, setValue]);


	 
	const onSubmit = (data, event,) => {
		event.preventDefault();
		console.log("777777777:"+data);
		if (data.id) {
			axios.put("/demandRegisters/newDemand/" + data.id, data)
				.then((response) => { 
					 history.push("/demandRegisters/newDemand/showManual");
					 
			})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log("response--------"+error.response.status);
				 
					setServerErrors(error.response.data['reason']);
				});
	 
		} 

		 
	}

	 

	const onError = (errors, e) => console.log(errors, e);

	//All foreign keys. 
	// XXXXXX Add search fields and adjust the values as necessary
	const parentData = {

		 
		 
		 
		employee: {
			title: "Employee",
			url: "employees",
			searchList: ['cdaoNo', 'officerName'], //XXXXXXXXX Add search fields
			fkEntity: "employee",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
		
		 
		 
	}
 
	//Callback for child components (Foreign Keys)
	 
	const callback = (childData) => {
		
		setEntity(prev => ({ ...prev, [childData.fk]: childData.entity }));
		setValue(childData.fk, childData.entity);
		//console.log(errors);
		// console.log(childData.fk+"--"+childData.entity.id);
		 
		if(childData.fk==='employee')
			setEmpId(childData.entity.id)
			
		 
			
		clearErrors(childData.fk);
		 
	};

	const errorCallback = (err) => {
		//console.log(err);
		setServerErrors(err);
	}
	
	const handleButtonClick = (e) =>{
		history.push("/demandRegisters");
	}
	
	 

	const handleInputChange = (e) => {
		console.log(e.target.value);
	//	console.log("handle input change");
		 
		
	};
	
	const handleInputCdrChange = (e) => {
		console.log(e.target.value);
		setValue('cdrNo',e.target.value);
	//	console.log("handle input change");
		 
		
	};	 
	
	const handleInputDemandOriginChange = (e) => {
		console.log(e.target.value);
		setValue('demandOrigin',e.target.value);
	//	console.log("handle input change");
		 
		
	}; 
	   
	return (
		<div className="max-w-xl mx-auto ">
			<div className="w-full w-3/4  mx-auto " >

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Demand Register</h1>
					<div className="text-red-500">{serverErrors}</div>
					 

					 
							<div className="grid grid-cols-2 gap-0 ">
							
							  

								<div >
									<LiveSearch name="employee" onChange={handleInputChange}
										parentData={parentData.employee} parentCallback={callback}
										fkEntity={entity.employee} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.employee?.message}</div>
								</div>
								 
								 <div>
									<label>VR No</label>
									<input type="text"    name="authorityNo" {...register("authorityNo")}
										/>
									<div className="text-red-500">{errors.authorityNo?.message}</div>
								</div>
								
								
								<div>
									<label>VR Date</label>
									<input type="date" name="authorityDate" {...register("authorityDate")}
										className="form-control py-0"/>
									<div className="text-red-500">{errors.authorityDate?.message}</div>
								</div>
								
								
								<div>
									<label>Type of Demand</label>
										<select name="cdrNo" className="form-control py-0" onChange={handleInputCdrChange} {...register("cdrNo")}>
											<option value="select">--Select--</option>
											<option key="1" value="TADATD">Temporary Duty</option>
											<option key="2" value="TADAPT">Permanent Duty</option>
											<option key="3" value="LTC">LTC</option>
											{/* <option key="4" value="TAPTREC">Recovery-Permanent Transfer</option>
											<option key="5" value="TADAREC">Recovery-Temporary Duty</option>
											<option key="5" value="LTCREC">Recovery-LTC</option> */}
										</select>
									
								</div>
								  
								
								 	<div>
									<label>From Date</label>
									<input type="date" name="journeyFromDate" {...register("journeyFromDate")}
										className="form-control py-0"/>
									<div className="text-red-500">{errors.journeyFromDate?.message}</div>
								</div>		 
								  
 								<div>
									<label>Advance Amount</label>
									<input type="text"    name="amount" {...register("amount")}
										/>
									<div className="text-red-500">{errors.amount?.message}</div>
								</div>
								<div>
									<label>From Station</label>
									<input type="text"    name="value1" {...register("value1")}
										/>
									<div className="text-red-500">{errors.value1?.message}</div>
								</div>
								<div>
									<label>To Station</label>
									<input type="text"    name="value2" {...register("value2")}
										/>
									<div className="text-red-500">{errors.value2?.message}</div>
								</div>
								<div>
									<label>Demand Origin</label>
										<select name="demandOrigin" className="form-control py-0" onChange={handleInputDemandOriginChange} {...register("demandOrigin")}>
											<option value="select">--Select--</option>
											<option key="1" value="PCDA Hqrs">PCDA Hqrs</option>
											<option key="2" value="LPC">LPC</option>
											<option key="3" value="OTHERS">Others</option>
											 
										</select>
									
								</div>
								<div>
									<label>Date of Advance</label>
									<input type="date" name="demandDate" {...register("demandDate")}
										className="form-control py-0"/>
									<div className="text-red-500">{errors.demandDate?.message}</div>
								</div>		
							 
</div>
						 
								<div className="grid grid-cols-2 gap-0">
								<div className="px-2">
						<button type="submit" >Save</button>   
					</div>
						 
				<div className="px-2">
				<button type="button" onClick={handleButtonClick} >Cancel</button>
				</div>
				</div>
				 

				</form>
			</div>
		</div>
	);
};
 

export default withRouter(DemandRegisterManualEdit);