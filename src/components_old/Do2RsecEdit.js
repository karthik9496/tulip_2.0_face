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

//import DatePicker  from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";
//import addDays from 'date-fns/addDays'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

const schema = yup.object({
     // fromDate: yup.string().required('Required'),
     //  employee: yup.object().required('Required'),      
     // do2Date: yup.string().required('Required'),     
     
       
      
});


const Do2REdit = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
		 
	});

	let { id } = useParams();

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [key, setKey] = useState('page1');
		const [loading, setLoading] = useState(true);
	const [casualtyCodeList,setCasualtyCodeList]=useState([]);
	const [unitCode,setUnitCode]=useState('');
	const [unitName,setUnitName]=useState('');
	const [susNo,setSusNo]=useState('');
	const [cdano,setCdano]=useState('');
	const [officerName,setOfficerName]=useState('');
	const [rank,setRank]=useState('');
	const [servingIn,setServingIn]=useState('');
	const [do2No,setDo2No]=useState('');
	const [lastDo2No,setLastDo2No]=useState('');
	const [do2Date,setDo2Date]=useState('');
	const [lastDo2Date,setLastDo2Date]=useState('');
	const [disabled,setDisabled]=useState(false);
	const [dakid,setDakid]=useState('');
	 
	 
	const [casultyList,setCasultyList]=useState([{slNo:"",casualtyCode:"",nature:"",fromDate:"",toDate:"",data1:"",data2:"",data3:"",data4:""}]);
	 
	
	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get(`/do2s/rsec/do2edit/${id}`)
					.then((response) => {
						record = response.data;
						console.log(record);
						 
						 if(record['cdaoNo'])
						 	setCdano(record['cdaoNo']);
						 if(record['unitCode'])
						 	setUnitCode(record['unitCode']);
						 if(record['do2No'])
						 	setDo2No(record['do2No']);
						 if(record['do2Date'])
						 	setDo2Date(record['do2Date']);
						 if(record['lastDo2No'])
						 	setLastDo2No(record['lastDo2No']);
						 if(record['lastDo2Date'])
						  	setLastDo2Date(record['lastDo2Date']);
						  if(record['servingIn'])
						    setServingIn(record['servingIn']);
						   if(record['dakid'])
						   	setDakid(record['dakid']);
						 	
						 if(record['casualtyList'])
						 	setCasultyList(record['casualtyList'])
						 
						 console.log(record['casualtyList']);
						 
						 const fields = [
					'cdaoNo', 'unitCode', 'servingIn','do2No', 'lastDo2No','do2Date','lastDo2Date' ,'officerName','rank','susNo','dakId','do2Id','casualtyList'
					
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

	}, [id, setValue]);
	
		 
		 useEffect(() => {
		let fetching = false;
		let unmounted = false;
		 
		async function fetchCasultyList() {
			 
			if (!fetching)
				//console.log(secId);
				await axios.get(`/docFormats/all/occurrenceCode`)
					.then((response) => {
						console.log("response>>" + response.data);
						setCasualtyCodeList(response.data);
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
		fetchCasultyList();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	 useEffect(() => {
		let fetching = false;
		let unmounted = false;
		 
		async function fetchEmp() {
			 console.log(cdano);
			if (!fetching && cdano && cdano.trim.length===6)
				console.log(cdano);
				await axios.get(`/employees/empName/${cdano}`)
					.then((response) => {
						console.log("response>>" + response.data);
						setOfficerName(response.data);
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
		fetchEmp();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cdano]);
	
	useEffect(() => {
		let fetching = false;
		let unmounted = false;
		 
		async function fetchUnit() {
			 
			if (!fetching && unitCode && unitCode.length===6)
				console.log(unitCode);
				await axios.get(`/units/fetchUnit/${unitCode}`)
					.then((response) => {
						console.log("response>>" + response.data);
						setUnitName(response.data);
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
		fetchUnit();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [unitCode]);


	const onSubmit = (data, event) => {
		event.preventDefault();
		console.log(casultyList);
		if(disabled)
			return;
		setDisabled(true);
		console.log(data);
		if (data) {
			axios.put("/do2s/rsec/saveDo2", data)
				.then((response) => {
					
						 
								setServerErrors(response.data)
								
							 
							 
				 })
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		}  

		//history.push("/do2s");
	}

const returnToList =() => {
		 
			history.push("/do2s/rsec/do2List");
		 
	}
	const onError = (errors, e) => console.log(errors, e);

	//All foreign keys. 
	// XXXXXX Add search fields and adjust the values as necessary
	const parentData = {
	
		employee: {
			title: "Employee",
			url : "employees",
			searchList : ['cdaoNo','checkDigit','officerName'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "employee",
		},
		 
		unit: {
			title: "Unit",
			url : "units",
			searchList : ['unitCode','unitName'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "unit",
		},
		docFormat: { 
			title: "Occurrence Code",
			url : "docFormats",
			searchList : ['occurrenceCode','occurrenceNature'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "docFormat",
		},
	}

	//Callback for child components (Foreign Keys)
	const callback = (childData) => {
		//console.log("Parent Callback");
		setEntity(prev => ({ ...prev, [childData.fk]: childData.entity }));
		setValue(childData.fk, childData.entity);
		if(childData.fk==='docFormat'){
			setValue('occurrenceCode',childData.entity.occurrenceCode);
			console.log(childData.entity.occurrenceCode);
		}
		 //console.log(childData.fk+"--"+childData.entity);
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
	
	const handleCdaNoChange = (e) => {
		console.log(e.target.value);
		setCdano(e.target.value);
		setValue("cdaoNo",e.target.value);
	};
	const handleUnitChange = (e) => {
		//console.log(e.target.value);
		setUnitCode(e.target.value);
		setValue("unitCode",e.target.value);
	};
	const handleServingIn = (e) => {
		//console.log(e.target.value);
		setServingIn(e.target.value);
		setValue("servingIn",e.target.value);
	};
	const handleLastDo2DateChange = (e) => {
		//console.log(e.target.value);
		setLastDo2Date(e.target.value);
		setValue("lastDo2Date",e.target.value);
	};
	const handleLastDo2Change = (e) => {
		//console.log(e.target.value);
		setLastDo2No(e.target.value);
		setValue("lastDo2No",e.target.value);
	};
	const handleDo2NoChange = (e) => {
		//console.log(e.target.value);
		setDo2No(e.target.value);
		setValue("do2No",e.target.value);
	};
	const handleDo2DateChange = (e) => {
		//console.log(e.target.value);
		setDo2Date(e.target.value);
		setValue("do2Date",e.target.value);
	};
	const handleNature =index=> (e) => {
		console.log(index+"--"+e.target.value);
		let item=casultyList[index];
		 
		item['nature']=e.target.value;
		let newData=[...casultyList];
		newData[index]=item;
		setCasultyList(newData);
		setValue("casualtyList",casultyList);
		 
	};
	const handleSlNo =index=> (e) => {
		console.log(index+"--"+e.target.value);
		let item=casultyList[index];
		 
		item['slNo']=e.target.value;
		let newData=[...casultyList];
		newData[index]=item;
		setCasultyList(newData);
		setValue("casualtyList",casultyList);
		 
	};
	const handleFromDate =index=> (e) => {
		console.log(index+"--"+e.target.value);
		let item=casultyList[index];
		 
		item['fromDate']=e.target.value;
		let newData=[...casultyList];
		newData[index]=item;
		setCasultyList(newData);
		setValue("casualtyList",casultyList);
		 
	};
	const handleToDate =index=> (e) => {
		console.log(index+"--"+e.target.value);
		let item=casultyList[index];
		 
		item['toDate']=e.target.value;
		let newData=[...casultyList];
		newData[index]=item;
		setCasultyList(newData);
		setValue("casualtyList",casultyList);
		 
	};
	const handleData1 =index=> (e) => {
		console.log(index+"--"+e.target.value);
		let item=casultyList[index];
		 
		item['data1']=e.target.value;
		let newData=[...casultyList];
		newData[index]=item;
		setCasultyList(newData);
		setValue("casualtyList",casultyList);
		 
	};
	const handleData2 =index=> (e) => {
		console.log(index+"--"+e.target.value);
		let item=casultyList[index];
		 
		item['data2']=e.target.value;
		let newData=[...casultyList];
		newData[index]=item;
		setCasultyList(newData);
		setValue("casualtyList",casultyList);
		 
	};
	const handleData3 =index=> (e) => {
		console.log(index+"--"+e.target.value);
		let item=casultyList[index];
		 
		item['data3']=e.target.value;
		let newData=[...casultyList];
		newData[index]=item;
		setCasultyList(newData);
		setValue("casualtyList",casultyList);
		 
	};
	const handleData4 =index=> (e) => {
		console.log(index+"--"+e.target.value);
		let item=casultyList[index];
		 
		item['data4']=e.target.value;
		let newData=[...casultyList];
		newData[index]=item;
		setCasultyList(newData);
		setValue("casualtyList",casultyList);
		 
	};
	const handleCasualtyCode =index=> (e) => {
		console.log(index+"--"+e.selectedIndex);
		let item=casultyList[index];
		 
		item['casualtyCode']=e.target.value;
		let newData=[...casultyList];
		newData[index]=item;
		setCasultyList(newData);
		setValue("casualtyList",casultyList);
		 
	};
	
	const addRow = (e) => {
		console.log(casultyList);
		setCasultyList([...casultyList,{slNo:"",casualtyCode:"",nature:"",fromDate:"",toDate:"",data1:"",data2:"",data3:"",data4:""}])
		 
	};
 

	return (
		<div className="max-w-8xl mx-auto ">
			<div className="w-full w-3/4  mx-auto " >

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Do2 Creation by R Section </h1>
					<div className="text-red-500">{serverErrors}</div>
					<Tabs
						id="Do2Edit"
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className="mb-3"
					>
						<Tab eventKey="page1" title="Page 1" className="h-120">
							<div className="grid grid-cols-2 gap-0">
							
							<div>
									<label>Cdao No</label>
									<input type="text"  name="cdano"  value={cdano} onChange={handleCdaNoChange}/>
									 
								</div>
								
								<div>
									<label>Officer Name</label>
									{officerName} 
									 
								</div>
								
								<div>
									<label>Unit Code</label>
									<input type="text" name="unitCode" onChange={handleUnitChange} value={unitCode}
										 placeholder="unit code or susno"
									/>
									<div className="text-red-500">{errors.do2No?.message}</div>
								</div>
								
								<div>
									<label>Unit Name</label>
									{unitName} 
									 
								</div>
							 
								
							 
						
								<div>
									<label>Do2 No</label>
									<input type="text" name="do2No" value={do2No} onChange={handleDo2NoChange}
										 
									/>
									<div className="text-red-500">{errors.do2No?.message}</div>
								</div>
								<div>
									<label>Do2 Date</label>
									<input type="date" name="fromDate" value={do2Date} onChange={handleDo2DateChange}
									  />
									<div className="text-red-500">{errors.fromDate?.message}</div>
								</div>	
								<div>
									<label>Last Do2 No</label>
									<input type="text" name="lastDo2No" value={lastDo2No} onChange={handleLastDo2Change}
										 
									/>
									<div className="text-red-500">{errors.lastDo2No?.message}</div>
								</div>
								<div>
									<label>Last Do2 Date</label>
									<input type="date" name="lastDo2Date" value={lastDo2Date} onChange={handleLastDo2DateChange}
									  />
									<div className="text-red-500">{errors.lastDo2Date?.message}</div>
								</div>	
								<div>
									<label>Serving In</label>
									 <select name="servingIn" value={servingIn}   onChange={handleServingIn}>
									  <option value="0">--select---</option>
									 <option value="Peace">Peace</option>
									 <option value="Field">Field</option>
									 <option value="Hard">Hard</option>
									   
									 
									 </select>
									<div className="text-red-500">{errors.servingIn?.message}</div>
								</div>
						 
					
		
							</div>
							<br/>
							<div>
							<table className="table table-striped table-bordered table-auto">
							<thead>
							 <tr>
                        <th>SlNo</th>
                        <th>Code</th>
                        <th>From Date</th>
                        <th>To Date</th>
                        <th>Data1</th>
                        <th>Data2</th>
                         <th>Data3</th>
                         <th>Data4</th>
                    </tr>
							</thead>
							<tbody>
							  {
						casultyList.map((item,i)=>{
							return(
							<tr key={"do2"+i}>
							 
							<td>
                    <input type="text" name="slNo" value={item.slNo} onChange={handleSlNo(i)}  />
                    </td>
                    
                     <td>
                     <select 
								disabled={loading}
								value={item.casualtyCode}
								onChange={handleCasualtyCode(i)}>
								<option key="0" value="0" label="--select--"/>
								{casualtyCodeList.map((item,index) => (
									
									<option key={"cs"+index} value={item.toString()}>   {item.toString()} </option>
								))}
							</select><br/>
							                    <textarea type="text"  rows="4" name="nature"  value={item.nature} onChange={handleNature(i)} placeholder="nature of occurrence" />

                    </td>
                    <td>
                    <input type="date" name="fDate" value={item.fromDate} onChange={handleFromDate(i)}   className="form-control py-0"/>
                    </td>
                    <td>
                    <input type="date" name="tDate" value={item.toDate} onChange={handleToDate(i)}   className="form-control py-0"/>
                    </td>
                    <td>
                    <input type="text" name="data1" value={item.data1}  onChange={handleData1(i)} className="form-control py-0"/>
                    </td>
                    <td>
                    <input type="text" name="data2" value={item.data2}  onChange={handleData2(i)} className="form-control py-0"/>
                    </td>
                    <td>
                    <input type="text" name="data3" value={item.data3}  onChange={handleData3(i)} className="form-control py-0"/>
                    </td>
                    <td>
                    <input type="text" name="data4" value={item.data4}  onChange={handleData4(i)} className="form-control py-0"/>
                    </td>
							</tr>
							)
							
						})
					
					}
							</tbody>
							</table>
							<div className="w-32 ...">
						<button type="button" onClick={addRow}>Add Record</button>
					</div>
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
						<div className="grid grid-cols-2 gap-0">
					<div className="px-4">
						<button type="submit" >Save</button>
					</div>
					<div className="px-4">
						<button type="button" onClick={returnToList} >Done</button>
					</div>
					</div>

				</form>
			</div>
		</div>
	);
};

export default withRouter(Do2REdit);