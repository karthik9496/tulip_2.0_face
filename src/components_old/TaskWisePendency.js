/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By :
 */

import { useState, useEffect, useMemo } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Table, { SelectColumnFilter } from "../utils/Table"; //

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import LiveSearch from "../utils/LiveSearch";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from "date-fns/addDays";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { BasicLoadingIcon } from "../utils/Icons";

const schema = yup.object({});

const TaskWisePendency = () => {
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

  const [taskWiseList, setTaskWiseList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [mesg, setMesg] = useState();

  const [key, setKey] = useState("Page1");

  useEffect(() => {
    let fetching = false;
    let unmounted = false;

    async function fetchData() {
      setLoading(true);
      if (!fetching)
        //console.log(secId);
        await axios
          .get(`/cbillTadaLtcs/twControls/pendency`)
          .then((response) => {
            console.log("response>>" + response.data);
            //setSh3List(response.data);
            setData(response.data);
            setLoading(false);
          })
          .catch((error) => {
            //console.log(error);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            setLoading(false);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
    }
    fetchData();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onError = (errors, e) => console.log(errors, e);

  //All foreign keys.
  // XXXXXX Add search fields and adjust the values as necessary

  const errorCallback = (err) => {
    //console.log(err);
    setServerErrors(err);
  };

  const handleCheckBox = (index) => (e) => {
    console.log(e.target.checked);
    let item = data[index];

    item["select"] = e.target.checked;
    let newData = [...data];
    newData[index] = item;
    setData(newData);
    console.log(data);
  };

  const handleInputChange = (e) => {
    console.log(e.target.value);
    //	console.log("handle input change");
  };
  const createCmpFile = () => {
    console.log(data);
    let saving = false;
    //console.log(id);
    async function cmpGen() {
      if (!saving)
        axios
          .put("/schedule3s/0/generateCmp", data)
          .then((response) => {
            const url = window.open(
              `${process.env.REACT_APP_BASE_URL}/files/${response.data}`
            );
          })
          .catch((error) => {
            //console.log(error);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
    }
    cmpGen();

    return () => {
      saving = true;
    };
  };

  const columns = useMemo(
    () => [
      {
        Header: "Section",
        accessor: "sectionname",
        Filter: SelectColumnFilter,
      },
      {
        Header: "Task",
        accessor: "task",
        Filter: SelectColumnFilter,
      },
      {
        Header: "Usr",
        accessor: "usrName",
      },

      {
        Header: "Bills Pending",
        accessor: "count",
      },
      {
        Header: "Oldest Date",
        accessor: "oldestDate",
      },
    ],
    [data]
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className=" ">
          <h1 className="text-xl font-semibold ml-4">
            TWING Section Task Wise Pendency
          </h1>
        </div>
        {loading ? (
          <div className="flex justify-center items-center fixed top-1/4 w-1/2 z-50">
            <p className="mr-2 text-2xl text-green-600">Fetching Data</p>
            <BasicLoadingIcon className="ml-1 mt-1 h-10 w-10 animate-spin text-green-600" />
          </div>
        ) : (
          <div className="mt-2 max-h-1 py-0 ml-0">
            <Table
              columns={columns}
              data={data}
              page={50}
              className="table-auto"
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default withRouter(TaskWisePendency);
