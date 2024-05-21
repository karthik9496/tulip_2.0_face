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

function LoanRecoveryViewList() {

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
				await axios.get('/loanRecoverys/view/allLoans?cdaoNo=' + search + '&me=' + me + '&loanCode=' + payCode)
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
			Header: "Loan Code",
			accessor: 'loanCode.loanName',// Change this
		},




		{
			Header: "Sanction Amount",
			accessor: 'cbillLoan.sanctionAmount',
		},



		{
			Header: "Recovery Rate",
			accessor: 'recoveryAmount',
		},
		{
			Header: "Total Instalment",
			accessor: 'totalInstalmentCount',
		},
		{
			Header: "Current Instalment",
			accessor: 'recoveryInstallmentCount',
		},


		{
			Header: "Principal Amt",
			accessor: 'cbillLoan.principalAmount',
		},
		 

		{
			Header: "Interest Amt",
			accessor: 'cbillLoan.interestAmount',
		},
		{
			Header: "Balance",
			accessor: 'balanceAmount',
		},




		{
			Header: "Record Status",
			accessor: 'recordStatus',
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

	 



	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">

					<h1 className="text-xl font-semibold"> Loan Recovery List</h1>
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

						 
						 



					</div>


				</div>
				<div>
					<div className="-mt-2 max-h-1 py-0">
						<TablePage columns={columns} data={data} className="table-auto" />
						<div>
							 
						</div>
					</div>


				</div>
			</main>

		</div>

	);



}

export default withRouter(LoanRecoveryViewList);

