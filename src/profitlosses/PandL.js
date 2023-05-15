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


const PandL = ({pAndLs,setPandLs, PandLID}) => {
    const navigate = useNavigate()
    
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const [startDate, setStartDate] = useState(today)
    const [years, setYears] = useState(4)
    const [startingAmount, setStartingAmount] = useState(2000)
    const [mulitplicationAmount, setMulitplicationAmount] = useState(.02)
    const [dateMulitplicationAmount, setDateMulitplicationAmount] = useState(1)
    const [typeDateMultiplicationAMount, setTypeDateMulitplicationAmount] = useState("year")
  





    function addDateMultiplication(datesumTotal) {
        if (typeDateMultiplicationAMount == 'year'){
          var newdatesumTotal  = new Date(datesumTotal.setFullYear(datesumTotal.getFullYear() + dateMulitplicationAmount));
       } else if(typeDateMultiplicationAMount == 'quater') {
        var newdatesumTotal  = new Date(datesumTotal.setMonth(datesumTotal.getMonth() + (dateMulitplicationAmount * 3)));
       } else if(typeDateMultiplicationAMount == 'month') {
        var newdatesumTotal  = new Date(datesumTotal.setMonth(datesumTotal.getMonth() + dateMulitplicationAmount));
       } else if(typeDateMultiplicationAMount == 'day') {
        var newdatesumTotal  = new Date(datesumTotal.setDate(datesumTotal.getDate() + dateMulitplicationAmount));
       }
           return newdatesumTotal;
      }
        const addMultiYears = e =>{
          let sumTotal = startingAmount
          let startingamoundate = new Date(startDate.setFullYear(startDate.getFullYear() + 0))
          let datesumTotal = new Date(startDate.setFullYear(startDate.getFullYear() + 0))

          const newProfit =  
            [... pAndLs[PandLID].transactions,
            {
                'amount' : startingAmount,
                        'date': startingamoundate}]
          for (let i = 0; i < years  ; i++) {
            sumTotal = sumTotal * (Number(mulitplicationAmount) + 1)
            newProfit.push({
                'amount' : sumTotal,
                'date': datesumTotal})
            datesumTotal = addDateMultiplication(datesumTotal)
            }
          let removed = newProfit.pop();
          setPandLs(s => {
            const newPandL = s.slice();
            newPandL[PandLID].transactions = newProfit
            return newPandL;
        });        }
        const deleteYear = e => {
          const newtransactions =  pAndLs[PandLID].transactions.filter((s,i)=>(i != e.target.id))
         
          setPandLs(s => {
              const newPandL = s.slice();
              newPandL[PandLID].transactions = newtransactions
              return newPandL;
          });
  
            }
    






    function handlePandLInfoChange(data, mortgageInfoType) {
        let keyvalue = mortgageInfoType.toString()
          setPandLs(s => {
            const newPandL = s.slice();
            newPandL[PandLID][`${keyvalue}`] = data;
      
            return newPandL;
          });

      }
      const addTransaction = () => {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        const newtransactions =  
        [... pAndLs[PandLID].transactions,
        {
            'amount' : 1000,
                      'date' : today,
        }]
        setPandLs(s => {
            const newPandL = s.slice();
            newPandL[PandLID].transactions = newtransactions
            return newPandL;
        });
      };

      function handleTransactionChange(data, index, mortgageInfoType) {
        let keyvalue = mortgageInfoType.toString()

        let updatedList = pAndLs[PandLID].transactions.map((item, i) => 
          {
            if (i == index){
              return {...item, [`${keyvalue}`] : data}; //gets everything that was already in item, and updates "done"
            }
            return item; // else return unmodified item 
          });

      setPandLs(s => {
          const newMortgages = s.slice();
          newMortgages[PandLID].transactions = updatedList;
    
          return newMortgages;
        });
        console.log(pAndLs)
      }; 
            return ( 
                <> 
                        <Row className="mb-3">
        <hr></hr>
        
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>What is this payment for?</Form.Label>
            <Form.Control  value={pAndLs[PandLID].transaction_name} onChange={(e) => handlePandLInfoChange(e.target.value,'transaction_name')} />
          </Form.Group>        

          <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Type of hurdle</Form.Label>
        <Form.Select aria-label="Default select example"  onChange={(e) => handlePandLInfoChange(e.target.value,'transaction_type')}>
              <option value="soft_costs">Soft Costs </option>
            <option value="hard_costs">Hard Costs</option>
            <option value="marketing">Marketing Costs</option>
            <option value="g_a">G&A</option>
            <option value="closing_costs">Closing Costs</option>
            <option value="recurring_costs">Recurring Costs</option>
            <option value="miscellaneous">Miscellaneous Costs</option>
            <option value="income">Income</option>          </Form.Select>
          </Form.Group>
          <br></br>







          <hr></hr>
          <p>Add in multiple transactions at once</p>
          <Row className="mb-3">

        <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Start Date of given transaction</Form.Label>
             <DatePicker selected={startDate}  onChange={(e) => setStartDate(e)}  />
          </Form.Group> 
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>{typeDateMultiplicationAMount}s would like to add</Form.Label>
            <Form.Control  value={years} onChange={(e) => setYears(e.target.value)} />
          </Form.Group>        
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>First {typeDateMultiplicationAMount }s amount</Form.Label>
            <Form.Control  value={startingAmount.toLocaleString()} onChange={(e) => setStartingAmount(e.target.value)} />
          </Form.Group>
           
        </Row>
      
        <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Amount percentage increase per {typeDateMultiplicationAMount }</Form.Label>
            <Form.Control  value={mulitplicationAmount} onChange={(e) => setMulitplicationAmount(e.target.value)} />
          </Form.Group> 
        <Form.Group as={Col} >
      <Form.Label>How often should profit be given</Form.Label>
      <Form.Select aria-label="Default select example"   onChange={(e) => setTypeDateMulitplicationAmount(e.target.value)}>
            <option value="year">Year </option>
            <option value="month">Month</option>
            <option value="quater">Quater</option>
            <option value="day">Days</option>
        </Form.Select>
        </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>How many {typeDateMultiplicationAMount}s between each transaction?</Form.Label>
            <Form.Control  value={dateMulitplicationAmount} onChange={(e) => setDateMulitplicationAmount(e.target.value)} />
          </Form.Group> 
          
        </Row>


        <Row>
      <Col md={{ span: 2, offset: 3 }}>   
      <Button  variant="outline-primary" onClick={addMultiYears}>add multiple {typeDateMultiplicationAMount }s</Button>


      
      </Col>  <Col md={{ span: 2, offset: 2 }}>   
      <Button  variant="outline-primary" onClick={addTransaction}>add one more transaction</Button>

    </Col>  
               </Row>
   




          {pAndLs[PandLID].transactions && pAndLs[PandLID].transactions.map((transaction, i) => {
                    return (
                        
        <div key={i}>
                  <Row className="mb-3">
              <Form.Group as={Col}  >
              <Form.Label> {i + 1}'s worth : <Button variant="danger" id={i} onClick={deleteYear}>
            Delete {typeDateMultiplicationAMount }
          </Button> </Form.Label >
              <Form.Control  value={transaction.amount.toLocaleString()} id={i}  onChange={(e) => handleTransactionChange(e.target.value, i,'amount')}/>
            </Form.Group>
            
            <Form.Group as={Col} controlId="formGridEmail" >
            <Form.Label>Date of given transaction</Form.Label>
            <DatePicker selected={transaction.date} onChange={(date) => handleTransactionChange(date, i,'date')} />

          </Form.Group>  
          
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
 
export default PandL;