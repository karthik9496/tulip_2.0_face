import { useState, useEffect, useMemo } from "react";
import Table, { SelectColumnFilter } from "../utils/Table";
import axios from "axios";

import { withRouter, Link, useLocation } from "react-router-dom";
import { BasicLoadingIcon } from "../utils/Icons";
import TablePage from "../utils/TablePage";

function EmroList() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const [dakId,setDakId]=useState('');

  const [cdaoNo, setCdaoNo] = useState("");
  const [name, setName] = useState("");
  const [empId, setEmpId] = useState("");
  const [selectionType, setSelectionType] = useState("");
  const location = useLocation();
  const [loading, setLoading] = useState(false);
   
  const [mesg,setMesg]=useState('');
  const [secNameList,setSecNameList]=useState([]);
  const [secName,setSecName]=useState('');
  const [disabled,setDisabled]=useState(false);
  const [pmGenerated,setPmGenerated]=useState('');
  const [dakIdNo,setDakIdNo]=useState('');
   const [pageSize, setPageSize] = useState(0);
  const [key, setKey] = useState("Page1");
  const [page, setPage] = useState(0);
 
  useEffect(() => {
    let fetching = false;
    async function fetchData() {
      setLoading(true);
      if (!fetching)
              await axios.get("/emros?dakId=" + dakId+"&cdaoNo="+cdaoNo)
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
  }, [update, dakId,cdaoNo]);

  
  async function remove(id) {
    await axios
      .delete(`/omros/${id}`)
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
    let fetching = false;
    let unmounted = false;

    async function fetchSectionNameList() {
      
      if (!fetching)
        //console.log(secId);
        await axios.get('/emros/auditSections')
          .then((response) => {
            console.log("response section codce >>" + response.data);
            setSecNameList(response.data);

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
    fetchSectionNameList();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  
  /*useEffect(() => {
    let fetching = false;
    let unmounted = false;

    async function isPmGeneratedByAccountsSection() {
      
      if (!fetching)
        //console.log(secId);
        await axios.get(`/emros/isPmGenerated/accounts/${dakId}`)
          .then((response) => {
            console.log("response pm >>" + response.data);
            if(response.data==='ok'){
				setPmGenerated('ok');
			}else{
				setPmGenerated('not');
			}
 
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
    isPmGeneratedByAccountsSection();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dakId,pmGenerated]);*/
  
  useEffect(() => {
    let fetching = false;
    let unmounted = false;

    async function getDakidNo() {
      
      if (!fetching)
        //console.log(secId);
        await axios.get(`/emros/getDakIdNo/accounts/${dakId}`)
          .then((response) => {
            console.log("response pm >>" + response.data);
            setDakIdNo(response.data);

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
    getDakidNo();

    return () => {
      fetching = true;
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
   
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputText);
    setDakId(inputText);
     

  };
   const handleDakId = (event) => {
   // event.preventDefault();
    console.log(inputText);
    setDakId(event.target.value);
    
    

  };
  const handleSectionNameChange = (e) => {
    console.log(e.target.selectedIndex + "-->>" + e.target.value);
    setSecName(e.target.value);
  };

  const handleKeyPress = (event) => {
    // look for the `Enter` keyCode
    if (event.keyCode === 13 || event.which === 13) {
      handleSubmit(event);
    }
  };
  
  const onfocus = ()=> {
	console.log("-------------------here-----------:" + dakId);
  axios.get(`/emros/isPmGenerated/accounts/${dakId}`)
          .then((response) => {
            console.log("response pm >>" + response.data);
            if(response.data==='ok'){
				setPmGenerated('ok');
			}else{
				setPmGenerated('not');
			}
 			
            
          })
          .catch((error) => {
            //console.log(error);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            if (error.response) setServerErrors(error.response.data.error);
            else setServerErrors(error.Error);
          });
 //Make axios call to get data from backend
 }
  async function submitByTaskHolder() {
 		let i=0;
		var selectedList=[];
 		for(i=0;i<data.length;i++){
			if(data[i].select!==null && data[i].select===true)
				selectedList.push(data[i]);
		}
		console.log(selectedList+"---"+secName);
		
		if(selectedList.length===0){
			alert("No selection done.");
			return;
		}
		
		if(secName.length===0){
			alert("No Section selection done.");
			return;
		}
		
		  
		
		let proceed=window.confirm("You are about to allocated selected Emro items "+selectedList.length+" records.");
		if(!proceed)
			return;
		if(disabled)
			return;
			
			setDisabled(true);
		if(secName!==null){
			await axios.put(`/emros/allocateEmroItems/${secName}`, selectedList)
			.then((response) => {
				 
			setMesg(response.data);
 			let updatedRecords = [...data];
				console.log(updatedRecords);
				setData(updatedRecords);
				setDisabled(false);
				setUpdate(!update);
				
				 
			})
			.catch((error) => {
			//	console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
		} 
	}
	 async function generatePm() {
 		 
		
		if(dakId.length===0){
			alert("No Dak Id Entered.");
			return;
		}
		/*await axios.get(`/emros/checkDakid/${dakId}`)
			.then((response) => {
				console.log(response.data);
			if(response.data===true)	 
			setMesg('ok');
		})
		.catch((error) => {
			//	console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});*/
		if (disabled)
		return;
		
		setDisabled(true);
		console.log("---------emro dakid----:" + dakId); 
		if(dakId!==null){
			await axios.put(`/emros/generatePm/${dakId}`)
			.then((response) => {
				 
			setMesg(response.data);
 			 
				setDisabled(false);
				 
				
				 
			})
			.catch((error) => {
			//	console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
		} 
	}
	const handleCheckBox = index => (e) => {
		//console.log(Table.page)
		console.log(e.target.checked + "--" + index);



		console.log(e.target.checked);
		let item = data[index];

		item['select'] = e.target.checked;
		let newData = [...data];
		newData[index] = item;
		setData(newData);



	}
	 const ShowEmroList = () => {
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
			Header: "Action",
			accessor: "select",
			Cell: ({ row }) => (
				<>
				<div>
				
				{row.original.auditSec===null &&
					 
						<input type="checkbox" onChange={handleCheckBox(row.index)} checked={data[row.index]['select']} />
					 
				}
				</div>
				 
				</>

			)

		},
      
 	   {
	 
        Header: "DakIdNo-Accounts Section",
        accessor: "dakIdNo",
      },		
	 
     	{
	 
        Header: "Cdao No",
        accessor: "employee.cdaoNo",
         Cell: ({ row }) => (
          <label>{row.original.cdaoNoWithTask}</label>
        ),
      },
      {
	 
        Header: "Personnel No",
        accessor: "personnnelNo",
      },	
      {
	 
        Header: "Min No",
        accessor: "minNo",
      },
      {
	 
        Header: "Transaction No",
        accessor: "transactionNo",
      },

      {
        Header: "Transaction Date",
        accessor: "transactionDate",
      },

      {
        Header: "Depositor Name",
        accessor: "depositorName",
      },

      {
        Header: "Amount",
        accessor: "amount",
      },

      {
        Header: "Payment Natute",
        accessor: "paymentNature",
      },
       {
        Header: "Emro Office",
        accessor: "emroOffice",
      },
       {
        Header: "Remarks",
        accessor: "remarks",
      },
      {
        Header: "Pm Generated",
        accessor: "pmGenerated",
        Cell: ({ row }) => (
          <div>{data[row.index]["pmGenerated"] === true ? "true" : "false"}</div>
        ),
      },
      {
        Header: "Upload File Name",
        accessor: "uploadFileName",
      },
    ],
    [data,dakId,pmGenerated]
  );
  
    return (
      <div className="min-h-screen bg-green-100 text-gray-700">
        <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">
          <div className="-mt-2 max-h-1 py-0 ml-0">
            <TablePage columns={columns} data={data} newpage={page} parentCallback={handleP}
              newPageSize={pageSize} parentCallbackPageSize={handlePageSize}
              className="table-auto"
            />
			         <div className="mt-2 ml-4">
          <b>Section Name</b>
          <select
            className="w-22 m-0 p-0"
            disabled={loading}
            value={secName}
            onChange={handleSectionNameChange}
          >
            <option key="0" value={""}>
              --select section--
            </option>
            {secNameList.map((item, index) => (
              <option key={index} value={item.toString()}>
                {" "}
                {item.toString()}{" "}
              </option>
            ))}
          </select>
        </div>
            <div className="mt-2 ml-4">
              <button
                type="button"
                onClick={submitByTaskHolder}
                className="w-32 mb-24 p-0"
              >
                Allocate Selected Emros
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
 

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-2 ml-4">
          <h1 className="text-xl font-semibold">Emros</h1>
           <div className="text-red-500">{mesg}</div>
          <div className="flexContainer">
           		 
							
							<div>	
						<input type="text" name="dakid" placeholder="Dak-Id"
						onChange={e => setDakId(e.target.value)}	
						onBlur={onfocus}
 							className="pl-2 -ml-2 inputField flex-initial" />
							</div>
							{' '}
							<div>	
						<input type="text" name="cdaoNo" placeholder="cdaono"
						onChange={e => setCdaoNo(e.target.value)}	
						onBlur={onfocus}
 							className="pl-2 -ml-2 inputField flex-initial" />
							</div>
							 <div>
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
						 </div>

            <div>
              <Link to={"/emros/approvedList"}>
                <button className=" w-32 ml-8 p-0 h-6 -mt-2">Processed </button>
              </Link>
            </div>
             <div>
              <button
						className="w-26 m-0 p-0 bg-red-500 hover:bg-red-700 "
						onClick={() => generatePm(dakId)}
					>	Generate Pm/Dmro	</button>
            </div>
          </div>

          <div>
            <h1 className="text-xl font-semibold">{location.state}</h1>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center fixed top-1/4 w-full z-50">
            <p className="mr-2 text-2xl text-green-600">Fetching Data</p>
            <BasicLoadingIcon className="ml-1 mt-1 h-10 w-10 animate-spin text-green-600" />
          </div>
        ) : (
		
          <div className="-mt-2 max-h-1 py-0">
          
    
         
       </div>
        )}
          <div className="mt-2 max-h-1 py-0 ml-0">
          <ShowEmroList />
        </div>
        
        <div>
       
        
        </div>
      </main>
       
    </div>
    
  );
}

export default withRouter(EmroList);
