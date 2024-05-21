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

function CommissionGoiList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	const [desgLevel,setDesgLevel]=useState(0);
	const [readOnly,setReadOnly]=useState(false);

useEffect(() => {
    function getSectionState() {
      let usr = JSON.parse(sessionStorage.getItem("usr"));
      if(usr)
      	setDesgLevel(usr.designation.designationLevel);
      if(usr.designation.designationLevel>=30){
		  setReadOnly(true);
	  }
      console.log(usr.designation.designationLevel);
    }

    getSectionState();
  }, []);
	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if(!fetching)
			await axios.get('/commissionGois?search='+search)
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


	async function remove(id) {
		await axios.delete(`/commissionGois/${id}`)
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
	
	async function rollback(id) {
		await axios.put(`/commissionGois/rollback/${id}`)
			.then((res) => {
				//console.log(data);
				//let updatedRecords = [...data].filter((i) => i.id !== id);
				//console.log(updatedRecords);
				//setData(updatedRecords);
				//setUpdate(!update);
				setServerErrors(res.data);
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
	async function approve(id) {
		await axios.put(`/commissionGois/approve/${id}`)
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
				{desgLevel && desgLevel<30 && <>
					<Link to={"/commissionGois/" + row.original.id}>
						<button className=" w-16 m-0 p-0 " > Edit </button>
					</Link>
					{' '}
					<button
						className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
						onClick={() => remove(row.original.id)}
					>	Delete 	</button>
					</>
					}
					{desgLevel && desgLevel>=30 && row.original.reason.includes("approv") && <>
					<Link to={"/commissionGois/" + row.original.id}>
						<button className=" w-16 m-0 p-0 " > Approve </button>
					</Link>
					{' '}
					<button
						className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
						onClick={() => rollback(row.original.id)}
					>	Rollback 	</button>
					</>
					}
					
				</div>
			)
		},
		{
			Header: "Commission Dak",
			accessor: 'commissionControlDak.dakidNo',// Change this
		},
		
		{
			Header: "Officer Name",
			accessor: 'officerName',
		},
		
		{
			Header: "Rank",
			accessor: 'rank.rankName',// Change this
		},
		{
			Header: "Ic No",
			accessor: 'icNo',
		},
		
		{
			Header: "Ic Check Digit",
			accessor: 'icCheckDigit',
		},
		
		{
			Header: "GoI Letter No",
			accessor: 'commissionControl.goiLetterNo',// Change this
		},
		{
			Header: "GoI Letter Date",
			accessor: 'commissionControl.goiLetterDate',// Change this
		},
		
		{
			Header: "Commission Type",
			accessor: 'commissionType.typeName',// Change this
		},
		
		{
			Header: "Corps",
			accessor: 'corps.unitName',// Change this
		},
		
		 
		
		{
			Header: "Date Of Commission",
			accessor: 'dateOfCommission',
		},
		
	
		
		{
			Header: "Pc Ssc",
			accessor: 'pcSsc',
		},
		
		
		{
			Header: "Gender",
			accessor: 'gender',
		},
		
		{
			Header: "Month Ending",
			accessor: 'monthEnding',
		},
		
		
		
		{
			Header: "Cdao No",
			accessor: 'cdaoNo',
		},
		
		{
			Header: "Cdao Check Digit",
			accessor: 'cdaoCheckDigit',
		},
		
		
		{
			Header: "Date Of Birth",
			accessor: 'dateOfBirth',
		},
		
		{
			Header: "Tgc Others",
			accessor: 'tgcOthers',
		},
		{
			Header: "Annual Leave From",
			accessor: 'annualLeaveFrom',
		},
		{
			Header: "Annual Leave To",
			accessor: 'annualLeaveTo',
		},
		
		{
			Header: "Antedate Pay",
			accessor: 'antedatePay',
		},
		
		{
			Header: "Antedate Promotion",
			accessor: 'antedatePromotion',
		},
		
		{
			Header: "Tgc Date Of Permanent Commission",
			accessor: 'tgcDateOfPermanentCommission',
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
			Header: "Approved",
			accessor: 'approved',
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
					<h1 className="text-xl font-semibold">Commission Gois</h1>
					<div className="text-red-500">{serverErrors}</div>
					<div className="flexContainer">
						<input type="text" name="search" placeholder=" Name or Ic No"
						onChange={e => setInputText(e.target.value)}
							onKeyPress={handleKeyPress}
							className="pl-2 -ml-2 inputField flex-initial" />
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
						<div>
							<Link to={"/commissionGois/new"}>
								<button className=" w-46 ml-8 p-0 h-6 -mt-2" > Add Commission Goi </button>
							</Link>
						</div>
						<div>
							<Link to={"/commissionGois/view"}>
								<button className=" w-46 ml-8 p-0 h-6 -mt-2" > View All </button>
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

export default withRouter(CommissionGoiList);

