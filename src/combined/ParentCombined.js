import React, { useState } from 'react'
import PnL from './PnL';
import ParentMortgage from '../mortgageCaluclator/ParentMortgage';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import FamilyTree from '../multiwaterfall/FamilyTree';
import PNLSetInfo from '../profitlosses/PNLSetInfo'
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';
import ReturnInfo from './ReturnInfo';
import ReturnInvestors from './ReturnInvestors';
import SaveInfo from './SaveInfo';
import Alert from 'react-bootstrap/Alert';

const ParentCombined = () => {
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
   
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
      
    const [mortgages, setMortgages] = useState([])

    const [pId, setParentId] = useState(12212);
    const [tree, setTree] = useState({ [12212]: { id: 12212, children: [] } });
    const [waterfall, setWaterfall] = useState({});
    const [lp, setLP] = useState({});
    const [gp, setGP] = useState({});
    const [payoutFrequency, setPayoutFrequency] = useState({ 'start_date' : today,
    'payout_type': 'Year',
    'payout_frequency': 'year',
    'mulitplicationAmount' : .02,
    'startingAmount' : 2000,
    'transactions': [],
        })



        const [respCatagories, setRespCatagories] = useState(true)
        const [respMonth, setRespMonth] = useState(true)
        const [respYear, setRespYear] = useState(true)
        const [respMonthTotal, setRespMonthTotal] = useState(true)
        const [respYearTotal, setRespYearTotal] = useState(true)
        const [respCatagoriesTotal, setRespcatagoriesTotal] = useState()
        const [respUnique, setRespUnique] = useState(true)
        const [respUniqueTotal, setRespUniqueTotal] = useState(true)



        function createMortgageResp(data) {
          let updatedList = mortgages.map((item, i) => 
          {
             return {...item, mortgage_resp: data[i][0], res_payment_list:  data[i][1] }; // else return unmodified item 
          });
          setMortgages(updatedList)
        }

        const formatTree = (tree, parentId = null) => {
          const parent = tree[parentId];
          if (!parent) return null;
        
          const formattedChildren = parent.children.map((childId) =>
            formatTree(tree, childId)
          );
        
          return {
            id: parent.id,
            waterfall: waterfall[parent.id] ? waterfall[parent.id] : null ,
            lp: lp[parent.id] ? lp[parent.id] : null ,
            gp: gp[parent.id] ? gp[parent.id] : null,
            children: formattedChildren.length ? formattedChildren : null,
          };
        };
        const unformatTree = (tree) => {
          const flatTree = {};
         
          const addPerson = (person, parentId = null) => {
            const { id, name, waterfall, lp, gp, children } = person;
            flatTree[id] = { id, name, waterfall, lp, gp, children: [] };
           
            if (parentId) {
              flatTree[parentId].children.push(id);
            }
           
            if (children) {
              children.forEach((child) => addPerson(child, id));
            }
          };
         
          addPerson(tree);
          
          let newLP = {}
          let newGP = {}
          let newWaterfall = {}
          Object.entries(flatTree).map( ([key2, value2],index) => {
          if (value2['gp']){
  
            newGP[key2]= value2['gp']
          }else if (value2['lp']){
            newLP[key2]= value2['lp']
          }else if (value2['waterfall']){
            newWaterfall[key2]= value2['waterfall']
          }
          })
          setGP(newGP)
          setLP(newLP)
          setWaterfall(newWaterfall)
          setTree(flatTree)
          return flatTree;
        };
    const SendApi = (e) => {
     
        if (!acceptTermsAndCondisiotns){
           setWarningTermsAndConditions(true)
           return
         }
         setWarningTermsAndConditions(false)

        // let backend = 'http://127.0.0.1:5000'
        let backend = 'https://distributionresolutionapi.com'
        // let address = `/waterfall_calc`
        let address = `/all_as_one`
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            },
            body: JSON.stringify({'deal_info' : dealInfo,
          'pandls' : pAndLs,
        'mortgages': mortgages,
        'family_tree' : formatTree(tree,pId),
      'payout_frequency': payoutFrequency })
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
    
                createMortgageResp(data.mortgage_info)

                setRespCatagories(data['catagories'])
                setRespMonth(data.month)
                setRespYear(data.year)
                setRespMonthTotal(data.month_totals)
                setRespYearTotal(data.year_totals)
                setRespcatagoriesTotal(data.catagories_totals)
                if (data.user_dates_info){
                  setRespUnique(data.user_dates_info)
                  setRespUniqueTotal(data.user_dates_total)
                }
                if (data.family_tree){
                  unformatTree(data.family_tree)
                }
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
                                         {warningTermsAndConditions &&  <Alert variant="danger" onClose={() => setWarningTermsAndConditions(false)} dismissible>
        <Alert.Heading>Warning!</Alert.Heading>
        <p>
          This website does not take responsibility for any information given or provided. Please compare your waterfall results against your own information for accurecy. Please check terms and condition box.
        </p>
      </Alert>}
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
      <Accordion.Item eventKey="2">
        <Accordion.Header>Investors</Accordion.Header>
        <Accordion.Body>
        <FamilyTree pId={pId} setParentId={setParentId} tree={tree} setTree={setTree} waterfall={waterfall} setWaterfall={setWaterfall} lp={lp} setLP={setLP} gp={gp} setGP={setGP}payoutFrequency={payoutFrequency} setPayoutFrequency={setPayoutFrequency}></FamilyTree>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </Col>
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
   <Row>
      <Col md={{ span: 2, offset: 1 }}>   
      <SaveInfo  dealInfo={dealInfo} setDealInfo={setDealInfo} pAndLs={pAndLs} setPandLs={setPandLs} mortgages={mortgages} tree={formatTree(tree,pId)} payoutFrequency={payoutFrequency} pId={pId} setMortgages={setMortgages} setPayoutFrequency={setPayoutFrequency} setGP={setGP} setLP={setLP} setTree={setTree} setWaterfall={setWaterfall} />
      </Col>
   <Col md={{ span: 2, offset: 2 }}>   
      <Button  variant="outline-primary" onClick={SendApi}> Calculate</Button>
      </Col>  


      <Col md={{ span: 2, offset: 2 }}>   
      <PNLSetInfo setDealInfo={setDealInfo} setPandLs={setPandLs}></PNLSetInfo>

    </Col>  
               </Row>
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

    <ReturnInfo resp={respMonth} respTotal={respMonthTotal} date={'Year-Month'}/>
        </Tab>
        
        <Tab eventKey="Year" title="Year" >
        <hr></hr>
        <ReturnInfo resp={respYear} respTotal={respYearTotal} date={'Year'}/>

      </Tab>
      {   respUnique &&   <Tab eventKey="unique" title="Unique" >
        <hr></hr>
        <ReturnInfo resp={respUnique} respTotal={respUniqueTotal} date={'Unique'}/>

      </Tab>}
      <Tab eventKey="Investors" title="Investors" >
        
        <ReturnInvestors pId={pId} setParentId={setParentId} tree={tree} setTree={setTree} waterfall={waterfall} setWaterfall={setWaterfall} lp={lp} setLP={setLP} gp={gp} setGP={setGP}payoutFrequency={payoutFrequency} setPayoutFrequency={setPayoutFrequency}/>

      </Tab>
      
    </Tabs>
              </>
    )
}
 
export default ParentCombined;
