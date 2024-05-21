import axios from "axios";
import { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function DidsEdit() {
  const { id } = useParams();

  const didsTranObj = {
    didsId: id,
    cdaoNo: "",
    embassyName: "",
    voucherNo: "",
    voucherDate: "",
    dsop: "",
    agif: "",
    pliCgst: "",
    pliSgst: "",
    hba: "",
    pca: "",
    mca: "",
    agifCar: "",
    agifHba: "",
    agifPca: "",
    sca: "",
    mci: "",
    pci: "",
  };
  const embassyList = [
    "Afghanistan",
    "Bhutan",
    "Nepal",
    "Sri Lanka",
    "Maldives",
  ];

  const [didsData, setDidsData] = useState({});
  const [numOfOfficers, setNumOfOfficers] = useState();
  const [didsId, setDidsId] = useState();
  const [didsTransData, setDidsTransData] = useState([]);
  const [employeeNameList, setEmployeeNameList] = useState([]);
  const [validationAmount, setValidationAmount] = useState(0);
  const [didsReadonly, setDidsReadonly] = useState(true);
  const [didsTransReadonly, setDidsTransReadonly] = useState(false);

  const [serverErrors, setServerErrors] = useState([]);

  let history = useHistory();

  useEffect(() => {
    if (id) {
      axios.get(`/dids/${id}`).then((response) => {
        setDidsData(response.data);
        if (response.data.noOfOfficers && response.data.noOfOfficers > 0) {
          setNumOfOfficers(response.data.noOfOfficers);
          setDidsId(response.data.id);
          setDidsReadonly(false);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    if (numOfOfficers > 0 && didsId) {
      axios.get(`/didsTransaction/fkDids/${didsId}`).then((response) => {
        if (response.data.length > 0) {
          console.log(" >>> ", response.data);
          if (response.data[0]?.auditorDate) {
            setDidsTransReadonly(true);
            console.log("first");
          }

          let cdaoNoArr = [];
          let didsTranArr = [];

          let didsTranList = response.data;
          //adds distinct cdaoNo to cdaoNoArr
          didsTranList.map((item, index) => {
            let duplicateCdao = false;
            if (cdaoNoArr.includes(item.cdaoNo)) duplicateCdao = true;
            if (!duplicateCdao) {
              cdaoNoArr = [...cdaoNoArr, item.cdaoNo];
            }
          });

          let empNameArr = [];
          cdaoNoArr.map((item, index) => {
            axios
              .get(`/employees/empName/${item}`)
              .then((response) => {
                empNameArr = [...empNameArr, response.data];
                console.log(empNameArr[index]);
              })
              .then(() => {
                setEmployeeNameList(empNameArr);
              });
          });

          cdaoNoArr.map((cdaoNo) => {
            let didsTran = { ...didsTranObj, didsId: "" };
            didsTranList.map((item, index) => {
              if (item.cdaoNo == cdaoNo) {
                if (item.payCode) {
                  if (item.payCode.payCode == "DSOP") {
                    didsTran = { ...didsTran, dsop: item.amount };
                  } else if (item.payCode.payCode == "AGIF") {
                    didsTran = { ...didsTran, agif: item.amount };
                  } else if (item.payCode.payCode == "PLICGST") {
                    didsTran = { ...didsTran, pliCgst: item.amount };
                  } else if (item.payCode.payCode == "PLISGST") {
                    didsTran = { ...didsTran, pliSgst: item.amount };
                  }
                }
                if (item.loanCode) {
                  if (item.loanCode.loanCode == "HB") {
                    didsTran = { ...didsTran, hba: item.amount };
                  } else if (item.loanCode.loanCode == "PC") {
                    didsTran = { ...didsTran, pca: item.amount };
                  } else if (item.loanCode.loanCode == "MC") {
                    didsTran = { ...didsTran, mca: item.amount };
                  } else if (item.loanCode.loanCode == "AM") {
                    didsTran = { ...didsTran, agifCar: item.amount };
                  } else if (item.loanCode.loanCode == "AH") {
                    didsTran = { ...didsTran, agifHba: item.amount };
                  } else if (item.loanCode.loanCode == "AP") {
                    didsTran = { ...didsTran, agifPca: item.amount };
                  } else if (item.loanCode.loanCode == "SC") {
                    didsTran = { ...didsTran, sca: item.amount };
                  } else if (item.loanCode.loanCode == "MCI") {
                    didsTran = { ...didsTran, mci: item.amount };
                  } else if (item.loanCode.loanCode == "PCI") {
                    didsTran = { ...didsTran, pci: item.amount };
                  }
                }
                didsTran = {
                  ...didsTran,
                  embassyName: item.embassyName.toUpperCase(),
                  voucherNo: item.voucherNo,
                  voucherDate: item.voucherDate,
                };
              }
            });
            didsTran = {
              ...didsTran,
              cdaoNo: cdaoNo,
              didsId: didsId,
            };
            didsTranArr = [...didsTranArr, didsTran];
            setDidsTransData(didsTranArr);
          });
        } else {
          let initialDidsTranArr = [];
          for (let i = 0; i < didsData.noOfOfficers; i++) {
            initialDidsTranArr = [...initialDidsTranArr, didsTranObj];
          }
          setDidsTransData(initialDidsTranArr);
        }
      });
    }
  }, [didsId]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    let arr = [];
    arr = didsTransData.map((itm, i) => {
      if (i == index) {
        itm = { ...itm, [name]: value };
        return itm;
      }
      return itm;
    });
    setDidsTransData(arr);

    if (name == "cdaoNo" && value.length == 6) {
      axios.get(`/employees/empName/${value}`).then((response) => {
        setEmployeeNameList((prevState) => {
          let arr = [...prevState];
          arr[index] = response.data;
          return arr;
        });
      });
    }
  };

  const SubmitDids = () => {
    if (didsData.didsNo && didsData.noOfOfficers) {
      axios
        .put(
          `/dids/${id}/didsNo/${didsData.didsNo}/noOfOfficers/${didsData.noOfOfficers}?didsAmount=${didsData.didsAmount}`
        )
        .then((response) => {
          if (response.status == 200) {
            window.location.reload();
          }
        });
    }
  };

  useEffect(() => {
    const AmountValidation = () => {
      const didsTransDataKeyNameArray = Object.keys(didsTranObj);
      let amount = 0;
      didsTransData.map((item, index) => {
        for (let i = 5; i < didsTransDataKeyNameArray.length; i++) {
          // i=5 because from 0-4, keys don't belong to amount data
          amount = amount + Number(item[didsTransDataKeyNameArray[i]]);
        }
      });
      // console.log("grand total amount >>>", amount);
      setValidationAmount(amount);
    };
    AmountValidation();
  }, [didsTransData]);

  const HandleSubmit = () => {
    console.log(didsTransData);

    let validity = true; // remove these code upto cdaoNoArr.map if duplicate cdaoNo is allowed
    let cdaoNoArr = [];

    didsTransData.map((item, index) => {
      cdaoNoArr = [...cdaoNoArr, item.cdaoNo];
    });

    cdaoNoArr.map((it, ind) => {
      cdaoNoArr.map((itm, indx) => {
        if (ind != indx) {
          if (it == itm) validity = false;
        }
      });
    });

    if (validity && validationAmount == didsData.didsAmount) {
      axios
        .put(`/dids/submit/${id}`, didsTransData)
        .then((response) => {
          console.log(response.data);
          if (response.status == 200) history.push("/dids");
        })
        .catch((error) => {
          if (error.response.status == 400)
            setServerErrors(error.response.data);
          else setServerErrors(error.response.data);
        });
      console.log("validity", validity);
    } else {
      alert("either amount mismatch or duplicate cdao no");
    }
  };

  return (
    <div className="flex" style={{ fontSize: "20px", maxHeight: "85vh" }}>
      {didsData && didsData?.dak?.dakidNo && (
        <div className="w-80 bg-gray-200 pt-3 m-0 flex flex-col justify-around">
          <div>
            <div className="mb-2">
              <label style={{ fontSize: "18px" }}>Dak id</label>
              <input
                className="px-2 py-1 rounded-lg w-48"
                value={didsData?.dak?.dakidNo}
                readOnly
              />
            </div>
            <div className="mb-2">
              <label style={{ fontSize: "18px" }}>DIDS No</label>

              <input
                className="px-2 py-1 rounded-lg w-48"
                name="didsNo"
                value={didsData.didsNo}
                onChange={(e) =>
                  setDidsData({ ...didsData, didsNo: e.target.value })
                }
                readOnly={!didsReadonly}
              />
            </div>
            <div className="mb-2">
              <label style={{ fontSize: "18px" }}>Amount</label>
              <input
                className="px-2 py-1 rounded-lg w-48"
                value={didsData?.didsAmount}
                onChange={(e) =>
                  setDidsData({ ...didsData, didsAmount: e.target.value })
                }
                readOnly={!didsReadonly}
              />
            </div>
            <div className="mb-2">
              <label style={{ fontSize: "18px" }}>No of Officers</label>

              <input
                className="px-2 py-1 rounded-lg w-48"
                name="noOfOfficers"
                value={didsData.noOfOfficers}
                onChange={(e) =>
                  setDidsData({ ...didsData, noOfOfficers: e.target.value })
                }
                readOnly={!didsReadonly}
              />
            </div>
            {didsReadonly && (
              <div>
                <button className="w-32" onClick={SubmitDids}>
                  Submit
                </button>
              </div>
            )}
          </div>

          <div
            className={`text-white p-2 rounded-md ${
              validationAmount == didsData.didsAmount
                ? "bg-green-700"
                : "bg-red-700"
            }`}
          >
            <div className={`border-b-2 p-0 `}>Accumulated Amount</div>
            <div className={`p-0 text-right `}>{validationAmount}</div>
          </div>
        </div>
      )}

      <div className="m-0 p-0 w-full bg-green-200 max-h-screen overflow-auto ">
        <div className="font-lg text-red-500">{serverErrors}</div>
        <div className="m-0 p-0">
          {didsTransData?.map((item, index) => (
            <div
              className={`${
                index % 2 == 0 ? "bg-green-200" : "bg-green-100"
              } flex items-center p-3`}
              key={index}
            >
              <div
                className={`w-10 h-10 p-3 rounded-full bg-white flex justify-center items-center`}
              >
                {index + 1}
              </div>
              <div className="px-36 w-10/12">
                <div className="flex flex-wrap  mb-3">
                  <div>
                    <label style={{ fontSize: "18px" }}>Cdao No</label>
                    <input
                      className="px-2 py-1 rounded-lg w-40"
                      name="cdaoNo"
                      value={item.cdaoNo}
                      onChange={(e) => handleInputChange(e, index)}
                      readOnly={didsTransReadonly}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "18px" }}>Officer Name</label>
                    <input
                      className="px-2 py-1 rounded-lg w-56"
                      name="cdaoNo"
                      value={employeeNameList[index]}
                      readOnly
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "18px" }}>Voucher No</label>
                    <input
                      className="px-2 py-1 rounded-lg w-40"
                      name="voucherNo"
                      value={item.voucherNo}
                      onChange={(e) => handleInputChange(e, index)}
                      readOnly={didsTransReadonly}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "18px" }}>Voucher Date</label>
                    <input
                      className="px-2 py-1 rounded-lg w-40"
                      name="voucherDate"
                      type="date"
                      value={item.voucherDate}
                      onChange={(e) => handleInputChange(e, index)}
                      readOnly={didsTransReadonly}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "18px" }}>Embassy Name</label>
                    <select
                      className="bg-white px-2 py-1 rounded-lg w-40"
                      name="embassyName"
                      value={item.embassyName}
                      onChange={(e) => handleInputChange(e, index)}
                      disabled={didsTransReadonly}
                    >
                      <option value="">--Select--</option>
                      {embassyList.map((item, index) => (
                        <option value={item.toUpperCase()} key={index}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex flex-wrap  mb-3">
                  <div>
                    <label style={{ fontSize: "18px" }}>DSOP</label>
                    <input
                      className="px-2 py-1 rounded-lg w-40"
                      name="dsop"
                      value={item.dsop}
                      onChange={(e) => handleInputChange(e, index)}
                      readOnly={didsTransReadonly}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "18px" }}>AGIF</label>
                    <input
                      className="px-2 py-1 rounded-lg w-40"
                      name="agif"
                      value={item.agif}
                      onChange={(e) => handleInputChange(e, index)}
                      readOnly={didsTransReadonly}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "18px" }}>PLI CGST</label>
                    <input
                      className="px-2 py-1 rounded-lg w-40"
                      name="pliCgst"
                      value={item.pliCgst}
                      onChange={(e) => handleInputChange(e, index)}
                      readOnly={didsTransReadonly}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "18px" }}>PLI SGST</label>
                    <input
                      className="px-2 py-1 rounded-lg w-40"
                      name="pliSgst"
                      value={item.pliSgst}
                      onChange={(e) => handleInputChange(e, index)}
                      readOnly={didsTransReadonly}
                    />
                  </div>
                  {/* </div>
                <div className="flex flex-wrap justify-between mb-3"> */}
                  <div>
                    <label style={{ fontSize: "18px" }}>HBA</label>
                    <input
                      className="px-2 py-1 rounded-lg w-40"
                      name="hba"
                      value={item.hba}
                      onChange={(e) => handleInputChange(e, index)}
                      readOnly={didsTransReadonly}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "18px" }}>PCA</label>
                    <input
                      className="px-2 py-1 rounded-lg w-40"
                      name="pca"
                      value={item.pca}
                      onChange={(e) => handleInputChange(e, index)}
                      readOnly={didsTransReadonly}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "18px" }}>MCA</label>
                    <input
                      className="px-2 py-1 rounded-lg w-40"
                      name="mca"
                      value={item.mca}
                      onChange={(e) => handleInputChange(e, index)}
                      readOnly={didsTransReadonly}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "18px" }}>AGIF CAR</label>
                    <input
                      className="px-2 py-1 rounded-lg w-40"
                      name="agifCar"
                      value={item.agifCar}
                      onChange={(e) => handleInputChange(e, index)}
                      readOnly={didsTransReadonly}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "18px" }}>AGIF HBA</label>
                    <input
                      className="px-2 py-1 rounded-lg w-40"
                      name="agifHba"
                      value={item.agifHba}
                      onChange={(e) => handleInputChange(e, index)}
                      readOnly={didsTransReadonly}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "18px" }}>AGIF PCA</label>
                    <input
                      className="px-2 py-1 rounded-lg w-40"
                      name="agifPca"
                      value={item.agifPca}
                      onChange={(e) => handleInputChange(e, index)}
                      readOnly={didsTransReadonly}
                    />
                  </div>
                  {/* </div>
                <div className="flex flex-wrap justify-between mb-3"> */}
                  <div>
                    <label style={{ fontSize: "18px" }}>SCA(00/086/21)</label>
                    <input
                      className="px-2 py-1 rounded-lg w-40"
                      name="sca"
                      value={item.sca}
                      onChange={(e) => handleInputChange(e, index)}
                      readOnly={didsTransReadonly}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "18px" }}>MCI</label>
                    <input
                      className="px-2 py-1 rounded-lg w-40"
                      name="mci"
                      value={item.mci}
                      onChange={(e) => handleInputChange(e, index)}
                      readOnly={didsTransReadonly}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "18px" }}>PCI</label>
                    <input
                      className="px-2 py-1 rounded-lg w-40"
                      name="pci"
                      value={item.pci}
                      onChange={(e) => handleInputChange(e, index)}
                      readOnly={didsTransReadonly}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {!didsReadonly && didsData.approved != true && (
          <div className="flex justify-center h-auto m-0 p-0">
            <button
              className="w-32 bg-red-500 m-0 p-0"
              onClick={() => HandleSubmit()}
            >
              Submit
            </button>
            {/* <button
              className="w-auto px-2 bg-red-500"
              onClick={() => console.log(didsTransData)}
            >
              Console Transaction Data
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default DidsEdit;
