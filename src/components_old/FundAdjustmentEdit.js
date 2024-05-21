/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 18 April 2022
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
  // nature: yup.string().required('Required'),
  //  amount: yup.number().integer().required('Required'),
  // debitCredit: yup.string().required('Required'),
  //  debitMonth: yup.string().required('Required'),
  //   debitYear: yup.string().required('Required'),
});

const FundAdjustmentEdit = () => {
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
  const [mesg, setMesg] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [adjType,setAdjType]=useState('');

  useEffect(() => {
    let isCancelled = false;
    console.log(id);
    if (id !== "new") {
      async function fetchData() {
        let record = "";
        await axios
          .get("/fundAdjustments/" + id)
          .then((response) => {
            record = response.data;
           setAdjType(record.nature);
            const fields = [
              "id",
              "employee",
              "nature",
              "amount",
              "debitCredit",
              "interestAmount",
              "debitMonth",
              "debitYear",
              "monthEnding",
              "cdaoNo",
              "checkDigit",
              "dak",
              "auditorDate",
              "aaoDate",
              "aoDate",
              "approved",
              "recordStatus",
              "reason",
              "remarks",
              "sectionRemarks",
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
  }, []);

  const onSubmit = (data, event) => {
    event.preventDefault();
    console.log(data);
    if (disabled) return;
    console.log("777777777:", data);
    setDisabled(true);
    if (data.id) {
      axios
        .put("/fundAdjustments/" + data.id, data)
        .then((response) => {
          setMesg(response.data);
          //history.push("/fundAdjustments");
          setDisabled(false);
        })
        .catch((error) => {
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          setServerErrors(error.response.data);
        });
    } else {
      axios
        .post("/fundAdjustments", data)
        .then((response) => {
          setMesg(response.data);
          //history.push("/fundAdjustments");
          setDisabled(false);
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
    employee: {
      title: "Employee",
      url: "employees",
      searchList: ["cdaoNo", "officerName", "checkDigit"], //XXXXXXXXX Add search fields here and also in the corresponding repository
      fkEntity: "employee",
    },
  };

  //Callback for child components (Foreign Keys)
  const callback = (childData) => {
    //console.log("Parent Callback");
    //setEntity(prev => ({ ...prev, [childData.fk]: childData.entity }));
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
  const handleInputDrCrChange = (e) => {
    console.log(e.target.value);
    setValue("debitCredit", e.target.value);
  };
  const handleInputNatureChange = (e) => {
    console.log(e.target.value);
    setValue("nature", e.target.value);
    setAdjType(e.target.value);
  };
  const returnToList = () => {
    history.push("/fundAdjustments");
  };
  return (
    //	<div className="max-w-xl mx-auto ">
    //	<div className="w-full w-3/4  mx-auto " >
    //	<div className="max-w-xl mx-auto ">
    //	<div className="w-full w-3/4  mx-auto " >
    <div className="min-h-screen bg-gray-200 text-gray-900">
      <div className="max-w-5xl mx-auto px-8 sm:px-6 lg:px-10 pt-4">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <h1>{id === "new" ? "Add" : "Edit"} Fund Adjustment </h1>
          <div className="text-red-500">{mesg}</div>
          <Tabs
            id="FundAdjustmentEdit"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="page1" title="Page 1" className="h-120">
              <div className="grid grid-cols-2 gap-0">
                <div>
                  <LiveSearch
                    name="employee"
                    onChange={handleInputChange}
                    parentData={parentData.employee}
                    parentCallback={callback}
                    fkEntity={entity.employee}
                    errCallback={errorCallback}
                  />
                  <div className="text-red-500 ">
                    {errors.employee?.message}
                  </div>
                </div>
                <div>
                  <label> Nature </label>
                  <select
                    name="nature"
                    className="form-control py-0"
                    {...register("nature")}
                    onChange={handleInputNatureChange}
                  >
                    <option value="select">--Select--</option>
                    
                    
                    <option key="1" value="WITHDRAWAL">
                      WITHDRAWAL
                    </option>
                    <option key="2" value="SUBSCRIPTION">
                      SUBSCRIPTION
                    </option>
                    <option key="3" value="OBBALANCE">
                      OBBALANCE
                    </option>
                     <option key="4" value="OTHER">
                      OTHER ADJUSTMENT
                    </option>
                  </select>
                </div>

                <div>
                  <label>Amount</label>
                  <input
                    type="text"
                    name="amount"
                    {...register("amount")}
                    className="form-control py-0"
                  />
                  <div className="text-red-500">{errors.amount?.message}</div>
                </div>
                {(adjType==='WITHDRAWAL' || adjType==='SUBSCRIPTION') &&
                <>
                <div>
                  <label> Debit/Credit </label>
                  <select
                    name="debitCredit"
                    className="form-control py-0"
                    {...register("debitCredit")}
                    onChange={handleInputDrCrChange}
                  >
                    <option value="select">--Select--</option>
                    <option key="1" value="DB">
                      DB
                    </option>
                    <option key="2" value="CR">
                      CR
                    </option>
                  </select>
                </div>
               


                <div>
                  <label> Month</label>
                  {/* <input
                    type="text"
                    name="debitMonth"
                    {...register("debitMonth")}
                    className="form-control py-0"
                  /> */}

                  <select
                    className="form-control py-0"
                    {...register("debitMonth")}
                  >
                    <option value="">--Select Month--</option>
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                  <div className="text-red-500">
                    {errors.debitMonth?.message}
                  </div>
                </div>

                <div>
                  <label> Year</label>
                  {/* <input
                    type="text"
                    name="debitYear"
                    {...register("debitYear")}
                    className="form-control py-0"
                  /> */}
                  <select
                    {...register("debitYear")}
                    className="form-control py-0"
                  >
                    <option value="">--Select Year--</option>
                    <option value={new Date().getFullYear() - 1}>
                      {new Date().getFullYear() - 1}
                    </option>
                    <option value={new Date().getFullYear()}>
                      {new Date().getFullYear()}
                    </option>
                  </select>
                  <div className="text-red-500">
                    {errors.debitYear?.message}
                  </div>
                </div>
				 </>
                }
                <div>
                  <label>Calculation Details/Reason</label>
                  <textarea
                    type="text"
                    name="reason"
                    {...register("reason")}
                    className="form-control py-0"
                  />
                  <div className="text-red-500">{errors.reason?.message}</div>
                </div>

                <div>
                  <label>Section Remarks</label>
                  <textarea
                    type="text"
                    name="sectionRemarks"
                    {...register("sectionRemarks")}
                    className="form-control py-0"
                  />
                  <div className="text-red-500">
                    {errors.sectionRemarks?.message}
                  </div>
                </div>
              </div>
            </Tab>

            <Tab eventKey="page2" title="Page 2" className="h-120">
              <div className="grid grid-cols-2 gap-0">
                <p>Add some fields here or delete this tab.</p>
              </div>
            </Tab>

            <Tab eventKey="help" title="Help">
              <h1>Help</h1>
              <ul className="list-disc">
                <li>Point 1</li>
                <li>Point 2</li>
              </ul>
            </Tab>
          </Tabs>

          <div className="grid grid-cols-3 gap-0">
            <div className="px-3 ...">
              <button type="submit" disabled={disabled}>
                Save
              </button>
            </div>

            <div className="px-3 ...">
              <button type="button" onClick={returnToList}>
                Cancel
              </button>
            </div>
            <div className="px-3 ...">
              <button type="button" onClick={returnToList}>
                Done
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(FundAdjustmentEdit);
