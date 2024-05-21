import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import TableCopy from "../utils/TableCopy";
import Table from "../utils/Table";
import { Link, useHistory } from "react-router-dom";

function BListingList() {
  const [data, setData] = useState([]);
  const [aListData, setAListData] = useState([]);
  const [usr, setUsr] = useState({});
  const [aListing, setAListing] = useState(false);

  let history = useHistory();

  useEffect(() => {
    let usr = JSON.parse(sessionStorage.getItem("usr"));
    setUsr(usr);
    console.log(usr);
  }, []);

  useEffect(() => {
    axios.get("/blisting").then((response) => {
      setData(response.data);
      console.log("bList >>> ", response.data);
    });
  }, []);

  useEffect(() => {
    let validity = false;
    if (usr?.designation?.designationLevel > 30) {
      usr.sectionList.map((item, index) => {
        if (item.sectionName == "LW18" || item.sectionName == "PSC")
          validity = true;
      });

      if (validity) {
        axios.get("/blisting/alist").then((response) => {
          console.log("aList >>> ", response.data);
          setAListData(response.data);
        });
      }
    }
  }, [usr]);

  async function SubmitBList(id) {
    await axios.put(`/blisting/submit/${id}`).then((response) => {
      console.log(response.data);
      if (response.data == "ok") {
        setData(data.filter((item) => item.id != id));
      }
    });
  }

  async function RejectBList(id) {
    await axios.put(`/blisting/reject/${id}`).then((response) => {
      console.log(response.data);
      if (response.data == "ok") {
        setData(data.filter((item) => item.id != id));
      }
    });
  }

  async function ApproveAList(id) {
    await axios.put(`/blisting/approve/${id}`).then((response) => {
      console.log(response.data);
      if (response.data == "ok") {
        setAListData(aListData.filter((item) => item.id != id));
      }
    });
    console.log("idddd", id);
  }

  async function RejectAList(id) {
    await axios.put(`/blisting/reject/alist/${id}`).then((response) => {
      console.log(response.data);
      if (response.data == "ok") {
        setAListData(data.filter((item) => item.id != id));
      }
    });
  }

  const columns = useMemo(
    () => [
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div>
            {usr?.designation?.designationLevel < 30 ? (
              <Link to={"/blistingEdit/" + row.original.id}>
                <button className=" w-20 m-1 p-0 "> Edit </button>
              </Link>
            ) : (
              <div>
                <div>
                  <button
                    className="px-2 m-0"
                    onClick={() => SubmitBList(row.original.id)}
                  >
                    {usr?.designation?.designationLevel == 30 && "Submit"}
                    {usr?.designation?.designationLevel > 30 && "Approve"}
                  </button>
                </div>
                <div>
                  <button
                    className="bg-red-500 hover:bg-red-700 m-0 mt-2"
                    onClick={() => RejectBList(row.original.id)}
                  >
                    {usr?.designation?.designationLevel >= 30 && "Reject"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ),
      },
      {
        Header: "CDAO No",
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
        Header: "Officer Rank",
        accessor: "employee.rank.rankName",
      },
      {
        Header: "Officer Name",
        accessor: "employee.officerName",
      },
      {
        Header: "From Section",
        accessor: "fromSection.sectionName",
      },
      {
        Header: "To Section",
        accessor: "toSection.sectionName",
      },
      {
        Header: "Auditor",
        accessor: "auditor.usrName",
      },
      {
        Header: "AAO",
        accessor: "aao.usrName",
      },
    ],
    [data]
  );

  const aListColumns = useMemo(
    () => [
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div>
            {usr?.designation?.designationLevel > 30 ? (
              <div className="flex">
                <button
                  className="w-32 my-1 mx-2 py-1"
                  onClick={() => ApproveAList(row.original.id)}
                >
                  Accept
                </button>
                <button
                  className="w-32 my-1 mx-2 py-1 bg-red-500 hover:bg-red-700"
                  onClick={() => RejectAList(row.original.id)}
                >
                  Reject
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        ),
      },
      {
        Header: "CDAO No",
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
        Header: "Officer Rank",
        accessor: "employee.rank.rankName",
        Cell: ({ row }) => (
          <div>
            <label>{row.original.employee.rank.rankName}</label>
          </div>
        ),
      },
      {
        Header: "Officer Name",
        accessor: "employee.",
        Cell: ({ row }) => (
          <div>
            <label>{row.original.employee.officerName}</label>
          </div>
        ),
      },
      {
        Header: "From Section",
        accessor: "fromSection.sectionName",
        Cell: ({ row }) => (
          <div>
            <label>
              <span className="text-red-700">
                {row.original.fromSection.sectionName}
              </span>{" "}
              -{" "}
              <span className="text-green-700">{row.original.ao.usrName}</span>
              (SAO)
            </label>
          </div>
        ),
      },
      {
        Header: "Date",
        accessor: "aoDate",
      },
    ],
    [aListData]
  );

  return (
    <div className="mt-3">
      {/* {usr?.designation?.designationLevel < 30 &&
        usr?.section?.sectionGroup == "LWING" && (
          <div>
            <div>
              <div>
                <Link to={"/blistingedit"}>
                  <button className=" w-32 ml-8 p-0 h-6 -mt-2">
                    Add to B List
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )} */}
      <div className=" flex">
        <div>
          <div>
            <Link to={"/blistingEdit/new"}>
              <button className=" w-32 ml-8 p-0 h-6 -mt-2">
                Add to B List
              </button>
            </Link>
          </div>
        </div>
        <div>
          <div>
            <Link to={"/blistprocessed"}>
              <button className=" w-32 ml-8 p-0 h-6 -mt-2">
                Processed B List
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-4">
        {data?.length > 0 && (
          <div>
            <h2>B List</h2>
            <Table data={data} columns={columns} />
          </div>
        )}
        {aListData?.length > 0 && (
          <div>
            <h2>A List</h2>
            <Table data={aListData} columns={aListColumns} />
          </div>
        )}
      </div>
    </div>
  );
}
export default BListingList;
