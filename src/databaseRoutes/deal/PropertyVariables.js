
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Container from 'react-bootstrap/Container';
import DatePicker from 'react-datepicker';
import apiRequest from '../../ApiRequest'


const PropertyVariables = ({propertyVariables,setPropertyVariables, PandLID,deal,company,diligence_id}) => {
  const navigate = useNavigate()

    const deletePropertyVariable = e => {
        setPropertyVariables(propertyVariables=> propertyVariables.filter((s,i)=>(i != e.target.id)))
          }

    function handlePropertyVariableChange(data, mortgageInfoType, i) {
        let keyvalue = mortgageInfoType.toString()
        setPropertyVariables(s => {
            const newpropertyVariables = s.slice();
            newpropertyVariables[i]['pinfo'][`${keyvalue}`] = data;
      
            return newpropertyVariables;
          });

      }
      const addPropertyVariable = () => {

        setPropertyVariables(s => {
            const newpropertyVariable = s.slice();
            newpropertyVariable.push({ 'pinfo' : {'name': 'gsf'},
            // 'amount': 10,
                })
      
            return newpropertyVariable;
        });
      };
      const SendApi = async(e) => {
        //   e.preventDefault();
          let info = propertyVariables
          let  a = await apiRequest('POST',info,`/pinfo/${company.id}/${deal.id}`)
          console.log(a)
          // setPropertyVariables( a)
          navigate(0)
        } 
            return ( 
                <> 
                        <Row className="mb-3">


      


        <Row>
      <Col md={{ span: 2, offset: 3 }}>   

      
      </Col>  <Col md={{ span: 2, offset: 2 }}>   
      <Button  variant="outline-primary" onClick={addPropertyVariable}>Add Property Variables</Button>

    </Col>  
               </Row>
   <br></br>
<p></p>



          {propertyVariables && propertyVariables.map((propertyVariable, i) => {
                    return (
                        
        <div key={i}>
                  <Row className="mb-3">

                  <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>What Type of property Variable is this? <Button variant="outline-danger" id={i} onClick={deletePropertyVariable}>
            Delete Property Variable
          </Button></Form.Label>
            <Form.Control  value={propertyVariable.pinfo.name} onChange={(e) => handlePropertyVariableChange(e.target.value,'name',i)} />
          </Form.Group>        

             </Row>
      </div>
                    )
      })} 
        </Row>

              <Container>
          </Container>
          <Button variant="primary" onClick={SendApi}>
        Submit
      </Button>

              </>
    )
}
 
export default PropertyVariables;