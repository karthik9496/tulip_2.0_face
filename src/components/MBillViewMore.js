/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 03 April 2024
 *
 * Modified By : 
 */

import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import * as yup from "yup";

import { yupResolver } from '@hookform/resolvers/yup';
import LiveSearch from '../utils/LiveSearch';

//import DatePicker  from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";
//import addDays from 'date-fns/addDays'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import styles from "./../index.css"

import { Link } from "react-router-dom";


const BillEdit = () => {

	let { id } = useParams();

	let navigate = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [key, setKey] = useState('page1');
	const [responseData, setResponseData] = useState(null);
	const [count, setCount] = useState(0);

	useEffect(() => {

		let record = '';
		let isCancelled = false;
		console.log(id);
		async function fetchData() {
			await axios.get('/mbills/' + id)
				.then((response) => {
					record = response.data;
					setResponseData(response.data);

				})
				.catch((error) => {

					if (error.response)
						setServerErrors(error.response.data.error);
					else
						setServerErrors(error.Error);
				});


			if (!isCancelled) {
				setEntity(record);
				setState(prev => ({ ...prev, state: record }));
			}
		}

		fetchData();
		return () => {
			isCancelled = true;
		};


	}, []);


	return (
		<div className="max-w-12xl mx-auto p-6">
			<h3 className="text-lg font-medium" style={{ backgroundColor: '#23bd87' }}>Bill Details</h3>
			<div className="gap-y-6 px-4 py-5" style={{ backgroundColor: '#d1f4e5' }}>
				<div className="sm:col-span-1 flex">
					<label htmlFor="dakId" className="block text-sm font-bold text-gray-700 indElements">
						DakId No
					</label>
					<div>
						{responseData && responseData.dak.dakidNo}
					</div>
				</div>
				<div className="sm:col-span-1 flex">
					<label htmlFor="month" className="block text-sm font-bold text-gray-700 indElements" >
						Month
					</label>
					<div>
						{responseData && responseData.month}

					</div>
				</div>
				<div className="sm:col-span-1 flex">
					<label htmlFor="dakId" className="block text-sm font-bold text-gray-700 indElements" >
						Section
					</label>
					<div>
						{responseData && responseData.sectionName}

					</div>
				</div>
				<div className="sm:col-span-1 flex">
					<label htmlFor="dakId" className="block text-sm font-bold text-gray-700 indElements" >
						Unit
					</label>
					<div>
						{responseData && responseData.unit.unitCode + ':' + responseData.unit.unitName}

					</div>
				</div>
				<div className="sm:col-span-1 flex">
					<label htmlFor="dakId" className="block text-sm font-bold text-gray-700 indElements" >
						IFA Concurrence
					</label>
					<div>
						{responseData && responseData.ifaConcurrence}

					</div>
				</div>
				<div className="sm:col-span-1 flex">
					<label htmlFor="dakId" className="block text-sm font-bold text-gray-700 indElements" >
						Bill No
					</label>
					<div>
						{responseData && responseData.billNo}

					</div>
				</div>
				<div className="sm:col-span-1 flex">
					<label htmlFor="dakId" className="block text-sm font-bold text-gray-700 indElements" >
						Bill Date
					</label>
					<div>
						{responseData && responseData.billDate}

					</div>
				</div>
				<div className="sm:col-span-1 flex">
					<label htmlFor="dakId" className="block text-sm font-bold text-gray-700 indElements" >
						Type Of Bill
					</label>
					<div>
						{responseData && responseData.typeOfBill}

					</div>
				</div>
				<div className="sm:col-span-1 flex">
					<label htmlFor="dakId" className="block text-sm font-bold text-gray-700 indElements" >
						Nature Of Bill
					</label>
					<div>
						{responseData && responseData.billNature}

					</div>
				</div>
				<div className="sm:col-span-1 flex">
					<label htmlFor="dakId" className="block text-sm font-bold text-gray-700 indElements" >
						Invoice No
					</label>
					<div>
						{responseData && responseData.invoiceNumber}

					</div>
				</div>
				<div className="sm:col-span-1 flex">
					<label htmlFor="dakId" className="block text-sm font-bold text-gray-700 indElements" >
						Invoice Date
					</label>
					<div>
						{responseData && responseData.invoiceDate}

					</div>
				</div>
				<div className="sm:col-span-1 flex">
					<label htmlFor="dakId" className="block text-sm font-bold text-gray-700 indElements" >
						Payment To
					</label>
					<div>
						{responseData && responseData.paymentTo}

					</div>
				</div>
				<div className="sm:col-span-1 flex">
					<label htmlFor="dakId" className="block text-sm font-bold text-gray-700 indElements" >
						Payment Mode
					</label>
					<div>
						{responseData && responseData.paymentMode}

					</div>
				</div>
				<div className="sm:col-span-1 flex">
					<label htmlFor="dakId" className="block text-sm font-bold text-gray-700 indElements" >
						Vendor
					</label>
					<div>
						{responseData && responseData.vendor ? (responseData.vendor.vendorName + '-' +
							responseData.vendor.address1 + ',' + responseData.vendor.address2 +
							',' + responseData.vendor.city) : ''}

					</div>
				</div>
				<div className="sm:col-span-1 flex">
					<label htmlFor="dakId" className="block text-sm font-bold text-gray-700 indElements" >
						Pan
					</label>
					<div>
						{responseData && responseData.vendor ? (responseData.vendor.panNumber) : ''}

					</div>
				</div>
				<div className="sm:col-span-1 flex">
					<label htmlFor="dakId" className="block text-sm font-bold text-gray-700 indElements" >
						GST IN
					</label>
					<div>
						{responseData && responseData.vendorGstin ? (responseData.vendorGstin.gstin) : ''}

					</div>
				</div>
				<div className="sm:col-span-1 flex">
					<label htmlFor="dakId" className="block text-sm font-bold text-gray-700 indElements" >
						Bank Account No
					</label>
					<div>

					</div>
				</div>
				<div className="sm:col-span-1 flex">
					<label htmlFor="dakId" className="block text-sm font-bold text-gray-700 indElements" >
						IFSC Code
					</label>
					<div>

					</div>
				</div>
				<div className="sm:col-span-1 flex">
					<label htmlFor="dakId" className="block text-sm font-bold text-gray-700 indElements" >
						Bank Details
					</label>
					<div>

					</div>
				</div>
				<div className="sm:col-span-1 flex">
					<label htmlFor="dakId" className="block text-sm font-bold text-gray-700 indElements" >
						Amount Claimed
					</label>
					<div>
						{responseData && responseData.amountClaimed}

					</div>
				</div>
				<div className="sm:col-span-1 flex">
					<label htmlFor="dakId" className="block text-sm font-bold text-gray-700 indElements" >
						Disallowance
					</label>
					<div>
						{responseData && responseData.amountDisallowed}

					</div>
				</div>
				<div className="sm:col-span-1 flex">
					<label htmlFor="dakId" className="block text-sm font-bold text-gray-700 indElements" >
						Recoveries
					</label>
					<div>
						{responseData && responseData.recoveries}

					</div>
				</div>
				<div className="sm:col-span-1 flex">
					<label htmlFor="dakId" className="block text-sm font-bold text-gray-700 indElements" >
						Amount Passed
					</label>
					<div>
						{responseData && responseData.amountPassed}

					</div>
				</div>
				<div className="sm:col-span-1 flex">
					<label htmlFor="dakId" className="block text-sm font-bold text-gray-700 indElements" >
						Amount On Which IT deducted
					</label>
					<div>
						{responseData && responseData.taxRecoveryPrincipalAmount}

					</div>
				</div>
				<div className="sm:col-span-1 flex">
					<label htmlFor="dakId" className="block text-sm font-bold text-gray-700 indElements" >
						Provisional Payment
					</label>
					<div>
						{responseData && responseData.provisionalPayment}

					</div>
				</div>
				<div className="sm:col-span-1 flex">
					<label htmlFor="dakId" className="block text-sm font-bold text-gray-700 indElements" >
						Reason
					</label>
					<div>
						{responseData && responseData.reason}

					</div>
				</div>
				<div className="sm:col-span-1 flex">
					<label htmlFor="dakId" className="block text-sm font-bold text-gray-700 indElements" >
						Record Status
					</label>
					<div>
						{responseData && responseData.recordStatus}

					</div>
				</div>
				<div className="sm:col-span-1 flex">
					<label htmlFor="dakId" className="block text-sm font-bold text-gray-700 indElements" >
						Remarks
					</label>
					<div>
						{responseData && responseData.remarks}

					</div>
				</div>

			</div>
			<div style={{ height: '20px', width: '2px' }}></div>

			<h3 className="text-lg font-medium" style={{ backgroundColor: '#23bd87' }}>Recoveries</h3>
			<div className="gap-y-6 px-4 py-5" style={{ backgroundColor: '#d1f4e5' }}>
				</div>
			<div style={{ height: '20px', width: '2px' }}></div>
			<h3 className="text-lg font-medium" style={{ backgroundColor: '#23bd87' }}>GST TDS Recovery</h3>
			<div className="gap-y-6 px-4 py-5" style={{ backgroundColor: '#d1f4e5' }}>
				</div>
			<div style={{ height: '20px', width: '2px' }}></div>
			<h3 className="text-lg font-medium" style={{ backgroundColor: '#23bd87' }}>Disallowances</h3>
			<div className="gap-y-6 px-4 py-5" style={{ backgroundColor: '#d1f4e5' }}>
				</div>

			<div style={{ height: '20px', width: '2px' }}></div>
			<h3 className="text-lg font-medium" style={{ backgroundColor: '#23bd87' }}>Audit Drills Verified</h3>
			<div className="gap-y-6 px-4 py-5" style={{ backgroundColor: '#d1f4e5' }}>
				</div>

			<div style={{ height: '20px', width: '2px' }}></div>
			<h3 className="text-lg font-medium" style={{ backgroundColor: '#23bd87' }}>PM Entries</h3>
			<div className="gap-y-6 px-4 py-5" style={{ backgroundColor: '#d1f4e5' }}>
				</div>
			<div style={{ height: '20px', width: '2px' }}></div>
			<h3 className="text-lg font-medium" style={{ backgroundColor: '#23bd87' }}>Cheque Slip Entries</h3>
			<div className="gap-y-6 px-4 py-5" style={{ backgroundColor: '#d1f4e5' }}>
				</div>
			<div style={{ height: '20px', width: '2px' }}></div>

			<div >
				<Link to={"/mbills"}>
					<button className=" w-16 m-0 p-0 " > Done</button>
				</Link>

			</div>
		</div>

	);
};

export default (BillEdit);