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
import { Modal, Button } from 'react-bootstrap';
import { BasicLoadingIcon } from "../utils/Icons";

import { yupResolver } from '@hookform/resolvers/yup';
import LiveSearch from '../utils/LiveSearch';

//import DatePicker  from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";
//import addDays from 'date-fns/addDays'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { useLocation } from 'react-router-dom'

const schema = yup.object({
	// fromDate: yup.string().required('Required'),
	//  employee: yup.object().required('Required'),      
	// do2Date: yup.string().required('Required'),     



});


const Do2Edit = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)

	});

	let { id } = useParams();

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [key, setKey] = useState('page1');
	const [loading, setLoading] = useState(true);
	const [casualtyCodeList, setCasualtyCodeList] = useState([]);
	const [unitCode, setUnitCode] = useState('');
	const [unitName, setUnitName] = useState('');
	const [susNo, setSusNo] = useState('');
	const [cdano, setCdano] = useState('');
	const [officerName, setOfficerName] = useState('');
	const [rank, setRank] = useState('');
	const [servingIn, setServingIn] = useState('');
	const [do2No, setDo2No] = useState('');
	const [lastDo2No, setLastDo2No] = useState('');
	const [do2Date, setDo2Date] = useState('');
	const [lastDo2Date, setLastDo2Date] = useState('');
	const [dakidNo, setDakidNo] = useState('');
	const [usrLevel, setUsrLevel] = useState(0);
	const [disabled, setDisabled] = useState(false);
	const [readOnly, setReadOnly] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [rejDo2SlNo, setRejDo2SlNo] = useState('');
	const [rejDo2Oc, setRejDo2Oc] = useState('');
	const [rejDo2Reason, setRejDo2Reason] = useState('');
	const [rejOtherReason, setRejOtherReason] = useState('')
	const [rejList, setRejList] = useState([]);
	const [rd, setRd] = useState({});
	const [saveDisabled, setSaveDisabled] = useState(false);
	const [sec, setSec] = useState('');
	const [recycled,setRecycled]=useState(false);
	const [reviewCb,setReviewCb]=useState(false);

	const [timeBar, setTimeBar] = useState(false);

	useEffect(() => {
		function getSectionState() {
			let usr = JSON.parse(sessionStorage.getItem("usr"));
			let sectionList = usr?.sectionList?.map((section) =>
				section.sectionGroup.toLowerCase()
			);
			if (sectionList.includes("mando2"))
				setSec("man");
			else if (sectionList.includes("lwing"))
			 setSec("lw");
			else if (sectionList.includes("afl")) 
			setSec("afl");
			else if (sectionList.includes("nr"))
			 setSec("nr");
			 

			console.log(sectionList + "--" + sectionList.includes("mando2"));
		}

		getSectionState();
	}, [id]);


	const [casultyList, setCasultyList] = useState([{
		slNo: "", casualtyCode: "", nature: "", fromDate: "", toDate: "", data1: "", data2: "", data3: "", data4: "", rejId: "",
		otherRej: "", status: "", type: "",remarks:"",certificate:"",rejReason:"",reason:"",key1:"",key2:""
	}]);


	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get(`/do2s/${id}`)
					.then((response) => {
						record = response.data;
						console.log(record['transType']);

						if (record['cdaoNo'])
							setCdano(record['cdaoNo']);
						if (record['unitCode'])
							setUnitCode(record['unitCode']);
						if (record['do2No'])
							setDo2No(record['do2No']);
						if (record['do2Date'])
							setDo2Date(record['do2Date']);
						if (record['lastDo2No'])
							setLastDo2No(record['lastDo2No']);
						if (record['lastDo2Date'])
							setLastDo2Date(record['lastDo2Date']);
						if (record['servingIn'])
							setServingIn(record['servingIn']);

						if (record['casualtyList'])
							setCasultyList(record['casualtyList'])
						if (record['dakId'])
							setDakidNo(record['dakId']);
						if (record['secname'])
							setSec(record['secname']);
						if (record['timeBar'] && record['timeBar'] === true)
							setTimeBar(true);
					
						if (record['reviewed'] && record['reviewed'] === true)
							setReviewCb(true);

						 if(record['recycle'] && record['recycle']===true)
						 	setRecycled(true);

						if (record['transType'] && record['transType'] === 'D') {


							setReadOnly(true);
						}





						console.log(record['casualtyList']);

						const fields = [
							'cdaoNo', 'unitCode', 'servingIn', 'do2No', 'lastDo2No', 'do2Date', 'lastDo2Date', 'officerName', 'rank', 'susNo', 'dakId', 'do2Id',
							 'casualtyList', 'timeBar','reviewed'

						];
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


	}, [id, setValue]);


	useEffect(() => {
		let fetching = false;
		let unmounted = false;

		async function fetchCasultyList() {

			if (!fetching && sec) {
				console.log(sec);
				if (sec === 'man' || sec === 'lw-recycle' || sec === null || sec === "") {
					await axios.get(`/docFormats/all/occurrenceCode`)
						.then((response) => {
							console.log("response>>" + response.data);
							setCasualtyCodeList(response.data);
							if (!unmounted) {


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
				if (sec === 'lw' || sec === 'lw-recycle') {
					await axios.get(`/docFormats/lwing/occurrenceCode/${id}`)
						.then((response) => {
							console.log("response>>" + response.data);
							setCasualtyCodeList(response.data);
							if (!unmounted) {


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
				if (sec === 'afl' || sec === 'afl-recycle') {
					await axios.get(`/docFormats/afl/occurrenceCode`)
						.then((response) => {
							console.log("response>>" + response.data);
							setCasualtyCodeList(response.data);
							if (!unmounted) {


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
				if (sec === 'nr') {
					await axios.get(`/docFormats/nr/occurrenceCode`)
						.then((response) => {
							console.log("response>>" + response.data);
							setCasualtyCodeList(response.data);
							if (!unmounted) {


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
			}
		}
		fetchCasultyList();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sec, id]);

	useEffect(() => {
		let fetching = false;
		let unmounted = false;

		async function fetchEmp() {
			console.log(cdano + "--" + cdano.trim().length);
			if (!fetching && cdano && cdano.trim().length === 6)
				await axios.get(`/employees/empName/${cdano}`)
					.then((response) => {
						console.log("response>>" + response.data);
						setOfficerName(response.data);
						if (!unmounted) {

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
		fetchEmp();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cdano]);

	useEffect(() => {
		let fetching = false;
		let unmounted = false;

		async function fetchDo2No() {
			console.log("sec==============" + sec);
			if (!fetching && id === 'new' && cdano && sec)
				//console.log(secId);
				await axios.get(`/do2s/fetchDo2No/manualInput/${sec}/${cdano}`)
					.then((response) => {
						console.log("response do2no>>" + response.data);
						setDo2No(response.data);
						setValue("do2No", response.data);
						if (response.data && response.data === 'NA')
							setSaveDisabled(true);
						if (!unmounted) {
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
		fetchDo2No();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, cdano, sec]);

	useEffect(() => {
		let fetching = false;
		let unmounted = false;

		async function fetchUsrLevelList() {

			if (!fetching)
				//console.log(secId);
				await axios.get(`/miscs/usrLevel`)
					.then((response) => {
						console.log("response>>" + response.data);
						setUsrLevel(response.data);
						if (!unmounted) {


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
		fetchUsrLevelList();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		let fetching = false;
		let unmounted = false;

		async function fetchUnit() {

			if (!fetching && unitCode && unitCode.length === 6)
				console.log(unitCode);
			await axios.get(`/units/fetchUnit/${unitCode}`)
				.then((response) => {
					console.log("response>>" + response.data);
					setUnitName(response.data);
					if (!unmounted) {


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
		fetchUnit();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [unitCode]);

	useEffect(() => {
		let fetching = false;
		let unmounted = false;

		async function fetchRej() {

			if (!fetching)
				//console.log(secId);
				await axios.get(`/rejectionDetails/fetchRej/lwing`)
					.then((response) => {
						console.log("response>>" + response.data);
						setRejList(response.data);
						if (!unmounted) {


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
		fetchRej();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	async function approve() {
		console.log(entity);
		if (disabled)
			return;

		setDisabled(true);

		axios.put(`/do2s/lwing/approveDo2`, entity)
			.then((response) => {
				console.log(response.data);
				if (response.data) {
					setServerErrors(response.data);

				}

				setDisabled(false)

			});
	}

	async function submit(data) {
		console.log(entity);
		if (disabled)
			return;

		setDisabled(true);


		await axios.put(`/do2s/lwing/submitDo2`, entity)
			.then((response) => {
				console.log(response.data);
				if (response.data) {
					setServerErrors(response.data);

				}

				setDisabled(false)

			});
	}
	
	async function recycle() {
		console.log(officerName+"--"+reviewCb);
		//setValue('officerName','abcd');
		console.log(entity);
		//console.log(entity.officerName);
		
		
		if (disabled)
			return;

		setDisabled(true);


		await axios.put(`/do2s/lwing/recycle/${reviewCb}`, entity)
			.then((response) => {
				console.log(response.data);
				if (response.data) {
					setServerErrors(response.data);

				}

				setDisabled(false)

			});
	}
	async function rollback(data) {
		console.log(entity);
		if (disabled)
			return;

		setDisabled(true);


		await axios.put(`/do2s/lwing/rollback`, entity)
			.then((response) => {
				console.log(response.data);
				if (response.data) {
					setServerErrors(response.data);

				}

				setDisabled(false)

			});
	}
	async function approveManDo2() {
		 
		console.log(do2No + "--approve man");
		console.log(casultyList);
		if (do2No === 'NA') {
			alert("Not authorised task user for this CDAONo");
			return;
		}
		console.log(entity);
		if (disabled)
			return;

		if (entity) {
			setDisabled(true);
			axios.put("/do2s/man/approveDo2", entity)
				.then((response) => {


					setServerErrors(response.data)


				})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
			setDisabled(false);
		}
	}
	
	async function submitManDo2() {
		 
		console.log(do2No + "--creating man");
		console.log(casultyList);
		if (do2No === 'NA') {
			alert("Not authorised task user for this CDAONo");
			return;
		}
		console.log(entity);
		if (disabled)
			return;

		if (entity) {
			setDisabled(true);
			axios.put("/do2s/man/submitDo2", entity)
				.then((response) => {


					setServerErrors(response.data)


				})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
			setDisabled(false);
		}
	}

	const onSubmit = (data, event) => {
		event.preventDefault();
		console.log(do2No + "--submitting"+sec);
		console.log(casultyList);
		if (do2No === 'NA') {
			alert("Not authorised task user for this CDAONo");
			return;
		}
		console.log(data);
		if (disabled)
			return;

		if (data) {
			setDisabled(true);
			if(sec && sec==='man'){
				axios.put("/do2s/man/saveDo2", data)
				.then((response) => {


					setServerErrors(response.data)


				})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
			setDisabled(false);
			}else{
			axios.put("/do2s/lwing/saveDo2", data)
				.then((response) => {


					setServerErrors(response.data)


				})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
			setDisabled(false);
			}
		}


		//history.push("/do2s");
	}

	const returnToList = () => {
	console.log(sec)
		if (sec === 'afl')
			history.push("/do2s/afl");
		if(sec==='lw' && recycled)
			history.push("/do2s/recycle/pending");
		else if (sec === 'lw')
			history.push("/do2s");
		 
		if (sec === 'afl-recycle')
			history.push("/do2s/recycle/aflpending");
		if (sec === 'nr')
			history.push("/do2s/nr");
		if(sec==='man')
			history.push("/do2s/man");

	}
	const onError = (errors, e) => console.log(errors, e);

	//All foreign keys. 
	// XXXXXX Add search fields and adjust the values as necessary
	const parentData = {

		employee: {
			title: "Employee",
			url: "employees",
			searchList: ['cdaoNo', 'checkDigit', 'officerName'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "employee",
		},

		unit: {
			title: "Unit",
			url: "units",
			searchList: ['unitCode', 'unitName'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "unit",
		},
		docFormat: {
			title: "Occurrence Code",
			url: "docFormats",
			searchList: ['occurrenceCode', 'occurrenceNature'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "docFormat",
		},
	}

	//Callback for child components (Foreign Keys)
	const callback = (childData) => {
		//console.log("Parent Callback");
		setEntity(prev => ({ ...prev, [childData.fk]: childData.entity }));
		setValue(childData.fk, childData.entity);
		if (childData.fk === 'docFormat') {
			setValue('occurrenceCode', childData.entity.occurrenceCode);
			console.log(childData.entity.occurrenceCode);
		}
		//console.log(childData.fk+"--"+childData.entity);
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

	const handleCdaNoChange = (e) => {
		console.log(e.target.value);
		setCdano(e.target.value);
		setValue("cdaoNo", e.target.value);
	};
	const handleUnitChange = (e) => {
		//console.log(e.target.value);
		setUnitCode(e.target.value);
		setValue("unitCode", e.target.value);
	};
	const handleServingIn = (e) => {
		console.log(e.target.value);
		setServingIn(e.target.value);
		setValue("servingIn", e.target.value);
	};
	const handleLastDo2DateChange = (e) => {
		//console.log(e.target.value);
		setLastDo2Date(e.target.value);
		setValue("lastDo2Date", e.target.value);
	};
	const handleLastDo2Change = (e) => {
		//console.log(e.target.value);
		setLastDo2No(e.target.value);
		setValue("lastDo2No", e.target.value);
	};
	const handleDo2NoChange = (e) => {
		//console.log(e.target.value);
		setDo2No(e.target.value);
		setValue("do2No", e.target.value);
	};
	const handleDo2DateChange = (e) => {
		//console.log(e.target.value);
		setDo2Date(e.target.value);
		setValue("do2Date", e.target.value);
	};
	const handleNature = index => (e) => {
		console.log(index + "--" + e.target.value);
		let item = casultyList[index];

		item['nature'] = e.target.value;
		let newData = [...casultyList];
		newData[index] = item;
		setCasultyList(newData);
		setValue("casualtyList", casultyList);

	};
	const handleSlNo = index => (e) => {
		console.log(index + "--" + e.target.value);
		let item = casultyList[index];

		item['slNo'] = e.target.value;
		let newData = [...casultyList];
		newData[index] = item;
		setCasultyList(newData);
		setValue("casualtyList", casultyList);

	};
	const handleFromDate = index => (e) => {
		console.log(index + "--" + e.target.value);
		let item = casultyList[index];

		item['fromDate'] = e.target.value;
		let newData = [...casultyList];
		newData[index] = item;
		setCasultyList(newData);
		setValue("casualtyList", casultyList);

	};
	const handleToDate = index => (e) => {
		console.log(index + "--" + e.target.value);
		let item = casultyList[index];

		item['toDate'] = e.target.value;
		let newData = [...casultyList];
		newData[index] = item;
		setCasultyList(newData);
		setValue("casualtyList", casultyList);

	};
	const handleData1 = index => (e) => {
		console.log(index + "--" + e.target.value);
		let item = casultyList[index];

		item['data1'] = e.target.value;
		let newData = [...casultyList];
		newData[index] = item;
		setCasultyList(newData);
		setValue("casualtyList", casultyList);

	};
	const handleData2 = index => (e) => {
		console.log(index + "--" + e.target.value);
		let item = casultyList[index];

		item['data2'] = e.target.value;
		let newData = [...casultyList];
		newData[index] = item;
		setCasultyList(newData);
		setValue("casualtyList", casultyList);

	};
	const handleData3 = index => (e) => {
		console.log(index + "--" + e.target.value);
		let item = casultyList[index];

		item['data3'] = e.target.value;
		let newData = [...casultyList];
		newData[index] = item;
		setCasultyList(newData);
		setValue("casualtyList", casultyList);

	};
	const handleKey1 = index => (e) => {
		console.log(index + "--" + e.target.value);
		let item = casultyList[index];

		item['key1'] = e.target.value;
		let newData = [...casultyList];
		newData[index] = item;
		setCasultyList(newData);
		setValue("casualtyList", casultyList);

	};
	const handleKey2 = index => (e) => {
		console.log(index + "--" + e.target.value);
		let item = casultyList[index];

		item['key2'] = e.target.value;
		let newData = [...casultyList];
		newData[index] = item;
		setCasultyList(newData);
		setValue("casualtyList", casultyList);

	};

	const handleData4 = index => (e) => {
		console.log(index + "--" + e.target.value);
		let item = casultyList[index];

		item['data4'] = e.target.value;
		let newData = [...casultyList];
		newData[index] = item;
		setCasultyList(newData);
		setValue("casualtyList", casultyList);

	};
	const handleCasualtyCode = index => (e) => {
		console.log(index + "--" + e.selectedIndex);
		let item = casultyList[index];

		item['casualtyCode'] = e.target.value;
		let newData = [...casultyList];
		newData[index] = item;
		setCasultyList(newData);
		setValue("casualtyList", casultyList);

	};

	const handleRowDelete = index => (e) => {
		console.log(index + "--" + e.selectedIndex);
		let newCasultyList = [];
		casultyList.map((item, ind) => {
			if (index !== ind) {
				newCasultyList = [...newCasultyList, item];
			}
		});

		setCasultyList(newCasultyList);
		setValue("casualtyList", casultyList);

	};
	const handleRej = (e) => {
		setRejOtherReason(e.target.value)
		console.log(rejList[e.target.selectedIndex - 1]['id'] + '=====' + rejDo2SlNo);
		setRd(rejList[e.target.selectedIndex - 1]);
		setRejDo2Reason(rejList[e.target.selectedIndex - 1]['rejectionName']);
		let newCasultyList = [];
		casultyList.map((item, ind) => {
			//console.log(item.slNo);
			if (item.slNo === rejDo2SlNo) {
				item.rejId = rejList[e.target.selectedIndex - 1]['id'];
				console.log(item.slNo + '--' + item.rejId);
				item.otherRej = e.target.value;
				newCasultyList = [...newCasultyList, item];
			} else
				newCasultyList = [...newCasultyList, item];
		});

		setCasultyList(newCasultyList);
		setValue("casualtyList", casultyList);

	};

	const initRejection = index => (e) => {
		console.log(index + "--" + e.selectedIndex);
		setShowModal(true);
		casultyList.map((item, ind) => {
			if (index === ind) {
				setRejDo2Oc(casultyList[index].casualtyCode);
				setRejDo2SlNo(casultyList[index].slNo);
			}
		});

	};

	const addRow = (e) => {
		console.log(casultyList);
		setCasultyList([...casultyList, { slNo: "", casualtyCode: "", nature: "", fromDate: "", toDate: "", data1: "", data2: "", data3: "", 
		data4: "", rejId: "", otherRej: "", status: "",reason:"",key1:"",key2:"" }])

	};

	const handleTimeBarCheckbox = (e) => {
		setValue('timeBar', e.target.checked);
		setTimeBar(e.target.checked);
	}
	
	const handleReviewedCheckbox = (e) => {
		console.log(e.target.checked);
		setValue('reviewed', e.target.checked);
		setReviewCb(e.target.checked);
	}


	const initModal = () => {

		setShowModal(false);

	}
	const handleOtherRej = (e) => {
		//console.log(index+"--"+e.selectedIndex);
		setRejOtherReason(e.target.value)
		console.log(rejDo2SlNo);

		let newCasultyList = [];
		casultyList.map((item, ind) => {
			if (item.slNo === rejDo2SlNo) {
				item.otherRej = e.target.value;

				newCasultyList = [...newCasultyList, item];
			} else
				newCasultyList = [...newCasultyList, item];
		});

		setCasultyList(newCasultyList);
		setValue("casualtyList", casultyList);

	};




	return (
		<div className="max-w-8xl mx-auto ">
			<div className="w-full w-3/4  mx-auto " style={disabled ? { pointerEvents: "none", opacity: "0.4" } : {}} >

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Do2 </h1>
					<div className="text-red-500">{serverErrors}</div>
					<Tabs
						id="Do2Edit"
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className="mb-3"
					>
						<Tab eventKey="page1" title="Page 1" className="h-120">
							<div className="grid grid-cols-2 gap-0">

								<div>
									<label>Dak Id</label>
									{dakidNo}

								</div>
								<div>
									{}
								</div>
								<div>
									<label>Cdao No</label>
									<input type="text" name="cdano" value={cdano} onChange={handleCdaNoChange} readOnly={readOnly} />

								</div>

								<div>
									<label>Officer Name</label>
									{officerName}

								</div>

								<div>
									<label>Unit Code</label>
									<input type="text" name="unitCode" onChange={handleUnitChange} value={unitCode}
										placeholder="unit code or susno" readOnly={readOnly}
									/>
									<div className="text-red-500">{errors.do2No?.message}</div>
								</div>

								<div>
									<label>Unit Name</label>
									{unitName}

								</div>




								<div>
									<label>Do2 No</label>
									<input type="text" name="do2No" value={do2No} onChange={handleDo2NoChange}
										readOnly="true"
									/>
									<div className="text-red-500">{errors.do2No?.message}</div>
								</div>
								<div>
									<label>Do2 Date</label>
									<input type="date" name="fromDate" value={do2Date} onChange={handleDo2DateChange} readOnly={readOnly}
									/>
									<div className="text-red-500">{errors.fromDate?.message}</div>
								</div>
								<div>
									<label>Last Do2 No</label>
									<input type="text" name="lastDo2No" value={lastDo2No} onChange={handleLastDo2Change}
										readOnly="true"
									/>
									<div className="text-red-500">{errors.lastDo2No?.message}</div>
								</div>
								<div>
									<label>Last Do2 Date</label>
									<input type="date" name="lastDo2Date" value={lastDo2Date} onChange={handleLastDo2DateChange} readOnly="true"
									/>
									<div className="text-red-500">{errors.lastDo2Date?.message}</div>
								</div>
								<div>
									<label>Serving In</label>
									<select name="servingIn" value={servingIn} onChange={handleServingIn}>
										<option value="0">--select---</option>
										<option value="Peace">Peace</option>
										<option value="Field">Field</option>
										<option value="Hard">Hard</option>


									</select>
									<div className="text-red-500">{errors.servingIn?.message}</div>
								</div>
								<div>
									<label>Time Bar Sanction</label>
									<input type="checkbox" onChange={handleTimeBarCheckbox} checked={timeBar} />

									<div className="text-red-500">{errors.timeBarSanction?.message}</div>
								</div>
								{recycled && 
								<div>
									<label>Reviewed</label>
									<input type="checkbox" onChange={handleReviewedCheckbox} checked={reviewCb} />

									<div className="text-red-500">{errors.reviewed?.message}</div>
								</div>
								}			
							</div>
							<br />
							<div>
								<table className="table table-auto table-striped table-bordered">
									<thead>
										<tr>
											<th>SlNo</th>
											<th>Code</th>
											  
											<th>From/To Date</th>
											  
											<th>Data</th>
											 
											<th>Status</th>
											 
											<th>Type</th>
											<th>Remarks</th>
											<th>Certificate</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										{
											casultyList.map((item, i) => {
												return (
													<tr key={"do2" + i}>

														<td>
															<div >
																<input className="w-10" type="text" name="slNo" value={item.slNo} onChange={handleSlNo(i)} readOnly={readOnly} />
															</div>
														</td>

														<td>
															{!readOnly &&
																<select
																	disabled={loading}
																	value={item.casualtyCode}
																	onChange={handleCasualtyCode(i)}>
																	<option key="0" value="0" label="--select--" />
																	{casualtyCodeList.map((item, index) => (

																		<option key={"cs" + index} value={item.toString()}>   {item.toString()} </option>
																	))}
																</select>
															}
															{readOnly && <>
																{item.casualtyCode}
															</>
															}

														</td>

														 
														<td>
														 
															{"From Date :"} <input type="date" name="fDate" value={item.fromDate} onChange={handleFromDate(i)} readOnly={readOnly} className="form-control py-0" />
															<br/>
															{"To D a t e:"}<input type="date" name="tDate" value={item.toDate} onChange={handleToDate(i)} readOnly={readOnly} className="form-control py-0" />
															 
														</td>
														
														<td>
															{"Data1 : "}<input type="text" name="data1" value={item.data1} onChange={handleData1(i)} readOnly={readOnly} /><br/>
															
															{"Data2 : "}{item.casualtyCode && item.casualtyCode === 'ENCASH' &&
																<input type="text" name="data2" value={item.data2} onChange={handleData2(i)} className="form-control py-0" />
															}
															
															 {item.casualtyCode && item.casualtyCode !== 'ENCASH' &&
																<input type="text" name="data2" value={item.data2} onChange={handleData2(i)} readOnly={readOnly} />
															}<br/>
															{"Data3 : "}	{item.casualtyCode && item.casualtyCode === 'REIMACCO' &&
																<input type="text" name="data3" value={item.data3} onChange={handleData3(i)} className="form-control py-0" />
															}
															
															{item.casualtyCode && item.casualtyCode !== 'REIMACCO' &&
																<input type="text" name="data3" value={item.data3} onChange={handleData3(i)} readOnly={readOnly} />
															}<br/>
															{"Data4 : "}<input type="text" name="data4" value={item.data4} onChange={handleData4(i)} readOnly={readOnly}  />
															{item.casualtyCode && item.casualtyCode==='TERLEV' && <>
															<br/>
															{"Key1 :"}	<input type="text" name="key1" placeholder="Employment Cft(Y/N)" value={item.key1} onChange={handleKey1(i)} />
															<br/>
															{"Key2 :"}	<input type="text" name="key2"  placeholder="Date of Employment(dd/MM/yyyy2)" value={item.key1} onChange={handleKey2(i)}  />
															</>
															}
														</td>
														 
														 
														<td>
															{item.status} <div>
															{item.status && item.status==='MR' &&
															<div>Rej Reason : {item.rejReason}</div>
															}{' '}{item.otherRej &&
															<div>{item.otherRej}</div>
																
															}
															{item.status && item.status!=='MR' && item.status!=='V' &&
																<div>{item.reason} </div>
															}
															</div>
														</td>
														<td>
															{item.type}
														</td>
														<td>
														<div>
															{item.remarks}  
															</div>
														</td>
														<td>
															{item.certificate}
														</td>
														<td>
															{!readOnly &&
																<div style={{ backgroundColor: "red" }} className="cursor-pointer text-white font-bold rounded-lg" onClick={handleRowDelete(i)}> Delete</div>

															}{readOnly &&
																<div style={{ backgroundColor: "green" }} className="cursor-pointer text-white font-bold rounded-lg" onClick={initRejection(i)}> Reject</div>
															}
														</td>
													</tr>
												)

											})

										}
									</tbody>
								</table>
						{usrLevel<30 && sec && sec==='man' &&  <>
							<div className="w-32 ...">
						<button className=" w-32 m-2 p-0 " type="button" onClick={addRow}>Add Record</button>
					</div>
					</>
					}
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
					<div className="flexContainer">
						<div >
							{usrLevel < 30 && sec && sec!=='man' && !recycled &&
								<button className=" w-16 m-0 p-0 " type="submit">
									{disabled && (
										<span className="spinner-grow spinner-grow-sm"></span>
									)

									}
									Save</button>
							}
							 
							 
							{usrLevel < 30 && sec && sec==='man' &&
								<button className=" w-16 m-0 p-0 " type="submit">
									{disabled && (
										<span className="spinner-grow spinner-grow-sm"></span>
									)

									}
									Save</button>
							}
							{'  '}
							{usrLevel < 30 && sec && sec==='man' && id!=='new' &&
								<button className=" w-16 m-0 p-0 " type="button" onClick={() => submitManDo2()}>
									{disabled && (
										<span className="spinner-grow spinner-grow-sm"></span>
									)

									}
									Submit</button>
							}
							{usrLevel === 30 && sec && sec!=='man' &&  !recycled &&
								<button className=" w-16 m-0 p-0 " type="button" onClick={() => submit()}> {disabled && (
									<span className="spinner-grow spinner-grow-sm"></span>
								)

								} Submit </button>
							}
							
							{sec && sec!=='man' && recycled &&
								<button className=" w-16 m-0 p-0 " type="button" onClick={() => recycle()}> {disabled && (
									<span className="spinner-grow spinner-grow-sm"></span>
								)

								} Recycle </button>
							}
							
							
							{usrLevel=== 30 && sec && sec==='man' &&
								<button className=" w-16 m-0 p-0 " type="button" onClick={() => approveManDo2()}> {disabled && (
									<span className="spinner-grow spinner-grow-sm"></span>
								)

								} Approve </button>
							}
							{usrLevel > 30 && sec && sec!=='man' &&  !recycled &&
								<button className=" w-16 m-0 p-0 " type="button" onClick={() => approve()}> {disabled && (
									<span className="spinner-grow spinner-grow-sm"></span>
								)

								} Approve </button>
							}
							{'  '}
							{usrLevel >= 30 && sec && sec!=='man' &&  !recycled &&
								<button className=" w-16 m-0 p-0 " type="button" onClick={() => rollback()}> {disabled && (
									<span className="spinner-grow spinner-grow-sm"></span>
								)

								} Rollback </button>
							}
						</div>
						<div>
							<button className=" w-16 m-0 p-0 " type="button" onClick={returnToList} >Done</button>
						</div>

						{showModal && (
							<Modal show={showModal}>
								<Modal.Header closeButton onClick={initModal}>
									<Modal.Title>Reject Do2</Modal.Title>
								</Modal.Header>
								<Modal.Body className="modal-body">
									<form>
										<div className="modal-body">

											<div>
												<label>Dak Id</label>
												{dakidNo}

											</div>
											<div>
												<label>Item No</label>
												{rejDo2SlNo}

											</div>

											<div>
												<label>Occurrence Code</label>
												{rejDo2Oc}

											</div>
											<div >
												<b>Rejection Reason</b>
												<select className="form-control py-0"
													disabled={loading}
													
													onChange={handleRej}>
													<option key="default" value="" label="--select--" />
													{rejList.map((item, index) => (

														<option key={index} value={item.rejectionName}>   {item.rejectionName} </option>
													))}
												</select>
											</div>
											{rejDo2Reason === 'Other' &&
												<div>
													<label>Other Reason</label>
													<textarea type="text" rows="3" name="nature"  onChange={handleOtherRej} />

												</div>
											}
										</div>


									</form>
								</Modal.Body>
								<Modal.Footer>
									<div className="flex justify-center items-center">

										<div>
											<Button variant="danger" onClick={initModal}>Save</Button>
										</div>
									</div>
								</Modal.Footer>

							</Modal>
						)}
					</div>

				</form>
			</div>
			{disabled ? (
				<div className="flex justify-center items-center fixed top-1/3 w-full z-50">
					<p className="mr-2 text-2xl text-green-600">Processing</p>
					<BasicLoadingIcon
						className={`ml-1 mt-1 h-10 w-10 animate-spin text-green-600
            `}
					/>
				</div>
			) : (
				""
			)}
		</div>
	);
};

export default withRouter(Do2Edit);