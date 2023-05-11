import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';


const MortgageCalculator = () => {
    const navigate = useNavigate()
    const [mortgage_length, setMortgageLength] = useState(3)
    const [interest_rate, setInterestRate] = useState(.06)
    const [loan_amount, setLoanAmount] = useState(1000000)
    const [mortgage_type, setMortgageType] = useState('Standard')
    const [balloon_due_date, setBalloonDue_date] = useState(24)
    const [mortgage_resp,setRespMortgage] = useState(null)
    const [respPaymentList,setRespPaymentList] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    const [acceptTermsAndCondisiotns, setAcceptTermsAndCondisiotns] = useState(false)
    const [warningTermsAndConditions, setWarningTermsAndConditions] = useState(false)

    const handleMortgageChange = e => {
      e.preventDefault();
      let index = e.target.id;
      if (e.target.id > 0){
          index = e.target.id
      }else{
          index = 0
      }

      setRespPaymentList(s => {
        const newProfit = s.slice();
        newProfit[index].mortgage_payment = e.target.value;
  
        return newProfit;
      });
      console.log(respPaymentList)
    }; 
    const handleMortgageType = e => {
    
      setMortgageType( e.target.value);
      setRespMortgage( null);
      setRespPaymentList( null);
    };
    const SendApi = (e) => {
      let info = { 'mortgage_length' : mortgage_length,
      'interest_rate': interest_rate,
      'loan_amount': loan_amount,
      'res_payment_list' : respPaymentList,
      'mortgage_type': mortgage_type,
      'balloon_due_date': balloon_due_date,
          
          }  
          if (!acceptTermsAndCondisiotns){
            setWarningTermsAndConditions(true)
            return
          }
          setWarningTermsAndConditions(false)
      // let backend = 'http://127.0.0.1:5000'
      let backend = 'https://distributionresolutionapi.com'
      // let address = `/waterfall_calc`
      let address = `/mortgage_calc`
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
          },
          body: JSON.stringify(info)
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
  
              // console.error('There was data!', data);
              setRespMortgage(data[0])
              setRespPaymentList(data[1])
              console.log(respPaymentList)
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
        {warningTermsAndConditions &&  <Alert variant="danger" onClose={() => setWarningTermsAndConditions(false)} dismissible>
        <Alert.Heading>Warning!</Alert.Heading>
        <p>
          This website does not take responsibility for any information given or provided. Please compare your mortgage results against your own information for accurecy. Please check terms and condition box.
        </p>
      </Alert>}
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>How many years will this mortgage be?</Form.Label>
            <Form.Control  value={mortgage_length} onChange={(e) => setMortgageLength(e.target.value)} />
          </Form.Group>        
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>What will the intererst rate be?</Form.Label>
            <Form.Control  value={interest_rate} onChange={(e) => setInterestRate(e.target.value)} />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>How much are you looking to borrow?</Form.Label>
            <Form.Control  value={loan_amount.toLocaleString()} onChange={(e) => setLoanAmount(e.target.value)} />
          </Form.Group>  
          <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Type of mortgage</Form.Label>
        
        {/* // <Form.Select aria-label="Default select example"  onChange={(e) => setMortgageType(e.target.value)}> */}
        <Form.Select aria-label="Default select example" onChange={handleMortgageType}>
        <option value={mortgage_type}>{mortgage_type}</option>
              <option value="Standard">Standard</option>
              <option value="Balloon">Balloon</option>
              <option value="Interest_only">Interest_only</option>
              <option value="No_monthly_payments">No_monthly_payments (accrued interest)</option>
          </Form.Select>
          </Form.Group>
          {mortgage_type === 'Balloon' && 
           <Form.Group as={Col} controlId="formGridEmail">
           <Form.Label>On what number payment would you like ballon payment due?</Form.Label>
           <Form.Control  value={balloon_due_date} onChange={(e) => setBalloonDue_date(e.target.value)} />
         </Form.Group> 
          }
        </Row>
        <br></br>
    <Row>
      <Col md={{ span: 3, offset: 5 }}>   
      <Form.Group as={Col} controlId="formGridEmail">
          <Form.Check 
          type="switch"
          id="custom-switch"
          label= {
            <span>
              I agree to the <a href="/disclaimer">terms and conditions</a>
            </span>
          }
          checked={acceptTermsAndCondisiotns}
  
          onChange={(e) => acceptTermsAndCondisiotns ? setAcceptTermsAndCondisiotns(false) : setAcceptTermsAndCondisiotns(true)}
        />        </Form.Group>

    </Col>  
               </Row>
<br></br>
                
                     <Button variant="success" onClick={SendApi}>
                Create Mortgage
              </Button>

              {mortgage_resp && <div> ${mortgage_resp.toLocaleString()}</div>}
              <Container>
              <Row className="justify-content-md-center">
              {respPaymentList && <p> Edit any of the years payments to see how it would affect your mortgage.</p>}
     
              {respPaymentList && respPaymentList.map((item, i) => {
                    return (
                        
        <div key={i}>
                 
                 <hr></hr>

                     
              <Form.Group as={Col} >
              <OverlayTrigger
          trigger="click"
          key='top'
          placement='top'
          overlay={
            <Popover id={`popover-positioned-top`}>
              <Popover.Header as="h3">Mortgage payment info</Popover.Header>
              <Popover.Body>
              <strong>Amount of payment towards interest:</strong> ${item.interest_payment.toLocaleString()}
              <br></br>
              <strong>Amount of payment towards capital:</strong> ${item.principal_payment.toLocaleString()}
              <br></br>
              <strong>Capital amount left to pay:</strong> ${item.remaining_balance.toLocaleString()}
              <br></br>
              <strong>Total Amount of payment towards capital:</strong> ${item.total_principal_payment.toLocaleString()}
              <br></br>
              <strong>Total Amount of payment towards interest:</strong> ${item.total_interest_payment.toLocaleString()}
              </Popover.Body>
            </Popover>
          }
        >
            <Form.Label> Payment Month {i+1} <Button variant="outline-secondary" >
                More Information
              </Button></Form.Label>
            </OverlayTrigger>
            <Form.Control id={i} value={item.mortgage_payment.toLocaleString()}  onChange={handleMortgageChange} />
          </Form.Group> 
          
 
      </div>
                    )
      })} 

 </Row>
          </Container>
          <br></br>
              </>
    )
}
 
export default MortgageCalculator;