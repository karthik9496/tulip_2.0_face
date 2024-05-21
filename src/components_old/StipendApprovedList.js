import { useState, useEffect, useMemo } from "react";

import Table, { SelectColumnFilter } from "../utils/Table"; //
import axios from "axios";
import { withRouter, Link, useHistory } from "react-router-dom";

function StipendApprovedList() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const [mesg, setMesg] = useState("");

  useEffect(() => {
    let fetching = false;
    async function fetchData() {
      if (!fetching)
        await axios
          .get("/stipends/approvedList?search=" + search)
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
  
   
   async function reempReport(dakid) {
	console.log(">>>>>>>>>>>:" + search);
    await axios.get(`/stipends/nominalRoll/${dakid}`)
      .then((response) => {
        //console.log(data);
        setMesg(response.data);
        		   let fname=response.data[0];
			  	setServerErrors(response.data);
			    
			    
			    if(fname!=null && fname.length>0){
			axios({
			url: `/stipends/stipend/load/` + fname, 
			method: 'GET',
			responseType: 'blob', // important
		}).then((res) => {
			//console.log(response.data);
			const url =URL.createObjectURL(new Blob([res.data],{type:"application/pdf"}));
			const pdfWindow=window.open();
			pdfWindow.location.href=url;
			const link=pdfWindow.location.href;
			//const link = document.createElement('a');
			//link.href = url;
		//	link.setAttribute('download', fname);
		 
			//document.body.appendChild(link);
		//	link.click();
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
  

  const columns = useMemo(
    () => [
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div>
            {" "}
            {row.original.recordStatus != null &&
              row.original.recordStatus === "V" && (
                <button
                  className="w-42 m-0 p-0 bg-red-500 hover:bg-red-700 "
                  onClick={() => reempReport(row.original.dak.dakidNo)}
                >
                  {" "}
                  Print{" "}
                </button>
              )}
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
        Header: "Letter No",
        accessor: "letterNo", // Change this
      },

      {
        Header: "Letter Date",
        accessor: "letterDate",
      },
       {
        Header: "Mro No",
        accessor: "mroNo", // Change this
      },

      {
        Header: "Mro Date",
        accessor: "mroDate",
      },
      {
        Header: "Mro Type",
        accessor: "mroNature",
      },
       {
        Header: "Amount",
        accessor: "amount",
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

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-2 ml-4">
          <h1 className="text-xl font-semibold">Stipend Approved List</h1>
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
              <Link to={"/extns"}>
                <button className=" w-32 ml-8 p-0 h-6 -mt-2">Pending </button>
              </Link>
            </div>
          </div>
        </div>
        {mesg}
        <div className="-mt-2 max-h-1 py-0">
          <Table columns={columns} data={data} className="table-auto" />
        </div>
      </main>
    </div>
  );
}

export default withRouter(StipendApprovedList);
