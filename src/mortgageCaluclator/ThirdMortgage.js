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


const ThirdMortgageCalculator = ({mortgages,setMortgages, mortgageID}) => {
    const navigate = useNavigate()
    
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
      let updatedList = mortgages[mortgageID].res_payment_list.map((item, i) => 
        {
          if (i == index){
            return {...item, mortgage_payment: e.target.value}; //gets everything that was already in item, and updates "done"
          }
          return item; // else return unmodified item 
        });
    //   setMortgageinfo(prevState => ({
    //     ...prevState,
    //     ['res_payment_list'] : updatedList
    // }));
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
    
    function changeDate(data) {
      var today2 = new Date(data);

      let newDate = new Date(data);
      return newDate
    }
    const SendApi = (e) => {
     

      let backend = 'http://127.0.0.1:5000'
      // let backend = 'https://distributionresolutionapi.com'
      // let address = `/waterfall_calc`
      let address = `/mortgage_calc`
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
          },
          body: JSON.stringify(mortgages[mortgageID])
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
  
            //   setMortgageinfo(prevState => ({
            //     ...prevState,
            //     ['mortgage_resp'] :  data[0],
            //     ['res_payment_list'] :  data[1]
            // }))
            console.log(data[0])
            console.log(data[1])
            // let new_resp_list = CreateNewList(data[1])
            console.log(data[1])
            setMortgages(s => {
                const newMortgages = s.slice();
                newMortgages[mortgageID].mortgage_resp = data[0];
                newMortgages[mortgageID].res_payment_list = data[1];
          
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
            <Form.Label>Mortgage name</Form.Label>
            <Form.Control  value={mortgages[mortgageID].name} onChange={(e) => handleMortgageInfoChange(e.target.value,'name')} />
          </Form.Group>        

        <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Start Date of mortgage</Form.Label>
             <DatePicker selected={mortgages[mortgageID].start_date}  onChange={(e) => handleMortgageInfoChange(e,'start_date')}  />
          </Form.Group> 

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>How many Years will this mortgage be?</Form.Label>
            <Form.Control  value={mortgages[mortgageID].mortgage_length} onChange={(e) => handleMortgageInfoChange(e.target.value,'mortgage_length')} />
          </Form.Group>        
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>What will the intererst rate be?</Form.Label>
            <Form.Control  value={mortgages[mortgageID].interest_rate} onChange={(e) => handleMortgageInfoChange(e.target.value,'interest_rate')} />
            {/* <Form.Control  value={interest_rate} onChange={(e) => setInterestRate(e.target.value)} /> */}
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>How much are you looking to borrow?</Form.Label>
            <Form.Control  value={mortgages[mortgageID].loan_amount} onChange={(e) => handleMortgageInfoChange(e.target.value,'loan_amount')} />
            {/* <Form.Control  value={loan_amount} onChange={(e) => setLoanAmount(e.target.value)} /> */}
          </Form.Group>  
          <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Type of hurdle</Form.Label>
        <Form.Select aria-label="Default select example"  onChange={(e) => handleMortgageInfoChange(e.target.value,'mortgage_type')}>
        {/* <Form.Select aria-label="Default select example"  onChange={(e) => setMortgageType(e.target.value)}> */}
              <option value={mortgages[mortgageID].mortgage_type}>{mortgages[mortgageID].mortgage_type}</option>
              <option value="Standard">Standard</option>
              <option value="Balloon">Balloon</option>
              <option value="Interest_only">Interest_only</option>
              <option value="No_monthly_payments">No_monthly_payments</option>
          </Form.Select>
          </Form.Group>
          {mortgages[mortgageID].mortgage_type === 'Balloon' && 
           <Form.Group as={Col} controlId="formGridEmail">
           <Form.Label>On what number payment would you like ballon payment due?</Form.Label>
           <Form.Control  value={mortgages[mortgageID].balloon_due_date} onChange={(e) =>  handleMortgageInfoChange(e.target.value,'balloon_due_date')} />
           {/* <Form.Control  value={balloon_due_date} onChange={(e) => setBalloonDue_date(e.target.value)} /> */}
         </Form.Group> 
          }
        </Row>

                
                     {/* <Button variant="success" onClick={SendApi}>
                Create Mortgage
              </Button> */}

              {mortgages[mortgageID].mortgage_resp && <div> {mortgages[mortgageID].mortgage_resp}</div>}
              <Container>
              <Row className="justify-content-md-center">
        
     

              {mortgages[mortgageID].res_payment_list && mortgages[mortgageID].res_payment_list.map((item, i) => {
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
            <Form.Label>Payment Month {i+1} <DatePicker selected={changeDate(item.payment_date)}   /></Form.Label>
          </OverlayTrigger>
            <Form.Control id={i} value={item.mortgage_payment}  onChange={handleMortgageChange} />
          </Form.Group> 
<hr></hr>
      </div>
                    )
      })} 

 </Row>
          </Container>
              </>
    )
}
 
export default ThirdMortgageCalculator;