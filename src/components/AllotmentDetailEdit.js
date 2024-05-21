/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 03 April 2024
 *
 * Modified By : 
 */

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

const schema = yup.object({
      auditorDate: yup.string().required('Required'),
      dak: yup.object().required('Required'),
      section: yup.object().required('Required'),
      unit: yup.object().required('Required'),
      jul: yup.number().required('Required'),
      aug: yup.number().required('Required'),
      sep: yup.number().required('Required'),
      oct: yup.number().required('Required'),
      nov: yup.number().required('Required'),
      dec: yup.number().required('Required'),
      jan: yup.number().required('Required'),
      feb: yup.number().required('Required'),
      mar: yup.number().required('Required'),
      mar13: yup.number().required('Required'),
      mar14: yup.number().required('Required'),
      mar15: yup.number().required('Required'),
    //   merGenDate: yup.timestamp without time zone().required('Required'),
      merGenSeq: yup.number().integer().required('Required'),
      intNumber1: yup.number().integer().required('Required'),
      allotmentAuthority: yup.object().required('Required'),
      codeHead: yup.object().required('Required'),
      referenceDate: yup.string().required('Required'),
      allotmentAmount: yup.number().required('Required'),
      aaoDate: yup.string().required('Required'),
      aoDate: yup.string().required('Required'),
      approved: yup.boolean().required('Required'),
      progressiveAllotment: yup.number().required('Required'),
      progressiveExpenditure: yup.number().required('Required'),
      officeId: yup.object().required('Required'),
      allotmentCategory: yup.object().required('Required'),
      dadOffice: yup.object().required('Required'),
      caAmountBlocked: yup.number().required('Required'),
      gemAmountBlocked: yup.number().required('Required'),
      blockByUsr: yup.object().required('Required'),
      blockDate: yup.string().required('Required'),
      releaseByUsr: yup.object().required('Required'),
      releaseDate: yup.string().required('Required'),
      budgetHead: yup.object().required('Required'),
      apr: yup.number().required('Required'),
      may: yup.number().required('Required'),
      jun: yup.number().required('Required'),
      allotmentYear: yup.string().required('Required'),
      nature: yup.string().required('Required'),
      reason: yup.string().required('Required'),
      releaseRemarks: yup.string().required('Required'),
      referenceNo: yup.string().required('Required'),
      majorHead: yup.string().required('Required'),
      minorHead: yup.string().required('Required'),
      blockRemarks: yup.string().required('Required'),
      monthYear: yup.string().required('Required'),
      merRemarks: yup.string().required('Required'),
      codeHead: yup.string().required('Required'),
      projectCode: yup.string().required('Required'),
      value1: yup.string().required('Required'),
      recordStatus: yup.string().required('Required'),
      merGenMonth: yup.string().required('Required'),
});


const AllotmentDetailEdit = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();

	//let navigate = useNavigate();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [key, setKey] = useState('page1');
	
	
	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get('/allotmentDetails/' + id)
					.then((response) => {
						record = response.data;
						const fields = [
						'id'
, 'auditorDate', 'dak', 'section', 'unit', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec', 'jan', 'feb', 'mar', 'mar13', 'mar14', 'mar15', 'merGenDate', 'merGenSeq', 'intNumber1', 'allotmentAuthority', 'codeHead', 'referenceDate', 'allotmentAmount', 'aaoDate', 'aoDate', 'approved', 'progressiveAllotment', 'progressiveExpenditure', 'officeId', 'allotmentCategory', 'dadOffice', 'caAmountBlocked', 'gemAmountBlocked', 'blockByUsr', 'blockDate', 'releaseByUsr', 'releaseDate', 'budgetHead', 'apr', 'may', 'jun', 'allotmentYear', 'nature', 'reason', 'releaseRemarks', 'referenceNo', 'majorHead', 'minorHead', 'blockRemarks', 'monthYear', 'merRemarks', 'codeHead', 'projectCode', 'value1', 'recordStatus', 'merGenMonth'				
					];
					fields.forEach(field => setValue(field, record[field]));
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


	const onSubmit = (data, event) => {
		event.preventDefault();
		console.log(data);
		if (data.id) {
			axios.put("/allotmentDetails/" + data.id, data)
				.then((response) => { 
					//navigate("/allotmentDetails");
				})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		} else {
			axios.post("/allotmentDetails", data)
				.then((response) => { 
					//navigate("/allotmentDetails");
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
			url : "daks",
			searchList : ['id'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "dak",
		},
		section: {
			title: "Section",
			url : "sections",
			searchList : ['id'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "section",
		},
		unit: {
			title: "Unit",
			url : "units",
			searchList : ['id'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "unit",
		},
		allotmentAuthority: {
			title: "Allotment Authority",
			url : "allotmentAuthoritys",
			searchList : ['id'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "allotmentAuthority",
		},
		codeHead: {
			title: "Code Head",
			url : "codeHeads",
			searchList : ['id'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "codeHead",
		},
		officeId: {
			title: "Office Id",
			url : "officeIds",
			searchList : ['id'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "officeId",
		},
		allotmentCategory: {
			title: "Allotment Category",
			url : "allotmentCategorys",
			searchList : ['id'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "allotmentCategory",
		},
		dadOffice: {
			title: "Dad Office",
			url : "dadOffices",
			searchList : ['id'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "dadOffice",
		},
		blockByUsr: {
			title: "Block By Usr",
			url : "blockByUsrs",
			searchList : ['id'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "blockByUsr",
		},
		releaseByUsr: {
			title: "Release By Usr",
			url : "releaseByUsrs",
			searchList : ['id'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "releaseByUsr",
		},
		budgetHead: {
			title: "Budget Head",
			url : "budgetHeads",
			searchList : ['id'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "budgetHead",
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
		<div className="max-w-xl mx-auto ">
			<div className="w-full w-3/4  mx-auto " >

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Allotment Detail </h1>
					<div className="text-red-500">{serverErrors}</div>
					<Tabs
						id="AllotmentDetailEdit"
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className="mb-3"
					>
						<Tab eventKey="page1" title="Page 1" className="h-120">
							<div className="grid grid-cols-2 gap-0">
								
								<div>
									<label>Auditor Date</label>
									<input type="date" name="auditorDate" {...register("auditorDate")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.auditorDate?.message}</div>
								</div>						
						
								<div >
									<LiveSearch name="dak" onChange={handleInputChange}
										parentData={parentData.dak} parentCallback={callback} 
										fkEntity={entity.dak} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.dak?.message}</div>
								</div>						
								
						
								<div >
									<LiveSearch name="section" onChange={handleInputChange}
										parentData={parentData.section} parentCallback={callback} 
										fkEntity={entity.section} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.section?.message}</div>
								</div>						
								
						
								<div >
									<LiveSearch name="unit" onChange={handleInputChange}
										parentData={parentData.unit} parentCallback={callback} 
										fkEntity={entity.unit} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.unit?.message}</div>
								</div>						
								
						
								<div>
									<label>Jul</label>
									<input type="text" name="jul" {...register("jul")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.jul?.message}</div>
								</div>
								
						
								<div>
									<label>Aug</label>
									<input type="text" name="aug" {...register("aug")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.aug?.message}</div>
								</div>
								
						
								<div>
									<label>Sep</label>
									<input type="text" name="sep" {...register("sep")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.sep?.message}</div>
								</div>
								
						
								<div>
									<label>Oct</label>
									<input type="text" name="oct" {...register("oct")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.oct?.message}</div>
								</div>
								
						
								<div>
									<label>Nov</label>
									<input type="text" name="nov" {...register("nov")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.nov?.message}</div>
								</div>
								
						
								<div>
									<label>Dec</label>
									<input type="text" name="dec" {...register("dec")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.dec?.message}</div>
								</div>
								
						
								<div>
									<label>Jan</label>
									<input type="text" name="jan" {...register("jan")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.jan?.message}</div>
								</div>
								
						
								<div>
									<label>Feb</label>
									<input type="text" name="feb" {...register("feb")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.feb?.message}</div>
								</div>
								
						
								<div>
									<label>Mar</label>
									<input type="text" name="mar" {...register("mar")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.mar?.message}</div>
								</div>
								
						
								<div>
									<label>Mar13</label>
									<input type="text" name="mar13" {...register("mar13")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.mar13?.message}</div>
								</div>
								
						
								<div>
									<label>Mar14</label>
									<input type="text" name="mar14" {...register("mar14")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.mar14?.message}</div>
								</div>
								
						
								<div>
									<label>Mar15</label>
									<input type="text" name="mar15" {...register("mar15")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.mar15?.message}</div>
								</div>
								
						
								<div>
									<label>Mer Gen Date</label>
									<input type="text" name="merGenDate" {...register("merGenDate")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.merGenDate?.message}</div>
								</div>
								
						
								<div>
									<label>Mer Gen Seq</label>
									<input type="text" name="merGenSeq" {...register("merGenSeq")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.merGenSeq?.message}</div>
								</div>
								
						
								<div>
									<label>Int Number1</label>
									<input type="text" name="intNumber1" {...register("intNumber1")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.intNumber1?.message}</div>
								</div>
								
						
								<div >
									<LiveSearch name="allotmentAuthority" onChange={handleInputChange}
										parentData={parentData.allotmentAuthority} parentCallback={callback} 
										fkEntity={entity.allotmentAuthority} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.allotmentAuthority?.message}</div>
								</div>						
								
						
								<div >
									<LiveSearch name="codeHead" onChange={handleInputChange}
										parentData={parentData.codeHead} parentCallback={callback} 
										fkEntity={entity.codeHead} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.codeHead?.message}</div>
								</div>						
								
						
								
								<div>
									<label>Reference Date</label>
									<input type="date" name="referenceDate" {...register("referenceDate")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.referenceDate?.message}</div>
								</div>						
						
								<div>
									<label>Allotment Amount</label>
									<input type="text" name="allotmentAmount" {...register("allotmentAmount")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.allotmentAmount?.message}</div>
								</div>
								
						
								
								<div>
									<label>Aao Date</label>
									<input type="date" name="aaoDate" {...register("aaoDate")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.aaoDate?.message}</div>
								</div>						
						
								
								<div>
									<label>Ao Date</label>
									<input type="date" name="aoDate" {...register("aoDate")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.aoDate?.message}</div>
								</div>						
						
								<div>
									<label>Approved</label>
									<input type="text" name="approved" {...register("approved")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.approved?.message}</div>
								</div>
								
						
								<div>
									<label>Progressive Allotment</label>
									<input type="text" name="progressiveAllotment" {...register("progressiveAllotment")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.progressiveAllotment?.message}</div>
								</div>
								
						
								<div>
									<label>Progressive Expenditure</label>
									<input type="text" name="progressiveExpenditure" {...register("progressiveExpenditure")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.progressiveExpenditure?.message}</div>
								</div>
								
						
								<div >
									<LiveSearch name="officeId" onChange={handleInputChange}
										parentData={parentData.officeId} parentCallback={callback} 
										fkEntity={entity.officeId} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.officeId?.message}</div>
								</div>						
								
						
								<div >
									<LiveSearch name="allotmentCategory" onChange={handleInputChange}
										parentData={parentData.allotmentCategory} parentCallback={callback} 
										fkEntity={entity.allotmentCategory} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.allotmentCategory?.message}</div>
								</div>						
								
						
								<div >
									<LiveSearch name="dadOffice" onChange={handleInputChange}
										parentData={parentData.dadOffice} parentCallback={callback} 
										fkEntity={entity.dadOffice} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.dadOffice?.message}</div>
								</div>						
								
						
								<div>
									<label>Ca Amount Blocked</label>
									<input type="text" name="caAmountBlocked" {...register("caAmountBlocked")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.caAmountBlocked?.message}</div>
								</div>
								
						
								<div>
									<label>Gem Amount Blocked</label>
									<input type="text" name="gemAmountBlocked" {...register("gemAmountBlocked")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.gemAmountBlocked?.message}</div>
								</div>
								
						
								<div >
									<LiveSearch name="blockByUsr" onChange={handleInputChange}
										parentData={parentData.blockByUsr} parentCallback={callback} 
										fkEntity={entity.blockByUsr} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.blockByUsr?.message}</div>
								</div>						
								
						
								
								<div>
									<label>Block Date</label>
									<input type="date" name="blockDate" {...register("blockDate")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.blockDate?.message}</div>
								</div>						
						
								<div >
									<LiveSearch name="releaseByUsr" onChange={handleInputChange}
										parentData={parentData.releaseByUsr} parentCallback={callback} 
										fkEntity={entity.releaseByUsr} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.releaseByUsr?.message}</div>
								</div>						
								
						
								
								<div>
									<label>Release Date</label>
									<input type="date" name="releaseDate" {...register("releaseDate")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.releaseDate?.message}</div>
								</div>						
						
								<div >
									<LiveSearch name="budgetHead" onChange={handleInputChange}
										parentData={parentData.budgetHead} parentCallback={callback} 
										fkEntity={entity.budgetHead} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.budgetHead?.message}</div>
								</div>						
								
						
								<div>
									<label>Apr</label>
									<input type="text" name="apr" {...register("apr")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.apr?.message}</div>
								</div>
								
						
								<div>
									<label>May</label>
									<input type="text" name="may" {...register("may")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.may?.message}</div>
								</div>
								
						
								<div>
									<label>Jun</label>
									<input type="text" name="jun" {...register("jun")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.jun?.message}</div>
								</div>
								
						
								<div>
									<label>Allotment Year</label>
									<input type="text" name="allotmentYear" {...register("allotmentYear")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.allotmentYear?.message}</div>
								</div>
								
						
								<div>
									<label>Nature</label>
									<input type="text" name="nature" {...register("nature")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.nature?.message}</div>
								</div>
								
						
								<div>
									<label>Reason</label>
									<textarea type="text" name="reason" {...register("reason")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.reason?.message}</div>
								</div>
								
						
								<div>
									<label>Release Remarks</label>
									<textarea type="text" name="releaseRemarks" {...register("releaseRemarks")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.releaseRemarks?.message}</div>
								</div>
								
						
								<div>
									<label>Reference No</label>
									<input type="text" name="referenceNo" {...register("referenceNo")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.referenceNo?.message}</div>
								</div>
								
						
								<div>
									<label>Major Head</label>
									<input type="text" name="majorHead" {...register("majorHead")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.majorHead?.message}</div>
								</div>
								
						
								<div>
									<label>Minor Head</label>
									<input type="text" name="minorHead" {...register("minorHead")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.minorHead?.message}</div>
								</div>
								
						
								<div>
									<label>Block Remarks</label>
									<textarea type="text" name="blockRemarks" {...register("blockRemarks")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.blockRemarks?.message}</div>
								</div>
								
						
								<div>
									<label>Month Year</label>
									<input type="text" name="monthYear" {...register("monthYear")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.monthYear?.message}</div>
								</div>
								
						
								<div>
									<label>Mer Remarks</label>
									<textarea type="text" name="merRemarks" {...register("merRemarks")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.merRemarks?.message}</div>
								</div>
								
						
								<div>
									<label>Code Head</label>
									<input type="text" name="codeHead" {...register("codeHead")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.codeHead?.message}</div>
								</div>
								
						
								<div>
									<label>Project Code</label>
									<input type="text" name="projectCode" {...register("projectCode")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.projectCode?.message}</div>
								</div>
								
						
								<div>
									<label>Value1</label>
									<input type="text" name="value1" {...register("value1")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.value1?.message}</div>
								</div>
								
						
								<div>
									<label>Record Status</label>
									<input type="text" name="recordStatus" {...register("recordStatus")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.recordStatus?.message}</div>
								</div>
								
						
								<div>
									<label>Mer Gen Month</label>
									<input type="text" name="merGenMonth" {...register("merGenMonth")}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.merGenMonth?.message}</div>
								</div>
								
						
					
		
							</div>
						</Tab>

						<Tab eventKey="page2" title="Page 2" className="h-120">
							<div className="grid grid-cols-2 gap-0">
							<p>Add some fields here or delete this tab.</p>
							</div>
						</Tab>
						
						<Tab eventKey="help" title="Help" >
							<h1>Help</h1>
							<ul className="list-disc">
								<li>Point 1</li>
								<li>Point 2</li>
							</ul>
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

export default (AllotmentDetailEdit);