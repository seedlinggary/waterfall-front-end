import React, { useState,useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useLocation , Link } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import {reactLocalStorage} from 'reactjs-localstorage';
import useFetch from '../useFetch';
// import CreateProperty from '../property.js/CreateProperty';
// import PropertyVariables from './PropertyVariables';
// import Spinner from 'react-bootstrap/Spinner';
// import apiRequest from '../../ApiRequest'
// import ActiveDealHome from '../ActiveDeal/ActiveDealHome';
// import DatePicker from 'react-datepicker';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import AddClient from '../databaseRoutes/companies/AddClient';
import Tabs from 'react-bootstrap/Tabs';

const PotentialInvestments = () => {
    let email = reactLocalStorage.get('email')
    const location = useLocation()

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
    //   const { data: properties, error, isPending} = useFetch(`/property/${company.id}/${deal.id}` , requestOptions)
    //   const { data: all_diligences, e, isP} = useFetch(`/property/compare_diligence/${company.id}/${deal.id}` , requestOptions)
      const { data: potential_Investments, er, isPe} = useFetch(`/investor/client/potential_investments` , requestOptions)



    return ( 
        <>
        <div style={mystyle}>
    <Row>
        <Col></Col>
        <Col xs={9}>    <Card className="text-center" bg="dark"key="Info" text="white">
      <Card.Body>
        <Card.Title><h2>Welcome to you potential investments </h2></Card.Title>
        <Card.Text>
        </Card.Text>
</Card.Body>
     
    </Card>
</Col>
        <Col></Col>
        <h1></h1>
       
        </Row>
        </div>  
       <AddClient your_email={email} business={false}></AddClient>



       <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
          {potential_Investments && potential_Investments.map((company, i) => {
            return (
              <>

                <Nav.Item>
              <Nav.Link eventKey={i}>{company.name}</Nav.Link>
            </Nav.Item>
                            
                            </>
              
                    )
      })} 

          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
          {potential_Investments && potential_Investments.map((company, i) => {
            return (
              <>

                    <Tab.Pane eventKey={i}>
                        
                        
                        
                    <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      
      {company.companies && company.companies.map((deals, index) => {
          return (

            <Tab eventKey={index} title={deals.name}>
       
       <Accordion defaultActiveKey={['0']} alwaysOpen>
       {deals && deals.deal.map((deal, index) => {
          return (

        <>
        <h3>

        {deal}
        </h3>
        </>
    )
      })
    }
   
         </Accordion>
         </Tab>
    )
      })
    }


    </Tabs>


                        
                        
                        
                        
                        
                        
                        
                        
                        Coming Soon</Tab.Pane>
                            
                            </>
              
                    )
      })} 

            

          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>





        </>
     );
    }

 
export default PotentialInvestments;