import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import DatePicker from 'react-datepicker';

const Investor = ({investor, setInvestor,personId, payoutFrequency, live_info=false}) => {


  function changeDate(data) {
    var today2 = new Date(data);

    let newDate = new Date(data);
    return newDate
  }

    function handleInvestorChange(e, mortgageInfoType) {
        let keyvalue = mortgageInfoType.toString()
        const newInvestor= Object.assign(investor[personId],{[`${keyvalue}`]:e})
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
              <Form.Control  value={investor[personId].name}  onChange={(e) => handleInvestorChange(e.target.value,'name')}/>
            </Form.Group>
{ live_info   &&        <Form.Group as={Col} >
              <Form.Label>Email Adrress</Form.Label>
              <Form.Control  value={investor[personId].email}  onChange={(e) => handleInvestorChange(e.target.value,'email')} />
            </Form.Group>}
            <Form.Group as={Col} >
              <Form.Label>Amount Invested</Form.Label>
              <Form.Control  value={investor[personId].amount_invested}  onChange={(e) => handleInvestorChange(e.target.value,'amount_invested')} />
            </Form.Group>
            <Form.Group as={Col}  >
              <Form.Label>Country of Origin</Form.Label >
              <Form.Control  value={investor[personId].country_of_origin}  onChange={(e) => handleInvestorChange(e.target.value,'country_of_origin')}/>
            </Form.Group>
            <Form.Group as={Col}  >
              <Form.Label>Tax Withholding percentage</Form.Label >
              <Form.Control  value={investor[personId].tax_percentage_withheld}   onChange={(e) => handleInvestorChange(e.target.value,'tax_percentage_withheld')}/>
            </Form.Group>
            {/* <Form.Group as={Col}  >
              <Form.Label>Year Bought In</Form.Label > */}
              {/* <Form.Control  value={investor[personId].year_bought_in}   onChange={(e) => handleInvestorChange(e.target.value,'year_bought_in')}/> */}
              {/* <Form.Select aria-label="Default select example" onChange={(e) => handleInvestorChange(e.target.value,'year_bought_in')}> */}
          {/* {payoutFrequency.transactions && payoutFrequency.transactions.map((transaction, i) => {
                    return (
                      <option value={i}>{JSON.stringify(transaction.date)}</option>
                    )
      })}  */}
        {/* </Form.Select>

            </Form.Group> */}
            <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Date Bought in</Form.Label>
            <DatePicker selected={changeDate(investor[personId].date_funds_recieved)}  onChange={(e) => handleInvestorChange(e,'date_funds_recieved')}  showYearDropdown
      scrollableMonthYearDropdown />

          </Form.Group> 

            </Row>
      </div>

 
    )
}
 
export default Investor;