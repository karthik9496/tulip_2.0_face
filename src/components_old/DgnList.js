import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import Table from "../utils/Table";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function DgnList() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios.get(`/dgn/daklist`).then((response) => {
      console.log(response.data);
      setData(response.data);
      setFilteredData(response.data);
    });
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div>
            <Link to={"/dgns/" + row.original.id}>
              <button className=" w-16 m-0 p-0 "> Edit </button>
            </Link>
          </div>
        ),
      },

      {
        Header: "IC/Prsnl No",
        accessor: "employee.icNo",
      },

      {
        Header: "Dak Id No",
        accessor: "dakidNo",
      },

      {
        Header: "Cdao No",
        accessor: "employee.cdaoNo",
      },

      {
        Header: "Dgn Authority",
        accessor: "referenceNo",
      },

      {
        Header: "Dgn Date",
        accessor: "referenceDate",
      },
    ],
    [data]
  );
  return (
    <div>
      <div>
        <h1 className="text-center underline">DGN List</h1>
      </div>
      <div className="flex">
        <div>
          <input
            className="pl-2"
            type="text"
            name="search"
            placeholder="Dak Id"
            onChange={(e) => {
              let { value } = e.target;
              value = value?.toUpperCase();
              let newData = filteredData.filter((item) => {
                if (item.dakidNo.includes(value)) return item;
              });
              setData(newData);
            }}
          />
        </div>
        <div>
          <Link to={"/dgnsProcessed"}>
            <button className=" w-40 ml-8 p-0 h-6 -mt-2">
              Processed DGNs{" "}
            </button>
          </Link>
        </div>
      </div>
      <div>
        <Table data={data} columns={columns} />
      </div>
    </div>
  );
}
export default DgnList;
