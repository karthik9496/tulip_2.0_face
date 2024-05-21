/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By : 
 */

import { useState, useEffect, useMemo } from "react";
import Table3, { SelectColumnFilter } from '../utils/Table3'  // 
import { withRouter, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import * as yup from "yup";

import { yupResolver } from '@hookform/resolvers/yup';

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { Link } from "react-router-dom";


const TBillInfoEdit = () => {
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
	const [tBillData, setTBillData] = useState([]);
	const [tBillFamData, setTBillFamData] = useState([]);
	const [tBillDisData, setTBillDisData] = useState([]);
	const [tBillPmData, setTBillPmData] = useState([]);
	const [tBillCsData, setTBillCsData] = useState([]);
	const [rejectionList, setRejectionList] = useState([]);
 
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
			await axios.get(`/cbillTadaLtcs/${id}/tbillInfo`)
				.then((response) => {
					console.log("&&&&&&&&:" + response.data['status']);
				 
					setAction(response.data['status']);
					setTBillData(response.data['cbill']);
					console.log("-------"+tBillData[0]);
					if (response.data['familyDetailList'] !== null)
						setTBillFamData(response.data['familyDetailList']);
					if (response.data['disallowanceList'] !== null)
						setTBillDisData(response.data['disallowanceList']);
					if (response.data['pmList'] !== null)
						setTBillPmData(response.data['pmList']);
					if (response.data['csList'] !== null)
						setTBillCsData(response.data['csList']);
					if (response.data['rejectionList'] !== null)
						setRejectionList(response.data['rejectionList']);
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


	async function submitCbill(id) {
		await axios.put(`/cbillTadaLtcs/${id}/submitCbill`)
			.then((response) => {
				//console.log(data);
				//let updatedRecords = [...data].filter((i) => i.id !== id);
				//	console.log(updatedRecords);
				//setData(updatedRecords);
				//setUpdate(!update);
				history.push({ pathname: '/cbillTadaLtcs', state: response.data });
				//history.push("/cbillTadaLtcs");
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
		await axios.put(`/cbillTadaLtcs/${id}/approveCbill`)
			.then((response) => {
				//console.log(data);
				//let updatedRecords = [...data].filter((i) => i.id !== id);
				//console.log(updatedRecords);
				//setData(updatedRecords);
				//setUpdate(!update);
				history.push({ pathname: '/cbillTadaLtcs', state: response.data });
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



	const onError = (errors, e) => {
		console.log(errors, e);
	}

	const returnToList = () => {
		history.push("/cbillTadaLtcs");
	}



	const ShowRejectionInfo = () => {

		const columns = useMemo(() => [

			{
				Header: "Caption",
				accessor: 'caption',
			},
			{
				Header: "Remarks",
				accessor: 'remarks',// Change this
				Cell: ({ row }) => (
					<div>{row.original.caption === 'Other' &&
						<input type="text" value={rejectionList[row.index]['otherRejection']} />
					}
						{row.original.caption !== 'Other' &&
							<label>{row.original.remarks} </label>
						}

					</div>
				)
			},


		], [rejectionList])

		return (
			<div className="h-48 bg-green-100 text-gray-900">

				<main className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">

					<div className=" ">
					</div>
					<div className="-mt-2 max-h-0 py-0 ml-0">

						<Table3 columns={columns} data={rejectionList} className="table-auto" />
					</div>
				</main>

			</div>
		);
	}

	const ShowFamilyInfo = () => {
		const columns = useMemo(() => [

			{
				Header: "CDAO No",
				accessor: 'cdaoNo',
			},

			{
				Header: "Name Of Family Member",
				accessor: 'nameOfFamilyMember',
			},

			{
				Header: "Date of Birth",
				accessor: 'dob',
			},

			{
				Header: "Relation",
				accessor: 'relation',
			},


		], [tBillFamData])

		return (
			<div className="h-48 bg-green-100 text-gray-900">

				<main className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">

					<div className=" ">
					</div>
					<div className="-mt-2 max-h-0 py-0 ml-0">

						<Table3 columns={columns} data={tBillFamData} className="table-auto" />
					</div>
				</main>

			</div>
		);
	}

	const ShowDisallowanceInfo = () => {
		const columns = useMemo(() => [

			 

			{
				Header: "Disallowance Name",
				accessor: 'disallowanceName',
				Cell: ({ row }) => (
				<div>
				<div>
				<label>{row.original.disallowanceName}</label>
				 </div>
				 <div>
				 {row.original.remarks &&
				<label>Remarks : {row.original.remarks}</label>
				}
				 </div>
				   
				</div>
				
				)
			},

			{
				Header: "Amount Claimed",
				accessor: 'itemAmountClaimed',
			},

			{
				Header: "Amount Admitted",
				accessor: 'amountAdmitted',
			},


		], [tBillDisData])

		return (
			<div className="h-64 bg-green-100 text-gray-900">

				<main className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">

					<div className=" ">
					</div>
					<div className="-mt-2 max-h-0 py-0 ml-0">

						<Table3 columns={columns} data={tBillDisData} className="table-auto" />
					</div>
				</main>

			</div>
		);
	}

	const ShowPmInfo = () => {
		const columns = useMemo(() => [

			{
				Header: "Dak-Id",
				accessor: 'dakidNo',
			},

			{
				Header: "Receipt Side",

				columns: [
					{
						Header: "Code Head",
						accessor: 'receiptCodeHead'
					},
					{
						Header: "Plus Receipt",
						accessor: 'receiptPlusAmount'
					},
					{
						Header: "Minus Receipt",
						accessor: 'receiptMinusAmount'
					}

				]

			},

			{
				Header: "Charges Side",

				columns: [
					{
						Header: "Code Head",
						accessor: 'chargeCodeHead'
					},
					{
						Header: "Plus Charge",
						accessor: 'chargePlusAmount'
					},
					{
						Header: "Minus Charge",
						accessor: 'chargeMinusAmount'
					}

				]

			},
			{
				Header: "Record Status",
				accessor: 'recordStatus',
			},


		], [tBillPmData])

		return (
			<div className="h-64 bg-green-100 text-gray-900">

				<main className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">

					<div className=" ">
					</div>
					<div className="-mt-2 max-h-0 py-0 ml-0">

						<Table3 columns={columns} data={tBillPmData} className="table-auto" />
					</div>
				</main>

			</div>
		);
	}

	const ShowCsInfo = () => {
		const columns = useMemo(() => [

			{
				Header: "Dak-Id",
				accessor: 'dakidNo',
			},

			{
				Header: "Bank Name",
				accessor: 'bankDetails',
			},

			{
				Header: "IFSC",
				accessor: 'ifscCode',
			},

			{
				Header: "Bank Account Number",
				accessor: 'bankAccountNo',
			},

			{
				Header: "Amount",
				accessor: 'amount',
			},

			{
				Header: "Cheque Slip Date",
				accessor: 'chequeSlipDate',
			},

			{
				Header: "Record Status",
				accessor: 'recordStatus',
			},


		], [tBillCsData])

		return (
			<div className="h-48 bg-green-100 text-gray-900">

				<main className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">

					<div className=" ">
					</div>
					<div className="-mt-2 max-h-0 py-0 ml-0">

						<Table3 columns={columns} data={tBillCsData} className="table-auto" />
					</div>
				</main>

			</div>
		);
	}

	return (
		<div className="h-126 bg-green-100 text-gray-900">

			<main className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">

				<div className="grid grid-cols-2 gap-0">
				{tBillData[0] && <>
				<div>
						<label>Dak Id</label> {tBillData[0]["dakidNo"]} { ' : '} {tBillData[0]["receiptDate"]}
						 						</div>
						 	<div>
						<label>Adv Id</label> {tBillData[0]["advId"]}
					</div>
					<div>
						<label>Trans Id</label> {tBillData[0]["transId"]}
					</div>
						 		<div>
						<label>Section</label> {tBillData[0]["sectionName"]} {' :  Task '} {tBillData[0]["taskNo"]} 
					</div>				 
						 
						 <div>
						<label>Officer</label> {tBillData[0]["rankName"]} {' : '} {tBillData[0]["empName"]} {':'}  {tBillData[0]["cdaoNo"]}
						 </div>
						 
						 
					<div>
						<label>Pay</label> {tBillData[0]["basicPay"]} {' : '} {tBillData[0]["payLevel"]}
					</div>
					
					<div>
						<label>Type Of Claim</label> {tBillData[0]["typeOfClaim"]}
					</div>
					<div>
						<label>Movement Order</label> {tBillData[0]["movementOrderNo"]} {'/'} {tBillData[0]["movementOrderDate"]}
					</div>
					 
					<div>
						<label>Claim Date</label> {tBillData[0]["billDate"]}
					</div>
					<div>
						<label>Station From To</label> {tBillData[0]["journeyStationFrom"]} {' - '} {tBillData[0]["journeyStationTo"]}
					</div>
					<div>
						<label>From Date - To Date</label> {tBillData[0]["journeyStartDate"]} {' - '} {tBillData[0]["journeyEndDate"]}
					</div>
					
					<div>
						<label>Block Year</label> {tBillData[0]["blockYear"]}
					</div>
					<div>
						<label>Amount Claimed</label> {tBillData[0]["amountClaimed"]}
					</div>
					
					<div>
						<label>Amount Passed</label> {tBillData[0]["amountPassed"]}
					</div>
					
					<div>
						<label>Amount Disallowed</label> {tBillData[0]["amountDisallowed"]}
					</div>

<div>
						<label>Advance Amount</label> {tBillData[0]["advanceAmount"]}
					</div>
					<div>
						<label>Penal Interest</label> {tBillData[0]["penalInterest"]}
					</div>
					<div>
						<label>Adjustment Amount</label> {tBillData[0]["adjustmentAmount"]}
					</div>
					<div>
						<label>No. of Members</label> {tBillData[0]["noOfMembers"]}
					</div>
					<div>
						<label>Total Fare</label> {tBillData[0]["totalFare"]}
					</div>
					<div>
						<label>Food Charges</label> {tBillData[0]["foodCharges"]}
					</div>
					<div>
						<label>Lodging Charges</label> {tBillData[0]["lodgingCharges"]}
					</div>
					<div>
						<label>Distance</label> {tBillData[0]["distance"]}
					</div>
					<div>
						<label>CTG</label> {tBillData[0]["ctg"]}
					</div>
					<div>
						<label>Baggage Qty</label> {tBillData[0]["baggageQuantity"]}
					</div>
					<div>
						<label>Baggage Amount</label> {tBillData[0]["baggageAmount"]}
					</div>
					<div>
						<label>Conveyance Type</label> {tBillData[0]["conveyanceType"]}
					</div>
					<div>
						<label>Conveyance Amount</label> {tBillData[0]["conveyanceAmount"]}
					</div>
					<div>
						<label>TA Rule</label> {tBillData[0]["taRule"]}
					</div>
					
					<div>
						<label>Auditor</label> {tBillData[0]["auditorName"]} {' : '} {tBillData[0]["auditorDate"]}
					</div>
					<div>
						<label>AAO</label>  {tBillData[0]["aaoName"]} {' : '} {tBillData[0]["aaoDate"]}
					</div>
					
					<div>
						<label>SAO/AO</label>  {tBillData[0]["aoName"]} {' : '} {tBillData[0]["aoDate"]}
					</div>
					
					<div>
						<label>Record Status/Approved</label>  {tBillData[0]["recordStatus"]} {' : '} {tBillData[0]["approved"]}
					</div>
					<div>
						<label>Reason</label>  {tBillData[0]["reason"]}  
					</div>
					</>}
					</div>
					


					

					<div>
						<h3 className="p-2  text-xl font-bold">Rejection Details</h3>
						<ShowRejectionInfo />
					</div>

					<div>
						<h3 className="p-2  text-xl font-bold">Family Details</h3>
						<ShowFamilyInfo />
					</div>

					<div>
						<h3 className="p-2  text-xl font-bold">Disallowance Details</h3>
						<ShowDisallowanceInfo />
					</div>

					<div>
						<h3 className="p-2  text-xl font-bold">PM Details</h3>
						<ShowPmInfo />
					</div>

					<div>
						<h3 className="p-2  text-xl font-bold">Cheque Slip Details</h3>
						<ShowCsInfo />
					</div>
					<div>
						<Link to={"/cbillTadaLtcs"}>
							<button className=" w-16 m-0 p-0 " > Close </button>
						</Link>


					</div>

					<div>
						{' '}
						{(action === 'Submission by AAO.') &&
							<button
								className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
								onClick={() => submitCbill(id)}
							>	Submit 	</button>
						}
						{' '}
						{(action === 'Approval by AO.') &&
							<button
								className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
								onClick={() => approve(id)}
							>	Approve 	</button>
						}
					</div>
			</main>


		</div>

	);


};

export default withRouter(TBillInfoEdit);


