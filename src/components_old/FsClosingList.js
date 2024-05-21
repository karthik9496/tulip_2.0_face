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
import { withRouter, Link, useHistory } from "react-router-dom";
import TablePage from '../utils/TablePage';


function FsClosingList() {

	let history = useHistory();

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');


	const [usrLevel, setUsrLevel] = useState('');
	const [mesg, setMesg] = useState([]);
	const [lightTheme, setLightTheme] = useState(true);
	const [disabled, setDisabled] = useState(false);

	 
	const [fs, setFs] = useState(false);
	const [loading, setLoading] = useState(false);
	const [payBatch, setPayBatch] = useState('');
	const [fundBatch, setFundBatch] = useState('');
	const [payAmtBatch, setPayAmtBatch] = useState(0);
	const [fundAmtBatch, setFundAmtBatch] = useState(0);
	const [ecs, setEcs] = useState(false);
	const [ecsMesg, setEcsMesg] = useState('');
	const [empId,setEmpId]=useState(0);
	
	



	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			 
			if (!fetching)
				await axios.get(`/lpcRegisters/fsClosingList?search=` + search)
					.then((response) => {
						setData(response.data);
						setEmpId(response.data[0].employee.id);
						console.log(">>>>Usr Employee Level is----:" + response.data[0].employee.id);
						setUsrLevel(response.data[0].usrLevel);

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




	async function cancel(id) {
		await axios.put(`/lpcRegisters/cancelFsEntry/${id}`)
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

	async function rollBack(id) {
		await axios.put(`/lpcRegisters/rollBack/FsEntry/${id}`)
			.then((response) => {
				setMesg(response.data);
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
	useEffect(() => {
		let fetching = false;
		async function fetchUsrData() {
			if (!fetching)
				console.log(">>>>Usr Level is -----:" + usrLevel);
			await axios.get(`/lpcRegisters/userDesg`)
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

	}, [data]);



	async function ecsGeneration(id) {
		await axios.put(`/lpcRegisters/miscFs/ecsGeneration/${id}`)
			.then((response) => {
				console.log("----ecs--:" + response.data + "--" + response.data[0] + "--" + response.data[4]);
				setPayBatch(response.data[1]);
				setPayAmtBatch(response.data[0]);
				setFundBatch(response.data[3]);
				setFundAmtBatch(response.data[2]);
				setEcs(true);


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
	async function close(id) {
		setDisabled(true);
		await axios.put(`/lpcRegisters/regFsClosing/close/${id}`)
			.then((response) => {
				setMesg(response.data);
				//console.log(data);
				let updatedRecords = [...data].filter((i) => i.id !== id);
				console.log(updatedRecords);
				setData(updatedRecords);

				setUpdate(!update);
				setDisabled(false);
			})
			.catch((error) => {
				console.log(error);
				setDisabled(false);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}

	async function reClose(id) {
		setDisabled(true);
		await axios.put(`/lpcRegisters/regFsClosing/reClose/${id}`)
			.then((response) => {
				setMesg(response.data);
				//console.log(data);
				let updatedRecords = [...data].filter((i) => i.id !== id);
				console.log(updatedRecords);
				setData(updatedRecords);

				setUpdate(!update);
				setDisabled(false);
			})
			.catch((error) => {
				console.log(error);
				setDisabled(false);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}

	/*async function fetchEncash(empId,id) {
	setDisabled(true);
		await axios.put(`/lpcRegisters/fetchEncashDo2/${empId}/${id}`)
			.then((response) => {
				setMesg(response.data);
				//console.log(data);
				let updatedRecords = [...data].filter((i) => i.id !== id);
				console.log(updatedRecords);
				setData(updatedRecords);
				
				setUpdate(!update);
				setDisabled(false);
			})
			.catch((error) => {
				console.log(error);
				setDisabled(false);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}*/


	async function viewMps(id) {
		console.log("=======:" + id);
		let fname = '';
		await axios
			.get(`/lpcRegisters/viewMps/${id}`)
			.then((response) => {
				fname = response.data[0];

				if (response.data[1] !== null && response.data[1] !== 'ok')
					setServerErrors(response.data[1]);
				setDisabled(false);
				setLoading(false);
				console.log(fname);
				if (fname != null && fname.length > 0) {
					axios({
						url: `/lpcRegisters/fsMps/load/` + fname,
						method: 'GET',
						responseType: 'blob', // important
					}).then((res) => {
						console.log(res.data);
						const url = URL.createObjectURL(new Blob([res.data]));
						const pdfWindow = window.open();
						pdfWindow.location.href = url;
						//const link = pdfWindow.location.href;
						//const link = document.createElement('a');
						//link.href = url;
						//link.setAttribute('download', fname);

						//document.body.appendChild(link);
						//link.click();
					});
				}

			})
			.catch((error) => {
				console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response) setServerErrors(error.response.data.error);
				else setServerErrors(error.Error);
			});
	}


	const handleEcs = (event) => {
		setEcs(true);
	}

	const columns = useMemo(() => [
		{
			Header: 'Action',
			Cell: ({ row }) => (
				<div>
					<div>
						{(row.original.rejectionReason != null && row.original.rejectionReason === 'Entry Approved' &&
							row.original.dak.dakType.description === 'FSENCASH' && (row.original.fsLeaveEncashmentApproved === null ||
								row.original.fsLeaveEncashmentApproved === false) && usrLevel < 30) &&
							<Link to={"/lpcRegisters/fetchEncashDo2/" + row.original.id}>
								<button className="w-32 m-0 p-0 bg-green-500 hover:bg-green-700 " > Close L.E. </button>
							</Link>
						}
					</div>
					<div>
						{(row.original.rejectionReason != null && row.original.rejectionReason === 'Reclosing Done' &&
							row.original.dak.dakType.description === 'FSENCASH' && (row.original.fsLeaveEncashmentApproved === null ||
								row.original.fsLeaveEncashmentApproved === false) && usrLevel < 30) &&
							<Link to={"/lpcRegisters/fetchEncashDo2/" + row.original.id}>
								<button className="w-36 m-0 p-0 bg-green-500 hover:bg-green-700 " >Reclose L.E. </button>
							</Link>
						}
					</div>
					<div>
						{(row.original.rejectionReason != null && row.original.rejectionReason.startsWith("FS Submitted by Auditor") &&
							row.original.dak.dakType.description === 'FSENCASH' && (row.original.fsLeaveEncashmentApproved === null ||
								row.original.fsLeaveEncashmentApproved === false) && row.original.action !== null && row.original.action === 'submission' && usrLevel === 30) &&
							<Link to={"/lpcRegisters/fetchEncashDo2/" + row.original.id}>
								<button className="w-32 m-0 p-0 bg-green-500 hover:bg-green-700 " > Leave Encashment </button>
							</Link>
						}
					</div>
					<div>
						{(row.original.rejectionReason != null && row.original.rejectionReason.startsWith("FS Submitted by Aao") &&
							row.original.dak.dakType.description === 'FSENCASH' && (row.original.fsLeaveEncashmentApproved === null ||
								row.original.fsLeaveEncashmentApproved === false) && row.original.action !== null && row.original.action === 'approval' && usrLevel > 30) &&
							<Link to={"/lpcRegisters/fetchEncashDo2/" + row.original.id}>
								<button className="w-32 m-0 p-0 bg-green-500 hover:bg-green-700 " > Leave Encashment </button>
							</Link>
						}
					</div>

					{' '}
 					{(row.original.rejectionReason != null && row.original.rejectionReason === 'Entry Approved' &&
						row.original.dak.dakType.description === 'FSFUND' && (row.original.fsFundApproved === null ||
							row.original.fsFundApproved === false) && usrLevel < 30) &&
						<Link to={"/fundSummarys/fetchFundSummarys/" + row.original.id}>
								<button className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 " > Fund </button>
							</Link>
					}
					{(row.original.rejectionReason != null && row.original.rejectionReason === 'Reclosing Done' &&
						row.original.dak.dakType.description === 'FSFUND' && (row.original.fsFundApproved === null ||
							row.original.fsFundApproved === false) && usrLevel < 30) &&
						<Link to={"/fundSummarys/fetchFundSummarys/" + row.original.id}>
								<button className="w-28 m-0 p-0 bg-red-500 hover:bg-red-700 " >Reclose Fund </button>
							</Link>
					}
					
			 
					{' '}
					{(row.original.rejectionReason != null && (row.original.rejectionReason.startsWith("FS Submitted by Auditor") ||
					row.original.rejectionReason.startsWith("FS Submitted by Aao"))&&
						row.original.dak.dakType.description === 'FSFUND' && (row.original.fsFundApproved === null ||
							row.original.fsFundApproved === false) && usrLevel>= 30) &&
						<button
							className="w-16 m-0 p-0 bg-green-500 hover:bg-green-700 "
							onClick={() => reClose(row.original.id)}
						>	Reclose Fund	</button>
					}
					 
					 
					{' '}

					{(row.original.dak.dakType.description === 'FSFUND' && (row.original.rejectionReason != null &&
						row.original.rejectionReason !== 'Entry Approved')) &&
						<button
							className="w-24 m-0 p-0 bg-blue-500 hover:bg-blue-700 "
							onClick={() => viewMps(row.original.id)}
						>	View Dsop 	</button>
					}
					{''}

					{(usrLevel > 30 && (row.original.dak.dakType.description === 'FSFUND' && (row.original.fsFundApproved === null ||
						row.original.fsFundApproved === false) || (row.original.dak.dakType.description === 'FSENCASH' &&
							(row.original.fsLeaveEncashmentApproved === null ||
								row.original.fsLeaveEncashmentApproved === false)))) &&
						<button
							className="w-20 m-0 p-0 bg-yellow-500 hover:bg-yellow-700 "
							onClick={() => rollBack(row.original.id)}
						>	Roll Back 	</button>
					}



				</div>
			)
		},
		{
			Header: "FS Type",
			accessor: 'dak.dakType.description',
			Cell: ({ row }) => (
				<div>

					<label>{row.original.dak.dakType.description}</label>
				</div>
			)
		},
		{
			Header: "DakId No",
			accessor: 'dak.dakidNo',
		},
		{
			Header: "Cdao No",
			accessor: 'employee.cdaoNo', 
		},
		
		{
			Header: "Check Digit",
			accessor: 'employee.checkDigit',
		},
		
		{
			Header: "Officer Name",
			accessor: 'employee.officerName', 
		},
		
		{
			Header: "Stop Pay Description",
			accessor: 'stopPayDescription',
		},
		
		{
			Header: "Fs Basic Pay",
			accessor: 'fsBasicPay',
		},
		
		{
			Header: "Fs Da",
			accessor: 'fsDa',
		},
		
		{
			Header: "Fs Encash Amount",
			accessor: 'fsEncashAmount',
		},
		{
			Header: "Fs Encash Days",
			accessor: 'fsEncashDays',
		},
		
		{
			Header: "WithHeld Amount",
			accessor: 'withheldAmount',
		},
		
		{
			Header: "Leave Encash Payment Amount",
			accessor: 'fsLeaveEncashmentPaymentAmount',
		},
		{
			Header: "Dli",
			accessor: 'dli',
		},
		{
			Header: "Service Gratuity",
			accessor: 'serviceGratuity',
		},
		{
			Header: "Fs Fund",
			accessor: 'fsFund',
		},
		
		
		{
			Header: "Qe",
			accessor: 'monthEnding',
			Filter: SelectColumnFilter,   
			filter: 'monthEnding',
		},
		
		{
			Header: "Discharge Date",
			accessor: 'dischargeDate',
			Filter: SelectColumnFilter,   
			filter: 'dischargeDate',
		},
		
		{
			Header: "Record Status",
			accessor: 'recordStatus',
		},
		
			{
			Header: "Entry Approved",
			accessor: 'entryApproved',
			Cell: ({ row }) => (
				<div>
				
					 {data[row.index]['entryApproved'] === true ? 'Y' : 'N'}
				</div>
			)
		},
		
		{
			Header: "Fs Approved",
			accessor: 'fsApproved',
			Cell: ({ row }) => (
				<div>
				
					 {data[row.index]['fsApproved'] === true ? 'Y' : 'N'}
				</div>
			)
		},
		
		 
		
		
		{
			Header: "Rejection Reason",
			accessor: 'rejectionReason',
		},
		 
		{
			Header: "Entry Auditor Date",
			accessor: 'entryAuditorDate',
		},
		
		{
			Header: "Entry Aao Date",
			accessor: 'entryAaoDate',
		},
		
		{
			Header: "Entry Ao Date",
			accessor: 'entryAoDate',
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

	 
	return (

		<div className={lightTheme ? 'theme-light' : 'theme-dark'} style={disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}>
			<div className="min-h-screen bg-gray-100 text-gray-900">
				<h1 className="text-xl font-semibold">Final Settlement Module</h1>
				 
				<br />
				<br />

				 
					<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
						<div className="mt-2 ml-4">
							<div className="text-red-500">{mesg}</div>


							<div className="flexContainer">
								<div>
								<input type="text" name="search"
									onChange={e => setInputText(e.target.value)}
									onKeyPress={handleKeyPress}
									className="pl-2 -ml-2 inputField flex-initial" />
									</div>
									
									
									
								<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>


							
							 <div>
						<Link to={"/lpcRegisters/fsApprovalList"}>
						{usrLevel<=30 &&
								<button className=" w-40 ml-8 p-0 h-6 -mt-2" > Submit Fs Case </button>
								}
								{usrLevel>30 &&
								<button className=" w-40 ml-8 p-0 h-6 -mt-2" > Approve	 Fs Case </button>
								}
							</Link>
						 </div>
						</div>
						</div>



						<div className="-mt-2 max-h-1 py-0">
							<Table columns={columns} data={data} className="table-auto" />
						</div>

					</main>
				


			</div>
		</div>

	);
}

export default withRouter(FsClosingList);

