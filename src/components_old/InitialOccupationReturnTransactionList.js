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


function InitialOccupationReturnTransactionList() {

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
	const [approved, setApproved] = useState(true);
	const [rentBillType, setRentBillType] = useState('');
	const [disabled, setDisabled] = useState(false);
	const [validRec, setValidRec] = useState('');
	const [invalidRec, setInvalidRec] = useState('');
	const [iors, setIors] = useState('');
	const [showCrList, setShowCrList] = useState(false);
	const [optionType, setOptionType] = useState('');
	const [occVacList, setOccVacList] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [pending, setPending] = useState(false);

	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if (!fetching)
				console.log(optionType);
			await axios.get('/initialOccupationReturnTransactions?search=' + search + '&rentBillType=' + optionType)

				.then((response) => {
					console.log("------ior response----:" + response.data['select']===true)
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

	}, [update, search, optionType, iors]);


	useEffect(() => {
		let fetching = false;
		async function fetchUsrData() {
			if (!fetching)
				console.log(">>>>Usr Level is -----:" + usrLevel);
			await axios.get(`/initialOccupationReturnTransactions/userDesg`)
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

	useEffect(() => {
		let fetching = false;
		async function fetchHighCreditData() {
			if (!fetching)

				await axios.get(`/initialOccupationReturnTransactions/highCredit`)
					.then((response) => {
						console.log(">>>>Usr Level is----:" + response.data);
						setCrData(response.data);

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
		fetchHighCreditData();
		return () => { fetching = true; }

	}, []);

	useEffect(() => {
		let fetching = false;
		async function updateOccVac() {
			if (!fetching)

				await axios.get(`/initialOccupationReturnTransactions/checkForUpdationOccVac`)
					.then((response) => {
						console.log(">>>>Ready for Updation----:" + response.data);
						if (response.data === 'yes')
							setSubmitted(true);

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
		updateOccVac();
		return () => { fetching = true; }

	}, []);

	async function submitBulk() {

		let i = 0, fname = "NA";
		let xx = "";
		console.log("----line 120---:" + optionType);
		if(usrLevel< 30){
		if ((optionType !== null && optionType.length === 0) || optionType === null) {
			alert("No file name given ");
			return;
		}
		if (optionType === 'rev' || optionType === 'vac') {
			await axios.get("/initialOccupationReturnTransactions/findPendingOccData")
				.then((response) => {
					//console.log("---rd---:" + response.data);
					//	setMesg(response.data);
					//console.log("---line 128--:" + mesg);
					xx = response.data;
					if (xx !== null && xx.startsWith('no')) {
						setPending(true);
						console.log("-----pending---111--:" + pending + "---" + xx);
						alert("Process Occupation first");
						return;
					}
				})
		}
		if (data.length === 0) {
			alert("No records exist with this file name");
			return;
		}
		console.log("-----pending---111--:" + pending);
		for (i = 0; i < data.length; i++) {
			if (fname !== "NA") {
				if (data[i].occupationVacationRevision !== fname) {
					alert("Selection contains multiple file");
					return;
				}
			}

			fname = data[i].occupationVacationRevision;

		}
		console.log("----pending here is----:" + pending);
		if (pending === false || !xx.startsWith('no')) {
			let proceed = window.confirm("You are about to process file containing " + data.length + " records.");
			if (!proceed)
				return;
		}
		if (disabled)
			return;

		setDisabled(true);
		console.log("----option---:" + optionType);
		await axios.put(`/initialOccupationReturnTransactions/bulkSubmitIors/${optionType}`, data)
			.then((response) => {
				setDisabled(false);
				if (response.data[0] !== null)
					setMesg(response.data[0]);

				if (response.data[1] !== null)
					console.log("----respose---:" + response.data[1]);
				setMesg(response.data[1]);
				//	setData(response.data[2]);

				if (response.data[3] !== null)
					setMesg(response.data[3]);
				console.log("reponse status--------------" + response.status);


			})
			.catch((error) => {
				//	console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
			
			}
			//for aao----
			if(usrLevel===30){
			await axios.put(`/initialOccupationReturnTransactions/bulkSubmitIorsAao`, data)
			.then((response) => {
				setDisabled(false);
				if (response.data !== null)
					setMesg(response.data);
 

			})
			.catch((error) => {
				//	console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
			}
	}

	async function updateOccVac() {



		let proceed = window.confirm("You are about to update OccupationVacation Master.");
		if (!proceed)
			return;

		if (disabled)
			return;

		setDisabled(true);
		await axios.put("/initialOccupationReturnTransactions/updateOccVac")
			.then((response) => {
				setDisabled(false);
				setMesg(response.data);

			})
			.catch((error) => {
				//	console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}

	async function submitHighValue(id) {
		console.log("----line--149---:" + id);

		//	if(disabled)
		//		return;

		//		setDisabled(true);
		await axios.put(`/initialOccupationReturnTransactions/submitHighValue/${id}`)
			.then((response) => {
				//		setDisabled(false);
				setMesg(response.data[0]);
				if (response.data[1] !== null)
					setData(response.data[1]);
				console.log("reponse status--------------" + response.status);


			})
			.catch((error) => {
				//	console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}

	async function approveBulk() {
	/*	console.log(">>>>>Demand List----:" + data);
		console.log(">>>>>Demand List----:" + data);
		let i = 0, fname = "NA";
		if ((rentBillType !== null && rentBillType.length === 0) || rentBillType === null) {
			alert("No file name given ");
			return;
		}
		if (data.length === 0) {
			alert("No records exist with this Rent Bill Type");
			return;
		}
		for (i = 0; i < data.length; i++) {
			if (fname !== "NA") {
				if (data[i].uploadFileName !== fname) {
					alert("Selection contains multiple file");
					return;
				}
			}

			fname = data[i].uploadFileName;

		}*/

		let proceed = window.confirm("You are about to approve file containing " + data.length + " records.");
		if (!proceed)
			return;

		if (disabled)
			return;

		setDisabled(true);
		await axios.put(`/initialOccupationReturnTransactions/bulkApproveIors`, data)
			.then((response) => {
				setValidRec(response.data[1]);
				setInvalidRec(response.data[2]);
				if (response.data[2].startsWith("Selected")) {
					setMesg(response.data[3]);
				} else {
					setMesg(response.data[0]);
				}
				console.log("reponse status--------------" + response.status);
				//	setFundList([]);
				let updatedRecords = [...data];
				console.log(updatedRecords);
				setData(updatedRecords);
				setUpdate(!update);

			})
			.catch((error) => {
				//	console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}
	const updateCheckBoxAll = (e) => {
		// console.log("..."+e.target.checked+"--"+index);

		let newData = [...data];
		for (var k in newData) {
			newData[k].select = e.target.checked;
		}
		setData(newData);


	}
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
	const columns = useMemo(() => [

		{
			Header: <input type="checkbox" onChange={updateCheckBoxAll} />,
			accessor: "select",
			Cell: ({ row }) => (
				<>
				<div>
					{((usrLevel<30 &&row.original.action !== 'edit' && row.original.recordStatus === 'P') &&
						row.original.reason == null) &&
						<input type="checkbox" onChange={handleCheckBox(row.index)} checked={data[row.index]['select']} />
					}

				</div>
				<div>
					{(usrLevel===30 || usrLevel >30) &&
						<input type="checkbox" onChange={handleCheckBox(row.index)} checked={data[row.index]['select']} />
					}

				</div>
				</>

			)

		},

		{
			Header: 'Action',
			Cell: ({ row }) => (
				<div>
					{row.original.action != null && row.original.action.includes("edit") &&
						<Link to={"/initialOccupationReturnTransactions/" + row.original.id}>
							<button className=" w-16 m-0 p-0 " > Edit </button>
						</Link>
					}

					{(row.original.recordStatus != null && row.original.recordStatus === 'P') &&
						(row.original.reason !== null && row.original.reason.includes('Refund%')) &&
						<div>
							<label className="text-blue-500"> Click on High Value Credit
							</label>
						</div>


					}

				</div>
			)
		},


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
			Header: "Occupation Date",
			accessor: 'occupationDate',
			Cell: ({ row }) => (
				<div>
					<label>{row.original.occupationDate}</label>
				</div>
			),
		},

		{
			Header: "Vacation Date",
			accessor: 'vacationDate',
			Cell: ({ row }) => (
				<div>
					<label>{row.original.vacationDate}</label>
				</div>
			),
		},

		{
			Header: "Rent Bill Details",
			accessor: "rentBillNo",

			Cell: ({ row }) => (
				<div>
					<div>
						<label>Reference Bill No : {row.original.referenceBillNo}</label>
					</div>
					<div>
						<label>Reference Bill Date : {row.original.referenceBillDate}</label>
					</div>
					<div>
						<label>Rent Bill No : {row.original.rentBillNo}</label>
					</div>
					<div>
						<label>Rent Bill Date : {row.original.rentBillDate}</label>
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
					<div>
						<label>Excess Fur From Date : {row.original.excessFurFromDate}</label>
					</div>
					<div>
						<label>Excess Fur To Date : {row.original.excessFurToDate}</label>
					</div>
					<div>
						<label>Excess Fur Amount : {row.original.excessFurAmount}</label>
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
			Header: "Upload File Name",
			accessor: 'uploadFileName',
			Cell: ({ row }) => (
				<div>
					<label>{row.original.uploadFileName}</label>
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
	const handleP = (pp) => {
		console.log(pp);
		setPage(pp);
	}
	const handlePageSize = (pp) => {
		console.log(pp);
		//   setPageSize(pp);
	};

	const handleCrList = (event) => {

		setShowCrList(true);

	}
	const handleOccVac = (event) => {

		setOccVacList(true);

	}
	const ShowCrList = () => {

		const handleP = (pp) => {
			console.log(pp);
			setPage(pp);
		}
		function refreshPage() {
			window.location.reload(false);
		}
		const columns = useMemo(() => [



			{
				Header: 'Action',
				Cell: ({ row }) => (
					<div>
						{row.original.action != null && row.original.action.includes("edit") &&

							<Link to={"/initialOccupationReturnTransactions/" + row.original.id}>
								{console.log(`** panel width ${row.original.id}`)}
								<button className=" w-16 m-0 p-0 " > Edit </button>
							</Link>
						}

					</div>
				)
			},


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
				Header: "Occupation Date",
				accessor: 'occupationDate',
				Cell: ({ row }) => (
					<div>
						<label>{row.original.occupationDate}</label>
					</div>
				),
			},

			{
				Header: "Vacation Date",
				accessor: 'vacationDate',
				Cell: ({ row }) => (
					<div>
						<label>{row.original.vacationDate}</label>
					</div>
				),
			},

			{
				Header: "Rent Bill Details",
				accessor: "rentBillNo",

				Cell: ({ row }) => (
					<div>
						<div>
							<label>Reference Bill No : {row.original.referenceBillNo}</label>
						</div>
						<div>
							<label>Reference Bill Date : {row.original.referenceBillDate}</label>
						</div>
						<div>
							<label>Rent Bill No : {row.original.rentBillNo}</label>
						</div>
						<div>
							<label>Rent Bill Date : {row.original.rentBillDate}</label>
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
						<div>
							<label>Excess Fur From Date : {row.original.excessFurFromDate}</label>
						</div>
						<div>
							<label>Excess Fur To Date : {row.original.excessFurToDate}</label>
						</div>
						<div>
							<label>Excess Fur Amount : {row.original.excessFurAmount}</label>
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
				Header: "Upload File Name",
				accessor: 'uploadFileName',
				Cell: ({ row }) => (
					<div>
						<label>{row.original.uploadFileName}</label>
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

						{row.original.approved === true ? 'Y' : 'N'}
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



		], [crData, page, setPage])

		return (
			<div className="min-h-screen bg-green-100 text-gray-700">
				<div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">

					<div className="-mt-2 max-h-1 py-0 ml-0">
						<TablePageAdj columns={columns} data={crData} newpage={page} parentCallback={handleP} className="table-auto" />

						<div className="mt-2 ml-4">

							<button className="w-40 m-2 p-0 bg-red-500 hover:bg-red-700" onClick={refreshPage}>Back To Main List</button>
						</div>
					</div>
				</div>

			</div>
		);

	}

	const handleOccVacChange = (e) => {
		console.log(e.target.value);
		setOptionType(e.target.value);

	};
	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
					<h1 className="text-xl font-semibold">Initial Occupation Return Transactions(IOR)</h1>
					<div className="text-red-500">{mesg}</div>
					{usrLevel > 30 &&
						<>
							<div className="text-red-500">Total Valid Records:{validRec}</div>
							<div className="text-red-500">Total Invalid Records:{invalidRec}</div>
						</>
					}
					<div className="flexContainer">

						<div>
							<input type="text" name="search" placeholder="Cdao No"
								onBlur={e => setInputText(e.target.value)}
								className="pl-2 -ml-2 inputField flex-initial" />
						</div>

						{usrLevel < 30 &&
						<div>



							<select name="rentType" placeholder="rent type" className="form-control py-0"
								onBlur={e => setInputText(e.target.value)} onChange={handleOccVacChange} >
								<option value="select">--Select--</option>
								<option key="1" value="occ">Occupation</option>
								<option key="2" value="vac">Vacation</option>
								<option key="3" value="rev">Revision</option>


							</select>
						</div>
						}
						<div>
							<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>

						</div>


						{usrLevel < 30 &&
						<div>
							<Link to={"/initialOccupationReturnTransactions/new"}>
								<button className=" w-40 ml-8 p-0 h-6 -mt-2" > Add Iors </button>
							</Link>
						</div>
						}
						<div>
							{(usrLevel < 30 && submitted === true) &&
								<button type="button" onClick={updateOccVac} disabled={disabled} className=" w-40 ml-8 p-0 h-6 -mt-2">
									{disabled && (
										<span className="spinner-grow spinner-grow-sm"></span>
									)

									} Update OccVac</button>
							}
						</div>
						<div>
							{usrLevel < 30 &&
								<button type="button" onClick={handleCrList} className=" w-46 ml-8 p-0 h-6 -mt-2">High Value Credit</button>
							}
						</div>


					</div>
					{showCrList === true &&
						<ShowCrList />
					}
					<div className="text-blue-500">
						Edit Button will appear for "Invalid" Records. Click on Record Status Column to view "Invalid" Records at the top
					</div>
					<div className="-mt-2 max-h-1 py-0 ml-0">

						<TablePageAdj columns={columns} data={data} newpage={page} parentCallback={handleP}
							parentCallbackPageSize={handlePageSize} className="table-auto" />
						<div>
							{(usrLevel < 30) &&
								<button type="button" onClick={submitBulk} disabled={disabled} className="w-36 m-2 p-0">
									{disabled && (
										<span className="spinner-grow spinner-grow-sm"></span>
									)

									} Process File</button>
							}
							{(usrLevel === 30) &&
								<button type="button" onClick={submitBulk} disabled={disabled} className="w-36 m-2 p-0">
									{disabled && (
										<span className="spinner-grow spinner-grow-sm"></span>
									)

									} Submit File</button>
							}
							{(usrLevel > 30) &&
								<button type="button" onClick={approveBulk} className="w-36 m-2 p-0"> Approve File</button>
							}

						</div>

					</div>
				</div>

			</main>
		</div>
	);
}

export default withRouter(InitialOccupationReturnTransactionList);

