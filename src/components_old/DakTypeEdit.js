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
import Select from 'react-select';
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
	 
	dakCategory: yup.object().required('Dak Category Required'),
	//sectionGroup: yup.string().required('Section Required'),
	//aoDate: yup.string().required('Required'),
	 
});


const DakTypeEdit = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();
	//console.log(id);

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	 const [secGroup,setSecGroup]=useState('');
	const [sectionGroupList,setSectionGroupList]=useState([]);
	 const [loading, setLoading] = useState(true);
	const [key, setKey] = useState('Page1');




	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get('/dakTypes/' + id)
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
					'id', 'dakCategory', 'section','sectionGroup', 'description' 
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



	useEffect(() => {
		let fetching = false;
		let unmounted = false;
		 
		async function fetchSectionGroup() {
			 
			if (!fetching)
				//console.log(secId);
				await axios.get(`/sections/999/sectionGroup`)
					.then((response) => {
						console.log("response>>" + response.data);
						setSectionGroupList(response.data);
						if (!unmounted) {
							 
							 
							setLoading(false);
						}
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
		fetchSectionGroup();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);
	const onSubmit = (data, event) => {
		event.preventDefault();
		console.log(data);
		if (data.id) {
			axios.put("/dakTypes/" + data.id, data)
				.then((response) => { })
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		} else {
			axios.post("/dakTypes", data)
				.then((response) => { })
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					if (error.response)
						setServerErrors(error.response.data);
					else
						setServerErrors(error);
				});
		}

		history.push("/dakTypes");
	}

	const onError = (errors, e) => console.log(errors, e);

	//All foreign keys. 
	// XXXXXX Add search fields and adjust the values as necessary
	const parentData = {

		 
		dakCategory: {
			title: "DakCategory",
			url: "dakCategorys",
			searchList: ['categoryCode','categoryName'], //XXXXXXXXX Add search fields
			fkEntity: "dakCategory",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
		section: {
			title: "Section",
			url: "sections",
			searchList: ['sectionName'], //XXXXXXXXX Add search fields
			fkEntity: "section",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
		 
		 
		 
	}
		const handleGroupChange = (e) =>{
		setSecGroup(sectionGroupList[e.target.selectedIndex-1]);
		setValue('sectionGroup',sectionGroupList[e.target.selectedIndex-1])
		console.log(sectionGroupList[e.target.selectedIndex-1]);
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
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Dak Type </h1>
					<div className="text-red-500">{serverErrors}</div>

					 
							<div className="grid grid-cols-2 gap-0 ">
 
								<div >
							<b>Section Group</b>
							<select className="form-control py-0"
								disabled={loading}
								value={secGroup}
								onChange={handleGroupChange}>
								<option key="default" value="" label="--select--"/>
								{sectionGroupList.map((item,index) => (
									
									<option key={item} value={item.toString()}>   {item.toString()} </option>
								))}
							</select>
						</div>
								
								<div >
									<LiveSearch name="dakCategory" onChange={handleInputChange}
										parentData={parentData.dakCategory} parentCallback={callback}
										fkEntity={entity.dakCategory} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.dakCategory?.message}</div>
								</div>


								 

						 
								<div>
									<label>Description</label>
									<input type="text" name="description" {...register("description")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.description?.message}</div>
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

export default withRouter(DakTypeEdit);