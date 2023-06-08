import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';

const SaveInfo = ({ dealInfo,setDealInfo,pAndLs,setPandLs, mortgages, tree, payoutFrequency, pId, setMortgages, setPayoutFrequency, setGP,setLP,setTree, setWaterfall}) => {
    // JSON.stringify({'deal_info' : dealInfo,
    // 'pandls' : pAndLs,
    // 'mortgages': mortgages,
    // 'family_tree' : formatTree(tree,pId),
    // 'payout_frequency': payoutFrequency })   
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const [showSave, setShowSave] = useState(false);

    const handleCloseSave = () => setShowSave(false);
    const handleShowSave = () => setShowSave(true);
    const [savedInfo, setSavedInfo] = useState();
    
    const unformatTree = (tree) => {
        const flatTree = {};
       
        console.log(tree)
        const addPerson = (person, parentId = null) => {
          const { id, name, waterfall, lp, gp, children } = person;
          flatTree[id] = { id, name, waterfall, lp, gp, children: [] };
         
          if (parentId) {
            flatTree[parentId].children.push(id);
          }
         
          if (children) {
            children.forEach((child) => addPerson(child, id));
          }
        };
       
        addPerson(tree);
        
        let newLP = {}
        let newGP = {}
        let newWaterfall = {}
        Object.entries(flatTree).map( ([key2, value2],index) => {
        if (value2['gp']){

          newGP[key2]= value2['gp']
        }else if (value2['lp']){
          newLP[key2]= value2['lp']
        }else if (value2['waterfall']){
          newWaterfall[key2]= value2['waterfall']
        }
        })
        setGP(newGP)
        setLP(newLP)
        setWaterfall(newWaterfall)
        setTree(flatTree)
        return flatTree;
      };
          const saveInfo = () => {
              setSavedInfo(   
                 JSON.stringify({'deal_info' : dealInfo,
              'pandls' : pAndLs,
              'mortgages': mortgages,
              'family_tree' : tree,
              'payout_frequency': payoutFrequency })   
          )
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
  
            let newMortgages = savedData.mortgages.map(mortgages =>{
                var newStartdate = new Date(mortgages.start_date);
                let newRespList = mortgages.res_payment_list
                if (mortgages.res_payment_list){
                    newRespList = mortgages.res_payment_list.map(res =>{
                        var newPaymentdate = new Date(res.payment_date);
                        
                        return {...res, 'payment_date' : newPaymentdate};
                      })
                } 
                return {...mortgages, 'start_date' : newStartdate, 'res_payment_list': newRespList};
              })
            setDealInfo(newParent)
            setPandLs(newpnl)
            setMortgages(newMortgages)

            let newPayoutfrequency = savedData.payout_frequency
            var newStartdate = new Date(savedData.payout_frequency.start_date);
            console.log(newStartdate)  
            let newTransactions 
            if (savedData.payout_frequency.transactions){
                newTransactions = savedData.payout_frequency.transactions.map(res =>{
                    console.log(res.date)
                    var newPaymentdate = new Date(res.date);
                    return {...res, 'date' : newPaymentdate};
                })
                newPayoutfrequency.transactions = newTransactions
            }
                newPayoutfrequency.start_date = newStartdate
                // newPayoutfrequency.transactions = newTransactions
            setPayoutFrequency(newPayoutfrequency)
            unformatTree(savedData.family_tree)
          }
      
            return ( 
                <> 

                     <Button variant="outline-primary" onClick={handleShowSave} className="me-2">
        Save Info
      </Button>

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
              </>
    )
}
 
export default SaveInfo;