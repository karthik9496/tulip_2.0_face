import { useState, useEffect, useMemo } from "react";
import Table, { SelectColumnFilter } from "../utils/Table";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { BasicLoadingIcon } from "../utils/Icons";

function GrievanceProcessedList() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const [mesg, setMesg] = useState("");
  const [legacyData, setLegacyData] = useState([]);

  const [dataFetched, setDataFetched] = useState(false);
  const [legacyDataFetched, setLegacyDataFetched] = useState(false);

  useEffect(() => {
    let fetching = false;
    async function fetchData() {
      setDataFetched(false);
      if (!fetching)
        await axios
          .get("/grievances/processed?search=" + search)
          .then((response) => {
            console.log("processed", response.data);
            setData(response.data);
            if (response.data != null) {
              //	console.log(">>>>>Search CdaoNo---:" + response.data.cdaoNo);
              setData(response.data);
            }
            setDataFetched(true);
          })
          .catch((error) => {
            setDataFetched(true);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
    }
    fetchData();

    return () => {
      fetching = true;
    };
  }, [update, search]);

  useEffect(() => {
    let fetching = false;
    async function fetchData() {
      setLegacyDataFetched(false);
      if (!fetching)
        await axios
          .get("/grievanceLegacy?search=" + search)
          .then((response) => {
            console.log("legacy", response.data);
            if (response.data != null) {
              //	console.log(">>>>>Search CdaoNo---:" + response.data.cdaoNo);
              setLegacyData(response.data);
            }
            setLegacyDataFetched(true);
          })
          .catch((error) => {
            setLegacyDataFetched(true);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
    }
    fetchData();
    return () => {
      fetching = true;
    };
  }, [update, search]);

  const columns = useMemo(
    () => [
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div>
            <button
              onClick={() => {
                window.open(
                  `/grievances/${row.original.id}`,
                  "_blank",
                  "width=1000, height=900, left=500, top=80"
                );
              }}
              className=" w-20 m-1 p-0 bg-red-500"
            >
              View
            </button>
          </div>
        ),
      },

      {
        Header: "Dak Id",
        accessor: "webId",
      },
      {
        Header: "Cdao No",
        accessor: "cdaoNo",
        Cell: ({ row }) => (
          <div>
            <label>
              {row.original.cdaoNo}
              {row.original.checkDigit}
            </label>
          </div>
        ),
      },
      {
        Header: "Officer Name",
        accessor: "employee.officerName",
        Cell: ({ row }) => (
          <div>
            <label>
              {row.original.employee.rank.rankName}{" "}
              {row.original.employee.officerName}
            </label>
          </div>
        ),
      },
      {
        Header: "Grievance Date",
        accessor: "grievanceDate",
      },
      {
        Header: "Disposal Date",
        accessor: "disposalDate",
      },
      {
        Header: "Attachment",
        accessor: "attachmentFlag",
        Cell: ({ row }) => (
          <div>
            {row.original.attachmentFlag === true ? (
              <p className="text-green-500">Y</p>
            ) : (
              <p className="text-red-500">N</p>
            )}
          </div>
        ),
      },
      {
        Header: "Subject",
        accessor: "subject",

        Cell: ({ row }) => (
          <div>
            <label className="break-normal whitespace-normal w-96 text-sm ">
              {row.original.subject}
            </label>
          </div>
        ),
      },
    ],
    [data]
  );

  const legacyColumns = useMemo(
    () => [
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div>
            <button
              onClick={() => {
                window.open(
                  `/grievanceLegacy/${row.original.id}`,
                  "_blank",
                  "width=1000, height=900, left=500, top=80"
                );
              }}
              className=" w-20 m-1 p-0 bg-red-500"
            >
              View
            </button>
          </div>
        ),
      },

      {
        Header: "Dak Id",
        accessor: "webId",
      },
      {
        Header: "CDAONo",
        accessor: "cdacNo",
      },
      {
        Header: "Officer Name",
        accessor: "officerName",
      },
      {
        Header: "Grievance Date",
        accessor: "receiptDate",
      },
      {
        Header: "Disposal Date",
        accessor: "replyDate",
      },
      {
        Header: "Subject",
        accessor: "subject",
      },
    ],
    [data]
  );

  const handleKeyPress = (event) => {
    if (event.keyCode === 13 || event.which === 13) {
      handleSubmit(event);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputText);
    setSearch(inputText);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-2 ml-4">
          <h1 className="text-xl font-semibold">Grievances Processed List</h1>
          <div className="flexContainer">
            <input
              type="text"
              name="search"
              placeholder="CDAO No"
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
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
              <Link to={"/grievances"}>
                <button className=" w-32 ml-8 p-0 h-6 -mt-2">Pending </button>
              </Link>
            </div>
          </div>
        </div>
        {mesg}
        {dataFetched && legacyDataFetched ? (
          <div>
            {data.length > 0 ? (
              <div className="mt-2 max-h-full py-0 ">
                <Table
                  columns={columns}
                  data={data}
                  //tableHeading="Processed Grievances"
                  //maxWidth="60vw"
                  maxHeight="55vh"
                  className="table-auto"
                />
              </div>
            ) : (
              ""
            )}
            {legacyData.length > 0 ? (
              <div className="max-h-full py-0 mt-2">
                <h2 className="font-bold text-xl text-gray-600 ml-2">
                  Legacy Grievances
                </h2>
                <hr />
                <Table
                  columns={legacyColumns}
                  data={legacyData}
                  //tableHeading="Legacy Grievances"
                  //maxWidth="60vw"
                  maxHeight="55vh"
                  className="table-auto"
                />
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center fixed top-1/4 w-full z-50">
            <p className="mr-2 text-2xl text-blue-600">Fetching Data</p>
            <BasicLoadingIcon className="ml-1 mt-1 h-10 w-10 animate-spin text-blue-600" />
          </div>
        )}
      </main>
    </div>
  );
}

export default withRouter(GrievanceProcessedList);
