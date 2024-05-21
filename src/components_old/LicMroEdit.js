/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By : 
 */

import { useState, useEffect } from "react";
import { withRouter, useParams, useHistory,useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import * as yup from "yup";

import { yupResolver } from '@hookform/resolvers/yup';
import LiveSearch from '../utils/LiveSearch';
import LiveSearchNoTitle from '../utils/LiveSearchNoTitle';

import DatePicker  from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import addDays from 'date-fns/addDays'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'


const schema = yup.object({
 
});


const LicMroEdit = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();
	//console.log(id);

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
//	const [state, setState] = useState({});
	
    
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
	 
	const [mesg,setMesg]=useState('');
    const [disable,setDisable]=useState(false);
     const [mroAmount, setmroAmount] = useState();
     const {state}=useLocation();
     const [mroObj,setMroObj]=useState([{employee:{},rankName:"",mroAmount:0,itAmount:0}]);
     const [officerList,setOfficerList]=useState([]);
     const [key, setKey] = useState('mroInfo');
    
    

	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get('/omros/' + id)
					.then((response) => {
						record = response.data;
						setmroAmount(response.data.amount);
						 
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
					
				 
			 
				const fields = [
				   'id' ,'dak','bank','section','sectionCode','employee','unit','minNo','mroDate','memoNo','memoDate',
				   'receivedMonth','adjustmentMonth','voucherNumber','voucherDate','amount','remittanceDetail',
				   'auditorDate','aaoDate','aoDate','reason','remarks','otherDepositorDetail','approved','recordStatus',
				   'itemAmount','depositorType','panNo','itAmount','projectcode','personalClaimStatus','mroType',
				   'cdaoNo','pmDetail','mroList'
 					];
 			//	console.log("%%%%%:" + record['pmDetail']);	
 			//	setSecCode(record['section']);	
 			//	setPmDetailObj(record['pmDetail']);
 				
 				 
 				
 		//		console.log("%%%%%SecCode is:" + secCode);		
				fields.forEach(field => setValue(field, record[field]));
				if (!isCancelled) {
					setEntity(record);
			//		setState(prev => ({ ...prev, state: record }));
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
		async function fetchDakData() {
			 
			console.log(">>>Dak Id--get Option==:"+state);
			if (!fetching)
				await axios.get(`/omros/licDakId/${state}`)
					.then((response) => {
						setDakidNo(response.data['dakidNo']);
						 
						 
						 
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
		fetchDakData();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);
	useEffect(() => {
		let fetching = false;
		let unmounted = false;
		 
		async function fetchSectionCodeFromDak() {
			 
			if (!fetching)
				await axios.get(`/omros/mroSelect/licMaturity`)
					.then((response) => {
						console.log("response>>" + response.data[0].section.id);
						
						setPmSecData(response.data[0].section.id);
						if (!unmounted) {
							 
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
		fetchSectionCodeFromDak();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [secCode]);
	 
	
/*	useEffect(() => {
		let fetching = false;
		let unmounted = false;
		 
		console.log(state);
		async function fetchMroOfficersFedDetails() {

			if (!fetching)
				
			await axios.get(`/omros/licDemandMroFed/${state}`)
				.then((response) => {
					setOfficerList(response.data);
					 
					if (!unmounted) {

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
		fetchMroOfficersFedDetails();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);*/
	const onSubmit = (data,event) => {
		 event.preventDefault();
		 
		if (data.id) {
			console.log("&&&&&&1111113333111&&---:" + data);
			 axios.put("/omros/" + data,data.id)
			 	.then((response) => { 
					if(response.status===200){
						setMesg(response.data['reason']);
						history.push("/omros");
					console.log("----***:" + response.data);
					}
				})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data['reason']);
					 
				});
		}else{
			console.log(mroObj);
			console.log(data); 
			console.log("&&&&&&111111111&&---:" + data.minNo+"=="+state+"=="+mroObj[0].employee.cdaoNo);
			 axios.post(`/omros/addMro/licMaturity/${state}` , data)
			 	.then((response) => { 
					if(response.status===200){
						setMesg(response.data['reason']);
						history.push("/omros");
					console.log("----***:" + response.data);
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
	const callback =(index)=> (childData) => {
		console.log("Parent Callback "+index);
		//setEntity(prev => ({ ...prev, [childData.fk]: childData.entity }));
		//setValue(childData.fk, childData.entity);
		//console.log(errors);
		let item=mroObj[index];
		 
		item['employee']=childData.entity;
		if(item['employee'].rank)
			item['rankName']=item['employee'].rank.rankName;
		console.log(item['employee'].cdaoNo+"--"+item['employee'].rank.rankName);
		let newData=[...mroObj];
		newData[index]=item;
		setMroObj(newData);
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
	const handleEmp =index=> (e) => {
		console.log(index+"--"+e.target.value);
		let cdata=e.target.value;
		console.log(cdata.entity+"--"+cdata.fk);
		let item=mroObj[index];
		 
		item['employee']=e.target.value;
		let newData=[...mroObj];
		newData[index]=item;
		setMroObj(newData);
		setValue('mroList',mroObj);
		 
	};
	
	 
	
	const handleMroAmt =index=> (e) => {
		console.log(index+"--"+e.target.value);
		let item=mroObj[index];
		 
		item['mroAmount']=e.target.value;
		let newData=[...mroObj];
		newData[index]=item;
		setMroObj(newData);
		setValue('mroList',mroObj);
		 
	};
	const handleItAmt =index=> (e) => {
		console.log(index+"--"+e.target.value);
		let item=mroObj[index];
		 
		item['itAmount']=e.target.value;
		let newData=[...mroObj];
		newData[index]=item;
		setMroObj(newData);
		setValue('mroList',mroObj);
		 
	};
	
	const addRow = (e) => {
		
		setMroObj([...mroObj,{employee:{},rankName:"",mroAmount:0,itAmount:0}])
		console.log(">>>>Mro List--:" + mroObj);
		 
	};
	return (
		<div className="max-w-3xl mx-auto ">
			<div className="w-full w-3/4  mx-auto " >

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Lic Mro </h1>
					<div className="text-red-500">{mesg}</div>
					<Tabs
					id="LicMroEdit"
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className="mb-3">
						<Tab eventKey="mroInfo" title="Mro Info" className="h-120">
					<div className="grid grid-cols-2 gap-0">
							<div >
									<h1 > Dak Id</h1>
									<input className="form-control py-0 max-w-xs" type="text" readOnly 
									value={state} />
									    
								</div>
								 
								 <div>
								 <br/>
								 <br/>
								 <br/>
								 <br/>
								 </div>
								 </div>
								
						 <label>MRO Details</label>
								<div className="grid grid-cols-2 gap-0">
						 
					 
						<div>
									<label>MRO Date</label>
									<input type="date" name="mroDate" {...register("mroDate")}
										className="form-control py-0"  
									/>
									<div className="text-red-500">{errors.mroDate?.message}</div>
								</div>
						
						<div>
							<label>MRO Identification No</label>
							<input type="text" name="minNo" {...register("minNo")}
								className="form-control py-0"
							/>
							<div className="text-red-500">{errors.minNo?.message}</div>
						</div>
						
						<div >
							<b>PM Section Code</b>
							<input className="form-control py-0 max-w-xs" type="text" readOnly 
									value={pmSecData} />
						</div>
						
						
						
						
						 
						
						<div>
							<label>Remittance Details</label>
							<input type="text" name="remittanceDetail" {...register("remittanceDetail")}
								className="form-control py-0"
							/>
							<div className="text-red-500">{errors.remittanceDetail?.message}</div>
						</div>
						 
						
					</div>
					 <div>
								 <br/>
								 <br/>
								 <br/>
								 </div>

					<label>Officer Details</label>
						 
						     <table className="table table-striped table-bordered table-auto">
						      <thead>
                    <tr>
                        <th>Officer Name</th>
                        <th>Rank</th>
                        <th>MRO Amount</th>
                        <th>IT Amount</th>
                        
                         
                    </tr>
                    </thead>
                    <tbody>
                    {
						mroObj.map((item,i)=>{
							return(
							<tr key={"empDetail"+i}>
							 
							<td  class="stop-stretching">
                    <LiveSearchNoTitle name="employee" onChange={handleInputChange}
										parentData={parentData.employee} parentCallback={callback(i)} 
										fkEntity={entity.employee} errCallback={errorCallback} />
                     </td>
                     <td class="stop-stretching1">
                     	  <input type="text" name="rankName" value={item.rankName} readOnly  className="form-control py-0"/>
                     </td>
                     <td>
                       <input type="text" name="mroAmt"  value={item.itemAmount}  onChange={handleMroAmt(i)} className="form-control py-0"/>
                    </td>
                    <td>
                    <input type="text" name="itAmt"   value={item.itAmount}  onChange={handleItAmt(i)} className="form-control py-0"/>
                    </td>
							</tr>
							)
							
						})
					
					}
                    
                    
                     
                    </tbody>
                    
                   
						     </table>
						    
						     <div class="w-32 ...">
						<button type="button" onClick={addRow}>Add Record</button>
					</div>
					  
				<div>
								 <br/>
								 <br/>
								 <br/>
								 </div>
 


					<label>Punching Media Details</label>
					
					<div className="row cols-3 gap-0">
					 {pmDetailObj.map((x, i) => {
					return (
						<div className="flex flex-wrap content-start ...">
							 <select
                    name="codeHead"
                    type="text"
                    className="mx-2 px-2"
                    placeholder="Enter Code Head"
                    value={x.codeHead}
                    onChange={(e) => handleInputChange(e, i)}
                  >
                    <option key="default" value="" label="--Code Head--" />

                    <option key="1" value="00/020/80" label="Omro:00/020/80" />
                    <option key="2" value="93/020/80" label="Emro:93/020/80" />
                    
                  </select>
							<select name="signRc" value={x.signRc} onChange={e => handleInputChange(e, i)} >
								<option key="default" value="" label="--Sign RC--"/>
								<option key="+R" value="+R" label="+R"/>
								<option key="-R" value="-R" label="-R"/>
								<option key="+C" value="+C" label="+C"/>
								<option key="-C" value="-C" label="-C"/>
							</select>
							<input
								placeholder="Enter Amount"
								name="amount"
								 value={x.amount}
								onChange={e => handleInputChange(e, i)}
							/>
							 
							 
							 
							<div className=" w-16 m-0 p-0 flex flex-wrap content-start ...">
								{pmDetailObj.length !== 1 && <button	className=" w-16 m-0 p-0 "
									onClick={() => handleRemoveClick(i)}>Remove</button>}
							</div>
							<div>		
								{pmDetailObj.length - 1 === i && <button className=" w-16 m-0 p-0 " onClick={handleAddClick}>Add</button>}
							</div>
						</div>
						
					);
				})}
					</div> 
					<div className="px-4">
						<button type="submit" >Save</button>
					</div>
					 
					</Tab>
					 
</Tabs>
				</form>
			</div>
		</div>
	);
};

export default withRouter(LicMroEdit);