import { useState, useEffect } from "react";
import { withRouter, useParams , useHistory} from "react-router-dom";
import axios from 'axios';



const PliEdit = () => {


    let { id } = useParams();
     let history = useHistory();
    const [ic, setIc] = useState([]);
    const [serverErrors, setServerErrors] = useState([]);
    const [submitErr, setSubmitErr] = useState(false);
    const [errLetter, setErrLetter] = useState("");
    const [errIndex, setErrIndex] = useState("");
    const [action,setAction]=useState("");
    const [disabled,setDisabled]=useState(false);

    let obj = {
        letterNo: "",
        letterDate: "",
        icNo: "",
        employee: { cdaoNo: "" },
        policyNo: "",
        premiumRate: "",
        policyDate: "",
        maturityDate: "",
         
    }

    const [data, setData] = useState([obj]);

    useEffect(() => {
        if (id !== "new") {
            console.log(id);
            async function FetchData() {
                await axios.get(`/plis/${id}`)
                    .then((response) => {
                        setData(response.data);
                        console.log(response.data['action']);
                        if(response.data['action']!==null)
                        	setAction(response.data['action'])
                        console.log("pli list data>>", response.data);
                    })
                    .catch((error) => {
                        if (error.response)
                            setServerErrors(error.response.data.error);
                        else
                            setServerErrors(error.Error);
                    })
            }
            FetchData();
        }
    }, [id])

const goToListPage = (e) => {
    history.push("/plis");
  };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(
            data.map((item, index) => {
                let newItem = { ...item, [name]: value };
                item = newItem;
                return item;
            })
        )
    }

    const handleIcNoInput = (e, index) => {
        const { name, value } = e.target;
        let newData = [...data];
        newData = data.map((itm, indx) => {
            if (indx === index) {
                let newItem = { ...itm, [name]: value, employee: { cdaoNo: "" } };
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
                                    let newItem = { ...it, employee: response.data ? response.data : { cdaoNo: "" } };
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

    const handleChange = (e, index) => {
        const { name, value } = e.target;
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

	
	async function submissionByAao() {
	 
	if(disabled)
		return;
		  
		setDisabled(true);
		 
		axios.put(`/plis/submissionByAao`,data)
		.then((response) => {	 
			 console.log(response.data);
			   if(response.data){
			  	setServerErrors(response.data);
			  	 
			  	}
			   
			 setDisabled(false)
       
		});
	}
	async function approvalBySao() {
	 
	if(disabled)
		return;
		  
		setDisabled(true);
		 
		axios.put(`/plis/approvalBySao`,data)
		.then((response) => {	 
			 console.log(response.data);
			   if(response.data){
			  	setServerErrors(response.data);
			  	 
			  	}
			   
			 setDisabled(false)
       
		});
	}
	
    const onsubmit = async () => {
        let validity = false;
		console.log("letter "+data[0].letterNo);
		
        validity = data[0]?.letterNo.length > 0 ? true : false;

        let valid = false;

        if (validity) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].employee.cdaoNo.length > 0) {
                    console.log("data[i]", i)
                    valid = true;
                }
                else {
                    valid = false;
                    console.log("data[i]", i)
                    setErrIndex(i + 1);
                    break;
                }
            }
        }
        else {
            setErrLetter("Letter No and Letter Date");
        }
        if (valid) {

            console.log("happy");

             await axios.post("/plis", data)
                .then((response) => {
					console.log(response.data)
					setServerErrors(response.data);
					})
                 .catch((error) => {
                     if (error.response)
                        setServerErrors(error.response.data.error);
                    else
                        setServerErrors(error.Error);
                })
        } else {
            setSubmitErr(true);
        }
    }

    const myStyle = {
        upperDiv: {
            margin: "4px",
            padding: "10px 0px",
        },
        label: {
            fontSize: "15px",
        },
        innerInput: {
            fontSize: "18px",
            padding: "2px 14px",
            width: "250px"
        },
    }

    useEffect(() => {
        console.log("ic set ic>>> ", ic);
    }, [ic])

    return (
        <div className="bg-green-100">
<div className="text-red-500">{serverErrors}</div>
            {submitErr && <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-20">
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
                <div className="w-96 h-60 bg-white m-0 p-0  z-30">
                    <div className="flex justify-end m-0 p-0">
                        <div className="p-3 cursor-pointer font-bold m-0" onClick={() => {
                            setSubmitErr(false);
                            setErrIndex("");
                            setErrLetter("");
                        }}>X</div>
                    </div>
                    <div className="flex justify-center items-center text-red-500" style={{ fontSize: "22px" }}>
                        {errLetter && <span>Please fill the details properly in {errLetter}</span>}
                        {errIndex && <span>Please fill the details properly in Row. {errIndex}.</span>}
                    </div>
                </div>
            </div>}

            <div className="flex p-3">
                <div style={myStyle.upperDiv}>
                    <label style={myStyle.label}>Letter No</label>
                    <input style={myStyle.innerInput} name="letterNo" value={data[0]?.letterNo} onChange={handleInputChange} />
                </div>
                <div style={myStyle.upperDiv}>
                    <label style={myStyle.label}>Letter Date</label>
                    <input style={myStyle.innerInput} name="letterDate" value={data[0]?.letterDate} type="date" onChange={handleInputChange} />
                </div>
            </div>


            {data.map((item, index) => (
                <div key={index} className={`flex justify-between hover:bg-green-200 ${index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"}`}>
                    <div className="flex">
                        <span className='font-bold mt-3'>{index + 1}.</span>
                        <div className="flex flex-wrap py-2">
                            <div style={myStyle.upperDiv}>
                                <label style={myStyle.label}>IC No</label>
                                <input style={myStyle.innerInput} name="icNo" value={item.employee?.icNo} onChange={(e) => handleIcNoInput(e, index)} />
                                <label style={myStyle.label} className="text-red-500">{ic[index]}</label>
                            </div>
                            <div style={myStyle.upperDiv}>
                                <label style={myStyle.label}>CDAO No</label>
                                <input style={myStyle.innerInput} readOnly value={item.employee?.cdaoNo} />
                            </div>
                            <div style={myStyle.upperDiv}>
                                <label style={myStyle.label}>Officer Name</label>
                                <input style={myStyle.innerInput} readOnly value={item.employee?.officerName} />
                            </div>
                            <div style={myStyle.upperDiv}>
                                <label style={myStyle.label}>Policy No</label>
                                <input style={myStyle.innerInput} name="policyNo" value={item.policyNo} onChange={(e) => handleChange(e, index)} />
                            </div>
                            <div style={myStyle.upperDiv}>
                                <label style={myStyle.label}>Premium</label>
                                <input style={myStyle.innerInput} name="premiumRate" value={item.premium} onChange={(e) => handleChange(e, index)} />
                            </div>
                            <div style={myStyle.upperDiv}>
                                <label style={myStyle.label}>Date of Commencement</label>
                                <input style={myStyle.innerInput} name="policyDate" type="date" value={item.policyDate} onChange={(e) => handleChange(e, index)} />
                            </div>
                            
                            <div style={myStyle.upperDiv}>
                                <label style={myStyle.label}>Recovery Upto</label>
                                <input style={myStyle.innerInput} name="maturityDate" type="date" value={item.maturityDate} onChange={(e) => handleChange(e, index)} />
                            </div>
                        </div>
                    </div>
                    <div className="self-center">
                        {index !== 0 ? <button className="w-32 h-10" onClick={() => {
                            setIc(
                                ic.filter((i, ind) => {
                                    if (index !== ind) {
                                        return i;
                                    }
                                })
                            )
                            setData(
                                data.filter((i, ind) => {
                                    if (index !== ind) {
                                        return i;
                                    }
                                })
                            )
                        }}>
                            Delete Row
                        </button> : <button className="w-32 h-10 bg-red-500 hover:bg-red-700" style={{ cursor: "not-allowed" }}>
                            Can't Delete
                        </button>}
                    </div>
                </div>
            ))}

            <div>
                <button
                    className="w-32"
                    onClick={() => {
                        let addedData = [...data, obj];
                        setData(addedData);
                    }}>
                    Add Row
                </button>
            </div>
             
            <div>
            {action && action==='edit' && 
                <button
                    className="w-32"
                    onClick={onsubmit}>
                    Submit
                </button>
                }
                {action && action==='submit' && 
                <button
                    className="w-32"
                    onClick={submissionByAao}>
                    Submission By AAO
                </button>
                }
                 {action && action==='approve' && 
                <button
                    className="w-32"
                    onClick={approvalBySao}>
                    Approve
                </button>
                }
            </div>
             <div>
                <button
                    className="w-32"
                    onClick={goToListPage}>
                    Done
                </button>
            </div>

        </div>
    );
};

export default withRouter(PliEdit);
