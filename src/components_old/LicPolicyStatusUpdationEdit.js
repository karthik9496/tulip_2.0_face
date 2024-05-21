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
	 

});



const LicEdit = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({}); 
	const [key, setKey] = useState('page1');
	 
	const [dakId, setDakId] = useState(0);
	 
	const [mesg,setMesg]=useState('');
	const [me,setMe]=useState('');
	const [dakidNo,setDakidNo]=useState('');
	const [polStatus,setPolStatus]=useState('');
	 



	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get('/lics/' + id)
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
							'id', 'dak', 'employee', 'cdaoNo', 'checkDigit', 'policyNo','policyAmount', 
							'premiumAmount', 'premiumDueMe', 'policyCommencementDate','policyMaturityDate','monthEnding', 
							'auditor', 'aao','ao','auditorDate', 'aaoDate', 'aoDate', 'policyStatus','approved','disposalFileName'
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

	}, []);

 	useEffect(() => {
		let fetching = false;
		let unmounted = false;
		async function fetchMe() {
			 
			 
				if (!fetching)
					await axios.get(`/licMaturityTransactions/licDemand/getCurrentMe`)
						.then((response) => {
							setMe(response.data);
							 
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
		fetchMe();
		 
		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
 

	const onSubmit = (data, event) => {
		event.preventDefault();
		console.log(data);
		if (data.id) {
			axios.put("/lics/policyStatusUpdation/audSubmit/" + data.id, data)
				.then((response) => {
					setMesg(response.data);
					 
				})
				.catch((error) => {
					console.log(error);
					//	console.log(error.response.status);
					//	console.log(error.response.headers);
					if (error.response)
						setServerErrors(error.response.data.error);
					else
						setServerErrors(error.Error);
				})
		} 

		 
	}

	const onError = (errors, e) => console.log(errors, e);

	//All foreign keys. 
	// XXXXXX Add search fields and adjust the values as necessary
	const parentData = {

		dak: {
			title: "Dak",
			url : "daks",
			searchList : ['id'], //XXXXXXXXX Add search fields
			fkEntity: "dak",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
			employee: {
			title: "Employee",
			url: "employees/all/effective",
			searchList: ['cdaoNo', 'checkDigit', 'officerName'], //XXXXXXXXX Add search fields
			fkEntity: "employee",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
		 
	}

	//Callback for child components (Foreign Keys)
	const callback = (childData) => {
		//console.log("Parent Callback");
		setEntity(prev => ({ ...prev, [childData.fk]: childData.entity }));
		setValue(childData.fk, childData.entity);
		//console.log(errors);
		console.log(">>>"+childData.fk);
		 
		clearErrors(childData.fk);
	};

	const errorCallback = (err) => {
		//console.log(err);
		setServerErrors(err);
	}

	const handleInputChange = (e) => {
		//console.log(e.target.value);
	};
	 
	 
	const handleButtonClick = (e) =>{
		history.push("/lics");
	}
	
	const handlePolicyStatusChange = (e) => {
		console.log(e.target.value);
		setPolStatus(e.target.value);
		
	 
	};

	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				
				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Lic Policy Status </h1>
				 
					<div className="text-red-500">{mesg}</div>

					<Tabs
						id="Lic"
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className="mb-3">
						
					<Tab eventKey="page1" title="Lic Policy Status" className="h-120">
					<div className="grid grid-cols-2 gap-0">
						 
							<div>
									<label>Month</label>
									 {me}
								</div>
								 
								  
							<div >
									<LiveSearch name="employee" onChange={handleInputChange}
										parentData={parentData.employee} parentCallback={callback}
										fkEntity={entity.employee} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.employee?.message}</div>
								</div>
								
								<div>
									<label>Policy Number</label>
									<input type="text" name="policyNo" {...register("policyNo")} 
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.policyNo?.message}</div>
								</div>
								 
							<div>
									<label>Policy Amount</label>
									<input type="text" name="policyAmount" {...register("policyAmount")} 
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.policyAmount?.message}</div>
								</div>
								
								<div>
									<label>Policy Status</label>
									<input type="text" name="policyStatus" {...register("policyStatus")} 
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.policyStatus?.message}</div>
								</div>
								
								<div>
									<label>Policy Status To Be Updated</label>
									<select name="policyStatus" {...register("policyStatus")} className="form-control py-0"
								onChange={handlePolicyStatusChange} >
									<option value="select">--Select--</option>
									<option key="active" value="ACTIVE">ACTIVE</option>
									<option key="surrender" value="SURRENDER">SURRENDER</option>
									<option key="paid" value="PAID-UP">PAID-UP</option>
									</select>
								</div>
								
								<div>
									<label>Disposal File Name</label>
									<textarea type="text" name="disposalFileName" {...register("disposalFileName")}
										className="form-control py-0"/>
									 
									<div className="text-red-500">{errors.disposalFileName?.message}</div>
								</div>	
								<div>
									<label>Remarks</label>
									<textarea type="text" name="reason" {...register("reason")}
										className="form-control py-0"/>
									 
									<div className="text-red-500">{errors.reason?.message}</div>
								</div>	
								
							 
		 

					<div className="px-2">
						<button type="submit" >Save</button>
					</div>
					<div className="px-2">
					<button type="button" onClick={handleButtonClick} >Cancel</button>
						</div>
</div>
</Tab>
 
					
</Tabs>
				</form>
			</div>
		</div>
	);
};

export default withRouter(LicEdit);