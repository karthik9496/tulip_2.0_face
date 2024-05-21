/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By :
 */

import { useState, useEffect, useMemo } from "react";
import Table, { SelectColumnFilter } from "../utils/Table"; //
import axios from "axios";
import { withRouter, Link } from "react-router-dom";

function CommissionFormaList() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    let fetching = false;
    async function fetchData() {
      if (!fetching)
        await axios
          .get("/commissionFormas?search=" + search)
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            //console.log(error);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
    }
    fetchData();
    return () => {
      fetching = true;
    };
  }, [update, search]);

  async function remove(id) {
    var proceed = window.confirm(
      "You are about to delete forma . Please confirm."
    );
    if (!proceed) return;
    await axios
      .delete(`/commissionFormas/${id}`)
      .then(() => {
        //console.log(data);
        let updatedRecords = [...data].filter((i) => i.id !== id);
        console.log(updatedRecords);
        setData(updatedRecords);
        setUpdate(!update);
      })
      .catch((error) => {
        console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });
  }

  async function rollback(id) {
    let fname = "";
    await axios
      .get(`/commissionFormas/printSummary/${id}`)
      .then((response) => {
        //console.log(data);
        fname = response.data[0];

        if (response.data[1] !== null && response.data[1] !== "ok")
          setServerErrors(response.data[1]);
        //setDisabled(false);
        //setLoading(false);
        console.log(fname);
        if (fname != null && fname.length > 0) {
          axios({
            url: `/commissionFormas/downloadSummary/` + fname,
            method: "GET",
            responseType: "blob", // important
          }).then((res) => {
            console.log(res.data);
            const url = URL.createObjectURL(
              new Blob([res.data], { type: "application/pdf" })
            );
            const pdfWindow = window.open();
            pdfWindow.location.href = url;
            //const link = pdfWindow.location.href;
            //const link = document.createElement('a');
            //link.href = url;
            //link.setAttribute('download', fname);

            //document.body.appendChild(link);
            //link.click();
          });
        }
      })
      .catch((error) => {
        console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });
  }

  const columns = useMemo(
    () => [
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div>
            {row.original.action && row.original.action === "editable" && (
              <Link to={"/commissionFormas/" + row.original.id}>
                <button className=" w-16 m-0 p-0 "> Edit </button>
              </Link>
            )}
            {row.original.action && row.original.action === "approve" && (
              <Link
                to={{
                  pathname: "/commissionFormas/" + row.original.id,
                  actionState: "approve",
                }}
              >
                <button className=" w-16 m-0 p-0 "> Approve </button>
              </Link>
            )}
            {row.original.action &&
              (row.original.action === "submissionbyaao" ||
                row.original.action === "submissionbysao") && (
                <Link
                  to={{
                    pathname: "/commissionFormas/" + row.original.id,
                    actionState: "submit",
                  }}
                >
                  <button className=" w-16 m-0 p-0 "> Submit </button>
                </Link>
              )}{" "}
            {row.original.action &&
              (row.original.action === "submissionbyaao" ||
                row.original.action === "submissionbysao" ||
                row.original.action === "approve") && (
                <Link
                  to={{
                    pathname: "/commissionFormas/" + row.original.id,
                    actionState: "rollback",
                  }}
                >
                  <button className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 ">
                    {" "}
                    Rollback{" "}
                  </button>
                </Link>
              )}{" "}
            {row.original.action && row.original.action === "editable" && (
              <button
                className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
                onClick={() => remove(row.original.id)}
              >
                {" "}
                Delete{" "}
              </button>
            )}
            <br />
            {row.original.dak && (
              <button
                className="w-16 m-0 p-0 bg-red-500 hover:bg-blue-700 "
                onClick={() => rollback(row.original.id)}
              >
                {" "}
                Print{" "}
              </button>
            )}
          </div>
        ),
      },

      {
        Header: "Goi Dak",
        accessor: "commissionGoi.commissionControl.dak.dakidNo", // Change this
      },
      {
        Header: "Forma Dak",
        accessor: "dak.dakidNo", // Change this
      },
      {
        Header: "Ic No",
        accessor: "commissionGoi.icNo", // Change this
        Cell: ({ row }) => (
          <div>
            {row.original.commissionGoi?.icNo && (
              <label>
                {row.original.commissionGoi.icNo}
                {""}
                {row.original.commissionGoi.icCheckDigit}
              </label>
            )}
          </div>
        ),
      },
      {
        Header: "CDAO No",
        accessor: "commissionGoi.cdaoNo", // Change this
        Cell: ({ row }) => (
          <div>
            <div>
              {row.original.commissionGoi?.cdaoNo && (
                <label>
                  {row.original.commissionGoi.cdaoNo}
                  {""}
                  {row.original.commissionGoi.cdaoCheckDigit}
                </label>
              )}
            </div>
          </div>
        ),
      },

      {
        Header: "Name",
        accessor: "commissionGoi.officerName", // Change this
      },
      {
        Header: "Rank",
        accessor: "commissionGoi.rank.rankName", // Change this
      },
      {
        Header: "Basic",
        accessor: "basic",
      },

      {
        Header: "Da",
        accessor: "da",
      },

      {
        Header: "Msp",
        accessor: "msp",
      },

      {
        Header: "Npa",
        accessor: "npa",
      },

      {
        Header: "Tech Pay",
        accessor: "techPay",
      },

      {
        Header: "Dsop Date",
        accessor: "dsopDate",
      },

      {
        Header: "Lpc Credit",
        accessor: "lpcCredit",
      },

      {
        Header: "Lpc Debit",
        accessor: "lpcDebit",
      },

      {
        Header: "Forma Letter Date",
        accessor: "formaLetterDate",
      },

      {
        Header: "Date Of Reporting",
        accessor: "dateOfReporting",
      },

      {
        Header: "Pay Advance",
        accessor: "payAdvance",
      },

      {
        Header: "Dsop Willingness",
        accessor: "dsopWillingness",
      },

      {
        Header: "Dsop Amount",
        accessor: "dsopAmount",
      },

      {
        Header: "Ors Service",
        accessor: "orsService",
      },

      {
        Header: "Ors Service From",
        accessor: "orsServiceFrom",
      },

      {
        Header: "Ors Service To",
        accessor: "orsServiceTo",
      },

      {
        Header: "Stipend Amount",
        accessor: "stipendAmount",
      },

      {
        Header: "Cvp Amount",
        accessor: "cvpAmount",
      },

      {
        Header: "Forma Letter No",
        accessor: "formaLetterNo",
      },

      {
        Header: "Pan",
        accessor: "pan",
      },

      {
        Header: "Uid",
        accessor: "uid",
      },

      {
        Header: "Martial Status",
        accessor: "martialStatus",
      },

      {
        Header: "Bank Account Number",
        accessor: "bankAcno",
      },

      {
        Header: "Ifsc",
        accessor: "ifsc",
      },

      {
        Header: "Mobile",
        accessor: "mobile",
      },

      {
        Header: "Email",
        accessor: "email",
      },

      {
        Header: "Home Town",
        accessor: "homeTown",
      },

      {
        Header: "Nok Name",
        accessor: "nokName",
      },

      {
        Header: "Nok Relation",
        accessor: "nokRelation",
      },

      {
        Header: "Ors Service No",
        accessor: "orsServiceNo",
      },

      {
        Header: "Record Status",
        accessor: "recordStatus",
      },

      {
        Header: "Reason",
        accessor: "reason",
      },

      {
        Header: "Pao Name",
        accessor: "paoName",
      },

      {
        Header: "Remarks",
        accessor: "remarks",
      },

      {
        Header: "Month Ending",
        accessor: "monthEnding",
      },
      {
        Header: "Auditor Date",
        accessor: "auditorDate",
      },

      {
        Header: "Aao Date",
        accessor: "aaoDate",
      },

      {
        Header: "Ao Date",
        accessor: "aoDate",
      },

      {
        Header: "Go Date",
        accessor: "goDate",
      },

      {
        Header: "Approved",
        accessor: "approved",
      },

      /*
		{
			Header: "Login Name",
			accessor: 'loginName',
			Filter: SelectColumnFilter,  // new
			filter: 'includes',
		},
		*/
    ],
    [data]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputText);
    setSearch(inputText);
  };

  const handleKeyPress = (event) => {
    // look for the `Enter` keyCode
    if (event.keyCode === 13 || event.which === 13) {
      handleSubmit(event);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-2 ml-4">
          <h1 className="text-xl font-semibold">Commission Formas</h1>
          <div className="flexContainer">
            <input
              type="text"
              name="search"
              placeholder=" Ic No or Forma Dak Id"
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-2 -ml-2 inputField flex-initial"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-16 m-0 p-0"
            >
              Search
            </button>
            <div>
            
              <Link to={"/commissionFormas/approved"}>
                <button className=" w-46 ml-8 p-0 h-6 -mt-2">
                  {" "}
                  View Approved{" "}
                </button>
              </Link>
 
                
              
            </div>
            <div>
            <Link to={"/commissionFormas/viewall"}>
                <button className=" w-46 ml-8 p-0 h-6 -mt-2">
                  {" "}
                  View All{" "}
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="-mt-2 max-h-1 py-0">
          <Table columns={columns} data={data} className="table-auto" />
        </div>
      </main>
    </div>
  );
}

export default withRouter(CommissionFormaList);
