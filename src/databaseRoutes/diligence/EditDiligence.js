

import React, { useState,useEffect } from 'react'
import apiRequest from '../../ApiRequest'
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {reactLocalStorage} from 'reactjs-localstorage';
import { useNavigate } from "react-router-dom";
import useFetch from '../../useFetch';
import DatePicker from 'react-datepicker';

let base64 = require('base-64');

const EditDiligence = ({deal,company,diligence, propertyVariables}) => {
    const [investmentLength, setInvestmentLength] = useState(diligence.length_of_investment)
    const [numUnits, setNumUnits] = useState(diligence.number_of_units)
    const [gsf, setGSF] = useState(diligence.gsf)
    const [nsf, setNSF] = useState(diligence.nsf)
    const [occupancyRate, setOccupancyRate] = useState(diligence.occupancy_rate)
    const [myPropertyVariables, setMyPropertyVariables] = useState(propertyVariables.map((propertyVariable, i) =>  ({'name': propertyVariable.name, 'amount': 500})))
    const [dealStartDate, setStartDate] = useState(new Date(diligence.deal_start_date))

    const navigate = useNavigate()
  
    function InitialPropertyVariables() {
      let newPropertyVariables = propertyVariables.map((propertyVariable, i) =>  ({'name': propertyVariable.name, 'amount': 500}))
        
        return newPropertyVariables

    }
    function handlePropertyVariableChange(data, mortgageInfoType, i) {
      let keyvalue = mortgageInfoType.toString()
      setMyPropertyVariables(s => {
          const newExpenses = s.slice();
          newExpenses[i][`${keyvalue}`] = data;
    
          return newExpenses;
        });

    }

    const SendApi = (e) => {
    //   e.preventDefault();
      let info = {"length_of_investment": investmentLength,
      'number_of_units': numUnits,
      'gsf': gsf,
      'nsf':nsf,
      'occupancy_rate':occupancyRate,
      'deal_start_date': dealStartDate 
                  
                 }
      let a = apiRequest('POST',info,`/diligence/${company.id}/${deal.id}/${diligence.id}`)
      navigate(0)
    } 
      
    let cookie = reactLocalStorage.get('cookie')
    const requestOptions = {
        method: 'GET',
        headers: { 
        'x-access-token': cookie},
    };

    // const { data: ptypes, error, isPending} = useFetch(`/ptype/` , requestOptions)

    return ( 
        <div className="blog-list">

<Row className="mb-3">

<Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Prospective Purchase Date</Form.Label>
             <DatePicker selected={dealStartDate}  onChange={(e) => setStartDate(e)}  />
          </Form.Group> 
       
<Form.Group as={Col} controlId="formGridEmail">
<Form.Label>Occupancy Rate</Form.Label>
<Form.Control  value={occupancyRate} onChange={(e) => setOccupancyRate(e.target.value)}/>
</Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
<Form.Label>Length Of Investment</Form.Label>
<Form.Control  value={investmentLength} onChange={(e) => setInvestmentLength(e.target.value)}/>
</Form.Group>
{/* <Form.Group as={Col} controlId="formGridEmail">
<Form.Label>How many Units</Form.Label>
<Form.Control  value={numUnits} onChange={(e) => setNumUnits(e.target.value)}/>
</Form.Group> */}
</Row>
{/* <Row className="mb-3">
<Form.Group as={Col} controlId="formGridEmail">
<Form.Label>GSF</Form.Label>
<Form.Control  value={gsf} onChange={(e) => setGSF(e.target.value)}/>
</Form.Group>
<Form.Group as={Col} controlId="formGridEmail">
<Form.Label>NSF</Form.Label>
<Form.Control  value={nsf} onChange={(e) => setNSF(e.target.value)}/>
</Form.Group>
</Row> */}
<Row className="mb-3">
{myPropertyVariables && myPropertyVariables.map((expense, i) => {
                    return (
                        
        <div key={i}>
                  {/* <Row className="mb-3"> */}
  

          <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>{expense.name}</Form.Label>
        <Form.Control  value={expense.amount} onChange={(e) => handlePropertyVariableChange(e.target.value,'amount',i)} />


          </Form.Group>         
      </div>
                    )
                    })}
                       </Row>
<Button variant="primary" onClick={SendApi}>
        Submit
      </Button>
   </div>   
     );
}
 
export default EditDiligence;