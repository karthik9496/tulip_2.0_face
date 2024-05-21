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
    //  armyNo: yup.string().required('Required'),
   //   checkDigit: yup.string().required('Required'),
      
      
    
        
      
});


const AgiPaymentEdit = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [key, setKey] = useState('page1');
	
	const [option,setOption]=useState('');
	const [mesg,setMesg]=useState('');
	const [disabled,setDisabled]=useState(false);
	const [bankName,setBankName]=useState([]);
	const [ifsc,setIfsc]=useState([]);
	const [bankBranch,setBankBranch]=useState([]);
	const [accountNo,setAccountNo]=useState([]);
	const [name,setName]=useState([]);
	const [bankStation,setBankStation]=useState([]);
	
	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get('/miscPayments/' + id)
					.then((response) => {
						record = response.data;
						const fields = [
						'id', 'vendor','nok','amount', 'sectionRemarks'			
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
	
	 

	useEffect(() => {
		let fetching = false; 
		async function fetchVendorDetails() {
			if (!fetching && option){
				
				await axios.get(`/miscPayments/vendor/fetchDetails/${option}`)
					.then((response) => {
						console.log(">>>>details----:" + response.data[0]);
						setAccountNo(response.data[0]);
						setIfsc(response.data[1]);
						setBankName(response.data[2]); 
						setBankBranch(response.data[3]);
						setBankStation(response.data[4]);

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
		fetchVendorDetails();
		return () => { fetching = true; }
		 

	}, [option]);

	const onSubmit = (data, event) => {
		event.preventDefault();
		console.log(data);
		if(disabled)
			return;
			
			setDisabled(true);
		
		if (data.id) {
			axios.put("/miscPayments/" + data.id, data)
				.then((response) => { 
					setMesg(response.data);
				 
					history.push("/miscPayments");
				})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		} else {
			axios.post("/miscPayments", data)
				.then((response) => { 
					setMesg(response.data);
					
					history.push("/miscPayments");
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
	 const handleTransTypeChange = (e) => {
     console.log(e.target.value);
     setValue("transType", e.target.value);
     setOption(e.target.value);
   };
	 
const returnToList =() => {
		history.push("/miscPayments");
	}
	return (
	//	<div className="max-w-xl mx-auto ">
		//	<div className="w-full w-3/4  mx-auto " >
		<div className="min-h-screen bg-gray-200 text-gray-900">
			<div className="max-w-5xl mx-auto px-8 sm:px-6 lg:px-10 pt-4">

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Misc Payment </h1>
					 
					<div className="text-red-500">{mesg}</div>
					<Tabs
						id="MiscPaymentEdit"
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className="mb-3"
					>
						<Tab eventKey="page1" title="Page 1" className="h-120">
							<div className="grid grid-cols-2 gap-0">
							 
								  <div>
                   <label>Trans Type</label>
                   <select name="transType" className="form-control py-0"
                     {...register("transType")}  onChange={handleTransTypeChange}
                   >
                     <option value="select">--Select--</option>
                     <option key="1" value="AGIF">Agif</option>
                     <option key="2" value="TAGIF">TaAgif</option>
                     <option key="3" value="AGIHBA">Agi-Hba</option>
                     <option key="4" value="AGIMCA">Agi-Mca</option>
                     <option key="5" value="afmso">Afmso</option>
                    {/* <option key="6" value="lic">Lic</option>*/
                    }              
                      <option key="8" value="AGIPCA">Agi-Pc</option>
                       <option key="7" value="NPS">Nps</option>
                   </select>
                 </div>
                 
                 {option &&
                 <>
                 		<div>
									<label>Bank Name</label>
									<input type="text" readOnly value={bankName}/>
									 
									 
						</div>
						<div>
						<label>Ifsc</label>
							<input type="text" readOnly value={ifsc}/>
						</div>
						<div>
									<label>Bank Branch</label>
									<input type="text" readOnly value={bankBranch}/>
						</div>
						<div>
					 
									<label>Bank Account No</label>
									<input type="text" readOnly value={accountNo}/>
								
						</div>
						 </>
                 
                 }
						 
						
								<div>
									<label>Total Amount</label>
									<input type="text" name="amount" {...register("amount")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.amount?.message}</div>
								</div>
								
								
						 
								<div>
									<label>Section Remarks</label>
									<input type="text" name="sectionRemarks" {...register("sectionRemarks")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.sectionRemarks?.message}</div>
								</div>								 
								
					 
		
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
						
					<div className="grid grid-cols-3 gap-0">
					<div className="px-3 ...">
						<button type="submit" >Save</button>
					</div>
					 
					<div className="px-3 ...">
									<button type="button" onClick={returnToList}>Cancel</button>
								</div>
								<div className="px-3 ...">
									<button type="button" onClick={returnToList}>Done</button>
								</div>
								</div>

				</form>
			</div>
		</div>
	);
};

export default withRouter(AgiPaymentEdit);