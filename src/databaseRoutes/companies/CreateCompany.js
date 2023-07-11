

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

const CreateCompany = ({}) => {
    const [name, setName] = useState()
    const [professionID, setProfessionID] = useState(1)

    const navigate = useNavigate()

  
      
    const SendApi = (e) => {
    //   e.preventDefault();
      let info = {"name": name,
                  "profession_id": professionID,
                 }
      let a = apiRequest('POST',info,'/company')
      navigate(0)
    } 
      
      
      let cookie = reactLocalStorage.get('cookie')
      const requestOptions = {
          method: 'GET',
          headers: { 
          'x-access-token': cookie},
      };
  
      const { data: professions, error, isPending} = useFetch(`/profession/` , requestOptions)

    return ( 
        <div className="blog-list">

<Row className="mb-3">

<Form.Group as={Col} controlId="formGridEmail">
<Form.Label>Name of business</Form.Label>
<Form.Control  value={name} onChange={(e) => setName(e.target.value)}/>
</Form.Group>


<Form.Group as={Col}  >
              <Form.Label>Year Bought In</Form.Label >
              <Form.Select aria-label="Default select example" onChange={(e) => setProfessionID(e.target.value)}>
          {professions && professions.map((profession, i) => {
                    return (
                      <option value={profession.id}>{JSON.stringify(profession.name)}</option>
                    )
      })} 
        </Form.Select>

            </Form.Group>
</Row>
<Button variant="primary" onClick={SendApi}>
        Submit
      </Button>
   </div>   
     );
}
 
export default CreateCompany;