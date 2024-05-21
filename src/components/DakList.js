/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 03 April 2024
 *
 * Modified By : 
 */

import { useState, useEffect, useMemo } from 'react';
import Table, { SelectColumnFilter } from '../utils/Table'  
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./../index.css"


function DakList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');

		  
	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if(!fetching)
			await axios.get('http://localhost:8081/daks')
				.then((response) => {
					console.log(response.data)
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
		//setData(dummyData)
		return () => { fetching = true; }

	}, [update, search]);


	async function remove(id) {
		await axios.delete(`/daks/${id}`)
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
					<Link to={"/daks/" + row.original.id+"/edit"}>
						<button className=" w-16 m-0 p-0 " > Edit </button>
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
			Header: "List No",
			accessor: 'listNo',
		},
		
		{
			Header: "Unit",
			accessor: 'unit.unitName',// Change this
		},

		
		{
			Header: "Dad Employee",
			accessor: 'dadEmployee.employeeName',// Change this
		},
		
		{
			Header: "Civ Employee",
			accessor: 'civEmployee.employeeName',// Change this
		},
		
		{
			Header: "Reference Date",
			accessor: 'referenceDate',
		},
		
		{
			Header: "Bill Date",
			accessor: 'billDate',
		},
		
		{
			Header: "Amount",
			accessor: 'amount',
		},
		
		{
			Header: "Disposal Date",
			accessor: 'disposalDate',
		},
		

		{
			Header: "Rescheduled",
						
			Cell: ({ row }) => (
				row.original.rescheduled?'yes':'no'
			)
		},
		

		
		{
			Header: "Multiple Entry",
			
			Cell: ({ row }) => (
				row.original.multipleEntry?'Multiple':'Single'
			)
		},
		
	

		{
			Header: "List Date",
			accessor: 'listDate',
		},
		
		{
			Header: "Vendor",
			accessor: 'vendor.vendorName',// Change this
		},
		

		{
			Header: "Section",
			accessor: 'section.sectionName',// Change this
		},
		
		{
			Header: "Dak Type",
			accessor: 'dakType.tableName',// Change this
		},
		
		{
			Header: "Bill Type",
			accessor: 'billType.typeOfBill',// Change this
		},
		
		{
			Header: "Dakid No",
			accessor: 'dakidNo',
		},


		
		{
			Header: "Task No",
			accessor: 'taskNo',
		},
		

		{
			Header: "Sender Name",
			accessor: 'senderName',
		},
		
		{
			Header: "Temp Dak Id",
			accessor: 'tempDakId',
		},
		

		{
			Header: "Reference No",
			accessor: 'referenceNo',
		},
		
		{
			Header: "Sender City",
			accessor: 'senderCity',
		},
		
		{
			Header: "Subject",
			accessor: 'subject',
		},
		
		{
			Header: "Bill No",
			accessor: 'billNo',
		},
		
		{
			Header: "Mode Of Receipt",
			accessor: 'modeOfReceipt',
		},
		
		{
			Header: "Regn No",
			accessor: 'regnNo',
		},
		
		{
			Header: "Disposal No",
			accessor: 'disposalNo',
		},
		
		{
			Header: "Security Grading",
			accessor: 'securityGrading',
		},
		
		{
			Header: "Month Year",
			accessor: 'monthYear',
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
			<main className="max-w-11/12xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
					<h1 className="text-xl font-semibold">Daks</h1>
					<div className="flexContainer">
						<input type="text" name="search" 
						onChange={e => setInputText(e.target.value)}
							onKeyPress={handleKeyPress}
							className="pl-2 -ml-2 inputField flex-initial" />
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
						<div>
							<Link to={"/daks/new"}>
								<button className=" w-32 ml-8 p-0 h-6 -mt-2" > Add Dak </button>
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

export default DakList;







const dummyData = [
	{
	  id: 1,
	  listNo: "001",
	  unit: { id: 1, name: "Unit A" },
	  imprest: { id: 101, name: "Imprest A" },
	  dadEmployee: { id: 201, name: "Employee A" },
	  civEmployee: { id: 301, name: "Employee B" },
	  referenceDate: "2024-04-01",
	  billDate: "2024-04-05",
	  amount: 1000,
	  disposalDate: "2024-04-10",
	  outwardDak: { id: 401, name: "Outward Dak A" },
	  rescheduled: false,
	  oldDak: { id: 501, name: "Old Dak A" },
	  multipleEntry: true,
	  dadOffice: { id: 601, name: "Dad Office A" },
	  officeId: { id: 701, name: "Office ID A" },
	  priority: "High",
	  listDate: "2024-03-31",
	  vendor: { id: 801, name: "Vendor A" },
	  fisDate: "2024-04-02",
	  gemBill: true,
	  section: { id: 901, name: "Section A" },
	  dakType: { id: 1001, name: "Dak Type A" },
	  billType: { id: 1101, name: "Bill Type A" },
	  dakidNo: "D001",
	  dakYear: 2024,
	  fisXmlFileNo: "FIS-001",
	  taskNo: "T001",
	  fisDocNo: "FDN-001",
	  fisCodeHead: "FCH-001",
	  senderName: "Sender X",
	  tempDakId: "TD001",
	  empNo: "EMP001",
	  gpfPranPpanNo: "GPF001",
	  dadAccountNo: "DAD-001",
	  referenceNo: "REF-001",
	  senderCity: "City X",
	  subject: "Dummy Subject",
	  billNo: "B001",
	  modeOfReceipt: "Online",
	  regnNo: "R001",
	  disposalNo: "DN001",
	  securityGrading: "High",
	  monthYear: "April 2024",
	  recordStatus: "Active",
	  reason: "Dummy Reason",
	  remarks: "Dummy Remarks",
	},
	{
	  id: 2,
	  listNo: "002",
	  unit: { id: 2, name: "Unit B" },
	  imprest: { id: 102, name: "Imprest B" },
	  dadEmployee: { id: 202, name: "Employee C" },
	  civEmployee: { id: 302, name: "Employee D" },
	  referenceDate: "2024-04-02",
	  billDate: "2024-04-06",
	  amount: 1500,
	  disposalDate: "2024-04-11",
	  outwardDak: { id: 402, name: "Outward Dak B" },
	  rescheduled: true,
	  oldDak: { id: 502, name: "Old Dak B" },
	  multipleEntry: false,
	  dadOffice: { id: 602, name: "Dad Office B" },
	  officeId: { id: 702, name: "Office ID B" },
	  priority: "Medium",
	  listDate: "2024-04-01",
	  vendor: { id: 802, name: "Vendor B" },
	  fisDate: "2024-04-03",
	  gemBill: false,
	  section: { id: 902, name: "Section B" },
	  dakType: { id: 1002, name: "Dak Type B" },
	  billType: { id: 1102, name: "Bill Type B" },
	  dakidNo: "D002",
	  dakYear: 2024,
	  fisXmlFileNo: "FIS-002",
	  taskNo: "T002",
	  fisDocNo: "FDN-002",
	  fisCodeHead: "FCH-002",
	  senderName: "Sender Y",
	  tempDakId: "TD002",
	  empNo: "EMP002",
	  gpfPranPpanNo: "GPF002",
	  dadAccountNo: "DAD-002",
	  referenceNo: "REF-002",
	  senderCity: "City Y",
	  subject: "Another Dummy Subject",
	  billNo: "B002",
	  modeOfReceipt: "Offline",
	  regnNo: "R002",
	  disposalNo: "DN002",
	  securityGrading: "Medium",
	  monthYear: "April 2024",
	  recordStatus: "Inactive",
	  reason: "Another Dummy Reason",
	  remarks: "Another Dummy Remarks",
	},
	// Add more dummy data objects as needed
  ];