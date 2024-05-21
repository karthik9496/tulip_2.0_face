/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 18 April 2022
 *
 * Modified By : 
 */

import { useState, useEffect, useMemo } from 'react';
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { format } from 'date-fns'
import { withRouter, Link } from "react-router-dom";

function SpecimenSignatureList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	const [action,setAction]=useState('');

	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if(!fetching)
			await axios.get('/specimenSignatures?search='+search)
				.then((response) => {
					 
					setData(response.data);
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
		return () => { fetching = true; }

	}, [update, search]);

	useEffect(() => {		 
		async function fetchAction() {
				 
		     await axios.get(`/specimenSignatures/actions/fetchAction`)
				.then((response) => {
						
						setAction(response.data);						 
			 	})
				.catch((error) => {
					if(error.response)
						setServerErrors(error.response.data.error);
					else
					 	setServerErrors(error.Error);
			 	});
			 					
		}

		fetchAction();
	},  [update]);
	
	async function verifyBulk() {
		let i=0;
		var count=0;
		for(i=0;i<data.length;i++){
			if(data[i].select!==null && data[i].select===true)
				count++;
		}
		if(count>0){
			var proceed=window.confirm("You are about to verify "+count+" records. Please Confirm.")
			if(!proceed)
				return;
		}
		if(count===0){
			alert("No records selected");
			return;
		}
		await axios.put(`/specimenSignatures/verify/bulk`,data)
			.then((res) => {
				//console.log(data);
				setServerErrors(res.data[0])
				setData(res.data[1]);
				setUpdate(!update);
			})
			.catch((error) => {
				console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}
	
	
	async function approveBulk() {
		let i=0;
		var count=0;
		for(i=0;i<data.length;i++){
			if(data[i].select!==null && data[i].select===true)
				count++;
		}
		if(count>0){
			var proceed=window.confirm("You are about to approve "+count+" records. Please Confirm.")
			if(!proceed)
				return;
		}
		if(count===0){
			alert("No records selected");
			return;
		}
		await axios.put(`/specimenSignatures/approve/bulk`,data)
			.then((res) => {
				//console.log(data);
				setServerErrors(res.data[0])
				setData(res.data[1]);
				setUpdate(!update);
			})
			.catch((error) => {
				console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}

const handleCheckBox = index=>(e) =>{
		console.log(e.target.checked+"--"+index);			  
		console.log(e.target.checked);
		let item = data[index];
		 
		item['select'] = e.target.checked;
		let newData = [...data];
		newData[index] = item;
		setData(newData);		 
	}
	
	const updateCheckBoxAll = (e) =>{		   
		let newData=[...data];
		for(var k in newData){
			newData[k].select=e.target.checked;
		}
		setData(newData);		 
	}
	async function remove(id) {
		await axios.delete(`/specimenSignatures/${id}`)
			.then(() => {
				//console.log(data);
				let updatedRecords = [...data].filter((i) => i.id !== id);
				console.log(updatedRecords);
				setData(updatedRecords);
				setUpdate(!update);
			})
			.catch((error) => {
				console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}


	const columns = useMemo(() => [
		{
			Header: <div>
			{
				(action==="verify" || action==="approve") && 
				<input type="checkbox" onChange={updateCheckBoxAll}/>
				
			}
			{
				(action==='NA') &&
				 <div>
				    <label>Action</label>
				  </div>	
				
			}
			</div>,
			accessor : "select",
			Cell: ({ row }) => (
				<div>
				{(row.original.action!==null && row.original.action==='edit') &&
					<Link to={"/specimenSignatures/" + row.original.id}>
						<button className=" w-16 m-0 p-0 " > Edit </button>
					</Link>
					}
					{' '}
					{(row.original.action!==null && (row.original.action==='approve' || row.original.action==='verify')) && <>
					
					 <div>
						<input type="checkbox" onChange={handleCheckBox(row.index)} checked={data[row.index]['select']}/>
						</div>	
						<div><label>{row.original.action}</label></div>	
					 </>
					}
					{' '}
					{(row.original.action!==null || row.original.action==='edit') && action==='NA' &&
					<button
						className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
						onClick={() => remove(row.original.id)}
					>	Delete 	</button>
					}
				</div>
			)
		},
		{
			Header: "Unit",
			accessor: 'unit.unitCode',// Change this
		},
		{
			Header: "Sus No",
			accessor: 'susNo',
		},
		
		
		{
			Header: "Signatory",
			accessor: 'signatoryCode',
			Cell: ({ row }) => (
				 
				  <div>
				   
				  <label>  {row.original.signatoryCode}<br/>{row.original.signatoryName} <br/>{row.original.signatoryDesignation}</label>
				   
				  </div>				   
				 
			)
		},
		
		 
		
		{
			Header: "Authority Letter",
			accessor: 'authorityLetterNo',
			Cell: ({ row }) => (
				 
				  <div>
				 
				 	{row.original.authorityLetterDate && <>
				   <label> {row.original.authorityLetterNo}<br/>{format(new Date(row.original.authorityLetterDate.toString()),'dd/MM/yyyy')}</label>
				    </>
				    }
				    {!row.original.authorityLetterDate && <>
				  <label>  {row.original.authorityLetterNo}</label> 
				    </>
				    }
				     
				  </div>				   
				 
			)
		},
		
		 
		
		{
			Header: "From Date",
			accessor: 'fromDate',
		},
		
		{
			Header: "To Date",
			accessor: 'toDate',
		},
		{
			Header: "Finger Print",
			accessor: 'fingerPrint',
		},
		
		{
			Header: "Ss File Name",
			accessor: 'ssFileName',
		},
		 
		
		{
			Header: "Auditor Date",
			accessor: 'auditorDate',
		},
		
		{
			Header: "Aao Date",
			accessor: 'aaoDate',
		},
		
		{
			Header: "Ao Date",
			accessor: 'aoDate',
		},
		
		{
			Header: "Record Status",
			accessor: 'recordStatus',
		},
		
		 
		
		{
			Header: "Approved",
			accessor: 'approved',
			Cell: ({ row }) => (
				 
				 <div>
				{row.original.approved!=null &&
				row.original.approved === true ? 'true' : 'false'}
				 </div>
				 
				 
				)
		},
		
		 
		
		
		
		{
			Header: "Remarks",
			accessor: 'remarks',
		},
		
		 
		
		
		
		/*
		{
			Header: "Login Name",
			accessor: 'loginName',
			Filter: SelectColumnFilter,  // new
			filter: 'includes',
		},
		*/
	], [data])

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(inputText);
		setSearch(inputText);
	}

	const handleKeyPress = (event) => {
		// look for the `Enter` keyCode
		if (event.keyCode === 13 || event.which === 13) {
			handleSubmit(event)
		}
	}

	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
				<div className="text-red-500">{serverErrors}</div>
					<h1 className="text-xl font-semibold">Specimen Signatures</h1>
					<div className="flexContainer">
						<input type="text" name="search"  placeHolder="susNo or signatoryCode"
						onChange={e => setInputText(e.target.value)}
							onKeyPress={handleKeyPress}
							className="pl-2 -ml-2 inputField flex-initial" />
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
						<div>
							<Link to={"/specimenSignatures/new"}>
								<button className=" w-48 ml-8 p-0 h-6 -mt-2" > Add Specimen Signature </button>
							</Link>
						</div>
						
						<div>
							<Link to={"/specimenSignatures/approved/viewAll"}>
								<button className=" w-48 ml-8 p-0 h-6 -mt-2" > Approved List </button>
							</Link>
						</div>
					</div>					
				</div>
				<div className="-mt-2 max-h-1 py-0">
					<Table columns={columns} data={data} className="table-auto" />
					
					{(action==='verify') && <> 
				 	<div  className="mt-2 ml-4">
						 <button type="button" onClick={verifyBulk}  className=" mt-3  w-40  " >Verify</button>
					</div>
					</>
					}
					{(action==='approve') && <> 
				 	<div  className="mt-2 ml-4">
						 <button type="button" onClick={approveBulk}  className=" mt-3  w-40  " >Approve</button>
					</div>
					</>
					}
					
				</div>
			</main>
		</div>
	);
}

export default withRouter(SpecimenSignatureList);

