import { useState, useEffect } from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { withRouter, useParams, useHistory } from "react-router-dom";
//import { Container, Row, Col, Form } from 'react-bootstrap';
import LiveSearch from '../utils/LiveSearch';
//import DatePicker from 'react-datepicker';

const schema = yup.object({
	grievanceSource: yup.string().required('Required.'),
	monthEnding: yup.string().required('Required'),
	employee: yup.object().required('Required'),
	cdaoNo: yup.string().required('Required'),
	checkDigit: yup.string().required('Required'),
	webId: yup.string().required('Required'),
	emailId: yup.string().required('Required'),
	subject: yup.string().required('Required'),
	referenceNo: yup.string().required('Required'),
	grievanceBrief: yup.string().required('Required'),
	disposalNo: yup.string().required('Required'),
	disposalRemarks: yup.string().required('Required'),
	auditorRemarks: yup.string().required('Required'),
	aaoRemarks: yup.string().required('Required'),
	aoRemarks: yup.string().required('Required'),
	//age: yup.number().positive().integer().required(),
}).required();

const GrievanceEdit = () => {
	//const { register, handleSubmit, reset, setValue, getValues, formState: { errors }, clearErrors } = useForm({
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();
	console.log(id);

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});


	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				const result = await axios('/grievances/' + id);
				console.log(result.data);
				let d = result.data;
				const fields = ['id', 'grievanceSource', 'monthEnding', 'cdaoNo', 'checkDigit',
					'webId', 'emailId', 'subject', 'referenceNo', 'grievanceBrief',
					'disposalNo', 'disposalRemarks', 'auditorRemarks', 'aaoRemarks', 'aoRemarks'
				];
				fields.forEach(field => setValue(field, d[field]));

				if (!isCancelled) {
					setEntity(result.data);
					setState(prev => ({ ...prev, state: result.data }));
				}
			}

			fetchData();
			return () => {
				isCancelled = true;
			};
		}

	}, [id, setValue]);


	//Callback for child components (Forein Keys)
	const callback = (childData) => {
		//console.log("Parent Callback");
		setEntity(prev => ({ ...prev, employee: childData.props.entity }));
		setValue('employee', childData.props.entity);
		console.log(errors);
		clearErrors("employee");
	};


	const onSubmit = (data, event) => {
		event.preventDefault();
		console.log(data);
		if (data.id) {
			axios
				.put("/girevances/" + data.id, data)
				.then((response) => { })
				.catch((error) => {
					//console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		} else {
			axios.post("/grievances", data)
				.then((response) => { })
				.catch((error) => {
					//console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		}

		history.push("/grievances");
	}

	const onError = (errors, e) => console.log(errors, e);


	const parentData = {
		employee: {
			title: "Employee",
			url: "employees",
			searchList: ["cdaoNo", "officerName"],
			fkEntity: "employee",
			preload: false,
		}
	}

	console.log(entity);

	const handleInputChange = (e) => {
		console.log(e.target.value);
	};

	return (
		<div className="max-w-xl mx-auto ">
			<div className="w-full w-3/4  mx-auto " >

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1>{id === 'new' ? 'Add' : 'Edit'} Grievance </h1>
					{serverErrors}

					<div class="grid grid-cols-2 gap-0">

						<div >
							<label >Grievance Source</label>
							<input type="text" name="grievanceSource" {...register("grievanceSource")}
								className=" form-control py-0 "
							/>
							<div className="text-red-500">{errors.grievanceSource?.message}</div>
						</div>

						<div >
							<label >Month Ending</label>
							<input type="text" name="monthEnding" {...register("monthEnding")}
								className=" form-control py-0 "
							/>
							<div className="text-red-500">{errors.monthEnding?.message}</div>
						</div>

						<div >
							<LiveSearch name="employee" onChange={handleInputChange}
								parentData={parentData.employee} parentCallback={callback} fkEntity={entity.employee} />
							<div className="text-red-500 ">{errors.employee?.message}</div>
						</div>

						<div >
							<label >CDAO No.</label>
							<input type="text" name="cdaoNo" {...register("cdaoNo")}
								className=" form-control py-0 "
							/>
							<div className="text-red-500">{errors.cdaoNo?.message}</div>
						</div>

						<div >
							<label >Check Digit</label>
							<input type="text" name="checkDigit" {...register("checkDigit")}
								className="form-control py-0 "
							/>
							<div className="text-red-500">{errors.checkDigit?.message}</div>
						</div>

						<div >
							<label >Web ID</label>
							<input type="text" name="webId" {...register("webId")}
								className="form-control py-0 "
							/>
							<div className="text-red-500">{errors.webId?.message}</div>
						</div>

						<div >
							<label >Email ID</label>
							<input type="text" name="emailId" {...register("emailId")}
								className="form-control py-0 "
							/>
							<div className="text-red-500">{errors.emailId?.message}</div>
						</div>

						<div >
							<label >Reference No</label>
							<input type="text" name="referenceNo" {...register("referenceNo")}
								className="form-control py-0 "
							/>
							<div className="text-red-500">{errors.referenceNo?.message}</div>
						</div>

						<div >
							<label >Subject</label>
							<textarea type="text" name="subject" {...register("subject")}
								className="form-control py-0 "
							/>
							<div className="text-red-500">{errors.subject?.message}</div>
						</div>



						<div >
							<label >Grievance Brief</label>
							<textarea type="text" name="grievanceBrief" {...register("grievanceBrief")}
								className="form-control py-0 "
							/>
							<div className="text-red-500">{errors.grievanceBrief?.message}</div>
						</div>

						<div >
							<label >Disposal No</label>
							<input type="text" name="disposalNo" {...register("disposalNo")}
								className="form-control py-0 "
							/>
							<div className="text-red-500">{errors.disposalNo?.message}</div>
						</div>

						<div >
							<label >Disposal Remarks</label>
							<textarea type="textarea" name="disposalRemarks" {...register("disposalRemarks")}
								className="form-control py-0 "
							/>
							<div className="text-red-500">{errors.disposalRemarks?.message}</div>
						</div>

						<div >
							<label >Auditor Remarks</label>
							<textarea type="textarea" name="auditorRemarks" {...register("auditorRemarks")}
								className="form-control py-0 "
							/>
							<div className="text-red-500">{errors.auditorRemarks?.message}</div>
						</div>


						<div >
							<label >AAO Remarks</label>
							<textarea type="textarea" name="aaoRemarks" {...register("aaoRemarks")}
								className="form-control py-0 "
							/>
							<div className="text-red-500">{errors.aaoRemarks?.message}</div>
						</div>

						<div >
							<label >AO Remarks</label>
							<textarea type="textarea" name="aoRemarks" {...register("aaoRemarks")}
								className="form-control py-0 "
							/>
							<div className="text-red-500">{errors.aaoRemarks?.message}</div>
						</div>

					</div>
					<div >
						<button type="submit" >Save</button>
					</div>

				</form>
			</div>
		</div>
	);
};

export default withRouter(GrievanceEdit);
