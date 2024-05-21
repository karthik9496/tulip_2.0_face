/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By :
 */

import { useState, useEffect, useRef } from "react";
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

const schema = yup.object({
  dakType: yup.object().required("Required"),
  //section: yup.object().required("Required"),
  referenceNo: yup
    .string()
    .required("Required")
    .test("Length Ok", "Field length exceeding 25", (val) => val.length <= 30),
  referenceDate: yup.string().required("Required"),
});

const DakEdit = () => {
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
  const [dakMsg, setDakMsg] = useState("");
  const [secId, setSecId] = useState();
  const [dakTypeData, setDakTypeData] = useState([]);
  const [dakTypeItems, setDakTypeItems] = useState([]);
  const [dakTypeItem, setDakTypeItem] = useState();
  const [loading, setLoading] = useState(true);
  const [sectionGroup, setSectionGroup] = useState("");
  const [sectionGroupList, setSectionGroupList] = useState([]);
  const [sectionGroupItems, setSectionGroupItems] = useState([]);
  const [empId, setEmpId] = useState(0);
  const [secName, setSecName] = useState("");
  const [key, setKey] = useState("Page1");
  const [dakTypeDesc, setDakTypeDesc] = useState("");
  const [taskInfo, setTaskInfo] = useState("");
  const [dakTypeLetters, setDakTypeLetters] = useState(false);
  const [vendorId, setVendorId] = useState("");
  const [lic, setLic] = useState(false);
  const [sectionList,setSectionList]=useState([]);
  const [sectionListItems, setSectionListItems] = useState([]);
  const [sectionSelected,setSectionSelected]=useState('')
  const [te,setTe]=useState(false);

  useEffect(() => {
    let isCancelled = false;
    console.log(id);
    if (id !== "new") {
      async function fetchData() {
        let record = "";
        await axios.get("/daks/" + id)
          .then((response) => {
            record = response.data;
          })
          .catch((error) => {
            //console.log(error);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });

        const fields = [
          "id",
          "dakidNo",
          "dakYear",
          "dakType",
          "unit",
          "section",
          "employee",
          "cdaoNo",
          "checkDigit",
          "amount",
          "referenceNo",
          "referenceDate",
          "subject",
          "billNo",
          "billDate",
          "disposalDate",
          "disposalDate",
          "disposalSummary",
          "taskUsr",
          "reason",
          "aaoDate",
          "auditorDate",
          "aoDate",
          "recordStatus",
          "approved",
          "vendor",
          "courseBill",
        ];
        setSectionGroup(record["section"].sectionGroup);
        setSecName(record["section"].sectionName);
        setSecId(record["section"].id);
        fields.forEach((field) => setValue(field, record[field]));
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

    async function fetchSectionGroup() {
      if (!fetching)
        //console.log(secId);
        await axios.get(`/sections/999/sectionGroup`)
          .then((response) => {
            console.log("response>>" + response.data);
            setSectionGroupList(response.data);
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
    fetchSectionGroup();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    let fetching = false;
    let unmounted = false;
    console.log("daktype");
    async function fetchSectionData() {
      console.log(empId);
      if (!fetching && empId > 0 && sectionGroup.length > 2) {
        console.log("fetching section " + empId + "--" + sectionGroup);
        await axios.get(`/employees/${empId}/sections/${sectionGroup}`)
          .then((response) => {
            console.log(
              "response>> section>>" +
                response.data[0].sectionName +
                "--" +
                response.data[1] +
                "--" +
                response.data[2]
            );
            setValue("section", response.data[0]);

            setSecId(response.data[0].id);
            setSecName(response.data[0].sectionName);
            setTaskInfo(
              "Task No-" + response.data[1] + " User " + response.data[2]
            );
            //setDakTypeData(response.data);
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
    fetchSectionData();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [empId]);

  async function fetchSection() {
    console.log(secId);
    if (sectionGroup)
      //console.log(secId);
      await axios.get(`/sections/sectionGroup/${sectionGroup}`)
        .then((response) => {
          console.log("response>>" + response.data.sectionName);
          setValue("section", response.data);

          setSecId(response.data.id);
          setSecName(response.data.sectionName);
        })
        .catch((error) => {
          //console.log(error);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          if (error.response) setServerErrors(error.response.data.error);
          else setServerErrors(error.Error);
        });
  }

  useEffect(() => {
    let fetching = false;
    let unmounted = false;
    console.log("daktype");
    async function fetchDakTypeData() {
      console.log(secId);
      if (!fetching && sectionGroup)
        //console.log(secId);
        await axios
          .get(`/dakTypes/${sectionGroup}/sectionGroup`)
          .then((response) => {
            console.log("response>>" + response.data);
            setDakTypeData(response.data);
            if (!unmounted) {
              setDakTypeItems(
                response.data.map(({ id, description }) => ({
                  id: id,
                  label: description,
                  value: id,
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
    fetchDakTypeData();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionGroup]);
  
   
     
    async function fetchSectionList() {
       if (sectionGroup.length > 2) {
         await axios.get(`/sections/sectionList/${sectionGroup}`)
          .then((response) => {
            setSectionList(response.data);
            
            
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
    
     


  const onSubmit = (data, event) => {
    event.preventDefault();
    console.log(data);
    console.log("data id--------------" + data.id);
    if (data.id) {
      axios
        .put("/daks/" + data.id, data)
        .then((response) => {})
        .catch((error) => {
          //console.log(error.response.data);
          console.log("response--------" + error.response.status);
          if (error.response.status === 200) history.push("/daks");
          //console.log(error.response.headers);
          setServerErrors(error.response.data);
        });
    } else {
	console.log("&&&&&&&&&&&&&&&&&&&&:"+data);
      axios.post("/daks", data)
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
          if (response.status === 201) {
            setDakMsg(response.data);
            //history.push("/daks/view/"+response.data);
            //history.replace({pathname:'/daks/new/'+response.data});
            setValue("referenceNo", "");
            setValue("referenceDate", "");
            setValue("section", "");
            setSecName("");
            setSecId();
            setValue("employee", "");
            setValue("entity.employee", "");
            setValue("amount", "");
            setValue("subject", "");
            setDakTypeItem("");
          }
        })
        .catch((error) => {
          //console.log(error.response.data);
         // console.log("response--------" + error.response.status);
          //if(error.response.status!==201)
          //history.push("/daks");
          //console.log(error.response.headers);
          if (error.response) setServerErrors(error.response.data);
          else setServerErrors(error);
        });
    }

    //history.push("/daks");
  };

  const onError = (errors, e) => console.log(errors, e);

  //All foreign keys.
  // XXXXXX Add search fields and adjust the values as necessary
  const parentData = {
    unit: {
      title: "Unit",
      url: "units",
      searchList: ["unitCode", "unitName"], //XXXXXXXXX Add search fields
      fkEntity: "unit",
      preload: false, //XXXXXX Set this to true for small tables like designations
    },
    section: {
      title: "Section",
      url: "sections",
      searchList: ["sectionName"], //XXXXXXXXX Add search fields
      fkEntity: "section",
      preload: false, //XXXXXX Set this to true for small tables like designations
    },
    employee: {
      title: "CDA A/c No",
      url: "employees",
      searchList: ["cdaoNo", "officerName","icNo"], //XXXXXXXXX Add search fields
      fkEntity: "employee",
      preload: false, //XXXXXX Set this to true for small tables like designations
    },

    vendor: {
      title: "Vendor Name",
      url: "vendors",
      searchList: ["vendorName"], //XXXXXXXXX Add search fields
      fkEntity: "vendor",
      preload: false, //XXXXXX Set this to true for small tables like designations
    },

    dakType: {
      title: "DakType",
      url: "dakTypes",
      searchList: ["description"], //XXXXXXXXX Add search fields
      fkEntity: "dakType",
      preload: false, //XXXXXX Set this to true for small tables like designations
    },
  };

  //Callback for child components (Foreign Keys)

  const callback = (childData) => {
    setEntity((prev) => ({ ...prev, [childData.fk]: childData.entity }));
    setValue(childData.fk, childData.entity);
    //console.log(errors);
    // console.log(childData.fk+"--"+childData.entity.id);
    if (childData.fk === "section") setSecId(childData.entity.id);
    if (childData.fk === "employee") setEmpId(childData.entity.id);

    clearErrors(childData.fk);
  };

  const errorCallback = (err) => {
    //console.log(err);
    setServerErrors(err);
  };

  const handleButtonClick = (e) => {
    history.push("/daks");
  };

  const handleGroupChange = (e) => {
    setSectionGroup(sectionGroupList[e.target.selectedIndex]);
    //console.log(sectionGroupList[e.target.selectedIndex]);
  };
  
   const handleSectionChange = (e) => {
	console.log(sectionList[e.target.selectedIndex]);
	//setValue("section",sectionList[e.target.selectedIndex]);
    setSectionSelected(sectionList[e.target.selectedIndex]);
    
  //  setValue("section",e.target.selectedIndex);
    //console.log(sectionGroupList[e.target.selectedIndex]);
  };

  const handleInputChange = (e) => {
    console.log(e.target.value);
    //	console.log("handle input change");
  };
  const handleDakTypeChange = (e) => {
    console.log(">>>" + e.target.value);
    console.log(e.target.selectedIndex - 1);
    console.log(dakTypeData[e.target.selectedIndex - 1].description);
    setDakTypeDesc(dakTypeData[e.target.selectedIndex - 1].description);
    setDakTypeItem(e.target.value);
    setValue("dakType", dakTypeData[e.target.selectedIndex - 1]);
    if (
      dakTypeData[e.target.selectedIndex - 1].description ===
        "Commission FormA" ||
      dakTypeData[e.target.selectedIndex - 1].description.includes("Goi Letter")
    ){
      setEmpId(999);
      fetchSection();
      }
    if (dakTypeData[e.target.selectedIndex - 1].description === "Letters")
      setDakTypeLetters(true);
    if (dakTypeData[e.target.selectedIndex - 1].description.includes("Konkan"))
      fetchSection();
    if (dakTypeData[e.target.selectedIndex - 1].description === "Lic Mro") {
      setLic(true);
      fetchSection();
    }
    if (dakTypeData[e.target.selectedIndex - 1].description.includes("Exten") ||  dakTypeData[e.target.selectedIndex - 1].description.includes("Stipend"))
      fetchSection();
      
      if (dakTypeData[e.target.selectedIndex - 1].description.includes("Transfer Entry")){
      fetchSection(); 
      setTe(true);
      }

    //console.log("entit---" + entity.description + "--" + entity.dakType + " " + entity.description + "--" + entity.id);
  };

  return (
    <div className="max-w-xl mx-auto ">
      <div className="w-full w-3/4  mx-auto ">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <h1>{id === "new" ? "Add" : "Edit"} Dak</h1>
          <div className="text-red-500">{serverErrors}</div>
          <div className="text-blue-500">{dakMsg}</div>

          <div className="grid grid-cols-2 gap-0 ">
            <div>
              <b>Section Group</b>
              <select
                className="form-control py-0"
                disabled={loading}
                value={sectionGroup}
                onChange={handleGroupChange}
              >
                {sectionGroupList.map((item, index) => (
                  <option key={item} value={item.toString()}>
                    {" "}
                    {item.toString()}{" "}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <b>Dak Types</b>
              <select
                className="form-control py-0"
                disabled={loading}
                value={dakTypeItem}
                onChange={handleDakTypeChange}
              >
                <option key={0} value={0}>
                  ---select---
                </option>
                {dakTypeItems.map((item) => (
                  <option key={item.id} value={item.value}>
                    {" "}
                    {item.label}{" "}
                  </option>
                ))}
              </select>
            </div>

            {lic === false && (
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
            )}
			{te===false &&
            <div>
              <label>Section</label>
              <input type="text" name="section" value={secName} readOnly />
              <div className="text-red-500">{errors.referenceNo?.message}</div>
            </div>
            }
            
            {te===true &&
             <div>
                <LiveSearch
                  name="section"
                  onChange={handleInputChange}
                  parentData={parentData.section}
                  parentCallback={callback}
                  fkEntity={entity.section}
                  errCallback={errorCallback}
                />
                <div className="text-red-500 ">{errors.section?.message}</div>
              </div>
            
            
            }
            <div>
              <label>Task No</label>
              <input type="text" name="taskInfo" value={taskInfo} readOnly />
            </div>

            <div>
              <label>Reference No</label>
              <input
                type="text"
                name="referenceNo"
                {...register("referenceNo")}
              />
              <div className="text-red-500">{errors.referenceNo?.message}</div>
            </div>

            <div>
              <label>Reference Date</label>
              <input
                type="date"
                name="referenceDate"
                {...register("referenceDate")}
                className="form-control py-0"
              />
              <div className="text-red-500">
                {errors.referenceDate?.message}
              </div>
            </div>

            <div>
              <label>Amount</label>
              <input
                type="text"
                name="amount"
                {...register("amount")}
                className="form-control py-0"
              />
              <div className="text-red-500">{errors.amount?.message}</div>
            </div>
             {["TADA Final Claim"].includes(dakTypeDesc) ? (
              <div>
                <input
                  type="checkbox"
                  {...register("courseBill")}
                  className="w-4 h-4 mt-2"
                ></input>
                <label className="inline ml-1">Course Bill</label>
              </div>
            ) : (
              ""
            )}
            {dakTypeLetters && (
              <div>
                <label>Subject</label>
                <textarea
                  type="text"
                  name="subject"
                  {...register("subject")}
                  className="form-control py-0"
                />
                <div className="text-red-500">{errors.subject?.message}</div>
              </div>
            )}
             </div>
             <div className="grid grid-cols-2 gap-0">
            <div className="px-2">
              <button type="submit">Save</button>
            </div>

            <div className="px-2">
              <button type="button" onClick={handleButtonClick}>
                Cancel
              </button>
           
          </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(DakEdit);
