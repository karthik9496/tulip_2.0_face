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
import { format } from 'date-fns'
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



const IorTransEdit = () => {
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

	const [mesg, setMesg] = useState('');
	const [me, setMe] = useState('');
	const [dakidNo, setDakidNo] = useState('');
	const [cdaoNo, setCdaoNo] = useState('');
	const [checked, setChecked] = useState(false);
	const [manChecked, setManChecked] = useState(false);
	const [buttonState, setButtonState] = useState('');
	const [disabled, setDisabled] = useState(false);
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const [manCheck, setManCheck] = useState(false);
	const [check, setCheck] = useState('');
	const [occVac, setOccVac] = useState(false);
	
	const [empId,setEmpId]=useState(0);
	const [rentType,setRentType]=useState('');
	const [usrLevel,setUsrLevel]=useState(0);
	const [occData,setOccData]=useState([]);
	const [vacId,setVacId]=useState(0);
	const [mesg1,setMesg1]=useState('');
	


	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== 'new') {
			
			async function fetchData() {
				let record = '';
				await axios.get('/iorTrans/' + id)
					.then((response) => {
						record = response.data;
						const fields = [
							'id', 'dak', 'employee', 'cdaoNo', 'checkDigit', 'cdaSlNo', 'personelNo', 'taskNo', 'rank', 'name', 'uabsoCode', 'quarterArea',
							'quarterType', 'buildingNo', 'station', 'occupationDate', 'vacationDate', 'referenceBillNo', 'referenceBillDate',
							'occupationVacationRevision', 'lfeeFromDate', 'lfeeToDate', 'lfeeAmount', 'furFromDate', 'furToDate', 'furAmount',
							'excessFurFromDate', 'excessFurToDate', 'excessFurAmount', 'fanFromDate', 'fanToDate', 'fanAmount', 'fridgeFromDate',
							'fridgeToDate', 'fridgeAmount', 'waterAmount', 'lightAmount', 'powerAmount', 'servantQrAmount', 'garageAmount', 'rentBillNo',
							'rentBillDate', 'batchNo', 'monthEnding', 'auditorDate', 'aaoDate', 'aoDate', 'reason', 'recordStatus', 'remarks', 'approved',
							'rejectionReason', 'uploadFileName', 'occupationVacationRecdSameMonth', 'transactionType', 'manuallyChecked',
							'rentAmountCr', 'furAmountCr', 'rentAmountTotal', 'furAmountTotal','vacationId'

						];

						setCdaoNo(record.cdaoNo);
						console.log("$$$$$$$:" + id);
						if(record.manuallyChecked===true){
							setManChecked(true);
						}
						
						if(record.occupationVacationRevision!==null){
							setRentType(record.occupationVacationRevision);
					//		console.log("------rent type-------:" + record.occupationVacationRevision);
						}
						
						if(record.employee!==null){
							setEmpId(record.employee.id);
						}
						
						if(record.vacationId!==null){
							setVacId(record.vacationId);
							console.log("----------vacation id----transie:"+ vacId);
						}
						
					//	let check = "";
					//	check = record.reason;
					//	if (check.startsWith('Refund')) {
					//		setManCheck(true);
				//		}

					//	let ocheck = "";
					//	ocheck = record.occupationVacationRecdSameMonth;
				//		if (ocheck === true) {
					//		setOccVac(true);
					//		setChecked(true);
				//		}
						console.log("---man check---:" + manCheck);
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
	useEffect(() => {
		let fetching = false;
		async function fetchUsrData() {
			if (!fetching)
				console.log(">>>>Usr Level is -----:" + usrLevel);
			await axios.get(`/iorTrans/userDesg`)
				.then((response) => {
					console.log(">>>>Usr Level is----:" + response.data);
					setUsrLevel(response.data);

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
		fetchUsrData();
		return () => { fetching = true; }

	}, []);
	useEffect(() => {
		let fetching = false;
		let unmounted = false;
		async function fetchOccupationDetailsForEmployee() {


			if (!fetching)
			if(usrLevel<30){
				await axios.get(`/iorTrans/occDetails/${empId}`)
					.then((response) => {
						if(response.data['occList']!==null){
							setOccData(response.data['occList']);
							console.log(occData);
						}else{
							setMesg("No Occupation Records exits in Ovm Master");
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
					}else if(usrLevel>=30){
						console.log("-------------vacid-----------here-----:" + vacId);
						await axios.get(`/iorTrans/occVacDetails/${vacId}`)
					.then((response) => {
						if(response.data['occList']!==null)
						setOccData(response.data['occList']);
						console.log(occData);
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
		}
		fetchOccupationDetailsForEmployee();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [empId,vacId,usrLevel]);
	const onSubmit = (data, event) => {

		event.preventDefault();
		if (disabled)
			return;

		setDisabled(true);
		setButtonDisabled(true);
		console.log(data);
		console.log(vacId+"----"+rentType);
		if (data.id){
			if(rentType==='Vacation') {
			axios.put(`/iorTrans/vacation/${vacId}/` + data.id, data)
				.then((response) => {
					setMesg1(response.data);
					setDisabled(false);
				})
				.catch((error) => {
					//console.log(error.response.data);
					setServerErrors(error.response.data);
				});
		}else if(rentType==='Revision') {
			axios.put(`/iorTrans/revision/${vacId}/` + data.id, data)
				.then((response) => {
					setMesg1(response.data);
					setDisabled(false);
				})
				.catch((error) => {
					//console.log(error.response.data);
					setServerErrors(error.response.data);
				});
		}else if (rentType==='Occupation') {
			axios
				.put("/iorTrans/" + data.id, data)
				.then((response) => {
					setMesg1(response.data);
					setDisabled(false);
				})
				.catch((error) => {
					//console.log(error.response.data);
					setServerErrors(error.response.data);
				});
		}
		}
		else if(rentType==='Vacation'){
			console.log("------------vacation id is---------:" + vacId);
			axios.post(`/iorTrans/vacation/${vacId}`, data)
				.then((response) => {
					console.log(response.data);
					setMesg1(response.data);
					setDisabled(false);
				})
				.catch((error) => {
					setMesg(error.response.data);
					//console.log(error.response.data);
					//	setServerErrors(error.response.data)
				});
		}else if(rentType==='Occupation'){
			
			axios.post("/iorTrans", data)
				.then((response) => {
					console.log(response.data);
					setMesg1(response.data);
					setDisabled(false);
				})
				.catch((error) => {
					setMesg(error.response.data);
					//console.log(error.response.data);
					//	setServerErrors(error.response.data)
				});
		}else if(rentType==='Revision'){
			
			axios.post(`/iorTrans/revision/${vacId}`, data)
				.then((response) => {
					console.log(response.data);
					setMesg1(response.data);
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
			url: "daks",
			searchList: ['id'], //XXXXXXXXX Add search fields
			fkEntity: "dak",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
		employee: {
			title: "Cdao No",
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
		setEmpId(childData.entity.id);
		console.log("&&&&&&&&&---empId---:"+empId);
		//console.log(errors);
		console.log(">>>" + childData.fk);

		clearErrors(childData.fk);
	};
	
	const handleCheck=(e)=> {
		console.log(e.target.value);
		setVacId(e.target.value);


	};


	const errorCallback = (err) => {
		//console.log(err);
		setServerErrors(err);
	}

	const handleInputChange = (e) => {
		//console.log(e.target.value);
	};

	const handleRentType = (e) => {
		console.log("%%%%%%:" + e.target.value);
		setValue("occupationVacationRevision", e.target.value);
		setRentType(e.target.value);

	};


	const handleButtonClick = (e) => {
		history.push("/iorTrans");
	}
	const handleOccVac = (e) => {
		//console.log(e.target.checked);

		setChecked(e.target.checked);
		setValue('occupationVacationRecdSameMonth', e.target.v);


	};
	const updateButtonState = (e) => {
		//console.log("updating button state " + e);

		setButtonState(e);

	};
	const handleManCheck = (e) => {
		console.log(e.target.checked);

		setManChecked(e.target.checked);
		setValue('manuallyChecked', e.target.checked);


	};



	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Initial Occupation Return Transaction Edit </h1>
					{rentType!==null && rentType==='Vacation' && empId && (occData===null ||
					(occData!==null && occData.length===0)) &&
					<div className="text-red-500">{mesg}</div>
					}
					
					<div className="text-red-500">{mesg1}</div>
					
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
								<div>
									<label>Rent Type</label>
									<select
										name="rentType"
										className="form-control py-0"
										{...register("occupationVacationRevision")}
										onChange={handleRentType}
									>
										<option value="select">--Select--</option>
										<option key="1" value="Occupation">
											Occupation
										</option>
										<option key="2" value="Vacation">
											Vacation
										</option>
										<option key="3" value="Revision">
											Revision
										</option>

									</select>
								</div>

								</div>
								<div>
								<div className="grid grid-cols-3 gap-0">
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

								<div>
									<label>Occupation Date</label>
									<input type="date" name="occupationDate" {...register("occupationDate")}
										className="form-control py-0" />
									<div className="text-red-500">{errors.occupationDate?.message}</div>
								</div>

								<div>
									<label>Vacation Date</label>
									<input type="date" name="vacationDate" {...register("vacationDate")}
										className="form-control py-0" />
									<div className="text-red-500">{errors.vacationDate?.message}</div>
								</div>


 								</div>
 								</div>
 								{(usrLevel<30 &&	(rentType==='Vacation' || rentType==='Revision')) &&
						<>
						<h1 class="text-blue-600" align="center">Occupation Details</h1>
						
            <table className="table table-striped table-bordered">
         
   
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>Occupation Id</th>
                        <th>Building No</th>
                        <th>Quarter Area</th>
                        <th>Quarter Type</th>
                        <th>Station</th>
                        <th>Occupation Date</th>
                        <th>Vacation Date</th>
                         <th>Lf Rate</th>
                        <th>Fur Rate</th>
                        <th>Stop Ior Date</th>
                           
                    </tr>
                     {occData && occData.map(tb =>
                        <tr key={tb.occupationVacId}>
                        {rentType==='Vacation' &&
                        <>
                        {tb.vacated===true &&
                        <td>{''}</td>
                        
                        }
                        {tb.vacated===false &&
                           <td><input type="checkbox"  value={tb.occupationVacId}
                           checked={[tb.occupationVacId]['select']} onChange={handleCheck} /></td>
                           }
                           </>
                           }
                            {rentType==='Revision' &&
                        <>
                        
                       
                           <td><input type="checkbox"  value={tb.occupationVacId}
                           checked={[tb.occupationVacId]['select']} onChange={handleCheck} /></td>
                           
                           </>
                           }
                           <td>{tb.occupationVacId}</td>
                            <td>{tb.bldgNo}</td>
                            <td>{tb.quarterArea}</td>
                            <td>{tb.quarterType}</td>
                            <td>{tb.station}</td>
                            <td>{tb.occupationDate && format(new Date(tb.occupationDate.toString()),'dd-MM-yyyy')}</td>
                            <td>{tb.vacationDate && format(new Date(tb.vacationDate.toString()),'dd-MM-yyyy')}</td>
                              <td>{tb.lfRate}</td>
                              <td>{tb.furRate}</td>  
                              <td>{tb.stopIorDate}</td>
                            
                        </tr>
                    )}
                   
                 
                </thead>
				
				<tbody>
                   
                    {occData.length===0 &&
                    <tr>
                            <td colspan="11" align="center">No Occupation Record Found Where Vacation Date is Null----Please Check </td>
                            
                        </tr>
                    }
                </tbody>
				
		 </table>
		 </>
		 }
 								<br/>
								<div className="grid grid-cols-3 gap-0">
								<div>
									<label>LFee From Date</label>
									<input type="date" name="lfeeFromDate" {...register("lfeeFromDate")}
										className="form-control py-0" />
									<div className="text-red-500">{errors.lfeeFromDate?.message}</div>
								</div>

								<div>
									<label>LFee To Date</label>
									<input type="date" name="lfeeToDate" {...register("lfeeToDate")}
										className="form-control py-0" />
									<div className="text-red-500">{errors.lfeeToDate?.message}</div>
								</div>

								<div>
									<label>LFee Amount</label>
									<input type="text" name="lfeeAmount" {...register("lfeeAmount")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.lfeeAmount?.message}</div>
								</div>
								</div>
								<br/>
								<div className="grid grid-cols-3 gap-0">
								<div>
									<label>Furniture From Date</label>
									<input type="date" name="furFromDate" {...register("furFromDate")}
										className="form-control py-0" />
									<div className="text-red-500">{errors.furFromDate?.message}</div>
								</div>

								<div>
									<label>Furniture To Date</label>
									<input type="date" name="furToDate" {...register("furToDate")}
										className="form-control py-0" />
									<div className="text-red-500">{errors.furToDate?.message}</div>
								</div>

								<div>
									<label>Furniture Amount</label>
									<input type="text" name="furAmount" {...register("furAmount")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.furAmount?.message}</div>
								</div>

								<div>
									<label>Excess Furniture From Date</label>
									<input type="date" name="excessFurFromDate" {...register("excessFurFromDate")}
										className="form-control py-0" />
									<div className="text-red-500">{errors.excessFurFromDate?.message}</div>
								</div>

								<div>
									<label>Excess Furniture To Date</label>
									<input type="date" name="excessFurFromDate" {...register("excessFurFromDate")}
										className="form-control py-0" />
									<div className="text-red-500">{errors.excessFurFromDate?.message}</div>
								</div>

								<div>
									<label>Excess Furniture Amount </label>
									<input type="text" name="excessFurAmount" {...register("excessFurAmount")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.excessFurAmount?.message}</div>
								</div>
								 </div>
								 <br/>
								<div className="grid grid-cols-3 gap-0">
								<div>
									<label>Fan From Date</label>
									<input type="date" name="fanFromDate" {...register("fanFromDate")}
										className="form-control py-0" />
									<div className="text-red-500">{errors.excessFurFromDate?.message}</div>
								</div>

								<div>
									<label>Fan To Date</label>
									<input type="date" name="fanToDate" {...register("fanToDate")}
										className="form-control py-0" />
									<div className="text-red-500">{errors.fanToDate?.message}</div>
								</div>

								<div>
									<label>Fan Amount </label>
									<input type="text" name="fanAmount" {...register("fanAmount")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.fanAmount?.message}</div>
								</div>
								 
								<div>
									<label>Fridge From Date</label>
									<input type="date" name="fridgeFromDate" {...register("fridgeFromDate")}
										className="form-control py-0" />
									<div className="text-red-500">{errors.fridgeFromDate?.message}</div>
								</div>

								<div>
									<label>Fridge To Date</label>
									<input type="date" name="fridgeToDate" {...register("fridgeToDate")}
										className="form-control py-0" />
									<div className="text-red-500">{errors.fridgeToDate?.message}</div>
								</div>

								<div>
									<label>Fridge Amount </label>
									<input type="text" name="fridgeAmount" {...register("fridgeAmount")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.fridgeAmount?.message}</div>
								</div>
								 
								<div>
									<label>Water Amount </label>
									<input type="text" name="waterAmount" {...register("waterAmount")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.waterAmount?.message}</div>
								</div>
								<div>
									<label>Power Amount </label>
									<input type="text" name="powerAmount" {...register("powerAmount")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.powerAmount?.message}</div>
								</div>
								<div>
									<label>Light Amount </label>
									<input type="text" name="lightAmount" {...register("lightAmount")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.lightAmount?.message}</div>
								</div>
								<div>
									<label>Servant Quarter Amount </label>
									<input type="text" name="servantQrAmount" {...register("servantQrAmount")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.servantQrAmount?.message}</div>
								</div>
								<div>
									<label>Garage Amount </label>
									<input type="text" name="garageAmount" {...register("garageAmount")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.garageAmount?.message}</div>
								</div>
								 </div>
								 <br/>
								<div className="grid grid-cols-4 gap-0">

								<div>
									<label>Rent Amount Credit </label>
									<input type="text" className="text-red-500" name="rentAmountCr" {...register("rentAmountCr")}

									/>
									<div className="text-red-500">{errors.rentAmountCr?.message}</div>
								</div>
								<div>
									<label>Furniture Amount Credit </label>
									<input type="text" className="text-red-500" name="furAmountCr" {...register("furAmountCr")}

									/>
									<div className="text-red-500">{errors.furAmountCr?.message}</div>
								</div>
								<div>
									<label>Rent Amount Debit </label>
									<input type="text" className="text-red-500" name="rentAmountTotal" {...register("rentAmountTotal")}

									/>
									<div className="text-red-500">{errors.rentAmountTotal?.message}</div>
								</div>
								<div>
									<label>Furniture Amount Debit </label>
									<input type="text" className="text-red-500" name="furAmountTotal" {...register("furAmountTotal")}

									/>
									<div className="text-red-500">{errors.furAmountTotal?.message}</div>
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
								
								<div className="grid grid-cols-2 gap-0">
								<div>
								
								{ 
									<div>
										<label>Is Occupation Vacation received for same building together</label>
										<input type="checkbox" name="occ" onChange={handleOccVac} checked={checked} onClick={() => updateButtonState('occ')} />
									</div>
								}
								</div>
								 
								</div>
								<div className="grid grid-cols-2 gap-0">

								
								</div>

								<div className="grid grid-cols-3 gap-0">
								{console.log("occData--:" + occData.length)}
								{((rentType!==null && rentType==='Vacation' && occData!==null && occData.length>0) 
								|| (rentType!==null && (rentType==='Occupation' || rentType==='Revision')))&&
								<div className="px-2">
									<button type="submit" disabled={buttonDisabled} >Save</button>
								</div>
								}

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

export default withRouter(IorTransEdit);