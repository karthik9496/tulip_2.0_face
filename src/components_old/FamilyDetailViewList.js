import { useState, useEffect, useMemo } from 'react';
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import useDebouncedSearch from '../utils/useDebouncedSearch'
import TableCopy from '../utils/TableCopy';

function FamilyDetailViewList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	
 

	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if(!fetching)
			await axios.get("/familyDetails/disabled?search=" + search)
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


	 
	async function disable(id) {
		await axios
		  .put(`/familyDetails/disable/${id}`)
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
			if (error.response) setServerErrors(error.response.data.error);
			else setServerErrors(error.Error);
		  });
	  }

	const columns = useMemo(() => [
		 
		{
			Header: "Action",
			Cell: ({ row }) => (
				<div>
					{row.original.action != null &&
                row.original.action.includes("disable") && (
                  <button
                    className="w-20 m-2 p-0 bg-red-500 hover:bg-red-700 "
                    onClick={() => disable(row.original.id, data)}
                  >
                    {" "}
                    Disable{" "}
                  </button>


                )}
				</div>

			),
		},
		{
			Header: "CDA_O_No",
			accessor: 'cdaoNo',
		},
		{
			Header: "Name of Member",
			accessor: 'nameOfMember',
		},
		
		{
			Header: "Date of Birth",
			accessor: 'dateOfBirth',
		},
		{
			Header: "Relation",
			accessor: 'relation.relationName',
		},
		{
			Header: "Record Status",
			accessor: 'recordStatus',
		},
		{
			Header: "Dependent",
			accessor: "dependant",
			//    Filter: SelectColumnFilter,
			//  filter: "includes",
			Cell: ({ row }) => (
			  <div>
				{row.original.dependant === true ? <span className="text-green-800">Dependent</span> : <span className="text-red-800">Not Dependent</span>}
			  </div>
			)
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
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main>
				<div className="mt-2 ml-4">
					<h1 className="text-xl font-semibold">Family Detail</h1>
					<div className="flexContainer">
						<input type="text" name="search" 
						onChange={e => setInputText(e.target.value)}
							onKeyPress={handleKeyPress} placeholder="cdao no"
							className="pl-2 -ml-2 inputField flex-initial" />
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0" >Search</button>
						 
						</div>					
				</div>
				<div className="-mt-2 max-h-1 py-0">
					<Table columns={columns} data={data} className="table-auto" />
				</div>
			</main>
		</div>
	);
}

export default withRouter(FamilyDetailViewList);

