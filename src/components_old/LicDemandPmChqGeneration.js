/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By : 
 */

import { useState, useEffect, useMemo } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import Table, { SelectColumnFilter } from '../utils/Table'  // 

import * as yup from "yup";

import { yupResolver } from '@hookform/resolvers/yup';

 

const schema = yup.object({
	 
	 
	
	 
});

 

const LicDemandPmChqGeneration = () => {
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
	const [mesg,setMesg]=useState();
	const [key, setKey] = useState('Page1');
	const [disabled,setDisabled]=useState(false);
  	const [lightTheme, setLightTheme] = useState(true);
	const [uploadFileName,setUploadFileName]=useState('');
	const [premiumAmount,setPremiumAmount]=useState(0);
	const[usrLevel,setUsrLevel]=useState(0);
	const[dakId,setDakId]=useState('');
	const [tBillPmData, setTBillPmData] = useState([]);
	const [tBillCsData, setTBillCsData] = useState([]);
	
 

	useEffect(() => {
		let fetching = false;
		let unmounted = false;
		 
		async function fetchData() {
			 
			if (!fetching)
				//console.log(secId);
				await axios.get(`/licDemandTransactions/generatePm/licDemand`)
					.then((response) => {
						console.log("response>>" + response.data[0]+"=="+response.data[1]);
						 setUploadFileName(response.data[0]);
						 setPremiumAmount(response.data[1]); 
						 setDakId(response.data[2]);
						 setData(response.data);
						 console.log(">>>>> Dak Id----:" + response.data[2]);
						 if (!unmounted) {
							 
							setLoading(false);
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

	useEffect(() => {
		let fetching = false;
		let unmounted = false;
		 
		async function fetchPmData() {
			 
			if (!fetching)
				//console.log(secId);
				await axios.get(`/licDemandTransactions/fetchDak/licDemand`)
					.then((response) => {
					   setDakId(response.data);
						  
						 console.log(">>>>> Dak Id----:" + response.data);
						 if (!unmounted) {
							 
							setLoading(false);
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
		fetchPmData();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);
	
	useEffect(() => {
		let fetching = false;
		async function fetchUsrData() {
			if(!fetching)
			console.log(">>>>Usr Level is -----:" + usrLevel);
			await axios.get(`/licDemandTransactions/userDesg`)
				.then((response) => {
					console.log(">>>>Usr Level is----:" + response.data);
					setUsrLevel(response.data);
					
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
		fetchUsrData();
		return () => { fetching = true; }

	}, []);

	const submitPmChqSlip = () => {
			 
		let saving = false;
		console.log("1111111111---:" + dakId);
		async function fetchPmData() {
		if (!saving)
			 
			await axios.get(`/licDemandTransactions/viewPmCs/${dakId}`)
				.then((response) => {
					console.log(">>>>Usr Level is----:" + response.data);
					if (response.data['pmList'] !== null)
						setTBillPmData(response.data['pmList']);
					if (response.data['csList'] !== null)
						setTBillCsData(response.data['csList']);
					
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
		fetchPmData();

		return () => { saving = true; }
	}

	const onError = (errors, e) => console.log(errors, e);

	//All foreign keys. 
	// XXXXXX Add search fields and adjust the values as necessary
	 
	 
	const errorCallback = (err) => {
		//console.log(err);
		setServerErrors(err);
	}
	
	 
	const handleCheckBox = index => (e) =>{
		   
		   console.log(e.target.checked);
			let item = data[index];
		 
		item['select'] = e.target.checked;
		let newData = [...data];
		newData[index] = item;
		setData(newData);
	//	console.log(data);	
		 
	}
	
	const updateCheckBoxAll = (e) =>{
		   
		   let newData=[...data];
			for(var k in newData){
				newData[k].select=e.target.checked;
			}
			setData(newData);
		 
		 
	}

	const handleInputChange = (e) => {
		console.log(e.target.value);
	//	console.log("handle input change");
		 
		
	};
	const generatePmChqSlip = () => {
		
		if(disabled)
			return;
		//console.log(data);
		
		setDisabled(true);
		let saving = false;
		//console.log(id);
		async function pmChqSlip() {
			if (!saving)
			console.log(">>>>Lic Demand Data----:"+ data);
				axios.put(`/licDemandTransactions/licDemand/generatePmChq`,data)
					.then((response) => {
						  const url = window.open(`${process.env.REACT_APP_BASE_URL}/files/${response.data}`);
						  setMesg(response.data[0]);
						  setData([]);
						  setDisabled(false);
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
		pmChqSlip();

		return () => { saving = true; }
	}
		 
	const columns=useMemo(()=>[
		 
		 
		 
		
		{
			 
			Header:  <input type="checkbox" onChange={updateCheckBoxAll} />,
			
		 	accessor : "select",			 
			Cell: ({ row }) => (
				<div>
					<input type="checkbox" onChange={handleCheckBox(row.index)}  checked={data[row.index]['select']}/>
				 
				</div>
			)
		},
		
		{
			Header: "Upload File Name",
			accessor: 'uploadFileName',
		},
		{
        Header: "Premium Amount",
        accessor: "premiumAmount",
      },
      
      {
        Header: "Dak Id",
        accessor: "dakId",
      },
		 
		
	],[data])
	
	 
	async function submitPmCs(id) {
		await axios.put(`/licDemandTransactions/submitPmCs/${id}`)
			.then((response) => {
				setMesg(response.data); 
			//	history.push({ pathname: '/licTransactions', state: response.data });
				 
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
	async function approvePmCs(id) {
		await axios.put(`/licDemandTransactions/approvePmCs/${id}`)
			.then((response) => {
				 setMesg(response.data); 
			//	history.push({ pathname: '/licTransactions', state: response.data });
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
	   
	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className={lightTheme ? 'theme-light' : 'theme-dark'} style={disabled ?{pointerEvents: "none",opacity :"0.4"}:{}}>
					 

					<h1 className="text-xl font-semibold ml-4">Lic Demand Pm/Chq Generation</h1>
					<div className="text-red-500">
					{mesg}
					</div>

					 
						 
						<div>
						{usrLevel<30 &&
							<button type="submit" onClick={generatePmChqSlip} className=" mt-3  w-40  " >Generate Pm/Chq Slip</button>
						}
						</div>
						<div>
						{(usrLevel===30 || usrLevel >30) &&
						 <>
						 
						<button type="submit" onClick={submitPmChqSlip} className=" mt-3  w-40  " >View Pm/Chq Slip</button>
						 
						 
						
				 
					 
					  <div className="container">
							<h1 class="text-blue-600" align="center">Punching Media Details</h1>
            <table className="table   table-bordered">
                <thead>
               
                    <tr>
                        <th colSpan={3}>Receipt Side</th>
                        <th colSpan={3}>Charges Side</th>
                        </tr>
                        
                           
                        
                         
                        <tr>
                        <th>Code Head</th>
                        <th>Plus Receipt</th>
                        <th>Minus Receipt</th>
                          <th>Code Head</th>
                        <th>Plus Charge</th>
                        <th>Minus Charge</th></tr>
                    
                     {tBillPmData && tBillPmData.map(tp =>
                      <tr key={tp.dakidNo}>
                        <td>{tp.receiptCodeHead}</td>
                            <td>{tp.receiptPlusAmount}</td>
                            <td>{tp.receiptMinusAmount}</td>
                             <td>{tp.chargeCodeHead}</td>
                            <td>{tp.chargePlusAmount}</td>
                            <td>{tp.chargeMinusAmount}</td>
                             
                        </tr>
                    )}
                    
                     
                     
                </thead>
				
				 
				
		 </table>
		 <br/>
		 </div>
		 
		 
		  <div className="container">
							<h1 class="text-blue-600" align="center">Cheque Slip Details</h1>
            <table className="table table-striped table-bordered">
                <thead>
               
                    <tr>
                        <th>Bank Name</th>
                        <th>IFSC</th>
                        <th>Bank Account Number</th>
                        <th>Amount</th>
                         <th>Cheque Slip Date</th>
                         
                    </tr>
                    
                     {tBillCsData && tBillCsData.map(tc =>
                      <tr key={tc.dakidNo}>
                        <td>{tc.bankDetails}</td>
                            <td>{tc.ifscCode}</td>
                            <td>{tc.bankAccountNo}</td>
                             <td>{tc.amount}</td>
                            <td>{tc.chequeSlipDate}</td>
                             
                             
                        </tr>
                    )}
                    
                     
                     
                </thead>
				
				 
				
		 </table>
		 </div>
		 
		 </>
						}
						</div>
		 
		 
		 <div align="center">
						{' '}
						{usrLevel===30 &&
							<button
								className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
								onClick={() => submitPmCs(dakId)}
							>	Submit 	</button>
						}
						{' '}
						{usrLevel>30 &&
							<button
								className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
								onClick={() => approvePmCs(dakId)}
							>	Approve 	</button>
						}
					</div>
  
				</div>
				{usrLevel<30 &&
				<div className="-mt-2 max-h-1 py-0 ml-0">
					<Table columns={columns} data={data} className="table-auto" />
				</div>
				}
			</main>

		</div>
	);
};
 

export default withRouter(LicDemandPmChqGeneration);