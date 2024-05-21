import { useState, useEffect, useMemo } from "react";

import TablePage, { SelectColumnFilter } from "../utils/TablePage";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { BasicLoadingIcon } from "../utils/Icons";

function AdrReviewList() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const [advanceData, setAdvanceData] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(0);

  useEffect(() => {
    let fetching = false;
    async function fetchData() {
      setLoading(true);
      if (!fetching)
        await axios
          .get("/demandRegisters/adr/fetchAdrData?search=" + search)
          .then((response) => {
            setLoading(false);
            setData(response.data);
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
  }, [update, search]);

  async function reviewData() {
    console.log("<<<<<<<<<<");
    await axios
      .put(`/demandRegisters/adr/reviewAdr`)
      .then((response) => {
        console.log("&&&&&:" + response.data);
        setData(response.data);
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });
  }

  async function submitDr(id) {
    await axios
      .put(`/demandRegisters/${id}/submitDr`)
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

  async function returnDr(id) {
    await axios
      .put(`/demandRegisters/${id}/returnDr`)
      .then(() => {
        let updatedRecords = [...data].filter((i) => i.id !== id);
        console.log(updatedRecords);
        setData(updatedRecords);
        setUpdate(!update);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });
  }

  async function approveDr(id) {
    await axios
      .put(`/demandRegisters/${id}/approveDr`)
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

  const handleCallBack = (pp) => {
    console.log(pp);
    setPage(pp);
  };

  //pcdao added below method
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
            {/*
					{(row.original.action==null || (row.original.action != null && !(row.original.action.includes('Subm')) && !(row.original.action.includes('Appr')))) &&
						<Link to={"/demandRegisters/" + row.original.id}>
							<button className=" w-16 m-0 p-0 " > Edit </button>
						</Link>
					}
				{' '} 
				*/}
            {row.original.action != null &&
              row.original.action.includes("editable") && (
                <Link to={"/demandRegisters/" + row.original.id}>
                  <button className=" w-16 m-0 p-0 "> Edit </button>
                </Link>
              )}
            {row.original.action === "Submission by AAO." && (
              <button
                className="w-16 m-0 p-0 bg-green-500 hover:bg-green-700 "
                onClick={() => submitDr(row.original.id)}
              >
                {" "}
                Submit{" "}
              </button>
            )}{" "}
            {row.original.action === "Submission by AAO." && (
              <button
                className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
                onClick={() => returnDr(row.original.id)}
              >
                {" "}
                Return{" "}
              </button>
            )}{" "}
            {row.original.action === "Approval by AO." && (
              <button
                className="w-16 m-0 p-0 bg-green-500 hover:bg-green-700 "
                onClick={() => approveDr(row.original.id)}
              >
                {" "}
                Approve{" "}
              </button>
            )}{" "}
            {row.original.action === "Approval by AO." && (
              <button
                className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
                onClick={() => returnDr(row.original.id)}
              >
                {" "}
                Return{" "}
              </button>
            )}
          </div>
        ),
      },

      {
        Header: "CDAONo",
        accessor: "employee.cdaoNo",
      },
      {
        Header: "Dak",
        accessor: "dak.dakidNo",
      },
      {
        Header: "Journey Start Date",
        accessor: "journeyStartDate",
      },

      {
        Header: "Demand Date",
        accessor: "demandDate", // Change this
      },

      {
        Header: "Demand Origin",
        accessor: "demandOrigin",
      },

      {
        Header: "Demand Type",
        accessor: "cdrNo",
      },

      {
        Header: "Advance Amount",
        accessor: "amount",
      },

      {
        Header: "Penal Interest",
        accessor: "penalAmt",
      },

      {
        Header: "Total Amount",
        accessor: "totalAdr",
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
          <h1 className="text-xl font-semibold">Advance Review</h1>
          <div className="flexContainer">
            <input
              type="text"
              name="search"
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
              <button className=" w-64 ml-8 p-0 h-6 -mt-2" onClick={reviewData}>
                Review Advance{" "}
              </button>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center fixed top-1/4 w-full z-50">
            <p className="mr-2 text-2xl text-green-600">Fetching Data</p>
            <BasicLoadingIcon className="ml-1 mt-1 h-10 w-10 animate-spin text-green-600" />
          </div>
        ) : (
          <div className="-mt-2 max-h-1 py-0">
            <TablePage
              columns={columns}
              data={data}
              newpage={page}
              parentCallback={handleCallBack}
              newPageSize={pageSize}
              parentCallbackPageSize={handlePageSize}
              className="table-auto"
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default withRouter(AdrReviewList);
