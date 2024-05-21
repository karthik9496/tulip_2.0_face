import { useState, useEffect, useMemo } from "react";

import Table, { SelectColumnFilter } from "../utils/Table";
import axios from "axios";
import { withRouter, Link, useHistory } from "react-router-dom";
import { BasicLoadingIcon } from "../utils/Icons";

function ExtnList() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const [mesg, setMesg] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedInUsr, setLoggedInUsr] = useState({});
  const [disabled,setDisabled]=useState(false);
  const [desgLevel,setDesgLevel]=useState(0);
  const [dakid,setDakid]=useState('');

	 useEffect(() => {
    function getSectionState() {
      let usr = JSON.parse(sessionStorage.getItem("usr"));
      if(usr)
      	setDesgLevel(usr.designation.designationLevel);
       
      console.log(usr.designation.designationLevel);
    }

    getSectionState();
  }, []);
  
  useEffect(() => {
    let fetching = false;
    async function fetchData() {
      setLoading(true);
      if (!fetching)
        await axios
          .get("/extns?search=" + search)
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

  async function approve(id) {
    await axios
      .put(`/extns/${id}/approve`)
      .then((response) => {
        setMesg(response.data);
        setData([]);
      })
      .catch((error) => {
        console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });
  }

  async function print(id) {
    await axios
      .get(`/extns/printExtnSheet/${id}`)
      .then((response) => {
        //console.log(data);
        const url = window.open(
          `${process.env.REACT_APP_BASE_URL}/files/${response.data}`
        );
      })
      .catch((error) => {
        console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });
  }
  async function submit(id) {
    await axios.put(`/extns/submit/${id}`)
      .then((response) => {
        //console.log(data);
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
  
   async function processDo2() {
    await axios.put(`/extns/processDo2`)
      .then((response) => {
        //console.log(data);
        setMesg(response.data);
       
      })
      .catch((error) => {
        console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });
  }
   async function reempReport() {
	console.log(">>>>>>>>>>>:" + search);
	if(!dakid){
		alert("Enter dak id in search field.");
	}
    await axios.get(`/extns/nominalRoll/${dakid}`)
      .then((response) => {
        //console.log(data);
        setMesg(response.data);
        		   let fname=response.data[0];
			  	setServerErrors(response.data);
			    setDisabled(false);
			    
			    if(fname!=null && fname.length>0){
			axios({
			url: `/extns/reemp/load/` + fname, 
			method: 'GET',
			responseType: 'blob', // important
		}).then((res) => {
			//console.log(response.data);
			const url =URL.createObjectURL(new Blob([res.data],{type:"application/pdf"}));
			const pdfWindow=window.open();
			pdfWindow.location.href=url;
			const link=pdfWindow.location.href;
			 
		});
		}
       
      })
      .catch((error) => {
        console.log(error);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        if (error.response) setServerErrors(error.response.data.error);
        else setServerErrors(error.Error);
      });
  }
  
  
	async function approveBulk() {
	 
	 let i=0;
		var selectedList=[];
		 
		for(i=0;i<data.length;i++){
			if(data[i].select!==null && data[i].select===true)
				selectedList.push(data[i]);
		}
		console.log(selectedList);
		
		if(selectedList.length===0){
			alert("No selection done.");
			return;
		}
		
		let proceed=window.confirm("You are about to approve file containing "+selectedList.length+" records.");
		if(!proceed)
			return;
		
		if(disabled)
			return;
			
			setDisabled(true);
		await axios.put(`/extns/bulkApprove`, data)
			.then((response) => {
				 
				setDisabled(false);
				 
			 
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
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}
	const updateCheckBoxAll = (e) => {
		// console.log("..."+e.target.checked+"--"+index);

		let newData = [...data];
		for (var k in newData) {
			newData[k].select = e.target.checked;
		}
		setData(newData);


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
  const columns = useMemo(
    () => [
			{
			Header: <input type="checkbox" onChange={updateCheckBoxAll} />,
			accessor: "select",
			Cell: ({ row }) => (
				<>
				<div>
					{(desgLevel>30) &&
						<input type="checkbox" onChange={handleCheckBox(row.index)} checked={data[row.index]['select']} />
					}

				</div>
				 
				</>

			)

		},
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div>
            {row.original.action != null &&
              row.original.action.includes("edit") && (
                <Link to={"/extns/" + row.original.id}>
                  <button className=" w-16 m-0 p-0 "> Edit </button>
                </Link>
              )}{" "}
            {row.original.action != null &&
              row.original.action.includes("edit") &&
              row.original.recordStatus != null &&
              row.original.recordStatus === "V" && (
                <button
                  className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
                  onClick={() => submit(row.original.id)}
                >
                  {" "}
                  Submit{" "}
                </button>
              )}{" "}
            {row.original.action != null &&
              row.original.action.includes("subm") && (
                <button
                  className="w-16 m-0 p-0 bg-red-500 hover:bg-red-700 "
                  onClick={() => submit(row.original.id)}
                >
                  {" "}
                  Submit{" "}
                </button>
              )}{" "}
             
          </div>
        ),
      },
	 {
        Header: "DakId No",
        accessor: "dak.dakidNo",
        Cell: ({ row }) => (
				<div>

					<label>{row.original.dak.dakidNo}</label>
				</div>
			)
      },	
      {
        Header: "CDAONo",
        accessor: "employee.cdaoNo",
      },
      {
        Header: "IC No",
        accessor: "employee.icNo",
      },
      {
        Header: "Officer Name",
        accessor: "employee.officerName",
      },

      {
        Header: "Extension Authority",
        accessor: "extnAuthority", // Change this
      },

      {
        Header: "Extn Auth Date",
        accessor: "extnAuthorityDate",
      },
      {
        Header: "Extension Type",
        accessor: "extnType",
      },
      {
        Header: "Posted Unit",
        accessor: "postedUnit.unitName",
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
        Header: "Record Status",
        accessor: "recordStatus",
      },
      {
        Header: "Section Remarks",
        accessor: "sectionRemarks",
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
  const handleBlur = (e) => setDakid(e.target.value);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-2 ml-4">
          <h1 className="text-xl font-semibold">Extension of Service</h1>
          <div className="flexContainer">
          <div>
            <input
              type="text"
              name="search"
              placeholder="DakId No Starting with R"
              onChange={(e) => setInputText(e.target.value)}
              onBlur={handleBlur}
              onKeyPress={handleKeyPress}
              className="pl-2 -ml-2 inputField flex-initial"
            />
            <button type="submit" onClick={handleSubmit} className=" w-32 ml-8 p-0 h-6 -mt-2" >
              Search
            </button>
            </div>
            
            
             
            <div>
            <button type="submit" onClick={reempReport} className=" w-46 ml-8 p-0 h-6 -mt-2" >
              Extension Report
            </button>
            </div>
            
              <div>
             <Link to={"/extns/approvedList"}>
                <button className=" w-42 ml-8 p-0 h-6 -mt-2">Processed/Approved </button>
              </Link>
            </div>
             
          </div>
        </div>
        <div className="text-red-500">{mesg}</div>

      
          <div className="-mt-2 max-h-1 py-0">
            <Table columns={columns} data={data} className="table-auto" />
            
            <div>
          {(desgLevel>30) &&
						<button type="button" onClick={approveBulk} className="w-36 m-2 p-0"> Approve</button>
						}
          </div>
          </div>
          
         
        
      </main>
       
    </div>
  );
}

export default withRouter(ExtnList);
