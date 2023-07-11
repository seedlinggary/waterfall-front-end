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


const Investor = ({investors, setInvestors, InvestorID}) => {
    const navigate = useNavigate()
    
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const [startDate, setStartDate] = useState(today)
    const [years, setYears] = useState(4)
    const [startingAmount, setStartingAmount] = useState(2000)
    const [mulitplicationAmount, setMulitplicationAmount] = useState(.02)
    const [dateMulitplicationAmount, setDateMulitplicationAmount] = useState(1)
    const [typeDateMultiplicationAMount, setTypeDateMulitplicationAmount] = useState("year")
  

    const deleteProfit = e => {
        const newtransactions =  investors[InvestorID].profits.filter((s,i)=>(i != e.target.id))
       
        setInvestors(s => {
            const newPandL = s.slice();
            newPandL[InvestorID].profits = newtransactions
            return newPandL;
        });

          }
          const deletTax = e => {
            const newtransactions =  investors[InvestorID].tax_brackets.filter((s,i)=>(i != e.target.id))
           
            setInvestors(s => {
                const newPandL = s.slice();
                newPandL[InvestorID].tax_brackets = newtransactions
                return newPandL;
            });
    
              }

    function HandleInvestorChange(data, mortgageInfoType) {
        let keyvalue = mortgageInfoType.toString()
          setInvestors(s => {
            const newPandL = s.slice();
            newPandL[InvestorID][`${keyvalue}`] = data;
      
            return newPandL;
          });

      }
      const AddProfit = () => {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        const newtransactions =  
        [... investors[InvestorID].profits,
        {
            'amount' : 1000,
                      'capital' : false,
        }]
        setInvestors(s => {
            const newPandL = s.slice();
            newPandL[InvestorID].profits = newtransactions
            return newPandL;
        });
      };

      function handleProfitChange(data, index, mortgageInfoType) {
        let keyvalue = mortgageInfoType.toString()
        let updatedList = investors[InvestorID].profits.map((item, i) => 
          {
            if (i == index){
              return {...item, [`${keyvalue}`] : data}; //gets everything that was already in item, and updates "done"
            }
            return item; // else return unmodified item 
          });

      setInvestors(s => {
          const newInvestors = s.slice();
          newInvestors[InvestorID].profits = updatedList;
    
          return newInvestors;
        });
        console.log(investors)
      }; 
      const AddTax = () => {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        const newtransactions =  
        [... investors[InvestorID].tax_brackets,
        {
            'tax_rate' : .5,
            'on_capital' : false,
            'on_original' : false,
            'order': investors[InvestorID].tax_brackets.length + 1
        }]
        setInvestors(s => {
            const newPandL = s.slice();
            newPandL[InvestorID].tax_brackets = newtransactions
            return newPandL;
        });
      };

      function handleTaxChange(data, index, mortgageInfoType) {
        let keyvalue = mortgageInfoType.toString()

        let updatedList = investors[InvestorID].tax_brackets.map((item, i) => 
          {
            if (i == index){
              return {...item, [`${keyvalue}`] : data}; //gets everything that was already in item, and updates "done"
            }
            return item; // else return unmodified item 
          });

      setInvestors(s => {
          const newInvestors = s.slice();
          newInvestors[InvestorID].tax_brackets = updatedList;
    
          return newInvestors;
        });
        console.log(investors)
      }; 



            return ( 
                <> 
                        <Row className="mb-3">
        <hr></hr>
        
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Investor Name:</Form.Label>
            <Form.Control  value={investors[InvestorID].name} onChange={(e) => HandleInvestorChange(e.target.value,'name')} />
          </Form.Group>        

   


      


        <Row>
        <Col md={{ span: 2, offset: 3 }}>   
      <Button  variant="outline-primary" onClick={AddProfit}>Add one Profit</Button>

    </Col>  
    <Col md={{ span: 2, offset: 2 }}>   
      <Button  variant="outline-primary" onClick={AddTax}>Add one Tax Bracket</Button>

    </Col>  
               </Row>
   <br></br>
<p></p>



{investors[InvestorID].profits && investors[InvestorID].profits.map((profit, i) => {
                    return (
                        
        <div key={i}>
                  <Row className="mb-3">
              <Form.Group as={Col}  >
              <Form.Label> {i + 1}'s worth : <Button variant="outline-danger" id={i} onClick={deleteProfit}>
            Delete Profit
          </Button> </Form.Label >
              <Form.Control  value={profit.amount.toLocaleString()} id={i}  onChange={(e) => handleProfitChange(e.target.value, i,'amount')}/>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
          <Form.Check 
          type="switch"
          id="custom-switch"
          label="is this capital return?"
          checked={profit.capital}
  
          onChange={(e) => profit.capital ? handleProfitChange(false, i,'capital') : handleProfitChange(true, i,'capital')}
        />        </Form.Group>

          
            </Row>
      </div>
                    )
      })} 
                {investors[InvestorID].tax_brackets && investors[InvestorID].tax_brackets.map((tax, i) => {
                    return (
                        
        <div key={i}>
                  <Row className="mb-3">
                  <Form.Group as={Col}  >
              <Form.Label> {i + 1}'s worth : <Button variant="outline-danger" id={i} onClick={deletTax}>
            Delete {typeDateMultiplicationAMount }
          </Button> </Form.Label >
              <Form.Control  value={tax.tax_rate.toLocaleString()} id={i}  onChange={(e) => handleTaxChange(e.target.value, i,'tax_rate')}/>
            </Form.Group>
            <Form.Group as={Col}  >
              <Form.Label> Order which taxes should be first.</Form.Label >
              <Form.Control  value={tax.order} id={i}  onChange={(e) => handleTaxChange(e.target.value, i,'order')}/>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
          <Form.Check 
          type="switch"
          id="custom-switch"
          label="Tax Capital returned?"
          checked={tax.on_capital}
  
          onChange={(e) => tax.on_capital ? handleTaxChange(false, i,'on_capital') : handleTaxChange(true, i,'on_capital')}
        />        </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
          <Form.Check 
          type="switch"
          id="custom-switch"
          label="Tax on total earnings?"
          checked={tax.on_original}
  
          onChange={(e) => tax.on_original ? handleTaxChange(false, i,'on_original') : handleTaxChange(true, i,'on_original')}
        />        </Form.Group>

          
            </Row>
      </div>
                    )
      })} 

        </Row>

              <Container>
          </Container>
              </>
    )
}
 
export default Investor;