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
 
function AuditCageList3() {

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
	const [showDo2Modal, setShowDo2Modal] = useState(false);
		const [modalHeading, setModalHeading] = useState('');
		const [do2List,setDo2List]=useState('');


	useEffect(() => {
		 
		let fetching = false;
		async function fetchData() {
			if(!fetching)
			await axios.get('/auditCages?search='+search+'&desc='+descSearch)
				.then((response) => {
					console.log(response.data);
					setData(response.data);
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

	}, [update, search,descSearch]);

function Tree({ treeData }) {
  return (
    <ul>
      {treeData.map((node) => (
        <TreeNode node={node} key={node.key} />
      ))}
    </ul>
  );
}


function TreeNode({ node }) {
  const { children, label } = node;

  const [showChildren, setShowChildren] = useState(false);

  const handleClick = () => {
    setShowChildren(!showChildren);
  };
  return (
    <>
      <div onClick={handleClick} style={{ marginBottom: "10px" }}>
        <span>{label}</span>
      </div>
      <ul style={{ paddingLeft: "10px", borderLeft: "1px solid black" }}>
        {showChildren && <Tree treeData={children} />}
      </ul>
    </>
  );
}

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
	 async function viewDo2(id) {
		await axios.get(`/auditCages/do2ForAc/${id}`)
			.then((res) => {
				console.log(res.data);
				if(res.data){
					setDo2List(res.data);
					setShowDo2Modal(true);
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

	const ShowDo2=()=>{
		 

		return (
		 
			 
				<div className="-mt-2 max-h-0 py-0 ml-0">
					<table className="table table-striped table-bordered">
					<thead>
					  
					<th>CdaoNo</th>
					<th>Occurrence</th>
					<th>Do2No</th>
					<th>Do2Date</th>
					<th>SlNo</th>
					<th>FromDate</th>
					<th>ToDate</th>
					<th>Data</th>
					 <th>Status</th>
					</thead>
					<tbody>
					 {do2List && do2List.map((do2,index) => (
                               <tr key={do2.id}>
                               
                                 <td>{do2.cdaoNo}</td>
                                 <td>{do2.occurrenceCode}</td>
                                 <td>{do2.do2No}</td>
                                  <td>{do2.do2Date   && format(new Date(do2.do2Date.toString()),'dd/MM/yyyy')}</td>
                                 <td>{do2.itemNo}</td>
                                   <td>{do2.fromDate   && format(new Date(do2.fromDate.toString()),'dd/MM/yyyy')}</td>
                                    <td>{do2.toDate   && format(new Date(do2.toDate.toString()),'dd/MM/yyyy')}</td>
                                 <td>Data1 {' '}{do2.data1}<br/>
                                 Data2 {' '}{do2.data2}<br/>
                                 Data3 {' '}{do2.data3}<br/>
                                 Data4 {' '}{do2.data4}<br/>
                                 
                                 </td>
                                  <td>{do2.status}</td>
                               </tr>
                             ))}
					</tbody>
					</table>
				</div>
			 

		 
		);
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
					{' '}
					<button
						className="w-12 m-0 p-0 bg-red-500 hover:bg-red-700 "
						onClick={() => viewDo2(row.original.id)}
					>	Do2 	</button>
					<Tree treeData={row} />
				</div>
			)
		},
		{
			Header: "Officer",
			accessor: 'cdaono',
			Cell: ({ row }) => (
				<div>
				<div>
				{row.original.cdaono}<br/>
				{row.original.officerName}
					 
				  
				 </div>
				   
				</div>
				
				)
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
			Header: "Basic Pay",
			accessor: 'basicpay',
		},
		{
			Header: "Pay Level",
			accessor: 'paylevel',
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
			Header: "Transport",
			accessor: 'tpta',
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
			accessor: 'deputationflag',
			
				Cell: ({ row }) => (
				<div>
				<div>
				{(row.original.deputationflag && row.original.deputationflag===true)? 'Y':'N'}
				 </div>
				   
				</div>
				
				)
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
	const closeDo2Modal=()=>{
		 
			setShowDo2Modal(false);
		 
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
							
						<button type="submit" onClick={handleSubmit} className="w-16 m-0 p-0">Search</button>
						 
					</div>					
				</div>
				<div className="-mt-2 max-h-1 py-0">
				 {loading && <>
						 
						 <div className="flex justify-center items-center">
  <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>
						</>	
						}
					<Table columns={columns} data={data} className="table-auto" />
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
          
           {showDo2Modal && (
			   <div className="modaldo2-body">
            <Modal show={showDo2Modal}>
            <Modal.Header closeButton onClick={closeDo2Modal}>
            <Modal.Title>Do2</Modal.Title>
            </Modal.Header>
            <Modal.Body ><ShowDo2/></Modal.Body>
            <Modal.Footer><Button variant="danger" onClick={closeDo2Modal}>Close</Button></Modal.Footer>
            	
            </Modal>
            </div>
          )}
        </div>
			</main>
		</div>
	);
}

export default withRouter(AuditCageList3);

