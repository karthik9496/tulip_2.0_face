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
import { withRouter, Link ,useHistory} from "react-router-dom";
import TablePageAdj from '../utils/TablePageAdj';
 

function RbsManualEntryList() {

	let history=useHistory();
	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	 const [page,setPage]=useState(0);
	  const [pageSize, setPageSize] = useState(0);
	  const[usrLevel,setUsrLevel]=useState(0);
	  const[mesg,setMesg]=useState('');
	  const[approved,setApproved]=useState(false);
	  const[rentBillType,setRentBillType]=useState('');
	  const [disabled,setDisabled]=useState(false);
	  const [validRec,setValidRec]=useState('');
	  const [invalidRec,setInvalidRec]=useState('');
	   const[iors,setIors]=useState('');
	   const [submitted,setSubmitted]=useState(false);
	const [showCrList,setShowCrList]=useState(false);
	const [crData,setCrData]=useState([]);
	const [showDrList,setShowDrList]=useState(false);
	const [drData,setDrData]=useState([]);
	const [updateRent,setUpdateRent]=useState(false);
	
	const [lfee,setLfee]=useState(0);
	const [power,setPower]=useState(0);
	const [water,setWater]=useState(0);
	const [light,setLight]=useState(0);
	
	const [lightTheme, setLightTheme] = useState(true);


	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if(!fetching)
			 
			await axios.get('/rbsTrans/manualEntryList/rbs?search='+search+'&lfee='+lfee+'&power='+power+'&water='+water+'&light='+light)
		 
			 
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

	}, [update, search, lfee,water,power,light]);
	
	 
	useEffect(() => {
		let fetching = false;
		async function fetchUsrData() {
			if(!fetching)
			console.log(">>>>Usr Level is -----:" + usrLevel);
			await axios.get(`/rbsTrans/userDesg`)
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
 
	  async function updateRentMaster() {
	 
		let proceed = window.confirm("You are about to Update Rent Master.");
		if (!proceed)
			return;

		if (disabled)
			return;

		setDisabled(true);
		await axios.put('/rbsTrans/rentMaster/updation')
			.then((response) => {
				setMesg(response.data);
				setUpdateRent(true);
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
	
	async function submitBulk() {
		 
		
		let proceed=window.confirm("You are about to process file containing "+data.length+" records.");
		if(!proceed)
			return;
		
		if(disabled)
			return;
			
			setDisabled(true);
		await axios.put(`/rbsTrans/bulkSubmitSrb`, data)
			.then((response) => {
				
				setMesg(response.data[0]);
				if(response.data[1]!==null){
				setData(response.data[1]);
				}
				setDisabled(false);
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
	
	async function rollBack(id) {
		await axios.put(`/rbsTrans/rollBack/${id}`)
			.then((response) => {
				console.log(data);
				setMesg(response.data);
				let updatedRecords = [...data].filter((i) => i.id !== id);
				//console.log(updatedRecords);
				setData(updatedRecords);
				 
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
		 
		let proceed=window.confirm("You are about to approve file containing "+data.length+" records.");
		if(!proceed)
			return;
		
		if(disabled)
			return;
			
			setDisabled(true);
		await axios.put(`/rbsTrans/bulkApproveSrb`, data)
			.then((response) => {
				setValidRec(response.data[1]);
				setInvalidRec(response.data[2]);
				setApproved(true);
				setDisabled(false);
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
	async function approve(id) {
	if (disabled)
			return;

		setDisabled(true);	
			await axios.put(`/rbsTrans/approveRbs/${id}`)
			.then((response) => {
				setMesg(response.data);
				let updatedRecords = [...data].filter((i) => i.id !== id);
				console.log(updatedRecords);
				setData(updatedRecords);
				setDisabled(false);
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
	
	async function submit(id) {
	if (disabled)
			return;

		setDisabled(true);	
			await axios.put(`/rbsTrans/submitRbs/${id}`)
			.then((response) => {
				setMesg(response.data);
				setDisabled(false);
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
				<div>
				{console.log("usrlevek:"+  usrLevel)}
					{(usrLevel<30 && (row.original.transactionType!==null && row.original.transactionType==='S')) &&
						<Link to={"/rbsTrans/reject/" + row.original.id}>
							<button className=" w-16 m-0 p-0 " > Reject </button>
						</Link>
					}
				</div>
				<div>
				 
					{(usrLevel<30 && (row.original.transactionType!==null && row.original.transactionType==='M')
					&& row.original.recordStatus!=='V' && row.original.auditorDate===null) &&
						<Link to={"/rbsTrans/" + row.original.id}>
							<button className=" w-16 m-0 p-0 " > Edit </button>
						</Link>
					}
				</div>
				 
				<div>
				
					{(usrLevel===30 && row.original.recordStatus==='R') &&
						<Link to={"/rbsTrans/reject/" + row.original.id}>
							<button className=" w-24 m-0 p-0 " > Reject-Edit </button>
						</Link>
					}
				</div>
				<div>
				
					{(usrLevel>30 && row.original.recordStatus==='R') &&
						<Link to={"/rbsTrans/reject/" + row.original.id}>
							<button className=" w-24 m-0 p-0 " > Reject-Edit </button>
						</Link>
					}
				</div>			
				<div>
				
					{usrLevel>=30 && row.original.recordStatus==='V' &&
						<button
						className="w-18 m-0 p-0 bg-gray-500 hover:bg-gray-700 "
						onClick={() => rollBack(row.original.id)}
					>	Roll Back 	</button>
					}
					
				</div>
				<div>
				{ usrLevel>=30 && row.original.recordStatus==='V' 
					  && row.original.manuallyChecked===true && (row.original.transactionType!==null &&
					  row.original.transactionType==='S') &&
						<label
						className="w-28 m-0 p-0 bg-red-500 hover:bg-red-700 "
						 >	Original Status-I 	</label>
					}
				
				</div>	 
				
				<div>
				{ usrLevel===30 && row.original.recordStatus==='V' && (row.original.action!==null && row.original.action==='submission')
					  && (row.original.transactionType!==null &&
					  row.original.transactionType==='M') &&
						
						<button
						className="w-18 m-0 p-0 bg-red-500 hover:bg-red-700 "
						onClick={() => submit(row.original.id)}
					>	Submit 	</button>	 
					}
				
				</div>	 
				<div>
				{ usrLevel>30 && row.original.recordStatus==='V' 
				&& (row.original.action!==null && row.original.action==='approval')
					  && (row.original.transactionType!==null &&
					  row.original.transactionType==='M') &&
						<button
						className="w-18 m-0 p-0 bg-red-500 hover:bg-red-700 "
						onClick={() => approve(row.original.id)}
					>	Approve 	</button>
					}
				
				</div>	
				 
			  
					 
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
            {row.original.employee &&
              <label>Officer Name : {row.original.employee.officerName}</label>
              }
            </div>
            <div>
            {row.original.employee &&
              <label>Rank : {row.original.employee.rank.rankName}</label>
              }
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
             
          </div>
        ),
      },
 
 
		 
		{
			Header: "Occupation Date",
			accessor: 'occupationDate' ,
			 Cell: ({ row }) => (
			 <div>
              <label>{row.original.occupationDate}</label>
            </div>
            ),
		},
		
		{
			Header: "Vacation Date",
			accessor: 'vacationDate',
			Cell: ({ row }) => (
			 <div>
              <label>{row.original.vacationDate}</label>
            </div>
            ),
		},
		
		 {
        Header: "Rent Bill Details",
        accessor: "rentBillNo",
        
        Cell: ({ row }) => (
          <div>
            <div>
              <label>Reference Bill No : {row.original.referenceBillNo}</label>
            </div>
            <div>
              <label>Reference Bill Date : {row.original.referenceBillDate}</label>
            </div>
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
        Header: "Licence Fee Details",
        accessor: "lfeeAmount",
        Filter: SelectColumnFilter,
        filter: "lfeeAmount",
        
        Cell: ({ row }) => (
          <div>
            <div>
              <label>Lf From Date : {row.original.lfeeFromDate}</label>
            </div>
            <div>
              <label>Lf To Date : {row.original.lfeeToDate}</label>
            </div>
            <div>
              <label>Lf Amount : {row.original.lfeeAmount}</label>
            </div>
          </div>
        ),
      },
		{
        Header: "Furniture Details",
        accessor: "furAmount",
        Filter: SelectColumnFilter,
        filter: "furAmount",
        
        Cell: ({ row }) => (
          <div>
            <div>
              <label>Fur From Date : {row.original.furFromDate}</label>
            </div>
            <div>
              <label>Fur To Date : {row.original.furToDate}</label>
            </div>
            <div>
              <label>Fur Amount : {row.original.furAmount}</label>
            </div>
            <div>
              <label>Excess Fur From Date : {row.original.excessFurFromDate}</label>
            </div>
            <div>
              <label>Excess Fur To Date : {row.original.excessFurToDate}</label>
            </div>
            <div>
              <label>Excess Fur Amount : {row.original.excessFurAmount}</label>
            </div>
          </div>
        ),
      },
      
      
      
      {
        Header: "Power Details",
        accessor: "powerAmount",
         Filter: SelectColumnFilter,
        filter: "powerAmount",
          
        
        Cell: ({ row }) => (
          <div>
             
            <div>
              <label>Power Amount : {row.original.powerAmount}</label>
            </div>
          </div>
        ),
      },
       {
        Header: "Water Details",
        accessor: "waterAmount",
         Filter: SelectColumnFilter,
        filter: "waterAmount",
          
        
        Cell: ({ row }) => (
          <div>
            <div>
              <label>Water Amount : {row.original.waterAmount}</label>
            </div>
            
          </div>
        ),
      },
       {
        Header: "Electricity Details",
        accessor: "lightAmount",
         Filter: SelectColumnFilter,
        filter: "lightAmount",
          
        
        Cell: ({ row }) => (
          <div>
             
            <div>
              <label>Light Amount : {row.original.lightAmount}</label>
            </div>
           
             
          </div>
        ),
      },
      
       {
        Header: "Servant Details",
        accessor: "servantQrAmount",
         Filter: SelectColumnFilter,
        filter: "servantQrAmount",
        
        Cell: ({ row }) => (
          <div>
            <div>
              <label>Servant Amount : {row.original.servantQrAmount}</label>
            </div>
            <div>
              <label>Garage Amount : {row.original.garageAmount}</label>
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
			 Filter: SelectColumnFilter,
        filter: "recordStatus",
		},
		
		{
			Header: "Manually Checked",
			accessor: 'mc',
			Filter: SelectColumnFilter,
            filter: "mc",
             
            Cell: ({ row }) => (
				<div>

					{data[row.index]['mc'] === true ? 'Y' : 'N'}
				</div>
			)
		},
		
		
		{
			Header: "Rejection Reason",
			accessor: 'rejectionReason',
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
    
    const handleCrList=(event)=>{
		 
		setShowCrList(true);
		 
	}
	const handleDrList=(event)=>{
		 
		setShowDrList(true);
		 
	}
	function refresh(){ 
    window.location.reload(); 
}

 const returnToList = () => {
    history.push("/rbsTrans");
  };
	 
	return (
				<div className={lightTheme ? 'theme-light' : 'theme-dark'} style={disabled ?{pointerEvents: "none",opacity :"0.4"}:{}}>
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
					<h1 className="text-xl font-semibold">Single Rent Bill Transactions(SRB)</h1>
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
							className="w-32 m-2 p-1 float-left..."/>
							</div>
							 
							 
						 
						 
							<br/>
							 <div>
						<button type="submit" onClick={handleSubmit} className="w-32 m-2 p-1 float-left...">Search</button>
						 
					 </div>
					 
						 <div>
							
						<button type="button" onClick={refresh}  className="w-20 m-0 p-0 -mt-2 bg-red-500 hover:bg-red-700 ">
				 						Refresh</button>
							
						</div>
						
						<div className="px-4">
              <button type="submit" onClick={returnToList}>
                Return
              </button>
            </div>
						 
					 
					 
					 
					</div>
					 
					 
						 
								
					<div className="-mt-2 max-h-1 py-0 ml-0">
				 
					<TablePageAdj columns={columns} data={data} newpage={page} parentCallback={handleP}  newPageSize={pageSize}
              parentCallbackPageSize={handlePageSize}className="table-auto" />
		 
				 
				</div>		
				</div>
				 
			</main>
		</div>
		</div>
	);
}

export default withRouter(RbsManualEntryList);

