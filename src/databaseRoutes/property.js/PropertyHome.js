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
import AddMortgage from '../mortgage/AddMortgage';
import DistributionTree from '../distributions/DistributionTree';
import AddExpenseType from '../diligence/AddExpenseType';
import AddBill from '../diligence/AddBill';

const PropertyHome = () => {
    let email = reactLocalStorage.get('email')
    const location = useLocation()
    const company = location.state.company
    const deal = location.state.deal
    const property = location.state.property
    const [index, setIndex] = useState(0);
    const [propertyVariables, setPropertyVariables] = useState([])
    const [all_diligences_new, setall_diligences_new] = useState([])
    const [expenseTypes, setExpenseTypes] = useState()
    const [pAndLs, setPandLs] = useState([])
    let diligence_id = 8
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
      const { data: all_diligences, e, isP} = useFetch(`/property/compare_diligence/${company.id}/${deal.id}` , requestOptions)
      const { data: pattributes, er, isPe} = useFetch(`/pinfo/${company.id}/${deal.id}` , requestOptions)

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    const navigate = useNavigate();
  function handleClick(path) {
    navigate(path);
  }
  useEffect(() => {
    if (pattributes){
      setPropertyVariables(pattributes)
    }
}, [pattributes]);
useEffect(() => {
  if (all_diligences){
    setall_diligences_new(all_diligences)
  }
}, [all_diligences]);
const deleteProperty = async e => {
  let info = []
  let a = await apiRequest('DELETE',info,`/property/delete/${company.id}/${deal.id}/${e.target.id}`)
  navigate(0)
  
}
const activateProperty = async e => {
  let info = []
  let a = await apiRequest('Post',info,`/property/activate/${company.id}/${deal.id}/${e.target.id}`)
  navigate(0)

    }
const { data: returned_mortgages, errr, isPeding} = useFetch(`/mortgage/all_bills/${company.id}/${deal.id}/${diligence_id}` , requestOptions)
    return ( 
        <>
        
        <div style={mystyle}>
    <Row>
        <Col></Col>
        <Col xs={9}>    <Card className="text-center" bg="dark"key="Info" text="white">
      <Card.Body>
        <Card.Title><h2>Welcome to the property page: {property.street} </h2></Card.Title>
        <Card.Text>
        </Card.Text>

</Card.Body>
     
    </Card>
</Col>
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
            <Nav.Item>
              <Nav.Link eventKey="first">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Properties</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third">Bills And Statements</Nav.Link>
            </Nav.Item>
            {/* <Nav.Item>
              <Nav.Link eventKey="fourth">Capital Stack <br></br> (Mortgages and Investors)</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fifth">Investors</Nav.Link>
            </Nav.Item> */}
            <Nav.Item>
              <Nav.Link eventKey="sixth">Insights</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="seventh">Notes, KPI, and Reminders</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="eigth">Due Diligence</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="ninth">Bill Type</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first">Coming Soon</Tab.Pane>
            <Tab.Pane eventKey="second">
            <Accordion defaultActiveKey={['0']} alwaysOpen>
        {properties && properties.map((property, i) => {
            return (
              <>
              { property.purchased &&

                <Accordion.Item eventKey={i}>

                <Accordion.Header>{property.street}</Accordion.Header>
                <Accordion.Body>
                <Link to={`/diligencehome/`} state={{'company': company, 'deal':deal, 'property':property}}>
 
                <h5> diligence {deal.name}</h5>
                </Link>
                <Button
                Button variant="outline-danger" size="sm" id={property.id} onClick={deleteProperty}>
            Delete Me
          </Button>

                </Accordion.Body>
              </Accordion.Item>
                            }
                            </>
              
                    )
      })} 
      <Accordion.Item eventKey="-3">
        <Accordion.Header>Edit Property Info</Accordion.Header>
        <Accordion.Body>
        <Link to={`/editProperties/`} state={{'company': company, 'properties':properties, 'deal': deal}}>
 
          <h5> Edit acces to employees</h5>
          </Link>
        {/* { <PropertyVariables propertyVariables={propertyVariables} setPropertyVariables={setPropertyVariables} deal={deal} company={company}/>} */}
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>
         </Tab.Pane>
            <Tab.Pane eventKey="third">
            <AddBill pAndLs={pAndLs} setPandLs={setPandLs} expenseTypes={expenseTypes} deal={deal} company={company} diligence_id={diligence_id} bill_url={'Property'}url_id={property.id}/>

               </Tab.Pane>
            <Tab.Pane eventKey="fourth">
              <AddMortgage deal={deal} company={company} diligence_id={diligence_id} returned_mortgages={returned_mortgages} />
              <DistributionTree deal={deal} company={company} diligence_id={diligence_id}  />
            </Tab.Pane>
            <Tab.Pane eventKey="fifth">Coming Soon</Tab.Pane>
            <Tab.Pane eventKey="sixth">Coming Soon</Tab.Pane>
            <Tab.Pane eventKey="seventh">Coming Soon</Tab.Pane>
            <Tab.Pane eventKey="eigth">
            {!all_diligences && <Spinner animation="border" variant="primary" />}
{    all_diligences &&    <Link to={`/comparediligence/`} state={{'company': company, 'deal':deal, 'all_properties':all_diligences_new,'property_variables': pattributes}}>
 
                <h5> Compare all your properties due diligence</h5>
                </Link>}
            <Accordion defaultActiveKey={['0']} alwaysOpen>
        {properties && properties.map((property, i) => {   
        
            return (
              <>
              { 
                <Accordion.Item eventKey={i}>

                <Accordion.Header>{property.street}</Accordion.Header>
                <Accordion.Body>
                <Link to={`/diligencehome/`} state={{'company': company, 'deal':deal, 'property':property}}>
 
                <h5> diligence {deal.name}</h5>
                </Link>
                { !property.purchased && <>
          <hr></hr>
          <Button
                Button variant="outline-success" size="sm" id={property.id} onClick={activateProperty} >
            Going to purchase the property
          </Button>
          </>
        }
                </Accordion.Body>
              </Accordion.Item>
              }
              </>
                    )
              
      })} 

{/* <Accordion.Item eventKey="-1">
        <Accordion.Header>Create New Property</Accordion.Header>
        <Accordion.Body>
<CreateProperty deal={deal} company={company}></CreateProperty>
        </Accordion.Body>
      </Accordion.Item> */}

    </Accordion>
            </Tab.Pane>
            <Tab.Pane eventKey="ninth">
            
{ <AddExpenseType expenseTypes={expenseTypes} setExpenseTypes={setExpenseTypes} deal={deal} company={company} diligence_id={diligence_id} btype_url={'deal'} />}
       
              </Tab.Pane>

          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>

    </Col>
    </Row>

        </>
     );
}
 
export default PropertyHome;