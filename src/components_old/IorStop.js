/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By : 
 */

import { useState, useEffect } from "react";
import { withRouter, useParams, useHistory,useLocation ,Link} from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { format } from 'date-fns'
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



const IorStop = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	 
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
	const [empId,setEmpId]=useState('');
	const [occData,setOccData]=useState([]);
	const [occDataSubmitted,setOccDataSubmitted]=useState([]);
	const [occList,setOccList]=useState([]);
	const [rentType,setRentType]=useState('Vacation');
	const [vacId,setVacId]=useState(0);
	const [vacRej,setVacRej]=useState('');
	const [usrLevel,setUsrLevel]=useState(0);
	const {state}=useLocation(); 
	const [perNo,setPerNo]=useState('');
	const [name,setName]=useState('');
	const [occVacId,setOccVacId]=useState('');
	

 
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
		async function fetchSumittedOccData() {
			if (!fetching)
			//	console.log(">>>>Usr Level is -----:" + usrLevel);
			await axios.get('/occupationVacations/occVacData/aaoSubmittedData')
				.then((response) => {
					if(response.data['occList']!==null)
						setOccDataSubmitted(response.data['occList']);
						 

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
		fetchSumittedOccData();
		return () => { fetching = true; }

	}, []);
	useEffect(() => {
		let fetching = false;
		async function fetchEmpId() {
			if (!fetching)
				console.log(">>>>Search----cdaono is -----:" + cdaoNo);
			await axios.get(`/employees/byCdaoNo/${cdaoNo}`)
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

	}, [cdaoNo]);
	useEffect(() => {
		let fetching = false;
		async function fetchOccVacId() {
			if (!fetching)
				console.log(">>>>Search----occVac is -----:" + state);
			await axios.get(`/occupationVacations/ovmById/${state}`)
				.then((response) => {
					console.log(">>>>occvac__ID----:" + response.data);
					setVacId(response.data);
					 

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
		fetchOccVacId();
		return () => { fetching = true; }

	}, [state]);
	useEffect(() => {
		let fetching = false;
		let unmounted = false;
		async function fetchOccupationDetailsForEmployee() {
		console.log(state);

			if (!fetching)
			if(usrLevel<30){
				await axios.get(`/iorTrans/occDetails/${empId}`)
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
	}, [empId,vacId]);

	const onSubmit = (data, event) => {

		event.preventDefault();
		if (disabled)
			return;

		setDisabled(true);
	//	setButtonDisabled(true);
		console.log(data);

		 
			console.log("-----occDataSubmitted------------>:" + occDataSubmitted.length);
		if(usrLevel<30)	{ 
			axios.put(`/occupationVacations/stopIor/iors/audStop/${vacId}`)
				.then((response) => {
					setMesg(response.data);
					setDisabled(false);
				})
				.catch((error) => {
					//console.log(error.response.data);
					setServerErrors(error.response.data);
				});
				}
				else if(usrLevel===30)	{ 
			axios.put('/occupationVacations/stopIor/iors/aaoStopApprove', occDataSubmitted)
				.then((response) => {
					setMesg(response.data);
					setDisabled(false);
				})
				.catch((error) => {
					//console.log(error.response.data);
					setServerErrors(error.response.data);
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
		//console.log(errors);
		console.log(">>>" + childData.fk);

		clearErrors(childData.fk);
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
	const updateVacRejection = (e) => {
	//	let proceed = window.confirm("Have you mentioned Rejection Reason. If not, press " + "CANCEL" +  "." + "If Rejection reason mentioned press " + "OK");
	//		if (!proceed)
	//			return;
		setVacRej("R");
	 
	};	
	const handleCheck=(e)=> {
		console.log(e.target.value);
		setVacId(e.target.value);


	};
	
	const rollBack=(vacId)=>{
		console.log("-------------rollback---------:" + vacId);
			axios.put(`/occupationVacations/rollBackOvm/${vacId}`)
				.then((response) => {
					setMesg(response.data);
					setDisabled(false);
				})
				.catch((error) => {
					//console.log(error.response.data);
					setServerErrors(error.response.data);
				});
		
	}
	const handleSettlementCheckBox = index=>(e) =>{
		 
		 	  
		   console.log(e.target.checked);
			let item = occDataSubmitted[index];
		 	item['select'] = e.target.checked;
			let newData = [...occDataSubmitted];
			newData[index] = item;
			console.log("newData--:" + newData[index]);
			 
		 
		 	setOccDataSubmitted(newData);
		 	console.log("--occDataSelected--:" + occDataSubmitted.length);
	}
	const handleCdaoNoChange = (e) => {
		console.log(e.target.value);
		setCdaoNo(e.target.value);

	};

	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Initial Occupation Return--Manual Stop </h1>

					<div className="text-red-500">{mesg}</div>

					<Tabs
						id="InitialOccupationReturnTransactionVacationEdit"
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className="mb-3">

						<Tab eventKey="page1" title="IOR" className="h-120">
						 
						 <div className="container">
						 <div className="grid grid-cols-0 gap-0">
						 <div>
									<label>Month</label>
									<input type="text" value={me}/>
								</div>
							 
								 




								
								</div>

						
						{usrLevel<30 &&	 
						
						<>
						 <div className="grid grid-cols-5 gap-0">
						<div >
								<label> Cdao No</label>
									 <input type="text"  placeholder="Enter CdaoNo" onChange={handleCdaoNoChange}/>
								</div>
								<div>
								<label> Personal No</label>
									 <input type="text" value={perNo}/>
								</div>
						
								<div>
								<label> Name </label>
									<input type="text" value={name}/>
								</div>
								</div>
						<h1 className="text-blue-600" align="center">Occupation Details</h1>
						
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
                           
                    </tr>
                     {occData && occData.map(tb =>
                        <tr key={tb.occupationVacId}>
                           <td><input type="checkbox"  value={tb.occupationVacId}
                           checked={[tb.occupationVacId]['select']} onChange={handleCheck} /></td>
                           <td>{tb.occupationVacId}</td>
                            <td>{tb.bldgNo}</td>
                            <td>{tb.quarterArea}</td>
                            <td>{tb.quarterType}</td>
                            <td>{tb.station}</td>
                            <td>{tb.occupationDate && format(new Date(tb.occupationDate.toString()),'dd-MM-yyyy')}</td>
                            <td>{tb.vacationDate && format(new Date(tb.vacationDate.toString()),'dd-MM-yyyy')}</td>
                             
                            
                        </tr>
                    )}
                   
                 
                </thead>
				
				<tbody>
                   
                    {occData.length===0 &&
                    <tr>
                            <td colSpan="8" align="center">No Occupation Record Found Where Vacation Date is Null----Please Check </td>
                            
                        </tr>
                    }
                </tbody>
				
		 </table>
		 </>
		 }
		 
		 
		 {usrLevel>=30 &&	 
		 <>
		 <h1 className="text-blue-600" align="center">Occupation Details</h1>
            <table className="table table-striped table-bordered">
         
   
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>Action</th>
                        <th>Cdao No</th>
                        <th>Personel No</th>
                        <th>Officer Name</th>
                        <th>Occupation Id</th>
                        <th>Building No</th>
                        <th>Quarter Area</th>
                        <th>Quarter Type</th>
                        <th>Station</th>
                        <th>Occupation Date</th>
                        <th>Vacation Date</th>
                           
                    </tr>
                     {occDataSubmitted && occDataSubmitted.map((data,index) =>
                        <tr key={data.occupationVacId}>
                          <td><input type="checkbox" value={data.occupationVacId} onChange={handleSettlementCheckBox(index)} checked={occDataSubmitted[index]['select']}  /></td>
                          	<td> <button
						className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
						onClick={() => rollBack(data.occupationVacId)}
					>	RollBack 	</button>
							</td>
							<td>{data.cdaoNo}</td>
							<td>{data.perNo}</td>
							<td>{data.name}</td>
                           <td>{data.occupationVacId}</td>
                           <td>{data.bldgNo}</td>
                            <td>{data.quarterArea}</td>
                            <td>{data.quarterType}</td>
                            <td>{data.station}</td>
                            <td>{data.occupationDate && format(new Date(data.occupationDate.toString()),'dd-MM-yyyy')}</td>
                            <td>{data.vacationDate && format(new Date(data.vacationDate.toString()),'dd-MM-yyyy')}</td>
                             
                            
                        </tr>
                    )}
                   
                 
                </thead>
				
				 
				
		 </table>
		 </>
		 }
		 
		 
		 
		 
		 
		 <br/>
		 </div>
						 
						 
					

								<div className="grid grid-cols-2 gap-0">

								<div className="px-2">
									<button type="submit" disabled={buttonDisabled} >Save & Submit</button>
								</div>
								
								 

								
								<div className="px-4">
									<button type="done" onClick={handleButtonClick} >Done</button>
								</div>
							</div>
							 
						</Tab>


					</Tabs>
				</form>
			</div>
		</div>
	);
};

export default withRouter(IorStop);