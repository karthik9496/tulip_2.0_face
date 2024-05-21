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
import * as yup from "yup";

import { yupResolver } from '@hookform/resolvers/yup';
import LiveSearch from '../utils/LiveSearch';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from '../utils/Table';

const schema = yup.object({
	dak: yup.object().required('Required'),
	//    billType: yup.object().required('Required'),
	section: yup.object().required('Required'),
//	employee: yup.object().required('Required'),
	 
	amountClaimed: yup.number().required('Required'),
 
});


const KonkanRailwayCarriageBill = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [key, setKey] = useState('page1');


	const [claimDate, setClaimDate] = useState(new Date());
	const [rankName, setRankName] = useState('');
	const [cdaoNo, setCdaoNo] = useState(''); 
	const [monthEnding, setMonthEnding] = useState('');
	const [ifsc, setIfsc] = useState('');
	const [account, setAccount] = useState('');
	const [dakId, setDakId] = useState('');
	const [bankDetails, setBankDetails] = useState('');
	const [loading, setLoading] = useState(true);
	const [vendorId, setVendorId] = useState('');

	 
	useEffect(() => {
		let isCancelled = false;
		//console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get('/cbillTadaLtcs/' + id)
					.then((response) => {
						record = response.data;
						//console.log(">>>>>>>:" + record.monthEnding);
						//console.log(">>>>>>>:" + record.claimType);

					})
					.catch((error) => {
						//console.log(error);
						//console.log(error.response.status);
						//console.log(error.response.headers);
						if (error.response)
							setServerErrors(error.response.data.error);
						else
							setServerErrors(error.Error);
					});
				 
				setDakId(record.dak.dakidNo);
				setMonthEnding(record.monthEnding);	
				console.log(">>>>>>:"+ record.vendor);
				setVendorId(record.vendor); 
				
				const fields = [
					'id', 'dak', 'billType', 'section', 'employee', 'cdaNo', 'checkDigit',
					'claimType', 'claimDate', 'monthEnding', 'journeyStationFrom', 'journeyStationTo',
					'modeOfJourney', 'blockYear', 'amountClaimed', 'amountPassed', 'advanceAmount',
					'amountDisallowed', 'penalInterest', 'adjustmentAmount', 'finalAdjustment',
					'approved', 'recordStatus', 'reason', 'unit', 'foreignTravel', 'recoveries',
					'periodFrom', 'periodTo', 'noOfDays', 'typeOfLtc', 'verifiedAuditChecks', 'codeHd',
					'provisionalPayment', 'classOfTravel', 'journeyStartDate', 'journeyEndDate',
					'journeyDa', 'paymentMode', 'cdr', 'paymentRecordType', 'foreignTadaAmount',
					'mroAmount', 'mroDakId', 'movementOrderNo', 'movementOrderDate', 'otherAmount',
					'bankAccount', 'htBlockYear', 'cvInLieuOfLtc', 'noOfMembers', 'empCategory',
					'roundTripFarePerPerson', 'totalFare', 'leaveEncashAmount', 'totalValue', 'auditorDate',
					'aaoDate', 'aoDate', 'dvNo', 'calendarYear','dvMonth', 'dpSheetNo', 'dpSheetDate',
					'cmpBatch', 'cmpFileNo', 'cmpDate', 'fdList','dList','oList','noOfDays','foodCharges','lodgingCharges',
					'distance','ctg','baggageQuantity','baggageAmount','conveyanceAmount','conveyanceType','taRule','advId',
					'transId','taskNo','rejectionDetailList','vendor','noOfVouchers'
				];
				fields.forEach(field => setValue(field, record[field]));
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
	
		useEffect(() => {
		let fetching = false;
		let unmounted = false;
		async function fetchBankDetailsData() {

			if (!fetching)
				await axios.get(`/vendors/${vendorId}/bankDetails`)
					.then((response) => {
						console.log("==========Bank Details====:" + response.data);
						setBankDetails(response.data);
						setAccount(response.data['bankAccountClearText']);
						setIfsc(response.data['ifsc']);
						if (!unmounted) {
							setBankDetails(
								response.data.map(({ cdaoNo, bankAccountNo, ifsc }) => ({ label: cdaoNo, value: bankAccountNo, ifsc: ifsc }))
							);
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
		fetchBankDetailsData();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [vendorId, setVendorId]);
	 	 
	const onSubmit = (data, event) => {
		event.preventDefault();
		console.log(data);
		if (data.id) {
			axios.put("/cbillTadaLtcs/konkanRailwayCarriageBill/" + data.id, data)
				.then((response) => { 
					if(response.status===200)
						history.push("/cbillTadaLtcs");
					else
						setServerErrors(response.data);
				})
				.catch((error) => {
					//console.log(error.response.data);
					console.log("response--------"+error.response.status);
					
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		}  

		 
	}
	 
	const setAccountNo = (e) => {
		setCdaoNo(e.target.value);
	}
	const viewRankName = () => {

		//console.log("--------" + cdaoNo);
		axios.get("/cbillTadaLtcs/rankname/" + cdaoNo)
			.then((response) => {
				if (response.status === 200) {
					setRankName(response.data);
				}
			})
	}
	const onError = (errors, e) => console.log(errors, e);

	//All foreign keys. 
	// XXXXXX Add search fields and adjust the values as necessary
	const parentData = {
 
		vendor: {
			title: "Vendor Name",
			url: "vendors",
			searchList: ['vendorName'], //XXXXXXXXX Add search fields
			fkEntity: "fkVendor",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
	 
	}
 
	//Callback for child components (Foreign Keys)
	const callback = (childData) => {
		
		//setEntity(prev => ({ ...prev, [childData.fk]: childData.entity }));
		 
		setValue(childData.fk, childData.entity);
		if (childData.fk === 'employee') {
			//console.log("parent callback-----------" + childData.entity.rank.rankName);
			setRankName(childData.entity.rank.rankName)
		}
		 
		
		 
		//console.log(errors);
		clearErrors(childData.fk);
	};
	
	 

	const errorCallback = (err) => {
		//console.log(err);
		setServerErrors(err);
	}

	const handleInputChange = (e) => {
		//console.log(e.target.value);onClick={handleFdChange}/></td>
	};
	 
 
	
	const handleButtonClick =() => {
		history.push("/cbillTadaLtcs");
	}
	 
	 
	return (
		<div className="max-w-xl mx-auto ">
			<div className="w-full w-3/4  mx-auto " >

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Konkan Railway Carriage Bills</h1>
					<div className="text-red-500">{serverErrors}</div>
					 

					 
							<div className="grid grid-cols-2 gap-0 ">
							<div>
									<label>Month Ending</label>
									{monthEnding}
								</div>

								<div >
									<label>DakId</label> {dakId}
								</div>

								<div>
									<label>Bank Details</label>
									{account},{ifsc}
								</div>

							 
							  

								<div >
									<LiveSearch name="vendor" onChange={handleInputChange}
										parentData={parentData.vendor} parentCallback={callback}
										fkEntity={entity.vendor} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.vendor?.message}</div>
								</div>
								 
								 <div>
									<label>Number of Vouchers</label>
									<input type="text"    name="noOfVouchers" {...register("noOfVouchers")}
										/>
									<div className="text-red-500">{errors.noOfVouchers?.message}</div>
								</div>
								
								<div>
									<label>Amount Claimed</label>
									<input type="text" name="amountClaimed" {...register("amountClaimed")} 
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.amountClaimed?.message}</div>
								</div>
								<div>
									<label>Amount Passed</label>
									<input type="text" name="amountPassed" {...register("amountPassed")} 
										className="form-control py-0"  
									/>
									<div className="text-red-500">{errors.amountPassed?.message}</div>
								</div>
	 	 
								</div>
						 

								<div className="px-2">
						<button type="submit" >Save</button>   
					</div>
						 
				<div className="px-2">
				<button type="button" onClick={handleButtonClick} >Cancel</button>
				</div>
				 

				</form>
			</div>
		</div>
	);
};

export default withRouter(KonkanRailwayCarriageBill);