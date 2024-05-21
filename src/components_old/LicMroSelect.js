/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By : 
 */

import { useState, useEffect, useMemo } from "react";
import { withRouter, useParams, useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import Table, { SelectColumnFilter } from '../utils/Table'  // 

import * as yup from "yup";

import { yupResolver } from '@hookform/resolvers/yup';

 

const schema = yup.object({
	 
	 
	
	 
});

 

const LicMroSelect = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();
	//console.log(id);

	let history = useHistory();
 
 	const [data,setData]=useState([]);
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	 

	 
	const [loading, setLoading] = useState(true);
	const [mesg,setMesg]=useState();
	const [key, setKey] = useState('Page1');
	const [disabled,setDisabled]=useState(false);
  	const [lightTheme, setLightTheme] = useState(true);
  	const [update, setUpdate] = useState(false);
	 
	const [usrLevel,setUsrLevel]=useState(0);
	const  [dakId,setDakId]=useState('');
	const [option, setOption]=useState('');
	 
	async function generatePendingMro() {
			  
				await axios.get(`/omros/mroSelect/licMaturity`)
					.then((response) => {
						console.log("response>>" + response.data);
						  
						 setData(response.data);
						 setDakId(response.data[0].id);
						 console.log(">>Dak id--:" + response.data[0].id+"=="+dakId);
						 
						 
						 
						  
						 
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
		 
 

	 
	
	useEffect(() => {
		let fetching = false;
		async function fetchUsrData() {
			if(!fetching)
			console.log(">>>>Usr Level is -----:" + usrLevel);
			await axios.get(`/licTransactions/userDesg`)
				.then((response) => {
					console.log(">>>>Usr Level is----:" + response.data);
					setUsrLevel(response.data);
					
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
		fetchUsrData();
		return () => { fetching = true; }

	}, []);

	 
const handleButtonClick = (e) =>{
		history.push("/cbillFunds");
	}
	const onError = (errors, e) => console.log(errors, e);

	//All foreign keys. 
	// XXXXXX Add search fields and adjust the values as necessary
	 
	 
	const errorCallback = (err) => {
		//console.log(err);
		setServerErrors(err);
	}
	
	 
	const handleCheckBox = index => (e) =>{
		   
		   console.log(e.target.checked);
			let item = data[index];
		 
		item['select'] = e.target.checked;
		let newData = [...data];
		newData[index] = item;
		setData(newData);
		 
	//	console.log(data);	
		 
	}
	
	const updateCheckBoxAll = (e) =>{
		   
		   let newData=[...data];
			for(var k in newData){
				newData[k].select=e.target.checked;
			}
			setData(newData);
		 
		 
	}

	const handleInputChange = (e) => {
		console.log(e.target.value);
	//	console.log("handle input change");
		 
		
	};
 
		 
	const columns=useMemo(()=>[
		 
		 
		 
		
		{
			 
			Header:  <input type="checkbox" onChange={updateCheckBoxAll} />,
			
		 	accessor : "select",			 
			Cell: ({ row }) => (
				<div>
					<input type="checkbox" onChange={handleCheckBox(row.index)}  checked={data[row.index]['select']}/>
				 
				</div>
			)
		},
		
		{
			Header: "DakId No",
			accessor: 'dakidNo',
		},
		 {
        Header: "Amount",
        accessor: "amount",
      },
		{
        Header: "Reference No",
        accessor: "referenceNo",
      },
      
      {
        Header: "Reference Date",
        accessor: "referenceDate",
      },
      
      {
        Header: "Dak Id",
        accessor: "id",
      },
		 
		
	],[data])
	
	 
	 
	   
	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
			 
					 

					<h1 className="text-xl font-semibold ml-4">Lic Mro Select</h1>
					<div className="text-red-500">
					{mesg}
					</div>
					<div>
					<button type="submit" onClick={generatePendingMro} className=" mt-3  w-40  " >Generate O/s MRO</button>  
						 
					 </div>
						 
						
						 
						
						
						
						
				  
				 
				<div className="-mt-2 max-h-1 py-0 ml-0">
					<Table columns={columns} data={data} className="table-auto" />
				</div>
				 
			 
			</main>
			
			 <div>
						 {console.log(">>>In Link---:" + dakId)}
						{(usrLevel<30 && dakId) &&
						
							<Link to={{
								pathname:"/omros/addMro/licMaturity",
								state:dakId}}>
								<button className=" w-20 ml-4 p-2 h-15 -mt-0" >Feed Officers Details</button>
							</Link>
							}
						</div>

		</div>
	);
};
 

export default withRouter(LicMroSelect);