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
import { withRouter, Link,useHistory } from "react-router-dom";
import TablePageAdj from '../utils/TablePageAdj';
 

function RbsApprovedList() {

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
			 
			await axios.get('/rbsTrans/approvedList/rbs?search='+search)
			 
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
        Header: "Fan Details",
        accessor: "fanAmount",
        Filter: SelectColumnFilter,
        filter: "fanAmount",
        
        Cell: ({ row }) => (
          <div>
            <div>
              <label>Fan From Date : {row.original.fanFromDate}</label>
            </div>
            <div>
              <label>Fan To Date : {row.original.fanToDate}</label>
            </div>
            <div>
              <label>Fan Amount : {row.original.fanAmount}</label>
            </div>
          </div>
        ),
      },
      
       {
        Header: "Fridge Details",
        accessor: "fridgeAmount",
        Filter: SelectColumnFilter,
        filter: "fridgeAmount",
        
        Cell: ({ row }) => (
          <div>
            <div>
              <label>Fridge From Date : {row.original.fridgeFromDate}</label>
            </div>
            <div>
              <label>Fridge To Date : {row.original.fridgeToDate}</label>
            </div>
            <div>
              <label>Fridge Amount : {row.original.fridgeAmount}</label>
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
        Header: "Light Details",
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
			accessor: 'manuallyChecked',
			Filter: SelectColumnFilter,
            filter: "manuallyChecked",
             
            Cell: ({ row }) => (
				<div>

					{data[row.index]['manuallyChecked'] === true ? 'true' : 'false'}
				</div>
			)
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
    const returnToList =() => {
		history.push("/rbsTrans");
	}
    
	 
	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
					<h1 className="text-xl font-semibold">Single Rent Bill Approved Transactions(SRB)</h1>
					 
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

export default withRouter(RbsApprovedList);

