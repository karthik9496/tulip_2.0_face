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

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from "date-fns/addDays";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import { yupResolver } from "@hookform/resolvers/yup";
import LiveSearch from "../utils/LiveSearch";

const schema = yup
  .object({
    //commType: yup.object().required('Required'),
    //commissionDate: yup.date().required('Required'),
    goiLetterNo: yup.string().required("Required"),
    goiLetterDate: yup.date().required("Required"),
    totalOfficers: yup.string().required("Required"),

    //age: yup.number().positive().integer().required(),
  })
  .required();

const CommissionControlEdit = () => {
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
  const [commType, setCommType] = useState("");

  const [goiLetterDate, setGoiLetterDate] = useState(new Date());
  const [commissionType, setCommissionType] = useState("");
  const [commSubType, setCommSubType] = useState([]);
  const [selectedSubType, setSelectedSubType] = useState("");
  const [commissionDate, setCommissionDate] = useState(new Date());
  const [cdaoRequired, setCdaoRequired] = useState(false);

  const [key, setKey] = useState("Page1");

  useEffect(() => {
    let isCancelled = false;
    console.log(id);
    if (id !== "new") {
      async function fetchData() {
        let record = "";
        await axios
          .get("/commissionControls/" + id)
          .then((response) => {
            record = response.data;
            console.log("commission control edit >> ", record);
          })
          .catch((error) => {
            //console.log(error);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });

        setCommType(record.commType);
        if (record.commissionType)
          setSelectedSubType(record.commissionType.typeName);

        const fields = [
          "id",
          "dak",
          "goiLetterNo",
          "goiLetterDate",
          "commissionType",
          "corps",
          "armyAgency",
          "totalOfficers",
          "commissionDate",
          "annualLeaveFrom",
          "annualLeaveTo",
          "antedatePay",
          "antedatePromotion",
          "outfit",
          "fkAuditor",
          "fkAao",
          "fkAo",
          "auditorDate",
          "aaoDate",
          "aoDate",
          "monthEnding",
          "recordStatus",
          "approved",
          "remarks",
          "reason",
          "commType",
          "commTypeCode",
          "commTypeName",
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
  useEffect(() => {
    let fetching = false;
    let unmounted = false;
    console.log(commType);
    async function fetchSubType() {
      if (!fetching && commType)
        //console.log(secId);
        await axios
          .get(`/commissionControls/subType/${commType}`)
          .then((response) => {
            console.log("response>>" + response.data);
            setCommSubType(response.data);
          })
          .catch((error) => {
            //console.log(error);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
    }
    fetchSubType();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commType]);

  const onSubmit = (data, event) => {
    event.preventDefault();

    console.log(data);
    if (data.id) {
      axios
        .put("/commissionControls/" + data.id, data)
        .then((response) => {})
        .catch((error) => {
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          setServerErrors(error.response.data);
        });
    } else {
      axios
        .post("/commissionControls", data)
        .then((response) => {})
        .catch((error) => {
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          setServerErrors(error.response.data);
        });
    }

    history.push("/commissionControls");
  };

  const onError = (errors, e) => console.log(errors, e);

  //All foreign keys
  const parentData = {
    dak: {
      title: "Dak",
      url: "daks/commissiondaktypes",
      searchList: ["dakidNo"],
      fkEntity: "dak",
      preload: false,
    },
  };

  //Callback for child components (Foreign Keys)
  const callback = (childData) => {
    //console.log("Parent Callback");
    setEntity((prev) => ({ ...prev, [childData.fk]: childData.entity }));
    setValue(childData.fk, childData.entity);
    //console.log(errors);
    if (childData.fk === "dak") {
      console.log(childData.entity.referenceNo);
      setValue("goiLetterNo", childData.entity.referenceNo);
      setValue("goiLetterDate", childData.entity.referenceDate);
    }
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

  const handleCommTypeChange = (e) => {
    console.log(e.target.value);
    //setCommissionType(e.target.value);
    setValue("commType", e.target.value);
    setCommType(e.target.value);
    //console.log(gender);
  };

  const handleSubTypeChange = (e) => {
    console.log(e.target.selectedIndex);
    let subtype = commSubType[e.target.selectedIndex - 1];
    setSelectedSubType(commSubType[e.target.selectedIndex - 1]);
    setValue("commTypeName", commSubType[e.target.selectedIndex - 1]);
    //setValue('commissionType',commSubType[e.target.selectedIndex-1]);
    //console.log(gender);
    console.log(subtype);
    if (
      subtype &&
      (subtype.includes("REEMPLOY") || subtype.includes("REV FROM"))
    ) {
      setCdaoRequired(true);
    }
  };

  return (
    <div className="max-w-xl mx-auto ">
      <div className="w-full w-3/4  mx-auto ">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <h1>{id === "new" ? "Add" : "Edit"} Commission Letter </h1>
          <div className="text-red-500">{serverErrors}</div>

          <div className="grid grid-cols-2 gap-0 ">
            <div>
              <LiveSearch
                name="dak"
                onChange={handleInputChange}
                parentData={parentData.dak}
                parentCallback={callback}
                fkEntity={entity.dak}
                errCallback={errorCallback}
              />
              <div className="text-red-500 ">{errors.rank?.message}</div>
            </div>

            <div>
              <label>GoI Letter No</label>
              <input
                type="text"
                name="goiLetterNo"
                {...register("goiLetterNo")}
                className="form-control py-0 "
              />
              <div className="text-red-500">{errors.goiDetails?.message}</div>
            </div>
            <div>
              <label>GoI Letter Date</label>
              <input
                type="date"
                name="goiLetterDetail"
                {...register("goiLetterDate")}
                className="form-control py-0 "
              />
              <div className="text-red-500">
                {errors.goiLetterDate?.message}
              </div>
            </div>
            <div className="">
              <label>Commission Type</label>
              <input
                type="radio"
                value="PC"
                name="commType"
                {...register("commType")}
                onChange={handleCommTypeChange}
              />{" "}
              PC <span>&nbsp; &nbsp;</span>
              <input
                type="radio"
                value="SSC"
                name="commType"
                {...register("commType")}
                onChange={handleCommTypeChange}
              />{" "}
              SSC <span>&nbsp; &nbsp;</span>
            </div>
            <div>
              <b>Sub Types</b>
              <select
                className="form-control py-0"
                disabled={false}
                value={selectedSubType}
                onChange={handleSubTypeChange}
              >
                <option key={0} value={0}>
                  ---select---
                </option>
                {commSubType.map((item) => (
                  <option key={item} value={item.value}>
                    {" "}
                    {item}{" "}
                  </option>
                ))}
              </select>
            </div>

            <div className="">
              <label>Army Agency</label>
              <input
                type="radio"
                value="AHQ"
                name="armyAgency"
                {...register("armyAgency")}
                onChange={handleInputChange}
              />{" "}
              AHQ <span>&nbsp; &nbsp;</span>
              <input
                type="radio"
                value="DGAFMS"
                name="armyAgency"
                {...register("armyAgency")}
                onChange={handleInputChange}
              />{" "}
              DGAFMS <span>&nbsp; &nbsp;</span>
            </div>

            <div>
              <label>Total No. of Officers</label>
              <input
                type="text"
                name="totalOfficers"
                {...register("totalOfficers")}
                className="form-control py-0 "
              />
              <div className="text-red-500">
                {errors.totalOfficers?.message}
              </div>
            </div>
            {!cdaoRequired && (
              <>
                <div>
                  <label>Date of Commission</label>
                  <input
                    type="date"
                    name="commissionDate"
                    {...register("commissionDate")}
                    className="form-control py-0 "
                  />
                  <div className="text-red-500">
                    {errors.commission?.message}
                  </div>
                </div>
                <div>
                  <label>Annual Leave From</label>
                  <input
                    type="date"
                    name="annualLeaveFrom"
                    {...register("annualLeaveFrom")}
                    className="form-control py-0 "
                  />
                  <div className="text-red-500">
                    {errors.annualLeaveFrom?.message}
                  </div>
                </div>
                <div>
                  <label>Annual Leave To</label>
                  <input
                    type="date"
                    name="annualLeaveTo"
                    {...register("annualLeaveTo")}
                    className="form-control py-0 "
                  />
                  <div className="text-red-500">
                    {errors.annualLeaveTo?.message}
                  </div>
                </div>
              </>
            )}
            <div className="col-span-2 ...">
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
          <div className="px-4">
            <button type="submit" name="forma">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(CommissionControlEdit);
