import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../utils/Table";

function NokList() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const [loggedInUsr, setLoggedInUsr] = useState({});

  useEffect(() => {
    setLoggedInUsr(JSON.parse(sessionStorage.getItem("usr")));
    console.log(JSON.parse(sessionStorage.getItem("usr")));
  }, []);

  useEffect(() => {
    axios.get("/noks?search=" + search).then((response) => {
      console.log(response.data);
      setData(response.data);
    });
  }, [search]);

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
            <Link to={"/noks/" + row.original.id}>
              {row.original.action == "edit" && (
                <button className="m-0 p-0 "> Edit </button>
              )}
              {row.original.action == "submit" && (
                <button className="m-0 p-0 "> Submit </button>
              )}
              {row.original.action == "approve" && (
                <button className="m-0 py-0 bg-red-600"> Approve </button>
              )}
            </Link>
          </div>
        ),
      },
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
    ],
    [data]
  );

  return (
    <div>
      <div className="mt-2 ml-4">
        <h1 className="text-xl font-semibold">NOK List</h1>
        <div className="flexContainer">
          <input
            type="text"
            name="search"
            placeholder="CDAO NO"
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-2 -ml-2 inputField flex-initial"
          />
          <button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">
            Search
          </button>

          {loggedInUsr?.designation?.designationLevel < 30 ? (
            <div>
              <Link to={"/noks/new"}>
                <button className=" hover:bg-red-600 w-32 ml-8 p-0 h-6 -mt-2">
                  Add Nok
                </button>
              </Link>
            </div>
          ) : (
            ""
          )}
          <div>
            <Link to={"/noks/processed"}>
              <button className="bg-red-600 ml-8 p-0 h-6 -mt-2">
                Processed Nok
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <Table columns={columns} data={data} className="table-auto" />
      </div>
    </div>
  );
}
export default NokList;
