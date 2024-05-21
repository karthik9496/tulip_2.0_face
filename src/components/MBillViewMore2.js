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

const schema = yup.object({
	dpSheetNo: yup.number().integer().required('Required'),
	dak: yup.object().required('Required'),
	section: yup.object().required('Required'),
	unit: yup.object().required('Required'),
	vendor: yup.object().required('Required'),
	contractAgreement: yup.object().required('Required'),
	supplyOrder: yup.object().required('Required'),
	billType: yup.object().required('Required'),
	billNature: yup.object().required('Required'),
	amountExcluded: yup.number().required('Required'),
	allotmentCategory: yup.object().required('Required'),
	percentageOfIt: yup.number().required('Required'),
	percentageOfLd: yup.number().required('Required'),
	ldDays: yup.number().integer().required('Required'),
	ldRecoveryPrincipalAmount: yup.number().required('Required'),
	fisBillDate: yup.string().required('Required'),
	dvNo: yup.number().integer().required('Required'),
	dpSheetDate: yup.string().required('Required'),
	cmpDate: yup.string().required('Required'),
	gemContractDate: yup.string().required('Required'),
	gemInvoiceDate: yup.string().required('Required'),
	gemCracDate: yup.string().required('Required'),
	gemPrcDate: yup.string().required('Required'),
	invoiceDate: yup.string().required('Required'),
	gst5Amount: yup.number().required('Required'),
	gst12Amount: yup.number().required('Required'),
	gst18Amount: yup.number().required('Required'),
	gst28Amount: yup.number().required('Required'),
	bankPanDetail: yup.object().required('Required'),
	fisDate: yup.string().required('Required'),
	fisContractDate: yup.string().required('Required'),
	amountClaimed: yup.number().required('Required'),
	amountPassed: yup.number().required('Required'),
	amountDisallowed: yup.number().required('Required'),
	provisionalPayment: yup.boolean().required('Required'),
	verifiedAuditChecks: yup.boolean().required('Required'),
	auditorDate: yup.string().required('Required'),
	aaoDate: yup.string().required('Required'),
	aoDate: yup.string().required('Required'),
	goDate: yup.string().required('Required'),
	jcdaDate: yup.string().required('Required'),
	cdaDate: yup.string().required('Required'),
	passed: yup.boolean().required('Required'),
	cancelled: yup.boolean().required('Required'),
	dpSheetGenerated: yup.boolean().required('Required'),
	ssImprest: yup.boolean().required('Required'),
	lch: yup.boolean().required('Required'),
	//  lastModifiedAt: yup.timestamp without time zone().required('Required'),
	lastModifiedBy: yup.number().integer().required('Required'),
	officeId: yup.object().required('Required'),
	codeHead: yup.object().required('Required'),
	lchUpdated: yup.boolean().required('Required'),
	recoveries: yup.number().required('Required'),
	caUpdated: yup.boolean().required('Required'),
	soUpdated: yup.boolean().required('Required'),
	taxRecoveryPrincipalAmount: yup.number().required('Required'),
	unitPaidPercent: yup.number().integer().required('Required'),
	unitPaidAmount: yup.number().required('Required'),
	cdaPaidPercent: yup.number().integer().required('Required'),
	cdaPaidAmount: yup.number().required('Required'),
	pvDate: yup.string().required('Required'),
	noOfCrVouchers: yup.number().integer().required('Required'),
	approved: yup.boolean().required('Required'),
	skipItemVerification: yup.boolean().required('Required'),
	payUnit: yup.object().required('Required'),
	allotmentDetail: yup.object().required('Required'),
	excludePercent: yup.number().integer().required('Required'),
	month: yup.string().required('Required'),
	fisBillCode: yup.string().required('Required'),
	fisContractNo: yup.string().required('Required'),
	gemPrcNo: yup.string().required('Required'),
	dvMonth: yup.string().required('Required'),
	fisUnitCode: yup.string().required('Required'),
	projectCode: yup.string().required('Required'),
	gstType: yup.string().required('Required'),
	invoiceNumber: yup.string().required('Required'),
	cmpBatch: yup.string().required('Required'),
	codeHd: yup.string().required('Required'),
	gemContractNo: yup.string().required('Required'),
	fisDocNo: yup.string().required('Required'),
	ifaConcurrence: yup.string().required('Required'),
	crvNo: yup.string().required('Required'),
	pvNo: yup.string().required('Required'),
	gemInvoiceNo: yup.string().required('Required'),
	remarks: yup.string().required('Required'),
	recordStatus: yup.string().required('Required'),
	reason: yup.string().required('Required'),
	gemCracNo: yup.string().required('Required'),
	paymentMode: yup.string().required('Required'),
	paymentRecordType: yup.string().required('Required'),
});


const BillEdit = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();

	let navigate = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [key, setKey] = useState('page1');
	const [responseData, setResponseData] = useState(null);
const [count, setCount] = useState(0);

	useEffect(() => {
		setCount(1);
		//console.log("Count:"+count);
		let record = '';
		let isCancelled = false;
		console.log(id);
		async function fetchData() {
			await axios.get('/mbills/' + id)
				.then((response) => {
					record = response.data;
					console.log("Record is:"+record.id);//printing
					setResponseData(response.data);
					//console.log("response");//printing
					console.log(this.state.responseData);//not printing
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


	const onSubmit = (data, event) => {
		event.preventDefault();
		console.log(data);
		if (data.id) {
			axios.put("/bills/" + data.id, data)
				.then((response) => {
					navigate.push("/bills");
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
					navigate.push("/bills");
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

		dak: {
			title: "Dak",
			url: "daks",
			searchList: ['id'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "dak",
		},
		section: {
			title: "Section",
			url: "sections",
			searchList: ['id'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "section",
		},
		unit: {
			title: "Unit",
			url: "units",
			searchList: ['id'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "unit",
		},
		vendor: {
			title: "Vendor",
			url: "vendors",
			searchList: ['id'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "vendor",
		},
		contractAgreement: {
			title: "Contract Agreement",
			url: "contractAgreements",
			searchList: ['id'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "contractAgreement",
		},
		supplyOrder: {
			title: "Supply Order",
			url: "supplyOrders",
			searchList: ['id'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "supplyOrder",
		},
		billType: {
			title: "Bill Type",
			url: "billTypes",
			searchList: ['id'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "billType",
		},
		billNature: {
			title: "Bill Nature",
			url: "billNatures",
			searchList: ['id'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "billNature",
		},
		allotmentCategory: {
			title: "Allotment Category",
			url: "allotmentCategorys",
			searchList: ['id'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "allotmentCategory",
		},
		bankPanDetail: {
			title: "Bank Pan Detail",
			url: "bankPanDetails",
			searchList: ['id'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "bankPanDetail",
		},
		officeId: {
			title: "Office Id",
			url: "officeIds",
			searchList: ['id'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "officeId",
		},
		codeHead: {
			title: "Code Head",
			url: "codeHeads",
			searchList: ['id'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "codeHead",
		},
		payUnit: {
			title: "Pay Unit",
			url: "payUnits",
			searchList: ['id'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "payUnit",
		},
		allotmentDetail: {
			title: "Allotment Detail",
			url: "allotmentDetails",
			searchList: ['id'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "allotmentDetail",
		},
	}

	//Callback for child components (Foreign Keys)
	const callback = (childData) => {
		//console.log("Parent Callback");
		//setEntity(prev => ({ ...prev, [childData.fk]: childData.entity }));
		setValue(childData.fk, childData.entity);
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
		  <div className="max-w-4xl mx-auto p-6">
    <div className="bg-green shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Bill Details</h3>
      </div>
      <div className="border-t border-gray-200">
        <div className="grid grid-cols-1 gap-y-6 px-4 py-5 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-8">
          <div className="sm:col-span-1">
            <label htmlFor="dakId" className="block text-sm font-medium text-gray-700">
              DakId No
            </label>
            <div className="mt-1">
              <span className="block text-sm text-gray-900"></span>
            </div>
          </div>
          <div className="sm:col-span-1">
            <label htmlFor="month" className="block text-sm font-medium text-gray-700">
              Month
            </label>
            <div className="mt-1">
              {/* Output value for Month */}
              <span className="block text-sm text-gray-900"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default (BillEdit);