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
  //   hospitalName: yup.string().required('Required'),
  //    fromPeriod: yup.string().required('Required'),
  //    toPeriod: yup.string().required('Required'),
  //    medicalTestName: yup.string().required('Required'),
  //    amountPassed: yup.number().integer().required('Required'),
});

const CbillMedicalEdit = () => {
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

  const [empId, setEmpId] = useState("");
  const [fdList, setFdList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fdItem, setFdItem] = useState("");
  const [dakId, setDakId] = useState("");
  const [rankName, setRankName] = useState("");
  const [cdaoNo, setCdaoNo] = useState("");
  const [checkDigit, setCheckDigit] = useState("");
  const [unitCode, setUnitCode] = useState("");
  const [dakidNo, setDakidNo] = useState("");
  const [unitName, setUnitName] = useState("");
  const [name, setName] = useState("");
  const [rank, setRank] = useState("");
  const [claimedAmt, setClaimedAmt] = useState(0);
  const [me, setMe] = useState("");
  const [mesg, setMesg] = useState("");
  const [patientType, setPatientType] = useState("");
  const [claimType, setClaimType] = useState("");
  const [checked, setChecked] = useState(false);
  const [buttonState, setButtonState] = useState("");

  useEffect(() => {
    let isCancelled = false;
    console.log(id);
    if (id !== "new") {
      async function fetchData() {
        let record = "";
        await axios
          .get("/cbillMedicals/" + id)
          .then((response) => {
            record = response.data;
            const fields = [
              "id",
              "dak",
              "employee",
              "familyDetail",
              "armyNo",
              "checkDigit",
              "nameOfPatient",
              "relationShip",
              "placeFellIll",
              "hospitalName",
              "inpatientOutpatient",
              "fromPeriod",
              "toPeriod",
              "medicalTestName",
              "amountClaimed",
              "amountPassed",
              "creditStatus",
              "qe",
              "recordStatus",
              "rejectionReason",
              "auditorDate",
              "aaoDate",
              "aoDate",
              "task",
              "approved",
              "remarks",
              "paoRemarks",
              "relationship",
              "paymentAuthorityNo",
              "paymentAuthorityDate",
              "paymentAuthorityAmount",
              "sectionRemarks",
              "relation",
            ];
            console.log(">>>>>>Dak Id is---:" + record.dak.id);
            console.log(">>>>>>EMP Id is---:" + record.employee.id);
            setDakId(record.dak.id);
            setEmpId(record.employee.id);
            if (record.inpatientOutpatient === "I") {
              setClaimType("I");
            } else {
              setClaimType("O");
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
    }
  }, []);

  useEffect(() => {
    let fetching = false;
    let unmounted = false;
    async function fetchFamilyDetails() {
      if (empId)
        if (!fetching)
          await axios
            .get(`/cbillMedicals/familyDetails/${empId}`)
            .then((response) => {
              if (!unmounted) {
                setFdList(
                  response.data.map(({ nameOfMember }) => ({
                    label: nameOfMember,
                  }))
                );
                setLoading(false);
              }

              //setCdList(response.data);
            })
            .catch((error) => {
              //console.log(error);
              //console.log(error.response.status);
              //console.log(error.response.headers);
              if (error.response) setServerErrors(error.response.data.error);
              else setServerErrors(error.Error);
            });
    }
    fetchFamilyDetails();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [empId]);

  useEffect(() => {
    let fetching = false;
    let unmounted = false;
    console.log(">>>>>>>Dak Id ----:" + dakId);
    async function fetchDakDetails() {
      if (dakId)
        if (!fetching)
          axios
            .get(`/cbillMedicals/dakdetails/${dakId}`)
            .then((response) => {
              console.log(
                response.data[0] +
                "--" +
                response.data[1] +
                "---" +
                response.data[2]
              );
              //		 setEmpId(response.data[6]);
              setCdaoNo(response.data[0]);
              setName(response.data[2]);
              setCheckDigit(response.data[1]);
              setUnitName(response.data[3]);
              setDakidNo(response.data[6]);
              setClaimedAmt(response.data[5]);
              setRank(response.data[4]);
            })
            .catch((error) => {
              //console.log(error);
              //console.log(error.response.status);
              //console.log(error.response.headers);
              if (error.response) setServerErrors(error.response.data.error);
              else setServerErrors(error.Error);
            });
    }
    fetchDakDetails();

    return () => {
      fetching = true;
    };
  }, [dakId, setDakId]);

  useEffect(() => {
    let fetching = false;
    let unmounted = false;
    async function fetchMe() {
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
    fetchMe();

    return () => {
      fetching = true;
    };
  }, []);

  const onSubmit = (data, event) => {
    event.preventDefault();
    console.log(data);
    console.log(id);
    if (data.id) {
      axios
        .put("/cbillMedicals/" + data.id, data)
        .then((response) => {
          setMesg(response.data);

          console.log(response.data);
          //history.push("/medicalClaims");
        })
        .catch((error) => {
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          setServerErrors(error.response.data);
        });
    } else {
      axios
        .post("/cbillMedicals", data)
        .then((response) => {
          //history.push("/medicalClaims");
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
      title: "Officer Details",
      url: "employees/all/effective",
      searchList: ["cdaoNo", "checkDigit", "officerName"], //XXXXXXXXX Add search fields here and also in the corresponding repository
      fkEntity: "employee",
    },

    relation: {
      title: "Relationship",
      url: "relations",
      searchList: ["relationName"], //XXXXXXXXX Add search fields here and also in the corresponding repository
      fkEntity: "relation",
    },
  };

  //Callback for child components (Foreign Keys)
  const callback = (childData) => {
    //console.log("Parent Callback");
    //setEntity(prev => ({ ...prev, [childData.fk]: childData.entity }));
    setValue(childData.fk, childData.entity);
    //	if (childData.fk === "relation") {
    //		console.log("%%%%%%%%%%%:" + childData.entity);
    //    setValue("relationship", childData.entity);

    //   }
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

  const handleRelationChange = (e) => {
    console.log(e.target.value);
    setValue("relationship", e.target.vale);
  };

  const handleFamilyDetailChange = (e) => {
    console.log(">>>>>" + e.target.label + "===" + e.target.value);
    //setCd(e.target.value);
    setFdItem(e.target.value);
    //	let d=e.target.value;
    //	console.log(">>>>:" + d.substr(d.lastIndexOf(":")+1));
    //	console.log(">>>>:" + d.substring(0,d.indexOf(":")));
    //	let x=d.substring(0,d.indexOf(":"));
    setValue("nameOfPatient", e.target.value);
    //	setValue('relationShip',d.substr(d.lastIndexOf(":")+1));
  };
  const handleClaimTypeChange = (e) => {
    console.log(e.target.value);
    setValue("inpatientOutpatient", e.target.value);
    setClaimType(e.target.value);
  };

  const updateButtonState = (e) => {
    console.log("updating button state " + e);
    setButtonState(e);
  };

  const returnToList = () => {
    history.push("/cbillMedicals");
  };

  const handleCheckBoxMr = (e) => {
    //console.log(e.target.checked);

    setChecked(e.target.checked);
    setValue("manualRejection", e.target.checked);
  };
  return (
    //<div className="max-w-xl mx-auto ">
    //<div className="w-full w-3/4  mx-auto " >
    <div className="min-h-screen bg-gray-200 text-gray-900">
      <div className="max-w-5xl mx-auto px-8 sm:px-6 lg:px-10 pt-4">
        <form className="h-screen" onSubmit={handleSubmit(onSubmit, onError)}>
          <h1>{id === "new" ? "Add" : "Edit"} Medical Claim </h1>
          <div className="text-red-500">{mesg}</div>
          <Tabs
            id="MedicalClaimEdit"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="page1" title="Page 1" className="h-120">
              <div className="grid grid-cols-2 gap-0">
                <div>
                  <label> Dak Id</label>
                  {dakId} : {dakidNo}
                </div>
                <div>
                  <label> Month Ending</label>
                  {me}
                </div>
              </div>

              <div>
                <br />
                <br />
              </div>
              <div className="grid grid-cols-2 gap-0">
                <div>
                  <div>
                    <label>Personal Details</label>
                    {cdaoNo}:{checkDigit} : {name} : {rank}
                  </div>

                  <div>
                    <label>Unit Details</label>

                    {unitName}
                  </div>
                </div>

                <div>
                  <label>Claimed Amount</label>
                  {claimedAmt}
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
                    {errors.employee?.message}
                  </div>
                </div>
                <div>
                  <label>Medical Claim Type </label>
                  <select
                    name="inpatientOutpatient"
                    {...register("inpatientOutpatient")}
                    className="form-control py-0"
                    onChange={handleClaimTypeChange}
                  >
                    <option value="select">--Select--</option>
                    <option key="1" value="I">
                      In-Patient--PaymentAuthority
                    </option>
                    <option key="2" value="O">
                      Out-Patient
                    </option>
                  </select>
                </div>
                {claimType === "O" && (
                  <>
                    <div>
                      <b>Name Of Patient</b>
                      <select
                        className="form-control py-0"
                        disabled={loading}
                        value={fdItem}
                        onChange={handleFamilyDetailChange}
                      >
                        <option key="default" value="" label="--select--" />
                        {fdList.map((item, index) => (
                          <option key={index}> {item.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <LiveSearch
                        name="relation"
                        onChange={handleInputChange}
                        parentData={parentData.relation}
                        parentCallback={callback}
                        fkEntity={entity.relation}
                        errCallback={errorCallback}
                      />
                      <div className="text-red-500 ">
                        {errors.relation?.message}
                      </div>
                    </div>

                    <div>
                      <label>Hospital Name</label>
                      <input
                        type="text"
                        name="hospitalName"
                        {...register("hospitalName")}
                        className="form-control py-0"
                      />
                      <div className="text-red-500">
                        {errors.hospitalName?.message}
                      </div>
                    </div>

                    <div>
                      <label>Medical Test Name</label>
                      <input
                        type="text"
                        name="medicalTestName"
                        {...register("medicalTestName")}
                        className="form-control py-0"
                      />
                      <div className="text-red-500">
                        {errors.medicalTestName?.message}
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label>From Period</label>
                  <input
                    type="date"
                    name="fromPeriod"
                    {...register("fromPeriod")}
                    className="form-control py-0"
                  />
                  <div className="text-red-500">
                    {errors.fromPeriod?.message}
                  </div>
                </div>

                <div>
                  <label>To Period</label>
                  <input
                    type="date"
                    name="toPeriod"
                    {...register("toPeriod")}
                    className="form-control py-0"
                  />
                  <div className="text-red-500">{errors.toPeriod?.message}</div>
                </div>

                {claimType && claimType === "I" && (
                  <>
                    <div>
                      <label>Payment Authority No</label>
                      <input
                        type="text"
                        name="paymentAuthorityNo"
                        {...register("paymentAuthorityNo")}
                        className="form-control py-0"
                      />
                      <div className="text-red-500">
                        {errors.paymentAuthorityNo?.message}
                      </div>
                    </div>

                    <div>
                      <label>Payment Authority Amount</label>
                      <input
                        type="text"
                        name="paymentAuthorityAmount"
                        {...register("paymentAuthorityAmount")}
                        className="form-control py-0"
                      />
                      <div className="text-red-500">
                        {errors.paymentAuthorityAmount?.message}
                      </div>
                    </div>

                    <div>
                      <label>Payment Authority Date</label>
                      <input
                        type="date"
                        name="paymentAuthorityDate"
                        {...register("paymentAuthorityDate")}
                        className="form-control py-0"
                      />
                      <div className="text-red-500">
                        {errors.paymentAuthorityDate?.message}
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label>Approval Amount</label>
                  <input
                    type="text"
                    name="amountPassed"
                    {...register("amountPassed")}
                    className="form-control py-0"
                  />
                  <div className="text-red-500">
                    {errors.amountPassed?.message}
                  </div>
                </div>

                <div>
                  <label>Section Remarks</label>
                  <textarea
                    type="text"
                    name="sectionRemarks"
                    {...register("sectionRemarks")}
                    className="form-control py-0"
                  />
                  <div className="text-red-500">
                    {errors.sectionRemarks?.message}
                  </div>
                </div>

                {/* //ADDED BY PCDAO 1203224 */}

                <div className="grid grid-cols-1 gap-0 ">
                  <div>
                    <input
                      type="checkbox"
                      name="mr"
                      onChange={handleCheckBoxMr}
                      checked={checked}
                      onClick={() => updateButtonState("mr")}
                    />
                  </div>
                  <div>
                    <label>Reject Medical Bill</label>
                  </div>
                </div>

                {checked && checked === true && (
                  <div>
                    <label>Rejection Reason</label>
                    <textarea
                      type="text"
                      name="rejectionReason"
                      {...register("rejectionReason")}
                      className="w-full h-auto px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                    />
                    <div className="text-red-500">
                      {errors.rejectionReason?.message}
                    </div>
                  </div>
                )}

                {/* //ADDED BY PCDAO 1203224 */}

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
            <div className="px-3 ...">
              <button type="submit">Save</button>
            </div>

            <div className="px-3 ...">
              <button type="button" onClick={returnToList}>
                Cancel
              </button>
            </div>
            <div className="px-3 ...">
              <button type="button" onClick={returnToList}>
                Done
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(CbillMedicalEdit);
