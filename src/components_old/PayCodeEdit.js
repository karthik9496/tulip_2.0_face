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
     
      taxable: yup.boolean().required('Required'),
      fromDate: yup.string().required('Required'),
       
     
      payCode: yup.string().required('Required'),
      description: yup.string().required('Required'),
      
});


const PayCodeEdit = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [key, setKey] = useState('page1');
	const [test,setTest]=useState("1234");
	
	
	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get('/payCodes/' + id)
					.then((response) => {
						record = response.data;
						const fields = [
						'id'
, 'auditorDate', 'aaoDate', 'aoDate', 'approved', 'taxable', 'fromDate', 'toDate', 'personal', 'payCode', 'description', 'debitCredit', 'receiptCharge', 'codeHead', 'groupHead', 'payModule', 'recordStatus'				
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
			axios.put("/payCodes/" + data.id+"/"+test, data)
				.then((response) => { })
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		} else {
			axios.post("/payCodes", data)
				.then((response) => { })
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		}

		history.push("/payCodes");
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
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Pay Code </h1>
					<div className="text-red-500">{serverErrors}</div>
					<Tabs
						id="GrievanceEdit"
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className="mb-3"
					>
						<Tab eventKey="page1" title="Page 1" className="h-120">
							<div className="grid grid-cols-2 gap-0">
								
								<div>
									<label>Auditor Date</label>
									<input type="date" name="auditorDate" {...register("auditorDate")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.auditorDate?.message}</div>
								</div>						
						
								
								<div>
									<label>Aao Date</label>
									<input type="date" name="aaoDate" {...register("aaoDate")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.aaoDate?.message}</div>
								</div>						
						
								
								<div>
									<label>Ao Date</label>
									<input type="date" name="aoDate" {...register("aoDate")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.aoDate?.message}</div>
								</div>						
						
								<div>
									<label>Approved</label>
									<input type="text" name="approved" {...register("approved")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.approved?.message}</div>
								</div>
								
						
								<div>
									<label>Taxable</label>
									<input type="text" name="taxable" {...register("taxable")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.taxable?.message}</div>
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
						
								<div>
									<label>Personal</label>
									<input type="text" name="personal" {...register("personal")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.personal?.message}</div>
								</div>
								
						
								<div>
									<label>Pay Code</label>
									<input type="text" name="payCode" {...register("payCode")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.payCode?.message}</div>
								</div>
								
						
								<div>
									<label>Description</label>
									<input type="text" name="description" {...register("description")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.description?.message}</div>
								</div>
								
						
								<div>
									<label>Debit Credit</label>
									<input type="text" name="debitCredit" {...register("debitCredit")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.debitCredit?.message}</div>
								</div>
								
						
								<div>
									<label>Receipt Charge</label>
									<input type="text" name="receiptCharge" {...register("receiptCharge")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.receiptCharge?.message}</div>
								</div>
								
						
								<div>
									<label>Code Head</label>
									<input type="text" name="codeHead" {...register("codeHead")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.codeHead?.message}</div>
								</div>
								
						
								<div>
									<label>Group Head</label>
									<input type="text" name="groupHead" {...register("groupHead")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.groupHead?.message}</div>
								</div>
								
						
								<div>
									<label>Pay Module</label>
									<input type="text" name="payModule" {...register("payModule")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.payModule?.message}</div>
								</div>
								
						
								<div>
									<label>Record Status</label>
									<input type="text" name="recordStatus" {...register("recordStatus")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.recordStatus?.message}</div>
								</div>
								
						
					
		
							</div>
						</Tab>

						<Tab eventKey="page2" title="Page 2" className="h-120">
							<div className="grid grid-cols-2 gap-0">
							<p>Add some fields here or delete this tab.</p>
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

export default withRouter(PayCodeEdit);