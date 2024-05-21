/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
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
      //dak: yup.object().required('Required'),
      
      
      
      //ifsc: yup.string().required('Required'),
});


const DrEdit = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [key, setKey] = useState('page1');
	const [emp,setEmp]=useState('');
	const [dakid,setDakid]=useState('');
	 
	
	
	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get('/demandRegisters/drEdit/dts/' + id)
					.then((response) => {
						record = response.data;
						if(record.employee!==null)
							setEmp(record.employee.officerName+" : "+record.employee.rank.rankName+";"+record.employee.cdaoNo);
						if(record.dak!=null)
							setDakid(record.dak.dakidNo);
						const fields = [
						'id', 'dak',  'cdaoNo', 'checkDigit','cdrNo','advanceType', 'amount', 'penalAmt', 
						'employee', 'demandDate','penalDays' ,'demandOrigin', 'recordStatus', 'approved',
						'auditorSettlementDate','aaoSettlementDate','aoSettlementDate','totalAdr','settlementRemarks'
						  		
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

	}, [id, setValue]);


	const onSubmit = (data, event) => {
		event.preventDefault();
		console.log(data);
		if (data.id) {
			axios.put("/demandRegisters/drUpdate/" + data.id, data)
				.then((response) => { 
					if(response.status==200)
						history.push("/demandRegisters");
					else
						setServerErrors(response.data);
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
	
		dak: {
			title: "Dak",
			url : "daks",
			searchList : ['dakidNo'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "dak",
		},
		 
		employee: {
			title: "Employee",
			url : "employees",
			searchList : ['cdaoNo','officerName'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "employee",
		},
		 
	}

	//Callback for child components (Foreign Keys)
	const callback = (childData) => {
		//console.log("Parent Callback");
		setEntity(prev => ({ ...prev, [childData.fk]: childData.entity }));
		setValue(childData.fk, childData.entity);
		//console.log(errors);
		clearErrors(childData.fk);
	};

	const handleInputCdrChange = (e) => {
		console.log(e.target.value);
		setValue('cdrNo',e.target.value);
	//	console.log("handle input change");
		 
		
	};
	const errorCallback = (err) => {
		//console.log(err);
		setServerErrors(err);
	}

	const handleInputChange = (e) => {
		//console.log(e.target.value);
	};
	const handleButtonClick = (e) =>{
		history.push("/adrReviews");
	}

	return (
		<div className="max-w-xl mx-auto ">
			<div className="w-full w-3/4  mx-auto " >

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 >{id === 'new' ? 'Add' : 'Update'} Demand Register</h1>
					<div className="text-red-500">{serverErrors}</div>
					 

					 
							<div className="grid grid-cols-2 gap-0 ">
							
							 
								<div >
									 <input type="text" value={emp} readonly/>
								</div>
								<div >
									 <input type="text" value={dakid} readonly/>
								</div>
								<div>
									<label>Type of Demand</label>
										<select name="cdrNo" className="form-control py-0" onChange={handleInputCdrChange} {...register("cdrNo")}>
											<option value="select">--Select--</option>
											<option key="1" value="TADATD">Temporary Duty</option>
											<option key="2" value="TADAPT">Permanent Duty</option>
											<option key="3" value="LTC">LTC</option>
											 
										</select>
									
								</div>
								 
								  
								<div>
									<label>Advance Amount</label>
									<input type="text"    name="amount" {...register("amount")}   readOnly
										/>
									<div className="text-red-500">{errors.amount?.message}</div>
									 
								</div>
								 
								 
								 <div>
									<label>Demand Date</label>
									<input type="date"    name="demandDate" {...register("demandDate")}    
										/>
									<div className="text-red-500">{errors.demandDate?.message}</div>
									 
								</div>
								<div>
									<label>Demand Origin</label>
									<input type="text"    name="demandOrigin" {...register("demandOrigin")}   readOnly
										/>
									<div className="text-red-500">{errors.demandOrigin?.message}</div>
									 
								</div>
								 
								  
								 
								 
								
					</div>
					<div className="grid grid-cols-2 gap-0 ">
					<div className="px-2">
						<button type="submit" >Update</button>   
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
export default withRouter(DrEdit);