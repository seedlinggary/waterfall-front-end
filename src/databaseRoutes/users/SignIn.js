import React, { useState,useEffect } from 'react'
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {reactLocalStorage} from 'reactjs-localstorage';
import { useNavigate } from "react-router-dom";

let base64 = require('base-64');



const SignIn = ({}) => {
    const [password, setPassword] = useState([{}])
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
      navigate(0)


    }
    const SendApi = (e) => {
        e.preventDefault();
        let info = {
                    email: password
                    }
        
        console.log('inside func')
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + base64.encode(email + ":" + password));


        const requestOptions = {
            method: 'GET',
            headers: headers,
        };
        fetch(`https://distributionresolutionapi.com/login`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                console.error('There was a response!', response);
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
    
                // this.setState({ postId: data.id })
                console.error('There was data!', data);
                reactLocalStorage.set('cookie', data.token);
                reactLocalStorage.set('email', email);
                setLoggedIn(true)
                // console.log(eml)
                navigate('/')

                return  data.id 
            })
            .catch(error => {
                // this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
                return error
            });  }
    

        
  
    if (!eml){
    return ( 
        <div>
             <h2>User Sign In</h2>
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
      <Row className="mb-3">
      <span>
               <a href="/forgotpassword">Forgot Password</a>
            </span>
            </Row>
      <Button variant="primary" onClick={SendApi}>
        Submit
      </Button>
    </Form>
   </div>   
     );
    }
    else{
    return ( 
        <div>
             <h2>User Sign Out</h2>

      <Button variant="primary" onClick={SignOut}>
        Submit
      </Button>
   </div>   
     );
    }
  }
export default SignIn;