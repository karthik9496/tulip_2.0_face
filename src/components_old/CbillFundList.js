import { useState, useEffect, useMemo } from 'react';
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { withRouter, Link } from "react-router-dom";

function CbillFundList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	
	const [search, setSearch] = useState('');
	const [inputText, setInputText] = useState('');

	const [cdaoNo, setCdaoNo] = useState('');
	const [name, setName] = useState('');
	const [empId, setEmpId] = useState('');
	const [mesg,setMesg]=useState('');
	
	const [status,setStatus]=useState('');
	const [pass,setPass]=useState(false);
	const [rejected,setRejected]=useState(false);
	const [option,setOption]=useState('all');
	const [usrLevel,setUsrLevel]=useState('');
	
	
	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			if (!fetching)
			console.log("--option--:" + option);
			if(option!==null){
			await axios.get(`/cbillFunds/dsopFund/${option}?search=`+search)
				.then((response) => {
					console.log("&&&&&:"+ response.data);
					setData(response.data);
				})
				.catch((error) => {
					//console.log(error);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					if (error.response)
						setServerErrors(error.response.data.error);
					else
						setServerErrors(error.Error);
				})
				}else{
					await axios.get(`/cbillFunds?search=`+search)
				.then((response) => {
					console.log("&&&&&:"+ response.data);
					setData(response.data);
				})
				.catch((error) => {
					//console.log(error);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					if (error.response)
						setServerErrors(error.response.data.error);
					else
						setServerErrors(error.Error);
				})
				}
		}
		fetchData();
		return () => { fetching = true; }

	}, [update, search,option]);

	useEffect(() => {
		let fetching = false;
		async function fetchUsrData() {
			if(!fetching)
			console.log(">>>>Usr Level is -----:" + usrLevel);
			await axios.get(`/cbillFunds/userDesg`)
				.then((response) => {
					console.log(">>>>Usr Level is----:" + response.data);
					setUsrLevel(response.data);
					
				})
				.catch((error) => {
					//console.log(error);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					if (error.response)
						setServerErrors(error.response.data.error);
					else
						setServerErrors(error.Error);
				})
		}
		fetchUsrData();
		return () => { fetching = true; }

	}, [data]);
	 

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(inputText);
		setSearch(inputText);
	}
	
	const handleKeyPress = (event) => {
		// look for the `Enter` keyCode
		if (event.keyCode === 13 || event.which === 13) {
			handleSubmit(event)
		}
	}
	 
	 async function submit(id) {
		await axios.put(`/cbillFunds/submitDsopbill/${id}`)
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
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}
	
	
	async function approve(id) {
		await axios.put(`/cbillFunds/approveDsopbill/${id}`)
			.then((response) => {
				setMesg(response.data);
				let updatedRecords = [...data].filter((i) => i.id !== id);
				console.log(updatedRecords);
				setData(updatedRecords);
				setUpdate(!update);
			})
			.catch((error) => {
				console.log(error);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				if (error.response)
					setServerErrors(error.response.data.error);
				else
					setServerErrors(error.Error);
			});
	}
	
	async function dsopBillRejectionMemo(id) {
    	console.log("=======:" + id);
   		 await axios
      		.put(`/cbillFunds/${id}/dsopBillRejectionMemo`)
     		 .then((response) => {
     	   console.log(data);
     	   console.log(response.data);
		//pcdao -- to open pdf rather than downloading
        const url = window.open(
          `${process.env.REACT_APP_BASE_URL}/files/openpdf/${response.data}`
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

  async function viewAttachments(id) {
    console.log("=======:" + id);
    await axios
      .get(`/cbillFunds/viewAttachments/${id}`)
      .then((response) => {
        console.log(data);
        console.log(response.data[0]);
        if(response.data){
         let fname=response.data[0];
         let uploadDate=response.data[1];
							 if(fname!=null && fname.length>0){
			axios({
			url: `/cbillFunds/attachment/download/${fname}/${uploadDate}`, 
			method: 'GET',
			responseType: 'blob',  
		}).then((res) => {
			console.log(res.data);
			const url = window.URL.createObjectURL(new Blob([res.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', fname);
		 
			document.body.appendChild(link);
			link.click();
		});
		}
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
  
  const handlePassedBills = (event) => {
    setStatus(event.target.value)
    setOption("pb");
  }
  
  const handleRejectedBills = (event) => {
    setStatus(event.target.value)
    setOption("rb");
  }
  
  const handleAllBills = (event) => {
    setStatus(event.target.value)
    setOption("all");
  }
	const columns = useMemo(() => [
		{
			Header: 'Action',
			Cell: ({ row }) => (
				 
					<div>
					 {row.original.action!=null && row.original.action.includes("edit") &&
					<Link to={"/cbillFunds/" + row.original.id}>
						<button className=" w-16 m-0 p-0 " > Edit </button>
					</Link>
					}
					{row.original.action != null && row.original.recordStatus==='R'  &&
						<Link to={"/cbillFunds/" + row.original.id}>
							<button className=" w-32 m-0 p-0 " > Edit </button>
						</Link>
					}
					 
					 {' '}
					{row.original.action!=null && !row.original.action.includes("appro") && !row.original.action.includes("edit") &&
					<button
						 className="form-control py-0"
						onClick={() => submit(row.original.id)}
					>	Submit 	</button>
					}
						
					{' '}
					{row.original.action!=null && row.original.action.includes("appro") &&
					<button
						className="form-control py-0" 
						onClick={() => approve(row.original.id)}
					>	Approve 	</button>
					}
					{''}
					<div>
					{(row.original.recordStatus === 'R') &&
						<button
							className="form-control py-0" 
							onClick={() => dsopBillRejectionMemo(row.original.id)}
						>	Print Rej Memo 	</button>
					}
					</div>
					 <div>
					 {' '}
					 
						{ (row.original.recordStatus==='V' || row.original.recordStatus==='R') && (row.original.action!=null && (row.original.action.includes("appro")||
						row.original.action.includes("subm"))) &&
						<Link to={"/fundBillInfo/" + row.original.id}>
					 	<button className="form-control py-0"> Fund Bill Info </button>
						</Link>
						} 
					</div>
					<div>
					 {' '}
					 
						<button
                   className="form-control py-0"
                    onClick={() => viewAttachments(row.original.id)}
                  >
                    {" "}
                    Attachments{" "}
                  </button>
					</div>
					
					
					
					
					
					 </div>
					 
			)
		},
		{
			Header: "Dak",
			accessor: 'dak.dakidNo',
			   Cell: ({ row }) => (
          <div>
            <div>
              {row.original.advId && (
                <label>{row.original.advId}</label>
              )}
              {row.original.dak.dakidNo && (
                <label>{row.original.dak.dakidNo}</label>
              )}
            </div>

            
            
          </div>
        ), 
		},
		
		{
			Header: "Officer Name",
			accessor: 'employee.officerName', 
			 Cell: ({ row }) => (
          <div>
            <div>
              {row.original.employee && (
                <label>{row.original.employee.officerName}<br/>
                {row.original.employee.cdaoNo}{row.original.employee.checkDigit}
                </label>
              )}
               
            </div>

            
            
          </div>
        ), 
		},

		 
		 
		
		{
			Header: "Temp Final",
			accessor: 'tempFinal',
		},
		
		 
		
		 
		{
			Header: "Claimed Amount",
			accessor: 'dak.amount',
		},
		
		{
			Header: "Approval Amount",
			accessor: 'approvalAmount',
		},
		 
		
		{
			Header: "Remarks",
			accessor: 'remarks',
		},
		
		{
			Header: "Rejection Reason",
			accessor: 'reason',
		},
		
		
		 
		
		{
			Header: "Month Ending",
			accessor: 'monthEnding',
		},
		
		 
		{
			Header: "Record Status",
			accessor: 'recordStatus',
			Filter: SelectColumnFilter,
        filter: "recordStatus",
		},
		
		{
			Header: "Approved",
			accessor: 'approved',
		},
		
  
	], [data])


	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="">
					<h1 className="text-xl font-semibold">Cbill Funds</h1>
					<div className="text-red-500">{mesg}</div>
					<div className="flexContainer">
						<input type="text" name="search" placeholder="CDAo No or DakId"
						onChange={e => setInputText(e.target.value)}
							onKeyPress={handleKeyPress}
							className="pl-2 -ml-2 inputField flex-initial" />
						<button type="submit"  onClick={handleSubmit} className="w-16 m-0 p-0">Search </button>
				
				 
				<div>
						 
							<Link to={"/cbillFunds/dsopBills/approved"}>
								<button className=" w-32 ml-8 p-0 h-6 -mt-2" >Approved Bills </button>
							</Link>
						 
						</div>
						
						<div>
						 
							<Link to={"/cbillFunds/dsopBills/rejected"}>
								<button className=" w-46 ml-8 p-0 h-6 -mt-2" >Invalid/Rejected Bills </button>
							</Link>
							 
						</div>
						
					 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					 
					 {usrLevel>=30 &&
					 <>
						 <div>
	 <label>
	 <input type="radio" value="pb" checked={status==='pb'} onChange={handlePassedBills}/> Passed/Pipeline Bills
	 </label>
	 </div>
	 
	 					 <div>
	 <label>
	 <input type="radio" value="rb" checked={status==='rb'} onChange={handleRejectedBills}/> Rejected Bills
	 </label>
	 </div>
	 
	  					 <div>
	 <label>
	 <input type="radio" value="all" checked={status==='all'} onChange={handleAllBills}/> All Bills
	 </label>
	 </div>
	 </>
					}	
					 
						
						</div>
			 
				<div className="mt-6 max-h-1">
					<Table columns={columns} data={data} className="table-auto" />
				</div>
				</div>
			</main>
		</div>
	);
}

export default withRouter(CbillFundList);

