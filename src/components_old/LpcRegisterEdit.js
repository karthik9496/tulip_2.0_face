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
  employee: yup.object().required("Required"),
});

const LpcRegisterEdit = () => {
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
  const [fsType, setFsType] = useState("");

  const [empId, setEmpId] = useState("");
  //const option=useContext(optionSelected);
  const [me, setMe] = useState("");
  const [mesg, setMesg] = useState("");
  const [disDate, setDisDate] = useState("");
  const [miscFs, setMiscFs] = useState(false);
  const [provFs, setProvFs] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    console.log(id);
    //	if (id !== 'new' && id!=='newm' && id!=='newp' && id!=='newr') {
    async function fetchData() {
      let record = "";
      await axios
        .get("/lpcRegisters/" + id)
        .then((response) => {
          record = response.data;
          const fields = [
            "id",
            "dak",
            "employee",
            "dischargeType",
            "dischargeDate",
            "issueDate",
            "cdaoNo",
            "checkDigit",
            "recordStatus",
            "rejectionReason",
            "task",
            "stopPayDescription",
            "qe",
            "do2No",
            "entryApproved",
            "entryAuditor",
            "entryAao",
            "entryAo",
            "entryAuditorDate",
            "entryAaoDate",
            "entryAoDate",
            "cancelled",
            "cancelledAo",
            "cancelledAoDate",
            "fsApproved",
            "fsAuditor",
            "fsAao",
            "fsAo",
            "fsAcda",
            "fsDcda",
            "fsJcda",
            "fsAuditorDate",
            "fsAaoDate",
            "fsAoDate",
            "fsAcdaDate",
            "fsDcdaDate",
            "fsJcdaDate",
            "ecsGenerated",
            "whetherMiscFs",
            "whetherProvisionalFs",
            "provisionalFsApproved",
            "auditorRemarks",
            "aaoRemarks",
            "aoRemarks",
            "fsType",
          ];

          if (record.whetherMiscFs === true) {
            setMiscFs(true);
            setFsType("misc");
          }

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
    //	}
    /*	if(id==='newm'){
			setFsType('misc');
			console.log(id);
		}
		
		if(id==='newr'){
			setFsType('reg');
			console.log(id);
		}*/
  }, []);
  useEffect(() => {
    let fetching = false;
    let unmounted = false;

    async function fetchEmployeeStatus() {
      if (!fetching)
        axios
          .get(`/employees/task/` + empId)
          .then((response) => {
            setEmpId(response.data[4]);
          })
          .catch((error) => {
            //console.log(error);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
    }
    fetchEmployeeStatus();

    return () => {
      fetching = true;
    };
  }, [empId]);
  useEffect(() => {
    let fetching = false;
    let unmounted = false;

    async function fetchCurrentMe() {
      if (!fetching)
        axios
          .get(`/miscs/currentMe`)
          .then((response) => {
            setMe(response.data);
          })
          .catch((error) => {
            //console.log(error);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
    }
    fetchCurrentMe();

    return () => {
      fetching = true;
    };
  }, []);
  const onSubmit = (data, event) => {
    event.preventDefault();
    console.log(data);
    if (data.id) {
      axios
        .put("/lpcRegisters/" + data.id, data)
        .then((response) => {
          setMesg(response.data);
          //	history.push("/lpcRegisters");
        })
        .catch((error) => {
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          setServerErrors(error.response.data);
        });
    } else {
      axios
        .post("/lpcRegisters", data)
        .then((response) => {
          setMesg(response.data);
          //history.push("/lpcRegisters");
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
    //console.log("Parent Callback");
    //setEntity(prev => ({ ...prev, [childData.fk]: childData.entity }));
    setValue(childData.fk, childData.entity);
    if (childData.fk === "employee") setEmpId(childData.entity.id);
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

  const returnToList = () => {
    history.push("/lpcRegisters");
  };

  const handleSelect = (e) => {
    console.log(e.target.value);
    setValue("stopPayDescription", e.target.value);
  };

  return (
    //<div className="max-w-xl mx-auto ">
    //	<div className="w-full w-3/4  mx-auto " >
    <div className="min-h-screen bg-gray-200 text-gray-900">
      <div className="max-w-5xl mx-auto px-8 sm:px-6 lg:px-10 pt-4">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <h1>{id === "new" ? "Add" : "Edit"} Final Settlement Edit </h1>

          <Tabs
            id="LpcRegisterEdit"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <div className="text-red-500">{mesg}</div>
            <Tab eventKey="page1" title="Page 1" className="h-120">
              <div className="grid grid-cols-2 gap-0">
                <div className="text-red-500">{mesg}</div>
                <div>
                  <label>Month</label>
                  {me}
                </div>

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
                    <label>{empId}</label>
                    {errors.employee?.message}
                  </div>
                </div>

                <div>
                  <label>Discharge Type</label>
                  <select
                    name="stopPayDescription"
                    {...register("stopPayDescription")}
                    className="form-control py-0"
                    onChange={handleSelect}
                  >
                    <option value="0">--select---</option>

                    <option value="RETIRE">RETIRE</option>
                    <option value="RELEASE">RELEASE</option>
                    <option value="DEATH">DEATH</option>
                    <option value="KILLED">KILLED</option>
                    <option value="CASHRNG">CASHRNG</option>
                    <option value="COMPRETD">COMPRETD</option>
                    <option value="DISMISS">DISMISS</option>
                    <option value="PRERETIRE">PRERETIRE</option>
                    <option value="RESIGN">RESIGN</option>
                    <option value="SUPERANNUATION">SUPERANNUATION</option>
                  </select>
                </div>

                {fsType === "misc" && (
                  <div>
                    <label>Discharge Date</label>
                    <input
                      type="date"
                      name="dischargeDate"
                      {...register("dischargeDate")}
                      className="form-control py-0"
                    />
                    <div className="text-red-500">
                      {errors.dischargeDate?.message}
                    </div>
                  </div>
                )}
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
            <div className="px-4">
              <button type="submit">Save</button>
            </div>
            <div className="px-4">
              <button type="submit" onClick={returnToList}>
                Cancel
              </button>
            </div>
            <div className="px-4">
              <button type="submit" onClick={returnToList}>
                Done
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(LpcRegisterEdit);
