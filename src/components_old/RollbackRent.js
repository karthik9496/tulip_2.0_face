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

const RollbackRent = () => {
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
  const [mesg, setMesg] = useState("");
  const [inputText, setInputText] = useState('');
  const [dakId, setDakId] = useState("");
  const [rollBackMesg, setRollBackMesg] = useState("");

  const [loading, setLoading] = useState(true);
  const [fileName, setFileName] = useState("");
  const [cdaoNo, setCdaoNo] = useState("");
  const [single, setSingle] = useState("");
  const [rentType, setRentType] = useState("");
  const [reportType, setReportType] = useState("");
  const [option, setOption] = useState("");


  const [key, setKey] = useState("Page1");



  const onError = (errors, e) => console.log(errors, e);

  //All foreign keys.
  // XXXXXX Add search fields and adjust the values as necessary

  const errorCallback = (err) => {
    //console.log(err);
    setServerErrors(err);
  };

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setFileName(e.target.value);
  };
  const handleCdaoNoInputChange = (e) => {
    console.log(e.target.value);
    setCdaoNo(e.target.value);
  };
  const handleRentTypeInputChange = (e) => {
    console.log(e.target.value);
    setRentType(e.target.value);
  };
  const handleMesgChange = (e) => {
    console.log(e.target.value);
    setRollBackMesg(e.target.value);
  };

  const handleFileChange = (event) => {
    setReportType(event.target.value)
    setOption("file");
  }

  const handleSingleChange = (event) => {
    setReportType(event.target.value)
    setOption("single");
  }

  const rollback = () => {
    let saving = false;

    async function rollbackTrans() {
      if (option.startsWith("file")) {

        axios
          .get(`/initialOccupationReturnTransactions/rollback/${rentType}/${fileName}`)
          .then((response) => {
            setMesg(response.data);
          })
          .catch((error) => {
            console.log(error);
            //	console.log(error.response.status);
            //	console.log(error.response.headers);
            if (error.response)
              setServerErrors(error.response.data.error);
            else
              setServerErrors(error.Error);
          })
      }
      if (option.startsWith("single")) {
        axios
          .get(`/initialOccupationReturnTransactions/rollback/${single}/${rentType}`)
          .then((response) => {
            setMesg(response.data);
          }).catch((error) => {
            //console.log(error);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
      }
    }
    rollbackTrans();

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
    <div className="max-w-2xl mx-auto ">
      <div className="w-full w-2xl  mx-auto ">
        <div className="w-full w-2xl  mx-auto">
          {mesg}

          <h1 className="text-xl font-semibold ml-4">Rent Rollback</h1>
          <br />
          <div>
            <div className="grid grid-cols-2 gap-6">

              <div>
                <label>
                  <input type="radio" value="file" checked={reportType === 'file'} onChange={handleFileChange} /> Roll Back Full File
                </label>
              </div>




              <div>
                <label>
                  <input type="radio" value="single" checked={reportType === 'single'} onChange={handleSingleChange} /> Roll Back Single Cdao No
                </label>
              </div>




            </div>
            {option === 'file' &&
              <div>
                <input
                  type="text"
                  name="fileName"
                  placeholder="Upload File Name"
                  onChange={(e) => handleInputChange(e)}
                  className="form-control py-0"
                />
              </div>
            }
            <br />
            <br />
            {option === 'single' &&
              <div>
                <input
                  type="text"
                  name="cdaoNo"
                  placeholder="cdaoNo"
                  onChange={(e) => handleCdaoNoInputChange(e)}
                  className="form-control py-0"
                />
              </div>
            }

            <div>
              <label>Rent Type</label>
              <select name="rentType" placeholder="rent type" className="form-control py-0"
                onBlur={e => setInputText(e.target.value)} onChange={handleRentTypeInputChange} >
                <option value="select">--Select--</option>
                <option key="1" value="occ">Occupation</option>
                <option key="2" value="vac">Vacation</option>
                <option key="3" value="rev">Revision</option>
              </select>
            </div>
            <div>
              <h3 className="mb-2 text-red-500">
                Note: If the full input file has to be roll backed --give both fileName and rentType. <br></br>
                If any specific cdaoNo has to be roll backed -- give both cdaoNo and rentType.<br></br>
              </h3>
              <textarea
                rows={3}
                placeholder="Rollback reason"
                onChange={(e) => handleMesgChange(e)}
                className="form-control py-0"
              />
            </div>
            <div>
              <button type="submit" onClick={rollback} className="w-24 m-0 p-0">
                Rollback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(RollbackRent);
