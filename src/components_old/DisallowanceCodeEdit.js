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

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from "date-fns/addDays";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

const schema = yup.object({
  // section: yup.object().required('Required'),
  disallowanceName: yup.string().required("Required"),
  //  module: yup.string().required('Required'),
  // recordStatus: yup.string().required('Required'),
  // remarks: yup.string().required('Required'),
});

const DisallowanceCodeEdit = () => {
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

  useEffect(() => {
    let isCancelled = false;
    console.log(id);
    if (id !== "new") {
      async function fetchData() {
        let record = "";
        await axios
          .get("/disallowanceCodes/" + id)
          .then((response) => {
            record = response.data;
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
          "section",
          "disallowanceName",
		  "disallowanceHindiName",
          "module",
          "recordStatus",
          "remarks",
          "subModule",
        ];
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

  const onSubmit = (data, event) => {
    event.preventDefault();
    console.log(data);
    if (data.id) {
      axios
        .put("/disallowanceCodes/" + data.id, data)
        .then((response) => {})
        .catch((error) => {
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          setServerErrors(error.response.data);
        });
    } else {
      axios
        .post("/disallowanceCodes", data)
        .then((response) => {})
        .catch((error) => {
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          setServerErrors(error.response.data);
        });
    }

    history.push("/disallowanceCodes");
  };

  const onError = (errors, e) => console.log(errors, e);

  //All foreign keys.
  // XXXXXX Add search fields and adjust the values as necessary
  const parentData = {
    section: {
      title: "Section",
      url: "sections",
      searchList: ["id"], //XXXXXXXXX Add search fields
      fkEntity: "section",
      preload: false, //XXXXXX Set this to true for small tables like designations
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
  const returnToList = () => {
    history.push("/disallowanceCodes");
  };

  const handleInputChange = (e) => {
    //console.log(e.target.value);
  };

  return (
    <div className="max-w-xl mx-auto ">
      <div className="w-full w-3/4  mx-auto ">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <h1>{id === "new" ? "Add" : "Edit"} Disallowance Code </h1>
          <div className="text-red-500">{serverErrors}</div>
          <Tabs
            id="GrievanceEdit"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="page1" title="Page 1" className="h-120">
              <div className="grid grid-cols-1 gap-0">
                <div>
                  <label>Disallowance Description</label>
                  <textarea
                    type="text"
                    name="disallowanceName"
                    {...register("disallowanceName")}
                    className="form-control py-0"
                  />
                  <div className="text-red-500">
                    {errors.disallowanceName?.message}
                  </div>
                </div>

				<div>
                  <label>Disallowance Hindi Description</label>
                  <textarea
                    type="text"
                    name="disallowanceHindiName"
                    {...register("disallowanceHindiName")}
                    className="form-control py-0"
                  />
                  <div className="text-red-500">
                    {errors.disallowanceHindiName?.message}
                  </div>
                </div>

                <div>
                  <label>Disallowance Code</label>
                  <input
                    type="text"
                    name="subModule"
                    {...register("subModule")}
                    className="form-control py-0"
                  />
                  <div className="text-red-500">
                    {errors.subModule?.message}
                  </div>
                </div>

                <div>
                  <label>Remarks</label>
                  <textarea
                    type="text"
                    name="remarks"
                    {...register("remarks")}
                    className="form-control py-0"
                  />
                  <div className="text-red-500">{errors.remarks?.message}</div>
                </div>
              </div>
            </Tab>
          </Tabs>

          <div className="grid grid-cols-2 gap-0">
            <button type="submit">Save</button>
            <button type="button" onClick={returnToList}>
              Done
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(DisallowanceCodeEdit);
