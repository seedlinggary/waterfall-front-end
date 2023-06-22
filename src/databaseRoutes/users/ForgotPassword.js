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
    const [password, setPassword] = useState([{}])
    const [resetCode, setResetCode] = useState(false)
    const [email, setEmail] = useState([{}])
    const [isLoggedIn, setLoggedIn] = useState(false)
    const navigate = useNavigate()
    let eml = reactLocalStorage.get('email')

    const SignOut = (e) => {
      reactLocalStorage.remove('cookie')
      reactLocalStorage.remove('email')
      setLoggedIn(false)
      // navigate('/')
      // let eml = reactLocalStorage.get('email')
      console.log(eml)


    }
    // const SendApi = (e) => {
    //     e.preventDefault();
    //     let info = {
    //                 email: password
    //                 }
        
    //     console.log('inside func')
    //     let headers = new Headers();
    //     headers.append('Authorization', 'Basic ' + base64.encode(email + ":" + password));


    //     const requestOptions = {
    //         method: 'GET',
    //         headers: headers,
    //     };
    //     fetch(`http://127.0.0.1:5000/send_message`, requestOptions)
    //         .then(async response => {
    //             const isJson = response.headers.get('content-type')?.includes('application/json');
    //             const data = isJson && await response.json();
    //             console.error('There was a response!', response);
    //             // check for error response
    //             if (!response.ok) {
    //                 // get error message from body or default to response status
    //                 const error = (data && data.message) || response.status;
    //                 return Promise.reject(error);
    //             }
    
    //             // this.setState({ postId: data.id })
    //             console.error('There was data!', data);
    //             // reactLocalStorage.set('cookie', data.token);
    //             // reactLocalStorage.set('email', email);
    //             setLoggedIn(true)
    //             // console.log(eml)
    //             // navigate('/')
    //             setEmailSent(true)
    //             return  data.id 
    //         })
    //         .catch(error => {
    //             // this.setState({ errorMessage: error.toString() });
    //             console.error('There was an error!', error);
    //             return error
    //         });  }
    
            const SendApi= async(e) => {
                e.preventDefault();
                let info = {"resetCode": resetCode,
                            "password": password,
                            "email": email}
                
                let a = apiRequest('POST',info,'/send_message')
                console.log(a)
                }
        // console.log(e)
  
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