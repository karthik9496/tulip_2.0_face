import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Modal from "../utils/Modal";
import Table, { SelectColumnFilter } from "../utils/Table";

function TaskRotateUtility() {
  const [serverError, setServerError] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [mesg, setMesg] = useState();
  const [taskList, setTaskList] = useState([]);
  const [lastUpdatedDate, setLastUpdatedDate] = useState();
  const [nextUpdateDate, setNextUpdateDate] = useState();
  const [enabled, setEnabled] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(async () => {
    await axios
      .get(`/tasks/rotate/twing`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          if (response.data[3]) setTaskList(response.data[0]);
          setLastUpdatedDate(response.data[1]);
          setNextUpdateDate(response.data[2]);
          setEnabled(response.data[3]);
        }
      })
      .catch((error) => {
        setServerError(error.response);
      });
  }, [update]);

  const autoAssignTask = () => {
    axios
      .put(`/tasks/rotate/twing`)
      .then((response) => {
        if (response.status === 200) {
          setMesg(response.data[0]);
          setTaskList([]);
          setEnabled(false);
          setOpenModal(true);
          setUpdate(!update);
          window.open(
            `${process.env.REACT_APP_BASE_URL}/files/${response.data[1]}`
          );
        }
      })
      .catch((error) => {
        setServerError(error.response);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Section",
        accessor: "section.sectionName",
        Filter: SelectColumnFilter,
      },

      {
        Header: "User",
        accessor: "usrName",
      },

      {
        Header: "Current Task No",
        accessor: "taskNo",
        Filter: SelectColumnFilter,
      },

      {
        Header: "Next Task No",
        accessor: "nextTaskNo",
      },

      {
        Header: "Enabled",
        Cell: ({ row }) => (row.original.enabled ? "Y" : "N"),
      },
    ],

    [taskList]
  );

  return (
    <div className="min-h-screen pt-4">
      <main className="w-1/2 mx-auto">
        <div style={!enabled ? { pointerEvents: "none" } : {}}>
          <div
            className="max-w-5xl w-1/2 ml-8 mt-16 px-4 mb-8 sm:px-6 lg:px-8 py-4"
            style={{ boxShadow: "5px 5px 10px #556B2F" }}
          >
            <h1 className="text-4xl font-bold text-yellow-700">
              <u> Auto Assign Task Utility </u>{" "}
            </h1>
            <h2 className="text-md text-yellow-700 font-bold">
              {" "}
              Note : Utility available only for TSS AO.{" "}
            </h2>
            <div className="mt-2 -ml-2">
              {serverError && (
                <h1 className="text-2xl font-semibold text-red-600">
                  {serverError.status} - {serverError.statusText}. Please
                  Contact EDP.
                </h1>
              )}
            </div>
            <hr className="text-black" />
            <div className="mt-4">
              <h2 className="text-yellow-700 font-bold">
                {" "}
                Last Updated Date : {lastUpdatedDate}{" "}
              </h2>
              <h2 className="text-yellow-700 font-bold">
                {" "}
                Next Update Date : {nextUpdateDate}{" "}
              </h2>
            </div>

            <div className="pb-8 mt-4">
              {enabled && (
                <button
                  className="w-32 h-8 bg-transparent text-black font-bold "
                  onClick={autoAssignTask}
                  style={{ boxShadow: "5px 5px 10px" }}
                >
                  Auto-Assign
                </button>
              )}
            </div>
          </div>
          <div className="mt-2 max-h-full py-0 ml-0">
            {enabled && taskList && (
              <Table
                columns={columns}
                data={taskList}
                //tableHeading="Rotate Task - Twing"
                className="table-auto"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center ">
          {openModal && (
            <Modal setOpenModal={setOpenModal} heading={mesg}></Modal>
          )}
        </div>
      </main>
    </div>
  );
}

export default TaskRotateUtility;
