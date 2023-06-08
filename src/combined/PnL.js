import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import PandL from '../profitlosses/PandL';
import Accordion from 'react-bootstrap/Accordion';
import DealInfo from '../profitlosses/DealInfo';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
// import PNLSetInfo from './PNLSetInfo';
import Alert from 'react-bootstrap/Alert';
import PNLSetInfo from '../profitlosses/PNLSetInfo';

const PnL = ({dealInfo, setDealInfo,pAndLs,setPandLs}) => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const [respCatagories, setRespCatagories] = useState(true)
    const [respMonth, setRespMonth] = useState(true)
    const [respYear, setRespYear] = useState(true)
    const [respMonthTotal, setRespMonthTotal] = useState(true)
    const [respYearTotal, setRespYearTotal] = useState(true)
    const [respCatagoriesTotal, setRespcatagoriesTotal] = useState()
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    const [showSave, setShowSave] = useState(false);

    const handleCloseSave = () => setShowSave(false);
    const handleShowSave = () => setShowSave(true);
    const [savedInfo, setSavedInfo] = useState();

    const [acceptTermsAndCondisiotns, setAcceptTermsAndCondisiotns] = useState(false)
    const [warningTermsAndConditions, setWarningTermsAndConditions] = useState(false)


    const addPandL = e => {
        setPandLs(s => {
            const newMortgage = s.slice();
            newMortgage.push({ 'transaction_name' : 'legal fee',
            'transaction_type': 'soft_costs',
            'transactions': [],
                })
      
            return newMortgage;
          });
      }; 
      const deleteYear = e => {
        setPandLs(profits=> profits.filter((s,i)=>(i != e.target.id)))
          }
          const saveInfo = () => {
              setSavedInfo(JSON.stringify({'deal_info' : dealInfo,
              'pandls' : pAndLs }))
          }
          const inputSavedData = e => {
            var savedData = JSON.parse(e.target.value);

           
            let newParent = {};
            Object.entries(savedData.deal_info).map( ([k, v],index) => {
              if (k == 'purchase_date'){
                var today2 = new Date(v);
                newParent[k] = today2
              }else{
                newParent[k] = v
              }
            })
            let newpnl = savedData.pandls.map(profitlosses =>{

              let updatedtransactions = profitlosses.transactions.map(transaction =>{
                let newTransaction = {}
                Object.entries(transaction).map( ([k, v],index) => {
                  if (k == 'date'){
                    var today2 = new Date(v);
                    newTransaction[k] = today2
                  }else{
                    newTransaction[k] = v
                  }
                })
                return newTransaction
              })
              return {...profitlosses, 'transactions' : updatedtransactions};
            })
  
  
            setDealInfo(newParent)
            setPandLs(newpnl)

          }
      
      
            return ( 
                <> 
                         {warningTermsAndConditions &&  <Alert variant="danger" onClose={() => setWarningTermsAndConditions(false)} dismissible>
        <Alert.Heading>Warning!</Alert.Heading>
        <p>
          This website does not take responsibility for any information given or provided. Please compare your waterfall results against your own information for accurecy. Please check terms and condition box.
        </p>
      </Alert>}
                     {/* <Button variant="info" onClick={handleShowSave} className="me-2">
        Save Info
      </Button> */}

      <Offcanvas show={showSave} onHide={handleCloseSave} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Saved Data</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          To save time click the button bellow. Save the code somewhere safe for later.
           Whenever you come back take the code you saved and place it in the text box bellow. All of your information and preferences will return
          <br></br>
          <Button variant="info" onClick={saveInfo}>
        Show me what to save
      </Button>
      <br>
      
      </br>
      <ListGroup>
      <ListGroup.Item disabled>Take this info and put it somewhere safe</ListGroup.Item>
      <ListGroup.Item>{savedInfo}</ListGroup.Item>
    </ListGroup>
    <Form>
     
      <Form.Group className="mb-3"  onChange={inputSavedData}>
        <Form.Label>Input Saved Data Here.</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
    </Form>
        </Offcanvas.Body>
      </Offcanvas>
                <br></br>
                <DealInfo dealInfo={dealInfo} setDealInfo={setDealInfo}></DealInfo>
                <br></br>
 <Button  variant="outline-primary" onClick={addPandL}>Add Statement</Button>

 <Accordion defaultActiveKey={['0']} alwaysOpen>
              {pAndLs && pAndLs.map((item, i) => {
                    return (
                        
        <div key={i}>

<Accordion.Item eventKey={i}>
        <Accordion.Header>Account #{i+1}: {pAndLs[i].transaction_name}  &rarr;   <Button variant="outline-danger" size="sm" id={i} onClick={deleteYear}>
            Delete me
          </Button></Accordion.Header> 
        <Accordion.Body>
        <PandL pAndLs={pAndLs} setPandLs={setPandLs} PandLID={i}></PandL>

        </Accordion.Body>
      </Accordion.Item>
 
 
      </div>
                    )
      })} 
   </Accordion>


              </>
    )
}
 
export default PnL;