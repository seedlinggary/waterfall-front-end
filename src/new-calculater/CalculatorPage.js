import { useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import GrabFresh ,{parentList} from './GrabFresh'
import Tabs from 'react-bootstrap/Tabs';
import Row from 'react-bootstrap/Row';
// import Tabs from 'react-bootstrap/Tabs';
import NewCalculator from"./Calculator"
// import {saveInfogeneralwaterfall} from"./Calculator"
import Alert from 'react-bootstrap/Alert';  
import Table from 'react-bootstrap/Table';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Investor from "./Investor";

function CalculatorPage (){
    const [parentList, setParentList]= useState([])
    const [wtrfall, setWtrfall]= useState([])
    const [investorList,setInvestorList]=useState([])
    const [buttonClick, setButtonClick]=useState(false)
    const [dataWaterfall, setDataWaterfall]=useState([])
    const investorArr = [
        {
            value: {},
                    type: "",
        id: 0       },
    
    
      ];
    const [investorA, setInvestorA] = useState(investorArr);
    const [subInvestorA,setSubInvestorA]=useState(investorArr)
    // const [amountOfWaterfalls, setAmountOfWaterfalls] = useState([0])
    // console.log(parentList)
    function addWaterfall() {
        console.log(wtrfall.length)
        setWtrfall([...wtrfall, wtrfall]);
        // console.log(amountOfWaterfalls.length)
      }
      function addInvestor() {
        console.log(investorList.length)
        setInvestorList([...investorList, investorList  ]);
        // console.log(amountOfWaterfalls.length)
      }
    const [showError, setShowError] = useState(true);
    return(
    // <> 
    <>
        <div>
                    {/* <p>{pageID}</p> */}
        </div>
          <Investor investorA={investorA} setInvestorA={setInvestorA} buttonClick={buttonClick} />
        {/* <button onClick={addInvestor}>Add Investor</button> */}
         {wtrfall && wtrfall.map((arr,i) => <NewCalculator key={arr} pageID={i} wtrfall={wtrfall} setWtrfall={setWtrfall} parentList={parentList} setButtonClick={setButtonClick} buttonClick={buttonClick} subInvestorA={subInvestorA} setSubInvestorA={setSubInvestorA}/>)}
        <button onClick={addWaterfall}>Add Waterfall</button>
         {/* {investorList.map((arr,i) => <Investor key={arr} pageID={i} investorList={investorList} setInvestorList={setInvestorList} investora={investora} setInvestorA={setInvestorA} buttonClick={buttonClick} />)} */}
         <Row>
      <Col md={{ span: 2, offset: 3 }}>   
      <Button variant="success" onClick={()=>setButtonClick(true)}>
        Create Waterfall
      </Button>

      
      </Col>  <Col md={{ span: 2, offset: 2 }}>   
      <Button variant="success" onClick={""}>
        Download .xlsx File
      </Button>

    </Col>  
               </Row>
      {/* </Col> */}
        <Col></Col>
    {/* </Row> */}

    
      
     </>
    // </>
    )
    }
export default CalculatorPage