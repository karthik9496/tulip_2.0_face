/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By :
 */

import { useState, useEffect, useRef, useMemo } from "react";
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
//import TablePage from '../utils/TablePage';

import TablePage from "../utils/TablePage";

const schema = yup.object({});

const DpSheetList = () => {
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

  const [serverErrors, setServerErrors] = useState([]);
  const [entity, setEntity] = useState({});
  const [state, setState] = useState({});

  const [secList, setSecList] = useState([]);
  const [csList, setCsList] = useState([]);
  const [secItem, setSecItem] = useState();
  const [secCodeItems, setSecCodeItems] = useState([]);
  const [secItems, setSecItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mesg, setMesg] = useState();
  const [secCodeList, setSecCodeList] = useState([]);
  const [secCode, setSecCode] = useState();
  const [disabled, setDisabled] = useState(false);
  const [pageSize, setPageSize] = useState(0);

  const [key, setKey] = useState("Page1");

  const [page, setPage] = useState(0);

  useEffect(() => {
    let fetching = false;
    let unmounted = false;

    async function fetchUsrSectionData() {
      if (!fetching)
        //console.log(secId);
        await axios
          .get(`/usrs/0/loggedInUsrSections`)
          .then((response) => {
            console.log("response>>" + response.data);
            setSecList(response.data);

            if (!unmounted) {
              setSecItems(
                response.data.map(({ id, sectionName }) => ({
                  id: id,
                  label: sectionName,
                }))
              );
              setLoading(false);
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
    fetchUsrSectionData();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let fetching = false;
    let unmounted = false;

    async function fetchSectionCodeData() {
      console.log(secItem);
      if (!fetching && secItem)
        //console.log(secId);
        await axios
          .get(`/sections/${secItem}/pmSectionCodes`)
          .then((response) => {
            console.log("response section codce >>" + response.data);
            setSecCodeList(response.data);

            if (!unmounted) {
              setLoading(false);
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
    fetchSectionCodeData();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secItem]);

  useEffect(() => {
    let fetching = false;
    let unmounted = false;

    async function fetchCsData() {
      console.log(secCode + "-" + secItem);
      if (!fetching && secCode && secItem) {
        await axios
          .get(`/sections/${secItem}/pmSection/${secCode}`)
          .then((response) => {
            //console.log("response cs list >>" + response.data);
            setCsList(response.data);

            if (!unmounted) {
              setLoading(false);
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
    }
    fetchCsData();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secCode, secItem]);

  const generateDps = async () => {
    if (disabled) return;
    //	console.log(data);
    //console.log("data id--------------"+data.id);
    setDisabled(true);
  	await axios
      .put(`/chequeSlips/${secCode}/dpSheet`, csList)
      .then((response) => {
        console.log(
          "reponse status--------------" +
            response.status +
            "--" +
            response.statusText +
            "----" +
            "-h--" +
            response.headers +
            "--" +
            response.data
        );
        if (response.status === 200) {
          setMesg(response.data[1]);
          setCsList([]);
          const url = window.open(
            `${process.env.REACT_APP_BASE_URL}/files/${response.data[0]}`
          );
          //history.push("/daks/view/"+response.data);
          //history.replace({pathname:'/daks/new/'+response.data});
        }
      })
      .catch((error) => {
        //console.log(error.response.data);
        //console.log("response--------"+error.response.status);
        //if(error.response.status!==200)
        //history.push("/chequeSlips/dpsList");
        //console.log(error.response.headers);
        if (error.response) setServerErrors(error.response.data);
        else setServerErrors(error);
      });

    //history.push("/daks");
  };

  const onError = (errors, e) => console.log(errors, e);

  //All foreign keys.
  // XXXXXX Add search fields and adjust the values as necessary

  const errorCallback = (err) => {
    //console.log(err);
    setServerErrors(err);
  };

  const handleCheckBox = (index) => (e) => {
    //console.log(Table.page)
    console.log(e.target.checked + "--" + index);
    //csList[index].select=e.target.checked;

    console.log(e.target.checked);
    let item = csList[index];

    item["select"] = e.target.checked;
    let newData = [...csList];
    newData[index] = item;
    setCsList(newData);
    //console.log(csList);
  };

  const handleSectionChange = (e) => {
    console.log(e.target.selectedIndex + "--" + e.target.value);
    setSecItem(e.target.value);
  };

  const handleSectionCodeChange = (e) => {
    console.log(e.target.selectedIndex + "-->>" + e.target.value);
    setSecCode(e.target.value);
  };

  const updateCheckBoxAll = (e) => {
    // console.log("..."+e.target.checked+"--"+index);

    let newData = [...csList];
    for (var k in newData) {
      newData[k].select = e.target.checked;
    }
    setCsList(newData);
  };
  //	const handlePage = (pp)=>{
  //	console.log(pp);
  //	setPage(pp);
  //	}

  const handleInputChange = (e) => {
    console.log(e.target.value);
    //	console.log("handle input change");
  };

  const callback = (e) => {
    console.log(e);
  };

  const ShowDps = () => {
    const handleP = (pp) => {
      console.log(pp);
      setPage(pp);
    };

    const handlePageSize = (pp) => {
      console.log(pp);
      setPageSize(pp);
    };

    const columns = useMemo(
      () => [
        {
          Header: <input type="checkbox" onChange={updateCheckBoxAll} />,
          accessor: "select",
          Cell: ({ row }) => (
            <div>
              <input
                type="checkbox"
                onChange={handleCheckBox(row.index)}
                checked={csList[row.index]["select"]}
              />
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
                <label> {row.original.me}</label>
              </div>
            </div>
          ),
        },

        {
          Header: "Beneficiary",
          accessor: "beneficiary",
          Cell: ({ row }) => (
            <div>
              <div>
                <label>{row.original.beneficiary}</label>
              </div>
              <div>
                <label>
                  {row.original.rank} {row.original.cdaoNo}
                </label>
              </div>
            </div>
          ),
        },
        {
          Header: "Amount",
          accessor: "amount",
        },
        {
          Header: "ifsc",
          accessor: "ifsc",
          Cell: ({ row }) => (
            <div>
              <div>
                <label>IFSC : {row.original.ifsc}</label>
              </div>
              <div>
                <label>Bank Ac : {row.original.bankAccount}</label>
              </div>
            </div>
          ),
        },
      ],
      [csList, page, setPage]
    );

    return (
      <div className="min-h-screen bg-green-100 text-gray-700">
        <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">
          <div className="-mt-2 max-h-1 py-0 ml-0">
            <TablePage
              columns={columns}
              data={csList}
              newpage={page}
              parentCallback={handleP}
              newPageSize={pageSize}
              parentCallbackPageSize={handlePageSize}
              className="table-auto"
            />

            <div className="mt-2 ml-4">
              <button
                type="button"
                onClick={generateDps}
                className="w-24 mb-24 p-0"
              >
                Generate DP Sheet
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="text-red-500">{serverErrors}</div>
        <div className="text-blue-500">{mesg}</div>

        <h1 className="text-xl font-semibold ml-4">DP Sheet Generation</h1>

        <div className="mt-2 ml-4">
          <b>Section</b>

          <select
            className="w-22 m-0 p-0"
            disabled={loading}
            value={secItem}
            onChange={handleSectionChange}
          >
            <option key="0" value={""}>
              --select section--
            </option>
            {secItems.map(({ id, label }) => (
              <option key={id} value={id}>
                {" "}
                {label}{" "}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-2 ml-4">
          <b>PM Section</b>
          <select
            className="w-22 m-0 p-0"
            disabled={loading}
            value={secCode}
            onChange={handleSectionCodeChange}
          >
            <option key="0" value={""}>
              --select pm section--
            </option>
            {secCodeList.map((item, index) => (
              <option key={index} value={item.toString()}>
                {" "}
                {item.toString()}{" "}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-2 max-h-1 py-0 ml-0">
          <ShowDps />
        </div>
      </div>
    </div>
  );
};

export default withRouter(DpSheetList);
