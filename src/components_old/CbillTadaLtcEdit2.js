/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By : 
 */

import { useState, useEffect, useMemo } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import * as yup from "yup";

import { yupResolver } from '@hookform/resolvers/yup';
import LiveSearch from '../utils/LiveSearch';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from '../utils/Table';

const schema = yup.object({
	dak: yup.object().required('Required'),
	//    billType: yup.object().required('Required'),
	section: yup.object().required('Required'),
	employee: yup.object().required('Required'),
	//cdaNo: yup.string().required('Required'),
	//checkDigit: yup.string().required('Required'),
	//    claimType: yup.string().required('Required'),
	//  claimDate: yup.string().required('Required'),
	//    monthEnding: yup.string().required('Required'),
	//    journeyStationFrom: yup.string().required('Required'),
	//    journeyStationTo: yup.string().required('Required'),
	//     modeOfJourney: yup.string().required('Required'),
	//    blockYear: yup.string().required('Required'),
	amountClaimed: yup.number().required('Required'),
	//     amountPassed: yup.number().integer().required('Required'),
	//    advanceAmount: yup.number().integer().required('Required'),
	//      amountDisallowed: yup.number().integer().required('Required'),
	//   penalInterest: yup.number().integer().required('Required'),
	//   adjustmentAmount: yup.number().integer().required('Required'),
	//    finalAdjustment: yup.object().required('Required'),
	//   approved: yup.boolean().required('Required'),
	//   recordStatus: yup.string().required('Required'),
	//   reason: yup.string().required('Required'),
	//   unit: yup.object().required('Required'),
	//    foreignTravel: yup.boolean().required('Required'),
	//    recoveries: yup.number().integer().required('Required'),
	//    periodFrom: yup.string().required('Required'),
	//   periodTo: yup.string().required('Required'),
	//    noOfDays: yup.number().integer().required('Required'),
	//     typeOfLtc: yup.string().required('Required'),
	//    verifiedAuditChecks: yup.boolean().required('Required'),
	//	   codeHead: yup.string().required('Required'),
	//   provisionalPayment: yup.boolean().required('Required'),
	//    classOfTravel: yup.string().required('Required'),
	//    journeyStartDate: yup.string().required('Required'),
	//     journeyEndDate: yup.string().required('Required'),
	//   travellingCharges: yup.number().integer().required('Required'),
	//     paymentMode: yup.object().required('Required'),
	//     cdr: yup.object().required('Required'),
	//     paymentRecordType: yup.string().required('Required'),
	//    foreignTadaAmount: yup.number().integer().required('Required'),
	//    mroAmount: yup.number().integer().required('Required'),
	//     mroDakId: yup.string().required('Required'),
	//     movementOrderNo: yup.string().required('Required'),
	//    movementOrderDate: yup.string().required('Required'),
	//    otherAmount: yup.number().integer().required('Required'),
	//   bankAccount: yup.object().required('Required'),
	//     htBlockYear: yup.string().required('Required'),
	//    cvInLieuOfLtc: yup.boolean().required('Required'),
	//    noOfMembers: yup.number().integer().required('Required'),
	//    empCategory: yup.string().required('Required'),
	//    roundTripFarePerPerson: yup.number().integer().required('Required'),
	//    totalFare: yup.number().integer().required('Required'),
	//    leaveEncashAmount: yup.number().integer().required('Required'),
	//      totalValue: yup.number().integer().required('Required'),
	//    auditorDate: yup.string().required('Required'),
	//    aaoDate: yup.string().required('Required'),
	//     aoDate: yup.string().required('Required'),
	//     dvNo: yup.number().integer().required('Required'),
	//     dvMonth: yup.string().required('Required'),
	//    dpSheetNo: yup.number().integer().required('Required'),
	//     dpSheetDate: yup.string().required('Required'),
	//     cmpBatch: yup.string().required('Required'),
	//   cmpFileNo: yup.string().required('Required'),
	//     cmpDate: yup.string().required('Required'),
});


const CbillTadaLtcEdit = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [key, setKey] = useState('page1');


	const [claimDate, setClaimDate] = useState();
	const [periodFrom, setPeriodFrom] = useState(new Date());
	const [periodTo, setPeriodTo] = useState(new Date());
	const [journeyStartDate, setJourneyStartDate] = useState();
	const [journeyEndDate, setJourneyEndDate] = useState();
	const [movementOrderDate, setMovementOrderDate] = useState();
	const [auditorDate, setAuditorDate] = useState(new Date());
	const [aaoDate, setAaoDate] = useState(new Date());
	const [aoDate, setAoDate] = useState(new Date());
	const [dpSheetDate, setDpSheetDate] = useState(new Date());
	const [cmpDate, setCmpDate] = useState(new Date());
	const [rankName, setRankName] = useState();
	const [cdaoNo, setCdaoNo] = useState('');
	const [buttonState, setButtonState] = useState(1);
	const [disallowanceData, setDisallowanceData] = useState([]);
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [dakId, setDakId] = useState();
	const [billTypeName, setBillTypeName] = useState('');
	const [monthEnding, setMonthEnding] = useState();
	//const [blockYear, setBlockYear]=useState();
	const [familyData, setFamilyData] = useState([]);
	const [fdData, setFdData] = useState([]);
	const [demandData, setDemandData] = useState([]);
	const [drData, setDrData] = useState([]);
	const [mroData, setMroData] = useState([]);
	const [mData, setMData] = useState([]);
	const [cbillDetailData, setCbillDetailData] = useState([]);
	const [cbdData, setCbdData] = useState([]);
	const [fdList, setFdList] = useState([]);
	const [dList, setDList] = useState([]);
	const [oList, setMList] = useState([]);
	const [bankDetails, setBankDetails] = useState();
	const [modeOfJourney, setModeOfJourney] = useState();
	const [calendarYear, setCalendarYear] = useState();
	const [empId, setEmpId] = useState();
	const [cbillId, setCbillId] = useState();
	const [ifsc, setIfsc] = useState();
	const [account, setAccount] = useState();
	const [blockYear, setBlockYear] = useState();
	const [checkedState, setCheckedState] = useState(new Array(fdData.length).fill(false));
	const [mesg,setMesg]=useState('');
	const [amountDisallowed, setAmountDisallowed] = useState();
	const [amountPassed, setAmountPassed] = useState();
	const [advanceAmount, setAdvanceAmount] = useState();
	const [dakTypeId,setDakTypeId]=useState('');
	const [billTypeData,setBillTypeData]=useState([]);
	const [billTypeItems,setBillTypeItems]=useState([]);
	const [billTypeItem,setBillTypeItem]=useState('');
	//const [claimType, setClaimType] = useState();


	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get('/cbillTadaLtcs/' + id)
					.then((response) => {
						record = response.data;
						console.log(">>>>>>>:" + record.monthEnding);
						console.log(">>>>>>>:" + record.claimType);

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
				 
				setDakId(record.dak.dakidNo);
				setMonthEnding(record.monthEnding);
				 
				setCdaoNo(record.employee.cdaoNo);
				setRankName(record.employee.rank.rankName);
				setEmpId(record.employee.id);
				setDakTypeId(record.dak.dakType.id);
				
				 
				 
			//	if (record.billType && record.billType.description.includes('LTC'))
			//		setBillType('LTC');
					
			//	if (record.billType && record.billType.description.includes('Temp'))
			//		setBillType('Temp');	
				
			//	if (record.billType && record.billType.description.includes('Permt'))
			//		setBillType('Permt');
					
			//	if (record.billType && record.billType.description.includes('Final'))
			//		setBillType('Final');
			//	console.log("billType " + record.billType.description);
				
				const fields = [
					'id', 'dak', 'billType', 'section', 'employee', 'cdaNo', 'checkDigit',
					'claimType', 'claimDate', 'monthEnding', 'journeyStationFrom', 'journeyStationTo',
					'modeOfJourney', 'blockYear', 'amountClaimed', 'amountPassed', 'advanceAmount',
					'amountDisallowed', 'penalInterest', 'adjustmentAmount', 'finalAdjustment',
					'approved', 'recordStatus', 'reason', 'unit', 'foreignTravel', 'recoveries',
					'periodFrom', 'periodTo', 'noOfDays', 'typeOfLtc', 'verifiedAuditChecks', 'codeHead',
					'provisionalPayment', 'classOfTravel', 'journeyStartDate', 'journeyEndDate',
					'travellingCharges', 'paymentMode', 'cdr', 'paymentRecordType', 'foreignTadaAmount',
					'mroAmount', 'mroDakId', 'movementOrderNo', 'movementOrderDate', 'otherAmount',
					'bankAccount', 'htBlockYear', 'cvInLieuOfLtc', 'noOfMembers', 'empCategory',
					'roundTripFarePerPerson', 'totalFare', 'leaveEncashAmount', 'totalValue', 'auditorDate',
					'aaoDate', 'aoDate', 'dvNo', 'calendarYear','dvMonth', 'dpSheetNo', 'dpSheetDate',
					'cmpBatch', 'cmpFileNo', 'cmpDate', 'fdList','dList','oList','noOfDays','foodCharges','lodgingCharges',
					'distance','compositeTransferGrant','baggageQuantity','baggageAmount','conveyanceAmount','conveyanceType'
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
		async function fetchData() {
			console.log("loading dis " + dakId);
			if (dakId)
				if (!fetching)
					await axios.get(`/disallowanceCodes/dak/` + dakId)
						.then((response) => {
							//	console.log("disallowance data >>>> "+response.data);
							setDisallowanceData(response.data);
							if (!unmounted) {
								setItems(
									response.data.map(({ id, disallowanceName, disallowanceAmt }) => ({ id: id, label: disallowanceName, value: disallowanceAmt }))
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
		fetchData();
		for (var k in disallowanceData) {


			//	console.log("<<<"+disallowanceData[k].id+"--"+disallowanceData[k].disallowanceName+"--"+disallowanceData[k].disallowanceAmt);
		}
		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dakId, setDakId]);

	useEffect(() => {
		let fetching = false;
		let unmounted = false;
		async function fetchFdData() {


			if (!fetching && !unmounted)
				console.log("=======CDA O No fetch fd data :" + id);
			await axios.get(`/employees/${empId}/cbilltadaltcs/${id}`)
				.then((response) => {
					console.log("==========Family Details====:" + response.data);
					setFamilyData(response.data);
					console.log(response.data);
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
		if(entity.employee && entity.billType && entity.billType.description.includes('LTC'))
			fetchFdData();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [entity.employee, entity.billType]);

	useEffect(() => {
		let fetching = false;
		let unmounted = false;
		async function fetchDrData() {
			console.log("=======CDA O No for Demand Register :" + cdaoNo);

			if (!fetching && cdaoNo.length > 2)
				await axios.get(`/employees/${empId}/demandRegisters/`)
					.then((response) => {
						console.log("==========Demand Register Details====:" + response.data);
						setDemandData(response.data);
						if (!unmounted) {
							setDrData(
								response.data.map(({ id, employee, billType, demandAmount, select }) => ({ id: id, label: employee.cdaoNo, value: billType, amt: demandAmount, select: select }))
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
		fetchDrData();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [empId, setEmpId]);

useEffect(() => {
		let fetching = false;
		let unmounted = false;
		console.log("daktype");
		async function fetchBillType() {
			console.log(dakTypeId);
			if (!fetching && id > 0)
				 
				await axios.get(`/cbillTadaLtcs/${id}/billTypes`)
					.then((response) => {
						console.log("response>>" + response.data);
						setBillTypeData(response.data);
						if (!unmounted) {
							setBillTypeItems(
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
		fetchBillType();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	useEffect(() => {
		let fetching = false;
		let unmounted = false;
		async function fetchMData() {

			if (!fetching && cdaoNo.length > 2)
				await axios.get(`/employees/${empId}/omros`)
					.then((response) => {
						console.log("==========OMRO Details====:" + response.data);
						setMroData(response.data);
						if (!unmounted) {
							setMData(
								response.data.map(({ id, employee, minNo, amount, mroDate }) => ({ id: id, label: employee.cdaoNo, value: minNo, amt: amount, date: mroDate }))
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
		fetchMData();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [empId, setEmpId]);

	 

	useEffect(() => {
		let fetching = false;
		let unmounted = false;
		async function fetchBankDetailsData() {

			if (!fetching && cdaoNo.length > 2)
				await axios.get(`/employees/${empId}/bankDetails`)
					.then((response) => {
						console.log("==========Bank Details====:" + response.data);
						setBankDetails(response.data);
						setAccount(response.data['bankAccountClearText']);
						setIfsc(response.data['ifsc']);
						if (!unmounted) {
							setBankDetails(
								response.data.map(({ cdaoNo, bankAccountNo, ifsc }) => ({ label: cdaoNo, value: bankAccountNo, ifsc: ifsc }))
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
		fetchBankDetailsData();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [empId, setEmpId]);

	const onSubmit = (data, event,) => {
		event.preventDefault();
		console.log(data);
		if (data.id) {
			if(buttonState===1){
			axios.put("/cbillTadaLtcs/empDetails/" + data.id, data)
				.then((response) => { 
					console.log("---DATA---:" +  response.data);
					setMesg(response.data);
				//	if(mesg.startsWith('Emp'))
				//	history.push("/cbillTadaLtcs/journeyDetails/");
									})
				.catch((error) => {
					//console.log(error.response.data);
					console.log("response--------"+error.response.status);
				//	if(error.response.status===200)
				//		history.push("/cbillTadaLtcs/journeyDetails/");
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
			//	if(mesg.startsWith('Emp'))
				//	history.push("/cbillTadaLtcs/journeyDetails/" + data.id, data);
		}
		
		if(buttonState===2){
			console.log(">>>"+fdList);
			
			console.log(">>>222"+fdList);
			axios.put("/cbillTadaLtcs/journeyDetails/" + data.id,data)
				.then((response) => { 
					console.log(response.data);
					setMesg(response.data);
				})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
			}
		if(buttonState===3){
			console.log(">>>"+fdList);
			
			console.log(">>>222"+fdList);
			axios.put("/cbillTadaLtcs/claims/" + data.id,data)
				.then((response) => { 
					console.log(response.data);
					setMesg(response.data);
				})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
			}	
			if(buttonState===4){
			axios.put("/cbillTadaLtcs/disallowance/" + data.id, disallowanceData)
				.then((response) => { 
					console.log(response.data);
					setMesg(response.data);
				})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
			}
			
			if(buttonState===5){
			axios.put("/cbillTadaLtcs/demands/" + data.id, data)
				.then((response) => { 
					console.log(response.data[0]);
					console.log(response.data[1]);
					setMesg(response.data[0]);
					setValue('advanceAmount',response.data[1]);
				})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
			}
			
			if(buttonState===6){
			axios.put("/cbillTadaLtcs/paymentDetails/" + data.id, data)
				.then((response) => { 
					console.log(response.data);
					setMesg(response.data);
				})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
			}
			
			if(buttonState===7){
			axios.put("/cbillTadaLtcs/generatePmCs/" + data.id, data)
				.then((response) => { 
					console.log(response.data);
					setMesg(response.data);
				})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
			}
		}else {
			axios.post("/cbillTadaLtcs/", data)
				.then((response) => { })
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		}

		//history.push("/cbillTadaLtcs");
	}

	const setAccountNo = (e) => {
		setCdaoNo(e.target.value);
	}
	const viewRankName = () => {

		console.log("--------" + cdaoNo);
		axios.get("/cbillTadaLtcs/rankname/" + cdaoNo)
			.then((response) => {
				if (response.status === 200) {
					setRankName(response.data);
				}
			})
	}
	const onError = (errors, e) => console.log(errors, e);

	//All foreign keys. 
	// XXXXXX Add search fields and adjust the values as necessary
	const parentData = {


		billType: {
			title: "Bill Type",
			url: "billTypes",
			searchList: ['description'], //XXXXXXXXX Add search fields
			fkEntity: "billType",
			preload: false, //XXXXXX Set this to true for small tables like designations
			field:"dakType",
		},

		employee: {
			title: "Employee",
			url: "employees",
			searchList: ['cdaoNo', 'checkDigit', 'officerName'], //XXXXXXXXX Add search fields
			fkEntity: "employee",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
		finalAdjustment: {
			title: "Final Adjustment",
			url: "finalAdjustments",
			searchList: ['id'], //XXXXXXXXX Add search fields
			fkEntity: "finalAdjustment",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
		unit: {
			title: "Unit",
			url: "units",
			searchList: ['id'], //XXXXXXXXX Add search fields
			fkEntity: "unit",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
		paymentMode: {
			title: "Payment Mode",
			url: "paymentModes",
			searchList: ['id'], //XXXXXXXXX Add search fields
			fkEntity: "paymentMode",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
		cdr: {
			title: "Cdr",
			url: "cdrs",
			searchList: ['id'], //XXXXXXXXX Add search fields
			fkEntity: "cdr",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
		bankAccount: {
			title: "Bank Account",
			url: "bankAccounts",
			searchList: ['bankAccountNo,ifsc'], //XXXXXXXXX Add search fields
			fkEntity: "bankAccount",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},

	}

	const updateList = (e, index) => {
		console.log("updating list---------------" + e.target.value + "--" + index + "--");


		for (var k in disallowanceData) {
			if (disallowanceData[k].id === index)
				disallowanceData[k].disallowanceAmt = e.target.value;

			console.log(">>>" + disallowanceData[k].id + "--" + disallowanceData[k].disallowanceName + "--" + disallowanceData[k].disallowanceAmt);
		}

	};



	const updateButtonState = (e) => {
		console.log("updating button state " + e);
		setButtonState(e);
	};
	//Callback for child components (Foreign Keys)
	const callback = (childData) => {
		
		//setEntity(prev => ({ ...prev, [childData.fk]: childData.entity }));
		setValue(childData.fk, childData.entity);
		if (childData.fk === 'employee') {
			console.log("parent callback-----------" + childData.entity.rank.rankName);
			setRankName(childData.entity.rank.rankName)
		}
		
	//	if(childData.fk==='billType'){
	//		if(childData.entity.description.includes('LTC'))
	//		setBillType(billType.description);
	//	}
		//console.log(errors);
		clearErrors(childData.fk);
	};


	const errorCallback = (err) => {
		//console.log(err);
		setServerErrors(err);
	}

	const handleInputChange = (e) => {
		//console.log(e.target.value);onClick={handleFdChange}/></td>
	};
	 
 

	const ShowFamily = () => {
		console.log(familyData);
		
	const handleCheckbox = index => (e) => {
		
		//console.log(checkedObj);
		console.log(index + e.target.value);

		//let key = index;
		let item = familyData[index];
		let val = item['select'];
		if (val === "on" || val === true) {
			val = false;
		} else {
			val = true;
		}

		item['select'] = val;
		let newData = [...familyData];
		newData[index] = item;
		setFamilyData(newData);
		setValue('fdList',familyData);
		
		console.log(">>>>>>>>>>>>>>:" + familyData);		
	}		
		
	const columns = useMemo(() => [

		{
			Header: 'Select',
			accessor: 'updated',
			Cell: ({ row }) => (
				<div>
					<input type="checkbox" onChange={handleCheckbox(row.index)} checked={familyData[row.index]['select']} />
				&nbsp;&nbsp; {familyData[row.index]['select'] === true ? 'Y' : 'N'}
				</div>
			)
		},

		{
			Header: "CDAO No",
			accessor: 'cdaoNo',
		},

		{
			Header: "Family Member",
			accessor: 'nameOfFamilyMember',// Change this
		},
		
		{
			Header: "DOB",
			accessor: 'dob',// Change this
		},		
	], [familyData])


	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">
				<div className=" ">
				</div>
				<div className="-mt-2 max-h-0 py-0 ml-0">
					<Table columns={columns} data={familyData} className="table-auto" />
				</div>
			</main>

		</div>
	);
		
	}
 
	const handleJourneyDateChange = (e) => {
		console.log("journey date onc hange " + e.target.value);
		setJourneyStartDate(e.target.value);
		setValue('journeyStartDate', e.target.value);


	};
	
	 const handleDisallowanceDataChange = (e) => {
		setJourneyStartDate(e.target.value);
		setValue('amountDisallowed', e.target.value);


	};
	
	const handleAmountPassedChange = (e) => {
		setAmountPassed(e.target.value);
		setValue('amountPassed', e.target.value);


	};
	const handleBlockYearChange = (e) => {
		setBlockYear(e.target.value);
		setValue('blockYear', e.target.value);


	};
	
	const handleInputDrChange =(e,id) => {
		setValue('dList',demandData);
	}
	
	const handleInputMroChange =(e,id) => {
		setValue('oList',mroData);
	}
	
	const returnToList =() => {
		history.push("/cbillTadaLtcs");
	}
	 
	const handleBillTypeChange = (e) => {
		console.log(">>>" + e.target.value+"index "+e.target.index+"--"+e.target.selectedIndex);
		console.log(billTypeData[e.target.selectedIndex-1].description);
		 	
		setBillTypeItem(e.target.value);
		setValue('billType', billTypeData[e.target.selectedIndex-1]);
		 setBillTypeName(billTypeData[e.target.selectedIndex-1].description)
		 console.log(billTypeName);
			 
	     	 
	     	if(billTypeItem.toLowerCase().includes('ltc')){
				setBillTypeName('LTC');
			}else if(billTypeItem.toLowerCase().includes('temp')){	
				setBillTypeName('Temp');
			}else if(billTypeItem.toLowerCase().includes('perm')){	
				setBillTypeName('Permt');	
			}else if(billTypeItem.toLowerCase().includes('final')){	
				setBillTypeName('Final');	
				}		
			
		console.log("bill type "+billTypeName);
	

	};
	const handleInputLtcChange = (e) => {
		console.log(e.target.value);
		console.log(entity.typeOfLtc);
		console.log(">>>>>>>>-Type of LTC>>>>:"+ e.target.value);
		//setTypeOfLtc(e.target.value);
		setValue('typeOfLtc', e.target.value);
	//	setValue('dakType', dakTypeData[e.target.selectedIndex])
	};

	const handleInputModeJourneyChange = (e) => {
		console.log(e.target.value);
		setValue('modeOfJourney', e.target.value);
	//	setValue('dakType', dakTypeData[e.target.selectedIndex])
	};
	 
	return (
		<div className="max-w-2xl mx-auto ">
			<div className="w-full w-4/4  mx-auto " >

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Cbill Tada Ltc </h1>
					<div className="text-red-500">{serverErrors}</div>
					<div className="text-blue-500">{mesg}</div>
					<Tabs
						id="CbillTadaLtcEdit"
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className="mb-3"
					>
						<Tab eventKey="page1" title="Emp" className="h-300">
							<div className="grid grid-cols-2 gap-0">

								<div>
									<label>Month Ending</label>
									{monthEnding}
								</div>

								<div >
									<label>DakId</label> {dakId}
								</div>

								<div >
									<LiveSearch name="employee" onChange={handleInputChange}
										parentData={parentData.employee} parentCallback={callback}
										fkEntity={entity.employee} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.employee?.message}</div>
								</div>





								<div>
									<label>Rank Name</label>
									{rankName}
								</div>
								
								<div style={{ width: 300, marginBottom: 20 }}>
							<b>Bill Type</b>
							
							<select className="form-control py-0"
								disabled={loading}
								value={billTypeItem}
								onChange={handleBillTypeChange}>
								<option key="default" value="" label="--select--"/>
								{billTypeItems.map((item,index) => (
									<option key={index} value={item.value}> {item.label} </option>
								))}
							</select>
						</div>

								 



								<div>
									<label>Amount Claimed</label>
									<input type="text" name="amountClaimed" {...register("amountClaimed")}readOnly
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.amountClaimed?.message}</div>
								</div>


								<div>
									<label>Journey Start Date</label>
									<input type="date" name="journeyStartDate" {...register("journeyStartDate")}
										className="form-control py-0" onChange={handleJourneyDateChange}
									/>
									<div className="text-red-500">{errors.journeyStartDate?.message}</div>
								</div>
								 

								{
								 
								(billTypeName==='ltc') &&
								<>
										<div>
									<label> Type of LTC</label>
      								<select name="typeOfLtc" className="form-control py-0" onChange={handleInputLtcChange} {...register("typeOfLtc")}>
      								<option value="select">--Select--</option>
										<option key="1" value="AI"  >All India LTC</option>
										<option key="2" value="HT" >Home Town LTC</option>
										<option key="3" value="NE" >North Eastern LTC</option>
										<option key="4" value="JK">Jammu and Kashmir LTC</option>
										<option key="5" value="AN" >Andaman and Nicobar LTC</option>
							</select>
						
							</div>
										<div>
											<label>Block Year(LTC)</label>
											<input type="text" name="blockYear" {...register("blockYear")}
												className="form-control py-0" onChange={handleBlockYearChange}
											/>
											<div className="text-red-500">{errors.blockYear?.message}</div>
										</div>
										<div>
											<label>Home Town Block Year(LTC)</label>
											<input type="text" name="htBlockYear" {...register("htBlockYear")}
												className="form-control py-0"
											/>
											<div className="text-red-500">{errors.htBlockYear?.message}</div>
										</div>
										<div>
											<label>Calendar Year(LTC)</label>
											<input type="text" name="calendarYear" {...register("calendarYear")}
												className="form-control py-0"
											/>
											<div className="text-red-500">{errors.calendarYear?.message}</div>
										</div>
									</>
								}
								<div>
									<label>Code Head</label>
									<input type="text" name="codeHead" {...register("codeHead")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.codeHead?.message}</div>
								</div>

								<div>
									<label>Record Status</label>
									<input type="text" name="recordStatus" {...register("recordStatus")} readOnly
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.recordStatus?.message}</div>
								</div>

							</div>
							<div className="grid grid-cols-3 gap-0">
								<div className="px-3 ...">
									<button type="submit" name="submit1" onClick={() => updateButtonState(1)}>Save Emp Details</button>
								</div>
								<div className="px-3 ...">
									<button type="submit" >Return/Reject</button>
								</div>
								<div className="px-3 ...">
									<button type="button" onClick={returnToList}>Cancel</button>
								</div>
							</div>
						</Tab>


						<Tab eventKey="page2" title="Journey" className="h-120">
							<div className="grid grid-cols-2 gap-4">


								<div>
									<label>Movement Order No</label>
									<input type="text" name="movementOrderNo" {...register("movementOrderNo")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.movementOrderNo?.message}</div>
								</div>
								<div>
									<label>Movement Order Date</label>
									<input type="date" name="movementOrderDate" {...register("movementOrderDate")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.movementOrderDate?.message}</div>
								</div>

								<div>
									<label>Claim Date</label>
									<input type="date" name="claimDate" {...register("claimDate")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.claimDate?.message}</div>
								</div>

								<div>
									<label>Journey Station From</label>
									<input type="text" name="journeyStationFrom" {...register("journeyStationFrom")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.journeyStationFrom?.message}</div>
								</div>


								<div>
									<label>Journey Station To</label>
									<input type="text" name="journeyStationTo" {...register("journeyStationTo")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.journeyStationTo?.message}</div>
								</div>


								<div>
									<label> Mode of Journey</label>
										<select name="modeOfJourney" className="form-control py-0" onChange={handleInputModeJourneyChange} {...register("modeOfJourney")}>
											<option value="select">--Select--</option>
											<option key="1" value="train">Train</option>
											<option key="2" value="air">Air</option>
											<option key="3" value="bus">Bus</option>
											<option key="4" value="streamer">Streamer</option>

										</select>
									
								</div>

								<div>
									<label>Journey Start Date</label>
									<input type="date" name="journeyStartDate" {...register("journeyStartDate")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.journeyStartDate?.message}</div>
								</div>

								<div>
									<label>Journey End Date</label>
									<input type="date" name="journeyEndDate" {...register("journeyEndDate")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.journeyEndDate?.message}</div>
								</div>
								<div>
									<label>Block Year(LTC)</label>
									<input type="text" name="blockYear" {...register("blockYear")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.blockYear?.message}</div>
								</div>
								<div>
									<label>Record Status</label>
									<input type="text" name="recordStatus" {...register("recordStatus")} readOnly
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.recordStatus?.message}</div>
								</div>
							</div>

							{
								(billTypeName==='ltc') &&
								<>
									<div>
										< ShowFamily />
									</div>
								</>

							}
							<div className="grid grid-cols-3 gap-0">
								<div className="px-3 ...">
									<button type="submit" name="submit2" onClick={() => updateButtonState(2)}>Save Journey Details</button>
								</div>
								<div className="px-3 ...">
									<button type="submit" >Previous-Emp Details</button>
								</div>

								<div className="px-3 ...">
									<button type="button" onClick={returnToList}>Cancel</button>
								</div>
							</div>
						</Tab>
 						
 						<Tab eventKey="page3" title="Claim" className="h-120">
							<div className="grid grid-cols-2 gap-4">
								
								<div>
									<label>Month Ending</label>
									{monthEnding}
								</div>
								
								<div >
									<label>DakId</label> {dakId}
								</div>				

								<div>
									<label>Fare</label>
									<input type="text" name="totalFare" {...register("totalFare")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.totalFare?.message}</div>
								</div>
							 {
								(billTypeName==='temp') &&
								<>
								<div>
									<label>Number of TD Days</label>
									<input type="text" name="noOfDays" {...register("noOfDays")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.noOfDays?.message}</div>
								</div>

								<div>
									<label>Food Charges</label>
									<input type="text" name="foodCharges" {...register("foodCharges")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.foodCharges?.message}</div>
								</div>

								<div>
									<label>Lodging Charges</label>
									<input type="text" name="lodgingCharges" {...register("lodgingCharges")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.lodgingCharges?.message}</div>
								</div>
							 </>
							 }
							 
							  {
								(billTypeName==='perm') &&
								<>
								<div>
									<label>Distance</label>
									<input type="text" name="distance" {...register("distance")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.distance?.message}</div>
								</div>

								<div>
									<label>Number of Travelling Members</label>
									<input type="text" name="noOfMembers" {...register("noOfMembers")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.noOfMembers?.message}</div>
								</div>
								 
								<div>
									<label>CTG </label>
									<input type="text" name="compositeTransferGrant" {...register("compositeTransferGrant")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.compositeTransferGrant?.message}</div>
								</div>
								 
								<div>
									<label>Baggage Quantity</label>
									<input type="text" name="baggageQuantity" {...register("baggageQuantity")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.baggageQuantity?.message}</div>
								</div>
							<div>
									<label>Baggage Amount</label>
									<input type="text" name="baggageAmount" {...register("baggageAmount")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.baggageAmount?.message}</div>
								</div>
								
								<div>
									<label>Conveyance Type</label>
									<input type="text" name="conveyanceType" {...register("conveyanceType")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.conveyanceType?.message}</div>
								</div>
							
							<div>
									<label>Conveyance Amount</label>
									<input type="text" name="conveyanceAmount" {...register("conveyanceAmount")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.conveyanceAmount?.message}</div>
								</div>
								
								</>
								}
							 
							 </div>
							<div className="grid grid-cols-3 gap-0">
								<div className="px-3 ...">
									<button type="submit" name="submit3" onClick={() => updateButtonState(3)}>Save Claim Details</button>
								</div>
								<div className="px-3 ...">
									<button type="submit" >Previous-Emp Details</button>
								</div>

								<div className="px-3 ...">
									<button type="button" onClick={returnToList}>Cancel</button>
								</div>
							</div>
						</Tab>
						
						<Tab eventKey="page4" title="Disallw" className="h-120">
							<div className="container">
								<h3 className="p-3 text-center">Disallowance for Dak Id {dakId}</h3>
								<table className="table table-striped table-bordered">
									<tbody>
										{items.map(it =>
											<tr key={it.id}>
												<td>{it.label}</td>
												<td><input className="ml10" value={it.value} onChange={(e) => updateList(e, it.id)} /></td>
											</tr>

										)}




									</tbody>
								</table>
							</div>
							<div className="grid grid-cols-3 gap-0">
								<div className="px-3 ...">
									<button type="submit" name="submit4" onClick={() => updateButtonState(4)} >Update Disallowance</button>
								</div>
								<div className="px-3 ...">
									<button type="submit" >Previous-Journey Details</button>
								</div>
								<div className="px-3 ...">
									<button type="button" onClick={returnToList}>Cancel</button>
								</div>
							</div>
						</Tab>
					 {(billTypeName==='final') &&
						<Tab eventKey="page5" title="Demands" className="h-120">
							<div className="grid grid-cols-2 gap-4">


								<div >
									<label>DakId</label> {dakId}
								</div>


								<div>
									<label>Record Status</label>
									<input type="text" name="recordStatus" {...register("recordStatus")} readOnly
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.recordStatus?.message}</div>
								</div>
							</div>
							<div className="container">
								<h3 className="p-3  text-2xl font-bold">Demand Register Details</h3>
								<table className="table table-striped table-bordered">
									<thead>
										<th>Action</th>
										<th>CDAONo</th>
										<th>Advance Type</th>
										<th>Amount</th>
									</thead>
									<tbody>
										{drData.map(it =>
											<tr key={it.id}>
												<td> <input type="checkbox" onClick={(e) => handleInputDrChange(e,id)}/></td>
												<td>{it.label}</td>
												<td>{it.value}</td>
												<td>{it.amt}</td>
											</tr>

										)}




									</tbody>
								</table>
							</div>

							<div className="container">
								<h3 className="p-3  text-2xl font-bold">OMRO Details</h3>
								<table className="table table-striped table-bordered">
									<thead>
										<th>Action</th>
										<th>CDAONo</th>
										<th>Min_No</th>
										<th>Amount</th>
										<th>MRO Date</th>
									</thead>
									<tbody>
										{mData.map(it =>
											<tr key={it.id}>
												<td> <input type="checkbox" onClick={(e) => handleInputMroChange(e,id)}/></td>
												<td>{it.label}</td>
												<td>{it.value}</td>
												<td>{it.amt}</td>
												<td>{it.date}</td>

											</tr>

										)}




									</tbody>
								</table>
							</div>
							<div className="grid grid-cols-3 gap-0">
								<div className="px-3 ...">
									<button type="submit" name="submit5" onClick={() => updateButtonState(5)}>Update DemandRegister/MRO</button>
								</div>
								<div className="px-3 ...">
									<button type="submit" >Previous-Disallowance</button>
								</div>
								<div className="px-3 ...">
									<button type="button" onClick={returnToList}>Cancel</button>
								</div>
							</div>
						</Tab>
						 }
						<Tab eventKey="page6" title="Payment" className="h-120">
							<div className="grid grid-cols-2 gap-4">

								<div>
									<label>Month Ending</label>
									{monthEnding}
								</div>

								<div >
									<label>DakId</label> {dakId}
								</div>

								<div>
									<label>Bank Details</label>
									{account},{ifsc}
								</div>

								<div>
									<label>Amount Claimed</label>
									<input type="text" name="amountClaimed" {...register("amountClaimed")}readOnly
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.amountClaimed?.message}</div>
								</div>
								
								
								<div>
									<label>Advance Amount</label>
									<input type="text" name="advanceAmount" {...register("advanceAmount")}readOnly
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.advanceAmount?.message}</div>
								</div>

								
								<div>
									<label>Amount Disallowed</label>
									<input type="text" name="amountDisallowed" {...register("amountDisallowed")} readOnly
										className="form-control py-0" onChange={handleDisallowanceDataChange} 
									/>
									<div className="text-red-500">{errors.amountDisallowed?.message}</div>
								</div>
								  
								<div>
									<label>MRO Received</label>
									<input type="text" name="mroReceived" {...register("mroReceived")}readOnly
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.mroReceived?.message}</div>
								</div>
								<div>
									<label>Penal Interest</label>
									<input type="text" name="penalInterest" {...register("penalInterest")}readOnly
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.penalInterest?.message}</div>
								</div>
								<div>
									<label>Adjustment Amount</label>
									<input type="text" name="adjustmentAmount" {...register("adjustmentAmount")}readOnly
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.adjustmentAmount?.message}</div>
								</div>
								 
								 
								<div>
									<label>Amount Passed</label>
									<input type="text" name="amountPassed" {...register("amountPassed")}readOnly
										className="form-control py-0" onChange={handleAmountPassedChange}
									/>
									<div className="text-red-500">{errors.amountPassed?.message}</div>
								</div>
								
						 
								

								<div>
									<label>Record Status</label>
									<input type="text" name="recordStatus" {...register("recordStatus")} readOnly
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.recordStatus?.message}</div>
								</div>
							</div>
							<div className="grid grid-cols-3 gap-0">
								<div className="px-3 ...">
									<button type="submit" name="submit6" onClick={() => updateButtonState(6)}>Update Payment Details</button>
								</div>
								<div className="px-3 ...">
									<button type="submit" >Previous-Disallowance</button>
								</div>
								<div className="px-3 ...">
									<button type="button" onClick={returnToList}>Cancel</button>
								</div>
							</div>
						</Tab>

					<Tab eventKey="page7" title="PM/CS" className="h-120">
							<div className="grid grid-cols-2 gap-4">
								
								 	<div>
									<label>Month Ending</label>
									{monthEnding}
								</div>
								
								<div >
									<label>DakId</label> {dakId}
								</div>								
								
								
								<div>
									<label>Record Status</label>
									<input type="text" name="recordStatus" {...register("recordStatus")} readOnly
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.recordStatus?.message}</div>
								</div>
								
								<div>
									<label>Amount Passed</label>
									<input type="text" name="amountPassed" {...register("amountPassed")}readOnly
										className="form-control py-0" onChange={handleAmountPassedChange}
									/>
									<div className="text-red-500">{errors.amountPassed?.message}</div>
								</div>
											
								  
								<div>
									<label>Adjusted Amount</label>
									<input type="text" name="adjustmentAmount" {...register("adjustmentAmount")}readOnly
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.adjustmentAmount?.message}</div>
								</div>
								 
								
								</div>
								<div className="grid grid-cols-3 gap-0">
							<div className="px-3 ...">
						<button type="submit" name="submit7" onClick={()=>updateButtonState(7)}>Generate PM/CS</button>
					</div>
					<div className="px-3 ...">
						<button type="submit" >Submission by Auditor</button>
					</div>
					<div className="px-3 ...">
						<button type="submit" >Done</button>
					</div>
					</div>
								</Tab>

							<Tab eventKey="page8" title="Help" className="h-120">
							<div className="grid grid-cols-1 gap-4">
								<ul>Based on Bill Type Selection, related fields and tabs will appear.</ul>
								<ul>Data received thru mail will be auto filled. </ul> 	 
					</div>
								</Tab>
						<div className="px-4 ...">
							<button type="submit" >Save</button>
						</div>
					</Tabs>
				</form>

			</div>
		</div>
	);
};

export default withRouter(CbillTadaLtcEdit);