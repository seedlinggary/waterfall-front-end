import React, { useState, useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Figure from 'react-bootstrap/Figure';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import {reactLocalStorage} from 'reactjs-localstorage';
import CreateCompany from '../companies/CreateCompany';
import useFetch from '../../useFetch';
import CompanyHome from '../companies/CompanyHome';

const UserHome = () => {
    let email = reactLocalStorage.get('email')

    const [index, setIndex] = useState(0);
    const [compLn, setcompLn] = useState([1,2]);
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
    // console.log(cookie)
    const { data: companies, error, isPending} = useFetch(`/company` , requestOptions)
    const { data: investments, e, isP} = useFetch(`/investor/investor_investments` , requestOptions)

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    const navigate = useNavigate();
  function handleClick(path) {
    navigate(path);
  }
  useEffect(() => {
    if (companies){
      setcompLn(companies)
    }
    console.log(companies)
  }, [companies]);
  if (compLn.length == 1 && companies[0].profession.name == 'Investor'){
    return (
      <>
      
      {/* <CompanyHome companyt={companies[0]} ></CompanyHome> */}
      {investments && <Link to={`/ChartHome/`} state={investments}>
      
      <h5> Investment Details</h5>
      </Link>}
      </>
    )
  }
  else if(!companies ||compLn.length != 1){
    return ( 
        <>
        <div style={mystyle}>
    <Row>
        <Col></Col>
        <Col xs={9}>    <Card className="text-center" bg="dark"key="Info" text="white">
      <Card.Body>
        <Card.Title><h2>Welcome Home {email} </h2></Card.Title>
        <Card.Text>
          {/* { investments &&
        <Link to={`/InvestorHome/`} state={investments}>
 {console.log(investments)}
 <h5> All of your investments</h5>
 </Link> } */}
{investments && <Link to={`/ChartHome/`} state={investments}>
    
    <h5> Investment Details</h5>
    </Link>}
         here are all the companies you are associated with.
        </Card.Text>
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
      

        <Accordion defaultActiveKey={['0']} alwaysOpen>
        {companies && companies.map((company, i) => {
            return (
                <Accordion.Item eventKey={i}>

                <Accordion.Header>{company.name}</Accordion.Header>
                <Accordion.Body>
                <Link to={`/companyhome/`} state={{'company': company, 'investments':investments}}>
 
                  <h5> company {company.name}</h5>
                  </Link>

                    hello you are a {company.profession.name}
                </Accordion.Body>
              </Accordion.Item>
                    )
      })} 

      <Accordion.Item eventKey="2">
        <Accordion.Header>Create New Company</Accordion.Header>
        <Accordion.Body>
<CreateCompany></CreateCompany>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </Col>
    </Row>

        </>
     );
} else {
  return (
    <>
    
    <CompanyHome companyt={companies[0]} ></CompanyHome>
    {investments && <Link to={`/ChartHome/`} state={investments}>
    
    <h5> Investment Details</h5>
    </Link>}
    </>
  )
}
}
 
export default UserHome;