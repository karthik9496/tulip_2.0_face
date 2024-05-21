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
  
 

 

const schema = yup.object({
	 
	 
	
	 
});

 

const PrintDebitAdjReport = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	 
 
 	const [data,setData]=useState([]);
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	 
	 
	const [loading, setLoading] = useState(true);
	 const [mesg,setMesg]=useState();
	 
	const [key, setKey] = useState('Page1');
	 const [disabled,setDisabled]=useState(false);
	 const [monthStr,setMonthStr]=useState('');
 
	
 

	 
		 
		async function fetchData() {
			 
		 			console.log(">>>>>>Month--:" + monthStr);
				await axios.get(`/cbillTadaLtcs/${monthStr}/printDebitClaims`)
					.then((response) => {
						 
						console.log(response.data);
						 const url = window.open(`${process.env.REACT_APP_BASE_URL}/files/${response.data}`);
						 setDisabled(false);
    
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
		 


 

	const onError = (errors, e) => console.log(errors, e);

	//All foreign keys. 
	// XXXXXX Add search fields and adjust the values as necessary
	 
	 
	const errorCallback = (err) => {
		//console.log(err);
		setServerErrors(err);
	}
	
	 
	 

 
	 const handleInputMonthEndingChange =  (e) =>{
		   
		   console.log(e.target.value);
			 //setFromDate(e.target.value);	
			 
			 setMonthStr(e.target.value);
		 
	}
	
	  
	 
	   
	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className=" ">
					 

					<h1 className="text-xl font-semibold ml-4">Debit Adjustment Report</h1>

					<div>
						<input type="text" name="Month" placeholder="mmyyyy"
						onChange={e=>handleInputMonthEndingChange(e)}							 
							className="form-control py-0" />
							</div>
					<div  
							 
							className="pl-1 -ml-2 inputField flex-initial" />
						<button type="submit" onClick={fetchData} className="w-48 m-0 p-0">Generate Debit Report</button>
						 					
					</div>	


				 
				 
			</main>

		</div>
	);
};
 

export default withRouter(PrintDebitAdjReport);