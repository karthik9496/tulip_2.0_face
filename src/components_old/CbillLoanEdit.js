/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By : 
 */

import { useState, useEffect } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import * as yup from "yup";

import { yupResolver } from '@hookform/resolvers/yup';
import LiveSearch from '../utils/LiveSearch';

import DatePicker  from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import addDays from 'date-fns/addDays'


const schema = yup.object({
 //     dak: yup.object().required('Required'),
      employee: yup.object().required('Required'),
   //   fundPurpose: yup.object().required('Required'),
  //    unit: yup.object().required('Required'),
 //     cdaoNo: yup.string().required('Required'),
   //   checkDigit: yup.string().required('Required'),
   //   tempFinal: yup.string().required('Required'),
  //    totalInstalment: yup.number().integer().required('Required'),
   //   rate: yup.number().required('Required'),
   //   consolidatedAmount: yup.number().integer().required('Required'),
   //   approvalAmount: yup.number().integer().required('Required'),
    //  reason: yup.string().required('Required'),
  //    remarks: yup.string().required('Required'),
  //    specialSanction: yup.boolean().required('Required'),
  //    monthEnding: yup.string().required('Required'),
  //    recoveryStartDate: yup.string().required('Required'),
  //    recordStatus: yup.string().required('Required'),
   //   approved: yup.boolean().required('Required'),
   //   bulkApproval: yup.boolean().required('Required'),
  //    auditorDate: yup.string().required('Required'),
  //    aaoDate: yup.string().required('Required'),
    //  aoDate: yup.string().required('Required'),
 //     dvNo: yup.number().integer().required('Required'),
 //     dpSheetNo: yup.number().integer().required('Required'),
     // dpSheetDate: yup.string().required('Required'),
   //   cmpFileNo: yup.string().required('Required'),
 //     cmpDate: yup.string().required('Required'),
});


const CbillLoanEdit = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();
	//console.log(id);

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	
    const [ recoveryStartDate, setRecoveryStartDate] = useState(new Date());
    const [ auditorDate, setAuditorDate] = useState(new Date());
    const [ aaoDate, setAaoDate] = useState(new Date());
    const [ aoDate, setAoDate] = useState(new Date());
    const [ dpSheetDate, setDpSheetDate] = useState(new Date());
    const [ cmpDate, setCmpDate] = useState(new Date());
    
    const [loading, setLoading] = useState(true);
	const [dakidNo, setDakidNo] = useState('');
    const [monthEnding, setMonthEnding] = useState('');
    const [rankName, setRankName] = useState('');
    const [cdaoNo, setCdaoNo] = useState('');
    const [name, setName] = useState('');
    
    const [account, setAccount] = useState('');
    const [ifsc, setIfsc] = useState('');
    const [empId, setEmpId] = useState(0);
    const [bankDetails, setBankDetails] = useState('');
     
	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get('/cbillLoans/' + id)
					.then((response) => {
						record = response.data;
					})
					.catch((error) => {
						//console.log(error);
						//console.log(error.response.status);
						//console.log(error.response.headers);
						if(error.response)
							setServerErrors(error.response.data.error);
						else
							setServerErrors(error.Error);
					});
		 		setDakidNo(record.dak.dakidNo);
		 		setMonthEnding(record.monthEnding);
		 		setRankName(record.employee.rank.rankName);
		 		 
		 		
				const fields = [
				'id', 'dak', 'employee', 'unit', 'sanctionUnit', 'cdaoNo', 'checkDigit', 'monthEnding', 
				'sanctionNo', 'sanctionDate', 'sanctionAmount', 'approvalAmount', 'paymentInstalmentCount',
				 'totalInstalmentCount', 'recoveryRate', 'balancePrincipal', 'balanceInterest', 'loanCode', 
				 'recoveryDate', 'folioNumber', 'recordStatus', 'reason', 'arrearsRecovery', 'progressiveAmount', 
				 'originalSanction', 'agifPrincipalAmount', 'agifInterestAmount', 'acquisitionType', 'approved', 
				 'auditorDate', 'aaoDate', 'aoDate'	,'contingentBillNo','contingentBillDate'			
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

	}, [id, setValue]);

	 
	
	useEffect(() => {
		let fetching = false;
		let unmounted = false;
		async function fetchBankDetailsData() {

			if (!fetching )
				await axios.get(`/cbillLoans/${id}/bankDetails`)
					.then((response) => {
						//console.log("==========Bank Details====:" + response.data);
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
						 
						if (error.response)
							setServerErrors(error.response.data.error);
						else
							setServerErrors(error.Error);
					})
		}
		fetchBankDetailsData();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [empId, setEmpId]);
	
 
	 
	
	const onSubmit = (data, event,) => {
		event.preventDefault();
		console.log("777777777:"+data);
		if (data.id) {
			axios.put("/cbillLoans/audSubmit/" + data.id, data)
				.then((response) => { 
					 history.push("/cbillLoans");
					 
			})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log("response--------"+error.response.status);
				 
					setServerErrors(error.response.data['reason']);
				});
	 
		}else {
			axios.post("/cbillLoans/", data)
				.then((response) => { })
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
			url : "daks",
			searchList : ['id'], //XXXXXXXXX Add search fields
			fkEntity: "dak",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
		employee: {
			title: "Employee",
			url: "employees/all/effective",
			searchList: ['cdaoNo', 'checkDigit', 'officerName'], //XXXXXXXXX Add search fields
			fkEntity: "employee",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
		loanCode: {
			title: "Loan Code Description",
			url : "loanCodes",
			searchList : ['loanName'], //XXXXXXXXX Add search fields
			fkEntity: "loanCode",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
		unit: {
			title: "Sanction Unit",
			url : "units",
			searchList : ['unitName'], //XXXXXXXXX Add search fields
			fkEntity: "unit",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
}

	//Callback for child components (Foreign Keys)
	const callback = (childData) => {
		//console.log("Parent Callback");
		setEntity(prev => ({ ...prev, [childData.fk]: childData.entity }));
		setValue(childData.fk, childData.entity);
		
		if(childData.fk==='employee')
			setEmpId(childData.entity.id)
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
	
	 
	const handleButtonClick = (e) =>{
		history.push("/cbillLoans");
	}
	return (
		<div className="max-w-xl mx-auto ">
			<div className="w-full w-3/4  mx-auto " >

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Cbill Loans </h1>
					<div className="text-red-500">{serverErrors}</div>

					<div className="grid grid-cols-2 gap-0">
						 <div >
									<label>DakId</label> {dakidNo}  : {monthEnding}
								</div>				
						
					 
								<div >
									<LiveSearch name="employee" onChange={handleInputChange}
										parentData={parentData.employee} parentCallback={callback}
										fkEntity={entity.employee} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.employee?.message}</div>
								</div>			
						
						<div>
									<label>Rank</label>
									{rankName} 
						</div>
								
						 
								
						<div>
									<label>Bank Details</label>
									{account},{ifsc}
						</div>
							
														
								
						<div >
							<LiveSearch name="loanCode" onChange={handleInputChange}
								parentData={parentData.loanCode} parentCallback={callback} 
								fkEntity={entity.loanCode} errCallback={errorCallback} />
							<div className="text-red-500 ">{errors.loanCode?.message}</div>
						</div>						
						
						<div>
							<label>Sanction No</label>
							<input type="text" name="sanctionNo" {...register("sanctionNo")}
								className="form-control py-0"
							/>
							<div className="text-red-500">{errors.sanctionNo?.message}</div>
						</div>
						 
						<div>
									<label>Sanction Date</label>
									<input type="date" name="sanctionDate" {...register("sanctionDate")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.sanctionDate?.message}</div>
								</div>
						
						 
						<div >
									<LiveSearch name="unit" onChange={handleInputChange}
										parentData={parentData.unit} parentCallback={callback}
										fkEntity={entity.unit} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.unit?.message}</div>
								</div>	
						 
					 
								
						<div>
							<label>Contingent Bill No</label>
							<input type="text" name="contingentBillNo" {...register("contingentBillNo")}
								className="form-control py-0"
							/>
							<div className="text-red-500">{errors.contingentBillNo?.message}</div>
						</div>
						
						<div>
									<label>Contingent Bill Date</label>
									<input type="date" name="contingentBillDate" {...register("contingentBillDate")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.contingentBillDate?.message}</div>
								</div>
								
						
						 
						
						
						<div>
							<label>Sanction Amount</label>
							<input type="text" name="sanctionAmount" {...register("sanctionAmount")}
								className="form-control py-0"
							/>
							<div className="text-red-500">{errors.sanctionAmount?.message}</div>
						</div>
						
						<div>
							<label>Approval Amount</label>
							<input type="text" name="consolidatedAmount" {...register("consolidatedAmount")}
								className="form-control py-0"
							/>
							<div className="text-red-500">{errors.consolidatedAmount?.message}</div>
						</div>
						
						<div>
							<label>Reason</label>
							<textarea type="text" name="reason" {...register("reason")}
								className="form-control py-0"
							/>
							<div className="text-red-500">{errors.reason?.message}</div>
						</div>
						
						<div>
							<label>Record Status</label>
							<input type="text" name="recordStatus" {...register("recordStatus")} readOnly
								className="form-control py-0"
							/>
							<div className="text-red-500">{errors.recordStatus?.message}</div>
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

export default withRouter(CbillLoanEdit);