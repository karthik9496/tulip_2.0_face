/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By :
 */

 import { useState, useEffect } from "react";
 import { withRouter, useParams, useHistory } from "react-router-dom";
 import { useForm } from "react-hook-form";
 import axios from "axios";
 import * as yup from "yup";
 
 import { yupResolver } from "@hookform/resolvers/yup";
 import LiveSearch from "../utils/LiveSearch";
 
 //import DatePicker  from 'react-datepicker';
 //import "react-datepicker/dist/react-datepicker.css";
 //import addDays from 'date-fns/addDays'
 
 import Tabs from "react-bootstrap/Tabs";
 import Tab from "react-bootstrap/Tab";
 
 const schema = yup.object({
   //dak: yup.object().required('Required'),
   //ifsc: yup.string().required('Required'),
 });
 
 const AdrReviewEdit = () => {
   const {
	 register,
	 handleSubmit,
	 getValues, //rahul: new parameter ---------------------------
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
 
   useEffect(() => {
	 let isCancelled = false;
	 console.log(id);
	 if (id !== "new") {
	   async function fetchData() {
		 let record = "";
		 await axios
		   .get("/demandRegisters/" + id)
		   .then((response) => {
			 record = response.data;
 
			 const fields = [
			   "id",
			   "dak",
			   "cdaoNo",
			   "checkDigit",
			   "cdrNo",
			   "advanceType",
			   "amount",
			   "penalAmt",
			   "employee",
			   "demandDate",
			   "penalDays",
			   "demandOrigin",
			   "recordStatus",
			   "approved",
			   "auditorSettlementDate",
			   "aaoSettlementDate",
			   "aoSettlementDate",
			   "totalAdr",
			   "adrReviewDate", //rahul
			   "settlementRemarks",
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
 
 
 //rahul: new function ---------------------------
   
   const reCalcTotalAdrByReviewdate = (e) =>{
	 var adrReviewDate = e.target.value; 
	 console.log(adrReviewDate);
	 setServerErrors("");
	 if (adrReviewDate) {
	   var record =null;
	   axios
		 .get("/demandRegisters/adr/totalAdr/"+id+"/" + adrReviewDate)
		 .then((response) => {
		   record = response.data;
 
		   const fields = [
			 "totalAdr",
			 "penalAmt",
			 "penalDays"
		   ];
		   fields.forEach((field) => setValue(field, record[field]));
		 })
		 .catch((error) => {
		   console.log(error.response);
		   setServerErrors(error.response.data["reason"]);
 
		 });
	 } 
   }
  //rahul: new function ---------------------------
 
 
 
   const onSubmit = (data, event) => {
	 event.preventDefault();
	 console.log(data);
	 if (data.id) {
	   axios
		 .put("/demandRegisters/audSubmit/" + data.id, data)
		 .then((response) => {
		   if (response.status == 200) history.push("/adrReviews");
		   else setServerErrors(response.data);
		 })
		 .catch((error) => {
		   //console.log(error.response.data);
		   //console.log(error.response.status);
		   //console.log(error.response.headers);
		   setServerErrors(error.response.data);
		 });
	 }
   };
 
   const onError = (errors, e) => console.log(errors, e);
 
   //All foreign keys.
   // XXXXXX Add search fields and adjust the values as necessary
   const parentData = {
	 dak: {
	   title: "Dak",
	   url: "daks",
	   searchList: ["dakidNo"], //XXXXXXXXX Add search fields here and also in the corresponding repository
	   fkEntity: "dak",
	 },
 
	 employee: {
	   title: "Employee",
	   url: "employees",
	   searchList: ["cdaoNo", "officerName"], //XXXXXXXXX Add search fields here and also in the corresponding repository
	   fkEntity: "employee",
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
 
   const errorCallback = (err) => {
	 //console.log(err);
	 setServerErrors(err);
   };
 
   const handleInputChange = (e) => {
	 //console.log(e.target.value);
   };
   const handleButtonClick = (e) => {
	 history.push("/adrReviews");
   };
 
   return (
	 <div className="max-w-xl mx-auto ">
	   <div className="w-full w-3/4  mx-auto ">
		 <form onSubmit={handleSubmit(onSubmit, onError)}>
		   <h1>{id === "new" ? "Add" : "Edit"} Advance Review</h1>
		   <div className="text-red-500">{serverErrors}</div>
 
		   <div className="grid grid-cols-2 gap-0 ">
			 <div>
			   <LiveSearch
				 name="employee"
				 onChange={handleInputChange}
				 parentData={parentData.employee}
				 parentCallback={callback}
				 fkEntity={entity.employee}
				 errCallback={errorCallback}
			   />
			   <div className="text-red-500 ">{errors.employee?.message}</div>
			 </div>
 
			 <div>
			   <label>Advance Type</label>
			   <input type="text" name="cdrNo" {...register("cdrNo")} readOnly />
			   <div className="text-red-500">{errors.cdrNo?.message}</div>
			 </div>
			 <div>
			   <label>Advance Amount</label>
			   <input
				 type="text"
				 name="amount"
				 {...register("amount")}
				 readOnly
			   />
			   <div className="text-red-500">{errors.amount?.message}</div>
			 </div>
			 <div>
			   <label>Penal Interest</label>
			   <input type="text" name="penalAmt" readOnly {...register("penalAmt")} />
			   
			   <div className="text-red-500">{errors.penalAmt?.message}</div>
			 </div>
			 <div>
			   <label>Total Adr</label>
			   <input type="text" name="totalAdr" {...register("totalAdr")} />
			   <div className="text-red-500">{errors.totalAdr?.message}</div>
			 </div>
			 <div>
			   <label>Demand Date</label>
			   <input
				 type="date"
				 name="demandDate"
				 {...register("demandDate")}
				 readOnly
			   />
			   <div className="text-red-500">{errors.demandDate?.message}</div>
			 </div>
			 <div>
			   <label>Adr Review Date</label>
			   <input
				 type="date"
				 name="adrReviewDate"
				 {...register("adrReviewDate",
				 //Rahul
				 {onChange: (e) =>reCalcTotalAdrByReviewdate(e)})}
			   />
			   <div className="text-red-500">{errors.adrReviewDate?.message}</div>
			 </div>
			 
			 <div>
			   <label>Demand Origin</label>
			   <input
				 type="text"
				 name="demandOrigin"
				 {...register("demandOrigin")}
				 readOnly
			   />
			   <div className="text-red-500">{errors.demandOrigin?.message}</div>
			 </div>			 
		   </div>
		   <div >
			   <label>Settlement Remarks</label>
			   <textarea
			   className="w-full h-24 px-2 mt-1"
				 type="text"
				 name="settlementRemarks"
				 {...register("settlementRemarks")}
			   />
			   <div className="text-red-500">
				 {errors.settlementRemarks?.message}
			   </div>
			 </div>
		   <div className="grid grid-cols-2 gap-0 ">
			 <div className="px-2">
			   <button type="submit">Save</button>
			 </div>
 
			 <div className="px-2">
			   <button type="button" onClick={handleButtonClick}>
				 Cancel
			   </button>
			 </div>
		   </div>
		 </form>
	   </div>
	 </div>
   );
 };
 export default withRouter(AdrReviewEdit);