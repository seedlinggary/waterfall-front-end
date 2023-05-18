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


const ParentMortgage = ({mortgages, setMortgages}) => {
    const navigate = useNavigate()
    
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
 <Button  variant="outline-primary" onClick={addMortgage}>add mortgage</Button>

              {mortgages && mortgages.map((item, i) => {
                    return (
                        
        <div key={i}>


 <ThirdMortgageCalculator mortgages={mortgages} setMortgages={setMortgages} mortgageID= {i}></ThirdMortgageCalculator>
 
      </div>
                    )
      })} 

<Button  variant="outline-primary" onClick={PrintMe}>SHOW ME</Button>

              </>
    )
}
 
export default ParentMortgage;