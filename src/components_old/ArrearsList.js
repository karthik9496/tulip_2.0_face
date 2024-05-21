/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 18 April 2022
 *
 * Modified By :
 */

import { useState, useEffect, useMemo } from "react";
import Table, { SelectColumnFilter } from "../utils/Table"; //
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import TableCopy from "../utils/TableCopy";

function ArrearsList() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const [qe, setQe] = useState("");
  const [payCode, setPayCode] = useState("");
  const [totalArr, setTotalArr] = useState(0);
  const [qeSearch, setQeSearch] = useState("");
  const [pcSearch, setPcSearch] = useState("");

  const [groupedData, setGroupedData] = useState([]);

  useEffect(() => {
    if (qe && qe.length !== 6) {
      alert("Fill QE in mmyyyy format");
      return;
    }
    let fetching = false;
    async function fetchData() {
      if (!fetching)
        await axios
          .get(
            "/arrears?search=" +
              search +
              "&me=" +
              qeSearch +
              "&payCode=" +
              pcSearch
          )
          .then((response) => {
            console.log("arrears list >> ", response.data);
            if (response.data[0]) setData(response.data[0]);
            response.data[1] ? setTotalArr(response.data[1]) : setTotalArr(0);
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
  }, [update, search, qeSearch, pcSearch]);

  async function remove(id) {
    await axios
      .delete(`/arrearss/${id}`)
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

  useEffect(() => {
    if (data && data.length > 0) {
      let myPayCodeArr = [];
      let myCdaoNoArr = [];
      let finalArr = [];
      data.map((item, index) => {
        if (!myPayCodeArr.includes(item.payCode.payCode)) {
          myPayCodeArr = [...myPayCodeArr, item.payCode.payCode];
        }
        if (!myCdaoNoArr.includes(item.employee.cdaoNo)) {
          myCdaoNoArr = [...myCdaoNoArr, item.employee.cdaoNo];
        }
      });
      myPayCodeArr.map((item, index) => {
        let finalObj = { cdaoNo: "", payCode: "", amount: 0 };
        myCdaoNoArr.map((itm, indx) => {
          let amt = 0;
          data.map((it, inx) => {
            if (it.payCode.payCode == item && it.employee.cdaoNo == itm) {
              amt = amt + it.amount;
              finalObj = {
                ...finalObj,
                cdaoNo: itm,
                payCode: item,
                amount: amt,
              };
            }
          });

          finalArr = [...finalArr, finalObj];
        });
      });
      setGroupedData(finalArr);
    } else {
      setGroupedData([]);
    }
  }, [data]);

  const columns = useMemo(
    () => [
      {
        Header: "Employee",
        accessor: "employee.cdaoNo", // Change this
      },

      {
        Header: "Do2",
        accessor: "do2.occurrenceCode", // Change this
      },
      {
        Header: "Month",
        accessor: "monthEnding",
      },

      {
        Header: "Pay Code",
        accessor: "payCode.payCode", // Change this
      },

      {
        Header: "From Date",
        accessor: "fromDate",
      },

      {
        Header: "To Date",
        accessor: "toDate",
      },

      {
        Header: "Amount",
        accessor: "amount",
      },

      {
        Header: "Paid",
        accessor: "paid",
        Cell: ({ row }) => (
          <div>
            <div>
              {row.original.paid && row.original.paid === true ? "Y" : "N"}
            </div>
          </div>
        ),
      },

      {
        Header: "Round Off Amount",
        accessor: "roundOffAmount",
        Cell: ({ row }) => (
          <div>
            <div>
              {row.original.roundOffAmount &&
              row.original.roundOffAmount === true
                ? "Y"
                : "N"}
            </div>
          </div>
        ),
      },

      {
        Header: "Due",
        accessor: "due",
      },

      {
        Header: "Drawn",
        accessor: "drawn",
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
  const groupedDataColumns = useMemo(
    () => [
      {
        Header: "cdaoNo",
        accessor: "cdaoNo",
      },
      {
        Header: "payCode",
        accessor: "payCode",
      },
      {
        Header: "amount",
        accessor: "amount",
      },
    ],
    [groupedData]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputText);
    setSearch(inputText);
    setQeSearch(qe);
    setPcSearch(payCode);
  };

  const handleKeyPress = (event) => {
    // look for the `Enter` keyCode
    if (event.keyCode === 13 || event.which === 13) {
      handleSubmit(event);
    }
  };

  return (
    <div className=" bg-gray-100 text-gray-900">
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-2 ml-4">
          <h1 className="">Arrearss</h1>
          {totalArr && (
            <h2 className="text-xl font-semibold">
              Total Arr Amount : {totalArr}
            </h2>
          )}
          <div className="flexContainer">
            <div>
              <input
                type="text"
                name="search"
                onBlur={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="cdao no"
                className="pl-2 -ml-2 inputField flex-initial"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="qe in mmyyyy"
                name="mmyyyy"
                onBlur={(e) => setQe(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-2 -ml-2 inputField flex-initial"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="payCode"
                name="payCode"
                onBlur={(e) => setPayCode(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-2 -ml-2 inputField flex-initial"
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-16 m-0 p-0"
            >
              Search
            </button>
          </div>
        </div>
        <div className="">
          <div>
            <Table columns={columns} data={data} className="table-auto" />
          </div>
          <div className=" flex justify-center">
            <div className="w-5/12">
              <h1 className="text-center">Arrears Grouped by Pay Code</h1>
              <Table data={groupedData} columns={groupedDataColumns} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default withRouter(ArrearsList);
