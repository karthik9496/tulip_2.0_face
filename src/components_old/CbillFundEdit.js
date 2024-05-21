/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By : 
 */

import { useState, useEffect, useMemo } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import * as yup from "yup";
import { format } from 'date-fns'
import { yupResolver } from '@hookform/resolvers/yup';
import LiveSearch from '../utils/LiveSearch';
import TablePage from '../utils/TablePage';
  import Table, { SelectColumnFilter } from "../utils/Table";


const schema = yup.object({
 //     dak: yup.object().required('Required'),
   //   employee: yup.object().required('Required'),
     // fundPurpose: yup.object().required('Required'),
  //    unit: yup.object().required('Required'),
 //     cdaoNo: yup.string().required('Required'),
   //   checkDigit: yup.string().required('Required'),
     // tempFinal: yup.string().required('Required'),
  //    totalInstalment: yup.number().integer().required('Required'),
   //   rate: yup.number().required('Required'),
   //   consolidatedAmount: yup.number().integer().required('Required'),
   //   approvalAmount: yup.number().integer().required('Required'),
    //  reason: yup.string().required('Required'),
  //    remarks: yup.string().required('Required'),
  //    specialSanction: yup.boolean().required('Required'),
  //    monthEnding: yup.string().required('Required'),
  //    recoveryStartDate: yup.string().required('Required'),
  //    recordStatus: yup.string().required('Required'),
   //   approved: yup.boolean().required('Required'),
   //   bulkApproval: yup.boolean().required('Required'),
  //    auditorDate: yup.string().required('Required'),
  //    aaoDate: yup.string().required('Required'),
     // dischargeDate: yup.object().required('Required'),
 //     dvNo: yup.number().integer().required('Required'),
 //     dpSheetNo: yup.number().integer().required('Required'),
     // dpSheetDate: yup.string().required('Required'),
   //   cmpFileNo: yup.string().required('Required'),
 //     cmpDate: yup.string().required('Required'),
});


const CbillFundEdit = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();
	//console.log(id);

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	
    const [recoveryStartDate, setRecoveryStartDate] = useState(new Date());
    const [auditorDate, setAuditorDate] = useState(new Date());
    const [aaoDate, setAaoDate] = useState(new Date());
    const [aoDate, setAoDate] = useState(new Date());
    const [dpSheetDate, setDpSheetDate] = useState(new Date());
    const [cmpDate, setCmpDate] = useState(new Date());
    
    const [loading, setLoading] = useState(true);
	const [dakidNo, setDakidNo] = useState('');
    const [monthEnding, setMonthEnding] = useState('');
    const [rankName, setRankName] = useState('');
    const [cdaoNo, setCdaoNo] = useState('');
    const [name, setName] = useState('');
    const [taskNo,setTaskNo]=useState('');
    const [ledger,setLedger]=useState('');
    const [checkDigit,setCheckDigit]=useState('');
    const [perNo,setPerNo]=useState('');
    const [basicPay,setBasicPay]=useState('');
    
     
    const [fundBalance, setFundBalance] = useState('');
    const [lastWithdrawal, setLastWithdrawal] = useState(0);
    const [account, setAccount] = useState('');
    const [ifsc, setIfsc] = useState('');
    const [empId, setEmpId] = useState(0);
    const [bankDetails, setBankDetails] = useState('');
    const [bankName,setBankName]=useState('');
    const [bankStation,setBankStation]=useState('');
    const [checked, setChecked]=useState(false);
    const [buttonState, setButtonState] = useState('');
    const [mrRejectionList,setMrRejectionList]=useState([]);
    const [page,setPage]=useState(0);
    const [withdrawalType, setWithdrawalType]=useState('');
    const [fsDueDate,setFsDueDate]=useState('');
    const [previousData,setPreviousData]=useState([]);
    const [commissionDate,setCommissionDate]=useState('');
    const [rejectionList,setRejectionList]=useState([{rdId:0,description:''}]);
     
     
    const [balance, setBalance] = useState('');
    const [purpose, setPurpose]=useState('');
	const [dakId, setDakId] = useState('');
	const [me,setMe]=useState('');
	const [pageSize, setPageSize] = useState(0);
	const [mesg,setMesg]=useState('');
	const [claimAmt,setClaimAmt]=useState(0);
	const [disabled,setDisabled]=useState(false);
	const [sanctionType,setSanctionType]=useState('NORMAL');
	const [claimAmount,setClaimAmount]=useState(0);
	
	const [otherRejSelected, setOtherRejSelected] = useState(false);
	 
	const [payLevel,setPayLevel]=useState('');
	const [recRate,setRecRate]=useState('');
	const [install,setInstall]=useState('');
	const [consAmount,setConsAmount]=useState('');
	const [consAmtTy,setConsAmtTy]=useState('');
	const [approvalAmt,setApprovalAmt]=useState(0);
	const [osBalance,setOsBalance]=useState(0);
	
	/*useEffect(()=>{
		 console.log(consAmount+"--"+approvalAmt);
	},[consAmount,approvalAmt]);


	useEffect(()=>{
		console.log(osBalance+"--"+approvalAmt)
		if(osBalance && approvalAmt){
			let ap=approvalAmt;
			let ob=osBalance;
			let ca=ob+ap;
			
			setConsAmount(ca);
		}else
			setConsAmount(osBalance);
			
	},[id,osBalance,approvalAmt]);*/

	useEffect(() => {
		let isCancelled = false;
		console.log(id);
		if (id !== 'new') {
			async function fetchData() {
				let record = '';
				await axios.get('/cbillFunds/' + id)
					.then((response) => {
						record = response.data;
					})
					.catch((error) => {
						//console.log(error);
						//console.log(error.response.status);
						//console.log(error.response.headers);
						if(error.response)
							setServerErrors(error.response.data.error);
						else
							setServerErrors(error.Error);
					});
				
				 
		 
				 
				
				let wt=''
			//	 if(record.tempFinal!=null){
				  if(record.tempFinal==='F'){	
						wt='F';
				  	}else if(record.tempFinal==='T'){	
						wt='T';	
			 }
		//		 }
				 setWithdrawalType(wt);
				 
				if(record.dak.amount!==null)
					setClaimAmt(record.dak.amount);
				if(record.employee!==null)
					setEmpId(record.employee.id);
				if(record.totalInstalment!==null)
					setInstall(record.totalInstalment);
								
				
				const fields = [
				'id', 'dak', 'employee', 'fundPurpose', 'unit', 'cdaoNo', 'checkDigit', 'tempFinal',
				 'totalInstalment', 'rate', 'consolidatedAmount', 'approvalAmount', 'reason', 'remarks', 
				 'specialSanction', 'monthEnding', 'recoveryStartDate', 'recordStatus', 'approved', 'bulkApproval', 
				 'auditorDate', 'aaoDate', 'aoDate', 'dvNo', 'dpSheetNo', 'dpSheetDate', 'cmpFileNo', 'cmpDate',
				 'rankName','dakidNo','dischargeDate','sectionRemarks','rejectionDetailList','sanctionType','advId'	,
				 'fundReason','otherRej','osBalance','rateInFile','instalmentInFile'
					];
					if(record.dak && record.dak.amount)
						setClaimAmount(record.dak.amount);
					if(record.sanctionType){
						setSanctionType(record.sanctionType);
					}
					if(record.totalInstalment){
						setInstall(record.totalInstalment);
						console.log("---line 179---:" + install);
					}
					if(record.rate){
						setRecRate(record.rate);
					}
					console.log(record.osBalance);
					if(record.osBalance)
						setOsBalance(record.osBalance);
						
					if(record.consolidatedAmount)
						setConsAmount(record.consolidatedAmount);
				//	if(record.consolidatedAmount){
					//	setConsAmount(record.consolidatedAmount);
					//}
					
					setDakId(record.dak.id);
					console.log("---rej---:" + record.rejectionDetailList);
					 let i=0;
				//	for(i in record.rejectionDetailList){
				//		console.log(record.rejectionDetailList[i].description +"--"+record.rejectionDetailList[i].select);
				//	}
						if(record.rejectionDetailList!==null){
						setRejectionList(record.rejectionDetailList);
						if(record.manualRejection){
							setChecked(true);
						setValue('manualRejection',true);
						}
						console.log("--Other rej---:" + record.otherRej);
						if(record.otherRej && record.otherRej.length > 0){
							setOtherRejSelected(true);
						}
						}
					if(record.advId){
						setDakidNo(record.dak.dakidNo+"/"+record.advId);
					}
					
				fields.forEach(field => setValue(field, record[field]));
				if (!isCancelled) {
					setEntity(record);
					setState(prev => ({ ...prev, state: record }));
				}
			}

			fetchData();
			return () => {
				isCancelled = true;
			};
		}

	}, [id, setValue]);
	


	useEffect(() => {
		let fetching = false;
		let unmounted = false;
		async function fetchFundBalance() {
			 

			if (!fetching )
				await axios.get(`/cbillFunds/fundBalance/${id}`)
					.then((response) => {
						setFundBalance(response.data);
						console.log(sanctionType+"--"+response.data);
						if(sanctionType && sanctionType==='SPECIAL'){
							let fb=response.data;
							let fb90=fb*.9;
							let cb=osBalance;
							if(claimAmount<fb90){
								setValue('approvalAmount',claimAmount);
								setApprovalAmt(claimAmount);
								fb90=claimAmount;
							}else{
								setValue('approvalAmount',fb90);
								setApprovalAmt(fb90);
								}
								  
						 		 
						 		  cb=cb+fb90;
						 		 let rec=cb/install;
						 		 setValue('rate',Math.ceil(rec));
						 		 setConsAmount(cb);
						 		  
						 		 
						 		  
						 		 
						}
						if(sanctionType && sanctionType==='NORMAL'){
							let fb=response.data;
							let fb75=fb*0.75; 
							let cb=osBalance;
							//let os=getOsBalance();
						 	 
							console.log(fb75+""+claimAmount)
							if(claimAmount<fb75){
								setValue('approvalAmount',claimAmount);
								setApprovalAmt(claimAmount);
								 
								fb75=claimAmount;
								
							}else{
								setValue('approvalAmount',fb75);
								setApprovalAmt(fb75);
								
								 
								}
								console.log("--line--252--:" + install + "--"+fb75);
								 
						 		 cb=cb+fb75;
						 		 let rec=cb/install;
						 		 setValue('rate',Math.ceil(rec));
						 		 setConsAmount(cb);
						 		  
  						}
						//setBalance(response.data['fundBalance']);
						if (!unmounted) {
							 
							setLoading(false);
						} 
						 
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
		fetchFundBalance();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id,sanctionType,claimAmount,osBalance]);
	
	 
	useEffect(() => {
     let fetching = false;
     let unmounted = false;
     async function fetchPreviousData() {
       	console.log("=======CDA O No for Demand Register :" + empId);
 
       if (!fetching)
         await axios.get(`/cbillFunds/previousFundBills/${id}/${empId}`)
           .then((response) => {
              setPreviousData(response.data);
           })
           .catch((error) => {
             //console.log(error);
             //console.log(error.response.status);
             //console.log(error.response.headers);
             if (error.response) setServerErrors(error.response.data.error);
             else setServerErrors(error.Error);
           });
     }
     fetchPreviousData();
 
     return () => {
       fetching = true;
       unmounted = true;
     };
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [empId]);
   
   useEffect(() => {
     let fetching = false;
     let unmounted = false;
      
	
	let newDate = new Date()
	let date_raw = newDate.getDate();
	let month_raw = newDate.getMonth() + 1;
	let year = newDate.getFullYear();
	var date, month
  
	if (date_raw<10)  {  date ="0"+date_raw.toString()} else {  date =date_raw.toString()}
	if (month_raw<10)  {  month ="0"+month_raw.toString()} else {  month =month_raw.toString()}


 
	 
	let currentDate=year+'-'+month+'-'+date;
	console.log(empId+"--"+currentDate);
     async function fetchPayData() {
       if (!fetching)
         await axios.get(`/employees/activePayElements/${empId}/${currentDate}`)
           .then((response) => {
             //console.log("==========pay element====:" + response.data);
             setPayLevel(response.data["payLevel"]);
             setBasicPay(response.data["basicPay"]);
           })
           .catch((error) => {
             //console.log(error);
             //console.log(error.response.status);
             //console.log(error.response.headers);
             if (error.response) setServerErrors(error.response.data.error);
             else setServerErrors(error.Error);
           });
     }
     fetchPayData();
 
     return () => {
       fetching = true;
       unmounted = true;
     };
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [empId]);
   
   useEffect(() => {
     let fetching = false;
     let unmounted = false;
 
     async function fetchPayData() {
       if (!fetching)
       console.log(">>>>>>>>:" + empId);
         await axios.get(`/employees/activePayElementsForMaxDate/${empId}`)
           .then((response) => {
             //console.log("==========pay element====:" + response.data);
             setPayLevel(response.data["payLevel"]);
             setBasicPay(response.data["basicPay"]);
           })
           .catch((error) => {
             //console.log(error);
             //console.log(error.response.status);
             //console.log(error.response.headers);
             if (error.response) setServerErrors(error.response.data.error);
             else setServerErrors(error.Error);
           });
     }
     fetchPayData();
 
     return () => {
       fetching = true;
       unmounted = true;
     };
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [empId]);
	useEffect(() => {
		let fetching = false;
		let unmounted = false;
		async function fetchLastWithdrawal() {
			 

			if (!fetching )
				await axios.get(`/cbillFunds/${id}/fundWithdrawal`)
					.then((response) => {
						console.log("---withdrawal--:" +response.data);
			//			setLastWithdrawal(response.data['debitTotal']);
						setLastWithdrawal(response.data); 
						 
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
		fetchLastWithdrawal();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);
	/*
	useEffect(() => {
		let fetching = false;
		let unmounted = false;
		async function fetchConsolidatedAmount() {
			 

			if (!fetching )
				await axios.get(`/cbillFunds/tyWithdrawal/${id}`)
					.then((response) => {
						console.log("---ty amt--:" +response.data);
						let amt=response.data;
		 				setConsAmount(amt); 
						 
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
		fetchConsolidatedAmount();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);
	
	*/
	useEffect(() => {
		let fetching = false;
		let unmounted = false;
		async function fetchBankDetailsData() {

			if (!fetching )
				await axios.get(`/cbillFunds/${id}/bankDetails`)
					.then((response) => {
						console.log("==========Bank Details====:" + response.data['bank']);
						setBankDetails(response.data[0]);
						setAccount(response.data[0]['bankAccountClearText']);
						setIfsc(response.data[0]['ifsc']);
						setBankName(response.data[1]['bankName']);
						setBankStation(response.data[1]['bankStation']);
			 
						if (!unmounted) {
							setBankDetails(
								response.data.map(({ cdaoNo, bankAccountNo, ifsc }) => ({ label: cdaoNo, value: bankAccountNo, ifsc: ifsc }))
							);
							setLoading(false);
						}
					})
					.catch((error) => {
						 
						if (error.response)
							setServerErrors(error.response.data.error);
						else
							setServerErrors(error.Error);
					})
		}
		fetchBankDetailsData();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [empId, setEmpId]);
	
	useEffect(() => {
		let fetching = false;
		let unmounted = false;
		async function fetchEmpData() {
			 

			if (!fetching)
				await axios.get(`/cbillFunds/${id}/empData`)
					.then((response) => {
						setCdaoNo(response.data[0]['cdaoNo']);
						setName(response.data[0]['officerName']);
						setTaskNo(response.data[0]['task']);
						setCheckDigit(response.data[0]['checkDigit']);
						setPerNo(response.data[0]['icNo']);
						if(response.data[0]['fsDueDate'])
							setFsDueDate(format(new Date(response.data[0]['fsDueDate'].toString()),'dd/MM/yyyy'));
						else
							setFsDueDate('NA');
						if(response.data[0]['dateOfCommission'])
							setCommissionDate(format(new Date(response.data[0]['dateOfCommission'].toString()),'dd/MM/yyyy'));
						else
							setCommissionDate('NA');
						
						setLedger(response.data[1]);
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
		fetchEmpData();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);
	
	useEffect(() => {
		let fetching = false;
		let unmounted = false;
		async function fetchRankData() {
			 

			if (!fetching)
				await axios.get(`/cbillFunds/${id}/rankName`)
					.then((response) => {
						setRankName(response.data['rankName']);
						 
						 
						 
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
		fetchRankData();

		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);
	useEffect(() => {
		 
		let fetching = false;
		let unmounted = false;
		 
		async function fetchCurrentMe() {
		 
			if (!fetching)
				axios.get(`/cbillFunds/currentMe`)
					.then((response) => {
						 setMe(response.data);
					 	 
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
		fetchCurrentMe();

		return () => { fetching = true  }
	}, []);
	 
	/*useEffect(() => {
		let fetching = false;
		let unmounted = false;
		async function fetchData() {
			console.log(">>>>>>loading dis " + dakId);
			if (dakId)
				if (!fetching)
					await axios.get(`/rejectionDetails/dsopDakId/${dakId}`)
						.then((response) => {
								//console.log("rej data >>>> "+response.data);
								 setMrRejectionList(response.data);
							 	 setValue('rejectionDetailList',response.data);
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
		 
		return () => { fetching = true; unmounted = true; }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dakId, setDakId]);*/

	const onSubmit = (data, event,) => {
		event.preventDefault();
		if(disabled)
			return;
		console.log("777777777:"+data);
		setDisabled(true);
		if (data.id) {
			axios.put("/cbillFunds/audSubmit/" + data.id, data)
				.then((response) => { 
					if(response.data[2]==='V' || response.data[2]==='I'){
						history.push(`/fundBillInfo/${id}`);
					}else{
						history.push(`/cbillFunds`);
					}
									
					setMesg(response.data[0]);
					if(response.data[0]!==null)
						setMesg(response.data[0]);
					else if(response.data[1]!==null)
						setMesg(response.data[1]);
					// history.push("/cbillFunds");
					setDisabled(false);
					 
			})
				.catch((error) => {
					//console.log(error.response.data);
					//console.log("response--------"+error.response.status);
				 
					setServerErrors(error.data['reason']);
				});
	 
		}else {
			axios.post("/cbillFunds/", data)
				.then((response) => { })
				.catch((error) => {
					//console.log(error.response.data);
					//console.log(error.response.status);
					//console.log(error.response.headers);
					setServerErrors(error.response.data)
				});
		}

		 
	}

	  const ShowPreviousClaims = () => {
     
 
     const columns = useMemo(() => [
 
         {
           Header: "DakId",
           accessor: "dakId",
           Cell: ({ row }) => (
             <div>
               <div>
                 <label>{row.original.dakId}</label>
               </div>
               <div>
               {row.original.claimDate!==null &&
                 <label>
                 
                   Receipt Date: {row.original.claimDate.substring(0, 10)}
                  
                 </label>
                 }
                  {row.original.processedDate!==null &&
                 <label>
                 
                   
                   Processed Date:{row.original.processedDate.substring(0,10)} 
                 </label>
                 }
               </div>

           
             </div>
           ),
         },
 
         
 
         
         {
           Header: "Withdrawal Type",
           accessor: "withdrawalType",
            
         },
          {
           Header: "Claimed Amount",
           accessor: "claimedAmount",
            
         },
          {
           Header: "Approval Amount",
           accessor: "approvalAmount",
            
         },
          {
           Header: "Status",
           accessor: "recordStatus",
            
         },
         {
           Header: "SanctionType",
           accessor: "sanctionType",
         },
         {
           Header: "Fund Purpose",
           accessor: "fundPurpose",
         },
         {
           Header: "Rejection Reason",
           accessor: "rejectionReason",
            
         },
   
       ],
       [previousData]
     );
 
     return (
       <div className="min-h-full bg-green-100 text-gray-700">
         <main className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">
           <div className=" "></div>
           <div className="-mt-2 max-h-full py-0 ml-0">
             <Table columns={columns} data={previousData} className="table-auto" />
           </div>
         </main>
       </div>
     );
   };
	const onError = (errors, e) => console.log(errors, e);

	//All foreign keys. 
	// XXXXXX Add search fields and adjust the values as necessary
	const parentData = {
	
		dak: {
			title: "Dak",
			url : "daks",
			searchList : ['id'], //XXXXXXXXX Add search fields
			fkEntity: "dak",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
			employee: {
			title: "Employee",
			url: "employees/all/effective",
			searchList: ['taskNo','cdaoNo', 'checkDigit', 'officerName'], //XXXXXXXXX Add search fields
			fkEntity: "employee",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
		fundPurpose: {
			title: "Fund Purpose",
			url : "fundPurposes",
			searchList : ['purpose'], //XXXXXXXXX Add search fields
			fkEntity: "fundPurpose",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
		unit: {
			title: "Unit",
			url : "units",
			searchList : ['id'], //XXXXXXXXX Add search fields
			fkEntity: "unit",
			preload: false, //XXXXXX Set this to true for small tables like designations
		},
}

	//Callback for child components (Foreign Keys)
	const callback = (childData) => {
		//console.log("Parent Callback");
		setEntity(prev => ({ ...prev, [childData.fk]: childData.entity }));
		setValue(childData.fk, childData.entity);
		
		if(childData.fk==='employee')
			setEmpId(childData.entity.id)
		//console.log(errors);
		clearErrors(childData.fk);
	};

	const errorCallback = (err) => {
		//console.log(err);
		setServerErrors(err);
	}

	const handleInputChange = (e) => {
		//console.log(e.target.value);
	};
	
	const handleWithdrawalTypeChange = (e) => {
		console.log(e.target.value);
		setValue('tempFinal', e.target.value);
		setWithdrawalType(e.target.value);
	 
	};
	
		const handleSanctionTypeChange = (e) => {
		console.log(e.target.value);
		setValue('sanctionType', e.target.value);
		setSanctionType(e.target.value);
		
	 
	};
	const ShowManRejection = () => {
		
		const handleP = (pp)=>{
		console.log(pp); 
		setPage(pp);
	}
		//console.log(demandData);
		//pcdao added below method
    const handlePageSize = (pp) => {
      console.log(pp);
      setPageSize(pp);
    };
		
	const handleCheckbox = index => (e) => {
		
		//console.log(checkedObj);
		//console.log(index + e.target.value);

		//let key = index;
		let item = mrRejectionList[index];
		let val = item['select'];
		if (val === "on" || val === true) {
			val = false;
		} else {
			val = true;
		}

		item['select'] = val;
		let newData = [...mrRejectionList];
		newData[index] = item;
		setMrRejectionList(newData);
		setValue('rejectionDetailList',mrRejectionList);
		
		 		
	}		
		
	const columns = useMemo(() => [

		{
			Header: 'Select',
			accessor: 'updated',
			Cell: ({ row }) => (
				<div>
					<input type="checkbox" onChange={handleCheckbox(row.index)} checked={mrRejectionList[row.index]['select']} />
				 
				</div>
			)
		},
		{
			Header: "Reason",
			accessor: 'caption',
		},
	], [mrRejectionList])


	return (
		<div className="min-h-screen bg-green-100 text-gray-700">
			<main className="max-w-3xl mx-auto px-2 sm:px-6 lg:px-8 pt-4">
				<div className=" ">
				</div>
				<div className="-mt-2 max-h-0 py-0 ml-0">
					<TablePage columns={columns} data={mrRejectionList} newpage={page} parentCallback={handleP}   
					 parentCallbackPageSize={handlePageSize} className="table-auto" />
				</div>
			</main>

		</div>
	);
		
	}
	const handleButtonClick = (e) =>{
		history.push("/cbillFunds");
	}
	const handleCheckBoxMr = (e) => {
		//console.log(e.target.checked);
	 
			setChecked(e.target.checked);
			setValue('manualRejection',e.target.checked);
			 
	 
	};
	const updateButtonState = (e) => {
		console.log("updating button state " + e);
		setButtonState(e);
	};
	
	const handleInputWithdrawalChange = (e) => {
		console.log(e.target.value);
		setValue('tempFinal', e.target.value);
		setWithdrawalType(e.target.value);
		
		 
	 
	};
	const handleRateChange = (e) => {
		console.log(e.target.value);
		
		setValue('rate', e.target.value);
		
		 
		 
	};
	
	const handleInstallChange = (e) => {
		console.log(e.target.value);
		console.log("consolidate amt"+consAmount);
		let camt=consAmount;
		let instal=e.target.value;
		setValue('totalInstalment', e.target.value);
		setInstall(e.target.value); 
		 let rec=camt/instal;
		 console.log(rec);
			setValue('rate',Math.ceil(rec));
	};
	
	const handleApprovalChange = (e) => {
		console.log(e.target.value); 
		setValue('approvalAmount', e.target.value);
		
		let appAmt=e.target.value;
	//	console.log("$$$$$$:" + appAmt + "---"+ install);
	//	let rec=appAmt/install;
	//	console.log("#####:" + rec);
	//	setValue('rate',Math.ceil(rec));
		
	//	console.log("&&&& empid--line-882--:" + empId);
		if(!appAmt)
			appAmt=0;
		 
		 
 		
		axios.get(`/cbillFunds/tyWithdrawal/totalAmount/${id}/${appAmt}`)
					.then((response) => {
						console.log("&&&& --line-885--:" + response.data);
						 let res=response.data;
						 setConsAmount(res);
						 setApprovalAmt(appAmt);
						 console.log("%%%%% line 890---:" + consAmount+"---"+res);
						 let rec=res/install;
						 setValue('rate',Math.ceil(rec));
					 	 
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
		
		
		 
	};
	
	const handleConsolidatedChange = (e) => {
		console.log(e.target.value);
		setValue('consolidatedAmount', e.target.value); 
		setConsAmount(e.target.value); 
	};
	const addRow = (e) => {
	 
		setRejectionList([...rejectionList,{rdId:0,description:''}])
		 
	};
	
	const removeRow = (index) => {
    const list = [...rejectionList];
    list.splice(index, 1);
    setRejectionList(list);
  };
	
/*	const handleCheckBox = index=>(e) =>{
		console.log(e.target.checked+"--"+index);			  
		console.log(e.target.checked);
		let item = rejectionList[index];
		 
		item['select'] = e.target.checked;
		let newData = [...rejectionList];
		newData[index] = item;
		setRejectionList(newData);		 
	}*/
	const handleCheckBox = (index) => (e) => {
		
       console.log("--rej index--:" + index + rejectionList[index]);
       let item = rejectionList[index];
       console.log("--rej item--:" + item);
       let val = item["select"];
       if (val === "on" || val === true) {
         val = false;
       } else {
         val = true;
       }
       item["select"] = val;
       console.log("--val--:" + val);
       console.log(item["description"]);
       if (item["description"] === "Other Reason" && val === true) {
         setOtherRejSelected(true);
       }
       if (item["description"] === "Other Reason" && val === false) {
         setOtherRejSelected(false);
       }
       let newData = [...rejectionList];
       newData[index] = item;
       setRejectionList(newData);
       setValue("rejectionDetailList", rejectionList);
     };
	const handleInputChangeRejection =(index)=> (e) => {
		//console.log(e.target.value);
		console.log(index+"--"+e.target.value);
		let item=rejectionList[index];
		item.description=e.target.value;
		let newData = [...rejectionList];
		newData[index] = item;
		setRejectionList(newData);
		setValue('rejectionDetailList',rejectionList);
		
	};
	const returnToList =() => {
		history.push("/cbillFunds");
	}
		return (
		//<div className="max-w-5xl mx-auto ">
		//	<div className="w-full w-3/4  mx-auto " >
			<div className="min-h-screen bg-gray-100 text-gray-900">
			<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 > Dsop Fund Bill Process </h1>
					<div className="text-red-500">{mesg}</div>
					 
				 
						 <div className="shadow-md">
				<div className="grid grid-cols-2 gap-0">
				
							<div>
									<label>Month</label>
									 {me}
								</div>
								 
								 <div>
						 <label> Dak Id</label>
						 {dakidNo}
							</div>
							
							 			
						 
					 
					 
								 <div >
									<label>CDAC</label> 
									<input type="textarea" wrap="soft" size="1" readOnly value={ledger}/> 
									{"/"}
									<input type="textarea" wrap="soft" size="1" readOnly value={taskNo}/> 
									{"/"}
									<input type="textarea" wrap="soft" size="4" readOnly value={cdaoNo}/> 
									{"/"}
									<input type="textarea" wrap="soft" size="1" readOnly value={checkDigit}/>  
									    
								</div>	
								 <div >
									<label>PRNO</label> 
									<input type="text" readOnly value={perNo}/> 
								 
									    
								</div>	
								 <div >
									<label>Name</label> 
									<input type="text" readOnly value={rankName} size="3"/> <input type="text" readOnly value={name}/> 
								 
									    
								</div>				
						
						 
								
						<div>
									<label>Fund Balance</label>
									<input type="text" readOnly value={fundBalance}/>  
						</div>	
								
						<div>
									<label>Last Withdrawal</label>
									<input type="text" readOnly value={lastWithdrawal}/>  
						</div>	
						
						<div>
							<label>Claim Amount</label>
							<input type="text" readOnly value={claimAmt}/> 
							</div>
								
						<div>
									<label>Bank Name</label>
									{bankName}{':'}{bankStation}
									 
									 
						</div>
						<div>
						<label>Bank Account/IFSC</label>
									{account}{'/'}{ifsc}
						</div>
						<div>
									<label>Date of Commission</label>
									<input type="text" readOnly value={commissionDate}/>
						</div>
						<div>
					 
									<label>Date of Retirement</label>
									<input type="text" readOnly value={fsDueDate}/>
								
						</div>
						<div >
									<label>Basic Pay</label> 
									<input type="text" readOnly value={basicPay}/> 
								 
									    
								</div>	
								 <div >
									<label>Pay Level</label> 
									<input type="text" readOnly value={payLevel} size="3"/>  
								 
									    
								</div>	
						 	<div>
							<label>Withdrawal Type </label>
								<select name="modeOfJourney" {...register("tempFinal")} className="form-control py-0"
								onChange={handleWithdrawalTypeChange} >
									<option value="select">--Select--</option>
									<option key="1" value="F">Final Withdrawal</option>
									<option key="2" value="T">Temporary Withdrawal</option>
											 

										</select>
									
								</div>
								<div>
							<label>Sanction Type </label>
								<select name="sanctionType" {...register("sanctionType")} className="form-control py-0"
								onChange={handleSanctionTypeChange} >
									<option value="select">--Select--</option>
									<option key="NORMAL" value="NORMAL">NORMAL</option>
									<option key="SPECIAL" value="SPECIAL">SPECIAL</option>
											 

										</select>
									
								</div>
								
						
						</div>
						<br/>
								 
						</div>
						
						  <div className="grid grid-cols-1 gap-0">
						
						<div>
						<label>Manual Rejection</label>
						<input type="checkbox" name="mr" onChange={handleCheckBoxMr} checked={checked} onClick={() => updateButtonState('mr')}/>
						
						 	 					
							 
						 
						</div>
						</div>
								 {checked && checked===true && <>
						 
						 <table className="table table-striped table-bordered table-auto">
						      <thead>
                    <tr>
                        <th colSpan="2">Rejection Reason</th>
                                                
                    </tr>
                    </thead>
                    <tbody>{
	                    rejectionList.map((item,i)=>{
		return(
							<tr key={i}>
							<td><input type="checkbox" onChange={handleCheckBox(i)} checked={rejectionList[i]["select"]}/></td>
							 <td class="stop-stretching1">
                     	   {item.description}  
                     </td>
							</tr>
							);
		})
		
		}
		
                    </tbody>
                    
                    </table>
                      
								 
								
						 <br/>
						 <br/>
						 </>
						 }
							 
							 {otherRejSelected && (
                   <div>
                     <label>Other Rejection Reason</label>
                     <textarea
                       type="text"
                       name="otherRej"
                       {...register("otherRej")}
                       className="w-80 px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                     />
                     <div className="text-red-500">
                       {errors.otherRej?.message}
                     </div>
                   </div>
                 )}
						
						 
						<div>
							<br/>
							</div>	
							<div>
							<br/>
							</div>	
							 
							{checked===false &&
						 <>
						<div className="grid grid-cols-2 gap-0">
						
								<div >
									<LiveSearch name="fundPurpose" onChange={handleInputChange}
										parentData={parentData.fundPurpose} parentCallback={callback} 
										fkEntity={entity.fundPurpose} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.fundPurpose?.message}</div>
								</div>	
													
								 
					
						 
			 					{withdrawalType==='T' && <>
						
								<div>
									<label>Instalment</label>
									<input type="text" name="totalInstalment" {...register("totalInstalment")} onChange={handleInstallChange}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.totalInstalment?.message}</div>
								</div>
								
						
								<div>
									<label>Rate</label>
									<input type="text" name="rate" {...register("rate")} onChange={handleRateChange}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.rate?.message}</div>
								</div>
								<div>
									<label>Outstanding Amount</label>
									<input type="text" readOnly {...register("osBalance")}/> 
								</div>
						<div>
									<label>Consolidated Amount</label>
									<input type="text" readOnly value={consAmount}/> 
								</div>
						 
								 
								</>
						}
						
						<div>
									<label>Fund Reason (By Officer)</label>
									<input type="text" name="fundReason" {...register("fundReason")}
										className="form-control py-0" readOnly={true}
									/>
									<div className="text-red-500">{errors.approvalAmount?.message}</div>
								</div>
								<div>
									<label>Approval Amount</label>
									<input type="text" name="approvalAmount" {...register("approvalAmount")} onChange={handleApprovalChange}
										className="form-control py-0"
									/>
									<div className="text-red-500">{errors.approvalAmount?.message}</div>
								</div>
								
		 {fsDueDate && fsDueDate==='NA' &&
								<div>
									<label>Date of Retirement</label>
									<input type="date" name="dischargeDate" {...register("dischargeDate")}
									className="form-control py-0" />
									<div className="text-red-500">{errors.dischargeDate?.message}</div>
								</div>	
								}					
							
								<div>
									<label>Remarks</label>
									<textarea type="text" name="sectionRemarks" {...register("sectionRemarks")}
										className="form-control py-0"/>
									 
									<div className="text-red-500">{errors.sectionRemarks?.message}</div>
								</div>	
								 
						
								 
						</div>
			</>		
		}
							 
		 	
					 <div className="grid grid-cols-2 gap-0">
					<div className="px-3 ...">
						<button type="submit" disabled={disabled}>Save</button>
					</div>
					 
					 
								<div className="px-3 ...">
									<button type="button" onClick={returnToList}>Return</button>
								</div>
								 </div>
								<label className="text-2xl pt-3 ml-5">
             Previous Dsop Claims -- {rankName} {name} / {cdaoNo}
           </label>
         
         <ShowPreviousClaims />

				</form>
			 
		</div>
		 
			 
           
        
		</div>
	);
};

export default withRouter(CbillFundEdit);