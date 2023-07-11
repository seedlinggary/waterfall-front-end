import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useLocation  } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import {reactLocalStorage} from 'reactjs-localstorage';
import useFetch from '../../useFetch';
import CreateProperty from '../property.js/CreateProperty';
import EditDiligence from './EditDiligence';
import AddBill from './AddBill';
import AddExpenseType from './AddExpenseType';
import PropertyVariables from './PropertyVariables';
import DiligenceTable from './DiligenceTable';
import AddMortgage from '../mortgage/AddMortgage';
import MortgageBills from '../mortgage/MortgageBills';

const DiligenceHome = () => {
    let email = reactLocalStorage.get('email')
    const location = useLocation()
    const company = location.state.company
    const deal = location.state.deal
    const diligence_id = location.state.property.diligence_id
    const [index, setIndex] = useState(0);
    const [pAndLs, setPandLs] = useState([])
    const [propertyVariables, setPropertyVariables] = useState([{ 'name' : 'unit_amount'},{ 'name' : 'GSF'},{ 'name' : 'NSF'},])
    const [expenseTypes, setExpenseTypes] = useState([{ 'name' : 'soft_costs',
    'payable_recievable': 'Payable',
        },{ 'name' : 'hard_costs',
        'payable_recievable': 'Payable',
            },{ 'name' : 'marketing',
            'payable_recievable': 'Payable',
                },{ 'name' : 'g_a',
                'payable_recievable': 'Payable',
                    },{ 'name' : 'closing_costs',
                    'payable_recievable': 'Payable',
                        },{ 'name' : 'recurring_costs',
                        'payable_recievable': 'Payable',
                            },{ 'name' : 'miscellaneous',
                            'payable_recievable': 'Payable',
                                },{ 'name' : 'income',
                                'payable_recievable': 'Recievable',
                                    }])
    

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
  
      const { data: diligence, error, isPending} = useFetch(`/diligence/${company.id}/${deal.id}/${diligence_id}` , requestOptions)
      const { data: bills, err, isPend} = useFetch(`/bill/${company.id}/${deal.id}/${diligence_id}` , requestOptions)

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
        <Card.Title><h2>Welcome to the diligence page {company.name} </h2></Card.Title>
        <Card.Text>
         hello you are a {company.profession.name} {diligence && diligence.nsf}
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
      

        <Accordion  >


        <Accordion.Item eventKey="0">
        <Accordion.Header >Edit your due diligence basic information</Accordion.Header>
        <Accordion.Body>
{diligence && <EditDiligence deal={deal} company={company} diligence={diligence} propertyVariables={propertyVariables}/>}
        </Accordion.Body>
        </Accordion.Item> 

        <Accordion.Item eventKey="1">
        <Accordion.Header >What type of Property Variables</Accordion.Header>
        <Accordion.Body>
{diligence && <PropertyVariables propertyVariables={propertyVariables} setPropertyVariables={setPropertyVariables} />}
        </Accordion.Body>
      </Accordion.Item>  

          <Accordion.Item eventKey="2">
        <Accordion.Header >What type of expenses</Accordion.Header>
        <Accordion.Body>
{diligence && <AddExpenseType expenseTypes={expenseTypes} setExpenseTypes={setExpenseTypes} />}
        </Accordion.Body>
      </Accordion.Item>  
       
      <Accordion.Item eventKey="3">
        <Accordion.Header >manually add in bills</Accordion.Header>
        <Accordion.Body>
<AddBill pAndLs={pAndLs} setPandLs={setPandLs} expenseTypes={expenseTypes} deal={deal} company={company} diligence_id={diligence_id}/>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header >Table</Accordion.Header>
        <Accordion.Body>
<DiligenceTable pAndLs={pAndLs} />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="5">
        <Accordion.Header >Mortgages</Accordion.Header>
        <Accordion.Body>
<AddMortgage deal={deal} company={company} diligence_id={diligence_id} />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="6">
        <Accordion.Header >Mortgage Info</Accordion.Header>
        <Accordion.Body>
<MortgageBills deal={deal} company={company} diligence_id={diligence_id} />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </Col>
    </Row>

        </>
     );
}
 
export default DiligenceHome;