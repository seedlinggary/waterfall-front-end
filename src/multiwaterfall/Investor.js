import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
const Investor = ({investor, setInvestor,personId}) => {




    function handleInvestorChange(e, mortgageInfoType) {

        let keyvalue = mortgageInfoType.toString()
        const newInvestor= Object.assign(investor[personId],{[`${keyvalue}`]:e.target.value})
        setInvestor(prevState => ({
          ...prevState,
           [`${personId}`]: newInvestor
        }))
    }
            return ( 
        <div > 
                  <Row className="mb-3">
                  <Form.Group as={Col}  >
              <Form.Label>Name</Form.Label >
              <Form.Control  value={investor[personId].name}  onChange={(e) => handleInvestorChange(e,'name')}/>
            </Form.Group>
            <Form.Group as={Col} >
              <Form.Label>Amount Invested</Form.Label>
              <Form.Control  value={investor[personId].amount_invested}  onChange={(e) => handleInvestorChange(e,'amount_invested')} />
            </Form.Group>
            <Form.Group as={Col}  >
              <Form.Label>Country of Origin</Form.Label >
              <Form.Control  value={investor[personId].country_of_origin}  onChange={(e) => handleInvestorChange(e,'country_of_origin')}/>
            </Form.Group>
            <Form.Group as={Col}  >
              <Form.Label>Tax Withholding percentage</Form.Label >
              <Form.Control  value={investor[personId].tax_percentage_withheld}   onChange={(e) => handleInvestorChange(e,'tax_percentage_withheld')}/>
            </Form.Group>
            <Form.Group as={Col}  >
              <Form.Label>Year Bought In</Form.Label >
              <Form.Control  value={investor[personId].year_bought_in}   onChange={(e) => handleInvestorChange(e,'year_bought_in')}/>
            </Form.Group>
            </Row>
      </div>

 
    )
}
 
export default Investor;