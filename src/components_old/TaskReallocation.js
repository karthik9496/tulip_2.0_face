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

const TaskReallocation = () => {
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
  const [pendingList, setPendingList] = useState([]);
  const [secItem, setSecItem] = useState();
  const [secCodeItems, setSecCodeItems] = useState([]);
  const [secItems, setSecItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mesg, setMesg] = useState();
  const [taskList, setTaskList] = useState([]);
  const [reallotList, setReallotList] = useState([]);
  const [taskNo, setTaskNo] = useState("");
  const [reallocateTaskNo, setReallocateTaskNo] = useState("");
  const [secCode, setSecCode] = useState();
  const [disabled, setDisabled] = useState(false);

  const [key, setKey] = useState("Page1");

  const [page, setPage] = useState(0);

  //pcdao -- for TablePage
  const [pageSize, setPageSize] = useState(0);

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

    async function fetchTaskData() {
      console.log(secItem);
      if (!fetching && secItem)
        //console.log(secId);
        await axios
          .get(`/tasks/${secItem}/taskList`)
          .then((response) => {
            console.log("response section codce >>" + response.data);
            setTaskList(response.data);
            setReallotList(response.data);

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
    fetchTaskData();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secItem]);

  useEffect(() => {
    let fetching = false;
    let unmounted = false;

    async function fetchPendingBillsForTask() {
      console.log(secItem + "-" + taskNo);
      if (!fetching && taskNo && secItem) {
        await axios
          .get(`/tasks/${secItem}/taskNo/${taskNo}`)
          .then((response) => {
            //console.log("response cs list >>" + response.data);
            setPendingList(response.data);

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
    fetchPendingBillsForTask();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secCode, taskNo]);

  const reallocateTask = () => {
    if (disabled) return;
    //	console.log(data);
    console.log("data id--------------" + reallocateTaskNo);
    setDisabled(true);
    axios
      .put(
        `/tasks/${secItem}/reallotedTask/${reallocateTaskNo}/reallocate`,
        pendingList
      )
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
          setMesg(response.data);
          setPendingList([]);
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
    let item = pendingList[index];

    item["select"] = e.target.checked;
    let newData = [...pendingList];
    newData[index] = item;
    setPendingList(newData);
    //console.log(csList);
  };

  const handleSectionChange = (e) => {
    console.log(e.target.selectedIndex + "--" + e.target.value);
    setSecItem(e.target.value);
  };

  const handleSectionCodeChange = (e) => {
    console.log(e.target.selectedIndex + "-->>" + e.target.value);
    setTaskNo(e.target.value);
  };

  const handleReallot = (e) => {
    setReallocateTaskNo(e.target.value);
  };

  const updateCheckBoxAll = (e) => {
    // console.log("..."+e.target.checked+"--"+index);

    let newData = [...pendingList];
    for (var k in newData) {
      newData[k].select = e.target.checked;
    }
    setPendingList(newData);
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

    //pcdao added below method for TablePage
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
                checked={pendingList[row.index]["select"]}
              />
            </div>
          ),
        },
        {
          Header: "Dak Id",
          accessor: "dak",
          Cell: ({ row }) => (
            <div>
              <div>
                <label>{row.original.dak.dakidNo}</label>
              </div>
              <div>
                <label> {row.original.dak.dakType.description}</label>
              </div>
            </div>
          ),
        },
        {
          Header: "CDAONo",
          //pcdao commented out below accessor
          //accessor: "cdaoNo",
          Cell: ({ row }) => (
            <div>
              <div>
                {/* pcdao -- modified below so that cdao no is picked from dak instead of cbill */}
                <label>{row.original.dak.cdaoNo}</label>
              </div>
              <div>
                <label> {row.original.employee.officerName}</label>
              </div>
              <div>
                <label> {row.original.employee.rank.rankName}</label>
              </div>
            </div>
          ),
        },
        {
          Header: "Section",
          accessor: "section",
          Cell: ({ row }) => (
            <div>
              <div>
                <label>{row.original.section.sectionName}</label>
              </div>
              <div>
                <label>Task : {row.original.taskNo}</label>
              </div>
            </div>
          ),
        },

        {
          Header: "Amount",
          accessor: "dak.amount",
        },
      ],
      [pendingList, page, setPage]
    );

    return (
      <div className="min-h-screen bg-green-100 text-gray-700">
        <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">
          <div className="-mt-2 max-h-1 py-0 ml-0">
            <TablePage
              columns={columns}
              data={pendingList}
              newpage={page}
              parentCallback={handleP}
              //pcdao added below two attributes for TablePage
              newPageSize={pageSize}
              parentCallbackPageSize={handlePageSize}
              className="table-auto"
            />

            <div className="mt-2 ml-4">
              <button
                type="button"
                onClick={reallocateTask}
                className="w-24 mb-24 p-0"
              >
                Re-allocate Task
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

        <h1 className="text-xl font-semibold ml-4">Task Reallocation</h1>

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
          <b>Task</b>
          <select
            className="w-22 m-0 p-0"
            disabled={loading}
            value={taskNo}
            onChange={handleSectionCodeChange}
          >
            <option key="0" value={""}>
              --select task No--
            </option>
            {taskList.map((item, index) => (
              <option key={index} value={item.toString()}>
                {" "}
                {item.toString()}{" "}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-2 ml-4">
          <b>Reallocate to </b>
          <select
            className="w-22 m-0 p-0"
            disabled={loading}
            value={reallocateTaskNo}
            onChange={handleReallot}
          >
            <option key="0" value={""}>
              --Reallocate task--
            </option>
            {reallotList.map((item, index) => (
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

export default withRouter(TaskReallocation);
