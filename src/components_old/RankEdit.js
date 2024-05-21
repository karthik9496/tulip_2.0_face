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
      
      rankCode: yup.string().required('Required'),
      rankName: yup.string().required('Required'),
      
});


const RankEdit = () => {
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
				await axios.get('/ranks/' + id)
					.then((response) => {
						record = response.data;
						const fields = [
						'id'
, 'approved', 'serviceRetention', 'maximumAge', 'maximumService', 'recordStatus', 'rankCode', 'rankName', 'colorService'				
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
			axios.put("/ranks/" + data.id, data)
				.then((response) => { })
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		} else {
			axios.post("/ranks", data)
				.then((response) => { })
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		}

		history.push("/ranks");
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
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Rank </h1>
					<div className="text-red-500">{serverErrors}</div>
					 
						 
							<div className="grid grid-cols-2 gap-0">
							<div>
									<label>Rank Code</label>
									<input type="text" name="rankCode" {...register("rankCode")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.rankCode?.message}</div>
								</div>
								
						
								<div>
									<label>Rank Name</label>
									<input type="text" name="rankName" {...register("rankName")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.rankName?.message}</div>
								</div>
								
								
								<div>
									<label>Approved</label>
									<input type="text" name="approved" {...register("approved")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.approved?.message}</div>
								</div>
								
						
								<div>
									<label>Service Retention</label>
									<input type="text" name="serviceRetention" {...register("serviceRetention")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.serviceRetention?.message}</div>
								</div>
								
						
								<div>
									<label>Maximum Age</label>
									<input type="text" name="maximumAge" {...register("maximumAge")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.maximumAge?.message}</div>
								</div>
								
						
								<div>
									<label>Maximum Service</label>
									<input type="text" name="maximumService" {...register("maximumService")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.maximumService?.message}</div>
								</div>
								
						
								<div>
									<label>Record Status</label>
									<input type="text" name="recordStatus" {...register("recordStatus")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.recordStatus?.message}</div>
								</div>
								
						
								
						
								<div>
									<label>Color Service</label>
									<input type="text" name="colorService" {...register("colorService")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.colorService?.message}</div>
								</div>
								
						
					
		
							</div>
						 
						
						 
						
					<div className="px-4">
						<button type="submit" >Save</button>
					</div>

				</form>
			</div>
		</div>
	);
};

export default withRouter(RankEdit);