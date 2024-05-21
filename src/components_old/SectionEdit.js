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
      sectionName: yup.string().required('Required'),
      sectionGroup: yup.string().required('Required'),
      dakGroupDest: yup.string().required('Required'),
      dakGroupSrc: yup.string().required('Required'),
      dakEntry: yup.boolean().required('Required'),
      taskMarkingAtRsec: yup.boolean().required('Required'),
      auditorDate: yup.string().required('Required'),
      aaoDate: yup.string().required('Required'),
      aoDate: yup.string().required('Required'),
      recordStatus: yup.string().required('Required'),
      approved: yup.boolean().required('Required'),
});


const SectionEdit = () => {
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
	
    const [ auditorDate, setAuditorDate] = useState(new Date());
    const [ aaoDate, setAaoDate] = useState(new Date());
    const [ aoDate, setAoDate] = useState(new Date());



	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get('/sections/' + id)
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
				'id'
, 'sectionName', 'sectionGroup', 'dakGroupDest', 'dakGroupSrc', 'dakEntry', 'taskMarkingAtRsec', 'auditorDate', 'aaoDate', 'aoDate', 'recordStatus', 'approved'				
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
			axios.put("/sections/" + data.id, data)
				.then((response) => { })
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		} else {
			axios.post("/sections", data)
				.then((response) => { })
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		}

		history.push("/sections");
	}

	const onError = (errors, e) => console.log(errors, e);

	//All foreign keys. 
	// XXXXXX Add search fields and adjust the values as necessary
	const parentData = {
	
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
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Section </h1>
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
									<label>Section Name</label>
									<input type="text" name="sectionName" {...register("sectionName")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.sectionName?.message}</div>
								</div>
								
						
								<div>
									<label>Section Group</label>
									<input type="text" name="sectionGroup" {...register("sectionGroup")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.sectionGroup?.message}</div>
								</div>
								
						
								<div>
									<label>Dak Group Dest</label>
									<input type="text" name="dakGroupDest" {...register("dakGroupDest")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.dakGroupDest?.message}</div>
								</div>
								
						
								<div>
									<label>Dak Group Src</label>
									<input type="text" name="dakGroupSrc" {...register("dakGroupSrc")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.dakGroupSrc?.message}</div>
								</div>
								
						
								<div>
									<label>Dak Entry</label>
									<input type="text" name="dakEntry" {...register("dakEntry")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.dakEntry?.message}</div>
								</div>
								
						
								<div>
									<label>Task Marking At Rsec</label>
									<input type="text" name="taskMarkingAtRsec" {...register("taskMarkingAtRsec")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.taskMarkingAtRsec?.message}</div>
								</div>
								
						
								
								<div>
									<label>Auditor Date</label>
									<DatePicker type="text" name="auditorDate" {...register("auditorDate")}
									selected={ auditorDate } onChange={(date) => setAuditorDate(date)} 
									dateFormat="dd/MM/yyyy"  
									className=" -ml-2 pl-2 pr-6"  />
								</div>						
						
								
								<div>
									<label>Aao Date</label>
									<DatePicker type="text" name="aaoDate" {...register("aaoDate")}
									selected={ aaoDate } onChange={(date) => setAaoDate(date)} 
									dateFormat="dd/MM/yyyy"  
									className=" -ml-2 pl-2 pr-6"  />
								</div>						
						
								
								<div>
									<label>Ao Date</label>
									<DatePicker type="text" name="aoDate" {...register("aoDate")}
									selected={ aoDate } onChange={(date) => setAoDate(date)} 
									dateFormat="dd/MM/yyyy"  
									className=" -ml-2 pl-2 pr-6"  />
								</div>						
						
								<div>
									<label>Record Status</label>
									<input type="text" name="recordStatus" {...register("recordStatus")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.recordStatus?.message}</div>
								</div>
								
						
								<div>
									<label>Approved</label>
									<input type="text" name="approved" {...register("approved")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.approved?.message}</div>
								</div>
								
						
					
		
							</div>
						</Tab>

						<Tab eventKey="page2" title="Page 2" className="h-120">
							<div className="grid grid-cols-2 gap-0">
							<p>Add some fields here or delete this tab.</p>
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

export default withRouter(SectionEdit);