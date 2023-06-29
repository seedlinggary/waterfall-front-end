import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const Fee = ({fee, setFee}) => {



    const addFee = () => {
        setFee(s => {
          const lastId = s[s.length - 1].id;
          return [
            ...s,
            {
                value: {'year' : 1000,
                'before_what_hurdle' : 1,
                'who_gets_this_fee' : 'NEED AN INPUT',
                'percentage_or_cash' : 324,
                'type_transaction' : 'cash',
                'type_of_fee' : 'hurdle'},
                    type: ""
            }
          ];
        });
      };
      const deleteFee = e => {
        setFee(hurdles=> hurdles.filter((s,i)=>(i != e.target.id)))
          }

      const handleFeeYearChange = e => {
        e.preventDefault();
        let index = e.target.id;
        if (e.target.id > 0){
            index = e.target.id
        }else{
            index = 0
        }
        setFee(s => {
          const newFee = s.slice();
          newFee[index].value.year = e.target.value;
    
          return newFee;
        });
      };
      const handleFeeHurdleChange = e => {
        e.preventDefault();
        let index = e.target.id;
        if (e.target.id > 0){
            index = e.target.id
        }else{
            index = 0
        }
        setFee(s => {
          const newFee = s.slice();
          newFee[index].value.before_what_hurdle = e.target.value;
    
          return newFee;
        });
      };
      const handleFeeWhomChange = e => {
        e.preventDefault();
        let index = e.target.id;
        if (e.target.id > 0){
            index = e.target.id
        }else{
            index = 0
        }
        setFee(s => {
          const newFee = s.slice();
          newFee[index].value.who_gets_this_fee = e.target.value;
    
          return newFee;
        });
      };
      const handleFeePCChange = e => {
        e.preventDefault();
        let index = e.target.id;
        if (e.target.id > 0){
            index = e.target.id
        }else{
            index = 0
        }
        setFee(s => {
          const newFee = s.slice();
          newFee[index].value.percentage_or_cash = e.target.value;
    
          return newFee;
        });
      };
      const handleFeeTransactionChange = e => {
        e.preventDefault();
        let index = e.target.id;
        if (e.target.id > 0){
            index = e.target.id
        }else{
            index = 0
        }
        setFee(s => {
          const newFee = s.slice();
          newFee[index].value.type_transaction = e.target.value;
    
          return newFee;
        });
      };
      const handleFeeTypeChange = e => {
        e.preventDefault();
        let index = e.target.id;
        if (e.target.id > 0){
            index = e.target.id
        }else{
            index = 0
        }
        setFee(s => {
          const newFee = s.slice();
          newFee[index].value.type_of_fee = e.target.value;
    
          return newFee;
        });
      };



    
       
            return ( 
        <div > 

    
    <Button  variant="primary" onClick={addFee}>Add more Fees (advanced)</Button>
      {fee.map((item, i) => {
                    return (
                    
        <div key={i}>
               <h3>Fee {i+ 1}:
                {/* <Button variant="danger" id={i} onClick={deleteFee}>
            Delete Fee
          </Button> */}
           </h3>
                  <Row className="mb-3">
                  <Form.Group as={Col} >
      <Form.Label>Type of fee</Form.Label>
      <Form.Select aria-label="Default select example" id={i} onChange={handleFeeTypeChange}>
            <option value={item.value.type_of_fee}>{item.value.type_of_fee} </option>
            <option value="hurdle">hurdle </option>
            <option value="capital">capital</option>
            <option value="catch_up">catch_up</option>
        </Form.Select>
        </Form.Group>
        {item.value.type_of_fee === "hurdle" && <>
                  <Form.Group as={Col}  >
              <Form.Label>What year would you like the fee to come in? Type x for all years.</Form.Label >
              <Form.Control  placeholder={item.value.year} id={i}  onChange={handleFeeYearChange}/>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Before which Hurdle?</Form.Label>
              <Form.Control  placeholder={item.value.before_what_hurdle}  id={i} onChange={handleFeeHurdleChange}/>
            </Form.Group>
            </>
      }
            <Form.Group as={Col} >
              <Form.Label>Name of company that recieves this fee.</Form.Label>
              <Form.Control  placeholder={item.value.who_gets_this_fee} id={i} onChange={handleFeeWhomChange} />
            </Form.Group>
            <Form.Group as={Col}  >
              <Form.Label>Type in your amount of cash or percentage amount</Form.Label >
              <Form.Control  placeholder={item.value.percentage_or_cash} id={i}  onChange={handleFeePCChange}/>
            </Form.Group>

            <Form.Group as={Col} >
      <Form.Label>Choose Cash or Percentage</Form.Label>
      <Form.Select aria-label="Default select example" id={i} onChange={handleFeeTransactionChange}>
      
            <option value={item.value.type_transaction}>{item.value.type_transaction} </option>
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