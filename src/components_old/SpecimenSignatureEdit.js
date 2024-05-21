/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 18 April 2022
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
     
      signatoryName: yup.string().required('Required'),
      signatoryDesignation: yup.string().required('Required'),
      authorityLetterNo: yup.string().required('Required'),
      authorityLetterDate: yup.string().required('Required'),
      fromDate: yup.string().required('Required'),
      //toDate: yup.string().required('Required'),
     // scannedSignature: yup.bytea().required('Required'),
     
      fingerPrint: yup.string().required('Required'),
    
      signatoryCode: yup.string().required('Required'),
      susNo: yup.string().required('Required'),
});


const SpecimenSignatureEdit = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [key, setKey] = useState('page1');
	const [file,setFile]=useState([]);
	const [fileName,setFileName]=useState('');
	const [disabled,setDisabled]=useState(false);
	
	
	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get('/specimenSignatures/' + id)
					.then((response) => {
						record = response.data;
						const fields = [
						'id'
, 'unit', 'signatoryType', 'signatoryName', 'signatoryDesignation', 'authorityLetterNo', 'authorityLetterDate', 'fromDate', 'toDate', 'scannedSignature', 'auditorDate', 'aaoDate', 'aoDate', 'recordStatus', 'currentRecord', 'approved', 'publicKey', 'fingerPrint', 'ssFileName', 'remarks', 'signatoryCode', 'susNo'				
					];
					fields.forEach(field => setValue(field, record[field]));
					})
					.catch((error) => {
						//console.log(error);
						//console.log(error.response.status);
						//console.log(error.response.headers);
						if(error.response)
							setServerErrors(error.response.data.error);
						else
							setServerErrors(error.Error);
					});


				if (!isCancelled) {
					setEntity(record);
					setState(prev => ({ ...prev, state: record }));
				}
			}

			fetchData();
			return () => {
				isCancelled = true;
			};
		}

	}, []);

const returnToList =() => {
		history.push("/specimenSignatures");
	}
	const onSubmit = (data, event) => {
		event.preventDefault();
		console.log(data);
		console.log(file);
		console.log(id);
		
		if(disabled)
			return;
			
			setDisabled(true);
			 
		const formdata=new FormData();
		
		formdata.append('file',file);
		//formdata.append('data',data);
		if(id==='new'){
		axios.post(`/specimenSignatures/uploadSs/pdf`,formdata)
				.then((response) => { 
					
				})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
				
	 
			axios.post(`/specimenSignatures/uploadSs/verifySs/`+fileName,data)
				.then((response) => { 
					console.log(response.data);
					setServerErrors(response.data)
					setDisabled(false); 
				})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		}
		if(id!=='new'){
			axios.put(`/specimenSignatures/${id}`,data)
				.then((response) => { 
					console.log(response.data);
					setServerErrors(response.data.remarks)
					setDisabled(false); 
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
	const parentData = {
	
		unit: {
			title: "Unit",
			url : "units",
			searchList : ['id'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "unit",
		},
	}

	//Callback for child components (Foreign Keys)
	const callback = (childData) => {
		//console.log("Parent Callback");
		//setEntity(prev => ({ ...prev, [childData.fk]: childData.entity }));
		setValue(childData.fk, childData.entity);
		//console.log(errors);
		clearErrors(childData.fk);
	};

	const errorCallback = (err) => {
		//console.log(err);
		setServerErrors(err);
	}

	const handleInputChange = (e) => {
		//console.log(e.target.value);
	};
	 const changeHandler = (e) => {
		console.log(e.target.files[0].name);
		setFile(e.target.files[0]);
		setFileName(e.target.files[0].name);
		
   
	 };

	return (
		<div className="max-w-xl mx-auto ">
			<div className="w-full w-3/4  mx-auto " >

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Specimen Signature </h1>
					<div className="text-red-500">{serverErrors}</div>
					<Tabs
						id="SpecimenSignatureEdit"
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className="mb-3"
					>
						<Tab eventKey="page1" title="Page 1" className="h-120">
							<div className="grid grid-cols-2 gap-0">
								 
								 
								<div>
									<label>Signatory Code</label>
									<input type="text" name="signatoryCode" {...register("signatoryCode")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.signatoryCode?.message}</div>
								</div>
								
						
								
							 
								
						
								<div>
									<label>Signatory Name</label>
									<input type="text" name="signatoryName" {...register("signatoryName")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.signatoryName?.message}</div>
								</div>
								
						
								<div>
									<label>Signatory Designation</label>
									<input type="text" name="signatoryDesignation" {...register("signatoryDesignation")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.signatoryDesignation?.message}</div>
								</div>
								
						<div>
									<label>Sus No</label>
									<input type="text" name="susNo" {...register("susNo")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.susNo?.message}</div>
								</div>
						<div>
									<label>Effective From</label>
									<input type="date" name="fromDate" {...register("fromDate")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.fromDate?.message}</div>
								</div>	
								
								<div>
									<label>To Date</label>
									<input type="date" name="fromDate" {...register("toDate")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.toDate?.message}</div>
								</div>	
						
								<div>
									<label>Authority Letter No</label>
									<input type="text" name="authorityLetterNo" {...register("authorityLetterNo")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.authorityLetterNo?.message}</div>
								</div>
								
						
								
								<div>
									<label>Authority Letter Date</label>
									<input type="date" name="authorityLetterDate" {...register("authorityLetterDate")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.authorityLetterDate?.message}</div>
								</div>						
						
							 
								 
						</div>
						<div className="grid grid-cols-1 gap-0">
								<div>
									<label>Finger Print</label>
									<textarea type="text" name="fingerPrint" {...register("fingerPrint")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.fingerPrint?.message}</div>
								</div>
								
						 		<div>
							<label>Select file</label>
							<input type="file" id="file" onChange={changeHandler}
            accept="application/pdf"/>
							 
						</div>
								
						</div>
								
								
						
								
						
					
		
							
						</Tab>

						 
						
						<Tab eventKey="help" title="Help" >
							<h1>Help</h1>
							<ul className="list-disc">
								<li>Point 1</li>
								<li>Point 2</li>
							</ul>
						</Tab>
											
					</Tabs>
						<div className="grid grid-cols-2 gap-0">
					 
						<button type="submit" disabled={disabled} > {disabled && (
						<span className="spinner-grow spinner-grow-sm"></span>
					)
						
					}Save</button>
						<button type="button" onClick={returnToList} >Return</button>
					</div>

				</form>
			</div>
		</div>
	);
};

export default withRouter(SpecimenSignatureEdit);