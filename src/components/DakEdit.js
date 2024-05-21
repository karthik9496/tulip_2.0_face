/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 03 April 2024
 *
 * Modified By : 
 */

import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import * as yup from "yup";

import { yupResolver } from '@hookform/resolvers/yup';
import LiveSearch from "../utils/LiveSearch"

//import DatePicker  from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";
//import addDays from 'date-fns/addDays'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { setDate } from "rsuite/esm/utils/dateUtils";
import { set } from "lodash";
import Select from "react-select";
import { daDK } from "rsuite/esm/locales";


const schema = yup.object().shape({
    unit: yup.object().when('receivedFrom', {
        is: 'unit',
        then: yup.object().required('UnitName required')
    }),

    dadOffice: yup.object().when('receivedFrom', {
        is: 'dadOffices',
        then: yup.object().required('OfficeName required')
    }),
    senderName: yup.object().when('receivedFrom', {
        is: 'others',
        then: yup.object().required('Sender Name required')
    }),


    //   dadEmployee: yup.object().required('Required'),
    //   civEmployee: yup.object().required('Required'),
    referenceDate: yup.string().required('Required'),
    billDate: yup.string().required('Required'),
    //   srcSection: yup.string().required('Required'),
    amount: yup.number().required('Required'),



    //   oldDak: yup.object().required('Required'),
    //   multipleEntry: yup.boolean().required('Required'),
    //dadOffice: yup.object().required('Dad Office required'),



    //   vendor: yup.object().required('Required'),

    // gemBill: yup.boolean().required('Required'),
    section: yup.object().required('Required'),
    dakType: yup.object().required('Required'),
    //   billType: yup.object().required('Required'),


    //   taskNo: yup.string().required('Required'),

    //senderName: yup.string().required('Required'),
    //   tempDakId: yup.string().required('Required'),
    //   empNo: yup.string().required('Required'),
    //   gpfPranPpanNo: yup.string().required('Required'),
    //   dadAccountNo: yup.string().required('Required'),
    referenceNo: yup.string().required('Required'),
    //  senderCity: yup.string().required('Required'),
    //   subject: yup.string().required('Required'),
    billNo: yup.string().required('Required'),
    //   modeOfReceipt: yup.string().required('Required'),
    //   regnNo: yup.string().required('Required'),

    //  securityGrading: yup.string().required('Required'),

    //   reason: yup.string().required('Required'),
    //   remarks: yup.string().required('Required'),
});


const DakEdit = () => {
    const { register, handleSubmit, setValue, control, reset, formState: { errors, isSubmitting, isSubmitSuccessful, isSubmitted }, clearErrors, watch } = useForm({
        defaultValues: {
            srcSection: "records",
            dakYear: "2024-2025"
        },
        resolver: yupResolver(schema)
    });

    const { id } = useParams();
    console.log(id)

    let history = useHistory();
    const [serverErrors, setServerErrors] = useState([]);
    const [entity, setEntity] = useState({});
    const [dakTypes, setDakTypes] = useState([])
    const [sections, setSections] = useState([])
    const [state, setState] = useState({});
    const [key, setKey] = useState('page1');
    const srcSection = watch("srcSection");
    const receivedFrom = watch("receivedFrom");
    const section = watch("section");
    const referenceNo = watch("referenceNo")
    const referenceDate = watch("referenceDate")
    const dakTypeWatch = watch("dakType")
    const [dakData, setDakData] = useState({})
    const [message, setMessage] = useState('')


    useEffect(() => {
        // Set initial value of srcSection to "records" when component mounts
        if (srcSection === "admin") {
            setValue("receivedFrom", "dadOffices")
        } else {
            setValue("receivedFrom", "unit")
        }

    }, [srcSection]);

    useEffect(() => {

        async function fetchSections() {
            try {
                let record = await axios.get('/sections/all')
                if (record)
                    setSections(record.data)

            } catch (error) {
                console.log(error)
            }

        }

        fetchSections()

    }, [])

    useEffect(() => {
        let receipt = receivedFrom;
        if (section) {
            if (!receipt) {
                if (entity.senderName)
                    receipt = 'others'
                else
                    receipt = 'unit'


            }
            const fetchDakTypes = async () => {
                try {

                    const response = await axios.get('/dakTypes/listDaks?receivedFrom=' + receipt + '&id=' + section.id)
                    setDakTypes(response.data)
                } catch (error) {
                    console.log(error)
                }
            }

            fetchDakTypes();
        }
    }, [receivedFrom, section])


    useEffect(() => {
        let isCancelled = false;
        if (id !== 'new') {
            async function fetchData() {
                let record = '';
                await axios.get('/daks/' + id)
                    .then((response) => {
                        record = response.data;
                        setDakData(record)

                        console.log(record)

                        const fields = [
                            'id'
                            , 'listNo', 'unit', 'imprest', 'dadEmployee', 'civEmployee', 'referenceDate', 'billDate', 'amount', 'disposalDate', 'outwardDak', 'rescheduled', 'oldDak', 'multipleEntry', 'dadOffice', 'officeId', 'priority', 'listDate', 'vendor', 'fisDate', 'gemBill', 'section', 'dakType', 'billType', 'dakidNo', 'dakYear', 'fisXmlFileNo', 'taskNo', 'fisDocNo', 'fisCodeHead', 'senderName', 'tempDakId', 'empNo', 'gpfPranPpanNo', 'dadAccountNo', 'referenceNo', 'senderCity', 'subject', 'billNo', 'modeOfReceipt', 'regnNo', 'disposalNo', 'securityGrading', 'monthYear', 'recordStatus', 'reason', 'remarks'
                        ];
                        fields.forEach(field => setValue(field, record[field]));
                        if (record.unit)
                            setValue('receivedFrom', 'unit')
                        else if (record.dadOffice)
                            setValue('receivedFrom', 'dadOffices')
                        else
                            setValue('receivedFrom', 'others')
                    })
                    .catch((error) => {
                        //console.log(error);
                        //console.log(error.response.status);
                        //console.log(error.response.headers);
                        if (error.response)
                            setServerErrors(error.response.data.error);
                        else
                            setServerErrors(error.Error);
                    });

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

    }, []);

    const handleLoadForm = () => {
        const excludedKeys = ['referenceNo', 'referenceDate', 'subject', 'billNo', 'billDate', 'amount'];
        reset()
        const savedData = JSON.parse(localStorage.getItem("data"));
        setEntity(savedData)
        Object.keys(savedData).forEach(key => {
            if (!excludedKeys.includes(key))
                setValue(key, savedData[key]);
        });
        setMessage('')


    }

    const handleNewForm = () => {
        reset()
    }

    const onSubmit = (data, event) => {
        event.preventDefault();
        console.log(data)
        localStorage.setItem("data", JSON.stringify(data));
        if (data.id) {
            axios.put("/daks/" + data.id, data)
                .then((response) => {
                    history.push("/daks");
                })
                .catch((error) => {
                    //console.log(error.response.data);
                    //console.log(error.response.status);
                    //console.log(error.response.headers);
                    //setServerErrors(error.response.data)
                });
        } else {
            console.log(data)
            axios.post("/daks", data)
                .then((response) => {
                    console.log(response.data)
                    setMessage(response.data)
                    //history.push("/daks/new");
                    //reset()
                    //setCheck(false)

                })
                .catch((error) => {
                    console.log(error.response.data);
                    //console.log(error.response.status);
                    //console.log(error.response.headers);
                    //setServerErrors(error.response.data)
                });
        }
    }

    const onError = (errors, e) => console.log(errors, e);

    //All foreign keys. 
    // XXXXXX Add search fields and adjust the values as necessary
    const parentData = {

        unit: {
            title: "Unit*",
            url: "units",
            searchList: ['unitName', 'unitCode'], //XXXXXXXXX Add search fields here and also in the corresponding repository
            fkEntity: "unit",
        },

        dadEmployee: {
            title: "Dad Employee",
            url: "dadEmployees",
            searchList: ['employeeName', 'accountNo'], //XXXXXXXXX Add search fields here and also in the corresponding repository
            fkEntity: "dadEmployee",
        },
        civEmployee: {
            title: "Civ Employee",
            url: "civEmployees",
            searchList: ['employeeName', 'gpfPranPpanNo'], //XXXXXXXXX Add search fields here and also in the corresponding repository
            fkEntity: "civEmployee",
        },
        // outwardDak: {
        // 	title: "Outward Dak",
        // 	url : "outwardDaks",
        // 	searchList : ['id'], //XXXXXXXXX Add search fields here and also in the corresponding repository
        // 	fkEntity: "outwardDak",
        // },
        oldDak: {
            title: "Old Dak",
            url: "oldDaks",
            searchList: ['id'], //XXXXXXXXX Add search fields here and also in the corresponding repository
            fkEntity: "oldDak",
        },
        dadOffice: {
            title: "Dad Office*",
            url: "dadOffices",
            searchList: ['officeName'], //XXXXXXXXX Add search fields here and also in the corresponding repository
            fkEntity: "dadOffice",
        },
        dadOrganization: {
            title: "Dad Organization",
            url: "dadOrganizations",
            searchList: ['organizationName'], //XXXXXXXXX Add search fields here and also in the corresponding repository
            fkEntity: "dadOrganization",
        },
        officeId: {
            title: "Office Id",
            url: "officeIds",
            searchList: ['id'], //XXXXXXXXX Add search fields here and also in the corresponding repository
            fkEntity: "officeId",
        },
        vendor: {
            title: "Vendor",
            url: "vendors",
            searchList: ['vendorName', 'panNumber'], //XXXXXXXXX Add search fields here and also in the corresponding repository
            fkEntity: "vendor",
        },
        section: {
            title: "Section",
            url: "sections",
            searchList: ['sectionName'], //XXXXXXXXX Add search fields here and also in the corresponding repository
            fkEntity: "section",
        },
        dakType: {
            title: "Dak Type",
            url: "dakTypes/listDaks?receivedFrom=",
            searchList: ['description'], //XXXXXXXXX Add search fields here and also in the corresponding repository
            fkEntity: "dakType",
        },
        billType: {
            title: "Bill Type",
            url: "billTypes",
            searchList: ['id'], //XXXXXXXXX Add search fields here and also in the corresponding repository
            fkEntity: "billType",
        },
    }

    //Callback for child components (Foreign Keys)
    const callback = (childData) => {
        console.log("Parent Callback");
        setEntity(prev => ({ ...prev, [childData.fk]: childData.entity }));
        setValue(childData.fk, childData.entity);
        //console.log(errors);
        clearErrors(childData.fk);
    };

    const setDakTypeEntity = (entity) => {
        setValue("dakType", entity)
    }

    const errorCallback = (err) => {
        //console.log(err);
        setServerErrors(err);
    }

    const handleInputChange = (e) => {
        console.log(entity);
    };

    const handleInputBillDateRef = (e) =>{
        console.log(e)
    }

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4" >
                <h2 className="text-red-600 bg-gray-100 p-4 rounded">{message}</h2>

                <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <h1 >{id === 'new' ? 'Add' : 'Edit'} Dak </h1>
                    <div className="text-red-500">{serverErrors}</div>
                    <Tabs
                        id="DakEdit"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3"
                    >
                        <Tab eventKey="page1" title="Page 1" className="h-200">
                            <div className="grid grid-cols-2 gap-0">

                                <div>
                                    <label>Src Section</label>
                                    <select className="form-control py-0 h-8" required
                                        name="srcSection" {...register("srcSection")}
                                    >
                                        <option value="records">Records</option>
                                        <option value="admin">Admin</option>
                                        <option value="teller">Teller</option>
                                    </select>
                                </div>


                                <div>
                                    <label>Gem Bill</label>
                                    <select className="form-control py-0 h-8" required
                                        name="gemBill" {...register("gemBill")}
                                    >
                                        <option value={false}>No</option>
                                        <option value={true}>Yes</option>

                                    </select>
                                </div>
                            </div>

                            <br />

                            <div className="flex flex-wrap mb-1">
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">

                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                            <input
                                                type="radio"
                                                className="border rounded-full w-5 h-5 checked:bg-blue-600 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
                                                value="unit"
                                                id="unit"
                                                disabled={srcSection === "admin"}
                                                {...register('receivedFrom', { required: true })}
                                            />
                                            <span className="ml-2">Unit</span>
                                        </label>

                                    </div>

                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        {/* Option 1 */}
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                            <input
                                                type="radio"
                                                className="border rounded-full w-5 h-5 checked:bg-blue-600 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
                                                value="dadOffices"
                                                id="dadOffices"
                                                {...register('receivedFrom', { required: true })}

                                            />
                                            <span className="ml-2">Dad Offices</span>
                                        </label>

                                    </div>

                                </div>

                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        {/* Option 1 */}
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                            <input
                                                type="radio"
                                                className="border rounded-full w-5 h-5 checked:bg-blue-600 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
                                                value="others"
                                                {...register('receivedFrom', { required: true })}
                                            />
                                            <span className="ml-2">Others</span>
                                        </label>

                                    </div>

                                </div>
                            </div>
                            {receivedFrom === "unit" && (<div className="flex flex-wrap">
                                <div className="w-full lg:w-6/12">

                                    <LiveSearch className="h-8" name="unit" onChange={handleInputChange}
                                        parentData={parentData.unit} parentCallback={callback}
                                        fkEntity={entity.unit} errCallback={errorCallback} />
                                    <div className="text-red-500 ">{errors.unit?.message}</div>
                                </div>
                                <div className="w-full lg:w-6/12">

                                    <LiveSearch name="civEmployee" onChange={handleInputChange}
                                        parentData={parentData.civEmployee} parentCallback={callback}
                                        fkEntity={entity.civEmployee} errCallback={errorCallback} />
                                    <div className="text-red-500 ">{errors.civEmployee?.message}</div>
                                </div>
                                <div className="w-full lg:w-6/12">

                                    <LiveSearch name="vendor" onChange={handleInputChange}
                                        parentData={parentData.vendor} parentCallback={callback}
                                        fkEntity={entity.vendor} errCallback={errorCallback} />
                                    <div className="text-red-500 ">{errors.vendor?.message}</div>
                                </div>
                                <div className="w-full lg:w-6/12">


                                </div>
                            </div>)}

                            {receivedFrom === "dadOffices" && (<div className="flex flex-wrap">
                                <div className="w-full lg:w-6/12">

                                    <LiveSearch name="dadOrganization" onChange={handleInputChange}
                                        parentData={parentData.dadOrganization} parentCallback={callback}
                                        fkEntity={entity.dadOrganization} errCallback={errorCallback} />
                                    <div className="text-red-500 ">{errors.dadOrganization?.message}</div>
                                </div>
                                <div className="w-full lg:w-6/12">

                                    <LiveSearch name="dadOffice" onChange={handleInputChange}
                                        parentData={parentData.dadOffice} parentCallback={callback}
                                        fkEntity={entity.dadOffice} errCallback={errorCallback} />
                                    <div className="text-red-500 ">{errors.dadOffice?.message}</div>
                                </div>
                                <div className="w-full lg:w-6/12">
                                    <LiveSearch name="dadEmployee" onChange={handleInputChange}
                                        parentData={parentData.dadEmployee} parentCallback={callback}
                                        fkEntity={entity.dadEmployee} errCallback={errorCallback} />
                                    <div className="text-red-500 ">{errors.dadEmployee?.message}</div>

                                </div>
                                <div className="w-full lg:w-6/12">

                                    <LiveSearch name="vendor" onChange={handleInputChange}
                                        parentData={parentData.vendor} parentCallback={callback}
                                        fkEntity={entity.vendor} errCallback={errorCallback} />
                                    <div className="text-red-500 ">{errors.vendor?.message}</div>
                                </div>

                            </div>)}

                            {receivedFrom === "others" && (<div className="flex flex-wrap">
                                <div className="w-full lg:w-6/12">

                                    <label>Sender Name</label>
                                    <input type="text" name="senderName" {...register("senderName")}
                                        className="form-control py-0 h-8"
                                    />
                                    <div className="text-red-500">{errors.senderName?.message}</div>
                                </div>
                                <div className="w-full lg:w-6/12">

                                    <label>Sender City</label>
                                    <input type="text" name="senderCity" {...register("senderCity")}
                                        className="form-control py-0 h-8"
                                    />
                                    <div className="text-red-500">{errors.senderCity?.message}</div>
                                </div>

                            </div>)}

                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-6/12">

                                    <label>Security Grading</label>
                                    <select className="form-control py-0 h-8" required={id === "new"}
                                        name="securityGrading" {...register("securityGrading")}
                                    >
                                        <option value="other">Other</option>
                                        <option value="confidential">Confidential</option>
                                        <option value="secret">Secret</option>
                                        <option value="topsecret">TopSecret</option>
                                        <option value="restricted">Restricted</option>
                                    </select>
                                    <div className="text-red-500">{errors.securityGrading?.message}</div>
                                </div>
                                <div className="w-full lg:w-6/12">

                                    <label>Mode Of Receipt</label>
                                    <select className="form-control py-0 h-8"
                                        name="modeOfReceipt" {...register("modeOfReceipt")}
                                    >
                                        <option value="Ordinary Post">Ordinary Post</option>
                                        <option value="Regd Letter">Regd Letter</option>
                                        <option value="Regd Parcel">Regd Parcel</option>
                                        <option value="Speed Post">Speed Post</option>

                                        <option value="By Hand">By Hand</option>
                                        <option value="By Courier">By Courier</option>
                                        <option value="Fax">Fax</option>
                                        <option value="Email">Email</option>
                                    </select>

                                    <div className="text-red-500">{errors.modeOfReceipt?.message}</div>
                                </div>

                            </div>
                            <br />
                            <hr />
                            <br />
                            {id === "new" && (<div className="flex flex-wrap">
                                <div className="w-full lg:w-6/12">

                                    <label>Section</label>
                                    <Controller
                                        name="section" // Name of the form field
                                        control={control} // Form control instance from useForm
                                        //defaultValue="" // Initial value for the select field
                                        rules={{ required: 'Please select Section' }}
                                        render={({ field }) => (
                                            <Select
                                                options={sections}
                                                getOptionLabel={option => option.sectionName}
                                                getOptionValue={option => option.id}
                                                onChange={(selectedOption) => {
                                                    field.onChange(selectedOption); // Update field value on change
                                                }}
                                            />
                                        )}
                                    />
                                    <div className="text-red-500">{errors.section?.message}</div>



                                </div>
                                <div className="w-full lg:w-6/12">


                                    <label>DakType : {dakTypeWatch?.dakCategory?.categoryName}</label>
                                    <Controller
                                        name="dakType"
                                        control={control}
                                        defaultValue={dakData.dakType}
                                        rules={{ required: 'Please select dakType' }}
                                        render={({ field }) => (
                                            <Select
                                                options={dakTypes}
                                                getOptionLabel={option => option.description}
                                                getOptionValue={option => option.id}
                                                //value={}
                                                onChange={val => field.onChange(val)}
                                            />
                                        )}
                                    />
                                    <div className="text-red-500">{errors.section?.message}</div>

                                </div>
                            </div>)}
                            {id !== "new" && (<div className="flex flex-wrap">
                                <div className="w-full lg:w-6/12">

                                    <label className="text-lg">Section : {dakData?.section?.sectionName} </label>



                                </div>
                                <div className="w-full lg:w-6/12">


                                    <label className="text-lg">DakType :<span className="text-red-900">{dakData?.dakType?.description} : {dakData?.dakType?.dakCategory?.categoryName}</span></label>


                                </div>
                            </div>)}

                            <br />
                            <hr />
                            <br />
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-3/12">
                                    <div>
                                        <label>Reference No</label>
                                        <input type="text" name="referenceNo" {...register("referenceNo", { required: "Reference No required" })}
                                            className="form-control py-0 h-8"
                                        />
                                        <div className="text-red-500">{errors.referenceNo?.message}</div>
                                    </div>

                                </div>
                                <div className="w-full lg:w-3/12">
                                    <div>
                                        <label>Reference Date</label>
                                        <input type="date" name="referenceDate" {...register("referenceDate", { required: "Reference Date required" })}
                                            className="form-control py-0 h-8" />
                                        <div className="text-red-500">{errors.referenceDate?.message}</div>
                                    </div>

                                </div>

                                <div className="w-full lg:w-3/12">
                                    <div>
                                        <label>Dak Year</label>
                                        <input type="text" name="dakYear" {...register("dakYear", { required: "Dak Year required" })}
                                            className="form-control py-0 h-8"
                                        />
                                        <div className="text-red-500">{errors.dakYear?.message}</div>
                                    </div>

                                </div>
                                <div className="w-full lg:w-3/12">
                                    <div>
                                        <label>Task No</label>
                                        <input type="text" name="taskNo" {...register("taskNo")}
                                            className="form-control py-0 h-8"
                                        />
                                        <div className="text-red-500">{errors.taskNo?.message}</div>
                                    </div>

                                </div>

                            </div>

                            <div>
                                <label>Subject</label>
                                <textarea name="subject" {...register("subject")}
                                    className="form-control py-0 h-8 ml-2"
                                />
                                <div className="text-red-500">{errors.subject?.message}</div>
                            </div>

                            {dakTypeWatch && dakTypeWatch.dakCategory && dakTypeWatch.dakCategory.categoryName === "BILLS" && (
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-4/12">

                                        <label>Bill No</label>
                                        <input type="text" name="billNo" {...register("billNo", { required: "Bill No required" })}
                                            className="form-control py-0 h-8"
                                        />
                                        <div className="text-red-500">{errors.billNo?.message}</div>
                                    </div>


                                    <div className="w-full lg:w-4/12">
                                        <label>Bill Date*</label>
                                        <input type="date" name="billDate"  {...register("billDate", { required: "Bill Date required" })}
                                            className="form-control py-0 h-8" />
                                        <div className="text-red-500">{errors.billDate?.message}</div>
                                    </div>



                                    <div className="w-full lg:w-4/12">

                                        <label>Amount*</label>
                                        <input type="number" name="amount"  {...register("amount", { required: "Amount required" })}
                                            className="form-control py-0 h-8"
                                        />
                                        <div className="text-red-500">{errors.amount?.message}</div>


                                    </div>

                                </div>)}
                                <label className="inline-flex items-center">
									<input
										type="checkbox"
										onChange={handleInputBillDateRef}
										className="form-checkbox mr-2"
									/>
									Click here to load Bill date and Bill no same as Reference Date and Reference No
								</label>




                        </Tab>

                        <Tab eventKey="page2" title="Page 2" className="h-120">
                            <div className="grid grid-cols-2 gap-0">
                                <p>Add some fields here or delete this tab.</p>
                            </div>
                        </Tab>

                        <Tab eventKey="help" title="Help" >
                            <h1>Help</h1>
                            <ul className="list-disc">
                                <li>Point 1</li>
                                <li>Point 2</li>
                            </ul>
                        </Tab>

                    </Tabs>

                    <div className="px-4 mt-2 flex flex-wrap">
                        {!isSubmitSuccessful && (<button className="p-1" type="submit" disabled={isSubmitSuccessful} >Save</button>)}
                        {isSubmitSuccessful && (<><button className="p-1" type="button" disabled={!isSubmitSuccessful} style={{ width: "40%", margin: "1rem" }} onClick={handleLoadForm}>Add More</button>
                            <button className="p-1" type="button" disabled={!isSubmitSuccessful} style={{ width: "40%", margin: "1rem" }} onClick={handleNewForm}>New Form</button></>)}
                    </div>

                </form>
            </div>
        </div >
    );
};

export default DakEdit;