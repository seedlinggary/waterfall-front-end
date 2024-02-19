

import React, { useState,useEffect } from 'react'
import apiRequest from '../../ApiRequest'
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {reactLocalStorage} from 'reactjs-localstorage';
import { useNavigate } from "react-router-dom";
import useFetch from '../../useFetch';

let base64 = require('base-64');

const AddClient = ({your_email=null, companyid=null,business}) => {
    console.log(your_email)
    const [email, setEmail] = useState(your_email ? your_email : '')
    const [company_id, setCompanyID] = useState(companyid ? companyid : '')

    const navigate = useNavigate()

  
      
    const SendApi = async (e) => {
    //   e.preventDefault();
      let info = {"email": email,
      'company_id': company_id,
                  
                 }
                 console.log(info)
      let a = await apiRequest('POST',info,`/investor/client`)


        navigate(0)
    } 
      

    return ( 
        <div className="blog-list">

<Row className="mb-3">

<Form.Group as={Row} controlId="formGridEmail">
{business && <> <Form.Label column sm="2">Add Client's email</Form.Label>
<Col sm="10">

<Form.Control  rows={3}  value={email} onChange={(e) => setEmail(e.target.value)}/>
</Col></>}
{!business && <><Form.Label column sm="2">Add Businness ID#</Form.Label>
<Col sm="10">

<Form.Control  rows={3}  value={company_id} onChange={(e) => setCompanyID(e.target.value)}/>
</Col></>}
</Form.Group>
</Row>


<Button variant="primary" onClick={SendApi}>
        Create Proposal
      </Button>
   </div>   
     );
}
 
export default AddClient;