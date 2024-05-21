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
  dak: yup.object().required("Required"),
  // paymentMode: yup.object().required('Required'),
});

const IafCda13Edit = () => {
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
  const [dakid, setDakid] = useState("");
  const [cmpRejList, setCmpRejList] = useState([]);
  const [cmpRejAdjustedList, setCmpRejAdjustedList] = useState([]);
  const [act, setAct] = useState("");

  useEffect(() => {
    let isCancelled = false;
    console.log(id);
    if (id !== "new") {
      async function fetchData() {
        let record = "";
        await axios
          .get("/iafCda13s/" + id)
          .then((response) => {
            record = response.data;
            setDakid(record.dak.dakidNo);
            if (record.cmpRejList != null) setCmpRejList(record.cmpRejList);
            if (record.cmpRejAdjustedList != null)
              setCmpRejAdjustedList(record.cmpRejAdjustedList);
            setAct(record.action);
            const fields = [
              "id",
              "dak",
              "paymentMode",
              "section",
              "sectionCode",
              "unit",
              "employee",
              "schedule3",
              "itemAmount",
              "bankAccount",
              "approved",
              "auditorDate",
              "aaoDate",
              "aoDate",
              "goDate",
              "cda13Date",
              "amount",
              "cdaoNo",
              "checkDigit",
              "cda13No",
              "multipleCmpRejection",
              "rejectedCmpReferenceNo",
              "rejectedChequeNo",
              "recordStatus",
              "reason",
              "remarks",
              "oldDakId",
              "paymentType",
              "rejectionType",
              "cmpRejList",
              "cmpRejAdjustedList",
              "action",
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
        .put("/iafCda13s/" + data.id, data)
        .then((response) => {})
        .catch((error) => {
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          setServerErrors(error.response.data);
        });
    } else {
      axios
        .post("/iafCda13s", data)
        .then((response) => {})
        .catch((error) => {
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          setServerErrors(error.response.data);
        });
    }

    history.push("/iafCda13s");
  };

  const onError = (errors, e) => console.log(errors, e);

  //All foreign keys.
  // XXXXXX Add search fields and adjust the values as necessary
  const parentData = {};

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

  async function handleButtonClick() {
    console.log(id);
    await axios
      .put(`/iafCda13s/generatePmCs/${id}`)
      .then(() => {
        history.push("/iafCda13s");
      })
      .catch((error) => {
        console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });
  }

  async function submitCda13() {
    console.log(id);
    await axios
      .put(`/iafCda13s/submit/${id}`)
      .then(() => {
        history.push("/iafCda13s");
      })
      .catch((error) => {
        console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });
  }

  async function approveCda13() {
    console.log(id);
    await axios
      .put(`/iafCda13s/approve/${id}`)
      .then(() => {
        history.push("/iafCda13s");
      })
      .catch((error) => {
        console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });
  }
  const handleCheckBox = (index) => (e) => {
    console.log(index);
    cmpRejList[index].select = e.target.checked;

    setValue("cmpRejList", cmpRejList);
  };
  const handleInputChange = (e) => {
    //console.log(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <h1>{id === "new" ? "Add" : "Edit"} Iaf Cda13 </h1>
          <div className="text-red-500">{serverErrors}</div>

          <div className="grid grid-cols-1 gap-0">
            <div>
              <label>Dak Id</label>
              <input type="text" value={dakid} readOnly />
              <div className="text-red-500">{errors.cda13No?.message}</div>
            </div>

            <div>
              <label>Cda13 No</label>
              <input type="text" name="cda13No" {...register("cda13No")} />
              <div className="text-red-500">{errors.cda13No?.message}</div>
            </div>

            <div>
              <label>Cda13 Date</label>
              <input type="date" name="cda13Date" {...register("cda13Date")} />
              <div className="text-red-500">{errors.cda13Date?.message}</div>
            </div>

            <div>
              <label>Remarks</label>
              <textarea type="text" name="remarks" {...register("remarks")} />
              <div className="text-red-500">{errors.remarks?.message}</div>
            </div>
          </div>

          <div className="container">
            <h1 class="text-blue-600" align="center">
              CMP Rejection Adjusted in current CDA13
            </h1>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Dak Id</th>
                  <th>Emp</th>
                  <th>Cmp File</th>
                  <th>Cmp Date</th>
                  <th>Ref No</th>
                  <th>Amount</th>
                  <th>Ifsc</th>
                  <th>Bank Account</th>
                  <th>New Ifsc</th>
                  <th>New Bank Account</th>
                </tr>
                {cmpRejAdjustedList &&
                  cmpRejAdjustedList.map((tr, rowIndex) => (
                    <tr key={tr.rejectionDakId}>
                      <td>{tr.rejectionDakId}</td>
                      <td>
                        {tr.empName}
                        <br />
                        {tr.cdaoNo}
                      </td>
                      <td>{tr.cmpFile}</td>
                      <td>{tr.cmpDate}</td>
                      <td>{tr.paymentRefNo}</td>
                      <td>{tr.amount}</td>
                      <td>{tr.oldIfsc}</td>
                      <td>{tr.oldBankAccountNo}</td>
                      <td>{tr.newIfsc}</td>
                      <td>{tr.newBankAccountNo}</td>
                    </tr>
                  ))}
              </thead>

              <tbody>
                {cmpRejAdjustedList.length === 0 && (
                  <tr>
                    <td colspan="11" align="center">
                      No adjusted cmp rejection{" "}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <br />
          </div>

          <div className="container">
            <h1 class="text-blue-600" align="center">
              CMP Rejection Approved by D Section
            </h1>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Dak Id</th>
                  <th>Emp</th>
                  <th>Cmp File</th>
                  <th>Cmp Date</th>
                  <th>Ref No</th>
                  <th>Amount</th>
                  <th>Ifsc</th>
                  <th>Bank Account</th>
                  <th>New Ifsc</th>
                  <th>New Bank Account</th>
                </tr>
                {cmpRejList &&
                  cmpRejList.map((tr, rowIndex) => (
                    <tr key={tr.rejectionDakId}>
                      <td>
                        <input
                          type="checkbox"
                          onChange={handleCheckBox(rowIndex)}
                          checked={cmpRejList[rowIndex]["select"]}
                        />
                      </td>
                      <td>{tr.rejectionDakId}</td>
                      <td>
                        {tr.empName}
                        <br />
                        {tr.cdaoNo}
                      </td>
                      <td>{tr.cmpFile}</td>
                      <td>{tr.cmpDate}</td>
                      <td>{tr.paymentRefNo}</td>
                      <td>{tr.amount}</td>
                      <td>{tr.oldIfsc}</td>
                      <td>{tr.oldBankAccountNo}</td>
                      <td>{tr.newIfsc}</td>
                      <td>{tr.newBankAccountNo}</td>
                    </tr>
                  ))}
              </thead>

              <tbody>
                {cmpRejList.length === 0 && (
                  <tr>
                    <td colspan="11" align="center">
                      No approved CMP rejection available{" "}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <br />
          </div>

          <div className="px-4">
            {act === "Editable" && <button type="submit">Save</button>}
            {act === "Editable" &&
              cmpRejAdjustedList != null &&
              cmpRejAdjustedList.length > 0 && (
                <button type="button" onClick={handleButtonClick}>
                  Generate PMCS
                </button>
              )}
            {act === "Submit" &&
              cmpRejAdjustedList != null &&
              cmpRejAdjustedList.length > 0 && (
                <button type="button" onClick={submitCda13}>
                  Submit
                </button>
              )}
            {act === "Approve" &&
              cmpRejAdjustedList != null &&
              cmpRejAdjustedList.length > 0 && (
                <button type="button" onClick={approveCda13}>
                  Approve
                </button>
              )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(IafCda13Edit);
