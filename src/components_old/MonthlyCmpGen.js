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


const MonthlyCmpGen = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [key, setKey] = useState('page1');
	const [me,setMe]=useState('');
	 
	 
	const [disabled,setDisabled]=useState(false);
	const [reportType,setReportType]=useState('')
	 
	const [month,setMonth]=useState('');
 	const [selectedFile,setSelectedFile]=useState();
	const [fromDate,setFromDate]=useState('');
	 
	
	 
	useEffect(() => {
	 
		 async function fetchMe() {
	 	 
		await axios.get(`/miscs/me/currentMe`)
			.then((res) => {
				//console.log(data);
				 
				 setMe(res.data);
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
		 
		 if(reportType && reportType.length>1){
			 ;
		 }else{
			 alert("File Type not selected");
			 return;
		 }
		  	
		setDisabled(true);
		 
		 if(reportType==='sal'){
			 		 console.log("--fromDate--:" + fromDate);
		axios.post(`/paySummarys/cmpFile/monthlyPay/${fromDate}`)
		.then((response) => {	 
			setDisabled(false);
			 console.log(response.data);
			   let fname=response.data;
			  	setServerErrors(response.data);
			    setDisabled(false);
			    
			    
       
		});
		}
		
		 if(reportType==='fama'){
			 		 console.log("--fromDate--:" + fromDate);
		axios.post(`/paySummarys/cmpFile/fama/${fromDate}`)
		.then((response) => {	 
			setDisabled(false);
			 console.log(response.data);
			   let fname=response.data;
			  	setServerErrors(response.data);
			    setDisabled(false);
			    
			    
       
		});
		}
		 if(reportType==='pm'){
			 		 console.log("--fromDate--:" + fromDate);
		axios.post(`/paySummarys/pm`)
		.then((response) => {	 
			setDisabled(false);
			 console.log(response.data);
			   let fname=response.data;
			  	setServerErrors(response.data);
			    setDisabled(false);
			    
			    
       
		});
		}
		
		 if(reportType==='pm1'){
			 		 console.log("--fromDate--:" + fromDate);
		axios.post(`/paySummarys/pm1`)
		.then((response) => {	 
			setDisabled(false);
			 console.log(response.data);
			   let fname=response.data;
			  	setServerErrors(response.data);
			    setDisabled(false);
			    
			    
       
		});
		}
		if(reportType==='exp-ar'){
 		axios.post(`/paySummarys/exp/ar`)
		.then((response) => {	 
			setDisabled(false);
			 console.log(response.data);
			   let fname=response.data;
			  	setServerErrors(response.data);
			    setDisabled(false);
			    
			    
       
		});
		}
		if(reportType==='exp-nsg'){
 		axios.post(`/paySummarys/exp/nsg`)
		.then((response) => {	 
			setDisabled(false);
			 console.log(response.data);
			   let fname=response.data;
			  	setServerErrors(response.data);
			    setDisabled(false);
			    
			    
       
		});
		}
			if(reportType==='exp-nsg-cdao'){
 		axios.post(`/paySummarys/nsg/cdaowise`)
		.then((response) => {	 
			setDisabled(false);
			 console.log(response.data);
			   let fname=response.data;
			  	setServerErrors(response.data);
			    setDisabled(false);
			    
			    
       
		});
		}
		if(reportType==='exp-ar-cdao'){
 		axios.post(`/paySummarys/ar/cdaowise`)
		.then((response) => {	 
			setDisabled(false);
			 console.log(response.data);
			   let fname=response.data;
			  	setServerErrors(response.data);
			    setDisabled(false);
			    
			    
       
		});
		}
		if(reportType==='exp-650-cdao'){
 		axios.post(`/paySummarys/650/cdaowise`)
		.then((response) => {	 
			setDisabled(false);
			 console.log(response.data);
			   let fname=response.data;
			  	setServerErrors(response.data);
			    setDisabled(false);
			    
			    
       
		});
		}
		
		if(reportType==='exp-650'){
 		axios.post(`/paySummarys/exp/650`)
		.then((response) => {	 
			setDisabled(false);
			 console.log(response.data);
			   let fname=response.data;
			  	setServerErrors(response.data);
			    setDisabled(false);
			    
			    
       
		});
		}
		 if(reportType==='abstract'){
			 		 console.log("--fromDate--:" + fromDate);
		axios.post(`/paySummarys/abstract`)
		.then((response) => {	 
			setDisabled(false);
			 console.log(response.data);
			   let fname=response.data;
			  	setServerErrors(response.data);
			    setDisabled(false);
			    
			    
       
		});
		}
		 
 
	}
	
 

	const onError = (errors, e) => console.log(errors, e);

 
 
	const errorCallback = (err) => {
		//console.log(err);
		setServerErrors(err);
	}
	
	const handleSelect = (e) => {
		console.log(e.target.value);
		setReportType(e.target.value);
		
	};
	 
	 
	const handleInputChange =(e) =>{
		e.preventDefault();
	console.log(e);
		setSelectedFile(e.target.files[0]);
		console.log(selectedFile);
		
	}

	 
	return (
		<div className="max-w-xl mx-auto ">
			<div className="w-full w-3/4  mx-auto " >

				<form>
					<h1 >Salary File Generation</h1>
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
									<label>Month</label>
									<input type="text" name="me" placeholder="mmyyyy" value={me}/> 
									 
								</div>
								
						         
									<div >
						 
									 
								<label>Type</label>
									 <select name="reportType" value={reportType} className="form-control py-0" onChange={handleSelect}>
									  <option value="0">--select---</option>
									 
									 <option value="sal">Monthly Salary</option>
									 <option value="fama">Fama</option>
									 <option value="abstract">Abstract</option>
									 <option value="pm">PM-4</option>
									 <option value="pm1">PM-1</option>
									  <option value="exp-ar">Exp Report - Assam Rifles</option>
									  <option value="exp-nsg">Exp Report - NSG</option>
									 
									  <option value="exp-650">Exp Report - 650 Coy</option>
									   <option value="exp-ar-cdao">Exp Report Cda Wise - AR</option>
									   <option value="exp-nsg-cdao">Exp Report Cda Wise - NSG</option>
									    <option value="exp-650-cdao">Exp Report Cda Wise - 650 Coy</option>
									   
									 </select>
									
									 
								</div>
								 
						  	
								 
						<div >
							<b>Npb Date</b>
							<div>
							<input type="text" name="fname" placeholder="ddMMyyyy" onChange={e => setFromDate(e.target.value)} />
							</div>
							
						</div> 
								 
		
							</div>
						</Tab>

						 
					 
											
					</Tabs>
						
					<div>
						<button type="button" onClick={process} disabled={disabled} >
						{disabled && (
						<span className="spinner-grow spinner-grow-sm"></span>
					)
						
					}
						Generate</button>
					</div>

				</form>
			</div>
		</div>
	);
};

export default withRouter(MonthlyCmpGen);