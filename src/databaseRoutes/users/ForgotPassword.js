import React, { useState,useEffect } from 'react'
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {reactLocalStorage} from 'reactjs-localstorage';
import { useNavigate } from "react-router-dom";
import apiRequest from '../../ApiRequest'

let base64 = require('base-64');



const ForgotPassword = ({}) => {
    const [emailSent, setEmailSent] = useState(false)
    const [password, setPassword] = useState(false)
    const [resetCode, setResetCode] = useState(false)
    const [email, setEmail] = useState()
    const [isLoggedIn, setLoggedIn] = useState(false)
    const navigate = useNavigate()
    let eml = reactLocalStorage.get('email')



    
         const SendApi = async (e) => {
                e.preventDefault();
                let info = {"resetCode": resetCode,
                            "password": password,
                            "email": email}
                
                 let  a = apiRequest('POST',info,'/reset_password/')
                 setEmailSent(true)
                }
  
    return ( 
        <div>
             <h2>Forgot Password</h2>
             <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        {emailSent && <>
         <h4> You should be recieving an email with a reset code. it will only last 15min</h4>
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Reset Code</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => setResetCode(e.target.value)}/>
        </Form.Group>
        
        <Form.Group as={Col} controlId="formGridPassword">
        <Form.Label>New Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
     
        
        </>}
      </Row>

      <Button variant="primary" onClick={SendApi}>
        Submit
      </Button>
    </Form>
   </div>   
     );

  }
export default ForgotPassword;