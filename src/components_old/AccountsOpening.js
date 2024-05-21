/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 18 April 2022
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
      
});


const AccountsOpening = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [key, setKey] = useState('page1');
	const [me,setMe]=useState('');
	 
	const [changeType,setChangeType]=useState('');
	const [incrDate,setIncrDate]=useState('');
	const [oldIncrDate,setOldIncrDate]=useState('');
	const [disabled,setDisabled]=useState(false);
	const [absType,setAbsType]=useState('')
	const [results, setResults] = useState("");
    const date = new Date();
    const currentDate = new Date().toLocaleDateString();
	
	let empdet='';
	
	useEffect(() => {
	 
		 async function fetchMe() {
	 
		await axios.get(`/miscs/me/nextMe`)
			.then((response) => {
				//console.log(data);
				 setMe(response.data);
			})
			.catch((error) => {
				setDisabled(false);
				console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}

			fetchMe();
			 
		

	}, []);

 	  useEffect(() => {
                const day = String(date.getDate()).padStart(2, "0");
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const year = date.getFullYear();
                setResults(`${day}/${month}/${year}`);
            }, []);

async function process() {
	 
	if(disabled)
		return;
	console.log(results);
		 
		var proceed=window.confirm('Todays Date is '+results+ "\nYou are Going to Open Accounts for Month Ending "+me+", Kindly ensure that MPS and all reports returns have been generated" );
	console.log(proceed);
	if(!proceed)
		return;
		 
		 
		 
			
		setDisabled(true);
		 console.log("---me--:" + me.slice(0,2)+"--"+me.slice(3));
		 let month=me.slice(0,2)+me.slice(3);
		axios.post(`/miscs/initDb/newMonth/${month}`)
		.then((response) => {	 
			setDisabled(false);
			 console.log(response.data);
			   
			  	setServerErrors(response.data);
			    setDisabled(false);
       
		});
	}
	
 

	const onError = (errors, e) => console.log(errors, e);

 
 
	const errorCallback = (err) => {
		//console.log(err);
		setServerErrors(err);
	}
	
	const handleSelect = (e) => {
		console.log(e.target.value);
		setAbsType(e.target.value);
		
	};

	 
	return (
		<div className="max-w-xl mx-auto ">
			<div className="w-full w-3/4  mx-auto " >

				<form>
					<h1 >Accounts Opening</h1>
					<div className="text-red-500">{serverErrors}</div>
					<Tabs
						id="PaoEdit"
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className="mb-3"
					>
						<Tab eventKey="page1" title="Page 1" className="h-120">
							<div className="grid grid-cols-1 gap-0">
								<div>
									<label>Month</label>
									<input type="text" name="me" value={me}/> 
									 
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
						
					<div>
						<button type="button" onClick={process} disabled={disabled} >
						{disabled && (
						<span className="spinner-grow spinner-grow-sm"></span>
					)
						
					}
						Open Accounts</button>
					</div>

				</form>
			</div>
		</div>
	);
};

export default withRouter(AccountsOpening);