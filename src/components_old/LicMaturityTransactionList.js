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
import { withRouter, Link ,useLocation } from "react-router-dom";
import TablePage from '../utils/TablePage';

function LicMaturityTransactionList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	 const [page,setPage]=useState(0);
	  const [pageSize, setPageSize] = useState(0);
	  const[usrLevel,setUsrLevel]=useState(0);
	  const[mesg,setMesg]=useState('');
	  const {state}=useLocation();
	   const [cdaoNo,setCdaoNo]=useState('');
	   const [batch,setBatch]=useState('');
	   const [mroDakId,setMroDakId]=useState('');
	   const [disabled,setDisabled]=useState(false);
	   const [matType,setMatType]=useState('');
	   const [dakIdNo, setDakIdNo]=useState('');

	 
	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if(!fetching)
			console.log(">>>Uplaod File Name==:" + state); 
			await axios.get(`/licMaturityTransactions?batch=`+batch+`&cdaoNo=`+cdaoNo
			+`&mroDakId=`+mroDakId+`&matType=`+matType+`&dakIdNo=`+dakIdNo)
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

	}, [batch,cdaoNo, dakIdNo]);
	
	useEffect(() => {
		let fetching = false;
		async function fetchMroData() {
			if(!fetching)
			 
			await axios.get(`/licMaturityTransactions/mroData/${mroDakId}`)
				.then((response) => {
					console.log(mroDakId);
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
		fetchMroData();
		return () => { fetching = true; }

	}, [mroDakId]);
	
	
	useEffect(() => {
		let fetching = false;
		async function fetchUsrData() {
			if(!fetching)
			console.log(">>>>Usr Level is -----:" + usrLevel);
			await axios.get(`/licMaturityTransactions/userDesg`)
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
		console.log(">>>>>Demand List----:" + data+"=="+mroDakId);
		let i=0;
		var selectedList=[];
		var mrodak=null;
		for(i=0;i<data.length;i++){
			if(data[i].select!==null && data[i].select===true)
				selectedList.push(data[i]);
		}
		console.log(selectedList);
		
		if(selectedList.length===0){
			alert("No selection done.");
			return;
		}
		
		if(selectedList[0].mroDakId!=null && selectedList[0].mroDakId.length>0){
			
			
			mrodak=selectedList[0].mroDakId;
			setMroDakId(selectedList[0].mroDakId);
		}
		console.log(mrodak);
		console.log(mroDakId);
		
		if(mrodak===null && (mroDakId===null || (mroDakId!==null && mroDakId.length===0))){
			alert("Please update MRO Dak Id");
			return;
		}
		 
		
		let proceed=window.confirm("You are about to approve file containing "+selectedList.length+" records.");
		if(!proceed)
			return;
		if(disabled)
			return;
			
			setDisabled(true);
		if(mrodak!==null){
			await axios.put(`/licMaturityTransactions/bulkSubmitMaturity/${mrodak}`, selectedList)
			.then((response) => {
				setDisabled(false);
			setMesg(response.data);
			//	setFundList([]);
			setData([]);
				
				 
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
		}else if(mroDakId!==null){
		await axios.put(`/licMaturityTransactions/bulkSubmitMaturity/${mroDakId}`, selectedList)
			.then((response) => {
				setDisabled(false);
			setMesg(response.data);
			//	setFundList([]);
			setData([]);
				
				 
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
	}
	
	async function approveBulk() {
		//console.log(">>>>>Demand List----:" + data);
		if(disabled)
			return;
			
			setDisabled(true);
		await axios.put(`/licMaturityTransactions/bulkApproveMaturity`, data)
			.then((response) => {
				setMesg(response.data);
				console.log("reponse status--------------"+response.status);
			//	setFundList([]);
			 setData([]);
			 setDisabled(false);
				 
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
			Header:  <input type="checkbox" onChange={updateCheckBoxAll}/>,
				accessor : "select",	
			Cell: ({ row }) => (
				<div>
					 
					<input type="checkbox" onChange={handleCheckBox(row.index)} checked={data[row.index]['select']}  />
						 
					 
				</div>
				
			)
			 
		},
		
		
		 
		{
			Header: "Dak",
			accessor: 'dak.dakidNo',// Change this
		},
		{
			Header: "MRO Dak",
			accessor: 'mroDakId',// Change this
		},
		{
			Header: "Cdao No",
			accessor: 'cdaoNo',
				Cell: ({ row }) => (
				<div>
					 {row.original.employee!=null &&
					 
					 <label> {row.original.employee.officerName}{':'}{row.original.employee.cdaoNo}{row.original.employee.checkDigit}</label>
					 
					}
					{row.original.employee!=null && row.original.employee.rank!=null &&
					<label>{row.original.employee.rank.rankName}</label>
					}
					
					 
				</div>
			)
		},
		
	 {
			Header: "Upload File",
			accessor: 'uploadFileName',
		},
		{
			Header: "Policy No",
			accessor: 'policyNo',
		},
		
		{
			Header: "Maturity Amount",
			accessor: 'maturityAmount',
		},
		{
			Header: "Date of Commencement",
			accessor: 'dateOfCommencementPolicy',
		}, 
		
		 {
			Header: "Demand Intimation Memo",
			accessor: 'demandIntimationNo',
		}, 
		 
		
		{
			Header: "Month Ending",
			accessor: 'monthEnding',// Change this
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
   	const createMaturityReport = () => {
		console.log("--mro dak id---:" + dakIdNo);
	if((dakIdNo!==null && dakIdNo.length===0) || dakIdNo===null){
			alert("No DakId No given ");
			return;
		}
		
		if(!dakIdNo.startsWith("R")){
			alert("Dakid No is incorrect ");
			return;
		}
		
	if(disabled)
		return;
		
		setDisabled(true);
		 
		axios.put(`/licMaturityTransactions/generateMaturityReport/${dakIdNo}`, data)
		.then((response) => {
			 //const url = window.open(`${process.env.REACT_APP_BASE_URL}/files/${response.data}`);
			 		 
			setMesg(response.data);
			 
		});
	}

	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
					<h1 className="text-xl font-semibold">Lic Maturity Transactions</h1>
					<div className="text-red-500">{mesg}</div>
					<div className="flexContainer">
					
					<input type="text" name="batch" placeholder="file name"
						onChange={e => setBatch(e.target.value)}
							 
							className="pl-2 -ml-2 inputField flex-initial" />
							
						<input type="text" name="cdaoNo" placeholder="Cdao No"
						onChange={e => setCdaoNo(e.target.value)}
						className="pl-2 -ml-2 inputField flex-initial" />
						
						<input type="text" name="matType" placeholder="Maturity Type"
						onChange={e => setMatType(e.target.value)}
						className="pl-2 -ml-2 inputField flex-initial" />
						
						<input type="text" name="dakidNo" placeholder="DakId No"
						onChange={e => setDakIdNo(e.target.value)}
						className="pl-2 -ml-2 inputField flex-initial" />
							 
						<div>	
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
						</div>
					  <div>
						<button type="submit" onClick={createMaturityReport} className="w-26 m-0 p-0">Generate Maturity Report</button>
						 </div>
					</div>	
					
						 
						 	
					<div className="-mt-2 max-h-1 py-0 ml-0">
				 
					<TablePage columns={columns} data={data} newpage={page} parentCallback={handleP}  newPageSize={pageSize}
              parentCallbackPageSize={handlePageSize}className="table-auto" />
              <div>
              <input type="text" name="mroDakId" placeholder="update MRO DakId"
						onBlur={e => setMroDakId(e.target.value)} className="pl-2 -ml-2 inputField flex-initial" />
              </div>
				 <div>
				 {((usrLevel===30 || usrLevel <30) && mroDakId!==null) &&
						<button type="button" onClick={submitBulk} disabled={disabled} className="w-36 m-2 p-0"> 
						{disabled && (
						<span className="spinner-grow spinner-grow-sm"></span>
					)
						
					} Submit Selected Records</button>
						}
						
				{(usrLevel>30) &&
						<button type="button" onClick={approveBulk} disabled={disabled} className="w-36 m-2 p-0"> 
						{disabled && (
						<span className="spinner-grow spinner-grow-sm"></span>
					)
						
					} Approve Selected Records</button>
						}
						
						</div>
				 
				</div>		
				</div>
				 
			</main>
		</div>
	);
}

export default withRouter(LicMaturityTransactionList);

