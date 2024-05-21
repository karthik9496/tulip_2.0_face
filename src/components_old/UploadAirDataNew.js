

import { useState, useEffect } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';


const UploadAirDataNew = () => {

	const [selectedFile, setSelectedFile] = useState();
	const [lightTheme, setLightTheme] = useState(true);
	
	useEffect(()=>{
		console.log(selectedFile);
        console.log("INSIDE")
	},[selectedFile,setSelectedFile])
	
	const handleInputChange =(e) =>{
		e.preventDefault();
	console.log(e);
		setSelectedFile(e.target.files[0]);
		console.log(selectedFile);
		
	}

const fileChangeHandler = () => {
		console.log(selectedFile);
		
		const formData = new FormData();
		formData.append('file', selectedFile);
		axios.post("/dtsTransactions/upload/airDtsNew", formData, {
			
			headers: {
				'Content-Type': 'multipart/form-data'
			}, maxContentLength: 100000000,
			maxBodyLength: 1000000000
			
		}).then(res => {
			console.log(res.data);
			alert("File uploaded successfully.")
		}).catch((error) => {
			console.log(error);
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
			<div className={lightTheme ? 'theme-light' : 'theme-dark'}>
			<form>
			<div className="container">
					<div className="row">
						<div className="col-md-6">
							<div className="form-group files color">
								<label>Upload Legacy Air Travel Data  </label>
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

export default withRouter(UploadAirDataNew);