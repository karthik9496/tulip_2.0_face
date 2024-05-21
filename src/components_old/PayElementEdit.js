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
  employee: yup.object().required("Required"),
  basicPay: yup.number().integer().required("Required"),
});

const PayElementEdit = () => {
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

  const [rankCode, setRankCode] = useState("");
  const [empId, setEmpId] = useState();
  const [basicPay, setBasicPay] = useState();
  const [payElementData, setPayElementData] = useState([]);
  const [rank, setRank] = useState("");
  const [rankName, setRankName] = useState("");

  //pcdao -- for showing message if user not AO.
  const [msg, setMsg] = useState("");

  useEffect(() => {
    let isCancelled = false;
    console.log(id);
    if (id !== "new") {
      async function fetchData() {
        let record = "";
        await axios
          .get("/payElements/" + id)
          .then((response) => {
            record = response.data;
            const fields = [
              "id",
              "employee",
              "cancelDo2",
              "cancelled",
              "discharged",
              "effective",
              "oldRankPay",
              "do2",
              "fromDate",
              "toDate",
              "basicPay",
              "dp",
              "gradePay",
              "rankPay",
              "msPay",
              "npaPay",
              "specialistPay",
              "oldBasicPay",
              "absent",
              "deputation",
              "cdaoNo",
              "checkDigit",
              "payLevel",
              "monthEnding",
              "deputationStatus",
              "recordStatus",
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
        setRankCode(
          record.employee.rank.rankName +
            ":" +
            record.employee.rank.rankCode.toString()
        );
        console.log(
          record.employee.rank.rankName +
            ":" +
            record.employee.rank.rankCode.toString()
        );
        setEmpId(record.employee.id);

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
    event.preventDefault();
    console.log(data);
    if (data.id) {
      axios
        .put("/payElements/" + data.id, data)
        .then((response) => {
          history.push("/payElements");
        })
        .catch((error) => {
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          setServerErrors(error.response.data);
        });
    } else {
	  //pcdao -- added condition to show message if user not AO.
      axios
        .post("/payElements", data)
        .then((response) => {
          if (response.data) {
            history.push("/payElements");
          } else {
            setMsg("Facility Available only for AO.");
          }
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
      searchList: ["cdaoNo", "checkDigit", "officerName"], //XXXXXXXXX Add search fields here and also in the corresponding repository
      fkEntity: "employee",
    },
    cancelDo2: {
      title: "Cancel Do2",
      url: "cancelDo2s",
      searchList: ["id"], //XXXXXXXXX Add search fields here and also in the corresponding repository
      fkEntity: "cancelDo2",
    },
    do2: {
      title: "Do2",
      url: "do2s",
      searchList: ["id"], //XXXXXXXXX Add search fields here and also in the corresponding repository
      fkEntity: "do2",
    },
  };

  //Callback for child components (Foreign Keys)
  const callback = (childData) => {
    //console.log("Parent Callback");
    setEntity((prev) => ({ ...prev, [childData.fk]: childData.entity }));
    setValue(childData.fk, childData.entity);
    if (childData.fk === "employee") {
      setRankCode(
        childData.entity.rank.rankName +
          ":" +
          childData.entity.rank.rankCode.toString()
      );
    }
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

  return (
    <div className="max-w-xl mx-auto ">
      <div className="w-full w-3/4  mx-auto ">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <h1>{id === "new" ? "Add" : "Edit"} Pay Element </h1>

		  {/* pcdao -- added message if user not AO */}
          <h6 className="text-red-500">{msg}</h6>
          <div className="text-red-500">{serverErrors}</div>
          <Tabs
            id="PayElementEdit"
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
                  <label>Rank</label>
                  <input
                    type="text"
                    name="rank"
                    value={rankCode}
                    readOnly
                    className="form-control py-0"
                  />
                </div>

                <div>
                  <label>From Date</label>
                  <input
                    type="date"
                    name="fromDate"
                    {...register("fromDate")}
                    className="form-control py-0"
                  />
                  <div className="text-red-500">{errors.fromDate?.message}</div>
                </div>

                <div>
                  <label>Basic Pay</label>
                  <input
                    type="text"
                    name="basicPay"
                    {...register("basicPay")}
                    className="form-control py-0"
                  />
                  <div className="text-red-500">{errors.basicPay?.message}</div>
                </div>
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

          <div className="px-4">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(PayElementEdit);
