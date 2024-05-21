/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By :
 */

import { useState, useEffect, useMemo } from "react";
import TablePage, { SelectColumnFilter } from "../utils/TablePage"; //
import axios from "axios";
import { withRouter, Link } from "react-router-dom";

function PaySummaryViewList() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const [me, setMe] = useState("");
  const [meSearch, setMeSearch] = useState("");
  const [rankCode, setRankCode] = useState("");
  const [rankCodeSearch, setRankCodeSearch] = useState("");
  const [cdaoNo, setCdaoNo] = useState("");
  const [cdaoNoSearch, setCdaoNoSearch] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [mpsDisabled, setMpsDisabled] = useState(false);

  useEffect(() => {
    let fetching = false;
    async function fetchData() {
      if (!fetching)
        await axios
          .get(
            "/paySummarys/fetch/viewAll?cdaoNo=" +
              cdaoNo +
              "&me=" +
              me +
              "&rankCode=" +
              rankCodeSearch
          )
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
  }, [update, cdaoNo, me, rankCodeSearch]);

  async function mps(id) {
    console.log("mps" + id);
    if (mpsDisabled) return;
    let index = 0,
      i = 0;
    for (i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        index = i;
        break;
      }
    }
    let item = data[index];
    item.mpsDisabled = true;
    let newData = [...data];
    let fname = "";
    newData[index] = item;
    setData(newData);

    setMpsDisabled(true);
    await axios
      .put(`/paySummarys/mps/draft/${id}`)
      .then((response) => {
        console.log(response.data);
        fname = response.data;
        setMpsDisabled(false);
        if (fname != null && fname.length > 0) {
          axios({
            url: `/paySummarys/mps/download/` + id,
            method: "GET",
            responseType: "blob", // important
          }).then((res) => {
            //console.log(response.data);
            const url = URL.createObjectURL(
              new Blob([res.data], { type: "application/pdf" })
            );
            const pdfWindow = window.open();
            pdfWindow.location.href = url;
            const link = pdfWindow.location.href;
            //const link = document.createElement('a');
            //link.href = url;
            try {
              link.setAttribute("download", fname);

              //document.body.appendChild(link);
              link.click();
            } catch (Exception) {
              setMpsDisabled(false);
              return;
            }
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

  async function reclose(id) {
    console.log("reclose" + id);
    if (disabled) return;
    let index = 0,
      i = 0;
    for (i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        index = i;
        break;
      }
    }
    let item = data[index];
    item.disabled = true;
    let newData = [...data];
    newData[index] = item;
    setData(newData);

    setDisabled(true);
    await axios
      .put(`/paySummarys/accountsClosing/closeSingle/${id}`)
      .then((response) => {
        console.log(response.data);
        setDisabled(false);
        let item = response.data;
        item.disabled = false;
        let newData = [...data];
        newData[index] = item;
        setData(newData);
      })
      .catch((error) => {
        console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });
  }
  async function generateNominalRoll() {
    setDisabled(true);

    axios.get("/paySummarys/generateNominalRoll/").then((response) => {
      console.log(response.data);
      const url = window.open(
        `${process.env.REACT_APP_BASE_URL}/files/${response.data}`
      );
      setDisabled(false);
      let fname = response.data;
      if (fname != null && fname.length > 0) {
        axios({
          url: `/paySummarys/generateNominalRoll/download/` + fname,
          method: "GET",
          responseType: "blob", // important
        }).then((res) => {
          //console.log(response.data);
          const url = URL.createObjectURL(
            new Blob([res.data], { type: "application/pdf" })
          );
          const pdfWindow = window.open();
          pdfWindow.location.href = url;
          const link = pdfWindow.location.href;
          //const link = document.createElement('a');
          //link.href = url;
          link.setAttribute("download", fname);

          //document.body.appendChild(link);
          link.click();
        });
      }
    });
  }

  async function remove(id) {
    await axios
      .delete(`/payElements/${id}`)
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

  const ShowList = () => {
    const handleP = (pp) => {
      console.log(pp);
      setPage(pp);
    };

    const handlePageSize = (pp) => {
      console.log(pp);
      setPageSize(pp);
    };

    const columns = useMemo(
      () => [
        {
          Header: "Action",
          Cell: ({ row }) => (
            <div>
              {row.original.action && row.original.action === "mps" && (
                <button
                  className=" w-16 m-0 p-0 "
                  onClick={() => mps(row.original.id)}
                  disabled={row.original.mpsDisabled}
                >
                  {row.original.mpsDisabled && (
                    <span className="spinner-grow spinner-grow-sm"></span>
                  )}{" "}
                  MPS{" "}
                </button>
              )}
            </div>
          ),
        },
        {
          Header: "CDAO No",
          accessor: "employee.cdaoNo", // Change this
          Cell: ({ row }) => (
            <div>
              {row.original.employee.cdaoNo}
              {row.original.employee.checkDigit}
              <br />
            </div>
          ),
        },

        {
          Header: "Name",
          accessor: "employee.officerName", // Change this
          Cell: ({ row }) => (
            <div>
              {row.original.employee.rank.rankName}{" "}
              {row.original.employee.officerName}
              <br />
            </div>
          ),
        },

        {
          Header: "Month",
          accessor: "monthEnding",
        },

        {
          Header: "Opening Balance",
          accessor: "openingBalance",
        },
        {
          Header: "Prm. Opening Balance",
          accessor: "permOb",
        },

        {
          Header: "Gross Pay",
          accessor: "grossPay",
        },
        {
          Header: "Credits",
          accessor: "totalCredits",
        },
        {
          Header: "Debits",
          accessor: "totalDebits",
        },

        {
          Header: "Bank Remittance",
          accessor: "ecsAmount",
        },
        {
          Header: "Dsop",
          accessor: "fund",
        },
        {
          Header: "AGIF",
          accessor: "agis",
        },
        {
          Header: "PLI",
          accessor: "pli",
        },

        {
          Header: "Loans",
          accessor: "loans",
        },
        {
          Header: "Income Tax",
          accessor: "incomeTax",
        },
        {
          Header: "Fama",
          accessor: "fama",
        },
        {
          Header: "Nps-Gc",
          accessor: "npsGc",
        },
        {
          Header: "Nps-Ec",
          accessor: "npsEc",
        },
        {
          Header: "Closing Balance",
          accessor: "closingBalance",
        },
        {
          Header: "Record Status",
          accessor: "recordStatus",
        },

        {
          Header: "Reason",
          accessor: "reason",
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

    return (
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="-mt-2 max-h-1 py-0 ml-0">
            <TablePage
              columns={columns}
              data={data}
              newpage={page}
              parentCallback={handleP}
              newPageSize={pageSize}
              parentCallbackPageSize={handlePageSize}
              className="table-auto"
            />
          </div>
        </div>
      </div>
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(cdaoNoSearch);
    setCdaoNo(cdaoNoSearch);
    setMe(meSearch);
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
          <h1 className="text-xl font-semibold">Monthly Pay Summary</h1>
          <div className="flexContainer">
            <div>
              <input
                type="text"
                name="cdaoSearch"
                onChange={(e) => setCdaoNoSearch(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="cdaono"
                className="pl-2 -ml-2 inputField flex-initial"
              />
            </div>
            <div>
              <input
                type="text"
                name="meSearch"
                onChange={(e) => setMeSearch(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="mm/yyyy"
                className="pl-2 -ml-2 inputField flex-initial"
              />
            </div>
            <div>
              <input
                type="text"
                name="rankSearch"
                onChange={(e) => setRankCodeSearch(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="rank code"
                className="pl-2 -ml-2 inputField flex-initial"
              />
            </div>
            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-16 m-0 p-0"
              >
                Search
              </button>
            </div>

            <div>
              <Link to={"/paySummarys/addnew/load"}>
                <button className=" w-32 ml-8 p-0 h-6 -mt-2"> Add New </button>
              </Link>
            </div>
            <div />
            <button
              className="w-46 ml-8 p-0 h-2 -mt-2"
              type="submit"
              onClick={generateNominalRoll}
            >
              Generate Nominal Roll
            </button>
          </div>
        </div>

        <div className="-mt-2 max-h-1 py-0">
          <ShowList />
        </div>
      </main>
    </div>
  );
}

export default withRouter(PaySummaryViewList);
