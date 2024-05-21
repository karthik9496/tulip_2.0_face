import { useState, useEffect, useMemo } from "react";

import Table, { SelectColumnFilter } from "../utils/Table";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { BasicLoadingIcon } from "../utils/Icons";

function CbillLegacyClaimList() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let fetching = false;
    async function fetchData() {
      setLoading(true);
      if (!fetching)
        await axios
          .get("/cbillLegacyClaims?search=" + search)
          .then((response) => {
            setLoading(false);
            setData(response.data);
          })
          .catch((error) => {
            setLoading(false);
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

  const columns = useMemo(
    () => [
      {
        Header: "Dak-Id",
        accessor: "dakid",
      },

      {
        Header: "CdaoNo",
        accessor: "cdaca",
      },
      {
        Header: "Rank",
        accessor: "rank",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Amount",
        accessor: "amt4",
      },

      {
        Header: "Rule",
        accessor: "rule",
      },

      {
        Header: "Claim Type",
        accessor: "typeClaim",
      },

      {
        Header: "Claim Date",
        accessor: "claimDate",
      },
      {
        Header: "Leave From Date",
        accessor: "leaveFromDate",
      },
      {
        Header: "Leave To Date",
        accessor: "leaveToDate",
      },

      {
        Header: "Date Of Move",
        accessor: "dateofmove",
      },
      {
        Header: "From Station",
        accessor: "fromStation",
      },
      {
        Header: "To Station",
        accessor: "toStation",
      },
      {
        Header: "DV No",
        accessor: "dvno",
      },
      {
        Header: "Amount Claimed",
        accessor: "amtclaimed",
      },
      {
        Header: "Advance Drawn",
        accessor: "advDrawn",
      },

      {
        Header: "Amount Admitted",
        accessor: "amtAdmitted",
      },

      {
        Header: "Disallowance Code - 1",
        accessor: "dc1",
      },

      {
        Header: "Disallowance Amount - 1",
        accessor: "da1",
      },

      {
        Header: "Disallowance Code - 2",
        accessor: "dc2",
      },

      {
        Header: "Disallowance Amount - 2",
        accessor: "da2",
      },

      {
        Header: "Disallowance Code - 3",
        accessor: "dc3",
      },

      {
        Header: "Disallowance Amount - 3",
        accessor: "da3",
      },

      {
        Header: "Disallowance Code - 4",
        accessor: "dc4",
      },

      {
        Header: "Disallowance Amount - 4",
        accessor: "da4",
      },

      {
        Header: "Disallowance Code - 5",
        accessor: "dc5",
      },

      {
        Header: "Disallowance Amount - 5",
        accessor: "da5",
      },

      {
        Header: "Disallowance Code - 6",
        accessor: "dc6",
      },

      {
        Header: "Disallowance Amount - 6",
        accessor: "da6",
      },

      {
        Header: "Disallowance Code - 7",
        accessor: "dc7",
      },

      {
        Header: "Disallowance Amount - 7",
        accessor: "da7",
      },

      {
        Header: "Disallowance Code - 8",
        accessor: "dc8",
      },

      {
        Header: "Disallowance Amount - 8",
        accessor: "da8",
      },
    ],
    []
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
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-2 ml-4">
          <h1 className="text-xl font-semibold">Cbill Legacy Data</h1>
          <div className="flexContainer">
            <input
              type="text"
              name="search"
              placeholder="CDAO No"
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
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center fixed top-1/4 w-full z-50">
            <p className="mr-2 text-2xl text-green-600">Fetching Data</p>
            <BasicLoadingIcon className="ml-1 mt-1 h-10 w-10 animate-spin text-green-600" />
          </div>
        ) : (
          <div className="-mt-2 max-h-1 py-0">
            <Table columns={columns} data={data} className="table-auto" />
          </div>
        )}
      </main>
    </div>
  );
}

export default withRouter(CbillLegacyClaimList);
