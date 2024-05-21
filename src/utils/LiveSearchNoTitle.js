/**
@author Raja Reddy
October 2021
*/

import { useState, useEffect, useMemo } from "react";
import { withRouter } from "react-router-dom";
import debounce from 'lodash';

import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";
import useDebouncedSearch from '../utils/useDebouncedSearch'

const schema = yup.object({
	fkDisplay: yup.string().required('Required'),
	//age: yup.number().positive().integer().required(),
}).required();

function LiveSearchNoTitle({ parentData, parentCallback, fkEntity, errCallback }) {
	//console.log(parentData.title);

	//console.log(parentCallback);
	//console.log(fkEntity);
	//const { register, handleSubmit, reset, setValue, getValues, formState: { errors } } = useForm({});
	const { register, setValue, formState: { errors } } = useForm({});


	const initialState = {
		search: '',
		list: '',
		showList: false,
	}

	//Trying to set filters. Not working.
	let filterStr = '';
	//console.log(sessionStorage.getItem('filters'));


	const [state, setState] = useState(initialState);
	const useSearch = () => useDebouncedSearch((query) => searchAsync(query));
	const { inputText, setInputText, searchResults } = useSearch();

	//const searchAsync = async function(query) {
	const searchAsync = async (query) => {
		console.log(query);

		if (!parentData.preload) {
			let fetching = false;
			//async function fetchData(filters) {
			async function fetchData() {
				
				if (!fetching) {
					let filterStr = '';
					if (sessionStorage.getItem('filters')) {
						let filters = JSON.parse(sessionStorage.getItem('filters'));
						filters && filters.map(item => filterStr += item + ',');
						if(filterStr)
							filterStr = filterStr.substring(0, filterStr.length - 1);
						console.log(filterStr);
					}
					let url = `/${parentData.url}?search=${query}`;
					if (parentData.field)
						url += `&field=${parentData.field}`;
					if (filterStr)
						url += `&filters=${filterStr}`;
					console.log(url);
					await axios.get(url,
						//{params: {filters: filters}}
					).then((response) => {
						//console.log(query);
						//console.log(filters);
						//console.log(response.data);
						setState(prevState => ({
							...prevState,
							search: query,
							showList: true,
							list: response.data
						}));
					})
						.catch((error) => {
							if (error.response)
								errCallback(error.response.data.error);
							else
								errCallback(error.Error);
						});
				}
			}

			fetchData();
			return () => {
				fetching = true;
			};

		} else { // Data already prefetched. Just show the drop down list. XXXXXX Not being used
			console.log(state.list);
			setState(prevState => ({
				...prevState,
				search: query,
				showList: true,

			}));
		}
	}

	useEffect(() => {
		if (fkEntity) {
			let row = '';

			for (let field of parentData.searchList) {
				row += fkEntity[field] + " : ";
			}

			row = row.substring(0, row.length - 3);// Strip the last :
			//console.log(row);
			setValue('fkDisplay', row);
			setState(prevState => ({
				...prevState,
				search: row,
			}));
		}

		//}, [fkEntity, setValue]);
	}, [fkEntity]);



	const sendDataToParent = (foreignKeyEntity) => {
		parentCallback(foreignKeyEntity);
	};

	const setValueHandler = (item) => {
		let row = "";
		for (let field of parentData.searchList) {
			row += item[field] + " : ";
		}
		//Strip the last ' : '
		row = row.substring(0, row.length - 3);
		//row += item.id;
		console.log(row);
		setState(prev => ({
			...prev,
			search: row,
			showList: false,
		}));
		setValue('fkDisplay', row);
		//let dataToParent = { props: { entity: item } };
		let dataToParent = { fk: parentData.fkEntity, entity: item };

		console.log("ValueHandler");
		console.log(dataToParent);
		sendDataToParent(dataToParent);
	};




	const dropDownList = (item) => {
		const dropDownRow = (item) => {
			let row = "";
			for (let field of parentData.searchList) {
				row += item[field] + " : ";
			}
			//console.log(row);
			//Strip the last ':'
			row = row.substring(0, row.length - 3);
			return <div className="ml-4">{row}</div>;
		};

		return (
			<li key={item.id} onClick={() => setValueHandler(item)}
				className="border rounded bg-green-500 hover:bg-green-700 text-white font-bold">
				{dropDownRow(item)}
			</li>
		);
	};

	const sorter = (a, b) => {
		//return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
		let aRow = "";
		let bRow = "";
		for (let field of parentData.searchList) {
			aRow += a[field];
			bRow += b[field];
		}
		return aRow.toLowerCase().localeCompare(bRow.toLowerCase());
	};

	const multiFieldFilter = (item) => {
		let compositeField = "";
		for (let field of parentData.searchList) {
			compositeField += item[field];
		}
		return (
			compositeField
				.toLowerCase()
				.indexOf(state.search.toLowerCase()) >= 0
		);
	};

	const makeResult = (list) => {
		if (!list)
			return <li>No results!</li>;
		const newList = list.filter(multiFieldFilter);
		if (newList.length)
			return newList
				.slice(0, 7) //Get only 7 items
				.sort((a, b) => sorter(a, b)) //Sort alphabetically
				.map(dropDownList);
		return <li>No results!</li>;
	};

	const handleFocus = (event) => event.target.select();

	return (
		<div className="-px-2 -mx-2">
			<label >{fkEntity ? fkEntity[parentData.searchList[0]] : ''}</label>

			<input type="text" name="fkDisplay" {...register("fkDisplay")} placeholder="Search"
				onChange={e => setInputText(e.target.value)} onFocus={handleFocus}
				className="form-control py-0 max-w-xs"
			/>

			{state.showList}
			{state.search !== "" && state.showList ? (
				<ul>{makeResult(state.list)}</ul>
			) : (
				state.showList && (
					<span>
						<br />{" "}
					</span>
				)
			)}
		</div>
	);

}

export default withRouter(LiveSearchNoTitle);
