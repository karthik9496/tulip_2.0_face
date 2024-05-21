import { useState, useEffect, useMemo, useCallback } from 'react';
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import debounce from 'lodash';
import useDebouncedSearch from '../utils/useDebouncedSearch'

/*
const useSearch = () => useDebouncedSearch(text => searchAsync(text))

const searchAsync = async function (text){
	console.log(text);
}
*/
function CommissionControlList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const {register, handleSubmit, formState: { errors }, clearErrors } = useForm({});
	const [search, setSearch] = useState('a');
	const [key, setKey] = useState('page1');

	const useSearch = () => useDebouncedSearch(text => searchAsync(text))

	const searchAsync = async function(text) {
		console.log(text);
	}
	
	const { inputText, setInputText, searchResults } = useSearch();

	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if (!fetching)
				await axios.get('/commissionControls?search=' + search)
					.then((response) => {
						console.log(response.data);
						setData(response.data);
					})
					.catch((error) => {
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
		await axios.delete(`/commissionControls/${id}`)
			.then(() => {
				//console.log(data);
				let updatedRecords = [...data].filter((i) => i.id !== id);
				console.log(updatedRecords);
				setData(updatedRecords);
				setUpdate(!update);
			})
			.catch((error) => {
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}
	
		async function submission(id) {
		await axios.put(`/commissionControls/${id}/submitCc`)
		.then(() => {
				//console.log(data);
				let updatedRecords = [...data].filter((i) => i.id !== id);
				console.log(updatedRecords);
				setData(updatedRecords);
				setUpdate(!update);
			})
			.catch((error) => {
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}
	
	async function approve(id) {
		await axios.put(`/commissionControls/approveCc/${id}`)
		.then(() => {
				//console.log(data);
				let updatedRecords = [...data].filter((i) => i.id !== id);
				console.log(updatedRecords);
				setData(updatedRecords);
				setUpdate(!update);
			})
			.catch((error) => {
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
				{((row.original.action==='Submission by AAO.' || !row.original.action) && (row.original.approved===false || !row.original.approved)) &&
					<Link to={"/commissionControls/" + row.original.id}>
						<button className=" w-16 m-0 p-0 " > Edit </button>
					</Link>
					}
					{' '}
					{(row.original.action==='Submission by AAO.' || row.original.action==='Submission by SAO/AO.') &&
					<button
						className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
						onClick={() => submission(row.original.id)}
					>	Submit 	</button>
					}
					{' '}
					{(row.original.action==='approval') && 
					<button
						className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
						onClick={() => approve(row.original.id)}
					>	Approve 	</button>
					 
					}
				</div>
			)
		},
		
		{
			Header: "Dak",
			accessor: 'dak.dakidNo',
		},
		 
		{
			Header: "GoI Letter No",
			accessor: 'goiLetterNo',
		},
		{
			Header: "GoI Letter Date",
			accessor: 'goiLetterDate',
		},
		{
			Header: "Army Agency",
			accessor: 'armyAgency',
		},
		{
			Header: "Total No of Officers",
			accessor: 'totalOfficers',
		},
		{
			Header: "Commission Date",
			accessor: 'commissionDate',
		},
		{
			Header: "CommissionType",
			accessor: 'commissionType.typeName',
		},

		{
			Header: "Reason",
			accessor: 'reason',
		},
		{
			Header: "Record Status",
			accessor: 'recordStatus',
		},
		{
			Header: "Approved",
			accessor: 'approved',
		},
 
	], [data])


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
					<h1 className="text-xl font-semibold">New Commission Control</h1>
					<div className="flexContainer">
					<div className="flexContainer">
						<input type="text" name="search" placeholder="Search by DakId No"
						onChange={e => setInputText(e.target.value)}
							onKeyPress={handleKeyPress}
							className="pl-2 -ml-2 inputField flex-initial" />
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
						 
					</div>	
					
					<div>

							<Link to={"/commissionGois"}>
								<button className=" w-38 ml-8 p-0 h-6 -mt-2" >Add GoI Details </button>
							</Link>
						</div>	
						</div>			
				</div>
				<div className="mt-2 max-h-1">
					<Table columns={columns} data={data} className="table-auto" />
				</div>
			</main>
		</div>
	);
	
	 
}

export default withRouter(CommissionControlList);

