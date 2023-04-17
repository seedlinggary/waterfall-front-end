import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useEffect } from 'react'

function ColorSchemesExample() {

  return (
    <>
    
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/Calculator">Distribution Waterfall</Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Calculator">Waterfall Calculator</Nav.Link>
            <Nav.Link href="/Workflow">Workflow</Nav.Link>
            <Nav.Link href="/definitions">Definitions</Nav.Link>
            <Nav.Link href="/comingsoon">Coming Soon</Nav.Link>
            <Nav.Link href="/about">About Us</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>

          </Nav>
        </Container>
      </Navbar>


    </>
  );
}

export default ColorSchemesExample;