import { useState, useEffect, useMemo } from 'react';
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { withRouter, Link } from "react-router-dom";

function FileList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');

	useEffect(() => {

		let fetching = false;
		async function fetchData() {
			if (!fetching)
				await axios.get('/files')
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

	}, []);


	const download = (fileName) => {
		console.log(fileName);
		axios({
			url: `${process.env.REACT_APP_BASE_URL}/files/` + fileName, //XXXXXXXX localhost
			method: 'GET',
			responseType: 'blob', // important
		}).then((response) => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', fileName);
			document.body.appendChild(link);
			link.click();
		});
	}

	//"https://localhost:8443/files/falcon.txt"

	const columns = useMemo(() => [
		{
			Header: 'Action',
			Cell: ({ row }) => (
				<div>
					<a href={`${process.env.REACT_APP_BASE_URL}/files/` + row.original.name}>
						<button className=" w-16 m-0 p-0 " > Download </button>
					</a>
				</div>
			)
		},
		{
			Header: "File Name",
			accessor: 'name',
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
			<main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
					<h1 className="text-xl font-semibold">Files</h1>
				</div>
				<div className="-mt-2 max-h-1 py-0">
					<Table columns={columns} data={data} className="table-auto" />
				</div>
			</main>
		</div>
	);
}

export default withRouter(FileList);

