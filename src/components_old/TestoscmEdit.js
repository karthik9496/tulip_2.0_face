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
  //    section: yup.object().required('Required'),
 //     fromDate: yup.string().required('Required'),
       
   //   taskNo: yup.string().required('Required'),
});


const TestoscmEdit = () => {
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
				await axios.get('/testoscms/' + id)
					.then((response) => {
						record = response.data;
						const fields = [
						'id','cdacno'
, 'prno', 'name', 'doc', 'dob', 'rank'				
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
			axios.put("/testoscms/" + data.id, data)
				.then((response) => { 
					history.push("/testoscms");
				})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		} else {
			axios.post("/testoscms", data)
				.then((response) => {
					history.push("/testoscms");
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
	
		rank: {
			title: "Rank",
			url : "ranks",
			searchList : ['rankName'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "rank",
		}
		
	}

	//Callback for child components (Foreign Keys)
	const callback = (childData) => {
		//console.log("Parent Callback");
		setEntity(prev => ({ ...prev, [childData.fk]: childData.entity }));
		setValue(childData.fk, childData.entity);
		if(childData.fk==='usr')
			setValue('fkUsr',childData.entity.id)
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
					<h1 >{id === 'new' ? 'Add' : 'Edit'} CDAC No </h1>
					<div className="text-red-500">{serverErrors}</div>
					<Tabs
						id="TestoscmEdit"
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className="mb-3"
					>
						<Tab eventKey="page1" title="Page 1" className="h-120">
							<div className="grid grid-cols-2 gap-0">
														
								<div>
									<label>Cdac No</label>
									<input type="text" name="cdacno" {...register("cdacno")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.cdacno?.message}</div>
								</div>
						
								<div>
									<label>PR No</label>
									<input type="text" name="prno" {...register("prno")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.doc?.message}</div>
								</div>	
								
								<div>
									<label>Name</label>
									<input type="text" name="name" {...register("name")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.doc?.message}</div>
								</div>	
								<div>
									<label>Date of commisson</label>
									<input type="date" name="doc" {...register("doc")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.doc?.message}</div>
								</div>						
						
								
								<div>
									<label>Date of Birth</label>
									<input type="date" name="dob" {...register("dob")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.dob?.message}</div>
								</div>						
						
								<div >
									<LiveSearch name="rank" onChange={handleInputChange}
										parentData={parentData.rank} parentCallback={callback} 
										fkEntity={entity.rank} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.section?.message}</div>
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
						
					<div className="px-4">
						<button type="submit" >Save</button>
					</div>

				</form>
			</div>
		</div>
	);
};

export default withRouter(TestoscmEdit);