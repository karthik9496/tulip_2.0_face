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
import {downloadPdf} from '../utils/PdfUtility';



import * as yup from "yup";

import { yupResolver } from '@hookform/resolvers/yup';
  

 import addDays from 'date-fns/addDays'

 

const schema = yup.object({
	 
	 
	
	 
});

 

const IorCsvFileForUpload = () => {
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
	 
	  const [lightTheme, setLightTheme] = useState(true);
	 const [disabled,setDisabled]=useState(false);
	  
	 
 
 

	const onError = (errors, e) => console.log(errors, e);

	//All foreign keys. 
	// XXXXXX Add search fields and adjust the values as necessary
	 
	 
	const errorCallback = (err) => {
		//console.log(err);
		setServerErrors(err);
	}
	
	const handleInputMe =  (e) =>{
		   
		   console.log(e.target.value);
			 //setFromDate(e.target.value);	
			 setMe(e.target.value);
		 
	}
	
	 
	
	async function generateCsv() {
		await axios.get(`/iorTrans/generateUploadCsv/${me}`)
			.then((response) => {	 
			setDisabled(false);
			 console.log(response.data);
			   let fname=response.data;
			  	setServerErrors(response.data);
			    setDisabled(false);
			    
			    if(fname!=null && fname.length>0){
			axios({
			url: `/iorTrans/csv/load/` + fname, 
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
	}
	  
	return (
		<div className={lightTheme ? 'theme-light' : 'theme-dark'} style={disabled ?{pointerEvents: "none",opacity :"0.4"}:{}}>
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className=" ">
					 

					<h1 className="text-xl font-semibold ml-4">Upload File For Ior</h1>
					
					<div>
						<input type="text" name="Month Ending" placeholder="mmyyyy"
						onChange={e=>handleInputMe(e)}							 
							className="form-control py-0" />
							</div>
					 
					<div  
							 
							className="pl-1 -ml-2 inputField flex-initial" />
						<button type="submit" onClick={generateCsv} className="w-32 m-0 p-0">Generate CSV</button>
						 					
					</div>		
				 
			</main>

		</div>
		</div>
	);
};
 

export default withRouter(IorCsvFileForUpload);