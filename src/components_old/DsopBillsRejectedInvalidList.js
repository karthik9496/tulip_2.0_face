import { useState, useEffect, useMemo } from 'react';
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { withRouter, Link,useLocation  } from "react-router-dom";

function DsopBillsRejectedInvalidList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState('');
	const [inputText, setInputText] = useState('');
	const [selectionType,setSelectionType]=useState('');
	const location=useLocation();
	const [fileName,setFileName]=useState('');
	const [value, setValue]=useState('');
	const [search1, setSearch1] = useState('');
	const [lightTheme, setLightTheme] = useState(true);
	const [disabled,setDisabled]=useState(false);
	
	useEffect(() => {
		let fetching = false;
		async function fetchData() {
			setDisabled(true);
			
			if (!fetching)
			console.log(">>>>>>>>>>>>>>>>>>>selectionType");
			  await axios.get(`/cbillFunds/dsopBills/rejected?search=` + search)
					.then((response) => {
						setData(response.data);
						setSelectionType('approved');
						setDisabled(false);
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
		fetchData();
		return () => { fetching = true; }

	}, [update, search]);

 
		 
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

	
	const columns = useMemo(() => [
		{
			Header: 'Action',
			Cell: ({ row }) => (
				<div>
			 
					 
					<div>
					{(row.original.recordStatus === 'R') &&
						<button
							className="w-32 m-0 p-0 bg-yellow-500 hover:bg-red-700 "
							onClick={() => dsopBillRejectionMemo(row.original.id)}
						>	Print Rej Memo 	</button>
					}
					</div>
				</div>
			)
		},
		{
			Header: "Dak",
			accessor : 'dak',
			Cell: ({ row }) => (
				<div>
				<div>
				{row.original.dak !==null  &&
				<label>{row.original.dak.id}</label>
				}
				 </div>
				  
				  <div>
				  {row.original.dak !==null  &&
				<label>Month : {row.original.dak.monthEnding}</label>
				}
				 </div>
				 <div>
				 {row.original.dak !==null  &&
				<label>Receipt : {row.original.dak.createdAt}</label>
				}
				 </div>
				 <div>
				<label>Processed Month : {row.original.monthEnding}</label>
				 </div>
				  
				</div>
				
				)
			 
		},
		 
 
		{
			Header: "Employee Details(Rank,Name,Army No,UnitCode,Discharge Date)",
			accessor: 'employee.name',// Change this
			Cell: ({ row }) => (
				<div>
				<div>
				<label>{row.original.employee.rank.rankName} {' '} {row.original.employee.officerName}</label>
				 </div>
				 <div>
				<label> {row.original.employee.cdaoNo}{row.original.employee.checkDigit}</label>
				 </div>
				  <div>
				<label> {row.original.unitCode}</label>
				</div>
				 <div>
				<label> {row.original.fsDueDate}</label>
				</div>   
				</div>
				
				)
		},
 
 		   
 		 
		{
			Header: "Fund Purpose And Nature",
			accessor: 'fundPurpose.purpose',// Change this
			Cell: ({ row }) => (
				<div>
				<div>
				{row.original.fundPurpose!==null &&
				<label>{row.original.fundPurpose.purpose} </label>
				}
				 </div>
				 <div>
				   
				<label> {row.original.tempFinal==='F' ? 'Final Withdrawal' : 'Temporary Withdrawal'}</label>
				
				 </div>
				   
				</div>
				
				)
		},
		
		 
		 
		{
			Header: "Status",
			accessor: 'recordStatus',
			Cell: ({ row }) => (
				<div>
			
				<div>
				{row.original.recordStatus &&
				<label>Record Status : {row.original.recordStatus}</label>
				}
				 </div>
				 <div>
				{row.original.authorityStatus &&
				<label>Authority Status : {row.original.authorityStatus}</label>
				}
				 </div>
				 <div>
				{row.original.approved!=null &&
				<label>Approved : {row.original.approved === true ? 'true' : 'false'}</label>
				}
				 </div>
				 <div>
				{row.original.rejectionReason &&
				<label>Reason : {row.original.rejectionReason}</label>
				}
				 </div>
				 
				   
				</div>
				
				)
		},

	 
	], [data])

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(inputText);
		setSearch(inputText);
		console.log(value);
		setSearch1(value);
	}
	
	const handleAmountPassed = (event) => {
		event.preventDefault();
		//console.log(inputText);
		//setSearch(inputText);
		//console.log(value);
		setSearch1(value);
		setSelectionType('approved');
	}


	const handleKeyPress = (event) => {
		// look for the `Enter` keyCode
		if (event.keyCode === 13 || event.which === 13) {
			handleSubmit(event)
		}
	}

	return (
		<div className={lightTheme ? 'theme-light' : 'theme-dark'} style={disabled ?{pointerEvents: "none",opacity :"0.4"}:{}}>
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
					<h1 className="text-xl font-semibold">Rejected DSOP Bills</h1>
					<div className="flexContainer">
						<input type="text" name="search" placeholder="Army No"
							onChange={e => setInputText(e.target.value)}
							onKeyPress={handleKeyPress}
							className="pl-2 -ml-2 inputField flex-initial" />
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
						<div>
							<Link to={"/cbillFunds"}>
								<button className=" w-32 ml-8 p-0 h-6 -mt-2" >Pending </button>
							</Link>
						</div>
						 
						 <div>
						 Click on Pending button to go back to Pending List
						 </div>
						 
					 
					</div>

					<div>
						 <h1 className="text-xl font-semibold">{location.state}</h1>
						</div>	
				</div>

				<div className="-mt-2 max-h-1 py-0">
					<Table columns={columns} data={data} className="table-auto" />
				</div>
			</main>
		</div>
		</div>
	);
}

export default withRouter(DsopBillsRejectedInvalidList);

