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

 

const CmpRejectionList = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();
	//console.log(id);

	let history = useHistory();
 
 const [update, setUpdate] = useState(false);
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
	
 

	useEffect(() => {
		let fetching = false;
		let unmounted = false;
		 
		async function fetchData() {
			 
			if (!fetching)
				//console.log(secId);
				await axios.get(`/payments/rejections/viewPending`)
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

async function submit(id) {
		await axios.put(`/payments/submitRejection/${id}`)
			.then(() => {
				//console.log(data);
				let updatedRecords = [...data].filter((i) => i.id !== id);
				console.log(updatedRecords);
				setData(updatedRecords);
				setUpdate(!update);
			})
			.catch((error) => {
				console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}
	
	async function approve(id) {
		await axios.put(`/payments/approveRejection/${id}`)
			.then(() => {
				//console.log(data);
				let updatedRecords = [...data].filter((i) => i.id !== id);
				console.log(updatedRecords);
				setData(updatedRecords);
				setUpdate(!update);
			})
			.catch((error) => {
				console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}

 const columns = useMemo(() => [
		
		{
			Header: 'Action',
			Cell: ({ row }) => (
				<div>
					{(row.original.action === 'submission by aao') &&
						<button
							className="w-32 m-0 p-0 bg-red-500 hover:bg-red-700 "
							onClick={() => submit(row.original.id)}
						>	Submit 	</button>
						}
						{' '}
						{((row.original.action === 'approval by ao') || (row.original.action === 'approval by go'))  &&
						<button
							className="w-32 m-0 p-0 bg-red-500 hover:bg-red-700 "
							onClick={() => approve(row.original.id)}
						>	Approve 	</button>
					}
					
						</div>
			)
		},
		 
		{
			Header: "Dak Id",
			accessor: 'dak.dakidNo',
		},
		
		{
			Header: "Employee",
			accessor: 'bankAccount.employee',
			Cell: ({ row }) => (
				<div>
				
				{row.original.bankAccount.employee && 
				 <div>
				  
				{row.original.bankAccount.employee.rank.rankName}
				{' '}				 
				{row.original.bankAccount.employee.officerName}
				  
				 </div>
				   }
				</div>
				
				)
		},
		{
			Header: "Bank Details",
			accessor: 'bankAccount.bank.ifsc',
			Cell: ({ row }) => (
				<div>
				
				{row.original.bankAccount.bank && 
				 <div>
				  
				{row.original.bankAccount.bank.ifsc}
				<br/>				 
				{row.original.bankAccountNo}
				  
				 </div>
				   }
				</div>
				
				)
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
		{
			Header: "Reason",
			accessor: 'rejectionReason',
			 
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
	
	 
	 
	 
	
	  
	 
	   
	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<div  className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 pt-4" >
				 
			 
				<div className=" ">
					 

					<h1 className="text-xl font-semibold ml-4">Cmp Rejection List</h1>
					<div className="flexContainer">
						<input type="text" name="search" placeholder="payment ref no"
						onChange={e=>handleInputChange(e)}
							 
							className="pl-2 -ml-2 inputField flex-initial" />
						<button type="submit"  className="w-24 m-0 p-0">Search</button>
						 					
						
					 <div>
							<Link to={"/payments/rejection/new"}>
								<button className=" w-32 ml-8 p-0 h-6 -mt-2" >Create New </button>
							</Link>
						</div>

</div>	
				</div>
				 <div className="-mt-2 max-h-1 py-0">
					<Table columns={columns} data={data} className="table-auto" />
				</div>
				 
			</div>

		</div>
	);
};
 

export default withRouter(CmpRejectionList);