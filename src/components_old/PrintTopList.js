/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By : 
 */

import { useState, useEffect, useMemo } from "react";
import { withRouter, useParams, useHistory,Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import Table, { SelectColumnFilter } from '../utils/Table'  // 


import * as yup from "yup";

import { yupResolver } from '@hookform/resolvers/yup';
  
 

 

const schema = yup.object({
	 
	 
	
	 
});

 

const PrintTopList = () => {
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
	const [listNo,setListNo]=useState('');
	 
	const [sh3List,setSh3List]=useState([]);
	 
	const [loading, setLoading] = useState(true);
	 const [mesg,setMesg]=useState();
	 
	const [key, setKey] = useState('Page1');
 
	
 

	useEffect(() => {
		let fetching = false;
		let unmounted = false;
		 
		async function fetchData() {
			console.log(listNo);
		if (!fetching && listNo)				
				await axios.get("/daks/printTopList/"+listNo)
					.then((response) => {
						console.log("response>>" + response.data);
						//setSh3List(response.data);
						 setData(response.data);;
						 
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
		fetchData();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[listNo]);


 

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
		console.log(data);	
		 
	}
	
	const updateCheckBoxAll = (e) =>{
		   
		   
			for(var k in sh3List){
				sh3List[k].select=e.target.checked;
			}
		 
		 
	}

	const handleInputChange = (e) => {
		console.log(e.target.value);
		setListNo(e.target.value);
		console.log("handle input change"+listNo);
		 
		
	};
	const download = (fkDak) => {
		console.log(fkDak);
		axios.get(`/daks/rePrintTopList/${fkDak}`)
		.then((response) => {
			 const url = window.open(`${process.env.REACT_APP_BASE_URL}/files/${response.data}`);
			
			 
		});
	}
	
	  
	const columns=useMemo(()=>[
		
		
		{
			Header: 'Action',
			Cell: ({ row }) => (
				<div>
					 
						<button className=" w-32 m-0 p-0 " onClick={()=>download(row.original.id)} > Reprint Top List </button>
						 
					 
				</div>
				
			)
			 
		},
		{
			Header: "List No",
			accessor: 'listNo',
		},
		{
			Header: "List Date",
			accessor: 'listDate',
		},
		{
			Header: "Dak Id",
			accessor: 'dakidNo',
		},
		{
			Header: "Dak Year",
			accessor: 'Year',
		},
		
		{
			Header: "Month",
			accessor: 'monthEnding',
		},
		{
			Header: "Dak Type",
			accessor: 'dakType.description',
		},
		{
			Header: "Section",
			accessor: 'section.sectionName',
		},
		{
			Header: "CDAO No",
			accessor: 'cdaoNo',
		},
		{
			Header: "Amount",
			accessor: 'amount',
		},
		
	],[data])
	   
	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className=" ">
					 

					<h1 className="text-xl font-semibold ml-4">Re-print Top List</h1>

					 <div className="flexContainer">
						<input type="text" name="search" placeholder="list no"
						onChange={e=>handleInputChange(e)}
							 
							className="pl-2 -ml-2 inputField flex-initial" />
						 
						 		<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>			
					</div>	


				</div>
				<div className="-mt-2 max-h-1 py-0 ml-0">
					<Table columns={columns} data={data} className="table-auto" />
				</div>
			</main>

		</div>
	);
};
 

export default withRouter(PrintTopList);