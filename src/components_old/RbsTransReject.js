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



const RbsTransReject = () => {
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
				await axios.get('/rbsTrans/' + id)
					.then((response) => {
						record = response.data;
						const fields = [
							'id','dak','employee','cdaoNo', 'checkDigit','cdaSlNo','personelNo','taskNo','rank','name', 'uabsoCode', 'quarterArea',
							'quarterType','buildingNo','station','occupationDate','vacationDate','referenceBillNo','referenceBillDate',
							'occupationVacationRevision','lfeeFromDate','lfeeToDate', 'lfeeAmount','furFromDate','furToDate','furAmount',
							'excessFurFromDate','excessFurToDate','excessFurAmount','fanFromDate','fanToDate','fanAmount','fridgeFromDate',
							'fridgeToDate','fridgeAmount','waterAmount','lightAmount','powerAmount','servantQrAmount','garageAmount','rentBillNo',
							'rentBillDate','batchNo', 'monthEnding','auditorDate','aaoDate','aoDate','reason','recordStatus','remarks','approved',
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
		if(disabled)
			return;
		
		setDisabled(true);
		setButtonDisabled(true);
		console.log(data);
		if (data.id) {
			axios.put("/rbsTrans/reject/" + data.id, data)
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
			 
			axios.post("/rbsTrans", data)
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
		history.push("/rbsTrans");
	}

		return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Single Rent Bill Transaction Edit </h1>

					<div className="text-red-500">{mesg}</div>

					<Tabs
						id="InitialOccupationReturnTransactionEdit"
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className="mb-3">

						<Tab eventKey="page1" title="IOR" className="h-120">
							<div className="grid grid-cols-3 gap-0">
								
								<div>
									<label>Month</label>
									{me}
								</div>
								<div>
								</div>
								 

								</div>
								<div>
								<div className="grid grid-cols-3 gap-0">
								<div >
									<LiveSearch name="employee" onChange={handleInputChange}readOnly
										parentData={parentData.employee} parentCallback={callback}
										fkEntity={entity.employee} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.employee?.message}</div>
								</div>




								<div>
									<label>Personel No</label>
									<input type="text" name="personelNo" {...register("personelNo")}readOnly
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.personelNo?.message}</div>
								</div>

								<div>
									<label>Officer Name</label>
									<input type="text" name="name" {...register("name")}readOnly
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.name?.message}</div>
								</div>

								<div>
									<label>Uabso Code</label>
									<input type="text" name="uabsoCode" {...register("uabsoCode")}readOnly
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.uabsoCode?.message}</div>
								</div>

								<div>
									<label>Quarter Area</label>
									<input type="text" name="quarterArea" {...register("quarterArea")}readOnly
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.quarterArea?.message}</div>
								</div>
								<div>
									<label>Quarter Type</label>
									<input type="text" name="quarterType" {...register("quarterType")}readOnly
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.quarterType?.message}</div>
								</div>

								<div>
									<label>Building No</label>
									<input type="text" name="buildingNo" {...register("buildingNo")}readOnly
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.buildingNo?.message}</div>
								</div>

								<div>
									<label>Station</label>
									<input type="text" name="station" {...register("station")}readOnly
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.station?.message}</div>
								</div>
								<div>
									<label>Rent Bill No</label>
									<input type="text" name="rentBillNo" {...register("rentBillNo")}readOnly
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.rentBillNo?.message}</div>
								</div>

								<div>
									<label>Rent Bill Date</label>
									<input type="date" name="rentBillDate" {...register("rentBillDate")}readOnly
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.rentBillDate?.message}</div>
								</div>

								<div>
									<label>Occupation Date</label>
									<input type="date" name="occupationDate" {...register("occupationDate")}readOnly
										className="form-control py-0" />
									<div className="text-red-500">{errors.occupationDate?.message}</div>
								</div>

								<div>
									<label>Vacation Date</label>
									<input type="date" name="vacationDate" {...register("vacationDate")}readOnly
										className="form-control py-0" />
									<div className="text-red-500">{errors.vacationDate?.message}</div>
								</div>


 								</div>
 								</div>
 								<br/>
								<div className="grid grid-cols-3 gap-0">
								<div>
									<label>LFee From Date</label>
									<input type="date" name="lfeeFromDate" {...register("lfeeFromDate")}readOnly
										className="form-control py-0" />
									<div className="text-red-500">{errors.lfeeFromDate?.message}</div>
								</div>

								<div>
									<label>LFee To Date</label>
									<input type="date" name="lfeeToDate" {...register("lfeeToDate")}readOnly
										className="form-control py-0" />
									<div className="text-red-500">{errors.lfeeToDate?.message}</div>
								</div>

								<div>
									<label>LFee Amount</label>
									<input type="text" name="lfeeAmount" {...register("lfeeAmount")}readOnly
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.lfeeAmount?.message}</div>
								</div>
								</div>
								<br/>
								<div className="grid grid-cols-3 gap-0">
								<div>
									<label>Furniture From Date</label>
									<input type="date" name="furFromDate" {...register("furFromDate")}readOnly
										className="form-control py-0" />
									<div className="text-red-500">{errors.furFromDate?.message}</div>
								</div>

								<div>
									<label>Furniture To Date</label>
									<input type="date" name="furToDate" {...register("furToDate")}readOnly
										className="form-control py-0" />
									<div className="text-red-500">{errors.furToDate?.message}</div>
								</div>

								<div>
									<label>Furniture Amount</label>
									<input type="text" name="furAmount" {...register("furAmount")}readOnly
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.furAmount?.message}</div>
								</div>

								<div>
									<label>Excess Furniture From Date</label>
									<input type="date" name="excessFurFromDate" {...register("excessFurFromDate")}readOnly
										className="form-control py-0" />
									<div className="text-red-500">{errors.excessFurFromDate?.message}</div>
								</div>

								<div>
									<label>Excess Furniture To Date</label>
									<input type="date" name="excessFurFromDate" {...register("excessFurFromDate")}readOnly
										className="form-control py-0" />
									<div className="text-red-500">{errors.excessFurFromDate?.message}</div>
								</div>

								<div>
									<label>Excess Furniture Amount </label>
									<input type="text" name="excessFurAmount" {...register("excessFurAmount")}readOnly
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.excessFurAmount?.message}</div>
								</div>
								 </div>
								 <br/>
								<div className="grid grid-cols-3 gap-0">
								<div>
									<label>Fan From Date</label>
									<input type="date" name="fanFromDate" {...register("fanFromDate")}readOnly
										className="form-control py-0" />
									<div className="text-red-500">{errors.excessFurFromDate?.message}</div>
								</div>

								<div>
									<label>Fan To Date</label>
									<input type="date" name="fanToDate" {...register("fanToDate")}readOnly
										className="form-control py-0" />
									<div className="text-red-500">{errors.fanToDate?.message}</div>
								</div>

								<div>
									<label>Fan Amount </label>
									<input type="text" name="fanAmount" {...register("fanAmount")}readOnly
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.fanAmount?.message}</div>
								</div>
								 
								<div>
									<label>Fridge From Date</label>
									<input type="date" name="fridgeFromDate" {...register("fridgeFromDate")}readOnly
										className="form-control py-0" />
									<div className="text-red-500">{errors.fridgeFromDate?.message}</div>
								</div>

								<div>
									<label>Fridge To Date</label>
									<input type="date" name="fridgeToDate" {...register("fridgeToDate")}readOnly
										className="form-control py-0" />
									<div className="text-red-500">{errors.fridgeToDate?.message}</div>
								</div>

								<div>
									<label>Fridge Amount </label>
									<input type="text" name="fridgeAmount" {...register("fridgeAmount")}readOnly
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.fridgeAmount?.message}</div>
								</div>
								 
								<div>
									<label>Water Amount </label>
									<input type="text" name="waterAmount" {...register("waterAmount")}readOnly
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.waterAmount?.message}</div>
								</div>
								<div>
									<label>Power Amount </label>
									<input type="text" name="powerAmount" {...register("powerAmount")}readOnly
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.powerAmount?.message}</div>
								</div>
								<div>
									<label>Light Amount </label>
									<input type="text" name="lightAmount" {...register("lightAmount")}readOnly
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.lightAmount?.message}</div>
								</div>
								<div>
									<label>Servant Quarter Amount </label>
									<input type="text" name="servantQrAmount" {...register("servantQrAmount")}readOnly
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.servantQrAmount?.message}</div>
								</div>
								<div>
									<label>Garage Amount </label>
									<input type="text" name="garageAmount" {...register("garageAmount")}readOnly
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.garageAmount?.message}</div>
								</div>
								<div>
									<label>Rejection Reason </label>
									<input type="text" name="rejectionReason" {...register("rejectionReason")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.rejectionReason?.message}</div>
								</div>
								 </div>
								 <br/>
					 
								<br/>
								
								 
								<div className="grid grid-cols-2 gap-0">

								
								</div>

								<div className="grid grid-cols-3 gap-0">

								<div className="px-2">
									<button type="submit" disabled={buttonDisabled} >Save</button>
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

export default withRouter(RbsTransReject);