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
      abbr: yup.string().required('Required'),
      designationName: yup.string().required('Required'),
      serviceGroup: yup.string().required('Required'),
      designationLevel: yup.number().integer().required('Required'),
      recordStatus: yup.string().required('Required'),
      approved: yup.boolean().required('Required'),
});


const DesignationEdit = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [key, setKey] = useState('page1');
	
    
    
    
    
    
    
useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get('/designations/' + id)
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
, 'abbr', 'designationName', 'serviceGroup', 'designationLevel', 'recordStatus', 'approved'				
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
			axios.put("/designations/" + data.id, data)
				.then((response) => { })
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		} else {
			axios.post("/designations", data)
				.then((response) => { })
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		}

		history.push("/designations");
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
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Designation </h1>
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
									<label>Abbr</label>
									<input type="text" name="abbr" {...register("abbr")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.abbr?.message}</div>
								</div>
								
						
								<div>
									<label>Designation Name</label>
									<input type="text" name="designationName" {...register("designationName")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.designationName?.message}</div>
								</div>
								
						
								<div>
									<label>Service Group</label>
									<input type="text" name="serviceGroup" {...register("serviceGroup")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.serviceGroup?.message}</div>
								</div>
								
						
								<div>
									<label>Designation Level</label>
									<input type="text" name="designationLevel" {...register("designationLevel")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.designationLevel?.message}</div>
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

export default withRouter(DesignationEdit);