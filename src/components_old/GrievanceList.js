import { useState, useEffect, useMemo, useCallback } from "react";
import TablePage, { SelectColumnFilter } from "../utils/TablePage"; //
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import useDebouncedSearch from "../utils/useDebouncedSearch";
import { set } from "lodash";
import { BasicLoadingIcon } from "../utils/Icons";

function GrievanceList() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [ssUser, setSSUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);

  const useSearch = () => useDebouncedSearch((text) => searchAsync(text));

  const searchAsync = async function (text) {
    console.log(text);
  };

  const { inputText, setInputText, searchResults } = useSearch();

  useEffect(() => {
    let fetching = false;
    async function fetchData() {
      setLoading(true);
      if (!fetching)
        await axios
          .get("/grievances?search=" + search)
          .then((response) => {
            setData(response.data);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
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

  const handlePageNumber = (pageNumber) => {
    setPage(pageNumber);
  };

  const handlePageSize = (pageSize) => {
    setPageSize(pageSize);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div>
            {row.original.recordStatus === "V" ? (
              <Link to={"/grievances/" + row.original.id}>
                <button className=" w-20 m-1 p-0 "> Review </button>
              </Link>
            ) : (
              ""
            )}
            {row.original.recordStatus != "V" ? (
              <Link to={"/grievances/" + row.original.id}>
                <button className=" w-20 m-1 p-0 "> Edit </button>
              </Link>
            ) : (
              ""
            )}
          </div>
        ),
      },
      {
        Header: "Dak Id",
        accessor: "webId",
        Cell: ({ row }) => (
          <div>
            <label>{row.original.webId}</label>
          </div>
        ),
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
        Header: "Grievance Date",
        accessor: "grievanceDate",
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
        Header: "Flag",
        accessor: "responseFlag",
        Cell: ({ row }) => (
          <div className="">
            {row.original.responseFlag === "R" ? (
              <p className="text-blue-500">Reply</p>
            ) : (
              <>
                {row.original.responseFlag === "E" ? (
                  <p className="text-red-500">Escalated</p>
                ) : (
                  <p className="text-green-500">----</p>
                )}
              </>
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
      {
        Header: "Submitted By",
        Cell: ({ row }) => (
          <div className="text-sm text-gray-900">{row.original.reason}</div>
        ),
      },
    ],
    [data]
  );

  const downloadReplyCsvForSS = async () => {
    await axios
      .get("/grievances/ss/reply")
      .then((response) => {
        if (response.status === 200) {
          console.log("response.data " + response.data);
          window.open(
            `${process.env.REACT_APP_BASE_URL}/files/${response.data}?path=uploads/grievances/csv`
          );
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13 || event.which === 13) {
      setSearch(inputText);
    }
  };

  return (
    <div className="min-h-full max-h-full  text-gray-900">
      <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-2 ml-4">
          <h1 className="text-xl font-semibold">Grievances</h1>
          <div className="flexContainer">
            <input
              type="text"
              name="search"
              placeholder="CDAO No, Name, Subject"
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              className="pl-2 -ml-2 inputField flex-initial"
            />
            <button
              type="submit"
              onClick={() => setSearch(inputText)}
              className="w-16 m-0 p-0"
            >
              Search
            </button>
            {ssUser && user?.designation?.designationLevel <= 40 ? (
              <>
                <div>
                  <Link to={"/grievances/new/"}>
                    <button className=" w-32 ml-8 p-0 h-6 -mt-2">
                      {" "}
                      Add Grievance{" "}
                    </button>
                  </Link>
                </div>

                <div>
                  <button
                    className=" w-64 ml-8 p-0 h-6 -mt-2"
                    onClick={downloadReplyCsvForSS}
                  >
                    {" "}
                    Download Grievance Email Reply{" "}
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
            <div>
              <Link to={"/grievance/processed"}>
                <button className=" w-32 ml-8 p-0 h-6 -mt-2 bg-red-500">
                  {" "}
                  Processed{" "}
                </button>
              </Link>
            </div>
            <div>
              <p className="font-semibold text-blue-500">
                Total Pending Grievances : {data.length}
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
            {data.length > 0 ? (
              <TablePage
                columns={columns}
                data={data}
                //maxWidth="60VW"
                // tableHeading="Pending Grievances"
                newpage={page}
                parentCallback={handlePageNumber}
                newPageSize={pageSize}
                parentCallbackPageSize={handlePageSize}
                className="table-auto"
              />
            ) : (
              ""
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default withRouter(GrievanceList);
