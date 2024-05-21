import { useState, useEffect, useMemo } from 'react';
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { withRouter, Link } from "react-router-dom";

function DakList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	const [usrLevel,setUsrLevel]=useState(0);
	
	useEffect(() => {
		function getSectionState() {
			let usr = JSON.parse(sessionStorage.getItem("usr"));
			if(usr && usr.designation)
				setUsrLevel(usr.designation.designationLevel);
				
			 
			  
		}

		getSectionState();
	}, []);


	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if(!fetching)
			await axios.get('/daks?search='+search)
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


async function process() {
	  	 
		axios.get(`/daks/mro/report`)
				.then((response) => {	 
			 
			 console.log(response.data);
			   let fname=response.data[0];
			  	setServerErrors(response.data);
			   
			    
			    if(fname!=null && fname.length>0){
			axios({
			url: `/daks/mro/load/` + fname, 
			method: 'GET',
			responseType: 'blob', // important
		}).then((res) => {
			const url =URL.createObjectURL(new Blob([res.data]),{type:"application/pdf"});
			const pdfWindow=window.open();
			pdfWindow.location.href=url;
			const link=pdfWindow.location.href;
			//const link = document.createElement('a');
			//link.href = url;
			link.setAttribute('download', fname);
		 
			//document.body.appendChild(link);
			link.click();
		});
		
		
		
		
		}
       
		});	
  
} 
	async function remove(id) {
		await axios.delete(`/daks/${id}`)
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
	
	async function print(id) {
		await axios.get(`/daks/mro/report/${id}`)
			.then((response) => {
				 
			 console.log(response.data);
			   let fname=response.data[0];
			  	 
			     
			    
			    if(fname!=null && fname.length>0){
			axios({
			url: `/daks/mro/load/` + fname, 
			method: 'GET',
			responseType: 'blob', // important
		}).then((res) => {
			//console.log(response.data);
			const url =URL.createObjectURL(new Blob([res.data]));
			const pdfWindow=window.open();
			pdfWindow.location.href=url;
			const link=pdfWindow.location.href;
			//const link = document.createElement('a');
			//link.href = url;
			try{
			link.setAttribute('download', fname);
		 
			//document.body.appendChild(link);
			link.click();
			}catch(err){
				
			}
		});
		
		
		
		
		}
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
				{row.original.dakType && row.original.dakType.description.toLowerCase().includes('mro from dd') &&
					<Link to={"/daks/mroEntry/" + row.original.id}>
						<button className=" w-16 m-0 p-0 " > Edit </button>
					</Link>
				}
				
				{row.original.dakType && !row.original.dakType.description.toLowerCase().includes('mro from dd') &&
					<Link to={"/daks/" + row.original.id}>
						<button className=" w-16 m-0 p-0 " > Edit </button>
					</Link>
					}
					{' '}
					<button
						className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
						onClick={() => remove(row.original.id)}
					>	Delete 	</button>
					{' '}
					 <div>
				{row.original.dakType && row.original.dakType.description.toLowerCase().includes('mro from dd') && <>
					 <button
						className="w-18 m-0 p-0 bg-green-500 hover:bg-red-700 "
						onClick={() => print(row.original.id)}
					>	Print Mro 	</button>
					</>
				}
				</div>
				</div>
			)
		},
		{
			Header: "Section",
			accessor: 'section.sectionName',
		},
		{
			Header: "Dak Id",
			accessor: 'dakidNo',
		},
		
		{
			Header: "Dak Year",
			accessor: 'dakYear',
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
			Header: "Officer Name",
			accessor: 'employee.officerName',
			 
		},
		{
			Header: "Rank",
			accessor: 'employee.rank.rankName',
			 
		},
		{
			Header: "CDAO No",
			accessor: 'employee.cdaoNo',
			 
		},
		{
			Header: "CDAO No",
			accessor: 'employee.checkDigit',
			 
		},
		
		{
			Header: "Amount",
			accessor: 'amount',
		},
		{
			Header: "Sub",
			accessor: 'subject',
		},
		
		{
			Header: "Ref No",
			accessor: 'referenceNo',
		},
		
		{
			Header: "Ref Date",
			accessor: 'referenceDate',
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
			<main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
					<h1 className="text-xl font-semibold">Dak</h1>
					<div className="flexContainer">
						<input type="text" name="search" 
						onChange={e => setInputText(e.target.value)}
							onKeyPress={handleKeyPress}
							className="pl-2 -ml-2 inputField flex-initial" />
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
						<div>
							<Link to={"/daks/new/"}>
								<button className=" w-32 ml-8 p-0 h-6 -mt-2" > Create Dak </button>
							</Link>
						</div>	
						<div>
							<Link to={"/daks/view/allDaks"}>
								<button className=" w-32 ml-8 p-0 h-6 -mt-2" > Search Dak </button>
							</Link>
						</div>	
						<div>
							<Link to={"/daks/dakLists/"}>
								<button className=" w-32 ml-8 p-0 h-6 -mt-2" >Top List </button>
							</Link>
						</div>	
						<div>
							<Link to={"/daks/printTopList/"}>
								<button className=" w-40 ml-8 p-0 h-6 -mt-2" >Re-print Top List </button>
							</Link>
						</div>	
						{usrLevel<30 &&
						<div>
							<Link to={"/daks/mroEntry/new"}>
								<button className=" w-36 ml-8 p-0 h-6 -mt-2" >Create Mro</button>
							</Link>
						</div>
						}
						{usrLevel===30 &&
						<>
						<div>
							<Link to={"/daks/fetchMroList/approval"}>
								<button className=" w-32 ml-8 p-0 h-6 -mt-2" >Approve Mro Entries </button>
							</Link>
						</div>	
						<div>
							 
								<button className=" w-32 ml-8 p-0 h-6 -mt-2" onClick={process} >Generate Mro Report </button>
							 
						</div>	
						</>
						}	
						 
						 
					</div>					
				</div>
				<div className="-mt-2 max-h-1 py-0">
					<Table columns={columns} data={data} className="table-auto" />
				</div>
			</main>
		</div>
	);
}

export default withRouter(DakList);

