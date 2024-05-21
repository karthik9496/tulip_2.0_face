import { useState, useEffect, useMemo } from "react";
import { withRouter, useParams, useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useCurrentDateInYYYYMMDD } from "../utils/Hooks";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({});

const Do2WebReportsDownload = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [fromDateStr, setFromDateStr] = useState(useCurrentDateInYYYYMMDD());
  const [toDateStr, setToDateStr] = useState(useCurrentDateInYYYYMMDD());
  const [disabled, setDisabled] = useState(false);
  const [serverErrors, setServerErrors] = useState();

  const handleInputFromDateChange = (e) => {
    setFromDateStr(e.target.value);
  };

  const handleInputToDateChange = (e) => {
    setToDateStr(e.target.value);
  };

  const generateReport = () => {
    setDisabled(true);

    let saving = false;
    axios
      .get(
        `/reports/do2WebUpload/all?fromDateStr=${fromDateStr}&toDateStr=${toDateStr}`
      )
      .then((response) => {
        let fileList = response.data;
        fileList.map((file) =>
          window.open(
            `${process.env.REACT_APP_BASE_URL}/files/${file}?path=/var/springboot/reports/webUpload`
          )
        );
        setDisabled(false);
      })
      .catch((error) => {
        setDisabled(false);
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });

    return () => {
      saving = true;
    };
  };

  return (
    <div style={disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}>
      <div className="min-h-screen max-h-full bg-gray-100 text-gray-900">
        <main
          className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 flex flex-col"
          style={disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}
        >
          <h1 className="text-3xl font-semibold mx-auto">
            Generate Do2 Related Web Reports
          </h1>
          <div className="flex mx-auto ">
            <div className="mt-3 p-2 border-1 border-success rounded-lg bg-green-100">
              <div className="flex justify-center mt-2">
                <div>
                  <label>From Date</label>
                  <input
                    type="date"
                    name="FromDate"
                    placeholder="dd-mm-yyyy"
                    onChange={(e) => handleInputFromDateChange(e)}
                    className="form-control py-0"
                    value={fromDateStr}
                  />
                </div>

                <div>
                  <label>To Date</label>
                  <input
                    type="date"
                    name="ToDate"
                    placeholder="dd-mm-yyyy"
                    onChange={(e) => handleInputToDateChange(e)}
                    className="form-control py-0"
                    value={toDateStr}
                  />
                </div>
              </div>

              <div className="pl-1 -ml-2 inputField flex-initial" />
              <div className="flex justify-center mt-1">
                <button
                  type="submit"
                  onClick={generateReport}
                  className="w-32 mt-4 p-0"
                >
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default withRouter(Do2WebReportsDownload);
