import { useState, useEffect, useMemo } from "react";

import Table, { SelectColumnFilter } from "../utils/Table";
import axios from "axios";
import { withRouter, Link, useHistory } from "react-router-dom";

function OmroApprovedList() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const [mesg, setMesg] = useState("");
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    let fetching = false;
    async function fetchData() {
      if (!fetching)
        await axios
          .get("/omros/approvedList?search=" + search)
          .then((response) => {
            setData(response.data);
            if (response.data != null) {
              //	console.log(">>>>>Search CdaoNo---:" + response.data.cdaoNo);
              setData(response.data);
            }
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

  async function generateBill(id) {
    setClicked(true);
    await axios
      .post(`/omros/generateBill/${id}`)
      .then((response) => {
        window.scrollTo(0, 0);

        console.log("response ", response.data);
        setMesg(response.data[0]);

        if (response.data[1]) {
          let updatedRecords = [...data].filter((i) => i.id !== id);
          setData(updatedRecords);
          window.open(
            `${process.env.REACT_APP_BASE_URL}/files/${response.data[1]}`
          );
        }
      })
      .catch((error) => {
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });
  }

  const columns = useMemo(
    () => [
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div>
            {" "}
            {row.original.personalClaimSettlementDakId == null &&
              row.original.approved &&
              row.original.action === "credit to irla" && (
                <Link to={"/omros/creditToIrla/" + row.original.id}>
                  <button className=" w-32 m-0 p-0 "> Credit To IRLA </button>
                </Link>
              )}{" "}
            {row.original.personalClaimSettlementDakId == null &&
              row.original.action === "credit to irla" &&
              row.original.approved && (
                <button
                  type="submit"
                  onClick={() => generateBill(row.original.id)}
                  className=" w-32 m-0 p-0 "
                >
                  {" "}
                  Generate Bill
                </button>
              )}
          </div>
        ),
      },

      {
        Header: "CDAONo",
        accessor: "employee.cdaoNo",
      },
      {
        Header: "Dak",
        accessor: "dak.dakidNo",
      },

      {
        Header: "Min No",
        accessor: "minNo", // Change this
      },

      {
        Header: "MRO Date",
        accessor: "mroDate", // Change this
      },

      {
        Header: "MRO Amount",
        accessor: "amount",
      },
      {
        Header: "Voucher Number",
        accessor: "voucherNumber",
      },

      {
        Header: "Voucher Date",
        accessor: "voucherDate",
      },
      {
        Header: "Remittance Detail",
        accessor: "remittanceDetail",
      },
      {
        Header: "Settlement Dak Id",
        accessor: "personalClaimSettlementDakId",
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

  const handleKeyPress = (event) => {
    // look for the `Enter` keyCode
    if (event.keyCode === 13 || event.which === 13) {
      handleSubmit(event);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputText);
    setSearch(inputText);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-2 ml-4">
          <h1 className="text-xl font-semibold">OMRO Approved List</h1>
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

            <div>
              <Link to={"/omros"}>
                <button className=" w-32 ml-8 p-0 h-6 -mt-2">Pending </button>
              </Link>
            </div>
          </div>
        </div>
        <h1 className="m-2 text-red-500">{mesg}</h1>
        <div className="-mt-2 max-h-1 py-0">
          <Table columns={columns} data={data} className="table-auto" />
        </div>
      </main>
    </div>
  );
}

export default withRouter(OmroApprovedList);
