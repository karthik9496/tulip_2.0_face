import { useState, useEffect, useMemo } from "react";
import Table from "../utils/Table";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Modal from "../utils/Modal";

function PrioritizeBillList() {
  const [data, setData] = useState([]);
  const [serverError, setServerError] = useState();
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const [mesg, setMesg] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [modalHeading, setModalHeading] = useState();

  useEffect(() => {
    async function fetchData() {
      await axios
        .get("/cbillTadaLtcs/billsForPriority?search=" + search)
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
          setServerError(error.response);
          setModalHeading(error.response.data);
          setOpenModal(true);
        });
    }
    if (search != null && search != "") fetchData();
  }, [search]);

  const prioritizeBill = async (id) => {
    console.log(id);
    if (id != null) {
      console.log(id);
      await axios
        .put(`/cbillTadaLtcs/prioritizeBill/${id}`)
        .then((response) => {
          setMesg(response.data);
          console.log(response.data);
          let updatedRecords = [...data].filter((i) => i.id !== id);
          setData(updatedRecords);

          setOpenModal(true);
          setModalHeading(response.data);
        })
        .catch((error) => {
          setServerError(error.response);
          setOpenModal(true);
          setModalHeading(error.response.data);
        });
    }
  };

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

  const columns = useMemo(
    () => [
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div>
            <button
              className="w-20 m-0 p-0 bg-red-500 hover:bg-red-700 "
              onClick={() => prioritizeBill(row.original.id)}
            >
              {" "}
              Prioritize{" "}
            </button>
          </div>
        ),
      },
      {
        Header: "Section",
        accessor: "section.sectionName",
      },
      {
        Header: "Dak Id",
        accessor: "dak.dakidNo",
      },

      {
        Header: "Dak Type",
        accessor: "dak.dakType.description",
      },
      /* {
        Header: "Rank",
        accessor: "employee.rank.rankName",
      }, */
      {
        Header: "Officer Name",
        accessor: "employee.officerName",
        Cell: ({ row }) => (
          <div className="text-sm text-gray-500">
            {row.original.employee.rank.rankName}{" "}
            {row.original.employee.officerName}
          </div>
        ),
      },

      {
        Header: "CDAO No",
        accessor: "employee.cdaoNo",
        Cell: ({ row }) => (
          <div className="text-sm text-gray-500">
            {row.original.employee.cdaoNo}
            {row.original.employee.checkDigit}
          </div>
        ),
      },
      /* {
        Header: "Check Digit",
        accessor: "employee.checkDigit",
      }, */

      {
        Header: "Amount",
        accessor: "amountClaimed",
      },
    ],
    [data]
  );

  return (
    <div className="min-h-screen max-h-full  text-gray-900 p-0">
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4"
        style={openModal ? { pointerEvents: "none", opacity: "0.2" } : {}}
      >
        <div className="mt-2 ml-4">
          {/* {serverError && (
            <h1 className="text-2xl font-semibold text-red-600">
              {serverError.status} - {serverError.statusText}. Please Contact
              EDP.
            </h1>
          )} */}

          <h1 className="text-2xl mb-2 font-semibold">Prioritize Bill</h1>
          {mesg != null && mesg != "" && (
            <h1 className="text-xl my-2 font-semibold text-gray-600">{mesg}</h1>
          )}
          <div className="flex gap-2">
            <input
              type="text"
              name="search"
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="p-2 -ml-2 inputField flex-initial"
              placeholder="CDAO No / DakId No"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-16 p-2 my-auto"
            >
              Search
            </button>
          </div>
        </div>
        {data.length > 0 && (
          <div className=" -mt-2 max-h-1 py-0">
            <Table columns={columns} data={data} className="table-auto" />
          </div>
        )}
        
      </div>
      {/* pcdao 29092022 for ndc popup message */}
      <div className="flex flex-col justify-center items-center ">
          {openModal && (
            <Modal setOpenModal={setOpenModal} heading={modalHeading}></Modal>
          )}
        </div>
        {/* ------------ */}
    </div>
  );
}

export default withRouter(PrioritizeBillList);
