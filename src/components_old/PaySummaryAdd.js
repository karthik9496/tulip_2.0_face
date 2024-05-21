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
  
});

const PaySummaryAdd = () => {
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
  const [empId, setEmpId] = useState(0);
  const [basicPay, setBasicPay] = useState();
  const [payElementData, setPayElementData] = useState([]);
  const [rank, setRank] = useState("");
  const [rankName, setRankName] = useState("");

  //pcdao -- for showing message if user not AO.
  const [msg, setMsg] = useState("");

   

  const onSubmit = (data, event) => {
    event.preventDefault();
    console.log(data);
    if (empId) {
      axios
        .put("/paySummarys/addnew/"+empId)
        .then((response) => {
          setServerErrors(response.data);
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
     
  };

  //Callback for child components (Foreign Keys)
  const callback = (childData) => {
    console.log("Parent Callback"+childData.entity.officerName);
    
    
    if (childData.fk === "employee") {
		setEmpId(childData.entity.id);
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
              <div>
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

export default withRouter(PaySummaryAdd);
