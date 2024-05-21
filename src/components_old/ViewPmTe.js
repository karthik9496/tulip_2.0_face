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


const ViewPmTe = () => {
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
	 
	const [pmData, setPmData] = useState([]);
	 
 
	const [dakType,setDakType]=useState('');
	const [billType,setBillType]=useState('');
	const [rank,setRank]=useState('');
	const [sectionName,setSectionName]=useState('');



	useEffect(() => {
		let isCancelled = false;
		let fetching = false;
		let unmounted = false;

		async function fetchTBillData() {
			 
			console.log("########id is---:" + id);
			await axios.get(`/transferEntrys/viewPm/${id}`)
				.then((response) => {
				 console.log("########data is---:" + response.data);
					if (response.data  !== null)
						setPmData(response.data);
					 
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
		fetchTBillData();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);


 


	const onError = (errors, e) => {
		console.log(errors, e);
	}

	const returnToList = () => {
		history.push("/transferEntrys");
	}



	 
	

	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<div  className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 pt-4" >
				<form>
				 
				 
				
						 
		 
		 
		  <div className="container">
							<h1 class="text-blue-600" align="center">Punching Media Details</h1>
            <table class="table striped hovered main-first-cell">
             
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
                  </thead>   
                  <tbody>
                     {pmData && pmData.map(tp =>
                      <tr key={tp.dakidNo}>
                        <td>{tp.receiptCodeHead}</td>
                            <td>{tp.receiptPlusAmount}</td>
                            <td>{tp.receiptMinusAmount}</td>
                             <td>{tp.chargeCodeHead}</td>
                            <td>{tp.chargePlusAmount}</td>
                            <td>{tp.chargeMinusAmount}</td>
                             
                        </tr>
                    )}
                    
                     </tbody>
                     
               
			 
				 
				
		 </table>
		 <br/>
		 </div>
		 
		 
	 
				
		 
		 

					<div align="center">
						{' '}
						{ 
							<button
								className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
								onClick={() => returnToList(id)}
							>	Close 	</button>
						}
						 
					</div>
					 
			</form>
			</div>


		</div>

	);


};

export default withRouter(ViewPmTe);


