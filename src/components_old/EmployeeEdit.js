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

import DatePicker  from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import addDays from 'date-fns/addDays'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

const schema = yup.object({
      cdaoNo: yup.string().required('Required'),
      checkDigit: yup.string().required('Required'),
      icNo: yup.string().required('Required'),
      icCheckDigit: yup.string().required('Required'),
      officerName: yup.string().required('Required'),
      presentCorps: yup.object().required('Required'),
      presentCoreDate: yup.string().required('Required'),
      presentUnit: yup.object().required('Required'),
      presentUnitDate: yup.string().required('Required'),
      previousUnit: yup.object().required('Required'),
      previousUnitDate: yup.string().required('Required'),
      transcriptionType: yup.string().required('Required'),
      statusCode: yup.object().required('Required'),
      statusEffectDate: yup.string().required('Required'),
      rank: yup.object().required('Required'),
      employeeCategory: yup.object().required('Required'),
      susNo: yup.string().required('Required'),
      gsoCode: yup.number().integer().required('Required'),
      termsMaxAgeRetention: yup.string().required('Required'),
      dateOfBirth: yup.string().required('Required'),
      fsDueDate: yup.string().required('Required'),
      regularTa: yup.string().required('Required'),
      taAppointmentCategory: yup.string().required('Required'),
      pan: yup.string().required('Required'),
      monthEnding: yup.string().required('Required'),
      currentRecord: yup.boolean().required('Required'),
      dni: yup.string().required('Required'),
      fsStatusCode: yup.object().required('Required'),
      gender: yup.string().required('Required'),
      auditorDate: yup.string().required('Required'),
      aaoDate: yup.string().required('Required'),
      aoDate: yup.string().required('Required'),
      approved: yup.boolean().required('Required'),
      recordStatus: yup.string().required('Required'),
      oldIcNo: yup.string().required('Required'),
      oldIcCheckDigit: yup.string().required('Required'),
      dateOfReporting: yup.string().required('Required'),
});


const EmployeeEdit = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();
	//console.log(id);

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [key, setKey] = useState('page1');
	
    const [ presentCoreDate, setPresentCoreDate] = useState(new Date());
    const [ presentUnitDate, setPresentUnitDate] = useState(new Date());
    const [ previousUnitDate, setPreviousUnitDate] = useState(new Date());
    const [ statusEffectDate, setStatusEffectDate] = useState(new Date());
    const [ dateOfBirth, setDateOfBirth] = useState(new Date());
    const [ fsDueDate, setFsDueDate] = useState(new Date());
    const [ dni, setDni] = useState(new Date());
    const [ auditorDate, setAuditorDate] = useState(new Date());
    const [ aaoDate, setAaoDate] = useState(new Date());
    const [ aoDate, setAoDate] = useState(new Date());
    const [ dateOfReporting, setDateOfReporting] = useState(new Date());



	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		setKey('page1');
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get('/employees/' + id)
					.then((response) => {
						record = response.data;
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

				const fields = [
				'id', 'cdaoNo', 'checkDigit', 'icNo', 'icCheckDigit', 'officerName', 'presentCorps', 
				'presentCoreDate', 'presentUnit', 'presentUnitDate', 'previousUnit', 'previousUnitDate', 
				'transcriptionType', 'statusCode', 'statusEffectDate', 'rank', 'employeeCategory', 'susNo', 
				'gsoCode', 'termsMaxAgeRetention', 'dateOfBirth', 'fsDueDate', 'regularTa', 'taAppointmentCategory',
				 'pan', 'monthEnding', 'currentRecord', 'dni', 'fsStatusCode', 'gender', 'auditorDate', 'aaoDate', 
				 'aoDate', 'approved', 'recordStatus', 'oldIcNo', 'oldIcCheckDigit', 'dateOfReporting'				
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
		if (data.id) {
			axios.put("/employees/" + data.id, data)
				.then((response) => { })
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		} else {
			axios.post("/employees", data)
				.then((response) => { })
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		}

		history.push("/employees");
	}

	const onError = (errors, e) => console.log(errors, e);

	//All foreign keys. 
	// XXXXXX Add search fields and adjust the values as necessary
	const parentData = {
	
		presentCorps: {
			title: "Present Corps",
			url : "units",
			searchList : ['id'], //XXXXXXXXX Add search fields
			fkEntity: "presentCorps",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
		presentUnit: {
			title: "Present Unit",
			url : "units",
			searchList : ['unitCode', 'unitName', 'susNo'], //XXXXXXXXX Add search fields
			fkEntity: "presentUnit",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
		previousUnit: {
			title: "Previous Unit",
			url : "units",
			searchList : ['id'], //XXXXXXXXX Add search fields
			fkEntity: "previousUnit",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
		statusCode: {
			title: "Status Code",
			url : "statusCodes",
			searchList : ['id'], //XXXXXXXXX Add search fields
			fkEntity: "statusCode",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
		rank: {
			title: "Rank",
			url : "ranks",
			searchList : ['id'], //XXXXXXXXX Add search fields
			fkEntity: "rank",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
		employeeCategory: {
			title: "Employee Category",
			url : "employeeCategorys",
			searchList : ['id'], //XXXXXXXXX Add search fields
			fkEntity: "employeeCategory",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
		fsStatusCode: {
			title: "Fs Status Code",
			url : "fsStatusCodes",
			searchList : ['id'], //XXXXXXXXX Add search fields
			fkEntity: "fsStatusCode",
			preload: false, //XXXXXX Set this to true for small tables like designations
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

	const errorCallback = (err) => {
		//console.log(err);
		setServerErrors(err);
	}

	const handleInputChange = (e) => {
		//console.log(e.target.value);
	};

	return (
		<div className="max-w-xl mx-auto ">
			<div className="w-full w-3/4  mx-auto " >

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Employee </h1>
					<div className="text-red-500">{serverErrors}</div>
					<Tabs
						id="GrievanceEdit"
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className="mb-3"
					>
						<Tab eventKey="page1" title="Page 1" className="h-120">
							<div className="grid grid-cols-2 gap-0">
								<div>
									<label>Cdao No</label>
									<input type="text" name="cdaoNo" {...register("cdaoNo")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.cdaoNo?.message}</div>
								</div>
								
						
								<div>
									<label>Check Digit</label>
									<input type="text" name="checkDigit" {...register("checkDigit")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.checkDigit?.message}</div>
								</div>
								
						
								<div>
									<label>Ic No</label>
									<input type="text" name="icNo" {...register("icNo")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.icNo?.message}</div>
								</div>
								
						
								<div>
									<label>Ic Check Digit</label>
									<input type="text" name="icCheckDigit" {...register("icCheckDigit")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.icCheckDigit?.message}</div>
								</div>
								
						
								<div>
									<label>Officer Name</label>
									<input type="text" name="officerName" {...register("officerName")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.officerName?.message}</div>
								</div>
								
						
								<div >
									<LiveSearch name="presentCorps" onChange={handleInputChange}
										parentData={parentData.presentCorps} parentCallback={callback} 
										fkEntity={entity.presentCorps} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.presentCorps?.message}</div>
								</div>						
								
						
								
								<div>
									<label>Present Core Date</label>
									<DatePicker type="text" name="presentCoreDate" {...register("presentCoreDate")}
									selected={ presentCoreDate } onChange={(date) => setPresentCoreDate(date)} 
									dateFormat="dd/MM/yyyy"  
									className=" -ml-2 pl-2 pr-6"  />
								</div>						
						
								<div >
									<LiveSearch name="presentUnit" onChange={handleInputChange}
										parentData={parentData.presentUnit} parentCallback={callback} 
										fkEntity={entity.presentUnit} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.presentUnit?.message}</div>
								</div>						
								
						
								
								<div>
									<label>Present Unit Date</label>
									<DatePicker type="text" name="presentUnitDate" {...register("presentUnitDate")}
									selected={ presentUnitDate } onChange={(date) => setPresentUnitDate(date)} 
									dateFormat="dd/MM/yyyy"  
									className=" -ml-2 pl-2 pr-6"  />
								</div>						
						
								<div >
									<LiveSearch name="previousUnit" onChange={handleInputChange}
										parentData={parentData.previousUnit} parentCallback={callback} 
										fkEntity={entity.previousUnit} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.previousUnit?.message}</div>
								</div>						
								
						
								
								<div>
									<label>Previous Unit Date</label>
									<DatePicker type="text" name="previousUnitDate" {...register("previousUnitDate")}
									selected={ previousUnitDate } onChange={(date) => setPreviousUnitDate(date)} 
									dateFormat="dd/MM/yyyy"  
									className=" -ml-2 pl-2 pr-6"  />
								</div>						
						
								<div>
									<label>Transcription Type</label>
									<input type="text" name="transcriptionType" {...register("transcriptionType")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.transcriptionType?.message}</div>
								</div>
								
						
								<div >
									<LiveSearch name="statusCode" onChange={handleInputChange}
										parentData={parentData.statusCode} parentCallback={callback} 
										fkEntity={entity.statusCode} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.statusCode?.message}</div>
								</div>						
								
						
								
								<div>
									<label>Status Effect Date</label>
									<DatePicker type="text" name="statusEffectDate" {...register("statusEffectDate")}
									selected={ statusEffectDate } onChange={(date) => setStatusEffectDate(date)} 
									dateFormat="dd/MM/yyyy"  
									className=" -ml-2 pl-2 pr-6"  />
								</div>						
						
								<div >
									<LiveSearch name="rank" onChange={handleInputChange}
										parentData={parentData.rank} parentCallback={callback} 
										fkEntity={entity.rank} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.rank?.message}</div>
								</div>						
								
						
								<div >
									<LiveSearch name="employeeCategory" onChange={handleInputChange}
										parentData={parentData.employeeCategory} parentCallback={callback} 
										fkEntity={entity.employeeCategory} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.employeeCategory?.message}</div>
								</div>						
								
						
								<div>
									<label>Sus No</label>
									<input type="text" name="susNo" {...register("susNo")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.susNo?.message}</div>
								</div>
								
						
								<div>
									<label>Gso Code</label>
									<input type="text" name="gsoCode" {...register("gsoCode")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.gsoCode?.message}</div>
								</div>
								
						
								<div>
									<label>Terms Max Age Retention</label>
									<input type="text" name="termsMaxAgeRetention" {...register("termsMaxAgeRetention")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.termsMaxAgeRetention?.message}</div>
								</div>
								
						
								
								<div>
									<label>Date Of Birth</label>
									<DatePicker type="text" name="dateOfBirth" {...register("dateOfBirth")}
									selected={ dateOfBirth } onChange={(date) => setDateOfBirth(date)} 
									dateFormat="dd/MM/yyyy"  
									className=" -ml-2 pl-2 pr-6"  />
								</div>						
						
								
								<div>
									<label>Fs Due Date</label>
									<DatePicker type="text" name="fsDueDate" {...register("fsDueDate")}
									selected={ fsDueDate } onChange={(date) => setFsDueDate(date)} 
									dateFormat="dd/MM/yyyy"  
									className=" -ml-2 pl-2 pr-6"  />
								</div>						
						
								<div>
									<label>Regular Ta</label>
									<input type="text" name="regularTa" {...register("regularTa")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.regularTa?.message}</div>
								</div>
								
						
								<div>
									<label>Ta Appointment Category</label>
									<input type="text" name="taAppointmentCategory" {...register("taAppointmentCategory")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.taAppointmentCategory?.message}</div>
								</div>
								
						
								<div>
									<label>Pan</label>
									<input type="text" name="pan" {...register("pan")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.pan?.message}</div>
								</div>
								
						
								<div>
									<label>Month Ending</label>
									<input type="text" name="monthEnding" {...register("monthEnding")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.monthEnding?.message}</div>
								</div>
								
						
								<div>
									<label>Current Record</label>
									<input type="text" name="currentRecord" {...register("currentRecord")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.currentRecord?.message}</div>
								</div>
								
						
								
								<div>
									<label>Dni</label>
									<DatePicker type="text" name="dni" {...register("dni")}
									selected={ dni } onChange={(date) => setDni(date)} 
									dateFormat="dd/MM/yyyy"  
									className=" -ml-2 pl-2 pr-6"  />
								</div>						
						
								<div >
									<LiveSearch name="fsStatusCode" onChange={handleInputChange}
										parentData={parentData.fsStatusCode} parentCallback={callback} 
										fkEntity={entity.fsStatusCode} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.fsStatusCode?.message}</div>
								</div>						
								
						
								<div>
									<label>Gender</label>
									<input type="text" name="gender" {...register("gender")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.gender?.message}</div>
								</div>
								
						
								

					
		
							</div>
						</Tab>

						<Tab eventKey="page2" title="Page 2" className="h-120">
							<div className="grid grid-cols-2 gap-0">
	
								

	
						
								<div>
									<label>Old Ic No</label>
									<input type="text" name="oldIcNo" {...register("oldIcNo")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.oldIcNo?.message}</div>
								</div>
								
						
								<div>
									<label>Old Ic Check Digit</label>
									<input type="text" name="oldIcCheckDigit" {...register("oldIcCheckDigit")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.oldIcCheckDigit?.message}</div>
								</div>
								
						
								
								<div>
									<label>Date Of Reporting</label>
									<DatePicker type="text" name="dateOfReporting" {...register("dateOfReporting")}
									selected={ dateOfReporting } onChange={(date) => setDateOfReporting(date)} 
									dateFormat="dd/MM/yyyy"  
									className=" -ml-2 pl-2 pr-6"  />
								</div>						
						
							</div>
						</Tab>
					</Tabs>
						
					<div className="px-4">
						<button type="submit" >Save</button>
					</div>

				</form>
			</div>
		</div>
	);
};

export default withRouter(EmployeeEdit);