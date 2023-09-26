import React, { useState,useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import PandL from './PandL';
import Accordion from 'react-bootstrap/Accordion';
import apiRequest from '../../ApiRequest'
import UploadFIle from '../../Uploadfile';
import {reactLocalStorage} from 'reactjs-localstorage';
import useFetch from '../../useFetch';
import { useNavigate } from "react-router-dom";

const AddBill = ({pAndLs,setPandLs, expenseTypes,deal,company,diligence_id,bill_url, url_id}) => {
  const navigate = useNavigate()
  function create_proper_time(bad_time, selected){
    let local_time = bad_time.getTime()
    let time_offset = bad_time.getTimezoneOffset()
    let utcTimestamp
    if (selected){

       utcTimestamp = local_time + time_offset *60 * 1000
    } else {
       utcTimestamp = local_time - time_offset *60 * 1000

    }
    let newDate = new Date(utcTimestamp)
    return newDate
  }

    // function create_proper_time(bad_time){
    //   return new Date(Date.UTC(bad_time.getUTCFullYear(), bad_time.getUTCMonth(),
    //   bad_time.getUTCDate(), bad_time.getUTCHours(),
    //   bad_time.getUTCMinutes(), bad_time.getUTCSeconds()))
    // }
    function edit_times(data) {

      let updatedList = data.map((bill, i) => 
        {
          let newList = bill.transactions.map((item, i) => 
          {
            let new_date =new Date(item.date)
            // console.log(item.date)
            // console.log(new_date)
            let new_dte = create_proper_time(new_date, false)
            // console.log(new_dte)
            // new_value.value.date = Date.parse(value.value.date)

            return {'amount': item.amount, 'date': new_dte, 'bill_id': item.bill_id}; // else return unmodified item 
          });
          return {...bill, 'transactions' : newList}
        });

    setPandLs(updatedList);
    }; 

    const addPandL = e => {
        setPandLs(s => {
            const newMortgage = s.slice();
            newMortgage.push({ 'name' : 'legal fee',
            'btype_id': expenseTypes[0].id,
            'transactions': [],
                })
      
            return newMortgage;
          });
      }; 
      const deleteYear = e => {
        setPandLs(profits=> profits.filter((s,i)=>(i != e.target.id)))
          }

          const SendApi = async (e) => {
            //   e.preventDefault();
            if (bill_url == 'Diligence'){

              let info = pAndLs
              let a = await apiRequest('POST',info,`/bill/${company.id}/${deal.id}/${diligence_id}`)
              navigate(0)
            }
            } 
            let cookie = reactLocalStorage.get('cookie')
            const requestOptions = {
                method: 'GET',
                headers: { 
                'x-access-token': cookie},
            };
        
            const { data: returned_pandl, e, isP} = useFetch(`/bill/${bill_url}/${company.id}/${deal.id}/${diligence_id}/${url_id}` , requestOptions)
            useEffect(() => {
              if (returned_pandl){
                  // setMortgages(new_mortgages)
                  edit_times(returned_pandl)
              }
          }, [returned_pandl]);
            return ( 
                <> 
{bill_url == 'Diligence' && <>
<UploadFIle setInvestors={edit_times} apiextension={`diligence/uploadbill/${company.id}/${deal.id}/${diligence_id}`}/>

 </>}
 {!expenseTypes || !expenseTypes[0] && <h4> add in bill types</h4>}
{expenseTypes && expenseTypes[0] && <Button  variant="outline-primary" onClick={addPandL}>Add Statement</Button>}
 <Accordion defaultActiveKey={['0']} alwaysOpen>
              {pAndLs && pAndLs.map((item, i) => {
                    return (
                        
        <div key={i}>

<Accordion.Item eventKey={i}>
        <Accordion.Header>Account #{i+1}: {pAndLs[i].name}  &rarr;   <Button variant="outline-danger" size="sm" id={i} onClick={deleteYear}>
            Delete Me
          </Button></Accordion.Header> 
        <Accordion.Body>
        <PandL pAndLs={pAndLs} setPandLs={setPandLs} PandLID={i} expenseTypes={expenseTypes} bill_url={bill_url} company={company} deal={deal} diligence_id={diligence_id} url_id={url_id}></PandL>
        </Accordion.Body>
      </Accordion.Item>
 
 
      </div>
                    )
      })} 
   </Accordion>
   {bill_url == 'Diligence' &&
   <Button variant="primary" onClick={SendApi}>
        Submit
      </Button>}

              </>
    )
}
 
export default AddBill;