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
	//dakType: yup.object().required('Required'),
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
	const [sectionData, setSectionData] = useState([]);
	const [dakTypeData, setDakTypeData] = useState([]);
	const [secId, setSecId] = useState();
	const [secItems, setSecItems] = useState([]);
	const [dakTypeItems, setDakTypeItems] = useState([]);
	const [dakTypeItem, setDakTypeItem] = useState();
	const [loading, setLoading] = useState(true);
	const [dakType, setDakType] = useState();
	const [secItem, setSecItem] = useState([]);
	const [secGroup,setSecGroup]=useState('');
	const [sectionGroupList,setSectionGroupList]=useState([]);
	  



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
							'id', 'dakType', 'task', 'description','sectionGroup'
						];
						fields.forEach(field => setValue(field, record[field]));
						console.log(">>>>> " + record['id']);						
						console.log(">>>>> " + record.dakType.id);
						console.log(">>>>> " + record.dakType.section.id);
						//console.log(">>>>> " + record['dakType'].id);
						

						
						//setDakTypeItem(response.data.dakType.id);
						//if(record.dakType){
							setSecId(record.dakType.section.id);
							setDakTypeItem(record.dakType.id);
							console.log(secId);
							console.log(dakTypeItem);							
						//}


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


				if (!isCancelled) {
					setEntity(record);
					setState(prev => ({ ...prev, state: record }));	
					console.log(">>>>>>" + entity.dakType + "--" + entity);
					/*
					if (entity.dakType) {
						console.log("set dak type " + entity.dakType + "--" + entity.dakType.section.id);
						//setSecId(entity.dakType.section.id);
						setDakType(entity.dakType.id)
					}
					*/

				}
			}

			fetchData();
			return () => {
				isCancelled = true;
			};
		}

	}, [id]);

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
	
	useEffect(() => {
		let fetching = false;
		let unmounted = false;
		console.log("hello");
		async function fetchSectionData() {

			if (!fetching)
				await axios.get(`/sections`)
					.then((response) => {
						setSectionData(response.data);
						if (!unmounted) {
							setSecItems(
								response.data.map(({ id, sectionName }) => ({ id: id, label: sectionName }))
							);
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
		fetchSectionData();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	useEffect(() => {
		let fetching = false;
		let unmounted = false;
		console.log("daktype");
		async function fetchDakTypeData() {
			console.log(secGroup);
			if (!fetching && secGroup)
				//console.log(secId);
				await axios.get(`/sections/0/dakTypes/${secGroup}`)
					.then((response) => {
						console.log("response>>" + response.data);
						setDakTypeData(response.data);
						if (!unmounted) {
							setDakTypeItems(
								response.data.map(({ id, description }) => ({ id: id, label: description, value: id }))
							);
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
		fetchDakTypeData();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [secGroup]);



	const onSubmit = (data, event) => {
		event.preventDefault();
		if (data.id) {
			axios.put("/billTypes/" + data.id, data)
				.then((response) => { 
					history.push("/billTypes");
				})
				.catch((error) => {
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		} else {
			axios.post("/billTypes", data)
				.then((response) => {
					history.push("/billTypes");
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
		setSecId(e.target.value);
		//setDakTypeItem('');
		console.log("secid" + e.target.value);
	};

	const handleGroupChange = (e) =>{
		setSecGroup(sectionGroupList[e.target.selectedIndex-1]);
		setValue('sectionGroup',sectionGroupList[e.target.selectedIndex-1])
		console.log(sectionGroupList[e.target.selectedIndex-1]);
	}

	const handleDakTypeChange = (e) => {
		console.log(">>>" + e.target.value);
		console.log(e.target.selectedIndex);
		console.log(dakTypeData[e.target.selectedIndex])	
		setDakTypeItem(e.target.value);
		setValue('dakType', dakTypeData[e.target.selectedIndex])


		/*		
		for (var k in dakTypeData) {
			console.log("-----" + dakTypeData[k].id + "--" + e.target.value + "--");

			if (dakTypeData[k].id == e.target.value) {
				console.log("setting entity daktype");
				setValue('dakType', dakTypeData[k]);
			}
		}
		*/
		//console.log("entit---" + entity.description + "--" + entity.dakType + " " + entity.description + "--" + entity.id);
	};

	return (
		<div className="max-w-xl mx-auto ">
			<div className="w-full w-3/4  mx-auto " >

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Bill Type </h1>
					<div className="text-red-500">{serverErrors}</div>

					<div className="grid grid-cols-2 gap-0">

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
							<b>Dak Types</b>
							<select className="form-control py-0"
								disabled={loading}
								value={dakTypeItem}
								onChange={handleDakTypeChange}>
								{dakTypeItems.map((item) => (
									<option key={item.id} value={item.value}> {item.label} </option>
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