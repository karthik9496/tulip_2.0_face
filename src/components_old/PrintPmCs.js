/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By : 
 */

import { useState, useEffect, useMemo } from "react";
import { withRouter, useParams, useHistory,Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import Table, { SelectColumnFilter } from '../utils/Table'  // 


import * as yup from "yup";

import { yupResolver } from '@hookform/resolvers/yup';
  

 import addDays from 'date-fns/addDays'

 

const schema = yup.object({
	 
	 
	
	 
});

 

const PrintPmCs = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();
	//console.log(id);

	let history = useHistory();
 
 	const [data,setData]=useState([]);
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	 
	const [dakId,setDakId]=useState('');
	 
	const [loading, setLoading] = useState(true);
	 const [fileName,setFileName]=useState('');
	 
	const [key, setKey] = useState('Page1');
	const [reportType,setReportType]=useState('');
	const [option,setOption]=useState('');
	const [dpSheetNo,setDpSheetNo]=useState('');
 	const [sectionCode,setSectionCode]=useState('');
 	const [fy,setFy]=useState('');
	
 

	useEffect(() => {
		let fetching = false;
		let unmounted = false;
		 
		async function fetchData() {
			 
			if (!fetching)
				//console.log(secId);
				await axios.get(`/pms?search='PrintPmCs'`)
					.then((response) => {
						console.log("response>>" + response.data);
						//setSh3List(response.data);
						 setData(response.data);;
						 
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

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);


 

	const onError = (errors, e) => console.log(errors, e);

	//All foreign keys. 
	// XXXXXX Add search fields and adjust the values as necessary
	 
	 
	const errorCallback = (err) => {
		//console.log(err);
		setServerErrors(err);
	}
	
	const handleInputChange =  (e) =>{
		   
		   console.log(e.target.value);
			 setDakId(e.target.value);	
		 
	}
	const handleInputDpsNoChange =  (e) =>{
		   
		   console.log(e.target.value);
			 setDpSheetNo(e.target.value);	
		 
	}
	const handlePmcsChange = (event) => {
    setReportType(event.target.value)
    setOption("pmcs");
  }
  
   const handleCsChange = (event) => {
    setReportType(event.target.value)
    setOption("cs");
  }
  
  const handleDpChange = (event) => {
    setReportType(event.target.value)
    setOption("dp");
  }
  
  const handleSectionChange =  (e) =>{
		   
		   console.log(e.target.value);
			 setSectionCode(e.target.value);	
		 
	}
	const handleFyChange =  (e) =>{
		   
		   console.log(e.target.value);
			 setFy(e.target.value);	
		 
	}
	
	 
	 const generatePmCs = () => {
		 
		let saving = false;
		console.log(dakId);
		async function pmcs() {
			if (!saving)
				axios.get(`pms/0/printPmCs/${dakId}`)
					.then((response) => {
						 
						console.log(response.data);
						 const url = window.open(`${process.env.REACT_APP_BASE_URL}/files/${response.data}`);
    
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
		pmcs();

		return () => { saving = true; }
	}
	
	 const generateCs = () => {
		 
		let saving = false;
		console.log(dpSheetNo);
		async function pmcs() {
			if (!saving)
				axios.get(`pms/printPmCs/${dpSheetNo}/${sectionCode}/${fy}/${option}`)
					.then((response) => {
						 
						console.log(response.data);
						 const url = window.open(`${process.env.REACT_APP_BASE_URL}/files/${response.data}`);
    
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
		pmcs();

		return () => { saving = true; }
	}
	 
	const download = () => {
		console.log(fileName);
		setFileName(dakId+".pdf");
		axios({
			url: `${process.env.REACT_APP_BASE_URL}/files/` + fileName, //XXXXXXXX localhost
			method: 'GET',
			responseType: 'blob', // important
		}).then((response) => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', fileName);
			document.body.appendChild(link);
			link.click();
		});
	}
	
	  
	 
	   
	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className=" ">
					 

					<h1 className="text-xl font-semibold ml-4">Print PM/CS</h1>
					<div>
					
					 <div className="grid grid-cols-3 gap-4">
					   <div>
	 <label>
	 <input type="radio" value="pmcs" checked={reportType==='pmcs'} onChange={handlePmcsChange}/> Print Pm and Chq Slip
	 </label>
	 </div>
	  
	 
	 
	 
	  <div>
	 <label>
	 <input type="radio" value="cs" checked={reportType==='cs'} onChange={handleCsChange}/> Print Consolidated Chq Slip
	 </label>
	 </div>
	 
	 <div>
	 <label>
	 <input type="radio" value="dp" checked={reportType==='dp'} onChange={handleDpChange}/> Print Summary of DP Sheet
	 </label>
	 </div>
	 
	 
	 </div>
	 <div className="flex space-x-4">
	 {option==='pmcs' &&
	 <>
	 				<div>
						<input type="text" name="search" placeholder="DakId No"
						onChange={e=>handleInputChange(e)}
							 
							className="pl-2 -ml-2 inputField flex-initial" />
							</div>
							<div>
						<button type="submit" onClick={generatePmCs} className="w-24 m-0 p-0">Print PM/CS</button>
						</div>
						</>
					}	
					
					 {(option==='cs' || option==='dp')&&
	 <>
	 				<div>
						<input type="text" name="search" placeholder="DP Sheet No"
						onChange={e=>handleInputDpsNoChange(e)}
							 
							className="pl-2 -ml-2 inputField flex-initial" />
							</div>
							<div>
						<input type="text" name="sectionCode" placeholder="Section Code"
						onChange={e=>handleSectionChange(e)}
							 
							className="pl-2 -ml-2 inputField flex-initial" />
							</div>
							<div>
						<input type="text" name="finYear" placeholder="Fin Year Start (yyyy)"
						onChange={e=>handleFyChange(e)}
							 
							className="pl-2 -ml-2 inputField flex-initial" />
							</div>
						<div><button type="submit" onClick={generateCs} className="w-32 m-0 p-0">Print Cheque Slip</button></div>
						</>
					} 		
					</div>			
					</div>		
					 


				</div>
				 
			</main>

		</div>
	);
};
 

export default withRouter(PrintPmCs);