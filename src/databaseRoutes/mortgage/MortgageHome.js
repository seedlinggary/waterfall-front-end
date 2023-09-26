import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import MortgageAdd from './MortgageAdd';
import {reactLocalStorage} from 'reactjs-localstorage';
import useFetch from '../../useFetch';
import apiRequest from '../../ApiRequest'


const MortgageHome = ({deal,company,diligence_id, bill_url, url_id}) => {
    const [mortgages, setMortgages] = useState([])

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const deleteMortgage = e => {
        const newMortgages =  mortgages.filter((s,i)=>(i != e.target.id))
        setMortgages(s => {
            const newPandL = s.slice();
            return newMortgages;
        });
            // console.log(mortgages)
          }
    // const [mortgages, setMortgages] = useState([])
    const addMortgage = e => {
        e.preventDefault();
        setMortgages(s => {
            const newMortgage = s.slice();
            newMortgage.push({ 'length' : 3,
            'starting_rate': .06,
            'amount': 1000000,
            'res_payment_list' : null,
            'mtype_id': 1,
            'balloon_payment_back': 24,
            'mortgage_resp': null,
            'start_date': today,
            'name': 'my mortgage',
            'fees': 50000,
            'interestRates': [],
                
                })
      
            return newMortgage;
          });
      }; 
      const SendApi = async (e) => {
        //   e.preventDefault();
          let info = mortgages
          // console.log(mortgages)
          let a = await apiRequest('POST',info,`/mortgage/${bill_url}/${company.id}/${deal.id}/${url_id}`)
          // console.log(a)
          // navigate(0)
        } 
          
      let cookie = reactLocalStorage.get('cookie')
      const requestOptions = {
          method: 'GET',
          headers: { 
          'x-access-token': cookie},
      };
      function edit_times(data) {

            // console.log(returned_mortgages)
            let newList = data.map((item, i) => 
            {
              let new_date =new Date(item.start_date)
              // new_value.value.date = Date.parse(value.value.date)
              // console.log(item)
              return {...item,  'start_date': new_date,'interestRates': [[...Array(30).keys()]] }; // else return unmodified item 
            });
  
          setMortgages(newList);
      }; 
      const { data: new_mortgages, error, isPending} = useFetch(`/mortgage/all/${bill_url}/${company.id}/${deal.id}/${url_id}` , requestOptions)
      useEffect(() => {
        if (new_mortgages ){
            edit_times(new_mortgages)
            // setMortgages(new_mortgages)
        }
    }, [new_mortgages]);
            return ( 
                <> 
 <Button  variant="outline-primary" onClick={addMortgage}>Add Mortgage</Button>

 <Accordion defaultActiveKey="0" flush>
              {mortgages && mortgages.map((item, i) => {
                    return (
                        
        <div key={i}>
      <Accordion.Item eventKey={i}>
        <Accordion.Header>
                        <h3>Name: {mortgages[i].name} / Amount:{mortgages[i].amount} </h3><Button variant="outline-danger" id={i} onClick={deleteMortgage}>
            Delete Me
          </Button>
        </Accordion.Header>
        <Accordion.Body>



 <MortgageAdd mortgages={mortgages} setMortgages={setMortgages} mortgageID={i} deal={deal} company={company}></MortgageAdd>
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
 
export default MortgageHome;