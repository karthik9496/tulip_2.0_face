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
     // fromDate: yup.string().required('Required'),
       employee: yup.object().required('Required'),      
      do2Date: yup.string().required('Required'),     
     
       
      
});


const Do2Edit = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [key, setKey] = useState('page1');
		const [loading, setLoading] = useState(true);
	const[disable,setDisable]=useState(false);
	 
	 
	const[data1Info,setData1Info]=useState('data1');
	 
	
	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get('/do2s/' + id)
					.then((response) => {
						record = response.data;
						console.log(response.data['docFormat']);
						 
						const fields = [
						'id'
, 'fromDate', 'toDate', 'employee', 'batchNo', 'do2Date', 'auditCage', 'allowanceCage', 'timeBarSanction', 'dak', 'reviewed', 'bulkApproval', 'unit', 
'auditorDate', 'aaoDate', 'aoDate', 'approved', 'rejectionType', 'attachment', 'acceptedMonthEnding', 'unitCode', 'susNo', 'cdaoNo', 'checkDigit', 
'personalNo', 'do2Group', 'do2Type', 'do2No', 'do2ItemNo', 'occurrenceCode', 'natureOfOccurence', 'data1', 'data2', 'data3', 'data4', 'recordStatus',
 'reason', 'transcriptionType', 'monthEnding', 'inputMonthEnding', 'reviewMonthEnding','docFormat'	,'lastDo2No','lastDo2Date'		
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
		
		if(disable)
			return;
			
		event.preventDefault();
		console.log(data);
		if (data.id) {
			setDisable(true);
			axios.put("/do2s/" + data.id, data)
				.then((response) => {
					
						if(response.data){
							if(response.data.status && response.data.status==='V')
								setServerErrors("Do2 created.")
							else
								setServerErrors(response.data.reason);
						}
				 })
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		} else {
			axios.post("/do2s", data)
				.then((response) => { 
					
					if(response.data){
							if(response.data.status && response.data.status==='V')
								setServerErrors("Do2 created.")
							else
								setServerErrors(response.data.reason);
						}
				})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		}

		//history.push("/do2s");
	}

const returnToList =() => {
		 
			history.push("/do2s");
		 
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
		 
		unit: {
			title: "Unit",
			url : "units",
			searchList : ['unitCode','unitName'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "unit",
		},
		docFormat: { 
			title: "Occurrence Code",
			url : "docFormats",
			searchList : ['occurrenceCode','occurrenceNature'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "docFormat",
		},
	}

	//Callback for child components (Foreign Keys)
	const callback = (childData) => {
		//console.log("Parent Callback");
		setEntity(prev => ({ ...prev, [childData.fk]: childData.entity }));
		setValue(childData.fk, childData.entity);
		if(childData.fk==='docFormat'){
			setValue('occurrenceCode',childData.entity.occurrenceCode);
			console.log(childData.entity.occurrenceCode);
		}
		 //console.log(childData.fk+"--"+childData.entity);
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
	
 

	return (
		<div className="max-w-5xl mx-auto ">
			<div className="w-full w-3/4  mx-auto " >

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Do2 </h1>
					<div className="text-red-500">{serverErrors}</div>
					<Tabs
						id="Do2Edit"
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className="mb-3"
					>
						<Tab eventKey="page1" title="Page 1" className="h-120">
							<div className="grid grid-cols-2 gap-0">
							
							<div >
									<LiveSearch name="unit" onChange={handleInputChange}
										parentData={parentData.unit} parentCallback={callback} 
										fkEntity={entity.unit} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.unit?.message}</div>
								</div>	
								
							<div >
									<LiveSearch name="employee" onChange={handleInputChange}
										parentData={parentData.employee} parentCallback={callback} 
										fkEntity={entity.employee} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.employee?.message}</div>
								</div>
								
								<div >
									<LiveSearch name="docFormat" onChange={handleInputChange}
										parentData={parentData.docFormat} parentCallback={callback} 
										fkEntity={entity.docFormat} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.docFormat?.message}</div>
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
						
													
							 <div>
									<label>Do2 No</label>
									<input type="text" name="do2No" {...register("do2No")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.do2No?.message}</div>
								</div>
						
								
								<div>
									<label>Do2 Date</label>
									<input type="date" name="do2Date" {...register("do2Date")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.do2Date?.message}</div>
								</div>						
						 	
						 
							 <div>
									<label>Last Do2 No</label>
									<input type="text" name="lastDo2No" {...register("lastDo2No")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.lastDo2No?.message}</div>
								</div>
						
								
								<div>
									<label>Last Do2 Date</label>
									<input type="date" name="lastDo2Date" {...register("lastDo2Date")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.lastDo2Date?.message}</div>
								</div>
						 
						
								
								
						
								<div>
									<label>Sl No</label>
									<input type="text" name="do2ItemNo" {...register("do2ItemNo")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.do2ItemNo?.message}</div>
								</div>
								
						
								 
								
						
								 
								
						
								<div>
									<label>Data1</label>
									<input type="text" name="data1" {...register("data1")}
										className="form-control py-0" placeholder={data1Info}
									/>
									<div className="text-red-500">{errors.data1?.message}</div>
								</div>
								
						
								<div>
									<label>Data2</label>
									<input type="text" name="data2" {...register("data2")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.data2?.message}</div>
								</div>
								
						
								<div>
									<label>Data3</label>
									<input type="text" name="data3" {...register("data3")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.data3?.message}</div>
								</div>
								
						
								<div>
									<label>Data4</label>
									<input type="text" name="data4" {...register("data4")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.data4?.message}</div>
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
						<div className="grid grid-cols-2 gap-0">
					<div className="px-4">
						<button type="submit" disabled={disable} >Save</button>
					</div>
					<div className="px-4">
						<button type="button" onClick={returnToList} >Done</button>
					</div>
					</div>

				</form>
			</div>
		</div>
	);
};

export default withRouter(Do2Edit);