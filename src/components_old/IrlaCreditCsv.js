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

 

const IrlaCreditCsv = () => {
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
	 
	const [me,setMe]=useState('');
	 
	const [loading, setLoading] = useState(true);
	 const [fileName,setFileName]=useState('');
	 
	const [key, setKey] = useState('Page1');
 
	
 

 

 

	const onError = (errors, e) => console.log(errors, e);

	//All foreign keys. 
	// XXXXXX Add search fields and adjust the values as necessary
	 
	 
	const errorCallback = (err) => {
		//console.log(err);
		setServerErrors(err);
	}
	
	const handleInputChange =  (e) =>{
		   
		   console.log(e.target.value);
			 setMe(e.target.value);	
		 
	}
	
	 
	 const generateCsv = () => {
		 
		let saving = false;
		console.log(me);
		async function csvFile() {
			if (!saving)
				axios.get(`/ndcs/csv/irlaCredit/${me}`)
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
		csvFile();

		return () => { saving = true; }
	}
	 
	 
	  
	 
	   
	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className=" ">
					 

					<h1 className="text-xl font-semibold ml-4">IRLA Credit CSV</h1>
					<div className="flexContainer">
						<input type="text" name="search" placeholder="Month(mmyyyy)"
						onChange={e=>handleInputChange(e)}
							 
							className="pl-2 -ml-2 inputField flex-initial" />
						<button type="submit" onClick={generateCsv} className="w-32 m-0 p-0">Generate CSV</button>
						 					
					</div>		
					 


				</div>
				 
			</main>

		</div>
	);
};
 

export default withRouter(IrlaCreditCsv);