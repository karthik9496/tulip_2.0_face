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
import Table, { SelectColumnFilter } from "../utils/Table";
import { BasicLoadingIcon } from "../utils/Icons";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import addDays from "date-fns/addDays";

const schema = yup.object({});

const WebReports = () => {
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
        .get(`/reports/dak/${fromDateStr}/${toDateStr}/webReports`)
        .then((response) => {
          console.log("List of CSV Files", response.data);
          let fileList = response.data;
          /* const url = window.open(
            `${process.env.REACT_APP_BASE_URL}/files/${response.data}`
          ); */
          fileList.map((file) =>
            window.open(`${process.env.REACT_APP_BASE_URL}/files/${file}`)
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
    <div style={disabled ? { pointerEvents: "none", opacity: "0.6" } : {}}>
      <div className="min-h-screen bg-gray-100 text-gray-900 pt-12 pl-6">
        <main className="max-w-xl pl-6 ">
          <div className="flex flex-col my-2 shadow px-4 pb-4 space-y-2 justify-start max-w-xs border-2 border-green-500">
            <h1 className="text-xl font-semibold mt-4 mb-2 text-green-700">
              Download Website CSV
            </h1>

            <div>
              <input
                type="date"
                name="FromDate"
                placeholder="dd-mm-yyyy"
                onChange={(e) => handleInputFromDateChange(e)}
                className="form-control py-1 my-2 shadow border-2"
              />
            </div>

            <div>
              <input
                type="date"
                name="ToDate"
                placeholder="dd-mm-yyyy"
                onChange={(e) => handleInputToDateChange(e)}
                className="form-control py-1 my-2 shadow border-2"
              />
            </div>

            <div className="" />
            <button
              type="submit"
              onClick={generateCsv}
              className="ml-2 p-1 bg-gradient-to-r from-blue-500 to-green-500  w-32"
            >
              Generate CSV
            </button>
          </div>
          {disabled ? (
            <div className="flex justify-center items-center fixed top-1/4 w-full z-50">
              <p className="mr-2 text-2xl text-green-700 font-bold">
                Generating File
              </p>
              <BasicLoadingIcon className="ml-1 mt-1 h-10 w-10 animate-spin text-green-700" />
            </div>
          ) : (
            ""
          )}
        </main>
      </div>
    </div>
  );
};

export default withRouter(WebReports);
