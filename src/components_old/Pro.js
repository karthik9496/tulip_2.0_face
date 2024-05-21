/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By :
 */

import { useState, useEffect, useMemo } from "react";
import Table, { SelectColumnFilter } from "../utils/Table"; //
import { withRouter, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Link } from "react-router-dom";
import { BasicLoadingIcon } from "../utils/Icons";

const Pro = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm({
    //resolver: yupResolver(schema)
  });

  let history = useHistory();
  const [serverErrors, setServerErrors] = useState([]);
  const [entity, setEntity] = useState({});
  const [state, setState] = useState({});
  const [key, setKey] = useState("page1");
  const [action, setAction] = useState("");
  const [tBillData, setTBillData] = useState([]);
  const [tBillFamData, setTBillFamData] = useState([]);
  const [mroData, setMroData] = useState([]);
  const [bankAccountData, setBankAccountData] = useState([]);
  const [emp, setEmp] = useState({});

  const [cdaoNo, setCdaoNo] = useState("");
  const [dakType, setDakType] = useState("");
  const [billType, setBillType] = useState("");
  const [rank, setRank] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [lightTheme, setLightTheme] = useState(true);
  const [disabled, setDisabled] = useState(false);

  //PCDAO 02092022
  const [ndcData, setNdcData] = useState([]);
  const [legacyClaimData, setLegacyClaimData] = useState([]);
  const [legacyAdvanceData, setLegacyAdvanceData] = useState([]);
  const [advanceData, setAdvanceData] = useState([]);

  const [autoFetch, setAutoFetch] = useState(false);
  const [fundData, setFundData] = useState([]);

  const [leaveAccumulationListData, setLeaveAccumulationListData] = useState(
    []
  );
  const [ltcEncashmentListData, setLtcEncashmentListData] = useState([]);
  const [fundSummaryListData, setFundSummaryListData] = useState([]);
  const [loanRecoveryListData, setLoanRecoveryListData] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("");
  const menuOptions = [
    { menuName: "-- Please Select --", value: "" },
    { menuName: "All Details", value: "all" },
    { menuName: "Twing Bill Details", value: "twing" },
    { menuName: "Ledger Wing Details", value: "lwing" },
    { menuName: "MRO Details", value: "mro" },
    { menuName: "DSOP Fund Summary", value: "fundSummary" },
    { menuName: "DSOP Withdrawal Details", value: "dsopWithdrawal" },
    { menuName: "NDC Details", value: "ndc" },
    { menuName: "Leave Accumulation Details", value: "leaveAccumulation" },
    { menuName: "Loan Recovery Details", value: "loan" },
    { menuName: "Fama Details", value: "fama" },
    { menuName: "Medical Details", value: "medical" },
  ];
  const [famaData, setFamaData] = useState([]);
  const [medicalBillData, setMedicalBillData] = useState([]);

  useEffect(() => {
    if (cdaoNo.length === 6 && autoFetch) {
      generatePro();
      setAutoFetch(false);
    }
  }, [autoFetch]);

  //PCDAO 02092022
  async function printNdc(e, id) {
    e.preventDefault();
    console.log("NDC" + id);
    await axios
      .get(`/ndcs/printApprovedNdc/${id}`)
      .then((response) => {
        const url = window.open(
          `${process.env.REACT_APP_BASE_URL}/files/openpdf/${response.data}`
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

  //pcdao 02092022
  async function generateRequisitionSlip(id) {
    await axios
      .get(`/cbillTadaLtcs/${id}/requisitionSlip`)
      .then((response) => {
        //console.log(data);
        //pcdao -- to open pdf rather than downloading
        const url = window.open(
          `${process.env.REACT_APP_BASE_URL}/files/openpdf/${response.data}`
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

  async function generateIntimationSlip(id) {
    console.log(id);
    await axios
      .get(`/cbillTadaLtcs/${id}/intimationSlip`)
      .then((response) => {
        //console.log(data);
        console.log(response.data);
        const url = window.open(
          `${process.env.REACT_APP_BASE_URL}/files/openpdf/${response.data}`
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

  async function tBillRejectionMemo(id) {
    console.log("===Id for Rejection Memo====:" + id);
    await axios
      .put(`/cbillTadaLtcs/${id}/tBillRejectionMemo`)
      .then((response) => {
        //console.log(data);
        console.log(response.data);
        const url = window.open(
          `${process.env.REACT_APP_BASE_URL}/files/openpdf/${response.data}`
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

  const generatePro = () => {
    setDisabled(true);

    let saving = false;
    console.log(cdaoNo);

    async function fetchProData() {
      await axios
        .get(`/pros/${cdaoNo}/`)
        .then((response) => {
          console.log("&&&&&&&&:", response.data);
          setTBillData([]);
          setTBillFamData([]);
          setBankAccountData([]);
          setMroData([]);
          setEmp({});
          setLeaveAccumulationListData([]);
          setLtcEncashmentListData([]);
          setFundSummaryListData([]);
          setLoanRecoveryListData([]);

          if (response.data["cbillList"] !== null)
            setTBillData(response.data["cbillList"]);
          console.log("-------" + tBillData[0]);
          if (response.data["fdList"] !== null)
            setTBillFamData(response.data["fdList"]);
          if (response.data["baList"] !== null)
            setBankAccountData(response.data["baList"]);
          if (response.data["mroList"] !== null)
            setMroData(response.data["mroList"]);
          //PCDAO 02092022
          if (response.data["ndcList"] !== null)
            setNdcData(response.data["ndcList"]);
          if (response.data["legacyClaimList"] !== null)
            setLegacyClaimData(response.data["legacyClaimList"]);
          if (response.data["legacyAdvanceList"] !== null)
            setLegacyAdvanceData(response.data["legacyAdvanceList"]);
          if (response.data["advanceList"] !== null)
            setAdvanceData(response.data["advanceList"]);

          if (response.data["fundDetailsList"] !== null)
            setFundData(response.data["fundDetailsList"]);

          //pcdao 20122023
          if (response.data["ltcEncashmentList"] !== null)
            setLtcEncashmentListData(response.data["ltcEncashmentList"]);

          if (response.data["leaveAccumulationList"] !== null)
            setLeaveAccumulationListData(
              response.data["leaveAccumulationList"]
            );

          if (response.data["fundSummaryList"] !== null)
            setFundSummaryListData(response.data["fundSummaryList"]);
          if (response.data["loanRecoveryList"] !== null)
            setLoanRecoveryListData(response.data["loanRecoveryList"]);
          if (response.data["famaList"] !== null)
            setFamaData(response.data["famaList"]);
          if (response.data["medicalClaimList"] !== null)
            setMedicalBillData(response.data["medicalClaimList"]);

          if (response.data["emp"] !== null) setEmp(response.data["emp"]);
          setDisabled(false);
        })
        .catch((error) => {
          setDisabled(false);
          console.log(error);
          //	console.log(error.response.status);
          //	console.log(error.response.headers);
          if (error.response) setServerErrors(error.response.data.error);
          else setServerErrors(error.Error);
        });
    }
    fetchProData();

    return () => {
      saving = true;
    };
  };

  const handleIcInputChange = (e) => {
    e.preventDefault();
    let icNo = e.target.value;
    if (icNo.length > 5 && icNo.length < 9) {
      axios.get(`/employees/byIcNo/${icNo?.toUpperCase()}`).then((response) => {
        if (response.data.cdaoNo) {
          setCdaoNo(response.data.cdaoNo);
          setAutoFetch(true);
        }
      });
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setCdaoNo(e.target.value);

    if (e.target.value.length === 6) {
      setAutoFetch(true);
    }
  };

  const handleMenuOptionChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setSelectedMenu(e.target.value);
  };

  const onError = (errors, e) => {
    console.log(errors, e);
  };

  const EmployeeDetails = () => {
    return (
      <div className="container">
        <h1 class="text-blue-600" align="center">
          Employee Details
        </h1>
        <table class="table-auto">
          <thead>
            <tr>
              <th class="bg-green-200 border text-center px-8 py-4">CDAO No</th>
              <th class="bg-green-200 border text-center px-8 py-4">
                Personal No
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">Name</th>
              <th class="bg-green-200 border text-center px-8 py-4">Gender</th>
              <th class="bg-green-200 border text-center px-8 py-4">Unit</th>
              <th class="bg-green-200 border text-center px-8 py-4">
                Date of Birth
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">
                Date of Commission
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">
                Date of Reporting
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">
                Date of Retirement
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">PAN</th>
              <th class="w-48 bg-green-200 border center-left px-8 py-4">
                Home Station
              </th>
            </tr>
            {emp?.length !== 0 && emp?.rank && (
              <tr>
                <td class="bg-green-50 border text-center ">
                  {emp.cdaoNo}
                  {emp.checkDigit} {emp.sectionName} / {emp.task}
                </td>
                <td class="bg-green-50 border text-center ">
                  {emp.icNo}
                  {emp.icCheckDigit}
                </td>

                <td class="bg-green-50 border text-left px-2 ">
                  {emp.rank.rankName} {emp.officerName}
                </td>
                <td class="bg-green-50 border text-center ">{emp.gender}</td>
                {emp.presentUnit && (
                  <td class="bg-green-50 border text-left ">
                    {emp.presentUnit.unitName}
                  </td>
                )}
                {!emp.presentUnit && <td></td>}
                <td class="bg-green-50 border text-center ">
                  {emp.dateOfBirth}
                </td>
                <td class="bg-green-50 border text-center ">
                  {emp.dateOfCommission}
                </td>
                <td class="bg-green-50 border text-center ">
                  {emp.dateOfReporting}
                </td>
                <td class="bg-green-50 border text-center ">{emp.fsDueDate}</td>
                <td class="bg-green-50 border text-center px-2 ">{emp.pan}</td>
                <td class="bg-green-50 border text-center ">
                  {emp.homeStation}
                </td>
              </tr>
            )}
          </thead>

          <tbody>
            {emp?.length === 0 && (
              <tr>
                <td colspan="4" align="center">
                  No Employee Details Available{" "}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <br />
      </div>
    );
  };

  const BankDetails = () => {
    return (
      <div className="container">
        <h1 class="text-blue-600" align="center">
          Bank Details
        </h1>
        <table class="table-auto">
          <thead>
            <tr>
              <th class="bg-green-200 border text-center px-8 py-4">
                Bank Name
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">
                Bank Branch
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">
                Bank Station
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">
                Bank Account No
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">IFSC</th>
            </tr>
            {bankAccountData &&
              bankAccountData.map((tb) => (
                <tr key={tb.cdaoNo}>
                  <td class="bg-green-50 border text-center px-2">
                    {tb.bankName}
                  </td>
                  <td class="bg-green-50 border text-center  px-2">
                    {tb.bankBranch}
                  </td>
                  <td class="bg-green-50 border text-center  px-2">
                    {tb.bankStation}
                  </td>
                  <td class="bg-green-50 border text-center  px-2">
                    {tb.bankAccountNo}
                  </td>
                  <td class="bg-green-50 border text-center  px-2">
                    {tb.ifsc}
                  </td>
                </tr>
              ))}
          </thead>

          <tbody>
            {bankAccountData?.length === 0 && (
              <tr>
                <td colspan="4" align="center">
                  No Bank Details Available{" "}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <br />
      </div>
    );
  };

  const FamaDetails = () => {
    return (
      <div className="container">
        <h1 class="text-blue-600" align="center">
          Fama Infomation
        </h1>
        <table class="table-auto">
          <thead>
            <tr>
              <th class="bg-green-200 border text-left px-8 py-4">CdaoNo</th>
              <th class="bg-green-200 border text-left px-8 py-4">
                BeneficiaryName
              </th>
              <th class="bg-green-200 border text-left px-8 py-4">Relation</th>
              <th class="bg-green-200 border text-left px-8 py-4">From Date</th>
              <th class="bg-green-200 border text-left px-8 py-4">To Date</th>
              <th class="bg-green-200 border text-left px-8 py-4">Amount</th>
              <th class="bg-green-200 border text-left px-8 py-4">Status</th>
            </tr>
            {famaData &&
              famaData.map((tf, idx) => (
                <tr key={tf.idx}>
                  <td class="bg-green-50 border text-center ">
                    {tf.cdaono}
                    {tf.cd}
                  </td>
                  <td class="bg-green-50 border text-center ">{tf.benname}</td>
                  <td class="bg-green-50 border text-center ">{tf.relname}</td>
                  <td class="bg-green-50 border text-center ">{tf.fromDate}</td>
                  <td class="bg-green-50 border text-center ">{tf.toDate}</td>
                  <td class="bg-green-50 border text-center ">{tf.status}</td>
                  <td class="bg-green-50 border text-center ">{tf.amount}</td>
                </tr>
              ))}
          </thead>

          <tbody>
            {famaData.length === 0 && (
              <tr>
                <td colspan="7" align="center">
                  No Fama Available{" "}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <br />
      </div>
    );
  };
  const MedicalClaimDetails = () => {
    //medical Pcdao Changes
    return (
      <div className="container">
        <h1 class="text-blue-600" align="center">
          Medical Claims
        </h1>
        <table class="table-auto">
          <thead>
            <tr>
              <th class="bg-green-200 border text-left px-8 py-4">CdaoNo</th>
              {/* added by PCDAO 12032024 */}
              <th class="bg-green-200 border text-left px-8 py-4">Dak ID</th>
              {/* added by PCDAO 12032024 */}

              <th class="bg-green-200 border text-left px-8 py-4">
                Name of Patient
              </th>
              <th class="bg-green-200 border text-left px-8 py-4">
                Medical Test
              </th>
              <th class="bg-green-200 border text-left px-8 py-4">From Date</th>
              <th class="bg-green-200 border text-left px-8 py-4">To Date</th>
              <th class="bg-green-200 border text-left px-8 py-4">
                Amount Claimed
              </th>
              <th class="bg-green-200 border text-left px-8 py-4">
                Amount Passed
              </th>
              <th class="bg-green-200 border text-left px-8 py-4">Status</th>
              <th class="bg-green-200 border text-left px-8 py-4">Approved</th>

              {/* added by PCDAO 12032024 */}

              <th class="bg-green-200 border text-left px-8 py-4">
                Rejection Reason
                {/* added by PCDAO 12032024 */}


              </th>
            </tr>
            {medicalBillData &&
              medicalBillData.map((medical, idx) => (
                <tr key={medical.idx}>
                  <td class="bg-green-50 border text-center ">
                    {medical.cdaoNo}
                    {medical.cd}
                  </td>
                  {/* added by PCDAO 12032024 */}

                  <td class="bg-green-50 border text-center ">
                    {medical.dakidNo}
                  </td>
                  {/* added by PCDAO 12032024 */}

                  <td class="bg-green-50 border text-center ">
                    {medical.nameOfPatient}
                  </td>
                  <td class="bg-green-50 border text-center px-2 ">
                    {medical.medicalTestName}
                  </td>
                  <td class="bg-green-50 border text-center ">
                    {medical.fromDate}
                  </td>
                  <td class="bg-green-50 border text-center ">
                    {medical.toDate}
                  </td>
                  <td class="bg-green-50 border text-center ">
                    {medical.amountClaimed}
                  </td>
                  <td class="bg-green-50 border text-center ">
                    {medical.amountPassed}
                  </td>
                  <td class="bg-green-50 border text-center ">
                    {medical.recordStatus}
                  </td>
                  <td class="bg-green-50 border text-center ">
                    {medical.approved}
                  </td>

                  {/* added by PCDAO 12032024 */}

                  <td class="bg-green-50 border text-center ">
                    {medical.rejectionReason}
                  </td>
                </tr>
              ))}
          </thead>

          <tbody>
            {medicalBillData.length === 0 && (
              <tr>
                <td colspan="8" align="center">
                  No Medical Claim Details Available{" "}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <br />
      </div>
    );
  };
  const FamilyDetails = () => {
    return (
      <div className="container">
        <h1 class="text-blue-600" align="center">
          Family Infomation
        </h1>
        <table class="table-auto">
          <thead>
            <tr>
              <th class="bg-green-200 border text-left px-8 py-4">
                Name Of Family Member
              </th>
              <th class="bg-green-200 border text-left px-8 py-4">Gender</th>
              <th class="bg-green-200 border text-left px-8 py-4">Relation</th>
              <th class="bg-green-200 border text-left px-8 py-4">
                Date Of Birth
              </th>
            </tr>
            {tBillFamData &&
              tBillFamData.map((tf) => (
                <tr key={tf.dakidNo}>
                  <td class="bg-green-50 border text-left ">
                    {tf.nameOfFamilyMember}
                  </td>
                  <td class="bg-green-50 border text-left ">{tf.gender}</td>
                  <td class="bg-green-50 border text-left ">{tf.relation}</td>
                  <td class="bg-green-50 border text-left ">{tf.dob}</td>
                </tr>
              ))}
          </thead>

          <tbody>
            {tBillFamData?.length === 0 && (
              <tr>
                <td colspan="4" align="center">
                  No Family Details Available{" "}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <br />
      </div>
    );
  };
  const TwingBillDetails = () => {
    return (
      <>
        <div className="container">
          <h1 class="text-blue-600" align="center">
            Bill Details
          </h1>

          <table class="table-auto w-full">
            <thead>
              <tr>
                <th class="bg-green-200 border text-left px-8 py-4">SlNo</th>
                <th class="bg-green-200 border text-left px-8 py-4">
                  DakId/AdvId/TransId
                </th>

                <th class="bg-green-200 border text-left px-8 py-4">Claim</th>
                <th class="bg-green-200 border text-left px-8 py-4">Journey</th>
                <th class="bg-green-200 border text-left px-8 py-4">Fare</th>
                <th class="bg-green-200 border text-left px-8 py-4">
                  Passing Details
                </th>
                <th class="bg-green-200 border text-left px-8 py-4">Users</th>
                <th class="bg-green-200 border text-left px-8 py-4">Link</th>
              </tr>
              {tBillData &&
                tBillData.map((tb, index) => (
                  <tr key={tb.dakidNo}>
                    <td class="bg-green-50 border text-left ">
                      {index + 1}
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                    </td>
                    <td class="bg-green-50 border text-left ">
                      DakId : {tb.dakidNo} <br />
                      Adv Id : {tb.advId}
                      <br />
                      Dts Id : {tb.transId}
                      <br />
                      Section :{tb.sectionName}
                      <br /> Task :{tb.taskNo}
                      <br />
                      Receipt Date : {tb.receiptDate}
                      <br />
                      Reference Date : {tb.referenceDate}
                      <br />
                      Reference No : {tb.referenceNo}
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                    </td>
                    <td class="bg-green-50 border text-left">
                      {tb.typeOfClaim}
                      <br /> Claim Date : {tb.billDate}
                      <br />
                      Block Yr : {tb.blockYear}
                      <br /> Move Order No {tb.movementOrderNo}
                      <br />
                      Move Date : {tb.movementOrderDate}
                      <br /> No. of Members : {tb.noOfMembers}
                      <br />
                      TA Rule : {tb.taRule}
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                    </td>
                    <td class="bg-green-50 border text-left ">
                      Station From : {tb.journeyStationFrom}
                      <br /> Station To : {tb.journeyStationTo}
                      <br /> From Date : {tb.journeyFromDateStr}
                      <br /> To Date : {tb.journeyToDateStr} <br />
                      { }
                      <br />
                      Rejection : {tb.rejectionReason}
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                    </td>
                    <td class="bg-green-50 border text-left ">
                      Fare:{tb.totalFare}
                      <br />
                      Food:{tb.foodCharges}
                      <br />
                      Lodging:{tb.lodgingCharges}
                      <br />
                      Distance:{tb.distance}
                      <br />
                      CTG:{tb.ctg}
                      <br />
                      Baggage Qty:{tb.baggageQuantity}
                      <br />
                      Baggage Amount:{tb.baggageAmount}
                      <br />
                      Conveyance Type:{tb.conveyanceType}
                      <br />
                      Conveyance Amount:{tb.conveyanceAmount}
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                    </td>
                    <td class="bg-green-50 border text-left  ">
                      Amount Claimed : {tb.amountClaimed}
                      <br />
                      Amount Passed:{tb.amountPassed}
                      <br />
                      Amount Disallowed:{tb.amountDisallowed}
                      <br />
                      Advance Amount:{tb.advanceAmount}
                      <br />
                      Penal Interest:{tb.penalInterest}
                      <br />
                      Adjustment Amount:{tb.adjustmentAmount}
                      <br />
                      MRO Amount : {tb.mroAmount}
                      <br />
                      DV No : {tb.dvNo}
                      <br />
                      DP Sheet No: {tb.dpSheetNo}
                      <br />
                      DP Sheet Date : {tb.dpSheetDate}
                      <br />
                      CMP Date : {tb.cmpDate}
                      <br />
                      Record Status : {tb.recordStatus}
                    </td>
                    <td class="bg-green-50 border text-left  ">
                      Aud : {tb.auditorName}
                      <br />
                      Auditor Date: {tb.auditorDate}
                      <br /> AAO : {tb.aaoName}
                      <br />
                      AAO Date: {tb.aaoDate}
                      <br />
                      SAO/AO : {tb.aoName}
                      <br />
                      SAO/AO Date: {tb.aoDate}
                      <br />
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                    </td>

                    <td class="bg-green-50 border text-left  ">
                      {" "}
                      {tb.recordStatus === "R" && (
                        <button
                          className="w-32 m-2 p-0 bg-yellow-500 hover:bg-red-700 "
                          onClick={() => tBillRejectionMemo(tb.cbId)}
                        >
                          {" "}
                          Print Rej Memo{" "}
                        </button>
                      )}
                      {tb.recordStatus === "V" && (
                        <div>
                          <button
                            className="w-32 m-0 p-0 bg-yellow-500 hover:bg-red-700 "
                            onClick={() => generateIntimationSlip(tb.cbId)}
                          >
                            {" "}
                            Intimation Slip{" "}
                          </button>

                          <button
                            onClick={() => {
                              window.open(
                                `/cbillTadaLtcs/${tb.cbId}/tbillInfo`,
                                "_blank",
                                "width=1500, height=1000, left=500"
                              );
                            }}
                            className="w-32 my-2 p-0 bg-gray-500 hover:bg-gray-700 "
                          >
                            {" "}
                            View Bill Info{" "}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
            </thead>

            <tbody>
              {tBillData == null ||
                (tBillData && tBillData.length === 0 && (
                  <tr>
                    <td colspan="4" align="center">
                      No Bill Details Available{" "}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <br />
        </div>

        <div className="container">
          <h1 class="text-blue-600" align="center">
            Advance Details
          </h1>

          <table class="table-auto w-full">
            <thead>
              <tr>
                <th class="bg-green-200 border text-left px-8 py-4">SlNo</th>
                <th class="bg-green-200 border text-left px-8 py-4">
                  DakId/AdvId/TransId
                </th>

                <th class="bg-green-200 border text-left px-8 py-4">Claim</th>
                <th class="bg-green-200 border text-left px-8 py-4">Journey</th>
                <th class="bg-green-200 border text-left px-8 py-4">Fare</th>
                <th class="bg-green-200 border text-left px-8 py-4">
                  Passing Details
                </th>
                <th class="bg-green-200 border text-left px-8 py-4">Users</th>
                <th class="bg-green-200 border text-left px-8 py-4">Link</th>
              </tr>
              {advanceData &&
                advanceData.map((tb, index) => (
                  <tr key={tb.dakidNo}>
                    <td class="bg-green-50 border text-left ">
                      {index + 1}
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                    </td>
                    <td class="bg-green-50 border text-left ">
                      DakId : {tb.dakidNo} <br />
                      Adv Id : {tb.advId}
                      <br />
                      Dts Id : {tb.transId}
                      <br />
                      Section :{tb.sectionName}
                      <br /> Task :{tb.taskNo}
                      <br />
                      Receipt Date : {tb.receiptDate}
                      <br />
                      Reference Date : {tb.referenceDate}
                      <br />
                      Reference No : {tb.referenceNo}
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                    </td>
                    <td class="bg-green-50 border text-left">
                      {tb.typeOfClaim}
                      <br /> Claim Date : {tb.billDate}
                      <br />
                      Block Yr : {tb.blockYear}
                      <br /> Move Order No {tb.movementOrderNo}
                      <br />
                      Move Date : {tb.movementOrderDate}
                      <br /> No. of Members : {tb.noOfMembers}
                      <br />
                      TA Rule : {tb.taRule}
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                    </td>
                    <td class="bg-green-50 border text-left ">
                      Station From : {tb.journeyStationFrom}
                      <br /> Station To : {tb.journeyStationTo}
                      <br /> From Date : {tb.journeyFromDateStr}
                      <br /> To Date : {tb.journeyToDateStr} <br />
                      { }
                      <br />
                      Rejection : {tb.rejectionReason}
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                    </td>
                    <td class="bg-green-50 border text-left ">
                      Fare:{tb.totalFare}
                      <br />
                      Food:{tb.foodCharges}
                      <br />
                      Lodging:{tb.lodgingCharges}
                      <br />
                      Distance:{tb.distance}
                      <br />
                      CTG:{tb.ctg}
                      <br />
                      Baggage Qty:{tb.baggageQuantity}
                      <br />
                      Baggage Amount:{tb.baggageAmount}
                      <br />
                      Conveyance Type:{tb.conveyanceType}
                      <br />
                      Conveyance Amount:{tb.conveyanceAmount}
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                    </td>
                    <td class="bg-green-50 border text-left  ">
                      Amount Claimed : {tb.amountClaimed}
                      <br />
                      Amount Passed:{tb.amountPassed}
                      <br />
                      Amount Disallowed:{tb.amountDisallowed}
                      <br />
                      Advance Amount:{tb.advanceAmount}
                      <br />
                      Penal Interest:{tb.penalInterest}
                      <br />
                      Adjustment Amount:{tb.adjustmentAmount}
                      <br />
                      MRO Amount : {tb.mroAmount}
                      <br />
                      DV No : {tb.dvNo}
                      <br />
                      DP Sheet No: {tb.dpSheetNo}
                      <br />
                      DP Sheet Date : {tb.dpSheetDate}
                      <br />
                      CMP Date : {tb.cmpDate}
                      <br />
                      Record Status : {tb.recordStatus}
                    </td>
                    <td class="bg-green-50 border text-left  ">
                      Aud : {tb.auditorName}
                      <br />
                      Auditor Date: {tb.auditorDate}
                      <br /> AAO : {tb.aaoName}
                      <br />
                      AAO Date: {tb.aaoDate}
                      <br />
                      SAO/AO : {tb.aoName}
                      <br />
                      SAO/AO Date: {tb.aoDate}
                      <br />
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                    </td>

                    <td class="bg-green-50 border text-left  ">
                      {" "}
                      {tb.recordStatus === "R" && (
                        <button
                          className="w-32 m-0 p-0 bg-yellow-500 hover:bg-red-700 "
                          onClick={() => tBillRejectionMemo(tb.cbId)}
                        >
                          {" "}
                          Print Rej Memo{" "}
                        </button>
                      )}
                      {/* {tb.recordStatus === "V" && (
                           <div>
                             <button
                               className="w-32 m-0 p-0 bg-yellow-500 hover:bg-red-700 "
                               onClick={() => generateIntimationSlip(tb.cbId)}
                             >
                               {" "}
                               Intimation Slip{" "}
                             </button>
                             
                             
                           </div>
                         )} */}
                      <div>
                        {" "}
                        {tb.advId !== null && (
                          <button
                            className="w-32 m-0 p-0 bg-red-500 hover:bg-red-700 "
                            onClick={() => generateRequisitionSlip(tb.cbId)}
                          >
                            {" "}
                            Requisition Slip{" "}
                          </button>
                        )}
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            window.open(
                              `/cbillTadaLtcs/${tb.cbId}/tbillInfo`,
                              "_blank",
                              "width=1500, height=1000, left=500"
                            );
                          }}
                          className="w-32 my-2 p-0 bg-gray-500 hover:bg-gray-700 "
                        >
                          {" "}
                          View Bill Info{" "}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </thead>

            <tbody>
              {tBillData == null ||
                (tBillData && tBillData.length === 0 && (
                  <tr>
                    <td colspan="4" align="center">
                      No Bill Details Available{" "}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <br />
        </div>
        {/* PCDAO 02092022 */}

        {/*PCDAO 02092022 */}
        <div className="container">
          <h1 class="text-blue-600" align="center">
            Legacy Bill Details
          </h1>

          <table class="table-auto w-full">
            <thead>
              <tr>
                <th class="bg-green-200 border text-left px-8 py-4">SlNo</th>
                <th class="bg-green-200 border text-left px-8 py-4">
                  DakId/AdvId/TransId
                </th>

                <th class="bg-green-200 border text-left px-8 py-4">Claim</th>
                <th class="bg-green-200 border text-left px-8 py-4">Journey</th>
                <th class="bg-green-200 border text-left px-8 py-4">Fare</th>
                <th class="bg-green-200 border text-left px-8 py-4">
                  Passing Details
                </th>
                <th class="bg-green-200 border text-left px-8 py-4">Users</th>
              </tr>
              {legacyClaimData &&
                legacyClaimData.map((tb, index) => (
                  <tr key={tb.dakidNo}>
                    <td class="bg-green-50 border text-left ">
                      {index + 1}
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                    </td>
                    <td class="bg-green-50 border text-left ">
                      DakId : {tb.dakidNo} <br />
                      Adv Id : {tb.advId}
                      <br />
                      Dts Id : {tb.transId}
                      <br />
                      Section :{tb.sectionName}
                      <br /> Task :{tb.taskNo}
                      <br />
                      Receipt Date : {tb.receiptDate}
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                    </td>
                    <td class="bg-green-50 border text-left">
                      {tb.typeOfClaim}
                      <br /> Claim Date : {tb.billDate}
                      <br />
                      Block Yr : {tb.blockYear}
                      <br /> Move Order No {tb.movementOrderNo}
                      <br />
                      Move Date : {tb.movementOrderDate}
                      <br /> No. of Members : {tb.noOfMembers}
                      <br />
                      TA Rule : {tb.taRule}
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                    </td>
                    <td class="bg-green-50 border text-left ">
                      Station From : {tb.journeyStationFrom}
                      <br /> Station To : {tb.journeyStationTo}
                      <br /> From Date : {tb.journeyFromDateStr}
                      <br /> To Date : {tb.journeyToDateStr} <br />
                      { }
                      <br />
                      Rejection : {tb.rejectionReason}
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                    </td>
                    <td class="bg-green-50 border text-left ">
                      Fare:{tb.totalFare}
                      <br />
                      Food:{tb.foodCharges}
                      <br />
                      Lodging:{tb.lodgingCharges}
                      <br />
                      Distance:{tb.distance}
                      <br />
                      CTG:{tb.ctg}
                      <br />
                      Baggage Qty:{tb.baggageQuantity}
                      <br />
                      Baggage Amount:{tb.baggageAmount}
                      <br />
                      Conveyance Type:{tb.conveyanceType}
                      <br />
                      Conveyance Amount:{tb.conveyanceAmount}
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                    </td>
                    <td class="bg-green-50 border text-left  ">
                      Amount Claimed : {tb.amountClaimed}
                      <br />
                      Amount Passed:{tb.amountPassed}
                      <br />
                      Amount Disallowed:{tb.amountDisallowed}
                      <br />
                      Advance Amount:{tb.advanceAmount}
                      <br />
                      Penal Interest:{tb.penalInterest}
                      <br />
                      Adjustment Amount:{tb.netAmount}
                      <br />
                      MRO Amount : {tb.mroAmount}
                      <br />
                      DV No : {tb.dvNo}
                      <br />
                      DP Sheet No: {tb.dpSheetNo}
                      <br />
                      DP Sheet Date : {tb.dpSheetDate}
                      <br />
                      CMP Date : {tb.cmpDate}
                      <br />
                      Record Status : {tb.recordStatus}
                    </td>
                    <td class="bg-green-50 border text-left  ">
                      Aud : {tb.auditorName}
                      <br />
                      Auditor Date: {tb.auditorDate}
                      <br /> AAO : {tb.aaoName}
                      <br />
                      AAO Date: {tb.aaoDate}
                      <br />
                      SAO/AO : {tb.aoName}
                      <br />
                      SAO/AO Date: {tb.aoDate}
                      <br />
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                    </td>
                  </tr>
                ))}
            </thead>

            <tbody>
              {tBillData == null ||
                (tBillData && tBillData.length === 0 && (
                  <tr>
                    <td colspan="4" align="center">
                      No Bill Details Available{" "}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <br />
        </div>
        <div className="container">
          <h1 class="text-blue-600" align="center">
            Legacy Advance Details
          </h1>

          <table class="table-auto w-full">
            <thead>
              <tr>
                <th class="bg-green-200 border text-left px-8 py-4">SlNo</th>
                <th class="bg-green-200 border text-left px-8 py-4">
                  DakId/AdvId/TransId
                </th>

                <th class="bg-green-200 border text-left px-8 py-4">Claim</th>
                <th class="bg-green-200 border text-left px-8 py-4">Journey</th>
                <th class="bg-green-200 border text-left px-8 py-4">Fare</th>
                <th class="bg-green-200 border text-left px-8 py-4">
                  Passing Details
                </th>
                <th class="bg-green-200 border text-left px-8 py-4">
                  Settlement Details
                </th>
              </tr>
              {legacyAdvanceData &&
                legacyAdvanceData.map((tb, index) => (
                  <tr key={tb.dakidNo}>
                    <td class="bg-green-50 border text-left ">
                      {index + 1}
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                    </td>
                    <td class="bg-green-50 border text-left ">
                      DakId : {tb.dakidNo} <br />
                      Adv Id : {tb.advId}
                      <br />
                      Dts Id : {tb.transId}
                      <br />
                      Section :{tb.sectionName}
                      <br /> Task :{tb.taskNo}
                      <br />
                      Receipt Date : {tb.receiptDate}
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                    </td>
                    <td class="bg-green-50 border text-left">
                      {tb.typeOfClaim}
                      <br /> Claim Date : {tb.billDate}
                      <br />
                      Block Yr : {tb.blockYear}
                      <br /> Move Order No {tb.movementOrderNo}
                      <br />
                      Move Date : {tb.movementOrderDate}
                      <br /> No. of Members : {tb.noOfMembers}
                      <br />
                      TA Rule : {tb.taRule}
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                    </td>
                    <td class="bg-green-50 border text-left ">
                      Station From : {tb.journeyStationFrom}
                      <br /> Station To : {tb.journeyStationTo}
                      <br /> From Date : {tb.journeyFromDateStr}
                      <br /> To Date : {tb.journeyToDateStr} <br />
                      { }
                      <br />
                      Rejection : {tb.rejectionReason}
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                    </td>
                    <td class="bg-green-50 border text-left ">
                      Fare:{tb.totalFare}
                      <br />
                      Food:{tb.foodCharges}
                      <br />
                      Lodging:{tb.lodgingCharges}
                      <br />
                      Distance:{tb.distance}
                      <br />
                      CTG:{tb.ctg}
                      <br />
                      Baggage Qty:{tb.baggageQuantity}
                      <br />
                      Baggage Amount:{tb.baggageAmount}
                      <br />
                      Conveyance Type:{tb.conveyanceType}
                      <br />
                      Conveyance Amount:{tb.conveyanceAmount}
                      <br />
                      { }
                      <br />
                      { }
                      <br />
                    </td>
                    <td class="bg-green-50 border text-left  ">
                      Amount Claimed : {tb.amountClaimed}
                      <br />
                      Amount Passed:{tb.amountPassed}
                      <br />
                      Amount Disallowed:{tb.amountDisallowed}
                      <br />
                      Advance Amount:{tb.advanceAmount}
                      <br />
                      Penal Interest:{tb.penalInterest}
                      <br />
                      Adjustment Amount:{tb.adjustmentAmount}
                      <br />
                      MRO Amount : {tb.mroAmount}
                      <br />
                      DV No : {tb.dvNo}
                      <br />
                      DP Sheet No: {tb.dpSheetNo}
                      <br />
                      DP Sheet Date : {tb.dpsheetDate}
                      <br />
                      CMP Date : {tb.cmpDate}
                      <br />
                      Record Status : {tb.recordStatus}
                    </td>
                    <td class="bg-green-50 border text-left  ">
                      Claim Id : {tb.legacyAdvClaimId}
                      <br />
                      ADR Status : {tb.legacyAdvAdrStatus}
                      <br />
                      ADR Claim Date : {tb.legacyAdvAdrClaimDate}
                      <br />
                      Recovery Amount : {tb.legacyAdvRecoveryAmount}
                    </td>
                  </tr>
                ))}
            </thead>

            <tbody>
              {tBillData == null ||
                (tBillData && tBillData.length === 0 && (
                  <tr>
                    <td colspan="4" align="center">
                      No Bill Details Available{" "}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <br />
        </div>
      </>
    );
  };

  const MroDetails = () => {
    return (
      <div className="container">
        <h1 class="text-blue-600" align="center">
          MRO Details
        </h1>
        <table class="table-auto w-full">
          <thead>
            <tr>
              <th class="bg-green-200 border text-left px-8 py-4">DakId</th>
              <th class="bg-green-200 border text-left px-8 py-4">
                Section Code
              </th>
              <th class="bg-green-200 border text-left px-8 py-4">
                Min No/MRO Date
              </th>
              <th class="bg-green-200 border text-left px-8 py-4">
                Received Month/Adjusted Month
              </th>
              <th class="bg-green-200 border text-left px-8 py-4">
                Vr No/Vr Date
              </th>
              <th class="bg-green-200 border text-left px-8 py-4">Amount</th>
              <th class="bg-green-200 border text-left px-8 py-4">
                Remittance Detail/Settlement Dak Id
              </th>
            </tr>
            {mroData &&
              mroData.map((tm) => (
                <tr key={tm.dakidNo}>
                  <td class="bg-green-50 border text-left ">{tm.dakidNo}</td>
                  <td class="bg-green-50 border text-left ">
                    {tm.sectionCode}
                  </td>
                  <td class="bg-green-50 border text-left ">
                    {" "}
                    Min No : {tm.minNo} <br />
                    MRO Date : {tm.mroDate}
                  </td>
                  <td class="bg-green-50 border text-left ">
                    {" "}
                    Received Month : {tm.recdMonth} <br />
                    Adjusted Month : {tm.adjMonth}
                  </td>
                  <td class="bg-green-50 border text-left ">
                    {" "}
                    Vr. No. : {tm.vrNo} <br />
                    Vr. Date : {tm.vrDate}
                  </td>
                  <td class="bg-green-50 border text-left ">{tm.amount}</td>
                  <td class="bg-green-50 border text-left ">
                    {" "}
                    Remittance Detail : {tm.remittanceDetail} <br />
                    Approved : {tm.approved} <br />
                    Settlement Dak Id : {tm.settlementDakidNo}
                  </td>
                </tr>
              ))}
          </thead>

          <tbody>
            {mroData.length === 0 && (
              <tr>
                <td colspan="4" align="center">
                  No MRO Details Available{" "}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <br />
      </div>
    );
  };

  const LeaveAccumulationDetails = () => {
    return (
      <div className="container">
        <h1 class="text-blue-600" align="center">
          Leave Accumulation Details{" "}
        </h1>
        <table class="table-auto w-full">
          <thead>
            <tr>
              <th class="bg-green-200 border text-center px-8 py-4">
                Casualty Code
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">Do2 No</th>
              <th class="bg-green-200 border text-center px-8 py-4">
                Do2 Date
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">
                From Date
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">
                Accumulated Leave
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">
                Total Accumulated Leave
              </th>
            </tr>
          </thead>
          <tbody>
            {leaveAccumulationListData &&
              leaveAccumulationListData.map((la, index) => (
                <tr key={la.cdaoNo}>
                  <td class="bg-green-50 border text-center ">
                    {la.occurrenceCode}
                  </td>
                  <td class="bg-green-50 border text-center "> {la.do2No}</td>

                  <td class="bg-green-50 border text-center "> {la.do2Date}</td>
                  <td class="bg-green-50 border text-center ">{la.fromDate}</td>

                  <td class="bg-green-50 border text-center ">{la.data1}</td>
                  <td class="bg-green-50 border text-center ">{la.data2}</td>
                </tr>
              ))}
          </tbody>
          <tbody>
            {leaveAccumulationListData.length === 0 && (
              <tr>
                <td colspan="6" align="center">
                  Accumulated Leave Details Not Available{" "}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const LtcEncashmentDetails = () => {
    return (
      <div className="container">
        <h1 class="text-blue-600" align="center">
          Ltc Encashment Details{" "}
        </h1>
        <table class="table-auto w-full">
          <thead>
            <tr>
              <th class="bg-green-200 border text-center px-8 py-4">
                Casualty Code
              </th>

              <th class="bg-green-200 border text-center px-8 py-4">Do2 No</th>
              <th class="bg-green-200 border text-center px-8 py-4">
                Do2 Date
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">
                From Date
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">To Date</th>
              <th class="bg-green-200 border text-center px-8 py-4">
                No. Of Days
              </th>
            </tr>
          </thead>
          <tbody>
            {ltcEncashmentListData &&
              ltcEncashmentListData.map((le, index) => (
                <tr key={le.cdaoNo}>
                  <td class="bg-green-50 border text-center ">
                    {le.occurrenceCode}
                  </td>

                  <td class="bg-green-50 border text-center ">{le.do2No}</td>
                  <td class="bg-green-50 border text-center ">{le.do2Date}</td>
                  <td class="bg-green-50 border text-center ">{le.fromDate}</td>
                  <td class="bg-green-50 border text-center "> {le.toDate}</td>

                  <td class="bg-green-50 border text-center "> {le.data2}</td>
                </tr>
              ))}
          </tbody>
          <tbody>
            {ltcEncashmentListData.length === 0 && (
              <tr>
                <td colspan="6" align="center">
                  LTC Encashment Details Not Available{" "}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const NdcDetails = () => {
    return (
      <div className="container">
        <h1 class="text-blue-600" align="center">
          NDC Details
        </h1>
        <table class="table-auto w-full">
          <thead>
            <tr>
              <th class="bg-green-200 border text-left px-8 py-4">DakId</th>
              <th class="bg-green-200 border text-left px-8 py-4">NDC Month</th>
              <th class="bg-green-200 border text-left px-8 py-4">
                Outstanding Amount
              </th>
              <th class="bg-green-200 border text-left px-8 py-4">NDC Date</th>
              <th class="bg-green-200 border text-left px-8 py-4">
                Record Status
              </th>
              <th class="bg-green-200 border text-left px-8 py-4">Remarks</th>
              <th class="bg-green-200 border text-left px-8 py-4">
                Disposal Date
              </th>
              <th class="bg-green-200 border text-left px-8 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {ndcData &&
              ndcData.map((tm) => (
                <tr key={tm.dak.dakidNo}>
                  <td class="bg-green-50 border text-left ">
                    {tm.dak.dakidNo}
                  </td>
                  <td class="bg-green-50 border text-left ">{tm.me}</td>
                  <td class="bg-green-50 border text-left ">
                    {tm.amountOutstanding}
                  </td>
                  <td class="bg-green-50 border text-left "> {tm.ndcDate}</td>

                  <td class="bg-green-50 border text-left ">
                    {" "}
                    {tm.recordStatus}
                  </td>
                  <td class="bg-green-50 border text-left ">{tm.remarks}</td>

                  <td class="bg-green-50 border text-left  ">
                    {/* Aud : {tm.auditorName} */}

                    {tm.aoDate}
                  </td>
                  <td class="bg-green-50 border text-left  ">
                    <button
                      key={tm.id}
                      id={tm.id}
                      onClick={(e) => printNdc(e, tm.id)}
                    >
                      Download NDC
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
          <tbody>
            {ndcData.length === 0 && (
              <tr>
                <td colspan="4" align="center">
                  No NDCs Available{" "}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const DsopWithdrawalDetails = () => {
    return (
      <div className="container">
        <h1 class="text-blue-600" align="center">
          DSOP Details
        </h1>
        <table class="table-auto">
          <thead>
            <tr>
              <th class="bg-green-200 border text-left px-8 py-4">Dak Id</th>
              <th class="bg-green-200 border text-left px-8 py-4">
                Withdrawal Type
              </th>
              <th class="bg-green-200 border text-left px-8 py-4">
                Fund Purpose
              </th>
              <th class="bg-green-200 border text-left px-8 py-4">
                Claim Date
              </th>
              <th class="bg-green-200 border text-left px-8 py-4">
                Processed Date
              </th>
              <th class="bg-green-200 border text-left px-8 py-4">
                Claimed Amount
              </th>
              <th class="bg-green-200 border text-left px-8 py-4">
                Approval Amount
              </th>
              <th class="bg-green-200 border text-left px-8 py-4">Status</th>
            </tr>
            {fundData &&
              fundData.map((tb, index) => (
                <tr key={tb + index}>
                  <td class="bg-green-50 border text-left px-2">{tb.dakId}</td>
                  <td class="bg-green-50 border text-center ">
                    {tb.withdrawalType}
                  </td>
                  <td class="bg-green-50 border text-left px-2">
                    {tb.fundPurpose}
                  </td>
                  <td class="bg-green-50 border text-center ">
                    {tb.claimDate ? tb.claimDate.substring(0, 10) : ""}
                  </td>
                  <td class="bg-green-50 border text-center ">
                    {tb.processedDate}{" "}
                  </td>
                  <td class="bg-green-50 border text-center ">
                    {" "}
                    {tb.claimedAmount}
                  </td>
                  <td class="bg-green-50 border text-center ">
                    {" "}
                    {tb.approvalAmount}
                  </td>
                  <td class="bg-green-50 border text-center ">
                    {" "}
                    {tb.recordStatus}
                  </td>
                </tr>
              ))}
          </thead>

          <tbody>
            {fundData.length === 0 && (
              <tr>
                <td colspan="8" align="center">
                  No DSOP Withdrawal Details Available{" "}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <br />
      </div>
    );
  };

  const FundSummaryDetails = () => {
    return (
      <div className="container">
        <h1 class="text-blue-600" align="center">
          Fund Summary Details
        </h1>
        <table class="table-auto">
          <thead>
            <tr>
              <th class="bg-green-200 border text-center px-8 py-4">
                Month Ending
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">
                Opening Balance
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">
                Total Subscription
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">
                Total Refund
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">
                Interest Adjusted
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">
                Transfer Out Amount
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">
                Other Adjustment
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">
                Total Debit
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">
                Yearly Interest
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">
                Closing Balance
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">
                Employee Type
              </th>
            </tr>
            {fundSummaryListData &&
              fundSummaryListData.map((tb, index) => (
                <tr key={tb + index}>
                  <td class="bg-green-50 border text-center ">
                    {tb.monthEnding}
                  </td>
                  <td class="bg-green-50 border text-center ">
                    {tb.openingBalance}
                  </td>
                  <td class="bg-green-50 border text-center ">{tb.subTotal}</td>
                  <td class="bg-green-50 border text-center ">
                    {tb.refundTotal}{" "}
                  </td>
                  <td class="bg-green-50 border text-center ">
                    {" "}
                    {tb.interestAdjusted}
                  </td>
                  <td class="bg-green-50 border text-center ">
                    {" "}
                    {tb.transferOutAmount}
                  </td>
                  <td class="bg-green-50 border text-center ">
                    {" "}
                    {tb.otherAdjustment}
                  </td>
                  <td class="bg-green-50 border text-center ">
                    {" "}
                    {tb.debitTotal}
                  </td>
                  <td class="bg-green-50 border text-center ">
                    {" "}
                    {tb.yearlyInterest}
                  </td>
                  <td class="bg-green-50 border text-center ">
                    {" "}
                    {tb.closingBalance}
                  </td>
                  <td class="bg-green-50 border text-center ">
                    {" "}
                    {tb.employeeType}
                  </td>
                </tr>
              ))}
          </thead>

          <tbody>
            {fundSummaryListData.length === 0 && (
              <tr>
                <td colspan="8" align="center">
                  No Fund Summary Details Available for Current FY{" "}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <br />
      </div>
    );
  };

  const LoanRecoveryDetails = () => {
    return (
      <div className="container">
        <h1 class="text-blue-600" align="center">
          Loan Recovery Details
        </h1>
        <table class="table-auto">
          <thead>
            <tr>
              <th class="bg-green-200 border text-center px-8 py-4">
                Loan Code
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">
                Loan Name
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">
                Month Ending
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">
                Recovery Amount
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">
                Current Installment / Total installment
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">
                Balance Principal
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">
                Balance Interest
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">
                Principal Amount
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">
                Interest Amount
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">
                Sanction Number
              </th>
              <th class="bg-green-200 border text-center px-8 py-4">
                Sanction Type
              </th>
            </tr>
            {loanRecoveryListData &&
              loanRecoveryListData.map((lr, index) => (
                <tr key={lr + index}>
                  <td class="bg-green-50 border text-center ">{lr.loanCode}</td>
                  <td class="bg-green-50 border text-center ">
                    {lr.loanCodeDescription}
                  </td>
                  <td class="bg-green-50 border text-center ">{lr.me}</td>
                  <td class="bg-green-50 border text-center ">
                    {lr.recoveryAmount}
                  </td>
                  <td class="bg-green-50 border text-center ">
                    {lr.recoveryInstallmentCount} {"/"}
                    {lr.totalInstallmentCount}
                  </td>
                  <td class="bg-green-50 border text-center ">
                    {" "}
                    {lr.balancePrincipal}
                  </td>
                  <td class="bg-green-50 border text-center ">
                    {" "}
                    {lr.balanceInterest}
                  </td>
                  <td class="bg-green-50 border text-center ">
                    {" "}
                    {lr.principalAmount}
                  </td>
                  <td class="bg-green-50 border text-center ">
                    {" "}
                    {lr.interestAmount}
                  </td>
                  <td class="bg-green-50 border text-center ">
                    {" "}
                    {lr.sanctionNo}
                  </td>
                  <td class="bg-green-50 border text-center ">
                    {" "}
                    {lr.sanctionType}
                  </td>
                </tr>
              ))}
          </thead>

          <tbody>
            {loanRecoveryListData.length === 0 && (
              <tr>
                <td colspan="8" align="center">
                  No Loan Recovery Details Available for Current FY{" "}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <br />
      </div>
    );
  };

  return (
    <div
      className={lightTheme ? "theme-light" : "theme-dark"}
      style={disabled ? { pointerEvents: "none", opacity: "0.9" } : {}}
    >
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <h1 className="text-xl font-semibold ml-4">
            General Information Display Screen(Public Relation Office)
          </h1>
          <div className="flexContainer ml-4">
            <input
              type="text"
              name="search"
              placeholder="CDAO No"
              onChange={(e) => handleInputChange(e)}
              className="pl-2 -ml-2 mr-1 inputField flex-initial"
            />

            <input
              type="text"
              name="searchIc"
              placeholder="IC No/Personal No"
              onChange={(e) => handleIcInputChange(e)}
              className="pl-2 -ml-2 mr-1 inputField flex-initial"
            />
            <button
              type="submit"
              onClick={generatePro}
              className={`w-40 m-0 p-0 ${disabled ? "bg-blue-700" : ""}`}
            >
              {!disabled ? (
                "Search"
              ) : (
                <>
                  Fetching Data
                  <BasicLoadingIcon className="inline ml-1 -mt-1 h-5 w-5 justify-center animate-spin" />
                </>
              )}
            </button>
            <select
              onChange={handleMenuOptionChange}
              className="bg-white ml-4 "
              value={selectedMenu}
            >
              {menuOptions.map((option) => (
                <option value={option.value}>{option.menuName}</option>
              ))}
            </select>
          </div>
          {disabled ? (
            <div className="flex justify-center items-center fixed top-1/2 w-full z-50">
              <p className="mr-2 text-2xl text-blue-700">Fetching Data</p>
              <BasicLoadingIcon className="ml-1 mt-1 h-10 w-10 animate-spin text-blue-700" />
            </div>
          ) : (
            <div>
              <EmployeeDetails />
              <BankDetails />
              <FamilyDetails />
              {["all", "twing"].includes(selectedMenu) && <TwingBillDetails />}
              {["all", "twing", "lwing", "mro"].includes(selectedMenu) && (
                <MroDetails />
              )}
              {["all", "lwing", "fundSummary"].includes(selectedMenu) && (
                <FundSummaryDetails />
              )}
              {["all", "lwing", "dsopWithdrawal"].includes(selectedMenu) && (
                <DsopWithdrawalDetails />
              )}
              {["all", "lwing", "twing", "ndc"].includes(selectedMenu) && (
                <NdcDetails />
              )}
              {["all", "lwing", "leaveAccumulation"].includes(selectedMenu) && (
                <LeaveAccumulationDetails />
              )}
              {["all", "lwing", "ltcEncash"].includes(selectedMenu) && (
                <LtcEncashmentDetails />
              )}
              {["all", "lwing", "loan"].includes(selectedMenu) && (
                <LoanRecoveryDetails />
              )}
              {["all", "lwing", "fama"].includes(selectedMenu) && (
                <FamaDetails />
              )}
              {["all", "lwing", "medical"].includes(selectedMenu) && (
                <MedicalClaimDetails />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Pro);
