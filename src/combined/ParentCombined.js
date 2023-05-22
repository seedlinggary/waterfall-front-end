import React, { useState } from 'react'
import PnL from './PnL';
import ParentMortgage from '../mortgageCaluclator/ParentMortgage';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const ParentCombined = () => {
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    const [dealInfo, setDealInfo] = useState({ 'name' : 'Money Maker',
    'address': '123 Sesame street',
    'gross_sqr_footage': 50000,
    'investment_type': 'multi_family',
    'unit_amount': 5,
    'net_sqr_footage': 40000,
    'purchase_price': 5000000,
    'purchase_date': today,
        })
    const [pAndLs, setPandLs] = useState([])
      
    const [mortgages, setMortgages] = useState([])

    const SendApi = (e) => {
     
        // if (!acceptTermsAndCondisiotns){
        //    setWarningTermsAndConditions(true)
        //    return
        //  }
        //  setWarningTermsAndConditions(false)

        // let backend = 'http://127.0.0.1:5000'
        let backend = 'https://distributionresolutionapi.com'
        // let address = `/waterfall_calc`
        let address = `/pandl_calc`
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            },
            body: JSON.stringify({'deal_info' : dealInfo,
          'pandls' : pAndLs,
        'mortgages': mortgages })
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
    
                // console.log(data)
                // setRespCatagories(data['catagories'])
                // console.log(data['catagories'])
                // setRespMonth(data.month)
                // setRespYear(data.year)
                // setRespMonthTotal(data.month_totals)
                // setRespYearTotal(data.year_totals)
                // setRespcatagoriesTotal(data.catagories_totals)
                // setIsPending(false)
                // setError(null)
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
                          <Row>
        <Col md={{ span: 10, offset: 1 }}>  
      

                 <Accordion defaultActiveKey={['0']} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Info and Statements</Accordion.Header>
        <Accordion.Body>
        <PnL dealInfo={dealInfo} setDealInfo={setDealInfo} pAndLs={pAndLs} setPandLs={setPandLs}></PnL>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Mortgages</Accordion.Header>
        <Accordion.Body>
        <ParentMortgage mortgages={mortgages} setMortgages={setMortgages}></ParentMortgage>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </Col>
    </Row>
    <br></br>
   <Row>
      <Col md={{ span: 2, offset: 3 }}>   
      <Button  variant="outline-primary" onClick={SendApi}> Calculate</Button>

      
      </Col>  
      {/* <Col md={{ span: 2, offset: 2 }}>   
      <PNLSetInfo setDealInfo={setDealInfo} setPandLs={setPandLs}></PNLSetInfo>

    </Col>   */}
               </Row>
   <br></br>

              </>
    )
}
 
export default ParentCombined;
