import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Container from 'react-bootstrap/Container';
import PandL from './PandL';
import Accordion from 'react-bootstrap/Accordion';
import DealInfo from './DealInfo';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';

const ParentPandL = () => {
    const navigate = useNavigate()
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const [respCatagories, setRespCatagories] = useState(true)
    const [respMonth, setRespMonth] = useState(true)
    const [respYear, setRespYear] = useState(true)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    const [dealInfo, setDealInfo] = useState({ 'name' : 'legal fee',
    'address': '123 Sesame street',
    'sqr_footage': 50000,
    'investment_type': 'multi_family',
    'unit_amount': 5,
    'avg_unit_size': 500,
    'purchase_price': 5000000,
    'purchase_date': today,
        })
    const [pAndLs, setPandLs] = useState([])
    const addPandL = e => {
        setPandLs(s => {
            const newMortgage = s.slice();
            newMortgage.push({ 'transaction_name' : 'legal fee',
            'transaction_type': 'soft_costs',
            'transactions': [],
                })
      
            return newMortgage;
          });
      }; 
      const deleteYear = e => {
        setPandLs(profits=> profits.filter((s,i)=>(i != e.target.id)))
          }
          const SendApi = (e) => {
     

            let backend = 'http://127.0.0.1:5000'
            // let backend = 'https://distributionresolutionapi.com'
            // let address = `/waterfall_calc`
            let address = `/pandl_calc`
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                },
                body: JSON.stringify({'deal_info' : dealInfo,
              'pandls' : pAndLs })
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
        
                    console.log(data)
                    setRespCatagories(data['catagories'])
                    console.log(data['catagories'])
                    setRespMonth(data.month)
                    setRespYear(data.year)
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
                <br></br>
                <DealInfo dealInfo={dealInfo} setDealInfo={setDealInfo}></DealInfo>
                <br></br>
 <Button  variant="outline-primary" onClick={addPandL}>add statement</Button>

 <Accordion defaultActiveKey={['0']} alwaysOpen>
              {pAndLs && pAndLs.map((item, i) => {
                    return (
                        
        <div key={i}>

<Accordion.Item eventKey={i}>
        <Accordion.Header>account #{i+1}: {pAndLs[i].transaction_name} ----  <Button variant="danger" size="sm" id={i} onClick={deleteYear}>
            Delete me
          </Button></Accordion.Header>
        <Accordion.Body>
        <PandL pAndLs={pAndLs} setPandLs={setPandLs} PandLID={i}></PandL>

        </Accordion.Body>
      </Accordion.Item>
 
 
      </div>
                    )
      })} 
   </Accordion>

<Button  variant="outline-primary" onClick={SendApi}> Calculate</Button>

<br></br>
<Tabs
      defaultActiveKey="Catagories"
      id="uncontrolled-tab-example"
      transition={false}
      className="mb-3"
    >
      <Tab eventKey="Catagories" title="Catagories">
      
      <Table striped bordered hover>
      <tbody>
      <th>
        {respCatagories && Object.entries(respCatagories).map( ([key, value],i) => {
          return (
    <div>
      <Table striped bordered hover>
<thead>
        <tr>
        
        <th>{key}</th>
        <th>name</th>
        <th>amount</th>
      
      </tr>
      </thead>
      <tbody>
      {Object.entries(value['seperate_costs']).map( ([key2, value2],index) => {
          return (
            <tr>
            <td>{index}</td>
            <td>{value2['name']}</td>
            <td>{value2['total_amount']}</td>
          
          </tr>
        )
        })}
      
        <tr>
          <td>Total</td>
          <td>-</td>
          <td>{value['totals']}</td>
        </tr>
       
      </tbody>
      </Table>
    </div>
   )
  } )}
  </th>
   </tbody>
          </Table>
   
    

      {respCatagories && Object.entries(respCatagories).map( ([key, value]) => {
          return (
    <div>

        HELLLO
        <h3>{value['totals']}</h3> 
        <h3>HELLLO</h3> 
   {/* {console.log(value['totals'])} */}
    </div>
   )
  } )}

      </Tab>
      <Tab eventKey="Month" title="Month">
      {respMonth && Object.entries(respMonth).map( ([k, v],index) => {
          return (
            <div>
         <h3>Year-Month {k}</h3>
                  { Object.entries(v).map( ([key, value],i) => {
                    return (
              <div>
                <Table striped bordered hover>
          <thead>
                  <tr>
                  
                  <th>{key}</th>
                  <th>name</th>
                  <th>amount</th>
                  <th>date</th>
                
                </tr>
                </thead>
                <tbody>
                {Object.entries(value['seperate_costs']).map( ([key2, value2],index) => {
                    return (
                      <tr>
                      <td>{index}</td>
                      <td>{value2['name']}</td>
                      <td>{value2['amount']}</td>
                      <td>{value2['date']}</td>
                    
                    </tr>
                  )
                  })}
                
                  <tr>
                    <td>Total</td>
                    <td>-</td>
                    <td>{value['totals']}</td>
                  </tr>
                 
                </tbody>
                </Table>
              </div>
             )
            } )}
          
         </div>
        )
        })}

        </Tab>
      <Tab eventKey="Year" title="Year" >

      {respYear && Object.entries(respYear).map( ([k, v],index) => {
          return (
            <div>
         <h3>Year {k}</h3>
                  { Object.entries(v).map( ([key, value],i) => {
                    return (
              <div>
                <Table striped bordered hover>
          <thead>
                  <tr>
                  
                  <th>{key}</th>
                  <th>name</th>
                  <th>amount</th>
                  <th>date</th>
                
                </tr>
                </thead>
                <tbody>
                {Object.entries(value['seperate_costs']).map( ([key2, value2],index) => {
                    return (
                      <tr>
                      <td>{index}</td>
                      <td>{value2['name']}</td>
                      <td>{value2['amount']}</td>
                      <td>{value2['date']}</td>
                    
                    </tr>
                  )
                  })}
                
                  <tr>
                    <td>Total</td>
                    <td>-</td>
                    <td>{value['totals']}</td>
                  </tr>
                 
                </tbody>
                </Table>
              </div>
             )
            } )}
          
         </div>
        )
        })}
      </Tab>
    </Tabs>

              </>
    )
}
 
export default ParentPandL;