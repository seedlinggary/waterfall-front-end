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
        <Card.Text>
         <h1>COMING SOON!</h1>
        </Card.Text>
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
      <Card.Img variant="top" alt="person" src={require('./pictures/compu_work.jpg')} />
      <Card.Body>
        <Card.Title>Multiple Waterfalls</Card.Title>
        <Card.Text>
         Create multiple waterfalls at the exact same time, for the same deal. Have different waterfall distributions for different clientele? No worries, we got you covered.
        </Card.Text>
      </Card.Body>

   
    </Card></Col>  <Col md={{ span: 2, offset: 1 }}>    <Card>
      <Card.Img variant="top" alt="person" src={require('./pictures/robert-linder-kcX1lHlPyfM-unsplash.jpg')} />
      <Card.Body>
        <Card.Title>Comprehensive Overview</Card.Title>
        <Card.Text>
          Now that we can manage Waterfalls, Investors, Mortgages, Expenses, and Earnings. Lets put all of these aspects under one roof to see all aspects of your investment over it's lifetime. 
        </Card.Text>
      </Card.Body>

     
    </Card></Col>  <Col md={{ span: 2, offset: 1 }}>    <Card >
      <Card.Img variant="top" alt="person"  src={require('./pictures/sebastian-pandelache-kcSqfuUyIBo-unsplash.jpg')} />
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