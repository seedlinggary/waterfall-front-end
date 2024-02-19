import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const Fee = ({waterfall, setWaterfall,personId}) => {

  const addFee = () => {

    const newfee =  
    [... waterfall[personId].fees,
      {'year' : 1000,
                'before_what_hurdle' : 1,
                'who_gets_this_fee' : 'NEED AN INPUT',
                'percentage_or_cash' : 324,
                'type_transaction' : 'cash',
                'type_of_fee' : 'hurdle'}
]
const newWaterfall= Object.assign(waterfall[personId],{fees:newfee})
setWaterfall(prevState => ({
  ...prevState,
  [`${personId}`]: newWaterfall
}))
};


  const deletefee = e => {
      const newFee =  waterfall[personId].fees.filter((s,i)=>(i != e.target.id))
      
      const newWaterfall= Object.assign(waterfall[personId],{fees:newFee})
    setWaterfall(prevState => ({
      ...prevState,
      [`${personId}`]: newWaterfall
    }))
    };


    function handleFeeChange(e, mortgageInfoType) {
      let index = e.target.id;
        if (e.target.id > 0){
            index = e.target.id
        }else{
            index = 0
        }
      let keyvalue = mortgageInfoType.toString()
      let updatedList = waterfall[personId].fees.map((item, i) => 
        {
          if (i == index){
            return {...item, [`${keyvalue}`]: e.target.value}; //gets everything that was already in item, and updates "done"
          }
          return item; // else return unmodified item 
        });
        const newWaterfall= Object.assign(waterfall[personId],{fees:updatedList})
        setWaterfall(prevState => ({
          ...prevState,
          [`${personId}`]: newWaterfall
        }))
        };
       
            return ( 
        <div > 

    
{!waterfall[personId].saved_in_db && <Button  variant="primary" onClick={addFee}>Add more Fees (advanced)</Button>}
      {waterfall[personId] && waterfall[personId].fees && waterfall[personId].fees.map((item, i) => {
                    return (
                    
        <div>
               <h3>Fee {i+ 1}:
                {/* <Button variant="danger" id={i} onClick={deleteFee}>
            Delete Fee
          </Button> */}
           </h3>
                  <Row className="mb-3">
                  <Form.Group as={Col} >
      <Form.Label>Type of fee</Form.Label>
      <Form.Select disabled={waterfall[personId].saved_in_db} aria-label="Default select example" id={i} onChange={(e) => handleFeeChange(e,'type_of_fee')}>
            <option value={item.type_of_fee}>{item.type_of_fee} </option>
            <option value="hurdle">hurdle </option>
            <option value="capital">capital</option>
            <option value="catch_up">catch_up</option>
        </Form.Select>
        </Form.Group>
        {item.type_of_fee === "hurdle" && <>
                  <Form.Group as={Col}  >
              <Form.Label>What year would you like the fee to come in? Type x for all years.</Form.Label >
              <Form.Control disabled={waterfall[personId].saved_in_db} placeholder={item.year} id={i}  onChange={(e) => handleFeeChange(e,'year')}/>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Before which Hurdle?</Form.Label>
              <Form.Control disabled={waterfall[personId].saved_in_db} placeholder={item.before_what_hurdle}  id={i} onChange={(e) => handleFeeChange(e,'before_what_hurdle')}/>
            </Form.Group>
            </>
      }
            <Form.Group as={Col} >
              <Form.Label>Name of company that recieves this fee.</Form.Label>
              <Form.Control disabled={waterfall[personId].saved_in_db} placeholder={item.who_gets_this_fee} id={i} onChange={(e) => handleFeeChange(e,'who_gets_this_fee')} />
            </Form.Group>
            <Form.Group as={Col}  >
              <Form.Label>Type in your amount of cash or percentage amount</Form.Label >
              <Form.Control disabled={waterfall[personId].saved_in_db} placeholder={item.percentage_or_cash} id={i}  onChange={(e) => handleFeeChange(e,'percentage_or_cash')}/>
            </Form.Group>

            <Form.Group as={Col} >
      <Form.Label>Choose Cash or Percentage</Form.Label>
      <Form.Select disabled={waterfall[personId].saved_in_db} aria-label="Default select example" id={i} onChange={(e) => handleFeeChange(e,'type_transaction')}>
      
            <option value={item.type_transaction}>{item.type_transaction} </option>
            <option value="cash">cash </option>
            <option value="percentage">percentage</option>
        </Form.Select>
        </Form.Group>


            </Row>
      </div>
                    )
      })} 

      </div>   
    )
}
 
export default Fee;