import { useState, useEffect, useMemo } from 'react';
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { withRouter, Link } from "react-router-dom";

function CbillTadaLtcInputList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	const [selectionType,setSelectionType]=useState('');
	
	 const [fileName,setFileName]=useState('');

	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if (!fetching)
			if(selectionType==='approved'){
				await axios.get('/cbillTadaLtcInputs?filter=approved&search=' + search)
					.then((response) => {
						setData(response.data);
						setSelectionType('pending');
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
			}else{
				await axios.get('/cbillTadaLtcInputs?search=' + search)
					.then((response) => {
						setData(response.data);
						setSelectionType('pending');
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
		fetchData();
		return () => { fetching = true; }

	}, [update, search]);


	async function approve(id) {
		await axios.put(`/cbillTadaLtcInputs/${id}/approveCbill`)
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
	
	 
		 
	async function tBillAdvMemo(id) {
		console.log("=======:" + id);
		await axios.put(`/cbillTadaLtcInputs/${id}/advanceRequisition`)
			.then((response) => {
				console.log(data);
				console.log(response.data);
						 const url = window.open(`${process.env.REACT_APP_BASE_URL}/files/${response.data}`);
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
	 
	async function submitCbill(id) {
		await axios.put(`/cbillTadaLtcInputs/${id}/submitCbill`)
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


	const handleClick = () => {
		let fetching = false;
		async function fetchData() {
			if (!fetching)
				await axios.get(`/cbillTadaLtcInputs?filter=approved`)
					.then((response) => {
						console.log(response.data);
						setData(response.data);
						setSelectionType('approved');
						 
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
	}
	
	  
	
	
	const columns = useMemo(() => [
		{
			Header: 'Action',
			Cell: ({ row }) => (
				<div>
					{(row.original.action != null && !(row.original.action.includes('Subm')) && !(row.original.action.includes('Appr'))) &&
						<Link to={"/cbillTadaLtcInputs/" + row.original.id}>
							<button className=" w-16 m-0 p-0 " > Edit </button>
						</Link>
					}
					{' '}
					{(row.original.action === 'Submission by AAO.') &&
						<button
							className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
							onClick={() => submitCbill(row.original.id)}
						>	Submit 	</button>
					}
					{' '}
					{(row.original.action === 'Approval by AO.') &&
						<button
							className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
							onClick={() => approve(row.original.id)}
						>	Approve 	</button>
					}
					{' '}
					{(row.original.recordStatus === 'V') &&
						<button
							className="w-28 m-0 p-0 bg-yellow-500 hover:bg-red-700 "
							onClick={() => tBillAdvMemo(row.original.id)}
						>	Print Adv Memo 	</button>
					}
				</div>
			)
		},
		{
			Header: "Dak",
			accessor: 'dak.dakidNo',// Change this
		},

		{
			Header: "Dak Id Ctrl",
			accessor: 'mailCtrlId',// Change this
		},


		 


		{
			Header: "Officer Name",
			accessor: 'employee.officerName',// Change this
		},

		{
			Header: "Cda No",
			accessor: 'cdaoNo',
		},

		{
			Header: "Check Digit",
			accessor: 'checkDigit',
		},


		{
			Header: "Month Ending",
			accessor: 'monthEnding',
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
					<h1 className="text-xl font-semibold">Cbill Tada Ltc Inputs</h1>
					<div className="flexContainer">
						<input type="text" name="search"
							onChange={e => setInputText(e.target.value)}
							onKeyPress={handleKeyPress}
							className="pl-2 -ml-2 inputField flex-initial" />
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
						<div>
							 
								<button onClick={handleClick} className=" w-24 m-0 p-0 " > Processed </button>
							 
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

export default withRouter(CbillTadaLtcInputList);

