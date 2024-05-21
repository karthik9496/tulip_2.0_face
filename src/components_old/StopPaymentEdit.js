import { useForm } from "react-hook-form";
import axios from 'axios';
import { useEffect, useState } from "react";
import LiveSearch from "../utils/LiveSearch";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const StopPaymentEdit = () => {
    let { letterNo } = useParams();
    //const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({});
    const [entity, setEntity] = useState({});
    const [ic, setIc] = useState([]);
    const [employee, setEmployee] = useState();
    const [serverErrors, setServerErrors] = useState([]);
    let obj = {
        letterNo: "",
        letterDate: "",
        icNo: "",
        employee: {},
        presentAddress: "",
        age: "",
        acrGap: "",
        date: "",
        stopPaymentCscd: "",
        stopPaymentInd: "S",
        remarks: ""
    };
    const [data, setData] = useState([obj]);

    useEffect(() => {
        console.log("stp");
        let fetching = false;
        if (letterNo !== "new") {
            async function fetchData() {
                if (!fetching)
                    await axios.get(`/stopPayments/letterNo/${letterNo}`)
                        .then((response) => {
                            setData(response.data);
                            console.log("stop payment edit>>>", response.data);
                        })
                        .catch((error) => {
                            if (error.response)
                                setServerErrors(error.response.data.error);
                            else
                                setServerErrors(error.Error);
                        })
            }
            fetchData();
            return () => { fetching = true; }
        }

    }, [letterNo]);

    const handleIcNoInput = (e, index) => {
        const { name, value } = e.target;
        let newData = [...data];
        newData = data.map((itm, indx) => {
            if (indx === index) {
                let newItem = { ...itm, [name]: value, employee: {} };
                itm = newItem;
                return itm;
            }
            return itm;
        })
        setData(newData);

        let icNumber = e.target.value.toUpperCase();
        if (icNumber.length === 7) {
            console.log("icNumber >>>> ", icNumber);
            async function FetchEmployee() {
                await axios.get(`/employees/byIcNo/${icNumber}`)
                    .then((response) => {
                        console.log("employee details>>>>", response.data);
                        if (response.data.length === 0) {
                            let newIc = [...ic];
                            newIc[index] = "please enter correct IC No";
                            setIc(newIc);
                        } else {
                            let newIc = [...ic];
                            newIc[index] = "";
                            setIc(newIc);
                        }
                        setData(
                            data.map((it, ind) => {
                                if (index === ind) {
                                    let newItem = { ...it, employee: response.data };
                                    it = newItem;
                                    return it;
                                }
                                return it;
                            })
                        )
                    })
            }
            FetchEmployee();
        }
    }

    const handleLetterInput = (e) => {
        const { name, value } = e.target;
        setData(
            data.map((item, index) => {
                let newItem = { ...item, [name]: value };
                item = newItem;
                return item;
            })
        )
    }

    const handleInput = index => (e) => {
        const { name, value } = e.target;
        if (name === "icNo") {
            console.log("hhhhhh");
        }
        setData(
            data.map((itm, indx) => {
                if (indx === index) {
                    let newItem = { ...itm, [name]: value };
                    itm = newItem;
                    return itm;
                }
                return itm;
            })
        )
    }

    const handleSubmit = (e) => {
        console.log("submitted data", data);
        async function SaveStopPayment() {
            await axios.post(`/stopPayments`, data)
                .then((response) => console.log(response.data));
        }
        SaveStopPayment();
    }
    useEffect(() => {
        console.log("ic set ic>>> ", ic);
    }, [ic])


    return (
        <div style={{ padding: "25px 10px" }}>
            <div className="bg-green-100">
                <div>
                    <div className="flex p-3">
                        <div>
                            <label>Letter No</label>
                            <input name="letterNo" value={data[0]?.letterNo} onChange={handleLetterInput} />
                        </div><div>
                            <label>Letter Date</label>
                            <input type="date" name="letterDate" value={data[0]?.letterDate} onChange={handleLetterInput} />
                        </div>
                    </div>
                    {data.map((item, index) => (
                        <div key={index} className="flex py-2" style={index % 2 === 0 ? { backgroundColor: "" } : { backgroundColor: "rgb(229,220,229)" }}>

                            <div className="font-bold">{index + 1}.</div>

                            <div className="flex flex-wrap " style={{ display: "flex", flexWrap: "wrap" }}>
                                <div>
                                    <label>IC No</label>
                                    <input className="w-32" name="icNo" value={item?.employee?.icNo} onChange={(e) => {
                                        handleIcNoInput(e, index)
                                    }} />
                                    <label className="text-red-500">{ic[index]}</label>
                                </div>
                                <div>
                                    <label>CDAO No</label>
                                    <input className="w-32" readOnly value={item.employee?.cdaoNo} />
                                </div>
                                <div>
                                    <label>Officer name</label>
                                    <input readOnly value={item.employee?.officerName} />
                                </div>
                                <div>
                                    <label>Date of Birth</label>
                                    <input className="w-32" readOnly value={item.employee?.dateOfBirth} />
                                </div>
                                <div>
                                    <label>Date of Commission</label>
                                    <input className="w-32" readOnly value={item.employee?.dateOfCommission} />
                                </div>
                                <div>
                                    <label>SUS No</label>
                                    <input className="w-32" readOnly value={item.employee?.presentUnit?.susNo} />
                                </div>
                                <div>
                                    <label>Unit Name</label>
                                    <textarea readOnly value={item.employee?.presentUnit?.unitName}></textarea>
                                </div>
                                <div>
                                    <label>Unit Code</label>
                                    <input className="w-32" readOnly value={item.employee?.presentUnit?.unitCode} />
                                </div>
                                <div>
                                    <label>Present Address</label>
                                    <textarea name="presentAddress" onChange={handleInput(index)}></textarea>
                                </div>
                                {/* <div>
                                    <label>Age</label>
                                    <input name="age" onChange={handleInput(index)} />
                                </div> */}
                                <div>
                                    <label>ACR GAP</label>
                                    <input name="acrGap" onChange={handleInput(index)} />
                                </div>
                                <div>
                                    <label>CSCD</label>
                                    <select className="w-32 bg-white" name="stopPaymentCscd" value={item.stopPaymentCscd} onChange={handleInput(index)}>
                                        <option>--Select--</option>
                                        <option value="RETIRE">RETIRE</option>
                                        <option value="RELEASE">RELEASE</option>
                                        <option value="PRETIRE">PRETIRE</option>
                                        <option value="RESIGN">RESIGN</option>
                                        <option value="PAYSTOP">PAYSTOP</option>
                                        <option value="INVALID">INVALID</option>
                                        <option value="DEATH">DEATH</option>
                                        <option value="DEPUTE">DEPUTE</option>
                                        <option value="SECNDMNT">SECNDMNT</option>
                                        <option value="MISSING">MISSING</option>
                                        <option value="KILLED">KILLED</option>
                                        <option value="REMOVED">REMOVED</option>
                                        <option value="DISMISS">DISMISS</option>
                                        <option value="CASHRE">CASHRE</option>
                                        <option value="DESERTER">DESERTER</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Remarks</label>
                                    <textarea
                                        className=""
                                        style={{ width: "440px" }}
                                        name="remarks"
                                        value={item.remarks}
                                        onChange={handleInput(index)}></textarea>
                                </div>
                            </div>
                            {index !== 0 ? <div className="">
                                <button
                                    className="w-32 h-10"
                                    onClick={() => {
                                        if (index !== 0) {
                                            setIc(
                                                ic.filter((i, ind) => {
                                                    if (index !== ind) {
                                                        return i;
                                                    }
                                                })
                                            )
                                            setData(
                                                data.filter((i, id) => {
                                                    if (id !== index) {
                                                        return i;
                                                    }
                                                })
                                            )
                                        }
                                    }}>
                                    Remove Row {index + 1}
                                </button>
                            </div> :
                                <div className="m-0 p-0">
                                    <button className="w-32 h-10 bg-red-500 hover:bg-red-700" style={{ cursor: "not-allowed" }}>
                                        Cant't Remove
                                    </button>
                                </div>}

                        </div>
                    ))}
                    <div className="flex justify-end">
                        <button
                            className="w-32"
                            onClick={() => setData([...data, obj])}>
                            Add Row
                        </button>
                    </div>
                </div>
                <div className="px-4 flex">
                    <button
                        className="w-32" type="submit" onClick={handleSubmit}>
                        Save
                    </button>
                    <button
                        className="w-52 mx-10" onClick={() => console.log(data)}>
                        Conole updated data
                    </button>
                </div>
            </div>
        </div>
    )
}

export default StopPaymentEdit;
