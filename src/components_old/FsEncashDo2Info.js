/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By : 
 */

import { useState, useEffect, useMemo } from "react";
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import { withRouter, useParams, useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import * as yup from "yup";

import { yupResolver } from '@hookform/resolvers/yup';

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { Link } from "react-router-dom";


const FsEncashDo2Info = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		//resolver: yupResolver(schema)
	});

	let { id } = useParams();
	console.log(id);
	 

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [key, setKey] = useState('page1');
	const [action, setAction] = useState('');
	const [fsDo2Data, setFsDo2Data] = useState([]);
	const [fsAcData,setFsAcData] = useState([]);
	const [fsEmpData, setFsEmpData] = useState([]);
	const [approved,setApproved]=useState(false); 
	const [disabled,setDisabled]=useState(false);
	const [mesg,setMesg]=useState('');
	const {state}=useLocation();
	const [amountHeld,setAmountHeld]=useState('');
	const [fsObj,setFsObj]=useState([]);
	const [usrLevel,setUsrLevel]=useState('');
	const [forAao,setForAao]=useState(false);
	const [forAo,setForAo]=useState(false);
	const [forAuditor,setForAuditor]=useState(false);
	const [statusMesg,setStatusMesg]=useState('');
	
	const [dli,setDli]=useState('');
	const [dliAmount,setDliAmount]=useState('');
	const [grtyAmount,setGrtyAmount]=useState('');
	
	const [dliAmt,setDliAmt]=useState(0);
	const [grtyAmt,setGrtyAmt]=useState(0);
	const [amtHeld,setAmtHeld]=useState(0);
	
	const [serviceGratuity,setServiceGratuity]=useState('');

	 
	useEffect(() => {
		let isCancelled = false;
		let fetching = false;
		let unmounted = false;

		async function fetchFsDo2Data() {
			 
			console.log("########id is---:" +state);
			await axios.get(`/lpcRegisters/fetchEncashDo2/${id}`)
				.then((response) => {
			//		console.log("&&&&&&&&:" + response.data['do2List'][0].approved);
			//		console.log("&&&&&&&&:" + response.data['do2List'][1].approved);
			//		console.log("%%%%%%%%%%%%:" + response.data['do2Approved']);
				 	setFsObj(response.data);
					setAction(response.data['status']);
			//		 console.log(">>>>>>Action ---:" + action);
			//		setCurrId(response.data["fundCurrentList"][0].currId); 
			
					if(response.data['do2Approved']===true){
						setApproved(true);
					}
			//		console.log("withheld amt--:" + response.data['do2List'][0].withheldAmount);
			//		console.log("dli amt--:" + response.data['do2List'][0].dli);
			//		console.log("serGty amt--:" + response.data['do2List'][0].serviceGratuity);
					if(response.data['do2List'][0] && response.data['do2List'][0].withheldAmount!==null){
						setAmountHeld(response.data['do2List'][0].withheldAmount);
					}else{
						setAmountHeld(0);
					}
					if(response.data['do2List'][0] && response.data['do2List'][0].dli!==null){
						setDliAmount(response.data['do2List'][0].dli);
					}else{
						setDliAmount(0);
					}
					if(response.data['do2List'][0] && response.data['do2List'][0].serviceGratuity!==null){
						setGrtyAmount(response.data['do2List'][0].serviceGratuity);
					}else{
						setGrtyAmount(0);
					}
					
			//		if(response.data['do2List'][0] && response.data['do2List'][0].eligibleDli===true){
			//			setDli(true);
			//		}else{
			//			setDli(false);
			//		}
					 
					if (response.data['do2List'] !== null)
						setFsDo2Data(response.data['do2List']);
						
					if(response.data['acList']!== null)
						setFsAcData(response.data['acList']);
						
					 
					if (response.data['empList'] !== null)
						setFsEmpData(response.data['empList']);
						
					 
					 
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
		fetchFsDo2Data();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	useEffect(() => {
		let fetching = false;
		async function fetchUsrData() {
			if (!fetching)
				console.log(">>>>Usr Level is -----:" + usrLevel);
			await axios.get(`/iorTrans/userDesg`)
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
	
	useEffect(() => {
		let fetching = false;
		async function getStatus() {
			if (!fetching)
				
			await axios.get(`/lpcRegisters/status/${id}`)
				.then((response) => {
					setStatusMesg(response.data)
					if(statusMesg.startsWith("forAao")){
						setForAao(true);
					}else if(statusMesg.startsWith("forAo")){
						setForAo(true);
					}else{
						setForAuditor(true);
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
		getStatus();
		return () => { fetching = true; }

	}, []);
	 


	const onError = (errors, e) => {
		console.log(errors, e);
	}

	const returnToList = () => {
		history.push("/lpcRegisters/fsClosingList");
	}
	
	const handleAmountChange = (e) => {
		console.log(e.target.value);
		setAmountHeld(e.target.value);
		
		if(amountHeld!=null && amountHeld>0){
			setAmtHeld(e.target.value)
		}else{
			setAmtHeld(0);
		}
	 
		 
	}
	
	const handleDliAmountChange = (e) => {
		//setDli(true);
		console.log(e.target.value);
	//	setDliAmount(e.target.value);
		setDliAmount(e.target.value);
		
	//	if(dliAmount!=null && dliAmount>0){
	//		setDliAmt(e.target.value)
	//	}else{
	//		setDliAmt(0);
	//	}
	 	if(dliAmount!=null && dliAmount>0){
			setDliAmt(e.target.value)
		}else{
			setDliAmt(0);
		}
		 
	}
	const handleGrtyAmountChange = (e) => {
		console.log(e.target.value);
		setGrtyAmount(e.target.value);
	//	setServiceGratuity(e.target.value);
	//	setGrtyAmount(e.target.value);

		if(grtyAmount!=null && grtyAmount>0){
			setGrtyAmt(e.target.value)
		}else{
			setGrtyAmt(0);
		}
	 
		 
	}

	async function submitFsEncash(currId) {
		console.log(">>>>>>Current Id is ----:" + id+"---"+fsDo2Data+"---"+amountHeld+"---"+fsAcData);
		console.log(">>>>>>Amt Held  is ----:"+ amountHeld+"---"+dliAmount+"---"+grtyAmount);
		console.log(">>>>>>Amt Held  is --111111--:"+ amtHeld+"---"+dliAmt+"---"+grtyAmt);
		
		axios.put(`/lpcRegisters/submitFsEncash/${currId}/${amountHeld}/${dliAmount}/${grtyAmount}`,fsObj)
			.then((response) => {
				 setMesg(response.data);
				//	history.push({ pathname: '/lpcRegisters/fsClosingList', state: response.data });
				 
			})
			.catch((error) => {
			//	console.log(error);
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
			<div  className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 pt-4" >
				<form onSubmit={handleSubmit(onError)}>
				 
				 
				
							 <div className="container">
							<h1 class="text-blue-600" align="center">Officer Details</h1>
							 
            <table className="table table-striped table-bordered">
         
   
                <thead>
                    <tr>
                         
                        <th>Cdao No</th>
                        <th>Name</th>
                        <th>Rank</th>
                         <th>Personel No</th>
                         <th>Date of Commission</th>
                           
                    </tr>
                     {fsEmpData && fsEmpData.map(tb =>
                        <tr key={tb.dakId}>
                           
                            <td>{tb.cdaoNo} {tb.checkDigit}</td>
                            <td>{tb.name}</td>
                            <td>{tb.rank}</td>
                            <td>{tb.perNo}</td>
                            <td>{tb.doc}</td>
                            
                        </tr>
                    )}
                   
                 
                </thead>
				
				<tbody>
                   
                    {fsEmpData.length===0 &&
                    <tr>
                            <td colspan="5" align="center">No Officer Record Found----Please Check </td>
                            
                        </tr>
                    }
                </tbody>
				
		 </table>
		 <br/>
		 </div>
		 			 				 
						 
		 				 <div className="container">
							<h1 class="text-blue-600" align="center">Encash Do2 Details</h1>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                    	 <th>Do2 Id</th>
                    	  <th>Do2 DakId No</th>
                        <th>Occurrence Code</th>
                        <th>From Date</th>
                        <th>Data 1</th>
                        <th>Data 2</th>
                         <th>Data 3</th>
                          <th>Data 4</th>
                           <th>Status</th>
                            <th>Approved</th>
                            <th>Encash Amount</th>
                             <th>Withheld Amount</th>
                               
                             	 <th>DLI</th>
                            
                              <th>Service Gratuity</th>
                             
                         
                    </tr>
                     {fsDo2Data && fsDo2Data.map(tf =>
                      <tr key={tf.dakId}>
                      <td>{tf.id}</td>
                        <td>{tf.dakidNo}</td>
                           
                            <td>{tf.occurrenceCode}</td>
                            
                            <td>{tf.fromDate}</td>
                            <td>{tf.data1}</td>
                            <td>{tf.data2}</td>
                            <td>{tf.data3}</td>
                            <td>{tf.data4}</td>
                            <td>{tf.status}</td>
                            <td>{tf.approved}</td>
                            <td>{tf.encashAmt}</td>
                          
                            {tf.approved && tf.approved===true && usrLevel<30 &&
                            <td>
                            
                             <input type='text'  value={amountHeld} onChange={handleAmountChange}/>
                             </td>
                             }
                             
                              {tf.approved && tf.approved===true && usrLevel>=30 &&
                            <td>
                            
                             <input type='text'  value={amountHeld} />
                             </td>
                             }
                           
                             
                               {tf.approved && tf.approved===true  &&  usrLevel<30 &&
                            <td>
                            
                             <input type='text'  value={dliAmount} onChange={handleDliAmountChange}/>
                             
                             </td>
                             }
                              {tf.approved && tf.approved===true && usrLevel>=30 &&
                            <td>
                            
                             <input type='text'  value={dliAmount} />
                             </td>
                             }
                             
                              {tf.approved && tf.approved===true && usrLevel<30 &&
                             <td>
                            
                             <input type='text'  value={grtyAmount} onChange={handleGrtyAmountChange}/>
                             
                             </td>
                             }
                              {tf.approved && tf.approved===true && usrLevel>=30 &&
                            <td>
                            
                             <input type='text'  value={grtyAmount} />
                             </td>
                             }
                             
                             
                              
                             
                        
                             
                             
                        </tr>
                    )}
                    
                     
                     
                </thead>
				
				<tbody>
                   
                    {fsDo2Data.length===0 &&
                    <tr>
                            <td colspan="13" align="center">No Fs Encash Do2 Found for the Officer </td>
                            
                        </tr>
                    }
                </tbody>
				
		 </table>
		 <br/>
		 </div>
		 
		  <div className="container">
							<h1 class="text-blue-600" align="center">Last Pay Details</h1>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                    <th>Last Rank Held</th>
                    	 <th>Basic Pay</th>
                    	  <th>Da</th>
                        <th>Msp</th>
                        <th>Npa</th>
                        <th>Pay Level</th>
                         
                             
                         
                    </tr>
                     {fsAcData && fsAcData.map(tf =>
                      <tr key={tf.dakId}>
                      <td>{tf.lastRank}</td>
                        <td>{tf.basic}</td>
                           
                            <td>{tf.da}</td>
                            
                            <td>{tf.msp}</td>
                            <td>{tf.npa}</td>
                            <td>{tf.payLevel}</td>
                            
                          
                             
                             
                        </tr>
                    )}
                    
                     
                     
                </thead>
				
				<tbody>
                   
                    {fsAcData.length===0 &&
                    <tr>
                            <td colspan="15" align="center">No Audit Cage Found for the Officer </td>
                            
                        </tr>
                    }
                </tbody>
				
		 </table>
		 <br/>
		 </div>

		  
				
		 <div className="text-red-700 fontSize:20 fontWeight:bold">{mesg}</div>
		 

					<div align="center">
						 
						 
						 {((forAuditor===true || forAao===true) && (forAo===false)) &&
						 
							<button
								className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
								onClick={() => submitFsEncash(id)}
							>	Submit 	</button>
							
						}	
						 {' '}
						 {((forAo===true) && (forAuditor===false || forAao===false)) &&
						 
							<button
								className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
								onClick={() => submitFsEncash(id)}
							>	Approve 	</button>
							
						}	
						{ ' '}
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

export default withRouter(FsEncashDo2Info);


