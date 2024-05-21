/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By : 
 */

import { useState, useEffect, useMemo } from 'react';
import Table, { SelectColumnFilter } from '../utils/Table'  // 
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import TablePage from '../utils/TablePage';
 

function DsopMasterView() {

	const [data, setData] = useState([]);
	const [update, setUpdate] = useState(false);
	const [serverErrors, setServerErrors] = useState([]);
	const [search, setSearch] = useState("");
	const [inputText, setInputText] = useState('');
	const[usrLevel,setUsrLevel]=useState(0);
	const[mesg,setMesg]=useState('');
	const [disabled,setDisabled]=useState(false);
	const [cdaoNo,setCdaoNo]=useState('');
	const [empId, setEmpId] = useState(0);
	 const [bankAccountData, setBankAccountData] = useState([]);
  	 const [emp, setEmp] = useState({});
  	  const [fundData,setFundData]=useState([]);
  	  const [fundSummaryData, setFundSummaryData] = useState([]);
 
	  

   const generateDsopMater = () => {
     setDisabled(true);
 
     let saving = false;
     console.log(cdaoNo);
 
     async function fetchDsopMasterData() {
       await axios.get(`/fundSummarys/dsopMaster/${cdaoNo}`)
         .then((response) => {
           console.log("&&&&&&&&:", response.data);
           
           setBankAccountData([]);
           setFundData([]);
           setEmp({});
           setFundSummaryData([]);
 
            
           	if (response.data["baList"] !== null)
             setBankAccountData(response.data["baList"]);
           
 			if (response.data['fundDetailsList'] !== null)
             setFundData(response.data['fundDetailsList']);
             
        	if (response.data["emp"] !== null) 
        	setEmp(response.data["emp"]);
        	
        	if (response.data['fundSummaryList'] !== null)
             setFundSummaryData(response.data['fundSummaryList']);
        	
        	
           setDisabled(false);
         })
         .catch((error) => {
           setDisabled(false);
           console.log(error);
           //	console.log(error.response.status);
           //	console.log(error.response.headers);
           if (error.response) setServerErrors(error.response.data.error);
           else setServerErrors(error.Error);
         });
     }
     fetchDsopMasterData();
 
     return () => {
       saving = true;
     };
   };

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
	 
    
    //Callback for child components (Foreign Keys)
	const callback = (childData) => {
		//console.log("Parent Callback");
		 
		
		if(childData.fk==='employee')
			setEmpId(childData.entity.id)
		//console.log(errors);
	 
	};
	
	 const handleInputChange = (e) => {
     e.preventDefault();
     console.log(e.target.value);
     setCdaoNo(e.target.value);
 
     
   };
   
    function refreshPage() {
    window.location.reload(false);
  }

	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<div className="mt-2 ml-4">
					<h1 className="text-xl font-semibold">Dsop Master</h1>
					<div className="text-red-500">{mesg}</div>
					 
					 <div className="flexContainer">
             <input type="text" name="search" placeholder="CDAO No"
               onChange={(e) => handleInputChange(e)}
               className="pl-2 -ml-2 inputField flex-initial"
             />
             <button type="submit" onClick={generateDsopMater} className="w-24 m-0 p-0" > Search</button>
             <button className="w-40 m-0 p-0 bg-red-500 hover:bg-red-700"  onClick={refreshPage}>Refresh</button>
           </div>
				  <div className="container">
             <h1 class="text-blue-600" align="center">
               Employee Details
             </h1>
             <table class="table-auto">
               <thead>
                 <tr>
                   <th class="bg-green-200 border text-left px-8 py-4">
                     CDAO No
                   </th>
                   <th class="bg-green-200 border text-left px-8 py-4">
                     Personal No
                   </th>
                   <th class="bg-green-200 border text-left px-8 py-4">Name</th>
                   
                   <th class="bg-green-200 border text-left px-8 py-4">Unit</th>
                   <th class="bg-green-200 border text-left px-8 py-4">
                     Date of Birth
                   </th>
                   <th class="bg-green-200 border text-left px-8 py-4">
                     Date of Commission
                   </th>
                   <th class="bg-green-200 border text-left px-8 py-4">
                     Date of Reporting
                   </th>
                   <th class="bg-green-200 border text-left px-8 py-4">
                     Date of Retirement
                   </th>
                   
                 </tr>
                 {emp.length !== 0 && emp.rank && (
                   <tr>
                     <td class="bg-green-50 border text-left ">
                       {emp.cdaoNo}
                       {emp.checkDigit}
                     </td>
                     <td class="bg-green-50 border text-left ">
                       {emp.icNo}
                       {emp.icCheckDigit}
                     </td>
 
                     <td class="bg-green-50 border text-left ">
                       {emp.rank.rankName} {emp.officerName}
                     </td>
                     
                     {emp.presentUnit && (
                       <td class="bg-green-50 border text-left ">
                         {emp.presentUnit.unitName}
                       </td>
                     )}
                     {!emp.presentUnit && <td></td>}
                     <td class="bg-green-50 border text-left ">
                       {emp.dateOfBirth}
                     </td>
                     <td class="bg-green-50 border text-left ">
                       {emp.dateOfCommission}
                     </td>
                     <td class="bg-green-50 border text-left ">
                       {emp.dateOfReporting}
                     </td>
                     <td class="bg-green-50 border text-left ">
                       {emp.fsDueDate}
                     </td>
                     
                   </tr>
                 )}
               </thead>
 
               <tbody>
                 {emp.length === 0 && (
                   <tr>
                     <td colspan="4" align="center">
                       No Employee Details Avaialble{" "}
                     </td>
                   </tr>
                 )}
               </tbody>
             </table>
             <br />
           </div>	 	
           
           
           
               
                  <div className="left-component"> 
             <h1 class="text-blue-600" align="center">
               
  
               Bank Details
             </h1>
              <table class="float: left;">
               <thead>
                 <tr>
                   <th class="bg-green-200 border text-left px-8 py-4">
                     Bank Name
                   </th>
                   <th class="bg-green-200 border text-left px-8 py-4">
                     Bank Branch
                   </th>
                   <th class="bg-green-200 border text-left px-8 py-4">
                     Bank Station
                   </th>
                   <th class="bg-green-200 border text-left px-8 py-4">
                     Bank Account No
                   </th>
                   <th class="bg-green-200 border text-left px-8 py-4">IFSC</th>
                 </tr>
                 {bankAccountData &&
                   bankAccountData.map((tb) => (
                     <tr key={tb.cdaoNo}>
                       <td class="bg-green-50 border text-left ">
                         {tb.bankName}
                       </td>
                       <td class="bg-green-50 border text-left ">
                         {tb.bankBranch}
                       </td>
                       <td class="bg-green-50 border text-left ">
                         {tb.bankStation}
                       </td>
                       <td class="bg-green-50 border text-left ">
                         {tb.bankAccountNo}
                       </td>
                       <td class="bg-green-50 border text-left ">{tb.ifsc}</td>
                     </tr>
                   ))}
               </thead>
 
               <tbody>
                 {bankAccountData.length === 0 && (
                   <tr>
                     <td colspan="4" align="center">
                       No Bank Details Avaialble{" "}
                     </td>
                   </tr>
                 )}
               </tbody>
             </table>
            
             </div>
           
           
           
           
           
           <div className="right-component">  
             <h1 class="text-blue-600" align="left">
               Fund Details
             </h1>
             <table class="float: right;">
               <thead>
                 <tr>
                   <th class="bg-green-200 border text-left px-8 py-4">
                     Fund Balance
                   </th>
                   
                 </tr>
                 {fundSummaryData &&
                   fundSummaryData.map((tb) => (
                     <tr key={tb.cdaoNo}>
                       <td class="bg-green-50 border text-left ">
                         {tb.fundBalance}
                       </td>
                       
                     </tr>
                   ))}
               </thead>
 
               <tbody>
                 {!fundSummaryData || fundSummaryData.length === 0 && (
                   <tr>
                     <td colspan="1" align="center">
                       No Fund Details Avaialble{" "}
                     </td>
                   </tr>
                 )}
               </tbody>
             </table>
            
            
           </div>
           <div>
            <br/>
             <br/>
               <br/>
               </div>
               <div>
            <br/>
             <br/>
               <br/>
               </div>
               
              
 			     <div className="container">
             <h1 class="text-blue-600" align="center">
               DSOP Details
             </h1>
             <table class="table-auto">
               <thead>
                 <tr>
                   <th class="bg-green-200 border text-left px-8 py-4">
                     Dak Id
                   </th>
                   <th class="bg-green-200 border text-left px-8 py-4">
                     Withdrawal Type
                   </th>
                   <th class="bg-green-200 border text-left px-8 py-4">
                     Fund Purpose
                   </th>
                   <th class="bg-green-200 border text-left px-8 py-4">
                     Claim Date
                   </th>
                    <th class="bg-green-200 border text-left px-8 py-4">
                     Processed Date
                   </th>
                    <th class="bg-green-200 border text-left px-8 py-4">
                    Claimed Amount
                   </th>
                    <th class="bg-green-200 border text-left px-8 py-4">
                     Approval Amount
                   </th>
                    <th class="bg-green-200 border text-left px-8 py-4">
                    Status
                   </th>
                  
                 </tr>
                 {fundData &&
                   fundData.map((tb,index) => (
                     <tr key={tb+index}>
                       <td class="bg-green-50 border text-left ">
                         {tb.dakId}
                       </td>
                       <td class="bg-green-50 border text-left ">
                         {tb.withdrawalType}
                       </td>
                       <td class="bg-green-50 border text-left ">
                         {tb.fundPurpose}
                       </td>
                       <td class="bg-green-50 border text-left ">
                         {tb.claimDate}
                       </td>
                       <td class="bg-green-50 border text-left ">{tb.processedDate} </td>
                       <td class="bg-green-50 border text-left "> {tb.claimedAmount}</td>
                       <td class="bg-green-50 border text-left "> {tb.approvalAmount}</td>
                                              <td class="bg-green-50 border text-left "> {tb.recordStatus}</td>


                     </tr>
                   ))}
               </thead>
 
               <tbody>
                 {fundData.length === 0 && (
                   <tr>
                     <td colspan="8" align="center">
                       No DSOP Details Avaialble{" "}
                     </td>
                   </tr>
                 )}
               </tbody>
             </table>
             <br />
           </div>				
				 
				</div>
				
				 
			</main>
			
		</div>
		 
	);
}

export default withRouter(DsopMasterView);

