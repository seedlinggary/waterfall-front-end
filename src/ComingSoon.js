import React, {  useState,useEffect } from 'react'
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const User = () => {


    return ( 
        <>
        <h1></h1>
          <Row>
        <Col></Col>
        <Col xs={9}>    <Card className="text-center" bg="dark"key="Info" text="white">
      <Card.Body>
        {/* <Card.Title className="display-6 fw-bolder">
         COMING SOON!
        </Card.Title> */}
        <Card.Title>
         <h1>COMING SOON!</h1>
        </Card.Title>
      </Card.Body>
     
    </Card>
</Col>
        <Col></Col>
        <h1></h1>
       <br></br>
        </Row>
        <div>
      <Row>
      <Col md={{ span: 2, offset: 2 }}>    <Card >
      <Card.Img variant="top"  src={require('./pictures/compu_work.jpg')} />
      <Card.Body>
      <Card.Title>
          <Link to="/signin">Log In</Link>
        </Card.Title>
        <Card.Text>
        Nice userfaces depending if you are an Investor or a General Partner. Have employees? limit/grant access to what they can see.
        </Card.Text>
      </Card.Body>

   
    </Card></Col>  <Col md={{ span: 2, offset: 1 }}>    <Card>
      <Card.Img variant="top"  src={require('./pictures/robert-linder-kcX1lHlPyfM-unsplash.jpg')} />
      <Card.Body>
        <Card.Title>Data Storage</Card.Title>
        <Card.Text>
          Its one thing to input information and get a response. It's next level when you can save all of your information in a database under one roof. You will be able to analyse, edit, and store all of your information. 
        </Card.Text>
      </Card.Body>

     
    </Card></Col>  <Col md={{ span: 2, offset: 1 }}>    <Card >
      <Card.Img variant="top"  src={require('./pictures/sebastian-pandelache-kcSqfuUyIBo-unsplash.jpg')} />
      <Card.Body>
        <Card.Title>Capital Calls for Investors</Card.Title>
        <Card.Text>
          No one likes capital calls. Soon you will be able to add capital calls to the investment so you can see a real picture of where your investment is standing.
        </Card.Text>
      </Card.Body>

    </Card></Col>  
               </Row>
               <h1></h1>
       <br></br>

      </div>
      </>
     );
}
 
export default User;