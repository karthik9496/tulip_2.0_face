/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
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
	//dakType: yup.object().required('Required'),
	//description: yup.string().required('Required'),
});


const UploadDo2Batch = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	 const [files,setFiles]=useState({});
	 const [fileList,setFileList]=useState([]);
	 const [lightTheme, setLightTheme] = useState(true);
	const [disabled,setDisabled]=useState(false);
	const [loading,setLoading]=useState(false);
	 const applicationTypeRegex = /application\/(zip|xml|pdf)/gm;
	 	 const textTypeRegex = /text\/(zip|xml|pdf)/gm;
	  
	  const removeFromList=(e)=>{
		console.log(e);
		 let newData=[...fileList];
		 newData.splice(e,1);
		  setFileList(newData);
	}

 const changeHandler = (e) => {
		console.log(e.target.files[0]);
    const f = e.target.files[0];
    
    let newFd=e.target.files;
    let newFdName=[];
    let i=0
    for(i=0;i<newFd.length;i++){
		newFdName.push(newFd[i].name);
		
	}
	console.log(newFdName);
	
	 let fd=[...fileList];
    
    for(i=0;i<fd.length;i++){
		console.log(fd[i].name);
		if(newFdName.includes(fd[i].name)){
			return;
		}
	}
	
	 
    
    console.log(f.type);
     if (f.type.match(applicationTypeRegex) || f.type.match(textTypeRegex)) {
		 
      }else
   	 alert("Selected file is not a zip file");
   	 
   	 let newData=[...fileList];
    
      for(i=0;i<newFd.length;i++){
		newData.push(newFd[i]);
		
	}
	setFileList(newData);
   	 console.log(fileList);
	 };
	 
     
    
     function checkFileName(value){
	
}
	 
 const fileChangeHandler = () => {
		 
		 if(fileList.length===0){
		 	alert("No file selected.")
		 	return;
		 }
		 
		 if(disabled)
		 	return;
		 	
		setLoading(true);
		setDisabled(true);
		const formData = new FormData();
		 
		 fileList.forEach((i,index)=>{
			console.log(index+'---'+fileList[index]);
			formData.append('file',fileList[index]);
		})
	 
			
		 
		//formData.append('file', fileList);
		//ApiService.upload(formData)
		axios.post(`/do2Controls/uploadDo2/xml`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then(res => {
			console.log(res.data);
			//alert("File uploaded successfully.")
			if(res.data && res.data.length>0)
				setServerErrors(res.data);
			setLoading(false);
			setDisabled(false);
			setFileList([]);
		}).catch((error) => {
			//alert(error.response.data.message)
			console.log(error.data);
			console.log(error.status);
			//console.log(erroronse.headers);
			/*
			if (error.response)
				setServerErrors(error.response.data.error);
			else
				setServerErrors(error.Error);
			*/
		})
	};
	


	const onSubmit = (data, event) => {
		event.preventDefault();
		if (data.id) {
			axios.put("/billTypes/" + data.id, data)
				.then((response) => { 
					history.push("/billTypes");
				})
				.catch((error) => {
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		} else {
			axios.post("/billTypes", data)
				.then((response) => {
					history.push("/billTypes");
				 })
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		}

		
	}

	const onError = (errors, e) => console.log(errors, e);

	//All foreign keys. 
	// XXXXXX Add search fields and adjust the values as necessary
	 
	 
	const errorCallback = (err) => {
		//console.log(err);
		setServerErrors(err);
	}

	const handleInputChange = (e) => {
		//console.log(e.target.value);
	};

	 

	 
	return (
			<div className="min-h-screen bg-gray-100 text-gray-900">
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">	 

				<form onSubmit={handleSubmit(onSubmit, onError)}>
				<div className="container">
				 {loading && <>
						 
						 <div class="flex justify-center items-center">
  <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
						</>	
						}
			<br/><br/>
					<h1 > Upload Do2 Batch </h1>
					<div className="text-red-500">{serverErrors}</div>

					<div className="grid grid-cols-2 gap-0">

						 

						 
						<div>
							<label>Select and add files</label><br/>
							 
							<input type="file" className="form-control" id="file" onChange={changeHandler}
            accept="application/pdf, text/xml, application/zip"    multiple/>
							 
						</div>

					</div>
					
		{			 
        fileList.length>0 &&
          <div>
            {
              fileList.map((item,idx) => {
                return <div class="flex"> 
             <li> 
             <div className="flex flex-wrap">
             <div className="w-400"> {item.name}</div>
             <div className="w-40">
                <button type="button" onClick={()=>removeFromList(idx)}>Remove</button>
                </div>
                </div></li>
              </div>
              })
            }
          </div>  
      }

					<div className="w-40">
						<button type="button" onClick={fileChangeHandler} >Save</button>
					</div><br/><br/>
</div>
				</form>
				
			 </div>
		</div>
	);
};

export default withRouter(UploadDo2Batch);