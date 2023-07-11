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
import {reactLocalStorage} from 'reactjs-localstorage';
import useFetch from '../../useFetch';
import apiRequest from '../../ApiRequest'


const AddExpenseType = ({expenseTypes,setExpenseTypes, PandLID}) => {
    const deleteExpense = e => {
        setExpenseTypes(expenses=> expenses.filter((s,i)=>(i != e.target.id)))
          }

    function handleExpenseChange(data, mortgageInfoType, i) {
        let keyvalue = mortgageInfoType.toString()
        setExpenseTypes(s => {
            const newExpenses = s.slice();
            newExpenses[i][`${keyvalue}`] = data;
      
            return newExpenses;
          });

      }
      const addExpense = () => {

        setExpenseTypes(s => {
            const newExpense = s.slice();
            newExpense.push({ 'name' : 'legal fee',
            'payable_recievable': 'Payable',
                })
      
            return newExpense;
        });
      };

      function handleTransactionChange(data, index, mortgageInfoType) {
        let keyvalue = mortgageInfoType.toString()

        let updatedList = expenseTypes.map((item, i) => 
          {
            if (i == index){
              return {...item, [`${keyvalue}`] : data}; //gets everything that was already in item, and updates "done"
            }
            return item; // else return unmodified item 
          });

          setExpenseTypes(s => {
          const newMortgages = s.slice();
          newMortgages[PandLID].transactions = updatedList;
    
          return newMortgages;
        });
      }; 
      let cookie = reactLocalStorage.get('cookie')
      const requestOptions = {
          method: 'GET',
          headers: { 
          'x-access-token': cookie},
      };
      
      function updatebtypes(btypes){
        let updatedList = btypes.map((btype, i) => 
        {
            let paybleType = 'Payable'
            if (btype.name == 'income'){
                paybleType = "Recievable"
            }
            console.log(btype.name)
          return {'name': btype.name, 'payable_recievable': btype.payable_recievable, 'id': btype.id}; // else return unmodified item 
        });
        console.log(updatedList)
        setExpenseTypes(updatedList)
      }

      const { data: btype, error, isPending} = useFetch(`/btype` , requestOptions)
      useEffect(() => {
        if (btype){

            updatebtypes(btype)
        }
    }, [btype]);

    const SendApi = (e) => {
        //   e.preventDefault();
          let info = expenseTypes
          let a = apiRequest('POST',info,`/btype`)
          updatebtypes(a)
        //   navigate(0)
        } 
          
            return ( 
                <> 
                        <Row className="mb-3">


      


        <Row>
      <Col md={{ span: 2, offset: 3 }}>   

      
      </Col>  <Col md={{ span: 2, offset: 2 }}>   
      <Button  variant="outline-primary" onClick={addExpense}>Add one more transaction</Button>

    </Col>  
               </Row>
   <br></br>
<p></p>



          {expenseTypes && expenseTypes.map((expense, i) => {
                    return (
                        
        <div key={i}>
                  <Row className="mb-3">

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>What Type of expense is this? <Button variant="outline-danger" id={i} onClick={deleteExpense}>
            Delete expense
          </Button></Form.Label>
            <Form.Control  value={expense.name} onChange={(e) => handleExpenseChange(e.target.value,'name',i)} />
          </Form.Group>        

          <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Payable or Recievable?</Form.Label>
        <Form.Select aria-label="Default select example"  onChange={(e) => handleExpenseChange(e.target.value,'payable_recievable',i)}>
        <option value={expense.payable_recievable}>{expense.payable_recievable}</option>

        <option value="Payable">Payable </option>
            <option value="Recievable">Recievable</option>
     
                </Form.Select>
          </Form.Group>            </Row>
      </div>
                    )
      })} 
        </Row>

              <Container>
          </Container>
          <Button variant="primary" onClick={SendApi}>
        Submit
      </Button>

              </>
    )
}
 
export default AddExpenseType;