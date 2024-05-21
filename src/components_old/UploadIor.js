

import { useState, useEffect } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';


const UploadIor = () => {

	const [selectedFile, setSelectedFile] = useState();
	const [lightTheme, setLightTheme] = useState(true);
	 
	 
	const [disabled,setDisabled]=useState(false);
	const [uploadType,setUploadType]=useState(false);
	const [option, setOption]=useState('');
	const [mesg,setMesg]=useState('');
	const [valcheck, setValCheck]=useState(false);
	
	useEffect(()=>{
		console.log(selectedFile);
	},[selectedFile,setSelectedFile])
	
	const handleInputChange =(e) =>{
		e.preventDefault();
	console.log(e);
		setSelectedFile(e.target.files[0]);
		console.log(selectedFile);
		
	}

const fileChangeHandler = () => {
		console.log(selectedFile);
		
		let proceed=window.confirm("You are about to upload the IOR File file. Having the Pre Validation check for Correct File "
		+ "Length done.If done press OK to proceed else Cancel to go back");
		if(!proceed)
			return;
		 
	  setDisabled(true);
		const formData = new FormData();
		formData.append('file', selectedFile);
		//ApiService.upload(formData)
		 
			axios.post(`/iorTrans/upload/vacation`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then(response => {
			console.log(response.data);
		//	alert("response.data")
			setMesg(response.data);
			setDisabled(false);
			
		}).catch((error) => {
		 	console.log(error.response.data.message);
			if (error.response)
			alert(error.response.data.message);
			setMesg(error.response.data);
			 
			 
		})
		  
		 
	};
	
	const validationCheck = () => {
		console.log(selectedFile);
		 
	  setDisabled(true);
		const formData = new FormData();
		formData.append('file', selectedFile);
		//ApiService.upload(formData)
		 
			axios.post(`/iorTrans/preValidation`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then(response => {
			console.log(response.data);
		//	alert("response.data")
			setMesg(response.data);
			setValCheck(true);
			setDisabled(false);
			
		}).catch((error) => {
		 	console.log(error.response.data.message);
			if (error.response)
			alert(error.response.data.message);
			setMesg(error.response.data);
			 
			 
		})
		  
		 
	};
	
	
  
  
	return(
			<div className={lightTheme ? 'theme-light' : 'theme-dark'} style={disabled ?{pointerEvents: "none",opacity :"0.4"}:{}}>
			<form>
			<div className="container">
					<div className="row">
						<div className="col-md-6">
						<div className="text-red-500">{mesg}</div>
							<div className="form-group files color">
								<label>Upload Rent File  </label>
								<input type="file" className="form-control" name="file" onChange={handleInputChange} />
								
							</div>
							
						</div>
						 
						     
						
					</div>
			{/*		<div className="w-40">
							<button type="button" onClick={validationCheck}>Upload For Pre-Validation</button>
							</div>*/}
				{/*			{valcheck===true &&*/}
					<div className="w-40">
							<button type="button" onClick={fileChangeHandler}>Upload For Process</button>
							</div>
						{/*	}*/}
				</div>
			 
			</form>
			</div>
		
		
	);
	

};

export default withRouter(UploadIor);