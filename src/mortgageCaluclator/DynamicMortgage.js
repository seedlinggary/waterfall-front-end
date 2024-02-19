import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Container from 'react-bootstrap/Container';


const MortgageCalculator = ({mortgage,setMortgages, mortgageID}) => {
    const navigate = useNavigate()
    
    // const [mortgage_info, setMortgageinfo] = useState({ 'mortgage_length' : 3,
    // 'interest_rate': .06,
    // 'loan_amount': 1000000,
    // 'res_payment_list' : null,
    // 'mortgage_type': 'Standard',
    // 'balloon_due_date': 24,
    // 'mortgage_resp': null
        
    //     })
    const [mortgage_info, setMortgageinfo] = useState(mortgage)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    const handleMortgageChange = e => {
      e.preventDefault();
      let index = e.target.id;
      if (e.target.id > 0){
          index = e.target.id
      }else{
          index = 0
      }
      let updatedList = mortgage_info.res_payment_list.map((item, i) => 
        {
          if (i == index){
            return {...item, mortgage_payment: e.target.value}; //gets everything that was already in item, and updates "done"
          }
          return item; // else return unmodified item 
        });
      setMortgageinfo(prevState => ({
        ...prevState,
        ['res_payment_list'] : updatedList
    }));
    setMortgages(s => {
        const newMortgages = s.slice();
        newMortgages[mortgageID] = mortgage_info;
  
        return newMortgages;
      });
    }; 
    
    function handleMortgageInfoChange(data, mortgageInfoType) {
        let keyvalue = mortgageInfoType.toString()
        setMortgageinfo(prevState => ({
            ...prevState,
            [`${keyvalue}`]: data
        }));
        setMortgages(s => {
            const newMortgages = s.slice();
            newMortgages[mortgageID] = mortgage_info;
      
            return newMortgages;
          });
      }
    const SendApi = (e) => {
     

      // let backend = 'http://127.0.0.1:5000'
      let backend = 'https://distributionresolutionapi.com'
      // let address = `/waterfall_calc`
      let address = `/mortgage_calc`
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
          },
          body: JSON.stringify(mortgage_info)
      };
      fetch(`${backend}${address}`, requestOptions)
          .then(async response => {
              const isJson = response.headers.get('content-type')?.includes('application/json');
              const data = isJson && await response.json();
              // console.error('There was a response!', response);
              // check for error response
              if (!response.ok) {
                  // get error message from body or default to response status
                  const error = (data && data.message) || response.status;
                  return Promise.reject(error);
              }
  
              setMortgageinfo(prevState => ({
                ...prevState,
                ['mortgage_resp'] :  data[0],
                ['res_payment_list'] :  data[1]
            }))
            setMortgages(s => {
                const newMortgages = s.slice();
                newMortgages[mortgageID] = mortgage_info;
          
                return newMortgages;
              });
              setIsPending(false)
              setError(null)
      return  data 
          })
          .catch(error => {
              console.error('There was an error!', error);
              setIsPending(false)
              setError(error.message)    
          }); 
  
      e.preventDefault();

      
      }    
            return ( 
                <> 
                        <Row className="mb-3">
        <hr></hr>
        
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>How many Years will this mortgage be?</Form.Label>
            <Form.Control  value={mortgage_info.mortgage_length} onChange={(e) => handleMortgageInfoChange(e.target.value,'mortgage_length')} />
            {/* <Form.Control  value={mortgage_length} onChange={(e) => setMortgageLength(e.target.value)} /> */}
          </Form.Group>        
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>What will the intererst rate be?</Form.Label>
            <Form.Control  value={mortgage_info.interest_rate} onChange={(e) => handleMortgageInfoChange(e.target.value,'interest_rate')} />
            {/* <Form.Control  value={interest_rate} onChange={(e) => setInterestRate(e.target.value)} /> */}
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>How much are you looking to borrow?</Form.Label>
            <Form.Control  value={mortgage_info.loan_amount} onChange={(e) => handleMortgageInfoChange(e.target.value,'loan_amount')} />
            {/* <Form.Control  value={loan_amount} onChange={(e) => setLoanAmount(e.target.value)} /> */}
          </Form.Group>  
          <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Type of hurdle</Form.Label>
        <Form.Select aria-label="Default select example"  onChange={(e) => handleMortgageInfoChange(e.target.value,'mortgage_type')}>
        {/* <Form.Select aria-label="Default select example"  onChange={(e) => setMortgageType(e.target.value)}> */}
              <option value={mortgage_info.mortgage_type}>{mortgage_info.mortgage_type}</option>
              <option value="Standard">Standard</option>
              <option value="Balloon">Balloon</option>
              <option value="Interest_only">Interest_only</option>
              <option value="No_monthly_payments">No_monthly_payments</option>
          </Form.Select>
          </Form.Group>
          {mortgage_info.mortgage_type === 'Balloon' && 
           <Form.Group as={Col} controlId="formGridEmail">
           <Form.Label>On what number payment would you like ballon payment due?</Form.Label>
           <Form.Control  value={mortgage_info.balloon_due_date} onChange={(e) =>  handleMortgageInfoChange(e.target.value,'balloon_due_date')} />
           {/* <Form.Control  value={balloon_due_date} onChange={(e) => setBalloonDue_date(e.target.value)} /> */}
         </Form.Group> 
          }
        </Row>

                
                     <Button variant="success" onClick={SendApi}>
                Create Mortgage
              </Button>

              {mortgage_info.mortgage_resp && <div> {mortgage_info.mortgage_resp}</div>}
              <Container>
              <Row className="justify-content-md-center">
        
     

              {mortgage_info.res_payment_list && mortgage_info.res_payment_list.map((item, i) => {
                    return (
                        
        <div key={i}>


 
              <Form.Group as={Col} >
              <OverlayTrigger
          trigger="click"
          key='top'
          placement='top'
          overlay={
            <Popover id={`popover-positioned-top`}>
              <Popover.Header as="h3">Mortgage payment info</Popover.Header>
              <Popover.Body>
              <strong>Amount of payment towards interest:</strong> {item.interest_payment}
              <br></br>
              <strong>Amount of payment towards capital:</strong> {item.principal_payment}
              <br></br>
              <strong>Capital amount left to pay:</strong> {item.remaining_balance}
              <br></br>
              <strong>Total Amount of payment towards capital:</strong> {item.total_principal_payment}
              <br></br>
              <strong>Total Amount of payment towards interest:</strong> {item.total_interest_payment}
              </Popover.Body>
            </Popover>
          }
        >
            <Form.Label>Payment Month {i+1}</Form.Label>
          </OverlayTrigger>
            <Form.Control id={i} value={item.mortgage_payment}  onChange={handleMortgageChange} />
          </Form.Group> 
 
      </div>
                    )
      })} 

 </Row>
          </Container>
              </>
    )
}
 
export default MortgageCalculator;