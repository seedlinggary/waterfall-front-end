import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Container from 'react-bootstrap/Container';
import ThirdMortgageCalculator from './ThirdMortgage';
import Accordion from 'react-bootstrap/Accordion';


const ParentMortgage = ({mortgages, setMortgages}) => {
    const navigate = useNavigate()
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const deleteMortgage = e => {
        const newMortgages =  mortgages.filter((s,i)=>(i != e.target.id))
        setMortgages(s => {
            const newPandL = s.slice();
            return newMortgages;
        });
            console.log(mortgages)
          }
    // const [mortgages, setMortgages] = useState([])
    const addMortgage = e => {
        e.preventDefault();
        setMortgages(s => {
            const newMortgage = s.slice();
            newMortgage.push({ 'mortgage_length' : 3,
            'interest_rate': .06,
            'loan_amount': 1000000,
            'res_payment_list' : null,
            'mortgage_type': 'Standard',
            'balloon_due_date': 24,
            'mortgage_resp': null,
            'start_date': today,
            'name': 'my mortgage',
                
                })
      
            return newMortgage;
          });
      }; 
      const PrintMe = e => {
        e.preventDefault();
       console.log(mortgages)
      }; 

            return ( 
                <> 
 <Button  variant="outline-primary" onClick={addMortgage}>Add Mortgage</Button>

 <Accordion defaultActiveKey="0" flush>
              {mortgages && mortgages.map((item, i) => {
                    return (
                        
        <div key={i}>
      <Accordion.Item eventKey={i}>
        <Accordion.Header>
                        <h3>Name: {mortgages[i].name} / Amount:{mortgages[i].loan_amount} </h3><Button variant="outline-danger" id={i} onClick={deleteMortgage}>
            Delete Me
          </Button>
        </Accordion.Header>
        <Accordion.Body>



 <ThirdMortgageCalculator mortgages={mortgages} setMortgages={setMortgages} mortgageID= {i}></ThirdMortgageCalculator>
           </Accordion.Body>
      </Accordion.Item>
 
      </div>
                    )
                })} 
                </Accordion>

{/* <Button  variant="outline-primary" onClick={PrintMe}>SHOW ME</Button> */}

              </>
    )
}
 
export default ParentMortgage;