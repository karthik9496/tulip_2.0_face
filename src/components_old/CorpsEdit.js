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

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import addDays from 'date-fns/addDays'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

const schema = yup.object({
	unitCode: yup.string().required('Required'),
 
	unitName: yup.string().required('Required'),
	  
});


const UnitEdit = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [key, setKey] = useState('page1');

	const [raisedDate, setRaisedDate] = useState(new Date());
	const [closedDate, setClosedDate] = useState(new Date());

	const [auditorDate, setAuditorDate] = useState(new Date());
	const [aaoDate, setAaoDate] = useState(new Date());
	const [aoDate, setAoDate] = useState(new Date());


	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get(`/corpss/${id}`)
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
					'id', 'unitCode', 'task', 'unitName', 'susNo', 'address1', 'address2', 'address3', 'station',
					'pinCode', 'email', 'phone1', 'phone2', 'fax', 'coRank', 'coName', 'unitCategory',
					'unitSubarea', 'unitBrigade', 'unitCommand', 'unitCorps', 'unitBattalion',
					'fieldPeace', 'raisedDate', 'closedDate', 'regularTa', 'interService', 'paraUnit',
					'enrollPublish', 'auditorDate', 'aaoDate', 'aoDate', 'recordStatus', 'approved'
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
			axios.put("/corpss/" + data.id, data)
				.then((response) => { })
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		} else {
			axios.post("/corpss", data)
				.then((response) => { })
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		}

		history.push("/corpss");
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
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Corps </h1>
					<div className="text-red-500">{serverErrors}</div>
					 
						 
							<div className="grid grid-cols-2 gap-0">
								<div>
									<label>Corps Code</label>
									<input type="text" name="unitCode" {...register("unitCode")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.unitCode?.message}</div>
								</div>


								 


								<div>
									<label>Corps Name</label>
									<input type="text" name="unitName" {...register("unitName")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.unitName?.message}</div>
								</div>


							 

								<div>
									<label>Address1</label>
									<input type="text" name="address1" {...register("address1")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.address1?.message}</div>
								</div>


								<div>
									<label>Address2</label>
									<input type="text" name="address2" {...register("address2")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.address2?.message}</div>
								</div>


								<div>
									<label>Address3</label>
									<input type="text" name="address3" {...register("address3")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.address3?.message}</div>
								</div>


								<div>
									<label>Station</label>
									<input type="text" name="station" {...register("station")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.station?.message}</div>
								</div>


								<div>
									<label>Pin Code</label>
									<input type="text" name="pinCode" {...register("pinCode")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.pinCode?.message}</div>
								</div>


								<div>
									<label>Email</label>
									<input type="text" name="email" {...register("email")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.email?.message}</div>
								</div>


								<div>
									<label>Phone1</label>
									<input type="text" name="phone1" {...register("phone1")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.phone1?.message}</div>
								</div>


								<div>
									<label>Phone2</label>
									<input type="text" name="phone2" {...register("phone2")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.phone2?.message}</div>
								</div>


								<div>
									<label>Fax</label>
									<input type="text" name="fax" {...register("fax")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.fax?.message}</div>
								</div>


								<div>
									<label>Co Rank</label>
									<input type="text" name="coRank" {...register("coRank")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.coRank?.message}</div>
								</div>


								<div>
									<label>Co Name</label>
									<input type="text" name="coName" {...register("coName")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.coName?.message}</div>
								</div>


								 
   


								<div>
									<label>Raised Date</label>
									<input type="date" name="coName" {...register("raisedDate")}
										className="form-control py-0"
									/>
								</div>


								<div>
									<label>Closed Date</label>
									<input type="date" name="coName" {...register("closedDate")}
										className="form-control py-0"
									/>
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

export default withRouter(UnitEdit);