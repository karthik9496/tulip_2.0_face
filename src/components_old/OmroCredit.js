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
   //   cdaCode: yup.string().required('Required'),
  //    subOfficeCode: yup.string().required('Required'),
  
});


const OmroCredit = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();
	//console.log(id);

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	
    
	const [loading, setLoading] = useState(true);
	const [dakidNo, setDakidNo] = useState('');
    const [monthEnding, setMonthEnding] = useState('');
    const [rankName, setRankName] = useState('');
    const [cdaoNo, setCdaoNo] = useState('');
    const [name, setName] = useState('');
    const [pmDetailObj, setPmDetailObj] = useState([{codeHead: "", signRc: "", amount:""}]);
  // const [pmDetail, setPmDetail] = useState([{receiptCodeHead: "", chargeCodeHead: "",receiptPlusAmount:""
  //   				,receiptMinusAmount:"",chargePlusAmount:"",chargeMinusAmount:""}]);
    const [depList, setDepList] = useState([{cdaoNo: "", plusCharge: "", amount:""}]);
    const [secCode,setSecCode]=useState('');
   // const [secCodeList,setSecCodeList]=useState([]);
	//const [secCodeItems,setSecCodeItems]=useState([]);
	const [pmSecData, setPmSecData] = useState([]);
	const [pmSecItems, setPmSecItems] = useState([]);
	const [pmSecItem, setPmSecItem] = useState();
	const [mesg,setMesg]=useState('');
    const [disable,setDisable]=useState(false);
    
    

	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get('/omros/' + id)
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
			 	setCdaoNo(record.employee.cdaoNo);
			 	setName(record.employee.officerName);
			 	setRankName(record.employee.rank.rankName);
				const fields = [
				   'id' ,'dak','bank','section','sectionCode','employee','unit','minNo','mroDate','memoNo','memoDate',
				   'receivedMonth','adjustmentMonth','voucherNumber','voucherDate','amount','remittanceDetail',
				   'auditorDate','aaoDate','aoDate','reason','remarks','otherDepositorDetail','approved','recordStatus',
				   'itemAmount','depositorType','panNo','itAmount','projectcode','personalClaimStatus','mroType',
				   'cdaoNo','pmDetail'
 					];
 				console.log("%%%%%:" + record['pmDetail']);	
 				setSecCode(record['section']);	
 				setPmDetailObj(record['pmDetail']);
 				
 				 
 				
 				console.log("%%%%%SecCode is:" + secCode);		
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
	
	  
	
	
	const onSubmit = (data, event) => {
		event.preventDefault();
		setDisable(true);
		console.log("&&&&&&&&---:" + pmDetailObj.length);
		console.log("&&&&&&&&---:" + data.pmDetail);
		
		if (data.id && !disable) {
			axios.put("/omros/creditToIrla/process/" + data.id,data)
			 
				.then((response) => { 
					if(response.status==200){
						setMesg(response.data);
						history.push("/omros");
					//console.log("----***:" + response.data);
					}
				})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data['reason']);
					 
				});
		}  
		
	}
	 
	const onError = (errors, e) => console.log(errors, e);

	//All foreign keys. 
	// XXXXXX Add search fields and adjust the values as necessary
	const parentData = {
	
		employee: {
			title: "Officer",
			url: "employees/all/effective",
			searchList: ['cdaoNo', 'checkDigit', 'officerName'], //XXXXXXXXX Add search fields
			fkEntity: "employee",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
}

	//Callback for child components (Foreign Keys)
	const callback = (childData) => {
		//console.log("Parent Callback");
		setEntity(prev => ({ ...prev, [childData.fk]: childData.entity }));
		setValue(childData.fk, childData.entity);
		
	//	if(childData.fk==='section')
	//		setSecCode(childData.entity.id);
		//console.log(errors);
		clearErrors(childData.fk);
	};

	const errorCallback = (err) => {
		//console.log(err);
		setServerErrors(err);
	}
	
	const handleSectionChange = (e) => {
		 
		 console.log(e.target.value);
		 
		setValue('sectionCode', e.target.value)
		 
	};
	
	const handleInputChange = (e,index) => {
		console.log(e.target.value);
		console.log(index);
		const { name, value } = e.target;
		console.log(name);
		console.log(value);
		const list = [...pmDetailObj];
		list[index][name] = value;
		console.log("----The code head is----:" + list[index].codeHead);
		console.log("----The sign is----:" + list[index].signRc);
		console.log("----The amt is----:" + list[index].amount);
		setPmDetailObj(list);
		setValue('pmDetail',list);
	};
	
	const handleInputCdaChange = (e,index) => {
		console.log(e.target.value);
		console.log(index);
		const { name, value } = e.target;
		const list = [...depList];
		list[index][name] = value;
		setDepList(list);
	};
	const handleRemoveClick = index => {
		const list = [...pmDetailObj];
		list.splice(index, 1);
		setPmDetailObj(list);
	};
	const handleCdaRemoveClick = index => {
		const list = [...depList];
		list.splice(index, 1);
		setDepList(list);
	};
	// handle click event of the Add button
	const handleAddClick = () => {
		setPmDetailObj([...pmDetailObj, {codeHead: "", signRc: "",amount:"" }]);
	};
	const handleCdaAddClick = () => {
		setDepList([...depList, { cdaoNo: "", plusCharge: "", amount:"" }]);
	}; 
	return (
		<div className="max-w-3xl mx-auto ">
			<div className="w-full w-3/4  mx-auto " >

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 >MRO Credit to IRLA</h1>
					<div className="text-red-500">{serverErrors}</div>

					<div className="grid grid-cols-2 gap-0">
							<div >
									<label>DakId</label>
									<input className="form-control py-0 max-w-xs" type="text" readOnly 
									value={dakidNo} />
									    
								</div>
								
								 
								 <div >
									<label>CdaoNo/Name</label> 
									 <input className="form-control py-0 max-w-xs" type="text" 
									 readOnly value={cdaoNo}  /> 
									 <input className="form-control py-0 max-w-xs" type="text" 
									 readOnly   value= {name}/>   
								</div>





								<div>
									<label>Rank</label>
									 <input className="form-control py-0 max-w-xs" type="text" 
									 readOnly value={rankName} /> 
								</div>
								</div>
								
						 <h1 > MRO Details</h1>
								<div className="grid grid-cols-2 gap-0">
						 
					 
						<div>
									<label>MRO Date</label>
									<input type="date" name="mroDate" {...register("mroDate")} readOnly
										className="form-control py-0"  
									/>
									<div className="text-red-500">{errors.mroDate?.message}</div>
								</div>
						
						<div>
							<label>MRO Identification No</label>
							<input type="text" name="minNo" {...register("minNo")} readOnly
								className="form-control py-0"
							/>
							<div className="text-red-500">{errors.minNo?.message}</div>
						</div>
						 
						 <div>
							<label>MRO Amount</label>
							<input type="text" name="amount" {...register("amount")} readOnly
								className="form-control py-0"
							/>
							<div className="text-red-500">{errors.minNo?.message}</div>
						</div>
						
						<div>
							<label>Credit Note Remarks</label>
							<input type="text" name="remarks" {...register("remarks")}
								className="form-control py-0"
							/>
							<div className="text-red-500">{errors.remarks?.message}</div>
						</div>
						 
						
					</div>
 
					 
					<div className="px-4">
						<button type="submit" >Update</button>
					</div>

				</form>
			</div>
		</div>
	);
};

export default withRouter(OmroCredit);