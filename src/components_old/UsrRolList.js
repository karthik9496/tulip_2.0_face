import { useState, useEffect, useMemo } from 'react';
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { withRouter, Link, useParams, useHistory } from "react-router-dom";
import LiveSearch from '../utils/LiveSearch';

function UsrRolList() {

	const [data, setData] = useState([]);
	//const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [usrId, setUsrId] = useState("");
	const [inputText, setInputText] = useState('');
	const [entity, setEntity] = useState({});
	//const [state, setState] = useState({});	

	let { id } = useParams();
	let history = useHistory();


	useEffect(() => {
		let fetching = false;
		console.log(id);
		async function fetchData() {
			if (!fetching)
				await axios.get(`/usrs/${id}/rols`)
					.then((response) => {
						setData(response.data);
						console.log(response.data);
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


		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);


	async function remove(id) {
		await axios.delete(`/rols/${id}`)
			.then(() => {
				//console.log(data);
				let updatedRecords = [...data].filter((i) => i.id !== id);
				console.log(updatedRecords);
				setData(updatedRecords);
				//setUpdate(!update);
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


	//const handleCheckbox = index => (e) => {
	const handleCheckbox = index => (e) => {
		
		//console.log(checkedObj);
		console.log(index + e.target.value);

		//let key = index;
		let item = data[index];
		let val = item['updated'];
		if (val === "on" || val === true) {
			val = false;
		} else {
			val = true;
		}

		item['updated'] = val;
		let newData = [...data];
		newData[index] = item;
		setData(newData);
		console.log(data);		
	}

	//{checked[row.index]}
	const columns = useMemo(() => [

		{
			Header: 'Existing',
			accessor: 'existing',
			Cell: ({ row }) => (
				<div>
					<input type="checkbox" checked={row.values.existing} disabled />
				</div>
			)
		},
		{
			Header: 'Updated',
			accessor: 'updated',
			Cell: ({ row }) => (
				<div>
					<input type="checkbox" onChange={handleCheckbox(row.index)} checked={data[row.index]['updated']} />
				&nbsp;&nbsp; {data[row.index]['updated'] === true ? 'Y' : 'N'}
				</div>
			)
		},

		{
			Header: "Role Name",
			accessor: 'rolName',
		},

		{
			Header: "Section",
			accessor: 'sectionName',// Change this
		},
		
/*		

		{
			Header: "Activity Brief",
			accessor: 'activityBrief',
		},



		{
			Header: "Record Status",
			accessor: 'recordStatus',
		},


		
		{
			Header: "Login Name",
			accessor: 'loginName',
			Filter: SelectColumnFilter,  // new
			filter: 'includes',
		},
		*/
	], [data])


	/*
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
	
	const rolList = () => {
		data.map(item => {
			return (
				<div>
					item.rolname
					<input type="checkbox" />
				</div>
			);
		})
	}
*/
	const onError = (errors, e) => console.log(errors, e);

	//All foreign keys
	const parentData = {
		usr: {
			title: "Search Users - Account No or Name",
			url: "usrs",
			searchList: ["accountNo", "usrName"],
			fkEntity: "dummy", //LiveSearch expects fk, so give a dummy
			preload: false,
		},
	}


	//Callback for child components (Foreign Keys)
	const callback = (childData) => {
		console.log(childData);
		history.push('/usrs/' + childData.entity.id + '/rols');

	};

	const errorCallback = (err) => {
		//console.log(err);
		setServerErrors(err);
	}

	//console.log(entity);

	const handleInputChange = (e) => {
		//console.log(e.target.value);
	};

	const saveRoles = () => {
		console.log(data);
		let saving = false;
		console.log(id);
		async function saveData() {
			if (!saving)
				await axios.put(`/usrs/${id}/rols`, data)
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
		saveData();

		return () => { saving = true; }
	}


	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className=" ">
					{/*
					<h1 className="text-xl font-semibold">User Roles</h1>
					
					<div className="flexContainer">
						<input type="text" name="search" 
						onChange={e => setInputText(e.target.value)} placeholder="Search Not Yet Implemented"
							onKeyPress={handleKeyPress}
							className="pl-2 -ml-2 inputField flex-initial" />
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
					</div>
					*/}

					<h1 className="text-xl font-semibold ml-4">User Roles</h1>

					<div className=" ml-2 flex flex-wrap content-start ...">
						<LiveSearch name="usr" onChange={handleInputChange}
							parentData={parentData.usr} parentCallback={callback}
							fkEntity={entity.usr} classname=" flex flex-wrap content-start " />
						<div>
							<button type="submit" onClick={saveRoles} className=" mt-3  w-24  " >Save Roles</button>
						</div>
					</div>


				</div>
				<div className="-mt-2 max-h-1 py-0 ml-0">
					<Table columns={columns} data={data} className="table-auto" />
				</div>
			</main>

		</div>
	);
}

export default withRouter(UsrRolList);

