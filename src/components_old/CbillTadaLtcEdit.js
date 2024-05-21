/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By :
 */

import { useState, useEffect, useMemo } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import LiveSearch from "../utils/LiveSearch";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Table, { SelectColumnFilter } from "../utils/Table";
import TablePage from "../utils/TablePage";
import Modal from "../utils/Modal";

const schema = yup.object({
  dak: yup.object().required("Required"),
  //    billType: yup.object().required('Required'),
  section: yup.object().required("Required"),
  employee: yup.object().required("Required"),
  //cdaNo: yup.string().required('Required'),
  //checkDigit: yup.string().required('Required'),
  //    claimType: yup.string().required('Required'),
  //  claimDate: yup.string().required('Required'),
  //    monthEnding: yup.string().required('Required'),
  journeyStationFrom: yup
    .string()
    .max(30, "Journey Station From should not be more than 30 characters")
    .nullable(),

  journeyStationTo: yup
    .string()
    .max(30, "Journey Station To should not be more than 30 characters")
    .nullable(),

  modeOfJourney: yup
    .string()
    .max(10, "Mode of Journey should not be more than 10 characters")
    .nullable(),
  //    blockYear: yup.string().required('Required'),
  amountClaimed: yup.number().required("Required"),
  //     amountPassed: yup.number().integer().required('Required'),
  //    advanceAmount: yup.number().integer().required('Required'),
  //      amountDisallowed: yup.number().integer().required('Required'),
  //   penalInterest: yup.number().integer().required('Required'),
  //   adjustmentAmount: yup.number().integer().required('Required'),
  //    finalAdjustment: yup.object().required('Required'),
  //   approved: yup.boolean().required('Required'),
  //   recordStatus: yup.string().required('Required'),
  //   reason: yup.string().required('Required'),
  //   unit: yup.object().required('Required'),
  //    foreignTravel: yup.boolean().required('Required'),
  //    recoveries: yup.number().integer().required('Required'),
  //    periodFrom: yup.string().required('Required'),
  //   periodTo: yup.string().required('Required'),
  //    noOfDays: yup.number().integer().required('Required'),
  //     typeOfLtc: yup.string().required('Required'),
  //    verifiedAuditChecks: yup.boolean().required('Required'),
  //	   codeHead: yup.string().required('Required'),
  //   provisionalPayment: yup.boolean().required('Required'),
  //    classOfTravel: yup.string().required('Required'),
  //    journeyStartDate: yup.string().required('Required'),
  //     journeyEndDate: yup.string().required('Required'),
  //   travellingCharges: yup.number().integer().required('Required'),
  //     paymentMode: yup.object().required('Required'),
  //     cdr: yup.object().required('Required'),
  //     paymentRecordType: yup.string().required('Required'),
  //    foreignTadaAmount: yup.number().integer().required('Required'),
  //    mroAmount: yup.number().integer().required('Required'),
  //     mroDakId: yup.string().required('Required'),
  movementOrderNo: yup
    .string()
    .max(15, "Movement Order No should not be more than 15 characters")
    .nullable(),
  //    movementOrderDate: yup.string().required('Required'),
  //    otherAmount: yup.number().integer().required('Required'),
  //   bankAccount: yup.object().required('Required'),
  //     htBlockYear: yup.string().required('Required'),
  //    cvInLieuOfLtc: yup.boolean().required('Required'),
  conveyanceType: yup
    .string()
    .max(20, "Conveyance Type No should not be more than 20 characters")
    .nullable(),
  //    noOfMembers: yup.number().integer().required('Required'),
  //    empCategory: yup.string().required('Required'),
  //    roundTripFarePerPerson: yup.number().integer().required('Required'),
  //    totalFare: yup.number().integer().required('Required'),
  //    leaveEncashAmount: yup.number().integer().required('Required'),
  //      totalValue: yup.number().integer().required('Required'),
  //    auditorDate: yup.string().required('Required'),
  //    aaoDate: yup.string().required('Required'),
  //     aoDate: yup.string().required('Required'),
  //     dvNo: yup.number().integer().required('Required'),
  //     dvMonth: yup.string().required('Required'),
  //    dpSheetNo: yup.number().integer().required('Required'),
  //     dpSheetDate: yup.string().required('Required'),
  //     cmpBatch: yup.string().required('Required'),
  //   cmpFileNo: yup.string().required('Required'),
  //     cmpDate: yup.string().required('Required'),
});

const CbillTadaLtcEdit = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });

  let { id } = useParams();

  let history = useHistory();
  const [serverErrors, setServerErrors] = useState([]);
  const [entity, setEntity] = useState({});
  const [state, setState] = useState({});
  const [key, setKey] = useState("page1");
  const [query, setQuery] = useState("");
  const [piwValue, setPiwValue] = useState(false);
  //pcdao
  const [officerName, setOfficerName] = useState("");

  const [claimDate, setClaimDate] = useState(new Date());
  const [periodFrom, setPeriodFrom] = useState(new Date());
  const [periodTo, setPeriodTo] = useState(new Date());
  const [journeyDate, setJourneyDate] = useState();
  const [journeyEndDate, setJourneyEndDate] = useState(new Date());
  const [movementOrderDate, setMovementOrderDate] = useState(new Date());
  const [auditorDate, setAuditorDate] = useState(new Date());
  const [aaoDate, setAaoDate] = useState(new Date());
  const [aoDate, setAoDate] = useState(new Date());
  const [dpSheetDate, setDpSheetDate] = useState(new Date());
  const [cmpDate, setCmpDate] = useState(new Date());
  const [rankName, setRankName] = useState("");
  const [cdaoNo, setCdaoNo] = useState("");
  const [buttonState, setButtonState] = useState(1);
  const [disallowanceData, setDisallowanceData] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btype, setBtype] = useState("");
  const [dakId, setDakId] = useState("");
  const [newpage, setNewpage] = useState(2);

  const [monthEnding, setMonthEnding] = useState("");
  //const [blockYear, setBlockYear]=useState();
  const [familyData, setFamilyData] = useState([]);
  const [fdData, setFdData] = useState([]);
  const [demandData, setDemandData] = useState([]);
  const [empUpdated, setEmpUpdated] = useState(0);
  const [mroData, setMroData] = useState([]);
  const [mData, setMData] = useState([]);
  const [cbillDetailData, setCbillDetailData] = useState([]);
  //const [cbdData, setCbdData] = useState([]);
  const [supplementary, setSupplementary] = useState(false);
  const [settledList, setSettledList] = useState([]);

  const [bankDetails, setBankDetails] = useState("");
  const [modeOfJourney, setModeOfJourney] = useState("");
  const [calendarYear, setCalendarYear] = useState("");
  const [empId, setEmpId] = useState(0);
  const [cbillId, setCbillId] = useState(0);
  const [ifsc, setIfsc] = useState("");
  const [account, setAccount] = useState("");
  const [blockYear, setBlockYear] = useState("");

  const [mesg, setMesg] = useState("");
  const [amtClaimed, setAmtClaimed] = useState(0);
  const [amountDisallowed, setAmountDisallowed] = useState(0);

  const [advanceAmount, setAdvanceAmount] = useState(0);
  const [dakTypeId, setDakTypeId] = useState("");
  const [billTypeItem, setBillTypeItem] = useState("");
  const [otherRejSelected, setOtherRejSelected] = useState(false);
  const [page, setPage] = useState(0);

  const [billTypeData, setBillTypeData] = useState([]);
  const [billTypeItems, setBillTypeItems] = useState([]);
  const [days, setDays] = useState("");
  const [stage, setStage] = useState("");
  const [payLevel, setPayLevel] = useState("");
  const [basicPay, setBasicPay] = useState("");
  const [dist, setDist] = useState(0);
  const [previousData, setPreviousData] = useState([]);
  const [prevData, setPrevData] = useState([]);
  const [dakTypeDesc, setDakTypeDesc] = useState("");
  const [newDList, setNewDList] = useState([
    {
      disallowanceId: 0,
      dakidNo: "",
      disallowanceName: "",
      amount: 0,
      itemAmountClaimed: 0,
      amountAdmitted: 0,
      receiptNo: "",
      remarks: "",
      expectedDis: "",
    },
  ]);
  const [disCodeList, setDisCodeList] = useState([]);
  const [disName, setDisName] = useState("");
  const [disItem, setDisItem] = useState([]);
  const [cd, setCd] = useState("");
  const [cdList, setCdList] = useState([]);
  const [trList, setTrList] = useState([]);
  const [trItem, setTrItem] = useState("");
  const [billTypeName, setBillTypeName] = useState("");
  const [rejectionList, setRejectionList] = useState([]);
  const [status, setStatus] = useState("");
  const [rollBackReason, setRollBackReason] = useState("");
  const [expectedDisAmt, setExpectedDisAmt] = useState("0");
  const [disableDis, setDisableDis] = useState(false);
  const [disablePd, setDisablePd] = useState(false);
  const [duplicateAlert, setDuplicateAlert] = useState([]);
  const [alertList, setAlertList] = useState([]);
  //pcdao --added for TablePage
  const [pageSize, setPageSize] = useState(0);
  const [tadaCal, setTadaCal] = useState([
    {
      basicPay: 0,
      payLevel: "",
      entitledFoodChargesPerDay: 0,
      claimedFoodChargesPerDay: 0,
      days: 0,
      totalFoodChargesClaimed: 0,
      totalEnitledFoodCharges: 0,
      entitledAccnChargesPerDay: 0,
      claimedAccnChargesPerDay: 0,
      totalEntitledAccnCharges: 0,
      totalAccnChargesClaimed: 0,
    },
  ]);

  const foodChargesList = [
    { pl: "9", amt: 900 },
    { pl: "10", amt: 900 },
    { pl: "10A", amt: 900 },
    { pl: "10B", amt: 900 },
    { pl: "11", amt: 900 },
    { pl: "12", amt: 1000 },
    { pl: "12A", amt: 1000 },
    { pl: "12B", amt: 1000 },
    { pl: "13", amt: 1000 },
    { pl: "13A", amt: 1000 },
    { pl: "13B", amt: 1000 },
    { pl: "14", amt: 1200 },
    { pl: "15", amt: 1200 },
    { pl: "16", amt: 1200 },
    { pl: "17", amt: 1200 },
    { pl: "18", amt: 1200 },
  ];

  const accnChargesList = [
    { pl: "9", amt: 2250 },
    { pl: "10", amt: 2250 },
    { pl: "10A", amt: 2250 },
    { pl: "10B", amt: 2250 },
    { pl: "11", amt: 2250 },
    { pl: "12", amt: 4500 },
    { pl: "12A", amt: 4500 },
    { pl: "12B", amt: 4500 },
    { pl: "13", amt: 4500 },
    { pl: "13A", amt: 4500 },
    { pl: "13B", amt: 4500 },
    { pl: "14", amt: 7500 },
    { pl: "15", amt: 7500 },
    { pl: "16", amt: 7500 },
    { pl: "17", amt: 7500 },
    { pl: "18", amt: 7500 },
  ];

  const [settledMroData, setSettledMroData] = useState([]);
  // pcdao 29092022 for ndc popup message
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    handleNoOfDays(days);
    handleAccnCharges("entity.logingCharges");
    handleFoodCharges("entity.foodCharges");
  }, [days, billTypeName]);
  useEffect(() => {
    console.log(expectedDisAmt);
  }, [expectedDisAmt]);

  useEffect(() => {
    window.scrollTo(0, 0);
    let isCancelled = false;
    //console.log(id);
    if (id !== "new") {
      async function fetchData() {
        let record = "";
        await axios
          .get("/cbillTadaLtcs/" + id)
          .then((response) => {
            record = response.data;
            //console.log(">>>>>>>:" + record.monthEnding);
            //console.log(">>>>>>>:" + record.claimType);
            console.log(response.data);
          })
          .catch((error) => {
            //console.log(error);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });

        setDakId(record.dak.dakidNo);
        setMonthEnding(record.monthEnding);
        //pcdao
        setOfficerName(record.employee.officerName);
        setCdaoNo(record.employee.cdaoNo);
        setRankName(record.employee.rank.rankName);
        setEmpId(record.employee.id);
        setDakTypeId(record.dak.dakType.id);
        setDakTypeDesc(record.dak.dakType.description);
        setCd(record.codeHd);
        setStatus(record.recordStatus);
        if (record.taRule != null) setTrItem(record.taRule);
        if (record.billType != null) {
          setBillTypeItem(record.billType.description);
          console.log(record.journeyStartDate);
          setJourneyDate(record.journeyStartDate + "");
          setRollBackReason(record.reason);
          //setJourneyDate(record.journeyStartDate);
          //console.log(billTypeItem);
        }
        if (record.dak.dakType.description.toLowerCase().includes("adv")) {
          setBtype("advance");
        } else if (
          record.dak.dakType.description.toLowerCase().includes("final") ||
          record.dak.dakType.description.toLowerCase().includes("adj")
        ) {
          setBtype("final");
        }
        let bt = "";
        if (record.billType != null) {
          if (record.billType.description.toLowerCase().includes("temp")) {
            bt = "temp";
          } else if (
            record.billType.description.toLowerCase().includes("perm")
          ) {
            bt = "perm";
          } else if (
            record.billType.description.toLowerCase().includes("ltc")
          ) {
            bt = "ltc";
          }
        }
        setBillTypeName(bt);
        if (record.otherRej !== null && record.otherRej.length > 0) {
          setOtherRejSelected(true);
        }
        //console.log("billType " + record.billType.description);

        const fields = [
          "id",
          "dak",
          "billType",
          "section",
          "employee",
          "cdaNo",
          "checkDigit",
          "claimType",
          "claimDate",
          "monthEnding",
          "journeyStationFrom",
          "journeyStationTo",
          "modeOfJourney",
          "blockYear",
          "amountClaimed",
          "amountPassed",
          "advanceAmount",
          "amountDisallowed",
          "penalInterest",
          "adjustmentAmount",
          "finalAdjustment",
          "approved",
          "recordStatus",
          "reason",
          "unit",
          "foreignTravel",
          "recoveries",
          "periodFrom",
          "periodTo",
          "noOfDays",
          "typeOfLtc",
          "verifiedAuditChecks",
          "codeHd",
          "provisionalPayment",
          "classOfTravel",
          "journeyStartDate",
          "journeyEndDate",
          "journeyDa",
          "paymentMode",
          "cdr",
          "paymentRecordType",
          "foreignTadaAmount",
          "mroAmount",
          "mroDakId",
          "movementOrderNo",
          "movementOrderDate",
          "otherAmount",
          "bankAccount",
          "htBlockYear",
          "cvInLieuOfLtc",
          "noOfMembers",
          "empCategory",
          "roundTripFarePerPerson",
          "totalFare",
          "leaveEncashAmount",
          "totalValue",
          "auditorDate",
          "aaoDate",
          "aoDate",
          "dvNo",
          "calendarYear",
          "dvMonth",
          "dpSheetNo",
          "dpSheetDate",
          "cmpBatch",
          "cmpFileNo",
          "cmpDate",
          "fdList",
          "dList",
          "oList",
          "noOfDays",
          "foodCharges",
          "lodgingCharges",
          "distance",
          "ctg",
          "baggageQuantity",
          "baggageAmount",
          "conveyanceAmount",
          "conveyanceType",
          "taRule",
          "advId",
          "transId",
          "taskNo",
          "rejectionDetailList",
          "rma",
          "otherRej",
          "remarks",
          "settledDemandList",
          "piWaived",
          "piWaiverRemarks",
          "uploadRemarksFlag",
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
  }, []);

  useEffect(() => {
    document.title = `Falcon | ${
      entity?.dak?.dakidNo ? entity?.dak?.dakidNo : ""
    }`;
  }, [entity]);

  useEffect(() => {}, [status, setStatus, supplementary, setSupplementary]);
  useEffect(() => {
    let fetching = false;
    let unmounted = false;
    async function fetchTrRuleData() {
      if (dakId)
        if (!fetching)
          await axios
            .get(`/trRules/billType/${billTypeName}`)
            .then((response) => {
              if (!unmounted) {
                setTrList(
                  response.data.map(({ id, tdRule, trRuleDesc }) => ({
                    id: id,
                    label: tdRule + ":" + trRuleDesc,
                    value: tdRule,
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
    fetchTrRuleData();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billTypeName, setBillTypeName]);

  useEffect(() => {
    let fetching = false;
    let unmounted = false;
    async function fetchCdData() {
      //console.log("Billtype name----:" + billTypeName);
      if (dakId)
        if (!fetching)
          await axios
            .get(`/codeHeads/billType/${billTypeName}`)
            .then((response) => {
              if (!unmounted) {
                setCdList(
                  response.data.map(({ id, codeHead, description }) => ({
                    id: id,
                    label: codeHead + ":" + description,
                    value: codeHead,
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
    fetchCdData();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billTypeName, setBillTypeName]);

  useEffect(() => {
    let fetching = false;
    let unmounted = false;
    async function fetchDcData() {
      //console.log("loading dis " + dakId);
      if (dakId)
        if (!fetching)
          await axios
            .get(`/disallowanceCodes/getAllForGroup/TWING`)
            .then((response) => {
              //console.log("disallowance code data >>>> "+response.data);

              setDisCodeList(response.data);
            })
            .catch((error) => {
              //console.log(error);
              //console.log(error.response.status);
              //console.log(error.response.headers);
              if (error.response) setServerErrors(error.response.data.error);
              else setServerErrors(error.Error);
            });
    }
    fetchDcData();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dakId, setDakId]);

  useEffect(() => {
    let fetching = false;
    let unmounted = false;
    async function fetchData() {
      //console.log("loading dis " + dakId);
      if (dakId)
        if (!fetching)
          await axios
            .get(`/disallowances/dakidNo/` + dakId)
            .then((response) => {
              //console.log("disallowance data >>>> "+response.data);
              if (response.data[0] === "100") setNewDList(response.data[1]);
            })
            .catch((error) => {
              //console.log(error);
              //console.log(error.response.status);
              //console.log(error.response.headers);
              if (error.response) setServerErrors(error.response.data.error);
              else setServerErrors(error.Error);
            });
    }
    fetchData();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dakId, setDakId]);

  useEffect(() => {
    let fetching = false;
    let unmounted = false;
    async function fetchData() {
      //console.log("loading dis " + dakId);
      if (dakId)
        if (!fetching)
          await axios
            .get(`/rejectionDetails/dakId/` + dakId)
            .then((response) => {
              //console.log("rej data >>>> "+response.data);
              setRejectionList(response.data);
              setValue("rejectionDetailList", response.data);
            })
            .catch((error) => {
              //console.log(error);
              //console.log(error.response.status);
              //console.log(error.response.headers);
              if (error.response) setServerErrors(error.response.data.error);
              else setServerErrors(error.Error);
            });
    }
    fetchData();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dakId, setDakId]);

  useEffect(() => {
    let fetching = false;
    let unmounted = false;
    async function fetchFdData() {
      if (!fetching && !unmounted)
        await axios
          .get(`/employees/${empId}/cbilltadaltcs/${id}`)
          .then((response) => {
            //console.log("==========Family Details====:" + response.data);
            setFamilyData(response.data);
            setValue("fdList", response.data);
            //console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
            //	console.log(error.response.status);
            //	console.log(error.response.headers);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
    }
    if (billTypeName && billTypeName.includes("ltc")) fetchFdData();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billTypeName, setBillTypeName]);

  useEffect(() => {
    let fetching = false;
    let unmounted = false;
    async function fetchPayData() {
      if (!fetching && cdaoNo.length > 2)
        await axios
          .get(`/employees/activePayElements/${empId}/${journeyDate}`)
          .then((response) => {
            //console.log("==========pay element====:" + response.data);
            setPayLevel(response.data["payLevel"]);
            setBasicPay(response.data["basicPay"]);
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
  }, [empId, journeyDate]);
  useEffect(() => {
    let fetching = false;
    let unmounted = false;
    async function fetchDrData() {
      console.log("=======CDA O No for Demand Register :" + cdaoNo);

      if (!fetching && billTypeName && btype === "final")
        await axios
          .get(`/cbillTadaLtcs/${id}/billType/${billTypeName}/demandRegisters`)
          .then((response) => {
            //console.log("==========Demand Register Details====:" + response.data);
            if (response.data) {
              if (response.data[0] != null) setDemandData(response.data[0]);
              setValue("dList", response.data[0]);
              if (response.data[1] != null) {
                setSettledList(response.data[1]);
                setValue("settledDemandList", response.data[1]);
              }
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
    fetchDrData();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [empUpdated, setEmpUpdated, billTypeName, setBillTypeName]);

  useEffect(() => {
    let fetching = false;
    let unmounted = false;
    //console.log("daktype");
    async function fetchBillType() {
      //console.log(dakTypeId);
      if (!fetching && id > 0)
        await axios
          .get(`/cbillTadaLtcs/${id}/billTypes`)
          .then((response) => {
            //console.log("response>>" + response.data);
            setBillTypeData(response.data);
            if (!unmounted) {
              setBillTypeItems(
                response.data.map(({ id, description }) => ({
                  id: id,
                  label: description,
                  value: description,
                }))
              );
              setLoading(false);
            }
          })
          .catch((error) => {
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
    }
    fetchBillType();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    let fetching = false;
    let unmounted = false;
    async function fetchMData() {
      if (!fetching && cdaoNo.length > 2)
        await axios
          .get(`/employees/${empId}/omros`)
          .then((response) => {
            //console.log("==========OMRO Details====:" + response.data);
            setMroData(response.data);
          })
          .catch((error) => {
            //console.log(error);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
    }
    fetchMData();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [empId, setEmpId]);
  //18PCDAO
  useEffect(() => {
    let fetching = false;
    let unmounted = false;
    async function fetchSettledMroData() {
      if (!fetching && cdaoNo.length > 2)
        await axios
          .get(`/cbillTadaLtcs/${id}/settledMro`)
          .then((response) => {
            console.log("==========OMRO Details====:", response.data);
            setSettledMroData(response.data);
          })
          .catch((error) => {
            //console.log(error);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
    }
    fetchSettledMroData();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [empId, setEmpId]);
  //18PCDAO
  useEffect(() => {
    let fetching = false;
    let unmounted = false;
    async function fetchBankDetailsData() {
      if (!fetching && cdaoNo.length > 2)
        await axios
          .get(`/employees/${empId}/bankDetails`)
          .then((response) => {
            //console.log("==========Bank Details====:" + response.data);
            setBankDetails(response.data);
            setAccount(response.data["bankAccountClearText"]);
            setIfsc(response.data["ifsc"]);
            if (!unmounted) {
              setBankDetails(
                response.data.map(({ cdaoNo, bankAccountNo, ifsc }) => ({
                  label: cdaoNo,
                  value: bankAccountNo,
                  ifsc: ifsc,
                }))
              );
              setLoading(false);
            }
          })
          .catch((error) => {
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
    }
    fetchBankDetailsData();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [empId, setEmpId]);

  useEffect(() => {
    let fetching = false;
    let unmounted = false;
    async function fetchPreviousData() {
      //	console.log("=======CDA O No for Demand Register :" + cdaoNo);

      if (!fetching && cdaoNo.length > 2)
        await axios
          .get(`/cbillTadaLtcs/${id}/empId/${empId}/allbillsTwing`)
          .then((response) => {
            //console.log("==========CbillTadaLtc Data ====:" + response.data);
            setPreviousData(response.data);
          })
          .catch((error) => {
            //console.log(error);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
    }
    fetchPreviousData();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [empId, setEmpId]);

  //pcdao
  async function generateIntimationSlip(id) {
    await axios
      .get(`/cbillTadaLtcs/${id}/intimationSlip`)
      .then((response) => {
        //console.log(data);
        //console.log(response.data);
        const url = window.open(
          `${process.env.REACT_APP_BASE_URL}/files/openpdf/${response.data}`,
          "_blank",
          "width=800, height=1000, left=800"
        );
      })
      .catch((error) => {
        console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });
  }

  //pcdao
  async function tBillRejectionMemo(id) {
    console.log("=======:" + id);
    await axios
      .put(`/cbillTadaLtcs/${id}/tBillRejectionMemo`)
      .then((response) => {
        // console.log(data);
        console.log(response.data);
        const url = window.open(
          `${process.env.REACT_APP_BASE_URL}/files/openpdf/${response.data}`,
          "_blank",
          "width=800, height=1000, left=800"
        );
      })
      .catch((error) => {
        console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });
  }

  const onSubmit = (data, event) => {
    event.preventDefault();
    //	console.log(data);
    if (data.id) {
      if (buttonState === 1) {
        axios
          .put("/cbillTadaLtcs/empDetails/" + data.id, data)
          .then((response) => {
            //console.log("---DATA---:" +  response.data);

            if (response.status === 200) {
              setMesg(response.data["reason"]);
              setAmtClaimed(response.data["amountClaimed"]);
              setValue("recordStatus", response.data["recordStatus"]);
              if (response.data["movementOrderNo"] != null)
                setValue("movementOrderNo", response.data["movementOrderNo"]);
              if (response.data["movementOrderDate"] != null)
                setValue(
                  "movementOrderDate",
                  response.data["movementOrderDate"]
                );
              if (response.data["claimType"].includes("S")) {
                setSupplementary(true);
                setValue(
                  "journeyStationFrom",
                  response.data["journeyStationFrom"]
                );
                setValue("journeyStationTo", response.data["journeyStationTo"]);
                setValue("totalFare", response.data["totalFare"]);
                setValue("noOfDays", response.data["noOfDays"]);
                setValue("lodgingCharges", response.data["lodgingCharges"]);
                setValue("journeyDa", response.data["journeyDa"]);
                setValue("foodCharges", response.data["foodCharges"]);
              } else setSupplementary(false);
              setKey("page2");
              setServerErrors("");
              setEmpUpdated((empUpdated) => empUpdated + 1);
              setStatus(response.data["recordStatus"]);
            }
          })
          .catch((error) => {
            //console.log(error.response.data);
            //console.log("response--------"+error.response.status);

            setServerErrors(error.response.data["reason"]);
          });
      }

      if (buttonState === 2) {
        axios
          .put("/cbillTadaLtcs/journeyDetails/" + data.id, data)
          .then((response) => {
            //console.log(response.data+"--"+response.status);
            setMesg(response.data[0]);
            if (response.status === 200) {
              setServerErrors("");
              setKey("page3");
              //console.log(response.data[1].toString());
              setValue("ctg", response.data[1]);
              setDays(response.data[2]);
              //console.log(response.data[3]);
              // setDuplicateAlert(response.data[3]);
              if (response.data[3] != null && response.data[3].length > 1) {
                setAlertList(response.data[3].slice(1));
                setOpenModal(true);
              }

              //handleNoOfDays(()=>(response.data[2]))
              setValue("noOfDays", response.data[2]);
            }
          })
          .catch((error) => {
            //console.log(error.response.data);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            setServerErrors(error.response.data);
          });
      }
      if (buttonState === 3) {
        axios
          .put("/cbillTadaLtcs/claims/" + data.id, data)
          .then((response) => {
            //console.log(response.data);
            setMesg(response.data[0]);
            setExpectedDisAmt(response.data[2]);
            console.log(response.data[2] + "---" + expectedDisAmt);
            if (newDList !== null) {
              let i = 0;
              for (i = 0; i < newDList.length; i++) {
                newDList[i].expectedDis = response.data[2];
              }
            }
            if (response.status === 200) {
              setKey("page4");
              setServerErrors("");
              //setValue('amountPassed',response.data[1]);
            }
          })
          .catch((error) => {
            //console.log(error.response.data);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            setServerErrors(error.response.data);
          });
      }
      if (buttonState === 4 && !disableDis) {
        setDisableDis(true); //handling multiple clicks
        axios
          .put("/cbillTadaLtcs/disallowance/" + data.id, newDList)
          .then((response) => {
            console.log(response.data["reason"]);
            setMesg(response.data["reason"]);
            setServerErrors("");
            console.log(response.status);
            if (response.status === 200) {
              if (btype === "final") {
                setKey("page5");
                setValue("amountPassed", response.data["amountPassed"]);
                setValue("amountDisallowed", response.data["amountDisallowed"]);
              } else {
                setKey("page6");
                setServerErrors("");
                setValue("amountPassed", response.data["amountPassed"]);
                setValue("amountDisallowed", response.data["amountDisallowed"]);
              }
            }
          })
          .catch((error) => {
            console.log(error.response.data["reason"]);
            //setServerErrors('');
            //console.log(error.response);
            // setMesg(error.data['reason']);
            setServerErrors(error.response.data["reason"]);
          });
      }

      if (buttonState === 5) {
        let newData = [...mroData, ...settledMroData];
        data["oList"] = newData;

        axios
          .put("/cbillTadaLtcs/demands/" + data.id, data)
          .then((response) => {
            setServerErrors("");
            setMesg("");
            console.log(response.data[0]);
            console.log(response.data[1]);
            setMesg(response.data[0]);
            setValue("advanceAmount", response.data[1]);
            setValue("amountPassed", response.data[2]);
            setValue("adjustmentAmount", response.data[3]);
            setValue("penalInterest", response.data[4]);
            setValue("mroAmount", response.data[5]);
            if (response.status == 200) {
              setKey("page6");
              window.scrollTo(0, 0);
              setServerErrors("");
            }
          })
          .catch((error) => {
            setServerErrors(error.response.data);
          });
      }

      if (buttonState === 6 && !disablePd) {
        setDisablePd(true);
        axios
          .put("/cbillTadaLtcs/paymentDetails/" + data.id, data)
          .then((response) => {
            //console.log(response.data);
            setMesg(response.data[0]);
            setValue("amountPassed", response.data[1]["amountPassed"]);
            setValue("adjustmentAmount", response.data[1]["adjustmentAmount"]);
            if (response.status == 200) {
              setServerErrors("");
            }
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
        .post("/cbillTadaLtcs/", data)
        .then((response) => {})
        .catch((error) => {
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          setServerErrors(error.response.data);
        });
    }

    //history.push("/cbillTadaLtcs");
  };

  const setAccountNo = (e) => {
    setCdaoNo(e.target.value);
  };
  const viewRankName = () => {
    //console.log("--------" + cdaoNo);
    axios.get("/cbillTadaLtcs/rankname/" + cdaoNo).then((response) => {
      if (response.status === 200) {
        setRankName(response.data);
      }
    });
  };
  const onError = (errors, e) => console.log(errors, e);

  //All foreign keys.
  // XXXXXX Add search fields and adjust the values as necessary
  const parentData = {
    billType: {
      title: "Bill Type",
      url: "billTypes",
      searchList: ["description"], //XXXXXXXXX Add search fields
      fkEntity: "billType",
      preload: false, //XXXXXX Set this to true for small tables like designations
      //field:"dakType",
    },

    employee: {
      title: "Officer",
      url: "employees/all/effective",
      searchList: ["cdaoNo", "checkDigit", "officerName"], //XXXXXXXXX Add search fields
      fkEntity: "employee",
      preload: false, //XXXXXX Set this to true for small tables like designations
    },
    finalAdjustment: {
      title: "Final Adjustment",
      url: "finalAdjustments",
      searchList: ["id"], //XXXXXXXXX Add search fields
      fkEntity: "finalAdjustment",
      preload: false, //XXXXXX Set this to true for small tables like designations
    },
    unit: {
      title: "Unit",
      url: "units",
      searchList: ["id"], //XXXXXXXXX Add search fields
      fkEntity: "unit",
      preload: false, //XXXXXX Set this to true for small tables like designations
    },
    paymentMode: {
      title: "Payment Mode",
      url: "paymentModes",
      searchList: ["id"], //XXXXXXXXX Add search fields
      fkEntity: "paymentMode",
      preload: false, //XXXXXX Set this to true for small tables like designations
    },
    cdr: {
      title: "Cdr",
      url: "cdrs",
      searchList: ["id"], //XXXXXXXXX Add search fields
      fkEntity: "cdr",
      preload: false, //XXXXXX Set this to true for small tables like designations
    },
  };

  const updateButtonState = (e) => {
    //console.log("updating button state " + e);
    setButtonState(e);
  };
  //Callback for child components (Foreign Keys)
  const callback = (childData) => {
    //setEntity(prev => ({ ...prev, [childData.fk]: childData.entity }));

    setValue(childData.fk, childData.entity);
    if (childData.fk === "employee") {
      //console.log("parent callback-----------" + childData.entity.rank.rankName);
      setRankName(childData.entity.rank.rankName);
    }
    if (childData.fk === "codeHead") {
      //console.log("parent callback-----------" + childData.entity.codeHead);
      setValue("codeHd", childData.entity.codeHead);
    }

    //console.log(errors);
    clearErrors(childData.fk);
  };

  const handleRemoveDisallowance = (index) => {
    const list = [...newDList];
    list.splice(index, 1);
    setNewDList(list);
  };

  const handleAddDisallowance = () => {
    setNewDList([
      ...newDList,
      {
        disallowanceId: 0,
        dakidNo: "",
        disallowanceName: "",
        amount: 0,
        itemAmountClaimed: 0,
        amountAdmitted: 0,
        receiptNo: "",
        remarks: "",
        expectedDis: "",
      },
    ]);
  };

  const errorCallback = (err) => {
    //console.log(err);
    setServerErrors(err);
  };

  const handleInputChange = (e) => {
    //console.log(e.target.value);onClick={handleFdChange}/></td>
  };

  const handleDistanceChange = (e) => {
    setDist(e.target.value);
  };

  const ShowRejectionDetail = () => {
    const handleP = (pp) => {
      console.log(pp);
      setPage(pp);
    };

    //pcdao added below method
    const handlePageSize = (pp) => {
      console.log(pp);
      setPageSize(pp);
    };

    const handleOtherRejection = (e, index) => {
      let item = rejectionList[index];
      let val = e.target.value;

      item["otherRejection"] = val;
      console.log(val + "--" + item["otherRejection"] + "--" + index);
      let newData = [...rejectionList];
      newData[index] = item;
      setRejectionList(newData);
      setValue("rejectionDetailList", rejectionList);
    };
    const handleCheckbox = (index) => (e) => {
      let item = rejectionList[index];
      let val = item["select"];
      if (val === "on" || val === true) {
        val = false;
      } else {
        val = true;
      }
      item["select"] = val;
      console.log(item["caption"]);
      if (item["caption"] === "Other" && val === true) {
        setOtherRejSelected(true);
      }
      if (item["caption"] === "Other" && val === false) {
        setOtherRejSelected(false);
      }
      let newData = [...rejectionList];
      newData[index] = item;
      setRejectionList(newData);
      setValue("rejectionDetailList", rejectionList);
    };

    const columns = useMemo(
      () => [
        {
          Header: "Select",
          accessor: "select",
          Cell: ({ row }) => (
            <div>
              <input
                type="checkbox"
                onChange={handleCheckbox(row.index)}
                checked={rejectionList[row.index]["select"]}
              />
            </div>
          ),
        },

        {
          Header: "Reason",
          accessor: "caption",
        },

        {
          Header: "Remarks",
          accessor: "remarks", // Change this
          Cell: ({ row }) => (
            <div>
              <label>{row.original.remarks} </label>
            </div>
          ),
        },
      ],
      [rejectionList, page, setPage]
    );

    return (
      <div className="min-h-full bg-green-100 text-gray-900">
        <main className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">
          <div className=" "></div>
          <div className="-mt-2 max-h-full py-0 ml-0">
            <TablePage
              columns={columns}
              data={rejectionList}
              newpage={page}
              parentCallback={handleP}
              newPageSize={pageSize}
              parentCallbackPageSize={handlePageSize}
              className="table-auto"
            />
          </div>
        </main>
      </div>
    );
  };

  const ShowSettledCdr = () => {
    //console.log(demandData);

    const columns = useMemo(
      () => [
        {
          Header: "Select",
          accessor: "select",
          Cell: ({ row }) => <div></div>,
        },

        {
          Header: "CDAO No",
          accessor: "cdaoNo",
        },

        {
          Header: "Bill Type",
          accessor: "billType",
        },
        {
          Header: "Journey Date",
          accessor: "journeyDate",
        },
        {
          Header: "Station From",
          accessor: "journeyStationFrom",
        },
        {
          Header: "Station To",
          accessor: "journeyStationTo",
        },

        {
          Header: "Amount",
          accessor: "demandAmount",
        },
        {
          Header: "Month",
          accessor: "demandMonth",
        },
        {
          Header: "Movement Order No",
          accessor: "movementOrderNo",
        },
        {
          Header: "Movement Order Date",
          accessor: "movementOrderDate",
        },
        {
          Header: "Remarks",
          accessor: "remarks",
        },
      ],
      [settledList]
    );

    return (
      <div className="h-48 bg-green-100 text-gray-900">
        <main className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">
          <div className=" "></div>
          <div className="-mt-2 max-h-full py-0 ml-0">
            <Table
              columns={columns}
              data={settledList}
              className="table-auto"
            />
          </div>
        </main>
      </div>
    );
  };

  const ShowCdr = () => {
    //console.log(demandData);

    const handleCheckbox = (index) => (e) => {
      //console.log(checkedObj);
      //console.log(index + e.target.value);

      //let key = index;
      let item = demandData[index];
      let val = item["select"];
      if (val === "on" || val === true) {
        val = false;
      } else {
        val = true;
      }

      item["select"] = val;
      let newData = [...demandData];
      newData[index] = item;
      setDemandData(newData);
      setValue("dList", demandData);
    };

    const columns = useMemo(
      () => [
        {
          Header: "Select",
          accessor: "updated",
          Cell: ({ row }) => (
            <div>
              <input
                type="checkbox"
                onChange={handleCheckbox(row.index)}
                checked={demandData[row.index]["select"]}
              />
            </div>
          ),
        },
        {
          Header: "Journey Date",
          accessor: "journeyDate",
        },
        {
          Header: "Amount",
          accessor: "demandAmount",
        },

        {
          Header: "Origin",
          accessor: "demandOrigin",
        },
        {
          Header: "Type of Demand",
          accessor: "cdrNo",
        },
        {
          Header: "Falcon Dak",
          accessor: "dakidNo",
        },
        {
          Header: "Adv Id",
          accessor: "advId",
        },
        {
          Header: "Trans Id",
          accessor: "transId",
        },
        {
          Header: "Bill Type",
          accessor: "billType",
        },

        {
          Header: "Station From",
          accessor: "journeyStationFrom",
        },
        {
          Header: "Station To",
          accessor: "journeyStationTo",
        },

        {
          Header: "Month",
          accessor: "demandMonth",
        },
        {
          Header: "Movement Order No",
          accessor: "movementOrder",
        },
        {
          Header: "Movement Order Date",
          accessor: "movementOrderDate",
        },
        {
          Header: "Remarks",
          accessor: "remarks",
        },
      ],
      [demandData]
    );

    return (
      <div className="min-h-full bg-green-100 text-gray-900">
        <main className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">
          <div className=" "></div>
          <div className="-mt-2 max-h-full py-0 ml-0">
            <Table columns={columns} data={demandData} className="table-auto" />
          </div>
        </main>
      </div>
    );
  };

  const ShowMro = () => {
    console.log(mroData);

    const handleCheckbox = (index) => (e) => {
      //console.log(checkedObj);
      //console.log(index + e.target.value);

      //let key = index;
      let item = mroData[index];
      let val = item["select"];
      if (val === "on" || val === true) {
        val = false;
      } else {
        val = true;
      }

      item["select"] = val;
      let newData = [...mroData];
      newData[index] = item;
      setMroData(newData);
      setValue("oList", mroData);
    };

    const columns = useMemo(
      () => [
        {
          Header: "Select",
          accessor: "updated",
          Cell: ({ row }) => (
            <div>
              <input
                type="checkbox"
                onChange={handleCheckbox(row.index)}
                checked={mroData[row.index]["select"]}
              />
            </div>
          ),
        },

        {
          Header: "CDAO No",
          accessor: "employee.cdaoNo",
        },
        {
          Header: "Min No",
          accessor: "minNo",
        },
        {
          Header: "Amount",
          accessor: "amount",
        },
        {
          Header: "MRO Date",
          accessor: "mroDate",
        },
      ],
      [mroData]
    );

    return (
      <div className="min-h-full bg-green-100 text-gray-900">
        <main className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">
          <div className=" "></div>
          <div className="-mt-2 max-h-full py-0 ml-0">
            <Table columns={columns} data={mroData} className="table-auto" />
          </div>
        </main>
      </div>
    );
  };
  const ShowFamily = () => {
    //console.log(familyData);

    const handleCheckbox = (index) => (e) => {
      //console.log(checkedObj);
      //console.log(index + e.target.value);

      //let key = index;
      let item = familyData[index];
      let val = item["select"];
      if (val === "on" || val === true) {
        val = false;
      } else {
        val = true;
      }

      item["select"] = val;
      let newData = [...familyData];
      newData[index] = item;
      setFamilyData(newData);
      setValue("fdList", familyData);

      //console.log(">>>>>>>>>>>>>>:" + familyData);
    };

    const columns = useMemo(
      () => [
        {
          Header: "Select",
          accessor: "updated",
          Cell: ({ row }) => (
            <div>
              <input
                type="checkbox"
                onChange={handleCheckbox(row.index)}
                checked={familyData[row.index]["select"]}
              />
              &nbsp;&nbsp;{" "}
              {familyData[row.index]["select"] === true ? "Y" : "N"}
            </div>
          ),
        },

        {
          Header: "CDAO No",
          accessor: "cdaoNo",
        },

        {
          Header: "Family Member",
          accessor: "nameOfFamilyMember", // Change this
        },

        {
          Header: "DOB",
          accessor: "dob", // Change this
        },

        {
          Header: "Relation",
          accessor: "relation.relationName", // Change this
        },
      ],
      [familyData]
    );

    return (
      <div className="h-96 bg-green-100 text-gray-900">
        <main className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">
          <div className=" "></div>
          <div className="-mt-2 max-h-full py-0 ml-0">
            <Table columns={columns} data={familyData} className="table-auto" />
          </div>
        </main>
      </div>
    );
  };

  const ShowClaimEntitlementForTada = () => {
    return (
      <div className="h-64 bg-green-100 text-gray-900">
        <main className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">
          {tadaCal.map((x, i) => {
            return (
              <div className="grid grid-cols-2 gap-0">
                <div className="w-100">
                  <label>Entitled Food Charges Per Day</label>
                </div>
                <div className="w-100">
                  <input
                    className="ml10"
                    name="entitledFoodChargesPerDay"
                    readOnly
                    value={x.entitledFoodChargesPerDay}
                  />
                </div>

                <div className="w-100">
                  <label>Total Entitled Food Charges</label>
                </div>
                <div className="w-100">
                  <input
                    className="ml10"
                    name="totalEntitledFoodCharges"
                    readOnly
                    value={x.totalEnitledFoodCharges}
                  />
                </div>

                <div className="w-100">
                  <label>Entitled Accommodation Charges Per Day</label>
                </div>
                <div className="w-100">
                  <input
                    className="ml10"
                    name="entitledAccnChargesPerDay"
                    readOnly
                    value={x.entitledAccnChargesPerDay}
                  />
                </div>
                <div className="w-100">
                  <label>Total Entitled Accommodation Charges</label>
                </div>
                <div className="w-100">
                  <input
                    className="ml10"
                    name="entitledFoodChargesPerDay"
                    readOnly
                    value={x.totalEntitledAccnCharges}
                  />
                </div>
              </div>
            );
          })}
        </main>
      </div>
    );
  };
  const ShowPreviousClaims = () => {
    //console.log(prevData);

    const columns = useMemo(
      () => [
        {
          Header: "Action",
          Cell: ({ row }) => (
            <div>
              <div>
                {row.original.source === "falcon" &&
                  row.original.recordStatus != "R" && (
                    // <Link
                    //   to={"/cbillTadaLtcs/" + row.original.claimId + "/tbillInfo"}
                    // >
                    <button
                      onClick={() => {
                        window.open(
                          `/cbillTadaLtcs/${row.original.claimId}/tbillInfo`,
                          "_blank",
                          "width=1500, height=1000, left=500"
                        );
                      }}
                      className="w-32 m-1 p-0 bg-gray-500 hover:bg-gray-700 "
                    >
                      {" "}
                      TBillInfo{" "}
                    </button>
                    //</Link>
                  )}
              </div>
              <div>
                {row.original.source === "falcon" &&
                  row.original.recordStatus !== "R" && (
                    <button
                      className="w-32 m-1 p-0 bg-red-500 hover:bg-red-700 "
                      onClick={() =>
                        generateIntimationSlip(row.original.claimId)
                      }
                    >
                      {" "}
                      Intimation Slip{" "}
                    </button>
                  )}
              </div>
              <div>
                {row.original.recordStatus === "R" && (
                  <button
                    className="w-32 m-0 p-0 bg-yellow-500 hover:bg-red-700 "
                    onClick={() => tBillRejectionMemo(row.original.claimId)}
                  >
                    {" "}
                    Print Rej Memo{" "}
                  </button>
                )}
              </div>
            </div>
          ),
        },
        {
          Header: "DakId",
          accessor: "dakId",
          Cell: ({ row }) => (
            <div>
              <div>
                <label>{row.original.dakId}</label>
              </div>
              <div>
                <label>
                  Receipt Date: {row.original.claimDate.substring(0, 10)}
                </label>
              </div>

              {row.original.trRule ? (
                <div className="mt-1">
                  <label>TR Rule: {row.original.trRule}</label>
                </div>
              ) : (
                ""
              )}
            </div>
          ),
        },

        {
          Header: "Bill Type",
          accessor: "billType",
          Filter: SelectColumnFilter,
          filter: "billType",
        },

        {
          Header: "AdvId",
          accessor: "advId",
        },
        {
          Header: "Journey Details",
          Cell: ({ row }) => (
            <div>
              <div>
                <label>Station From: {row.original.stationFrom}</label>
              </div>
              <div>
                <label>Station To: {row.original.stationTo}</label>
              </div>
              <div>
                <label>From Date: {row.original.fromDate}</label>
              </div>
              <div>
                <label>To Date: {row.original.toDate}</label>
              </div>
            </div>
          ),
        },
        {
          Header: "Bill Details",
          Cell: ({ row }) => (
            <div>
              <div>
                <label>Amount Claimed: {row.original.amountClaimed}</label>
              </div>
              <div>
                <label>Amount Passed: {row.original.amountPassed}</label>
              </div>
              <div>
                <label>Advance Amount: {row.original.advanceAmount}</label>
              </div>

              {/* <div>
                   <label>Amount Disallowed: {row.original.amountDisallowed}</label>
                 </div> */}
              <div>
                <label>Penal Interest: {row.original.penalInterest}</label>
              </div>
              <div>
                <label>Adjusted Amount: {row.original.adjustmentAmount}</label>
              </div>
              {/* <div>
                   <label>Fare Amount: {row.original.fareAmount}</label>
                 </div>
                 <div>
                   <label>Baggage Amount: {row.original.baggageAmount}</label>
                 </div> */}
            </div>
          ),
        },
      ],
      [previousData]
    );

    return (
      <div className="min-h-full bg-green-100 text-gray-700">
        <main className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">
          <div className=" "></div>
          <div className="-mt-2 max-h-full py-0 ml-0">
            <Table
              columns={columns}
              data={previousData}
              className="table-auto"
            />
          </div>
        </main>
      </div>
    );
  };
  const handleJourneyDateChange = (e) => {
    //console.log("journey date onc hange " + e.target.value);

    let d = e.target.value;
    //console.log(d.substr(0,4)+''+d.substr(5,2)+''+d.substr(8));
    //console.log(d);
    //console.log(d.substr(0,4));
    //console.log(d.substr(5,2));
    //console.log(d.substr(8));
    setJourneyDate(d.substr(0, 4) + "-" + d.substr(5, 2) + "-" + d.substr(8));

    setValue("journeyStartDate", e.target.value);
  };

  const handleDisallowanceDataChange = (e) => {
    setAmountDisallowed(e.target.value);
    setValue("amountDisallowed", e.target.value);
  };

  const handleBlockYearChange = (e) => {
    setBlockYear(e.target.value);
    setValue("blockYear", e.target.value);
  };

  const handleInputMroChange = (e, id) => {
    setValue("oList", mroData);
  };

  const returnToList = () => {
    history.push("/cbillTadaLtcs");
  };

  const updateBaggageAmount = (e) => {
    let qty = e.target.value;

    //console.log("----qty--"+qty+"--"+dist);
    if (qty && dist) {
      axios
        .get(`/cbillTadaLtcs/baggageQty/${qty}/distance/${dist}`)
        .then((response) => {
          //console.log(response.data);

          setValue("baggageAmount", response.data);
          //console.log(entity.baggageAmount);
        });
    }
  };
  const handleBillTypeChange = (e) => {
    //console.log(">>>" + e.target.value+"index "+e.target.index+"--"+e.target.selectedIndex);
    //console.log(billTypeData[e.target.selectedIndex-1].description);
    let t = e.target.value;
    setBillTypeItem(e.target.value);
    let newData = "";
    setValue("billType", billTypeData[e.target.selectedIndex - 1]);
    // setBillTypeName(billTypeData[e.target.selectedIndex-1].description)
    //console.log(billTypeItem+"--"+!billTypeItem);

    if (t) {
      if (t.toLowerCase().includes("temp")) {
        //console.log(t);
        newData = "temp";
      } else if (t.toLowerCase().includes("perm")) {
        newData = "perm";
      } else if (t.toLowerCase().includes("ltc")) {
        newData = "ltc";
      }
    }

    setBillTypeName(newData);

    //console.log("bill type "+billTypeName+"--"+newData);
  };

  const handleGroupChange = (e) => {
    //console.log(">>>>>"+e.target.selectedIndex);
    setCd(e.target.value);
    setValue("codeHd", e.target.value);
  };
  const handleRuleChange = (e) => {
    //console.log(">>>>>"+e.target.label);
    //setCd(e.target.value);
    setTrItem(e.target.value);
    setValue("taRule", e.target.value);
  };

  const handleInputChangeDList = (e, index) => {
    //console.log(e.target);
    //console.log(e.target.value);
    const { name, value } = e.target;
    const list = [...newDList];
    list[index][name] = value;
    if (list[index].itemAmountClaimed && list[index].amountAdmitted)
      list[index].amount =
        list[index].itemAmountClaimed - list[index].amountAdmitted;

    console.log(expectedDisAmt);
    list[index].expectedDis = expectedDisAmt;

    setNewDList(list);
  };
  const handleDisListChange = (e) => {
    setDisName(disCodeList[e.target.selectedIndex - 1]);
  };
  const handleInputLtcChange = (e) => {
    //console.log(e.target.value);
    //console.log(entity.typeOfLtc);
    //console.log(">>>>>>>>-Type of LTC>>>>:"+ e.target.value);
    //setTypeOfLtc(e.target.value);
    setValue("typeOfLtc", e.target.value);
    //	setValue('dakType', dakTypeData[e.target.selectedIndex])
  };

  const handleInputModeJourneyChange = (e) => {
    //console.log(e.target.value);
    setValue("modeOfJourney", e.target.value);
    //	setValue('dakType', dakTypeData[e.target.selectedIndex])
  };

  const handleFoodCharges = (e) => {
    //console.log(e.target.value+"--");

    let entitledFc = 0;
    let i = 0;
    for (i = 0; i < foodChargesList.length; i++) {
      //console.log(foodChargesList[i].pl+"--"+foodChargesList[i].amt);
      if (foodChargesList[i].pl === payLevel) {
        entitledFc = foodChargesList[i].amt;
        break;
      }
    }

    //let key = index;
    let item = tadaCal[0];
    let noOfDays = item.days;
    //console.log(noOfDays);
    item.entitledFoodChargesPerDay = entitledFc;
    item.totalEnitledFoodCharges = entitledFc * noOfDays;
    let newData = [...tadaCal];
    newData[0] = item;
    setTadaCal(newData);
  };

  const handleAccnCharges = (e) => {
    //console.log(e.target.value);

    let entitledAc = 0;
    let i = 0;
    for (i = 0; i < accnChargesList.length; i++) {
      //console.log(foodChargesList[i].pl+"--"+foodChargesList[i].amt);
      if (accnChargesList[i].pl === payLevel) {
        entitledAc = accnChargesList[i].amt;
        break;
      }
    }

    //let key = index;
    let item = tadaCal[0];
    let noOfDays = item.days;
    //console.log(noOfDays);
    item.entitledAccnChargesPerDay = entitledAc;
    item.totalEntitledAccnCharges = entitledAc * noOfDays;
    let newData = [...tadaCal];
    newData[0] = item;
    setTadaCal(newData);
  };
  const handleNoOfDays = (e) => {
    console.log(e);
    let d = e;

    let item = tadaCal[0];

    item.days = d;
    let newData = [...tadaCal];
    newData[0] = item;
    setTadaCal(newData);
  };
  const handlePiCheckbox = (e) => {
    setValue("piWaived", e.target.checked);
    setPiwValue(e.target.checked);
  };

  // pcdao 16112022 dakType change
  const handleDakTypeChange = async (e) => {
    let dakType = e.target.value;
    setLoading(true);

    await axios
      .put(`/cbillTadaLtcs/updateDakType/${id}?dakTypeDescription=${dakType}`)
      .then((response) => {
        if (response.data) window.location.reload();
      })
      .catch((error) => {
        setServerErrors(error.response.data["reason"]);
      });
  };

  return (
    //<div className="max-w-2xl mx-auto ">
    //<div className="w-full w-4/4  mx-auto " >

    <div className="min-h-full bg-gray-100 text-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <form
          className="pb-2 shadow-xl"
          onSubmit={handleSubmit(onSubmit, onError)}
          style={openModal ? { pointerEvents: "none", opacity: "0.2" } : {}}
        >
          <h1>{id === "new" ? "Add" : "Edit"} Cbill Tada Ltc </h1>
          <div className="text-red-500">{serverErrors}</div>
          <div className="text-blue-500">{mesg}</div>
          <Tabs
            id="CbillTadaLtcEdit"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="page1" title="Emp" className="h-300">
              <div className="grid grid-cols-2 gap-0">
                <div>
                  <label>DakId</label> {dakId} : {monthEnding}
                </div>

                {/* <div>
                   <label>DakType</label> {dakTypeDesc}
                 </div> */}

                {/*pcdao 16112022 dakType change */}

                {["TADA Final Claim", "LTC Final Claim"].includes(
                  dakTypeDesc
                ) && !getValues("advId") ? (
                  <div>
                    <b>DakType</b>
                    <select
                      className="form-control py-0"
                      disabled={loading}
                      defaultValue={dakTypeDesc}
                      onChange={handleDakTypeChange}
                    >
                      <option>TADA Final Claim</option>
                      <option>LTC Final Claim</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label>DakType</label> {dakTypeDesc}
                  </div>
                )}

                <div>
                  <LiveSearch
                    name="employee"
                    onChange={handleInputChange}
                    parentData={parentData.employee}
                    parentCallback={callback}
                    fkEntity={entity.employee}
                    errCallback={errorCallback}
                    readOnly={true}
                  />
                  <div className="text-red-500 ">
                    {errors.employee?.message}
                  </div>
                </div>

                <div>
                  <label>Rank/Pay</label>
                  {rankName} : Pay {basicPay} : {payLevel}
                </div>

                <div>
                  <b>Bill Type</b>
                  <select
                    className="form-control py-0"
                    disabled={loading}
                    value={billTypeItem}
                    onChange={handleBillTypeChange}
                  >
                    <option key="default" value="" label="--select--" />
                    {billTypeItems.map((item, index) => (
                      <option key={index} value={item.value}>
                        {" "}
                        {item.label}{" "}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>Amount Claimed</label>
                  <input
                    type="text"
                    name="amountClaimed"
                    {...register("amountClaimed")}
                    className="form-control py-0"
                  />
                  <div className="text-red-500">
                    {errors.amountClaimed?.message}
                  </div>
                </div>

                <div>
                  <label>Journey Start Date</label>
                  <input
                    type="date"
                    name="journeyStartDate"
                    {...register("journeyStartDate")}
                    className="form-control py-0"
                    onChange={handleJourneyDateChange}
                  />
                  <div className="text-red-500">
                    {errors.journeyStartDate?.message}
                  </div>
                </div>

                {billTypeName === "ltc" && (
                  <>
                    <div>
                      <label> Type of LTC</label>
                      <select
                        name="typeOfLtc"
                        className="form-control py-0"
                        onChange={handleInputLtcChange}
                        {...register("typeOfLtc")}
                      >
                        <option value="select">--Select--</option>
                        <option key="1" value="AI">
                          All India LTC
                        </option>
                        <option key="2" value="HT">
                          Home Town LTC
                        </option>
                        <option key="3" value="NE">
                          North Eastern LTC
                        </option>
                        <option key="4" value="JK">
                          Jammu and Kashmir LTC
                        </option>
                        <option key="5" value="AN">
                          Andaman and Nicobar LTC
                        </option>
                      </select>
                    </div>

                    <div>
                      <label>Calendar Year(LTC)</label>
                      <input
                        type="text"
                        name="calendarYear"
                        {...register("calendarYear")}
                        className="form-control py-0"
                      />
                      <div className="text-red-500">
                        {errors.calendarYear?.message}
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <b>Code Head</b>
                  <select
                    className="form-control py-0"
                    disabled={loading}
                    value={cd}
                    onChange={handleGroupChange}
                  >
                    <option key="default" value="" label="--select--" />
                    {cdList.map((item, index) => (
                      <option key={index} value={item.value}>
                        {" "}
                        {item.label}{" "}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <b>TR Rule</b>
                  <select
                    className="form-control py-0"
                    disabled={loading}
                    value={trItem}
                    onChange={handleRuleChange}
                  >
                    <option key="default" value="" label="--select--" />
                    {trList.map((item, index) => (
                      <option key={index} value={item.value}>
                        {" "}
                        {item.label}{" "}
                      </option>
                    ))}
                  </select>
                </div>
                {otherRejSelected && (
                  <div>
                    <label>Other Rejection Reason</label>
                    <textarea
                      type="text"
                      name="otherRej"
                      {...register("otherRej")}
                      className="form-control py-0"
                    />
                    <div className="text-red-500">
                      {errors.otherRej?.message}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div>
                  <label>Reason</label> {rollBackReason}
                </div>
              </div>
              {(buttonState === 100 || status === "R") && (
                <>
                  <div>
                    <ShowRejectionDetail />
                  </div>
                </>
              )}
              <div className="grid grid-cols-3 gap-0">
                <div className="px-3 ...">
                  <button
                    type="submit"
                    name="submit1"
                    onClick={() => updateButtonState(1)}
                  >
                    Save Officer Details
                  </button>
                </div>
                <div className="px-3 ...">
                  <button
                    type="button"
                    name="return"
                    onClick={() => updateButtonState(100)}
                  >
                    Return
                  </button>
                </div>
                <div className="px-3 ...">
                  <button type="button" onClick={returnToList}>
                    Cancel
                  </button>
                </div>
              </div>
            </Tab>

            <Tab
              eventKey="page2"
              disabled={true}
              title="Journey"
              className="h-120"
            >
              <div className="grid grid-cols-2 gap-4">
                {billTypeName !== "ltc" && !supplementary && (
                  <>
                    <div>
                      <label>Move Sanction No</label>
                      <input
                        type="text"
                        name="movementOrderNo"
                        {...register("movementOrderNo")}
                        className="form-control py-0"
                      />
                      <div className="text-red-500">
                        {errors.movementOrderNo?.message}
                      </div>
                    </div>
                    <div>
                      <label>Move Sanction Date</label>
                      <input
                        type="date"
                        name="movementOrderDate"
                        {...register("movementOrderDate")}
                        className="form-control py-0"
                      />
                      <div className="text-red-500">
                        {errors.movementOrderDate?.message}
                      </div>
                    </div>
                  </>
                )}
                {billTypeName !== "ltc" && supplementary && (
                  <>
                    <div>
                      <label>Move Sanction No</label>
                      <input
                        type="text"
                        name="movementOrderNo"
                        {...register("movementOrderNo")}
                        className="form-control py-0"
                        readOnly
                      />
                      <div className="text-red-500">
                        {errors.movementOrderNo?.message}
                      </div>
                    </div>
                    <div>
                      <label>Move Sanction Date</label>
                      <input
                        type="date"
                        name="movementOrderDate"
                        {...register("movementOrderDate")}
                        className="form-control py-0"
                        readOnly
                      />
                      <div className="text-red-500">
                        {errors.movementOrderDate?.message}
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label>Submission Date</label>
                  <input
                    type="date"
                    name="claimDate"
                    {...register("claimDate")}
                    className="form-control py-0"
                  />
                  <div className="text-red-500">
                    {errors.claimDate?.message}
                  </div>
                </div>

                <div>
                  <label> Mode of Journey</label>
                  <select
                    name="modeOfJourney"
                    className="form-control py-0"
                    onChange={handleInputModeJourneyChange}
                    {...register("modeOfJourney")}
                  >
                    <option value="select">--Select--</option>
                    <option key="1" value="air">
                      Air
                    </option>
                    <option key="2" value="train">
                      Train
                    </option>
                    <option key="3" value="bus_car">
                      Road
                    </option>
                    <option key="4" value="streamer">
                      Streamer
                    </option>
                    <option key="5" value="multiple">
                      Multiple
                    </option>
                  </select>
                </div>

                {supplementary && (
                  <>
                    <div>
                      <label>Journey Station From</label>
                      <input
                        type="text"
                        name="journeyStationFrom"
                        {...register("journeyStationFrom")}
                        className="form-control py-0"
                        readOnly
                      />
                    </div>
                    <div>
                      <label>Journey Station To</label>
                      <input
                        type="text"
                        name="journeyStationTo"
                        {...register("journeyStationTo")}
                        className="form-control py-0"
                        readOnly
                      />
                    </div>
                    <div>
                      <label>Journey Start Date</label>
                      <input
                        type="date"
                        name="journeyStartDate"
                        {...register("journeyStartDate")}
                        className="form-control py-0"
                        readOnly
                      />
                      <div className="text-red-500">
                        {errors.journeyStartDate?.message}
                      </div>
                    </div>

                    <div>
                      <label>Journey End Date</label>
                      <input
                        type="date"
                        name="journeyEndDate"
                        {...register("journeyEndDate")}
                        className="form-control py-0"
                        readOnly
                      />
                      <div className="text-red-500">
                        {errors.journeyEndDate?.message}
                      </div>
                    </div>
                  </>
                )}
                {!supplementary && (
                  <>
                    <div>
                      <label>Journey Station From</label>
                      <input
                        type="text"
                        name="journeyStationFrom"
                        {...register("journeyStationFrom")}
                        className="form-control py-0"
                      />
                      <div className="text-red-500">
                        {errors.journeyStationFrom?.message}
                      </div>
                    </div>
                    <div>
                      <label>Journey Station To</label>
                      <input
                        type="text"
                        name="journeyStationTo"
                        {...register("journeyStationTo")}
                        className="form-control py-0"
                      />
                      <div className="text-red-500">
                        {errors.journeyStationTo?.message}
                      </div>
                    </div>
                    <div>
                      <label>Journey Start Date</label>
                      <input
                        type="date"
                        name="journeyStartDate"
                        {...register("journeyStartDate")}
                        className="form-control py-0"
                      />
                      <div className="text-red-500">
                        {errors.journeyStartDate?.message}
                      </div>
                    </div>

                    <div>
                      <label>Journey End Date</label>
                      <input
                        type="date"
                        name="journeyEndDate"
                        {...register("journeyEndDate")}
                        className="form-control py-0"
                      />
                      <div className="text-red-500">
                        {errors.journeyEndDate?.message}
                      </div>
                    </div>
                  </>
                )}

                {billTypeName === "ltc" && (
                  <>
                    <div>
                      <label>Block Year(LTC)</label>
                      <input
                        type="text"
                        name="blockYear"
                        {...register("blockYear")}
                        className="form-control py-0"
                      />
                      <div className="text-red-500">
                        {errors.blockYear?.message}
                      </div>
                    </div>
                  </>
                )}
                <div>
                  <label>Record Status</label>
                  <input
                    type="text"
                    name="recordStatus"
                    {...register("recordStatus")}
                    readOnly
                    className="form-control py-0"
                  />
                  <div className="text-red-500">
                    {errors.recordStatus?.message}
                  </div>
                </div>
              </div>

              {billTypeName === "ltc" && (
                <>
                  <div>
                    <ShowFamily />
                  </div>
                </>
              )}
              <div className="grid grid-cols-2 gap-0">
                <div className="px-3 ...">
                  {status !== "R" && (
                    <button
                      type="submit"
                      name="submit2"
                      onClick={() => updateButtonState(2)}
                    >
                      Save Journey Details
                    </button>
                  )}
                </div>

                <div className="px-3 ...">
                  <button type="button" onClick={returnToList}>
                    Cancel
                  </button>
                </div>
              </div>
            </Tab>

            <Tab
              eventKey="page3"
              disabled={true}
              title="Claim"
              className="h-120"
            >
              {alertList && alertList.length > 0 && (
                <div className="text-red-500">
                  {alertList.map((item, index) => (
                    <label> {item} </label>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label>Month Ending</label>
                  {monthEnding}
                </div>

                <div>
                  <label>DakId</label> {dakId}
                </div>

                <div>
                  <label>Fare</label>
                  <input
                    type="text"
                    name="totalFare"
                    {...register("totalFare")}
                    className="form-control py-0"
                  />
                  <div className="text-red-500">
                    {errors.totalFare?.message}
                  </div>
                </div>
                {billTypeName === "temp" && (
                  <>
                    <div>
                      <label>Number of TD Days</label>
                      <input
                        type="text"
                        name="noOfDays"
                        {...register("noOfDays")}
                        className="form-control py-0"
                        readOnly
                      />
                      <div className="text-red-500">
                        {errors.noOfDays?.message}
                      </div>
                    </div>

                    <div>
                      <label>Total Food Charges</label>
                      <input
                        type="text"
                        name="foodCharges"
                        {...register("foodCharges")}
                        className="form-control py-0"
                        onChange={handleFoodCharges}
                      />

                      <div className="text-red-500">
                        {errors.foodCharges?.message}
                      </div>
                    </div>

                    <div>
                      <label>Total Lodging Charges</label>
                      <input
                        type="text"
                        name="lodgingCharges"
                        {...register("lodgingCharges")}
                        className="form-control py-0"
                        onChange={handleAccnCharges}
                      />
                      <div className="text-red-500">
                        {errors.lodgingCharges?.message}
                      </div>
                    </div>
                    <div>
                      <label>RMA</label>
                      <input
                        type="text"
                        name="rma"
                        {...register("rma")}
                        className="form-control py-0"
                        onChange={handleAccnCharges}
                      />
                      <div className="text-red-500">
                        {errors.lodgingCharges?.message}
                      </div>
                    </div>
                  </>
                )}
                {(billTypeName === "perm" || billTypeName === "temp") && (
                  <>
                    <div>
                      <label>Journey DA</label>
                      <input
                        type="text"
                        name="journeyDa"
                        {...register("journeyDa")}
                        className="form-control py-0"
                      />

                      <div className="text-red-500">
                        {errors.journeyDa?.message}
                      </div>
                    </div>
                  </>
                )}
                {billTypeName === "perm" && (
                  <>
                    <div>
                      <label>Distance (in Kms)</label>
                      <input
                        type="text"
                        name="distance"
                        {...register("distance")}
                        onChange={(e) => handleDistanceChange(e)}
                        className="form-control py-0"
                      />
                      <div className="text-red-500">
                        {errors.distance?.message}
                      </div>
                    </div>

                    <div>
                      <label>Number of Travelling Members</label>
                      <input
                        type="text"
                        name="noOfMembers"
                        {...register("noOfMembers")}
                        className="form-control py-0"
                      />
                      <div className="text-red-500">
                        {errors.noOfMembers?.message}
                      </div>
                    </div>

                    <div>
                      <label>CTG </label>
                      <input
                        type="text"
                        name="ctg"
                        {...register("ctg")}
                        className="form-control py-0"
                      />
                      <div className="text-red-500">{errors.ctg?.message}</div>
                    </div>

                    <div>
                      <label>Baggage Quantity (in Kgs)</label>
                      <input
                        type="text"
                        name="baggageQuantity"
                        {...register("baggageQuantity")}
                        onChange={(e) => updateBaggageAmount(e)}
                        className="form-control py-0"
                      />
                      <div className="text-red-500">
                        {errors.baggageQuantity?.message}
                      </div>
                    </div>
                    <div>
                      <label>Baggage Amount</label>
                      <input
                        type="text"
                        name="baggageAmount"
                        {...register("baggageAmount")}
                        className="form-control py-0"
                      />
                      <div className="text-red-500">
                        {errors.baggageAmount?.message}
                      </div>
                    </div>

                    <div>
                      <label>Conveyance Type</label>
                      <input
                        type="text"
                        name="conveyanceType"
                        {...register("conveyanceType")}
                        className="form-control py-0"
                      />
                      <div className="text-red-500">
                        {errors.conveyanceType?.message}
                      </div>
                    </div>

                    <div>
                      <label>Conveyance Amount</label>
                      <input
                        type="text"
                        name="conveyanceAmount"
                        {...register("conveyanceAmount")}
                        className="form-control py-0"
                      />
                      <div className="text-red-500">
                        {errors.conveyanceAmount?.message}
                      </div>
                    </div>
                  </>
                )}
              </div>
              {console.log(billTypeName)}
              {billTypeName === "temp" && <ShowClaimEntitlementForTada />}
              <div className="grid grid-cols-2 gap-0">
                <div className="px-3 ...">
                  {status !== "R" && (
                    <button
                      type="submit"
                      name="submit3"
                      onClick={() => updateButtonState(3)}
                    >
                      Save Claim Details
                    </button>
                  )}
                </div>

                <div className="px-3 ...">
                  <button type="button" onClick={returnToList}>
                    Cancel
                  </button>
                </div>
              </div>
            </Tab>

            <Tab
              eventKey="page4"
              disabled={true}
              title="Disallw"
              className="h-120"
            >
              <div className="container">
                <h3 className="p-3 text-center">
                  Disallowance for Dak Id {dakId}
                </h3>
                {newDList.map((x, i) => {
                  return (
                    <div className="container">
                      <select
                        className="form-control py-0"
                        disabled={loading}
                        value={x.disallowanceId}
                        name="disallowanceId"
                        onChange={(e) => handleInputChangeDList(e, i)}
                      >
                        <option key={0} value={0}>
                          ---select---
                        </option>
                        {disCodeList.map((item, index) => (
                          <option key={index} value={item.id}>
                            {" "}
                            {item.disallowanceName}{" "}
                          </option>
                        ))}
                      </select>
                      <div className="flex flex-wrap content-start ...">
                        <div className="w-100">
                          <label>Receipt No</label>
                        </div>
                        <div className="w-100">
                          <input
                            className="ml10"
                            name="receiptNo"
                            placeholder="receipt or document no"
                            value={x.receiptNo}
                            onChange={(e) => handleInputChangeDList(e, i)}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap content-start ...">
                        <div className="w-100">
                          <label>Amt Claimed </label>
                        </div>
                        <div>
                          <input
                            className="ml10"
                            name="itemAmountClaimed"
                            placeholder="amount claimed"
                            value={x.itemAmountClaimed}
                            onChange={(e) => handleInputChangeDList(e, i)}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap content-start ...">
                        <div className="w-100">
                          <label>Amt Admitted </label>
                        </div>
                        <div>
                          <input
                            className="ml10"
                            name="amountAdmitted"
                            value={x.amountAdmitted}
                            placeholder="amount admitted"
                            onChange={(e) => handleInputChangeDList(e, i)}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap content-start ...">
                        <div className="w-100">
                          <label>Amt Disallowed </label>
                        </div>
                        <div>
                          <input
                            className="ml10"
                            name="amount"
                            value={x.amount}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap content-start ...">
                        <div className="w-100">
                          <label>Remarks</label>
                        </div>
                        <div>
                          <textarea
                            type="text"
                            name="remarks"
                            value={x.remarks}
                            onChange={(e) => handleInputChangeDList(e, i)}
                            placeholder="remarks"
                            className="form-control py-0"
                          />
                        </div>
                      </div>
                      <div className=" w-16 m-0 p-0 flex flex-wrap content-start ...">
                        {newDList.length !== 1 && (
                          <button
                            className=" w-16 m-0 p-0 "
                            onClick={() => handleRemoveDisallowance(i)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div>
                        {newDList.length - 1 === i && (
                          <button
                            className=" w-16 m-0 p-0 "
                            onClick={handleAddDisallowance}
                          >
                            Add
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-2 gap-0">
                <div className="px-3 ...">
                  {status !== "R" && (
                    <button
                      type="submit"
                      name="submit4"
                      onClick={() => updateButtonState(4)}
                    >
                      Update Disallowance
                    </button>
                  )}
                </div>

                <div className="px-3 ...">
                  <button type="button" onClick={returnToList}>
                    Cancel
                  </button>
                </div>
              </div>
            </Tab>
            {btype === "final" && (
              <Tab
                eventKey="page5"
                disabled={true}
                title="Demands"
                className="h-120"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label>DakId</label> {dakId}
                  </div>

                  <div>
                    <label>Record Status</label>
                    <input
                      type="text"
                      name="recordStatus"
                      {...register("recordStatus")}
                      readOnly
                      className="form-control py-0"
                    />
                    <div className="text-red-500">
                      {errors.recordStatus?.message}
                    </div>
                  </div>
                </div>
                {settledList && (
                  <>
                    <div>
                      <h3 className="p-2  text-xl font-bold">
                        Demand Settled in this Bill
                      </h3>

                      <table className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th>Dak Id</th>
                            <th>CDR No</th>
                            <th>Journey Date</th>
                            <th>Demand Date</th>
                            <th>Amount</th>
                            <th>Station From</th>
                            <th>Station To</th>
                          </tr>
                          {settledList &&
                            settledList.map((tf) => (
                              <tr key={tf.dakidNo}>
                                <td>{tf.dakidNo}</td>
                                <td>{tf.cdrNo}</td>
                                <td>{tf.journeyDate}</td>
                                <td>{tf.demandDateStr}</td>
                                <td>{tf.demandAmount}</td>
                                <td>{tf.journeyStationFrom}</td>
                                <td>{tf.journeyStationTo}</td>
                              </tr>
                            ))}
                        </thead>

                        <tbody>
                          {settledList.length === 0 && (
                            <tr>
                              <td colspan="4" align="center">
                                No advances settled in this claim{" "}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
                {/*  {!supplementary && ( */}
                <>
                  <div>
                    <h3 className="p-3  text-xl font-bold">Pending Demand</h3>

                    <ShowCdr />
                  </div>

                  <div>
                    <h3 className="p-2  text-xl font-bold">
                      MRO Settled in this Bill
                    </h3>

                    <table className="table table-striped table-bordered">
                      <thead>
                        <tr>
                          <th>Dak Id</th>
                          <th>Min No</th>
                          <th>Amount</th>
                          <th>MRO Date</th>
                        </tr>
                        {settledMroData &&
                          settledMroData.map((tf) => (
                            <tr key={tf.dak.dakidNo}>
                              <td>{tf.dak.dakidNo}</td>

                              <td>{tf.minNo}</td>
                              <td>{tf.amount}</td>

                              <td>{tf.mroDate}</td>
                            </tr>
                          ))}
                      </thead>

                      <tbody>
                        {settledMroData.length === 0 && (
                          <tr>
                            <td colspan="4" align="center">
                              No MRO settled in this claim{" "}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <h3 className="p-3  text-xl font-bold">MRO Pending</h3>

                    <ShowMro />
                  </div>
                </>
                {/* )} */}
                <div className="grid grid-cols-2 gap-0">
                  <div className="px-3 ...">
                    {status !== "R" && (
                      <button
                        type="submit"
                        name="submit5"
                        onClick={() => updateButtonState(5)}
                      >
                        Update DemandRegister/MRO
                      </button>
                    )}
                  </div>

                  <div className="px-3 ...">
                    <button type="button" onClick={returnToList}>
                      Cancel
                    </button>
                  </div>
                </div>
              </Tab>
            )}
            <Tab
              eventKey="page6"
              disabled={true}
              title="Payment"
              className="h-120"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label>Month Ending</label>
                  {monthEnding}
                </div>

                <div>
                  <label>DakId</label> {dakId}
                </div>

                <div>
                  <label>Bank Details</label>
                  {account},{ifsc}
                </div>

                <div>
                  <label>Amount Claimed</label>
                  <input
                    type="text"
                    name="amtClaimed"
                    value={amtClaimed}
                    readOnly
                    className="form-control py-0"
                  />
                  <div className="text-red-500">
                    {errors.amountClaimed?.message}
                  </div>
                </div>

                <div>
                  <label>Amount Disallowed</label>
                  <input
                    type="text"
                    name="amountDisallowed"
                    {...register("amountDisallowed")}
                    readOnly
                    className="form-control py-0"
                    onChange={handleDisallowanceDataChange}
                  />
                  <div className="text-red-500">
                    {errors.amountDisallowed?.message}
                  </div>
                </div>

                {btype === "final" && (
                  <>
                    <div>
                      <label>MRO Amount</label>
                      <input
                        type="text"
                        name="mroAmount"
                        {...register("mroAmount")}
                        readOnly
                        className="form-control py-0"
                      />
                      <div className="text-red-500">
                        {errors.mroAmount?.message}
                      </div>
                    </div>

                    <div>
                      <label>Advance Amount</label>
                      <input
                        type="text"
                        name="advanceAmount"
                        {...register("advanceAmount")}
                        readOnly
                        className="form-control py-0"
                      />
                      <div className="text-red-500">
                        {errors.advanceAmount?.message}
                      </div>
                    </div>
                    <div>
                      <label>Penal Interest</label>
                      <input
                        type="text"
                        name="penalInterest"
                        {...register("penalInterest")}
                        readOnly
                        className="form-control py-0"
                      />
                      <div className="text-red-500">
                        {errors.penalInterest?.message}
                      </div>
                    </div>
                    <div>
                      <label>Adjustment Amount</label>
                      <input
                        type="text"
                        name="adjustmentAmount"
                        {...register("adjustmentAmount")}
                        readOnly
                        className="form-control py-0"
                      />
                      <div className="text-red-500">
                        {errors.adjustmentAmount?.message}
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label>Amount Passed</label>
                  <input
                    type="text"
                    name="amountPassed"
                    {...register("amountPassed")}
                    readOnly
                    className="form-control py-0"
                  />
                  <div className="text-red-500">
                    {errors.amountPassed?.message}
                  </div>
                </div>

                <div>
                  <label>Record Status</label>
                  <input
                    type="text"
                    name="recordStatus"
                    {...register("recordStatus")}
                    readOnly
                    className="form-control py-0"
                  />
                  <div className="text-red-500">
                    {errors.recordStatus?.message}
                  </div>
                </div>

                <div>
                  <label>Penal Int Waived</label>
                  <input
                    type="checkbox"
                    onChange={handlePiCheckbox}
                    checked={piwValue}
                  />
                  <textarea
                    type="text"
                    name="piWaiverRemarks"
                    {...register("piWaiverRemarks")}
                    className="form-control py-0"
                  />
                  <div className="text-red-500">
                    {errors.piWaiverRemarks?.message}
                  </div>
                </div>
              </div>
              <div>
                <label>Remarks, if any</label>

                <input
                  type="checkbox"
                  {...register("uploadRemarksFlag")}
                ></input>
                <label className="inline ml-1">Upload Remarks to Website</label>
                <textarea
                  type="text"
                  name="remarks"
                  {...register("remarks")}
                  className="form-control py-0"
                />
                <div className="text-red-500">{errors.remarks?.message}</div>
              </div>
              <div className="grid grid-cols-2 gap-0">
                <div className="px-3 ...">
                  {status !== "R" && (
                    <button
                      type="submit"
                      name="submit6"
                      onClick={() => updateButtonState(6)}
                    >
                      Generate PM/CS
                    </button>
                  )}
                </div>

                <div className="px-3 ...">
                  <button type="button" onClick={returnToList}>
                    Done
                  </button>
                </div>
              </div>
            </Tab>

            <Tab eventKey="page8" title="Help" className="h-120">
              <div className="grid grid-cols-1 gap-4">
                <ul>
                  1.Tada and LTC advances are processed in TAPC section.
                  TADA/LTC Adjustment/Final claims are processed in Twing.
                </ul>
                <ul>
                  2.Three tier approval hirearchy method adopted for processing
                  of the claims.
                </ul>
                <ul>
                  3.Based on predefined task marking Dak ids are getting
                  displayed in the logeed in User screen.
                </ul>
                <ul>
                  4.Provision exists to create family details for processing of
                  LTC claims.
                </ul>
                <ul>
                  5.Based on Bill Type Selection, related fields and tabs will
                  appear.
                </ul>
                <ul>
                  6.If the journey Start date matches with advance claim journey
                  start date,then the data fed at the time of processing Advance
                  claim gets fetched by the system automatically duly linking
                  oustanding demand if any. Otherwise all the oustanding demands
                  of the Officer gets displayed.
                </ul>

                <ul>
                  7.Data received through mail and imported into DB will be auto
                  filled in respective columns.{" "}
                </ul>
                <ul>
                  8.If the amount claimed, is more than the entitled amount,
                  then the difference between the claimed amount and entitled
                  amount has to be fed in disallowance tab by selecting
                  appropriate discription.
                </ul>
                <ul>
                  9.If the claimed amount is less than the entitled amount,
                  system will restrict the amount passed/adjusted amount to the
                  claimed amount.
                </ul>
                <ul>
                  10.In the Claims tab, feed the correct data as per nature of
                  claim, system will arrive at the entitled amount and displayed
                  in the screen.
                </ul>
                <ul>
                  11. Item wise disallowance details are captured with specific
                  remarks to communicate back to the Concerned Officer.{" "}
                </ul>
                <ul>
                  12. New Demand gets created automatically If the final
                  adjustment claim admmitted in audit and resulted into minus
                  claim. In such cases, PM CS will not be cretaed.
                </ul>
                <ul>
                  13.All the Outstanding Demands against the Officer gets
                  displayed for linking appropriate one.
                </ul>
                <ul>
                  14.Claim/Bill wise PM CS gets prepared. On Approval of the
                  claim Section/task user will prepare DP sheet from Utility DP
                  Shhet Generation activity.
                </ul>
                <ul>
                  15.D section will prepare consolidate CMP batch file by
                  clubbing DP sheets as per the practice and release the payment
                  through SBI CMP.
                </ul>
                <ul>
                  16.Previous Claims: List of claims proceesed against this
                  officer gets displayed for reference.
                </ul>
                <ul>
                  17.Return: Claim can be returned duly selecting the
                  appropriate audit rejections from the list displayed. All the
                  rejected claims needs to be submitted by AAO for final
                  approval by SAO/AO.
                </ul>
                <ul>
                  18.Print Return Memo: Provision exits to print Return Memo
                  before duly printing the date of approval by AO. This memo can
                  be generated subssequent to final approval by AO from
                  processed bills list.
                </ul>
                <ul>
                  19.Processed Claims: To search the processed claim of an
                  officer first click on Processed button to fetch the Processed
                  bills list and then enter the specific Officer No to fetch the
                  records of that Officer only.
                </ul>
              </div>
            </Tab>
            <div className="px-4 ...">
              <button type="submit">Save</button>
            </div>
          </Tabs>
        </form>
      </div>

      {/* pcdao 29092022 for ndc popup message */}
      <div className="flex flex-col justify-center items-center ">
        {openModal && (
          <Modal
            setOpenModal={setOpenModal}
            heading="Claim / Advance Related Additional Information"
          >
            {alertList && alertList.length > 0 && (
              <div className="text-black ">
                <ul className="list-disc">
                  {alertList.map((item, index) => (
                    <li className="text-base font-semibold p-0.5"> {item} </li>
                  ))}
                </ul>
              </div>
            )}
          </Modal>
        )}
      </div>
      {/* ------------ */}

      <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-4 ml-2 mt-5">
        <div className="h-120 bg-green-100 text-gray-700">
          <label className="text-2xl pt-3 ml-5">
            Previous Claims -- {rankName} {officerName} / {cdaoNo}
          </label>
        </div>
        <ShowPreviousClaims />
      </div>
    </div>
  );
};

export default withRouter(CbillTadaLtcEdit);
