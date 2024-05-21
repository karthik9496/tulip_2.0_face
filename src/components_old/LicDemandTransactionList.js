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
 

function LicDemandTransactionList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	 const [page,setPage]=useState(0);
	  const [pageSize, setPageSize] = useState(0);
	  const[usrLevel,setUsrLevel]=useState(0);
	  const[mesg,setMesg]=useState('');
	  const[approved,setApproved]=useState(true);
	  const[fileName,setFileName]=useState("");
	  const [disabled,setDisabled]=useState(false);
	  const [validRec,setValidRec]=useState('');
	  const [amount,setAmount]=useState('');
	  const [dakidNo,setDakidNo]=useState('');

	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if(!fetching)
			await axios.get('/licDemandTransactions?search='+search+'&fileName='+fileName)
				.then((response) => {
					setData(response.data);
					if(response.data[0]['approved']===null || response.data[0]['approved']===false){
						setApproved('false');
					}
					console.log("---response--LDT--:"+ response.data[0]['approved']);
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

	}, [update, search,fileName]);
	
	 
	useEffect(() => {
		let fetching = false;
		async function fetchUsrData() {
			if(!fetching)
			console.log(">>>>Usr Level is -----:" + usrLevel);
			await axios.get(`/licDemandTransactions/userDesg`)
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
	async function submitBulk() {
		console.log(">>>>>Demand List----:" + data);
		let i=0,fname="NA";
		if((fileName!==null && fileName.length===0) || fileName===null){
			alert("No file name given ");
			return;
		}
		if(data.length===0){
			alert("No records exist with this file name");
			return;
		}
		for(i=0;i<data.length;i++){
			if(fname!=="NA"){
				if(data[i].uploadFileName!==fname){
					alert("Selection contains multiple file");
					return;
				}
			}
				
			fname=data[i].uploadFileName;
			
		}
		
		let proceed=window.confirm("You are about to process file containing "+data.length+" records.");
		if(!proceed)
			return;
		
		if(disabled)
			return;
			
			setDisabled(true);
		await axios.put(`/licDemandTransactions/bulkSubmitDemand`, data)
			.then((response) => {
				setDisabled(false);
				setMesg(response.data[0]);
				if(response.data[1]!==null)
					setData(response.data[1]);
				console.log("reponse status--------------"+response.status);
			 
				 
			})
			.catch((error) => {
			//	console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}
	const createDemandReport = () => {
		console.log("--dakidno---:" + dakidNo);
	if((dakidNo!==null && dakidNo.length===0) || dakidNo===null){
			alert("No DakId No given ");
			return;
		}
		
		if(!dakidNo.startsWith("R")){
			alert("Dakid No is incorrect ");
			return;
		}
		
	if(disabled)
		return;
		
		setDisabled(true);
		 
		axios.get(`/licDemandTransactions/generateDemandReport/${dakidNo}`)
		.then((response) => {
			 //const url = window.open(`${process.env.REACT_APP_BASE_URL}/files/${response.data}`);
			 		 
			setMesg(response.data);
			 
		});
	}
	
	const generatePendingDemandReport = () => {
		 
		
		 
		
	if(disabled)
		return;
		
		setDisabled(true);
		 
		axios.get(`/licDemandTransactions/generatePendingDemandReport`)
		.then((response) => {
			 //const url = window.open(`${process.env.REACT_APP_BASE_URL}/files/${response.data}`);
			 		 
			setMesg(response.data);
			 
		});
	}
	async function approveBulk() {
		console.log(">>>>>Demand List----:" + data);
		console.log(">>>>>Demand List----:" + data);
		let i=0,fname="NA";
		if((fileName!==null && fileName.length===0) || fileName===null){
			alert("No file name given ");
			return;
		}
		if(data.length===0){
			alert("No records exist with this file name");
			return;
		}
		for(i=0;i<data.length;i++){
			if(fname!=="NA"){
				if(data[i].uploadFileName!==fname){
					alert("Selection contains multiple file");
					return;
				}
			}
				
			fname=data[i].uploadFileName;
			
		}
		
		let proceed=window.confirm("You are about to approve file containing "+data.length+" records.");
		if(!proceed)
			return;
		
		if(disabled)
			return;
			
			setDisabled(true);
		await axios.put(`/licDemandTransactions/bulkApproveDemand`, data)
			.then((response) => {
				setValidRec(response.data[1]);
				setAmount(response.data[2]);
				if(response.data[2].startsWith("Selected")){
					setMesg(response.data[3]);
				}else{
					setMesg(response.data[0]);
				}
				console.log("reponse status--------------"+response.status);
			//	setFundList([]);
			let updatedRecords = [...data];
				console.log(updatedRecords);
				setData(updatedRecords);
				setUpdate(!update);
				 
			})
			.catch((error) => {
			//	console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
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
	const columns = useMemo(() => [
				 
		{
			Header: 'Action',
			Cell: ({ row }) => (
				 
					<div>
					 {row.original.action!=null && row.original.action.includes("edit") &&
					<Link to={"/licDemandTransactions/" + row.original.id}>
						<button className=" w-16 m-0 p-0 " > Edit </button>
					</Link>
					}
					 
					
					
					
					
					
					 </div>
					 
			)
		},
		
		 
		{
			Header: "Dak",
			accessor: 'dak.dakidNo', 
		},
		
		{
			Header: "Cdao No",
			accessor: 'cdaoNo',
		},
		
		{
			Header: "Cdao Check Digit",
			accessor: 'employee.checkDigit',
		},
		
		{
			Header: "Officer Name",
			accessor: 'employee.officerName', 
		},
		{
			Header: "Policy No",
			accessor: 'policyNo',
		},
		
		{
			Header: "Premium Amount",
			accessor: 'premiumAmount',
		},
		
		{
			Header: "Gst",
			accessor: 'gstOnPremiumAmount', 
		},
		 
		
		{
			Header: "Month Ending",
			accessor: 'monthEnding', 
		},
		{
			Header: "File Name",
			accessor: 'uploadFileName', 
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
			Header: "Approved",
			accessor: 'approved',
			Cell: ({ row }) => (
				<div>
				
					 {data[row.index]['approved'] === true ? 'Y' : 'N'}
				</div>
			)
		},
		
		
		{
			Header: "Record Status",
			accessor: 'recordStatus',
		},
		
		
		
		{
			Header: "Reason",
			accessor: 'reason',
		},
		
		{
			Header: "Remarks",
			accessor: 'remarks',
		},
		
		
		 
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
	const handleP = (pp)=>{
		console.log(pp); 
		setPage(pp);
	}
	const handlePageSize = (pp) => {
      console.log(pp);
      setPageSize(pp);
    };

	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
					<h1 className="text-xl font-semibold">Lic Demand Transactions</h1>
					<div className="text-red-500">{mesg}</div>
					{usrLevel>30 &&
					<>
					<div className="text-red-500">Total Valid Records:{validRec}</div>
					<div className="text-red-500">Total Demand Amount:{amount}</div>
					</>
					}
					<div className="flexContainer">
					<div>
					<input type="text" name="fileName" placeholder="fileName"
						onBlur={e => setFileName(e.target.value)}							
							className="pl-2 -ml-2 inputField flex-initial" />
						</div>
						<div>	
						<input type="text" name="search" placeholder="Cdao No"
						onBlur={e => setInputText(e.target.value)}							
							className="pl-2 -ml-2 inputField flex-initial" />
							</div>
							<div>	
						<input type="text" name="search" placeholder="Dakid No"
						onBlur={e => setDakidNo(e.target.value)}							
							className="pl-2 -ml-2 inputField flex-initial" />
							</div>
							<div>
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
						</div>
						<div>
						<button type="submit" onClick={createDemandReport} className="w-26 m-0 p-0">Generate Demand Report</button>
						 </div>
						 
						 <div>
						<button type="submit" onClick={generatePendingDemandReport} className="w-26 m-0 p-0">Generate Pending Demand Report</button>
						 </div>
						 
						 
					</div>			
					<div className="-mt-2 max-h-1 py-0 ml-0">
				 
					<TablePage columns={columns} data={data} newpage={page} parentCallback={handleP}  newPageSize={pageSize}
              parentCallbackPageSize={handlePageSize}className="table-auto" />
				 <div>
				 {(usrLevel <30) &&
						<button type="button" onClick={submitBulk} disabled={disabled} className="w-36 m-2 p-0">
						{disabled && (
						<span className="spinner-grow spinner-grow-sm"></span>
					)
						
					} Process File</button>
						}
				 {(usrLevel===30) &&
						<button type="button" onClick={submitBulk} disabled={disabled} className="w-36 m-2 p-0">
						{disabled && (
						<span className="spinner-grow spinner-grow-sm"></span>
					)
						
					} Submit File</button>
						}		
				{(usrLevel>30) &&
						<button type="button" onClick={approveBulk} className="w-36 m-2 p-0"> Approve File</button>
						}
						
						</div>
				 
				</div>		
				</div>
				 
			</main>
		</div>
	);
}

export default withRouter(LicDemandTransactionList);

