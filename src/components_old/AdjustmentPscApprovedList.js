/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 18 April 2022
 *
 * Modified By : 
 */

import { useState, useEffect, useMemo } from 'react';
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { format } from 'date-fns'
import { withRouter, Link } from "react-router-dom";

function AdjustmentPscApprovedList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	const [selectionType,setSelectionType]=useState('');
	const [qe,setQe]=useState('');
	

	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			console.log(qe);
			if(!fetching)
			await axios.get('/adjustments/psc/approved?search='+search)
				.then((response) => {
					setData(response.data);
					setSelectionType('approved');
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

      
 
	const columns = useMemo(() => [				
		{
			Header: "Cdao No",
			accessor: 'cdaoNo',
			Cell: ({ row }) => (
				 
				  <div>
				   {row.original.cdaoNo}{row.original.checkDigit}<br/>
				    {row.original.employee.officerName}
				    {row.original.employee.substantiveRank && <>
				    {'/'}
				    {row.original.employee.substantiveRank.rankName}
				    </>
				    }
				  </div>				   
				 
			)
		},
		
		{
			Header: "DakId No",
			accessor: 'dak.dakidNo',
		},
		
		{
			Header: "Adj Cb",
			accessor: 'adjCb',
		},
		
		{
			Header: "Unit/Task",
			accessor: 'unit.unitCode',// Change this
			Cell: ({ row }) => (
				<div>
				  <div>
				    {row.original.unit.unitCode}/{row.original.unit.task_1}
				  </div>				   
				</div>
				
			)
		},
		
		{
			Header: "Pay Code",
			accessor: 'payCode.payCode',// Change this
		},		
		
		  {
        Header: "Charged Expenditure",
        accessor: "chargedExpenditure",
        Cell: ({ row }) => (
          <div>{data[row.index]["chargedExpenditure"] === true ? "Y" : "N"}</div>
        ),
      },		
		
		{
			Header: "From Date",
			accessor:'fromDate',	
			Cell: ({ row }) => (
				 
				  <div>
					{format(new Date(row.original.fromDate.toString()),'dd/MM/yyyy')}	
				</div>				   
				 
				
			)
		},
		
		{
			Header: "To Date",
			accessor: 'toDate',
			Cell: ({ row }) => (
				 
				  <div>
				  {row.original.toDate && <>
				     {format(new Date(row.original.toDate.toString()),'dd/MM/yyyy')}
				     </>
				     }
				  </div>				   
				 
			)
			
		},
		
		{
			Header: "Approval Amount",
			accessor: 'amount',
		},
		
		{
			Header: "Record Status",
			accessor: 'recordStatus',
		},
		
		{
			Header: "Approved",
			accessor: 'approved',
			Cell: ({ row }) => (
				<div>
				  <div>
				    <label>{row.original.approved.toString()}</label>
				  </div>				   
				</div>
			)
		},
		
		{
			Header: "It Adjustment",
			accessor: 'itAdjustment',
			Cell: ({ row }) => (
				<div>
				  <div>
				    <label>{row.original.itAdjustment.toString()}</label>
				  </div>				   
				</div>
			)
				
		},
		
		{
			Header: "Month Ending",
			accessor: 'monthEnding',
		},		
		
		 	
		
		{
			Header: "Rejection Reason",
			accessor: 'rejectionReason',
		},		
		
		{
			Header: "Remarks",
			accessor: 'remarks',
		},			
		
		{
			Header: "Sys/Man",
			accessor: 'transcriptionType',
		},
			 
		{
			Header: "Aud",
			accessor: 'auditorDate',
			Cell: ({ row }) => (
				 
				  <div>
				  {row.original.auditor && <>
				    {row.original.auditor.name}<br/>{format(new Date(row.original.auditorDate.toString()),'dd/MM/yyyy')}
				    </>
				    }
				  </div>				   
				 
			)
		},		
		{
			Header: "AAO",
			accessor: 'aaoDate',
			Cell: ({ row }) => (
				 
				  <div>
				  {row.original.aao && <>
				    {row.original.aao.name}<br/>{format(new Date(row.original.aaoDate.toString()),'dd/MM/yyyy')}
				    </>
				    }
				  </div>				   
				 
			)
		},	
		
		{
			Header: "AO",
			accessor: 'aoDate',
			Cell: ({ row }) => (
				 
				  <div>
				  {row.original.ao && <>
				    {row.original.ao.name}<br/>{format(new Date(row.original.aoDate.toString()),'dd/MM/yyyy')}
				    </>
				    }
				  </div>				   
				 
			)
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
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
					<h1 className="text-xl font-semibold">Adjustment -- Psc--Approved</h1>
					<div className="flexContainer">
					<div>
						<input type="text" name="search" placeholder="Army no"
						onChange={e => setInputText(e.target.value)}
							onKeyPress={handleKeyPress}
							className="pl-2 -ml-2 inputField flex-initial" />
							</div>
							 
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
						<div>
							<Link to={"/adjustment/psc"}>
								<button className=" w-32 ml-8 p-0 h-6 -mt-2" > Pending </button>
							</Link>
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

export default withRouter(AdjustmentPscApprovedList);

