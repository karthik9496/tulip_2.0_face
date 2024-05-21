import { useState, useEffect, useMemo } from "react";
import { withRouter, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import TablePage, { SelectColumnFilter } from '../utils/TablePage'


const CrBalRelease = () => {


	const [lightTheme, setLightTheme] = useState(true);
	const [disabled, setDisabled] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [data, setData] = useState([]);
	const [searchData, setSearchData] = useState([]);
	const [search, setSearch] = useState('');
	const [process, setProcess] = useState('');
	const [page, setPage] = useState(0);
	const [usrLevel, setUsrLevel] = useState(0);
	const [allChecked, setAllChecked] = useState(false);
	const [inputText, setInputText] = useState('');
	const [approvedList, setApprovedList] = useState(false);
	const [prepareBatch, setPrepareBatch] = useState(false);
	const [preparePm, setPreparePm] = useState(false);
	const [batch, setBatch] = useState('');
	const [pageSize, setPageSize] = useState(0);


	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if (!fetching && usrLevel && !approvedList && !prepareBatch) {
				if (usrLevel < 30) {
					await axios.get('/paySummarys/crbalRelease/fetchList')
						.then((response) => {
							console.log(response.data[0].action);
							if (response.data && response.data[0].action)
								setProcess(response.data[0].action)
							setData(response.data);
							setSearchData(response.data);
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
				if (usrLevel >= 30) {
					await axios.get('/paySummarys/crbalRelease/fetchPendingApprovalList')
						.then((response) => {
							console.log(response.data[0].action);
							if (response.data && response.data[0].action)
								setProcess(response.data[0].action)
							setData(response.data);
							setSearchData(response.data);
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
			}
		}
		fetchData();
		return () => { fetching = true; }

	}, [usrLevel, approvedList, prepareBatch, preparePm]);

	useEffect(() => {
		let fetching = false;
		async function fetchApprovedData() {
			if (!fetching && approvedList) {
				console.log('fetch approved')
				await axios.get('/paySummarys/crbalRelease/fetchApprovedList')
					.then((response) => {
						console.log(response.data[0].action);
						if (response.data && response.data[0].action)
							setProcess(response.data[0].action)
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
		}
		fetchApprovedData();
		return () => { fetching = true; }

	}, [approvedList, prepareBatch, preparePm]);

	useEffect(() => {
		let fetching = false;
		async function fetchBatchData() {
			if (!fetching && prepareBatch) {
				console.log('fetch prepare batch')
				await axios.get('/paySummarys/crbalRelease/fetchBatchList')
					.then((response) => {
						console.log(response.data);

						setData(response.data);
						setSearchData([]);

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
		}
		fetchBatchData();
		return () => { fetching = true; }

	}, [prepareBatch, approvedList]);

	useEffect(() => {

		async function fetchUsrLevel() {

			await axios.get(`/miscs/usrLevel`)
				.then((response) => {
					//console.log(data);
					setUsrLevel(response.data);
				})
				.catch((error) => {
					setDisabled(false);
					console.log(error);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					if (error.response)
						setServerErrors(error.response.data.error);
					else
						setServerErrors(error.Error);
				});
		}

		fetchUsrLevel();



	}, []);

	const handleInputChange = (ano) => (e) => {
		console.log(ano + "--" + e.target.value);
		let newData = [...searchData];

		for (var k in searchData) {
			if (newData[k].employee.armyNo.includes(ano))
				newData[k].crBalRate = e.target.value;
		}
		setSearchData(newData);


	}



	const handleCheckBox = ano => (e) => {
		console.log(ano + '--' + e.target.checked);
		let newData = [...searchData];



		for (var k in searchData) {
			if (newData[k].employee.cdaoNo.includes(ano))
				newData[k].selected = e.target.checked;
		}

		setSearchData(newData);



	}

	const handleCallBack = (pp) => {
		console.log(pp);
		setPage(pp);
	}
	async function processCrBal() {
		console.log(searchData);
		await axios.post(`/paySummarys/crbalRelease/process`, searchData)
			.then((res) => {
				console.log(data);
				if (res.data && res.data[0]) {
					setData(res.data[0]);
					setSearchData(res.data[0]);
				}
				if (res.data && res.data[1])
					setServerErrors(res.data[1]);

				setAllChecked(false);

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

	async function processPrepareBatch() {
		setDisabled(true);
		await axios.post(`/paySummarys/crbalRelease/preparePmCs`, data)
			.then((res) => {
				//console.log(data);
				if (res.data) {
					setData(res.data[0]);
					setSearchData(res.data[0]);
					setDisabled(false);
					if (res.data[2])
						setServerErrors(res.data[2]);
					if (res.data[1]) {
						let fname = res.data[1];
						if (fname != null && fname.length > 0) {
							axios({
								url: `/employeeDeductions/neftBatchReport/download/` + fname,
								method: 'GET',
								responseType: 'blob', // important
							}).then((res) => {
								//console.log(response.data);
								const url = URL.createObjectURL(new Blob([res.data]));
								const pdfWindow = window.open();
								pdfWindow.location.href = url;
								const link = pdfWindow.location.href;
								//const link = document.createElement('a');
								//link.href = url;
								link.setAttribute('download', fname);

								//document.body.appendChild(link);
								link.click();
							});
						}
					}
				}
				setAllChecked(false);

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

	async function approveCrBal() {
		await axios.post(`/paySummarys/crbalRelease/approve`, searchData)
			.then((res) => {
				//console.log(data);
				if (res.data) {
					setData(res.data);
					setSearchData(res.data);
				}
				setAllChecked(false);

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
	async function submitCrBal() {
		await axios.post(`/paySummarys/crbalRelease/submit`, searchData)
			.then((res) => {
				//console.log(data);
				if (res.data) {
					setData(res.data);
					setSearchData(res.data);
				}
				setAllChecked(false);

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
	const updateCheckBoxAll = (e) => {

		if (e.target.checked)
			setAllChecked(true);
		else
			setAllChecked(false);


		let newData = [...data];
		let count = 0;
		for (var k in newData) {
			newData[k].selected = e.target.checked;
			if (e.target.checked)
				count = count + newData[k].totalItems;
		}
		setData(newData);



	}

	const handleApprovedList = (event) => {
		console.log(approvedList);
		setApprovedList(true);
		setPreparePm(false);
		setPrepareBatch(false);
	}

	const handlePrepareBatch = (event) => {
		console.log(approvedList);
		setPrepareBatch(true);
		setPreparePm(false);
		setApprovedList(false);
	}

	const handlePreparePm = (event) => {
		console.log(preparePm);
		setPreparePm(true);
	}

	async function pmcs() {
		setDisabled(true);
		await axios.post(`/employeeDeductions/crbalPmCs/generate/${batch}`)
			.then((response) => {
				//console.log(data);
				setDisabled(false);
				setServerErrors(response.data);
			})
			.catch((error) => {
				setDisabled(false);
				console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(inputText);
		let newData = [...data];
		if (inputText.length === 0)
			setSearchData(newData);
		else {

			const results = newData.filter((ed) => {
				return ed.employee.cdaoNo.includes(inputText);
			});
			setSearchData(results);


		}
	}

	const handleKeyPress = (event) => {
		// look for the `Enter` keyCode
		if (event.keyCode === 13 || event.which === 13) {
			handleSubmit(event)
		}
	}


	const ShowPmCs = () => {
		return (
			<div className="min-h-screen bg-gray-100 text-gray-900">
				<main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
					<div className="mt-2 ml-4">
						<h1 className="text-xl font-semibold">CR Bal Pm/Cs</h1>
						<div className="grid grid-cols-2 gap-0">

							<div >
								<b>Batch No</b>
								<div>
									<input type="text" name="pm" placeholder="batch number" onBlur={e => setBatch(e.target.value)} />
								</div>
								<div>
									<button type="button" onClick={pmcs} className=" w-36 ml-8 p-0 h-15 " >Generate PMCS</button>
								</div>
							</div>




						</div>



					</div>
				</main>
			</div>
		);
	}

	const ShowPrepareBatch = () => {
		const columns = useMemo(() => [



			{
				Header: "Month Ending",
				accessor: 'monthEnding',
			},

			{
				Header: "Officer",
				accessor: 'employee.cdaoNo',
				Cell: ({ row }) => (
					<div>

						{row.original.employee.rank.rankName}{' '}{row.original.employee.officerName}<br />
						{row.original.employee.cdaoNo}{row.original.employee.checkDigit}

					</div>

				)
			},
			{
				Header: "Task",
				accessor: 'employee.task',
			},
			{
				Header: "Opening Balance",
				accessor: 'openingBalance',
			},
			{
				Header: "Perm Opening Balance",
				accessor: 'permOb',
			},

			{
				Header: "Cr Bal Amt",
				accessor: 'crBalAmount',
			},
			{
				Header: "Perm Cr Bal Amt",
				accessor: 'permCrBalAmount',
			},
			{
				Header: "Total Amt",
				accessor: 'totalCrBalAmount',
			},
			{
				Header: "Cr Bal Dt",
				accessor: 'crBalDate',
			},
			{
				Header: "Record Status",
				accessor: 'crBalStatus',
			},
			{
				Header: "Reason",
				accessor: 'crBalReason',
			},

			{
				Header: "Aud Date",
				accessor: 'crBalAudDate',
			},

			{
				Header: "Aao Date",
				accessor: 'crBalAaoDate',
			},
			{
				Header: "Ao Date",
				accessor: 'crBalAoDate',
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


		return (
			<div className="min-h-screen bg-green-100 text-gray-700">
				<div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">

					<div className="-mt-2 max-h-1 py-0 ml-0">
						<TablePage columns={columns} data={data} newpage={page} parentCallback={handleCallBack} className="table-auto" />

						<div>
							{prepareBatch && data && data.length > 0 &&
								<button type="button" onClick={processPrepareBatch} className="w-32 m-0 p-0">Finalize Payment</button>
							}
						</div>

					</div>

				</div>

			</div>
		);
	}
	const ShowCrBalApprovedList = () => {




		const columns = useMemo(() => [



			{
				Header: "Month Ending",
				accessor: 'monthEnding',
			},

			{
				Header: "Officer",
				accessor: 'employee.cdaoNo',
				Cell: ({ row }) => (
					<div>

						{row.original.employee.rank.rankName}{' '}{row.original.employee.officerName}<br />
						{row.original.employee.cdaoNo}{row.original.employee.checkDigit}

					</div>

				)
			},
			{
				Header: "Type",
				accessor: 'employeeType',
			},
			{
				Header: "OB",
				accessor: 'openingBalance',
			},
			{
				Header: "Perm OB",
				accessor: 'oermOb',
			},

			{
				Header: "Cr Bal Amt",
				accessor: 'crBalAmount',
			},
			{
				Header: "Perm Cr Bal Amt",
				accessor: 'perCrBalAmount',
			},
			{
				Header: "Cr Bal Dt",
				accessor: 'crBalDate',
			},

			{
				Header: "Record Status",
				accessor: 'crBalStatus',
			},
			{
				Header: "Reason",
				accessor: 'crBalReason',
			},

			{
				Header: "Aud Date",
				accessor: 'crBalAudDate',
			},

			{
				Header: "Aao Date",
				accessor: 'crBalAaoDate',
			},
			{
				Header: "Ao Date",
				accessor: 'crBalAoDate',
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


		return (
			<div className="min-h-screen bg-green-100 text-gray-700">
				<div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">

					<div className="-mt-2 max-h-1 py-0 ml-0">
						<TablePage columns={columns} data={data} newpage={page} parentCallback={handleCallBack} className="table-auto" />



					</div>

				</div>

			</div>
		);

	}
	const handleCrBalAmtChange = (index) => (e) => {
		console.log(index + "--" + e.target.value);
		let item = searchData[index];

		item['crBalAmount'] = e.target.value;
		let newData = [...searchData];
		newData[index] = item;
		setSearchData(newData);

	}
	const ShowCrBalList = () => {


		const handlePermCrBalAmtChange = (index) => (e) => {
			console.log(index + "--" + e.target.value);
			let item = searchData[index];

			item['permCrBalAmount'] = e.target.value;
			let newData = [...searchData];
			newData[index] = item;
			setSearchData(newData);

		}

		const handlePageSize = (pp) => {
			console.log(pp);
			setPageSize(pp);
		};
		const handleCallBack = (pp) => {
			console.log(pp);
			setPage(pp);
		}
		const columns = useMemo(() => [
			{
				Header: <input type="checkbox" onChange={updateCheckBoxAll} checked={allChecked} />,
				accessor: "select",
				Cell: ({ row }) => (
					<div>
						{row.original.action !== 'noaction' &&
							<input type="checkbox" onChange={handleCheckBox(row.original.employee.cdaoNo)} checked={row.original.selected} />
						}

					</div>

				)

			},


			{
				Header: "Month Ending",
				accessor: 'monthEnding',
			},

			{
				Header: "Officer",
				accessor: 'employee.cdaoNo',
				Cell: ({ row }) => (
					<div>

						{row.original.employee.rank.rankName}{' '}{row.original.employee.officerName}<br />
						{row.original.employee.cdaoNo}{row.original.employee.checkDigit}

					</div>

				)
			},
			{
				Header: "Type",
				accessor: 'employeeType',
			},
			{
				Header: "Openeing Balance",
				accessor: 'openingBalance',
			},

			{
				Header: "Release Amt",
				accessor: 'crBalAmount',
				Cell: ({ row }) => (
					<div>
						{row.original.openingBalance && row.original.openingBalance > 0 &&
							<input type="text" name="crBalAmt" onBlur={handleCrBalAmtChange(row.index)} value={row.original.crBalAmount} />
						}

					</div>

				)
			},
			{
				Header: "Perm Openeing Balance",
				accessor: 'permOb',
			},
			{
				Header: "Release Amt",
				accessor: 'permCrBalAmount',
				Cell: ({ row }) => (
					<div>
						{row.original.permOb && row.original.permOb > 0 &&
							<input type="text" name="permcrBalAmt" onBlur={handlePermCrBalAmtChange} value={row.original.permCrBalAmount} />
						}
					</div>

				)
			},

			{
				Header: "Cr Bal Dt",
				accessor: 'crBalDate',
			},
			{
				Header: "Record Status",
				accessor: 'crBaltatus',
			},
			{
				Header: "Reason",
				accessor: 'crBalReason',
			},

			{
				Header: "Aud Date",
				accessor: 'crBalAudDate',
			},

			{
				Header: "Aao Date",
				accessor: 'crBalAaoDate',
			},
			{
				Header: "Ao Date",
				accessor: 'crBalAoDate',
			},


			/*
			{
				Header: "Login Name",
				accessor: 'loginName',
				Filter: SelectColumnFilter,  // new
				filter: 'includes',
			},
			*/
		], [searchData])


		return (
			<div className="min-h-screen bg-green-100 text-gray-700">
				<div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">

					<div className="-mt-2 max-h-1 py-0 ml-0">
						<TablePage columns={columns} data={searchData} newpage={page} parentCallback={handleCallBack}
							newPageSize={pageSize}
							parentCallbackPageSize={handlePageSize} className="table-auto" />

						<div>
							{usrLevel < 30 && searchData && searchData.length > 0 &&
								<button type="button" onClick={processCrBal} className="w-32 m-0 p-0">Process Cr Bal</button>
							}
							{usrLevel === 30 && searchData && searchData.length > 0 &&
								<button type="button" onClick={submitCrBal} className="w-32 m-0 p-0">Submit</button>
							}
							{usrLevel > 30 && searchData && searchData.length > 0 &&
								<button type="button" onClick={approveCrBal} className="w-32 m-0 p-0">Approve</button>
							}
						</div>

					</div>

				</div>

			</div>
		);

	}


	return (
		<div className="min-h-screen bg-gray-100 text-gray-700">
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
					<h1 className="text-xl font-semibold">Credit Balance Release</h1>


				</div>
				<div className="text-red-500">{serverErrors}</div>

				<div className="flexContainer">

					<div>
						<input type="text" name="search"
							onChange={e => setInputText(e.target.value)} placeholder="cdao no"
							onKeyPress={handleKeyPress}
							className="pl-2 -ml-2 inputField flex-initial" />
					</div>

					<div>
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>

					</div>

					<div>
						<button type="button" onClick={handleApprovedList} className="w-22 m-0 p-0">Approved List</button>

					</div>

					<div>
						<button type="button" onClick={handlePrepareBatch} className="w-22 m-0 p-0">Finalize Payment</button>

					</div>

					<div>
						<button type="button" onClick={handlePreparePm} className="w-22 m-0 p-0">PM/CS</button>

					</div>

				</div>
				<div>
					{approvedList === false && prepareBatch === false && preparePm === false &&
						<ShowCrBalList />
					}

					{approvedList === true && prepareBatch === false && preparePm === false &&
						<ShowCrBalApprovedList />
					}

					{prepareBatch === true && preparePm === false &&
						<ShowPrepareBatch />
					}
					{preparePm === true &&
						<ShowPmCs />
					}


				</div>

			</main>

		</div>


	);


};

export default withRouter(CrBalRelease);