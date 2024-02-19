import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import Hurdle from './multiwaterfall/Hurdle';
import Fee from './multiwaterfall/Fee';
import DatePicker from 'react-datepicker';

const Calculator = ({waterfall, setWaterfall, personId, payoutFrequency , live_info=false}) => {
    
    function handlewaterfallChange(data, mortgageInfoType) {
      
      let keyvalue = mortgageInfoType.toString()
      const newWaterfall= Object.assign(waterfall[personId],{[`${keyvalue}`]:data})
      setWaterfall(prevState => ({
          ...prevState,
          [`${personId}`]: newWaterfall
      }));
      
    }

    function changeDate(data) {
      var today2 = new Date(data);
  
      let newDate = new Date(data);
      return newDate
    }
  
  
      const SendPromoteWaterfall = (e) => {
        let new_info = {
          [`irr_parri_passu`]: true,
          [`type_of_split`]: "split_percentage_of_owned",
          [`capital_parri_passu`]: true,
          [`type_of_hurdle`]: "irr_yearly_compund",
          [`way_in_which_to_split`]: "investor_in_the_irr",
          [`principal_after_preffered`]: false,
      }
        const newWaterfall= Object.assign(waterfall[personId],new_info)
        setWaterfall(prevState => ({
            ...prevState,
            [`${personId}`]: newWaterfall
        }));
        


    }
    const SendCashFlowWaterfall = (e) => {
      let new_info = {
        [`irr_parri_passu`]: false,
        [`pay_gp_principal`]: true,
        [`pay_gp_prefered`]: true,
        [`type_of_split`]: "split_plus_percentage",
        [`capital_parri_passu`]: true,
        [`type_of_hurdle`]: "irr_yearly_compund",
        [`way_in_which_to_split`]: "investor_on_top_of_irr",
        [`principal_after_preffered`]: false,
    }
      const newWaterfall= Object.assign(waterfall[personId],new_info)
      setWaterfall(prevState => ({
          ...prevState,
          [`${personId}`]: newWaterfall
      }));

  }
            return ( 
        <div > 
         
          <p>Add the Investment information so you can check the numbers and see if it is a good deal for you!</p>     
          <h3>Investment information</h3>     
          <Row>
        <Col></Col>
        <Col xs={9}>  
      
              

      <Accordion defaultActiveKey="0" flush>

      <Accordion.Item eventKey="1">
        <Accordion.Header>Waterfall Information</Accordion.Header>
        <Accordion.Body>
      
  {!waterfall[personId].saved_in_db && <>      <Button variant="primary" onClick={SendPromoteWaterfall}>
        Create PromoteWaterfall
      </Button>
      <p></p>
      <Button variant="primary" onClick={SendCashFlowWaterfall}>
      Create CashFlowWaterfall
      </Button></>}
      <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Name of waterfall</Form.Label>
          <Form.Control disabled={waterfall[personId].saved_in_db} value={waterfall[personId].name} onChange={(e) => handlewaterfallChange(e.target.value,'name')} />
        </Form.Group> 
        <Row className="mb-3">

        <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Date Funds Recieved</Form.Label>
             <DatePicker disabled={waterfall[personId].saved_in_db} selected={changeDate( waterfall[personId].date_funds_recieved)}  onChange={(e) => handlewaterfallChange(e,'date_funds_recieved')}  />
          </Form.Group> 
          { live_info   &&        <Form.Group as={Col} >
              <Form.Label>Email Adrress</Form.Label>
              <Form.Control disabled={waterfall[personId].saved_in_db} value={waterfall[personId].email}  onChange={(e) => handlewaterfallChange(e.target.value,'email')} />
            </Form.Group>}

 </Row>
      <Row className="mb-3">
        
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Total GP amount sponsered</Form.Label>
          <Form.Control  disabled={waterfall[personId].saved_in_db} value={waterfall[personId].amount_gp_invested} onChange={(e) => handlewaterfallChange(e.target.value,'amount_gp_invested')} />
        </Form.Group>        
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Total LP amount sponsored </Form.Label>
          <Form.Control disabled={waterfall[personId].saved_in_db} value={waterfall[personId].amount_lp_invested} onChange={(e) => handlewaterfallChange(e.target.value,'amount_lp_invested')} />
        </Form.Group>
        
        <Form.Group as={Col} controlId="formGridEmail">
        <Form.Check 
        disabled={waterfall[personId].saved_in_db}
        type="switch"
        id="custom-switch"
        label="pay back principal after preferred"
        checked={waterfall[personId].principal_after_preffered}
        onChange={(e) => waterfall[personId].principal_after_preffered ? handlewaterfallChange(false,'principal_after_preffered') : handlewaterfallChange(true,'principal_after_preffered')}
      />        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Year start paying back principal</Form.Label>
        <Form.Control disabled={waterfall[personId].saved_in_db} placeholder={waterfall[personId].yr_strt_capital_payback} onChange={(e) => handlewaterfallChange(e.target.value,'yr_strt_capital_payback')} />
    </Form.Group>
    {/* <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Year Bought in</Form.Label>
        <Form.Select aria-label="Default select example" onChange={(e) => handlewaterfallChange(e.target.value,'year_bought_in')}>
          {payoutFrequency.transactions && payoutFrequency.transactions.map((transaction, i) => {
                    return (
                      <option value={i}>{JSON.stringify(transaction.date)}</option>
                    )
      })} 
        </Form.Select>

    </Form.Group> */}

      </Row>
      <Row className="mb-3">
          
        <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Type of split</Form.Label>
        <Form.Select disabled={waterfall[personId].saved_in_db} aria-label="Default select example" onChange={(e) => handlewaterfallChange(e.target.value,'type_of_split')}>
              <option value={waterfall[personId].type_of_split}>{waterfall[personId].type_of_split}</option>
              <option value="straight">straight split</option>
              <option value="split_plus_percentage">split_plus_percentage</option>
              <option value="split_percentage_of_owned">split_percentage_of_owned</option>
          </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Way In which to split</Form.Label>
        <Form.Select disabled={waterfall[personId].saved_in_db} aria-label="Default select example" onChange={(e) => handlewaterfallChange(e.target.value,'way_in_which_to_split')}>
              <option value={waterfall[personId].way_in_which_to_split}>{waterfall[personId].way_in_which_to_split}</option>
              <option value="investor_in_the_irr">Hurdle Bar IRR return for total invested</option>
              <option value="investor_on_top_of_irr">Hurdle Bar IRR return for LP</option>
          </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Type of hurdle</Form.Label>
        <Form.Select disabled={waterfall[personId].saved_in_db} aria-label="Default select example"  onChange={(e) => handlewaterfallChange(e.target.value,'type_of_hurdle')}>
              <option value={waterfall[personId].type_of_hurdle}>{waterfall[personId].type_of_hurdle}</option>
              <option value="non_yearly_compund">non yearly compund </option>
              <option value="irr_yearly_compund">irr yearly compund</option>
              <option value="paydown_capital_paydown_irr">paydown capital paydown irr</option>
          </Form.Select>
          </Form.Group>
          
        <Form.Group as={Col} controlId="formGridEmail">
        <Form.Check 
        disabled={waterfall[personId].saved_in_db}
          type="switch"
          id="custom-switch"
          label="irr_parri_passu"
          checked={waterfall[personId].irr_parri_passu}
          onChange={(e) => waterfall[personId].irr_parri_passu ? handlewaterfallChange(false,'irr_parri_passu') : handlewaterfallChange(true,'irr_parri_passu')}
        />        </Form.Group>
        { !waterfall[personId].irr_parri_passu  && <>
          <Form.Group as={Col} controlId="formGridEmail">
          <Form.Check 
          disabled={waterfall[personId].saved_in_db}
          type="switch"
          id="custom-switch"
          label="pay_gp_prefered"
          checked={waterfall[personId].pay_gp_prefered}
          onChange={(e) => waterfall[personId].pay_gp_prefered ? handlewaterfallChange(false,'pay_gp_prefered') : handlewaterfallChange(true,'pay_gp_prefered')}
        />        </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
          <Form.Check 
          disabled={waterfall[personId].saved_in_db}
          type="switch"
          id="custom-switch"
          label="pay_gp_principal"
          checked={waterfall[personId].pay_gp_principal}
  
          onChange={(e) => waterfall[personId].pay_gp_principal ? handlewaterfallChange(false,'pay_gp_principal') : handlewaterfallChange(true,'pay_gp_principal')}
        />        </Form.Group>
        </>
        }
          <Form.Group as={Col} controlId="formGridEmail">
          <Form.Check 
          disabled={waterfall[personId].saved_in_db}
          type="switch"
          id="custom-switch"
          label="capital_parri_passu"
          checked={waterfall[personId].capital_parri_passu}
  
          onChange={(e) => waterfall[personId].capital_parri_passu ? handlewaterfallChange(false,'capital_parri_passu') : handlewaterfallChange(true,'capital_parri_passu')}
        />        </Form.Group>
      
        </Row>
   
      </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Split and Hurdle Information</Accordion.Header>
        <Accordion.Body>
        <Hurdle waterfall={waterfall} setWaterfall={setWaterfall} personId={personId} ></Hurdle>

              </Accordion.Body>
      </Accordion.Item> 
      { !live_info &&
       <Accordion.Item eventKey="3">
        <Accordion.Header>Fee's (optional)</Accordion.Header>
        <Accordion.Body>
    <Fee waterfall={waterfall} setWaterfall={setWaterfall} personId={personId}></Fee>
              </Accordion.Body>
      </Accordion.Item>  
}
    </Accordion>
      </Col>

</Row>

      
      
      </div>   
    )
}
 
export default Calculator;