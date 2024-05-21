/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 03 April 2024
 *
 * Modified By : 
 */

import { useState, useEffect, useMemo } from 'react';
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { Link } from "react-router-dom";

function AllotmentDetailList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	const [allotmentYear, setAllotmentYear] = useState('');
	const [allotmentYearTemp, setAllotmentYearTemp] = useState('');
	const [codeHead, setCodeHead] = useState('');
	const [codeHeadTemp, setCodeHeadTemp] = useState('');
	const [unitCode, setUnitCode] = useState('');
	const [unitCodeTemp, setUnitCodeTemp] = useState('');
	const [projectCode, setProjectCode] = useState('');
	const [projectCodeTemp, setProjectCodeTemp] = useState('');
	const [unitName, setUnitName] = useState('');
	const [unitNameTemp, setUnitNameTemp] = useState('');
	const [referenceNo, setReferenceNo] = useState('');
	const [referenceNoTemp, setReferenceNoTemp] = useState('');
	const [recordStatus, setRecordStatus] = useState('');
	const [recordStatusTemp, setRecordStatusTemp] = useState('');
	const [dakId, setDakId] = useState('');
	const [dakIdTemp, setDakIdTemp] = useState('');
	 


	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if(!fetching)
			await axios.get('/allotmentDetails?search='+search+'&codeHead='+codeHead+'&referenceNo='+referenceNo+'&unitCode='+unitCode+'&allotmentYear='+
			allotmentYear+'&projectCode='+projectCode+'&unitName='+unitName+'&recordStatus='+recordStatus+'&dakId='+dakId)
				.then((response) => {
					console.log(response.data);
					setData(response.data);
					//setData(JSON.parse(response.data));
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

	}, [update, search, allotmentYear, codeHead, unitCode, unitName, projectCode, recordStatus, referenceNo, dakId]);


	async function remove(id) {
		await axios.delete(`/allotmentDetails/${id}`)
			.then(() => {
				//console.log(data);
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


	const columns = useMemo(() => [
		{
			Header: 'Action',
			Cell: ({ row }) => (
				<div>
					<Link to={"/allotmentDetails/" + row.original.id}>
						<button className=" w-16 m-0 p-0 "  style={{backgroundColor:"#2563eb"}} > Edit </button>
					</Link>
					{' '}
					<button
						className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
						onClick={() => remove(row.original.id)}
					>	Delete 	</button>
				</div>
			)
		},
		{
			Header: "Unit",
			accessor: 'unitName',// Change this
		},
		{
			Header: "Project Code",
			accessor: 'projectCode',
		},
		{
			Header: "Code Head",
			accessor: 'codeHead',
		},
		{
			Header: "Nature",
			accessor: 'nature',
		},

		{
			Header: "Major Head",
			accessor: 'majorHead',
		},
		
		{
			Header: "Minor Head",
			accessor: 'minorHead',
		},
		{
			Header: "Allotment Amount",
			accessor: 'allotmentAmount',
		},
		{
			Header: "Progressive Allotment",
			accessor: 'progressiveAllotment',
		},
		
		{
			Header: "Progressive Expenditure",
			accessor: 'progressiveExpenditure',
		},
		{
			Header: "Ca Amount Blocked",
			accessor: 'caAmountBlocked',
		},
		

		{
			Header: "Approved",
			//accessor: 'approved',
			accessor: ({ approved }) => (approved ? "True" : "")
		},
		{
			Header: "Gem Amount Blocked",
			accessor: 'gemAmountBlocked',
		},
				{
			Header: "Reason",
			accessor: 'reason',
		},
		{
			Header: "Reference No",
			accessor: 'referenceNo',
		},
		{
			Header: "Reference Date",
			accessor: 'referenceDate',
		},
		{
			Header: "Office Id",
			accessor: 'officeName',// Change this
		},

	], [data])

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(inputText);
		setSearch(inputText);
		setCodeHead(codeHeadTemp);
		setAllotmentYear(allotmentYearTemp);
		setUnitCode(unitCodeTemp);
		setProjectCode(projectCodeTemp);
		setUnitName(unitNameTemp);
		setReferenceNo(referenceNoTemp);
		setRecordStatus(recordStatusTemp);
		setDakId(dakIdTemp);

	}

	const handleKeyPress = (event) => {
		// look for the `Enter` keyCode
		if (event.keyCode === 13 || event.which === 13) {
			handleSubmit(event)
		}
	}

	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<h1 className="text-xl font-semibold" style={{marginTop:"20px"}}>Allotment Details</h1>
			
			<div className="flex flex-wrap items-center">
      <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
        <label htmlFor="allotmentYear" className="block text-gray-700 font-semibold">Allotment Year</label>
        <input
          type="text"
          id="allotmentYear"
          className="form-input w-full mt-1"
          //value={allotmentYear}
          onChange={(e) => setAllotmentYearTemp(e.target.value)}
          placeholder="yyyy-yyyy"
        />
      </div>
      <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
        <label htmlFor="codeHead" className="block text-gray-700 font-semibold">Code Head</label>
        <input
          type="text"
          id="codeHead"
          className="form-input w-full mt-1"
         // value={codeHead}
		  onChange={e => setCodeHeadTemp(e.target.value)}
          placeholder="Code Head"
        />

      </div>
      <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
        <label htmlFor="unitCode" className="block text-gray-700 font-semibold">Unit Code</label>
        <input
          type="text"
          id="unitCode"
          className="form-input w-full mt-1"
          //value={unitCode}
          onChange={(e) => setUnitCodeTemp(e.target.value)}
          placeholder="Unit Code"
        />
      </div>
      <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
        <label htmlFor="projectCode" className="block text-gray-700 font-semibold">Project Code</label>
        <input
          type="text"
          id="projectCode"
          className="form-input w-full mt-1"
          //value={projectCode}
          onChange={(e) => setProjectCodeTemp(e.target.value)}
          placeholder="Project Code"
        />
      </div>
      <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
        <label htmlFor="unitName" className="block text-gray-700 font-semibold">Unit Name</label>
        <input
          type="text"
          id="unitName"
          className="form-input w-full mt-1"
          //value={unitName}
          onChange={(e) => setUnitNameTemp(e.target.value)}
          placeholder="Unit Name"
        />
      </div>
      <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
        <label htmlFor="referenceNo" className="block text-gray-700 font-semibold">Reference No</label>
        <input
          type="text"
          id="referenceNo"
          className="form-input w-full mt-1"
          //value={referenceNo}
          onChange={(e) => setReferenceNoTemp(e.target.value)}
          placeholder="Reference No"
        />
      </div>

	  <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
        <label htmlFor="recordStatus" className="block text-gray-700 font-semibold">Record Status</label>
        <input
          type="text"
          id="recordStatus"
          className="form-input w-full mt-1"
          //value={dakId}
          onChange={(e) => setRecordStatusTemp(e.target.value)}
          placeholder="Record Status"
        />
      </div>
      <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
        <label htmlFor="dakId" className="block text-gray-700 font-semibold">Dak Id</label>
        <input
          type="text"
          id="dakId"
          className="form-input w-full mt-1"
          //value={dakId}
          onChange={(e) => setDakIdTemp(e.target.value)}
          placeholder="Dak Id"
        />
      </div>

    </div>



			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
					{/* <h1 className="text-xl font-semibold">Allotment Details</h1> */}
					<div className="flexContainer">
						
						{/* <input type="text" name="search" 
						onChange={e => setInputText(e.target.value)}
							onKeyPress={handleKeyPress}
							className="pl-2 -ml-2 inputField flex-initial" />*/}
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0"  style={{backgroundColor:"#2563eb"}} >Search</button> 
						<div>
							<Link to={"/add-allotmentDetails"}>
								<button className=" w-32 ml-8 p-0 h-6 -mt-2" style={{backgroundColor:"#2563eb"}} > Add Allotment Detail </button>
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

export default (AllotmentDetailList);


