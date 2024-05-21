import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

function BListingEdit() {
  let { id } = useParams();
  let history = useHistory();

  const bListObj = {
    cdaoNo: "",
    toSection: { sectionName: "" },
    employee: { icNo: "", rank: { rankName: "" }, officerName: "" },
  };

  const [data, setData] = useState(bListObj);
  const [empData, setEmpData] = useState({
    icNo: "",
    rank: { rankName: "" },
    officerName: "",
  });
  const [cdaoNo, setCdaoNo] = useState("");
  const [usr, setUsr] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (id != "new") {
      axios.get(`/blisting/${id}`).then((response) => {
        console.log(response.data);
        setData(response.data);
        setEmpData(response.data.employee);
        setCdaoNo(response.data.cdaoNo);
        if (response.data.aListApproval == "A") setDisabled(true);
      });
    }
  }, []);

  useEffect(() => {
    setError("");
    if (cdaoNo.length > 4 && cdaoNo.length < 8) {
      console.log(cdaoNo);
      axios.get(`/employees/cdaono/${cdaoNo}`).then((response) => {
        if (response.data.officerName) {
          setEmpData(response.data);
        } else {
          setEmpData({ icNo: "", rank: { rankName: "" }, officerName: "" });
        }

        console.log(response.data);
      });
    }
  }, [cdaoNo]);

  useEffect(() => {
    let usr = JSON.parse(sessionStorage.getItem("usr"));
    setUsr(usr);
    console.log(usr);
  }, []);

  function HandleInputCdaoNo(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  function HandleInputToSection(e) {
    const { name, value } = e.target;
    setData({ ...data, toSection: { ...data.toSection, [name]: value } });
  }

  async function SubmitBList(cdaoNo) {
    if (id == "new") {
      await axios.post(`/blisting/audSubmit`, data).then((response) => {
        console.log(response.data);
        if (response.data == "ok") {
          setSuccess(true);
          setError(`Added ${cdaoNo} in B List`);
          setTimeout(() => history.push("/blistingList"), 4000);
        } else if (response.data == "already exists") {
          setError("This Officer is already B-Listed");
        } else if (response.data == "err") {
          setError("This Officer doesn't belong to you");
        } else if ((response.data = "rank err")) {
          setError("Please check officer's rank");
        }
      });
    } else {
      await axios.put(`/blisting/save/${id}`, data).then((response) => {
        console.log(response.data);
        if (response.data == "ok") {
          setSuccess(true);
          setError(`Added ${cdaoNo} in B List`);
          setTimeout(() => history.push("/blistingList"), 4000);
        } else if (response.data == "already exists") {
          setError("This Officer is already B-Listed");
        } else if (response.data == "err") {
          setError("This Officer doesn't belong to you");
        } else if ((response.data = "rank err")) {
          setError("Please check officer's rank");
        }
      });
    }
  }

  return (
    <div className="flex justify-center items-center ">
      <div className="w-4/12 bg-gray-300 p-2 flex flex-col items-center rounded-2xl">
        {error && (
          <div
            className={`text-white bg-red-600 px-3 py-1 rounded-md ${
              success ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {error}
          </div>
        )}
        <div>
          <h1>{id == "new" ? "Add " : "Edit "}B Listing</h1>
        </div>
        <div className="flex flex-col flex-wrap justify-center items-center ">
          <div className="mt-3">
            <label>CDAONo</label>
            <input
              placeholder="enter cdao no without alpha"
              value={data.cdaoNo}
              onChange={(e) => {
                setCdaoNo(e.target.value);
                HandleInputCdaoNo(e);
              }}
              name="cdaoNo"
              className="bg-white px-3 py-1 rounded-md"
              readOnly={disabled}
            />
          </div>
          <div className="mt-3">
            <label>IC No / Personal Number</label>
            <input
              readOnly={true}
              value={empData?.icNo}
              className="bg-white px-3 py-1 rounded-md"
            />
          </div>
          <div className="mt-3">
            <label>Officer Rank</label>
            <input
              readOnly={true}
              value={empData?.rank?.rankName}
              className="bg-white px-3 py-1 rounded-md"
            />
          </div>
          <div className="mt-3">
            <label>Officer Name</label>
            <input
              readOnly={true}
              value={empData?.officerName}
              className="bg-white px-3 py-1 rounded-md"
            />
          </div>
          {empData?.fsDueDate && (
            <div className="mt-3">
              <label>Retirement Date</label>
              <input
                readOnly={true}
                value={empData?.fsDueDate}
                className="bg-white px-3 py-1 rounded-md"
              />
            </div>
          )}

          <div className="mt-3">
            <label>To Section</label>
            <select
              name="sectionName"
              value={data.toSection?.sectionName.toLocaleLowerCase()}
              onChange={(e) => HandleInputToSection(e)}
              disabled={disabled}
            >
              <option value="">--Select Section--</option>
              {usr?.section?.sectionName !== "LW18" && (
                <option value="lw18">LW18</option>
              )}
              <option value="psc">PSC</option>
            </select>
          </div>
        </div>
        {!disabled && (
          <div>
            <button
              className="w-32"
              onClick={(e) => {
                if (
                  data.cdaoNo.length > 0 &&
                  data.toSection.sectionName.length > 0
                ) {
                  SubmitBList(cdaoNo);
                  console.log(data);
                } else {
                  setError("Please select 'To Section'");
                  console.log(data);
                }
              }}
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default BListingEdit;
