/**
 Code generated using Python
 @author Raja Reddy
 Date : 13 Oct 2021

 */

import { useState, useEffect } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import LiveSearch from "../utils/LiveSearch";

const schema = yup
  .object({
    usrName: yup.string().required("User Name is required."),
    accountNo: yup.string().required("Account no. is required"),
    loginName: yup.string().required("Login Name is required"),
    designation: yup.object().required("Designation is required"),
    //password: yup.string(),
    //password2: yup.mixed().oneOf([yup.ref('password'), null], 'Passwords must match')
    //age: yup.number().positive().integer().required(),
  })
  .required();

const UsrEdit = () => {
  //const { register, handleSubmit, reset, setValue, getValues, formState: { errors }, clearErrors } = useForm({
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
          .get("/usrs/" + id)
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
          "usrName",
          "accountNo",
          "loginName",
          "designation",
          "gender",
          "section",
          "phone1",
          "phone2",
          "phone3",
          "email",
          "enabled",
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
  }, [id]);

  const onSubmit = (data, event) => {
    event.preventDefault();
    console.log(data);
    if (data.id) {
      axios
        .put("/usrs/" + data.id, data)
        .then((response) => {
          if (response.status === 200) history.push("/usrs");
        })
        .catch((error) => {
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          setServerErrors(error.response.data);
        });
    } else {
      axios
        .post("/usrs", data)
        .then((response) => {
          if (response.status === 200) history.push("/usrs");
        })
        .catch((error) => {
          if (error.response.status == 400)
            setServerErrors("Record already exists");
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          else setServerErrors(error.response.data);
        });
    }
  };

  const onError = (errors, e) => console.log(errors, e);

  //All foreign keys
  const parentData = {
    designation: {
      title: "Designation",
      url: "designations",
      searchList: ["abbr"],
      fkEntity: "designation",
      preload: false,
    },

    section: {
      title: "Section",
      url: "sections",
      searchList: ["sectionName"],
      fkEntity: "section",
      preload: false,
    },
  };

  //Callback for child components (Foreign Keys)
  const callback = (childData) => {
    //console.log("Parent Callback");
    setEntity((prev) => ({ ...prev, [childData.fk]: childData.entity }));
    setValue(childData.fk, childData.entity);
    console.log(errors);
    clearErrors(childData.fk);
  };

  const errorCallback = (err) => {
    //console.log(err);
    setServerErrors(err);
  };

  //console.log(entity);

  const handleInputChange = (e) => {
    console.log(e.target.value);
    console.log(entity.gender);
    //console.log(gender);
    setValue("entity.gender", e.target.value);
  };

  return (
    <div className="max-w-xl mx-auto ">
      <div className="w-full w-3/4  mx-auto ">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <h1>{id === "new" ? "Add" : "Edit"} User </h1>
          <div className="text-red-500">{serverErrors}</div>

          <div className="grid grid-cols-2 gap-0">
            <div>
              <label>User Name</label>
              <input
                type="text"
                name="usrName"
                {...register("usrName")}
                className="form-control py-0"
              />
              <div className="text-red-500">{errors.usrName?.message}</div>
            </div>

            <div className=" ">
              <label>Account No.</label>
              <input
                type="text"
                name="accountNo"
                {...register("accountNo")}
                className="form-control py-0 "
              />
              <div className="text-red-500">{errors.accountNo?.message}</div>
            </div>

            <div>
              <label>Login Name</label>
              <input
                type="text"
                name="loginName"
                {...register("loginName")}
                className="form-control py-0 "
              />
              <div className="text-red-500">{errors.loginName?.message}</div>
            </div>

            <div>
              <LiveSearch
                name="designation"
                onChange={handleInputChange}
                parentData={parentData.designation}
                parentCallback={callback}
                fkEntity={entity.designation}
                errCallback={errorCallback}
              />
              <div className="text-red-500 ">{errors.designation?.message}</div>
            </div>

            <div>
              <LiveSearch
                name="section"
                onChange={handleInputChange}
                parentData={parentData.section}
                parentCallback={callback}
                fkEntity={entity.section}
                errCallback={errorCallback}
              />
              <div className="text-red-500">{errors.section?.message}</div>
            </div>

            <div className="">
              <label>Gender</label>
              <input
                type="radio"
                value="F"
                name="gender"
                {...register("gender")}
                onChange={handleInputChange}
              />{" "}
              Female <span>&nbsp; &nbsp;</span>
              <input
                type="radio"
                value="M"
                name="gender"
                {...register("gender")}
                onChange={handleInputChange}
              />{" "}
              Male <span>&nbsp; &nbsp;</span>
            </div>

            <div>
              <label>Phone 1</label>
              <input
                type="text"
                name="phone1"
                {...register("phone1")}
                className="form-control py-0 "
              />
              <div className="text-red-500">{errors.phone1?.message}</div>
            </div>

            <div>
              <label>Phone 2</label>
              <input
                type="text"
                name="phone2"
                {...register("phone2")}
                className="form-control py-0 "
              />
              <div className="text-red-500">{errors.phone2?.message}</div>
            </div>

            <div>
              <label>Email</label>
              <input
                type="text"
                name="email"
                {...register("email")}
                className="form-control py-0 "
              />
              <div className="text-red-500">{errors.email?.message}</div>
            </div>
            <div>
              <input
                type="checkbox"
                value="true"
                name="enabled"
                {...register("enabled")}
              />
              <span className=" text-sm font-bold"> Enabled </span>
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

export default withRouter(UsrEdit);
