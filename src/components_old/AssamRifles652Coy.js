import { withRouter } from "react-router-dom";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

import React from "react";
import Table from "../utils/Table";
import { useForm } from "react-hook-form";
export const AssamRifles652Coy = () => {
  const [claimsData, setClaimsData] = useState([]);
  const [serverError, setServerError] = useState([]);
  const [parameters, setParameters] = useState("");
  const [disabled, setDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const onSubmitHandle = (data) => {
    //console.log("form data ", data);
    //  console.log("Unit Name ", data.unitName);

    let fromDate = new Date(data.fromDateInput);
    let toDate = new Date(data.toDateInput);
    let unitName = "Select";
    // let section = data.userSections;

    let isInvalid = false;

    //console.log("testing", fromDate, toDate);
    if (toDate < fromDate) {
      setError("toDateInput", {
        message: "To Date cannot be less than From Date",
      });
      // console.log("Hello");
      isInvalid = true;
    }

    if (fromDate > new Date()) {
      //  console.log("date greater than today");
      setError("fromDateInput", {
        message: "From Date cannot be a future Date",
      });
      isInvalid = true;
    }

    if (toDate > new Date()) {
      // console.log("date greater than today");
      setError("toDateInput", {
        message: "To Date cannot be a future Date",
      });
      isInvalid = true;
    }

    if (!isInvalid) setParameters(data);
  };

  const onErrorHandle = (event) => {
    //  console.log("errors", errors);
  };

  useEffect(() => {
    async function fetchClaimData(params) {
      setDisabled(true);
      await axios
        .get(
          `/cbillTadaLtcs/aR652Coy?fromDate=${params.fromDateInput}&toDate=${params.toDateInput}&unitName=${params.unitName}`
        )
        .then((response) => {
          setDisabled(false);
          setClaimsData(response.data);
          //  console.log("Response Fetched", response.data);
        })
        .catch((error) => {
          setDisabled(false);
          // console.log(error);
          setServerError(error);
        });
    }
    if (parameters) {
      fetchClaimData(parameters);
    }
  }, [parameters]);

  const columns = useMemo(
    () => [
      {
        Header: "IC Number",
        // Cell: () => <div className="text-sm text-gray-500"><b>{getValues("userSections")}</b></div>,
        Cell: ({ row }) => (
          <div className="text-sm text-gray-500">
            {row.original.icNo + row.original.icCheckDigit}
          </div>
        ),
      },
      {
        Header: "Officer Name",
        accessor: "employee.officerName",
        Cell: ({ row }) => (
          <div className="text-sm text-gray-500">
            {row.original.rankName} {row.original.empName}
          </div>
        ),
      },

      {
        Header: "CDAO Number",
        // Cell: () => <div className="text-sm text-gray-500"><b>{getValues("userSections")}</b></div>,
        Cell: ({ row }) => (
          <div className="text-sm text-gray-500">
            {row.original.cdaoNo + row.original.checkDigit}
          </div>
        ),
      },

      {
        Header: "Claim Type",
        accessor: "typeOfClaim",
      },
      {
        Header: "Claimed Amount",
        accessor: "amountClaimed",
      },
      {
        Header: "Passed Amount",
        accessor: "amountPassed",
      },

      {
        Header: "Advance Amount",
        accessor: "advanceAmount",
      },

      {
        Header: "Adjusted Amount",
        accessor: "adjustmentAmount",
      },
      {
        Header: "Code Head",
        accessor: "codeHead",
      },
      {
        Header: "Demand Date",
        accessor: "settledDemandDate",
      },
      {
        Header: "Demand Unit Name",
        accessor: "settledDemandUnitName",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div
          className="mt-2 ml-4"
          style={disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}
        >
          <h1 className="text-xl font-semibold">Claim Details</h1>
          <div className="flexContainer">
            <div style={{ width: "320px" }}>
              <form
                className="mt-3 p-2 border-1 border-success"
                onSubmit={handleSubmit(onSubmitHandle, onErrorHandle)}
              >
                <label className="py-0 mr-5 text-lg">From date</label>
                {errors.fromDateInput && (
                  <p style={{ color: "red" }}>{errors.fromDateInput.message}</p>
                )}
                <input
                  {...register("fromDateInput", {
                    required: "From Date is required",
                  })}
                  type="date"
                  className="form-control py-0 mr-5 mt-1 text-lg"
                />
                <label className="py-0 mr-5 mt-3 text-lg">To date</label>
                {errors.toDateInput && (
                  <p style={{ color: "red" }}>{errors.toDateInput.message}</p>
                )}
                <input
                  type="date"
                  {...register("toDateInput", {
                    required: "To Date is required",
                  })}
                  className="form-control py-0 mr-5 mt-1 text-lg"
                />
                <div>
                  <label className="text-lg font-large mt-1">Select Unit</label>
                  <select
                    name="unitName"
                    {...register("unitName")}
                    className="form-control px-2 border bg-color-info py-0 mt-1 w-1/2"
                  >
                    <option key={0} value={0}>
                      -select-
                    </option>
                    <option key={1} value="NSG">
                      NSG
                    </option>
                    <option key={2} value="652 COY">
                      652 COY
                    </option>
                    <option key={3} value=" ASSAM RIFLES">
                      ASSAM RIFLES
                    </option>
                  </select>
                </div>
                <div className="text-center">
                  <button type="submit" className="mt-3 bg-green-400 w-1/3">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-2 max-h-1 py-0">
          <Table columns={columns} data={claimsData} className="table-auto" />
        </div>
      </main>
    </div>
  );
};

export default withRouter(AssamRifles652Coy);
