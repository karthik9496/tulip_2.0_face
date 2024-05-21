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
import { withRouter, Link } from "react-router-dom";
import TablePage from '../utils/TablePage';

function LicMaturityBatchSelection() {

const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [selectedData,setSelectedData]=useState({});
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	 const [page,setPage]=useState(0);
	  const [pageSize, setPageSize] = useState(0);
	  const[usrLevel,setUsrLevel]=useState(0);
	  const[mesg,setMesg]=useState('');
	  const [uploadFileName,setUploadFileName]=useState('');
	const [maturityAmount,setMaturityAmount]=useState(0);
	const [totalRecords,setTotalRecords]=useState('');
	const [mroDakId,setMroDakId]=useState('');

	 
		 
		async function fetchData() {
			 
			 
				console.log("XXXXXXXXXXXX");
				await axios.get(`/licMaturityTransactions/generateBatch/licMaturity`)
					.then((response) => {
						console.log("response>>" + response.data[0]['uploadFileName']);
					//	 setUploadFileName(response.data[0]);
					//	 setMaturityAmount(response.data[1]); 
						// setTotalRecords(response.data[2]);
						 setData(response.data);
						 setUploadFileName(response.data[0]['uploadFileName']);
						console.log(">>>>> Dak Id----:" + uploadFileName);
						 
						 
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
		 

	
	async function processBatch(batch){
			 
			 console.log("--:"+batch+"=="+data[0].uploadFileName+"=="+data[0].mroDakId);
			 
			 for(var i=0;i<data.length;i++){
				console.log(data[i].mroDakId);
				if(data[i].uploadFileName===batch){
					setSelectedData(data[i]);
				}
			}
				 
			 axios.get(`/licMaturityTransactions/maturityLicList`,selectedData)
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
		 
	 
	const updateCheckBoxAll = (e) =>{
		  // console.log("..."+e.target.checked+"--"+index);
		   
			  let newData=[...data];
			for(var k in newData){
				newData[k].select=e.target.checked;
			}
			setData(newData);
		 
		 
	} 
	const handleCheckBox = index=>(e) =>{
		//console.log(Table.page)
		   console.log(e.target.checked+"--"+index);
			 
			
			  
		   console.log(e.target.checked);
			let item = data[index];
		 
		item['select'] = e.target.checked;
		let newData = [...data];
		newData[index] = item;
		setData(newData);
		 
		 
		 
	}
	
	const handleTextBox = index=>(e) =>{
		//console.log(Table.page)
		//   console.log(e.target.checked+"--"+index);
		console.log(e.target.value);	 
		setMroDakId(e.target.value);	
		 	  
		  
		 
	}
	const handleDak= index => (e) => {
		console.log(index+"--"+e.target.value);
		let item = data[index];
		 
		item['mroDakId'] = e.target.value;
		 
		let newData = [...data];
		newData[index] = item;
		setData(newData);
		 
	}
	const columns=useMemo(()=>[
		 
		 
		 
		
		{
			 
			Header: "Action",
			
		 	accessor : "select",			 
			Cell: ({ row }) => (
				<div>
					<button type="button" onClick={processBatch(row.original.uploadFileName)} >Process</button>
				 
				</div>
			)
		},
		
		{
		Header: "Upload File Name",
		accessor: 'uploadFileName',
		},
		{
        Header: "Maturity Amount",
        accessor: "maturityAmount",
    	},
      
        {
        Header: "Total Records",
        accessor: "totalRecords",
        },
        
        {
        Header: "Mro Dak - Id",
        accessor: "dak",
        Cell: ({ row }) => (
				<div>
					<input type="text" placeholder="MRO DakId" value={row.original.mroDakId} onBlur={handleDak(row.index)} />
				 
				</div>
			)
         
        
        },
		 
		
	],[data])

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
					<h1 className="text-xl font-semibold">Lic Maturity Batch Selection</h1>
					<div className="text-red-500">{mesg}</div>
					<div className="flexContainer">
					
					
						 
					 <div>
						 
							 
								 
						<button type="button" onClick={fetchData} className="w-36 m-2 p-0"> Generate batch</button> 
						<div>
						 
						<label>Click on "Generate Batch" button </label> 
						<label>Select batch for which MRO has been approved</label>
						 
						</div>
						</div>
						 
						 <div className="mt-6 max-h-1">
					<Table columns={columns} data={data} className="table-auto" />
				</div>
				
					<div>
					{console.log("--File Name--:" + uploadFileName)}
						<Link to={{pathname:"/licMaturityTransactions/maturityLicList",
						state:uploadFileName}}>
						<button className="w-46 m-2 p-0" >Process Lic Maturity Batch Selected </button>
						</Link>
						</div>
						 
					</div>			
					 
				</div>		
				 
				 
			</main>
		</div>
	);
}

export default withRouter(LicMaturityBatchSelection);

