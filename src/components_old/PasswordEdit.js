/**
 * Code generated using Python
 * @author Raja Reddy
 * Date : 17 Oct 2021
 *
 * Modified By : 
 */

import { useState, useEffect } from "react";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import * as yup from "yup";

import { yupResolver } from '@hookform/resolvers/yup';


import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

const schema = yup.object({
	
	currentPassword: yup.string().test('Current Password Given', 'Current Password is required', function(value){
		console.log(value);
		if(typeof value === 'undefined')
			return true; //Field not displayed. So, valid.
		return value;
	}),
	
	password: yup.string().required('Password is required'),
	passwordConfirmation: yup.string().test('passwords-match', 'Passwords must match', function(value) {
		//console.log(yup.ref('password'));
		//console.log(value);
		//console.log(this);
		return this.parent.password === value;
	})
	//recordStatus: yup.string().required('Required'),
});


const PasswordEdit = () => {
	const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm({
		resolver: yupResolver(schema)
	});

	let { id } = useParams();
	console.log(id);

	let history = useHistory();
	const [serverErrors, setServerErrors] = useState([]);
	const [entity, setEntity] = useState({});
	const [state, setState] = useState({});
	const [key, setKey] = useState('page1');


	const onSubmit = (data, event) => {
		event.preventDefault();
		console.log(data);
		//console.log(errors);
		axios.put(`/usrs/${id}/password`, data)
			.then((response) => { 
				if(response.status !== 200){
					setServerErrors(response.data);
					history.push("/usrs");
				}else if(response.status==200){
					setServerErrors(response.data)
				}
			})
			.catch((error) => {
				//console.log(error.response.data);
				//console.log(error.response.status);
				//console.log(error.response.headers);
				setServerErrors(error.response.data)
			});

		
	}

	const onError = (errors, e) => {
		console.log(errors, e);
	}



	return (
		<div className="max-w-xl mx-auto ">
			<div className="w-full w-3/4  mx-auto " >

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 >Change Password </h1>
					<div className="text-red-500">{serverErrors}</div>
					<Tabs
						id="RolEdit"
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className="mb-3"
					>
						<Tab eventKey="page1" title="Page 1" className="h-120">
							<div className="grid grid-cols-2 gap-0">

								{id === 'self' &&
									<>
										<div className="px-2 pb-0 ">
											<label >Current Password</label>
											<input type="password" name="currentPassword" {...register("currentPassword")}
												className="form-control py-0 "
											/>
											<div className="text-red-500">{errors.currentPassword?.message}</div>
										</div>
										<div />
									</>
								}
								<div className="px-2 pb-0 ">
									<label >New Password</label>
									<input type="password" name="password" {...register("password")}
										className="form-control py-0 "
									/>
									<div className="text-red-500">{errors.password?.message}</div>
								</div>

								<div >
									<label >Retype New Password</label>
									<input type="password" name="passwordConfirmation" {...register("passwordConfirmation")}
										className="form-control py-0 "
									/>
									<div className="text-red-500">{errors.passwordConfirmation?.message}</div>
								</div>

							</div>
						</Tab>


						<Tab eventKey="help" title="Help" >
							<ul className="list-disc">
								<li>Passwords should be strong - combination of upper case, lower case, digits and special characters.</li>
								<li>Should be at least 8 characters </li>
								<li>Passwords should be easy to remember but difficult to guess.</li>
							</ul>
						</Tab>
					</Tabs>

					<div className="px-4">
						<button type="submit" >Save</button>
					</div>

				</form>
			</div>
		</div>
	);
};

export default withRouter(PasswordEdit);


