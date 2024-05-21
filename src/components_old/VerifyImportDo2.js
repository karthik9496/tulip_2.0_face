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


const VerifyImportDo2 = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	 const [files,setFiles]=useState({});
	 const [fileList,setFileList]=useState([]);
	 const [fileCount,setFileCount]=useState(0);
	 const [loading,setLoading]=useState(false);
	 const [disabled,setDisabled]=useState(false);
	 const applicationTypeRegex = /application\/(zip|xml|pdf)/gm;
	 	 const textTypeRegex = /text\/(zip|xml|pdf)/gm;
	  
	   
    useEffect(() => {
		let fetching = false;
		async function fetchData() {
			 
			if(!fetching)
			await axios.get(`/do2Controls/uploadDo2/loadVerifyDo2`)
				.then((response) => {
					setFileList(response.data);
					setFileCount(response.data.length)
					console.log(response.data.length);
					 
					 
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
		return () => { fetching = true; }

	}, []);
	 
 const importDo2 = () => {
		 if(disabled)
		 	return;
		 	
		 setDisabled(true);
		 setLoading(true);
		
		axios.post("/do2Controls/writeToDo2Control/all")
		.then(res => {
			let fname=res.data;
			//console.log(res.data);
			//alert("File uploaded successfully.")
			if(fname!=null && fname.length>0){
			axios({
			url: `/do2Controls/fileDownload/summary/` + fname, 
			method: 'GET',
			responseType: 'blob', // important
		}).then((res) => {
			//console.log(response.data);
			const url =URL.createObjectURL(new Blob([res.data],{type:"application/pdf"}));
			const pdfWindow=window.open();
			pdfWindow.location.href=url;
			const link=pdfWindow.location.href;
			//const link = document.createElement('a');
			//link.href = url;
			try{
			link.setAttribute('download', fname);
		 
			//document.body.appendChild(link);
			link.click();
			}catch(err){
				
			}
		});
		}
			setFileList([]);
			setFileCount(0);
			setLoading(false);
			setDisabled(false);
		}).catch((error) => {
			alert(error.response.data.message)
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
				<form>
				<div className="container">
				{loading && <>
						 
						 <div className="flex justify-center items-center">
  <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>
						</>	
						}
			<br/><br/>
				{fileCount>0 && 
					<h1 > Verify and Upload to Do2 Control : {fileCount} files available </h1>
				}
				{fileCount===0 && 
					<h1 > No files available for verification and upload to Do2 Control</h1>
				}
					<div className="text-red-500">{serverErrors}</div>

					<div>
				 
						 {			 
        fileList.length>0 &&
          <div>
            {
              fileList.map((item,idx) => {
                return <div className="flex"> 
             <li> 
             <div className="flex flex-wrap">
             <div className="w-400"> {item}</div>
             
                </div></li>
              </div>
              })
            }
          </div>  
      }
 	 
						 

					</div>
					
		 

					<div className="w-40">
					{fileCount>0 && 
						<button type="button" onClick={importDo2} >Verify</button>
						}
					</div>
</div>
				</form>
				
			</div>
		</div>
	);
};

export default withRouter(VerifyImportDo2);