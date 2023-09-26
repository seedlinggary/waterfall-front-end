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
import PropertyVariables from './PropertyVariables';
import Spinner from 'react-bootstrap/Spinner';
import apiRequest from '../../ApiRequest'
import ActiveDealHome from '../ActiveDeal/ActiveDealHome';
import DatePicker from 'react-datepicker';

const DealHome = () => {
    let email = reactLocalStorage.get('email')
    const location = useLocation()
    const company = location.state.company
    const deal = location.state.deal
    const [startDate, setStartDate] = useState(0);
    const [ActiveDeal, setActiveDeal] = useState(false);
    const [index, setIndex] = useState(0);
    const [propertyVariables, setPropertyVariables] = useState([])
    const [all_diligences_new, setall_diligences_new] = useState([])

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
useEffect(() => {
  if (properties){
    properties.map((property, i) => {property.purchased && setActiveDeal(true)})
  }
}, [properties]);
const deleteProperty = async e => {
  let info = []
  let a = await apiRequest('DELETE',info,`/property/delete/${company.id}/${deal.id}/${e.target.id}`)
  navigate(0)

    }
    const activateProperty = async e => {
      let info = startDate
      let a = await apiRequest('Post',info,`/property/activate/${company.id}/${deal.id}/${e.target.id}`)
      navigate(0)
    
        }
        if (deal.start_date || ActiveDeal){
      return ( 
        <>
        <ActiveDealHome></ActiveDealHome>
        </>
      )

    }
    else {
    return ( 
        <>
        <div style={mystyle}>
    <Row>
        <Col></Col>
        <Col xs={9}>    <Card className="text-center" bg="dark"key="Info" text="white">
      <Card.Body>
        <Card.Title><h2>Welcome to the deal page {company.name} </h2></Card.Title>
        <Card.Text>
        </Card.Text>
        {!all_diligences && <Spinner animation="border" variant="primary" />}
{    all_diligences &&    <Link to={`/comparediligence/`} state={{'company': company, 'deal':deal, 'all_properties':all_diligences_new,'property_variables': pattributes}}>
 
                <h5> Compare all your properties due diligence</h5>
                </Link>}
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
          <hr></hr>
          <Button
                Button variant="outline-success" size="sm" id={property.id} onClick={activateProperty}>
            Going to purchase the proprty
          </Button>
             <DatePicker selected={startDate}  onChange={(e) =>{
              
              setStartDate(e)
              }}  />

                </Accordion.Body>
              </Accordion.Item>
                    )
      })} 

<Accordion.Item eventKey="-1">
        <Accordion.Header>Create New Property</Accordion.Header>
        <Accordion.Body>
<CreateProperty deal={deal} company={company}></CreateProperty>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="-2">
        <Accordion.Header>Create Property Variable</Accordion.Header>
        <Accordion.Body>

        { <PropertyVariables propertyVariables={propertyVariables} setPropertyVariables={setPropertyVariables} deal={deal} company={company}/>}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </Col>
    </Row>

        </>
     );
    }
}
 
export default DealHome;