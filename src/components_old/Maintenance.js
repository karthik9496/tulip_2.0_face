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

 

const Maintenance = () => {
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
	 
	 const [mesg,setMesg]=useState('');
	 const[disable,setDisable]=useState(false);
	 
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
	
	 
	
	 
	 const runMaintenance = () => {
		 
		let saving = false;
		if(disable)
			return;
			
		
		 
		async function pmcs() {
			setDisable(true);
			if (!saving)
				axios.put(`maintenance/runMaintenance`)
					.then((response) => {
						 
						console.log(response.data);
						setMesg(response.data);
						// const url = window.open(`${process.env.REACT_APP_BASE_URL}/files/${response.data}`);
    
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
	 
	 
	
	  
	 
	   
	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
			
				<div className=" ">
					 

					<h1 className="text-xl font-semibold ml-4">Falcon - Maintenance</h1>
					{mesg}
					<div className="flexContainer">
						  
						<button type="submit" onClick={runMaintenance} className="w-24 m-0 p-0">Maintenance</button>
						 					
					</div>		
					 


				</div>
				 
			</main>

		</div>
	);
};
 

export default withRouter(Maintenance);