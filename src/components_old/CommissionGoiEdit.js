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
  commissionControlDak: yup.object().required("Required"),

  corps: yup.object().required("Required"),

  rank: yup.object().required("Required"),
  dateOfBirth: yup.string().required("Required"),

  //	pcSsc: yup.string().required('Required'),
  officerName: yup.string().required("Required"),

  icMain: yup.string().required("Required"),
  icCheckDigit: yup.string().required("Required"),

  //tgcOthers: yup.string().required('Required'),

  //gender: yup.string().required('Required'),
  unitCode: yup.string().required("Required"),
});

const CommissionGoiEdit = () => {
  const {
    register,
    handleSubmit,
    getValues,
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
  const [key, setKey] = useState("goiInfo");
  const [dakId, setDakId] = useState(0);
  const [ccData, setCcData] = useState([]);
  const [ccTypeName, setCcTypeName] = useState("");
  const [goiNo, setGoiNo] = useState("");
  const [goiDate, setGoiDate] = useState(new Date());
  const [commDate, setCommDate] = useState(new Date());
  const [updateMesg, setUpdateMesg] = useState("");
  const [controlMesg, setControlMesg] = useState("");
  const [ccId, setCcId] = useState();
  const [goiList, setGoiList] = useState([]);
  const [icMain, setIcMain] = useState("");
  const [icPrefix, setIcPrefix] = useState("");
  const [corpsId, setCorpsId] = useState(0);
  const [unitData, setUnitData] = useState([]);
  const [ucode, setUcode] = useState("");
  const [totalOfficers, setTotalOfficers] = useState(0);
  const [cdaoRequired, setCdaoRequired] = useState(false);
  const [rank, setRank] = useState("");
  const [retireDate, setRetireDate] = useState("");
  const [cdaoNo, setCdaoNo] = useState("");
  const [unitDetails, setUnitDetails] = useState("");
  const [corpDetails, setCorpDetails] = useState("");
  const [dob, setDob] = useState("");
  const [doc, setDoc] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [action, setAction] = useState("");
  const [readOnly, setReadOnly] = useState(false);
  const [empDetails, setEmpDetails] = useState("");
  const [toe, setToe] = useState("");
  const [icPrefixList, setIcPrefixList] = useState([
    "DR",
    "DS",
    "IC",
    "MR",
    "MS",
    "NCC",
    "NCP",
    "NYA",
    "NYD",
    "NL",
    "NR",
    "NS",
    "NTR",
    "NTS",
    "NYA",
    "NYD",
    "RC",
    "SC",
    "SL",
    "SS",
    "TA",
    "TAM",
    "TAN",
    "TAT",
    "V",
    "VS",
    "WS",
  ]);

  useEffect(() => {
    let isCancelled = false;
    console.log(id);
    if (id !== "new") {
      async function fetchData() {
        let record = "";
        await axios
          .get("/commissionGois/" + id)
          .then((response) => {
            record = response.data;
            console.log("commission goi edit >> ", record);
            const fields = [
              "id",
              "commissionControlDak",
              "commissionControl",
              "commissionType",
              "corps",
              "reemployed",
              "annualLeaveTo",
              "antedatePay",
              "antedatePromotion",
              "tgcDateOfPermanentCommission",
              "auditorDate",
              "aaoDate",
              "aoDate",
              "approved",
              "rank",
              "dateOfBirth",
              "dateOfCommission",
              "annualLeaveFrom",
              "pcSsc",
              "officerName",
              "monthEnding",
              "icNo",
              "icCheckDigit",
              "cdaoNo",
              "cdaoCheckDigit",
              "tgcOthers",
              "recordStatus",
              "gender",
              "reason",
              "remarks",
              "icPrefix",
              "icMain",
              "unitCode",
              "unit",
              "effectDate",
              "employee",
              "toe",
              "ssIcNo",
              "ssIcCheckDigit",
              "tgcDateOfSsCommission",
            ];
            fields.forEach((field) => setValue(field, record[field]));
            //console.log(record["commissionControlDak"].id)
            console.log(
              "unitcode" + record["unitCode"] + "--" + record["unit"].unitName
            );
            console.log("leave from date" + record["annualLeaveFrom"]);
            if (record["corps"]) setCorpsId(record["corps"].id);
            if (record["unit"]) setUcode(record["unit"].unitCode);
            setDakId(record["commissionControlDak"].id);

            if (record["action"]) {
              setAction(record["action"]);
              if (record["action"] === "approve") setReadOnly(true);
            }

            if (record["employee"]) {
              setEmpDetails(
                record["employee"].cdaoNo +
                  " : " +
                  record["employee"].officerName +
                  " : " +
                  record["employee"].icNo
              );

              setRank(record["employee"].rank.rankName);
              setValue("employee", record["employee"]);
              if (record["employee"].dateOfBirth)
                setDob(record["employee"].dateOfBirth);
              if (record["employee"].dateOfCommission)
                setDoc(record["employee"].dateOfCommission);
              if (record["employee"].presentUnit)
                setUnitDetails(
                  record["employee"].presentUnit.unitName +
                    " : " +
                    record["employee"].presentUnit.unitCode
                );
            }
            if (record["icPrefix"]) setIcPrefix(record["icPrefix"]);
            if (record["toe"]) setToe(record["toe"]);
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

    console.log(icPrefix);
    async function fetchNyvalue() {
      if (!fetching && (icPrefix === "NYA" || icPrefix === "NYD"))
        await axios
          .get(`/commissionGois/nya/nextval/${icPrefix}/${id}`)
          .then((response) => {
            if (response.data) {
              setValue("icMain", response.data[0]);
              setValue("icCheckDigit", response.data[1]);
            }

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
    fetchNyvalue();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [icPrefix]);

  useEffect(() => {
    let fetching = false;
    let unmounted = false;

    console.log(corpsId);
    async function fetchUnit() {
      if (!fetching && corpsId > 0)
        await axios
          .get(`/corpss/${corpsId}`)
          .then((response) => {
            if (response.data) {
              setCorpDetails(response.data.unitName);
              setValue("corps", response.data);
            }

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
    fetchUnit();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [corpsId]);
  useEffect(() => {
    let fetching = false;
    let unmounted = false;

    console.log(corpsId);
    async function fetchUnit() {
      if (!fetching && corpsId > 0)
        await axios
          .get(`/units/corps/${corpsId}`)
          .then((response) => {
            if (response.data) {
              setUnitData(response.data);
            }

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
    fetchUnit();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [corpsId]);

  useEffect(() => {
    let fetching = false;
    let unmounted = false;
    let rec = "";
    console.log(dakId);
    async function fetchIcCheckDigit() {
      if (!fetching && dakId > 0)
        await axios
          .get(`/commissionGois/icCheckDigit/${icMain}`)
          .then((response) => {
            if (response.data) {
              setValue("icCheckDigit", response.data);
            }

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
    fetchIcCheckDigit();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [icMain]);

  useEffect(() => {
    let fetching = false;
    let unmounted = false;
    let rec = "";
    console.log(dakId);
    async function fetchGoiList() {
      if (!fetching && dakId > 0)
        await axios
          .get(`/daks/${dakId}/commissionGois`)
          .then((response) => {
            setGoiList(response.data);

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
    fetchGoiList();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dakId, updateMesg]);

  useEffect(() => {
    let fetching = false;
    let unmounted = false;
    let rec = "";
    console.log(dakId);
    async function fetchCommissionData() {
      if (!fetching && dakId > 0) console.log(dakId);
      await axios
        .get(`/daks/${dakId}/commissionControls`)
        .then((response) => {
          console.log(
            "response>>" +
              response.data["commissionType"].typeName +
              "--" +
              response.data["totalOfficers"] +
              "--" +
              response.data["annualLeaveFrom"]
          );
          rec = response.data;
          console.log("commission control data in goi edit >> ", rec);
          setCcData(response.data);
          setValue("commissionControl", response.data);
          setValue("commissionType", response.data["commissionType"]);
          if (rec && rec["commissionType"] && rec["commissionType"].typeName) {
            if (
              rec["commissionType"].typeName.includes("REEMPLOY") ||
              rec["commissionType"].typeName.includes("REV FROM")
            ) {
              setCdaoRequired(true);
            }
          }
          //setValue('commissionTypeName',response.data["commissionType"].typeName)
          setCcTypeName(response.data["commissionType"].typeName);
          setGoiNo(rec["goiLetterNo"]);
          setGoiDate(rec["goiLetterDate"]);
          setCommDate(rec["commissionDate"]);
          if (rec["commissionDate"])
            setValue("dateOfCommission", rec["commissionDate"]);
          setTotalOfficers(rec["totalOfficers"]);
          //   setValue("annualLeaveFrom", rec["annualLeaveFrom"]);
          //   setValue("annualLeaveTo", rec["annualLeaveTo"]);
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
  }, [dakId]);

  const onSubmit = (data, event) => {
    event.preventDefault();
    console.log(data);
    if (data.id) {
      axios
        .put("/commissionGois/" + data.id, data)
        .then((response) => {
          setUpdateMesg(response.data);
          setValue("officerName", "");
        })
        .catch((error) => {
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          setServerErrors(error.response.data);
        });
    } else {
      axios
        .post("/commissionGois", data)
        .then((response) => {
          setUpdateMesg(response.data);
          setValue("officerName", "");
          setValue("rank", []);
          setValue("gender", "");
          setValue("dateOfBirth", "");
          setValue("icNo", "");
          setValue("icCheckDigit", "");
          setValue("icPrefix", "");
          setValue("icMain", "");
          setIcPrefix("");
        })
        .catch((error) => {
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          setServerErrors(error.response.data);
        });
    }

    //history.push("/commissionGois");
  };

  const onError = (errors, e) => console.log(errors, e);

  //All foreign keys.
  // XXXXXX Add search fields and adjust the values as necessary
  const parentData = {
    dak: {
      title: "Commission Control Dak",
      url: "daks/commissiondaktypes",
      searchList: ["dakidNo"], //XXXXXXXXX Add search fields here and also in the corresponding repository
      fkEntity: "commissionControlDak",
    },
    commissionControl: {
      title: "Commission Control",
      url: "commissionControls",
      searchList: ["id"], //XXXXXXXXX Add search fields here and also in the corresponding repository
      fkEntity: "commissionControl",
    },
    commissionType: {
      title: "Commission Type",
      url: "commissionTypes",
      searchList: ["typeName"], //XXXXXXXXX Add search fields here and also in the corresponding repository
      fkEntity: "commissionType",
    },
    corps: {
      title: "Corps",
      url: "corpss",
      searchList: ["unitCode", "unitName"], //XXXXXXXXX Add search fields here and also in the corresponding repository
      fkEntity: "corps",
    },
    rank: {
      title: "Rank",
      url: "ranks",
      searchList: ["rankName"], //XXXXXXXXX Add search fields here and also in the corresponding repository
      fkEntity: "rank",
    },
    employee: {
      title: "Officer",
      url: "employees",
      searchList: ["cdaoNo", "officerName", "icNo"], //XXXXXXXXX Add search fields here and also in the corresponding repository
      fkEntity: "employee",
    },

    unit: {
      title: "Unit",
      url: `units/fetchAllUnits`,
      searchList: ["unitCode", "unitName"], //XXXXXXXXX Add search fields here and also in the corresponding repository
      fkEntity: "unit",
    },
  };

  //Callback for child components (Foreign Keys)
  const callback = (childData) => {
    //console.log("Parent Callback");
    setEntity((prev) => ({ ...prev, [childData.fk]: childData.entity }));
    setValue(childData.fk, childData.entity);
    //console.log(errors);
    console.log(">>>" + childData.fk);
    if (childData.fk === "commissionControlDak") {
      //console.log(childData.entity.referenceNo);
      setValue("commissionControlDak", childData.entity);
      setDakId(childData.entity.id);
      setValue("goiLetterNo", childData.entity.referenceNo);
      setValue("goiLetterDate", childData.entity.referenceDate);
    }
    if (childData.fk === "corps") {
      setCorpsId(childData.entity.id);
      console.log(childData.entity.id);
      console.log(parentData.unit);
    }
    //added pcdao 20032024
    if (childData.fk === "unit") {
      setValue("unit", childData.entity);
      setValue("unitCode", childData.entity.unitCode);
    }
    if (childData.fk === "employee") {
      setValue("cdaoNo", childData.entity.cdaoNo);
      setValue("checkDigit", childData.entity.checkDigit);
      setValue("icMain", childData.entity.icNo);
      setValue("icCheckDigit", childData.entity.icCheckDigit);
      setValue("gender", childData.entity.gender);
      setCdaoNo(childData.entity.cdaoNo);
      setValue("officerName", childData.entity.officerName);
      if (childData.entity.rank) {
        setRank(childData.entity.rank.rankName);
        setValue("rank", childData.entity.rank);
      }
      if (childData.entity.presentUnit) {
        setUnitDetails(
          childData.entity.presentUnit.unitName +
            " : " +
            childData.entity.presentUnit.unitCode
        );
        setValue("unitCode", childData.entity.presentUnit.unitCode);
      }
      if (childData.entity.fkPresentCorps) {
        setCorpsId(childData.entity.fkPresentCorps);
      }
      if (childData.entity.dateOfBirth) {
        setValue("dateOfBirth", childData.entity.dateOfBirth);
        setDob(childData.entity.dateOfBirth);
      }
      if (childData.entity.dateOfCommission) {
        setValue("dateOfCommission", childData.entity.dateOfCommission);
        setDoc(childData.entity.dateOfCommission);
      }
      if (childData.entity.dateOfReporting) {
        setValue("dateOfReporting", childData.entity.dateOfReporting);
      }
      if (childData.entity.fsDueDate) setRetireDate(childData.entity.fsDueDate);
    }
    clearErrors(childData.fk);
  };

  const handleToe = (e) => {
    console.log(e.target.value);
    setToe(e.target.value);
    setValue("toe", e.target.value);
  };
  const errorCallback = (err) => {
    //console.log(err);
    setServerErrors(err);
  };

  const handleInputChange = (e) => {
    console.log(e.target.value);
  };
  const handleInputChangeGender = (e) => {
    //	console.log(e.target.value);
    //console.log(entity.gender);
    //console.log(gender);
    setValue("entity.gender", e.target.value);
  };

  const handleInputChangePc = (e) => {
    //	console.log(e.target.value);
    //console.log(entity.gender);
    //console.log(gender);
    setValue("entity.pcSsc", e.target.value);
  };
  const handleButtonClick = (e) => {
    history.push("/commissionGois");
  };

  async function submit(data) {
    console.log(entity);
    if (disabled) return;

    setDisabled(true);

    axios.put(`/commissionGois/submit/${id}`, entity).then((response) => {
      console.log(response.data);
      if (response.data) {
        setServerErrors(response.data);
      }

      setDisabled(false);
    });
  }
  async function approve(data) {
    console.log(entity);
    if (disabled) return;

    setDisabled(true);

    axios.put(`/commissionGois/approve/${id}`, entity).then((response) => {
      console.log(response.data);
      if (response.data) {
        setServerErrors(response.data);
      }

      setDisabled(false);
    });
  }
  const handlePrefix = (index) => (e) => {
    console.log(index + "--" + e.selectedIndex);

    setIcPrefix(e.target.value);
  };

  const handlePrefixChange = (e) => {
    console.log(e.target.value);
    setIcPrefix(e.target.value);
    setValue("icPrefix", e.target.value);
  };

  const handleUnitChange = (e) => {
    console.log(e.target.value);
    setUcode(e.target.value);
    setValue("unitCode", e.target.value);
  };

  const handleIcMainChange = (e) => {
    console.log(e.target.value);
    setIcMain(e.target.value);
  };

  return (
    <div className="min-h-full bg-gray-100 text-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <h1>{id === "new" ? "Add" : "Edit"} Commission -GoI Info </h1>
          <h2>{updateMesg}</h2>
          <div className="text-red-500">{serverErrors}</div>

          <Tabs
            id="CommisionGoiEdit"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="goiInfo" title="GoI Info" className="h-120">
              <div className="grid grid-cols-2 gap-0">
                <div>
                  <LiveSearch
                    name="dak"
                    onChange={handleInputChange}
                    parentData={parentData.dak}
                    parentCallback={callback}
                    fkEntity={entity.commissionControlDak}
                    errCallback={errorCallback}
                    readOnly={readOnly}
                  />
                  <div className="text-red-500 ">
                    {errors.commissionControlDak?.message}
                  </div>
                </div>

                <div>
                  <label>Commission Type</label>
                  <input
                    type="text"
                    name="commissionTypeName"
                    value={ccTypeName}
                    readOnly
                    className="form-control py-0"
                  />
                </div>
                <div>
                  <label>GoI Letter No</label>
                  <input
                    type="text"
                    name="goiLetterNo"
                    value={goiNo}
                    readOnly
                    className="form-control py-0"
                  />
                </div>

                <div>
                  <label>GoI Letter Date</label>
                  <input
                    type="date"
                    name="goiLetterDate"
                    value={goiDate}
                    readOnly
                    className="form-control py-0"
                  />
                </div>
                <div>
                  <label>Total No. of Officers</label>
                  <input
                    type="text"
                    name="totalOfficers"
                    value={totalOfficers}
                    readOnly
                    className="form-control py-0"
                  />
                </div>

                {cdaoRequired && (
                  <>
                    {!readOnly && (
                      <div>
                        <LiveSearch
                          name="dak"
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
                    )}
                    {readOnly && (
                      <div>
                        <label>Officer Name</label>
                        {empDetails}
                      </div>
                    )}
                    <div>
                      <label>Rank</label>
                      <input
                        type="text"
                        name="rank"
                        value={rank}
                        readOnly={true}
                        className="form-control py-0"
                      />
                    </div>
                    <div>
                      <label>Date of Birth</label>
                      <input
                        type="date"
                        name="dob"
                        value={dob}
                        readOnly
                        className="form-control py-0"
                      />
                    </div>
                    <div>
                      <label>Date of Commission</label>
                      <input
                        type="date"
                        name="doc"
                        value={doc}
                        readOnly
                        className="form-control py-0"
                      />
                    </div>
                    <div>
                      <label>Unit</label>
                      <input
                        type="text"
                        name="unit"
                        value={unitDetails}
                        readOnly={true}
                        className="form-control py-0"
                      />
                    </div>
                    <div>
                      <label>Corps</label>
                      <input
                        type="text"
                        name="corps"
                        value={corpDetails}
                        readOnly={true}
                        className="form-control py-0"
                      />
                    </div>
                    <div>
                      <label>From Date</label>
                      <input
                        type="date"
                        name="effectDate"
                        {...register("effectDate")}
                        readOnly={readOnly}
                        className="form-control py-0"
                      />
                    </div>
                  </>
                )}
                {!cdaoRequired && (
                  <>
                    <div>
                      <label>Commission Date</label>
                      <input
                        type="date"
                        name="dateOfCommission"
                        {...register("dateOfCommission")}
                        readOnly
                        className="form-control py-0"
                      />
                    </div>

                    <div>
                      <LiveSearch
                        name="corps"
                        onChange={handleInputChange}
                        parentData={parentData.corps}
                        parentCallback={callback}
                        fkEntity={entity.corps}
                        errCallback={errorCallback}
                        readOnly={readOnly}
                      />
                      <div className="text-red-500 ">
                        {errors.corps?.message}
                      </div>
                    </div>
                    {/* //added pcdao 20032024 */}

                    <div>
                      <LiveSearch
                        name="unit"
                        onChange={handleInputChange}
                        parentData={parentData.unit}
                        parentCallback={callback}
                        fkEntity={entity.unit}
                        errCallback={errorCallback}
                        readOnly={readOnly}
                      />
                      <div className="text-red-500 ">
                        {errors.unit?.message}
                      </div>
                    </div>
                    {/* <div>
                      <label>Unit</label>
                      <div>
                        <select
                          name="unit"
                          value={ucode}
                          onChange={handleUnitChange}
                          disabled={readOnly && ccTypeName !== "REEMPLOYMENT"}
                        >
                          <option>--Select--</option>
                          {unitData?.map((item, index) => (
                            <option value={item.unitCode} key={index}>
                              {item.unitCode}
                              {" : "}
                              {item.unitName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div> */}

                    <div>
                      <label>Officer Name</label>

                      <input
                        type="text"
                        name="officerName"
                        {...register("officerName")}
                        className="form-control py-0"
                        readOnly={readOnly}
                      />
                      <div className="text-red-500">
                        {errors.officerName?.message}
                      </div>
                    </div>

                    <div>
                      <LiveSearch
                        name="rank"
                        onChange={handleInputChange}
                        parentData={parentData.rank}
                        parentCallback={callback}
                        fkEntity={entity.rank}
                        errCallback={errorCallback}
                        readOnly={readOnly}
                      />
                      <div className="text-red-500 ">
                        {errors.rank?.message}
                      </div>
                    </div>

                    <div className="">
                      <label>Gender</label>
                      <input
                        type="radio"
                        value="F"
                        name="gender"
                        {...register("gender")}
                        onChange={handleInputChangeGender}
                        disabled={readOnly}
                      />{" "}
                      Female <span>&nbsp; &nbsp;</span>
                      <input
                        type="radio"
                        value="M"
                        name="gender"
                        {...register("gender")}
                        onChange={handleInputChangeGender}
                        disabled={readOnly}
                      />{" "}
                      Male <span>&nbsp; &nbsp;</span>
                    </div>
                    <div>
                      <label>Date of Birth</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        {...register("dateOfBirth")}
                        className="form-control py-0"
                        readOnly={readOnly}
                      />
                      <div className="text-red-500">
                        {errors.dateOfBirth?.message}
                      </div>
                    </div>
                    <div>
                      <label>Personal No</label>
                      <div className="flex flex-row ...">
                        <div>
                          <select
                            name="icPrefix"
                            value={icPrefix}
                            onChange={handlePrefixChange}
                            disabled={readOnly}
                          >
                            <option>--Select--</option>
                            {icPrefixList?.map((item, index) => (
                              <option value={item.toString()} key={index}>
                                {item.toString()}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <input
                            type="text"
                            name="icMain"
                            {...register("icMain")}
                            maxLength={5}
                            onChange={handleIcMainChange}
                            disabled={readOnly}
                          />
                        </div>
                      </div>
                      <div className="text-red-500">
                        {errors.icMain?.message}
                      </div>
                    </div>

                    <div>
                      <label>Ic Check Digit</label>
                      <input
                        type="text"
                        name="icCheckDigit"
                        {...register("icCheckDigit")}
                        className="form-control py-0"
                        readOnly={true}
                      />
                      <div className="text-red-500">
                        {errors.icCheckDigit?.message}
                      </div>
                    </div>

                    {/* new added 110324 */}
                    <div>
                      <div>
                        <label>SS IC No for TGC</label>

                        <div>
                          <input
                            type="text"
                            name="ssIcNo"
                            {...register("ssIcNo")}
                            //onChange={handlePrefixChange}
                            disabled={readOnly}
                          />
                        </div>
                      </div>
                      <div className="text-red-500">
                        {errors.icMain?.message}
                      </div>
                    </div>
                    <div>
                      <label>SS Check Digit for TGC</label>
                      <div className="w-2">
                        <input
                          type="text"
                          name="ssIcCheckDigit"
                          {...register("ssIcCheckDigit")}
                          maxLength={1}
                          //onChange={handleIcMainChange}
                          disabled={readOnly}
                        />
                      </div>
                    </div>
                    {/* */}

                    <div>
                      <label>Terms of Engagement </label>
                      <select
                        name="toe"
                        value={toe}
                        onChange={handleToe}
                        disabled={readOnly}
                      >
                        <option value="0">--select---</option>
                        <option value="5">5 Years</option>

                        <option value="10">10 Years</option>
                      </select>
                    </div>

                    <div>
                      <label>Annual Leave From</label>
                      <input
                        type="date"
                        name="annualLeaveFrom"
                        {...register("annualLeaveFrom")}
                        className="form-control py-0"
                        readOnly={readOnly}
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
                        className="form-control py-0"
                        readOnly={readOnly}
                      />
                      <div className="text-red-500">
                        {errors.annualLeaveTo?.message}
                      </div>
                    </div>

                    <div>
                      <label>Antedate Pay</label>
                      <input
                        type="date"
                        name="antedatePay"
                        {...register("antedatePay")}
                        className="form-control py-0"
                        readOnly={readOnly}
                      />
                      <div className="text-red-500">
                        {errors.antedatePay?.message}
                      </div>
                    </div>

                    <div>
                      <label>Antedate Promotion</label>
                      <input
                        type="date"
                        name="antedatePromotion"
                        {...register("antedatePromotion")}
                        className="form-control py-0"
                        readOnly={readOnly}
                      />
                      <div className="text-red-500">
                        {errors.antedatePromotion?.message}
                      </div>
                    </div>

                    <div>
                      <label>Tgc Date Of Permanent Commission</label>
                      <input
                        type="date"
                        name="tgcDateOfPermanentCommission"
                        {...register("tgcDateOfPermanentCommission")}
                        className="form-control py-0"
                        readOnly={readOnly}
                      />
                      <div className="text-red-500">
                        {errors.tgcDateOfPermanentCommission?.message}
                      </div>
                    </div>

                    <div>
                      <label>Tgc Date Of SS Commission</label>
                      <input
                        type="date"
                        name="tgcDateOfSsCommission"
                        {...register("tgcDateOfSsCommission")}
                        className="form-control py-0"
                        readOnly={readOnly}
                      />
                      <div className="text-red-500">
                        {errors.tgcDateOfSsCommission?.message}
                      </div>
                    </div>

                    {/* <div>
                      <label>Tgc Others</label>
                      <input
                        type="checkbox"
                        name="tgcOthers"
                        value={{ ...register("tgcOthers") }}
                        onChange={(e) => {
                          setValue("tgcOthers", e.target.checked);
                        }}
                        disabled={readOnly}
                      />
                      <div className="text-red-500">
                        {errors.tgcOthers?.message}
                      </div>
                    </div> */}
                  </>
                )}
              </div>
              <div className="flexContainer">
                {!readOnly && (
                  <div className="px-2...">
                    <button type="submit">Save</button>
                  </div>
                )}
                {action && action === "submit" && (
                  <div className="px-2...">
                    <button type="button" onClick={() => submit()}>
                      Submit
                    </button>
                  </div>
                )}
                {action && action === "approve" && (
                  <div className="px-2...">
                    <button type="button" onClick={() => approve()}>
                      Approve
                    </button>
                  </div>
                )}
                <div className="px-2">
                  <button type="button" onClick={handleButtonClick}>
                    Cancel
                  </button>
                </div>
              </div>
            </Tab>
            <Tab eventKey="page2" title="GoiList" className="h-120">
              <div className="grid grid-cols-1 gap-0 ">
                <h1>Goi List</h1>

                <div className="container">
                  <table className="table table-bordered">
                    <tr>
                      <th>Sl</th>
                      <th>IcNo</th>
                      <th>Name</th>
                      <th>Rank</th>
                      <th>Dob</th>
                    </tr>

                    {goiList.map((goi, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{goi.icNo}</td>
                        <td>{goi.officerName}</td>
                        <td>{goi.rank.rankName}</td>
                        <td>{goi.dateOfBirth}</td>
                      </tr>
                    ))}
                  </table>
                </div>
              </div>
            </Tab>
          </Tabs>
        </form>
      </div>
    </div>
  );
};

export default withRouter(CommissionGoiEdit);
