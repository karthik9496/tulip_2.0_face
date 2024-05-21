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
import { format } from 'date-fns'


function StopIorList() {

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
	 
	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if (!fetching)
				console.log(cdaoNo);
			await axios.get('/occupationVacations/stopIor/approved?cdaoNo=' + cdaoNo)
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

	}, [update, cdaoNo]);


	 
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
						{row.original.employee &&
							<label>Rank : {row.original.employee.rank.rankName}</label>
						}
					</div>
				</div>
			),
		},



		{
			Header: "Stop Ior Date",
			accessor: 'stopIorDate',
			Cell: ({ row }) => (
			<div>
				  <div>
				  {row.original.stopIorDate && <>
				      <label>{format(new Date(row.original.stopIorDate.toString()),'dd/MM/yyyy')}</label>
				      </>
				      }
				  </div>				   
				</div>
			
			 )
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
					<h1 className="text-xl font-semibold">Stop Ior Approved List</h1>
					<div className="text-red-500">{mesg}</div>
					 
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

						 
						<div>
							<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>

						</div>


						 
						 

					</div>
					 
					 
					<div className="-mt-2 max-h-1 py-0 ml-0">

						<TablePageAdj columns={columns} data={data} newpage={page} parentCallback={handleP}
							parentCallbackPageSize={handlePageSize} className="table-auto" />
						 
					</div>
				</div>

			</main>
		</div>
	);
}

export default withRouter(StopIorList);

