/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By : 
 */

import { useState, useEffect, useMemo } from "react";
import { withRouter, useParams, useHistory, Link  } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import { format } from 'date-fns'

import * as yup from "yup";

import { yupResolver } from '@hookform/resolvers/yup';
import LiveSearch from '../utils/LiveSearch';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import addDays from 'date-fns/addDays'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'


const schema = yup.object({
	 
	 
	
	 
});

 

const BreakupDetails = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { task, sectionname, fromDateStr, toDateStr } = useParams();
	console.log(task);

	let history = useHistory();
 
 	const [data,setData]=useState([]);
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	
	 const[fromDate,setFromDate]=useState(new Date());
	 const[toDate, setToDate]=useState(new Date());
	// const [fromDateStr,setFromDateStr]=useState('');
	// const [toDateStr,setToDateStr]=useState('');
	 
	 
	 
	const [loading, setLoading] = useState(true);
	 const [mesg,setMesg]=useState();
	 const[taskNo,setTaskNo]=useState('');
	 const[sectionName,setSectionName]=useState('');
	 
	const [key, setKey] = useState('Page1');
	const [reason, setReason] = useState('');
 const[audData, setAudData]=useState([]);
const[aaoData, setAaoData]=useState([]);	
 const[aoData, setAoData]=useState([]);

	useEffect(() => {
		let isCancelled = false;
		let fetching = false;
		let unmounted = false;
		 
		async function fetchData() {
			 let record='';
			 
				console.log(">>>>>>>>:" + task);
				await axios.get(`/reports/${task}/${sectionname}/${fromDateStr}/${toDateStr}/dprBreakup`)
					.then((response) => {
						console.log("response>>" + response.data[1]);
						//setSh3List(response.data);
						 
					//	 setData(response.data);
					//	  record=response.data[0];
						 
					//	  console.log(">>>>>>>  Task---:" + response.data[0]['taskNo']);
					//	  console.log(">>>>>>>  CDAO No---:" + response.data['cdaoNo']);
				//		console.log(">>>>>>>  Amt---:" + response.data[1]['amountClaimed']);
				 
					
				
			  if(response.data[0]){
							console.log(">>>>>aud Data--:" + response.data[0]);
							setAudData(response.data[0]);
			} if(response.data[1]){
							console.log(">>>>>aao Data--:" + response.data[1]);
							setAaoData(response.data[1]);
				}if(response.data[2]){
							setAoData(response.data[2]);
						}
				 
						   
						 	 
						  
						 
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
	},[]);


	 
	 

	 

	const onError = (errors, e) => console.log(errors, e);

	//All foreign keys. 
	// XXXXXX Add search fields and adjust the values as necessary
	 
	 
	const errorCallback = (err) => {
		//console.log(err);
		setServerErrors(err);
	}
	
 const returnToList =() => {
		history.push("/reports/0/fetchDprData");
	}
	
	 

	const handleInputChange = (e) => {
		console.log(e.target.value);
	//	console.log("handle input change");
		 
		
	};
	
	
	const ShowBreakupAud = () => {
		
	let date = new Date("createdAt");
	let dateMDY = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
	
		const columns=useMemo(()=>[
		
		
		 
		{
			Header: "Dak Id",
			accessor: 'dak.dakidNo',
		},
		{
			Header: "CDAo_No",
			accessor: 'cdaoNo',
		},
		{
			Header: "Bill Type",
			accessor: 'billType.description',
		},
		{
			Header: "Amount",
			accessor: 'amountClaimed',
		},
		
		{
			Header: "Oldest Date",
			accessor: 'createdAt',
		},
		
		{
			Header: "Reason",
			accessor: 'reason',
		},
		 
		 
		
	],[audData])
 
 	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className=" ">
					 

					<h1 className="text-xl font-semibold ml-4">Breakup Details of Auditor</h1>

					 


				</div>
				<div className="-mt-2 max-h-1 py-0 ml-0">
					<Table columns={columns} data={audData} page={50} className="table-auto" />
				</div>
			</main>

		</div>
	);
	}
 	   
 	   	const ShowBreakupAao = () => {
		
	let date = new Date("createdAt");
	let dateMDY = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
	
		const columns=useMemo(()=>[
		
		
		 
		{
			Header: "Dak Id",
			accessor: 'dak.dakidNo',
		},
		{
			Header: "CDAo_No",
			accessor: 'cdaoNo',
		},
		{
			Header: "Bill Type",
			accessor: 'billType.description',
		},
		{
			Header: "Amount",
			accessor: 'amountClaimed',
		},
		
		{
			Header: "Oldest Date",
			accessor: 'createdAt',
		},
		
		{
			Header: "Reason",
			accessor: 'reason',
		},
		 
		 
		
	],[aaoData])
 
 	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className=" ">
					 

					 <h1 className="text-xl font-semibold ml-4">Breakup Details of AAO</h1>

					 


				</div>
				<div className="-mt-2 max-h-1 py-0 ml-0">
					<Table columns={columns} data={aaoData} page={50} className="table-auto" />
				</div>
			</main>

		</div>
	);
	}
		const ShowBreakupAo = () => {
		
	let date = new Date("createdAt");
	let dateMDY = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
	
		const columns=useMemo(()=>[
		
		
		 
		{
			Header: "Dak Id",
			accessor: 'dak.dakidNo',
		},
		{
			Header: "CDAo_No",
			accessor: 'cdaoNo',
		},
		{
			Header: "Bill Type",
			accessor: 'billType.description',
		},
		{
			Header: "Amount",
			accessor: 'amountClaimed',
		},
		
		{
			Header: "Oldest Date",
			accessor: 'createdAt',
		},
		
		{
			Header: "Reason",
			accessor: 'reason',
		},
		 
		 
		
	],[aoData])
 
 	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className=" ">
					 

					 <h1 className="text-xl font-semibold ml-4">Breakup Details of AO</h1>

					 


				</div>
				<div className="-mt-2 max-h-1 py-0 ml-0">
					<Table columns={columns} data={aoData} page={50} className="table-auto" />
				</div>
			</main>

		</div>
	);
	}
	return (
		 
			 
				<div className=" ">
					 

					<h1 className="text-xl font-semibold ml-4">Breakup Details For Daily Progress Report</h1>
					
			 
					 
		<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
					 <div className="flex-container">  
					 
					 {audData &&
          
       					<ShowBreakupAud/>
       					}
    				</div>
    				
    				 <div className="flex-container">  
    				 {aaoData &&
					
          
       					<ShowBreakupAao/>
       					}
    				</div>
    				
    				 <div className="flex-container">  
    				 {aoData &&
    				
					 
          
       					<ShowBreakupAo/>
       					}
    				</div>
				 
				 
			</main>
			<div className="px-3 ...">
									<button type="button" onClick={returnToList}>Close</button>
								</div>

		</div>
	);
	 
};
 

export default withRouter(BreakupDetails);