import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import addDays from 'date-fns/addDays'
import { useState, } from "react";
import { withRouter } from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'


const KitchenSink = () => {
	const [startDate, setStartDate] = useState(new Date());
	const [lightTheme, setLightTheme] = useState(true);
	const [key, setKey] = useState('home');

	const id = 'dummy';

	const handleTabButtonClick = (e => {
		
	});


	//////////Dynamic Input Fields /////////////////////////
	const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);
	
	// handle input change
	const handleInputChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...inputList];
		list[index][name] = value;
		setInputList(list);
	};

	// handle click event of the Remove button
	const handleRemoveClick = index => {
		const list = [...inputList];
		list.splice(index, 1);
		setInputList(list);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		setInputList([...inputList, { firstName: "", lastName: "" }]);
	};

	//////////// End Dynamic Input Fields //////////////////////

	return (
		<div className={lightTheme ? 'theme-light' : 'theme-dark'}>
			<form>

				<Tabs
					id="controlled-tab-example"
					activeKey={key}
					onSelect={(k) => setKey(k)}
					className="mb-3"
				>
					<Tab eventKey="page1" title="Page 1" className="h-120 mb-10" >
						<div className="grid grid-cols-2 gap-0 mb-10">
							<h1>Page 1</h1>
							<button className=" mt-8 py-1 px-2 w-24 absolute left-20 border-2 bg-green-500 rounded  text-onNeutralBgSoft  "
							onClick={handleTabButtonClick}>Button 1</button>
						</div>
					</Tab>


					<Tab eventKey="page2" title="Page 2" className="h-120">
						<div className="grid grid-cols-2 gap-0 ">
							<h1>Page 2</h1>
						</div>
					</Tab>



					<Tab eventKey="dummy" title="Dummy" disabled>
						<h1>Contact Disabled</h1>
					</Tab>
				</Tabs>

				<div className="mx-4 self-center" >
					<div>
						<input
							type="checkbox"
							checked={lightTheme}
							onChange={() => setLightTheme(!lightTheme)}
						/>
					</div>
					<label>Input</label>
					<input type="text" name="usrName"
						className=" w-1/2 color-primary-300 form-control border rounded py-0 focus:ring text-gray-700" />

					<h1 className="text-onNeutralBgSoft ">Primary Colour </h1>
					<div>
						<button className="py-1 px-2 border-2 bg-green-500 rounded  text-onNeutralBgSoft  ">Button</button>
					</div>

					<input type="radio" value="Red" name="color" /> Red <span>&nbsp; &nbsp;</span>
					<input type="radio" value="Green" name="color" /> Green <span>&nbsp; &nbsp;</span>
					<input type="radio" value="Blue" name="color" /> Blue
				<div>
						<input type="checkbox" value="Animate" name="mode" /> Animate
				</div>

					<div className="px-0 pb-0 ">
						<label> Pick your favorite car brand:
      			<select name="carBrand" onChange={''}>
								<option value="mercedes">Mercedes</option>
								<option value="bmw">BMW</option>
								<option value="maserati">Maserati</option>
								<option value="infinity">Infinity</option>
								<option value="audi">Audi</option>
							</select>
						</label>
					</div>

					<label> Date </label>
					<DatePicker selected={startDate} onChange={(date) => setStartDate(date)}
						dateFormat="dd/MM/yyyy HH:mm"

						className="border rounded  focus:ring max-w-md" />
				</div>

				<div className="px-4 pb-0 ">
					<label className="text-sm block font-bold py-0 ">Subject</label>
					<textarea type="text" name="subject"
						className="form-control border rounded py-0 text-gray-700   focus:ring h-48 w-1/2 leading-tight"
					/>
				</div>


				{(id === 'new') && //Conditional rendering
					<>
						<div className="px-4 pb-0 ">
							<label className="text-sm block font-bold py-0 ">Password</label>
							<input type="password" name="password"
								className="form-control border rounded py-0 text-gray-700   focus:ring "
							/>
						</div>

						<div className="px-4 pb-0 ">
							<label className="text-sm block font-bold py-0 ">Retype Password</label>
							<input type="password" name="password2"
								className="form-control border rounded py-0 text-gray-700   focus:ring "
							/>
						</div>
					</>
				}



			<div className="px-4 pb-0 ">
				{inputList.map((x, i) => {
					return (
						<div className="flex flex-wrap content-start ...">
							<input
								name="firstName"
								placeholder="Enter First Name"
								value={x.firstName}
								onChange={e => handleInputChange(e, i)}
							/>
							<input
								className="ml10"
								name="lastName"
								placeholder="Enter Last Name"
								value={x.lastName}
								onChange={e => handleInputChange(e, i)}
							/>
							<div className=" w-16 m-0 p-0 flex flex-wrap content-start ...">
								{inputList.length !== 1 && <button	className=" w-16 m-0 p-0 "
									onClick={() => handleRemoveClick(i)}>Remove</button>}
							</div>
							<div>		
								{inputList.length - 1 === i && <button className=" w-16 m-0 p-0 " onClick={handleAddClick}>Add</button>}
							</div>
						</div>
					);
				})}
				</div>
				<div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>

  );
			</form>
		</div>
	);
}

export default withRouter(KitchenSink);