/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By :
 */

import { useState, useEffect, useMemo } from "react";
import {
  withRouter,
  useParams,
  useHistory,
  useLocation,
} from "react-router-dom";
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
import Table from "../utils/Table";

const schema = yup.object({});

const NdcEdit = () => {
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

  let history = useHistory();
  const [serverErrors, setServerErrors] = useState([]);
  const [entity, setEntity] = useState({});
  const [state, setState] = useState({});
  const [key, setKey] = useState("page1");
  const [dakId, setDakId] = useState("");
  const [secName, setSecName] = useState("");
  const [drData, setDrData] = useState([]);
  const [cbillData, setCbillData] = useState([]);
  const [omroData, setOmroData] = useState([]);

  //pcdao 29092022 ndc calculation correction
  const [mesg, setMesg] = useState();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    console.log(id);
    if (id !== "new") {
      async function fetchData() {
        let record = "";
        await axios
          .get("/ndcs/" + id)
          .then((response) => {
            record = response.data;
            setDakId(record["dak"].dakidNo);
            setSecName(record["section"].sectionName);
            const fields = [
              "id",
              "dak",
              "auditorDate",
              "aaoDate",
              "aoDate",
              "approved",
              "section",
              "employee",
              "cdaoNo",
              "recordStatus",
              "checkDigit",
              "amountOutstanding",
              "ndcDate",
              "letterNo",
              "me",
              "remarks",
              "reason",
            ];
            fields.forEach((field) => setValue(field, record[field]));

            //pcdao 29092022 ndc calculation correction
            if (record["amountOutstanding"] < 0) {
              setMesg(
                "Outstanding Amount Less than 0. Please settle cancelled DTS advances and then process NDC."
              );
              setDisabled(true);
            }
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
    async function fetchDrData() {
      //console.log("loading dis " + dakId);
      if (!fetching)
        await axios
          .get(`/ndcs/pendingDr/${id}`)
          .then((response) => {
            //console.log("disallowance code data >>>> "+response.data);
            console.log(response.data);
            setDrData(response.data);
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
  }, [id]);

  useEffect(() => {
    let fetching = false;
    let unmounted = false;
    async function fetchCbillData() {
      //console.log("loading dis " + dakId);
      if (!fetching)
        await axios
          .get(`/ndcs/pendingCbill/${id}`)
          .then((response) => {
            //console.log("disallowance code data >>>> "+response.data);

            setCbillData(response.data);
          })
          .catch((error) => {
            //console.log(error);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
    }
    fetchCbillData();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    let fetching = false;
    let unmounted = false;
    async function fetchOmroData() {
      //console.log("loading dis " + dakId);
      if (!fetching)
        await axios
          .get(`/ndcs/pendingOmro/${id}`)
          .then((response) => {
            //console.log("disallowance code data >>>> "+response.data);

            setOmroData(response.data);
          })
          .catch((error) => {
            //console.log(error);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
    }
    fetchOmroData();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const ShowDrData = () => {
    const columns = useMemo(
      () => [
        {
          Header: "DakId",
          accessor: "dakidNo",
        },
        {
          Header: "DemandType",
          accessor: "demandType",
        },
        {
          Header: "Origin",
          accessor: "Origin",
        },

        {
          Header: "Amount",
          accessor: "amount",
        },
        {
          Header: "Demand Date",
          accessor: "demandDate",
        },
        {
          Header: "Journey Date",
          accessor: "journeyStartDate",
          Cell: ({ row }) => (
            <div>
              <div>
                {row.original.journeyStartDate && (
                  <label>Start Date : {row.original.journeyStartDate}</label>
                )}
              </div>
              <div>
                {row.original.journeyEndDate && (
                  <label>End Date : {row.original.journeyEndDate}</label>
                )}
              </div>
              <div>
                {row.original.stationFrom && (
                  <label>From : {row.original.stationFrom}</label>
                )}
              </div>
              <div>
                {row.original.stationTo && (
                  <label>To : {row.original.stationTo}</label>
                )}
              </div>
            </div>
          ),
        },
      ],
      [drData]
    );

    return (
      <div className="h-96 bg-green-100 text-gray-900">
        <main className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">
          <div className=" "></div>
          <div className="-mt-2 max-h-0 py-0 ml-0">
            <Table columns={columns} data={drData} className="table-auto" />
          </div>
        </main>
      </div>
    );
  };

  const ShowCbillData = () => {
    const columns = useMemo(
      () => [
        {
          Header: "CDAO No",
          accessor: "cdaoNo",
        },
        {
          Header: "DakId",
          accessor: "dakId",
        },

        {
          Header: "Amount",
          accessor: "amountClaimed",
        },

        {
          Header: "Journey Date",
          accessor: "journeyStartDate",
          Cell: ({ row }) => (
            <div>
              <div>
                {row.original.journeyStartDate && (
                  <label>Start Date : {row.original.journeyStartDate}</label>
                )}
              </div>
              <div>
                {row.original.journeyEndDate && (
                  <label>End Date : {row.original.journeyEndDate}</label>
                )}
              </div>
              <div>
                {row.original.journeyStationFrom && (
                  <label>From : {row.original.journeyStationFrom}</label>
                )}
              </div>
              <div>
                {row.original.journeyStationTo && (
                  <label>To : {row.original.journeyStationTo}</label>
                )}
              </div>
            </div>
          ),
        },
        {
          Header: "Record Status",
          accessor: "recordStatus",
        },
      ],
      [cbillData]
    );

    return (
      <div className="h-96 bg-green-100 text-gray-900">
        <main className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">
          <div className=" "></div>
          <div className="-mt-2 max-h-0 py-0 ml-0">
            <Table columns={columns} data={cbillData} className="table-auto" />
          </div>
        </main>
      </div>
    );
  };

  const ShowMroData = () => {
    const columns = useMemo(
      () => [
        {
          Header: "CDAO No",
          accessor: "cdaoNo",
        },
        {
          Header: "DakId",
          accessor: "dakId",
        },

        {
          Header: "Amount",
          accessor: "amount",
        },

        {
          Header: "Record Status",
          accessor: "recordStatus",
        },
      ],
      [omroData]
    );

    return (
      <div className="h-96 bg-green-100 text-gray-900">
        <main className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">
          <div className=" "></div>
          <div className="-mt-2 max-h-0 py-0 ml-0">
            <Table columns={columns} data={omroData} className="table-auto" />
          </div>
        </main>
      </div>
    );
  };

  const onSubmit = (data, event) => {
    event.preventDefault();
    console.log(data);
    if (data.id) {
      axios
        .put("/ndcs/" + data.id, data)
        .then((response) => {
          if (
            response.status === 200 &&
            response.data.recordStatus != null &&
            response.data.recordStatus === "V"
          )
            history.push("/ndcs");
          else setMesg(response.data.reason);
        })
        .catch((error) => {
          //console.log(error.response.data);
          console.log(error.response.status);
          //console.log(error.response.headers);
          setServerErrors(error.response.data);
        });
    }
  };

  const onError = (errors, e) => console.log(errors, e);

  //All foreign keys.
  // XXXXXX Add search fields and adjust the values as necessary
  const parentData = {
    employee: {
      title: "Employee",
      url: "employees",
      searchList: ["cdaoNo", "officerName"], //XXXXXXXXX Add search fields here and also in the corresponding repository
      fkEntity: "employee",
    },
  };

  //Callback for child components (Foreign Keys)
  const callback = (childData) => {
    //console.log("Parent Callback");
    setEntity((prev) => ({ ...prev, [childData.fk]: childData.entity }));
    setValue(childData.fk, childData.entity);
    //console.log(errors);
    clearErrors(childData.fk);
  };

  const errorCallback = (err) => {
    //console.log(err);
    setServerErrors(err);
  };

  const handleInputChange = (e) => {
    //console.log(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="max-w-5xl mx-auto pb-2 px-4 sm:px-6 lg:px-8 pt-4">
        <form className="pb-2" onSubmit={handleSubmit(onSubmit, onError)}>
          <h1>{id === "new" ? "Add" : "Edit"} NDC </h1>
          <div className="text-red-500">{serverErrors}</div>
          {/* pcdao 29092022 ndc calculation correction */}
          <div className="text-xl text-red-500">{mesg}</div>

          <div className="grid grid-cols-2 gap-0">
            <div>
              <label>Dak Id</label>
              <input
                type="text"
                name="dakIdNo"
                value={dakId}
                readOnly
                className="form-control py-0"
              />
            </div>
            <div>
              <label>Section</label>
              <input
                type="text"
                name="secName"
                value={secName}
                readOnly
                className="form-control py-0"
              />
            </div>
            <div>
              <LiveSearch
                name="employee"
                onChange={handleInputChange}
                parentData={parentData.employee}
                parentCallback={callback}
                fkEntity={entity.employee}
                errCallback={errorCallback}
              />
              <div className="text-red-500 ">{errors.employee?.message}</div>
            </div>

            <div>
              <label>Ndc Date</label>
              <input
                type="date"
                name="ndcDate"
                {...register("ndcDate")}
                className="form-control py-0"
              />
              <div className="text-red-500">{errors.ndcDate?.message}</div>
            </div>
            <div>
              <label>Amount Outstanding</label>
              <input
                type="text"
                name="amountOutstanding"
                {...register("amountOutstanding")}
                readOnly
                className="form-control py-0"
              />
            </div>

            <div>
              <label>Letter No</label>
              <input
                type="text"
                name="letterNo"
                {...register("letterNo")}
                className="form-control py-0"
              />
            </div>
            <div>
              <label>Remarks</label>
              <textarea
                type="text"
                name="remarks"
                {...register("remarks")}
                className="form-control py-0"
              />
            </div>
          </div>

          <div className="container">
            <h3 className="p-3 text-center">Outstanding Demands</h3>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th width="300">DakId/WebId</th>
                  <th>Journey Details</th>
                  <th>Demand</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {drData &&
                  drData.map((dr) => (
                    <tr key={dr.dakidNo}>
                      <td>
                        DakId : {dr.dakidNo} <br />
                        Adv Id : {dr.advId}
                        <br />
                        Dts Id : {dr.transId}
                      </td>
                      <td>
                        {dr.stationFrom}
                        <br />
                        {dr.stationTo}
                        <br />
                        {dr.journeyStartDate}
                        <br />
                        {dr.journeyEndDate}
                      </td>
                      <td>
                        {dr.demandDate}
                        <br />
                        {dr.demandType}
                        <br />
                        {dr.origin}
                        <br />
                        {dr.demandMonth}
                      </td>
                      <td>
                        {dr.amount}
                        <br />
                        Penal Amt : {dr.penalAdrAmt}
                        <br /> Penal Days : {dr.penalDays}
                      </td>
                    </tr>
                  ))}
                {drData.length === 0 && (
                  <tr>
                    <td colspan="4" align="center">
                      No outstanding demands in demand register
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="container">
            <h3 className="p-3 text-center">Outstanding Bills</h3>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th width="300">DakId/WebId</th>
                  <th>Journey Details</th>
                  <th>Amt Claimed</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {cbillData &&
                  cbillData.map((cb) => (
                    <tr key={cb.dak.dakidNo}>
                      <td>
                        DakId : {cb.dak.dakidNo} <br />
                        Adv Id : {cb.advId}
                        <br />
                        Dts Id : {cb.transId}
                        <br /> Sec : {cb.dak.section.sectionName}
                      </td>
                      <td>
                        DakType : {cb.dak.dakType.description}
                        <br />
                        From : {cb.journeyStationFrom}
                        <br />
                        To : {cb.journeyStationTo}
                        <br />
                        From Date : {cb.journeyStartDate}
                        <br />
                        To Date :{cb.journeyEndDate}
                      </td>
                      <td>{cb.amountClaimed}</td>
                      <td>{cb.recordStatus}</td>
                    </tr>
                  ))}
                {cbillData.length === 0 && (
                  <tr>
                    <td colspan="4" align="center">
                      No outstanding bills
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="container">
            <h3 className="p-3 text-center">Outstanding Omro</h3>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th width="300">DakId</th>
                  <th>Min No/Date</th>
                  <th>Remittance</th>
                  <th>Record Status</th>
                </tr>
              </thead>

              <tbody>
                {omroData &&
                  omroData.map((mro) => (
                    <tr key={mro.dak.dakidNo}>
                      <td>
                        DakId : {mro.dak.dakidNo}
                        <br /> Sec : {mro.dak.section.sectionName}
                      </td>
                      <td>
                        {mro.minNo}
                        <br />
                        {mro.mroDate}
                      </td>
                      <td>{mro.remittanceDetail}</td>
                      <td>{mro.recordStatus}</td>
                    </tr>
                  ))}

                {omroData.length === 0 && (
                  <tr>
                    <td colspan="4" align="center">
                      No pending Omros
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {!disabled && (
            <div className="px-8">
              <button type="submit">Save</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default withRouter(NdcEdit);
