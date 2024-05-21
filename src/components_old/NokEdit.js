import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Table from "../utils/Table";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function NokEdit() {
  const searchParams = new URLSearchParams(document.location.search);
  const dakid = searchParams.get("dakIdNo") ? searchParams.get("dakIdNo") : "";

  const nok = {
    employee: { officerName: "", cdaoNo: "" },
    nameOfMember: "",
    dateOfBirth: "",
    relation: { id: "" },
    nokPercentage: "",
    fromDate: "",
    toDate: "",
    pan: "",
    address: "",
    bankAccount: {
      bankAccountNo: "",
      bank: {
        bankName: "",
        bankBranch: "",
        bankBranch: "",
        bankStation: "",
        ifsc: "",
      },
    },
    dakidNo: "",
  };

  let { id } = useParams();
  let { state } = useLocation();
  let history = useHistory();

  const [data, setData] = useState({ ...nok, dakidNo: dakid });
  const [processedData, setProcessedData] = useState([]);
  const [relations, setRelations] = useState([]);
  const [cdaoNo, setCdaoNo] = useState("");
  const [ifscNo, setIfscNo] = useState("");
  const [readOnly, setReadonly] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (id !== "new") {
      let myData = {};
      axios.get(`/noks/${id}`).then((response) => {
        console.log("testing ", response.data);
        myData = response.data;

        if (response.data.id) {
          axios.get(`/bankAccounts/fkNokId/${response.data.id}`).then((res) => {
            console.log("bank Account detail of nok", res.data);
            myData = { ...myData, bankAccount: res.data };
            console.log(myData);
            setData(myData);
          });
        }

        if (["submit", "approve"].includes(response.data.action)) {
          setReadonly(true);
        } else {
          setReadonly(false);
        }

        if (response.data.cdaoNo) {
          axios.get(`/noks/byCdaoNo/${response.data.cdaoNo}`).then((res) => {
            console.log(res.data);
            setProcessedData(res.data);
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    if (cdaoNo?.length !== 6)
      setData({ ...data, employee: { officerName: "", cdaoNo: cdaoNo } });
    if (cdaoNo && cdaoNo.length == 6) {
      axios.get(`/employees/byCdaoNo/${cdaoNo}`).then((response) => {
        console.log("employee >>>> ", response.data);
        if (response.data?.cdaoNo) {
          setData({ ...data, employee: response.data });
        }
      });
      axios.get(`/noks`).then((response) => {
        console.log(response.data);
      });
    }
  }, [cdaoNo]);

  useEffect(() => {
    axios.get("/relations").then((response) => {
      console.log("relations>>>", response.data);
      setRelations(response.data);
    });
  }, []);

  useEffect(() => {
    setData({
      ...data,
      bankAccount: {
        ...data.bankAccount,
        bank: {
          bankName: "",
          bankBranch: "",
          bankBranch: "",
          bankStation: "",
          ifsc: ifscNo,
        },
      },
    });
    function FetchBank(ifsc) {
      axios.get(`/banks/ifsc/${ifsc}`).then((response) => {
        console.log("bank >>> ", response.data);
        if (response.data.bankBranch) {
          setData({
            ...data,
            bankAccount: {
              ...data.bankAccount,
              bank: response.data,
            },
          });
        }
      });
    }
    if (ifscNo) FetchBank(ifscNo);
  }, [ifscNo]);

  function HandleInputChange(e) {
    let { name, value } = e.target;
    if (name == "pan") value = value.toUpperCase();
    setData({ ...data, [name]: value });
  }

  function HandleRelation(e) {
    console.log("e", e.target.value);
    let rel = {};
    relations.map((item, index) => {
      if (item.id == e.target.value) {
        rel = item;
      }
    });

    setData({ ...data, relation: rel });
  }

  function SubmitData() {
    if (data.bankAccount.bank.id && data.bankAccount.bankAccountNo) {
      if (id == "new") {
        axios.post(`/noks`, data).then((response) => {
          console.log(response.data);
          if (response.data == "ok") {
            history.push("/noks");
          } else {
            setErr(response.data);
          }
        });
      } else {
        axios.put(`/noks/${id}`, data).then((response) => {
          console.log(" >>>", response.data);
          if (response.data == "ok") {
            history.push("/noks");
          }
        });
      }
    } else {
      alert("please check bank detail");
    }
  }

  function Reject() {
    axios.put(`/noks/rollBack/${id}`).then((response) => {
      console.log(response.data);
      if (response.data == "ok") {
        history.push("/noks");
      }
    });
  }

  const columns = useMemo(
    () => [
      {
        Header: "CDAO No",
        accessor: "cdaoNo",
      },
      {
        Header: "Officer Name",
        accessor: "employee.officerName",
      },
      {
        Header: "Name of Member",
        accessor: "nameOfMember",
      },

      {
        Header: "Date of Birth",
        accessor: "dateOfBirth",
      },
      {
        Header: "Relation",
        accessor: "relation.relationName",
      },
      {
        Header: "Nomination percentage",
        accessor: "nokPercentage",
      },
      {
        Header: "Date of Approval",
        accessor: "aoDate",
      },
    ],
    [processedData]
  );

  const inputStyling = {
    width: "240px",
    marginBottom: "7px",
    padding: "2px 10px",
  };

  return (
    <div className="flex flex-col items-center pt-2">
      <div>
        <h1 className="underline">{id != "new" ? "Edit" : "Add"} NOK</h1>
      </div>
      <div className="w-9/12 flex flex-col items-center bg-gray-300 p-3 mt-3  rounded-lg">
        {data.dakidNo && (
          <div>
            <div>
              <label>Dak Id</label>
              {state && state?.dakN}
              <input
                style={{ ...inputStyling }}
                name="fkdak"
                value={searchParams.get("dakIdNo")}
                onChange={(e) => {
                  //setCdaoNo(e.target.value);
                }}
                readOnly={true}
              />
            </div>
          </div>
        )}
        <div className="flex flex-wrap justify-center">
          {err && <div>{err}</div>}
          <div>
            <label>Cdao No</label>
            <div>
              <input
                style={{ ...inputStyling }}
                name="cdaoNo"
                value={data.employee?.cdaoNo}
                onChange={(e) => {
                  setCdaoNo(e.target.value);
                }}
                readOnly={readOnly}
              />
            </div>
          </div>
          <div>
            <label>Officer Name</label>
            <div>
              <input
                style={{ ...inputStyling }}
                name="officerName"
                value={data.employee?.officerName}
                readOnly
              />
            </div>
          </div>
          <div>
            <label>Name of NOK</label>
            <div>
              <input
                style={{ ...inputStyling }}
                name="nameOfMember"
                value={data.nameOfMember}
                onChange={(e) => HandleInputChange(e)}
                readOnly={readOnly}
              />
            </div>
          </div>
          {/* <div>
            <label>Nominee Date of Birth</label>
            <div>
              <input
                style={{ ...inputStyling }}
                name="dateOfBirth"
                type="date"
                value={data.dateOfBirth}
                onChange={(e) => HandleInputChange(e)}
                readOnly={readOnly}
              />
            </div>
          </div> */}
          <div>
            <label>Relation</label>
            <div>
              <select
                style={{ ...inputStyling }}
                name="relation"
                value={data.relation?.id}
                onChange={(e) => HandleRelation(e)}
                readOnly={readOnly}
              >
                <option disabled={readOnly}>--Select--</option>
                {relations.length > 1 &&
                  relations?.map((item, index) => (
                    <option key={index} value={item.id} disabled={readOnly}>
                      {item.relationName}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div>
            <label>Percentage of NOK</label>
            <div>
              <input
                style={{ ...inputStyling }}
                name="nokPercentage"
                type="number"
                value={data.nokPercentage}
                onChange={(e) => HandleInputChange(e)}
                readOnly={readOnly}
              />
            </div>
          </div>
          {/* <div>
            <label>Pan No</label>
            <div>
              <input
                style={{ ...inputStyling }}
                name="pan"
                value={data.pan}
                onChange={(e) => HandleInputChange(e)}
                readOnly={readOnly}
              />
            </div>
          </div> */}
          {/* <div>
            <label>Address</label>
            <div>
              <input
                style={{ ...inputStyling }}
                name="address"
                value={data.address}
                onChange={(e) => HandleInputChange(e)}
                readOnly={readOnly}
              />
            </div>
          </div> */}
          <div>
            <label>A/C Number</label>
            <div>
              <input
                style={{ ...inputStyling }}
                name="bankAccountNo"
                value={data?.bankAccount?.bankAccountNo}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setData({
                    ...data,
                    bankAccount: {
                      ...data.bankAccount,
                      [name]: value,
                    },
                  });
                }}
                readOnly={readOnly}
              />
            </div>
          </div>
          <div>
            <label>IFSC No</label>
            <div>
              <input
                style={{ ...inputStyling }}
                name="ifsc"
                value={data?.bankAccount?.bank?.ifsc}
                onChange={(e) => {
                  setIfscNo(e.target.value.toUpperCase());
                }}
                readOnly={readOnly}
              />
            </div>
          </div>
          <div>
            <label>Bank</label>
            <div>
              <input
                style={{ ...inputStyling }}
                value={data?.bankAccount?.bank?.bankName}
                readOnly
              />
            </div>
          </div>
          <div>
            <label>Bank Station</label>
            <div>
              <input
                style={{ ...inputStyling }}
                value={data?.bankAccount?.bank?.bankStation}
                readOnly
              />
            </div>
          </div>
          <div>
            <label>Branch</label>
            <div>
              <textarea
                style={{ ...inputStyling }}
                value={data?.bankAccount?.bank?.bankBranch}
                readOnly
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="w-32 mx-2"
            onClick={() => {
              console.log("data >>>> ", data);
              SubmitData();
            }}
          >
            {!data?.action && "Submit"}
            {data?.action == "submit" && "Submit"}
            {data?.action == "approve" && "Approve"}
          </button>
          {data?.action == "submit" || data?.action == "approve" ? (
            <button
              className="w-32 mx-2 bg-red-600"
              onClick={() => {
                Reject();
              }}
            >
              Send Back
            </button>
          ) : (
            ""
          )}
        </div>
        <div>
          <button onClick={() => console.log(data)}>Console log</button>
        </div>
      </div>
      <div>
        <Table data={processedData} columns={columns} />
      </div>
    </div>
  );
}
export default NokEdit;
