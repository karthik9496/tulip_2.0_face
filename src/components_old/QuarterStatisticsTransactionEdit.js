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



const QuarterStatisticsTransactionEdit = () => {
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
	const [cdaoNo,setCdaoNo]=useState(''); 
	 const [buttonState, setButtonState] = useState('');
    const [disabled,setDisabled]=useState(false);
    const [buttonDisabled,setButtonDisabled]=useState(false);



	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get('/quarterStatisticsTransactions/' + id)
					.then((response) => {
						record = response.data;
						const fields = [
							'id','dak','employee','cdaoNo', 'checkDigit','cdaSlNo','personelNo','taskNo','rank','name', 'uabsoCode', 'quarterArea',
							'quarterType','buildingNo','station','elecFromDate','elecToDate','elecUnit', 'elecAmount','elecDuty',
							'powerFromDate','powerToDate','powerUnit','powerAmount','waterFromDate','waterToDate', 'waterUnit','waterAmount','totalAmount',
							'rentBillNo','rentBillDate','batchNo', 'monthEnding','auditorDate','aaoDate','aoDate','reason','recordStatus','remarks','approved',
							'rejectionReason','uploadFileName','rentBillNo','rentBillDate'
      
						];
						 
						setCdaoNo(record.cdaoNo);
				 
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
					await axios.get(`/miscs/currentMe`)
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
			axios.put("/quarterStatisticsTransactions/" + data.id, data)
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
		} else {
			 
			axios.post("/quarterStatisticsTransactions", data)
				.then((response) => { 
					console.log(response.data);
					setMesg(response.data);
					setDisabled(false);
				})
				.catch((error) => {
					setMesg(error.response.data);
					//console.log(error.response.data);
 				//	setServerErrors(error.response.data)
				});
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
		history.push("/quarterStatisticsTransactions");
	}

	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				
				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Quarter Statistics Transaction Edit </h1>
				 
					<div className="text-red-500">{mesg}</div>

					<Tabs
						id="QuarterStatisticsTransactionEdit"
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className="mb-3">
						
					<Tab eventKey="page1" title="QST" className="h-120">
					<div className="grid grid-cols-3 gap-0">
						 
							<div>
									<label>Month : {me}</label>
									 
								</div>
								 
							 
							<div >
									<LiveSearch name="employee" onChange={handleInputChange}
										parentData={parentData.employee} parentCallback={callback}
										fkEntity={entity.employee} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.employee?.message}</div>
								</div>
								
								 
								
								<div>
									<label>Uabso Code</label>
									<input type="text" name="uabsoCode" {...register("uabsoCode")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.uabsoCode?.message}</div>
								</div>
								
								<div>
									<label>Quarter Area</label>
									<input type="text" name="quarterArea" {...register("quarterArea")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.quarterArea?.message}</div>
								</div>
								<div>
									<label>Quarter Type</label>
									<input type="text" name="quarterType" {...register("quarterType")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.quarterType?.message}</div>
								</div>
								
								<div>
									<label>Building No</label>
									<input type="text" name="buildingNo" {...register("buildingNo")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.buildingNo?.message}</div>
								</div>
								
								<div>
									<label>Station</label>
									<input type="text" name="station" {...register("station")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.station?.message}</div>
								</div>
								<div>
									<label>Rent Bill No</label>
									<input type="text" name="rentBillNo" {...register("rentBillNo")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.rentBillNo?.message}</div>
								</div>
								
								<div>
									<label>Rent Bill Date</label>
									<input type="date" name="rentBillDate" {...register("rentBillDate")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.rentBillDate?.message}</div>
								</div>
						 </div>
						 <br/>
						 <br/>
						 <div className="grid grid-cols-3 gap-0">
								 
								<div>
									<label>Electricity From Date</label>
									<input type="date" name="elecFromDate" {...register("elecFromDate")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.elecFromDate?.message}</div>
								</div>		
								
								<div>
									<label>Electricity To Date</label>
									<input type="date" name="elecToDate" {...register("elecToDate")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.elecToDate?.message}</div>
								</div>	
								
								<div>
									<label>Electricity Unit</label>
									<input type="text" name="elecUnit" {...register("elecUnit")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.elecUnit?.message}</div>
								</div>
								<div>
									<label>Electricity Amount</label>
									<input type="text" name="elecAmount" {...register("elecAmount")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.elecAmount?.message}</div>
								</div>
								<div>
									<label>Electricity Duty</label>
									<input type="text" name="elecDuty" {...register("elecDuty")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.elecDuty?.message}</div>
								</div>
								 
								<div>
									<label>Power From Date</label>
									<input type="date" name="powerFromDate" {...register("powerFromDate")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.powerFromDate?.message}</div>
								</div>		
								
								<div>
									<label>Power To Date</label>
									<input type="date" name="powerToDate" {...register("powerToDate")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.powerToDate?.message}</div>
								</div>	
								
								<div>
									<label>Power Unit</label>
									<input type="text" name="powerUnit" {...register("powerUnit")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.powerUnit?.message}</div>
								</div>	
								
								<div>
									<label>Power Amount</label>
									<input type="date" name="powerAmount" {...register("powerAmount")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.powerAmount?.message}</div>
								</div>		
								
								 
								<div>
									<label>Water From Date</label>
									<input type="date" name="waterFromDate" {...register("waterFromDate")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.waterFromDate?.message}</div>
								</div>		
								
								<div>
									<label>Water To Date</label>
									<input type="date" name="waterToDate" {...register("waterToDate")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.waterToDate?.message}</div>
								</div>	
								
								<div>
									<label>Water Unit </label>
									<input type="text" name="waterUnit" {...register("waterUnit")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.waterUnit?.message}</div>
								</div>	
								<div>
									<label>Water Amount </label>
									<input type="text" name="waterAmount" {...register("waterAmount")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.waterAmount?.message}</div>
								</div>	
								 </div>
								
							 	 <br/>
							 	 <br/>
 <div className="grid grid-cols-3 gap-0">
					<div className="px-2">
						<button type="submit" disabled={disabled}>Save</button>
					</div>
					<div className="px-2">
					<button type="button" onClick={handleButtonClick} >Cancel</button>
						</div>
						<div className="px-4">
						<button type="submit" onClick={handleButtonClick} >Done</button>
					</div>
</div>
</Tab>
 
					
</Tabs>
				</form>
			</div>
		</div>
	);
};

export default withRouter(QuarterStatisticsTransactionEdit);