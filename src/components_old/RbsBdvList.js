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
import TablePageAdj from '../utils/TablePageAdj';
 

function RbsBdvList() {

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
	 const {state}=useLocation();

	let history=useHistory();
	
	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if(!fetching)
			 
			await axios.get('/rbsTrans/list/bdv?search='+search)
			 
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
 
	   
	
	async function submitAao(id) {
		 
		
		 
		
		if(disabled)
			return;
			
			setDisabled(true);
		await axios.put(`/rbsTrans/bdv/aaoSubmit/${id}`)
			.then((response) => {
				setDisabled(false);
				setMesg(response.data);
				 
			 
				 
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
	
	async function approveAo(id) {
		 
	 
		
		if(disabled)
			return;
			
			setDisabled(true);
		await axios.put(`/rbsTrans/bdv/aaoSubmit/${id}`)
			.then((response) => {
				 
					setMesg(response.data);
				 
			 
				 
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
	 
	 
	const columns = useMemo(() => [
				 
		 
		
		{
			Header: 'Action',
			Cell: ({ row }) => (
				<div>
				 
				 
					{(usrLevel<30 && row.original.action!=null && row.original.action.includes("edit"))  &&
						<Link to={"/rbsTrans/" + row.original.id}>
								<button className=" w-46 ml-8 p-0 h-6 -mt-2" > Edit </button>
							</Link>
					}
				 
			 {' '}
					{row.original.action!=null && !row.original.action.includes("appro") && !row.original.action.includes("edit") &&
					<button
						className="w-18 m-0 p-0 bg-gray-500 hover:bg-gray-700 "
						onClick={() => submitAao(row.original.id)}
					>	Submit 	</button>
					}
						
					{' '}
					{row.original.action!=null && row.original.action.includes("appro") &&
					<button
						className="w-20 m-0 p-0 bg-gray-500 hover:bg-gray-700 "
						onClick={() => approveAo(row.original.id)}
					>	Approve 	</button>
					}
					{''}
					
					{usrLevel>30 &&
					<button
						className="w-20 m-0 p-0 bg-red-500 hover:bg-red-700 "
						onClick={() => rollBack(row.original.id)}
					>	Roll Back 	</button>
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
        Header: "Barrack Damage Bill Details",
        accessor: "rentBillNo",
        
        Cell: ({ row }) => (
          <div>
            <div>
              <label>Voucher No : {row.original.rentBillNo}</label>
            </div>
            <div>
              <label>Voucher Date: {row.original.rentBillDate}</label>
            </div>
            
          </div>
        ),
      },
      
      
		{
			Header: "Stores Brief",
			accessor: 'storesBrief',
		},
		
		
		{
			Header: "Quantity",
			accessor: 'quantity',
		},
		
		{
			Header: "Rate",
			accessor: 'rate',
		},
		
		{
			Header: "Bso Barrack Damage Amount",
			accessor: 'bsoBdAmount',
		},
	  
	  	{
			Header: "Approved Barrack Damage Amount",
			accessor: 'approvedBdAmount',
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
	const handleReturn = (event) => {
		 
		history.push("/rbsTrans");
		 
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
					<h1 className="text-xl font-semibold">Barrack Damage Bill Transactions(BDV)</h1>
					<div className="text-red-500">{mesg}</div>
					 
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
						
						
							<Link to={"/rbsTrans/approvedList/bdv"}>
								<button className=" w-40 ml-8 p-0 h-6 -mt-2" > Approved Bdv </button>
							</Link>
						
						
						</div>
						<div>
						
						
							<Link to={"/rbsTrans/rejectedList/bdv"}>
								<button className=" w-40 ml-8 p-0 h-6 -mt-2" > Invalid/Rejected Bdv </button>
							</Link>
						
						
						</div>
						<div>
						
						
							 
								<button type="button" onClick={handleReturn}className=" w-40 ml-8 p-0 h-6 -mt-2" > Return </button>
							 
						
						
						</div>
						 
						 
					 
					 
					 
					</div>
					 
					 
						 
								
					<div className="-mt-2 max-h-1 py-0 ml-0">
				 
					<TablePageAdj columns={columns} data={data} newpage={page} parentCallback={handleP}  newPageSize={pageSize}
              parentCallbackPageSize={handlePageSize}className="table-auto" />
		 
				 
				</div>		
				</div>
				 
			</main>
		</div>
	);
}

export default withRouter(RbsBdvList);

