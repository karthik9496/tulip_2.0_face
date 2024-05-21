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
      employee: yup.object().required('Required'),
      lastPremiumMonth: yup.string().required('Required'),
       lastPremiumYear: yup.string().required('Required'),
       policyAmount: yup.number().required('Required'),     
      premiumRate: yup.number().integer().required('Required'),
      policyDate: yup.string().required('Required'),
     
});


const PliModify = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [key, setKey] = useState('page1');
	const [arrReq, setArrReq]=useState(false);
	const [approvedRecord,setApprovedRecord]=useState(false);
	const [empDetails,setEmpDetails]=useState('');
	const [disabled,setDisabled]=useState(false);
	
	
	
	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get('/plis/modify/' + id)
					.then((response) => {
						record = response.data;
						if(response.data.approved)
							setApprovedRecord(true);
						if(response.data.employee){
							setEmpDetails(response.data.employee.cdaoNo+''+response.data.employee.checkDigit+' : '+response.data.employee.officerName);
						}
						const fields = [
						'id'
, 'employee', 'cdaoNo', 'checkDigit', 'transType','monthEnding', 'batchNo', 'proposalNo', 'policyNo', 'policyDate', 'maturityDate', 'policyAmount', 'matureAmount', 'premiumRate',
 'premiumStatus', 'lastPremiumMonth', 'lastPremiumYear', 'surrenderDate', 'reason', 'dak',
  'auditorDate', 'aaoDate', 'aoDate', 'stopDate', 'recordStatus', 'approved', 'arrearsRequired', 'remarks','stopRemarks'				
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


	const onSubmit = (data, event) => {
		event.preventDefault();
		console.log(data);
		if(disabled)
			return;
			
		setDisabled(true);
		
		if (data.id) {
			console.log(approvedRecord+'--'+data.surrenderDate)
			if(approvedRecord && data.surrenderDate){
				axios.put("/plis/surrender/" + data.id, data)
				.then((response) => { 
					//history.push("/plis");
					if(response.data.rejectionReason)
						setServerErrors(response.data.rejectionReason);
				})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
			}else{
			axios.put("/plis/" + data.id, data)
				.then((response) => { 
					//history.push("/plis");
					if(response.data.rejectionReason)
						setServerErrors(response.data.rejectionReason);
				})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
				}
		} else {
			axios.post("/plis", data)
				.then((response) => { 
					if(response.data.rejectionReason)
						setServerErrors(response.data.rejectionReason);
				})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		}
	}
	
	const handleTimeBarCheckbox = (e) => {
	 setValue('arrearsRequired',e.target.checked);
	 setArrReq(e.target.checked);
	}
	
	const returnToList =() => {
		history.push("/plis/modifyList");
	}

	const onError = (errors, e) => console.log(errors, e);

	//All foreign keys. 
	// XXXXXX Add search fields and adjust the values as necessary
	const parentData = {
	
		employee: {
			title: "Employee",
			url : "employees/fetchAll/effective",
			searchList : ['armyNo','name'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "employee",
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
	
	const handleInputSelect = (e) => {
		//console.log(e.target.value);
		setValue('lastPremiumMonth',e.target.value);
	};

	return (
	<div className="min-h-screen bg-gray-100 text-gray-900">
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4" >

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 >Pli Modify </h1>
					<div className="text-red-500">{serverErrors}</div>
					<Tabs
						id="PliEdit"
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className="mb-3"
					>
						<Tab eventKey="page1" title="Page 1" className="h-120">
							<div className="grid grid-cols-2 gap-0">
							 
								 
								<div>
									<label>Employee</label>
									<input type="text" name="emp" value={empDetails} readOnly={approvedRecord}
										className="form-control py-0"
									/>
									 
								</div>
								 
								<div>
									<label>Policy No</label>
									<input type="text" name="policyNo" {...register("policyNo")} readOnly={approvedRecord}
										className="form-control py-0" readOnly="true"
									/>
									<div className="text-red-500">{errors.policyNo?.message}</div>
								</div>
								
						
								
								<div>
									<label>Policy Date</label>
									<input type="date" name="policyDate" {...register("policyDate")} readOnly={approvedRecord}
									className="form-control py-0"  readOnly="true" />
									<div className="text-red-500">{errors.policyDate?.message}</div>
								</div>						
						
								
								<div>
									<label>Maturity Date</label>
									<input type="date" name="maturityDate" {...register("maturityDate")} readOnly={approvedRecord}
									className="form-control py-0" />
									<div className="text-red-500">{errors.maturityDate?.message}</div>
								</div>						
						
								<div>
									<label>Policy Amount</label>
									<input type="text" name="policyAmount" {...register("policyAmount")} readOnly={approvedRecord}
										className="form-control py-0"  readOnly="true"
									/>
									<div className="text-red-500">{errors.policyAmount?.message}</div>
								</div>
								
						
							 
						
								<div>
									<label>Premium Rate</label>
									<input type="text" name="premiumRate" {...register("premiumRate")} readOnly={approvedRecord}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.premiumRate?.message}</div>
								</div>
								
						 <div>
						 <label>Last Premium Month</label>
						 <select name="lastPremiumMonth" onChange={handleInputSelect} {...register("lastPremiumMonth")} className="form-control py-0" readOnly={approvedRecord}>
						 <option value="select">--Select--</option>
						 <option key="1" value="01">Jan</option>
						 <option key="2" value="02">Feb</option>
						 <option key="3" value="03">Mar</option>
						 <option key="4" value="04">Apr</option>
						 <option key="5" value="05">May</option>
						 <option key="6" value="06">Jun</option>
						 <option key="7" value="07">Jul</option>
						 <option key="8" value="08">Aug</option>
						 <option key="9" value="09">Sep</option>
						 <option key="10" value="10">Oct</option>
						 <option key="11" value="11">Nov</option>
						 <option key="12" value="12">Dec</option>
						 </select>
						 </div>
						
								 
						
								<div>
									<label>Last Premium Year</label>
									<input type="text" name="lastPremiumYear" {...register("lastPremiumYear")} readOnly={approvedRecord}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.lastPremiumYear?.message}</div>
								</div>
								
						
								
								<div>
									<label>Surrender Date</label>
									<input type="date" name="surrenderDate" {...register("surrenderDate")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.surrenderDate?.message}</div>
								</div>	
								
									<div>
									<label>Stop Date</label>
									<input type="date" name="stopDate" {...register("stopDate")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.stopDate?.message}</div>
								</div>						
						
								 
								
						 
								<div>
									<label>Stop Remarks</label>
									<textarea type="text" name="stopRemarks" {...register("stopRemarks")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.stopRemarks?.message}</div>
								</div>
								
						
					
		
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
						
					<div className="grid grid-cols-2 gap-0">
					<div className="px-3 ...">
						<button type="submit" >Save</button>
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

export default withRouter(PliModify);