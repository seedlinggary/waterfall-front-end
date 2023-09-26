import React, { useState } from 'react'
import apiRequest from '../../ApiRequest'
import Table from 'react-bootstrap/Table'
// import Investor from './Investor';
import Form from 'react-bootstrap/Form';
import EditTable from './DiligenceTable';

const DiligenceTable = ({pAndLs}) => {


    const [modalShow, setModalShow] = useState();
    function checkDate(pandl, date){
      let amount = 0
      pandl.transactions.map((transaction,i) => {
        let new_time = transaction.date.setHours(0,0,0,0)
        if(new_time == date){
          amount = transaction.amount
        }
        
    }  )
    return amount
    }
      function formatDate(date){
        let new_date = new Date(date)
        
        return JSON.stringify(` ${new_date.getMonth() + 1}-${new_date.getDate()}-${new_date.getFullYear()}`)
      }
      function getDatesOrdered(pAndLs) {
        
        let all_dates = []
       pAndLs.map((pandl,i) => {
          let new2List = pandl.transactions.map((transaction,i) => {
              return transaction.date.setHours(0,0,0,0)
          }  )
            all_dates = all_dates.concat(new2List)
          }  )
        let uniq = [...new Set(all_dates.sort())];
       return uniq
      }
            return ( 
                <> 
 {pAndLs && <Table striped bordered hover responsive>

                        <thead>
                        <tr>
                        <th>#</th>
                        <th>Type</th>
                          <th> Name</th>
                          {pAndLs[0] && getDatesOrdered(pAndLs).map((date,i) => {
                            return(
                                <>
                                <th> {  formatDate(date) }</th>
                                </>
                            )
                          })}

                        </tr>
                      </thead>
                      <tbody>
    {pAndLs.map((pandls, i) => {
                    return (
                        <>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{pandls.transaction_type}</td>
                          <td>{pandls.name}</td>
                          {pAndLs[0] && getDatesOrdered(pAndLs).map((date,i) => {
                            return(
                                <>
                                <th> {  checkDate(pandls,date) }</th>
                                </>
                            )
                          })}

                        </tr>
                      
                      </>
                    )})}
                   
                      </tbody>

    </Table>}

              </>
    )
}
 
export default DiligenceTable;