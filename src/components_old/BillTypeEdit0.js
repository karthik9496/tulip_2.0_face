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
    //  dakType: yup.object().required('Required'),
      description: yup.string().required('Required'),
});


const BillTypeEdit = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [key, setKey] = useState('page1');
	const [sectionData,setSectionData]=useState([]);
	const [dakTypeData,setDakTypeData]=useState([]);
	const [secId,setSecId]=useState();
	 const [secItems, setSecItems] = useState([]);
	  const [dakTypeItems, setDakTypeItems] = useState([]);
	  const [loading, setLoading] = useState(true);
	  const [dakType, setDakType] = useState();
	  const [section, setSection] = useState('');
	  const [sections, setSections] = useState([]);
	  const [allDakTypes, setAllDakTypes] = useState([]);
	  const [sectionDakTypes, setSectionDakTypes] = useState([]);
	
	
	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get('/billTypes/' + id)
					.then((response) => {
						record = response.data;
						const fields = [
						'id', 'dakType', 'task', 'description'				
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

	useEffect(() => {
		let fetching = false;
		let unmounted = false;
		async function fetchData() {
			if (!fetching) {
				await axios.get(`/sections/allsec`)
					.then((response) => {
						//setSections(response.data);
						if (!unmounted) {
							setSections(
								response.data.map(({ id, sectionName }) => ({ id: id, value: id, label: sectionName }))
							);
							setLoading(false);
						}
					})
					.catch((error) => {
						if (error.response)
							setServerErrors(error.response.data.error);
						else
							setServerErrors(error.Error);
					})

				await axios.get(`/dakTypes`)
					.then((response) => {
						//setAllDakTypes(response.data);
						if (!unmounted) {
							setAllDakTypes(
								response.data.map(({ id, section, description }) => ({ id: id, fkSection: section.id, label: description, value: description }))
							);
							setLoading(false);
						}
					})
					.catch((error) => {
						if (error.response)
							setServerErrors(error.response.data.error);
						else
							setServerErrors(error.Error);
					})
			}
		}
		fetchData();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	const onSubmit = (data, event) => {
		event.preventDefault();
		console.log(data);
		if (data.id) {
			axios.put("/billTypes/" + data.id, dakType)
				.then((response) => { })
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		} else {
			axios.post("/billTypes", data,dakType)
				.then((response) => { })
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		}

		history.push("/billTypes");
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
	
	const handleSectionChange = (e) => {
setSection(e.target.value);
setDakType(null);
setSectionDakTypes(allDakTypes.filter(bySection.bind(null, e.target.value)));
};

const bySection = (section, value, index, array) => {
return value.fkSection.toString() == section;
};
const handleDakTypeChange = (e) => {
setDakType(e.target.value);
};

 

	return (
		<div className="max-w-xl mx-auto ">
			<div className="w-full w-3/4  mx-auto " >

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Bill Type </h1>
					<div className="text-red-500">{serverErrors}</div>
					  
							<div className="grid grid-cols-1 gap-0">

						<div style={{ width: 400, marginBottom: 20 }}>
							<b>Section</b>

							<select className="form-control py-0"
								disabled={loading}
								value={section.id}
								onChange={handleSectionChange}>
								{sections.map(({ id, label, value }) => (
									<option key={id} value={value}> {label} </option>
								))}
							</select>
						</div> 	
						
						<div style={{ width: 400, marginBottom: 20 }}>
							<b>Dak Types</b>

							<select className="form-control py-0"
								disabled={loading}
								value={dakType && dakType.id || ''}  
								onChange={handleDakTypeChange}>
								{sectionDakTypes.map(({ id, label, value }) => (
									<option key={id} value={value}> {label} </option>
								))}
							</select>
						</div> 		
								
						
								<div>
									<label>Description</label>
									<input type="text" name="description" {...register("description")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.description?.message}</div>
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

export default withRouter(BillTypeEdit);