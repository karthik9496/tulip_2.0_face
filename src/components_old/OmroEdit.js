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
import LiveSearch from "../utils/LiveSearch";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from "date-fns/addDays";

const schema = yup.object({
  //   cdaCode: yup.string().required('Required'),
  //    subOfficeCode: yup.string().required('Required'),
  //     minNo: yup.string().required('Required'),
  //    transactionNo: yup.string().required('Required'),
  //     transactionDate: yup.string().required('Required'),
  //    organisation: yup.string().required('Required'),
  //    depositorName: yup.string().required('Required'),
  //    personnnelNo: yup.string().required('Required'),
  //    pcdaoNo: yup.string().required('Required'),
  //    mobileNo: yup.string().required('Required'),
  //    address: yup.string().required('Required'),
  //     amount: yup.number().required('Required'),
  //   paymentNature: yup.string().required('Required'),
  //  emroOffice: yup.string().required('Required'),
  //   remarks: yup.string().required('Required'),
  //     teNoAccountsSec: yup.number().integer().required('Required'),
  //   teMonthAccountsSec: yup.string().required('Required'),
  //    teDateAccountsSec: yup.string().required('Required'),
  //    dakAccountsSec: yup.object().required('Required'),
  //    auditSec: yup.object().required('Required'),
  //    teNoAuditSec: yup.number().integer().required('Required'),
  //    teMonthAuditSec: yup.string().required('Required'),
  //    teDateAuditSec: yup.string().required('Required'),
  //    dakAuditSec: yup.object().required('Required'),
  //    remarksAccountsSec: yup.string().required('Required'),
  //    remarksAuditSec: yup.string().required('Required'),
  //    serviceHead: yup.string().required('Required'),
  //    unit: yup.object().required('Required'),
  //    projectCode: yup.string().required('Required'),
  //   auditorDateAuditSec: yup.string().required('Required'),
  //   aaoDateAuditSec: yup.string().required('Required'),
  //     aoDateAuditSec: yup.string().required('Required'),
  //    auditorDateAccountsSec: yup.string().required('Required'),
  //     aaoDateAccountsSec: yup.string().required('Required'),
  //    aoDateAccountsSec: yup.string().required('Required'),
  //     recordStatusAudit: yup.string().required('Required'),
  //    recordStatusAccounts: yup.string().required('Required'),
  //     approvedAudit: yup.boolean().required('Required'),
  //    approvedAccounts: yup.boolean().required('Required'),
  //    reasonAuditSec: yup.string().required('Required'),
  //   reasonAccounts: yup.string().required('Required'),
  //   scrollDate: yup.string().required('Required'),
});

const OmroEdit = () => {
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

  const [loading, setLoading] = useState(true);
  const [dakidNo, setDakidNo] = useState("");
  const [monthEnding, setMonthEnding] = useState("");
  const [rankName, setRankName] = useState("");
  const [cdaoNo, setCdaoNo] = useState("");
  const [name, setName] = useState("");
  const [pmDetailObj, setPmDetailObj] = useState([
    { payCode: "",codeHead: "", signRc: "", amount: "" , adjMonth:""},
  ]);
  // const [pmDetail, setPmDetail] = useState([{receiptCodeHead: "", chargeCodeHead: "",receiptPlusAmount:""
  //   				,receiptMinusAmount:"",chargePlusAmount:"",chargeMinusAmount:""}]);
  const [depList, setDepList] = useState([
    { cdaoNo: "", plusCharge: "", amount: "" },
  ]);
  const [secCode, setSecCode] = useState("");
  // const [secCodeList,setSecCodeList]=useState([]);
  //const [secCodeItems,setSecCodeItems]=useState([]);
  const [pmSecData, setPmSecData] = useState([]);
  const [pmSecItems, setPmSecItems] = useState([]);
  const [pmSecItem, setPmSecItem] = useState();
  const [mesg, setMesg] = useState("");
  const [disable, setDisable] = useState(false);
  const [mroAmount, setmroAmount] = useState();
  const [lic,setLic]=useState(false);
  const [emroAdj,setEmroAdj]=useState(false);
  const [empId,setEmpId]=useState('');
  const [corpsPayHead,setCorpsPayHead]=useState('');
   const [lwssMro,setLwssMro]=useState(false);
   const [buttonDisabled, setButtonDisabled] = useState(false);
   const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    console.log(id);
    if (id !== "new") {
      async function fetchData() {
        let record = "";
        await axios
          .get("/omros/" + id)
          .then((response) => {
            record = response.data;
            setmroAmount(response.data.amount);
      //      if(record.emro!==null){
	//			setEmroAdj(true);
	//		}
			if(record.dak.dakType.description.includes("Emro")){
				setEmroAdj(true);
			}
			 if(record.dak.dakType.description.includes("MRO from DD/Cheque")){
				setLwssMro(true);
				}
			if(record.employee!==null){
				console.log("-----------------------------:" + record.employee.id);
				setEmpId(record.employee.id);
			}
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
          "dak",
          "bank",
          "section",
          "sectionCode",
          "employee",
          "unit",
          "minNo",
          "mroDate",
          "memoNo",
          "memoDate",
          "receivedMonth",
          "adjustmentMonth",
          "voucherNumber",
          "voucherDate",
          "amount",
          "remittanceDetail",
          "auditorDate",
          "aaoDate",
          "aoDate",
          "reason",
          "remarks",
          "otherDepositorDetail",
          "approved",
          "recordStatus",
          "itemAmount",
          "depositorType",
          "panNo",
          "itAmount",
          "projectcode",
          "personalClaimStatus",
          "mroType",
          "cdaoNo",
          "pmDetail",
          "bankName",
          "bankBranch",
          "ddChequeNo",
          "ddChequeDate",
          "depositType",
        ];
        console.log("%%%%%:" + record['pmDetail'][0].amount);
        setSecCode(record["section"]);
        setPmDetailObj(record["pmDetail"]);
        
        if(record['dak'].dakType.description==='Lic Mro'){
					setLic(true);
				}

        console.log("%%%%%SecCode is:" + secCode);
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
    async function fetchEmpData() {
      if (!fetching && lic===false)
        await axios
          .get(`/omros/${id}/empData`)
          .then((response) => {
            setCdaoNo(response.data["cdaoNo"]);
            setName(response.data["officerName"]);
          })
          .catch((error) => {
            //console.log(error);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
    }
    fetchEmpData();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  
   useEffect(() => {
    let fetching = false;
    let unmounted = false;
    async function fetchEmpCorpsData() {
      if (!fetching && lic===false && emroAdj===true)
      console.log("%%%%%%%%%%%%%%%%:" + empId);
        await axios.get(`/omros/corpsPayHead/${empId}`)
          .then((response) => {
			console.log(response.data);
            setCorpsPayHead(response.data);
            
          })
          .catch((error) => {
            //console.log(error);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
    }
    fetchEmpCorpsData();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [empId]);

  useEffect(() => {
    let fetching = false;
    let unmounted = false;
    async function fetchRankData() {
	console.log("---lic Mro---:"+lic);
      if (!fetching && lic===false)
        await axios
          .get(`/omros/${id}/rankName`)
          .then((response) => {
            setRankName(response.data["rankName"]);
          })
          .catch((error) => {
            //console.log(error);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
    }
    fetchRankData();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    let fetching = false;
    let unmounted = false;
    async function fetchDakData() {
      if (!fetching)
        await axios
          .get(`/omros/${id}/dakid`)
          .then((response) => {
            setDakidNo(response.data["dakidNo"]);
          })
          .catch((error) => {
            //console.log(error);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
    }
    fetchDakData();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    let fetching = false;
    let unmounted = false;
    console.log("-------:" + secCode);
    async function fetchSectionCodeData() {
      if (!fetching && secCode)
        await axios
          .get(`/sectionDvBlocks/${secCode}/sectionData`)
          .then((response) => {
            console.log("response>>" + response.data);
            setPmSecData(response.data);
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
  }, [secCode]);

  const onSubmit = (data, event) => {
    event.preventDefault();
    if (disabled)
			return;

		setDisabled(true);
		setButtonDisabled(true);
    console.log("Omro Data ", data);
    console.log("&&&&&&&&---:" + pmDetailObj.length);
    console.log("&&&&&&&&---:" + data.pmDetail);

    if (data.id && !disable && emroAdj===false && lwssMro===false) {
      axios.put("/omros/submitAudMro/" + data.id, data)

        .then((response) => {
          if (response.status === 200) {
            setMesg(response.data["reason"]);
            history.push("/omros");
            console.log("----***:" + response.data);
          }
        })
        .catch((error) => {
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          setServerErrors(error.response.data["reason"]);
        });
    }else if (data.id && !disable && emroAdj===true && lwssMro===false) {
      axios.put("/omros/emro/submitAudMro/" + data.id, data)

        .then((response) => {
          if (response.status === 200) {
            setMesg(response.data["reason"]);
            history.push("/omros");
            console.log("----***:" + response.data);
          }
        })
        .catch((error) => {
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          setServerErrors(error.response.data["reason"]);
        });
    }else if (data.id && !disable && emroAdj===false && lwssMro===true) {
       axios.put("/omros/mro/dd/audSubmit/" + data.id, data)

        .then((response) => {
          if (response.status === 200) {
            setMesg(response.data["reason"]);
            history.push("/omros");
            console.log("----***:" + response.data);
          }
        })
        .catch((error) => {
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          setServerErrors(error.response.data["reason"]);
        });
    }

    
  };

  const onError = (errors, e) => console.log(errors, e);

  //All foreign keys.
  // XXXXXX Add search fields and adjust the values as necessary
  const parentData = {
    employee: {
      title: "cdaoNo",
      url: "employees/all/effective",
      searchList: ["cdaoNo", "checkDigit", "officerName"], //XXXXXXXXX Add search fields
      fkEntity: "employee",
      preload: false, //XXXXXX Set this to true for small tables like designations
    },
  };

  //Callback for child components (Foreign Keys)
  const callback = (childData) => {
    //console.log("Parent Callback");
    setEntity((prev) => ({ ...prev, [childData.fk]: childData.entity }));
    setValue(childData.fk, childData.entity);

    //	if(childData.fk==='section')
    //		setSecCode(childData.entity.id);
     	if(childData.fk==='employee')
    		setEmpId(childData.entity.id);
    //console.log(errors);
    clearErrors(childData.fk);
  };

  const errorCallback = (err) => {
    //console.log(err);
    setServerErrors(err);
  };

  const handleSectionChange = (e) => {
    console.log(e.target.value);

    setValue("sectionCode", e.target.value);
  };

  const handleInputChange = (e, index) => {
    console.log(e.target.value);
    console.log(index);
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    const list = [...pmDetailObj];
    list[index][name] = value;
    console.log("----The code head is----:" + list[index].codeHead);
    console.log("----The sign is----:" + list[index].signRc);
    console.log("----The amt is----:" + list[index].amount);
    setPmDetailObj(list);
    setValue("pmDetail", list);
  };
   const handleInputAmountChange = (e, index) => {
    console.log(e.target.value);
    console.log(index);
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    const list = [...pmDetailObj];
    list[index][name] = value;
    console.log("----The code head is----:" + list[index].codeHead);
    console.log("----The sign is----:" + list[index].signRc);
    console.log("----The amt is----:" + list[index].amount);
    setPmDetailObj(list);
    setValue("pmDetail", list);
  };
  const handleInputPeriodChange = (e, index) => {
    console.log(e.target.value);
    console.log(index);
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    const list = [...pmDetailObj];
    list[index][name] = value;
    setPmDetailObj(list);
    setValue("pmDetail", list);
  };
  
   const handleInputPayCodeChange = (e, index) => {
    console.log(e.target.value);
    console.log(index);
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    const list = [...pmDetailObj];
    list[index][name] = value;
    console.log("----The code head is----:" + list[index].codeHead);
    console.log("----The sign is----:" + list[index].signRc);
    console.log("----The amt is----:" + list[index].amount);
    setPmDetailObj(list);
    setValue("pmDetail", list);
  };

  const handleInputCdaChange = (e, index) => {
    console.log(e.target.value);
    console.log(index);
    const { name, value } = e.target;
    const list = [...depList];
    list[index][name] = value;
    setDepList(list);
  };
  const handleRemoveClick = (index) => {
    const list = [...pmDetailObj];
    list.splice(index, 1);
    setPmDetailObj(list);
  };
  const handleButtonClick = (e) => {
		history.push("/omros");
	}
  const handleCdaRemoveClick = (index) => {
    const list = [...depList];
    list.splice(index, 1);
    setDepList(list);
  };
  // handle click event of the Add button
  const handleAddClick = () => {
    setPmDetailObj([...pmDetailObj, { payCode:"",codeHead: "", signRc: "", amount: "" , adjMonth:""}]);
  };
  const handleCdaAddClick = () => {
    setDepList([...depList, { cdaoNo: "", plusCharge: "", amount: "" }]);
  };
  return (
    <div className="max-w-5xl mx-auto ">
      <div className="w-full w-3/4  mx-auto ">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <h1>{id === "new" ? "Add" : "Edit"} Omro </h1>
          <div className="text-red-500">{serverErrors}</div>

          <div className="grid grid-cols-2 gap-0">
            <div>
              <label>DakId</label>
              <input
                className="form-control py-0 max-w-xs"
                type="text"
                readOnly
                value={dakidNo}
              />
            </div>
 {(lic===false && emroAdj===false) && <>
            <div>
              <label>CdaoNo/Name</label>
              <input
                className="form-control py-0 max-w-xs"
                type="text"
                readOnly
                value={cdaoNo}
              />
              <input
                className="form-control py-0 max-w-xs"
                type="text"
                readOnly
                value={name}
              />
            </div>

            <div>
              <label>Rank</label>
              <input
                className="form-control py-0 max-w-xs"
                type="text"
                readOnly
                value={rankName}
              />
            </div>
            </>
            }
            {(lic===true && emroAdj===false && lwssMro===false) &&
								<>
								 <h1 > Lic Adjustment</h1>
								  
								
								</>
								}
          </div>

			{lwssMro===false &&
		<>
          <h1> MRO Details</h1>
          <div className="grid grid-cols-2 gap-0">
            <div>
              <label>MRO Date</label>
              <input
                type="date"
                name="mroDate"
                {...register("mroDate")}
                className="form-control py-0"
              />
              <div className="text-red-500">{errors.mroDate?.message}</div>
            </div>

            <div>
              <label>MRO Identification No</label>
              <input
                type="text"
                name="minNo"
                {...register("minNo")}
                className="form-control py-0"
              />
              <div className="text-red-500">{errors.minNo?.message}</div>
            </div>

            <div>
              <b>PM Section Code</b>
              <select
                className="form-control py-0"
                value={pmSecItem}
                onChange={handleSectionChange}
              >
                <option key={0} value={0}>
                  ---select---
                </option>
                {pmSecData.map((item) => (
                  <option key={item.id} value={item}>
                    {" "}
                    {item}{" "}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Remittance Details</label>
              <input
                type="text"
                name="remittanceDetail"
                {...register("remittanceDetail")}
                className="form-control py-0"
              />
              <div className="text-red-500">
                {errors.remittanceDetail?.message}
              </div>
            </div>
            {emroAdj===false  &&
            <div>
							<label>Lic Maturity File Name</label>
							<input type="text" name="licMaturityFileName" {...register("licMaturityFileName")}
								className="form-control py-0"
							/>
							<div className="text-red-500">{errors.licMaturityFileName?.message}</div>
						</div>
						}
          </div>
          </>
          }
                {(lwssMro===true && emroAdj===false && lic===false) &&
          <>
               <h1> DD/Cheque Details</h1>
          <div className="grid grid-cols-2 gap-0">
            <div>
              <label>Bank Name</label>
              <input
                type="text"
                name="bankName"
                {...register("bankName")}
                className="form-control py-0"
              />
              <div className="text-red-500">{errors.bankName?.message}</div>
            </div>

            <div>
              <label>Bank Branch</label>
              <input
                type="text"
                name="bankBranch"
                {...register("bankBranch")}
                className="form-control py-0"
              />
              <div className="text-red-500">{errors.bankBranch?.message}</div>
            </div>

            <div>
              <label>DD/Cheque No</label>
              <input
                type="text"
                name="ddChequeNo"
                {...register("ddChequeNo")}
                className="form-control py-0"
              />
              <div className="text-red-500">{errors.ddChequeNo?.message}</div>
            </div>

            <div>
              <label>DD/Cheque Date</label>
              <input
                type="text"
                name="ddChequeDate"
                {...register("ddChequeDate")}
                className="form-control py-0"
              />
              <div className="text-red-500">
                {errors.ddChequeDate?.message}
              </div>
            </div>
            <div>
              <label>Deposit Type</label>
              <input
                type="text"
                name="depositType"
                {...register("depositType")}
                className="form-control py-0"
              />
              <div className="text-red-500">
                {errors.depositType?.message}
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
              <div className="text-red-500">
                {errors.amount?.message}
              </div>
            </div>
            
            <div>
              <label>Adjustment Month</label>
              <input
                type="text"
                name="adjustmentMonth"
                {...register("adjustmentMonth")}
                className="form-control py-0"
              />
              <div className="text-red-500">
                {errors.adjustmentMonth?.message}
              </div>
            </div>
            
           
          </div>
          </>
          }
			{(lic===false && emroAdj===false && lwssMro===false) &&
			<>
          <h1> Depositor's Details</h1>
          <div className="row cols-3 gap-0">
            {depList.map((x, k) => {
              return (
                <div className="grid grid-cols-3 gap-0 flex flex-wrap content-start ...">
                  <input
                    name="cdaoNo"
                    {...register("cdaoNo")}
                    type="text"
                    placeholder="Enter CDAO No"
                    //value={cdaoNo}
                    //readOnly
                    onChange={(e) => handleInputCdaChange(e, k)}
                  />
                  <input
                    name="MRO Amt"
                    {...register("itemAmount")}
                    type="text"
                    placeholder="Enter MRO Amt"
                    //value={mroAmount}
                    //readOnly
                    onChange={(e) => handleInputCdaChange(e, k)}
                  />
                  <input
                    name="Tax Amt"
                    {...register("itAmount")}
                    type="text"
                    placeholder="Enter Tax Amt"
                    onChange={(e) => handleInputCdaChange(e, k)}
                  />

                  <div></div>
                  <div className=" w-16 m-0 p-0 flex flex-wrap content-start ...">
                    {depList.length !== 1 && (
                      <button
                        className=" w-16 m-0 p-0 "
                        onClick={() => handleCdaRemoveClick(k)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className=" w-16 m-0 p-0 flex flex-wrap content-start ...">
                    {depList.length - 1 === k && (
                      <button
                        className=" w-16 m-0 p-0 "
                        onClick={handleCdaAddClick}
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          </>
          }
          
          	{(lic===false && emroAdj===true && lwssMro===false) &&
          	
			<>
          <h1> Depositor's Details</h1>
          <div className="grid grid-cols-2 gap-0">
          <div >
									<LiveSearch name="employee" onChange={handleInputChange}
										parentData={parentData.employee} parentCallback={callback} 
										fkEntity={entity.employee} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.employee?.message}</div>
								</div>
								
				<div>				
                  <input
                    name="MRO Amt"
                    value={mroAmount}
                     
                  />
                  </div>
                  
                  
                  
                </div>
              
            
         
          </>
          }
			{(emroAdj===false && lwssMro===false) &&
			<>
          <h1> Punching Media Details</h1>

          <div className="row cols-3 gap-0">
            {pmDetailObj.map((x, i) => {
              return (
                <div className="flex flex-wrap content-start ...">
                  <select
                    name="codeHead"
                    type="text" 
                    className="mx-2 px-2"
                    placeholder="Enter Code Head"
                    value={x.codeHead}
                    onChange={(e) => handleInputChange(e, i)}
                  >
                    <option key="default" value="" label="--Code Head--" />

                    <option key="1" value="00/020/80" label="Omro:00/020/80" />
                    <option key="2" value="93/020/80" label="Emro:93/020/80" />
                    <option key="3" value="01/250/01" label="TD:01/250/01" />
                    <option key="4" value="01/250/05" label="PD:01/250/05" />
                    <option key="5" value="01/136/01" label="LTC:01/136/01" />
                  </select>
                  <select
                    name="signRc"
                    value={x.signRc}
                    onChange={(e) => handleInputChange(e, i)}
                  >
                    <option key="default" value="" label="--Sign RC--" />
                    <option key="+R" value="+R" label="+R" />
                    <option key="-R" value="-R" label="-R" />
                    <option key="+C" value="+C" label="+C" />
                    <option key="-C" value="-C" label="-C" />
                  </select>
                  <input
                    placeholder="Enter Amount"
                    name="amount"
                    value={x.amount}
                    onChange={(e) => handleInputChange(e, i)}
                  />

                  <div className=" w-16 m-0 p-0 flex flex-wrap content-start ...">
                    {pmDetailObj.length !== 1 && (
                      <button
                        className=" w-16 m-0 p-0 "
                        onClick={() => handleRemoveClick(i)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div>
                    {pmDetailObj.length - 1 === i && (
                      <button
                        className=" w-16 m-0 p-0 "
                        onClick={handleAddClick}
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          </>
          }
          
          {(emroAdj===true && lwssMro===false) &&
			<>
          <h1> Pay Code Details</h1>

          <div className="row cols-2 gap-0">
            {pmDetailObj.map((x, i) => {
              return (
                <div className="flex flex-wrap content-start ...">
                      <select
                    name="payCode"
                    type="text"
                    className="mx-2 px-2"
                    placeholder="Enter Pay Code"
                    value={x.payCode}
                    onChange={(e) => handleInputPayCodeChange(e, i)}
                  >
                    <option key="default" value="" label="--Pay Code--" />

                    <option key="1" value="DSOP" label="Dsop Subscription" />
                    <option key="2" value="DSOPREF" label="Dsop Ty Adv Refund" />
                    <option key="3" value="MROPAY" label="Pay Adjustment" />
                     <option key="4" value="AGIF" label="Agi Subscription" />
                      <option key="51" value="HB" label="House Building Advance" />
                       <option key="52" value="MC" label="Motor Cycle Advance" />
                        <option key="53" value="PC" label="PC Advance" />
                       <option key="6" value="PLI" label="Pli Premium" />
                        <option key="7" value="PCI" label="Interest on PC" />
                         <option key="8" value="HBI" label="Interest on HBA" />
                         <option key="9" value="MCI" label="Interest on MotorCycle" />
                          <option key="10" value="ELEC" label="Electricity Charges" />
                           <option key="11" value="WATER" label="Water Charges" />
                            <option key="12" value="LFEE" label="Licence Fee Charges" />
                            <option key="13" value="FUR" label="Furniture Charges" />
                    
                  </select>
                
                  <input
                    placeholder="Enter Amount"
                    name="amount"
                    value={x.amount}
                    onChange={(e) => handleInputAmountChange(e, i)}
                  />
                  
                     <input
                    placeholder="Enter Adj Period in mmyyyy"
                    type="text"
                    name="adjMonth"
                    value={x.adjMonth}
                    onChange={(e) => handleInputPeriodChange(e, i)}
                  />

                  <div className=" w-18 m-0 p-0 flex flex-wrap content-start ...">
                    {pmDetailObj.length !== 1 && (
                      <button
                        className=" w-18 m-0 p-0 "
                        onClick={() => handleRemoveClick(i)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div>
                    {pmDetailObj.length - 1 === i && (
                      <button
                        className=" w-16 m-0 p-0 "
                        onClick={handleAddClick}
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          </>
          }
          
       
         <div className="grid grid-cols-3 gap-0">
								 
								<div className="px-2">
									<button type="submit" disabled={buttonDisabled} >Save</button>
								</div>
								 

								<div className="px-2">
									<button type="button" onClick={handleButtonClick} >Cancel</button>
								</div>
								<div className="px-4">
									<button type="submit" onClick={handleButtonClick} >Done</button>
								</div>
							</div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(OmroEdit);
