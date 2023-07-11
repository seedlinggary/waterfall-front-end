import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Figure from 'react-bootstrap/Figure';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, Link, useLocation  } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import {reactLocalStorage} from 'reactjs-localstorage';
import CreateCompany from '../companies/CreateCompany';
import useFetch from '../../useFetch';
import CreateDeal from '../deal/CreateDeal';
import Accounting from '../accounting/Accounting';
import KOne from '../accounting/KOne';

const CompanyHome = ({}) => {
    let email = reactLocalStorage.get('email')
    // const { company } =useParams();
    const location = useLocation()
    const company = location.state
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
  
      const { data: deals, error, isPending} = useFetch(`/deal/${company.id}` , requestOptions)

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
        <Card.Title><h2>Welcome To the company page {company.name}. </h2></Card.Title>
        <Card.Text>
         hello you are a {company.profession.name}. Here are all of your deals. 
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
        {deals && deals.map((deal, i) => {
            return (
              <div key={i}>
                <Accordion.Item eventKey={i}>

                <Accordion.Header>{deal.name}</Accordion.Header>
                <Accordion.Body>
                <Link to={`/dealhome/`} state={{'company': company, 'deal':deal}}>
 
                <h5> deal {deal.name}</h5>
                </Link>

                    hello you are a {company.profession.name}
                </Accordion.Body>
              </Accordion.Item>
              </div>
                    )
      })} 

<Accordion.Item eventKey="2">
        <Accordion.Header>Create New deal</Accordion.Header>
        <Accordion.Body>
<CreateDeal company={company}></CreateDeal>
        </Accordion.Body>
      </Accordion.Item>
      {company.profession.name == 'Accounting' && <Accordion.Item eventKey="3">
        <Accordion.Header>Check taxes for investors</Accordion.Header>
        <Accordion.Body>

<Accounting company={company}></Accounting>
        </Accordion.Body>
      </Accordion.Item>}
      {company.profession.name == 'Accounting' && <Accordion.Item eventKey="4">
        <Accordion.Header>Upload PDF</Accordion.Header>
        <Accordion.Body>
YOOOOO accountant
<KOne></KOne>
        </Accordion.Body>
      </Accordion.Item>}
    </Accordion>
    </Col>
    </Row>

        </>
     );
}
 
export default CompanyHome;