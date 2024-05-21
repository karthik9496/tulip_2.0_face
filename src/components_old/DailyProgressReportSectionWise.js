import { withRouter } from "react-router-dom";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

import React from "react";
import Table, { SelectColumnFilter } from "../utils/Table";
import { useForm } from "react-hook-form";
import { BasicLoadingIcon } from "../utils/Icons";
import { useCurrentDateInYYYYMMDD } from "../utils/Hooks";

export const DPRReports = () => {
  const [dprData, setDprData] = useState([]);
  const [serverError, setServerError] = useState([]);
  const [parameters, setParameters] = useState("");
  const [userSections, setUserSections] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm({
    defaultValues: {
      fromDateInput: useCurrentDateInYYYYMMDD(),
      toDateInput: useCurrentDateInYYYYMMDD(),
    },
  });

  const onSubmitHandle = (data) => {
    console.log("form data ", data);

    let fromDate = new Date(data.fromDateInput);
    let toDate = new Date(data.toDateInput);
    let section = data.userSections;

    let isInvalid = false;

    console.log("testing", fromDate, toDate, section);
    if (toDate < fromDate) {
      setError("toDateInput", {
        message: "To Date cannot be less than From Date",
      });
      console.log("Hello");
      isInvalid = true;
    }

    if (fromDate > new Date()) {
      console.log("date greater than today");
      setError("fromDateInput", {
        message: "From Date cannot be a future Date",
      });
      isInvalid = true;
    }

    if (toDate > new Date()) {
      console.log("date greater than today");
      setError("toDateInput", {
        message: "To Date cannot be a future Date",
      });
      isInvalid = true;
    }

    if (!isInvalid) setParameters(data);
  };

  const onErrorHandle = (event) => {
    console.log("errors", errors);
  };

  useEffect(async () => {
    await axios
      .get("/usrs/0/loggedInUsrSections")
      .then((response) => {
        console.log("list of sections " + response.data);
        //setUserSections(response.data.sectionList);
        setUserSections(response.data);
      })
      .catch((error) => {
        console.log(error);
        setServerError(error);
      });
  }, []);

  useEffect(() => {
    async function fetchDpr(params) {
      setDisabled(true);
      await axios
        .get(
          `/reports/dpr/sectionWise?fromDate=${params.fromDateInput}&toDate=${params.toDateInput}`
        )
        .then((response) => {
          setDisabled(false);
          setDprData(response.data);
        })
        .catch((error) => {
          setDisabled(false);
          setServerError(error);
        });
    }
    if (parameters) {
      fetchDpr(parameters);
    }
  }, [parameters]);

  const columns = useMemo(
    () => [
      {
        Header: "Section Name",
        accessor: "sectionname",
        Filter: SelectColumnFilter,
        // Cell: () => <div className="text-sm text-gray-500"><b>{getValues("userSections")}</b></div>,
        Cell: ({ row }) => (
          <div className="text-sm text-gray-500">
            {row.original.sectionname}
          </div>
        ),
      },
      /*  {
        Header: "Task Number",
        Cell: ({ row }) => (
          <div className="text-sm text-gray-500">
            {row.original.taskNumber}
          </div>
        ),
      },{
        Header: "Task User",
        Cell: ({ row }) => (
          <div className="text-sm text-gray-500">
            {row.original.taskUser}
          </div>
        ),
      }, */
      {
        Header: "Opening Balance",
        accessor: "openingBalance",
      },
      {
        Header: "Receipt",
        accessor: "receipts",
      },

      {
        Header: "Total",
        Cell: ({ row }) => (
          <div className="text-sm text-gray-500">
            {row.original.openingBalance + row.original.receipts}
          </div>
        ),
      },

      {
        Header: "Disposal",
        accessor: "disposal",
      },
      {
        Header: "Closing Balance",
        accessor: "closingBalance",
      },
      {
        Header: "Oldest Date",
        Cell: ({ row }) => {
          let oldestDt = "";
          if (row.original.oldestDate) {
            let splittedDate = row.original.oldestDate.split("-");
            oldestDt =
              splittedDate[2] + "/" + splittedDate[1] + "/" + splittedDate[0];
          }
          return <div className="text-sm text-gray-500">{oldestDt}</div>;
        },
      },
    ],
    []
  );

  return (
    <div
      className="min-h-screen bg-gray-100 text-gray-900"
      style={disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}
    >
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-2 ml-4">
          <h1 className="text-xl font-semibold">DPR Reports</h1>
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
                {/* <label className="text-lg font-large mt-1">
                  Select Section
                </label>
                <select
                  {...register("userSections")}
                  className="mt-1 py-2 px-2 border bg-color-info py-0 mt-1 w-1/2"
                >
                  <option key={0} value={0}>
                    -select-
                  </option>
                  <option key={2000} value={2000}>
                    All Sections
                  </option>
                  {userSections.map((item) => {
                    return (
                      <option key={item.id} id={item.id} value={item.id}>
                        {item.sectionName}
                      </option>
                    );
                  })}
                </select> */}
                <div className="text-center">
                  <button
                    type="submit"
                    className={`w-40 ml-2 p-0 ${disabled ? "bg-blue-700" : ""}`}
                  >
                    {!disabled ? (
                      "Generate DPR"
                    ) : (
                      <>
                        Generating DPR
                        <BasicLoadingIcon className="inline ml-1 -mt-1 h-5 w-5 justify-center animate-spin" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          {console.log(userSections)}
        </div>
        <hr className="mt-8" />
        <div className="mt-2 max-h-1 py-0">
          <Table columns={columns} data={dprData} className="table-auto" />
        </div>
      </main>
    </div>
  );
};

export default withRouter(DPRReports);
