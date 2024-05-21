import { useState, useEffect, useMemo } from "react";
import Table, { SelectColumnFilter } from "../utils/Table";
import axios from "axios";
import { withRouter, Link, useLocation } from "react-router-dom";
import { BasicLoadingIcon } from "../utils/Icons";

function CbillTadaLtcApprovedList() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const [selectionType, setSelectionType] = useState("");
  const location = useLocation();
  const [fileName, setFileName] = useState("");
  const [value, setValue] = useState("");
  const [search1, setSearch1] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let fetching = false;
    async function fetchData() {
      setLoading(true);
      console.log(selectionType);
      if (!fetching)
        await axios
          .get(
            "/cbillTadaLtcs/allBills/approved?search=" +
              search +
              "&search1=" +
              search1
          )
          .then((response) => {
            setLoading(false);
            setData(response.data);
            setSelectionType("approved");
          })
          .catch((error) => {
            setLoading(false);
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
  }, [update, search, search1]);

  async function generateRequisitionSlip(id) {
    await axios
      .get(`/cbillTadaLtcs/${id}/requisitionSlip`)
      .then((response) => {
        //console.log(data);
        console.log(response.data);
        //pcdao -- to open pdf rather than downloading
        const url = window.open(
          `${process.env.REACT_APP_BASE_URL}/files/openpdf/${response.data}`
        );
      })
      .catch((error) => {
        console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });
  }

  async function generateIntimationSlip(id) {
    await axios
      .get(`/cbillTadaLtcs/${id}/intimationSlip`)
      .then((response) => {
        //console.log(data);
        console.log(response.data);
        //pcdao -- to open pdf rather than downloading
        const url = window.open(
          `${process.env.REACT_APP_BASE_URL}/files/openpdf/${response.data}`
        );
      })
      .catch((error) => {
        console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });
  }

  async function tBillRejectionMemo(id) {
    console.log("=======:" + id);
    await axios
      .put(`/cbillTadaLtcs/${id}/tBillRejectionMemo`)
      .then((response) => {
        console.log(data);
        console.log(response.data);
        //pcdao -- to open pdf rather than downloading
        const url = window.open(
          `${process.env.REACT_APP_BASE_URL}/files/openpdf/${response.data}`
        );
      })
      .catch((error) => {
        console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });
  }

  const handleClick = () => {
    let fetching = false;
    async function fetchData() {
      if (!fetching)
        await axios
          .get(`/cbillTadaLtcs?filter=approved`)
          .then((response) => {
            console.log(response.data);
            setData(response.data);
            setSelectionType("approved");
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
  };

  const handleClickHighClaims = () => {
    let fetching = false;
    async function fetchHighData() {
      if (!fetching) console.log(">>>>>>>>$$$$$:" + value);

      await axios
        .get(`/cbillTadaLtcs/highValue/${value}/`)
        .then((response) => {
          console.log(response.data);
          setData(response.data);
          setSelectionType("highClaims");
        })
        .catch((error) => {
          //console.log(error);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          if (error.response) setServerErrors(error.response.data.error);
          else setServerErrors(error.Error);
        });
    }
    fetchHighData();
    return () => {
      fetching = true;
    };
  };

  const columns = useMemo(
    () => [
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div>
            <div>
              {row.original.claimType != "KR" && (
                <Link to={"/cbillTadaLtcs/" + row.original.id + "/tbillInfo"}>
                  <button className="w-32 m-0 p-0 bg-gray-500 hover:bg-gray-700 ">
                    {" "}
                    TBillInfo{" "}
                  </button>
                </Link>
              )}
            </div>
            <div>
              {" "}
              {row.original.advId !== null && (
                <button
                  className="w-32 m-0 p-0 bg-red-500 hover:bg-red-700 "
                  onClick={() => generateRequisitionSlip(row.original.id)}
                >
                  {" "}
                  Requisition Slip{" "}
                </button>
              )}
            </div>
            <div>
              {row.original.claimType !== null &&
                (row.original.claimType.includes("F") ||
                  row.original.claimType.includes("S")) &&
                row.original.recordStatus !== "R" &&
                row.original.approved !== null &&
                row.original.approved === true && (
                  <button
                    className="w-28 m-0 p-0 bg-red-500 hover:bg-red-700 "
                    onClick={() => generateIntimationSlip(row.original.id)}
                  >
                    {" "}
                    Intimation Slip{" "}
                  </button>
                )}
            </div>
            <div>
              {row.original.recordStatus === "R" && (
                <button
                  className="w-32 m-0 p-0 bg-yellow-500 hover:bg-red-700 "
                  onClick={() => tBillRejectionMemo(row.original.id)}
                >
                  {" "}
                  Print Rej Memo{" "}
                </button>
              )}
            </div>
          </div>
        ),
      },
      {
        Header: "Dak",
        accessor: "dak.dakidNo",
        Cell: ({ row }) => (
          <div>
            <div>
              <label>{row.original.dak.dakidNo}</label>
            </div>
            <div>
              <label>{row.original.advId}</label>
            </div>
            <div>
              <label>Sec : {row.original.section.sectionName}</label>
            </div>
            <div>
              <label>Task : {row.original.taskNo}</label>
            </div>
            <div>
              <label>Month : {row.original.dak.monthEnding}</label>
            </div>
            <div>
              <label>Receipt : {row.original.dak.createdAt}</label>
            </div>
            <div>
              <label>Processed Month : {row.original.monthEnding}</label>
            </div>
            <div>
              <label>
                Dak Reference Date : {row.original.dak.referenceDate}
              </label>
            </div>
          </div>
        ),
      },

      {
        Header: "Bill Type",
        accessor: "billType.description", // Change this
        Cell: ({ row }) => (
          <div>
            <div>
              <label>DakType : {row.original.dak.dakType.description}</label>
            </div>
            <div>
              {row.original.billType && (
                <label>Bill Type : {row.original.billType.description}</label>
              )}
            </div>
          </div>
        ),
      },

      {
        Header: "Officer Name",
        accessor: "employee.officerName", // Change this
        Cell: ({ row }) => (
          <div>
            <div>
              <label>
                {row.original.employee.rank.rankName}{" "}
                {row.original.employee.officerName}
              </label>
            </div>
            <div>
              <label>
                {" "}
                {row.original.employee.cdaoNo}
                {row.original.employee.checkDigit}
              </label>
            </div>
          </div>
        ),
      },

      {
        Header: "Journey Date",
        accessor: "journeyStartDate",
        Cell: ({ row }) => (
          <div>
            <div>
              {row.original.journeyStartDate && (
                <label>Start Date : {row.original.journeyStartDate}</label>
              )}
            </div>
            <div>
              {row.original.journeyEndDate && (
                <label>End Date : {row.original.journeyEndDate}</label>
              )}
            </div>
            <div>
              {row.original.journeyStationFrom && (
                <label>From : {row.original.journeyStationFrom}</label>
              )}
            </div>
            <div>
              {row.original.journeyStationTo && (
                <label>To : {row.original.journeyStationTo}</label>
              )}
            </div>
            <div>
              {row.original.typeOfLtc && (
                <label>LTC Type : {row.original.typeOfLtc}</label>
              )}
            </div>
            <div>
              {row.original.calendarYear && (
                <label>Block Year : {row.original.calendarYear}</label>
              )}
            </div>
            <div>
              {row.original.noOfMembers && (
                <label>No.of Members : {row.original.noOfMembers}</label>
              )}
            </div>
          </div>
        ),
      },

      {
        Header: "Amount Claimed",
        accessor: "amountClaimed",
        Cell: ({ row }) => (
          <div>
            <div>
              {row.original.amountClaimed && (
                <label>Claimed : {row.original.amountClaimed}</label>
              )}
            </div>
            <div>
              {row.original.amountDisallowed != null && (
                <label>Disallowance : {row.original.amountDisallowed}</label>
              )}
            </div>
            <div>
              {row.original.advanceAmount != null && (
                <label>Advance : {row.original.advanceAmount}</label>
              )}
            </div>
            <div>
              {row.original.mroAmount != null && (
                <label>MRO : {row.original.mroAmount}</label>
              )}
            </div>
            <div>
              {row.original.amountPassed != null && (
                <label>Passed : {row.original.amountPassed}</label>
              )}
            </div>
            <div>
              {row.original.adjustmentAmount != null && (
                <label>Adjustment : {row.original.adjustmentAmount}</label>
              )}
            </div>
            <div>{<label>DV No : {row.original.dvNo}</label>}</div>
            <div>{<label>DP Sheet No : {row.original.dpSheetNo}</label>}</div>
            <div>
              {<label>DP Sheet Date : {row.original.dpSheetDate}</label>}
            </div>
            <div>{<label>CMP Date : {row.original.cmpDate}</label>}</div>
          </div>
        ),
      },

      {
        Header: "Status",
        accessor: "recordStatus",
        Cell: ({ row }) => (
          <div>
            <div>
              {row.original.recordStatus && (
                <label>Record Status : {row.original.recordStatus}</label>
              )}
            </div>
            <div>
              {row.original.recordStatus === "R" && (
                <label>Date of Return : {row.original.aoDate}</label>
              )}
            </div>

            <div>
              {row.original.approved != null && (
                <label>
                  Approved : {row.original.approved === true ? "true" : "false"}
                </label>
              )}
            </div>
            <div>
              {row.original.reason && (
                <label>Reason : {row.original.reason}</label>
              )}
            </div>
          </div>
        ),
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
    console.log(value);
    setSearch1(value);
  };

  const handleAmountPassed = (event) => {
    event.preventDefault();
    //console.log(inputText);
    //setSearch(inputText);
    //console.log(value);
    setSearch1(value);
    setSelectionType("approved");
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
          <h1 className="text-xl font-semibold">Cbill Tada Ltcs</h1>
          <div className="flexContainer">
            <input
              type="text"
              name="search"
              placeholder="CDAO No,Dak Id No"
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
              <Link to={"/cbillTadaLtcs"}>
                <button className=" w-32 ml-8 p-0 h-6 -mt-2">Pending </button>
              </Link>
            </div>

            <div>
              <input
                type="text"
                name="value"
                placeholder="Amount Passed"
                onChange={(e) => setValue(e.target.value)}
              />
              <button onClick={handleAmountPassed} className=" w-36 m-0 p-0 ">
                {" "}
                High Value Claims{" "}
              </button>
            </div>
          </div>

          <div>
            <h1 className="text-xl font-semibold">{location.state}</h1>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center fixed top-1/4 w-full z-50">
            <p className="mr-2 text-2xl text-green-600">Fetching Data</p>
            <BasicLoadingIcon className="ml-1 mt-1 h-10 w-10 animate-spin text-green-600" />
          </div>
        ) : (
          <div className="-mt-2 max-h-1 py-0">
            <Table columns={columns} data={data} className="table-auto" />
          </div>
        )}
      </main>
    </div>
  );
}

export default withRouter(CbillTadaLtcApprovedList);
