import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useLocation , Link } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import {reactLocalStorage} from 'reactjs-localstorage';
import useFetch from '../../useFetch';
import CreateProperty from '../property.js/CreateProperty';

const DealHome = () => {
    let email = reactLocalStorage.get('email')
    const location = useLocation()
    const company = location.state.company
    const deal = location.state.deal
    const [index, setIndex] = useState(0);
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
  
      const { data: properties, error, isPending} = useFetch(`/property/${company.id}/${deal.id}` , requestOptions)

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    const navigate = useNavigate();
  function handleClick(path) {
    navigate(path);
  }
    return ( 
        <>
        <div style={mystyle}>
    <Row>
        <Col></Col>
        <Col xs={9}>    <Card className="text-center" bg="dark"key="Info" text="white">
      <Card.Body>
        <Card.Title><h2>Welcome to the deal page {company.name} </h2></Card.Title>
        <Card.Text>
         hello you are a {company.profession.name}
        </Card.Text>
        <Button variant="outline-primary" onClick={() => handleClick("parentcombined")}>Profit Distributor</Button>
      </Card.Body>
     
    </Card>
</Col>
        <Col></Col>
        <h1></h1>
       
        </Row>
        </div>  
        <Row>
        <Col md={{ span: 10, offset: 1 }}>  
      

        <Accordion defaultActiveKey={['0']} alwaysOpen>
        {properties && properties.map((property, i) => {
            return (
              <div key={i}>
                <Accordion.Item eventKey={i}>

                <Accordion.Header>{property.street}</Accordion.Header>
                <Accordion.Body>
                <Link to={`/diligencehome/`} state={{'company': company, 'deal':deal, 'property':property}}>
 
                <h5> diligence {deal.name}</h5>
                </Link>
                    hello you are a {company.profession.name}
                </Accordion.Body>
              </Accordion.Item>
              </div>
                    )
      })} 

      <Accordion.Item >
        <Accordion.Header>Create New deal</Accordion.Header>
        <Accordion.Body>
<CreateProperty deal={deal} company={company}></CreateProperty>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </Col>
    </Row>

        </>
     );
}
 
export default DealHome;