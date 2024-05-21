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
import { withRouter, Link } from "react-router-dom";

function SpecimenSignatureApprovedList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');

	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if(!fetching)
			await axios.get('/specimenSignatures/approved/viewAll?search='+search)
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

	 
	 


	const columns = useMemo(() => [
		
		{
			Header: "Unit",
			accessor: 'unit.unitCode',// Change this
		},
		{
			Header: "Sus No",
			accessor: 'susNo',
		},
		
		
		{
			Header: "Signatory Code",
			accessor: 'signatoryCode',
		},
		
		{
			Header: "Signatory Name",
			accessor: 'signatoryName',
		},
		
		{
			Header: "Signatory Designation",
			accessor: 'signatoryDesignation',
		},
		
		{
			Header: "Authority Letter No",
			accessor: 'authorityLetterNo',
		},
		
		{
			Header: "Authority Letter Date",
			accessor: 'authorityLetterDate',
		},
		
		{
			Header: "From Date",
			accessor: 'fromDate',
		},
		
		{
			Header: "To Date",
			accessor: 'toDate',
		},
		{
			Header: "Finger Print",
			accessor: 'fingerPrint',
		},
		
		{
			Header: "Ss File Name",
			accessor: 'ssFileName',
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
			Header: "Record Status",
			accessor: 'recordStatus',
		},
		
		 
		
		{
			Header: "Approved",
			accessor: 'approved',
			Cell: ({ row }) => (
				 
				 <div>
				{row.original.approved!=null &&
				row.original.approved === true ? 'true' : 'false'}
				 </div>
				 
				 
				)
		},
		
		 
		
		
		
		{
			Header: "Remarks",
			accessor: 'remarks',
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
					<h1 className="text-xl font-semibold">Specimen Signatures</h1>
					<div className="flexContainer">
						<input type="text" name="search"  placeHolder="susNo or signatoryCode"
						onChange={e => setInputText(e.target.value)}
							onKeyPress={handleKeyPress}
							className="pl-2 -ml-2 inputField flex-initial" />
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
						
						
						<div>
							<Link to={"/specimenSignatures"}>
								<button className=" w-48 ml-8 p-0 h-6 -mt-2" > Pending List </button>
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

export default withRouter(SpecimenSignatureApprovedList);

