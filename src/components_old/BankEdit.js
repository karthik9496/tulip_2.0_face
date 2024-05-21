/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By :
 */

import { useState, useEffect } from "react";
import {
  withRouter,
  useParams,
  useHistory,
  useLocation,
} from "react-router-dom";
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
  bankName: yup.string().required("Required"),
  bankBranch: yup.string().required("Required"),
  bankStation: yup.string().required("Required"),

  ifsc: yup.string().required("Required"),
});

const BankEdit = () => {
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
  const [usr, setUsr] = useState({});
  const [serverErrors, setServerErrors] = useState([]);
  const [entity, setEntity] = useState({});
  const [state, setState] = useState({});
  const [key, setKey] = useState("page1");

  useEffect(() => {
    let usr = JSON.parse(sessionStorage.getItem("usr"));
    setUsr(usr);
  }, []);

  useEffect(() => {
    let isCancelled = false;
    console.log(id);
    if (id !== "new") {
      async function fetchData() {
        let record = "";
        await axios
          .get("/banks/" + id)
          .then((response) => {
            record = response.data;
            console.log(response.data);
            const fields = [
              "id",
              "treasuryBank",
              "auditorDate",
              "aaoDate",
              "aoDate",
              "approved",
              "bankName",
              "bankBranch",
              "bankStation",
              "recordStatus",
              "treasuryCode",
              "micr",
              "ifsc",
              "oldIfsc",
              "rtgsCode",
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
    event.preventDefault();
    console.log(data);
    if (data.id) {
      axios
        .put("/banks/" + data.id, data)
        .then((response) => {
          if (response.status === 200) history.push("/banks");
        })
        .catch((error) => {
          //console.log(error.response.data);
          console.log(error.response.status);
          //console.log(error.response.headers);
          setServerErrors(error.response.data);
        });
    } else {
      axios
        .post("/banks", data)
        .then((response) => {
          console.log(response.data);
          if (response.status === 200)
            history.push({ pathname: "/banks", state: response.data });
        })
        .catch((error) => {
          //console.log(error.response.data);

          console.log(error.response.status);
          //console.log(error.response.headers);
          setServerErrors(error.response.data);
        });
    }
  };

  const onError = (errors, e) => console.log(errors, e);

  //All foreign keys.
  // XXXXXX Add search fields and adjust the values as necessary
  const parentData = {
    treasuryBank: {
      title: "Treasury Bank",
      url: "treasuryBanks",
      searchList: ["id"], //XXXXXXXXX Add search fields here and also in the corresponding repository
      fkEntity: "treasuryBank",
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
      <div className="w-full  mx-auto ">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <h1>{id === "new" ? "Add" : "Edit"} Bank </h1>
          <div className="text-red-500">{serverErrors}</div>

          <div className="grid grid-cols-2 gap-0">
            <div>
              <label>Bank Name</label>
              <input
                type="text"
                name="bankName"
                {...register("bankName")}
                className="form-control py-0"
              />
              <div className="text-red-500">{errors.bankName?.message}</div>
            </div>

            <div>
              <label>Bank Branch</label>
              <input
                type="text"
                name="bankBranch"
                {...register("bankBranch")}
                className="form-control py-0"
              />
              <div className="text-red-500">{errors.bankBranch?.message}</div>
            </div>

            <div>
              <label>Bank Station</label>
              <input
                type="text"
                name="bankStation"
                {...register("bankStation")}
                className="form-control py-0"
              />
              <div className="text-red-500">{errors.bankStation?.message}</div>
            </div>

            <div>
              <label>Ifsc</label>
              <input
                type="text"
                name="ifsc"
                {...register("ifsc")}
                className="form-control py-0"
              />
              <div className="text-red-500">{errors.ifsc?.message}</div>
            </div>

            <div>
              <label>Treasury Code</label>
              <input
                type="text"
                name="treasuryCode"
                {...register("treasuryCode")}
                className="form-control py-0"
              />
              <div className="text-red-500">{errors.treasuryCode?.message}</div>
            </div>

            <div>
              <label>Micr</label>
              <input
                type="text"
                name="micr"
                {...register("micr")}
                className="form-control py-0"
              />
              <div className="text-red-500">{errors.micr?.message}</div>
            </div>
          </div>

          <div className="px-8">
            <button type="submit">
              {usr?.designation?.designationLevel < 30 && "Save"}
              {usr?.designation?.designationLevel >= 30 &&
                usr?.designation?.designationLevel <= 40 &&
                "Submit"}
              {usr?.designation?.designationLevel >= 50 && "Approve"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(BankEdit);
