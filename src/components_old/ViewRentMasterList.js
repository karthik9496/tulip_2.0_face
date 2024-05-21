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
import { format } from 'date-fns'
import { withRouter, Link } from "react-router-dom";
import TablePageAdj from '../utils/TablePageAdj';


function ViewRentMasterList() {

	const [data, setData] = useState([]);
	const [crData, setCrData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	const [page, setPage] = useState(0);
	//	const [pageSize, setPageSize] = useState(0);
	const [usrLevel, setUsrLevel] = useState(0);
	const [mesg, setMesg] = useState('');
	const [cdaoNo,setCdaoNo]=useState('');
	const [rentType,setRentType]=useState('');
	const [crDr,setCrDr]=useState('');
	const [adjMe,setAdjMe]=useState('');
	 
	 

	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if (!fetching)
			console.log("----rent----:" + cdaoNo);	 
			await axios.get("/rents?cdaoNo=" +cdaoNo)

				.then((response) => {
					console.log(response.data);
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

	}, [update, cdaoNo]);


 
 
 
	 
	const columns = useMemo(() => [

 	{
			Header: "Adjusted Me",
			accessor: "monthEnding",

			 
		},


		{
			Header: "Officer Details",
			accessor: "cdaoNo",

			 
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
						{row.original.employee &&
							<label>Rank : {row.original.employee.rank.rankName}</label>
						}
					</div>
				</div>
			),
		},



		{
			Header: "Debit Credit",
			accessor: 'debitCredit',
			 
		},

		{
			Header: "Rent Type",
			accessor: 'rentType',
			 
			 
		},

		{
			Header: "Rent Bill Details",
			accessor: "billNo",

			Cell: ({ row }) => (
				<div>
					 
					<div>
						<label>Rent Bill No : {row.original.billNo}</label>
					</div>
					<div>
						<label>Rent Bill Date : {row.original.billDate}</label>
					</div>
				</div>
			),
		},

		{
			Header: "Licence Fee Details",
			accessor: "lfeeFromDate",

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
			accessor: "furFromDate",

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
					 
					 
				</div>
			),
		},

		{
			Header: "Fan Details",
			accessor: "fanFromDate",

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
			accessor: "fridgeFromDate",

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
						<label>Elec Amount : {row.original.elecAmount}</label>
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
						<label>Water Amount : {row.original.waterAmount}</label>
					</div>
				</div>
			),
		},

		{
			Header: "Power Details",
			accessor: "powerAmount",

			Cell: ({ row }) => (
				<div>
					<div>
						<label>Water Amount : {row.original.waterAmount}</label>
					</div>
					<div>
						<label>Light Amount : {row.original.lightAmount}</label>
					</div>
					<div>
						<label>Power Amount : {row.original.powerAmount}</label>
					</div>
				</div>
			),
		},

		{
			Header: "Servant Details",
			accessor: "servantQrAmount",

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
			Header: "Rejection Reason",
			accessor: 'rejectionReason',
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
	//	event.preventDefault();
		console.log(inputText);
		setCdaoNo(inputText);

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

	 
  
	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
					<h1 className="text-xl font-semibold">View Rent Master List</h1>
 								<div className="flexContainer">
					 <div>
              <input
                type="text"
                name="search"
                onBlur={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="cdao no"
                className="pl-2 -ml-2 inputField flex-initial"
              />
            </div>
            
             
							
							 
							
						 
							
							
							 
							
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
						 
					</div>
 						
 						
 						
 						
				</div>
				<div className="-mt-2 max-h-1 py-0">
					<Table columns={columns} data={data} className="table-auto" />
				</div>
			</main>
		</div>
	);
}

export default withRouter(ViewRentMasterList);

