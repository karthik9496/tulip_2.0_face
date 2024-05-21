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

const PrintReq = () => {
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
  const [fileDate, setFileDate] = useState("");
  const [dakId, setDakId] = useState("");

  const [loading, setLoading] = useState(true);
  const [fileName, setFileName] = useState("");

  const [key, setKey] = useState("Page1");

  useEffect(() => {
    let fetching = false;
    let unmounted = false;

    async function fetchData() {
      console.log(fileDate.length);

      if (!fetching && fileDate && fileDate.length > 10)
        await axios
          .get(`/cbillTadaLtcInputs/advreq/${fileDate}`)
          .then((response) => {
            console.log("response>>" + response.data);
            //setSh3List(response.data);
            setData(response.data);
          })
          .catch((error) => {
            //console.log(error);
            //console.log(error.response.status);
            //console.log(error.response.headers);
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
  }, [fileDate]);

  const onError = (errors, e) => console.log(errors, e);

  //All foreign keys.
  // XXXXXX Add search fields and adjust the values as necessary

  const errorCallback = (err) => {
    //console.log(err);
    setServerErrors(err);
  };

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setFileDate(e.target.value);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Mail Id",
        accessor: "mailCtrlId",
      },

      {
        Header: "Dak Id",
        accessor: "dak.dakidNo",
      },

      {
        Header: "Cdao No",
        accessor: "cdaoNo",
      },

      {
        Header: "Officer Name",
        accessor: "officer_name",
      },

      {
        Header: "Advance Type",
        accessor: "advanceType",
      },

      /*
		{
			Header: "Login Name",
			accessor: 'loginName',
			Filter: SelectColumnFilter,  // new
			filter: 'includes',
		},
		*/
    ],
    [data]
  );

  const generatePdf = () => {
    let saving = false;
    console.log(fileDate);
    async function genPdf() {
      if (fileDate)
        axios
          .get(`/cbillTadaLtcInputs/printReq/${fileDate}`)
          .then((response) => {
            console.log(response.data);
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
    genPdf();

    return () => {
      saving = true;
    };
  };

  const download = () => {
    console.log(fileName);
    setFileName(dakId + ".pdf");
    axios({
      url: `${process.env.REACT_APP_BASE_URL}/files/` + fileName, //XXXXXXXX localhost
      method: "GET",
      responseType: "blob", // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className=" ">
          <h1 className="text-xl font-semibold ml-4">
            Print Requisition Advance
          </h1>
          <div className="flexContainer">
            <input
              type="text"
              name="search"
              placeholder="file name"
              onChange={(e) => handleInputChange(e)}
              className="pl-2 -ml-2 inputField flex-initial"
            />
            <button
              type="submit"
              onClick={generatePdf}
              className="w-32 m-0 p-0"
            >
              Generate Pdf
            </button>
          </div>
        </div>
        <div className="-mt-2 max-h-1 py-0">
          <Table columns={columns} data={data} className="table-auto" />
        </div>
      </main>
    </div>
  );
};

export default withRouter(PrintReq);
