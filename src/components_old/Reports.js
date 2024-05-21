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


const Reports = () => {
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
	 
	const [changeType,setChangeType]=useState('');
	const [incrDate,setIncrDate]=useState('');
	const [oldIncrDate,setOldIncrDate]=useState('');
	const [disabled,setDisabled]=useState(false);
	const [reportType,setReportType]=useState('')
	const [pliType,setPliType]=useState('0');
	const [expType,setExpType]=useState('');
	const [expSubType,setExpSubType]=useState('');
	const [taskNo,setTaskNo]=useState([]);
	const [loading,setLoading]=useState('');
	const [task,setTask]=useState('');
	const [amount,setAmount]=useState(0);
	const [month,setMonth]=useState('');
	const [arrAmt,setArrAmt]=useState('');
	const [selectedFile,setSelectedFile]=useState();
	const [fromDate,setFromDate]=useState('');
	const [year,setYear]=useState('');
	const [schType,setSchType]=useState('0');
	
	let empdet='';
	
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
			 alert("Report Type not selected");
			 return;
		 }
		 
		   
			
		setDisabled(true);
		
		//for nps schedule
		
		 if(reportType==='nps')
		axios.get(`/reports/npsSchedule`)
		.then((response) => {	 
			setDisabled(false);
			 console.log(response.data);
			   let fname=response.data[0];
			  	setServerErrors(response.data);
			    setDisabled(false);
			    
			    if(fname!=null && fname.length>0){
			axios({
			url: `/reports/nps/load/` + fname, 
			method: 'GET',
			responseType: 'blob', // important
		}).then((res) => {
			//console.log(response.data);
			const url =URL.createObjectURL(new Blob([res.data],{type:"application/pdf"}));
			const pdfWindow=window.open();
			pdfWindow.location.href=url;
			const link=pdfWindow.location.href;
			//const link = document.createElement('a');
			//link.href = url;
			link.setAttribute('download', fname);
		 
			//document.body.appendChild(link);
			link.click();
		});
		}
       
		});
		
			//for agis schedule
			
				 if(reportType==='agis')
		axios.get(`/reports/agiSchedule`)
		.then((response) => {	 
			setDisabled(false);
			 console.log(response.data);
			   let fname=response.data[0];
			  	setServerErrors(response.data);
			    setDisabled(false);
			    
			    if(fname!=null && fname.length>0){
			axios({
			url: `/reports/agis/load/` + fname, 
			method: 'GET',
			responseType: 'blob', // important
		}).then((res) => {
			//console.log(response.data);
			const url =URL.createObjectURL(new Blob([res.data]));
			const pdfWindow=window.open();
			pdfWindow.location.href=url;
			const link=pdfWindow.location.href;
			//const link = document.createElement('a');
			//link.href = url;
			link.setAttribute('download', fname);
		 
			//document.body.appendChild(link);
			link.click();
		});
		}
       
		});
		
				//for agis flying pay schedule
			
				 if(reportType==='flpay')
		axios.get(`/reports/agiFlPaySchedule`)
		.then((response) => {	 
			setDisabled(false);
			 console.log(response.data);
			   let fname=response.data;
			  	setServerErrors(response.data);
			    setDisabled(false);
			    
			    if(fname!=null && fname.length>0){
			axios({
			url: `/reports/agisFlPay/load/` + fname, 
			method: 'GET',
			responseType: 'blob', // important
		}).then((res) => {
			//console.log(response.data);
			const url =URL.createObjectURL(new Blob([res.data]));
			const pdfWindow=window.open();
			pdfWindow.location.href=url;
			const link=pdfWindow.location.href;
			//const link = document.createElement('a');
			//link.href = url;
			link.setAttribute('download', fname);
		 
			//document.body.appendChild(link);
			link.click();
		});
		
		
		
		
		}
       
		});		
		
		
						//for cgeis schedule
			
				 if(reportType==='cgeis')
		axios.get(`/reports/cgeisSchedule`)
		.then((response) => {	 
			setDisabled(false);
			 console.log(response.data);
			   let fname=response.data;
			  	setServerErrors(response.data);
			    setDisabled(false);
			    
			    if(fname!=null && fname.length>0){
			axios({
			url: `/reports/cgeis/load/` + fname, 
			method: 'GET',
			responseType: 'blob', // important
		}).then((res) => {
			//console.log(response.data);
			const url =URL.createObjectURL(new Blob([res.data]));
			const pdfWindow=window.open();
			pdfWindow.location.href=url;
			const link=pdfWindow.location.href;
			//const link = document.createElement('a');
			//link.href = url;
			link.setAttribute('download', fname);
		 
			//document.body.appendChild(link);
			link.click();
		});
		
		
		
		
		}
       
		});	 
		
		//agi loan schedule
					 if(reportType==='loan')
		axios.get(`/reports/agiLoanSchedule`)
		.then((response) => {	 
			setDisabled(false);
			 console.log(response.data);
			   let fname=response.data[0];
			  	setServerErrors(response.data);
			    setDisabled(false);
			    
			    if(fname!=null && fname.length>0){
			axios({
			url: `/reports/agisLoanSch/load/` + fname, 
			method: 'GET',
			responseType: 'blob', // important
		}).then((res) => {
			//console.log(response.data);
			const url =URL.createObjectURL(new Blob([res.data]));
			const pdfWindow=window.open();
			pdfWindow.location.href=url;
			const link=pdfWindow.location.href;
			//const link = document.createElement('a');
			//link.href = url;
			link.setAttribute('download', fname);
		 
			//document.body.appendChild(link);
			link.click();
		});
		
		
		
		
		}
       
       
		});	
		 if(reportType==='it')
		axios.get(`/reports/itRecvySchedule/csv`)
		.then((response) => {	 
			setDisabled(false);
			 console.log(response.data);
			   let fname=response.data[0];
			  	setServerErrors(response.data);
			    setDisabled(false);
			    
			    if(fname!=null && fname.length>0){
			axios({
			url: `/reports/itRecvy/load/` + fname, 
			method: 'GET',
			responseType: 'blob', // important
		}).then((res) => {
			const url =URL.createObjectURL(new Blob([res.data]));
			const pdfWindow=window.open();
			pdfWindow.location.href=url;
			const link=pdfWindow.location.href;
			//const link = document.createElement('a');
			//link.href = url;
			link.setAttribute('download', fname);
		 
			//document.body.appendChild(link);
			link.click();
		});
		
		
		
		
		}
       
		});	
	
		
		 if (reportType === "tagif")
      axios.get(`/reports/tagifSchedule`).then((response) => {
        setDisabled(false);
        console.log(response.data);
        let fname = response.data;
        setServerErrors(response.data);
        setDisabled(false);

        if (fname != null && fname.length > 0) {
          axios({
            url: `/reports/tagifSchedule/load/` + fname,
            method: "GET",
            responseType: "blob", // important
          }).then((res) => {
            //console.log(response.data);
            const url = URL.createObjectURL(new Blob([res.data]));
            const pdfWindow = window.open();
            pdfWindow.location.href = url;
            const link = pdfWindow.location.href;
            //const link = document.createElement('a');
            //link.href = url;
            link.setAttribute("download", fname);

            //document.body.appendChild(link);
            link.click();
          });
        }
      });
      
       if(reportType==='rent')
		axios.get(`/rents/reviewRent`)
		.then((response) => {	 
			setDisabled(false);
			 console.log(response.data);
			//   let fname=response.data[0];
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
		setReportType(e.target.value);
		
	};
 
	
	const handleTaskChange = (e) => {
	   
	  	setTask(e.target.value);
	  	 
	  	console.log("----Task is---:" + task);
		 
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
					<h1 >Reports</h1>
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
									<input type="text" name="me" value={me}/> 
									 
								</div>
								
						         
									<div >
						 
									 
								<label>Type</label>
									 <select name="reportType" value={reportType} className="form-control py-0" onChange={handleSelect}>
									  <option value="0">--select---</option>
									 
									 <option value="agis">Agif Schedule</option>
									 <option value="tagif">Tagif Schedule</option>
									 <option value="nps">Nps Schedule</option>
									 <option value="flpay">Agi Flying Pay Schedule</option>
									  <option value="cgeis">Cgeis Schedule</option>
									  <option value="loan">Agi Loan Schedule</option>
									    <option value="it">It Recovery Schedule</option>
									     <option value="rent">Review Rent</option> 
									   
									 
									 </select>
									
									 
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

export default withRouter(Reports);