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

function BillList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	/*  const [search, setSearch] = useState({
	financialYear: '',
	dakNo: '',
	unitCode: ''
  });*/
	const [search, setSearch] = useState('');
	const [inputText, setInputText] = useState('');
	const [financialYear, setFinancialYear] = useState('');
	const [financialYearTemp, setFinancialYearTemp] = useState('');
	const [dakId, setDakId] = useState('');
	const [dakIdTemp, setDakIdTemp] = useState('');
	const [unitCode, setUnitCode] = useState('');
	const [unitCodeTemp, setUnitCodeTemp] = useState('');
	const [unitName, setUnitName] = useState('');
	const [unitNameTemp, setUnitNameTemp] = useState('');
	const [projectCode, setProjectCode] = useState('');
	const [projectCodeTemp, setProjectCodeTemp] = useState('');
	const [vendorName, setVendorName] = useState('');
	const [vendorNameTemp, setVendorNameTemp] = useState('');
	const [vendorPan, setVendorPan] = useState('');
	const [vendorPanTemp, setVendorPanTemp] = useState('');
	const [month, setMonth] = useState('');
	const [monthTemp, setMonthTemp] = useState('');
	const [recordStatus, setRecordStatus] = useState('');
	const [recordStatusTemp, setRecordStatusTemp] = useState('');
	const [msme, setMsme] = useState('');
	const [msmeTemp, setMsmeTemp] = useState('');
	const [pfms, setPfms] = useState('');
	const [pfmsTemp, setPfmsTemp] = useState('');
	const [pfmsBillNo, setPfmsBillNo] = useState('');
	const [pfmsBillNoTemp, setPfmsBillNoTemp] = useState('');

	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if (!fetching)
				await axios.get('/mbills?search=' + search + '&financialYear=' + financialYear+ '&dakId=' + dakId+ '&unitCode=' + unitCode
				+ '&unitName=' + unitName+ '&projectCode=' + projectCode+ '&vendorName=' + vendorName+ '&vendorPan=' + vendorPan
				+ '&month=' + month+ '&recordStatus=' + recordStatus+ '&msme=' + msme+ '&pfms=' + pfms
				+ '&pfmsBillNo=' + pfmsBillNo )
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

	}, [update, search, financialYear, dakId, unitCode, unitName, projectCode, vendorName, vendorPan, month, recordStatus, msme, pfms, pfmsBillNo]);


	async function remove(id) {
		await axios.delete(`/bills/${id}`)
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
					<Link to={"/mbills/" + row.original.id}>
						<button className=" w-16 m-0 p-0 " > View More </button>
					</Link>
					{' '}
					<Link to={"/mbills/" + row.original.id + "/edit"}>
						<button className=" w-16 m-0 p-0 " > Edit </button>
					</Link>
				</div>
			)
		},
		{
			Header: "DakId No",
			accessor: 'dak.dakidNo',
		},

		{
			Header: "Month",
			accessor: 'month',// Change this
		},

		{
			Header: "Unit",
			accessor: 'unit.unitCode',// Change this
		},

		{
			Header: "Record Status",
			accessor: 'recordStatus',// Change this
		},

		{
			Header: "Reason",
			accessor: 'reason',// Change this
		},

		{
			Header: "Type Of Bill",
			accessor: 'billType.typeOfBill',// Change this
		},

		{
			Header: "Vendor",
			accessor: 'vendor.vendorName',// Change this
		},

		{
			Header: "Amount Claimed",
			accessor: 'amountClaimed',// Change this
		},

		{
			Header: "Amount Passed",
			accessor: 'amountPassed',// Change this
		},

		{
			Header: "Task",
			accessor: 'taskUsr.usrName'
		}
	], [data])

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(inputText);
		setSearch(inputText);
		setFinancialYear(financialYearTemp)
		setDakId(dakIdTemp)
		setUnitCode(unitCodeTemp)
		setUnitName(unitNameTemp)
		setProjectCode(projectCodeTemp)
		setVendorName(vendorNameTemp)
		setVendorPan(vendorPanTemp)
		setMonth(monthTemp)
		setRecordStatus(recordStatusTemp)
		setMsme(msmeTemp)
		setPfms(pfmsTemp)
		setPfmsBillNo(pfmsBillNoTemp)

	}
	const handleKeyPress = (event) => {
		// look for the `Enter` keyCode
		if (event.keyCode === 13 || event.which === 13) {
			handleSubmit(event)
		}
	}

	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<h1 className="text-xl font-semibold" style={{ marginTop: "20px" }}>MBills Search Filter</h1>

			<div className="flex flex-wrap items-center">
				<div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
					<label htmlFor="financialYear" className="block text-gray-700 font-semibold">Financial Year</label>
					<input
						type="text"
						id="allotmentYear"
						className="form-input w-full mt-1"
						onChange={(e) => setFinancialYearTemp(e.target.value)}
						placeholder="yyyy-yyyy"
					/>
				</div>
				<div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
					<label htmlFor="dakNo" className="block text-gray-700 font-semibold">Dak No</label>
					<input
						type="text"
						id="dakId"
						className="form-input w-full mt-1"
						onChange={e => setDakIdTemp(e.target.value)}
						placeholder="Dak No"
					/>

				</div>
				<div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
					<label htmlFor="unitCode" className="block text-gray-700 font-semibold">Unit Code</label>
					<input
						type="text"
						id="unitCode"
						className="form-input w-full mt-1"
						onChange={(e) => setUnitCodeTemp(e.target.value)}
						placeholder="Unit Code"
					/>
				</div>
				<div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
					<label htmlFor="unitName" className="block text-gray-700 font-semibold">Unit Name</label>
					<input
						type="text"
						id="unitName"
						className="form-input w-full mt-1"
						onChange={(e) => setUnitNameTemp(e.target.value)}
						placeholder="Unit Name"
					/>
				</div>
				<div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
					<label htmlFor="projectCode" className="block text-gray-700 font-semibold">Project Code</label>
					<input
						type="text"
						id="projectCode"
						className="form-input w-full mt-1"
						onChange={(e) => setProjectCodeTemp(e.target.value)}
						placeholder="Project Code"
					/>
				</div>
				<div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
					<label htmlFor="vendorName" className="block text-gray-700 font-semibold">Vendor Name</label>
					<input
						type="text"
						id="vendorName"
						className="form-input w-full mt-1"
						onChange={(e) => setVendorNameTemp(e.target.value)}
						placeholder="Vendor Name"
					/>
				</div>
				<div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
					<label htmlFor="vendorPan" className="block text-gray-700 font-semibold">Vendor Pan</label>
					<input
						type="text"
						id="vendorPan"
						className="form-input w-full mt-1"
						onChange={(e) => setVendorPanTemp(e.target.value)}
						placeholder="Vendor Pan"
					/>
				</div>
				<div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
					<label htmlFor="month" className="block text-gray-700 font-semibold">Month</label>
					<input
						type="text"
						id="month"
						className="form-input w-full mt-1"
						onChange={(e) => setMonthTemp(e.target.value)}
						placeholder="mm/yyyy"
					/>
				</div>

				<div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
					<label htmlFor="recordStatus" className="block text-gray-700 font-semibold">Record Status</label>
					<input
						type="text"
						id="recordStatus"
						className="form-input w-full mt-1"
						onChange={(e) => setRecordStatusTemp(e.target.value)}
						placeholder="Record Status"
					/>
				</div>
				<div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
					<label htmlFor="msme" className="block text-gray-700 font-semibold">MSME</label>
					<input
						type="checkbox"
						id="msme"
						className="form-input w-full mt-1"
						onChange={(e) => setMsmeTemp(e.target.value)}
					/>
				</div>
				<div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
					<label htmlFor="pfmsBill" className="block text-gray-700 font-semibold">PFMS Bill</label>
					<input
						type="checkbox"
						id="pfms"
						className="form-input w-full mt-1"
						onChange={(e) => setPfmsTemp(e.target.value)}
					/>
				</div>
				<div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
					<label htmlFor="pfmsBillNo" className="block text-gray-700 font-semibold">PFMS Bill No</label>
					<input
						type="text"
						id="pfmsBillNo"
						className="form-input w-full mt-1"
						placeholder="PFMS Bill No"

						onChange={(e) => setPfmsBillNoTemp(e.target.value)}
					/>
				</div>
			

			</div>
			<main className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
					<div className="flexContainer">
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

export default (BillList);

