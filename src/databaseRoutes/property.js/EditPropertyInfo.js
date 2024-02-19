import React, { useState,useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useLocation , Link } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import {reactLocalStorage} from 'reactjs-localstorage';
import useFetch from '../../useFetch';
import Spinner from 'react-bootstrap/Spinner';
import ListGroup from 'react-bootstrap/ListGroup';
import apiRequest from '../../ApiRequest'
import Form from 'react-bootstrap/Form';
import CreateDeal from '../deal/CreateDeal';
import CreateProperty from './CreateProperty';

const EditProperty = () => {
    const navigate = useNavigate()

    let email = reactLocalStorage.get('email')
    const location = useLocation()
    const company = location.state.company
    const deal = location.state.deal
    const properties = location.state.properties
    // const all_employees = location.state.allEmployees
    // const employee_info = location.state.allAccesses
    const [employee_info, setEmployeeInfo] = useState(location.state.allAccesses)
    const [all_employees, setall_employees] = useState(location.state.allEmployees)


    return ( 
        <>
 
        <Row>
        <Col md={{ span: 10, offset: 1 }}>  
      

    <Accordion defaultActiveKey={['0']} alwaysOpen>
      Edit properties
    {properties && properties.map((property, i) => {
            return (
                <Accordion.Item eventKey={i}>

              <Accordion.Header>{property.street}</Accordion.Header>
                <Accordion.Body>
                <CreateProperty deal={deal} company={company} property={property}></CreateProperty>
                </Accordion.Body>
              </Accordion.Item>
                    )
      })} 


      </Accordion>
    </Col>
    </Row>

        </>
     );
}
 
export default EditProperty;