/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By :
 */

import { useState, useEffect, useMemo } from "react";
import {
  withRouter,
  useParams,
  useHistory,
  useLocation,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";
import LiveSearchNoTitle from "../utils/LiveSearchNoTitle";

import { yupResolver } from "@hookform/resolvers/yup";
import LiveSearch from "../utils/LiveSearch";

//import DatePicker  from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";
//import addDays from 'date-fns/addDays'

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Table from "../utils/Table";

const schema = yup.object({});

const ExtnEdit = () => {
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

  let history = useHistory();
  const [serverErrors, setServerErrors] = useState([]);
  const [entity, setEntity] = useState({});
  const [state, setState] = useState({});
  const [key, setKey] = useState("page1");
  
  const [mesg, setMesg] = useState();
  const [disabled, setDisabled] = useState(false);
  const [extensionType,setExtensionType]=useState('');
  const [empId,setEmpId]=useState(0);
  let extnObj={cdaoNo: "", empName: "", employee: {}, rankName: "",fromDate:"", toDate:"",
  extnAuthority:"",extnAuthorityDate:"",extnType:"",sectionRemarks:"",unit:{},select:false}

   const [extnObjList, setExtnObjList] = useState([extnObj]);
   const [fDate,setFDate]=useState('');
   const [tDate,setTDate]=useState('');
   const [auth,setAuth]=useState('');
   const [authDate,setAuthDate]=useState('');
   const [extType,setExtType]=useState('');
   const [secRemarks,setSecRemarks]=useState('');
   const [cda,setCda]=useState('');	
   const [dakId,setDakId]=useState('');
   const [rName,setRName]=useState('');
   const [posUnit,setPosUnit]=useState('');
   const [unitId,setUnitId]=useState('');
	
	
  useEffect(() => {
    let isCancelled = false;
    console.log(id);
    if (id !== "new") {
      async function fetchData() {
        let record = "";
        await axios
          .get("/extns/" + id)
          .then((response) => {
	console.log(response.data[0].extnType);
            if (response.data) {
							if (response.data[0].extnAuthority)
								setAuth(response.data[0].extnAuthority);
							if (response.data[0].extnAuthorityDate)
								setAuthDate(response.data[0].extnAuthorityDate);
							if (response.data[0].extnType)
								setExtType(response.data[0].extnType);
							if (response.data[0].extnFromDate)
								setFDate(response.data[0].fromDate);
							if (response.data[0].extnToDate) 
								setTDate(response.data[0].toDate);
							if(response.data[0].sectionRemarks)
								setSecRemarks(response.data[0].sectionRemarks);	
					//		if(response.data[0].rankName)
					//			setRName(response.data[0].rankName);
								
								if (response.data[0].cdaoNo)
									setCda(response.data[0].cdaoNo);
									console.log("--------reeemp-----:" + response.data[0].dakId);
									if(response.data[0].dakId)
									setDakId(response.data[0].dakId);
								 


								//setEntity(response.data[0]);

							
							setExtnObjList(response.data);
							console.log(response.data[0].dakType);
						}
       
            const fields = [
              "id","dak","auditorDate","aaoDate","aoDate","approved","employee",
              "cdaoNo","recordStatus","checkDigit","icNo","icCheckDigit","rank",
              "extnAuthority","extnAuthorityDate","extnType","fromDate","toDate",
              "unit","recordStatus","monthEnding","sectionRemarks","extnObjList"
            ];
            fields.forEach((field) => setValue(field, record[field]));

            
          })
          .catch((error) => {
            //console.log(error);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });

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

   
  
  const onSubmit = (data, event) => {
	 
    extnObjList.map((item, key) => {
			item.extnAuthority = auth;
			item.extnAuthorityDate = authDate;
			item.extnType = extType;
			item.sectionRemarks = secRemarks;
		//	item.extnFromDate = fDate;
		//	item.extnToDate = tDate;
		}); 
    console.log(data);
    if (dakId) {
	console.log("-----------extn Obj List----:" + extnObjList.length);
      axios.put('/extns/editEntries/' , extnObjList)
        .then((response) => {
           setMesg(response.data);
        })
        .catch((error) => {
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          //setServerErrors(error.response.data);
        });
    }else {
			console.log("before post");
			axios.post("/extns", extnObjList)
				.then((response) => { 
					  setMesg(response.data);
					   
					 	setDisabled(false);
				 
					  
					 	
					 
				})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		}
  };

  const onError = (errors, e) => console.log(errors, e);

  //All foreign keys.
  // XXXXXX Add search fields and adjust the values as necessary
  const parentData = {
    employee: {
      title: "Employee",
      url: "employees",
      searchList: ["cdaoNo", "officerName"], //XXXXXXXXX Add search fields here and also in the corresponding repository
      fkEntity: "employee",
    },
    
     unit: {
      title: "Unit",
      url: "units",
      searchList: ["unitName"], //XXXXXXXXX Add search fields here and also in the corresponding repository
      fkEntity: "unit",
    },
  };

  //Callback for child components (Foreign Keys)
  const callback = (childData) => {
    //console.log("Parent Callback");
    setEntity((prev) => ({ ...prev, [childData.fk]: childData.entity }));
    setValue(childData.fk, childData.entity);
    //console.log(errors);
    clearErrors(childData.fk);
  };
  
  const empcallback = index => (childData) => {
		setEntity((prev) => ({ ...prev, [childData.fk]: childData.entity }));

		 
		if (childData.fk === "employee") 
		setEmpId(childData.entity.id)

		let item = extnObjList[index];

		item['employee'] = childData.entity;
		item['rankName'] = childData.entity.rank.rankName;
		let newData = [...extnObjList];
		newData[index] = item;
		setExtnObjList(newData);

		clearErrors(childData.fk);
	};
	const unitcallback = index => (childData) => {
		setEntity((prev) => ({ ...prev, [childData.fk]: childData.entity }));

		 
		if (childData.fk === "unit") 
		setUnitId(childData.entity.id)

		let item = extnObjList[index];

		item['unit'] = childData.entity;
 		let newData = [...extnObjList];
		newData[index] = item;
		setExtnObjList(newData);

		clearErrors(childData.fk);
	};

  const errorCallback = (err) => {
    //console.log(err);
    setServerErrors(err);
  };
  const handleExtnType = (e) => {
		console.log("%%%%%%:" + e.target.value);
	//	setValue("extnType", e.target.value);
		setExtType(e.target.value);

	};
	
	 const handleSecRemarks = (e) => {
		console.log("%%%%%%:" + e.target.value);
	//	setValue("extnType", e.target.value);
		setSecRemarks(e.target.value);

	};
	 const handleExtnDate = (e) => {
		console.log("%%%%%%:" + e.target.value);
	//	setValue("extnType", e.target.value);
		setAuthDate(e.target.value);

	};
	 const handleExtnAuth = (e) => {
		console.log("%%%%%%:" + e.target.value);
	//	setValue("extnType", e.target.value);
		setAuth(e.target.value);

	};
  const handleInputChange = (e) => {
    //console.log(e.target.value);
  };
  const handleFromDate = index => (e) => {
		console.log(index + "--" + e.target.value);
		let item = extnObjList[index];

		item['fromDate'] = e.target.value;
		let newData = [...extnObjList];
		newData[index] = item;
		setExtnObjList(newData);

	};
	const handleToDate = index => (e) => {
		console.log(index + "--" + e.target.value);
		let item = extnObjList[index];

		item['toDate'] = e.target.value;
		let newData = [...extnObjList];
		newData[index] = item;
		setExtnObjList(newData);

	};
	
	const handleCheckBox = (index) => (e) => {
  
    console.log(e.target.checked);
    let item = extnObjList[index];

    item["select"] = e.target.checked;
    let newData = [...extnObjList];
    newData[index] = item;
    setExtnObjList(newData);
   };
  
  const addRow = (e) => {
	 
		
		setExtnObjList([...extnObjList,{cdaoNo: "", empName: "", employee: {}, rankName: "",fromDate:"", toDate:"",
  extnAuthority:"",extnAuthorityDate:"",extnType:"",sectionRemarks:"",unit:{},select:false}])
		 
	
	};
	
	const deleteRow = (e) => {
		console.log(extnObjList.length);
	let newData = [...extnObjList];
	let i;
		for(i=0;i<newData.length;i++){
			if(newData[i].select===true)
			newData.splice(i,1);
		}
		setExtnObjList(newData);
	};
	
	const handleButtonClick = (e) => {
		history.push("/extns");
	};


  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="max-w-6xl mx-auto pb-2 px-4 sm:px-6 lg:px-8 pt-4">
        <form className="pb-2" onSubmit={handleSubmit(onSubmit, onError)}>
          <h1>{id === "new" ? "Add" : "Edit"} Extension of Service </h1>
          <div className="text-red-500">{serverErrors}</div>
          <div className="text-xl text-red-500">{mesg}</div>

          <div className="grid grid-cols-2 gap-0">
           
            
            

            <div>
              <label>Extn Autority</label>
              <input
                type="text"
                name="extnAuthority"
                value={auth}
                {...register("extnAuthority")}
                onChange={handleExtnAuth}
                className="form-control py-0"
              />
              <div className="text-red-500">{errors.extnAuthority?.message}</div>
            </div>
             <div>
              <label>Extn Autority Date</label>
              <input
                type="date"
                name="extnAuthorityDate"
                value={authDate}
                {...register("extnAuthorityDate")}
                onChange={handleExtnDate}
                className="form-control py-0"
              />
              <div className="text-red-500">{errors.extnAuthorityDate?.message}</div>
            </div>
            <div>
			<label>Extension Type</label>
			<select name="extnType" value={extType}
			{...register("extnType")} onChange={handleExtnType}  className="form-control py-0">
				<option value="select">--Select--</option>
				<option key="1" value="RETIRE">	RETIRE	</option>
				<option key="2" value="RELEASE"> RELEASE </option>
				<option key="3" value="EXTN"> EXTN </option>
				<option key="4" value="EXTNSSC"> EXTNSSC </option>
								<option key="5" value="EXTNREMP"> EXTNREMP </option>


									</select>
								</div>


            
            <div>
              <label>Section Remarks</label>
              <textarea
                type="text"
                name="sectionRemarks"
                value={secRemarks}
                {...register("sectionRemarks")}
                onChange={handleSecRemarks}
                className="form-control py-0"
              />
            </div>
          </div>
		  <table className="table table-striped table-bordered table-auto">
						<thead>
							<tr>
								<th>Cdao No</th>
								<th>Rank</th>
								<th>Posted Unit</th>
								<th>From Date</th>
								<th>To Date</th>
								<th>Select</th>



							</tr>
						</thead>
						<tbody>
							{
								extnObjList.map((item, i) => {
									return (
										<tr key={"empDetail" + i}>

											<td>
												<div style={{ width: "300px" }}>
													<LiveSearchNoTitle
														name="employee"
														value={cda}
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
												<div style={{ width: "200px" }}>
													<LiveSearchNoTitle
														name="unit"
														value={posUnit}
														onChange={handleInputChange}
														parentData={parentData.unit}
														parentCallback={unitcallback(i)}
														fkEntity={item.unit}
														errCallback={errorCallback}
													/>
												</div>
											</td>

				
											 
											<td>
												<input type="date" name="fromDate" value={item.fromDate}  onChange={handleFromDate(i)} className="form-control py-0" />
											</td>
											<td>
												<input type="date"  name="toDate"  value={item.toDate}  onChange={handleToDate(i)} className="form-control py-0" />
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
							<button type="button" onClick={onSubmit}>Save</button>
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

export default withRouter(ExtnEdit);
