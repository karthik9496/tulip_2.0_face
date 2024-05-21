/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By : 
 */

import { useState, useEffect, useRef, useMemo } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import * as yup from "yup";

import { yupResolver } from '@hookform/resolvers/yup';
import LiveSearch from '../utils/LiveSearch';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import addDays from 'date-fns/addDays'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Table from "../utils/Table";


const schema = yup.object({

	employee: yup.object().required('Required'),
	nameOfMember: yup.string().required('Required'),
	//dateOfBirth: yup.string().required('Required'),
	relation: yup.object().required('Required'),

	//gender: yup.string().required('Required'),

});



const FamilyDetailEdit = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();
	//console.log(id);

	let history = useHistory();

	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [loading, setLoading] = useState(true);
	const [empId, setEmpId] = useState(0);
	const [key, setKey] = useState('Page1');
	const [relationName, setRelationName] = useState(0);
	const [fdId, setFdId] = useState();
	const [dsop, setDsop] = useState(false);
	const [cdaoNo, setCdaoNo] = useState("");
	const [fmList, setFmList] = useState([]);
	const [nomineesPercentSum, setNomineesPercentSum] = useState(0);

	const [percent, setPercent] = useState(false);
	const [percentError, setPercentError] = useState("")



	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get('/familyDetails/' + id)
					.then((response) => {
						record = response.data;
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
					});

				const fields = [
					'id', 'dak', 'employee', 'cdaoNo', 'checkDigit', 'nameOfMember', 'dateOfBirth', 'relation',
					'gender', 'govtEmployee', 'dependant', 'statusOfMember', 'adopted',
					'dsopNomination', 'fromDate', 'toDate', 'reason', 'uid', 'pan',
					'email', 'auditorDate', 'aaoDate', 'aoDate', 'recordStatus', 'approved', 'nominationPercentage'
				];

				setRelationName(record?.relation?.relationName);

				fields.forEach(field => setValue(field, record[field]));
				if (!isCancelled) {
					setPercent(record.dsopNomination);
					setCdaoNo(record.cdaoNo);
					setFdId(record?.familyDetail?.id);
					setEntity(record);
					setState(prev => ({ ...prev, state: record }));
				}
			}

			fetchData();
			return () => {
				isCancelled = true;
			};
		}

	}, [id, setValue]);

	useEffect(() => {
		console.log("cdao no >>>> ", cdaoNo);

		async function fetchPercentageNomination() {

			await axios.get(`/familyDetails/cdaoNo/${cdaoNo}`)
				.then((response) => {
					console.log(response.data);
					setFmList(response.data);
				})
		}

		if (cdaoNo) fetchPercentageNomination();
	}, [cdaoNo]);

	useEffect(() => {
		function NomineesPercentSum() {

			let totalPercent = 0;

			fmList.map((item, index) => {

				if (item.nominationPercentage) {

					totalPercent += item.nominationPercentage;
				}
			})
			setNomineesPercentSum(totalPercent);
			console.log("total nominees percentage >>> ", totalPercent);
		}
		if (fmList) NomineesPercentSum();
	}, [fmList])

	function CheckPercentageSum(e) {

		const percentInput = Number(e.target.value);

		console.log(percentInput + nomineesPercentSum);

		if (percentInput + nomineesPercentSum <= 100) {

			setPercentError("");
			console.log("percent ok");

		} else if (percentInput + nomineesPercentSum > 100) {

			setPercentError(`Can't exceed 100% limit. Already ${nomineesPercentSum}%`);
			console.log("percent error");
		}
	}



	const onSubmit = (data, event) => {
		event.preventDefault();
		console.log(data);
		if (data.id) {
			axios.put("/familyDetails/" + data.id, data)
				.then((response) => {
					if (response.status === 200)
						history.push("/familyDetails");
				})
				.catch((error) => {
					//console.log(error.response.data);
					console.log("response--------" + error.response.status);

					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		} else {
			axios.post("/familyDetails", data)
				.then((response) => {
					console.log("aaaaaaaaaaa");
					console.log("reponse status--------------" + response.status + "--" + response.statusText + "----" + "-h--" + response.headers + "--" + response.data);
					if (response.status === 200)
						history.push("/familyDetails");

				})
				.catch((error) => {
					//console.log(error.response.data);

					if (error.response.status == 400)
						setServerErrors('Not Allowed');
					else
						setServerErrors('Error');
				});
		}

		// history.push("/familyDetails");
	}



	const onError = (errors, e) => console.log(errors, e);

	//All foreign keys. 
	// XXXXXX Add search fields and adjust the values as necessary
	const parentData = {




		employee: {
			title: "Employee",
			url: "employees",
			searchList: ['cdaoNo', 'officerName'], //XXXXXXXXX Add search fields
			fkEntity: "employee",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},

		relation: {
			title: "Relation",
			url: "relations",
			searchList: ['relationName'], //XXXXXXXXX Add search fields
			fkEntity: "relation",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},

	}

	//Callback for child components (Foreign Keys)

	const callback = (childData) => {

		setEntity(prev => ({ ...prev, [childData.fk]: childData.entity }));
		setValue(childData.fk, childData.entity);
		setCdaoNo(childData.entity.cdaoNo);
		//console.log(errors);
		// console.log(childData.fk+"--"+childData.entity.id);

		if (childData.fk === 'employee')
			setEmpId(childData.entity.id)



		clearErrors(childData.fk);

	};

	const errorCallback = (err) => {
		//console.log(err);
		setServerErrors(err);
	}

	const handleButtonClick = (e) => {
		history.push("/familyDetails");
	}



	const handleInputChange = (e) => {
		console.log(e.target.value);
		//	console.log("handle input change");


	};


	const columns = useMemo(
		() => [
			{
				Header: "Cdao No",
				accessor: "cdaoNo",
				Cell: ({ row }) => (
					<div>
						{row.original.cdaoNo}
					</div>
				),
			},
			{
				Header: "Officer Name",
				accessor: "employee.officerName",
			},
			{
				Header: "Name of Member",
				accessor: "nameOfMember",
			},
			{
				Header: "DOB",
				accessor: "dateOfBirth",
			},
			{
				Header: "Relation",
				accessor: "relation.relationName",
			},
			{
				Header: "Nomination Percentage",
				accessor: "nominationPercentage",
			},
		],
		[fmList]
	);



	return (
		<div className=" mx-auto ">
			<div className="max-w-xl  mx-auto " >

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 >{id === 'new' ? 'Add' : 'Edit'} Family Detail</h1>

					<div className="text-red-500">{serverErrors}</div>



					<div className="grid grid-cols-2 gap-0 ">



						<div >
							<LiveSearch
								name="employee"
								onChange={handleInputChange}
								parentData={parentData.employee} parentCallback={callback}
								fkEntity={entity.employee}
								errCallback={errorCallback} />
							<div className="text-red-500 ">{errors.employee?.message}</div>
						</div>

						<div>
							<label>Name of Member</label>
							<input type="text" name="nameOfMember" {...register("nameOfMember")}
							/>
							<div className="text-red-500">{errors.nameOfMember?.message}</div>
						</div>


						<div>
							<label>Date Of Birth</label>
							<input type="date" name="dateOfBirth" {...register("dateOfBirth")}
								className="form-control py-0" />
							<div className="text-red-500">{errors.dateOfBirth?.message}</div>
						</div>

						<div >
							<LiveSearch name="relation" onChange={handleInputChange}
								parentData={parentData.relation} parentCallback={callback}
								fkEntity={entity.relation} errCallback={errorCallback} />
							<div className="text-red-500 ">{errors.employee?.message}</div>
						</div>

						{/* DSOP */}
						<div>
							<div>
								<label>DSOP Nominee</label>
								<input
									type="checkbox"
									name="dsopNomination"
									{...register("dsopNomination")}
									onChange={(e) => {
										setDsop(e.target.value);
										setPercent(!percent);
									}}
								/>
							</div>


							{percent && <div>
								<label>Percentage</label>
								<input type="Number"
									name="nominationPercentage" maxLength={100}
									placeholder="%"
									{...register("nominationPercentage")}
									onChange={(e) => CheckPercentageSum(e)}
								/>
								{percentError && <div className="text-white bg-red-600 rounded-md">{percentError}</div>}
							</div>}
							<div>
							</div>
						</div>

						{/* NOK */}
						{/* <div>
							<div>
								<label>NOK Nominee</label>
								<input
									type="checkbox"
									name="nokNomination"
									{...register("nokNomination")}
									onChange={(e) => {
										setNok(!nok)
									}}
								/>
							</div>


							{nok && <div>
								<label>Percentage</label>
								<input type="Number"
									name="nokNominationPercentage" maxLength={100}
									placeholder="%"
									{...register("nokNominationPercentage")}
									//onChange={(e) => CheckPercentageSum(e)}
								/>
								{nokPercentError && <div className="text-white bg-red-600 rounded-md">{nokPercentError}</div>}
							</div>}
							<div>
							</div>
						</div> */}
					</div>


					<div className="px-2">
						<button type="submit" >Save</button>
					</div>

					<div className="px-2">
						<button type="button" onClick={handleButtonClick} >Cancel</button>
					</div>


				</form>
			</div>
			<div className="mt-4">
				{fmList && <div>
					<h1 className="text-center">Nominee Record</h1>
					<Table columns={columns} data={fmList} className="table-auto" />
				</div>}
			</div>
		</div>
	);
};


export default withRouter(FamilyDetailEdit);