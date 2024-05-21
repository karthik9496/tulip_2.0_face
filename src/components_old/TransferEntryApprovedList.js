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
import { withRouter, Link } from "react-router-dom";

function TransferEntryApprovedList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	 

	useEffect(() => {
		 
		let fetching = false;
		async function fetchData() {
			if(!fetching)
			await axios.get('/transferEntrys/approved?search='+search)
				.then((response) => {
					if(response.data)
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
	
	async function submitTe(id) {
    await axios
      .put(`/transferEntrys/${id}/submitTe`)
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
  async function rollbackTe(id) {
    await axios
      .put(`/transferEntrys/rollBack/${id}`)
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

  async function approveTe(id) {
    await axios
      .put(`/transferEntrys/${id}/approveTe`)
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
			Header: "DakId",
			accessor: 'dak.dakidNo',// Change this
		},
		
		{
			Header: "Section",
			accessor: 'dak.section.sectionName',// Change this
		},
		{
			Header: "Month",
			accessor: 'teMonth',
		},
		
		{
			Header: "Section Code",
			accessor: 'sectionCode',// Change this
		},
		
		{
			Header: "Vr.Class",
			accessor: 'voucherClass',
		},
		
		 
		
		{
			Header: "Amount",
			accessor: 'amount',
		},
		
		
		
		 
		
		 
		
		 
		 {
			Header: "Narration",
			accessor: 'narration',
		},
		
		
		{
			Header: "Record Status",
			accessor: 'recordStatus',
		},
		{
			Header: "Reason",
			accessor: 'reason',
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
					<h1 className="text-xl font-semibold">Approved Transfer Entry</h1>
					 
					<div className="flexContainer">
					<div>
						<input type="text" name="search" 
						onBlur={e => setInputText(e.target.value)}
							onKeyPress={handleKeyPress} placeholder="dakid no"
							className="pl-2 -ml-2 inputField flex-initial" />
							</div>
							
							 
							 
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

export default withRouter(TransferEntryApprovedList);

