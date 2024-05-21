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
import Table3, { SelectColumnFilter } from '../utils/Table3'  // 


import * as yup from "yup";

import { yupResolver } from '@hookform/resolvers/yup';
  

 import addDays from 'date-fns/addDays'

 

const schema = yup.object({
	 
	 
	
	 
});

 

const CmpRejection = () => {
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
	 
 
	 
	const [loading, setLoading] = useState(true);
	 const [fileName,setFileName]=useState('');
	 
	const [key, setKey] = useState('Page1');
	const [paymentRefNo,setPaymentRefNo]=useState('');
 	const[scrollNo,setScrollNo]=useState('');
 	const[scrollDate,setScrollDate]=useState(new Date());
 	const[rejectionReason,setRejectionReason]=useState('');
	const [mesg,setMesg]=useState('');
 

	useEffect(() => {
		let fetching = false;
		let unmounted = false;
		 
		async function fetchData() {
			 
			if (!fetching && paymentRefNo)
				//console.log(secId);
				await axios.get(`/payments/rejection/${paymentRefNo}`)
					.then((response) => {
						console.log("response>>" + response.data);
						//setSh3List(response.data);
						 setData(response.data);;
						 
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

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[paymentRefNo]);


 const columns = useMemo(() => [
		
		 
		{
			Header: "Dak Id",
			accessor: 'dak.dakidNo',
		},
		
		{
			Header: "Cdao No",
			accessor: 'bankAccount.employee.cdaoNo',
		},
		{
			Header: "Month",
			accessor: 'monthEnding',
		},
		
		{
			Header: "Amount",
			accessor: 'amount',
		},
		{
			Header: "CMP File",
			accessor: 'fileNo',
			 
		},
		{
			Header: "CMP Date",
			accessor: 'cmpFileDate',
			 
		},
		{
			Header: "Payment Ref No",
			accessor: 'paymentReferenceNo',
			 
		},
		 
		 
		 
		 
	], [data])

	const onError = (errors, e) => console.log(errors, e);

	//All foreign keys. 
	// XXXXXX Add search fields and adjust the values as necessary
	 
	 
	const errorCallback = (err) => {
		//console.log(err);
		setServerErrors(err);
	}
	
	const handleInputChange =  (e) =>{
		   
		   console.log(e.target.value);
			 setPaymentRefNo(e.target.value);	
		 
	}
	const handleScrollNoChange =  (e) =>{
		   
		    setScrollNo(e.target.value);	
		 
	}
	 const handleScrollDateChange =  (e) =>{
		   
		    setScrollDate(e.target.value);	
		 
	}
	const handleRejectionReasonChange =  (e) =>{
		   
		    setRejectionReason(e.target.value);	
		 
	}
	
	const handleDone =(e)=>{
		history.push("/payments/rejections/viewPending");
	}
	 
	 const processRejection = () => {
		 
		let saving = false;
		let i=0;
		if(data){
			for(i;i<data.length;i++){
				data[i].rejectionScrollNo=scrollNo;
				data[i].rejectionScrollDate=scrollDate;
				data[i].cmpRejectionReason=rejectionReason;
			}
		}
		 console.log(data[i]);
		async function process() {
			if (!saving)
				axios.put("/payments/rejection/process/"+paymentRefNo,data)
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
		process();

		return () => { saving = true; }
	}
	 
	 
	
	  
	 
	   
	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<div  className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 pt-4" >
				 
			<form onSubmit={handleSubmit(processRejection, onError)}>
				<div className=" ">
					 

					<h1 className="text-xl font-semibold ml-4">Cmp Rejection</h1>
					{mesg}
					<div className="container">
						<input type="text" name="search" placeholder="payment ref no"
						onChange={e=>handleInputChange(e)}
							 
							className="pl-2 -ml-2 inputField flex-initial" />
						<button type="submit"  className="w-24 m-0 p-0">Search</button>
						 					
					</div>		
					 


				</div>
				 <div className="container">
					<Table3 columns={columns} data={data} className="table-auto" />
				</div>
				{data.length>0 &&
				 <div className="container">
				 <div>
				 <label> Scroll No </label>
				 <input type="text" name="scrollNo" placeholder="scroll number"
						onChange={e=>handleScrollNoChange(e)}/>
						</div>
						<div>
				 <label> Scroll Date </label><input type="date" name="scrollDate" placeholder="scroll date"
						onChange={e=>handleScrollDateChange(e)}/>
						</div>
						
						 <div>
				 <label> Remarks </label>
				 <textarea type="text" name="remarks" placeholder="remarks"
						onChange={e=>handleRejectionReasonChange(e)}/>
						</div>
						<div>
						<button type="submit"  className="w-24 m-0 p-0">Process</button>
						{' '}
						<button type="button" onClick={handleDone}  className="w-24 m-0 p-0">Done</button>
						</div>
				 </div>
				 }
				  </form>
			</div>

		</div>
	);
};
 

export default withRouter(CmpRejection);