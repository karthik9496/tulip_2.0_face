import { useState, useEffect, useMemo } from "react";
import Table, { SelectColumnFilter } from "../utils/Table"; //
import axios from "axios";

import { withRouter, Link, useLocation } from "react-router-dom";

function AlertList() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");

  const [selectionType, setSelectionType] = useState("");
  const location = useLocation();
  const [loggedInUsr, setLoggedInUsr] = useState({});

  useEffect(() => {
    setLoggedInUsr(JSON.parse(sessionStorage.getItem("usr")));
    console.log(JSON.parse(sessionStorage.getItem("usr")))
  }, []);

  async function deleteAlert(id) {
		await axios.delete(`/alerts/${id}`)
			.then(() => {
				console.log(data);
				let updatedRecords = [...data].filter((i) => i.id !== id);
				console.log(updatedRecords);
				setData(updatedRecords);
				setUpdate(!update);
			})
			.catch((error) => {
				console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}



  useEffect(() => {
    let fetching = false;
    async function fetchData() {
      if (!fetching)
     {
          await axios
            .get("/alerts?search=" + search)
            .then((response) => {
              setData(response.data);
              console.log(response.data)
            })
            .catch((error) => {
              //console.log(error);
              //console.log(error.response.status);
              //console.log(error.response.headers);
              if (error.response) setServerErrors(error.response.data.error);
              else setServerErrors(error.Error);
            });
        }
    }
    fetchData();
    return () => {
      fetching = true;
    };
  }, [update, search]);

  
  
  

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
            {loggedInUsr?.loginName==='sysAdmin'  &&
              (
                  <button className="bg-red-500 hover:bg-red-700 w-16 m-0 p-0 "
                  onClick={() => deleteAlert(row.original.id)}
                  > Delete </button>
                
              )}{" "}
   
          </div>
        ),
      },
     
      
      {
        Header: "Corps",
        accessor: "corps.unitName", // Change this
      },

      {
        Header: "Unit",
        accessor: "unit.unitCode", // Change this
      },

      {
        Header: "Month Ending",
        accessor:"monthEnding"
      },

      {
        Header: "Alert Message",
        accessor: "alertMsg",
      },

      {
        Header: "Priority",
        accessor: "priority",
      },

      {
        Header: "Created At",
        accessor: "createdAt",
      },

      {
        Header: "Record Status",
        accessor: "recordStatus",
      },

    ],
    [data]
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-2 ml-4">
          <h1 className="text-xl font-semibold">Alert List</h1>
          <div className="flexContainer">
            <input
              type="text"
              name="search"
              placeholder="Message or Month Ending"
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-2 -ml-2 inputField flex-initial"
            />
            <div>

            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-16 m-0 p-0"
            >
              Search
            </button>

            <div>
            {loggedInUsr?.loginName==='sysAdmin'  && (
              <Link to={"/alerts/new/"}>
                <button className=" w-32 ml-8 p-0 h-6 -mt-2">Add Alert </button>
              </Link>)}
            </div>

          </div>

        </div>

        <div className="-mt-2 max-h-1 py-0">
          <Table columns={columns} data={data} className="table-auto" />
        </div>
      </main>
    </div>
  );
}

export default withRouter(AlertList);
