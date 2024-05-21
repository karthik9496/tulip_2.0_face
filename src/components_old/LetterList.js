import { useState, useEffect, useMemo, useCallback } from "react";
import Table, { SelectColumnFilter } from "../utils/Table"; //
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import useDebouncedSearch from "../utils/useDebouncedSearch";
import { set } from "lodash";
import { BasicLoadingIcon } from "../utils/Icons";

function LetterList() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [serverErrors, setServerErrors] = useState("");
  const [search, setSearch] = useState("");
  const [ssUser, setSSUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get("/letters?search=" + search, {
          signal: controller.signal,
        });
        setData(response.data);
      } catch (error) {
        console.log(error.Error);
        if (error.response)
          setServerErrors(
            error.response.status +
              " -- " +
              error.response.statusText +
              ". Please Contact EDP"
          );
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    return () => {
      controller.abort();
    };
  }, [update, search]);

  useEffect(() => {
    function isSSUser() {
      let usr = JSON.parse(sessionStorage.getItem("usr"));
      setUser(usr);
      if (usr?.usrName === "SysAdmin") {
        setSSUser(true);
      } else {
        usr?.sectionList?.forEach((section) => {
          if (
            section.sectionName === "LWSSAUDIT" ||
            section.sectionName === "TSS"
          ) {
            setSSUser(true);
          }
        });
      }
    }
    isSSUser();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div>
            {row.original.recordStatus === "V" ? (
              <Link to={"/letter/" + row.original.id}>
                <button className="rounded-full h-10  w-20 m-1 p-0 ">
                  {" "}
                  Review{" "}
                </button>
              </Link>
            ) : (
              ""
            )}
            {row.original.recordStatus != "V" ? (
              <Link to={"/letter/" + row.original.id}>
                <button className="rounded-full h-7  w-20 m-1 p-0 ">
                  {" "}
                  Edit{" "}
                </button>
              </Link>
            ) : (
              ""
            )}
          </div>
        ),
      },
        {
        Header: "Dak",
        accessor: "dak.dakidNo",
       
      },
      {
        Header: "Section",
        accessor: "section.sectionName",
        Filter: SelectColumnFilter,
      },
      {
        Header: "Task",
        accessor: "taskNo",
        Filter: SelectColumnFilter,
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
        Header: "Name",
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
        Header: "Letter Date",
        accessor: "letterDate",
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
      {
        Header: "Submitted By",
        Cell: ({ row }) => (
          <div className="text-sm text-gray-900">{row.original.reason}</div>
        ),
      },
    ],
    [data]
  );

  const handleKeyPress = (event) => {
    if (event.keyCode === 13 || event.which === 13) {
      setSearch(inputText);
    }
  };

  return (
    <div className="min-h-full max-h-full  text-gray-900">
      <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-2 ">
          <div className="-ml-4 mb-2">
            <h1 className="text-2xl font-semibold ">Letter</h1>
            {serverErrors ? (
              <p className="text-2xl text-red-500 font-semibold pb-2">
                {serverErrors}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="flexContainer">
            <div>
              <input
                type="text"
                name="search"
                placeholder="CDAO No, Name, Subject"
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                className="pl-2 -ml-6 inputField flex-initial rounded-full mr-2"
              />
              <button
                type="submit"
                onClick={() => setSearch(inputText)}
                className="w-16 m-0 p-0 rounded-full"
              >
                Search
              </button>
            </div>
            <div>
              <Link to={"/letterProcessed"}>
                <button className=" w-36 ml-4 p-0 h-6 -mt-2 bg-red-500 rounded-full">
                  {" "}
                  Processed Letter{" "}
                </button>
              </Link>
            </div>
            <div>
              <p className="font-semibold text-blue-500">
                Total Pending Letters : {data.length}
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center fixed top-1/4 w-full z-50">
            <p className="mr-2 text-2xl text-green-600">Fetching Data</p>
            <BasicLoadingIcon className="ml-1 mt-1 h-10 w-10 animate-spin text-green-600" />
          </div>
        ) : (
          <div className="mt-2 max-h-1">
            <Table
              columns={columns}
              data={data}
              //maxWidth="60VW"
              //tableHeading="Pending Grievances"
              className="table-auto"
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default withRouter(LetterList);
