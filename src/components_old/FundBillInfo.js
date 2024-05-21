/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By : 
 */

import { useState, useEffect, useMemo } from "react";
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import { withRouter, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import * as yup from "yup";

import { yupResolver } from '@hookform/resolvers/yup';

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { Link } from "react-router-dom";


const FundBillInfo = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		//resolver: yupResolver(schema)
	});

	let { id } = useParams();
	console.log(id);

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [key, setKey] = useState('page1');
	const [action, setAction] = useState('');
	const [fundBillData, setFundBillData] = useState([]);
	const [fundBillCurrData, setFundBillCurrData] = useState([]);
	const [empData, setEmpData] = useState([]);
	const [bankData, setBankData] = useState([]);
	const [currId, setCurrId]=useState(0);
	const [disabled,setDisabled]=useState(false);
	const [mesg,setMesg]=useState('');
	const [lastWithdrawalData, setLastWithdrawalData] = useState([]);
	 
 	 



	useEffect(() => {
		let isCancelled = false;
		let fetching = false;
		let unmounted = false;

		async function fetchFundBillData() {
			 
			console.log("########id is---:" + id);
			await axios.get(`/cbillFunds/${id}/fundBillInfo`)
				.then((response) => {
					console.log("&&&&&&&&:" + response.data['status']);
				 
					setAction(response.data['status']);
					 console.log(">>>>>>Action ---:" + action);
					setCurrId(response.data["fundCurrentList"][0].currId); 
					console.log(">>>>>>FPA Id ---:" + response.data["fundCurrentList"][0].currId);
					if (response.data['fundCurrentList'] !== null)
						setFundBillCurrData(response.data['fundCurrentList']);
						
					if (response.data['bankList'] !== null)
						setBankData(response.data['bankList']);
						
					if (response.data['empList'] !== null)
						setEmpData(response.data['empList']);
						
					if (response.data['fundList'] !== null)
						setFundBillData(response.data['fundList']);
						
					if (response.data['lastWithdrawalList'] !== null)
						setLastWithdrawalData(response.data['lastWithdrawalList']);	
					 
				})
				.catch((error) => {
					console.log(error);
					//	console.log(error.response.status);
					//	console.log(error.response.headers);
					if (error.response)
						setServerErrors(error.response.data.error);
					else
						setServerErrors(error.Error);
				})
			 
			 
			 
		}
		fetchFundBillData();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);


	async function submitFundbill(currId) {
		console.log(">>>>>>Current Id is ----:" + currId);
		await axios.put(`/cbillFunds/submitFundbill/${currId}`)
			.then((response) => {
				 setMesg(response.data);
				history.push({ pathname: '/cbillFunds', state: response.data });
				 
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
	async function approve(currId) {
		if(disabled){
			return;
		}
		console.log(">>>>>>Current Id is--Approval ----:" + currId);
		setDisabled(true);
		await axios.put(`/cbillFunds/approveDsopbill/${currId}`)
			.then((response) => {
				 
				history.push({ pathname: '/cbillFunds', state: response.data });
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

	const onSubmit = (data, event,) => {
		event.preventDefault();
		console.log("777777777:"+data);
		if (data.id) {
			axios.put("/demandRegisters/manualDtsSettle/" + data.id, data)
				.then((response) => { 
					 history.push("/manualDtsSettlement");
					 
			})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log("response--------"+error.response.status);
				 
					setServerErrors(error.response.data['reason']);
				});
	 
		} 

		 
	}

	 


	const onError = (errors, e) => {
		console.log(errors, e);
	}

	const returnToList = () => {
		history.push("/cbillFunds");
	}


 
	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<div  className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 pt-4" >
				<form onSubmit={handleSubmit(onSubmit, onError)}>
				 
				 
				
							 <div className="container">
							<h1 class="text-blue-600" align="center">Officer Details</h1>
							 
            <table className="table table-striped table-bordered">
         
   
                <thead>
                    <tr>
                         
                        <th>Cdao No</th>
                        <th>Name</th>
                        <th>Rank</th>
                         <th>Unit Code</th>
                         <th>Unit Name</th>
                           
                    </tr>
                     {empData && empData.map(tb =>
                        <tr key={tb.dakId}>
                           
                            <td>{tb.cdaoNo} {tb.checkDigit}</td>
                            <td>{tb.name}</td>
                            <td>{tb.rank}</td>
                            <td>{tb.unitCode}</td>
                            <td>{tb.unitName}</td>
                            
                        </tr>
                    )}
                   
                 
                </thead>
				
				<tbody>
                   
                    {empData.length===0 &&
                    <tr>
                            <td colspan="5" align="center">No Officer Record Found----Please Check </td>
                            
                        </tr>
                    }
                </tbody>
				
		 </table>
		 <br/>
		 </div>
		 			 				 <div className="container">
							<h1 class="text-blue-600" align="center">Last Withdrawal Details</h1>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Dak Id</th>
                        <th>Withdrawal Type</th>
                        <th>Fund Purpose</th>
                         <th>Claim Date</th>
                          <th>Processed Date</th>
                           <th>Claimed Amount</th>
                            <th>Approval Amount</th>
                            <th>Status</th>
                         
                    </tr>
                     {lastWithdrawalData && lastWithdrawalData.map(tr =>
                     <tr key={tr.dakId}>
                     			 
                             <td>{tr.dakId}</td>
                            <td>{tr.withdrawalType}</td>
                            <td>{tr.fundPurpose}</td>
                             <td>{tr.claimDate.substring(0, 10)}</td>
                              <td>{tr.processedDate.substring(0, 10)}</td>
                              <td>{tr.claimedAmount}</td>
                               <td>{tr.approvalAmount}</td>
                                <td>{tr.recordStatus}</td>
                             
                        </tr>
                    )}
                    
                     
                     
                </thead>
				
				<tbody>
                   
                    {lastWithdrawalData.length===0 &&
                    <tr>
                            <td colspan="8" align="center">No Previous Withdrawal Details For This Officer  Avaialble </td>
                            
                        </tr>
                    }
                </tbody>
				
		 </table>
		 <br/>
		 </div>
		 
		 				 <div className="container">
							<h1 class="text-blue-600" align="center">Fund Availability Details</h1>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Fund Balance</th>
                        <th>Last Withdrawal Amount</th>
                         <th>Last Withdrawal Qe</th>
                         
                    </tr>
                     {fundBillData && fundBillData.map(tr =>
                     <tr key={tr.dakId}>
                     
                             <td>{tr.fundBalance}</td>
                            <td>{tr.lastWithdrawalAmt}</td>
                            <td>{tr.lastWithdrawalQe}</td>
                             
                        </tr>
                    )}
                    
                     
                     
                </thead>
				
				<tbody>
                   
                    {fundBillData.length===0 &&
                    <tr>
                            <td colspan="3" align="center">No Fund Details For This Officer  Avaialble </td>
                            
                        </tr>
                    }
                </tbody>
				
		 </table>
		 <br/>
		 </div>
					
<div className="container">
							<h1 class="text-blue-600" align="center">Bank Details </h1>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Bank Name</th>
                        <th>Bank Branch</th>
                        <th>Bank Station</th>
                        <th>Ifsc</th>
                        <th>Bank Account No</th>
                         
                         
                    </tr>
                     {bankData && bankData.map(tr =>
                        <tr key={tr.dakId}>
                         
                            <td>{tr.bankName}</td>
                            <td>{tr.bankBranch}</td>
                            <td>{tr.bankStation}</td>
                            <td>{tr.ifsc}</td>
                            <td>{tr.bankAccountNo}</td>
                           
                             
                        </tr>
                    )}
                    
                     
                     
                </thead>
				
				<tbody>
                   
                    {bankData.length===0 &&
                    <tr>
                            <td colspan="5" align="center">No Bank Details Available for this Officer </td>
                            
                        </tr>
                    }
                </tbody>
				
		 </table>
		 <br/>
		 </div>
	 
					
						 
		 				 <div className="container">
							<h1 class="text-blue-600" align="center">Current Fund Bill Details</h1>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                    	 <th>Dak Id</th>
                        <th>Withdrawal Type</th>
                        <th>Fund Purpose</th>
                        <th>Rate</th>
                        <th>Installment</th>
                         <th>Discharge Date</th>
                          <th>Status</th>
                           <th>Approval Amount</th>
                            <th>Consolidated Amount</th>
                            <th>Created By</th>
                             <th>Auditor Name</th>
                             <th>AAO Name</th>
                             <th>AO Name</th>
                             <th>Rejection Reason</th>
                             <th>Remarks</th>
                         
                    </tr>
                     {fundBillCurrData && fundBillCurrData.map(tf =>
                      <tr key={tf.dakId}>
                      <td>{tf.dakId}</td>
                        <td>{tf.withdrawalType}</td>
                            <td>{tf.fundPurpose}</td>
                            <td>{tf.rate}</td>
                            <td>{tf.installment}</td>
                            <td>{tf.dischargeDate}</td>
                            <td>{tf.status}</td>
                            <td>{tf.approvalAmount}</td>
                            <td>{tf.consolidatedAmount}</td>
                            <td>{tf.createdBy}</td>
                            <td>{tf.auditorName}</td>
                            <td>{tf.aaoName}</td>
                            <td>{tf.aoName}</td>
                           <td>{tf.rejectionReason}</td>
                            <td>{tf.remarks}</td>
                             
                             
                        </tr>
                    )}
                    
                     
                     
                </thead>
				
				<tbody>
                   
                    {fundBillCurrData.length===0 &&
                    <tr>
                            <td colspan="15" align="center">No Fund Bill Details Avaialble </td>
                            
                        </tr>
                    }
                </tbody>
				
		 </table>
		 <br/>
		 </div>

		  
				
		 <div className="text-red-500">{mesg}</div>
		 

					<div align="center">
						{' '}
						{(action === 'Submission by AAO.' || action === 'Submission by Auditor.') &&
							<button
								className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
								onClick={() => submitFundbill(currId)}
							>	Submit 	</button>
						}
						{' '}
						{(action === 'Approval by AO.'|| action === 'Approval by AAO.') &&
							<button
								className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
								onClick={() => approve(currId)} disabled={disabled}
								
							>	 {disabled && (
						<span className="spinner-grow spinner-grow-sm"></span>
					)
						
					} Approve 	</button>
						}
						<br/>
						<br/>
						<button
								className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
								onClick={() => returnToList()}
							>	Back </button>
						
					</div>
					 
			</form>
			</div>


		</div>

	);


};

export default withRouter(FundBillInfo);


