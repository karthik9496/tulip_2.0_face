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
 

function RbsDrrRejectedList() {

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
	   const [submitted,setSubmitted]=useState(false);
	const [showCrList,setShowCrList]=useState(false);
	const [crData,setCrData]=useState([]);
	const [showDrList,setShowDrList]=useState(false);
	const [drData,setDrData]=useState([]);

	let history = useHistory();
	
	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if(!fetching)
			 
			await axios.get('/rbsTrans/rejectedList/drr?search='+search)
			 
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
 
	 
	 
	const columns = useMemo(() => [
	
	 
		
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
        Header: "Drr Rent Details",
        accessor: "buildingNo",
        
        Cell: ({ row }) => (
          <div>
             
            <div>
              <label>Building No : {row.original.buildingNo}</label>
            </div>
             <div>
              <label>Qtr Area : {row.original.quarterArea}</label>
            </div>
            <div>
              <label>Drr From Date : {row.original.drrFromDate}</label>
            </div>
           <div>
              <label>Drr To Date : {row.original.drrToDate}</label>
            </div>  
             <div>
              <label>Drr Rate : {row.original.drrRate}</label>
            </div>  
          </div>
        ),
      },
 
  
		
		 {
        Header: "Drr Amount",
        accessor: "drrRent",
        
        Cell: ({ row }) => (
          <div>
            <div>
              <label>Drr Rent : {row.original.drrRent}</label>
            </div>
            <div>
              <label>Drr Servant & Garage: {row.original.drrServantGarage}</label>
            </div>
            
          </div>
        ),
      },
      
      
		{
			Header: "Drr Approved Amount",
			accessor: 'drrAmount',
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
    
    const returnToList =() => {
		history.push("/rbsTrans");
	}
	 
	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
					<h1 className="text-xl font-semibold">Damage Rent Rejected Transactions(DRR)</h1>
					 
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
							<button type="button" onClick={returnToList} className="w-16 m-0 p-0">Return</button>

						</div>
 

					</div>
					 
					</div>
					<div className="-mt-2 max-h-1 py-0">
					<Table columns={columns} data={data} className="table-auto" />
				</div>

			</main>
		</div>
	);
}

export default withRouter(RbsDrrRejectedList);

