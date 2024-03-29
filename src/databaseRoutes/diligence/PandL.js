import React, { useState,useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Container from 'react-bootstrap/Container';
import DatePicker from 'react-datepicker';
import moment from 'moment'
import apiRequest from '../../ApiRequest'

const PandL = ({pAndLs,setPandLs, PandLID, expenseTypes, bill_url, company=0,deal=0,url_id=0}) => {
    const navigate = useNavigate()
    
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    today.setHours(0, 0, 0, 0)
    const [startDate, setStartDate] = useState(today)
    const [years, setYears] = useState(4)
    const [startingAmount, setStartingAmount] = useState(2000)
    const [mulitplicationAmount, setMulitplicationAmount] = useState(.02)
    const [dateMulitplicationAmount, setDateMulitplicationAmount] = useState(1)
    const [typeDateMultiplicationAMount, setTypeDateMulitplicationAmount] = useState("year")
  



    useEffect(() => {
      if (startDate){
        startDate.setHours(0, 0, 0, 0)
      }
  }, [startDate]);

    function addDateMultiplication(datesumTotal) {
        if (typeDateMultiplicationAMount == 'year'){
          var newdatesumTotal  = new Date(datesumTotal.setFullYear(datesumTotal.getFullYear() + dateMulitplicationAmount));
       } else if(typeDateMultiplicationAMount == 'quarter') {
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
          let startingamoundate = new Date(startDate)
          let datesumTotal = new Date(startDate)
          // let startingamoundate = new Date(startDate.setFullYear(startDate.getFullYear() + 0))
          // let datesumTotal = new Date(startDate.setFullYear(startDate.getFullYear() + 0))
          // startingamoundate = create_proper_time(startingamoundate, true)
          // datesumTotal = create_proper_time(datesumTotal, true)
          // console.log(datesumTotal)
          // create_proper_time(date, false)
          const newProfit =  
            [... pAndLs[PandLID].transactions,
            // {
            //     'amount' : startingAmount,
            //     'date': datesumTotal}
              ]
                // 'date': create_proper_time(create_proper_time(datesumTotal, true),true)}]
                // console.log(newProfit)
          for (let i = 0; i < years  ; i++) {
            // let new_time = create_proper_time(datesumTotal, true,true)
            // console.log(new_time)
            // datesumTotal = addDateMultiplication(datesumTotal)
            datesumTotal.setHours(0, 0, 0, 0)
            newProfit.push({
              'amount' : sumTotal,
              'date': datesumTotal
              
            })
            datesumTotal = addDateMultiplication(startingamoundate)
            sumTotal = sumTotal * (Number(mulitplicationAmount) + 1)
          }
          // let removed = newProfit.pop();
          setPandLs(s => {
            const newPandL = s.slice();
            newPandL[PandLID].transactions = newProfit
            // console.log(newPandL)
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
        today.setHours(0, 0, 0, 0)
        // console.log(today)
        // console.log(create_proper_time(today, false))
        // console.log(create_proper_time(today, true))
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

      const SendApi = async (i) => {
        const bill = Object.assign( pAndLs[PandLID], pAndLs[PandLID].transactions[i])
        // bill['id'] = pAndLs[PandLID].transactions[i][]
        let info = bill
        let a = await apiRequest('POST',info,`/bill/${bill_url}/${company.id}/${deal.id}/${url_id}`)
        handleTransactionChange(a, i, 'bill_id')
        // console.log()
      }
        
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
        // console.log(pAndLs)
      }; 
      function create_proper_time(bad_time, selected, consol=false){
        let local_time = bad_time.getTime()
        let time_offset = bad_time.getTimezoneOffset()
        let utcTimestamp
        if (selected){

           utcTimestamp = local_time + time_offset *60 * 1000
        

        } else {
           utcTimestamp = local_time - time_offset *60 * 1000

        }
        if (consol){

          // {console.log(utcTimestamp)}
       
        }
        
        let newDate = new Date(utcTimestamp)
        
        // let rdate = new Date(newDate.setFullYear(2027))
        return newDate
      }
            return ( 
                <> 
                        <Row className="mb-3">
        <hr></hr>
        {  bill_url == 'Diligence' && <>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>What is this payment for?</Form.Label>
            <Form.Control  value={pAndLs[PandLID].name} onChange={(e) => handlePandLInfoChange(e.target.value,'name')} />
          </Form.Group>        

          <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Type of Bill</Form.Label>
        <Form.Select aria-label="Default select example"  onChange={(e) => handlePandLInfoChange(e.target.value,'btype_id')}>
            {/* <option value={pAndLs[PandLID].btype_id}>{pAndLs[PandLID].btype_id}</option> */}

        {expenseTypes && expenseTypes.map((expense_type, i) => {
                    return (
                        
                        <option value={expense_type.id}>{expense_type.name} </option>
                    )
      })} 
                </Form.Select>
          </Form.Group>
          </> ||  <>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>What is this payment for?</Form.Label>
            <Form.Control  value={pAndLs[PandLID].name} onChange={(e) => handlePandLInfoChange(e.target.value,'name')} />
          </Form.Group>        

          <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Type of Bill</Form.Label>
        <Form.Select aria-label="Default select example"  onChange={(e) => handlePandLInfoChange(e.target.value,'btype_id')}>
            {/* <option value={pAndLs[PandLID].btype_id}>{pAndLs[PandLID].btype_id}</option> */}

        {expenseTypes && expenseTypes.map((expense_type, i) => {
                    return (
                        
                        <option value={expense_type.id}>{expense_type.name} </option>
                    )
      })} 
                </Form.Select>
          </Form.Group>
          </>}
          <p> </p>
          <br></br>
{  bill_url == 'Diligence' && <>
          <hr></hr>
          <h4>Add in multiple transactions at once</h4>
          <Row className="mb-3">
            {/* new Date(datesumTotal.setFullYear(datesumTotal.getFullYear() + dateMulitplicationAmount)) */}

        <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Start Date of given transaction</Form.Label>
            {/* <DatePicker selected={new Date(startDate.setFullYear(2027))}  onChange={(e) => setStartDate(create_proper_time(e, false))} showYearDropdown */}
              <DatePicker selected={new create_proper_time(startDate, true)}  onChange={(e) => setStartDate(create_proper_time(e, false))} showYearDropdown
             scrollableMonthYearDropdown />
          </Form.Group> 
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Number of {typeDateMultiplicationAMount}s would like to add</Form.Label>
            <Form.Control type="number" value={years} onChange={(e) => setYears(e.target.value)} />
          </Form.Group>        
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>First {typeDateMultiplicationAMount }s amount</Form.Label>
            <Form.Control type="number" value={startingAmount} onChange={(e) => setStartingAmount(e.target.value)} />
          </Form.Group>
           
        </Row>
      
        <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Amount percentage increase per {typeDateMultiplicationAMount }</Form.Label>
            <Form.Control  type="number" value={mulitplicationAmount} onChange={(e) => setMulitplicationAmount(e.target.value)} />
          </Form.Group> 
        <Form.Group as={Col} >
      <Form.Label>How often should profit be given</Form.Label>
      <Form.Select aria-label="Default select example"   onChange={(e) => setTypeDateMulitplicationAmount(e.target.value)}>
            <option value="year">Year </option>
            <option value="month">Month</option>
            <option value="quarter">Quarter</option>
            <option value="day">Days</option>
        </Form.Select>
        </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Amount of {typeDateMultiplicationAMount}s between each transaction</Form.Label>
            <Form.Control type="number" value={dateMulitplicationAmount} onChange={(e) => setDateMulitplicationAmount(Number(e.target.value))} />
          </Form.Group> 
          
        </Row>
        </>}

        <Row>
        {  bill_url == 'Diligence' &&
      <Col md={{ span: 2, offset: 3 }}>   
      <Button  variant="outline-primary" onClick={addMultiYears}>Add multiple {typeDateMultiplicationAMount }s</Button>


      
      </Col> 
         } <Col md={{ span: 2, offset: 2 }}>   
      <Button  variant="outline-primary" onClick={addTransaction}>Add one more transaction</Button>

    </Col>  
               </Row>
   <br></br>
<p></p>



          {pAndLs[PandLID].transactions && pAndLs[PandLID].transactions.map((transaction, i) => {
                    return (
                        
        <div key={i}>
           <hr></hr>
                  <Row className="mb-3">

              <Form.Group as={Col}  >
              <Form.Label> {i + 1}'s worth : <Button variant="outline-danger" id={i} onClick={deleteYear}>
            Delete {typeDateMultiplicationAMount }
          </Button> </Form.Label >
              <Form.Control type="number"  value={transaction.amount} id={i}  onChange={(e) => handleTransactionChange(e.target.value, i,'amount')}/>
            </Form.Group>
            
            <Form.Group as={Col} controlId="formGridEmail" >
            <Form.Label>Date of given transaction</Form.Label>
            <DatePicker selected={
              
              // moment(transaction.date).tz(localTZ, true).toDate()
              // .tz(apiTZ)
              // // Display picker time in local TZ without changing date/time
              // .tz(localTZ, true)
              // .toDate()
              create_proper_time(transaction.date, true,)
              // transaction.date
              // create_proper_time(transaction.date)
            // } onChange={(date) => handleTransactionChange(date, i,'date')} />
              } onChange={(date) => handleTransactionChange(create_proper_time(date, false), i,'date')} /> 

          </Form.Group>  
          {bill_url != 'Diligence' &&
          <Button variant="primary" onClick={(e) => SendApi( i)}>
        Submit
      </Button>}

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