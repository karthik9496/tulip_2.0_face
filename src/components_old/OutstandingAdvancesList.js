import { useState, useEffect, useMemo } from "react";
import Table, { SelectColumnFilter } from "../utils/Table";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Modal from "../utils/Modal";
import { BasicLoadingIcon } from "../utils/Icons";

function OutstandingAdvancesList() {
  const [data, setData] = useState();
  const [serverError, setServerError] = useState();
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const [origin, setOrigin] = useState();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    document.title = "Falcon | Outstanding Advances";
    let fetching = false;
    async function fetchOutstandingAdvances() {
      setLoading(true);
      if (!fetching)
        await axios
          .get(`/demandRegisters/outstandingAdvance?search=` + search)
          .then((response) => {
            setLoading(false);
            if (response.data) setData(response.data);
            setServerError();
          })
          .catch((error) => {
            setData();
            setLoading(false);
            setServerError(error.response);
          });
    }
    fetchOutstandingAdvances();
  }, [search]);

  useEffect(() => {
    let fetching = false;
    async function downloadCsv() {
      setLoading(true);
      if (!fetching)
        await axios
          .get(
            `/demandRegisters/downloadcsv/outstandingAdvance?origin=${origin}&search=`
          )
          .then((response) => {
            setLoading(false);
            setServerError();
            if (response.data)
              window.open(
                `${process.env.REACT_APP_BASE_URL}/files/${response.data}`
              );
          })
          .catch((error) => {
            setLoading(false);
            setServerError(error.response);
          });
      setOrigin();
    }

    if (origin != null) downloadCsv();
  }, [origin]);

  const columns = useMemo(
    () => [
      {
        Header: "Dak-Id",
        accessor: "dakidNo",
        Cell: ({ row }) => (
          <div>
            <label>{row.original.dakidNo}</label>
          </div>
        ),
      },

      {
        Header: "CdaoNo",
        accessor: "cdaoNo",
        Cell: ({ row }) => (
          <div className="text-sm text-gray-500">
            {row.original.cdaoNo}
            {row.original.checkDigit}
          </div>
        ),
      },

      {
        Header: "Advance Type",
        accessor: "demandType",
        Filter: SelectColumnFilter,
        filter: "demandType",
      },

      {
        Header: "Origin",
        accessor: "origin",
        Filter: SelectColumnFilter,
        filter: (rows, id, filterValue) =>
          rows.filter((row) => filterValue === row.original[id]),
      },

      {
        Header: "Section Name",
        accessor: "sectionName",
        Filter: SelectColumnFilter,
      },

      {
        Header: "Task",
        accessor: "taskNo",
        Filter: SelectColumnFilter,
      },

      {
        Header: "Amount",
        accessor: "amount",
        Cell: ({ row }) => (
          <div>
            <label className="text-center text-red-500">
              {row.original.amount}
            </label>
          </div>
        ),
      },

      {
        Header: "Demand Date",
        accessor: "demandDate",
        Cell: ({ row }) => <label>{row.original.demandDate}</label>,
      },

      {
        Header: "Journey Date",
        Cell: ({ row }) => (
          <div>
            <div>
              <label>Journey Start Date: {row.original.journeyStartDate}</label>
            </div>
            <div>
              <label>Journey End Date: {row.original.journeyEndDate}</label>
            </div>
          </div>
        ),
      },

      {
        Header: "Journey Details",
        Cell: ({ row }) => (
          <div>
            <div>
              <label>Journey Station From: {row.original.stationFrom}</label>
            </div>
            <div>
              <label>Journey Station To: {row.original.stationTo}</label>
            </div>
          </div>
        ),
      },
    ],
    [data]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(inputText);
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13 || event.which === 13) {
      handleSubmit(event);
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-100 text-gray-900"
      style={loading ? { pointerEvents: "none", opacity: "0.8" } : {}}
    >
      <main className="max-w-10xl px-4 sm:px-6 lg:px-8">
        <div className="mt-2 -ml-2">
          {serverError && (
            <h1 className="text-2xl font-semibold text-red-600">
              {serverError.status} - {serverError.statusText}. Please Contact
              EDP.
            </h1>
          )}
        </div>
        <p className="text-3xl font-semibold text-yellow-800">
          Outstanding Advances
        </p>
        {data && (
          <div>
            <input
              type="text"
              name="search"
              placeholder="CDAO No"
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="-ml-1 pl-2"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-24 mx-1 p-0"
            >
              Search
            </button>
          </div>
        )}

        <div className="p-1">
          <div>
            <div className="flex flex-col justify-center items-center">
              {openModal && (
                <Modal
                  setOpenModal={setOpenModal}
                  heading="Note (Download Csv) :"
                >
                  <li>
                    IDAS Officers and TSS -{">"} All Sections Outstanding
                    Advances will be downloaded.
                  </li>

                  <li>
                    SAO/AO/AAO -{">"} Concerned Sections Outstanding Advances
                    will be downloaded.
                  </li>
                  <li>
                    TaskHolder -{">"} Concerned Task (1 - 5) Outstanding
                    Advances will be downloaded.
                  </li>
                  <p className="text-red-500 font-bold mt-4">
                    Open CSV file with MS Excel:
                  </p>
                  <p>
                    Select Data {"->"} Text to Column {"->"} Select Delimited{" "}
                    {"->"} Select Comma {"->"} Select Text {"->"} Click on
                    Finish.
                  </p>
                </Modal>
              )}
            </div>
          </div>
          <button
            type="submit"
            onClick={(e) => setOrigin("")}
            className="w-36 mr-8 p-0"
          >
            Download Csv
          </button>

          <button
            type="submit"
            onClick={(e) => setOrigin("DTS")}
            className="w-36 mx-8 p-0"
          >
            Download DTS Csv
          </button>

          <button
            type="submit"
            onClick={(e) => setOrigin("Non-DTS")}
            className="w-48 mx-8 p-0"
          >
            Download Non-DTS Csv
          </button>

          <button
            className="w-32 h-8 my-4 bg-red-500 hover:bg-red-700 justify-end"
            onClick={() => setOpenModal(true)}
          >
            View Note
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center fixed top-1/4 w-full z-50">
            <p className="mr-2 text-2xl text-green-600">Fetching Data</p>
            <BasicLoadingIcon className="ml-1 mt-1 h-10 w-10 animate-spin text-green-600" />
          </div>
        ) : (
          <div>
            {data && (
              <div className="mt-1 max-h-full">
                <Table columns={columns} data={data} className="table-auto" />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default withRouter(OutstandingAdvancesList);
