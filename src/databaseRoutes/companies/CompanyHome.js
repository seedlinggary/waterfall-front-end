import React, { useState,useEffect } from 'react'
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
import apiRequest from '../../ApiRequest'

const CompanyHome = ({companyt}) => {
  const location = useLocation()
  const [company, setCompany] = useState( companyt)
  // useEffect(() => {
  //   if (companyt){
  //     company = location.state.company || companyt
  //   }
  // }, [companyt]);
    let email = reactLocalStorage.get('email')
    // const { company } =useParams();
    console.log(companyt)
    // const investments = location.state.investments || 0
    const [index, setIndex] = useState(0);
    const [allEmployees, setallEmployees] = useState([])
    const [allAccesses, setallAccesses] = useState([])
    console.log(company)
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
      const { data: boss, er, isP} = useFetch(`/deal/boss/${company.id}` , requestOptions)
      const { data: customer_id, e, iP} = useFetch(`/subscription/customer_id` , requestOptions)

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    const navigate = useNavigate();
  function handleClick(path) {
    navigate(path);
  }

  useEffect(() => {
    if (boss){
      setallEmployees(boss[0])
      setallAccesses(boss[1])
    }
  }, [boss]);


  const deleteDeal = async e => {
    let info = []
    let a = await apiRequest('DELETE',info,`/deal/delete/${company.id}/${e.target.id}`)
    navigate(0)

      }
      const manageBilling = async e => {
        let info = []
        let a = await apiRequest('POST',info,`/subscription/customer_portal`)
        navigate(0)
    
          }
  // const SendDeleteApi = (e) => {
  //   //   e.preventDefault();
  //     let info = expenseTypes
  //     let a = apiRequest('DELETE',info,`/deal/delete/${company.id}/${deal.id}`)
  //     navigate(0)
  //     updatebtypes(a)
  //   } 
    return ( 
        <>
        <div style={mystyle}>
    <Row>
        <Col></Col>
        <Col xs={9}>    <Card className="text-center" bg="dark"key="Info" text="white">
      <Card.Body>
        <Card.Title><h2>Welcome To the company page {company.name}. </h2></Card.Title>
        {/* <Card.Text>
          Here are all of your deals.         <Link to={`/SendFile/`} >
 
 <h5> Lawyer Page</h5>
 </Link>
        </Card.Text> */}
        {/* {investments && <Link to={`/ChartHome/`} state={investments}>
    
    <h5> Investment Details</h5>
    </Link>} */}
        {customer_id && 
            <form action={`https://distributionresolutionapi.com/subscription/customer_portal/${customer_id}`} method="POST">
            {/* <form action={`http://127.0.0.1:5000/subscription/customer_portal/${customer_id}`} method="POST"> */}
            <Button variant="outline-primary" type="submit">Manage Billing</Button>
          </form>
        }
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
                <Accordion.Item eventKey={i}>

                <Accordion.Header>{deal.name}</Accordion.Header>
                <Accordion.Body>
                <Link to={`/dealhome/`} state={{'company': company, 'deal':deal}}>
 
                <h5> deal {deal.name}</h5>
                </Link>
                <Button
                Button variant="outline-danger" size="sm" id={deal.id} onClick={deleteDeal}>
            Delete Me
          </Button>
                    {/* hello you are a {company.profession.name} */}
                </Accordion.Body>
              </Accordion.Item>
                    )
      })} 

<Accordion.Item eventKey="2">
        <Accordion.Header>Create New deal</Accordion.Header>
        <Accordion.Body>
<CreateDeal company={company}></CreateDeal>
        </Accordion.Body>
      </Accordion.Item>
{ boss &&     <Accordion.Item eventKey="3">
        <Accordion.Header>All Employees</Accordion.Header>
        <Accordion.Body>
        <Link to={`/employees/`} state={{'company': company, 'allEmployees':allEmployees, 'allAccesses':allAccesses, 'deals': deals}}>
 
          <h5> Edit acces to employees</h5>
          </Link>
        </Accordion.Body>
      </Accordion.Item>}
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