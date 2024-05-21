/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 18 April 2022
 *
 * Modified By : 
 */

import { useState, useEffect, useMemo } from 'react';
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { format } from 'date-fns'
import { withRouter, Link } from "react-router-dom";
import {Modal,Button} from 'react-bootstrap';
import TableCopy from '../utils/TableCopy';
 
function AuditCageList() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	const [desc,setDesc]=useState('');
	const [descSearch,setDescSearch]=useState('');
	const [loading,setLoading]=useState(false);
	const [acaList,setAcaList]=useState([]);
	const [showModal, setShowModal] = useState(false);
	const [modalHeading, setModalHeading] = useState('');
	const[cdac,setCdac]=useState('');
	const [oname,setOname]=useState('');
	const[rankname,setRankname]=useState('');
	const [commDate,setCommDate]=useState('');
	const [retirementDate,setRetirementDate]=useState('');
	const [rempDate,setRempDate]=useState('');
	const [extDate,setExtDate]=useState('');
	const [releaseDate,setReleaseDate]=useState('');
	const [fdate,setFdate]=useState('');
	const [fdateSearch,setFdateSearch]=useState('');
	const [icno,setIcno]=useState('');

	useEffect(() => {
		 
		let fetching = false;
		async function fetchData() {
			if(!fetching)
			await axios.get('/auditCages?search='+search+'&desc='+descSearch+'&fdateStr='+fdateSearch)
				.then((response) => {
					console.log(response.data);
					if(response.data[0])
						setData(response.data[0]);
					if(response.data[1]){
						if(response.data[1]['cdaoCd']){
							console.log(response.data[1]['cdaoCd']);
							setCdac(response.data[1]['cdaoCd']);
							}
							if(response.data[1]['icNo']){
							 
							setIcno(response.data[1]['icNo']);
							}
						if(response.data[1]['officerName']){
							setOname(response.data[1]['rankName']+"  "+response.data[1]['officerName']);
						}
						if(response.data[1]['commissionDate']){
							setCommDate(response.data[1]['commissionDate']);
						}
						if(response.data[1]['retirementDate']){
							setRetirementDate(response.data[1]['retirementDate']);
						}
						if(response.data[1]['reemployedDate']){
							setRempDate(response.data[1]['reemployedDate']);
						}
						if(response.data[1]['extnDate']){
							setExtDate(response.data[1]['extnDate']);
						}
						if(response.data[1]['releaseDate']){
							setReleaseDate(response.data[1]['releaseDate']);
						}
					}
					//setLoading(false);
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

	}, [update, search,descSearch,fdateSearch]);


	 async function viewAllowance(id) {
		await axios.get(`/auditCages/auditCageAllowances/${id}`)
			.then((res) => {
				console.log(res.data);
				if(res.data){
					setAcaList(res.data);
					setShowModal(true);
					}
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

	const ShowAca=()=>{
		 

		return (
		 
			 
				<div className="-mt-2 max-h-0 py-0 ml-0">
					<table className="table table-striped table-bordered">
					<thead>
					  
					<th>Desc</th>
					<th>From Date</th>
					<th>PayCode</th>
					<th>Amt</th>
					 
					</thead>
					<tbody>
					 {acaList && acaList.map((aca,index) => (
                               <tr key={aca.id}>
                               
                                 <td>{aca.do2.occurrenceCode}</td>
                                  <td>{aca.auditCage && aca.auditCage.fromDate && format(new Date(aca.auditCage.fromDate.toString()),'dd/MM/yyyy')}</td>
                                 <td>{aca.payCode.payCode}</td>
                                 <td>{aca.amount}</td>
                                  
                                 
                               </tr>
                             ))}
					</tbody>
					</table>
				</div>
			 

		 
		);
	}

	const columns = useMemo(() => [
		
		{
			Header: 'Action',
			
			Cell: ({ row }) => (
				<div>
					 
					<button
						className="w-18 m-0 p-0 bg-red-500 hover:bg-red-700 "
						onClick={() => viewAllowance(row.original.id)}
					>	Allowance 	</button>
				</div>
			)
		},
		{
			Header: "CDAO No",
			accessor: 'cdaono',
		},
		 
		
		{
			Header: "Do2",
			accessor: 'occurrencecode',// Change this
		},
		{
			Header: "Me",
			accessor: 'me',
		},
		{
			Header: "From Date",
			accessor: 'fromdate',
			Cell: ({ row }) => (
				<div>
				<div>
				<label>{row.original.fromdate!==null && format(new Date(row.original.fromdate.toString()),'dd/MM/yyyy')}</label>
				 </div>
				   
				</div>
				
				)
			 
			
		},
		{
			Header: "To Date",
			accessor: 'todate',
			Cell: ({ row }) => (
				<div>
				<div>
				<label>{row.original.todate!==null && format(new Date(row.original.todate.toString()),'dd/MM/yyyy')}</label>
				 </div>
				   
				</div>
				
				)
			 
			
		},
		 
			{
			Header: "Rank",
			accessor: 'rank',
			Cell: ({ row }) => (
				<div>{row.original.rankcode && <>
				<div>
				<label> {row.original.rankcode}
				</label>
				 </div>
				   </>}
				</div>
				
				)
			 
		},
		{
			Header: "Pay Flag",
			accessor: 'payflag',
		},
		
		{
			Header: "Basic Pay",
			accessor: 'basicpay',
		},
		{
			Header: "Pay Level",
			accessor: 'paylevel',
		},
		
		{
			Header: "Pers Pay",
			accessor: 'perspay',
		},
		
		
		
		
		{
			Header: "Ms Pay",
			accessor: 'mspay',
		},
		
		 
		
		{
			Header: "Da",
			accessor: 'da',
		},
		
		{
			Header: "TPTA",
			accessor: 'tpta',
		},
		{
			Header: "Tpta DA",
			accessor: 'tptaDa',
		},
		{
			Header: "NPA",
			accessor: 'npa',
		},
		{
			Header: "CVP",
			accessor: 'cvp',
		},
		{
			Header: "Dp",
			accessor: 'dp',
		},
		
		{
			Header: "Grade Pay",
			accessor: 'gradepay',
		},
		 
		{
			Header: "Pay Stopped",
			accessor: 'absentflag',
				Cell: ({ row }) => (
				<div>
				<div>
				{(row.original.absentflag && row.original.absentflag===true)? 'Y':'N'}
				 </div>
				   
				</div>
				
				)
		},
		{
			Header: "Deputation Flag",
			accessor: 'deputationstatus' 
		},
		
		{
			Header: "Old Basic Pay",
			accessor: 'oldbasicpay',
		},
		
		 
		
		
		{
			Header: "Record Status",
			accessor: 'recordstatus',
		},
		
		 
		
		 
		
		 
		{
			Header: "Effective",
			accessor: 'effective',
			
				Cell: ({ row }) => (
				<div>
				<div>
				{(row.original.effective && row.original.effective===true)? 'Y':'N'}
				 </div>
				   
				</div>
				
				)
		},
		 
		
		{
			Header: "Old Grade Pay",
			accessor: 'oldgradepay',
		},
		
		
		
		
		/*
		{
			Header: "Login Name",
			accessor: 'loginName',
			Filter: SelectColumnFilter,  // new
			filter: 'includes',
		},
		*/
	], [data])

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(inputText);
		setSearch(inputText);
		setDescSearch(desc);
		setFdateSearch(fdate);
	}

	const handleKeyPress = (event) => {
		// look for the `Enter` keyCode
		if (event.keyCode === 13 || event.which === 13) {
			handleSubmit(event)
		}
	}
	const initModal=()=>{
		 
			setShowModal(false);
		 
	}

	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
		<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
					<h1 className="text-xl font-semibold">Audit Cages</h1>
					<div className="flexContainer">
					<div>
						<input type="text" name="search" placeholder="army no" 
						onChange={e => setInputText(e.target.value)}
							onKeyPress={handleKeyPress}
							className="pl-2 -ml-2 inputField flex-initial" />
							</div>
							
						<div>
						<input type="text" name="descSearch" placeholder="desc" 
						onChange={e => setDesc(e.target.value)}
							onKeyPress={handleKeyPress}
							className="pl-2 -ml-2 inputField flex-initial" />
							</div>	
							
							<div>
						<input type="text" name="fdateSearch" placeholder="from date (ddMMyyyy)" 
						onChange={e => setFdate(e.target.value)}
							onKeyPress={handleKeyPress}
							className="pl-2 -ml-2 inputField flex-initial" />
							</div>	
							
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
						 
						 <div>
							<Link to= {{pathname:"/auditCageAllowances/view/"+cdac}} target="_blank">
								<button className=" w-40 ml-8 p-0 h-6 -mt-2" > View Allowance </button>
							</Link>
						</div>	
						<div>
							<Link to={"/do2s/view/all"} target="_blank">
								<button className=" w-32 ml-8 p-0 h-6 -mt-2" > View Do2 </button>
							</Link>
						</div>	
					</div>	
								
				</div>
				{cdac &&
				<div className="p-6 shadow-md">
				<div className="grid grid-cols-2 gap-1">
				{cdac &&
				<div>{oname}{' / '}{cdac}{'/ '}{icno}</div>
				}
				{commDate &&
				<div>{'Commission Date - '}{commDate}</div>
					
				}
				{retirementDate &&
				<div>{'Retirement Date - '}{retirementDate}</div>
					
				}
				{rempDate &&
				<div>{'Reemployed Date - '}{rempDate}</div>
					
				}
				{extDate &&
				<div>{'Extn Date - '}{extDate}</div>
					
				}
				{releaseDate &&
				<div>{'Release Date - '}{releaseDate}</div>
					
				}
				</div>
				</div>
				
				}
				<div className="-mt-2 max-h-1 py-0">
				 {loading && <>
						 
						 <div className="flex justify-center items-center">
  <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>
						</>	
						}
					<TableCopy tableHeading={"Audit Cage"} columns={columns} data={data} className="table-auto" />
				</div>
				 <div className="flex flex-col justify-center items-center ">
          {showModal && (
            <Modal show={showModal}>
            <Modal.Header closeButton onClick={initModal}>
            <Modal.Title>Allowances</Modal.Title>
            </Modal.Header>
            <Modal.Body  className="modal-body"><ShowAca/></Modal.Body>
            <Modal.Footer><Button variant="danger" onClick={initModal}>Close</Button></Modal.Footer>
            	
            </Modal>
          )}
        </div>
			</main>
		</div>
	);
}

export default withRouter(AuditCageList);

