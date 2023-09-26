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
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


const MortgageAdd = ({mortgages,setMortgages, mortgageID, deal, company}) => {
    const navigate = useNavigate()
    
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    const [interestRate, setInterestRate] = useState(mortgages[mortgageID].starting_rate/12)

    const handleMortgageChange = e => {
      e.preventDefault();
      let index = e.target.id;
      if (e.target.id > 0){
          index = e.target.id
      }else{
          index = 0
      }
      let updatedList = mortgages[mortgageID].res_payment_list.map((item, i) => 
        {
          if (i == index){
            return {...item, mortgage_payment: e.target.value}; //gets everything that was already in item, and updates "done"
          }
          return item; // else return unmodified item 
        });
    setMortgages(s => {
        const newMortgages = s.slice();
        newMortgages[mortgageID].res_payment_list = updatedList;
  
        return newMortgages;
      });
    }; 
    
    function handleMortgageInfoChange(data, mortgageInfoType) {
      let keyvalue = mortgageInfoType.toString()
        setMortgages(s => {
          const newMortgages = s.slice();
          newMortgages[mortgageID][`${keyvalue}`] = data;
    
          return newMortgages;
        });

    } 

    const SendApi = async (mortgage_id) => {
        // const bill = Object.assign( pAndLs[PandLID], pAndLs[PandLID].transactions[i])
        // bill['id'] = pAndLs[PandLID].transactions[i][]
        let info = {'id': mortgage_id, 'rate': interestRate }
        // console.log(bill)
        // console.log(pAndLs[PandLID].transactions[i])
        let a = await apiRequest('POST',info,`/mortgage/add_bill/${company.id}/${deal.id}`)
        console.log(a)
        handleMortgageInfoChange(a,'bills')
        // handleTransactionChange(a, i, 'bill_id')
        // console.log()
      }
    function changeDate(data) {
      var today2 = new Date(data);

      let newDate = new Date(data);
      return newDate
    }

      let cookie = reactLocalStorage.get('cookie')
      const requestOptions = {
          method: 'GET',
          headers: { 
          'x-access-token': cookie},
      };

      const { data: mtypes, erro, isPendin} = useFetch(`/mtype` , requestOptions)

            return ( 
                <> 
                        <Row className="mb-3">
        <hr></hr>
        <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Mortgage name</Form.Label>
            <Form.Control  value={mortgages[mortgageID].name} onChange={(e) => handleMortgageInfoChange(e.target.value,'name')} />
          </Form.Group>        

        <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Start Date of mortgage</Form.Label>
             <DatePicker selected={mortgages[mortgageID].start_date}  onChange={(e) => handleMortgageInfoChange(e,'start_date')}  />
          </Form.Group> 

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>How many Years will this mortgage be?</Form.Label>
            <Form.Control type="number" value={mortgages[mortgageID].length} onChange={(e) => handleMortgageInfoChange(e.target.value,'length')} />
          </Form.Group>        
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>What will the intererst rate be?</Form.Label>
            <Form.Control  type="number" value={mortgages[mortgageID].starting_rate} onChange={(e) => handleMortgageInfoChange(e.target.value,'starting_rate')} />
            {/* <Form.Control  value={starting_rate} onChange={(e) => setInterestRate(e.target.value)} /> */}
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>How much are you looking to borrow?</Form.Label>
            <Form.Control  type="number" value={mortgages[mortgageID].amount} onChange={(e) => handleMortgageInfoChange(e.target.value,'amount')} />
            {/* <Form.Control  value={amount} onChange={(e) => setLoanAmount(e.target.value)} /> */}
          </Form.Group>  
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Fees to take out this loan?</Form.Label>
            <Form.Control type="number" value={mortgages[mortgageID].fees} onChange={(e) => handleMortgageInfoChange(e.target.value,'fees')} />
            {/* <Form.Control  value={amount} onChange={(e) => setLoanAmount(e.target.value)} /> */}
          </Form.Group>  
          <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Type of mortgage</Form.Label>
        <Form.Select aria-label="Default select example"  onChange={(e) => handleMortgageInfoChange(e.target.value,'mtype_id')}>
        
        {/* <Form.Select aria-label="Default select example"  onChange={(e) => setMortgageType(e.target.value)}> */}
              {/* <option value={mortgages[mortgageID].mtype_id}>{mortgages[mortgageID].mtype_id}</option> */}
              {mtypes && mtypes.map((mtype, i) => {
                    return (
                        
                        <option value={mtype.id}>{mtype.name} </option>
                    )
      })} 
              {/* <option value="Standard">Standard</option>
              <option value="Balloon">Balloon</option>
              <option value="Interest_only">Interest_only</option>
              <option value="No_monthly_payments">No_monthly_payments</option> */}
          </Form.Select>
          </Form.Group>
          {console.log(mortgages[mortgageID].mtype_id)}
          {mortgages[mortgageID].mtype_id == 2 && 
           <Form.Group as={Col} controlId="formGridEmail">
           <Form.Label>On what number payment would you like ballon payment due?</Form.Label>
           <Form.Control  value={mortgages[mortgageID].balloon_payment_back} onChange={(e) =>  handleMortgageInfoChange(e.target.value,'balloon_payment_back')} />
           {/* <Form.Control  value={balloon_payment_back} onChange={(e) => setBalloonDue_date(e.target.value)} /> */}
         </Form.Group> 
          }
        </Row>
        <hr></hr>
        <Tabs
      defaultActiveKey="OpStat"
      id="uncontrolled-tab-example"
      transition={false}
      className="mb-3"
    >
      
      

      

        {mortgages[mortgageID].bills && mortgages[mortgageID].bills.map((bill, i) => {
            if (mortgages[mortgageID].length * 12 > i){

            return (
                
        <Tab eventKey={i} title={i}>
    {    bill.amount &&    
        <> 
        <p>total Bill: {bill.amount.toLocaleString()}</p>
        <p>Date of Bill: {bill.sent_date.toLocaleString()}</p>
        {bill.mbill.principal_paid && <p>principal Paid: {bill.mbill.principal_paid.toLocaleString()}</p>}
        {bill.mbill.interest_paid &&<p>Interest Paid: {bill.mbill.interest_paid.toLocaleString()}</p>}
        {bill.mbill.total_principal_payment &&<p>Total Interest Paid: {bill.mbill.total_principal_payment.toLocaleString()}</p>}
        {bill.mbill.total_interest_payment &&<p>Total Interest Paid: {bill.mbill.total_interest_payment.toLocaleString()}</p>}
        {bill.mbill.remaining_balance &&<p>Remaining Balance: {bill.mbill.remaining_balance.toLocaleString()}</p>}
        
        <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Total Bill</Form.Label>
        <Form.Control  disabled type="number"  value={bill.amount}  />
      </Form.Group>      
      <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Day bill paid</Form.Label>
             <DatePicker disabled selected={new Date(bill.sent_date)}    />
          </Form.Group> 
{mortgages[mortgageID].bills.length - 1 == i &&  <>     <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Mortgage Interest</Form.Label>
        <Form.Control type="number"  value={interestRate} onChange={(e) => setInterestRate(e.target.value)} onLoad={(e) => setInterestRate(bill.mbill.rate)} />
      </Form.Group> 
      <Button variant="success" onClick={(e) => SendApi( mortgages[mortgageID].id)}>
        add bill
      </Button> </>  || <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Mortgage Interest</Form.Label>
        <Form.Control type="number"  disabled value={bill.mbill.rate} />
      </Form.Group> }
      <hr></hr>
      </>}
      </Tab>
        
         )
    }
        })}
        </Tabs>
              </>
    )
}
 
export default MortgageAdd;