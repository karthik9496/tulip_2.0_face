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
      section: yup.object().required('Required'),
      fromDate: yup.string().required('Required'),
       
      taskNo: yup.string().required('Required'),
});


const TaskEdit = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [key, setKey] = useState('page1');
	const[secList,setSecList]=useState([]);
	const [sec,setSec]=useState({});
	const [secId,setSecId]=useState(0);
	const [loading, setLoading] = useState(true);
	const [usrList,setUsrList]=useState([]);
	const [taskUsr,setTaskUsr]=useState({});
	const [uname,setUname]=useState('');
	
	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get('/tasks/' + id)
					.then((response) => {
						record = response.data;
						if(record.section!=null){
							setSec(record.section);
							setSecId(record.section.id);
							}
						 if(record.fkUsr!=null)
						 	 fetchUsr(record.fkUsr);
						const fields = [
						'id','fkUsr'
, 'section', 'fromDate', 'toDate', 'employee', 'enabled', 'createdBy', 'taskNo','usrName'				
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
	
	async function fetchUsr(usrId){
		if(usrId){
		await axios.get("/usrSections/usrs/"+usrId)
		.then((response)=>{
			if(response.data){
				setTaskUsr(response.data)
				setUname(response.data.usrName);
				console.log(response.data.usrName+"--"+usrId);
			}
		})
		}
	}

	useEffect(() => {
		let fetching = false;
		let unmounted = false;
		 
		async function fetchSection() {
			 
			if (!fetching)
				//console.log(secId);
				await axios.get(`/usrSections/usrs/mappedSection`)
					.then((response) => {
						console.log("response>>" + response.data);
						setSecList(response.data);
						 
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
		fetchSection();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [secId]);
	
	useEffect(() => {
		let fetching = false;
		let unmounted = false;
		 
		async function fetchSectionUsers() {
			 
			if (!fetching)
				//console.log(secId);
				await axios.get(`/usrSections/usrs/mappedSection/taskUsr/${secId}`)
					.then((response) => {
						console.log("response>>" + response.data);
						setUsrList(response.data);
						 
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
		fetchSectionUsers();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [secId]);


	const onSubmit = (data, event) => {
		event.preventDefault();
		console.log(data);
		if (data.id) {
			axios.put("/tasks/" + data.id, data)
				.then((response) => { 
					//console.log(response.data);
					if(response.data==='success')
						history.push("/tasks");
						else
						setServerErrors(response.data);
				})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		} else {
			axios.post("/tasks", data)
				.then((response) => {
					if(response.data==='success')
						history.push("/tasks");
					else
						setServerErrors(response.data);
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
	
		section: {
			title: "Section",
			url : "sections",
			searchList : ['sectionName'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "section",
		},
		usr: {
			title: "User",
			url : "usrs",
			searchList : ['usrName'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "usr",
		},
		 
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

	const handleSecChange = (e) =>{
		console.log(secList[e.target.selectedIndex-1]);
		setSec(secList[e.target.selectedIndex-1]);
		setSecId(secList[e.target.selectedIndex-1].id);
		setValue('section',secList[e.target.selectedIndex-1])
		
	}
	const handleUsrChange = (e) =>{
		//console.log(secList[e.target.selectedIndex-1]);
		setTaskUsr(usrList[e.target.selectedIndex-1]);
		setUname(usrList[e.target.selectedIndex-1].usrName);
		setValue('fkUsr',usrList[e.target.selectedIndex-1].id);
		
	}
	const handleDone=(e)=>{
		history.push("/tasks");
	}


	return (
		<div className="max-w-xl mx-auto ">
			<div className="w-full w-3/4  mx-auto " >

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Task </h1>
					<div className="text-red-500">{serverErrors}</div>
					<Tabs
						id="TaskEdit"
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className="mb-3"
					>
						<Tab eventKey="page1" title="Page 1" className="h-120">
							<div className="grid grid-cols-2 gap-0">
								<div >
							<b>Section</b>
							<select className="form-control py-0"
								value={sec.sectionName}
								onChange={handleSecChange}>
								<option key="0" value={''} label="--select--"/>
								{secList.map((item,index) => (
									
									<option key={index} value={item.sectionName}>   {item.sectionName} </option>
								))}
							</select>
						</div>					
								<div>
									<label>Task No</label>
									<input type="text" name="taskNo" {...register("taskNo")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.taskNo?.message}</div>
								</div>
						<div >
							<b>Task User</b>		
						<select className="form-control py-0"
								value={taskUsr.usrName}
								onChange={handleUsrChange}>
								<option key="0" value={''} label="--select--"/>
								{usrList.map((item,index) => (
									
									<option key={index} value={item.usrName}>   {item.usrName} : {item.accountNo} </option>
								))}
							</select>
						</div>
								 
								<div>
									<label>From Date</label>
									<input type="date" name="fromDate" {...register("fromDate")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.fromDate?.message}</div>
								</div>						
						
								
								<div>
									<label>To Date</label>
									<input type="date" name="toDate" {...register("toDate")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.toDate?.message}</div>
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
					<div className="grid grid-cols-2 gap-0">
						<button type="submit" >Save</button>
						<button type="button" onClick={handleDone}>Done</button>
						</div>
					</div>

				</form>
			</div>
		</div>
	);
};

export default withRouter(TaskEdit);