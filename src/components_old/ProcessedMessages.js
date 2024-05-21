import { useState, useEffect, useMemo, useCallback } from "react";
import Table, { SelectColumnFilter } from "../utils/Table"; //
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import useDebouncedSearch from "../utils/useDebouncedSearch";
import Message from "./Message";

function ProcessedMessageList() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [ssUser, setSSUser] = useState(false);
  const [composeMessage, setComposeMessage] = useState(false);
  const [msgData, setMsgData] = useState("");
  const [messageId, setMessageId] = useState("new");

  const useSearch = () => useDebouncedSearch((text) => searchAsync(text));

  const searchAsync = async function (text) {
    console.log(text);
  };

  const { inputText, setInputText, searchResults } = useSearch();

  useEffect(() => {
    let fetching = false;
    async function fetchData() {
      if (!fetching)
        await axios
          .get("/message/processed?search=" + search)
          .then((response) => {
            console.log("message", response.data);
            setData(response.data);
          })
          .catch((error) => {
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
            {row.original.recordStatus === "D" ? (
              <button
                className=" w-20 m-1 p-0 "
                onClick={() => {
                  setComposeMessage(true);
                  setMessageId(row.original.id);
                }}
              >
                {" "}
                View{" "}
              </button>
            ) : (
              ""
            )}
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
        Header: "Subject",
        accessor: "subject",
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
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-2 ml-4">
          <h1 className="text-xl font-semibold">Message List</h1>
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
              onClick={() => setSearch(inputText)}
              className="w-16 m-0 p-0"
            >
              Search
            </button>
            <div>
              <Link to={"/messages"}>
                <button className=" w-32 ml-8 p-0 h-6 -mt-2">Pending </button>
              </Link>
            </div>
          </div>
        </div>
        {data.length > 0 ? (
          <div className="-mt-2 max-h-full py-0">
            <Table columns={columns} data={data} className="table-auto" />
          </div>
        ) : (
          ""
        )}
      </main>
      {composeMessage ? (
        <div className="z-10">
          <Message id={messageId} setDisplay={setComposeMessage} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default withRouter(ProcessedMessageList);
