import { useState, useEffect, useMemo } from "react";
import Table, { SelectColumnFilter } from "../utils/Table";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { min } from "lodash";

function GrievanceProcessedList({ id }) {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const [mesg, setMesg] = useState("");

  useEffect(() => {
    let fetching = false;
    async function fetchData() {
      if (!fetching)
        await axios
          .get("/grievances/getTransferLog/" + id)
          .then((response) => {
            //setData(response.data);
            if (response.data != null) {
              //	console.log(">>>>>Search CdaoNo---:" + response.data.cdaoNo);
              setData(response.data);
            } else {
              setData(null);
            }
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
        Header: "Dak Id",
        accessor: "grievance.webId",
      },
      {
        Header: "CDAONo",
        accessor: "grievance.cdaoNo",
      },

      {
        Header: "Transferred From",
        accessor: "fromSection",
      },
      {
        Header: "Transferred To",
        accessor: "toSection",
      },
      {
        Header: "Transferred By",
        accessor: "transferredBy",
      },
      {
        Header: "Transferred At",
        accessor: "createdAt",
        Cell: ({ row }) => (
          <div>
            <label>
              {row.original.createdAt.slice(0, 10)}{" "}
              {row.original.createdAt.slice(11, 19)}
            </label>
          </div>
        ),
      },
    ],
    [data]
  );

  return (
    <div className="shadow-xl mt-8 text-gray-900">
      {data.length != 0 ? (
        <div>
          <p className="text-2xl text-gray-600">Transfer History</p>
          <hr />
          <div className="py-0">
            <Table columns={columns} data={data} className="p-0 pl-0" />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default withRouter(GrievanceProcessedList);
