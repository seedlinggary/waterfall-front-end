import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
const Investor = ({waterfall, setWaterfall,personId}) => {
  const addInvestor = () => {

    const newInvestor =  
    [...waterfall[personId].investors,
      {'name': "gary",
                "email": "yahoo@all.com",
                "country_of_origin": "US",
                "tax_percentage_withheld": .06,
                "amount_invested": 100,
                "year_bought_in": 1}
]
const newWaterfall= Object.assign(waterfall[personId],{investors:newInvestor})
console.log(newWaterfall)
console.log(waterfall[personId].investors)
setWaterfall(prevState => ({
  ...prevState,
  [`${personId}`]: newWaterfall
}))
console.log(waterfall)
};


  const deleteInvestor = e => {
      const newInvestors =  waterfall[personId].investors.filter((s,i)=>(i != e.target.id))
      const newWaterfall= Object.assign(waterfall[personId],{investors:newInvestors})
      setWaterfall(prevState => ({
        ...prevState,
        [`${personId}`]: newWaterfall
      }))
        }


    function handleInvestorChange(e, mortgageInfoType) {
      let index = e.target.id;
        if (e.target.id > 0){
            index = e.target.id
        }else{
            index = 0
        }
      let keyvalue = mortgageInfoType.toString()
      let updatedList = waterfall[personId].investors.map((item, i) => 
        {
          if (i == index){
            return {...item, [`${keyvalue}`]: e.target.value}; //gets everything that was already in item, and updates "done"
          }
          return item; // else return unmodified item 
        });
        const newWaterfall= Object.assign(waterfall[personId],{investors:updatedList})
        setWaterfall(prevState => ({
          ...prevState,
           [`${personId}`]: newWaterfall
        }))
    }
            return ( 
        <div > 
    <Button  variant="primary" onClick={addInvestor}>Add more Investors (advanced)</Button>
      {waterfall[personId].investors.map((item, i) => {
                    return (
                        
        <div>
                     { <h3>Investor {i + 1}: <Button variant="danger" id={i} onClick={deleteInvestor}>
            Delete Investor
          </Button> </h3>}
                  <Row className="mb-3">
                  <Form.Group as={Col}  >
              <Form.Label>Name</Form.Label >
              <Form.Control  value={item.name} id={i}  onChange={(e) => handleInvestorChange(e,'name')}/>
            </Form.Group>
            <Form.Group as={Col} >
              <Form.Label>Amount Invested</Form.Label>
              <Form.Control  value={item.amount_invested} id={i} onChange={(e) => handleInvestorChange(e,'amount_invested')} />
            </Form.Group>
            <Form.Group as={Col}  >
              <Form.Label>Country of Origin</Form.Label >
              <Form.Control  value={item.country_of_origin} id={i}  onChange={(e) => handleInvestorChange(e,'country_of_origin')}/>
            </Form.Group>
            <Form.Group as={Col}  >
              <Form.Label>Tax Withholding percentage</Form.Label >
              <Form.Control  value={item.tax_percentage_withheld} id={i}  onChange={(e) => handleInvestorChange(e,'tax_percentage_withheld')}/>
            </Form.Group>
            </Row>
      </div>
                    )
      })} 
             
      </div>   
    )
}
 
export default Investor;