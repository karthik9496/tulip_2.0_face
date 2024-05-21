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


function QstApprovedList() {

	const [data, setData] = useState([]);
	 
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	const [page, setPage] = useState(0);
	//	const [pageSize, setPageSize] = useState(0);
	const [usrLevel, setUsrLevel] = useState(0);
	const [mesg, setMesg] = useState('');
	//const [approved, setApproved] = useState(true);
	const [rentBillType, setRentBillType] = useState('');
	 
	const [iors, setIors] = useState('');
	const [validate, setValidate] = useState(false);
	const [optionType, setOptionType] = useState('');
	 
	let history = useHistory();
	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if (!fetching)
				console.log(optionType);
			await axios.get('/qstTrans/approvedList/qst?search=' + search)

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

	}, [search]);

 
	 
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
        accessor: "elecAmount",
        Filter: SelectColumnFilter,
        filter: "elecAmount",
        
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
        accessor: "powerAmount",
        Filter: SelectColumnFilter,
        filter: "powerAmount",
        
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
        accessor: "waterAmount",
        Filter: SelectColumnFilter,
        filter: "waterAmount",
        sortable:true,
        
        
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
        Filter: SelectColumnFilter,
        filter: "totalAmount",
        
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
			Filter: SelectColumnFilter,
        	filter: "recordStatus",
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
	const handleP = (pp) => {
		console.log(pp);
		setPage(pp);
	}
	const handlePageSize = (pp) => {
		console.log(pp);
		//   setPageSize(pp);
	};
 
	const returnToList =() => {
		history.push("/qstTrans");
	}

	const handleOccVacChange = (e) => {
		console.log(e.target.value);
		setOptionType(e.target.value);

	};
	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
					<h1 className="text-xl font-semibold">Quarter Statistics Transactions-Approved(IOR)</h1>
					 
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

export default withRouter(QstApprovedList);

