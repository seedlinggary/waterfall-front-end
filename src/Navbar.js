import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useEffect } from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';
import {reactLocalStorage} from 'reactjs-localstorage';

function ColorSchemesExample() {
  let email = reactLocalStorage.get('email')

  return (
    <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
      <Navbar.Brand href="/parentcombined">Distribution Resolution</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/parentcombined">Profit Distributor</Nav.Link>
            <Nav.Link href="/comingsoon">Coming Soon</Nav.Link>
            <NavDropdown title="Services" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/calculator">Waterfall Calculator</NavDropdown.Item>
              <NavDropdown.Item href="/mortgagecalculator"> Mortgage Calculator</NavDropdown.Item>
              <NavDropdown.Item href="/pandl">Profit and Losses</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/workflow"> Workflow </NavDropdown.Item>
              <NavDropdown.Item href="/definitions"> Definitions </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
          <Nav.Link href="/about">About Us</Nav.Link>
          {email &&<Nav.Link href="/signin">HI {email}</Nav.Link>}
          <Nav.Link href="/signin">Sign In</Nav.Link>
          <Nav.Link href="/signup">Sign Up</Nav.Link>
            <Nav.Link eventKey={2} href="/contact">
            Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      {/* <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/Calculator">Distribution Resolution</Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/calculator">Waterfall Calculator</Nav.Link>
            <Nav.Link href="/famtree">Family Tree</Nav.Link>
            <Nav.Link href="/multimortgage">NEW NEW Mortgage Calculator</Nav.Link>
            <Nav.Link href="/mortgagecalculator">Mortgage Calculator</Nav.Link>
            <Nav.Link href="/pandl">Profit and Losses</Nav.Link>
            <Nav.Link href="/workflow">Workflow</Nav.Link>
            <Nav.Link href="/definitions">Definitions</Nav.Link>
            <Nav.Link href="/comingsoon">Coming Soon</Nav.Link>
            <Nav.Link href="/about">About Us</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>

          </Nav>
        </Container>
      </Navbar>
 */}

    </>
  );
}

export default ColorSchemesExample;