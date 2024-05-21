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
     // parentMenu: yup.object().required('Required'),
      rol: yup.object().required('Required'),
     // displayPriority: yup.number().integer().required('Required'),
      menuName: yup.string().required('Required'),
});


const MenuEdit = () => {
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
				await axios.get('/menus/' + id)
					.then((response) => {
						record = response.data;
						const fields = [
						'id'
, 'fkParentMenu', 'rol', 'displayPriority', 'menuName'	,'link'			
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
			axios.put("/menus/" + data.id, data)
				.then((response) => {
					history.push("/menus");
				 })
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		} else {
			axios.post("/menus", data)
				.then((response) => {
					history.push("/menus");
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
	
		parentMenu: {
			title: "Parent Menu",
			url : "parentMenus",
			searchList : ['id'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "parentMenu",
		},
		rol: {
			title: "Rol",
			url : "rols",
			searchList : ['rolName'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "rol",
		},
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
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Menu </h1>
					<div className="text-red-500">{serverErrors}</div>
					<Tabs
						id="MenuEdit"
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className="mb-3"
					>
						<Tab eventKey="page1" title="Page 1" className="h-120">
							<div className="grid grid-cols-2 gap-0">
								 						
								
						
								<div >
									<LiveSearch name="rol" onChange={handleInputChange}
										parentData={parentData.rol} parentCallback={callback} 
										fkEntity={entity.rol} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.rol?.message}</div>
								</div>	
								
								<div>
									<label>Menu Name</label>
									<input type="text" name="menuName" {...register("menuName")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.menuName?.message}</div>
								</div>					
								
								<div>
									<label>Parent Menu Id</label>
									<input type="text" name="fkParentMenu" {...register("fkParentMenu")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.fkParentMenu?.message}</div>
								</div>
								
								<div>
									<label>Link</label>
									<input type="text" name="link" {...register("link")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.link?.message}</div>
								</div>
						
								<div>
									<label>Display Priority</label>
									<input type="text" name="displayPriority" {...register("displayPriority")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.displayPriority?.message}</div>
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

export default withRouter(MenuEdit);