

import { useState, useEffect } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';


const UploadDsopSubscriptionChange = () => {

	const [selectedFile, setSelectedFile] = useState();
	const [lightTheme, setLightTheme] = useState(true);
	 
	const [disabled,setDisabled]=useState(false);
	
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
	 setDisabled(true);
		const formData = new FormData();
		formData.append('file', selectedFile);
		//ApiService.upload(formData)
		axios.post("/dsopSubscriptions/upload/subscription", formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then(res => {
			console.log(res.data);
			alert("File uploaded successfully.")
			setDisabled(false);
		}).catch((error) => {
			alert(error.response.data.message)
			setDisabled(false);
			console.log(error.response.data.message);
			console.log(error.response.status);
			console.log(error.response.headers);
			/*
			if (error.response)
				setServerErrors(error.response.data.error);
			else
				setServerErrors(error.Error);
			*/
		})
	};
	
	return(
			<div className={lightTheme ? 'theme-light' : 'theme-dark'} style={disabled ?{pointerEvents: "none",opacity :"0.4"}:{}}>
			<form>
			<div className="container">
					<div className="row">
						<div className="col-md-6">
							<div className="form-group files color">
								<label>Upload Dsop Subscription Change </label>
								<input type="file" className="form-control" name="file" onChange={handleInputChange} />
								
							</div>
							
						</div>
						
						
					</div>
					<div className="w-40">
							<button type="button" onClick={fileChangeHandler}>Upload</button>
							</div>
				</div>
			 
			</form>
			</div>
		
		
	);
	

};

export default withRouter(UploadDsopSubscriptionChange);