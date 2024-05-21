/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By :
 */

import { useState, useEffect, useRef } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import LiveSearch from "../utils/LiveSearch";
import LiveSearchNoTitle from "../utils/LiveSearchNoTitle";


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from "date-fns/addDays";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

const schema = yup.object({
	dakType: yup.object().required("Required"),
	section: yup.object().required("Required"),
	referenceNo: yup
		.string()
		.required("Required")
		.test("Length Ok", "Field length exceeding 25", (val) => val.length <= 30),
	referenceDate: yup.string().required("Required"),
});

const DakMroEntry = () => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		clearErrors,
	} = useForm({
		resolver: yupResolver(schema),
	});

	let { id } = useParams();
	//console.log(id);

	let history = useHistory();

	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [dakMsg, setDakMsg] = useState("");
	const [secId, setSecId] = useState();
	const [dakTypeData, setDakTypeData] = useState([]);
	const [dakTypeItems, setDakTypeItems] = useState([]);
	const [dakTypeItem, setDakTypeItem] = useState();
	const [loading, setLoading] = useState(true);
	const [sectionGroup, setSectionGroup] = useState("");
	const [sectionGroupList, setSectionGroupList] = useState([]);
	const [sectionGroupItems, setSectionGroupItems] = useState([]);
	const [empId, setEmpId] = useState(0);
	const [secName, setSecName] = useState("");
	const [key, setKey] = useState("Page1");
	const [dakTypeDesc, setDakTypeDesc] = useState("");
	const [taskInfo, setTaskInfo] = useState("");
	const [dakTypeLetters, setDakTypeLetters] = useState(false);
	const [vendorId, setVendorId] = useState("");
	const [omroId, setOmroId] = useState(0);

	const [entry, setEntry] = useState('');
	const [option, setOption] = useState('');
	
	const [mesg, setMesg] = useState('');
	const [mroValidationList, setMroValidationList] = useState([]);
	const [refNo, setRefNo] = useState('');
	const [refDate, setRefDate] = useState('');
	const [consAmt, setConsAmt] = useState(0);
	const [bName, setBName] = useState('')
	const [bBranch, setBBranch] = useState('');
	const [ddChqNo, setDdChqNo] = useState('');
	const [ddChqDate, setDdChqDate] = useState('');
	const [dt, setDt] = useState('');

	let mroObj={
		amount: 0, recoveryDate: '', recoveryMonth: 0,
		cdaoNo: "", empName: "", employee: {}, rankName: "", depositType: "", referenceNo: "", referenceDate: "",
		bankName: "", bankBranch: "", ddChequeNo: "", ddChequeDate: "", consAmount: 0, dakTypeId: 0,select:false
	}

const [mroList, setMroList] = useState([mroObj]);
	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== "new") {
			async function fetchData() {
				let record = "";
				await axios
					.get("/daks/mroEntry/" + id)
					.then((response) => {
						if (response.data) {
							if (response.data[0].sectionGroup)
								setSectionGroup(response.data[0].sectionGroup);
							if (response.data[0].dakType)
								setDakTypeItem(response.data[0].dakType);
							if (response.data[0].referenceNo)
								setRefNo(response.data[0].referenceNo);
							if (response.data[0].referenceDate)
								setRefDate(response.data[0].referenceDate);
							if (response.data[0].consAmount) {
								setConsAmt(response.data[0].consAmount);
								if (response.data[0].bankName)
									setBName(response.data[0].bankName);
								if (response.data[0].bankBranch)
									setBBranch(response.data[0].bankBranch);
								if (response.data[0].ddChequeNo)
									setDdChqNo(response.data[0].ddChequeNo);
								if (response.data[0].ddChequeDate)
									setDdChqDate(response.data[0].ddChequeDate);


								//setEntity(response.data[0]);

							}
							setMroList(response.data);
							console.log(response.data[0].dakType);
						}
						//      record = response.data;
					})
					.catch((error) => {
						//console.log(error);
						//console.log(error.response.status);
						//console.log(error.response.headers);
						if (error.response) setServerErrors(error.response.data.error);
						else setServerErrors(error.Error);
					});

				const fields = [
					"id",
					"dakidNo",
					"dakYear",
					"dakType",
					"unit",
					"section",
					"employee",
					"cdaoNo",
					"checkDigit",

					"subject",
					"billNo",
					"billDate",
					"disposalDate",
					"disposalDate",
					"disposalSummary",
					"taskUsr",
					"reason",
					"aaoDate",
					"auditorDate",
					"aoDate",
					"recordStatus",
					"approved",
					"vendor",
				];
				//  setSectionGroup(record["section"].sectionGroup);
				//  setSecName(record["section"].sectionName);
				//   setSecId(record["section"].id);
				fields.forEach((field) => setValue(field, record[field]));
				if (!isCancelled) {
					setEntity(record);
					setState((prev) => ({ ...prev, state: record }));
				}
			}

			fetchData();
			return () => {
				isCancelled = true;
			};
		}
	}, [id, setValue]);

	useEffect(() => {
		let fetching = false;
		let unmounted = false;

		async function fetchSectionGroup() {
			if (!fetching)
				//console.log(secId);
				await axios
					.get(`/sections/999/sectionGroup`)
					.then((response) => {
						console.log("response>>" + response.data);
						setSectionGroupList(response.data);
						if (!unmounted) {
							setLoading(false);
						}
					})
					.catch((error) => {
						//console.log(error);
						//console.log(error.response.status);
						//console.log(error.response.headers);
						if (error.response) setServerErrors(error.response.data.error);
						else setServerErrors(error.Error);
					});
		}
		fetchSectionGroup();

		return () => {
			fetching = true;
			unmounted = true;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	useEffect(() => {
		let fetching = false;
		let unmounted = false;
		console.log("daktype");
		async function fetchSectionData() {
			console.log(empId);
			if (!fetching && empId > 0 && sectionGroup.length > 2) {
				console.log("fetching section " + empId + "--" + sectionGroup);
				await axios
					.get(`/employees/${empId}/sections/${sectionGroup}`)
					.then((response) => {
						console.log(
							"response>> section>>" +
							response.data[0].sectionName +
							"--" +
							response.data[1] +
							"--" +
							response.data[2]
						);
						setValue("section", response.data[0]);

						setSecId(response.data[0].id);
						setSecName(response.data[0].sectionName);
						setTaskInfo(
							"Task No-" + response.data[1] + " User " + response.data[2]
						);
						//setDakTypeData(response.data);
						if (!unmounted) {
							setLoading(false);
						}
					})
					.catch((error) => {
						//console.log(error);
						//console.log(error.response.status);
						//console.log(error.response.headers);
						if (error.response) setServerErrors(error.response.data.error);
						else setServerErrors(error.Error);
					});
			}
		}
		fetchSectionData();

		return () => {
			fetching = true;
			unmounted = true;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [empId]);

	async function fetchSection() {
		console.log(secId);
		if (sectionGroup)
			//console.log(secId);
			await axios
				.get(`/sections/sectionGroup/${sectionGroup}`)
				.then((response) => {
					console.log("response>>" + response.data);
					setValue("section", response.data);

					setSecId(response.data.id);
					setSecName(response.data.sectionName);
				})
				.catch((error) => {
					//console.log(error);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					if (error.response) setServerErrors(error.response.data.error);
					else setServerErrors(error.Error);
				});
	}

	useEffect(() => {
		let fetching = false;
		let unmounted = false;
		console.log("daktype");
		async function fetchDakTypeData() {
			console.log(secId);
			if (!fetching && sectionGroup)
				//console.log(secId);
				await axios
					.get(`/dakTypes/${sectionGroup}/sectionGroup`)
					.then((response) => {
						console.log("response>>" + response.data);
						setDakTypeData(response.data);
						if (!unmounted) {
							setDakTypeItems(
								response.data.map(({ id, description }) => ({
									id: id,
									label: description,
									value: description,
								}))
							);
							setLoading(false);
						}
					})
					.catch((error) => {
						//console.log(error);
						//console.log(error.response.status);
						//console.log(error.response.headers);
						if (error.response) setServerErrors(error.response.data.error);
						else setServerErrors(error.Error);
					});
		}
		fetchDakTypeData();

		return () => {
			fetching = true;
			unmounted = true;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sectionGroup]);
	async function submitByRSec() {

		mroList.map((item, key) => {
			console.log(item.employee.name + "----" + refNo + "----" + dt);
			item.referenceNo = refNo;
			item.referenceDate = refDate;
			item.consAmount = consAmt;
			item.ddChequeDate = ddChqDate;
			item.ddChequeNo = ddChqNo;
			item.bankName = bName;
			item.bankBranch = bBranch;
			item.dakTypeId = dt;



		});

		await axios.post('/daks/saveMro/mroList', mroList)
			.then((response) => {
				//console.log(data);
				setMesg(response.data);
				//	mroValidationList(response.data);
				//	setMroList([]);


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
	const onSubmit = (data, event) => {
		event.preventDefault();
		console.log(data);
		console.log("data id--------------" + data.id);
		if (data.id) {
			axios
				.put("/daks/" + data.id, data)
				.then((response) => { })
				.catch((error) => {
					//console.log(error.response.data);
					console.log("response--------" + error.response.status);
					if (error.response.status === 200) history.push("/daks");
					//console.log(error.response.headers);
					setServerErrors(error.response.data);
				});
		} else {
			axios
				.post("/daks", data)
				.then((response) => {
					console.log(
						"reponse status--------------" +
						response.status +
						"--" +
						response.statusText +
						"----" +
						"-h--" +
						response.headers +
						"--" +
						response.data
					);
					if (response.status === 201) {
						setDakMsg(response.data);
						//history.push("/daks/view/"+response.data);
						//history.replace({pathname:'/daks/new/'+response.data});
						setValue("referenceNo", "");
						setValue("referenceDate", "");
						setValue("section", "");
						setSecName("");
						setSecId();
						setValue("employee", "");
						setValue("entity.employee", "");
						setValue("amount", "");
						setValue("subject", "");

					}
				})
				.catch((error) => {
					//console.log(error.response.data);
					console.log("response--------" + error.response.status);
					//if(error.response.status!==201)
					//history.push("/daks");
					//console.log(error.response.headers);
					if (error.response) setServerErrors(error.response.data);
					else setServerErrors(error);
				});
		}

		//history.push("/daks");
	};

	const onError = (errors, e) => console.log(errors, e);

	//All foreign keys.
	// XXXXXX Add search fields and adjust the values as necessary
	const parentData = {
		unit: {
			title: "Unit",
			url: "units",
			searchList: ["unitCode", "unitName"], //XXXXXXXXX Add search fields
			fkEntity: "unit",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
		section: {
			title: "Section",
			url: "sections",
			searchList: ["sectionName"], //XXXXXXXXX Add search fields
			fkEntity: "section",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
		employee: {
			title: "Officer",
			url: "employees",
			searchList: ["cdaoNo", "officerName"], //XXXXXXXXX Add search fields
			fkEntity: "employee",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},

		vendor: {
			title: "Vendor Name",
			url: "vendors",
			searchList: ["vendorName"], //XXXXXXXXX Add search fields
			fkEntity: "vendor",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},

		dakType: {
			title: "DakType",
			url: "dakTypes",
			searchList: ["description"], //XXXXXXXXX Add search fields
			fkEntity: "dakType",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
	};

	//Callback for child components (Foreign Keys)

	const callback = (childData) => {
		setEntity((prev) => ({ ...prev, [childData.fk]: childData.entity }));
		setValue(childData.fk, childData.entity);
		//console.log(errors);
		// console.log(childData.fk+"--"+childData.entity.id);
		if (childData.fk === "section") setSecId(childData.entity.id);
		if (childData.fk === "employee") setEmpId(childData.entity.id);

		clearErrors(childData.fk);
	};

	const empcallback = index => (childData) => {
		setEntity((prev) => ({ ...prev, [childData.fk]: childData.entity }));

		//console.log(errors);
		// console.log(childData.fk+"--"+childData.entity.id);
		if (childData.fk === "section") setSecId(childData.entity.id);
		if (childData.fk === "employee") setEmpId(childData.entity.id)

		let item = mroList[index];

		item['employee'] = childData.entity;
		item['rankName'] = childData.entity.rank.rankName;
		let newData = [...mroList];
		newData[index] = item;
		setMroList(newData);

		clearErrors(childData.fk);
	};

	const errorCallback = (err) => {
		//console.log(err);
		setServerErrors(err);
	};

	const handleButtonClick = (e) => {
		history.push("/daks");
	};

	const handleGroupChange = (e) => {
		setSectionGroup(sectionGroupList[e.target.selectedIndex]);
		//console.log(sectionGroupList[e.target.selectedIndex]);
	};

	const handleInputChange = index => (e) => {
		console.log(e.target.value);
		//	console.log("handle input change");
	};
	const handleDakTypeChange = (e) => {
		console.log(">>>" + e.target.value);
		console.log(e.target.selectedIndex - 1);
		console.log(dakTypeData[e.target.selectedIndex - 1].description);
		console.log(dakTypeData[e.target.selectedIndex - 1].id);
		setValue("dakTypeId", dakTypeData[e.target.selectedIndex - 1].id);
		setDakTypeItem(dakTypeData[e.target.selectedIndex - 1].description);
		setDt(dakTypeData[e.target.selectedIndex - 1].id);

		//console.log("entit---" + entity.description + "--" + entity.dakType + " " + entity.description + "--" + entity.id);
	};
	const handleSingleEntry = (event) => {
		setEntry(event.target.value)
		setOption("single");
	}
	const handleMultipleEntry = (event) => {
		setEntry(event.target.value)
		setOption("multiple");
	}
	const addRow = (e) => {
		console.log(mroList.length);
 	let itemold=mroList[mroList.length-1];
	 
	 
	let item=mroObj;
	item.recoveryDate=itemold.recoveryDate;
	item.recoveryMonth=itemold.recoveryMonth;
	
		setMroList([...mroList, item]);



	};
	
	const deleteRow = (e) => {
		console.log(mroList.length);
	let newData = [...mroList];
	let i;
		for(i=0;i<newData.length;i++){
			if(newData[i].select===true)
			newData.splice(i,1);
		}
		setMroList(newData);
	};

	const handleRecordType = index => (e) => {
		console.log(index + "--" + e.target.value);
		let item = mroList[index];

		item['depositType'] = e.target.value;
		let newData = [...mroList];
		newData[index] = item;
		setMroList(newData);

	};

	const handleAmt = index => (e) => {
		console.log(index + "--" + e.target.value);
		let item = mroList[index];

		item['amount'] = e.target.value;
		let newData = [...mroList];
		newData[index] = item;
		setMroList(newData);

	};
	const handleRecDate = index => (e) => {
		console.log(index + "--" + e.target.value);
		let item = mroList[index];

		item['recoveryDate'] = e.target.value;
		let newData = [...mroList];
		newData[index] = item;
		setMroList(newData);

	};
	const handleReferenceNo = (e) => {
		console.log(e.target.value);
		setRefNo(e.target.value);
	};
	const handleReferenceDate = (e) => {
		console.log(e.target.value);
		setRefDate(e.target.value);
	};
	const handleDdChqDate = (e) => {
		console.log(e.target.value);
		setDdChqDate(e.target.value);
	};
	const handleDdChqNo = (e) => {
		console.log(e.target.value);
		setDdChqNo(e.target.value);
	};
	const handleBankBranch = (e) => {
		console.log(e.target.value);
		setBBranch(e.target.value);
	};
	const handleBankName = (e) => {
		console.log(e.target.value);
		setBName(e.target.value);
	};
	const handleConsAmount = (e) => {
		console.log(e.target.value);
		setConsAmt(e.target.value);
	};
	const handleRecMth = index => (e) => {
		console.log(index + "--" + e.target.value);
		let item = mroList[index];

		item['recoveryMonth'] = e.target.value;
		let newData = [...mroList];
		newData[index] = item;
		setMroList(newData);

	};
	const handleCdaoNo = index => (e) => {
		console.log(index + "--" + e.target.value);
		let item = mroList[index];

		item['cdaoNo'] = e.target.value;
		let newData = [...mroList];
		newData[index] = item;
		setMroList(newData);

	};

const handleCheckBox = (index) => (e) => {
    //console.log(Table.page)
    console.log(e.target.checked + "--" + index);
    //csList[index].select=e.target.checked;

    console.log(e.target.checked);
    let item = mroList[index];

    item["select"] = e.target.checked;
    let newData = [...mroList];
    newData[index] = item;
    setMroList(newData);
    //console.log(csList);
  };

	return (
		<div className="max-w-6xl mx-auto ">
			<div className="w-full w-3/4  mx-auto ">
				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1>{id === "new" ? "Add" : "Edit"} Dak</h1>
					<div className="text-red-500">{serverErrors}</div>
					<div className="text-red-500">{mesg}</div>

					<div className="grid grid-cols-2 gap-0 ">




						<div>
							<br />
							<br />
						</div>
						<div>
							<br />
							<br />
						</div>
						<div>
							<b>Section Group</b>
							<select
								className="form-control py-0"
								disabled={loading}
								value={sectionGroup}
								onChange={handleGroupChange}
							>
								{sectionGroupList.map((item, index) => (
									<option key={item} value={item.toString()}>
										{" "}
										{item.toString()}{" "}
									</option>
								))}
							</select>
						</div>

						<div>
							<b>Dak Types</b>
							<select
								className="form-control py-0"
								disabled={loading}
								value={dakTypeItem}
								onChange={handleDakTypeChange}
							>
								<option key={0} value={0}>
									---select---
								</option>
								{dakTypeData.map((item) => (
									<option key={item.id} value={item.description} >
										{" "}
										{item.description}{" "}
									</option>
								))}
							</select>
						</div>





						<div>
							<label>Reference No</label>
							<input
								type="text"
								name="referenceNo"
								value={refNo}

								onChange={handleReferenceNo}
							/>
							<div className="text-red-500">{errors.referenceNo?.message}</div>
						</div>

						<div>
							<label>Reference Date</label>
							<input
								type="date"
								name="referenceDate"
								value={refDate}


								onChange={handleReferenceDate}
								className="form-control py-0"
							/>
							<div className="text-red-500">
								{errors.referenceDate?.message}
							</div>
						</div>

						<div>
							<label>Bank Name</label>
							<input
								type="text"
								name="bankName"
								value={bName}
								onChange={handleBankName}
							/>

						</div>

						<div>
							<label>Bank Branch</label>
							<input
								type="text"
								name="bankBranch"
								value={bBranch}
								onChange={handleBankBranch}
								className="form-control py-0"
							/>

						</div>

						<div>
							<label>DD/Cheque No</label>
							<input
								type="text"
								name="ddChequeNo"
								value={ddChqNo}
								onChange={handleDdChqNo}
								className="form-control py-0"
							/>

						</div>
						<div>
							<label>DD/Cheque Date</label>
							<input
								type="date"
								name="ddChequeDate"
								value={ddChqDate}
								onChange={handleDdChqDate}
								className="form-control py-0"
							/>

						</div>

						<div>
							<label>Amount</label>
							<input
								type="text"
								name="amount"
								value={consAmt}


								onChange={handleConsAmount}
								className="form-control py-0"
							/>
							<div className="text-red-500">{errors.amount?.message}</div>
						</div>
						{dakTypeLetters && (
							<div>
								<label>Subject</label>
								<textarea
									type="text"
									name="subject"
									{...register("subject")}
									className="form-control py-0"
								/>
								<div className="text-red-500">{errors.subject?.message}</div>
							</div>

						)}
					</div>

					<table className="table table-striped table-bordered table-auto">
						<thead>
							<tr>
								<th>Cdao No</th>
								<th>Rank</th>
								<th>Amount</th>
								<th>Recovery Date</th>
								<th>Recovery Month</th>
								<th>Record Type</th>
								<th>Select</th>



							</tr>
						</thead>
						<tbody>
							{
								mroList.map((item, i) => {
									return (
										<tr key={"empDetail" + i}>

											<td>
												<div style={{ width: "300px" }}>
													<LiveSearchNoTitle
														name="employee"
														onChange={handleInputChange}
														parentData={parentData.employee}
														parentCallback={empcallback(i)}
														fkEntity={item.employee}
														errCallback={errorCallback}
													/>
												</div>
											</td>
											<td>
												{item.rankName}
											</td>



											<td>
												<div style={{ width: "150px" }}>
													<input type="text" name="amount" value={item.amount} onChange={handleAmt(i)} className="form-control py-0" />
												</div>
											</td>
											<td>
												<input type="date" name="recDate" value={item.recoveryDate} onChange={handleRecDate(i)} className="form-control py-0" />
											</td>
											<td>
												<input type="text" placeholder="mmyyyy" name="recMth" value={item.recoveryMonth} onChange={handleRecMth(i)} className="form-control py-0" />
											</td>


											<td>
												<select name="depositType" value={item.depositType} className="form-control py-0" onChange={handleRecordType(i)}>
													<option value="0">--select---</option>
													<option value="DSOP">DSOP</option>
													<option value="AGI">AGI</option>
													<option value="OTHERS">OTHERS</option>


												</select>
											</td>
											<td>
												<input
													type="checkbox"
													onChange={handleCheckBox(i)}
													checked={item["select"]}
												/>
											</td>
										</tr>
									)

								})

							}



						</tbody>


					</table>

				<div className="flexContainer">
					<div className="w-32 ...">
						<button type="button" onClick={addRow}>Add Record</button>
					</div>
					<div className="w-38 ...">
						<button type="button" onClick={deleteRow}>Delete selected</button>
					</div>
</div>

					<div className="grid grid-cols-2 gap-0 ">
						<div className="px-2">
							<button type="button" onClick={submitByRSec}>Save</button>
						</div>

						<div className="px-2">
							<button type="button" onClick={handleButtonClick}>
								Done
							</button>
						</div>
					</div>

				</form>
			</div>
		</div>
	);
};

export default withRouter(DakMroEntry);
