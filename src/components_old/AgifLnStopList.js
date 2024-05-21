/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 18 April 2022
 *
 * Modified By : 
 */

import { useState, useEffect, useMemo } from 'react';
//import Table, { SelectColumnFilter } from '../utils/Table'  // 
import TablePage, { SelectColumnFilter } from '../utils/TablePage'  // 
import axios from "axios";
//import { withRouter, Link } from "react-router-dom";
import { withRouter, Link, useParams } from "react-router-dom";

function AgifLnStopList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	const [test, setTest] = useState(false);
	const [me, setMe] = useState('');
	const [payCode, setPayCode] = useState('');
	const [selectedSec, setSelectedSec] = useState('')


	const [page, setPage] = useState(0);
	const [submitted, setSubmitted] = useState(false);
	const [approved, setApproved] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [usrLevel, setUsrLevel] = useState(0);

	let { sec } = useParams();

	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if (!fetching)
				await axios.get('/cbillLoans/pendingstop/agif?cdaoNo=' + search + '&me=' + me + '&loanCode=' + payCode)
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

	}, [update, search, me, payCode]);

	const updateCheckBoxAll = (e) => {
		// console.log("..."+e.target.checked+"--"+index);

		let newData = [...data];
		for (var k in newData) {
			newData[k].select = e.target.checked;
		}
		setData(newData);


	}

	useEffect(() => {
		let fetching = false;
		async function fetchUsrData() {
			if (!fetching)
				console.log(">>>>Usr Level is -----:" + usrLevel);
			await axios.get(`/iorTrans/userDesg`)
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
	const handleCheckBox = index => (e) => {
		//console.log(Table.page)
		console.log(e.target.checked + "--" + index);



		console.log(e.target.checked);
		let item = data[index];

		item['select'] = e.target.checked;
		let newData = [...data];
		newData[index] = item;
		setData(newData);



	}


	async function remove(id) {
		await axios.delete(`/loanSanctions/${id}`)
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
			Header: <input type="checkbox" onChange={updateCheckBoxAll} />,
			accessor: "select",
			Cell: ({ row }) => (
				<>

					<div>
						{row.original.recordStatus && row.original.recordStatus === 'V' &&
							<input type="checkbox" onChange={handleCheckBox(row.index)} checked={data[row.index]['select']} />
						}


					</div>
				</>

			)

		},
		{
			Header: "Officer Details",
			accessor: 'cdaoNo',
			Cell: ({ row }) => (
				<div>
					<div>
						{row.original.employee !== null &&
							<label>{row.original.employee.officerName}{' '}</label>
						}
						{row.original.employee && row.original.employee.rank !== null &&
							<label>{row.original.employee.rank.rankName}{'/'}{row.original.cdaoNo}{row.original.checkDigit}</label>

						}
						{!row.original.employee &&
							<label>{'NA / '}{row.original.cdaoNo}{row.original.checkDigit}</label>

						}
					</div>


				</div>

			)
		},
		{
			Header: "Recovery Month",
			accessor: 'monthEnding',
		},
		{
			Header: "Paid Month",
			accessor: 'paidMonth',
		},
		{
			Header: "Folio No",
			accessor: 'folioNumber',
		},


		{
			Header: "Loan Code",
			accessor: 'loanCode.loanName',// Change this
		},




		{
			Header: "Sanction Amount",
			accessor: 'sanctionAmount',
		},



		{
			Header: "Recovery Rate",
			accessor: 'recoveryRate',
		},
		{
			Header: "Total Instalment",
			accessor: 'totalInstalmentCount',
		},


		{
			Header: "Principal Amt",
			accessor: 'principalAmount',
		},

		{
			Header: "Interest Amt",
			accessor: 'interestAmount',
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
			Header: "Auditor Date",
			accessor: 'audStopDate',
		},

		{
			Header: "Aao Date",
			accessor: 'aaoStopDate',
		},

		{
			Header: "Ao Date",
			accessor: 'aoStopDate',
		},






		{
			Header: "Approved",
			accessor: 'approved',
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

	const handleCallBack = (pp) => {
		console.log(pp);
		setPage(pp);
	}

	async function submitFile() {
		if (disabled)
			return;

		setDisabled(true);

		if (usrLevel <= 30) {


			await axios.put("/cbillLoans/submitStop/agif", data)
				.then((response) => {

					if (response.data) {
						setServerErrors(response.data);
						setDisabled(false);
						return;
					}
				})

		}


	}


	async function approveFile() {
		if (disabled)
			return;

		setDisabled(true);

		if (usrLevel <= 30) {


			await axios.put("/cbillLoans/approveStop/agif", data)
				.then((response) => {

					if (response.data) {
						setServerErrors(response.data);
						setDisabled(false);
						return;
					}
				})

		}


	}




	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">

					<h1 className="text-xl font-semibold">AGIF Stop - Pending List</h1>
					<div className="text-red-500">{serverErrors}</div>
					<div className="flexContainer">
						<div>
							<input type="text" name="search"
								onChange={e => setInputText(e.target.value)}
								onKeyPress={handleKeyPress} placeholder="cdaono"
								className="pl-2 -ml-2 inputField flex-initial" />
						</div>

						<div>
							<input type="text" name="me" placeholder="month(mmyyyy)"
								onChange={e => setMe(e.target.value)}
								onKeyPress={handleKeyPress}
								className="pl-2 -ml-2 inputField flex-initial" />
						</div>

						<div>
							<input type="text" name="payCode"
								onChange={e => setPayCode(e.target.value)}
								onKeyPress={handleKeyPress}
								className="pl-2 -ml-2 inputField flex-initial" />
						</div>

						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>

						<div>
							<Link to={"/cbillLoans/upload/agif"}>
								<button className=" w-38 ml-8 p-0 h-6 -mt-2" > Upload AGIF </button>
							</Link>
						</div>

						<div>

							<Link to={"/cbillLoans/approved/agif"}>
								<button className=" w-38 ml-8 p-0 h-6 -mt-2" >Approved List </button>
							</Link>
						</div>



					</div>


				</div>
				<div>
					<div className="-mt-2 max-h-1 py-0">
						<TablePage columns={columns} data={data} className="table-auto" />
						<div>
							{(usrLevel < 30) &&
								<button type="button" onClick={submitFile} disabled={disabled} className="w-36 m-2 p-0">
									{disabled && (
										<span className="spinner-grow spinner-grow-sm"></span>
									)

									} Submit</button>
							}
							{(usrLevel >= 30) &&
								<button type="button" onClick={approveFile} disabled={disabled} className="w-36 m-2 p-0">
									{disabled && (
										<span className="spinner-grow spinner-grow-sm"></span>
									)

									} Approve</button>
							}
						</div>
					</div>


				</div>
			</main>

		</div>

	);



}

export default withRouter(AgifLnStopList);

