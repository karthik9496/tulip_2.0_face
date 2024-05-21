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
import TablePageAdj from '../utils/TablePageAdj';
 

function QuarterStatisticsTransactionList() {

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
	  const[rentBillType,setRentBillType]=useState('');
	  const [disabled,setDisabled]=useState(false);
	  const [validRec,setValidRec]=useState('');
	  const [invalidRec,setInvalidRec]=useState('');
	   const[iors,setIors]=useState('');
	const [qstList,setQstList]=useState(false);
	const [submitted,setSubmitted]=useState(false);
	const [showDrList,setShowDrList]=useState(false);
	const [drData,setDrData]=useState([]);


	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if(!fetching)
			console.log(rentBillType);
			await axios.get('/quarterStatisticsTransactions?search='+search)
			 
				.then((response) => {
					setData(response.data);
					if(response.data[0]['approved']===null || response.data[0]['approved']===false){
						setApproved('false');
					}
					console.log("---response--ior--:"+ response.data[0]['approved']);
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
		let fetching = false;
		async function fetchUsrData() {
			if(!fetching)
			console.log(">>>>Usr Level is -----:" + usrLevel);
			await axios.get(`/quarterStatisticsTransactions/userDesg`)
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
		 
		
		let proceed=window.confirm("You are about to process file containing "+data.length+" records.");
		if(!proceed)
			return;
		
		if(disabled)
			return;
			
			setDisabled(true);
		await axios.put(`/quarterStatisticsTransactions/bulkSubmitQst`, data)
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
	
	 
	
	async function approveBulk() {
	 
		
		let proceed=window.confirm("You are about to approve file containing "+data.length+" records.");
		if(!proceed)
			return;
		
		if(disabled)
			return;
			
			setDisabled(true);
		await axios.put(`/quarterStatisticsTransactions/bulkApproveQst`, data)
			.then((response) => {
				setValidRec(response.data[1]);
				setInvalidRec(response.data[2]);
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
	
	 const ShowIor = () => {
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
			Header: 'Action',
			Cell: ({ row }) => (
				<div>
					 {row.original.action!=null && row.original.action.includes("edit") &&
					<Link to={"/quarterStatisticsTransactions/" + row.original.id}>
						<button className=" w-16 m-0 p-0 " > Edit </button>
					</Link>
					}
					 
				</div>
			)
		},
		 
		
		 {
        Header: "Officer Details",
        accessor: "cdaoNo",
        
        Cell: ({ row }) => (
          <div>
            <div>
              <label>CdaO No : {row.original.cdaoNo} -- {row.original.checkDigit}</label>
            </div>
            <div>
              <label>Personal No : {row.original.personelNo}</label>
            </div>
            <div>
              <label>Officer Name : {row.original.employee.officerName}</label>
            </div>
            <div>
              <label>Rank : {row.original.employee.rank.rankName}</label>
            </div>
          </div>
        ),
      },
      
       {
        Header: "Rent Details",
        accessor: "uabsoCode",
        
        Cell: ({ row }) => (
          <div>
            <div>
              <label>Uabso Code : {row.original.uabsoCode}</label>
            </div>
            <div>
              <label>Building No : {row.original.buildingNo}</label>
            </div>
            <div>
              <label>Station : {row.original.station}</label>
            </div>
            <div>
              <label>Quarter Area : {row.original.quarterArea}</label>
            </div>
            <div>
              <label>Quarter Type : {row.original.quarterType}</label>
            </div>
          </div>
        ),
      },
 
  {
        Header: "Electricity Details",
        accessor: "elecFromDate",
        
        Cell: ({ row }) => (
          <div>
            <div>
              <label>Elec From Date : {row.original.elecFromDate}</label>
            </div>
            <div>
              <label>Elec To Date : {row.original.elecToDate}</label>
            </div>
             <div>
              <label>Elec Unit : {row.original.elecUnit}</label>
            </div>
            <div>
              <label>Elec Amount : {row.original.elecAmount}</label>
            </div>
            <div>
              <label>Elec Duty : {row.original.elecDuty}</label>
            </div>
          </div>
        ),
      },
		
		{
        Header: "Power Details",
        accessor: "powerFromDate",
        
        Cell: ({ row }) => (
          <div>
            <div>
              <label>Power From Date : {row.original.powerFromDate}</label>
            </div>
            <div>
              <label>Power To Date : {row.original.powerToDate}</label>
            </div>
             <div>
              <label>Power Unit : {row.original.powerUnit}</label>
            </div>
            <div>
              <label>Power Amount : {row.original.powerAmount}</label>
            </div>
            
          </div>
        ),
      },
      
      	{
        Header: "Water Details",
        accessor: "waterFromDate",
        
        Cell: ({ row }) => (
          <div>
            <div>
              <label>Water From Date : {row.original.waterFromDate}</label>
            </div>
            <div>
              <label>Water To Date : {row.original.waterToDate}</label>
            </div>
             <div>
              <label>Water Unit : {row.original.waterUnit}</label>
            </div>
            <div>
              <label>Water Amount : {row.original.waterAmount}</label>
            </div>
            
          </div>
        ),
      },
      
      	{
        Header: "Total Amount",
        accessor: "totalAmount",
        
        Cell: ({ row }) => (
          <div>
            <div>
              <label>{row.original.totalAmount}</label>
            </div>
            
            
          </div>
        ),
      },
		 {
        Header: "Rent Bill Details",
        accessor: "rentBillNo",
        
        Cell: ({ row }) => (
          <div>
             
            <div>
              <label>Rent Bill No : {row.original.rentBillNo}</label>
            </div>
            <div>
              <label>Rent Bill Date : {row.original.rentBillDate}</label>
            </div>
          </div>
        ),
      },
	 
	 
      
      {
			Header: "Upload File Name",
			accessor: 'uploadFileName',
			Cell: ({ row }) => (
			 <div>
              <label>{row.original.uploadFileName}</label>
            </div>
            ),
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
			Header: "Rejection Reason",
			accessor: 'rejectionReason',
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
	
	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			 
				<div className="mt-2 ml-4"> 					
					 		
					 
				 <div>
					<TablePageAdj columns={columns} data={data} newpage={page} parentCallback={handleP}  newPageSize={pageSize}
              parentCallbackPageSize={handlePageSize} className="table-auto" />
              </div>
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
	);
	
	}

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
    
    const handleDrList=(event)=>{
		 
		setShowDrList(true);
		 
	}
	 

	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
					<h1 className="text-xl font-semibold">Quarter Statistics Transactions(QST)</h1>
					<div className="text-red-500">{mesg}</div>
					{usrLevel>30 &&
					<>
					<div className="text-red-500">Total Valid Records:{validRec}</div>
					<div className="text-red-500">Total Invalid Records:{invalidRec}</div>
					</>
					}
					<div className="flexContainer">
					 
						<div>	
						<input type="text" name="search" placeholder="Cdao No"
						onBlur={e => setInputText(e.target.value)}							
							className="pl-2 -ml-2 inputField flex-initial" />
							</div>
							 <div>
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
						 </div>
						 <div>
					<Link to={"/quarterStatisticsTransactions/new"}>
								<button className=" w-40 ml-8 p-0 h-6 -mt-2" > Add Qst </button>
							</Link>
					</div>
					 </div>
					 <ShowIor/>	
				</div>
				 
			</main>
		</div>
	);
}

export default withRouter(QuarterStatisticsTransactionList);

