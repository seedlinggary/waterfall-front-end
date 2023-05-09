import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
import NewCalculator from './Calculator'
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';

import Profit from './Profit';
import Hurdle from '../calculator/Hurdle';
import Fee from '../calculator/Fee';
import Investor from '../new-calculater/Investor';
import {parentList} from './GrabFresh'

const Calculator = ({pageID, wtrfall, setWtrfall,buttonClick, setButtonClick ,investorA ,setInvestorA, subInvestorA ,setSubInvestorA }) => {
    const navigate = useNavigate()
    // const [waterfallInfo ,setWaterfallInfo] = useState[]
    const [parentArr, setParentArr]= useState({})
    const [irr_parri_passu, setIRRPariPassu] = useState(true)
    const [pay_gp_principal, setPayGPPrincipal] = useState(false)
    const [pay_gp_prefered, setPayGPPrefered] = useState(false)
    const [type_of_split, setTypeOfSplit] = useState("split_plus_percentage")
    const [capital_parri_passu, setCapitalParriPasu] = useState(false)
    const [type_of_hurdle, setTypeOfHurdle] = useState("irr_yearly_compund")
    const [way_in_which_to_split, setWayInWhichToSplit] = useState("investor_in_the_irr")
    const [principal_after_preffered, setPrincipalAfterPreffered] = useState(false)
    const [yr_strt_capital_payback, seYrStartCapitalPayback] = useState(10000)
    // const [cost_of_property, setCostOfProperty] = useState(10000)
    const [bank_loan_amount, setBankLoanAmount] = useState(0)
    const [investment_name, setInvestmentName] = useState('Money Maker')
    const [investment_type, setInvestmentType] = useState('Real Estate')
    const [percentage_investment_owned, setPercentageInvestmentOwned] = useState(1)
    const [gp_amount, setGPAmount] = useState(100000)
    const [lp_amount, setLPAmount] = useState(0)
    
    const inputArr = [
        {
            value: {'hurdinvestorArrle' : .08,
                    'sponsor_percent' : 0,
                    'limited_partner_percent' : 1},
                    type: "",
        id: 0       },
    
    
      ];
        const [arr, setArr] = useState(inputArr);

      
    const feeArr = [
        {
            value: {'year' : 1000,
            'before_what_hurdle' : 1,
            'who_gets_this_fee' : 'NEED AN INPUT',
            'percentage_or_cash' : 324,
            'type_transaction' : 'cash',
            'type_of_fee' : 'hurdle'},
                type: ""
        }
        
      ];
    const [fee, setFee] = useState(feeArr);

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
      const profitArr = [
        {
          value: {'profit' : 1000,
                  'date': today},
                  type: "",
      id: 0       }

      ];
    
    
      const [profit, setProfit] = useState(profitArr);
      const [profitFrequency, setProfitFrequency] = useState({'rate':'Year','start_date': today} );


      const investorArr = [
        {
            value: {},
                    type: "",
        id: 0       },
    
    
      ];
    const [subwtrfall, setSubwtrfall]= useState([])

    // const [investora, setInvestorA] = useState(investorArr);
    // const [subInvestorA,setSubInvestorA]=useState(investorArr)
    // console.log({setSubInvestorA})

      const SendPromoteWaterfall = (e) => {

        setIRRPariPassu(true)
        setTypeOfSplit("split_percentage_of_owned")
        setCapitalParriPasu(true)
        setTypeOfHurdle("irr_yearly_compund")
        setWayInWhichToSplit("investor_in_the_irr")
        setPrincipalAfterPreffered(false)

    }
    const SendCashFlowWaterfall = (e) => {
      
      setIRRPariPassu(false)
      setPayGPPrincipal(true)
      setPayGPPrefered(true)
      setTypeOfSplit("split_plus_percentage")
      setCapitalParriPasu(true)
      setTypeOfHurdle("irr_yearly_compund")
      setWayInWhichToSplit("investor_on_top_of_irr")
      setPrincipalAfterPreffered(false)

  }
      const saveInfogeneralwaterfall = (e) => {
      let aWaterfall = {"name": "Gary's LLC",
           "waterfall_preferences": {'irr_parri_passu': irr_parri_passu,
           'pay_gp_principal': pay_gp_principal,
           'pay_gp_prefered': pay_gp_prefered,
           'type_of_split': type_of_split,
           'capital_parri_passu': capital_parri_passu,
           'type_of_hurdle': type_of_hurdle,
           'way_in_which_to_split' : way_in_which_to_split,
           'principal_after_preffered': principal_after_preffered,
           'yr_strt_capital_payback': (yr_strt_capital_payback - 1)},
           "splits": arr,
           "percentage_investment_owned": percentage_investment_owned,
           "amount_gp_invested": gp_amount,
           "amount_lp_invested": lp_amount,
           "fees": fee,
          "investors": subInvestorA,
          "investment_frequency": profitFrequency,
          'subWaterfall':[]
          
          }
          // setWaterfallInfo(in)
          parentList.push(aWaterfall)
          console.log(`test${parentList}`)
  
      e.preventDefault();
      
      
      } 
      
        // const handleWaterfallChange = e => {
        //   e.preventDefault();
        //   let index = e.target.id;
        //   if (e.target.id > 0){
        //       index = e.target.id
        //   }else{
        //       index = 0
        //   }

        //   setParentList(s => {
        //     const parentList = s.slice();
        //     parentList[pageID] = e.target.value;
      
        //     return parentList;
        //   });
        // }; 
      useEffect(() => {
        // if(parentList.length > amountOfWaterfalls.length){
        //   parentList.length=0
        // }
        if (buttonClick) {
          
          // console.log(`amountOfWaterfalls ${amountOfWaterfalls.length} parentList ${parentList.length}`)
          if(wtrfall){
            setWtrfall(s => {
              const wtrfall = s.slice();
              wtrfall[pageID] = aWaterfall
              // console.log(wtrfall)
              return wtrfall;
            });
          }else{
            wtrfall=aWaterfall
          }
           
          //  if(subwtrfall){
          //       setSubwtrfall(s => {
          //         const wtrfall = s.slice();
          //         wtrfall[pageID] = info
          //         // console.log(subwtrfall)
          //         return wtrfall;
          //       });
          //     }else{
          //       subwtrfall=[info]
          //     }
              
          // console.log()
          let investers=[{
            "investors": investorA,
          }]
          let aWaterfall = {"name": "Gary's LLC",
          "waterfall_preferences": {'irr_parri_passu': irr_parri_passu,
          'pay_gp_principal': pay_gp_principal,
          'pay_gp_prefered': pay_gp_prefered,
          'type_of_split': type_of_split,
          'capital_parri_passu': capital_parri_passu,
          'type_of_hurdle': type_of_hurdle,
          'way_in_which_to_split' : way_in_which_to_split,
          'principal_after_preffered': principal_after_preffered,
          'yr_strt_capital_payback': (yr_strt_capital_payback - 1)},
          // "splits": arr,
          "percentage_investment_owned": percentage_investment_owned,
          "amount_gp_invested": gp_amount,
          "amount_lp_invested": lp_amount,
          "fees": fee,
         "investors": subInvestorA,
         "investment_frequency": profitFrequency,
         'subWaterfall':[]
         
         }
              
              // if (wtrfall) {
              //   const updatedSubWaterfall = wtrfall.slice();
              //   updatedSubWaterfall[pageID] = info;
              //   wtrfall[pageID].llcs[0].subWaterfall = updatedSubWaterfall;
              //   setSubwtrfall(updatedSubWaterfall);
              // } else {
              //   setSubwtrfall(info);
              // }
              

            console.log(investorA)
            var holder={"investors":investers,"waterfalls":wtrfall}
            // console.log(wtrfall)
            setButtonClick(false)
          console.log("Button clicked!");
          // if (parentList.length){
          // setButtonClick(false)}
        }
        let investers=[{
          "investors": investorA,
        }]
        setParentArr(holder)
        console.log(parentArr)
        console.log(buttonClick)
      }, [buttonClick]);   
    
            function addWaterfall() {
              console.log(wtrfall)
              setWtrfall(s => {
                const addwaterfall = s.slice();
                addwaterfall[pageID].push([''])
          
                return addwaterfall;
              });
             
             
            }
            let aWaterfall = {"name": "Gary's LLC",
          "waterfall_preferences": {'irr_parri_passu': irr_parri_passu,
          'pay_gp_principal': pay_gp_principal,
          'pay_gp_prefered': pay_gp_prefered,
          'type_of_split': type_of_split,
          'capital_parri_passu': capital_parri_passu,
          'type_of_hurdle': type_of_hurdle,
          'way_in_which_to_split' : way_in_which_to_split,
          'principal_after_preffered': principal_after_preffered,
          'yr_strt_capital_payback': (yr_strt_capital_payback - 1)},
          "splits": arr,
          "percentage_investment_owned": percentage_investment_owned,
          "amount_gp_invested": gp_amount,
          "amount_lp_invested": lp_amount,
          "fees": fee,
         "investors": subInvestorA,
         "investment_frequency": profitFrequency,
         'subWaterfall':[]
         
         }
    // setParentArr(s => {
    //   console.log(parentArr)
    //   if(parentArr){
    //     const waterfall = s.slice();
    //     waterfall[pageID] = aWaterfall;
        
    //     console.log(parentArr)
    //     return waterfall;
    //   }
    //   else{
    //     return aWaterfall
    //   }})
    // setParentArr([aWaterfall])
       
            return ( 
              <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey={pageID}>
                <Accordion.Header>Waterfall {pageID+1}</Accordion.Header>
                <Accordion.Body>
        <div> 
         
                <>
                <br></br>
                <div>
                  <p>{pageID}</p>
                </div>
      

    
    </>  
          <p>Add the Investment information so you can check the numbers and see if it is a good deal for you!</p>     
          <h3>Investment information</h3>     
         
      <Accordion defaultActiveKey="0" flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Years Of Profit</Accordion.Header>
        <Accordion.Body>
    
        <Profit profit={profit} setProfit={setProfit} profitFrequency={profitFrequency} setProfitFrequency={setProfitFrequency}></Profit>

              </Accordion.Body>
      </Accordion.Item>    

      <Accordion.Item eventKey="1">
        <Accordion.Header>Waterfall Information</Accordion.Header>
        <Accordion.Body>
      
        <Button variant="primary" onClick={SendPromoteWaterfall}>
        Create PromoteWaterfall
      </Button>
      <p></p>
      <Button variant="primary" onClick={SendCashFlowWaterfall}>
      Create CashFlowWaterfall
      </Button>
   
      <Row className="mb-3">
        
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>GP amount sponsered</Form.Label>
          <Form.Control  placeholder={gp_amount} onChange={(e) => setGPAmount(e.target.value)} />
        </Form.Group>        
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>LP amount sponsored (optional if no input of investers)</Form.Label>
          <Form.Control  placeholder={lp_amount} onChange={(e) => setLPAmount(e.target.value)} />
        </Form.Group>
        
        <Form.Group as={Col} controlId="formGridEmail">
        <Form.Check 
        type="switch"
        id="custom-switch"
        label="pay back principal after preferred"
        checked={principal_after_preffered}
        onChange={(e) => principal_after_preffered ? setPrincipalAfterPreffered(false) : setPrincipalAfterPreffered(true)}
      />        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Year start paying back principal</Form.Label>
        <Form.Control  placeholder={yr_strt_capital_payback} onChange={(e) => seYrStartCapitalPayback(e.target.value)} />
    </Form.Group>

      </Row>
      <Row className="mb-3">
          
        <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Type of split</Form.Label>
        <Form.Select aria-label="Default select example" onChange={(e) => setTypeOfSplit(e.target.value)}>
              <option value={type_of_split}>{type_of_split}</option>
              <option value="straight">straight split</option>
              <option value="split_plus_percentage">split_plus_percentage</option>
              <option value="split_percentage_of_owned">split_percentage_of_owned</option>
          </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Way In which to split</Form.Label>
        <Form.Select aria-label="Default select example" onChange={(e) => setWayInWhichToSplit(e.target.value)}>
              <option value={way_in_which_to_split}>{way_in_which_to_split}</option>
              <option value="investor_in_the_irr">GP apart of the whole</option>
              <option value="investor_on_top_of_irr">GP's cut over the whole (gemara style)</option>
          </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Type of hurdle</Form.Label>
        <Form.Select aria-label="Default select example"  onChange={(e) => setTypeOfHurdle(e.target.value)}>
              <option value={type_of_hurdle}>{type_of_hurdle}</option>
              <option value="non_yearly_compund">non yearly compund </option>
              <option value="irr_yearly_compund">irr yearly compund</option>
              <option value="paydown_capital_paydown_irr">paydown capital paydown irr</option>
          </Form.Select>
          </Form.Group>
          
        <Form.Group as={Col} controlId="formGridEmail">
        <Form.Check 
          type="switch"
          id="custom-switch"
          label="irr_parri_passu"
          checked={irr_parri_passu}
          onChange={(e) => irr_parri_passu ? setIRRPariPassu(false) : setIRRPariPassu(true)}
        />        </Form.Group>
        { !irr_parri_passu  && <>
          <Form.Group as={Col} controlId="formGridEmail">
          <Form.Check 
          type="switch"
          id="custom-switch"
          label="pay_gp_prefered"
          checked={pay_gp_prefered}
          onChange={(e) => pay_gp_prefered ? setPayGPPrefered(false) : setPayGPPrefered(true)}
        />        </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
          <Form.Check 
          type="switch"
          id="custom-switch"
          label="pay_gp_principal"
          checked={pay_gp_principal}
  
          onChange={(e) => pay_gp_principal ? setPayGPPrincipal(false) : setPayGPPrincipal(true)}
        />        </Form.Group>
        </>
        }
          <Form.Group as={Col} controlId="formGridEmail">
          <Form.Check 
          type="switch"
          id="custom-switch"
          label="capital_parri_passu"
          checked={capital_parri_passu}
  
          onChange={(e) => capital_parri_passu ? setCapitalParriPasu(false) : setCapitalParriPasu(true)}
        />        </Form.Group>
      
        </Row>
   
      </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Split and Hurdle Information</Accordion.Header>
        <Accordion.Body>
        <Hurdle arr={arr} setArr={setArr}></Hurdle>

              </Accordion.Body>
      </Accordion.Item>  
       <Accordion.Item eventKey="3">
        <Accordion.Header>Fee's (optional)</Accordion.Header>
        <Accordion.Body>
    <Fee fee={fee} setFee={setFee}></Fee>
              </Accordion.Body>
      </Accordion.Item>     <Accordion.Item eventKey="4">
        <Accordion.Header>Add Investors or waterfall (optional)</Accordion.Header>
        <Accordion.Body>
          <Investor subInvestorA={subInvestorA} setSubInvestorA={setSubInvestorA}></Investor>
         {wtrfall[pageID].subWaterfall && wtrfall[pageID].subWaterfall?.map((arr,i=100) => <NewCalculator key={`sub${arr}`} pageID={i} subwtrfall={subwtrfall} setSubwtrfall={setSubwtrfall} parentList={parentList} setButtonClick={setButtonClick} buttonClick={buttonClick} subInvestorA={subInvestorA} setSubInvestorA={setSubInvestorA}/>)}
         <button onClick={addWaterfall}>Add Waterfall</button>
          {/* <Calculator/> */}
              </Accordion.Body>
      </Accordion.Item>
    </Accordion>

    <br></br>
       
<br></br>
      
      
      </div> 
        </Accordion.Body>
      </Accordion.Item>  
      </Accordion>
    )
}


export default Calculator;
// export { SendApi };
// module.exports = {
//   // SendApi
// }