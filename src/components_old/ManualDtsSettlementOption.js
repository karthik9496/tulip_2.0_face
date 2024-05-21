/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By :
 */

import { useState, useEffect, useRef } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import axios from "axios";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import LiveSearch from "../utils/LiveSearch";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from "date-fns/addDays";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

const schema = yup.object({
  employee: yup.object().required("Required"),
  //	demandDate:yup.date().required('Required'),
});

const ManualDtsSettlementOption = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  let { id } = useParams();
  console.log(">>>>>>>>>>Dts Reference Id---:" + id);

  let history = useHistory();

  const [serverErrors, setServerErrors] = useState([]);
  const [entity, setEntity] = useState({});
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("");

  const [action, setAction] = useState("");
  const [dtsData, setDtsData] = useState([]);
  const [dts, setDts] = useState(false);
  const [status, setStatus] = useState("");
  const [refId, setRefId] = useState(0);
  const [option, setOption] = useState("");

  useEffect(() => {
    let isCancelled = false;
    let fetching = false;
    let unmounted = false;
    async function fetchData() {
      let record = "";
      console.log(">>>>>>>>>>Dts Reference Id before call ---:" + id);

      await axios
        .get(`/demandRegisters/manualDtsSettlementOption/${id}`)
        .then((response) => {
          console.log(">>>>> Data DTS----:" + response.data[0].status);
          console.log(
            ">>>>> Data DTS-Id For Ref---:" + response.data[0].dtsIdForReference
          );
          setRefId(response.data[0].dtsIdForReference);
          setStatus(response.data[0].status);
          setDtsData(response.data);
        })
        .catch((error) => {
          //console.log(error);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          if (error.response) setServerErrors(error.response.data.error);
          else setServerErrors(error.Error);
        });

      const fields = ["dtsLossToGovt", "dtsRecoveryFromPay"];
      fields.forEach((field) => setValue(field, record[field]));
      if (!isCancelled) {
        setEntity(record);

        setState((prev) => ({ ...prev, state: record }));
      }
    }

    fetchData();
    return () => {
      fetching = true;
      unmounted = true;
    };
  }, [id]);

  const onSubmit = (data, event) => {
    event.preventDefault();
    console.log("777777777:" + data);
    if (data.id) {
      axios
        .put("/demandRegisters/manualDtsSettle/" + data.id, data)
        .then((response) => {
          history.push("/manualDtsSettlement");
        })
        .catch((error) => {
          //console.log(error.response.data);
          //console.log("response--------"+error.response.status);

          setServerErrors(error.response.data["reason"]);
        });
    }
  };

  const onError = (errors, e) => console.log(errors, e);

  const errorCallback = (err) => {
    //console.log(err);
    setServerErrors(err);
  };

  const handleLossChange = (event) => {
    console.log(">>>>>>>Loss to Govt----:" + event.target.value);
    setDts(event.target.value);
    if (event.target.value === "loss") setValue("dtsLossToGovt", true);
    setOption("loss");
  };

  const handleRecoverChange = (event) => {
    setDts(event.target.value);
    setValue("dtsRecoveryFromPay", event.target.value);
    setOption("recover");
  };

  const resetRadioState = () => {
    setDts("");
  };

  async function submitManDts(refId) {
    console.log(">>>>>>Option id is---:" + refId);
    await axios
      .put(`/demandRegisters/submitDts/${refId}/${option}/manualDtsSettle`)

      .then((response) => {
        console.log("response from controller");
        //let updatedRecords = [...data].filter((i) => i.id !== id);
        //	console.log(updatedRecords);
        //setData(updatedRecords);
        //setUpdate(!update);
        history.push("/manualDtsSettlement");
        //history.push("/cbillTadaLtcs");
      })
      .catch((error) => {
        console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });
  }
  /*	async function approveManDts(id) {
		await axios.put(`/demandRegisters/${id}/approveManualDts`)
			.then((response) => {
				//console.log(data);
				//let updatedRecords = [...data].filter((i) => i.id !== id);
				//console.log(updatedRecords);
				//setData(updatedRecords);
				//setUpdate(!update);
				history.push({ pathname: '/manualDtsSettlement', state: response.data });
			})
			.catch((error) => {
				console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}*/

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="container">
            <h1 class="text-blue-600" align="center">
              Transaction ID Details for corresponding Reference ID{" "}
            </h1>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>CDAO_No</th>
                  <th>Advance_Type</th>
                  <th>Amount</th>
                  <th>Journey_Start_Date</th>
                  <th>Journey_End_Date</th>
                  <th>Journey_Station_From</th>
                  <th>Journey_Station_To</th>
                  <th>Transaction_Id</th>
                </tr>
                {dtsData &&
                  dtsData.map((tt) => (
                    <tr key={tt.cdaoNo}>
                      <td>{tt.cdaoNo}</td>
                      <td>{tt.demandType}</td>
                      <td>{tt.transAmount}</td>
                      <td>{tt.journeyFromDate}</td>
                      <td>{tt.journeyToDate}</td>
                      <td>{tt.journeyStationFrom}</td>
                      <td>{tt.journeyStationTo}</td>
                      <td>{tt.transactionId}</td>
                    </tr>
                  ))}
              </thead>
            </table>
            <br />
          </div>

          <div className="container">
            <h1 class="text-blue-600" align="center">
              Reference ID Details for the Cancelled Transaction{" "}
            </h1>

            <table class="table-bordered w-full">
              <thead>
                <tr>
                  <th>CDAO_No</th>
                  <th>Advance_Type</th>
                  <th>Amount</th>
                  <th>Journey_Start_Date</th>
                  <th>Journey_End_Date</th>
                  <th>Journey_Station_From</th>
                  <th>Journey_Station_To</th>
                  <th>Reference_Id/Reference_Amount</th>
                  <th>
                    Cancellation_charges/Cancellation_ground/Cancellation_remarks
                  </th>
                </tr>
                {dtsData &&
                  dtsData.map((tr) => (
                    <tr key={tr.cdaoNo} class="bg-green-50 border text-left">
                      <td>{tr.cdaoNo}</td>
                      <td>{tr.demandType}</td>
                      <td>{tr.refAmount}</td>
                      <td>{tr.journeyFromDate}</td>
                      <td>{tr.journeyToDate}</td>
                      <td>{tr.journeyStationFrom}</td>
                      <td>{tr.journeyStationTo}</td>
                      <td>
                        Reference_Id:{tr.referenceId}
                        <br />
                        Reference_Amount:{tr.referenceAmount}
                      </td>
                      <td>
                        Cancellation_charges:{tr.cancellationCharges}
                        <br />
                        Cancellation_ground:{" "}
                        <span className="font-extrabold text-blue-600">
                          {tr.cancellationGround}
                        </span>
                        <br />
                        Cancellation_remarks:{tr.cancellationRemarks}
                        <br />
                        <br />
                        <div className="text-blue-600">
                          <strong> Select Mode Of Recovery:</strong>
                          <br />
                          <br />
                          <div>
                            {tr.cancellationGround === "Official" && (
                              <label>
                                <input
                                  type="radio"
                                  value="loss"
                                  checked={dts === "loss"}
                                  onChange={handleLossChange}
                                />{" "}
                                Loss To Government Exchequer
                              </label>
                            )}
                          </div>
                          <br />
                          <br />

                          <div>
                            <label>
                              <input
                                type="radio"
                                value="recover"
                                checked={dts === "recover"}
                                onChange={handleRecoverChange}
                              />{" "}
                              Recovery From Pay Of The Officer
                            </label>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </thead>
            </table>
          </div>

          <br />
          <br />
          <div>
            {/* <strong> Select Mode Of Recovery:</strong>
            <br />
            <br />
            <div>
              <label>
                <input
                  type="radio"
                  value="loss"
                  checked={dts === "loss"}
                  onChange={handleLossChange}
                />{" "}
                Loss To Government Exchequer
              </label>
            </div>
            <br />
            <br />

            <div>
              <label>
                <input
                  type="radio"
                  value="recover"
                  checked={dts === "recover"}
                  onChange={handleRecoverChange}
                />{" "}
                Recovery From Pay Of The Officer
              </label>
            </div> */}

            <div>
              <button type="reset" onClick={resetRadioState} />
            </div>
          </div>
          <div align="center">
            {" "}
            {status != null && status.includes("audSubmit") && (
              <button
                className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
                onClick={() => submitManDts(refId)}
              >
                {" "}
                Submit{" "}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(ManualDtsSettlementOption);
