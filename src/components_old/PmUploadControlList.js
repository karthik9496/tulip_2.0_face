/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By :
 */

import { useState, useEffect, useMemo } from "react";
import Table, { SelectColumnFilter } from "../utils/Table"; //
import axios from "axios";
import { withRouter, Link } from "react-router-dom";

function PmUploadControlList() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    let fetching = false;
    async function fetchData() {
      if (!fetching)
        await axios
          .get("/pmUploadControls?search=" + search)
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            //console.log(error);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
    }
    fetchData();
    return () => {
      fetching = true;
    };
  }, [update, search]);

  async function remove(id) {
    await axios
      .delete(`/pmUploadControls/${id}`)
      .then(() => {
        //console.log(data);
        let updatedRecords = [...data].filter((i) => i.id !== id);
        console.log(updatedRecords);
        setData(updatedRecords);
        setUpdate(!update);
      })
      .catch((error) => {
        console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });
  }

  const download = (fileName) => {
    console.log(fileName);
    axios.get(`/pmUploadControls/downloadFile/${fileName}`).then((response) => {
      const url = window.open(
        `${process.env.REACT_APP_BASE_URL}/files/${response.data}`
      );
    });
  };

  const regenerate = (fileName) => {
    console.log(fileName);
    axios.get(`/pmUploadControls/regenFile/${fileName}`).then((response) => {
      const url = window.open(
        `${process.env.REACT_APP_BASE_URL}/files/${response.data}`
      );
    });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div>
            <button
              className=" w-32 m-0 p-0 "
              onClick={() => download(row.original.batchNo)}
            >
              {" "}
              Download{" "}
            </button>{" "}
            <button
              className=" w-32 m-0 p-0 "
              onClick={() => regenerate(row.original.batchNo)}
            >
              {" "}
              Regenerate{" "}
            </button>
          </div>
        ),
      },
      {
        Header: "Batch No",
        accessor: "batchNo",
      },

      {
        Header: "Pm Month",
        accessor: "pmMonth",
        Filter: SelectColumnFilter,
      },

      {
        Header: "Upload Date",
        accessor: "uploadDate",
      },

      {
        Header: "No Of Records",
        accessor: "noOfRecords",
      },

      {
        Header: "Plus Receipt Amount",
        accessor: "plusReceiptAmount",
      },

      {
        Header: "Minus Receipt Amount",
        accessor: "minusReceiptAmount",
      },

      {
        Header: "Plus Charge Amount",
        accessor: "plusChargeAmount",
      },

      {
        Header: "Minus Charge Amount",
        accessor: "minusChargeAmount",
      },

      {
        Header: "Cda Code",
        accessor: "cdaCode",
      },

      {
        Header: "Record Status",
        accessor: "recordStatus",
      },

      {
        Header: "Upload Month",
        accessor: "uploadMonth",
      },

      {
        Header: "Reason",
        accessor: "reason",
      },

      /*
		{
			Header: "Login Name",
			accessor: 'loginName',
			Filter: SelectColumnFilter,  // new
			filter: 'includes',
		},
		*/
    ],
    [data]
  );

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

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-2 ml-4">
          <h1 className="text-xl font-semibold">Pm Upload Controls</h1>
          <div className="flexContainer">
            <input
              type="text"
              name="search"
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-2 -ml-2 inputField flex-initial"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-16 m-0 p-0"
            >
              Search
            </button>
            <div>
              <Link to={"/pmUploadControls/new"}>
                <button className=" w-36 ml-8 p-0 h-6 -mt-2">
                  {" "}
                  Generate New File{" "}
                </button>
              </Link>
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

export default withRouter(PmUploadControlList);
