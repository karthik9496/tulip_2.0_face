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

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import addDays from 'date-fns/addDays'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

const schema = yup.object({
	 
});


const TransferEntryEdit = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();
const [loading, setLoading] = useState(true);
	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [key, setKey] = useState('page1');
	const [dakId,setDakId]=useState('');
	const [me,setMe]=useState('');
	const rcOptions=["","+R","-R","+C","-C"]
	const [transList,setTransList]=useState([{"signRc":"","codeHead":"","amount":""}])
	const [cdList,setCdList]=useState([]);
	const [readOnly, setReadOnly] = useState('');
	const [mesg,setMesg]=useState('');

useEffect(() => {
		let fetching = false;
		let unmounted = false;
		 
		async function fetchCd() {
			 
			if (!fetching)
				//console.log(secId);
				await axios.get(`/codeHeads/getAllCodeHeads`)
					.then((response) => {
						console.log("response>>" + response.data);
						setCdList(response.data);
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
		fetchCd();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get(`/transferEntrys/${id}`)
					.then((response) => {
						record = response.data;
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

				const fields = [
					'id', 'dak', 'section', 'unit', 'sectionCode', 'voucherClass', 'teMonth', 'amount', 'narration',
					'recordStatus', 'reason', 'approved','teTransList'
				];
				console.log(record["teTransList"]);
				 
					setTransList(record["teTransList"]);
 				 
				if(record['dak'])
					setDakId(record['dak'].dakidNo);
				if(record['teMonth'])
					setMe(record['teMonth']);
				 
				
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


	

const addRow = (e) => {
		 
		setTransList([...transList,{"signRc":"","codeHead":"","amount":""}])
		 
	};
	 
	const removeRow = (index) => {
    const list = [...transList];
    list.splice(index, 1);
    setTransList(list);
  };
	const onSubmit = (data, event) => {
		event.preventDefault();
		console.log(data);
		if (data.id) {
			axios.put("/transferEntrys/" + data.id, data)
				.then((response) => {
					setMesg(response.data);
				 })
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		} else {
			axios.post("/corpss", data)
				.then((response) => { })
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		}

	//	history.push("/transferEntrys");
	}

	const onError = (errors, e) => console.log(errors, e);

	//All foreign keys. 
	// XXXXXX Add search fields and adjust the values as necessary
	const parentData = {

	    
	}

	const handleCodeHead =index=> (e) => {
		console.log(index+"--"+e.selectedIndex+"--"+e.target.value);
		let item=transList[index];
		 
		item['codeHead']=e.target.value;
		let newData=[...transList];
		newData[index]=item;
		setTransList(newData);
	setValue("teTransList",transList);
		 
	};
	const handleRc =index=> (e) => {
		console.log(index+"--"+e.selectedIndex+"--"+e.target.value);
		let item=transList[index];
		 
		item['signRc']=e.target.value;
		let newData=[...transList];
		newData[index]=item;
		setTransList(newData);
		setValue("teTransList",transList);
		 
	};
	const handleAmount =index=> (e) => {
		console.log(index+"--"+e.selectedIndex+"--"+e.target.value);
		let item=transList[index];
		 
		item['amount']=e.target.value;
		let newData=[...transList];
		newData[index]=item;
		setTransList(newData);
		setValue("teTransList",transList);
		 
	};
	//Callback for child components (Foreign Keys)
	const callback = (childData) => {
		//console.log("Parent Callback");
		setEntity(prev => ({ ...prev, [childData.fk]: childData.entity }));
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
	const handleButtonClick = (e) => {
		history.push("/transferEntrys");
	}

	return (
		<div className="max-w-5xl mx-auto ">
			<div className="w-full w-3/4  mx-auto " >

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 >Transfer Entry</h1>
					<div className="text-red-500">{mesg}</div>
					 
						 
							<div className="grid grid-cols-1 gap-0">
								<div>
									<label>Dak Id</label>
									{dakId}
									 
								</div>
	<div>
									<label>Month</label>
									{me}
									 
								</div>

								
								<div>
									<label>Section Code</label>
									<input type="text" name="unitName" {...register("sectionCode")}
										
									/>
									<div className="text-red-500">{errors.sectionCode?.message}</div>
								</div>


							 

								<div>
									<label>Narration</label>
									 <textarea type="text"  rows="3" name="narration" {...register("narration")}/>
									 
									<div className="text-red-500">{errors.narration?.message}</div>
								</div>


							    
								 
     
							</div>
						 
 							<br/>
							<div>
							<table className="table table-auto table-striped table-bordered">
							<thead>
							 <tr>
                           <th>Code Head</th>
                        <th>RC</th>
                        <th>Amount</th>
                        
                    </tr>
							</thead>
							<tbody>
							{
								transList.map((item,i)=>{
									return(
										<tr key={"te"+i}>
										<td>
										 
										 
										<div>
										<select onChange={handleCodeHead(i)} value={item.codeHead}>
																											<option key="c0" value="---select code head -----" label="---select code head -----" />

										{cdList.map((value,idx)=>(<option value={value.toString()} key={"te2"+idx}>{value.toString()} </option>))
										}
										</select>
										</div>
										 
									 
										  
										</td>
										<td>
										 
										<div>
										<select onChange={handleRc(i)} value={item.signRc}>
										<option key="0" value="" label="" />

										{rcOptions.map((item,idx)=>(<option value={item.toString()} key={"te1"+idx}>{item.toString()} </option>))
										}
										</select>
										</div>
										 
										 
									 
																			
										 
										</td>
										<td>
										<input type="text" name="amt" value={item.amount}  onChange={handleAmount(i)} />
										</td>
										</tr>
										
									)
								})
							}
							</tbody>
							</table>
							
						<div className="grid grid-cols-2 gap-0">
						<button className=" w-32 m-2 p-0 " type="button" onClick={addRow}>Add Row</button>
					 
						<button className=" w-32 m-2 p-0 " type="button" onClick={removeRow}>Remove Row</button>
					</div>
							</div>

					<div className="grid grid-cols-2 gap-0">
					<div className="px-4">
						<button type="submit" >Save</button>
					</div>
					<div className="px-4">
									<button type="submit" onClick={handleButtonClick} >Done</button>
								</div>
								</div>

				</form>
			</div>
		</div>
	);
};

export default withRouter(TransferEntryEdit);