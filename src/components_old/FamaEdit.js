/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By : 
 */

import { useState, useEffect } from "react";
import { withRouter, useParams, useHistory, useLocation } from "react-router-dom";
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

	// bankName: yup.string().required('Required'),
	/// bankBranch: yup.string().required('Required'),
	//  bankStation: yup.string().required('Required'),

	// ifsc: yup.string().required('Required'),

});


const FamaEdit = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [key, setKey] = useState('page1');
	const [dakidNo, setDakidNo] = useState('');
	const [empName, setEmpName] = useState('');
	const [action,setAction]=useState('');
	const [read,setRead]=useState(false);
	const [noEdit,setNoEdit]=useState(false);
	const [transType,setTransType]=useState('');
	const [amountRead,setAmountRead]=useState(false);
	const [fdateRead,setFdateRead]=useState(false);
	const [tdateRead,setTdateRead]=useState(false);


	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get('/famas/' + id)
					.then((response) => {
						record = response.data;
						const fields = [
							'id'
							, 'dakid', 'empname', 'cdaono', ',checkdigit',  'amount', 'benname', 'address', 'relname', 'bankclear', 'ifsc', 'fromdate', 'todate','status',
							'approved', 'reason', 'task','action','transtype','relation'
						];
						fields.forEach(field => setValue(field, record[field]));
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
			console.log(record['dakid']+"--"+record['transtype']);
				if (record['dakid'])
					setDakidNo(record['dakid']);
				if (record['empname'])
					setEmpName(record['empname']);
				if(record['transtype'] && record['transtype']==='CNG' && record['action'] && record['action']==='edit'){
					setTransType(record['transtype']);
					setRead(true);
 					setNoEdit(true);
					}
				if(record['action']){
					if((record['action']==='submit') ||(record['action']==='approve')){
						setRead(true);
						setAmountRead(true);
						setFdateRead(true);
						setTdateRead(true);
						}
					setAction(record['action']);
				}
					
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


async function submitFama(id) {
    await axios
      .put(`/famas/submit/${id}`)
      .then((response) => {
        console.log(response.data);
        if(response.data && response.data.reason)
        	setServerErrors(response.data.reason);
        	
      //  console.log(response.data);
         
      })
      .catch((error) => {
        console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
       // if (error.response) setServerErrors(error.response.data.error);
        	//else setServerErrors(error.Error);
      });
  }
  
  async function approveFama(id) {
    await axios
      .put(`/famas/approve/${id}`)
      .then((response) => {
        console.log(response.data);
        if(response.data && response.data.reason)
        	setServerErrors(response.data.reason);
        	
      //  console.log(response.data);
         
      })
      .catch((error) => {
        console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
       // if (error.response) setServerErrors(error.response.data.error);
        	//else setServerErrors(error.Error);
      });
  }
	const onSubmit = (data, event) => {
		event.preventDefault();
		console.log(data);
		if (data.id) {
			axios.put("/famas/" + data.id, data)
				.then((response) => {
					if (response.status === 200) {
						console.log(response.data.reason);
						if (response.data && response.data.reason) {
							setServerErrors(response.data.reason);
						}
						//history.push("/famas");
					}
				})
				.catch((error) => {
					//console.log(error.response.data);
					console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		} else {
			axios.post("/famas", data)
				.then((response) => {
					console.log(response.data);
					if (response.status === 200)
						history.push({ pathname: '/famas', state: response.data });
				})
				.catch((error) => {

					//console.log(error.response.data);

					console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		}


	}

	const onError = (errors, e) => console.log(errors, e);

	//All foreign keys. 
	// XXXXXX Add search fields and adjust the values as necessary
	const parentData = {

		employee: {
			title: "Officer",
			url: "employees",
			searchList: ['id'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "employee",
		},
		relation: {
			title: "Relation",
			url: "relations",
			searchList: ['relationName'], //XXXXXXXXX Add search fields
			fkEntity: "relation",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},

	}

	//Callback for child components (Foreign Keys)
	const callback = (childData) => {
		//console.log("Parent Callback");
		setEntity(prev => ({ ...prev, [childData.fk]: childData.entity }));
		setValue(childData.fk, childData.entity);
		//console.log(errors);
		if (childData.fk === 'relation'){
			console.log(childData.entity.relationName);
			setValue("relname",childData.entity.relationName);
			}
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
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Bank </h1>
					<div className="text-red-500">{serverErrors}</div>


					<div className="grid grid-cols-2 gap-0">

						<div >
							<label>DakId</label> {dakidNo}
						</div>
						<div >
							<label>Officer Name</label> {empName}
						</div>

						<div>
							<label>Beneficiary Name</label>
							<input type="text" name="banname" {...register("benname")}
								className="form-control py-0" readOnly={read}
							/>
							<div className="text-red-500">{errors.benname?.message}</div>
						</div>
						<div >
							<LiveSearch name="relation" onChange={handleInputChange}
								parentData={parentData.relation} parentCallback={callback}
								fkEntity={entity.relation} errCallback={errorCallback} />
							<div className="text-red-500 ">{errors.employee?.message}</div>
						</div>
						<div>
							<label>Amount</label>
							<input type="text" name="amount" {...register("amount")}
								className="form-control py-0" readOnly={amountRead}
							/>
							<div className="text-red-500">{errors.beneficiaryName?.message}</div>
						</div>


						<div>
							<label>Address</label>
							<input type="text" name="address" {...register("address")}
								className="form-control py-0" readOnly={read}
							/>
							<div className="text-red-500">{errors.address?.message}</div>
						</div>
						<div>
							<label>From Date</label>
							<input
								type="date"
								name="fromdate"
								{...register("fromdate")} readOnly={fdateRead}
							/>
							<div className="text-red-500">{errors.fromdate?.message}</div>
						</div>

<div>
							<label>To Date</label>
							<input
								type="date"
								name="todate"
								{...register("todate")} readOnly={tdateRead}
							/>
							<div className="text-red-500">{errors.todate?.message}</div>
						</div>

						<div>
							<label>Bank Account</label>
							<input type="text" name="bankclear" {...register("bankclear")}
								className="form-control py-0" readOnly={read}
							/>
							<div className="text-red-500">{errors.bankclear?.message}</div>
						</div>

						<div>
							<label>Bank Station</label>
							<input type="text" name="bankStation" {...register("bankStation")}
								className="form-control py-0" readOnly={read}
							/>
							<div className="text-red-500">{errors.bankStation?.message}</div>
						</div>

						<div>
							<label>Ifsc</label>
							<input type="text" name="ifsc" {...register("ifsc")}
								className="form-control py-0" readOnly={read}
							/>
							<div className="text-red-500">{errors.ifsc?.message}</div>
						</div>
 
					</div>
 
					<div className="px-8">
					
					{action && action==='edit' &&
						<button type="submit" >Save</button>
						}
						
						{action && action==='submit' &&
						<button type="button" onClick={()=>submitFama(id)}>Submit</button>
						}
						
						{action && action==='approve' &&
						<button type="button" onClick={()=>approveFama(id)}>Approve</button>
						}
					</div>

				</form>
			</div>
		</div>
	);
};

export default withRouter(FamaEdit);