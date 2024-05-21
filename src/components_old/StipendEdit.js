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

const StipendEdit = () => {
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
  letterNo:"",letterDate:"",mroNo:"", mroDate:"",mroNature:"",amount:0,sectionRemarks:"",unit:{},select:false}

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
   const [mNo,setMNo]=useState('');
   const [mDate,setMDate]=useState('');
const [mNature,setMNature]=useState('');	
	
  useEffect(() => {
    let isCancelled = false;
    console.log(id);
    if (id !== "new") {
      async function fetchData() {
        let record = "";
        await axios
          .get("/stipends/" + id)
          .then((response) => {
	console.log(response.data[0].extnType);
            if (response.data) {
							if (response.data[0].letterNo)
								setAuth(response.data[0].letterNo);
							if (response.data[0].letterDate)
								setAuthDate(response.data[0].letterDate);
							if (response.data[0].mroNo)
								setMNo(response.data[0].mroNo);
								if (response.data[0].mroDate)
								setMDate(response.data[0].mroDate);
								if (response.data[0].mroNature)
								setMNature(response.data[0].mroNature);
							if (response.data[0].fromDate)
								setFDate(response.data[0].fromDate);
							if (response.data[0].toDate) 
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
              "letterNo","letterDate","mroNo","mroDate","mroNature","fromDate","toDate",
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
	 
	 if(disabled)
	 	return;
	 	
	 	setDisabled(true);
	 	
    extnObjList.map((item, key) => {
			item.letterNo = auth;
			item.letterDate = authDate;
			item.mroNature = mNature;
			item.mroDate = mDate;
			item.mroNo = mNo;
			item.sectionRemarks = secRemarks;
		//	item.extnFromDate = fDate;
		//	item.extnToDate = tDate;
		}); 
    console.log(dakId);
    if (dakId) {
	console.log("-----------extn Obj List----:" + extnObjList.length);
      axios.put('/stipends/editEntries/' , extnObjList)
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
			axios.post("/stipends", extnObjList)
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
	 const handleMroDate = (e) => {
		console.log("%%%%%%:" + e.target.value);
	//	setValue("extnType", e.target.value);
		setMDate(e.target.value);

	};
	 const handleMroNo = (e) => {
		console.log("%%%%%%:" + e.target.value);
	//	setValue("extnType", e.target.value);
		setMNo(e.target.value);

	};
	 const handleMroNature = (e) => {
		console.log("%%%%%%:" + e.target.value);
	//	setValue("extnType", e.target.value);
		setMNature(e.target.value);

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
	
	const handleAmount = index => (e) => {
		console.log(index + "--" + e.target.value);
		let item = extnObjList[index];

		item['amount'] = e.target.value;
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
  letterNo:"",letterDate:"",mroNo:"", mroDate:"",mroNature:"",sectionRemarks:"",unit:{},select:false}])
		 
	
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
		history.push("/stipends");
	};


  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="max-w-6xl mx-auto pb-2 px-4 sm:px-6 lg:px-8 pt-4">
        <form className="pb-2" onSubmit={handleSubmit(onSubmit, onError)}>
          <h1>{id === "new" ? "Add" : "Edit"} Stipend  </h1>
          <div className="text-red-500">{serverErrors}</div>
          <div className="text-xl text-red-500">{mesg}</div>

          <div className="grid grid-cols-2 gap-0">
           
            
            

            <div>
              <label>Letter No</label>
              <input
                type="text"
                name="letterNo"
                value={auth}
                {...register("letterNo")}
           //     onChange={handleExtnAuth}
                className="form-control py-0"
              />
              <div className="text-red-500">{errors.letterNo?.message}</div>
            </div>
             <div>
              <label>Letter Date</label>
              <input
                type="date"
                name="letterDate"
                value={authDate}
                {...register("letterDate")}
            //    onChange={handleExtnDate}
                className="form-control py-0"
              />
              <div className="text-red-500">{errors.letterDate?.message}</div>
            </div>
               <div>
              <label>Mro No</label>
              <input
                type="text"
                name="mroNo"
                value={mNo}
                {...register("mroNo")}
                onChange={handleMroNo}
                className="form-control py-0"
              />
              <div className="text-red-500">{errors.mroNo?.message}</div>
            </div>
             <div>
              <label>Mro Date</label>
              <input
                type="date"
                name="mroDate"
                value={mDate}
                {...register("mroDate")}
                onChange={handleMroDate}
                className="form-control py-0"
              />
              <div className="text-red-500">{errors.mroDate?.message}</div>
            </div>
            <div>
			<label>Mro Nature</label>
			<select name="mroNature" value={mNature}
			{...register("mroNature")} onChange={handleMroNature}  className="form-control py-0">
				<option value="select">--Select--</option>
				<option key="1" value="STIPEND">	STIPEND	</option>
				<option key="2" value="ARREARS OF MSP"> ARR OF MSP </option>
				 


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
								<th>From Date</th>
								<th>To Date</th>
								<th>Amount</th>
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
												<input type="date" name="fromDate" value={item.fromDate}  onChange={handleFromDate(i)} className="form-control py-0" />
											</td>
											<td>
												<input type="date"  name="toDate"  value={item.toDate}  onChange={handleToDate(i)} className="form-control py-0" />
											</td>
											<td>
												<input type="text"  name="amount"  value={item.amount}  onChange={handleAmount(i)} className="form-control py-0" />
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

export default withRouter(StipendEdit);
