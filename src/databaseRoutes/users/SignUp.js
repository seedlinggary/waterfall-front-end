import React, { useState,useEffect } from 'react'
import apiRequest from '../../ApiRequest'
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {reactLocalStorage} from 'reactjs-localstorage';
import { useNavigate } from "react-router-dom";
let base64 = require('base-64');

const SignUp = ({}) => {
    const [first_name, setFirst_name] = useState([{}])
    const [last_name, setLast_name] = useState([{}])
    const [password, setPassword] = useState([{}])
    const [email, setEmail] = useState([{}])
    const navigate = useNavigate()

  
      
    const SendApi = async (e) => {
      e.preventDefault();
      let info = {"first_name": first_name,
                  "last_name": last_name,
                  "password": password,
                  "email": email}
      
      let a = await apiRequest('POST',info,'/user')
      // console.log(a)
      }  
    return ( 
        <div className="blog-list">
             <h2>User Sign Up</h2>

             <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>First Name</Form.Label>
        <Form.Control placeholder="Joe"onChange={(e) => setFirst_name(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Last Name</Form.Label>
        <Form.Control placeholder="Smith" onChange={(e) => setLast_name(e.target.value)}/>
      </Form.Group>


      <Button variant="primary" onClick={SendApi}>
        Submit
      </Button>
    </Form>
   </div>   
     );
}
 
export default SignUp;