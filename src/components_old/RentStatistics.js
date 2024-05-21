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


const RentStatistics = () => {
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
	 
	const [iorData,setIorData]=useState([]);
	const [qstData,setQstData]=useState([]);
	const [rbsData,setRbsData]=useState([]);
	const [date, setDate] = useState(new Date());  
	 

	useEffect(() => {
		let isCancelled = false;
		let fetching = false;
		let unmounted = false;

		async function fetchRentStatistics() {
		  
			await axios.get(`/rents/rentStatus`)
				.then((response) => {
				  
					if (response.data['rmIorList'] !== null)
						setIorData(response.data['rmIorList']);
						
					if (response.data['rmQstList'] !== null)
						setQstData(response.data['rmQstList']);
						
					if (response.data['rmRbsList'] !== null)
						setRbsData(response.data['rmRbsList']);	 
					 
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
		fetchRentStatistics();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	 function CurrentDate() { 
		
		return ( <div> <h1>Current Date: {date. toDateString()}</h1> </div> ); 
		}  


	const onError = (errors, e) => {
		console.log(errors, e);
	}

	const returnToList = () => {
		history.push("/menus");
	}

 
 
	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<div  className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 pt-4" >
				 
				 
				 
				
							 <div className="container">
							<h1 class="text-blue-900" align="center">Rent-Statistics</h1>
							 <br/>
							 <br/>
							 <h1 class="text-blue-600" align="center">Ior Status as on--- {date.toDateString()}</h1>
            <table className="table table-striped table-bordered">
          
                <thead>
                    <tr>
                         <th>Task No</th>
                         <th>Rent Type</th>
                          <th>Pending</th>
                        <th>Valid</th>
                        <th>Invalid</th>
                        <th>Rejected</th>
                         
                           
                    </tr>
                    {iorData && iorData.map(tb =>
                        <tr key={tb.task}>
                           
                            <td>{tb.task}</td>
                            {tb.rentType &&
                            <td>{tb.rentType}</td>
                            }
                            
                            <td>{tb.totalPending ? tb.totalPending:0}</td>
                            
                            <td>{tb.totalValid ? tb.totalValid:0}</td>
                            
                            <td>{tb.totalInvalid ? tb.totalInvalid:0}</td>
                             
                             
                              
                            <td>{tb.totalRejected ? tb.totalRejected:0}</td>
                            
                            
                            
                           
                            
                        </tr>
                    )}
                     
                   
                 
                </thead>
				
				<tbody>
                   
                    {iorData.length===0 &&
                    <tr>
                            <td colspan="6" align="center">No Ior Details Found----Please Check </td>
                            
                        </tr>
                    }
                </tbody>
				
		 </table>
		 <br/>
		 </div>
		 
		   					 <div className="container">
							 
							 <br/>
							 <br/>
							 <h1 class="text-blue-600" align="center">Qst Status as on ---- {date.toDateString()}</h1>
            <table className="table table-striped table-bordered">
          
                <thead>
                    <tr>
                         <th>Task No</th>
                         <th>Rent Type</th>
                          <th>Pending</th>
                        <th>Valid</th>
                        <th>Invalid</th>
                        <th>Rejected</th>
                         
                           
                    </tr>
                    {qstData && qstData.map(tb =>
                        <tr key={tb.task}>
                           
                            <td>{tb.task}</td>
                            
                            <td>{"Quaterly"}</td>
                             
                            
                            <td>{tb.totalPending ? tb.totalPending:0}</td>
                            
                            <td>{tb.totalValid ? tb.totalValid:0}</td>
                            
                            <td>{tb.totalInvalid ? tb.totalInvalid:0}</td>
                             
                             
                              
                            <td>{tb.totalRejected ? tb.totalRejected:0}</td>
                            
                            
                            
                           
                            
                        </tr>
                    )}
                     
                   
                 
                </thead>
				
				<tbody>
                   
                    {qstData.length===0 &&
                    <tr>
                            <td colspan="6" align="center">No Qst Details Found----Please Check </td>
                            
                        </tr>
                    }
                </tbody>
				
		 </table>
		 <br/>
		 </div>
 
 					 <div className="container">
							 
							 <br/>
							 <br/>
							 <h1 class="text-blue-600" align="center">Rbs Status as on --- {date.toDateString()} </h1>
            <table className="table table-striped table-bordered">
          
                <thead>
                    <tr>
                         <th>Task No</th>
                         <th>Rent Type</th>
                          <th>Pending</th>
                        <th>Valid</th>
                        <th>Invalid</th>
                        <th>Rejected</th>
                         
                           
                    </tr>
                    {rbsData && rbsData.map(tb =>
                        <tr key={tb.task}>
                           
                            <td>{tb.task}</td>
                            
                            <td>{"Single Rent"}</td>
                             
                            
                            <td>{tb.totalPending ? tb.totalPending:0}</td>
                            
                            <td>{tb.totalValid ? tb.totalValid:0}</td>
                            
                            <td>{tb.totalInvalid ? tb.totalInvalid:0}</td>
                             
                             
                              
                            <td>{tb.totalRejected ? tb.totalRejected:0}</td>
                            
                            
                            
                           
                            
                        </tr>
                    )}
                     
                   
                 
                </thead>
				
				<tbody>
                   
                    {rbsData.length===0 &&
                    <tr>
                            <td colspan="6" align="center">No Rbs Details Found----Please Check </td>
                            
                        </tr>
                    }
                </tbody>
				
		 </table>
		 <br/>
		 </div>
					 
			 
			</div>


		</div>

	);


};

export default withRouter(RentStatistics);


