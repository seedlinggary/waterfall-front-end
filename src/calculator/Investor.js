import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
const Investor = ({investora, setInvestorA}) => {

    const addInvestorInput = () => {
        setInvestorA(s => {
          const lastId = s[s.length - 1].id;
          return [
            ...s,
            {
                value: {'name': "gary",
                "email": "yahoo@all.com",
                "country_of_origin": "US",
                "tax_percentage_withheld": .06,
                "amount_invested": 100,
                "year_bought_in": 1},
                    type: ""
            }
          ];
        });
      };

      const handleInvestorNameChange = e => {
        e.preventDefault();
        let index = e.target.id;
        if (e.target.id > 0){
            index = e.target.id
        }else{
            index = 0
        }
        setInvestorA(s => {
          const newArr = s.slice();
          newArr[index].value.name = e.target.value;
          newArr[index].value.email = e.target.value;
    
          return newArr;
        });
      }; const handleInvestorEmailChange = e => {
        e.preventDefault();
        let index = e.target.id;
        if (e.target.id > 0){
            index = e.target.id
        }else{
            index = 0
        }
        setInvestorA(s => {
          const newArr = s.slice();
          newArr[index].value.email = e.target.value;
    
          return newArr;
        });
      }; const handleInvestorCountryChange = e => {
        e.preventDefault();
        let index = e.target.id;
        if (e.target.id > 0){
            index = e.target.id
        }else{
            index = 0
        }
        setInvestorA(s => {
          const newArr = s.slice();
          newArr[index].value.country_of_origin = e.target.value;
    
          return newArr;
        });
      }; const handleInvestorWithheldChange = e => {
        e.preventDefault();
        let index = e.target.id;
        if (e.target.id > 0){
            index = e.target.id
        }else{
            index = 0
        }
        setInvestorA(s => {
          const newArr = s.slice();
          newArr[index].value.tax_percentage_withheld = e.target.value;
    
          return newArr;
        });
      }; const handleInvestorAmountInvestedChange = e => {
        e.preventDefault();
        let index = e.target.id;
        if (e.target.id > 0){
            index = e.target.id
        }else{
            index = 0
        }
        setInvestorA(s => {
          const newArr = s.slice();
          newArr[index].value.amount_invested = e.target.value;
    
          return newArr;
        });
      };
    
            return ( 
        <div > 
      

    <Button  variant="primary" onClick={addInvestorInput}>Add more Investors (advanced)</Button>
      {investora.map((item, i) => {
                    return (
                        
        <div>
                  <Row className="mb-3">
                  <Form.Group as={Col}  >
              <Form.Label>Name</Form.Label >
              <Form.Control  placeholder={item.value.name} id={i}  onChange={handleInvestorNameChange}/>
            </Form.Group>
            {/* <Form.Group as={Col}>
              <Form.Label>Email</Form.Label>
              <Form.Control  placeholder={item.value.email}  id={i} onChange={handleInvestorEmailChange}/>
            </Form.Group> */}
            <Form.Group as={Col} >
              <Form.Label>Amount Invested</Form.Label>
              <Form.Control  placeholder={item.value.amount_invested} id={i} onChange={handleInvestorAmountInvestedChange} />
            </Form.Group>
            <Form.Group as={Col}  >
              <Form.Label>Country of Origin</Form.Label >
              <Form.Control  placeholder={item.value.country_of_origin} id={i}  onChange={handleInvestorCountryChange}/>
            </Form.Group>
            <Form.Group as={Col}  >
              <Form.Label>Tax Withholding percentage</Form.Label >
              <Form.Control  placeholder={item.value.tax_percentage_withheld} id={i}  onChange={handleInvestorWithheldChange}/>
            </Form.Group>


            </Row>
      </div>
                    )
      })} 
             
      </div>   
    )
}
 
export default Investor;