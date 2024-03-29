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
import AddClient from './AddClient';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
const Employees = () => {
    const navigate = useNavigate()

    let email = reactLocalStorage.get('email')
    const location = useLocation()
    const company = location.state.company
    const deals = location.state.deals
    // const all_employees = location.state.allEmployees
    // const employee_info = location.state.allAccesses
    const [employee_info, setEmployeeInfo] = useState(location.state.allAccesses)
    const [all_employees, setall_employees] = useState(location.state.allEmployees)
    
    const [index, setIndex] = useState(0);
    console.log(all_employees)
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
          const { data: clients, e, iP} = useFetch(`/investor/client/${company.id}` , requestOptions)
      const SendApi = async (e) => {
        //   e.preventDefault();
          let info = all_employees
          let a = await apiRequest('POST',info,`/deal/boss/${company.id}`)
          navigate(-1)
        } 
        function handleaccessChange(data, mortgageInfoType, i,index) {
            let keyvalue = mortgageInfoType.toString()
            let updatedList = all_employees
            updatedList[index][i][`${keyvalue}`] = data
            let updff = updatedList[index]
              setall_employees(prevState => ({
                ...prevState,
                [`${index}`] : updff
            }));
      
    
          }
    return ( 
        <>
 
        <Row>
        <Col md={{ span: 10, offset: 1 }}>  
      
        <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="Employees" title="Employees">
      
      
        <Accordion defaultActiveKey={['0']} alwaysOpen>
        {all_employees && Object.entries(all_employees).map( ([id, inf],index) => {
            return (
                <div key={index}>
                   
                    <ListGroup key='md' horizontal='md' className="my-2">
                            <ListGroup.Item> First Name: {employee_info[id].user.first_name}</ListGroup.Item>
                            <ListGroup.Item>Last Name: {employee_info[id].user.last_name}</ListGroup.Item>
                            <ListGroup.Item>Email: {employee_info[id].user.email}</ListGroup.Item>
                            <ListGroup.Item> ID# {employee_info[id].id}</ListGroup.Item>
                            <ListGroup.Item> Is a Boss? {(employee_info[id].boss && <>True</>)|| <>False</>}</ListGroup.Item>
                          </ListGroup>
                          
                             <ListGroup key='md' horizontal='md' className="my-2">
                            <ListGroup.Item>Deal Name</ListGroup.Item>
                            <ListGroup.Item>Deal ID</ListGroup.Item>
                            <ListGroup.Item>Can View?</ListGroup.Item>
                            <ListGroup.Item>Can Edit?</ListGroup.Item>
                          </ListGroup>
{  inf.map((access, i) => {
                        return (
                            <ListGroup key='md' horizontal='md' className="my-2">
                            <ListGroup.Item>{access.deal.name}</ListGroup.Item>
                            <ListGroup.Item>{access.deal.id}</ListGroup.Item>
                            <ListGroup.Item>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Check 
                                type="switch"
                                id="custom-switch"
                                label=""
                                checked={access.viewable}
                                onChange={(e) => {access.viewable ? handleaccessChange(false,'viewable',i,id)  : handleaccessChange(true,'viewable',i, id)}}
                />        </Form.Group>
                        </ListGroup.Item>
                            <ListGroup.Item>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Check 
                                type="switch"
                                id="custom-switch"
                                label=""
                                checked={access.editable}
                                onChange={(e) => {access.editable ? handleaccessChange(false,'editable',i,id)  : handleaccessChange(true,'editable',i, id)}}
                />        </Form.Group>
                               </ListGroup.Item>
                          </ListGroup>
                        )
                })
}                </div>
                    )
      })} 
    <Button variant="primary" onClick={SendApi}>
        Submit
      </Button>

    </Accordion>

    </Tab>
      <Tab eventKey="Deals" title="Deals">
       
    <Accordion defaultActiveKey={['0']} alwaysOpen>
      Edit deals
    {deals && deals.map((deal, i) => {
            return (
                <Accordion.Item eventKey={i}>

              <Accordion.Header>{deal.name}</Accordion.Header>
                <Accordion.Body>
                <CreateDeal company={company} deal={deal}></CreateDeal>
                </Accordion.Body>
              </Accordion.Item>
                    )
      })} 


      </Accordion>
      </Tab>
      <Tab eventKey="Clients" title="Clients" >
       
      <Accordion defaultActiveKey={['0']} alwaysOpen>
      clients
    {clients && clients.map((client, i) => {
            return (
                <Accordion.Item eventKey={i}>

              <Accordion.Header>{client.user.email}</Accordion.Header>
                <Accordion.Body>
                </Accordion.Body>
              </Accordion.Item>
                    )
      })} 


      </Accordion>
<AddClient companyid={company.id} business={true}></AddClient>
</Tab>
    </Tabs>



    </Col>
    </Row>

        </>
     );
}
 
export default Employees;