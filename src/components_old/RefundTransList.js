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
import TablePage from "../utils/TablePage";
import TablePageAdj from '../utils/TablePageAdj';


function RefundTransList() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [usrLevel, setUsrLevel] = useState(0);
  const [mesg, setMesg] = useState("");
  const [approved, setApproved] = useState(true);
  const [rentBillType, setRentBillType] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [validRec, setValidRec] = useState("");
  const [invalidRec, setInvalidRec] = useState("");
  const [iors, setIors] = useState("");
  const [lightTheme, setLightTheme] = useState(true);

  useEffect(() => {
    let fetching = false;
    async function fetchData() {
      if (!fetching) console.log(rentBillType);
      await axios
        .get("/refundTrans?search=" + search)

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

  useEffect(() => {
    let fetching = false;
    async function fetchUsrData() {
      if (!fetching) console.log(">>>>Usr Level is -----:" + usrLevel);
      await axios
        .get(`/refundTrans/userDesg`)
        .then((response) => {
          console.log(">>>>Usr Level is----:" + response.data);
          setUsrLevel(response.data);
        })
        .catch((error) => {
          //console.log(error);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          if (error.response) setServerErrors(error.response.data.error);
          else setServerErrors(error.Error);
        });
    }
    fetchUsrData();
    return () => {
      fetching = true;
    };
  }, []);
  async function submit(id) {
	if (disabled)
			return;

		setDisabled(true);
     await axios
      .put(`/refundTrans/submitRefund/${id}`)
      .then((response) => {
        console.log(data);
        setMesg(response.data);
         setDisabled(false);
        let updatedRecords = [...data].filter((i) => i.id !== id);
        //console.log(updatedRecords);
        setData(updatedRecords);
      })
      .catch((error) => {
        console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });
  }
  async function approve(id) {
	if (disabled)
			return;

		setDisabled(true);
     await axios.put(`/refundTrans/approveRefund/${id}`)
      .then((response) => {
        setMesg(response.data);
        setDisabled(false);
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

  async function rollBack(id) {
    await axios.put(`/refundTrans/rollBack/${id}`)
      .then((response) => {
        console.log(data);
        setMesg(response.data);
        let updatedRecords = [...data].filter((i) => i.id !== id);
        //console.log(updatedRecords);
        setData(updatedRecords);
      })
      .catch((error) => {
        console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });
  }

  async function submitBulk() {
    let proceed = window.confirm(
      "You are about to process file containing " + data.length + " records."
    );
    if (!proceed) return;

    if (disabled) return;

    setDisabled(true);
    await axios
      .put(`/refundTrans/bulkSubmitRef`, data)
      .then((response) => {
        setDisabled(false);
        setMesg(response.data[0]);
        if (response.data[1] !== null) setData(response.data[1]);
        console.log("reponse status--------------" + response.status);
      })
      .catch((error) => {
        //	console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });
  }

  async function approveBulk() {
    let proceed = window.confirm(
      "You are about to approve file containing " + data.length + " records."
    );
    if (!proceed) return;

    if (disabled) return;

    setDisabled(true);
    await axios
      .put(`/refundTrans/bulkApproveRef`, data)
      .then((response) => {
       setValidRec(response.data[1]);
				setInvalidRec(response.data[2]);
				setApproved(true);
				setDisabled(false);
				if(response.data[2].startsWith("Selected")){
					setMesg(response.data[3]);
				}else{
					setMesg(response.data[0]);
				}
				
				window.confirm("Selected Records Have been approved.");
				console.log("reponse status--------------"+response.status);
			//	setFundList([]);
			let updatedRecords = [...data];
				console.log(updatedRecords);
				setData(updatedRecords);
				setUpdate(!update);
				setDisabled(false);
      })
      .catch((error) => {
        //	console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });
  }
  const updateCheckBoxAll = (e) => {
    // console.log("..."+e.target.checked+"--"+index);

    let newData = [...data];
    for (var k in newData) {
      newData[k].select = e.target.checked;
    }
    setData(newData);
  };
  const handleCheckBox = (index) => (e) => {
    //console.log(Table.page)
    console.log(e.target.checked + "--" + index);

    console.log(e.target.checked);
    let item = data[index];

    item["select"] = e.target.checked;
    let newData = [...data];
    newData[index] = item;
    setData(newData);
  };
  const columns = useMemo(
    () => [
	{
			Header:  <input type="checkbox" onChange={updateCheckBoxAll}/>,
				accessor : "select",	
			Cell: ({ row }) => (
				<div>
					 
					<input type="checkbox" onChange={handleCheckBox(row.index)} checked={data[row.index]['select']}  />
						 
					 
				</div>
				
			)
			 
		},
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div>
            <div>
              {row.original.action != null &&
                row.original.action.includes("edit") && (
                  <Link to={"/refundTrans/" + row.original.id}>
                    <button className=" w-16 m-0 p-0 "> Edit </button>
                  </Link>
                )}
            </div>
            <div>
              {usrLevel < 30 &&
                row.original.transactionType != null &&
                row.original.transactionType === "S" && (
                  <Link to={"/refundTrans/reject/" + row.original.id}>
                    <button className="w-18 m-0 p-0 bg-yellow-500 hover:bg-yellow-700 ">
                      {" "}
                      Reject{" "}
                    </button>
                  </Link>
                )}
            </div>
            <div>
              {usrLevel === 30 &&
                row.original.recordStatus === "V" &&
                row.original.action === "submission" && (
                  <button
                    className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
                    onClick={() => submit(row.original.id)}
                  >
                    {" "}
                    Submit{" "}
                  </button>
                )}
            </div>
            <div>
              {usrLevel === 30 &&
                row.original.recordStatus === "R" &&
                row.original.action === "reject" && (
                  <button
                    className="w-26 m-0 p-0 bg-yellow-500 hover:bg-yellow-700 "
                    onClick={() => submit(row.original.id)}
                  >
                    {" "}
                    Submit-Rej{" "}
                  </button>
                )}
            </div>
            <div>
              {usrLevel > 30 &&
                row.original.recordStatus === "V" &&
                row.original.action === "approval" && (
                  <button
                    className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
                    onClick={() => approve(row.original.id)}
                  >
                    {" "}
                    Approve{" "}
                  </button>
                )}
            </div>
            <div>
              {usrLevel > 30 &&
                row.original.recordStatus === "R" &&
                row.original.action === "reject" && (
                  <button
                    className="w-26 m-0 p-0 bg-red-500 hover:bg-red-700 "
                    onClick={() => approve(row.original.id)}
                  >
                    {" "}
                    Approve-Rej{" "}
                  </button>
                )}
            </div>
            <div>
              {usrLevel >= 30 &&
                (row.original.recordStatus === "V" ||
                  row.original.recordStatus === "R") && (
                  <button
                    className="w-18 m-0 p-0 bg-gray-500 hover:bg-gray-700 "
                    onClick={() => rollBack(row.original.id)}
                  >
                    {" "}
                    Roll Back{" "}
                  </button>
                )}
            </div>
          </div>
        ),
      },

      {
        Header: "Officer Details",
        accessor: "cdaoNo",

        Cell: ({ row }) => (
          <div>
            <div>
              <label>
                CdaO No : {row.original.cdaoNo} -- {row.original.checkDigit}
              </label>
            </div>
            <div>
              <label>Personal No : {row.original.personelNo}</label>
            </div>
            <div>
              {row.original.employee && (
                <label>
                  Officer Name : {row.original.employee.officerName}
                </label>
              )}
            </div>
            <div>
              {row.original.employee && (
                <label>Rank : {row.original.employee.rank.rankName}</label>
              )}
            </div>
          </div>
        ),
      },

      {
        Header: "Rent Details",
        accessor: "uabsoCode",

        Cell: ({ row }) => (
          <div>
            <div>
              <label>Uabso Code : {row.original.uabsoCode}</label>
            </div>
            <div>
              <label>Building No : {row.original.buildingNo}</label>
            </div>
            <div>
              <label>Station : {row.original.station}</label>
            </div>
            <div>
              {row.original.employee && (
                <label>Rank : {row.original.employee.rank.rankName}</label>
              )}
            </div>
          </div>
        ),
      },

      {
        Header: "Occupation Date",
        accessor: "occupationDate",
        Cell: ({ row }) => (
          <div>
            <label>{row.original.occupationDate}</label>
          </div>
        ),
      },

      {
        Header: "Vacation Date",
        accessor: "vacationDate",
        Cell: ({ row }) => (
          <div>
            <label>{row.original.vacationDate}</label>
          </div>
        ),
      },

      {
        Header: "Rent Bill Details",
        accessor: "rentBillNo",

        Cell: ({ row }) => (
          <div>
            <div>
              <label>Reference Bill No : {row.original.referenceBillNo}</label>
            </div>
            <div>
              <label>
                Reference Bill Date : {row.original.referenceBillDate}
              </label>
            </div>
            <div>
              <label>Rent Bill No : {row.original.rentBillNo}</label>
            </div>
            <div>
              <label>Rent Bill Date : {row.original.rentBillDate}</label>
            </div>
          </div>
        ),
      },

      {
        Header: "Licence Fee Amount",
        accessor: "lfeeAmount",
        Filter: SelectColumnFilter,
        filter: "lfeeAmount",

        Cell: ({ row }) => (
          <div>
            <div>
              <label>Lf From Date : {row.original.lfeeFromDate}</label>
            </div>
            <div>
              <label>Lf To Date : {row.original.lfeeToDate}</label>
            </div>
            <div>
              <label>Lf Amount : {row.original.lfeeAmount}</label>
            </div>
          </div>
        ),
      },
      {
        Header: "Furniture Amount",
        accessor: "furFromDate",
         Filter: SelectColumnFilter,
        filter: "furAmount",

        Cell: ({ row }) => (
          <div>
            <div>
              <label>Fur From Date : {row.original.furFromDate}</label>
            </div>
            <div>
              <label>Fur To Date : {row.original.furToDate}</label>
            </div>
            <div>
              <label>Fur Amount : {row.original.furAmount}</label>
            </div>
            <div>
              <label>
                Excess Fur From Date : {row.original.excessFurFromDate}
              </label>
            </div>
            <div>
              <label>Excess Fur To Date : {row.original.excessFurToDate}</label>
            </div>
            <div>
              <label>Excess Fur Amount : {row.original.excessFurAmount}</label>
            </div>
          </div>
        ),
      },

      

      {
        Header: "Water Amount",
        accessor: "waterAmount",
         Filter: SelectColumnFilter,
        filter: "waterAmount",

        Cell: ({ row }) => (
          <div>
           - 
            <div>
              <label>Water Amount : {row.original.waterAmount}</label>
            </div>
          </div>
        ),
      },

      {
        Header: "Power Details",
        accessor: "powerAmount",
         Filter: SelectColumnFilter,
        filter: "powerAmount",

        Cell: ({ row }) => (
          <div>
            
            <div>
              <label>Light Amount : {row.original.lightAmount}</label>
            </div>
            <div>
              <label>Power Amount : {row.original.powerAmount}</label>
            </div>
          </div>
        ),
      },

      {
        Header: "Servant Details",
        accessor: "servantQrAmount",

        Cell: ({ row }) => (
          <div>
            <div>
              <label>Servant Amount : {row.original.servantQrAmount}</label>
            </div>
            <div>
              <label>Garage Amount : {row.original.garageAmount}</label>
            </div>
          </div>
        ),
      },

      {
        Header: "Upload File Name",
        accessor: "uploadFileName",
        Cell: ({ row }) => (
          <div>
            <label>{row.original.uploadFileName}</label>
          </div>
        ),
      },

      {
        Header: "Approved",
        accessor: "approved",
        Cell: ({ row }) => (
          <div>{data[row.index]["approved"] === true ? "Y" : "N"}</div>
        ),
      },

      {
        Header: "Record Status",
        accessor: "recordStatus",
      },

      {
        Header: "Rejection Reason",
        accessor: "rejectionReason",
      },

      {
        Header: "Remarks",
        accessor: "remarks",
      },
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
  const handleP = (pp) => {
    console.log(pp);
    setPage(pp);
  };
  const handlePageSize = (pp) => {
    console.log(pp);
    setPageSize(pp);
  };
  
  function refresh(){ 
    window.location.reload(); 
}

  return (
			<div className={lightTheme ? 'theme-light' : 'theme-dark'} style={disabled ?{pointerEvents: "none",opacity :"0.4"}:{}}>
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-2 ml-4">
          <h1 className="text-xl font-semibold">Refund Transactions(REFUND)</h1>
          <div className="text-red-500">{mesg}</div>
          {usrLevel > 30 && (
            <>
              <div className="text-red-500">Total Valid Records:{validRec}</div>
              <div className="text-red-500">
                Total Invalid Records:{invalidRec}
              </div>
            </>
          )}
          <div className="flexContainer">
            <div>
              <input
                type="text"
                name="search"
                placeholder="Cdao No"
                onBlur={(e) => setInputText(e.target.value)}
                className="pl-2 -ml-2 inputField flex-initial"
              />
            </div>
            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-16 m-0 p-0"
              >
                Search
              </button>
            </div>
            <div>
						 {usrLevel<30 &&
					<Link to={"/refundTrans/new"}>
								<button className="w-42 m-2 p-1 float-left..." > Add Refund Transaction </button>
							</Link>
							}
					</div>
					<div>
						
						
							<Link to={"/refundTrans/approvedList/refund"}>
								<button className="w-42 m-2 p-1 float-left..." > Approved Refund </button>
							</Link>
						
						
						</div>
						<div>
						
						
							<Link to={"/refundTrans/manualEntryList/refund"}>
								<button className="w-42 m-2 p-1 float-left..." > Manual Refund </button>
							</Link>
						
						
						</div>
						<div>
						
						
							<Link to={"/refundTrans/rejectedList/refund"}>
								<button className="w-42 m-2 p-1 float-left..." > Invalid/Rejected Refund </button>
							</Link>
						
						
						</div>
							<div>
						 
							{(usrLevel===30) &&
						<Link to={"/refundTrans/generateUploadCsv"}>
								<button className=" w-42 ml-8 p-0 h-6 -mt-2" > Generate Upload Csv </button>
							</Link>
							}
						</div>
						<div>
							
						<button type="button" onClick={refresh}  className="w-20 m-0 p-0 -mt-2 bg-red-500 hover:bg-red-700 ">
				 						Refresh</button>
							
						</div>
          </div>
         <div className="-mt-2 max-h-1 py-0 ml-0">
				 
					<TablePageAdj columns={columns} data={data} newpage={page} parentCallback={handleP}  newPageSize={pageSize}
              parentCallbackPageSize={handlePageSize}className="table-auto" />
				 <div>
				 {(usrLevel <30) &&
						<button type="button" onClick={submitBulk}   className="w-36 m-2 p-0">
					Process File</button>
						}
				 {(usrLevel===30) &&
						<button type="button" onClick={submitBulk}  className="w-36 m-2 p-0">
						Submit File</button>
						}		
				{(usrLevel>30) &&
						<button type="button" onClick={approveBulk} className="w-36 m-2 p-0"> Approve File</button>
						}
						
						</div>
				 
				</div>		
        </div>
      </main>
    </div>
    </div>
  );
}

export default withRouter(RefundTransList);
