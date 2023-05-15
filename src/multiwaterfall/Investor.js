import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
const Investor = ({waterfall_info, setWaterfallInfo}) => {
  const addInvestor = () => {

    const newInvestor =  
    [... waterfall_info.investors,
      {'name': "gary",
                "email": "yahoo@all.com",
                "country_of_origin": "US",
                "tax_percentage_withheld": .06,
                "amount_invested": 100,
                "year_bought_in": 1}
]
setWaterfallInfo(prevState => ({
  ...prevState,
  ['investors'] : newInvestor
}))
};


  const deleteInvestor = e => {
      const newInvestors =  waterfall_info.investors.filter((s,i)=>(i != e.target.id))
      
      setWaterfallInfo(prevState => ({
        ...prevState,
        ['investors'] : newInvestors
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
      let updatedList = waterfall_info.investors.map((item, i) => 
        {
          if (i == index){
            return {...item, [`${keyvalue}`]: e.target.value}; //gets everything that was already in item, and updates "done"
          }
          return item; // else return unmodified item 
        });
        setWaterfallInfo(prevState => ({
          ...prevState,
          ['investors'] : updatedList
        }))
    }
            return ( 
        <div > 
    <Button  variant="primary" onClick={addInvestor}>Add more Investors (advanced)</Button>
      {waterfall_info.investors.map((item, i) => {
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