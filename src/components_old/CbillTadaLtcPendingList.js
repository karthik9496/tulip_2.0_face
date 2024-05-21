import { useState, useEffect, useMemo } from "react";
import Table1, { SelectColumnFilter } from "../utils/Table1";
import axios from "axios";
import { withRouter, Link, useLocation } from "react-router-dom";
import { BasicLoadingIcon } from "../utils/Icons";

function CbillTadaLtcPendingList() {
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
      if (!fetching)
        await axios
          .get(
            "/cbillTadaLtcs/allBills/pendingForSection?filter=approved&search=" +
              search +
              "&search1=" +
              search1
          )
          .then((response) => {
            setLoading(false);
            setData(response.data);
            setSelectionType("pending");
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

  const columns = useMemo(
    () => [
      {
        Header: "Dak",
        accessor: "dak.dakidNo",
        Filter: SelectColumnFilter,
        filter: "includes",
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
              <label>Month : {row.original.monthEnding}</label>
            </div>
          </div>
        ),
      },
      {
        Header: "Task",
        accessor: "taskNo",
        Filter: SelectColumnFilter,
        filter: "includes",
        Cell: ({ row }) => (
          <div>
            <div>
              <label>{row.original.taskNo}</label>
            </div>
          </div>
        ),
      },
      {
        Header: "Sec",
        accessor: "section.sectionName",
        Filter: SelectColumnFilter,
        filter: "includes",
        Cell: ({ row }) => (
          <div>
            <div>
              <label>{row.original.section.sectionName}</label>
            </div>
          </div>
        ),
      },

      {
        Header: "Receipt Date",
        accessor: "dak.createdAt", // Change this
      },

      {
        Header: "Bill Type",
        accessor: "billType.description", // Change this
        Filter: SelectColumnFilter,
        filter: "dak.dakType.description",
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
          </div>
        ),
      },

      {
        Header: "Record Status",
        accessor: "recordStatus",
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
          <h1 className="text-xl font-semibold">Cbill Tada Ltcs - Pending </h1>
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
              <Link to={"/cbillTadaLtcs/twControls/pendency"}>
                <button className=" w-42 ml-8 p-0 h-6 -mt-2">
                  Task Wise Pendency
                </button>
              </Link>
            </div>
          </div>

          <div>
            <h1 className="text-xl font-semibold">{location.state}</h1>
          </div>
        </div>
        <div>
          <br />
        </div>

        {loading ? (
          <div className="flex justify-center items-center fixed top-1/4 w-full z-50">
            <p className="mr-2 text-2xl text-green-600">Fetching Data</p>
            <BasicLoadingIcon className="ml-1 mt-1 h-10 w-10 animate-spin text-green-600" />
          </div>
        ) : (
          <div className="-mt-2 max-h-1 py-0">
            <Table1 columns={columns} data={data} className="table-auto" />
          </div>
        )}
      </main>
    </div>
  );
}

export default withRouter(CbillTadaLtcPendingList);
