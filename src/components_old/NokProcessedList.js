import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import Table from "../utils/Table";
import { Link } from "react-router-dom";

function NokProcessedList() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  function FetchProcessed() {
    axios.get(`/noks/processed?search=${search}`).then((response) => {
      console.log(response.data);
      setData(response.data);
    });
  }

  useEffect(() => {
    FetchProcessed();
  }, []);

  const handleKeyPress = (event) => {
    if (event.keyCode === 13 || event.which === 13) {
      FetchProcessed();
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "CDAO No",
        accessor: "cdaoNo",
      },
      {
        Header: "Officer Name",
        accessor: "employee.officerName",
      },
      {
        Header: "Name of Member",
        accessor: "nameOfMember",
      },

      {
        Header: "Date of Birth",
        accessor: "dateOfBirth",
      },
      {
        Header: "Relation",
        accessor: "relation.relationName",
      },
      {
        Header: "Nomination percentage",
        accessor: "nokPercentage",
      },
      {
        Header: "Date of Approval",
        accessor: "aoDate",
      },
    ],
    [data]
  );

  return (
    <div className="mt-2">
      <div className="mx-2">
        <h1 className="">Processed NOKs List</h1>
      </div>
      <div className="flex">
        <div>
          <input
            className="m-2 bg-gray-200 focus:bg-yellow-100 px-2"
            placeholder="Enter CDAO No"
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div>
          <button className="px-2" onClick={() => FetchProcessed()}>
            Search
          </button>
        </div>
        <div>
          <Link to={"/noks"}>
            <button className="px-2">Nok</button>
          </Link>
        </div>
      </div>
      <div>
        <Table data={data} columns={columns} />
      </div>
    </div>
  );
}
export default NokProcessedList;
