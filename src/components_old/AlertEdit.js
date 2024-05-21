/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By : 
 */

import { useState, useEffect, useRef } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import * as yup from "yup";

import { yupResolver } from '@hookform/resolvers/yup';
import LiveSearch from '../utils/LiveSearch';

import "react-datepicker/dist/react-datepicker.css";

const schema = yup.object({

    //employee: yup.object().required('Required'),
    //nameOfMember: yup.string().required('Required'),
    //dateOfBirth: yup.string().required('Required'),
    //relation: yup.object().required('Required'),
    //gender: yup.string().required('Required'),
    priority:yup.number().required('Required'),
    priority:yup.number().min(1).max(10),
   alertMsg:yup.string().required('Required'),

});



const AlertEdit = () => {
    const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
        resolver: yupResolver(schema)
    });

    let { id } = useParams();
    //console.log(id);

    let history = useHistory();

    const [serverErrors, setServerErrors] = useState([]);
    const [entity, setEntity] = useState({});
    const [loading, setLoading] = useState(true);
    const [empId, setEmpId] = useState(0);
    const [key, setKey] = useState('Page1');
    const [relationName, setRelationName] = useState(0);
    const [fdId, setFdId] = useState();


    
    const onSubmit = (data, event) => {
        event.preventDefault();
        console.log(data);
        if (data.id) {
            axios.put("/alerts/" + data.id, data)
                .then((response) => {
                    if (response.status === 201)
                        history.push("/alertList");
                })
                .catch((error) => {
                    //console.log(error.response.data);
                    console.log("response--------" + error.response.status);

                    //console.log(error.response.headers);
                    setServerErrors(error.response.data)
                });
        } else {
            axios.post("/alerts", data)
                .then((response) => {
                    console.log("alert data sent"+data)
                    console.log("reponse status--------------" + response.status + "--" + response.statusText + "----" + "-h--" + response.headers + "--" + response.data);
                    if (response.status === 201)
                        history.push("/alerts");

                })
                .catch((error) => {
                    //console.log(error.response.data);
                    console.log("response--------" + error.response.status);
                    if (error.response.status !== 201)
                        history.push("/alerts");
                    //console.log(error.response.headers);
                    if (error.response)
                        setServerErrors(error.response.data);
                    else
                        setServerErrors(error);
                });
        }

        // history.push("/familyDetails");
    }



    const onError = (errors, e) => console.log(errors, e);

    const parentData = {


        corps: {
            title: "Corps",
            url: "corpss",
            searchList: ['unitCode', 'unitName'], //XXXXXXXXX Add search fields here and also in the corresponding repository
            fkEntity: "corps",
        },

        unit: {
			title: "Unit",
			url : "units",
			searchList : ['unitCode','unitName'], //XXXXXXXXX Add search fields here and also in the corresponding repository
			fkEntity: "unit",
		},


    }

   

    const callback = (childData) => {

        setEntity(prev => ({ ...prev, [childData.fk]: childData.entity }));
        setValue(childData.fk, childData.entity);
        //console.log(errors);
        // console.log(childData.fk+"--"+childData.entity.id);

        if (childData.fk === 'employee')
            setEmpId(childData.entity.id)



        clearErrors(childData.fk);

    };

    const errorCallback = (err) => {
        //console.log(err);
        setServerErrors(err);
    }

    const handleButtonClick = (e) => {
        history.push("/alerts");
    }



    const handleInputChange = (e) => {
        console.log(e.target.value);
        //	console.log("handle input change");


    };



    return (
        <div className="max-w-xl mx-auto ">
            <div className="w-full w-3/4  mx-auto " >

                <form onSubmit={handleSubmit(onSubmit, onError)}>

                    <h1 >{id === 'new' ? 'Add' : 'Edit'} Alert Message</h1>
                    <div className="text-red-500">{serverErrors}</div>



                    <div className="grid grid-cols-2 gap-0 ">



                        <div >
                            <LiveSearch name="corps" onChange={handleInputChange}
                                parentData={parentData.corps} parentCallback={callback}
                                fkEntity={entity.corps} errCallback={errorCallback} />

                        </div>

                        <div >
									<LiveSearch name="unit" onChange={handleInputChange}
										parentData={parentData.unit} parentCallback={callback} 
										fkEntity={entity.unit} errCallback={errorCallback} />
									<div className="text-red-500 ">{errors.unit?.message}</div>
								</div>	

                        <div>
                            <label>Priority (1-10) </label>
                            <input type="number" name="priority" {...register("priority")}
                            />
                             <div className="text-red-500 ">{errors.priority?.message}</div>
                        </div>








                    </div>
                    <div className="grid grid-cols-1 gap-0 ">
                        <div>
                            <label>Alert Message</label>
                            <textarea
                                rows={3}
                                placeholder="Alert Message"
                                className="form-control py-1"
                                {...register("alertMsg")}
                                
                            />
                            <div className="text-red-500 ">{errors.alertMsg?.message}</div>
                        </div>
                    </div>

                    <div className="px-2">
                        <button type="submit" >Save</button>
                    </div>

                    <div className="px-2">
                        <button type="button" onClick={handleButtonClick} >Cancel</button>
                    </div>


                </form>
            </div>
        </div>
    );
};


export default withRouter(AlertEdit);