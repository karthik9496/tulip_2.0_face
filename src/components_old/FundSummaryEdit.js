/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 18 April 2022
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


const FundSummaryEdit = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [key, setKey] = useState('page1');
	const[disabled,setDisabled]=useState(false);
	const [mesg,setMesg]=useState('');
	
	
	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get('/fundSummarys/' + id)
					.then((response) => {
						record = response.data;
						const fields = [
						'id', 'employee', 'openingBalance', 'subTotal', 'refundTotal', 'debitTotal', 
						'yearlyInterest', 'closingBalance', 'qe', 'employeeType', 'nePaidAmount', 
						'transferInAmount', 'interestAdjusted', 'transferOutAmount', 'otherAdjustment', 
						'taxableSubscription', 'interestOnTaxableSubscription'				
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

	}, []);


	const onSubmit = (data, event) => {
		event.preventDefault();
		console.log(data);
		if (data.id) {
			axios.put("/fundSummarys/audSubmit/" + data.id, data)
				.then((response) => { 
					setMesg(response.data);
				})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		} else {
			axios.post("/fundSummarys", data)
				.then((response) => { 
					setMesg(response.data);
			//		history.push("/fundSummarys");
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
		//setEntity(prev => ({ ...prev, [childData.fk]: childData.entity }));
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
	const returnToList =() => {
		history.push('/lpcRegisters/fsClosingList');
	}

	return (
		<div className="max-w-xl mx-auto ">
			<div className="w-full w-3/4  mx-auto " >

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Fund Summary </h1>
					<div className="text-red-500">{mesg}</div>
					<Tabs
						id="FundSummaryEdit"
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className="mb-3"
					>
						<Tab eventKey="page1" title="Page 1" className="h-120">
							<div className="grid grid-cols-2 gap-0">
							<div>
									<label>Month Ending</label>
									<input type="text" name="monthEnding" {...register("monthEnding")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.monthEnding?.message}</div>
								</div>
								<div >
									<LiveSearch name="employee" onChange={handleInputChange}
										parentData={parentData.employee} parentCallback={callback} 
										fkEntity={entity.employee} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.employee?.message}</div>
								</div>						
								
						
								<div>
									<label>Opening Balance</label>
									<input type="text" name="openingBalance" {...register("openingBalance")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.openingBalance?.message}</div>
								</div>
								
						
								<div>
									<label>Sub Total</label>
									<input type="text" name="subTotal" {...register("subTotal")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.subTotal?.message}</div>
								</div>
								
						
								<div>
									<label>Refund Total</label>
									<input type="text" name="refundTotal" {...register("refundTotal")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.refundTotal?.message}</div>
								</div>
								
						
								<div>
									<label>Debit Total</label>
									<input type="text" name="debitTotal" {...register("debitTotal")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.debitTotal?.message}</div>
								</div>
							 
							 {/*
								<div>
									<label>Interest Adjusted</label>
									<input type="text" name="interestAdjusted" {...register("interestAdjusted")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.interestAdjusted?.message}</div>
								</div>
							 
								<div>
									<label>Other Adjustment</label>
									<input type="text" name="otherAdjustment" {...register("otherAdjustment")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.otherAdjustment?.message}</div>
								</div>
								*/}
								
						 <div>
									<label>Yearly Interest</label>
									<input type="text" name="yearlyInterest" {...register("yearlyInterest")}readOnly
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.yearlyInterest?.message}</div>
								</div>
								
						
								<div>
									<label>Closing Balance</label>
									<input type="text" name="closingBalance" {...register("closingBalance")}readOnly
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.closingBalance?.message}</div>
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
						
					<div className="grid grid-cols-2 gap-0">
					<div className="px-3 ...">
						<button type="submit" disabled={disabled}>Save</button>
						</div>
						<div className="px-3 ...">
						<button type="button" onClick={returnToList} >Done</button>
						</div>
					</div>

				</form>
			</div>
		</div>
	);
};

export default withRouter(FundSummaryEdit);