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
	 
	//aaoDate: yup.string().required('Required'),
	//aoRemarks: yup.string().required('Required'),
	//aoDate: yup.string().required('Required'),
	 
});

 

const DakEdit = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();
	//console.log(id);

	let history = useHistory();
 
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [dakMsg,setDakMsg]=useState("");
	
	 
	 
	 
	const [key, setKey] = useState('Page1');
 
	

	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get('/daks/' + id)
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
					'id', 'dakidNo', 'dakYear', 'dakType', 'unit', 'section', 'employee', 'cdaoNo',
					'checkDigit', 'amount', 'referenceNo', 'referenceDate', 'subject',
					'billNo', 'billDate', 'disposalDate', 'disposalDate', 'disposalSummary', 'taskUsr',
					'reason', 'aaoDate', 'auditorDate', 'aoDate', 'recordStatus', 'approved'
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

	 
	const onSubmit = (data, event) => {
		event.preventDefault();
		console.log(data);
		console.log("data id--------------"+data.id);
		if (data.id) {
			axios.put("/daks/" + data.id, data)
				.then((response) => { })
				.catch((error) => {
					//console.log(error.response.data);
					console.log("response--------"+error.response.status);
					if(error.response.status===200)
						history.push("/daks");
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		} else {
			axios.post("/daks", data)
				.then((response) => { 
					console.log("reponse status--------------"+response.status+"--"+response.statusText+"----"+"-h--"+response.headers+"--"+response.data);
					if(response.status===201){
						setDakMsg("Created");
						//history.push("/daks/view/"+response.data);
						history.push({pathname:'/daks/view/'+response.data});
					}
				})
				.catch((error) => {
					//console.log(error.response.data);
					console.log("response--------"+error.response.status);
					if(error.response.status===200)
						history.push("/daks");
					//console.log(error.response.headers);
					if (error.response)
						setServerErrors(error.response.data);
					else
						setServerErrors(error);
				});
		}

		//history.push("/daks");
	}

	 

	const onError = (errors, e) => console.log(errors, e);

	//All foreign keys. 
	// XXXXXX Add search fields and adjust the values as necessary
	const parentData = {

		 
		unit: {
			title: "Unit",
			url: "units",
			searchList: ['unitCode', 'unitName'], //XXXXXXXXX Add search fields
			fkEntity: "unit",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
		section: {
			title: "Section",
			url: "sections",
			searchList: ['sectionName'], //XXXXXXXXX Add search fields
			fkEntity: "section",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
		employee: {
			title: "Employee",
			url: "employees",
			searchList: ['cdaoNo', 'officerName'], //XXXXXXXXX Add search fields
			fkEntity: "employee",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
		dakType: {
			title: "DakType",
			url: "dakTypes",
			searchList: ['description'], //XXXXXXXXX Add search fields
			fkEntity: "dakType",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
	}
 
	//Callback for child components (Foreign Keys)
	 
	const callback = (childData) => {
		
		setEntity(prev => ({ ...prev, [childData.fk]: childData.entity }));
		setValue(childData.fk, childData.entity);
		//console.log(errors);
		 
		clearErrors(childData.fk);
		 
	};

	const errorCallback = (err) => {
		//console.log(err);
		setServerErrors(err);
	}

	const handleInputChange = (e) => {
		console.log(e.target.value);
	//	console.log("handle input change");
		 
		
	};
	
	 
	 
	 
	   
	return (
		<div className="max-w-xl mx-auto ">
			<div className="w-full w-3/4  mx-auto " >

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Dak</h1>
					<div className="text-red-500">{serverErrors}</div>
					<div className="text-red-500">{dakMsg}</div>

					 
							<div className="grid grid-cols-2 gap-0 ">

								<div >
									<LiveSearch name="section"   onChange={handleInputChange}  
										parentData={parentData.section} parentCallback={callback}
										fkEntity={entity.section} errCallback={errorCallback}
										 
										 />
									<div className="text-red-500 ">{errors.section?.message}</div>
								</div>
								
								
								
								<div >
								 
									<LiveSearch name="dakType" onChange={handleInputChange}   
										parentData={parentData.dakType} parentCallback={callback}
										fkEntity={entity.dakType} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.dakType?.message}</div>
								</div>


								<div >
									<LiveSearch name="employee" onChange={handleInputChange}
										parentData={parentData.employee} parentCallback={callback}
										fkEntity={entity.employee} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.employee?.message}</div>
								</div>
								

								<div >
									<LiveSearch name="unit" onChange={handleInputChange}
										parentData={parentData.unit} parentCallback={callback}
										fkEntity={entity.unit} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.unit?.message}</div>
								</div>

								 
						 	 
								<div>
									<label>Reference No</label>
									<input type="text"    name="referenceNo" {...register("referenceNo")}  
										/>
									<div className="text-red-500">{errors.referenceNo?.message}</div>
								</div>

 

								<div>
									<label>Reference Date</label>
									<input type="date" name="referenceDate" {...register("referenceDate")}
										className="form-control py-0"/>
									<div className="text-red-500">{errors.referenceDate?.message}</div>
								</div>
								
								
								
								<div>
									<label>Bill No</label>
									<input type="text" name="billNo" {...register("billNo")}
										className="form-control py-0"/>
									<div className="text-red-500">{errors.billNo?.message}</div>
								</div>

 

								<div>
									<label>Bill Date</label>
									<input type="date" name="billDate" {...register("billDate")}
										className="form-control py-0"/>
									<div className="text-red-500">{errors.billDate?.message}</div>
								</div>

								 <div>
									<label>Amount</label>
									<input type="text" name="amount" {...register("amount")}
										className="form-control py-0"/>
									<div className="text-red-500">{errors.amount?.message}</div>
								</div>
								 
								<div>
									<label>Subject</label>
									<textarea type="text" name="subject" {...register("subject")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.subject?.message}</div>
								</div>
								
								  
 
							 
</div>
						 

						 

					<div className="px-4 ...">
						<button type="submit" >Save</button>
					</div>

				</form>
			</div>
		</div>
	);
};
 

export default withRouter(DakEdit);