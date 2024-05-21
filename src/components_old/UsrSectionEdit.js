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

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

const schema = yup.object({
	section: yup.object().required('Required'),
	usr: yup.object().required('Required'),
//	usrBoss: yup.object().required('Required'),
	fromDate: yup.date().required('Required'),
	//toDate: yup.string().required('Required'),
	//currentRecord: yup.boolean().required('Required'),
	//createdBy: yup.object().required('Required'),
});


const UsrSectionEdit = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();

	let history = useHistory();

	let filters = ['section', '0', 'designationLevel', '0'];
	sessionStorage.setItem('filters', JSON.stringify(filters));



	//All foreign keys. 
	// XXXXXX Add search fields and adjust the values as necessary
	const initParentData = {

		usr: {
			title: "User",
			url: "usrs",
			searchList: ['usrName', 'accountNo'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			//filters: {
			//	section: '',
			//},			
			fkEntity: "usr",
			field: 'usr', //Since usr and usrBoss refer to same table, differrentiating
		},
		section: {
			title: "Section",
			url: "sections",
			searchList: ['sectionName'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "section",

		},
		
		usrBoss: {
			title: "Boss",
			url: "usrs",
			searchList: ['usrName', 'accountNo'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			//filters: {
			//	section: '',
			//	designationLevel: '',
			//},
			fkEntity: "usrBoss",
			field: 'usrBoss', //Since usr and usrBoss refer to same table, differrentiating
		},
	}


	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [key, setKey] = useState('page1');
	//const [sectionData, setSectionData] = useState(parentData.section);
	//const [usrData, setUsrData] = useState(parentData.usr);
	//const [bossData, setBossData] = useState(parentData.usrBoss);
	const [parentData, setParentData] = useState(initParentData);
    const [usrid,setUsrid]= useState(0);
    const [usrBossData,setUsrBossData]= useState([]);
    const [usrBossItems,setUsrBossItems]= useState([]);
	const [loading, setLoading] = useState(true);
	const [usrBossItem,setUsrBossItem]= useState('');
	const [secId,setSecId]=useState(0);
	 
	 
	useEffect(() => {
		let isCancelled = false;
		//console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get('/usrSections/' + id)
					.then((response) => {
						record = response.data;
						const fields = [
							'id', 'usr', 'section', 'usrBoss', 'fromDate', 'toDate', 'currentRecord', 'createdBy'
						];
						
						setUsrid(response.data['usr'].id);
						setSecId(response.data['section'].id)
						if(response.data['usrBoss'])
							setUsrBossItem(response.data['usrBoss'].id);
							
							console.log(usrid+"--"+secId);
						fields.forEach(field => setValue(field, record[field]));
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
					//console.log(record);
					filters[1] = record.section.id.toString();
					filters[3] = record.usr.designation.designationLevel.toString();
					//console.log(filters);
					sessionStorage.setItem('filters', JSON.stringify(filters));
				}
			}

			fetchData();
			return () => {
				isCancelled = true;
			};
		}

	}, []);
	
	useEffect(()=>{
		console.log(usrBossItem);
	},[usrBossItem,setUsrBossItem]);

useEffect(() => {
		let fetching = false;
		let unmounted = false;
		console.log("daktype");
		async function fetchBossData() {
			if (!fetching && usrid && secId )
				//console.log(secId);
				await axios.get(`/usrs/${usrid}/secId/${secId}/getBoss`)
					.then((response) => {
						console.log("response>>" + response.data);
						setUsrBossData(response.data);
						if (!unmounted) {
							setUsrBossItems(
								response.data.map(({ id, usrName }) => ({ id: id, label: usrName, value: id }))
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
		fetchBossData();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [usrid,setUsrid,secId,setSecId]);


	const onSubmit = (data, event) => {
		event.preventDefault();
		console.log(data);
		if (data.id) {
			axios.put("/usrSections/" + data.id, data)
				.then((response) => {
					history.push("/usrSections");
				})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		} else {
			axios.post("/usrSections", data)
				.then((response) => { 
					history.push("/usrSections");
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


	//Callback for child components (Foreign Keys)
	const callback = (childData) => {

		console.log(childData.entity);

		//console.log("Parent Callback");
		//setEntity(prev => ({ ...prev, [childData.fk]: childData.entity }));

		setValue(childData.fk, childData.entity);
		//console.log(errors);
		//clearErrors(childData.fk);

		/////
		/*
		if(childData.fk === 'section'){
			setParentData(prev => ({...prev, usr: {...parentData.usr, filters:{section: childData.entity.id}}}));
			setParentData(prev => ({...prev, usrBoss: {...parentData.usrBoss, 
				filters:{...parentData.usrBoss.filters, section: childData.entity.id}}}));
		}else if(childData.fk === 'usr')
			setParentData(prev => ({...prev, usrBoss: {...parentData.usrBoss, 
			filters:{...parentData.usrBoss.filters,designationLevel: childData.entity.designation.designationLevel}}}));
		console.log(parentData);
		
		sessionStorage.setItem('items', JSON.stringify([1, 2, 3]));

		const items = JSON.parse(sessionStorage.getItem('items'));
		items.push({ method: sessionStorage.getItem('method') });
		sessionStorage.setItem('items', JSON.stringify(items));

		*/
		let filters = JSON.parse(sessionStorage.getItem('filters'));
		if (childData.fk === 'section') {
			filters[1] = childData.entity.id.toString();//Change section id
			setSecId(childData.entity.id);
		}
		if (childData.fk === 'usr') {
			setUsrid(childData.entity.id);
			filters[3] = childData.entity.designation.designationLevel.toString();// Change designatinLevel
		}
		sessionStorage.setItem('filters', JSON.stringify(filters));

	};

	const errorCallback = (err) => {
		//console.log(err);
		setServerErrors(err);
	}

	const handleInputChange = (e) => {
		//console.log(e.target.value);
	};

	const handleBossChange=(e)=>{
		console.log(e.target.selectedIndex);
		console.log(usrBossData[e.target.selectedIndex-1].usrName);
		setUsrBossItem(e.target.value);
		setValue('usrBoss',usrBossData[e.target.selectedIndex-1]);
		console.log(usrBossItem)
	}
	return (
		<div className="max-w-xl mx-auto ">
			<div className="w-full w-3/4  mx-auto " >

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Usr Section </h1>
					<div className="text-red-500">{serverErrors}</div>
					<Tabs
						id="UsrSectionEdit"
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className="mb-3"
					>
						<Tab eventKey="page1" title="Page 1" className="h-120">
							<div className="grid grid-cols-2 gap-0">

								<div >
									<LiveSearch name="section" onChange={handleInputChange}
										parentData={parentData.section} parentCallback={callback}
										fkEntity={entity.section} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.section?.message}</div>
								</div>
								<div></div>
								<div >
									<LiveSearch name="usr" onChange={handleInputChange}
										parentData={parentData.usr} parentCallback={callback}
										fkEntity={entity.usr} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.usr?.message}</div>
								</div>

						<div >
							<b>Usr Boss</b>
							<select className="form-control py-0"
								disabled={loading}
								value={usrBossItem} onChange={handleBossChange}>
								<option key='0' value='0'>---select---</option>
								{usrBossItems.map((item) => (
									<option key={item.id} value={item.value}> {item.label} </option>
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
							<ul className="list-disc">
								<li>Add the Users from highest rank to lowest rank.</li>
								<li>Boss list is filtered by section and designation level.</li>
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

export default withRouter(UsrSectionEdit);