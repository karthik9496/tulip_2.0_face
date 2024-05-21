/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By :
 */

import { useState } from "react";

import { withRouter, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { format } from "date-fns";

const ViewRentMaster = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm({
    //resolver: yupResolver(schema)
  });

  let history = useHistory();
  const [serverErrors, setServerErrors] = useState([]);
  const [action, setAction] = useState("");
  const [occVacData, setOccVacData] = useState([]);
  const [lfeeData, setLfeeData] = useState([]);
  const [furData, setFurData] = useState([]);
  const [rentData, setRentData] = useState([]);
  const [empData, setEmpData] = useState([]);
  const [cdaoNo, setCdaoNo] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [lightTheme, setLightTheme] = useState(true);

  const generateRentDetails = () => {
    setDisabled(true);

    let saving = false;
    console.log(cdaoNo);

    async function fetchRentData() {
      console.log(cdaoNo);

      await axios
        .get(`/rents/rentDetails/${cdaoNo}/`)
        .then((response) => {
          console.log(response.data);

          setOccVacData([]);
          setRentData([]);
          setLfeeData([]);
          setEmpData([]);

          if (response.data["occVacObj"] !== null)
            setOccVacData(response.data["occVacObj"]);
          if (response.data["rentObj"] !== null)
            setRentData(response.data["rentObj"]);
          if (response.data["lfeeObj"] !== null)
            setLfeeData(response.data["lfeeObj"]);
          if (response.data["empObj"] !== null)
            setEmpData(response.data["empObj"]);

          setDisabled(false);
        })
        .catch((error) => {
          console.log(error);
          //	console.log(error.response.status);
          //	console.log(error.response.headers);
          if (error.response) setServerErrors(error.response.data.error);
          else setServerErrors(error.Error);
        });
    }
    fetchRentData();

    return () => {
      saving = true;
    };
  };

  const onError = (errors, e) => {
    console.log(errors, e);
  };
  const handleKeyPress = (event) => {
    // look for the `Enter` keyCode
    if (event.keyCode === 13 || event.which === 13) {
      handleSubmit(event);
      setCdaoNo(event.target.value);
      generateRentDetails();
    }
  };
  const handleInputChange = (e) => {
    //e.preventDefault();
    console.log(e.target.value);
    setCdaoNo(e.target.value);
  };

  return (
    <div
      className={lightTheme ? "theme-light" : "theme-dark"}
      style={disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}
    >
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <h1 className="text-xl font-semibold ml-4">Rent Details</h1>
          <div className="flexContainer">
            <input
              type="text"
              name="search"
              placeholder="CDAO No"
              onChange={(e) => handleInputChange(e)}
              onKeyPress={handleKeyPress}
              className="pl-2 -ml-2 inputField flex-initial"
            />
            <button
              type="submit"
              onClick={generateRentDetails}
              className="w-24 m-0 p-0"
            >
              Search
            </button>
          </div>

          <h1 class="text-blue-600" align="center">
            Officer Details
          </h1>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Cdao No</th>
                <th>Officer Name</th>
                <th>Task No</th>
                <th>Rank</th>
                <th>Personel No</th>
              </tr>
              {empData &&
                empData.map((e) => (
                  <tr>
                    <td> {e.cdaoNo} </td>
                    <td>
                      {" "}
                      {e.name} {}
                    </td>
                    <td>
                      {" "}
                      {e.task} {}
                    </td>
                    <td> {e.rankName}</td>
                    <td>
                      {" "}
                      {e.perNo}
                      {}
                    </td>
                  </tr>
                ))}
            </thead>

            <tbody>
              {empData.length === 0 && (
                <tr>
                  <td colspan="5" align="center">
                    No Bill Details Avaialble{" "}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <br />

          <h1 class="text-blue-600" align="center">
            Occupation Vacation Details
          </h1>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Building No</th>
                <th>Lf Rate</th>
                <th>Fur Rate</th>
                <th>Occupation Date</th>
                <th>Occ Adj Month</th> {/* PCDAO 16022024 */}
                <th>Vacation Date</th>
                <th>Vac Adj Month</th> {/* PCDAO 16022024 */}
                <th>Stop IOR Date</th>
                <th>Rent Bill No</th>
                <th>Rent Bill Date</th>
                {/* <th>Elec Rate</th>*/} {/* PCDAO 16022024 */}
              </tr>
              {occVacData &&
                occVacData.map((tr) => (
                  <tr key={tr.cdaoNo}>
                    <td>{tr.buildingNo}</td>
                    <td>{tr.lfRate}</td>
                    <td>{tr.furRate}</td>
                    <td>{tr.occupationDate}</td>
                    <td>{tr.occupationMe}</td> {/* PCDAO 16022024 */}
                    <td>{tr.vacationDate}</td>
                    <td>{tr.vacationMe}</td> {/* PCDAO 16022024 */}
                    <td>
                      {tr.stopIorDate &&
                        format(new Date(tr.stopIorDate), "dd/MM/yyyy")}
                    </td>
                    <td>{tr.billNo}</td>
                    <td>{tr.billDate}</td>
                    {/*<td>{tr.elecRate}</td>*/} {/* PCDAO 16022024 */}
                  </tr>
                ))}
            </thead>

            <tbody>
              {occVacData.length === 0 && (
                <tr>
                  <td colspan="8" align="center">
                    No Occupation Vacation Details Avaialble{" "}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <br />

          <h1 class="text-blue-600" align="center">
            Licence Fee Details
          </h1>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Debit/Credit</th>
                <th>Rent Type</th>
                <th>Lfee Debit From Date</th>
                <th>Lfee Debit To Date</th>
                <th>Lfee Debit Amount</th>
                <th>Lfee Credit From Date</th>
                <th>Lfee Credit To Date</th>
                <th>Lfee Credit Amount</th>
                <th>Furniture Credit From Date</th>
                <th>Furniture Credit To Date</th>
                <th>Furniture Credit Amount</th>
                <th>Furniture Debit From Date</th>
                <th>Furniture Debit To Date</th>
                <th>Furniture Debit Amount</th>
              </tr>
              {lfeeData &&
                lfeeData.map((tr) => (
                  <tr key={tr.cdaoNo}>
                    <td>{tr.debitCredit}</td>
                    <td>{tr.rentType}</td>
                    {tr.lfeeDbFromDate !== null && <td>{tr.lfeeDbFromDate}</td>}
                    {tr.lfeeDbToDate && <td>{tr.lfeeDbToDate}</td>}
                    {tr.lfeeAmountDb && <td>{tr.lfeeAmountDb}</td>}
                    {tr.lfeeCrFromDate && <td>{tr.lfeeCrFromDate}</td>}
                    {tr.lfeeCrToDate && <td>{tr.lfeeCrToDate}</td>}
                    {tr.lfeeAmountCr && <td>{tr.lfeeAmountCr}</td>}
                    {tr.furCrFromDate && <td>{tr.furCrFromDate}</td>}
                    {tr.furCrToDate && <td>{tr.furCrToDate}</td>}
                    {tr.furCrAmount && <td>{tr.furCrAmount}</td>}
                    {tr.furDbFromDate && <td>{tr.furDbFromDate}</td>}
                    {tr.furDbToDate && <td>{tr.furDbToDate}</td>}
                    {tr.furDbAmount && <td>{tr.furDbAmount}</td>}
                  </tr>
                ))}
            </thead>

            <tbody>
              {lfeeData.length === 0 && (
                <tr>
                  <td colspan="6" align="center">
                    No Licence Fee Details Avaialble{" "}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <br />

          <h1 class="text-blue-600" align="center">
            Rent(Elec, Water) Fee Details
          </h1>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Water Unit</th>
                <th>Water Amount Debit</th>
                <th>Water Debit From Date</th>
                <th>Water Debit To Date</th>
                <th>Elec Unit</th>
                <th>Elec Amount Debit</th>
                <th>Elec Debit From Date</th>
                <th>Elec Debit To Date</th>
              </tr>
              {rentData &&
                rentData.map((tr) => (
                  <tr key={tr.cdaoNo}>
                    <td>{tr.waterUnit}</td>
                    <td>{tr.waterAmountDb}</td>
                    <td>{tr.waterDbFromDate}</td>
                    <td>{tr.waterDbFromDate}</td>
                    <td>{tr.elecUnit}</td>
                    <td>{tr.elecAmountDb}</td>
                    <td>{tr.elecDbFromDate}</td>
                    <td>{tr.elecDbToDate}</td>
                  </tr>
                ))}
            </thead>

            <tbody>
              {rentData.length === 0 && (
                <tr>
                  <td colspan="8" align="center">
                    No Furniture Fee Details Avaialble{" "}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <br />
        </div>
      </div>
    </div>
  );
};

export default withRouter(ViewRentMaster);
