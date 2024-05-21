/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By :
 */

import { useState, useEffect, useRef, useMemo } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import LiveSearch from "../utils/LiveSearch";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from "date-fns/addDays";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
//import TablePage from '../utils/TablePage';

import TablePage from "../utils/TablePage";

const schema = yup.object({});

const DakMroApprovalList = () => {
  const {
    register, handleSubmit,  setValue,formState: { errors }, clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  let { id } = useParams();
  //console.log(id);

  let history = useHistory();

  const [serverErrors, setServerErrors] = useState([]);
  const [entity, setEntity] = useState({});
  const [state, setState] = useState({});
  const [mroList, setMroList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mesg, setMesg] = useState();
  
  const [disabled, setDisabled] = useState(false);
  const [pageSize, setPageSize] = useState(0);

  const [key, setKey] = useState("Page1");

  const [page, setPage] = useState(0);

   
 
  useEffect(() => {
    let fetching = false;
    let unmounted = false;

    async function fetchDakMroData() {
     
      if (!fetching) {
        await axios.get('/daks/fetchMroList/approval')
          .then((response) => {
             setMroList(response.data);

            if (!unmounted) {
              setLoading(false);
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
    }
    fetchDakMroData();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const approvalLwssMroEnteries = () => {
    if (disabled) return;
    //	console.log(data);
    //console.log("data id--------------"+data.id);
    setDisabled(true);
    axios.put('/daks/approval/mro', mroList)
      .then((response) => {
         
        if (response.status === 200) {
          setMesg(response.data[1]);
          setMroList([]);
           
        }
      })
      .catch((error) => {
       
        if (error.response) setServerErrors(error.response.data);
        else setServerErrors(error);
      });

     
  };

  const onError = (errors, e) => console.log(errors, e);

  //All foreign keys.
  // XXXXXX Add search fields and adjust the values as necessary

  const errorCallback = (err) => {
    //console.log(err);
    setServerErrors(err);
  };

  const handleCheckBox = (index) => (e) => {
    //console.log(Table.page)
    console.log(e.target.checked + "--" + index);
    //csList[index].select=e.target.checked;

    console.log(e.target.checked);
    let item = mroList[index];

    item["select"] = e.target.checked;
    let newData = [...mroList];
    newData[index] = item;
    setMroList(newData);
    //console.log(csList);
  };

  
  const updateCheckBoxAll = (e) => {
    // console.log("..."+e.target.checked+"--"+index);

    let newData = [...mroList];
    for (var k in newData) {
      newData[k].select = e.target.checked;
    }
    setMroList(newData);
  };
  
   

  const callback = (e) => {
    console.log(e);
  };

  const ShowMroList = () => {
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
                checked={mroList[row.index]["select"]}
              />
            </div>
          ),
        },
        {
          Header: "DakId",
          accessor: "dakId",
          Cell: ({ row }) => (
            <div>
              <div>
                <label>{row.original.dakId}</label>
              </div>
               <div>
                <label>{row.original.dakidNo}</label>
              </div>
              
            </div>
          ),
        },

        {
          Header: "Cdao No",
          accessor: "cdaoNo",
          Cell: ({ row }) => (
            <div>
             
              <div>
                <label>
                  {row.original.rank} {row.original.cdaoNo}
                </label>
              </div>
            </div>
          ),
        },
        {
          Header: "Amount",
          accessor: "amount",
        },
        {
          Header: "Bank Name",
          accessor: "bankName",
          Cell: ({ row }) => (
            <div>
              <div>
                <label>Bank Name : {row.original.bankName}</label>
              </div>
              <div>
                <label>Bank Branch : {row.original.bankBranch}</label>
              </div>
            </div>
          ),
        },
           {
          Header: "DD/Cheque No",
          accessor: "ddChequeNo",
          Cell: ({ row }) => (
            <div>
              <div>
                <label>DD/Cheque No : {row.original.ddChequeNo}</label>
              </div>
              <div>
                <label>DD/Cheque Date : {row.original.ddChequeDate}</label>
              </div>
            </div>
          ),
        },
        {
          Header: "Deposit Type",
          accessor: "depositType",
          Cell: ({ row }) => (
            <div>
              <div>
                <label>Deposit Type : {row.original.depositType}</label>
              </div>
              <div>
                <label>Month : {row.original.recoveryMonth}</label>
              </div>
            </div>
          ),
        },
      ],
      [mroList, page, setPage]
    );

    return (
      <div className="min-h-screen bg-green-100 text-gray-700">
        <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">
          <div className="-mt-2 max-h-1 py-0 ml-0">
            <TablePage
              columns={columns} data={mroList} newpage={page} parentCallback={handleP}
              newPageSize={pageSize} parentCallbackPageSize={handlePageSize}
              className="table-auto"
            />

            <div className="mt-2 ml-4">
              <button
                type="button"
                onClick={approvalLwssMroEnteries}
                className="w-24 mb-24 p-0"
              >
                Approve Mro Enteries
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="text-red-500">{serverErrors}</div>
        <div className="text-blue-500">{mesg}</div>

        <h1 className="text-xl font-semibold ml-4">Lwss Mro Approval List</h1>
 
        <div className="mt-2 max-h-1 py-0 ml-0">
          <ShowMroList />
        </div>
      </div>
    </div>
  );
};

export default withRouter(DakMroApprovalList);
