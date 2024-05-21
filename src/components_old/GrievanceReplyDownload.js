import { useState, useEffect, useMemo } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Table, { SelectColumnFilter } from "../utils/Table";

const GrievanceReplyDownload = () => {
  const [serverErrors, setServerErrors] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [batchList, setBatchList] = useState([]);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const [responseText, setResponseText] = useState("");
  const [update, setUpdate] = useState("");

  useEffect(() => {
    async function fetchData() {
      await axios
        .get("/grievances/grievanceBatchList?search=" + search)
        .then((response) => {
          setBatchList(response.data);
        })
        .catch((error) => {
          if (error.response) setServerErrors(error.response.data.error);
          else setServerErrors(error.Error);
        });
    }
    fetchData();
  }, [search, update]);

  const handleKeyPress = (event) => {
    // look for the `Enter` keyCode
    if (event.keyCode === 13 || event.which === 13) {
      handleSubmit(event);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputText);
    setSearch(inputText);
  };

  const regenerate = (fileName) => {
    console.log(fileName);
    axios.get(`/grievances/regenFile/${fileName}`).then((response) => {
      window.open(
        `${process.env.REACT_APP_BASE_URL}/files/grievanceReplyJson_${response.data}?path=uploads/grievances/export`
      );
    });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div>
            <button
              className="mt-0 w-32 p-0 mr-2 -ml-6"
              onClick={() =>
                window.open(
                  `${process.env.REACT_APP_BASE_URL}/files/grievanceReplyJson_${row.original.downloadBatch}_${row.original.count}.json?path=uploads/grievances/export`
                )
              }
            >
              {" "}
              Download{" "}
            </button>{" "}
            <button
              className="mt-0 w-32 p-0 "
              onClick={() => regenerate(row.original.downloadBatch)}
            >
              {" "}
              Regenerate{" "}
            </button>
          </div>
        ),
      },
      {
        Header: "Batch No",
        accessor: "downloadBatch",
      },
      {
        Header: "Download Date",
        accessor: "downloadDate",
      },
      {
        Header: "No Of Records",
        accessor: "count",
      },
    ],
    [batchList]
  );

  const downloadJson = () => {
    setDisabled(true);
    async function generateJson() {
      axios
        .get(`/grievances/downloadGrievanceReply`)
        .then((response) => {
          setDisabled(false);
          if (response.status == 200) {
            setUpdate((prev) => !prev);
            window.open(
              `${process.env.REACT_APP_BASE_URL}/files/${response.data}?path=uploads/grievances/export`
            );
          } else {
            setResponseText(response.data);
          }
        })
        .catch((error) => {
          setDisabled(false);
          setResponseText(error.response.data);
          if (error.response) setServerErrors(error.response.data.error);
          else setServerErrors(error.Error);
        });
    }
    generateJson();
  };

  return (
    <div
      className="min-h-screen bg-gray-100 text-gray-900"
      style={disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}
    >
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className=" ">
          <h1 className="text-xl font-semibold ml-4">
            Download Grievance Reply JSON
          </h1>
          <hr />
          <h1 className="mt-2">{responseText}</h1>
          <div className="flex mt-8 justify-between">
            {/* <input
              type="text"
              name="search"
              placeholder="Month(mmyyyy)"
              onChange={(e) => handleInputChange(e)}
              className="pl-2 ml-2 inputField flex-initial"
            /> */}

            <div>
              <input
                type="text"
                name="search"
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                className="pl-2 inputField flex-initial"
                placeholder="batchNo (ddmmyyyy)"
              />
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-16 m-0 p-0"
              >
                Search
              </button>
            </div>
            <div className="">
              <button
                type="submit"
                onClick={downloadJson}
                className="w-32 m-0 p-0 items-end "
              >
                Generate JSON
              </button>
            </div>
          </div>
        </div>
        <div className="-mt-2 max-h-1 py-0">
          <Table columns={columns} data={batchList} className="table-auto" />
        </div>
      </main>
    </div>
  );
};

export default withRouter(GrievanceReplyDownload);
