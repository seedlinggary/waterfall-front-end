import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Container from 'react-bootstrap/Container';
import DatePicker from 'react-datepicker';


const PayoutFrequency = ({payoutFrequency,setPayoutFrequency}) => {
    const navigate = useNavigate()
    
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const [years, setYears] = useState(4)
    const [dateMulitplicationAmount, setDateMulitplicationAmount] = useState(1)
  





    function addDateMultiplication(datesumTotal) {
        if (payoutFrequency.payout_frequency == 'year'){
          var newdatesumTotal  = new Date(datesumTotal.setFullYear(datesumTotal.getFullYear() + parseInt(dateMulitplicationAmount)));
       } else if(payoutFrequency.payout_frequency == 'quarter') {
        var newdatesumTotal  = new Date(datesumTotal.setMonth(datesumTotal.getMonth() + (parseInt(dateMulitplicationAmount) * 3)));
       } else if(payoutFrequency.payout_frequency == 'month') {
        var newdatesumTotal  = new Date(datesumTotal.setMonth(datesumTotal.getMonth() + parseInt(dateMulitplicationAmount)));
       } else if(payoutFrequency.payout_frequency == 'day') {
        var newdatesumTotal  = new Date(datesumTotal.setDate(datesumTotal.getDate() + parseInt(dateMulitplicationAmount)));
       }
           return newdatesumTotal;
      }
        const addMultiYears = e =>{
          let sumTotal = payoutFrequency.startingAmount

          let startingamoundate = new Date(payoutFrequency.start_date.setFullYear(payoutFrequency.start_date.getFullYear() + 0))
          let datesumTotal = new Date(payoutFrequency.start_date.setFullYear(payoutFrequency.start_date.getFullYear() + 0))
            console.log(payoutFrequency.payout_frequency)
          const newProfit =  
            [... payoutFrequency.transactions,
            {   'date': startingamoundate,
            'saving_amount' : 0,}]

          for (let i = 0; i < years  ; i++) {
            newProfit.push({
                'date': datesumTotal,
                'saving_amount' : sumTotal,})
            sumTotal = sumTotal * (Number(payoutFrequency.mulitplicationAmount) + 1)  
            datesumTotal = addDateMultiplication(datesumTotal)
            }
          let removed = newProfit.pop();
          console.log(newProfit)
          setPayoutFrequency(prevState => ({
            ...prevState,
             [`transactions`]: newProfit
          }));
    
    
    }
        const deleteYear = e => {
          const newtransactions =  payoutFrequency.transactions.filter((s,i)=>(i != e.target.id))
         
          setPayoutFrequency(prevState => ({
            ...prevState,
             [`transactions`]: newtransactions
          }));  
            }

    function handlePandLInfoChange(data, mortgageInfoType) {
        let keyvalue = mortgageInfoType.toString()
          setPayoutFrequency(s => {
            const newPandL = s.slice();
            newPandL[`${keyvalue}`] = data;
      
            return newPandL;
          });

      }
      const addTransaction = () => {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        const newtransactions =  
        [... payoutFrequency.transactions,
        {
            'amount' : 1000,
                      'date' : today,
        }]
        setPayoutFrequency(s => {
            const newPandL = s.slice();
            newPandL.transactions = newtransactions
            return newPandL;
        });
      };
      function handlePayoutChange(data, mortgageInfoType) {
        let keyvalue = mortgageInfoType.toString()
        setPayoutFrequency(prevState => ({
            ...prevState,
             [`${keyvalue}`]: data
          }));
      
      }
  
      function handleTransactionChange(data, index, mortgageInfoType) {
        let keyvalue = mortgageInfoType.toString()

        let updatedList = payoutFrequency.transactions.map((item, i) => 
          {
            if (i == index){
              return {...item, [`${keyvalue}`] : data}; //gets everything that was already in item, and updates "done"
            }
            return item; // else return unmodified item 
          });
          setPayoutFrequency(prevState => ({
            ...prevState,
             [`transactions`]: updatedList
          }));

      }; 
            return ( 
                <> 

<Row className="mb-3">
                   <Form.Group as={Col} >
      <Form.Label>Frequency of profit</Form.Label>
      <Form.Select aria-label="Default select example"   onChange={(e) => handlePayoutChange(e.target.value,'payout_type')} >
            <option value={payoutFrequency.payout_type}>{payoutFrequency.payout_type } </option>
            <option value="Year">Year </option>
            <option value="Month">Month</option>
            <option value="Quarter">Quarter</option>
            <option value="Personalize">Personalize</option>
        </Form.Select>
        </Form.Group>
    
        </Row> 
                        <Row className="mb-3">
    

          <hr></hr>
          <p>Frequency of paying back investors</p>
          <Row className="mb-3">

        <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Start Date of given transaction</Form.Label>
             <DatePicker selected={payoutFrequency.start_date}  onChange={(e) => handlePayoutChange(e,'start_date')}  />
          </Form.Group> 
       
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>First {payoutFrequency.payout_frequency }s Savings amount.</Form.Label>
            <Form.Control  value={payoutFrequency.startingAmount.toLocaleString()} onChange={(e) => handlePayoutChange(e.target.value, 'startingAmount')} />
          </Form.Group>
           
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Amount percentage increase per {payoutFrequency.payout_frequency } for savings.</Form.Label>
            <Form.Control  value={payoutFrequency.mulitplicationAmount.toLocaleString()} onChange={(e) => handlePayoutChange(e.target.value, 'mulitplicationAmount')} />
          </Form.Group> 

        </Row>
      
        <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>{payoutFrequency.payout_frequency}s would like to add</Form.Label>
            <Form.Control  value={years} onChange={(e) => setYears(e.target.value)} />
          </Form.Group>        

        <Form.Group as={Col} >
            
      <Form.Label>How often should profit be given</Form.Label>
      <Form.Select aria-label="Default select example"   onChange={(e) => handlePayoutChange(e.target.value,'payout_frequency')}>
            <option value="year">Year </option>
            <option value="month">Month</option>
            <option value="quarter">Quarter</option>
            <option value="day">Days</option>
        </Form.Select>
        </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>How many {payoutFrequency.payout_frequency}s between each transaction?</Form.Label>
            <Form.Control  value={dateMulitplicationAmount} onChange={(e) => setDateMulitplicationAmount(e.target.value)} />
          </Form.Group> 
          
        </Row>


        <Row>
      <Col md={{ span: 2, offset: 5 }}>   
      <Button  variant="outline-primary" onClick={addMultiYears}>Add multiple {payoutFrequency.payout_frequency }s</Button>


      
      </Col>      </Row>
   




          {payoutFrequency.transactions && payoutFrequency.transactions.map((transaction, i) => {
                    return (
                        
        <div key={i}>
                  <Row className="mb-3">
        { i == 0 && <><h5> Start tracking Investment from this date  <Button  id={i} variant="outline-danger" onClick={deleteYear}>delete year</Button></h5>
        
        <Form.Group as={Col} controlId="formGridEmail" >
            <Form.Label>Date of given return</Form.Label>
            <DatePicker selected={transaction.date} onChange={(date) => handleTransactionChange(date, i,'date')} />
            </Form.Group> 
        
         </>}
           { i != 0 && <><h5>Return {i} <Button  id={i} variant="outline-danger" onClick={deleteYear}>delete year</Button></h5>
            <Form.Group as={Col} controlId="formGridEmail" >
            <Form.Label>Date of given return</Form.Label>
            <DatePicker selected={transaction.date} onChange={(date) => handleTransactionChange(date, i,'date')} />
            </Form.Group> 
            <Form.Group as={Col}  >
              <Form.Label> How much to save in case of emergency per {payoutFrequency.payout_frequency}. </Form.Label >
              <Form.Control  value={transaction.saving_amount.toLocaleString()} id={i}  onChange={(e) => handleTransactionChange(e.target.value, i,'saving_amount')}/>
            </Form.Group>
            </>}
          
          
            </Row>
      </div>
                    )
      })} 
        </Row>

              <Container>
          </Container>
              </>
    )
}
 
export default PayoutFrequency;