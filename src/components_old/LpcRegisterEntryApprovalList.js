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
import { withRouter, Link, useHistory, useLocation } from "react-router-dom";
import TablePage from "../utils/TablePage";

function LpcRegisterEntryApprovalList() {
  let history = useHistory();

  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");

  const [entryApproveList, setEntryApproveList] = useState([]);
  const [page, setPage] = useState(0);
  const [usrLevel, setUsrLevel] = useState("");
  const [mesg, setMesg] = useState("");
  const [disabled, setDisabled] = useState(false);
  const { state } = useLocation();
  const [pageSize, setPageSize] = useState(0);

  useEffect(() => {
    let fetching = false;
    //	console.log(">>>>InXXXXXX:" + state);
    async function fetchEntryApproveData() {
      if (!fetching)
        await axios
          .get(`/lpcRegisters/entryApprovalList?search=` + search)
          .then((response) => {
            setEntryApproveList(response.data);
            setUsrLevel(response.data[0].usrLevel);
            console.log(">>>>Usr Level is----:" + usrLevel);
          })
          .catch((error) => {
            //console.log(error);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
    }
    fetchEntryApproveData();
    return () => {
      fetching = true;
    };
  }, [update, search, state]);

  async function approve() {
    await axios
      .put(`/lpcRegisters/bulkEntryApprove`, entryApproveList)
      .then((response) => {
        console.log("reponse status--------------" + response.status);
        setMesg(response.data);
        //	history.push({ pathname: '/lpcRegisters', state: response.data });
        setEntryApproveList([]);
      })
      .catch((error) => {
        //	console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });
  }

  const handleCheckBox = (index) => (e) => {
    //console.log(Table.page)
    console.log(e.target.checked + "--" + index);

    console.log(e.target.checked);
    let item = entryApproveList[index];

    item["select"] = e.target.checked;
    let newData = [...entryApproveList];
    newData[index] = item;
    setEntryApproveList(newData);
  };

  const updateCheckBoxAll = (e) => {
    // console.log("..."+e.target.checked+"--"+index);

    let newData = [...entryApproveList];
    for (var k in newData) {
      newData[k].select = e.target.checked;
    }
    setEntryApproveList(newData);
  };
  const ShowEntryApprovalData = () => {
    const handleP = (pp) => {
      console.log(pp);
      setPage(pp);
    };
    const handlePageSize = (pp) => {
      console.log(pp);
      setPageSize(pp);
    };

    const columns = useMemo(
      () => [
        {
          Header: <input type="checkbox" onChange={updateCheckBoxAll} />,
          accessor: "select",
          Cell: ({ row }) => (
            <div>
              <input
                type="checkbox"
                onChange={handleCheckBox(row.index)}
                checked={entryApproveList[row.index]["select"]}
              />
            </div>
          ),
        },
        {
          Header: "Cdao No",
          accessor: "employee.cdaoNo",
        },

        {
          Header: "Check Digit",
          accessor: "employee.checkDigit",
        },

        {
          Header: "Officer Name",
          accessor: "employee.officerName",
        },

        {
          Header: "Stop Pay Description",
          accessor: "stopPayDescription",
        },

        {
          Header: "Qe",
          accessor: "qe",
        },

        {
          Header: "Discharge Date",
          accessor: "dischargeDate",
        },

        {
          Header: "Record Status",
          accessor: "recordStatus",
        },
      ],
      [entryApproveList, page, setPage]
    );

    return (
      <div className="min-h-screen bg-green-100 text-gray-700">
        <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">
          <div className="-mt-2 max-h-1 py-0 ml-0">
            <TablePage
              columns={columns}
              data={entryApproveList}
              newpage={page}
              parentCallback={handleP}
              newPageSize={pageSize}
              parentCallbackPageSize={handlePageSize}
              className="table-auto"
            />
            <div className="mt-2 ml-4">
              <button type="button" onClick={approve} className="w-40 m-2 p-0">
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
  const handleBack = () => {
    history.push("/lpcRegisters");
    //	setUsrLevel(usrLevel);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="text-red-500">{serverErrors}</div>
        <div className="text-red-500">{mesg}</div>

        <h1 className="text-xl font-semibold ml-4">
          Regular Fs Entry Approval
        </h1>

        <br />

        <div className="flexContainer">
          <label>Cdao No: </label>
          <input
            type="text"
            name="search"
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="ml-18 pl-2 -ml-2 inputField flex-initial"
          />

          <button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">
            Search
          </button>
          <div>
            <button className=" w-36 ml-8 p-0 h-6 -mt-2" onClick={handleBack}>
              Close
            </button>
          </div>
        </div>

        <div className="mt-2 max-h-1 py-0 ml-0">
          <ShowEntryApprovalData />
        </div>
      </div>
    </div>
  );
}

export default withRouter(LpcRegisterEntryApprovalList);
