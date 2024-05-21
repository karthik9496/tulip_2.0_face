import { useState, useEffect } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import LiveSearch from "../utils/LiveSearch";
import { clippingParents } from "@popperjs/core";

const schema = yup.object({
  fromDate: yup.date().required("Required"),

  //withholdPercentage: yup.number().required('Required'),

  //withholdPercentage: yup.number().max(100),
  //amount: yup.number(),
});

const WithholdEdit = () => {
  const {
    register,
    handleSubmit,
    getValues,
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
  const [readAble, setReadAble] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let isCancelled = false;
    console.log(id);
    if (id !== "new") {
      setReadAble(true);
      async function fetchData() {
        let record = "";
        await axios
          .get("/withholdPay/" + id)
          .then((response) => {
            record = response.data;

            const fields = [
              "id",
              "cdaoNo",
              "checkDigit",
              "fkAuditCage",
              "basicPay",
              "da",
              "msp",
              "fromDate",
              "toDate",
              "fkAao",
              "fkAo",
              "fkAuditor",
              "auditorDate",
              "aaoDate",
              "aoDate",
              "recordStatus",
              "createdAt",
              "employee",
              "approved",
              "remarks",
              "withholdPercentage",
              "amount",
            ];

            fields.forEach((field) => setValue(field, record[field]));
          })
          .catch((error) => {
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

  const onSubmit = (value, event) => {
    event.preventDefault();
    console.log("iddddddd", id);
    console.log("value ache", value);
    let validity = false;
    if (value.withholdPercentage.length > 0 || value.amount.length > 0) {
      if (value.withholdPercentage.length > 0) {
        validity = value.basicPay || value.da || value.msp ? true : false;
        console.log("validity", validity);
        validity ? setMessage("") : setMessage("Enable check box");
      } else {
        if (!(value.basicPay || value.da || value.msp)) {
          validity = true;
          console.log("validity", validity);
        } else {
          let msg = message + ". Please Enter the Withhold percentage ";
          setMessage(msg);
        }
      }
    } else setMessage("Invalid");
    if (validity) {
      if (id === "new") {
        axios
          .post("/withholdPay/new", value)
          .then((response) => {
            if ((response.status = 200)) history.push("/withholdPay");
          })
          .catch((error) => {
            //console.log(error.response.data);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            if (error.response.status == 400) setServerErrors("Not Allowed");
            else setServerErrors("Error");
          });
        console.log("aaa");
      } else {
        axios
          .post(`/withholdPay/${id}/edit`, value)
          .then((response) => {
            if ((response.status = 200)) history.push("/withholdPay");
          })
          .catch((error) => {
            if (error.response.status == 400)
              setServerErrors(error.response.data);
            else setServerErrors("Error");
            console.log("errror", error.response);
          });
      }
    } else {
      console.log("amammamama", value);
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

  const handleCheckBox = (index) => (e) => {
    console.log(e.target.checked);
    /* let item = data[index];
  
 item['select'] = e.target.checked;
 let newData = [...data];
 newData[index] = item;
 setData(newData);
 console.log(data);	*/
  };

  const handleInputChange = (e) => {
    //console.log(e.target.value);
  };

  const handleButtonClick = (e) => {
    history.push("/withholdPay");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="w-full  mx-auto ">
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="bg-gray-100 rounded-lg py-10 px-10"
        >
          <h1>{id === "new" ? "Add" : "Edit"} Withhold </h1>
          <div className="text-red-500">{serverErrors}</div>
          <div className="text-red-500">{message}</div>
          <div className="grid grid-cols-2 gap-0 my-2">
            <div>
              <LiveSearch
                name="employee"
                onChange={handleInputChange}
                parentData={parentData.employee}
                parentCallback={callback}
                fkEntity={entity.employee}
                errCallback={errorCallback}
                readOnly={readAble}
              />
              <div className="text-red-500 ">{errors.employee?.message}</div>
            </div>

            <div>
              <label>From Date</label>
              <input
                type="date"
                name="fromDate"
                {...register("fromDate")}
                readOnly={readAble}
                disabled={readAble}
              />
              <div className="text-red-500">{errors.fromDate?.message}</div>
            </div>

            <div className="my-3">
              <label>To Date</label>
              <input type="date" name="toDate" {...register("toDate")} />
              <div className="text-red-500">{errors.toDate?.message}</div>
            </div>

            <div className="my-3">
              <label>Withhold Percentage</label>
              <input
                max={100}
                type="number"
                name="withholdPercentage"
                {...register("withholdPercentage")}
                readOnly={readAble}
                disabled={readAble}
              />
              <div className="text-red-500">
                {errors.withholdPercentage?.message}
              </div>
            </div>

            <div className="grid grid-cols-3 my-3">
              <div>
                <label>Basic Pay</label>
                <input
                  className="w-6 h-6"
                  type="checkbox"
                  disabled={readAble}
                  {...register("basicPay")}
                  onChange={handleCheckBox}
                />
              </div>

              <div className="mx-4 ">
                <label>DA</label>
                <input
                  disabled={readAble}
                  className="w-6 h-6 "
                  type="checkbox"
                  {...register("da")}
                  //checked={lightTheme}
                  onChange={handleCheckBox}
                />
              </div>

              <div className="mx-4">
                <label>MSP</label>
                <input
                  disabled={readAble}
                  className="w-6 h-6"
                  type="checkbox"
                  {...register("msp")}
                  //checked={lightTheme}
                  onChange={handleCheckBox}
                />
              </div>
            </div>
          </div>

          <div className="my-3">
            <label>Withhold Amount for Current Month</label>
            <input
              type="number"
              name="amount"
              {...register("amount")}
              readOnly={readAble}
              disabled={readAble}
            />
            <div className="text-red-500">{errors.amount?.message}</div>
          </div>
          <div>
            <label>Remarks</label>
            <textarea
              className="w-full h-24 px-2 mt-1"
              type="text"
              name="remarks"
              {...register("remarks")}
              readOnly={readAble}
              disabled={readAble}
            />
            <div className="text-red-500">{errors.remarks?.message}</div>
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
export default withRouter(WithholdEdit);
