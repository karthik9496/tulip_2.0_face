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
import { useLocation } from "react-router-dom";
import { BasicLoadingIcon } from "../utils/Icons";

const schema = yup.object({
  //commissionControlDak: yup.object().required('Required'),
  dak: yup.object().required("Required"),

  basic: yup.number().integer().required("Required"),
  //	da: yup.number().integer().required('Required'),
  //msp: yup.number().integer().required('Required'),
  //npa: yup.number().integer().required('Required'),
  //techPay: yup.number().integer().required('Required'),

  formaLetterDate: yup.date().required("Required"),
  //dateOfReporting: yup.date().required('Required'),

  formaLetterNo: yup.string().required("Required"),
  pan: yup.string().required("Required"),

  bankAcno: yup.string().required("Required"),
  ifsc: yup.string().required("Required"),
});

const CommissionFormaEdit = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
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
  const [ccDakId, setCcDakId] = useState("");
  const [goiLetterNo, setGoiLetterNo] = useState("");
  const [goiLetterDate, setGoiLetterDate] = useState("");
  const [commDate, setCommDate] = useState("");
  const [officerName, setOfficerName] = useState("");
  const [icNo, setIcNo] = useState("");
  const [cdaoNo, setCdaoNo] = useState("");
  const [dob, setDob] = useState("");
  const [alfrom, setAlfrom] = useState("");
  const [alto, setAlto] = useState("");
  const [antepayDate, setAntepayDate] = useState("");
  const [antepromDate, setAntepromDate] = useState("");
  const [rankName, setRankName] = useState("");
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState("");
  const [mesg, setMesg] = useState("");
  const { actionState } = useLocation();
  const [commType, setCommType] = useState("");
  const [readOnly, setReadOnly] = useState(false);
  const [rempl, setRempl] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [total, setTotal] = useState(0);
  const [corpsName, setCorpsName] = useState("");
  const [unit, setUnit] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [nokRel, setNokRel] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [dsopWill, setDsopWill] = useState(false);

  const [ssIcNo, setSsIcNo] = useState("");
  const [ssIcCheckDigit, setSsIcCheckDigit] = useState("");
  const [tgcDateOfSsCommission, setTgcDateOfSsCommission] = useState("");
  const [tgcDateOfPermanentCommission, setTgcDateOfPermanentCommission] =
    useState("");

  useEffect(() => {
    let isCancelled = false;
    console.log(id);
    console.log(actionState);
    if (actionState && actionState === "rollback") setAction("rollback");

    if (
      actionState &&
      (actionState === "submit" ||
        actionState === "approve" ||
        actionState === "rollback")
    )
      setReadOnly(true);

    if (id !== "new") {
      async function fetchData() {
        setLoading(true);
        let record = "";
        await axios
          .get("/commissionFormas/" + id)
          .then((response) => {
            record = response.data;
            setLoading(false);
            console.log("commission form a edit data >> ", record);
            const fields = [
              "id",
              "dsopDate",
              "commissionGoi",
              "commissionControlDak",
              "basic",
              "da",
              "dak",
              "lpcCredit",
              "lpcDebit",
              "msp",
              "npa",
              "techPay",
              "auditorDate",
              "aaoDate",
              "aoDate",
              "goDate",
              "approved",
              "formaLetterDate",
              "dateOfReporting",
              "payAdvance",
              "dsopWillingness",
              "dsopAmount",
              "orsService",
              "orsServiceFrom",
              "orsServiceTo",
              "stipendAmount",
              "cvpAmount",
              "formaLetterNo",
              "pan",
              "uid",
              "maritalStatus",
              "bankAcno",
              "ifsc",
              "mobile",
              "email",
              "homeTown",
              "nokName",
              "nokRelation",
              "orsServiceNo",
              "recordStatus",
              "reason",
              "paoName",
              "remarks",
              "monthEnding",
              "action",
              "commType",
              "payLevel",
              "unitDetails",
              "bank",
              "rollbackRemarks",
              "dni",
              "commDate",
              "tgcStipendAmount",
              "ssIcNo",
              "ssIcCheckDigit",
              "tgcDateOfSsCommission",
              "tgcDateOfPermanentCommission",
            ];
            setCcDakId(record["commissionGoi"].commissionControl.dak.dakidNo);
            setGoiLetterNo(
              record["commissionGoi"].commissionControl.goiLetterNo
            );
            setGoiLetterDate(
              record["commissionGoi"].commissionControl.goiLetterDate
            );
            setCommDate(
              record["commissionGoi"].commissionControl.commissionDate
            );
            setOfficerName(record["commissionGoi"].officerName);
            setIcNo(record["commissionGoi"].icNo);
            if (record["commissionGoi"].cdaoNo)
              setCdaoNo(
                record["commissionGoi"].cdaoNo +
                  "" +
                  record["commissionGoi"].cdaoCheckDigit
              );
            setDob(record["commissionGoi"].dateOfBirth);
            setOfficerName(record["commissionGoi"].officerName);
            setRankName(record["commissionGoi"].rank.rankName);
            if (record["commissionGoi"].commissionControl.commissionType)
              setCommType(
                record["commissionGoi"].commissionControl.commissionType
                  .typeName
              );
            //setId(record['id']);
            console.log(record["commType"]);
            if (record["commissionGoi"].annualLeaveFrom)
              setAlfrom(record["commissionGoi"].annualLeaveFrom);
            if (record["commissionGoi"].annualLeaveTo)
              setAlto(record["commissionGoi"].annualLeaveTo);
            if (record["commissionGoi"].antedatePay)
              setAntepayDate(record["commissionGoi"].antedatePay);
            if (record["commissionGoi"].antedatePromotion)
              setAntepromDate(record["commissionGoi"].antedatePromotion);
            if (record["maritalStatus"])
              setMaritalStatus(record["maritalStatus"]);
            if (record["nokRelation"]) setNokRel(record["nokRelation"]);
            if (record["commissionGoi"].commissionControl.totalOfficers)
              setTotal(record["commissionGoi"].commissionControl.totalOfficers);
            if (record["commissionGoi"].corps)
              setCorpsName(record["commissionGoi"].corps.unitName);
            if (record["unitDetails"]) setUnit(record["unitDetails"]);
            if (record["dsopWillingness"])
              setDsopWill(record["dsopWillingness"]);

            if (record["commissionGoi"].tgcDateOfSsCommission)
              setTgcDateOfSsCommission(
                record["commissionGoi"].tgcDateOfSsCommission
              );
            if (record["commissionGoi"].tgcDateOfPermanentCommission)
              setTgcDateOfPermanentCommission(
                record["commissionGoi"].tgcDateOfPermanentCommission
              );

            if (record["commissionGoi"].ssIcNo)
              setSsIcNo(record["commissionGoi"].ssIcNo);
            if (record["commissionGoi"].ssIcCheckDigit)
              setSsIcCheckDigit(record["commissionGoi"].ssIcCheckDigit);

            if ((actionState && actionState !== "rollback") || !actionState)
              setAction(record["action"]);

            if (record["commType"] && record["commType"] === "REMPL") {
              setRempl(true);
              if (record["commissionGoi"].effectDate)
                setFromDate(record["commissionGoi"].effectDate);
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
  }, [id, setValue]);

  useEffect(() => {
    let fetching = false;
    let unmounted = false;
    async function fetchPayData() {
      if (!fetching && id && entity.id && !entity.basic)
        await axios
          .get(`/commissionFormas/${id}/payAndDa`)
          .then((response) => {
            console.log("form a basic and da >> ", response.data);
            if (!getValues("basic")) setValue("basic", response.data[0]);
            if (!getValues("da")) setValue("da", response.data[1]);
            if (response.data[2] && !getValues("cvpAmount"))
              setValue("cvpAmount", response.data[2]);
            if (response.data[3] && !getValues("msp"))
              setValue("msp", response.data[3]);
            if (response.data[4] && !getValues("npa"))
              setValue("npa", response.data[4]);
            if (!unmounted) {
              setLoading(false);
            }
          })
          .catch((error) => {
            //console.log(error);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
    }
    fetchPayData();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entity]);

  useEffect(() => {
    let fetching = false;
    let unmounted = false;
    let rec = "";

    async function fetchCommissionData() {
      if (!fetching && ccDakId.length > 0) console.log(ccDakId);
      await axios
        .get("/commissionControls?filter=" + ccDakId)
        .then((response) => {
          console.log("response>>" + response.data["commissionType"].typeName);
          rec = response.data;
          console.log("commission control in form a edit data >> ", rec);

          setValue(
            "commissionControlDak",
            response.data["commissionControlDak"]
          );
          setValue("commissionType", response.data["commissionType"]);
          //setValue('commissionTypeName',response.data["commissionType"].typeName)

          setGoiLetterNo(rec["goiLetterNo"]);
          setGoiLetterDate(rec["goiLetterDate"]);
          //setCommDate(rec["commissionDate"]);

          if (!unmounted) {
          }
        })
        .catch((error) => {
          //console.log(error);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          if (error.response) setServerErrors(error.response.data.error);
          else setServerErrors(error.Error);
        });
    }
    fetchCommissionData();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ccDakId]);

  async function submitForma(id) {
    await axios
      .put(`/commissionFormas/submission/${id}`)
      .then((response) => {
        console.log(response.data);
        if (response.data) setServerErrors(response.data);

        //  console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        // if (error.response) setServerErrors(error.response.data.error);
        //else setServerErrors(error.Error);
      });
  }

  async function approveForma(id) {
    setLoading(true);
    await axios
      .put(`/commissionFormas/approve/${id}`)
      .then((response) => {
        setLoading(false);
        console.log(response.data);
        if (response.data) setServerErrors(response.data);

        //  console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        // if (error.response) setServerErrors(error.response.data.error);
        //else setServerErrors(error.Error);
      });
  }

  const onSubmit = (data, event) => {
    event.preventDefault();
    console.log(data);
    if (disabled) return;

    setDisabled(true);

    if (data.id) {
      if (action && action === "rollback") {
        axios
          .put("/commissionFormas/rollback/" + data.id, data)
          .then((response) => {
            console.log(response.data);
            if (response.data) setServerErrors(response.data);

            setDisabled(false);
          })
          .catch((error) => {
            //console.log(error.response.data);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            setServerErrors(error.response.data);
          });
      } else {
        axios
          .put(`/commissionFormas/${id}`, data)
          .then((response) => {
            console.log(response.data);
            if (response.data) setServerErrors(response.data.reason);

            setDisabled(false);
          })
          .catch((error) => {
            //console.log(error.response.data);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            setServerErrors(error.response.data);
          });
      }
    } else {
      axios
        .post("/commissionFormas", data)
        .then((response) => {
          if (response.data) setServerErrors(response.data.reason);

          setDisabled(false);
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
      title: "Forma Dak",
      url: "daks/formaDaks",
      searchList: ["dakidNo"], //XXXXXXXXX Add search fields here and also in the corresponding repository
      fkEntity: "dak",
    },
    bank: {
      title: "IFSC",
      url: "banks/ifsc",
      searchList: ["ifsc", "bankName", "bankStation"], //XXXXXXXXX Add search fields here and also in the corresponding repository
      fkEntity: "bank",
    },
  };

  //Callback for child components (Foreign Keys)
  const callback = (childData) => {
    console.log(
      "Parent Callback" + childData.fk + "==" + childData.entity.ifsc
    );
    setEntity((prev) => ({ ...prev, [childData.fk]: childData.entity }));
    setValue(childData.fk, childData.entity);
    //console.log(errors);

    if (childData.fk === "dak") {
      //console.log(childData.entity.referenceNo);
      //   if (!getValues("formaLetterNo"))
      setValue("formaLetterNo", childData.entity.referenceNo);
      //   if (!getValues("formaLetterDate"))
      setValue("formaLetterDate", childData.entity.referenceDate);
    }

    if (childData.fk === "bank") {
      setValue("ifsc", childData.entity.ifsc);
    }
    clearErrors(childData.fk);
  };

  const errorCallback = (err) => {
    //console.log(err);
    setServerErrors(err);
  };

  const handleInputChange = (e) => {
    //console.log(e.target.value);
  };
  const handleRollback = (e) => {
    //console.log(e.target.value);
    setValue("rollbackRemarks", e.target.value);
  };

  const handleDsopWillingness = (e) => {
    console.log(e.target.checked);
    setValue("dsopWillingness", e.target.checked);
    // let dsop = e.target.value;
    // if (dsop === "Y") setValue("dsopWillingness", "true");
    // else if (dsop === "N") setValue("dsopWillingness", "false");
  };

  const fixPay = (e) => {
    //console.log(e.target.value);
  };
  const handleMaritalStatus = (e) => {
    console.log(e.target.value);
    setMaritalStatus(e.target.value);
    setValue("maritalStatus", e.target.value);
  };
  const handleNokRelation = (e) => {
    console.log(e.target.value);
    setNokRel(e.target.value);
    setValue("nokRelation", e.target.value);
  };
  const handleCcDak = (e) => {
    setCcDakId(e.target.value);
    console.log(ccDakId);
  };
  const returnToList = () => {
    history.push("/commissionFormas");
  };

  return (
    <div className="min-h-full bg-gray-100 text-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {loading ? (
          <div className=" justify-center items-center fixed top-1/4 w-full z-50">
            <p className="mr-2 text-2xl text-green-600">Fetching Data</p>
            <BasicLoadingIcon className="ml-1 mt-1 h-10 w-10 animate-spin text-green-600" />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <h1>{id === "new" ? "Add" : "Edit"} Commission Forma </h1>
            <div className="text-red-500">{serverErrors}</div>
            <Tabs
              id="CommisionFormaEdit"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3"
            >
              <Tab eventKey="page1" title="GoI Info" className="h-120">
                <div className="grid grid-cols-2 gap-0">
                  <div>
                    <label>Commission Control Dak</label>
                    <input
                      type="text"
                      name="ccDak"
                      value={ccDakId}
                      readOnly
                      className="form-control py-0"
                    />
                    <div className="text-red-500">
                      {errors.lpcCredit?.message}
                    </div>
                  </div>

                  <div>
                    <label>GoI Letter No</label>
                    <input
                      type="text"
                      name="goiLetterNo"
                      value={goiLetterNo}
                      readOnly
                      className="form-control py-0"
                    />
                  </div>

                  <div>
                    <label>GoI Letter Date</label>
                    <input
                      type="date"
                      name="goiLetterDate"
                      value={goiLetterDate}
                      readOnly
                      className="form-control py-0"
                    />
                  </div>

                  <div>
                    <label>Commission Date</label>
                    <input
                      type="date"
                      name="commDate"
                      {...register("commDate")}
                      readOnly={readOnly}
                      className="form-control py-0"
                    />
                  </div>
                  <div>
                    <label>Commission Type</label>
                    <input
                      type="text"
                      name="commissionType"
                      value={commType}
                      readOnly
                      className="form-control py-0"
                    />
                  </div>
                  <div>
                    <label>Total Officers</label>
                    <input
                      type="text"
                      name="totalOfficers"
                      value={total}
                      readOnly
                      className="form-control py-0"
                    />
                  </div>
                  <div>
                    <label>TGC SS IC No</label>
                    <input
                      type="text"
                      name="ssIcNo"
                      value={ssIcNo}
                      readOnly
                      className="form-control py-0"
                    />
                  </div>
                  <div>
                    <label>TGC Date of SSC</label>
                    <input
                      type="text"
                      name="totalOfficers"
                      value={tgcDateOfSsCommission}
                      readOnly
                      className="form-control py-0"
                    />
                  </div>
                  <div>
                    <label>TGC Date of PC</label>
                    <input
                      type="text"
                      name="totalOfficers"
                      value={tgcDateOfPermanentCommission}
                      readOnly
                      className="form-control py-0"
                    />
                  </div>

                  <div>
                    <label>Corps</label>
                    <input
                      type="text"
                      name="corps"
                      value={corpsName}
                      readOnly
                      className="form-control py-0"
                    />
                  </div>
                  <div>
                    <label>Unit</label>
                    <input
                      type="text"
                      name="unit"
                      value={unit}
                      readOnly
                      className="form-control py-0"
                    />
                  </div>
                  <div>
                    <label>Officer Name</label>
                    <input
                      type="text"
                      name="officerName"
                      value={officerName}
                      readOnly
                      className="form-control py-0"
                    />
                  </div>
                  <div>
                    <label>Ic No</label>
                    <input
                      type="text"
                      name="icNo"
                      value={icNo}
                      readOnly
                      className="form-control py-0"
                    />
                  </div>
                  <div>
                    <label>Cdao No</label>
                    <input
                      type="text"
                      name="cdaoNo"
                      value={cdaoNo}
                      readOnly
                      className="form-control py-0"
                    />
                  </div>
                  <div>
                    <label>Rank</label>
                    <input
                      type="text"
                      name="rankName"
                      value={rankName}
                      readOnly
                      className="form-control py-0"
                    />
                  </div>
                  <div>
                    <label>DoB</label>
                    <input
                      type="date"
                      name="dob"
                      value={dob}
                      readOnly
                      className="form-control py-0"
                    />
                  </div>
                  <div>
                    <label>Annual Leave From</label>
                    <input
                      type="date"
                      name="alFrom"
                      value={alfrom}
                      readOnly
                      className="form-control py-0"
                    />
                  </div>

                  <div>
                    <label>Annual Leave To</label>
                    <input
                      type="date"
                      name="alTo"
                      value={alto}
                      readOnly
                      className="form-control py-0"
                    />
                  </div>
                  <div>
                    <label>AntePay Date</label>
                    <input
                      type="date"
                      name="antepay"
                      value={antepayDate}
                      readOnly
                      className="form-control py-0"
                    />
                  </div>
                  <div>
                    <label>AnteProm Date</label>
                    <input
                      type="date"
                      name="anteprom"
                      value={antepromDate}
                      readOnly
                      className="form-control py-0"
                    />
                  </div>

                  <div>
                    <LiveSearch
                      name="dak"
                      onChange={handleInputChange}
                      parentData={parentData.dak}
                      parentCallback={callback}
                      fkEntity={entity.dak}
                      errCallback={errorCallback}
                      readOnly={readOnly}
                    />
                    <div className="text-red-500 ">{errors.dak?.message}</div>
                  </div>
                  <div>
                    <label>Forma Letter No</label>
                    <input
                      type="text"
                      name="formaLetterNo"
                      {...register("formaLetterNo")}
                      readOnly={readOnly}
                      className="form-control py-0"
                    />
                    <div className="text-red-500">
                      {errors.formaLetterNo?.message}
                    </div>
                  </div>
                  <div>
                    <label>Forma Letter Date</label>
                    <input
                      type="date"
                      name="formaLetterDate"
                      {...register("formaLetterDate")}
                      readOnly={readOnly}
                      className="form-control py-0"
                    />
                    <div className="text-red-500">
                      {errors.formaLetterDate?.message}
                    </div>
                  </div>

                  <div>
                    <label>Date Of Reporting</label>
                    <input
                      type="date"
                      name="dateOfReporting"
                      {...register("dateOfReporting")}
                      readOnly={readOnly}
                      className="form-control py-0"
                    />
                    <div className="text-red-500">
                      {errors.dateOfReporting?.message}
                    </div>
                  </div>

                  {rempl && (
                    <>
                      <div>
                        <label>From Date(Remploy or Rev)</label>
                        <input
                          type="date"
                          name="fromDate"
                          value={fromDate}
                          readOnly={readOnly}
                          className="form-control py-0"
                        />
                        <div className="text-red-500">
                          {errors.dateOfReporting?.message}
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label>Remarks</label>
                    <textarea
                      type="text"
                      name="remarks"
                      {...register("remarks")}
                      readOnly={readOnly}
                      className="form-control py-0"
                    />
                    <div className="text-red-500">
                      {errors.remarks?.message}
                    </div>
                  </div>

                  <div>
                    <label>Rollback Remarks</label>
                    <textarea
                      type="text"
                      name="rollbackRemarks"
                      {...register("rollbackRemarks")}
                      readOnly={!readOnly}
                      className="form-control py-0"
                    />
                    <div className="text-red-500">
                      {errors.rollbackRemarks?.message}
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="page2" title="Pay" className="h-120">
                <div className="grid grid-cols-2 gap-0 ">
                  <div>
                    <label>Basic</label>
                    <input
                      type="text"
                      name="basic"
                      {...register("basic")}
                      readOnly={readOnly}
                      className="form-control py-0"
                    />
                    <div className="text-red-500">{errors.basic?.message}</div>
                  </div>

                  {rempl && (
                    <>
                      <div>
                        <label>Pay Level</label>
                        <input
                          type="text"
                          name="payLevel"
                          {...register("payLevel")}
                          readOnly={readOnly}
                          className="form-control py-0"
                        />
                        <div className="text-red-500">{errors.da?.message}</div>
                      </div>
                    </>
                  )}
                  {!rempl && (
                    <>
                      <div>
                        <label>Da</label>
                        <input
                          type="text"
                          name="da"
                          {...register("da")}
                          readOnly={readOnly}
                          className="form-control py-0"
                        />
                        <div className="text-red-500">{errors.da?.message}</div>
                      </div>
                    </>
                  )}

                  <div>
                    <label>Msp</label>
                    <input
                      type="text"
                      name="msp"
                      {...register("msp")}
                      readOnly={readOnly}
                      className="form-control py-0"
                    />
                    <div className="text-red-500">{errors.msp?.message}</div>
                  </div>

                  <div>
                    <label>Npa</label>
                    <input
                      type="text"
                      name="npa"
                      {...register("npa")}
                      readOnly={readOnly}
                      className="form-control py-0"
                    />
                    <div className="text-red-500">{errors.npa?.message}</div>
                  </div>

                  <div>
                    <label>Tech Pay</label>
                    <input
                      type="text"
                      name="techPay"
                      {...register("techPay")}
                      readOnly={readOnly}
                      className="form-control py-0"
                    />
                    <div className="text-red-500">
                      {errors.techPay?.message}
                    </div>
                  </div>

                  <div>
                    <label>Lpc Credit</label>
                    <input
                      type="text"
                      name="lpcCredit"
                      {...register("lpcCredit")}
                      readOnly={readOnly}
                      className="form-control py-0"
                    />
                    <div className="text-red-500">
                      {errors.lpcCredit?.message}
                    </div>
                  </div>

                  <div>
                    <label>Lpc Debit</label>
                    <input
                      type="text"
                      name="lpcDebit"
                      {...register("lpcDebit")}
                      readOnly={readOnly}
                      className="form-control py-0"
                    />
                    <div className="text-red-500">
                      {errors.lpcDebit?.message}
                    </div>
                  </div>

                  <div>
                    <label>Pay Advance</label>
                    <input
                      type="text"
                      name="payAdvance"
                      {...register("payAdvance")}
                      readOnly={readOnly}
                      className="form-control py-0"
                    />
                    <div className="text-red-500">
                      {errors.payAdvance?.message}
                    </div>
                  </div>

                  <div>
                    <label>Stipend Amount</label>
                    <input
                      type="text"
                      name="stipendAmount"
                      {...register("stipendAmount")}
                      readOnly={readOnly}
                      className="form-control py-0"
                    />
                    <div className="text-red-500">
                      {errors.stipendAmount?.message}
                    </div>
                  </div>

                  <div>
                    <label>Cvp Amount</label>
                    <input
                      type="text"
                      name="cvpAmount"
                      {...register("cvpAmount")}
                      readOnly={readOnly}
                      className="form-control py-0"
                    />
                    <div className="text-red-500">
                      {errors.cvpAmount?.message}
                    </div>
                  </div>
                  <div>
                    <label>DNI</label>
                    <input
                      type="date"
                      name="dni"
                      {...register("dni")}
                      readOnly={readOnly}
                      className="form-control py-0"
                    />
                    <div className="text-red-500">{errors.dni?.message}</div>
                  </div>
                  <div>
                    <label>TGC Stipend Amount</label>
                    <input
                      type="number"
                      name="tgcStipendAmount"
                      {...register("tgcStipendAmount")}
                      readOnly={readOnly}
                      className="form-control py-0"
                    />
                    <div className="text-red-500">{errors.dni?.message}</div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="page3" title="Bank" className="h-120">
                <div className="grid grid-cols-2 gap-0 ">
                  <div>
                    <LiveSearch
                      name="bank"
                      onChange={handleInputChange}
                      parentData={parentData.bank}
                      parentCallback={callback}
                      fkEntity={entity.bank}
                      errCallback={errorCallback}
                      readOnly={readOnly}
                    />
                    <div className="text-red-500 ">{errors.dak?.message}</div>
                  </div>

                  <div>
                    <label>Bank Account Number</label>
                    <input
                      type="text"
                      name="bankAcno"
                      {...register("bankAcno")}
                      readOnly={readOnly}
                      className="form-control py-0"
                    />
                    <div className="text-red-500">
                      {errors.bankAcno?.message}
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="page4" title="Dsop" className="h-120">
                <div className="grid grid-cols-2 gap-0 ">
                  <div>
                    <label>Dsop Willingness</label>
                    <input
                      type="checkbox"
                      name="dsopWillingness"
                      checked={dsopWill}
                      className="w-5 h-5"
                      onChange={(e) => {
                        console.log(e.target.checked);
                        setValue("dsopWillingness", !dsopWill);
                        setDsopWill(!dsopWill);
                      }}
                    />
                  </div>
                  {/* <div>
                  <label>Dsop Willingness</label>
                  <input
                    type="radio"
                    value="Y"
                    checked={{ ...register("dsopWillingness") }}
                    name="dsopWillingness"
                    // onChange={handleDsopWillingness}
                    onChange={(e) => {
                      console.log(e);
                      console.log(e.target.checked);
                      console.log(e.target.value);
                      if (e.target.value == "Y") {
                      }
                      setValue("dsopWillingness", true);
                    }}
                  />{" "}
                  Yes <span>&nbsp; &nbsp;</span>
                  <input
                    type="radio"
                    value="N"
                    checked={!{ ...register("dsopWillingness") }}
                    name="dsopWillingness"
                    // onChange={handleDsopWillingness}
                    onChange={(e) => {
                      console.log(e);
                      console.log(e.target.checked);
                      console.log(e.target.value);
                      if (e.target.value == "N")
                        setValue("dsopWillingness", false);
                    }}
                  />{" "}
                  No <span>&nbsp; &nbsp;</span>
                  <div className="text-red-500">
                    {errors.dsopWillingness?.message}
                  </div>
                </div> */}
                  {/* <div>
                  <input {...register("dsopWillingness")} />
                </div> */}
                  <div>
                    <label>Dsop Date</label>
                    <input
                      type="date"
                      name="dsopDate"
                      {...register("dsopDate")}
                      readOnly={readOnly}
                      className="form-control py-0"
                    />
                    <div className="text-red-500">
                      {errors.dsopDate?.message}
                    </div>
                  </div>

                  <div>
                    <label>Dsop Amount</label>
                    <input
                      type="text"
                      name="dsopAmount"
                      {...register("dsopAmount")}
                      readOnly={readOnly}
                      className="form-control py-0"
                    />
                    <div className="text-red-500">
                      {errors.dsopAmount?.message}
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="page5" title="PAO" className="h-120">
                <div className="grid grid-cols-2 gap-0 ">
                  <div>
                    <label>Ors Service No</label>
                    <input
                      type="text"
                      name="orsServiceNo"
                      {...register("orsServiceNo")}
                      readOnly={readOnly}
                      className="form-control py-0"
                    />
                    <div className="text-red-500">
                      {errors.orsServiceNo?.message}
                    </div>
                  </div>

                  <div>
                    <label>Ors Service From</label>
                    <input
                      type="date"
                      name="orsServiceFrom"
                      {...register("orsServiceFrom")}
                      readOnly={readOnly}
                      className="form-control py-0"
                    />
                    <div className="text-red-500">
                      {errors.orsServiceFrom?.message}
                    </div>
                  </div>

                  <div>
                    <label>Ors Service To</label>
                    <input
                      type="date"
                      name="orsServiceTo"
                      {...register("orsServiceTo")}
                      readOnly={readOnly}
                      className="form-control py-0"
                    />
                    <div className="text-red-500">
                      {errors.orsServiceTo?.message}
                    </div>
                  </div>

                  <div>
                    <label>Pao Name</label>
                    <input
                      type="text"
                      name="paoName"
                      {...register("paoName")}
                      readOnly={readOnly}
                      className="form-control py-0"
                    />
                    <div className="text-red-500">
                      {errors.paoName?.message}
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="page6" title="Other" className="h-120">
                <div className="grid grid-cols-2 gap-0 ">
                  <div>
                    <label>Pan</label>
                    <input
                      type="text"
                      name="pan"
                      {...register("pan")}
                      readOnly={readOnly}
                      className="form-control py-0"
                    />
                    <div className="text-red-500">{errors.pan?.message}</div>
                  </div>

                  <div>
                    <label>Uid</label>
                    <input
                      type="text"
                      name="uid"
                      {...register("uid")}
                      readOnly={readOnly}
                      className="form-control py-0"
                    />
                    <div className="text-red-500">{errors.uid?.message}</div>
                  </div>

                  <div>
                    <label>Marital Status</label>

                    <select
                      name="servingIn"
                      value={maritalStatus}
                      onChange={handleMaritalStatus}
                      readOnly={readOnly}
                    >
                      <option value="0">--select---</option>
                      <option value="S">Single</option>
                      <option value="M">Married</option>
                      <option value="D">Divorced</option>
                      <option value="W">Widow</option>
                      <option value="R">Widower</option>
                    </select>

                    <div className="text-red-500">
                      {errors.martialStatus?.message}
                    </div>
                  </div>
                  <div>
                    <label>Mobile</label>
                    <input
                      type="text"
                      name="mobile"
                      {...register("mobile")}
                      readOnly={readOnly}
                      className="form-control py-0"
                    />
                    <div className="text-red-500">{errors.mobile?.message}</div>
                  </div>

                  <div>
                    <label>Email</label>
                    <input
                      type="text"
                      name="email"
                      {...register("email")}
                      readOnly={readOnly}
                      className="form-control py-0"
                    />
                    <div className="text-red-500">{errors.email?.message}</div>
                  </div>

                  <div>
                    <label>Home Town</label>
                    <input
                      type="text"
                      name="homeTown"
                      {...register("homeTown")}
                      readOnly={readOnly}
                      className="form-control py-0"
                    />
                    <div className="text-red-500">
                      {errors.homeTown?.message}
                    </div>
                  </div>

                  <div>
                    <label>Nok Name</label>
                    <input
                      type="text"
                      name="nokName"
                      {...register("nokName")}
                      readOnly={readOnly}
                      className="form-control py-0"
                    />
                    <div className="text-red-500">
                      {errors.nokName?.message}
                    </div>
                  </div>

                  <div>
                    <label>Nok Relation</label>

                    <select
                      name="servingIn"
                      value={nokRel}
                      onChange={handleNokRelation}
                      readOnly={readOnly}
                    >
                      <option value="0">--select---</option>
                      <option value="FATHER">Father</option>
                      <option value="MOTHER">Mother</option>
                      <option value="WIFE">Wife</option>
                      <option value="HUSBAND">Husband</option>
                      <option value="DAUGHTER">Daughter</option>
                      <option value="SON">Son</option>
                      <option value="BROTHER">Brother</option>
                      <option value="SISTER">Sister</option>
                      <option value="OTHER">Other</option>
                    </select>
                    <div className="text-red-500">
                      {errors.nokRelation?.message}
                    </div>
                  </div>
                </div>
              </Tab>
            </Tabs>
            <div className="flexContainer">
              {action === "editable" && (
                <>
                  <div className="px-2">
                    <button type="submit">Save</button>
                  </div>
                  <div className="px-2">
                    <button type="button" onClick={() => submitForma(id)}>
                      Submit
                    </button>
                  </div>
                </>
              )}
              {action === "submissionbysao" && (
                <div className="px-2">
                  <button type="button" onClick={() => submitForma(id)}>
                    Submit
                  </button>
                </div>
              )}
              {action === "submissionbyaao" && (
                <div className="px-2">
                  <button type="button" onClick={() => submitForma(id)}>
                    Submit
                  </button>
                </div>
              )}

              {action === "rollback" && (
                <div className="px-2">
                  <button type="submit">Rollback</button>
                </div>
              )}
              {action === "approve" && (
                <div className="px-2">
                  <button type="button" onClick={() => approveForma(id)}>
                    Approve
                  </button>
                </div>
              )}
              <div className="px-2">
                <button type="button" onClick={returnToList}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default withRouter(CommissionFormaEdit);
