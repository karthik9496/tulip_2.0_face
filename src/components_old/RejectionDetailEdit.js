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

const schema = yup.object({
  //    dakType: yup.object().required('Required'),
  //section: yup.object().required('Required'),
  rejectionName: yup.string().required("Required"),
  //  module: yup.string().required('Required'),
  //   otherrejection: yup.string().required('Required'),
});

const RejectionDetailEdit = () => {
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

  useEffect(() => {
    let isCancelled = false;
    console.log(id);
    if (id !== "new") {
      async function fetchData() {
        let record = "";
        await axios
          .get("/rejectionDetails/" + id)
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
          "dakType",
          "section",
          "rejectionName",
		  "rejectionHindiName",
          "module",
          "otherrejection",
          "caption",
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
        .put("/rejectionDetails/" + data.id, data)
        .then((response) => {
          history.push("/rejectionDetails");
        })
        .catch((error) => {
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          setServerErrors(error.response.data);
        });
    } else {
      axios
        .post("/rejectionDetails", data)
        .then((response) => {
          history.push("/rejectionDetails");
        })
        .catch((error) => {
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          setServerErrors(error.response.data);
        });
    }

    history.push("/rejectionDetails");
  };

  const onError = (errors, e) => console.log(errors, e);

  //All foreign keys.
  // XXXXXX Add search fields and adjust the values as necessary
  const parentData = {
    dakType: {
      title: "Dak Type",
      url: "dakTypes",
      searchList: ["id"], //XXXXXXXXX Add search fields
      fkEntity: "dakType",
      preload: false, //XXXXXX Set this to true for small tables like designations
    },
    section: {
      title: "Section",
      url: "sections",
      searchList: ["sectionName"], //XXXXXXXXX Add search fields
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

  const handleInputChange = (e) => {
    //console.log(e.target.value);
  };

  return (
    <div className="max-w-xl mx-auto ">
      <div className="w-full w-3/4  mx-auto ">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <h1>{id === "new" ? "Add" : "Edit"} Rejection Detail </h1>
          <div className="text-red-500">{serverErrors}</div>

          <div className="grid grid-cols-1 gap-0">
            <div>
              <label>Rejection Name</label>
              <textarea
                type="text"
                name="rejectionName"
                {...register("rejectionName")}
                className="form-control py-0"
              />
              <div className="text-red-500">
                {errors.rejectionName?.message}
              </div>
            </div>

			<div>
              <label>Rejection Hindi Name</label>
              <textarea
                type="text"
                name="rejectionHindiName"
                {...register("rejectionHindiName")}
                className="form-control py-0"
              />
              <div className="text-red-500">
                {errors.rejectionHindiName?.message}
              </div>
            </div>

            <div>
              <label>Caption</label>
              <input
                type="text"
                name="caption"
                {...register("caption")}
                className="form-control py-0"
              />
              <div className="text-red-500">{errors.caption?.message}</div>
            </div>
          </div>
          <div className="px-4">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(RejectionDetailEdit);
