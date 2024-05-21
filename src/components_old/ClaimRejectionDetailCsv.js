/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By :
 */

import { useState, useEffect, useMemo } from "react";
import { withRouter, useParams, useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Table, { SelectColumnFilter } from "../utils/Table"; //

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import addDays from "date-fns/addDays";

const schema = yup.object({});

const ClaimRejectionDetailCsv = () => {
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

  const [data, setData] = useState([]);
  const [serverErrors, setServerErrors] = useState([]);
  const [entity, setEntity] = useState({});
  const [state, setState] = useState({});

  const [me, setMe] = useState("");

  const [loading, setLoading] = useState(true);
  const [fileName, setFileName] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [fromDateStr, setFromDateStr] = useState("");
  const [toDateStr, setToDateStr] = useState("");
  const [lightTheme, setLightTheme] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const onError = (errors, e) => console.log(errors, e);

  //All foreign keys.
  // XXXXXX Add search fields and adjust the values as necessary

  const errorCallback = (err) => {
    //console.log(err);
    setServerErrors(err);
  };

  const handleInputFromDateChange = (e) => {
    console.log(e.target.value);
    //setFromDate(e.target.value);
    setFromDateStr(e.target.value);
  };

  const handleInputToDateChange = (e) => {
    console.log(e.target.value);
    //setToDate(e.target.value);
    setToDateStr(e.target.value);
  };

  const generateCsv = () => {
    setDisabled(true);

    let saving = false;
    //console.log(">>>>>>From Date--:" + fromDate);
    //	console.log(">>>>>>To Date--:" + toDate);
    async function csvFile() {
      if (!saving) console.log(">>>>>>From Date--:" + fromDate);
      console.log(">>>>>>To Date--:" + toDate);
      axios
        .get(`/reports/dak/${fromDateStr}/${toDateStr}/fetchClaimRejectionDetail`)
        .then((response) => {
          console.log(response.data);
          const url = window.open(
            `${process.env.REACT_APP_BASE_URL}/files/${response.data}`
          );
          setDisabled(false);
        })
        .catch((error) => {
          setDisabled(false);
          //console.log(error);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          if (error.response) setServerErrors(error.response.data.error);
          else setServerErrors(error.Error);
        });
    }
    csvFile();

    return () => {
      saving = true;
    };
  };

  return (
    <div
      className={lightTheme ? "theme-light" : "theme-dark"}
      style={disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}
    >
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <main className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className=" ">
            <h1 className="text-xl font-semibold ml-4">Claim Rejection Detail CSV</h1>

            <div>
              <input
                type="date"
                name="FromDate"
                placeholder="dd-mm-yyyy"
                onChange={(e) => handleInputFromDateChange(e)}
                className="form-control py-0"
              />
            </div>

            <div>
              <input
                type="date"
                name="ToDate"
                placeholder="dd-mm-yyyy"
                onChange={(e) => handleInputToDateChange(e)}
                className="form-control py-0"
              />
            </div>

            <div className="pl-1 -ml-2 inputField flex-initial" />
            <button
              type="submit"
              onClick={generateCsv}
              className="w-32 m-0 p-0"
            >
              Generate CSV
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default withRouter(ClaimRejectionDetailCsv);
