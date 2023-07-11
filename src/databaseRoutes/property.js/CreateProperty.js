

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

const CreateProperty = ({company, deal}) => {
    const [state, setState] = useState('New York')
    const [country, setCountry] = useState('USA')
    const [street, setStreet] = useState('Sesame Place')
    const [num, setNum] = useState('123')
    const [apt, setApt] = useState(null)
    const [ptype_id, setPtypeID] = useState(1)

    const navigate = useNavigate()

  
      
    const SendApi = (e) => {
    //   e.preventDefault();
      let info = {"state": state,
      'country': country,
      'street': street,
      'number':num,
      'apt':apt,
      'ptype_id': ptype_id 
                  
                 }
      let a = apiRequest('POST',info,`/property/${company.id}/${deal.id}`)
      navigate(0)
    } 
      
    let cookie = reactLocalStorage.get('cookie')
    const requestOptions = {
        method: 'GET',
        headers: { 
        'x-access-token': cookie},
    };

    const { data: ptypes, error, isPending} = useFetch(`/ptype/` , requestOptions)

    return ( 
        <div className="blog-list">

<Row className="mb-3">

<Form.Group as={Col}  >
<Form.Label>Type of investment</Form.Label >
<Form.Select aria-label="Default select example" onChange={(e) => setPtypeID(e.target.value)}>
{ptypes && ptypes.map((ptype, i) => {
    return (
        <option value={ptype.id}>{JSON.stringify(ptype.name)}</option>
    )
    })} 
</Form.Select>

            </Form.Group><Form.Group as={Col} controlId="formGridEmail">
<Form.Label>Name of Country</Form.Label>
<Form.Control  value={country} onChange={(e) => setCountry(e.target.value)}/>
</Form.Group>
<Form.Group as={Col} controlId="formGridEmail">
<Form.Label>Name of State</Form.Label>
<Form.Control  value={state} onChange={(e) => setState(e.target.value)}/>
</Form.Group>
</Row>
<Row className="mb-3">
<Form.Group as={Col} controlId="formGridEmail">
<Form.Label>Name of Street</Form.Label>
<Form.Control  value={street} onChange={(e) => setStreet(e.target.value)}/>
</Form.Group>
<Form.Group as={Col} controlId="formGridEmail">
<Form.Label>Number of address</Form.Label>
<Form.Control  value={num} onChange={(e) => setNum(e.target.value)}/>
</Form.Group>
<Form.Group as={Col} controlId="formGridEmail">
<Form.Label>Apt number (optional)</Form.Label>
<Form.Control  value={apt} onChange={(e) => setApt(e.target.value)}/>
</Form.Group>
</Row>


<Button variant="primary" onClick={SendApi}>
        Submit
      </Button>
   </div>   
     );
}
 
export default CreateProperty;