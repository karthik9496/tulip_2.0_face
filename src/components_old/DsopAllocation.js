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
import Table,{ SelectColumnFilter } from '../utils/Table';
import TablePage from "../utils/TablePage";

const schema = yup.object({});

const DsopAllocation = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  let { id } = useParams();
  //console.log(id);

  let history = useHistory();

  const [serverErrors, setServerErrors] = useState([]);
  const [entity, setEntity] = useState({});
  const [state, setState] = useState({});

   
  const [pendingList, setPendingList] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [mesg, setMesg] = useState();
  const [taskList, setTaskList] = useState([]);
  
  const [taskNo, setTaskNo] = useState("");
  
   
  const [disabled, setDisabled] = useState(false);

  const [key, setKey] = useState("Page1");

  const [page, setPage] = useState(0);

  //pcdao -- for TablePage
  const [pageSize, setPageSize] = useState(0);

   
   

  useEffect(() => {
    let fetching = false;
    let unmounted = false;

    async function fetchTaskData() {
      
      if (!fetching )
        //console.log(secId);
        await axios
          .get(`/tasks/taskList/dsopAllocate`)
          .then((response) => {
            console.log("response section codce >>" + response.data);
            setTaskList(response.data);
             

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
    fetchTaskData();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let fetching = false;
    let unmounted = false;

    async function fetchPendingBillsForDsop() {
      
      if (!fetching) {
        await axios
          .get(`/tasks/pendingDsop/allocation`)
          .then((response) => {
             setPendingList(response.data);
  
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
    fetchPendingBillsForDsop();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 
  const allocateDsopBills = () => {
    if (disabled) return;
    //	console.log(data);
   // console.log("data id--------------" + reallocateTaskNo);
    setDisabled(true);
    axios.put(`/tasks/dsop/allocateBills`, taskList)
      .then((response) => {
        
        if (response.status === 200) {
          setMesg(response.data);
          setPendingList([]);
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
    let item = taskList[index];

    item["select"] = e.target.checked;
    let newData = [...taskList];
    newData[index] = item;
    setTaskList(newData);
    //console.log(csList);
  };

   

   

   

  const updateCheckBoxAll = (e) => {
    // console.log("..."+e.target.checked+"--"+index);

    let newData = [...taskList];
    for (var k in newData) {
      newData[k].select = e.target.checked;
    }
    setTaskList(newData);
  };
   

  const handleInputChange = (e) => {
    console.log(e.target.value);
    //	console.log("handle input change");
  };

  const callback = (e) => {
    console.log(e);
  };

 
  
   const ShowTaskList = () => {
     
	return (
		 		 <div className="h-auto bg-green-100 text-gray-700">
			<div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 pt-0">
				<div className="mt-2 ml-4">
					<h1>Task List</h1>
					<table className="table table-striped table-bordered">
					<thead>
					<th>Action</th>
					<th>Task No</th>
					<th>Name</th>
					<th>Pending</th>
					
					</thead>
					<tbody>
					 {taskList && taskList.map((d,index) => (
                               <tr key={d.id}>
                               <td><input type="checkbox" onChange={handleCheckBox(index)}  checked={taskList[index]['select']}  /></td>
                                 <td>{d.taskNo}</td>
                                 <td>{d.usrName}</td>                                                              
                                 <td>{d.value1}</td>
                                 
                               </tr>
                             ))}
					</tbody>
					</table>
				 <button
                type="button"
                onClick={allocateDsopBills}
                className="w-24 m-2 p-0"
              >
                Allocate Dsop Bills
              </button>
				 
				</div>
				 
				</div>
				</div>
			 
	);
 
  };
	  const ShowDsop = () => {
    const handleP = (pp) => {
      console.log(pp);
      setPage(pp);
    };


	//pcdao added below method for TablePage
    const handlePageSize = (pp) => {
		console.log(pp);
		setPageSize(pp);
	  };

    const columns = useMemo(
      () => [
        
         
        {
          Header: "CDAONo",
		  accessor: "cdaoNo",
          Cell: ({ row }) => (
            <div>
              <div>
				{/* pcdao -- modified below so that cdao no is picked from dak instead of cbill */}
                <label>{row.original.employee.cdaoNo}</label>
              </div>
              <div>
                <label> {row.original.employee.officerName}</label>
              </div>
              <div>
                <label> {row.original.employee.rank.rankName}</label>
              </div>
            </div>
          ),
        },
          
        {
          Header: "Approval Amount",
          accessor: "amountClaimed",
          Cell: ({ row }) => (
          <div>
                <label> {row.original.amountClaimed}</label>
              </div>
          ),
        },

        
      ],
      [pendingList, page, setPage]
    );
return (
		<div className="min-h-screen bg-green-100">
		 <h3 className="p-3  text-xl font-bold">Dsop Pending List</h3>
			<div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-4 pt-0">
				<div className=" ">
				</div>
				<div className="-mt-2 max-h-10 py-0 ml-0">
					<TablePage columns={columns} data={pendingList} newpage={page}
              parentCallback={handleP}  newPageSize={pageSize}
              parentCallbackPageSize={handlePageSize}
              className="table-auto" />
				</div>
			</div>

		</div>
	);
     
       
    
  }
  return (
	 
    <div className="min-h-screen bg-gray-100 text-gray-500">
			<main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-0">
        
<div className="mt-2 ml-4">
        <h1 className="text-xl font-semibold ml-4">Dsop Bill Allocation</h1>
</div>
   <div className="text-red-500">{mesg}</div>
   <div className="mt-2 ml-4">
        <h1 className="text-xl font-semibold ml-4">Task List</h1>
</div>

       
        <div className="mt-2 ml-4">
          <ShowTaskList />
           
        </div>
         <div className="mt-2 ml-4">
         
           <ShowDsop />
        </div>
           </main>
		</div>
      
		 
    
  );
};

export default withRouter(DsopAllocation);
