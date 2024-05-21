import React from "react";
import { Navbar, NavbarBrand, Container } from "react-bootstrap";

export default function Footer({ usrInfo }) {
  console.log(usrInfo);
  return (
    <div className="fixed-bottom p-0">
      <Navbar
        bg="secondary relative"
        className="bg-gradient-to-r from-orange-500 via-white to-green-600"
      >
        <Container>
          <NavbarBrand className="m-auto text-primary">
            {" "}
            PCDA(O) Pune & ITSDC Secunderabad
          </NavbarBrand>
        </Container>
        <div className="text-black mr-10 bg-white rounded-xl py-1 px-4 absolute right-2">
          {usrInfo}
        </div>
      </Navbar>
    </div>
  );
}
