/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By : 
 */

import { useState, useEffect, useMemo } from 'react';
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { withRouter, Link,useHistory } from "react-router-dom";
import TablePageAdj from '../utils/TablePageAdj';


function IorManualEntryList() {

	let history=useHistory();
	const [data, setData] = useState([]);
	const [crData, setCrData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	const [page, setPage] = useState(0);
	//	const [pageSize, setPageSize] = useState(0);
	const [usrLevel, setUsrLevel] = useState(0);
	const [mesg, setMesg] = useState('');
	//const [approved, setApproved] = useState(true);
	const [rentBillType, setRentBillType] = useState('');
	const [disabled, setDisabled] = useState(false);
	const [validRec, setValidRec] = useState('');
	const [invalidRec, setInvalidRec] = useState('');
	const [iors, setIors] = useState('');
	const [validate, setValidate] = useState(false);
	const [optionType, setOptionType] = useState('');
	const [occVacList, setOccVacList] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [pending, setPending] = useState(false);
	const [approved,setApproved]=useState(false);
	const [updateRent,setUpdateRent]=useState(false);
	const [updateOccVac,setUpdateOccVac]=useState(false);
	const [empId,setEmpId]=useState('');
	const [name,setName]=useState('');
	const [perNo,setPerNo]=useState('');
	const [cdaoNo,setCdaoNo]=useState('');
	const [rentType,setRentType]=useState('');
	const [lightTheme, setLightTheme] = useState(true);

	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if (!fetching)
				console.log("--------------here-----------:" + optionType);
			await axios.get('/iorTrans/manualEntryList/iors?search=' + search + '&rentType=' + optionType)

				.then((response) => {
			//		console.log("------ior response----:" + response.data['select']===true)
					setData(response.data);


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
		return () => { fetching = true; }

	}, [update, search, rentType]);

	
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
		async function fetchEmpId() {
			if (!fetching)
				console.log(">>>>Search----cdaono is ---1111--:" + search);
			await axios.get(`/employees/byCdaoNo/${search}`)
				.then((response) => {
					console.log(">>>>empid----:" + response.data['id']);
					setEmpId(response.data['id']);
					setCdaoNo(response.data['cdaoNo']);
					setPerNo(response.data['icNo']);
					setName(response.data['officerName']);

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
		fetchEmpId();
		return () => { fetching = true; }

	}, [search]);
	
	useEffect(() => {
		let fetching = false;
		async function approvalStatus() {
			if (!fetching)
				
			await axios.get(`/iorTrans/approvalStatus`)
				.then((response) => {
					console.log(">>>>Usr Level is----:" + response.data);
					if(response.data===true){
						setApproved(true);
					}else{
						setApproved(false);
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
		approvalStatus();
		return () => { fetching = true; }

	}, [usrLevel]);
	useEffect(() => {
		let fetching = false;
		async function updationRentStatus() {
			if (!fetching)
				
			await axios.get(`/iorTrans/rentUpdationStatus`)
				.then((response) => {
					console.log(">>>>Usr Level is----:" + response.data);
					if(response.data===true){
						setUpdateRent(true);
					}else{
						setUpdateRent(false);
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
		updationRentStatus();
		return () => { fetching = true; }

	}, [usrLevel]);
	useEffect(() => {
		let fetching = false;
		async function fetchHighCreditData() {
			if (!fetching)

				await axios.get(`/iorTrans/highCredit`)
					.then((response) => {
						console.log(">>>>Usr Level is----:" + response.data);
						setCrData(response.data);

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
		fetchHighCreditData();
		return () => { fetching = true; }

	}, []);

	useEffect(() => {
		let fetching = false;
		async function updateOccVac() {
			if (!fetching)

				await axios.get(`/iorTrans/checkForUpdationOccVac`)
					.then((response) => {
						console.log(">>>>Ready for Updation----:" + response.data);
						if (response.data === 'yes')
							setSubmitted(true);

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
		updateOccVac();
		return () => { fetching = true; }

	}, []);

	async function submitBulk() {

		let i = 0, fname = "NA";
		let xx = "";
		console.log("----line 120---:" + optionType);
		if(usrLevel<= 30){
		if ((optionType !== null && optionType.length === 0) || optionType === null) {
			alert("No file name given ");
			return;
		}
		 
		if (optionType === 'occ') {
			await axios.get('/iorTrans/findPendingOccData')
				.then((response) => {
					console.log("---rd---:" + response.data);
					//	setMesg(response.data);
					//console.log("---line 128--:" + mesg);
					xx = response.data;
				 	if (xx !== null && xx==='not') {
						setPending(true);
				//		console.log("-----pending---111--:" + pending + "---" + xx);
						alert("First Click on Validate Iors and Then process the file");
						return;
					}
				})
		}
		if (optionType === 'rev') {
			await axios.get('/iorTrans/findPendingVacData')
				.then((response) => {
					console.log("---rd---:" + response.data);
					//	setMesg(response.data);
					//console.log("---line 128--:" + mesg);
					xx = response.data;
				 	if (xx !== null && xx==='not') {
						setPending(true);
				//		console.log("-----pending---111--:" + pending + "---" + xx);
						alert("First Process Vacation Data, then Validate Revision Data");
						return;
					}
				})
		}
		if (data.length === 0) {
			alert("No records exist with this file name");
			return;
		}
		console.log("-----pending---111--:" + pending);
		for (i = 0; i < data.length; i++) {
			if (fname !== "NA") {
				if (data[i].occupationVacationRevision !== fname) {
					alert("Selection contains multiple file");
					return;
				}
			}

			fname = data[i].occupationVacationRevision;

		}
		console.log("----pending here is----:" + pending);
		if (xx!=='not') {
			let proceed = window.confirm("You are about to process file containing " + data.length + " records.");
			if (!proceed)
				return;
		}
		if (disabled)
			return;

		setDisabled(true);
		console.log("----option---:" + optionType);
		await axios.put(`/iorTrans/bulkSubmitIors/${optionType}`, data)
			.then((response) => {
				setDisabled(false);
			//	if (response.data[0] !== null)
					setMesg(response.data);
					setDisabled(false);

			//	if (response.data[1] !== null)
			//		console.log("----respose---:" + response.data[1]);
			//	setMesg(response.data[1]);
				//	setData(response.data[2]);

			//	if (response.data[3] !== null)
			//		setMesg(response.data[3]);
			//	console.log("reponse status--------------" + response.status);


			})
			.catch((error) => {
				//	console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
			
			}
			//for aao----
			if(usrLevel===30){
			await axios.put(`/iorTrans/bulkSubmitIorsAao`, data)
			.then((response) => {
				setDisabled(false);
				if (response.data !== null)
					setMesg(response.data);
 

			})
			.catch((error) => {
				//	console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
			}
	}
	
	async function submitValidate() {

		 
		console.log("----line 120---:" + optionType);
		if(usrLevel< 30){
		if ((optionType !== null && optionType.length === 0) || optionType === null) {
			alert("No file name given ");
			return;
		}
 
		if (data.length === 0) {
			alert("No records exist with this file name");
			return;
		}
		let xx="";
		if (optionType === 'rev') {
			await axios.get('/iorTrans/findPendingVacData')
				.then((response) => {
					console.log("---rd---:" + response.data);
					//	setMesg(response.data);
					//console.log("---line 128--:" + mesg);
					xx = response.data;
				 	if (xx !== null && xx==='not') {
						setPending(true);
				//		console.log("-----pending---111--:" + pending + "---" + xx);
						alert("First Process Vacation Data, then Validate Revision Data");
						return;
					}
				})
		}
	 
		  if (xx!=='not') {
			let proceed = window.confirm("You are about to process file containing " + data.length + " records.");
			if (!proceed)
				return;
		}
		if (disabled)
			return;

		setDisabled(true);
		console.log("----option---:" + optionType);
		await axios.put(`/iorTrans/validateIors/${optionType}`, data)
			.then((response) => {
				console.log(response.data[0]+"----"+response.data[1]);
				if (response.data[0] !== null)
					setMesg(response.data[0]);

			//	if (response.data[1] !== null)
			//		console.log("----respose---:" + response.data[1]);
			//		setData(response.data[1]);
				//	setData(response.data[2]);

				 
				setDisabled(false);

			})
			.catch((error) => {
				//	console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
			
			}
	 
	}

	/*async function updateOccVac() {



		let proceed = window.confirm("You are about to update OccupationVacation Master.");
		if (!proceed)
			return;

		if (disabled)
			return;

		setDisabled(true);
		await axios.put("/iorTrans/updateOccVac")
			.then((response) => {
				setDisabled(false);
				setMesg(response.data);

			})
			.catch((error) => {
				//	console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}*/

	async function submitHighValue(id) {
		console.log("----line--149---:" + id);

		//	if(disabled)
		//		return;

		//		setDisabled(true);
		await axios.put(`/iorTrans/submitHighValue/${id}`)
			.then((response) => {
				//		setDisabled(false);
				setMesg(response.data[0]);
				if (response.data[1] !== null)
					setData(response.data[1]);
				console.log("reponse status--------------" + response.status);


			})
			.catch((error) => {
				//	console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}

	async function approveBulk() {
	 

		let proceed = window.confirm("You are about to approve file containing " + data.length + " records.");
		if (!proceed)
			return;

		if (disabled)
			return;

		setDisabled(true);
		await axios.put(`/iorTrans/bulkApproveIors`, data)
			.then((response) => {
				setMesg(response.data);
				setApproved(true); 
				setDisabled(false);
			})
			.catch((error) => {
				//	console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}
	
	async function updateRentMaster() {
	 
		let proceed = window.confirm("You are about to Update Rent Master.");
		if (!proceed)
			return;

		if (disabled)
			return;

		setDisabled(true);
		await axios.put('/iorTrans/rentMaster/updation')
			.then((response) => {
				setMesg(response.data);
				setUpdateRent(true);
				setDisabled(false);

			})
			.catch((error) => {
				//	console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}
	
	async function updateOccVacMaster() {
	 
		let proceed = window.confirm("You are about to Update Occupation Vacation Master.");
		if (!proceed)
			return;

		if (disabled)
			return;

		setDisabled(true);
		await axios.put('/iorTrans/occVacMaster/updation')
			.then((response) => {
				setMesg(response.data);
				setDisabled(false);

			})
			.catch((error) => {
				//	console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}
	
	async function submitRejVac(id) {
		//rejection--vacation
		if (disabled)
			return;

		setDisabled(true);
		await axios.put(`/iorTrans/submitRejVacation/${id}`)
			.then((response) => {
				console.log(data);
				setMesg(response.data);
				let updatedRecords = [...data].filter((i) => i.id !== id);
				//console.log(updatedRecords);
				setData(updatedRecords);
				setDisabled(false);
				 
			})
			.catch((error) => {
				console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}
	async function submitRejRev(id) {
		//rejection--vacation
		if (disabled)
			return;

		setDisabled(true);
		await axios.put(`/iorTrans/submitRejRevision/${id}`)
			.then((response) => {
				console.log(data);
				setMesg(response.data);
				let updatedRecords = [...data].filter((i) => i.id !== id);
				//console.log(updatedRecords);
				setData(updatedRecords);
				setDisabled(false);
				 
			})
			.catch((error) => {
				console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}
	async function submitApproveValidVacation(id) {
		//rejection--vacation
		if (disabled)
			return;

		setDisabled(true);
		await axios.put(`/iorTrans/submitApproveValidVacation/${id}`)
			.then((response) => {
				console.log(data);
				setMesg(response.data);
				let updatedRecords = [...data].filter((i) => i.id !== id);
				//console.log(updatedRecords);
				setData(updatedRecords);
				setDisabled(false);
				 
			})
			.catch((error) => {
				console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}
	async function submitApproveValidRevision(id) {
		//rejection--vacation
		if (disabled)
			return;

		setDisabled(true);
		await axios.put(`/iorTrans/submitApproveValidRevision/${id}`)
			.then((response) => {
				console.log(data);
				setMesg(response.data);
				let updatedRecords = [...data].filter((i) => i.id !== id);
				//console.log(updatedRecords);
				setData(updatedRecords);
				setDisabled(false);
				 
			})
			.catch((error) => {
				console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}
	async function rollBack(id) {
		await axios.put(`/iorTrans/rollBack/${id}`)
			.then((response) => {
				console.log(data);
				setMesg(response.data);
				let updatedRecords = [...data].filter((i) => i.id !== id);
				//console.log(updatedRecords);
				setData(updatedRecords);
				 
			})
			.catch((error) => {
				console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}
	
	async function approve(id) {
	if (disabled)
			return;

		setDisabled(true);	
			await axios.put(`/iorTrans/approveVacation/${id}`)
			.then((response) => {
				setMesg(response.data);
				let updatedRecords = [...data].filter((i) => i.id !== id);
				console.log(updatedRecords);
				setData(updatedRecords);
				setDisabled(false);
				setUpdate(!update);
			})
			.catch((error) => {
				console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}
	
	async function submit(id) {
	if (disabled)
			return;

		setDisabled(true);	
			await axios.put(`/iorTrans/submitIors/${id}`)
			.then((response) => {
				setMesg(response.data);
				setDisabled(false);
				let updatedRecords = [...data].filter((i) => i.id !== id);
				console.log(updatedRecords);
				setData(updatedRecords);
				
				setUpdate(!update);
			})
			.catch((error) => {
				console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}
	
	async function approveOccupation(id) {
	if (disabled)
			return;

		setDisabled(true);	
			await axios.put(`/iorTrans/approveIors/occupation/${id}`)
			.then((response) => {
				setMesg(response.data);
				setDisabled(false);

				let updatedRecords = [...data].filter((i) => i.id !== id);
				console.log(updatedRecords);
				setData(updatedRecords);
				setUpdate(!update);
			})
			.catch((error) => {
				console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}
	
	 
	 
 
	const updateCheckBoxAll = (e) => {
		// console.log("..."+e.target.checked+"--"+index);

		let newData = [...data];
		for (var k in newData) {
			newData[k].select = e.target.checked;
		}
		setData(newData);


	}
	const handleCheckBox = index => (e) => {
		//console.log(Table.page)
		console.log(e.target.checked + "--" + index);



		console.log(e.target.checked);
		let item = data[index];

		item['select'] = e.target.checked;
		let newData = [...data];
		newData[index] = item;
		setData(newData);



	}
	 
	const columns = useMemo(() => [

		 

		{
			Header: 'Action',
			Cell: ({ row }) => (
				<div>
				<div>
				
					{((optionType==='occ') &&  usrLevel<30 && 
					(row.original.transactionType!=null && row.original.transactionType==='S')) &&
						<Link to={"/iorTrans/reject/" + row.original.id}>
							<button className=" w-16 m-0 p-0 " > Reject </button>
						</Link>
					}
				</div>
				<div>
				 
					{(usrLevel<30 && (row.original.transactionType!==null && row.original.transactionType==='M')
					&& row.original.recordStatus!=='V' && row.original.auditorDate===null && optionType!=='vac') &&
						<Link to={"/iorTrans/" + row.original.id}>
							<button className=" w-16 m-0 p-0 " > Edit </button>
						</Link>
					}
				</div>
				<div>
				 
					{(usrLevel<30 && (row.original.transactionType!==null && row.original.transactionType==='M')
					&& row.original.recordStatus!=='V' && row.original.auditorDate===null && optionType==='vac') &&
						<Link to={"/iorTrans/vacation/" + row.original.id}>
							<button className=" w-16 m-0 p-0 " > Edit </button>
						</Link>
					}
				</div>
				<div>
				
					{(optionType==='occ') && usrLevel===30 && row.original.recordStatus==='R' &&
						<Link to={"/iorTrans/reject/" + row.original.id}>
							<button className=" w-24 m-0 p-0 " > Reject-Edit </button>
						</Link>
					}
				</div>
				 
				<div>
				
					{(usrLevel===30 && optionType==='occ' && (row.original.transactionType!==null && 
					row.original.transactionType==='M') && row.original.action!=null && row.original.action==='submission') &&
						<button
						className="w-18 m-0 p-0 bg-yellow-500 hover:bg-yellow-700 "
						onClick={() => submit(row.original.id)}
					>	Submit 	</button>
					}
				</div>
				<div>
				
					{(usrLevel>30 && optionType==='occ' && (row.original.transactionType!==null && 
					row.original.transactionType==='M') && row.original.action!=null && row.original.action==='approval') &&
						<button
						className="w-18 m-0 p-0 bg-yellow-500 hover:bg-yellow-700 "
						onClick={() => approveOccupation(row.original.id)}
					>	Approve 	</button>
					}
				</div>
				
				<div>
				
					{(optionType==='occ') && usrLevel>=30 && row.original.recordStatus==='V' &&
						<button
						className="w-18 m-0 p-0 bg-gray-500 hover:bg-gray-700 "
						onClick={() => rollBack(row.original.id)}
					>	Roll Back 	</button>
					}
					
				</div>
				{''}
				<div>
				{(optionType==='occ') && usrLevel>=30 && row.original.recordStatus==='V' 
					  && row.original.manuallyChecked===true &&
						<label
						className="w-28 m-0 p-0 bg-red-500 hover:bg-red-700 "
						 >	Original Status-I 	</label>
					}
				
				</div>
				<div>
				
					{(optionType==='occ') && usrLevel>30 && row.original.recordStatus==='R' &&
						<Link to={"/iorTrans/reject/" + row.original.id}>
							<button className=" w-24 m-0 p-0 " > Reject-Edit </button>
						</Link>
					}
				</div>				
				<div>
				{(optionType==='vac' && ((usrLevel<30 && row.original.recordStatus==='P') ||
				(usrLevel>=30 && row.original.recordStatus==='R')))&&
					<Link to={"/iorTrans/vacationValidate/" + row.original.id}>
							<button className=" w-16 m-0 p-0 " > Edit </button>
						</Link>
								
				}
				</div>
				<div>
				{(optionType==='rev' && ((usrLevel<30 && row.original.recordStatus==='P') ||
				(usrLevel>=30 && row.original.recordStatus==='R')))&&
					<Link to={"/iorTrans/revisionValidate/" + row.original.id}>
							<button className=" w-16 m-0 p-0 " > Edit </button>
						</Link>
								
				}
				</div>
				
				<div>
				{(optionType==='vac' && usrLevel===30 && row.original.recordStatus==='V' && 
				(row.original.action!==null && row.original.action==='submission')) &&
					<button
						className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
						onClick={() => submitApproveValidVacation(row.original.id)}
					>	Submit Vac	</button>
								
				}
				</div>
				<div>
				{(optionType==='rev' && usrLevel===30 && row.original.recordStatus==='V' &&
				(row.original.action!==null && row.original.action==='submission'))&&
					<button
						className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
						onClick={() => submitApproveValidRevision(row.original.id)}
					>	Submit Rev	</button>
								
				}
				</div>
				<div>
				{(optionType==='vac' && usrLevel===30 && row.original.recordStatus==='V' &&
				(row.original.action!==null && row.original.action==='submission')) &&
					<Link to={"/iorTrans/vacationValidate/" + row.original.id}>
							<button className=" w-30 m-0 p-0 " > View Vac Details </button>
						</Link>
								
				}
				</div>
				<div>
				{(optionType==='vac' && usrLevel>30 && row.original.recordStatus==='V' &&
				(row.original.action!==null && row.original.action==='approval')) &&
					<Link to={"/iorTrans/vacationValidate/" + row.original.id}>
							<button className=" w-30 m-0 p-0 " > View Vac Details </button>
						</Link>
								
				}
				</div>
				<div>
				{(optionType==='rev' && usrLevel===30 && row.original.recordStatus==='V' &&
				(row.original.action!==null && row.original.action==='submission')) &&
					<Link to={"/iorTrans/revisionValidate/" + row.original.id}>
							<button className=" w-30 m-0 p-0 " > View Rev Details </button>
						</Link>
								
				}
				</div>
				<div>
				{(optionType==='rev' && usrLevel>30 && row.original.recordStatus==='V' &&
				(row.original.action!==null && row.original.action==='approval')) &&
					<Link to={"/iorTrans/revisionValidate/" + row.original.id}>
							<button className=" w-30 m-0 p-0 " > View Rev Details </button>
						</Link>
								
				}
				</div>
				<div>
				{(optionType==='vac' && usrLevel===30 && row.original.recordStatus==='R') &&
					<button
						className="w-20 m-0 p-0 bg-red-500 hover:bg-red-700 "
						onClick={() => submitRejVac(row.original.id)}
					>	Submit Rej Vac	</button>
								
				}
				</div>
				<div>
				{(optionType==='rev' && usrLevel===30 && row.original.recordStatus==='R') &&
					<button
						className="w-20 m-0 p-0 bg-red-500 hover:bg-red-700 "
						onClick={() => submitRejRev(row.original.id)}
					>	Submit Rej Rev	</button>
								
				}
				</div>
				<div>
				{(optionType==='vac' && usrLevel>30 && row.original.recordStatus==='V' &&
				(row.original.action!==null && row.original.action==='approval')) &&
					<button
						className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
						onClick={() => submitApproveValidVacation(row.original.id)}
					>	Approve Vac	</button>
								
				}
				</div>
				<div>
				{(optionType==='rev' && usrLevel>30 && row.original.recordStatus==='V' &&
				(row.original.action!==null && row.original.action==='approval')) &&
					<button
						className="w-28 m-0 p-0 bg-red-500 hover:bg-red-700 "
						onClick={() => submitApproveValidRevision(row.original.id)}
					>	Approve Rev	</button>
								
				}
				</div>
			{/*}	<div>
				{(optionType==='vac' && usrLevel>30 && row.original.recordStatus==='R') &&
	 				<button
						className="w-20 m-0 p-0 bg-red-500 hover:bg-red-700 "
						onClick={() => approve(row.original.id)}
					>	Approve Rej 	</button>
								
				}
				</div>*/}
					 
				</div>
			)
		},


		{
			Header: "Officer Details",
			accessor: "cdaoNo",

			Cell: ({ row }) => (
				<div>
					<div>
						<label>CdaO No : {row.original.cdaoNo} -- {row.original.checkDigit}</label>
					</div>
					<div>
						<label>Personal No : {row.original.personelNo}</label>
					</div>
					<div>
						{row.original.employee &&
							<label>Officer Name : {row.original.employee.officerName}</label>
						}
					</div>
					<div>
						{row.original.employee &&
							<label>Rank : {row.original.employee.rank.rankName}</label>
						}
					</div>
				</div>
			),
		},

		{
			Header: "Rent Details",
			accessor: "uabsoCode",

			Cell: ({ row }) => (
				<div>
					<div>
						<label>Uabso Code : {row.original.uabsoCode}</label>
					</div>
					<div>
						<label>Building No : {row.original.buildingNo}</label>
					</div>
					<div>
						<label>Station : {row.original.station}</label>
					</div>
					<div>
						{row.original.employee &&
							<label>Rank : {row.original.employee.rank.rankName}</label>
						}
					</div>
				</div>
			),
		},



		{
			Header: "Occupation Date",
			accessor: 'occupationDate',
			Cell: ({ row }) => (
				<div>
					<label>{row.original.occupationDate}</label>
				</div>
			),
		},

		{
			Header: "Vacation Date",
			accessor: 'vacationDate',
			Cell: ({ row }) => (
				<div>
					<label>{row.original.vacationDate}</label>
				</div>
			),
		},

		{
			Header: "Rent Bill Details",
			accessor: "rentBillNo",

			Cell: ({ row }) => (
				<div>
					<div>
						<label>Reference Bill No : {row.original.referenceBillNo}</label>
					</div>
					<div>
						<label>Reference Bill Date : {row.original.referenceBillDate}</label>
					</div>
					<div>
						<label>Rent Bill No : {row.original.rentBillNo}</label>
					</div>
					<div>
						<label>Rent Bill Date : {row.original.rentBillDate}</label>
					</div>
				</div>
			),
		},
		{
			Header: "Rent Amount Total",
			accessor: "rentAmountTotal",
			Filter: SelectColumnFilter,
            filter: "rentAmountTotal",

			Cell: ({ row }) => (
				<div>
					 {row.original.rentAmountTotal &&
					<div>
						<label>Rent Amount Debit : {row.original.rentAmountTotal}</label>
					</div>
					}
					 {row.original.rentAmountCr &&
					<div>
						<label>Rent Amount Credit : {row.original.rentAmountCr}</label>
					</div>
					}
				</div>
			),
		},
		{
			Header: "Furniture Total Amount",
			accessor: "furAmountTotal",
			Filter: SelectColumnFilter,
            filter: "furAmountTotal",

			Cell: ({ row }) => (
				<div>
					 {row.original.furAmountTotal &&
					<div>
						<label>Fur Amount Debit : {row.original.furAmountTotal}</label>
					</div>
					}
					 {row.original.furAmountCr &&
					<div>
						<label>Fur Amount Credit : {row.original.furAmountCr}</label>
					</div>
					}
					 
				</div>
			),
		},

		{
			Header: "Licence Fee Details",
			accessor: "lfeeAmount",
			Filter: SelectColumnFilter,
            filter: "lfeeAmount",

			Cell: ({ row }) => (
				<div>
					<div>
						<label>Lf From Date : {row.original.lfeeFromDate}</label>
					</div>
					<div>
						<label>Lf To Date : {row.original.lfeeToDate}</label>
					</div>
					<div>
						<label>Lf Amount : {row.original.lfeeAmount}</label>
					</div>
				</div>
			),
		},
		{
			Header: "Furniture Details",
			accessor: "furAmount",
			Filter: SelectColumnFilter,
            filter: "furAmount",

			Cell: ({ row }) => (
				<div>
					<div>
						<label>Fur From Date : {row.original.furFromDate}</label>
					</div>
					<div>
						<label>Fur To Date : {row.original.furToDate}</label>
					</div>
					<div>
						<label>Fur Amount : {row.original.furAmount}</label>
					</div>
					<div>
						<label>Excess Fur From Date : {row.original.excessFurFromDate}</label>
					</div>
					<div>
						<label>Excess Fur To Date : {row.original.excessFurToDate}</label>
					</div>
					<div>
						<label>Excess Fur Amount : {row.original.excessFurAmount}</label>
					</div>
				</div>
			),
		},

		 

		{
			Header: "Electricity Details",
			accessor: "powerAmount",

			Cell: ({ row }) => (
				<div>
					<div>
						<label>Water Amount : {row.original.waterAmount}</label>
					</div>
					<div>
						<label>Light Amount : {row.original.lightAmount}</label>
					</div>
					<div>
						<label>Power Amount : {row.original.powerAmount}</label>
					</div>
				</div>
			),
		},

		{
			Header: "Servant Details",
			accessor: "servantQrAmount",

			Cell: ({ row }) => (
				<div>
					<div>
						<label>Servant Amount : {row.original.servantQrAmount}</label>
					</div>
					<div>
						<label>Garage Amount : {row.original.garageAmount}</label>
					</div>

				</div>
			),
		},

		{
			Header: "Upload File Name",
			accessor: 'uploadFileName',
			Cell: ({ row }) => (
				<div>
					<label>{row.original.uploadFileName}</label>
				</div>
			),
		},

		{
			Header: "Rejection Reason",
			accessor: 'rejectionReason',
		},
		{
			Header: "Approved",
			accessor: 'approved',
			Cell: ({ row }) => (
				<div>

					{data[row.index]['approved'] === true ? 'Y' : 'N'}
				</div>
			)
		},


		{
			Header: "Record Status",
			accessor: 'recordStatus',
			Filter: SelectColumnFilter,
            filter: "recordStatus",
		},

		{
			Header: "Manually Checked",
			accessor: 'mc',
			Filter: SelectColumnFilter,
            filter: "mc",
             
            Cell: ({ row }) => (
				<div>

					{data[row.index]['mc'] === true ? 'Y' : 'N'}
				</div>
			)
		},
		{
			Header: "Transaction Type",
			accessor: 'transactionType',
			Filter: SelectColumnFilter,
            filter: "transactionType",
		},
		{
			Header: "Reason",
			accessor: 'reason',
		},

		{
			Header: "Remarks",
			accessor: 'remarks',
		},



	], [data])
 

	

	const handleSubmit = (event) => {
	//	event.preventDefault();
	//	console.log(event.target.value);
	//	setSearch(event.target.value);

	}

	const handleKeyPress = (event) => {
		// look for the `Enter` keyCode
		if (event.keyCode === 13 || event.which === 13) {
			handleSubmit(event)
		}
	}
	const handleP = (pp) => {
		console.log(pp);
		setPage(pp);
	}
	const handlePageSize = (pp) => {
		console.log(pp);
		//   setPageSize(pp);
	};

	const handleCrList = (event) => {

		setValidate(true);

	}
	const handleOccVac = (event) => {

		setOccVacList(true);

	}
	
	function refresh(){ 
    window.location.reload(); 
}
	 

	const handleOccVacChange = (e) => {
		console.log(e.target.value);
		setOptionType(e.target.value);

	};
	
	const returnToList = () => {
    history.push("/iorTrans");
  };
	return (
		<div className={lightTheme ? 'theme-light' : 'theme-dark'} style={disabled ?{pointerEvents: "none",opacity :"0.4"}:{}}>
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
					<h1 className="text-xl font-semibold">Initial Occupation Return Transactions-Manual-(IOR)</h1>
					<div className="text-red-500">{mesg}</div>
			{/*		{usrLevel > 30 &&
						<>
							<div className="text-red-500">Total Valid Records:{validRec}</div>
							<div className="text-red-500">Total Invalid Records:{invalidRec}</div>
						</>
					}*/}
					<div className="flexContainer">

						<div>
							<input type="text" name="search" placeholder="Cdao No"
								onBlur={e => setSearch(e.target.value)}
							//	onBlur={handleSubmit}
								className="pl-2 -ml-2 inputField flex-initial" />
						</div>
						
						

						 
						<div>



							<select name="rentType" placeholder="rent type" className="form-control py-0"
								onBlur={e => setRentType(e.target.value)} onChange={handleOccVacChange} >
								<option value="select">--Select--</option>
								<option key="1" value="occ">Occupation</option>
								<option key="2" value="vac">Vacation</option>
								<option key="3" value="rev">Revision</option>


							</select>
						</div>
						
						<div>
							<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>

						</div>

						 
						 
						 <div className="px-4">
              <button type="submit" onClick={returnToList}>
                Return
              </button>
            </div>
						
						 
						
						 
						
						<div>
							
						<button type="button" onClick={refresh}  className="w-20 m-0 p-0 bg-red-500 hover:bg-red-700 ">
				 						Refresh</button>
							
						</div>
						 
		 
					</div>
					
					 
					
					<div className="-mt-2 max-h-1 py-0 ml-0">

						<TablePageAdj columns={columns} data={data} newpage={page} parentCallback={handleP}
							parentCallbackPageSize={handlePageSize} className="table-auto" />
				 
					</div>
				 
				 
					</div>

			</main>
		</div>
		</div>
	);
}

export default withRouter(IorManualEntryList);

