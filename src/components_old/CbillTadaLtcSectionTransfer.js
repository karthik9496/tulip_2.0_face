import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import Table, { SelectColumnFilter } from "../utils/Table";
import Modal from "../utils/Modal";

const CbillTadaLtcSectionTransfer = () => {
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const [loggedInUsr, setLoggedInUsr] = useState({});
  const [responseText, setResponseText] = useState("");
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setLoggedInUsr(JSON.parse(sessionStorage.getItem("usr")));
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get(
          "/cbillTadaLtcs/transfer?search=" + search
        );
        console.log(response.data);
        setBills(response.data);
      } catch (error) {
        console.log(error.response);
      } finally {
        setLoading(false);
      }
    }
    if (search && search != "") fetchData();

    return () => {};
  }, [update, search]);

  const handleSubmit = () => {
    setSearch(inputText);
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13 || event.which === 13) {
      handleSubmit(event);
    }
  };

  const handleBillTransfer = async (id) => {
    try {
      const response = await axios.put(`/cbillTadaLtcs/transfer/${id}`);
      setResponseText(response.data);
      setShowModal(true);
    } catch (error) {
      console.log(error.response);
      setResponseText(error.response.data);
      setShowModal(true);
    } finally {
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div>
            <button
              className="w-44 m-0 p-1 bg-red-500 hover:bg-red-700 "
              onClick={() => handleBillTransfer(row.original.id)}
            >
              {row.original.section.sectionName === "T-COURSE"
                ? "Transfer To Section"
                : "Transfer to T-Course"}
            </button>
          </div>
        ),
      },

      {
        Header: "Dak",
        accessor: "dak.dakidNo",
        //Filter: SelectColumnFilter,
        filter: "includes",
        Cell: ({ row }) => (
          <div className="m-0">
            <div>
              <label>Dak : {row.original.dak.dakidNo}</label>
            </div>
            <div>
              <label>Sec : {row.original.section.sectionName}</label>
            </div>
            <div>
              <label>Task : {row.original.taskNo}</label>
            </div>
          </div>
        ),
      },

      {
        Header: "Bill Type",
        accessor: "billType.description",
        // Filter: SelectColumnFilter,
        filter: "billType",
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
        accessor: "employee.cdaoNo",
        // Filter: SelectColumnFilter,
        filter: "includes",
        Cell: ({ row }) => (
          <div>
            <div>
              {row.original.employee !== null && (
                <label>
                  {row.original.employee.rank.rankName}{" "}
                  {row.original.employee.officerName}
                </label>
              )}
            </div>
            <div>
              {row.original.employee !== null && (
                <label>
                  {" "}
                  {row.original.employee.cdaoNo}
                  {row.original.employee.checkDigit}
                </label>
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
              <label>{row.original.amountClaimed}</label>
            </div>
          </div>
        ),
      },
    ],
    [bills]
  );

  return (
    <div className="min-h-screen  text-gray-900">
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <h1 className="text-green-500 underline text-center">
          T- Course {`<==>`} Section Bill Transfer
        </h1>

        {loggedInUsr?.designation?.designationLevel >= 30 ? (
          <div>
            <div className="-ml-2 mr-2">
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
                className="w-16 ml-1 mt-0 p-0"
              >
                Search
              </button>
            </div>
            {bills.length > 0 ? <Table data={bills} columns={columns} /> : ""}
          </div>
        ) : (
          <div>
            <h1 className="text-red-500 text-center my-8">
              {" "}
              Bill Transfer Facility is available only to AAO / AO /SAO.
            </h1>
          </div>
        )}
      </main>
      <div className="flex flex-col justify-center items-center ">
        {showModal && (
          <Modal
            setOpenModal={setShowModal}
            heading={responseText}
            onContinueClick={() => {
              setShowModal(false);
              setUpdate((value) => !value);
            }}
          ></Modal>
        )}
      </div>
    </div>
  );
};

export default CbillTadaLtcSectionTransfer;
