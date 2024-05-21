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

const Rollback = () => {
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
  const [dakId, setDakId] = useState("");
  const [rollBackMesg, setRollBackMesg] = useState("");

  const [loading, setLoading] = useState(true);
  const [fileName, setFileName] = useState("");

  const [key, setKey] = useState("Page1");

  useEffect(() => {
    let fetching = false;
    let unmounted = false;

    async function fetchData() {
      if (!fetching)
        //console.log(secId);
        await axios
          .get(`/pms?search='PrintPmCs'`)
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
  }, []);

  const onError = (errors, e) => console.log(errors, e);

  //All foreign keys.
  // XXXXXX Add search fields and adjust the values as necessary

  const errorCallback = (err) => {
    //console.log(err);
    setServerErrors(err);
  };

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setDakId(e.target.value);
  };
  const handleMesgChange = (e) => {
    console.log(e.target.value);
    setRollBackMesg(e.target.value);
  };

  const rollback = () => {
    let saving = false;
    console.log(dakId);
    async function rollbackTrans() {
      if (!saving)
        axios
          .get(`/pms/${dakId}/rollback?rollBackMesg=` + rollBackMesg)
          .then((response) => {
            setMesg(response.data);
          })
          .catch((error) => {
            //console.log(error);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
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
    <div className="max-w-xl mx-auto ">
      <div className="w-full w-3/4  mx-auto ">
        <div className="w-full w-3/4  mx-auto">
          {mesg}

          <h1 className="text-xl font-semibold ml-4">Rollback</h1>
          <div>
            <div>
              <input
                type="text"
                name="search"
                placeholder="DakId No"
                onChange={(e) => handleInputChange(e)}
                className="form-control py-0"
              />
            </div>
            <div>
				<h3 className="mb-2 text-red-500">
					Note: Please do not use words containing "subm" like 'submitted','submission','submitting','submit' in Rollback reason. <br></br>
					For Submission Date : use word - DOS / Claim Date
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

export default withRouter(Rollback);
