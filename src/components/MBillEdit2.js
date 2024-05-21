/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 03 April 2024
 *
 * Modified By : 
 */

import { useState, useEffect, useMemo } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useForm, watch, Controller } from "react-hook-form";
import axios from 'axios';
import * as yup from "yup";

import { yupResolver } from '@hookform/resolvers/yup';
import LiveSearch from '../utils/LiveSearch';

//import DatePicker  from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";
//import addDays from 'date-fns/addDays'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Table, { SelectColumnFilter } from '../utils/Table0Pagination'
import Select from "react-select";


const schema = yup.object({
	unit: yup.object().required('Required'),

});

const BillEdit = () => {
	const { register, handleSubmit, setValue, control, formState: { errors }, clearErrors, watch } = useForm({
		resolver: yupResolver(schema)
	});
	let { id } = useParams();

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [key, setKey] = useState('page1');
	const [punchingMediumList, setPunchingMediumList] = useState([]);
	const [dak, setDak] = useState({});
	const [responseData, setResponseData] = useState(null);
	const [mbillTypeList, setmbillTypeList] = useState([]);
	const paymentRecordType = watch("paymentRecordType");
	const payUnit = watch("payUnit");
	const vendor = watch("vendor");
	const [selectedIdOfBankPanDetail, setSelctedIdOfBankPanDetail] = useState(null);

	const [bankDetails, setBankDetails] = useState([])
	const [vendorGstinDetails, setVendorGstinDetails] = useState([]);

	useEffect(() => {
		let unitId = null;
		if (payUnit) {
			console.log("Inside pay unit")
			console.log(payUnit)
			if (entity.payUnit) {
				unitId = entity.payUnit.id;
			}
		} else
			if (entity.unit) {
				console.log("Inside entity unit")
				unitId = entity.unit.id;
			}
		/*if (responseData && responseData.bankPanDetail) {
			console.log(responseData)
			setBankDetails(responseData.bankPanDetail)
		}*/
		if (entity.unit || entity.payUnit || entity.vendor) {
			// getting bank pan details of selected unit PF or imprest account
			if (paymentRecordType !== "V") {
				console.log("fetching start")
				console.log(entity)
				console.log("unitId is" + unitId);
				const fetchBankPanDetailsOfUnit = async () => {
					const response = await axios.get("/bankpandetails/" + entity.officeId.id + "/" + unitId + "/" + paymentRecordType).then(response => {

						console.log(response.data)
						setBankDetails(response.data)

					})


				}

				fetchBankPanDetailsOfUnit()
			} else if (paymentRecordType === "V") {
				console.log("inside vendor");
				if (entity.vendor) {
					console.log("vendor selected");
					// getting bank pan details of selected vendor
					const fetchBankPanDetailsOfVendor = async () => {
						console.log("Fetching vendor details")
						const response = await axios.get("/bankpandetails/vendor/" + entity.vendor.id).then(response => {
							console.log("vendor bank details are" + response.data);
							setBankDetails(response.data)

						})
					}
					fetchBankPanDetailsOfVendor()
					const fetchVendorGstinDetails = async () => {
						console.log("Fetching vendor gstin details")
						await axios.get("/vendorGstins/" + entity.vendor.id).then(response => {
							setVendorGstinDetails(response.data);
						})
					}
					fetchVendorGstinDetails()
				} else {
					console.log("vendor not selected");
				}
			}
		}
	}, [paymentRecordType, responseData, payUnit, vendor])

	async function fetchVendorGstinDetails(vendorId) {
		console.log("Fetching vendor gstin details")
		await axios.get("/vendorGstins/" + vendorId).then(response => {
			setVendorGstinDetails(response.data);
		})
	}

	// this is used for getting bank details using search with bank account number field and when user presses Enter
	const handleKeyPressForSearchWithBankAccountNo = (event) => {
		console.log("Key pressed is " + event.key);

		if (event.key === 'Enter') {
			event.preventDefault();
			const inputValue = event.target.value.trim();
			if (inputValue) {
				fetchVendorByBankAccountNo(event.target.value);
				console.log("Inside search with bank account no " + event.target.value);
			}
		}
	}

	// this is used for getting bank details using search with bank account number field and when user presses Tab
	const handleKeyDownForSearchWithBankAccountNo = (event) => {
		console.log("Key pressed is " + event.key);
		if (event.key === 'Tab') {
			console.log("Inside search with bank account no " + event.target.value);
			const inputValue = event.target.value.trim();
			if (inputValue) {
				fetchVendorByBankAccountNo(event.target.value);
			}
		}
	}
	// getting vendor details by bank account number
	async function fetchVendorByBankAccountNo(bankAccountNo) {
		console.log("Inside fetch function" + bankAccountNo + "abc");
		await axios.get('/bankpandetails/vendor/accountno/' + bankAccountNo)
			.then((response) => {
				console.log("response data is" + response.data.vendor.vendorName);
				if (response.data && response.data != null) {
					setEntity(prevEntity => ({
						...prevEntity,
						vendor: response.data.vendor
					}));
					setValue("vendor", response.data.vendor);

				}
			}).catch((error) => {
				if (error.response) {

				} else {

				}
			})

	}
	//Table for rendering gstin data of vendor
	const columns = useMemo(() => [

		{
			Header: "GSTIN",
			accessor: 'gstin',
		}
	], [vendorGstinDetails])

	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get('/mbills/' + id)
					.then((response) => {
						record = response.data;
						console.log("Initial Response is" + response.data)

						const fields = [
							'id'
							, 'dpSheetNo', 'dak', 'section', 'unit', 'vendor', 'contractAgreement', 'supplyOrder', 'billType',
							'billNature', 'amountExcluded', 'allotmentCategory', 'percentageOfIt', 'percentageOfLd',
							'ldDays', 'ldRecoveryPrincipalAmount', 'fisBillDate', 'dvNo', 'dpSheetDate', 'cmpDate',
							'gemContractDate', 'gemInvoiceDate', 'gemCracDate', 'gemPrcDate', 'invoiceDate', 'gst5Amount',
							'gst12Amount', 'gst18Amount', 'gst28Amount', 'bankPanDetail', 'fisDate', 'fisContractDate',
							'amountClaimed', 'amountPassed', 'amountDisallowed', 'provisionalPayment', 'verifiedAuditChecks',
							'auditorDate', 'aaoDate', 'aoDate', 'goDate', 'jcdaDate', 'cdaDate', 'passed', 'cancelled',
							'dpSheetGenerated', 'ssImprest', 'lch', 'lastModifiedAt', 'lastModifiedBy', 'officeId',
							'codeHead', 'lchUpdated', 'recoveries', 'caUpdated', 'soUpdated', 'taxRecoveryPrincipalAmount',
							'unitPaidPercent', 'unitPaidAmount', 'cdaPaidPercent', 'cdaPaidAmount', 'pvDate', 'noOfCrVouchers',
							'approved', 'skipItemVerification', 'payUnit', 'allotmentDetail', 'excludePercent', 'month',
							'fisBillCode', 'fisContractNo', 'gemPrcNo', 'dvMonth', 'fisUnitCode', 'projectCode', 'gstType',
							'invoiceNumber', 'cmpBatch', 'codeHd', 'gemContractNo', 'fisDocNo', 'ifaConcurrence', 'crvNo',
							'pvNo', 'gemInvoiceNo', 'remarks', 'recordStatus', 'reason', 'gemCracNo', 'paymentMode',
							'paymentRecordType', 'gstApplicable', 'msme', 'makeType'
						];
						fields.forEach(field => setValue(field, record[field]));
						if (response.data.bankPanDetail) {
							setBankDetails(previousBankDetails => {
								// Create a new array by inserting responseData.bankPanDetail at the beginning
								return [response.data.bankPanDetail, ...previousBankDetails];
							})
						}
						if (response.data.vendor && response.data.vendor.id) {
							fetchVendorGstinDetails(response.data.vendor.id);

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
					});


				if (!isCancelled) {
					setEntity(record);
					setState(prev => ({ ...prev, state: record }));
				}
			}
			async function fetchPunchingMedium() {
				await axios.get('/pm/' + id)
					.then((response) => {
						console.log("response data is" + response.data);
						setPunchingMediumList(response.data);
					})
					.catch((error) => {
						if (error.response) {
							// Handle errors from the second endpoint
						} else {
							// Handle other errors
						}
					});

			}
			async function fetchTypeOfBills() {
				await axios.get('/mbills/typeofbills/' + id)
					.then((response) => {
						console.log("response data is" + response.data);
						setmbillTypeList(response.data);
					})
					.catch((error) => {
						if (error.response) {
							// Handle errors from the second endpoint
						} else {
							// Handle other errors
						}
					});

			}
			fetchData();
			fetchPunchingMedium();
			fetchTypeOfBills();

			return () => {
				isCancelled = true;
			};
		}

	}, []);


	const onSubmit = (data, event) => {
		if (payUnit) {
			data.payUnit = payUnit;
		} if (selectedIdOfBankPanDetail) {
			bankDetails.map((bankDetail) => {
				console.log("Selected Bank Pan Detail is " + selectedIdOfBankPanDetail, typeof selectedIdOfBankPanDetail);

				console.log("Inside for loop and id is " + bankDetail.id, typeof bankDetail.id);
				console.log(bankDetail);
				if ((bankDetail.id).toString() === selectedIdOfBankPanDetail) {
					console.log("condition matched")
					data.bankPanDetail = bankDetail;
				}
			})
		}
		event.preventDefault();
		console.log("submitted data is" + data);
		if (data.id) {
			axios.put("/mbills/" + data.id, data)
				.then((response) => {
					history.push("/bills");
				})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		} else {
			axios.post("/bills", data)
				.then((response) => {
					history.push("/bills");
				})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		}
	}

	const onError = (errors, e) => console.log(errors, e);

	//All foreign keys. 
	// XXXXXX Add search fields and adjust the values as necessary
	const parentData = {
		unit: {
			title: "Unit",
			url: "units",
			searchList: ['unitName', 'unitCode', 'address1'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "unit",
		},


		supplyOrder: {
			title: "Supply Order/Contract No",
			url: "supplyorders",
			searchList: ['id', 'supplyOrderNo', 'vendor.vendorName'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "supplyOrder",
		},
		payUnit: {
			title: "Select Payment Unit, if other than Dak Unit",
			url: "units",
			searchList: ['unitName', 'unitCode', 'address1'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "payUnit",
		},
		vendor: {
			title: "Vendor",
			url: "vendors",
			searchList: ['id', 'vendorName', 'address1', 'city', 'panNumber'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "vendor",
		},

	}

	//Callback for child components (Foreign Keys)
	const callback = (childData) => {
		console.log("Parent Callback");
		setValue(childData.fk, childData.entity);
		setEntity(prev => ({ ...prev, [childData.fk]: childData.entity }));
		//console.log(errors);
		clearErrors(childData.fk);
	};

	const errorCallback = (err) => {
		//console.log(err);
		setServerErrors(err);
	}

	const handleInputChange = (e) => {
		//console.log(e.target.value);
	};

	return (
		<div className="max-w-xxl mx-auto ">
			<div className="w-full w-3/4  mx-auto " >

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Bill </h1>
					{/*<div className="text-red-500">{serverErrors}</div>*/}
					<Tabs
						id="BillEdit"
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className="mb-3"
					>
						<Tab eventKey="page1" title="Bill Detail" className="h-120">

							<h3 className="text-lg font-medium" style={{ backgroundColor: '#23bd87' }}>Bill Details</h3>
							<br />
							<div className="grid grid-cols-2 gap-0">

								<div>
									<label>Month</label>
									<input type="text" disabled name="month" {...register("month")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.month?.message}</div>
								</div>

								<div>
									<label>DakId No</label>
									<input type="text" disabled name="dakidNo" {...register("dak.dakidNo")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.dak?.dakidNo.message}</div>
								</div>
								{(punchingMediumList != null && punchingMediumList.length > 0) ? (
									<div>
										<label>Unit</label>
										<input type="text" disabled name="unit"

											className="form-control py-0" {...register("unit.unitName")}></input>

										<div className="text-red-500">{errors.dak?.dakidNo.message}</div>
									</div>) : <div >
									<LiveSearch name="unit" onChange={handleInputChange}
										parentData={parentData.unit} parentCallback={callback}
										fkEntity={entity.unit} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.unit?.message}</div>
								</div>}
								<div>
									<label>Unit FinCode</label>
									<input type="text" disabled name="dakidNo" {...register("dak.unit.uuid")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.dak?.dakidNo.message}</div>
								</div>

								{responseData && (responseData.dak.officeId.dadOrganization.organizationType) !== 'PCDAHQ' && (
									<div style={{ display: 'flex', alignItems: 'center' }}>
										<label>IFA Concurrence</label>

										<div>
											<label>
												<input
													type="radio"
													name="ifaConcurrence"
													value="C"
													{...register("ifaConcurrence")}
												/>
												CFA - Inherent Powers
											</label>
										</div>
										<div>
											<label>
												<input
													type="radio"
													name="ifaConcurrence"
													value="I"
													{...register("ifaConcurrence")}
												/>
												IFA Concurred
											</label>
										</div>
									</div>
								)}

								{(responseData && (responseData.dak.officeId.dadOrganization.organizationType)) == 'PCDAHQ' && (
									<div style={{ display: 'flex', alignItems: 'center' }}>
										<label>IFA Concurrence</label>

										<div>
											<label>
												<input
													type="radio"
													name="ifaConcurrence"
													value="C"
													{...register("ifaConcurrence")}
												/>
												CFA - Inherent Powers
											</label>
										</div>
										<div>
											<label>
												<input
													type="radio"
													name="ifaConcurrence"
													value="I"
													{...register("ifaConcurrence")}
												/>
												IFA Concurred
											</label>
										</div>
									</div>
								)}
								<div>
									<label>Bill Type</label>
									<select name="billType" {...register("billType.typeOfBill")}
										className="form-control py-0">
										<option value="">Select Bill Type</option>
										{mbillTypeList && mbillTypeList.map((billTypeFromResponse) => (
											<option key={billTypeFromResponse.id} selected={entity && entity.billType && entity.billType.typeOfBill === billTypeFromResponse.typeOfBill ? true : false} value={billTypeFromResponse.typeOfBill}>
												{billTypeFromResponse.typeOfBill}
											</option>
										))}
									</select>

									<div className="text-red-500">{errors.billType?.message}</div>
								</div>
								<div>
									<label>Bill No</label>
									<input type="text" name="billNo" {...register("dak.billNo")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.dak?.dakidNo.message}</div>
								</div>

								<div>
									<label>Bill Date(ddmmyyyy)</label>
									<input type="date" name="billDate" {...register("dak.billDate")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.dak?.dakidNo.message}</div>
								</div>
								<div>
									<LiveSearch name="supplyOrder" onChange={handleInputChange}
										parentData={parentData.supplyOrder} parentCallback={callback}
										fkEntity={entity.supplyOrder} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.supplyOrder?.message}</div>
								</div>
								<div>
									<label>Invoice No</label>
									<input type="text" name="invoiceNo" {...register("invoiceNumber")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.dak?.invoiceNumber.message}</div>
								</div>
								<div>
									<label>Invoice Date</label>
									<input type="date" name="invoiceDate" {...register("invoiceDate")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.dak?.invoiceDate.message}</div>
								</div>

								<div style={{ display: 'flex', alignItems: 'center' }}>
									<label>GST Applicable</label>

									<div>
										<label>
											<input
												type="radio"
												name="gstApplicable"
												value="Y"
												{...register("gstApplicable")}
											/>{' '}
											Yes
										</label>
									</div>
									<div>
										<label>
											<input
												type="radio"
												name="gstApplicable"
												value="N"
												{...register("gstApplicable")}
											/>{' '}
											No
										</label>
									</div>
								</div>

								<div style={{ display: 'flex', alignItems: 'center' }}>
									<label>Payment To</label>

									<div>
										<label>
											<input
												type="radio"
												name="paymentRecordType"
												value="V"
												{...register("paymentRecordType")}
											/>{' '}
											Vendor
										</label>
									</div>
									<div>
										<label>
											<input
												type="radio"
												name="paymentRecordType"
												value="U"
												{...register("paymentRecordType")}
											/>{' '}
											Unit Public Fund
										</label>
									</div>
									<div>
										<label>
											<input
												type="radio"
												name="paymentRecordType"
												value="I"
												{...register("paymentRecordType")}
											/>{' '}
											Unit Imperest Account
										</label>
									</div>
								</div>
								<div style={{ display: 'flex', alignItems: 'center' }}>
									<label>MSME/NON MSME</label>

									<div>
										<label>
											<input
												type="radio"
												name="msme"
												value="1"
												{...register("msme")}
											/>{' '}
											Yes
										</label>
									</div>
									<div>
										<label>
											<input
												type="radio"
												name="msme"
												value="9"
												{...register("msme")}
											/>{' '}
											Non-MSME
										</label>
									</div>
								</div>
								<div>
									<label>Make In India/Foreign</label>
									<select className="form-control py-0"
										name="makeType" {...register("makeType")}
									>
										<option value="">-- Select Type --</option>
										<option value="1">Make in India (Defence PSU)</option>
										<option value="2">Make in India (PSU)</option>
										<option value="3">Make in India (Startup)</option>
										<option value="4">Make in India (Raksha Ratnam)</option>
										<option value="5">Make in India (Private)</option>
										<option value="6">Foreign Procurement (DBT)</option>
										<option value="7">Foreign Procurement(LC)</option>
									</select>

									<div className="text-red-500">{errors.makeType?.message}</div>
								</div>
								<div style={{ display: 'flex', alignItems: 'center' }}>
									<label>Payment Mode</label>

									<div>
										<label>
											<input
												type="radio"
												name="paymentMode"
												value="CMP"
												{...register("paymentMode")}
											/>{' '}
											SBI CMP
										</label>
									</div>
									<div>
										<label>
											<input
												type="radio"
												name="paymentMode"
												value="CHQ"
												{...register("paymentMode")}
											/>{' '}
											CHQ
										</label>
									</div>
								</div>
								{(paymentRecordType === "U" || paymentRecordType === "I") && <div >
									<LiveSearch name="payUnit" onChange={handleInputChange}
										parentData={parentData.payUnit} parentCallback={callback}
										fkEntity={entity.payUnit} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.payUnit?.message}</div>
								</div>}

								{(paymentRecordType === "U" || paymentRecordType === "I") && <div>
									<label>Bank Account No</label>
									<select name="bankPanDetail" {...register("bankPanDetail")}
										className="form-control py-0" onChange={(e) => {
											console.log("selected value is" + (e.target.value));
											const selectedValue = (e.target.value);
											setSelctedIdOfBankPanDetail(selectedValue);
											//setValue("selectedIdOfBankPanDetail", selectedValue); // Update the form state with the selected value
										}}>
										<option value="">Please Select Bank Account</option>
										{bankDetails && bankDetails.map((bankPanDetailFromResponse) => (
											<option key={bankPanDetailFromResponse.id} value={(bankPanDetailFromResponse.id)}>
												{bankPanDetailFromResponse.accountDescription + '-' + bankPanDetailFromResponse.accountNo + '-'
													+ (bankPanDetailFromResponse.bank ? bankPanDetailFromResponse.bank.ifscCode : '') + '-' + (bankPanDetailFromResponse.bank ? bankPanDetailFromResponse.bank.bankName : '') + '-' +
													(bankPanDetailFromResponse.bank ? bankPanDetailFromResponse.bank.bankBranch : '')}
											</option>
										))}
									</select>
									<div className="text-red-500">{errors.billType?.message}</div>
								</div>}
								{(paymentRecordType === "V") && <div >
									<label>Search With Bank Account No</label>
									<input type="text" name="vendorBankAccountNo"
										className="form-control py-0" onKeyPress={handleKeyPressForSearchWithBankAccountNo}
										onKeyDown={handleKeyDownForSearchWithBankAccountNo}
									/>
								</div>}
								{(paymentRecordType === "V") && <div >
									<LiveSearch name="vendor" id="vendorName" onChange={handleInputChange}
										parentData={parentData.vendor} parentCallback={callback}
										fkEntity={entity.vendor} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.vendor?.message}</div>
								</div>}
								{(paymentRecordType === 'V') && <div>
									<label>PAN Number</label>
									<input type="text" readOnly id="panNumber" name="panNumber" {...register("vendor.panNumber")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.vendor?.message}</div>
								</div>}
								{(paymentRecordType === "V") && <div>
									<label>Bank Account No</label>
									<select name="bankPanDetail" {...register("bankPanDetail")}
										className="form-control py-0" onChange={(e) => {
											console.log("selected value is" + (e.target.value));
											const selectedValue = (e.target.value); // Parse the JSON string to get the object
											setSelctedIdOfBankPanDetail(selectedValue);
											//setValue("selectedIdOfBankPanDetail", selectedValue); // Update the form state with the selected value
										}}>
										<option value="">Please Select Bank Account</option>
										{bankDetails && bankDetails.map((bankPanDetailFromResponse) => (
											<option key={bankPanDetailFromResponse.id} value={(bankPanDetailFromResponse.id)}>
												{bankPanDetailFromResponse.accountNo + '-'
													+ (bankPanDetailFromResponse.bank ? bankPanDetailFromResponse.bank.ifscCode : '') + '-' + (bankPanDetailFromResponse.bank ? bankPanDetailFromResponse.bank.bankName : '') + '-' +
													(bankPanDetailFromResponse.bank ? bankPanDetailFromResponse.bank.bankBranch : '')}
											</option>
										))}
									</select>
									<div className="text-red-500">{errors.billType?.message}</div>
								</div>}
								<div>
									<label>Amount Claimed</label>
									<input type="text" name="amountClaimed"

										className="form-control py-0" {...register("amountClaimed")}></input>

									<div className="text-red-500">{errors.amountClaimed?.message}</div>
								</div>
								<div>
									<label>Capital Acquisition Id(15 digit)</label>
									<input type="text" name="capitalId"

										className="form-control py-0" {...register("capitalId")}></input>

									<div className="text-red-500">{errors.capitalId?.message}</div>
								</div>
								<div>
									<label>Record Status</label>
									<input type="text" name="recordStatus"

										className="form-control py-0" {...register("recordStatus")}></input>

									<div className="text-red-500">{errors.recordStatus?.message}</div>
								</div>
								<div>
									<label>Reason</label>
									<input type="text" name="reason"

										className="form-control py-0" {...register("reason")}></input>

									<div className="text-red-500">{errors.reason?.message}</div>
								</div>
								<br />
								<div className="clear-both">
									<span className="text-red-500">*</span>
									<span>required fields</span>
								</div>
								<br />
							</div>

							<h3 className="text-lg font-medium" style={{ backgroundColor: '#23bd87' }}>GSTN Details</h3>
							<div >
								<Table columns={columns} data={vendorGstinDetails} className="table-auto" />
							</div>
							<h3 className="text-lg font-medium" style={{ backgroundColor: '#23bd87' }}>Budget Selection</h3>
							{(punchingMediumList == null) &&
								<div className="results" id="budgetList">
									<table className="min-w-full divide-y divide-gray-200">
										<thead className="bg-gray-50">
											<tr>
												<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													#
												</th>
												<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													Code Head
												</th>
												<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													Amount
												</th>
												<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
													Budget Allotment
												</th>
											</tr>
										</thead>
										<tbody className="bg-white divide-y divide-gray-200">

										</tbody>
									</table>
								</div>}
						</Tab>

						<Tab eventKey="page2" title="Specimen Signature" className="h-120">
							<div className="grid grid-cols-2 gap-0">
								<p>Add some fields here or delete this tab.</p>
							</div>
						</Tab>



					</Tabs>

					<div className="px-4">
						<button type="submit" >Save</button>
					</div>

				</form>
			</div>
		</div>
	);
};

export default (BillEdit);