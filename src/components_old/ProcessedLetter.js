import { useState, useEffect, useMemo } from "react";
import Table, { SelectColumnFilter } from "../utils/Table";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { BasicLoadingIcon } from "../utils/Icons";
import { openPdfInNewWindow } from "../utils/PdfUtility";

function LetterProcessedList() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const [mesg, setMesg] = useState("");
  const [legacyData, setLegacyData] = useState([]);

  const [dataFetched, setDataFetched] = useState(false);
  const [legacyDataFetched, setLegacyDataFetched] = useState(false);

  const [loading, setLoading] = useState(false);
  const [id, setId] = useState();

  useEffect(() => {
    let fetching = false;
    async function fetchData() {
      console.log("first");
      setDataFetched(false);
      if (!fetching)
        await axios
          .get("/letters/processed?search=" + search)
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

  function generateLetterPdf(id) {
    setLoading(true);
    //setGeneratingPdf(true);
    axios
      .get(`/letters/pdf/${id}`)
      .then((response) => {
        setLoading(false);
        //setGeneratingPdf(false);
        // window.open(
        //   `${process.env.REACT_APP_BASE_URL}/files/${response.data}?path=uploads/letters`
        // );
        axios
          .get(`/files/${response.data}?path=uploads/letters`, {
            responseType: "blob",
          })
          .then((resp) => {
            openPdfInNewWindow(resp);
          });
      })
      .catch((error) => {
        setLoading(false);
        //setGeneratingPdf(false);
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
            <button
              onClick={() => {
                window.open(
                  `/letter/${row.original.id}`,
                  "_blank",
                  "width=1200, height=900, left=600, top=40"
                );
              }}
              className=" w-20 m-1 p-0 bg-red-500 rounded-full"
            >
              View
            </button>
            <button
              onClick={() => {
                generateLetterPdf(row.original.id);
                setId(row.original.id);
                console.log("letter id", row.original.id);
              }}
              className=" w-20 m-1 p-0 rounded-full"
            >
              PDF
            </button>
          </div>
        ),
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
        accessor: "letterDate",
      },
      {
        Header: "Disposal Date",
        accessor: "disposalDate",
      },
      {
        Header: "Subject",
        accessor: "subject",

        Cell: ({ row }) => (
          <div>
            <label className="break-normal whitespace-normal w-96  ">
              {row.original.subject.slice(0, 100) + "......."}
            </label>
          </div>
        ),
      },
    ],
    [data]
  );

  //   const legacyColumns = useMemo(
  //     () => [
  //       {
  //         Header: "Action",
  //         Cell: ({ row }) => (
  //           <div>
  //             <button
  //               onClick={() => {
  //                 window.open(
  //                   `/grievanceLegacy/${row.original.id}`,
  //                   "_blank",
  //                   "width=1000, height=900, left=500, top=80"
  //                 );
  //               }}
  //               className=" w-20 m-1 p-0 bg-red-500"
  //             >
  //               View
  //             </button>
  //           </div>
  //         ),
  //       },

  //       {
  //         Header: "Dak Id",
  //         accessor: "webId",
  //       },
  //       {
  //         Header: "CDAONo",
  //         accessor: "cdacNo",
  //       },
  //       {
  //         Header: "Officer Name",
  //         accessor: "officerName",
  //       },
  //       {
  //         Header: "Grievance Date",
  //         accessor: "receiptDate",
  //       },
  //       {
  //         Header: "Disposal Date",
  //         accessor: "replyDate",
  //       },
  //       {
  //         Header: "Subject",
  //         accessor: "subject",
  //       },
  //     ],
  //     [data]
  //   );

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
    <div className="min-h-screen text-gray-900">
      <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-2 ml-4">
          <h1 className="text-xl font-semibold -ml-4">Letter Processed List</h1>
          <div className="flexContainer">
            <div>
              <input
                type="text"
                name="search"
                placeholder="CDAO No"
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                className="pl-2 -ml-8 inputField flex-initial rounded-full mr-2"
              />
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-16 m-0 p-0 rounded-full"
              >
                Search
              </button>
            </div>
            <div>
              <Link to={"/letter"}>
                <button className=" w-32 ml-8 p-0 h-6 -mt-2 rounded-full">
                  Pending{" "}
                </button>
              </Link>
            </div>
          </div>
        </div>
        {mesg}

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
        </div>
        {/* : (
          <div className="flex justify-center items-center fixed top-1/4 w-full z-50">
            <p className="mr-2 text-2xl text-blue-600">Fetching Data</p>
            <BasicLoadingIcon className="ml-1 mt-1 h-10 w-10 animate-spin text-blue-600" />
          </div>
        )} */}
      </main>
    </div>
  );
}

export default withRouter(LetterProcessedList);

