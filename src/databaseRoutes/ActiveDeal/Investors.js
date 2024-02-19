import React, { useState,useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useLocation , Link } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import {reactLocalStorage} from 'reactjs-localstorage';
import useFetch from '../../useFetch';
import CreateProperty from '../property.js/CreateProperty';
// import PropertyVariables from './PropertyVariables';
import Spinner from 'react-bootstrap/Spinner';
import apiRequest from '../../ApiRequest'
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import MortgageHome from '../mortgage/MortgageHome';
import DistributionTree from '../distributions/DistributionTree';
import AddExpenseType from '../diligence/AddExpenseType';
import AddBill from '../diligence/AddBill';
import MultiTree from './MultiTree';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';

const Investors = ({ old_investors}) => {
  const navigate = useNavigate();

  const [investors, setInvestors] = useState(old_investors)
  const sendApi = async (id) => {
    let info = {'investor_id':investors[id].id,'user_id':investors[id].user.public_id, 'name':investors[id].distribution.name, 'email':investors[id].user.email, 'distribution_id': investors[id].distribution.id, }
    let a = await apiRequest('POST',info,`/investor/edit`)
    if (a){
      // navigate(0)

    }
  }

  function handleInvestorChange(e, mortgageInfoType, i) {
    let keyvalue = mortgageInfoType.toString()
     let updatedList = investors
     updatedList[i][`${keyvalue}`] = e
     let updff = updatedList[i]

    if (mortgageInfoType == 'name'){
      setInvestors(s => {
        const newInvestor = s.slice();
        newInvestor[i].distribution.name = e;
  
        return newInvestor;
      });

    }else{
      setInvestors(s => {
        const newInvestor = s.slice();
        newInvestor[i].user.email = e;
  
        return newInvestor;
      });
    }

}
useEffect(() => {
  if (old_investors){
    setInvestors(old_investors)
  }
  console.log(old_investors)
}, [old_investors]);
    const ShowInvestmentDetails = (investmentdetails) => {
        return ( 
          <>
          Total Returns per Year
          <Tabs
          defaultActiveKey="profile"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
                 { investmentdetails.map( (info,index) => {
            return(
    <Tab eventKey={index} title={index}>
              <div>
                {/* {info.contributions == 'Totals' && console.log(info)} */}
               {/* {info.distribution_date} */}
              {info.contributions && <p> total contribution to date {info.contributions.toLocaleString()}</p>}
             {info.percentage_ownership && <p> % ownership {info.percentage_ownership}</p>}
              {info.payed_distributions && <p> payed distribution {info.payed_distributions.toLocaleString()}</p>}
             { info.contributions && <p> total contribution to date {info.contributions.toLocaleString()}</p>}
              {info.lp_contributions && <p>Total Lp contribution {info.lp_contributions}</p>}
              {info.gp_contributions && <p>Total Gp contribution {info.gp_contributions}</p>}
              {info.lp_principal_returned && <p>Total Lp capital return {info.lp_principal_returned.toLocaleString()}</p>}
              {info.gp_principal_returned && <p>Total Gp capital return {info.gp_principal_returned.toLocaleString()}</p>}
              {info.lp_profit && <p>Total Lp profit {info.lp_profit.toLocaleString()}</p>}
              {info.gp_profit && <p>Total Gp profit {info.gp_profit.toLocaleString()}</p>}
              {info.lp_total_distribution && <p>Total Lp distribution {info.lp_total_distribution.toLocaleString()}</p>}
              {info.gp_total_distribution && <p>Total Gp distribution {info.gp_total_distribution.toLocaleString()}</p>}
              </div>
              </Tab>
            )
            })}
    
    
    </Tabs>
    
    </>
          )}
// const { data: returned_mortgages, errr, isPeding} = useFetch(`/mortgage/all_bills/${company.id}/${deal.id}/${diligence_id}` , requestOptions)
    return ( 
        <>
        
        <div >
    <Row>
 <h4> All Investors invested in this deal</h4>
        <Col></Col>
        <h1></h1>
       
        </Row>
        </div>  
        <Row>
        <Col md={{ span: 10, offset: 1 }}>  
      
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
          {investors && investors.map((investor, i) => {   
        
        return (
          <>
          { 
  <Nav.Item>
  <Nav.Link eventKey={i}>{investor.distribution.name}</Nav.Link>
</Nav.Item>
          }
          </>
                )
          
  })} 
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
          {investors && investors.map((investor, i) => {   
        
        return (
          <>
          { 
            <Tab.Pane eventKey={i}>
                User info: 
               {investor.user && <p>Name {investor.user.first_name} {investor.user.last_name}</p> }
               {investor.user &&<p>email {investor.user.email}</p> }

            Distribution Info:
            <p>Name {investor.distribution.name}</p> 
            {ShowInvestmentDetails(investor.distribution.profits)}

            <Row className="mb-3">
                  <Form.Group as={Col}  >
              <Form.Label>Name</Form.Label >
              <Form.Control   value={investor.distribution.name}  onChange={(e) => handleInvestorChange(e.target.value,'name', i)}/>
            </Form.Group>
   <Form.Group as={Col} >
              <Form.Label>Email Adrress</Form.Label>
              <Form.Control    value={investor.user.email}  onChange={(e) => handleInvestorChange(e.target.value,'email', i)} />
            </Form.Group>

            <Button onClick={() => {
              sendApi(i)
  }}>Edit Name or email </Button>
            </Row>

            </Tab.Pane>
          }
          </>
                )
          
  })} 


          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>

    </Col>
    </Row>

        </>
     );
}
 
export default Investors;