import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import {
  Link,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import TableCopy from "../utils/TableCopy";

function DgnEdit() {
  let { dakId } = useParams();
  let history = useHistory();

  const dgnObj = {
    cdaoNo: "",
    dak: {},
    promotDate: "",
    dgnDate: "",
    dgnAuthority: "",
    employee: { icNo: "", cdaoNo: "", officerName: "", rank: { rankName: "" } },
    rank: {},
    action: "",
    actionable: true,
    remarks: "",
  };

  const [dak, setDak] = useState({});
  const [dgnData, setDgnData] = useState([]);
  const [dgnInputObj, setDgnInputObj] = useState(dgnObj);
  const [rankOrder, setRankOrder] = useState([
    1, 2, 3, 4, 14, 5, 15, 6, 7, 8, 9, 11, 12, 13, 10,
  ]);
  const [allRankList, setAllRankList] = useState();
  const [rankList, setRankList] = useState([]);
  const [usr, setUsr] = useState({});

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("usr"));
    setUsr(user);
  }, []);

  useEffect(() => {
    if (dakId !== "new") {
      console.log("dakId >>> ", dakId);
      axios.get(`/daks/${dakId}`).then((response) => {
        if (response.data?.dakidNo) {
          console.log("dak data >>> ", response.data);
          setDak(response.data);
          setDgnInputObj({ ...dgnInputObj, dak: response.data });
        }
      });
    }
  }, [dakId]);

  useEffect(() => {
    if (dgnInputObj.dak?.id) {
      FetchDgnData();
    }
  }, [dgnInputObj.dak.id]);

  async function FetchDgnData() {
    await axios.get(`/dgn/fkdak/${dgnInputObj.dak.id}`).then((response) => {
      console.log(response.data);
      if (response.data?.length > 0) {
        setDgnData(response.data);
        setDgnInputObj({
          ...dgnObj,
          dak: dgnInputObj.dak,
          dgnAuthority: response.data[0].dgnAuthority,
          dgnDate: response.data[0]?.dgnDate,
          actionable: response.data[0]?.actionable,
        });
      }
    });
  }

  useEffect(() => {
    axios.get(`/ranks/allRanks`).then((response) => {
      setAllRankList(response.data);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDgnInputObj({ ...dgnInputObj, [name]: value });
  };

  const handleIcNoInputChange = (e) => {
    let { name, value } = e.target;
    value = value.toUpperCase();
    if (value.length > 6 && value.length < 10) {
      axios.get(`/employees/byIcNo/${value}`).then((response) => {
        if (response.data.icNo) {
          console.log("employee data >>> ", response.data);
          setDgnInputObj({ ...dgnInputObj, employee: response.data });
          if (response.data?.rank?.rankCode) {
            DeterminigPromotionRankList(response.data);
          }
        } else {
          setDgnInputObj({
            ...dgnInputObj,
            employee: { ...dgnObj.employee, [name]: value },
          });
        }
      });
    } else {
      setDgnInputObj({
        ...dgnInputObj,
        employee: { ...dgnObj.employee, [name]: value },
      });
    }
  };

  const handleCdaoNoInputChange = (e) => {
    const { name, value } = e.target;
    if (value.length == 6) {
      axios.get(`/employees/byCdaoNo/${value}`).then((response) => {
        if (response.data.cdaoNo) {
          console.log("employee data >>> ", response.data);
          setDgnInputObj({ ...dgnInputObj, employee: response.data });
          if (response.data?.rank?.rankCode) {
            DeterminigPromotionRankList(response.data);
          }
        } else {
          setDgnInputObj({
            ...dgnInputObj,
            employee: { ...dgnObj.employee, [name]: value },
          });
        }
      });
    } else {
      setDgnInputObj({
        ...dgnInputObj,
        employee: { ...dgnObj.employee, [name]: value },
      });
    }
  };

  function DeterminigPromotionRankList(emp) {
    let empRankCode = Number(emp.rank?.rankCode);
    let orderArr = [];
    let rankArr = [];
    rankOrder.map((item, index) => {
      if (item === empRankCode) {
        if (empRankCode == 10) {
          orderArr = [item];
        } else if (empRankCode == 4 || empRankCode == 5 || empRankCode == 12) {
          orderArr = [item, rankOrder[index + 1], rankOrder[index + 2]];
        } else {
          orderArr = [item, rankOrder[index + 1]];
        }
      }
    });
    orderArr.map((item, index) => {
      allRankList.map((itm, indx) => {
        if (item === Number(itm.rankCode)) {
          rankArr = [...rankArr, itm];
        }
      });
    });
    setRankList(rankArr);
  }

  const AuditorSave = () => {
    console.log(dgnInputObj);
    let valid = true;
    const actionableRequiredField = {
      dak: {},
      dgnAuthority: "",
      dgnDate: "",
      employee: {
        icNo: "",
        cdaoNo: "",
        officerName: "",
        rank: { rankName: "" },
      },
      rank: {},
      promotDate: "",
    };
    for (let x in actionableRequiredField) {
      if (!dgnInputObj.actionable && (x === "rank" || x === "promotDate"))
        continue;
      if (typeof dgnInputObj[x] === "object") {
        if (!dgnInputObj[x]["id"]) {
          valid = false;
          break;
        }
      } else {
        if (!dgnInputObj[x]) {
          valid = false;
          break;
        }
      }
    }
    console.log("valid >> ", valid);
    let dgnNewObj = { ...dgnInputObj };
    if (!dgnNewObj.rank.id) {
      dgnNewObj = { ...dgnNewObj, rank: null };
    }
    console.log(dgnNewObj);

    if (valid) {
      axios.post(`/dgn/audSave`, dgnNewObj).then((response) => {
        console.log(response.data);
        if (response.data == "ok") {
          window.location.reload();
          // FetchDgnData();
        }
      });
    }
  };

  const FinalSubmit = () => {
    axios.put(`/dgn/submit/${dakId}`).then((response) => {
      console.log(response.data);
      if (response.data == "ok") {
        history.push("/dgns");
      }
    });
  };

  const RollBackDgnDak = () => {
    axios.put(`/dgn/rollBack/${dakId}`).then((response) => {
      console.log(response.data);
      if (response.data == "ok") {
        history.push("/dgns");
      }
    });
  };

  return (
    <div className="">
      <div>
        <div>
          <div>
            <div className="mb-3">
              <h1 className="text-center underline">
                Dgn
                {dak?.disposalApproved
                  ? " View"
                  : ` ${dakId == "new" ? "Add" : "Edit"}`}
              </h1>
            </div>
            <div className="flex justify-around">
              {usr?.designation?.designationLevel < 30 &&
                !dak?.disposalApproved && (
                  <div className="bg-green-200 px-3 py-3 rounded-xl flex flex-col justify-between m-0">
                    <div className="p-0 ">
                      <div className="mt-3">
                        <label>DGN No</label>
                        <div className="p-0">
                          <input
                            className="px-2 py-1"
                            name="dgnAuthority"
                            value={dgnInputObj.dgnAuthority}
                            onChange={(e) => handleInputChange(e)}
                            disabled={dgnData.length > 0}
                          />
                        </div>
                      </div>
                      <div className="mt-3">
                        <label>DGN Date</label>
                        <div className="p-0">
                          <input
                            className="w-full px-2 py-1"
                            name="dgnDate"
                            type="date"
                            value={dgnInputObj.dgnDate}
                            onChange={(e) => handleInputChange(e)}
                            disabled={dgnData.length > 0}
                          />
                        </div>
                      </div>

                      <div className="mt-3">
                        <label>
                          <span className="p-0">
                            <input
                              className="px-2 py-1 w-10 h-10 mx-3"
                              name="actionable"
                              type="checkbox"
                              checked={dgnInputObj.actionable}
                              onChange={(e) => {
                                const { name, checked } = e.target;
                                setDgnInputObj({
                                  ...dgnInputObj,
                                  [name]: checked,
                                });
                              }}
                            />
                          </span>
                          Actionable
                        </label>
                      </div>
                      <div className="mt-3">
                        <label>IC No</label>
                        <div className="p-0">
                          <input
                            className="px-2 py-1"
                            maxLength={8}
                            name="icNo"
                            value={dgnInputObj.employee?.icNo}
                            onChange={(e) => handleIcNoInputChange(e)}
                          />
                        </div>
                      </div>
                      <div className="mt-3">
                        <label>Cdao No</label>
                        <div className="p-0">
                          <input
                            className="px-2 py-1"
                            maxLength={6}
                            name="cdaoNo"
                            value={dgnInputObj.employee?.cdaoNo}
                            onChange={(e) => handleCdaoNoInputChange(e)}
                          />
                        </div>
                      </div>
                      <div className="mt-3">
                        <label>Officer Name</label>
                        <div className="p-0">
                          <input
                            className="px-2 py-1"
                            name="cdaoNo"
                            value={dgnInputObj.employee?.officerName}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="mt-3">
                        <label>Current Rank</label>
                        <div className="p-0">
                          <input
                            className="px-2 py-1"
                            name="cdaoNo"
                            value={
                              dgnInputObj.employee?.rank?.rankCode +
                              " " +
                              dgnInputObj.employee?.rank?.rankName
                            }
                            readOnly
                          />
                        </div>
                      </div>
                      {dgnInputObj.actionable ? (
                        <>
                          <div className="mt-3">
                            <label>Promoted Rank</label>
                            <div className="p-0">
                              <select
                                className="w-full bg-white px-2 py-1"
                                value={dgnInputObj.rank?.id}
                                onChange={(e) => {
                                  allRankList.map((itm, indx) => {
                                    if (itm.id == e.target.value) {
                                      setDgnInputObj({
                                        ...dgnInputObj,
                                        rank: itm,
                                      });
                                    }
                                  });
                                }}
                              >
                                <option>--Select Rank--</option>
                                {rankList?.map((item, index) => (
                                  <option value={item.id} key={index}>
                                    {item.rankCode} {item.rankName}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="mt-3">
                            <label>Date of Promotion</label>
                            <div className="p-0">
                              <input
                                className="w-full px-2 py-1"
                                name="promotDate"
                                type="date"
                                value={dgnInputObj.promotDate}
                                onChange={(e) => handleInputChange(e)}
                              />
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="mt-3">
                          <label>Remarks</label>
                          <div className="p-0">
                            <textarea
                              className="w-full px-2 py-1"
                              name="remarks"
                              value={dgnInputObj.remarks}
                              onChange={(e) => handleInputChange(e)}
                            />
                          </div>
                        </div>
                      )}
                      <div>
                        <button onClick={() => AuditorSave()}>Save</button>
                      </div>
                    </div>
                    <div className="h-32 flex justify-center items-center font-bold m-0 p-0">
                      <div className="bg-white px-3 py-2 m-0 p-0">
                        Updated DGN Records: {dgnData?.length}
                      </div>
                    </div>
                  </div>
                )}
              <div className="overflow-auto " style={{ maxHeight: "80vh" }}>
                <div className="">
                  {/* <TableCopy data={dgnData} columns={columns} /> */}
                  <table className=" bg-white relative">
                    <thead className=" sticky top-0 bg-green-200 ">
                      <tr className="">
                        <th className="text-center px-2 py-1">Sl No</th>
                        {!dak?.disposalApproved
                          ? usr?.designation?.designationLevel < 30 &&
                            !dak?.auditorDate && (
                              <th className="text-center px-4 py-1">Action</th>
                            )
                          : ""}

                        <th className="text-center px-4 py-1">DGN Authority</th>
                        <th className="text-center px-4 py-1">IC No</th>
                        <th className="text-center px-4 py-1">CDAO No</th>
                        <th className="text-center px-4 py-1">Officer Name</th>
                        <th className="text-center px-4 py-1">Promoted Rank</th>
                        <th className="text-center px-4 py-1">
                          Promotion Date
                        </th>
                        {!dak?.disposalApproved && (
                          <th className="text-center px-4 py-1">Action</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {dgnData &&
                        dgnData.map((item, index) => (
                          <tr
                            key={index}
                            className={`border-l-2 border-r-2 border-b-2 border-gray-200 ${
                              index % 2 === 0 ? "bg-white " : "bg-gray-200"
                            }`}
                          >
                            <td className="text-center px-2 py-2 ">
                              {index + 1}
                            </td>
                            {!dak?.disposalApproved
                              ? usr?.designation?.designationLevel < 30 &&
                                !dak?.auditorDate && (
                                  <td className="text-center px-2 py-2">
                                    <button
                                      className="m-0 "
                                      onClick={() => {
                                        setDgnInputObj(dgnData[index]);
                                      }}
                                    >
                                      Edit
                                    </button>
                                  </td>
                                )
                              : ""}

                            <td className="text-center px-2 py-2">
                              {item.dgnAuthority}
                            </td>
                            <td className="text-center px-2 py-2">
                              {item.employee.icNo}
                            </td>
                            <td className="text-center px-2 py-2">
                              {item.employee.cdaoNo}
                            </td>
                            <td className="text-left px-2 py-2">
                              {`(${item.employee.rank.rankCode})`}{" "}
                              {item.employee.rank.rankName}{" "}
                              {item.employee.officerName}
                            </td>
                            <td className="text-center px-2 py-2">
                              {`(${item.rank?.rankCode}) `}
                              {item.rank?.rankName}
                            </td>
                            <td className="text-center px-2 py-2">
                              {item.promotDate}
                            </td>
                            {!dak?.disposalApproved && (
                              <td className="text-center px-2 py-2">
                                <button
                                  className="m-0 bg-red-500 hover:bg-red-700"
                                  onClick={() => {
                                    axios
                                      .put(`/dgn/delete/${item.id}`)
                                      .then((response) => {
                                        if (response.data == "ok") {
                                          window.location.reload();
                                        }
                                      });
                                  }}
                                >
                                  Delete
                                </button>
                              </td>
                            )}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                {((dgnData.length > 0 &&
                  usr?.designation?.designationLevel < 30) ||
                  usr?.designation?.designationLevel >= 30) &&
                  !dak?.disposalApproved && (
                    <div className="flex justify-center mt-6">
                      <div className="w-7/12 flex">
                        {usr?.designation?.designationLevel >= 30 && (
                          <button
                            className="m-2 bg-red-500"
                            onClick={() => RollBackDgnDak()}
                          >
                            Roll Back
                          </button>
                        )}
                        <button className="m-2" onClick={() => FinalSubmit()}>
                          {usr?.designation?.designationLevel < 30 &&
                            "Final Submit"}
                          {usr?.designation?.designationLevel == 30 && "Submit"}
                          {usr?.designation?.designationLevel > 30 && "Approve"}
                        </button>

                        <button
                          className="m-2 bg-red-400"
                          onClick={() => history.push("/dgnsNew/dakList")}
                        >
                          Exit
                        </button>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DgnEdit;
