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

  bank: yup.object().required("Required"),

  bankAccountClearText: yup.string().required("Required"),

  //ifsc: yup.string().required('Required'),
});

const BankAccountEdit = () => {
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
  const [disable, setDisable] = useState(false);
  const [editable, setEditable] = useState(false);
  const [usr, setUsr] = useState({});
  const [onlyRead, setOnlyRead] = useState(false);

  useEffect(() => {
    let usr = JSON.parse(sessionStorage.getItem("usr"));
    setUsr(usr);
    console.log(usr);
  }, []);
  useEffect(() => {
    if (usr?.designation?.designationLevel >= 30) {
      setOnlyRead(true);
    }
  }, [usr]);

  useEffect(() => {
    let isCancelled = false;
    console.log(id);
    if (id !== "new") {
      async function fetchData() {
        let record = "";
        await axios
          .get("/bankAccounts/" + id)
          .then((response) => {
            record = response.data;
            console.log("bank account data >> ", record);
            const fields = [
              "id",
              "dak",
              "auditorDate",
              "aaoDate",
              "aoDate",
              "action",
              "approved",
              "bank",
              "employee",
              "unit",
              "imprest",
              "familyDetail",
              "batchNo",
              "beneficiaryCategory",
              "bankAccountNo",
              "remarks",
              "reason",
              "accountType",
              "recordStatus",
              "ifsc",
              "bankAccountClearText",
              "vendor",
            ];
            console.log(record["action"]);
            if (record["action"] === "Editable") setEditable(true);
            if (record["action"] === "Disable") setDisable(true);
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
    } else setEditable(true);
  }, [id, setValue]);

  const onSubmit = (data, event) => {
    event.preventDefault();
    console.log("bank Data edit >> ", data);
    if (data.id) {
      axios
        .put("/bankAccounts/" + data.id, data)
        .then((response) => {
          if (response.status == 200) history.push("/bankAccounts");
          else setServerErrors(response.data);
        })
        .catch((error) => {
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          setServerErrors(error.response.data);
        });
    } else {
      axios
        .post("/bankAccounts", data)
        .then((response) => {
          if (response.status == 200) history.push("/bankAccounts");
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
    bank: {
      title: "Bank",
      url: "banks",
      searchList: ["ifsc", "bankName"], //XXXXXXXXX Add search fields here and also in the corresponding repository
      fkEntity: "bank",
    },
    employee: {
      title: "Employee",
      url: "employees",
      searchList: ["cdaoNo", "officerName"], //XXXXXXXXX Add search fields here and also in the corresponding repository
      fkEntity: "employee",
    },
    vendor: {
      title: "Vendor",
      url: "vendors",
      searchList: ["vendorName"], //XXXXXXXXX Add search fields here and also in the corresponding repository
      fkEntity: "vendor",
    },
    unit: {
      title: "Unit",
      url: "units",
      searchList: ["id"], //XXXXXXXXX Add search fields here and also in the corresponding repository
      fkEntity: "unit",
    },
    imprest: {
      title: "Imprest",
      url: "imprests",
      searchList: ["id"], //XXXXXXXXX Add search fields here and also in the corresponding repository
      fkEntity: "imprest",
    },
    familyDetail: {
      title: "Family Detail",
      url: "familyDetails",
      searchList: ["id"], //XXXXXXXXX Add search fields here and also in the corresponding repository
      fkEntity: "familyDetail",
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
    <div className="max-w-3xl mx-auto ">
      <div className="w-full   mx-auto ">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <h1>{id === "new" ? "Add" : "Edit"} Bank Account </h1>
          <div className="text-red-500">{serverErrors}</div>
          {console.log(editable)}
          {editable && (
            <div className="grid grid-cols-2 gap-0">
              <div className="m-2">
                <LiveSearch
                  name="dak"
                  onChange={handleInputChange}
                  parentData={parentData.dak}
                  parentCallback={callback}
                  fkEntity={entity.dak}
                  errCallback={errorCallback}
                  readOnly
                />
                <div className="text-red-500 ">{errors.dak?.message}</div>
              </div>

              <div className="m-2">
                <LiveSearch
                  name="bank"
                  onChange={handleInputChange}
                  parentData={parentData.bank}
                  parentCallback={callback}
                  fkEntity={entity.bank}
                  errCallback={errorCallback}
                  readOnly={onlyRead}
                />
                <div className="text-red-500 ">{errors.bank?.message}</div>
              </div>
              {/* {entity?.bank && (
                <>
                  <div className="m-2">
                    <label>Bank Branch</label>
                    <input defaultValue={entity?.bank?.bankBranch} readOnly />
                  </div>
                  <div className="m-2">
                    <label>Bank Station</label>
                    <input defaultValue={entity?.bank?.bankStation} readOnly />
                  </div>
                </>
              )} */}

              <div className="m-2">
                <label>Bank Branch</label>
                <input
                  type="text"
                  name="bankBranch"
                  {...register("bank.bankBranch")}
                  className="form-control py-0"
                  readOnly={onlyRead}
                />
                <div className="text-red-500">
                  {errors.bank?.bankStation?.message}
                </div>
              </div>

              <div className="m-2">
                <label>Bank Station</label>
                <input
                  type="text"
                  name="bankStation"
                  {...register("bank.bankStation")}
                  className="form-control py-0"
                  readOnly={onlyRead}
                />
                <div className="text-red-500">
                  {errors.bank?.bankStation?.message}
                </div>
              </div>

              <div className="m-2">
                <LiveSearch
                  name="employee"
                  onChange={handleInputChange}
                  parentData={parentData.employee}
                  parentCallback={callback}
                  fkEntity={entity.employee}
                  errCallback={errorCallback}
                  readOnly={onlyRead}
                />
                <div className="text-red-500 ">{errors.employee?.message}</div>
              </div>

              <div className="m-2">
                <LiveSearch
                  name="vendor"
                  onChange={handleInputChange}
                  parentData={parentData.vendor}
                  parentCallback={callback}
                  fkEntity={entity.vendor}
                  errCallback={errorCallback}
                  readOnly={onlyRead}
                />
                <div className="text-red-500 ">{errors.vendor?.message}</div>
              </div>

              <div className="m-2">
                <label>Bank Account No</label>
                <input
                  type="text"
                  name="bankAccountClearText"
                  {...register("bankAccountClearText")}
                  className="form-control py-0"
                  readOnly={onlyRead}
                />
                <div className="text-red-500">
                  {errors.bankAccountNo?.message}
                </div>
              </div>

              <div className="m-2">
                <label>Account Type</label>
                <div className="flex">
                  <label>
                    <input
                      type="radio"
                      value="10"
                      name="accountType"
                      {...register("accountType")}
                    />
                    Savings
                  </label>
                  <label className="ml-5">
                    <input
                      type="radio"
                      value="20"
                      name="accountType"
                      {...register("accountType")}
                    />
                    Current
                  </label>
                </div>
                {/* <span>&nbsp; &nbsp;</span>
                <input
                  type="radio"
                  value="11"
                  name="accountType"
                  {...register("accountType")}
                />{" "}
                Current <span>&nbsp; &nbsp;</span> */}
              </div>
            </div>
          )}

          {disable && (
            <div className="grid grid-cols-2 gap-0">
              <div className="m-2">
                <label>CDAO No</label>
                <input
                  type="text"
                  name="employee"
                  {...register("employee.cdaoNo")}
                  readOnly
                  className="form-control py-0"
                />
                <div className="text-red-500">
                  {errors.accountType?.message}
                </div>
              </div>
              {entity?.employee?.officerName && (
                <div className="m-2">
                  <label>Name</label>
                  <input
                    type="text"
                    name="empName"
                    {...register("employee.officerName")}
                    readOnly
                    className="form-control py-0"
                  />
                  <div className="text-red-500">
                    {errors.accountType?.message}
                  </div>
                </div>
              )}
              <div className="m-2">
                <label>Ifsc</label>
                <input
                  type="text"
                  name="ifsc"
                  {...register("ifsc")}
                  readOnly
                  className="form-control py-0"
                />
                <div className="text-red-500">
                  {errors.accountType?.message}
                </div>
              </div>

              <div className="m-2">
                <label>AccountNo</label>
                <input
                  type="text"
                  name="bankAccountText"
                  {...register("bankAccountClearText")}
                  readOnly
                  className="form-control py-0"
                />
                <div className="text-red-500">
                  {errors.accountType?.message}
                </div>
              </div>
              <div className="m-2">
                <label>Vendor</label>
                <input
                  type="text"
                  name="vendor"
                  {...register("vendor.vendorName")}
                  readOnly
                  className="form-control py-0"
                />
                <div className="text-red-500">
                  {errors.vendor?.vendorName?.message}
                </div>
              </div>
            </div>
          )}

          <div className="px-4">
            {editable && <button type="submit">Submit</button>}

            {disable && <button type="submit">Disable</button>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(BankAccountEdit);
