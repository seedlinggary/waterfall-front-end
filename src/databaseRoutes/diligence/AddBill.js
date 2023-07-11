import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import PandL from './PandL';
import Accordion from 'react-bootstrap/Accordion';
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
import apiRequest from '../../ApiRequest'
import UploadFIle from '../../Uploadfile';

const AddBill = ({pAndLs,setPandLs, expenseTypes,deal,company,diligence_id}) => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    function edit_times(data) {

      let updatedList = data.map((bill, i) => 
        {
          let newList = bill.transactions.map((item, i) => 
          {
            let new_date =new Date(item.date)
            // new_value.value.date = Date.parse(value.value.date)

            return {'amount': item.amount, 'date': new_date}; // else return unmodified item 
          });
          return {...bill, 'transactions' : newList}
        });

    setPandLs(updatedList);
      console.log(pAndLs)
    }; 

    const addPandL = e => {
        setPandLs(s => {
            const newMortgage = s.slice();
            newMortgage.push({ 'name' : 'legal fee',
            'btype_id': 1,
            'transactions': [],
                })
      
            return newMortgage;
          });
      }; 
      const deleteYear = e => {
        setPandLs(profits=> profits.filter((s,i)=>(i != e.target.id)))
          }

          const SendApi = (e) => {
            //   e.preventDefault();
            console.log(pAndLs)
              let info = pAndLs
              let a = apiRequest('POST',info,`/diligence/bill/${company.id}/${deal.id}/${diligence_id}`)
            //   navigate(0)
            } 
    
            return ( 
                <> 

<UploadFIle setInvestors={edit_times} apiextension={`diligence/uploadbill/${company.id}/${deal.id}/${diligence_id}`}/>

 <Button  variant="outline-primary" onClick={addPandL}>Add Statement</Button>

 <Accordion defaultActiveKey={['0']} alwaysOpen>
              {pAndLs && pAndLs.map((item, i) => {
                    return (
                        
        <div key={i}>

<Accordion.Item eventKey={i}>
        <Accordion.Header>Account #{i+1}: {pAndLs[i].name}  &rarr;   <Button variant="outline-danger" size="sm" id={i} onClick={deleteYear}>
            Delete Me
          </Button></Accordion.Header> 
        <Accordion.Body>
        <PandL pAndLs={pAndLs} setPandLs={setPandLs} PandLID={i} expenseTypes={expenseTypes}></PandL>
        </Accordion.Body>
      </Accordion.Item>
 
 
      </div>
                    )
      })} 
   </Accordion>

   <Button variant="primary" onClick={SendApi}>
        Submit
      </Button>

              </>
    )
}
 
export default AddBill;