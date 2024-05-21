import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function StipendEditNew() {
  let { id } = useParams();
  let extnObj = {
    cdaoNo: "",
    empName: "",
    employee: {},
    rankName: "",
    fromDate: "",
    toDate: "",
    letterNo: "",
    letterDate: "",
    mroNo: "",
    mroDate: "",
    mroNature: "",
    amount: 0,
    sectionRemarks: "",
    unit: {},
    select: false,
  };
  const [obj, setObj] = useState(extnObj);
  const [data, setData] = useState({});
  const [previousData, setPreviousData] = useState({});
  const [msg, setMsg] = useState("");
  const [duplicateObj, setDuplicateObj] = useState({});

  useEffect(() => {
    if (id !== "new") {
      axios.get(`/stipends/id/${id}`).then((response) => {
        console.log(response.data);
        setPreviousData(response.data[1]);
        let d = response.data[1];
        setData({
          ...data,
          dak: d.dak,
          letterNo: d.letterNo,
          letterDate: d.letterDate,
          mroDate: d.mroDate,
          mroNature: d.mroNature,
          mroNo: d.mroNo,
        });
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name !== "employee") setData({ ...data, [name]: value });
    else {
      setData({ ...data, employee: null });
      if (value?.length == 6) {
        axios.get(`/employees/byCdaoNo/${value}`).then((response) => {
          console.log("emp data >> ", response.data);
          if (response.data.id) setData({ ...data, [name]: response.data });
        });
      }
    }
  };

  const AudSubmit = () => {
    axios.put(`/stipends/audEntry`, data).then((response) => {
      console.log("saved data >> ", response.data);
      if (response.data[0].id) {
        window.location.reload();
      }
      if (response.data[1]) setMsg(response.data[1]);
      if (response.data[2] && response.data[2]?.id)
        setDuplicateObj(response.data[2]);
    });
  };

  const myStyle = {
    inputStyling: {
      padding: "0 10px",
    },
    labelStyling: {
      fontSize: "18px",
      marginBottom: "5px",
    },
  };

  return (
    <div>
      <div className="flex justify-center p-3">
        <div className="bg-green-200 rounded-2xl">
          <div className=" my-2">
            <div>
              <label>Letter No</label>
              <input
                style={{ ...myStyle.inputStyling }}
                name="letterNo"
                value={data.letterNo}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div>
              <label>Letter Date</label>
              <input
                style={{ ...myStyle.inputStyling }}
                name="letterDate"
                value={data.letterDate}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          </div>
          <div className=" my-2">
            <div>
              <label>MRO No</label>
              <input
                style={{ ...myStyle.inputStyling }}
                name="mroNo"
                value={data.mroNo}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div>
              <label>MRO Date</label>
              <input
                style={{ ...myStyle.inputStyling }}
                name="mroDate"
                value={data.mroDate}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          </div>
          <div className=" my-2">
            <div>
              <label>Mro Nature</label>
              <input
                style={{ ...myStyle.inputStyling }}
                name="mroNature"
                value={data.mroNature}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div>
              <label>Section Remarks</label>
              <input
                style={{ ...myStyle.inputStyling }}
                name="sectionRemarks"
                value={data.sectionRemarks}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          </div>
          <button
            className="w-32"
            onClick={() => console.log("data >> ", data)}
          >
            Console
          </button>
        </div>
        <div className="flex flex-col items-center">
          {msg && <div className="text-red-600">{msg}</div>}
          <div className="bg-green-200 rounded-2xl flex flex-wrap p-2">
            <div>
              <label>Employee</label>
              <input
                style={{ ...myStyle.inputStyling }}
                name="employee"
                value={data.employee?.cdaoNo}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div>
              <label>Name</label>
              <input
                style={{ ...myStyle.inputStyling, backgroundColor: "white" }}
                defaultValue={data.employee?.officerName}
                disabled
              />
            </div>
            <div>
              <label>From Date</label>
              <input
                type="date"
                style={{ ...myStyle.inputStyling }}
                name="fromDate"
                value={data.fromDate}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div>
              <label>To Date</label>
              <input
                type="date"
                style={{ ...myStyle.inputStyling }}
                name="toDate"
                value={data.toDate}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div>
              <label>Amount</label>
              <input
                style={{ ...myStyle.inputStyling }}
                name="amount"
                value={data.amount}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          </div>
          <div>
            <button className="w-32" onClick={() => AudSubmit()}>
              Submit
            </button>
          </div>
          <div className="bg-yellow-200 rounded-2xl flex flex-wrap p-2 mt-2">
            <div>
              <label>Employee</label>
              <input
                style={{ ...myStyle.inputStyling }}
                name="employee"
                value={previousData.employee?.cdaoNo}
                readOnly
              />
            </div>
            <div>
              <label>Name</label>
              <input
                style={{ ...myStyle.inputStyling, backgroundColor: "white" }}
                defaultValue={previousData.employee?.officerName}
                disabled
              />
            </div>
            <div>
              <label>From Date</label>
              <input
                type="date"
                style={{ ...myStyle.inputStyling }}
                name="fromDate"
                value={previousData.fromDate}
                readOnly
              />
            </div>
            <div>
              <label>To Date</label>
              <input
                type="date"
                style={{ ...myStyle.inputStyling }}
                name="toDate"
                value={previousData.toDate}
                readOnly
              />
            </div>
            <div>
              <label>Amount</label>
              <input
                style={{ ...myStyle.inputStyling }}
                name="amount"
                value={previousData.amount}
                readOnly
              />
            </div>
          </div>
          {duplicateObj.id && (
            <div className="bg-red-300 rounded-2xl flex flex-wrap p-2 mt-2">
              <div>
                <label>Employee</label>
                <input
                  style={{ ...myStyle.inputStyling }}
                  name="employee"
                  value={duplicateObj.employee?.cdaoNo}
                  readOnly
                />
              </div>
              <div>
                <label>Name</label>
                <input
                  style={{ ...myStyle.inputStyling, backgroundColor: "white" }}
                  defaultValue={duplicateObj.employee?.officerName}
                  disabled
                />
              </div>
              <div>
                <label>From Date</label>
                <input
                  type="date"
                  style={{ ...myStyle.inputStyling }}
                  name="fromDate"
                  value={duplicateObj.fromDate}
                  readOnly
                />
              </div>
              <div>
                <label>To Date</label>
                <input
                  type="date"
                  style={{ ...myStyle.inputStyling }}
                  name="toDate"
                  value={duplicateObj.toDate}
                  readOnly
                />
              </div>
              <div>
                <label>Amount</label>
                <input
                  style={{ ...myStyle.inputStyling }}
                  name="amount"
                  value={duplicateObj.amount}
                  readOnly
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StipendEditNew;
