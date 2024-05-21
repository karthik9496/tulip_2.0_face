/**
@author Raja Reddy
October 2021
*/

import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";

const AppNavBar = ({ menu, usrName }) => {
	//console.log(menu);

	const [data, setData] = useState([]);
	const [serverErrors, setServerErrors] = useState([]);
	const [topLevelMenu, setTopLevelMenu] = useState([]);
	const [subMenus, setSubMenus] = useState([]);
	//console.log(subMenus);
	topLevelMenu.length = 0; // Clear array
	subMenus.length = 0; // Clear array
	let arr = null;
	menu &&
		menu.map((item) => {
			//console.log(item);
			if (item.fkParentMenu === 1) {
				//Top level menu. Not sub menu
				topLevelMenu.push(item);
			} else if (!item.fkParentMenu) {
				// New sub menu
				if (arr !== null) {
					subMenus.push(arr);
					//console.log(subMenus);
				}
				arr = [];
				arr.push(item); //Title of menu
			} else {
				// Continuing with a sub menu
				arr.push(item);
			}
		});
	if (arr) subMenus.push(arr);
	//setSubMenus(subMenus);
	//console.log(topLevelMenu);
	//console.log(subMenus);

	return (
		<div className="sticky z-10 top-0 fixed-top2 p-0 ">
			<Navbar
				bg="success"
				variant="dark"
				expand="lg"
				className="bg-gradient-to-r from-green-600 via-green-400 to-green-600"
			>
				<Container fluid>
					<Navbar.Brand href="/">
						<img
							src="/tulip.png"
							width="30"
							height="30"
							className="d-inline-block align-top"
							alt="Tulip logo"
						/>
						{"  "}
						Tulip 2.0
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link href="/">Home</Nav.Link>

							<Nav.Link href="/allotmentDetails">Allotment Details</Nav.Link>
							<Nav.Link href="/miscs">Misc Details</Nav.Link>
							<Nav.Link href="/mbills">MBillsList</Nav.Link>
							<Nav.Link href="/daks">Daks</Nav.Link>


							{topLevelMenu.map((item) => (
								<Nav.Link key={item.id} href={"/" + item.link}>
									{item.menuName}
								</Nav.Link>
							))}

							{subMenus.map((subMenu) => {
								//console.log(subMenu[0].menuName);
								return (
									<NavDropdown
										key={subMenu[0].id}
										title={subMenu[0].menuName}
										id="basic-nav-dropdown"
										className="my-0 py-0"
									>
										{subMenu.slice(1).map((item) => (
											<NavDropdown.Item
												key={item.id}
												as={Link}
												to={"/" + item.link}
												// href={"/" + item.link}
												className="leading-none  pb-1 "
											>
												{" "}
												{item.menuName}{" "}
											</NavDropdown.Item>
										))}
									</NavDropdown>
								);
							})}
						</Nav>

						<Nav>
							{!menu && (
								<Nav.Link href={`${process.env.REACT_APP_BASE_URL}/login`}>
									Login
								</Nav.Link>
							)}
							{menu && (
								<Nav.Link
									eventKey={2}
									onClick={() => {
										sessionStorage.removeItem("usr");
										sessionStorage.removeItem("isLoggedIn");
									}}
									href={`${process.env.REACT_APP_BASE_URL}/logout`}
								>
									{" "}
									Logout{" "}
								</Nav.Link>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
};

export default AppNavBar;
