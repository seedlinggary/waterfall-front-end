import React, { useState,useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useLocation, Link  } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import {reactLocalStorage} from 'reactjs-localstorage';
import useFetch from '../../useFetch';
import CreateProperty from '../property.js/CreateProperty';
import EditDiligence from './EditDiligence';
import AddBill from './AddBill';
import AddExpenseType from './AddExpenseType';
// import PropertyVariables from './PropertyVariables';
import DiligenceTable from './DiligenceTable';
import AddMortgage from '../mortgage/AddMortgage';
import MortgageBills from '../mortgage/MortgageBills';
import Spinner from 'react-bootstrap/Spinner';
import DistributionTree from '../distributions/DistributionTree';

const DiligenceHome = () => {
    let email = reactLocalStorage.get('email')
    const location = useLocation()
    const company = location.state.company
    const deal = location.state.deal
    const property = location.state.property
    const diligence_id = location.state.property.diligence_id
    const [index, setIndex] = useState(0);
    const [pAndLs, setPandLs] = useState([])
    const [expenseTypes, setExpenseTypes] = useState()
    const mystyle = {
        color: "white",
        backgroundColor: "#f4f4f4",
        padding: "10px",
      };

            
      let cookie = reactLocalStorage.get('cookie')
      const requestOptions = {
          method: 'GET',
          headers: { 
          'x-access-token': cookie},
      };
  
      const { data: diligence, error, isPending} = useFetch(`/diligence/${company.id}/${deal.id}/${diligence_id}` , requestOptions)
      const { data: returned_mortgages, errr, isPeding} = useFetch(`/mortgage/all_bills/${company.id}/${deal.id}/${diligence_id}` , requestOptions)
      const { data: distributionTree, er, isPend} = useFetch(`/distribution/${company.id}/${deal.id}/${diligence_id}` , requestOptions)

    //   useEffect(() => {
    //     if (diligence){

    //       console.log(diligence.deal_start_date)
    //     }
    // }, [diligence]);
    return ( 
        <>
        <div style={mystyle}>
    <Row>
        <Col></Col>
        <Col xs={9}>    <Card className="text-center" bg="dark"key="Info" text="white">
      <Card.Body>
        <Card.Title><h2>Welcome to the diligence page of: {property.number} {property.street} </h2></Card.Title>
        <Card.Text>
         hello you are at Company: {company.name}, Deal {deal.name}
        </Card.Text>
        {!diligence  && <Spinner animation="border" variant="primary" />}
{   diligence  &&     <Link to={`/dinfohome/`} state={{'company': company, 'deal':deal, 'diligence_id':diligence_id, 'returned_mortgages':returned_mortgages, 'diligence':diligence}}>
 
                <h5> Advance Metrics</h5>
                </Link>}
        {/* <Button variant="outline-primary" onClick={() => handleClick("parentcombined")}>Profit Distributor</Button> */}
      </Card.Body>
     
    </Card>
</Col>
        <Col></Col>
        <h1></h1>
       
        </Row>
        </div>  
        <Row>
        <Col md={{ span: 10, offset: 1 }}>  
      

        <Accordion  >


        <Accordion.Item eventKey="0">
        <Accordion.Header >Edit your due diligence basic information</Accordion.Header>
        <Accordion.Body>
{diligence && <EditDiligence deal={deal} company={company} diligence={diligence} />}
        </Accordion.Body>
        </Accordion.Item> 

        {/* <Accordion.Item eventKey="1">
        <Accordion.Header >What type of Property Variables</Accordion.Header>
        <Accordion.Body>
{diligence && <PropertyVariables propertyVariables={propertyVariables} setPropertyVariables={setPropertyVariables} deal={deal} company={company} diligence_id={diligence_id} />}
        </Accordion.Body>
      </Accordion.Item>   */}

          <Accordion.Item eventKey="2">
        <Accordion.Header >What type of expenses</Accordion.Header>
        <Accordion.Body>
{diligence && <AddExpenseType expenseTypes={expenseTypes} setExpenseTypes={setExpenseTypes} deal={deal} company={company} diligence_id={diligence_id} btype_url={'diligence'}/>}
        </Accordion.Body>
      </Accordion.Item>  
       
      <Accordion.Item eventKey="3">
        <Accordion.Header >manually add in bills</Accordion.Header>
        <Accordion.Body>
<AddBill pAndLs={pAndLs} setPandLs={setPandLs} expenseTypes={expenseTypes} deal={deal} company={company} diligence_id={diligence_id} bill_url={'Diligence'} url_id={diligence_id}/>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header >Table</Accordion.Header>
        <Accordion.Body>
<DiligenceTable pAndLs={pAndLs} />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="5">
        <Accordion.Header >Mortgages</Accordion.Header>
        <Accordion.Body>
<AddMortgage deal={deal} company={company} diligence_id={diligence_id} returned_mortgages={returned_mortgages} />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="6">
        <Accordion.Header >Mortgage Info</Accordion.Header>
        <Accordion.Body>
        {/* <MortgageBills deal={deal} company={company} diligence_id={diligence_id} /> */}
        <MortgageBills returned_mortgages={returned_mortgages}  />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="7">
        <Accordion.Header >Waterfall Info</Accordion.Header>
        <Accordion.Body>
        <DistributionTree deal={deal} company={company} diligence_id={diligence_id} distributionTree={distributionTree} />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </Col>
    </Row>

        </>
     );
}
 
export default DiligenceHome;