

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

const CreateDeal = ({company,deal}) => {
  const [name, setName] = useState(deal ? deal.name : 'New Deal')
  const [deal_id, setDealid] = useState(deal ? deal.id : '')

    const navigate = useNavigate()

  
      
    const SendApi = async (e) => {
    //   e.preventDefault();
      let info = {"name": name,
                  "deal_id": deal_id,
                  
                 }
      let a = await apiRequest('POST',info,`/deal/${company.id}`)
      if (deal_id){
        navigate(-1)

      }else{

        navigate(0)
      }
    } 
      
      
    return ( 
        <div className="blog-list">

<Row className="mb-3">

<Form.Group as={Col} controlId="formGridEmail">
<Form.Label>Name of Deal</Form.Label>
<Form.Control  noValidate 
  validated='false' value={name} onChange={(e) => setName(e.target.value)}/>
</Form.Group>

</Row>
<Button variant="primary" onClick={SendApi}>
        Submit
      </Button>
   </div>   
     );
}
 
export default CreateDeal;