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
  //    employee: yup.object().required('Required'),
  //    itSavingSection: yup.object().required('Required'),
   //   amount: yup.number().required('Required'),
  //    paymentDate: yup.string().required('Required'),
  //    voucherNo: yup.string().required('Required'),
});


const ItSavingEdit = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [key, setKey] = useState('page1');
	const [mesg,setMesg]=useState('');
	const [itData,setItData]=useState([]);
	const [loading, setLoading] = useState(false);
	const [savSection,setSavSection]=useState('');
	const [sscode,setSscode]=useState('');
	 
	
	
	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get('/itSavings/' + id)
					.then((response) => {
						record = response.data;
						const fields = [
						'id', 'employee', 'savingSection', 'sectionDescription','amount', 'assessmentYear', 'cdaoNo', 'checkDigit', 
						'recordStatus', 'rejectionReason', 'auditorDate', 'aaoDate', 'aoDate', 'task', 'approved', 'paymentDate',
						 'voucherNo','documentSubmitted'	,'itSavingSection','letterNo','letterDate'			
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


				if(record['itSavingSection']){
					setSscode(record['itSavingSection'].ssCode);
				}
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
		async function fetchSavingSection() {
			 
			 
				if (!fetching)
					await axios.get(`/itSavings/itSavingSection/fetch`)
						.then((response) => {
							console.log(response.data);
							setItData(response.data);
							
							 
							
							
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
		fetchSavingSection();
		 
		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	const onSubmit = (data, event) => {
		event.preventDefault();
		console.log(data);
		if (data.id) {
			axios.put("/itSavings/" + data.id, data)
				.then((response) => { 
					setMesg(response.data);
				})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		} else {
			console.log("--------------in post---------:"+ data);
			axios.post("/itSavings", data)
				.then((response) => { 
					setMesg(response.data);
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
			url : "employees",
			searchList : ['cdaoNo','checkDigit','officerName'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "employee",
		},
		itSavingSection: {
			title: "It Saving Section",
			url : "itSavingSections",
			searchList : ['savingSection','description'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "itSavingSection",
		},
		 
	}

	//Callback for child components (Foreign Keys)
	const callback = (childData) => {
		//console.log("Parent Callback");
		//setEntity(prev => ({ ...prev, [childData.fk]: childData.entity }));
		setValue(childData.fk, childData.entity);
		//console.log(errors);
		if (childData.fk === "itSavingSection") {
        	setSscode(childData.entity.ssCode);
     }
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
		history.push("/itSavings");
	}
	
/*	const itsOption=[];
	for (const[key,value] of Object.entries(itData)){
		itsOption.push(<option value={key} key={key}>{value}</option>);
		console.log("&&&&&&&&&&&&&&&&&&&&&&&&&:" + itsOption);
	}*/
	const handleInputChangeIt = (e) => {
     console.log(e.target.key);
     console.log(e.target.value);
     setValue("savingSection",e.target.value);
     
      
   };
   
    const handleInputDocChange = (e) => {
     //console.log(e.target.value);
     setValue("documentSubmitted", e.target.value);
     
   };

	return (
		<div className="max-w-5xl mx-auto ">
			<div className="w-full w-3/4  mx-auto " >

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 >{id === 'new' ? 'Add' : 'Edit'} It Saving </h1>
					<div className="text-red-500">{mesg}</div>
					<Tabs
						id="ItSavingEdit"
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className="mb-3"
					>
						<Tab eventKey="page1" title="Page 1" className="h-120">
							<div className="grid grid-cols-2 gap-0">
								<div >
									<LiveSearch name="employee" onChange={handleInputChange}
										parentData={parentData.employee} parentCallback={callback} 
										fkEntity={entity.employee} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.employee?.message}</div>
								</div>						
								
						
								<div >
									<LiveSearch name="itSavingSection" onChange={handleInputChange}
										parentData={parentData.itSavingSection} parentCallback={callback} 
										fkEntity={entity.itSavingSection} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.itSavingSection?.message}</div>
								</div>					
								
								 
								 
								<div>
									<label>Amount</label>
									<input type="text" name="amount" {...register("amount")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.amount?.message}</div>
								</div>
								
						 
								
								<div>
									<label>Payment Date</label>
									<input type="date" name="paymentDate" {...register("paymentDate")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.paymentDate?.message}</div>
								</div>						
						
								<div>
									<label>Voucher No</label>
									<input type="text" name="voucherNo" {...register("voucherNo")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.voucherNo?.message}</div>
								</div>
								{ sscode && sscode==='SAL100' && <>
									
									<div>
									<label>Exemption letter no</label>
									<input type="text" name="letterNo" {...register("letterNo")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.letterNo?.message}</div>
								</div>
								
									<div>
									<label>Exemption Letter Date</label>
									<input type="date" name="letterDate" {...register("letterDate")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.letterDate?.message}</div>
								</div>	
								</>
								}
								
								 <div>
                   <label> Document Submitted</label>
                   <select
                     name="documentSubmitted"
                     className="form-control py-0"
                     onChange={handleInputDocChange}
                     {...register("documentSubmitted")}
                   >
                     <option value="select">--Select--</option>
                     <option key="1" value="Y">Yes</option>
                     <option key="2" value="N">No</option>
                    
                   </select>
                 </div>
								
								<div>
									<label>Remarks</label>
									<input type="text" name="remarks" {...register("remarks")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.remarks?.message}</div>
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
						
					<div className="grid grid-cols-3 gap-0">
					<div className="px-3 ...">
						<button type="submit" >Save</button>
					</div>
					 
					<div className="px-3 ...">
									<button type="button" onClick={returnToList}>Cancel</button>
								</div>
								<div className="px-3 ...">
									<button type="button" onClick={returnToList}>Done</button>
								</div>
								</div>

				</form>
			</div>
		</div>
	);
};

export default withRouter(ItSavingEdit);