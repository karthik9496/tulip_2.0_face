import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from "react-router-dom";
import Home from "./components/Home";
//import Footer from "./components/Footer";
import DakList from "./components/DakList";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

import AppNavBar from "./menu/AppNavBar";
import DakListTest from "./components/DakListTest";
import MBillList from "./components/MBillList";
import MBillViewMore from "./components/MBillViewMore";
import MBillDetails from "./components/MBillDetails";
import MBillEdit from "./components/MBillEdit";


import AllotmentDetailList from "./components/AllotmentDetailList";
import AllotmentDetailEdit from "./components/AllotmentDetailEdit";
import MiscList from "./components/MiscList";
const App = () => {
	const [serverErrors, setServerErrors] = useState([]);
	const [menu, setMenu] = useState();
	const [usrInfo, setUsrInfo] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [sessionStorageUpdated, setSessionStorageUpdated] = useState(false);



	return (
		<Router basename={process.env.REACT_APP_ROUTER_BASE || ""}>
			<AppNavBar />




			{/* <Route path="/" exact={true} component={Home} /> */}
			<Route
				path="/"
				exact={true}
				render={() => <Home />}
			/>

			<Route path='/allotmentDetails' exact={true} render={() => <AllotmentDetailList />}></Route>
			<Route path='/miscs' exact={true} render={() => <MiscList />}></Route>
			<Route path='/mbills' exact={true} render={() => <MBillList />}></Route>
			<Route path='/mbills/:id' exact={true} render={() => <MBillViewMore />}></Route>
			<Route path='/mbills/:id/edit'exact={true} render={() => <MBillEdit />}></Route>

			<Route path='/allotmentDetails/new' exact={true} render={() => <AllotmentDetailEdit />}></Route>
			<Route path='/editallotmentDetails/:id' exact={true} render={() => <AllotmentDetailEdit />}></Route>

			<Route path='/daks' exact={true} render={() => <DakList />}></Route>





		</Router>

	);
};
export default App;