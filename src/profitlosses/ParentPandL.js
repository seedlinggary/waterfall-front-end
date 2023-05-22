import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import PandL from './PandL';
import Accordion from 'react-bootstrap/Accordion';
import DealInfo from './DealInfo';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import PNLSetInfo from './PNLSetInfo';
import Alert from 'react-bootstrap/Alert';

const ParentPandL = () => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const [respCatagories, setRespCatagories] = useState(true)
    const [respMonth, setRespMonth] = useState(true)
    const [respYear, setRespYear] = useState(true)
    const [respMonthTotal, setRespMonthTotal] = useState(true)
    const [respYearTotal, setRespYearTotal] = useState(true)
    const [respCatagoriesTotal, setRespcatagoriesTotal] = useState()
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    const [showSave, setShowSave] = useState(false);

    const handleCloseSave = () => setShowSave(false);
    const handleShowSave = () => setShowSave(true);
    const [savedInfo, setSavedInfo] = useState();

    const [acceptTermsAndCondisiotns, setAcceptTermsAndCondisiotns] = useState(false)
    const [warningTermsAndConditions, setWarningTermsAndConditions] = useState(false)

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
          const saveInfo = () => {
              setSavedInfo(JSON.stringify({'deal_info' : dealInfo,
              'pandls' : pAndLs }))
          }
          const inputSavedData = e => {
            var savedData = JSON.parse(e.target.value);

           
            let newParent = {};
            Object.entries(savedData.deal_info).map( ([k, v],index) => {
              if (k == 'purchase_date'){
                var today2 = new Date(v);
                newParent[k] = today2
              }else{
                newParent[k] = v
              }
            })
            let newpnl = savedData.pandls.map(profitlosses =>{

              let updatedtransactions = profitlosses.transactions.map(transaction =>{
                let newTransaction = {}
                Object.entries(transaction).map( ([k, v],index) => {
                  if (k == 'date'){
                    var today2 = new Date(v);
                    newTransaction[k] = today2
                  }else{
                    newTransaction[k] = v
                  }
                })
                return newTransaction
              })
              return {...profitlosses, 'transactions' : updatedtransactions};
            })
  
  
            setDealInfo(newParent)
            setPandLs(newpnl)

          }
      
          const SendApi = (e) => {
     
            if (!acceptTermsAndCondisiotns){
               setWarningTermsAndConditions(true)
               return
             }
             setWarningTermsAndConditions(false)

            // let backend = 'http://127.0.0.1:5000'
            let backend = 'https://distributionresolutionapi.com'
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
                    setRespMonthTotal(data.month_totals)
                    setRespYearTotal(data.year_totals)
                    setRespcatagoriesTotal(data.catagories_totals)
                    setIsPending(false)
                    setError(null)
            return  data 
                })
                .catch(error => {
                    console.error('There was an error!', error);
                    setIsPending(false)
                    setError(error.message)    
                }); 
        
          //   e.preventDefault();
      
          //         console.log(data)
          //         setRespCatagories(data['catagories'])
          //         console.log(data['catagories'])
          //         setRespMonth(data.month)
          //         setRespYear(data.year)
          //         setRespMonthTotal(data.month_totals)
          //         setRespYearTotal(data.year_totals)
          //         setIsPending(false)
          //         setError(null)
          // return  data 
          //     })
          //     .catch(error => {
          //         console.error('There was an error!', error);
          //         setIsPending(false)
          //         setError(error.message)    
          //     }); 
      
          // e.preventDefault();
    
          
          }    
      
            return ( 
                <> 
                         {warningTermsAndConditions &&  <Alert variant="danger" onClose={() => setWarningTermsAndConditions(false)} dismissible>
        <Alert.Heading>Warning!</Alert.Heading>
        <p>
          This website does not take responsibility for any information given or provided. Please compare your waterfall results against your own information for accurecy. Please check terms and condition box.
        </p>
      </Alert>}
                     <Button variant="info" onClick={handleShowSave} className="me-2">
        Save Info
      </Button>

      <Offcanvas show={showSave} onHide={handleCloseSave} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Saved Data</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          To save time click the button bellow. Save the code somewhere safe for later.
           Whenever you come back take the code you saved and place it in the text box bellow. All of your information and preferences will return
          <br></br>
          <Button variant="info" onClick={saveInfo}>
        Show me what to save
      </Button>
      <br>
      
      </br>
      <ListGroup>
      <ListGroup.Item disabled>Take this info and put it somewhere safe</ListGroup.Item>
      <ListGroup.Item>{savedInfo}</ListGroup.Item>
    </ListGroup>
    <Form>
     
      <Form.Group className="mb-3"  onChange={inputSavedData}>
        <Form.Label>Input Saved Data Here.</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
    </Form>
        </Offcanvas.Body>
      </Offcanvas>
                <br></br>
                <DealInfo dealInfo={dealInfo} setDealInfo={setDealInfo}></DealInfo>
                <br></br>
 <Button  variant="outline-primary" onClick={addPandL}>Add Statement</Button>

 <Accordion defaultActiveKey={['0']} alwaysOpen>
              {pAndLs && pAndLs.map((item, i) => {
                    return (
                        
        <div key={i}>

<Accordion.Item eventKey={i}>
        <Accordion.Header>Account #{i+1}: {pAndLs[i].transaction_name}  &rarr;   <Button variant="danger" size="sm" id={i} onClick={deleteYear}>
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
   <Row>
      <Col md={{ span: 2, offset: 3 }}>   
      <Button  variant="outline-primary" onClick={SendApi}> Calculate</Button>

      
      </Col>  <Col md={{ span: 2, offset: 2 }}>   
      <PNLSetInfo setDealInfo={setDealInfo} setPandLs={setPandLs}></PNLSetInfo>

    </Col>  
               </Row>
   <br></br>

<br></br>
<Tabs
      defaultActiveKey="Catagories"
      id="uncontrolled-tab-example"
      transition={false}
      className="mb-3"
    >
      <Tab eventKey="Catagories" title="Categories">
      
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
        <th>Name</th>
        <th>Amount</th>
        <th>Gross sqr footage</th>
        <th>Net sqr footage</th>
        <th>Unit amount</th>
      
      </tr>
      </thead>
      <tbody>
      {Object.entries(value['seperate_costs']).map( ([key2, value2],index) => {
          return (
            <tr>
            <td>{index + 1}</td>
            <td>{value2['name']}</td>
            <td>{value2['total_amount'].toLocaleString()}</td>
            <td>{value2['gross_sqr_footage'].toLocaleString()}</td>
            <td>{value2['net_sqr_footage'].toLocaleString()}</td>
            <td>{value2['unit_amount'].toLocaleString()}</td>
          
          </tr>
        )
        })}
      
        <tr>
          <td>Total</td>
          <td>-</td>
          <td>{value['totals'].toLocaleString()}</td>
          <td>{value['gross_sqr_footage'].toLocaleString()}</td>
          <td>{value['net_sqr_footage'].toLocaleString()}</td>
          <td>{value['unit_amount'].toLocaleString()}</td>
        </tr>
       
      </tbody>
      </Table>
      <hr></hr>
    </div>
   )
  } )}
  </th>
   </tbody>
          </Table>
          {respCatagoriesTotal && <div>
          <h4>Totals</h4>
                    <Table striped bordered hover>
          <thead>
                  <tr>
                  
                  <th>#</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Gross sqr footage</th>
                  <th>Net sqr footage</th>
                  <th>Unit amount</th>
                </tr>
                </thead>
                <tbody>
                  
          { Object.entries(respCatagoriesTotal['communal_totals']).map( ([key3, value3],index) => {
                    return (
                      <tr>
                      <td>{index + 1}</td>
                      <td>{key3}</td>
                      <td>{value3['totals'].toLocaleString()}</td>
                      <td>{value3['gross_sqr_footage'].toLocaleString()}</td>
                      <td>{value3['net_sqr_footage'].toLocaleString()}</td>
                      <td>{value3['unit_amount'].toLocaleString()}</td>
                    </tr>
                  )
                  })}
                
                <tr>
                    <td>Total</td>
                    <td>-</td>
                    <td>{respCatagoriesTotal['totals'].toLocaleString()}</td>
                    <td>{respCatagoriesTotal['gross_sqr_footage'].toLocaleString()}</td>
                    <td>{respCatagoriesTotal['net_sqr_footage'].toLocaleString()}</td>
                    <td>{respCatagoriesTotal['unit_amount'].toLocaleString()}</td>
                  </tr>
                 
                </tbody>
                </Table>
                </div>}


      </Tab>
      <Tab eventKey="Month" title="Month">
<hr></hr>

      <Tabs
      id="uncontrolled-tab-example"
      className="mb-3"
    >

   
      {respMonth && Object.entries(respMonth).map( ([k, v],index) => {
          return (
            <Tab eventKey={k} title={k}>
              {/* <Tab eventKey="home" title="Home">
                HI
      </Tab> */}
         <h3>Year-Month {k}</h3>
                  { Object.entries(v).map( ([key, value],i) => {
                    return (
              <div>
                <Table striped bordered hover>
          <thead>
          <tr>         
                  <th colSpan={4}>{key}</th>           
                </tr>    

                  <tr>
                  
                  <th>#</th>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Gross sqr footage</th>
                  <th>Net sqr footage</th>
                  <th>Unit amount</th>
                  <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(value['seperate_costs']).map( ([key2, value2],index) => {
                    return (
                      <tr>
                      <td>{index + 1}</td>
                      <td>{value2['name']}</td>
                      <td>{value2['amount'].toLocaleString()}</td>
                      <td>{value2['gross_sqr_footage'].toLocaleString()}</td>
                      <td>{value2['net_sqr_footage'].toLocaleString()}</td>
                      <td>{value2['unit_amount'].toLocaleString()}</td>
                      <td>{value2['date']}</td>
                    
                    </tr>
                  )
                  })}
                
                  <tr>
                    <td>Total</td>
                    <td>-</td>
                    <td>{value['totals'].toLocaleString()}</td>
                    <td>{value['gross_sqr_footage'].toLocaleString()}</td>
                    <td>{value['net_sqr_footage'].toLocaleString()}</td>
                    <td>{value['unit_amount'].toLocaleString()}</td>
                  </tr>
                 
                </tbody>
                </Table>
              </div>
             )
            } )}
                      <h4>Totals</h4>
                    <Table striped bordered hover>
          <thead>
                  <tr>

                  <th>#</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Gross sqr footage</th>
                  <th>Net sqr footage</th>
                  <th>Unit amount</th>
                                  </tr>
                </thead>
                <tbody>
          {Object.entries(respMonthTotal[k]['communal_totals']).map( ([key3, value3],index) => {
                    return (
                      <tr>
                      <td>{index + 1}</td>
                      <td>{key3}</td>
                      <td>{value3['totals'].toLocaleString()}</td>
                      <td>{value3['gross_sqr_footage'].toLocaleString()}</td>
                      <td>{value3['net_sqr_footage'].toLocaleString()}</td>
                      <td>{value3['unit_amount'].toLocaleString()}</td>
                    
                    </tr>
                  )
                  })}
                
                <tr>
                    <td>Total</td>
                    <td>-</td>
                    <td>{respMonthTotal[k]['totals'].toLocaleString()}</td>
                    <td>{respMonthTotal[k]['gross_sqr_footage'].toLocaleString()}</td>
                    <td>{respMonthTotal[k]['net_sqr_footage'].toLocaleString()}</td>
                    <td>{respMonthTotal[k]['unit_amount'].toLocaleString()}</td>

                  </tr>
                 
                </tbody>
                </Table>
                <hr></hr>

         </Tab>
        )
        })}

</Tabs>



        </Tab>
      <Tab eventKey="Year" title="Year" >
        <hr></hr>
      <Tabs
      id="uncontrolled-tab-example"
      className="mb-3"
    >

      {respYear && Object.entries(respYear).map( ([k, v],index) => {
          return (
            <Tab eventKey={k} title={k}>
         <h3>Year {k}</h3>
                  { Object.entries(v).map( ([key, value],i) => {
                    return (
                      <div>
                <h4></h4>
                <Table striped bordered hover>
          <thead>
          <tr>         
                  <th colSpan={4}>{key}</th>           
                </tr>    
                              <tr>
                  
                  <th>#</th>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Gross sqr footage</th>
                  <th>Net sqr footage</th>
                  <th>Unit amount</th>
                  <th>Date</th>
                
                </tr>
                </thead>
                <tbody>
                {Object.entries(value['seperate_costs']).map( ([key2, value2],index) => {
                    return (
                      <tr>
                      <td>{index + 1}</td>
                      <td>{value2['name']}</td>
                      <td>{value2['amount'].toLocaleString()}</td>
                      <td>{value2['gross_sqr_footage'].toLocaleString()}</td>
                      <td>{value2['net_sqr_footage'].toLocaleString()}</td>
                      <td>{value2['unit_amount'].toLocaleString()}</td>
                      <td>{value2['date']}</td>
                    
                    </tr>
                  )
                  })}
                
                  <tr>
                    <td>Total</td>
                    <td>-</td>
                    <td>{value['totals'].toLocaleString()}</td>
                    <td>{value['gross_sqr_footage'].toLocaleString()}</td>
                    <td>{value['net_sqr_footage'].toLocaleString()}</td>
                    <td>{value['unit_amount'].toLocaleString()}</td>

                  </tr>
                 
                </tbody>
                </Table>
              </div>
             )
            } )}
            <h4>Totals</h4>
                    <Table striped bordered hover>
          <thead>
                  <tr>

                  <th>#</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Gross sqr footage</th>
                  <th>Net sqr footage</th>
                  <th>Unit amount</th>
                                  </tr>
                </thead>
                <tbody>
          {Object.entries(respYearTotal[k]['communal_totals']).map( ([key3, value3],index) => {
                    return (
                      <tr>
                      <td>{index + 1}</td>
                      <td>{key3}</td>
                      <td>{value3['totals'].toLocaleString()}</td>
                      <td>{value3['gross_sqr_footage'].toLocaleString()}</td>
                      <td>{value3['net_sqr_footage'].toLocaleString()}</td>
                      <td>{value3['unit_amount'].toLocaleString()}</td>
                    </tr>
                  )
                  })}
                
                <tr>
                    <td>Total</td>
                    <td>-</td>
                    <td>{respYearTotal[k]['totals'].toLocaleString()}</td>
                    <td>{respYearTotal[k]['gross_sqr_footage'].toLocaleString()}</td>
                    <td>{respYearTotal[k]['net_sqr_footage'].toLocaleString()}</td>
                    <td>{respYearTotal[k]['unit_amount'].toLocaleString()}</td>
                  </tr>
                 
                </tbody>
                </Table>


                <hr></hr>




         </Tab>
        )
        })}
                 </Tabs>

      </Tab>
    </Tabs>

              </>
    )
}
 
export default ParentPandL;
// {"deal_info":{"name":"Money Maker","address":"123 Sesame street","gross_sqr_footage":144000,"investment_type":"multi_family","unit_amount":40,"net_sqr_footage":92000,"purchase_price":8000000,"purchase_date":"2023-05-16T07:11:44.000Z"},"pandls":[{"transaction_name":"Transfer Taxes","transaction_type":"closing_costs","transactions":[{"amount":"400000","date":"2019-05-01T07:14:21.000Z"}]},{"transaction_name":"legal fee","transaction_type":"closing_costs","transactions":[{"amount":"80000","date":"2019-05-01T07:14:43.000Z"}]},{"transaction_name":"Due Diligence","transaction_type":"closing_costs","transactions":[{"amount":"50000","date":"2019-05-01T07:15:15.000Z"}]},{"transaction_name":"land Purchase","transaction_type":"closing_costs","transactions":[{"amount":"8000000","date":"2019-05-01T07:31:02.000Z"}]},{"transaction_name":"Architect","transaction_type":"soft_costs","transactions":[{"amount":"48000","date":"2019-06-01T06:05:24.000Z"},{"amount":48000,"date":"2019-07-01T06:05:24.000Z"},{"amount":48000,"date":"2019-08-01T06:05:24.000Z"},{"amount":48000,"date":"2019-09-01T06:05:24.000Z"},{"amount":48000,"date":"2019-10-01T06:05:24.000Z"},{"amount":48000,"date":"2019-11-01T07:05:24.000Z"},{"amount":48000,"date":"2019-12-01T07:05:24.000Z"},{"amount":48000,"date":"2020-01-01T07:05:24.000Z"},{"amount":48000,"date":"2020-02-01T07:05:24.000Z"},{"amount":48000,"date":"2020-03-01T07:05:24.000Z"},{"amount":48000,"date":"2020-04-01T06:05:24.000Z"},{"amount":48000,"date":"2020-05-01T06:05:24.000Z"},{"amount":48000,"date":"2020-06-01T06:05:24.000Z"},{"amount":48000,"date":"2020-07-01T06:05:24.000Z"},{"amount":48000,"date":"2020-08-01T06:05:24.000Z"},{"amount":48000,"date":"2020-09-01T06:05:24.000Z"},{"amount":48000,"date":"2020-10-01T06:05:24.000Z"},{"amount":48000,"date":"2020-11-01T07:05:24.000Z"},{"amount":48000,"date":"2020-12-01T07:05:24.000Z"},{"amount":48000,"date":"2021-01-01T07:05:24.000Z"},{"amount":48000,"date":"2021-02-01T07:05:24.000Z"},{"amount":48000,"date":"2021-03-01T07:05:24.000Z"},{"amount":48000,"date":"2021-04-01T06:05:24.000Z"},{"amount":48000,"date":"2021-05-01T06:05:24.000Z"},{"amount":48000,"date":"2021-06-01T06:05:24.000Z"}]},{"transaction_name":"Engineering","transaction_type":"soft_costs","transactions":[{"amount":"16000","date":"2019-06-01T06:05:24.000Z"},{"amount":16000,"date":"2019-07-01T06:05:24.000Z"},{"amount":16000,"date":"2019-08-01T06:05:24.000Z"},{"amount":16000,"date":"2019-09-01T06:05:24.000Z"},{"amount":16000,"date":"2019-10-01T06:05:24.000Z"},{"amount":16000,"date":"2019-11-01T07:05:24.000Z"},{"amount":16000,"date":"2019-12-01T07:05:24.000Z"},{"amount":16000,"date":"2020-01-01T07:05:24.000Z"},{"amount":16000,"date":"2020-02-01T07:05:24.000Z"},{"amount":16000,"date":"2020-03-01T07:05:24.000Z"},{"amount":16000,"date":"2020-04-01T06:05:24.000Z"},{"amount":16000,"date":"2020-05-01T06:05:24.000Z"},{"amount":16000,"date":"2020-06-01T06:05:24.000Z"},{"amount":16000,"date":"2020-07-01T06:05:24.000Z"},{"amount":16000,"date":"2020-08-01T06:05:24.000Z"},{"amount":16000,"date":"2020-09-01T06:05:24.000Z"},{"amount":16000,"date":"2020-10-01T06:05:24.000Z"},{"amount":16000,"date":"2020-11-01T07:05:24.000Z"},{"amount":16000,"date":"2020-12-01T07:05:24.000Z"},{"amount":16000,"date":"2021-01-01T07:05:24.000Z"},{"amount":16000,"date":"2021-02-01T07:05:24.000Z"},{"amount":16000,"date":"2021-03-01T07:05:24.000Z"},{"amount":16000,"date":"2021-04-01T06:05:24.000Z"},{"amount":16000,"date":"2021-05-01T06:05:24.000Z"},{"amount":16000,"date":"2021-06-01T06:05:24.000Z"}]},{"transaction_name":"legal fee","transaction_type":"soft_costs","transactions":[{"amount":"6000","date":"2019-06-01T06:05:24.000Z"},{"amount":6000,"date":"2019-07-01T06:05:24.000Z"},{"amount":6000,"date":"2019-08-01T06:05:24.000Z"},{"amount":6000,"date":"2019-09-01T06:05:24.000Z"},{"amount":6000,"date":"2019-10-01T06:05:24.000Z"},{"amount":6000,"date":"2019-11-01T07:05:24.000Z"},{"amount":6000,"date":"2019-12-01T07:05:24.000Z"},{"amount":6000,"date":"2020-01-01T07:05:24.000Z"},{"amount":6000,"date":"2020-02-01T07:05:24.000Z"},{"amount":6000,"date":"2020-03-01T07:05:24.000Z"},{"amount":6000,"date":"2020-04-01T06:05:24.000Z"},{"amount":6000,"date":"2020-05-01T06:05:24.000Z"},{"amount":6000,"date":"2020-06-01T06:05:24.000Z"},{"amount":6000,"date":"2020-07-01T06:05:24.000Z"},{"amount":6000,"date":"2020-08-01T06:05:24.000Z"},{"amount":6000,"date":"2020-09-01T06:05:24.000Z"},{"amount":6000,"date":"2020-10-01T06:05:24.000Z"},{"amount":6000,"date":"2020-11-01T07:05:24.000Z"},{"amount":6000,"date":"2020-12-01T07:05:24.000Z"},{"amount":6000,"date":"2021-01-01T07:05:24.000Z"},{"amount":6000,"date":"2021-02-01T07:05:24.000Z"},{"amount":6000,"date":"2021-03-01T07:05:24.000Z"},{"amount":6000,"date":"2021-04-01T06:05:24.000Z"},{"amount":6000,"date":"2021-05-01T06:05:24.000Z"},{"amount":6000,"date":"2021-06-01T06:05:24.000Z"}]},{"transaction_name":"Entitlement consultants","transaction_type":"soft_costs","transactions":[{"amount":"6000","date":"2019-06-01T06:05:24.000Z"},{"amount":6000,"date":"2019-07-01T06:05:24.000Z"},{"amount":6000,"date":"2019-08-01T06:05:24.000Z"},{"amount":6000,"date":"2019-09-01T06:05:24.000Z"},{"amount":6000,"date":"2019-10-01T06:05:24.000Z"},{"amount":6000,"date":"2019-11-01T07:05:24.000Z"},{"amount":6000,"date":"2019-12-01T07:05:24.000Z"},{"amount":6000,"date":"2020-01-01T07:05:24.000Z"},{"amount":6000,"date":"2020-02-01T07:05:24.000Z"},{"amount":6000,"date":"2020-03-01T07:05:24.000Z"},{"amount":6000,"date":"2020-04-01T06:05:24.000Z"},{"amount":6000,"date":"2020-05-01T06:05:24.000Z"},{"amount":6000,"date":"2020-06-01T06:05:24.000Z"},{"amount":6000,"date":"2020-07-01T06:05:24.000Z"},{"amount":6000,"date":"2020-08-01T06:05:24.000Z"},{"amount":6000,"date":"2020-09-01T06:05:24.000Z"},{"amount":6000,"date":"2020-10-01T06:05:24.000Z"},{"amount":6000,"date":"2020-11-01T07:05:24.000Z"},{"amount":6000,"date":"2020-12-01T07:05:24.000Z"},{"amount":6000,"date":"2021-01-01T07:05:24.000Z"},{"amount":6000,"date":"2021-02-01T07:05:24.000Z"},{"amount":6000,"date":"2021-03-01T07:05:24.000Z"},{"amount":6000,"date":"2021-04-01T06:05:24.000Z"},{"amount":6000,"date":"2021-05-01T06:05:24.000Z"},{"amount":6000,"date":"2021-06-01T06:05:24.000Z"}]},{"transaction_name":"Entitlement Fees","transaction_type":"soft_costs","transactions":[{"amount":"6000","date":"2019-06-01T06:05:24.000Z"},{"amount":6000,"date":"2019-07-01T06:05:24.000Z"},{"amount":6000,"date":"2019-08-01T06:05:24.000Z"},{"amount":6000,"date":"2019-09-01T06:05:24.000Z"},{"amount":6000,"date":"2019-10-01T06:05:24.000Z"},{"amount":6000,"date":"2019-11-01T07:05:24.000Z"},{"amount":6000,"date":"2019-12-01T07:05:24.000Z"},{"amount":6000,"date":"2020-01-01T07:05:24.000Z"},{"amount":6000,"date":"2020-02-01T07:05:24.000Z"},{"amount":6000,"date":"2020-03-01T07:05:24.000Z"},{"amount":6000,"date":"2020-04-01T06:05:24.000Z"},{"amount":6000,"date":"2020-05-01T06:05:24.000Z"},{"amount":6000,"date":"2020-06-01T06:05:24.000Z"},{"amount":6000,"date":"2020-07-01T06:05:24.000Z"},{"amount":6000,"date":"2020-08-01T06:05:24.000Z"},{"amount":6000,"date":"2020-09-01T06:05:24.000Z"},{"amount":6000,"date":"2020-10-01T06:05:24.000Z"},{"amount":6000,"date":"2020-11-01T07:05:24.000Z"},{"amount":6000,"date":"2020-12-01T07:05:24.000Z"},{"amount":6000,"date":"2021-01-01T07:05:24.000Z"},{"amount":6000,"date":"2021-02-01T07:05:24.000Z"},{"amount":6000,"date":"2021-03-01T07:05:24.000Z"},{"amount":6000,"date":"2021-04-01T06:05:24.000Z"},{"amount":6000,"date":"2021-05-01T06:05:24.000Z"},{"amount":6000,"date":"2021-06-01T06:05:24.000Z"}]},{"transaction_name":"Sitework","transaction_type":"hard_costs","transactions":[{"amount":"200000","date":"2019-06-01T06:05:24.000Z"},{"amount":200000,"date":"2019-07-01T06:05:24.000Z"},{"amount":200000,"date":"2019-08-01T06:05:24.000Z"},{"amount":200000,"date":"2019-09-01T06:05:24.000Z"},{"amount":200000,"date":"2019-10-01T06:05:24.000Z"},{"amount":200000,"date":"2019-11-01T07:05:24.000Z"},{"amount":200000,"date":"2019-12-01T07:05:24.000Z"},{"amount":200000,"date":"2020-01-01T07:05:24.000Z"},{"amount":200000,"date":"2020-02-01T07:05:24.000Z"},{"amount":200000,"date":"2020-03-01T07:05:24.000Z"},{"amount":200000,"date":"2020-04-01T06:05:24.000Z"},{"amount":200000,"date":"2020-05-01T06:05:24.000Z"},{"amount":200000,"date":"2020-06-01T06:05:24.000Z"},{"amount":200000,"date":"2020-07-01T06:05:24.000Z"},{"amount":200000,"date":"2020-08-01T06:05:24.000Z"},{"amount":200000,"date":"2020-09-01T06:05:24.000Z"},{"amount":200000,"date":"2020-10-01T06:05:24.000Z"},{"amount":200000,"date":"2020-11-01T07:05:24.000Z"},{"amount":200000,"date":"2020-12-01T07:05:24.000Z"},{"amount":200000,"date":"2021-01-01T07:05:24.000Z"},{"amount":200000,"date":"2021-02-01T07:05:24.000Z"},{"amount":200000,"date":"2021-03-01T07:05:24.000Z"},{"amount":200000,"date":"2021-04-01T06:05:24.000Z"},{"amount":200000,"date":"2021-05-01T06:05:24.000Z"},{"amount":200000,"date":"2021-06-01T06:05:24.000Z"}]},{"transaction_name":"Foundation","transaction_type":"hard_costs","transactions":[{"amount":"120000","date":"2019-06-01T06:05:24.000Z"},{"amount":120000,"date":"2019-07-01T06:05:24.000Z"},{"amount":120000,"date":"2019-08-01T06:05:24.000Z"},{"amount":120000,"date":"2019-09-01T06:05:24.000Z"},{"amount":120000,"date":"2019-10-01T06:05:24.000Z"},{"amount":120000,"date":"2019-11-01T07:05:24.000Z"},{"amount":120000,"date":"2019-12-01T07:05:24.000Z"},{"amount":120000,"date":"2020-01-01T07:05:24.000Z"},{"amount":120000,"date":"2020-02-01T07:05:24.000Z"},{"amount":120000,"date":"2020-03-01T07:05:24.000Z"},{"amount":120000,"date":"2020-04-01T06:05:24.000Z"},{"amount":120000,"date":"2020-05-01T06:05:24.000Z"},{"amount":120000,"date":"2020-06-01T06:05:24.000Z"},{"amount":120000,"date":"2020-07-01T06:05:24.000Z"},{"amount":120000,"date":"2020-08-01T06:05:24.000Z"},{"amount":120000,"date":"2020-09-01T06:05:24.000Z"},{"amount":120000,"date":"2020-10-01T06:05:24.000Z"},{"amount":120000,"date":"2020-11-01T07:05:24.000Z"},{"amount":120000,"date":"2020-12-01T07:05:24.000Z"},{"amount":120000,"date":"2021-01-01T07:05:24.000Z"},{"amount":120000,"date":"2021-02-01T07:05:24.000Z"},{"amount":120000,"date":"2021-03-01T07:05:24.000Z"},{"amount":120000,"date":"2021-04-01T06:05:24.000Z"},{"amount":120000,"date":"2021-05-01T06:05:24.000Z"},{"amount":120000,"date":"2021-06-01T06:05:24.000Z"}]},{"transaction_name":"Structure","transaction_type":"hard_costs","transactions":[{"amount":"120000","date":"2019-06-01T06:05:24.000Z"},{"amount":120000,"date":"2019-07-01T06:05:24.000Z"},{"amount":120000,"date":"2019-08-01T06:05:24.000Z"},{"amount":120000,"date":"2019-09-01T06:05:24.000Z"},{"amount":120000,"date":"2019-10-01T06:05:24.000Z"},{"amount":120000,"date":"2019-11-01T07:05:24.000Z"},{"amount":120000,"date":"2019-12-01T07:05:24.000Z"},{"amount":120000,"date":"2020-01-01T07:05:24.000Z"},{"amount":120000,"date":"2020-02-01T07:05:24.000Z"},{"amount":120000,"date":"2020-03-01T07:05:24.000Z"},{"amount":120000,"date":"2020-04-01T06:05:24.000Z"},{"amount":120000,"date":"2020-05-01T06:05:24.000Z"},{"amount":120000,"date":"2020-06-01T06:05:24.000Z"},{"amount":120000,"date":"2020-07-01T06:05:24.000Z"},{"amount":120000,"date":"2020-08-01T06:05:24.000Z"},{"amount":120000,"date":"2020-09-01T06:05:24.000Z"},{"amount":120000,"date":"2020-10-01T06:05:24.000Z"},{"amount":120000,"date":"2020-11-01T07:05:24.000Z"},{"amount":120000,"date":"2020-12-01T07:05:24.000Z"},{"amount":120000,"date":"2021-01-01T07:05:24.000Z"},{"amount":120000,"date":"2021-02-01T07:05:24.000Z"},{"amount":120000,"date":"2021-03-01T07:05:24.000Z"},{"amount":120000,"date":"2021-04-01T06:05:24.000Z"},{"amount":120000,"date":"2021-05-01T06:05:24.000Z"},{"amount":120000,"date":"2021-06-01T06:05:24.000Z"}]},{"transaction_name":"MEP","transaction_type":"hard_costs","transactions":[{"amount":"240000","date":"2019-06-01T06:05:24.000Z"},{"amount":240000,"date":"2019-07-01T06:05:24.000Z"},{"amount":240000,"date":"2019-08-01T06:05:24.000Z"},{"amount":240000,"date":"2019-09-01T06:05:24.000Z"},{"amount":240000,"date":"2019-10-01T06:05:24.000Z"},{"amount":240000,"date":"2019-11-01T07:05:24.000Z"},{"amount":240000,"date":"2019-12-01T07:05:24.000Z"},{"amount":240000,"date":"2020-01-01T07:05:24.000Z"},{"amount":240000,"date":"2020-02-01T07:05:24.000Z"},{"amount":240000,"date":"2020-03-01T07:05:24.000Z"},{"amount":240000,"date":"2020-04-01T06:05:24.000Z"},{"amount":240000,"date":"2020-05-01T06:05:24.000Z"},{"amount":240000,"date":"2020-06-01T06:05:24.000Z"},{"amount":240000,"date":"2020-07-01T06:05:24.000Z"},{"amount":240000,"date":"2020-08-01T06:05:24.000Z"},{"amount":240000,"date":"2020-09-01T06:05:24.000Z"},{"amount":240000,"date":"2020-10-01T06:05:24.000Z"},{"amount":240000,"date":"2020-11-01T07:05:24.000Z"},{"amount":240000,"date":"2020-12-01T07:05:24.000Z"},{"amount":240000,"date":"2021-01-01T07:05:24.000Z"},{"amount":240000,"date":"2021-02-01T07:05:24.000Z"},{"amount":240000,"date":"2021-03-01T07:05:24.000Z"},{"amount":240000,"date":"2021-04-01T06:05:24.000Z"},{"amount":240000,"date":"2021-05-01T06:05:24.000Z"},{"amount":240000,"date":"2021-06-01T06:05:24.000Z"}]},{"transaction_name":"Exteriors","transaction_type":"hard_costs","transactions":[{"amount":"320000","date":"2019-06-01T06:05:24.000Z"},{"amount":320000,"date":"2019-07-01T06:05:24.000Z"},{"amount":320000,"date":"2019-08-01T06:05:24.000Z"},{"amount":320000,"date":"2019-09-01T06:05:24.000Z"},{"amount":320000,"date":"2019-10-01T06:05:24.000Z"},{"amount":320000,"date":"2019-11-01T07:05:24.000Z"},{"amount":320000,"date":"2019-12-01T07:05:24.000Z"},{"amount":320000,"date":"2020-01-01T07:05:24.000Z"},{"amount":320000,"date":"2020-02-01T07:05:24.000Z"},{"amount":320000,"date":"2020-03-01T07:05:24.000Z"},{"amount":320000,"date":"2020-04-01T06:05:24.000Z"},{"amount":320000,"date":"2020-05-01T06:05:24.000Z"},{"amount":320000,"date":"2020-06-01T06:05:24.000Z"},{"amount":320000,"date":"2020-07-01T06:05:24.000Z"},{"amount":320000,"date":"2020-08-01T06:05:24.000Z"},{"amount":320000,"date":"2020-09-01T06:05:24.000Z"},{"amount":320000,"date":"2020-10-01T06:05:24.000Z"},{"amount":320000,"date":"2020-11-01T07:05:24.000Z"},{"amount":320000,"date":"2020-12-01T07:05:24.000Z"},{"amount":320000,"date":"2021-01-01T07:05:24.000Z"},{"amount":320000,"date":"2021-02-01T07:05:24.000Z"},{"amount":320000,"date":"2021-03-01T07:05:24.000Z"},{"amount":320000,"date":"2021-04-01T06:05:24.000Z"},{"amount":320000,"date":"2021-05-01T06:05:24.000Z"},{"amount":320000,"date":"2021-06-01T06:05:24.000Z"}]},{"transaction_name":"Interiors","transaction_type":"hard_costs","transactions":[{"amount":"400000","date":"2019-06-01T06:05:24.000Z"},{"amount":400000,"date":"2019-07-01T06:05:24.000Z"},{"amount":400000,"date":"2019-08-01T06:05:24.000Z"},{"amount":400000,"date":"2019-09-01T06:05:24.000Z"},{"amount":400000,"date":"2019-10-01T06:05:24.000Z"},{"amount":400000,"date":"2019-11-01T07:05:24.000Z"},{"amount":400000,"date":"2019-12-01T07:05:24.000Z"},{"amount":400000,"date":"2020-01-01T07:05:24.000Z"},{"amount":400000,"date":"2020-02-01T07:05:24.000Z"},{"amount":400000,"date":"2020-03-01T07:05:24.000Z"},{"amount":400000,"date":"2020-04-01T06:05:24.000Z"},{"amount":400000,"date":"2020-05-01T06:05:24.000Z"},{"amount":400000,"date":"2020-06-01T06:05:24.000Z"},{"amount":400000,"date":"2020-07-01T06:05:24.000Z"},{"amount":400000,"date":"2020-08-01T06:05:24.000Z"},{"amount":400000,"date":"2020-09-01T06:05:24.000Z"},{"amount":400000,"date":"2020-10-01T06:05:24.000Z"},{"amount":400000,"date":"2020-11-01T07:05:24.000Z"},{"amount":400000,"date":"2020-12-01T07:05:24.000Z"},{"amount":400000,"date":"2021-01-01T07:05:24.000Z"},{"amount":400000,"date":"2021-02-01T07:05:24.000Z"},{"amount":400000,"date":"2021-03-01T07:05:24.000Z"},{"amount":400000,"date":"2021-04-01T06:05:24.000Z"},{"amount":400000,"date":"2021-05-01T06:05:24.000Z"},{"amount":400000,"date":"2021-06-01T06:05:24.000Z"}]},{"transaction_name":"Personnel","transaction_type":"g_a","transactions":[{"amount":"20000","date":"2019-06-01T06:05:24.000Z"},{"amount":20000,"date":"2019-07-01T06:05:24.000Z"},{"amount":20000,"date":"2019-08-01T06:05:24.000Z"},{"amount":20000,"date":"2019-09-01T06:05:24.000Z"},{"amount":20000,"date":"2019-10-01T06:05:24.000Z"},{"amount":20000,"date":"2019-11-01T07:05:24.000Z"},{"amount":20000,"date":"2019-12-01T07:05:24.000Z"},{"amount":20000,"date":"2020-01-01T07:05:24.000Z"},{"amount":20000,"date":"2020-02-01T07:05:24.000Z"},{"amount":20000,"date":"2020-03-01T07:05:24.000Z"},{"amount":20000,"date":"2020-04-01T06:05:24.000Z"},{"amount":20000,"date":"2020-05-01T06:05:24.000Z"},{"amount":20000,"date":"2020-06-01T06:05:24.000Z"},{"amount":20000,"date":"2020-07-01T06:05:24.000Z"},{"amount":20000,"date":"2020-08-01T06:05:24.000Z"},{"amount":20000,"date":"2020-09-01T06:05:24.000Z"},{"amount":20000,"date":"2020-10-01T06:05:24.000Z"},{"amount":20000,"date":"2020-11-01T07:05:24.000Z"},{"amount":20000,"date":"2020-12-01T07:05:24.000Z"},{"amount":20000,"date":"2021-01-01T07:05:24.000Z"},{"amount":20000,"date":"2021-02-01T07:05:24.000Z"},{"amount":20000,"date":"2021-03-01T07:05:24.000Z"},{"amount":20000,"date":"2021-04-01T06:05:24.000Z"},{"amount":20000,"date":"2021-05-01T06:05:24.000Z"},{"amount":20000,"date":"2021-06-01T06:05:24.000Z"}]},{"transaction_name":"Office costs","transaction_type":"g_a","transactions":[{"amount":"8000","date":"2019-06-01T06:05:24.000Z"},{"amount":8000,"date":"2019-07-01T06:05:24.000Z"},{"amount":8000,"date":"2019-08-01T06:05:24.000Z"},{"amount":8000,"date":"2019-09-01T06:05:24.000Z"},{"amount":8000,"date":"2019-10-01T06:05:24.000Z"},{"amount":8000,"date":"2019-11-01T07:05:24.000Z"},{"amount":8000,"date":"2019-12-01T07:05:24.000Z"},{"amount":8000,"date":"2020-01-01T07:05:24.000Z"},{"amount":8000,"date":"2020-02-01T07:05:24.000Z"},{"amount":8000,"date":"2020-03-01T07:05:24.000Z"},{"amount":8000,"date":"2020-04-01T06:05:24.000Z"},{"amount":8000,"date":"2020-05-01T06:05:24.000Z"},{"amount":8000,"date":"2020-06-01T06:05:24.000Z"},{"amount":8000,"date":"2020-07-01T06:05:24.000Z"},{"amount":8000,"date":"2020-08-01T06:05:24.000Z"},{"amount":8000,"date":"2020-09-01T06:05:24.000Z"},{"amount":8000,"date":"2020-10-01T06:05:24.000Z"},{"amount":8000,"date":"2020-11-01T07:05:24.000Z"},{"amount":8000,"date":"2020-12-01T07:05:24.000Z"},{"amount":8000,"date":"2021-01-01T07:05:24.000Z"},{"amount":8000,"date":"2021-02-01T07:05:24.000Z"},{"amount":8000,"date":"2021-03-01T07:05:24.000Z"},{"amount":8000,"date":"2021-04-01T06:05:24.000Z"},{"amount":8000,"date":"2021-05-01T06:05:24.000Z"},{"amount":8000,"date":"2021-06-01T06:05:24.000Z"}]},{"transaction_name":"Developer Fee","transaction_type":"g_a","transactions":[{"amount":"40000","date":"2019-06-01T06:05:24.000Z"},{"amount":40000,"date":"2019-07-01T06:05:24.000Z"},{"amount":40000,"date":"2019-08-01T06:05:24.000Z"},{"amount":40000,"date":"2019-09-01T06:05:24.000Z"},{"amount":40000,"date":"2019-10-01T06:05:24.000Z"},{"amount":40000,"date":"2019-11-01T07:05:24.000Z"},{"amount":40000,"date":"2019-12-01T07:05:24.000Z"},{"amount":40000,"date":"2020-01-01T07:05:24.000Z"},{"amount":40000,"date":"2020-02-01T07:05:24.000Z"},{"amount":40000,"date":"2020-03-01T07:05:24.000Z"},{"amount":40000,"date":"2020-04-01T06:05:24.000Z"},{"amount":40000,"date":"2020-05-01T06:05:24.000Z"},{"amount":40000,"date":"2020-06-01T06:05:24.000Z"},{"amount":40000,"date":"2020-07-01T06:05:24.000Z"},{"amount":40000,"date":"2020-08-01T06:05:24.000Z"},{"amount":40000,"date":"2020-09-01T06:05:24.000Z"},{"amount":40000,"date":"2020-10-01T06:05:24.000Z"},{"amount":40000,"date":"2020-11-01T07:05:24.000Z"},{"amount":40000,"date":"2020-12-01T07:05:24.000Z"},{"amount":40000,"date":"2021-01-01T07:05:24.000Z"},{"amount":40000,"date":"2021-02-01T07:05:24.000Z"},{"amount":40000,"date":"2021-03-01T07:05:24.000Z"},{"amount":40000,"date":"2021-04-01T06:05:24.000Z"},{"amount":40000,"date":"2021-05-01T06:05:24.000Z"},{"amount":40000,"date":"2021-06-01T06:05:24.000Z"}]},{"transaction_name":"Sales center buildout","transaction_type":"marketing","transactions":[{"amount":"8000","date":"2019-06-01T06:05:24.000Z"},{"amount":8000,"date":"2019-07-01T06:05:24.000Z"},{"amount":8000,"date":"2019-08-01T06:05:24.000Z"},{"amount":8000,"date":"2019-09-01T06:05:24.000Z"},{"amount":8000,"date":"2019-10-01T06:05:24.000Z"},{"amount":8000,"date":"2019-11-01T07:05:24.000Z"},{"amount":8000,"date":"2019-12-01T07:05:24.000Z"},{"amount":8000,"date":"2020-01-01T07:05:24.000Z"},{"amount":8000,"date":"2020-02-01T07:05:24.000Z"},{"amount":8000,"date":"2020-03-01T07:05:24.000Z"},{"amount":8000,"date":"2020-04-01T06:05:24.000Z"},{"amount":8000,"date":"2020-05-01T06:05:24.000Z"},{"amount":8000,"date":"2020-06-01T06:05:24.000Z"},{"amount":8000,"date":"2020-07-01T06:05:24.000Z"},{"amount":8000,"date":"2020-08-01T06:05:24.000Z"},{"amount":8000,"date":"2020-09-01T06:05:24.000Z"},{"amount":8000,"date":"2020-10-01T06:05:24.000Z"},{"amount":8000,"date":"2020-11-01T07:05:24.000Z"},{"amount":8000,"date":"2020-12-01T07:05:24.000Z"},{"amount":8000,"date":"2021-01-01T07:05:24.000Z"},{"amount":8000,"date":"2021-02-01T07:05:24.000Z"},{"amount":8000,"date":"2021-03-01T07:05:24.000Z"},{"amount":8000,"date":"2021-04-01T06:05:24.000Z"},{"amount":8000,"date":"2021-05-01T06:05:24.000Z"},{"amount":8000,"date":"2021-06-01T06:05:24.000Z"}]},{"transaction_name":"General","transaction_type":"marketing","transactions":[{"amount":"4000","date":"2019-06-01T06:05:24.000Z"},{"amount":4000,"date":"2019-07-01T06:05:24.000Z"},{"amount":4000,"date":"2019-08-01T06:05:24.000Z"},{"amount":4000,"date":"2019-09-01T06:05:24.000Z"},{"amount":4000,"date":"2019-10-01T06:05:24.000Z"},{"amount":4000,"date":"2019-11-01T07:05:24.000Z"},{"amount":4000,"date":"2019-12-01T07:05:24.000Z"},{"amount":4000,"date":"2020-01-01T07:05:24.000Z"},{"amount":4000,"date":"2020-02-01T07:05:24.000Z"},{"amount":4000,"date":"2020-03-01T07:05:24.000Z"},{"amount":4000,"date":"2020-04-01T06:05:24.000Z"},{"amount":4000,"date":"2020-05-01T06:05:24.000Z"},{"amount":4000,"date":"2020-06-01T06:05:24.000Z"},{"amount":4000,"date":"2020-07-01T06:05:24.000Z"},{"amount":4000,"date":"2020-08-01T06:05:24.000Z"},{"amount":4000,"date":"2020-09-01T06:05:24.000Z"},{"amount":4000,"date":"2020-10-01T06:05:24.000Z"},{"amount":4000,"date":"2020-11-01T07:05:24.000Z"},{"amount":4000,"date":"2020-12-01T07:05:24.000Z"},{"amount":4000,"date":"2021-01-01T07:05:24.000Z"},{"amount":4000,"date":"2021-02-01T07:05:24.000Z"},{"amount":4000,"date":"2021-03-01T07:05:24.000Z"},{"amount":4000,"date":"2021-04-01T06:05:24.000Z"},{"amount":4000,"date":"2021-05-01T06:05:24.000Z"},{"amount":4000,"date":"2021-06-01T06:05:24.000Z"}]},{"transaction_name":"Contingency","transaction_type":"miscellaneous","transactions":[{"amount":"175000","date":"2020-05-01T06:05:24.000Z"},{"amount":175000,"date":"2020-06-01T06:05:24.000Z"},{"amount":175000,"date":"2020-07-01T06:05:24.000Z"},{"amount":175000,"date":"2020-08-01T06:05:24.000Z"},{"amount":175000,"date":"2020-09-01T06:05:24.000Z"},{"amount":175000,"date":"2020-10-01T06:05:24.000Z"},{"amount":175000,"date":"2020-11-01T07:05:24.000Z"},{"amount":175000,"date":"2020-12-01T07:05:24.000Z"},{"amount":175000,"date":"2021-01-01T07:05:24.000Z"},{"amount":175000,"date":"2021-02-01T07:05:24.000Z"},{"amount":175000,"date":"2021-03-01T07:05:24.000Z"},{"amount":175000,"date":"2021-04-01T06:05:24.000Z"},{"amount":175000,"date":"2021-05-01T06:05:24.000Z"},{"amount":175000,"date":"2021-06-01T06:05:24.000Z"},{"amount":175000,"date":"2021-07-01T06:05:24.000Z"},{"amount":175000,"date":"2021-08-01T06:05:24.000Z"},{"amount":175000,"date":"2021-09-01T06:05:24.000Z"},{"amount":175000,"date":"2021-10-01T06:05:24.000Z"},{"amount":175000,"date":"2021-11-01T07:05:24.000Z"},{"amount":175000,"date":"2021-12-01T07:05:24.000Z"}]}]}