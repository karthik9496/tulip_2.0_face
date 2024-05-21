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


const CheckBulkProcessor = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [key, setKey] = useState('page1');
	const [bulkProcessor,setBulkProcessor]=useState('');
	 
	const [changeType,setChangeType]=useState('');
	const [incrDate,setIncrDate]=useState('');
	const [oldIncrDate,setOldIncrDate]=useState('');
	const [disabled,setDisabled]=useState(false);
	const [changeStatus,setChangeStatus]=useState('')
	let empdet='';
	
	useEffect(() => {
	 
		 async function fetchMe() {
	 
		await axios.get(`/miscs/bulkProcessor/status`)
			.then((response) => {
				//console.log(data);
				 setBulkProcessor(response.data);
			})
			.catch((error) => {
				setDisabled(false);
				console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}

			fetchMe();
			 
		

	}, []);

 
async function process() {
	 
	if(disabled)
		return;
		 
		 
			
		setDisabled(true);
		 
		axios.put(`/miscs/bulkProcessor/changeStatus/${changeStatus}`)
		.then((response) => {	 
			setDisabled(false);
			 console.log(response.data);
			   if(response.data && (response.data==='Free' || response.data==='Busy'))
			   		setBulkProcessor(response.data);
			  	setServerErrors(response.data);
			    setDisabled(false);
       
		});
	}
	
 

	const onError = (errors, e) => console.log(errors, e);

 
 
	const errorCallback = (err) => {
		//console.log(err);
		setServerErrors(err);
	}
	
	const handleSelect = (e) => {
		console.log(e.target.value);
		setChangeStatus(e.target.value);
		
	};

	 
	return (
		<div className="max-w-xl mx-auto ">
			<div className="w-full w-3/4  mx-auto " >

				<form>
					<h1 >Bulk Processor - Through Quartz Scheduling </h1>
					<div className="text-red-500">{serverErrors}</div>
					<Tabs
						id="PaoEdit"
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className="mb-3"
					>
						<Tab eventKey="page1" title="Page 1" className="h-120">
							<div className="grid grid-cols-1 gap-0">
								<div>
									<label>Bulk Processor Status</label>
									<input type="text" name="me" value={bulkProcessor}/> 
									 
								</div>
								
						         
									<div >
						 
									 
								<label>Change Status</label>
									 <select name="absType" value={changeStatus} className="form-control py-0" onChange={handleSelect}>
									  <option value="0">--select---</option>
									 <option value="Free">Free</option>
									 <option value="Busy">Busy</option>
									     
									 
									 </select>
									
									 
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
						
					<div>
						<button type="button" onClick={process} disabled={disabled} >
						{disabled && (
						<span className="spinner-grow spinner-grow-sm"></span>
					)
						
					}
						Update</button>
					</div>

				</form>
			</div>
		</div>
	);
};

export default withRouter(CheckBulkProcessor);