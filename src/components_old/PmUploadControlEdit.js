/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By :
 */

import { useState, useEffect } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { BasicLoadingIcon } from "../utils/Icons";

//import DatePicker  from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";
//import addDays from 'date-fns/addDays'

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

const schema = yup.object({});

const PmUploadControlEdit = () => {
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
  const [serverErrors, setServerErrors] = useState();
  const [key, setKey] = useState("page1");
  const [me, setMe] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [lightTheme, setLightTheme] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    async function getNcsExtractionStatus() {
      try {
        setServerErrors();
        const response = await axios.get(
          `/pmUploadControls/pmNcsExtractionStatus`,
          {
            signal: abortController.signal,
          }
        );
        if (response.data === "active") {
          setServerErrors("PM Extraction Under Process.");
          setDisabled(true);
        } else setDisabled(false);
      } catch (error) {
        setServerErrors(
          error.response.status +
            " : " +
            error.response.statusText +
            ". Please Contact EDP."
        );
        setDisabled(true);
      }
    }
    getNcsExtractionStatus();

    return () => {
      abortController.abort();
    };
  }, []);

  const onSubmit = (data, event) => {
    event.preventDefault();
    console.log(me);
    if (me && !disabled) {
      setDisabled(true);
      setLoading(true);
      axios
        .get(`/pmUploadControls/pmUploadFile/${me}`)
        .then((response) => {
          if (response.data) {
            window.open(
              `${process.env.REACT_APP_BASE_URL}/files/${response.data}`
            );
            history.push("/pmUploadControls");
          }
          setDisabled(false);
          setLoading(false);
        })
        .catch((error) => {
          setServerErrors(
            error.response.status +
              " : " +
              error.response.statusText +
              " : " +
              error.response.data
          );
          setLoading(false);
        });
    }
  };

  const onError = (errors, e) => console.log(errors, e);

  const handleInputChange = (e) => {
    //console.log(e.target.value);
    setMe(e.target.value);
  };

  return (
    <div className="max-w-xl mx-auto ">
      <div className="w-full mx-auto ">
        <div className={lightTheme ? "theme-light" : "theme-dark"}>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <h1>{id === "new" ? "Add" : "Edit"} Pm Upload File Generation </h1>
            <p className="text-red-500 font-semibold ml-4">{serverErrors}</p>
            <div
              style={disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}
            >
              <Tabs
                id="PmUploadControlEdit"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
              >
                <Tab eventKey="page1" title="Page 1" className="h-120">
                  <div className="grid grid-cols-2 gap-0">
                    <div>
                      <label>Pm Month</label>
                      <input
                        type="text"
                        name="me"
                        onChange={handleInputChange}
                        placeholder="mmyyyy"
                        className="form-control py-0"
                      />
                      <div className="text-red-500">
                        {errors.batchNo?.message}
                      </div>
                    </div>

                    <div>
                      <label>Pm Section Code</label>
                      <input
                        type="text"
                        name="pmSectionCode"
                        {...register("pmSectionCode")}
                        className="form-control py-0"
                      />
                      <div className="text-red-500">
                        {errors.pmSectionCode?.message}
                      </div>
                    </div>
                  </div>
                </Tab>

                <Tab eventKey="page2" title="Page 2" className="h-120">
                  <div className="grid grid-cols-2 gap-0">
                    <p>Add some fields here or delete this tab.</p>
                  </div>
                </Tab>

                <Tab eventKey="help" title="Help">
                  <h1>Help</h1>
                  <ul className="list-disc">
                    <li>Point 1</li>
                    <li>Point 2</li>
                  </ul>
                </Tab>
              </Tabs>

              <div className="px-4">
                <button type="submit">Generate PM File</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center fixed top-1/3 w-full z-50 left-0">
          <p className="mr-2 text-2xl text-green-600">Generating PM File</p>
          <BasicLoadingIcon className="ml-1 mt-1 h-10 w-10 animate-spin text-green-600" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default withRouter(PmUploadControlEdit);
