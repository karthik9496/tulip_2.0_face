

import { useState, useEffect } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
	//dakType: yup.object().required('Required'),
	//description: yup.string().required('Required'),
});

const UploadDsop = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	const [selectedFile, setSelectedFile] = useState();
	const [serverErrors, setServerErrors] = useState([]);
	const [lightTheme, setLightTheme] = useState(true);
	const applicationTypeRegex = /application\/(zip|pdf)/gm;
	const textTypeRegex = /text\/(zip|xml|pdf)/gm; 
	const [files,setFiles]=useState({});
	const [fileList,setFileList]=useState([]); 
	const [disabled,setDisabled]=useState(false);
	const [loading,setLoading]=useState(false);
	const [uploadType,setUploadType]=useState(false);
	const [option, setOption]=useState('');
	
	useEffect(()=>{
		console.log(selectedFile);
	},[selectedFile,setSelectedFile])
	
	const handleInputChange =(e) =>{
		e.preventDefault();
	console.log(e);
		setSelectedFile(e.target.files[0]);
		console.log(selectedFile);
		
	}
	
     function checkFileName(value){
	
}
const handleCsvInputChange =(e) =>{
		e.preventDefault();
	console.log(e);
		setSelectedFile(e.target.files[0]);
		console.log(selectedFile);
		
	}
/*const changeHandler = (e) => {
		console.log(e.target.files[0]);
    const f = e.target.files[0];
    
    let fd=[...fileList];
    let i=0
    for(i=0;i<fd.length;i++){
		console.log(fd[i].name);
		if(f.name===fd[i].name){
			return;
		}
	}
    
    let newData=[...fileList];
    
    console.log(f.type);
     if (f.type.match(applicationTypeRegex) || f.type.match(textTypeRegex)) {
		newData.forEach(checkFileName);
       	newData.push(f);
       console.log("match"+newData);
        setFileList(newData);
      }else
   	 alert("Selected file is not a zip file");
   	 
   	 console.log(fileList);
	 };*/
	 
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
	 
	  const removeFromList=(e)=>{
		console.log(e);
		 let newData=[...fileList];
		 newData.splice(e,1);
		  setFileList(newData);
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
		 
		//ApiService.upload(formData)
		axios.post("/cbillFunds/upload/onlineDsop/pdf", formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then(res => {
			console.log(res.data);
			alert("File uploaded successfully.")
			setLoading(false);
			setDisabled(false);
			setFileList([]);
		}).catch((error) => {
			console.log(error.data);
			console.log(error.status);
			setDisabled(false);
			 
			/*
			if (error.response)
				setServerErrors(error.response.data.error);
			else
				setServerErrors(error.Error);
			*/
		})
	};
	
	const fileChangeCsvHandler = () => {
		console.log(selectedFile);
	  setDisabled(true);
		const formData = new FormData();
		formData.append('file', selectedFile);
		//ApiService.upload(formData)
		axios.post("/cbillFunds/upload/onlineDsop/csv", formData, {
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
	
	 const handleCsvChange = (event) => {
    setUploadType(event.target.value)
    setOption("csv");
  }
  
   const handlePdfChange = (event) => {
    setUploadType(event.target.value)
    setOption("pdf");
  }
  
	const onSubmit = (data, event) => {
		event.preventDefault();
		if (data.id) {
			axios.put("/billTypes/" + data.id, data)
				.then((response) => { 
			//		history.push("/billTypes");
				})
				.catch((error) => {
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
			//		setServerErrors(error.response.data)
				});
		} else {
			axios.post("/billTypes", data)
				.then((response) => {
			//		history.push("/billTypes");
				 })
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
			//		setServerErrors(error.response.data)
				});
		}

		
	}
	const onError = (errors, e) => console.log(errors, e);
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
					<h1 > Upload Online Dsop File </h1>
					<div className="text-red-500">{serverErrors}</div>

					<div className="grid grid-cols-2 gap-0">

						 

						 {uploadType==='pdf' &&
						<div>
							<label>Upload Attachments (pdf files)</label><br/>
							 
							<input type="file" className="form-control" id="file" onChange={changeHandler}
            accept="application/pdf"    multiple/>
							 
						</div>
						}
						
						 {uploadType==='csv' &&
						<div>
							<label>Upload Csv File</label><br/>
							 
							<input type="file" className="form-control" id="file" onChange={handleCsvInputChange}
            accept="text/csv"    multiple/>
							 
						</div>
						}
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
      <div className="grid grid-cols-3 gap-4">
					   <div>
	 <label>
	 <input type="radio" value="csv" checked={uploadType==='csv'} onChange={handleCsvChange}/> Csv File
	 </label>
	 </div>
	  
	 
	 
	 
	  <div>
	 <label>
	 <input type="radio" value="pdf" checked={uploadType==='pdf'} onChange={handlePdfChange}/> Pdf File
	 </label>
	 </div>
	 </div>
					 {uploadType==='csv' &&
					<div className="w-40">
						<button type="button" onClick={fileChangeCsvHandler} >Save Csv</button>
					</div>
					}
					{uploadType==='pdf' &&
					<div className="w-40">
						<button type="button" onClick={fileChangeHandler} >Save Pdf</button>
					</div>
					}
					<br/><br/>
</div>
				</form>
				
			 </div>
		</div>
	);
};

export default withRouter(UploadDsop);