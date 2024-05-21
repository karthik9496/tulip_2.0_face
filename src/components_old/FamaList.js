/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By : 
 */

import { useState, useEffect, useMemo } from 'react';
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { withRouter, Link,useLocation,useHistory } from "react-router-dom";

function FamaList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	const [mesg,setMesg]=useState('');
	const [state,setState]=useState('');
	 const location=useLocation();
	 
	
	const SecondPage = props =>{
		
		
		
		useEffect(()=>{
			console.log(">>>>>>>>"+location.state.detail)
		},[location]);
	};
	

	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if(!fetching)
			await axios.get('/famas?search='+search)
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


	async function remove(id) {
		await axios.delete(`/banks/${id}`)
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
			Header: 'Action',
			Cell: ({ row }) => (
				<div>
				{row.original.action && (row.original.action==='edit' || row.original.action==='submit' || row.original.action==='approve') && 
					<Link to={"/famas/" + row.original.id}>
						<button className=" w-16 m-0 p-0 " > Edit </button>
					</Link>
					 }
				</div>
			)
		},
		{
			Header: "Employee",
			accessor: 'employee',
			Cell: ({ row }) => (
				<div> 
				<div>
				  {row.original.empname}{'/'}{row.original.cdaono}{row.original.cd}
				 
				 </div>
				    
				</div>
				
				)
			 
		},
		 
		{
			Header: "Beneficiary Name",
			accessor: 'benname',
		},
		
		{
			Header: "Bank A/c",
			accessor: 'bankclear',
		},
		
		{
			Header: "Ifsc",
			accessor: 'ifsc',
		},
		{
			Header: "Amount",
			accessor: 'amount',
		},
		{
			Header: "Relation",
			accessor: 'relname',
		},
		
	 {
			Header: "From Date",
			accessor: 'fromdate',
		},
		
		{
			Header: "To Date",
			accessor: 'todate',
		},
		{
			Header: "Record Status",
			accessor: 'status',
		},
		{
			Header: "Reason",
			accessor: 'reason',
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
					<h1 className="text-xl font-semibold">Fama</h1>
					<div className="flexContainer">
					<div>
						<input type="text" name="search" placeholder="cdao no"
						onChange={e => setInputText(e.target.value)}
							onKeyPress={handleKeyPress}
							className="pl-2 -ml-2 inputField flex-initial" />
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
						 </div>
						 <div>
							<Link to={"/famas/viewall"}>
								<button className=" w-48 ml-8 p-0 h-6 -mt-2" > Approved FAMA</button>
							</Link>
						</div>	
						 
					</div>	
					
					<div>
						 <h1 className="text-xl font-semibold">{location.state}</h1>
						</div>			
				</div>
				<div className="-mt-2 max-h-1 py-0">
					<Table columns={columns} data={data} className="table-auto" />
				</div>
			</main>
		</div>
	);
}

export default withRouter(FamaList);

