import React, { useState,useEffect } from 'react'
import apiRequest from '../../ApiRequest'
import Table from 'react-bootstrap/Table'

const MortgageBills = ({returned_mortgages}) => {

            return ( 
                <> 
      {returned_mortgages  && returned_mortgages.map((new_mortgages,index) => {
                            return(
                                <>
                                 {new_mortgages && <Table striped  bordered hover responsive>

<thead>
<tr>
<th>#</th>
  { new_mortgages && new_mortgages.map((info,i) => {
    return(
        <>
        <th> {  info.sent_date }</th>
        </>
    )
  })}

</tr>
</thead>
<tbody>
<tr>
<td> ID</td>
{new_mortgages && new_mortgages.map((mortgage_info, i) => {
return (
<>
  <td>{i + 1}</td>


</>
)})}
</tr>          
<tr>
<td>Begining Balance</td>

{ new_mortgages && new_mortgages.map((mortgage_info, i) => {
return (
<>
  <td>{mortgage_info.mbill && (mortgage_info.mbill.principal_paid + mortgage_info.mbill.remaining_balance).toLocaleString()}</td>


</>
)})}
</tr>   
<tr>
<td>Total Amount Paid</td>

{ new_mortgages && new_mortgages.map((mortgage_info, i) => {
return (
<>
  <td>{mortgage_info.amount}</td>


</>
)})}
</tr>   
<tr>
<td> Interest Rate</td>

{ new_mortgages && new_mortgages.map((mortgage_info, i) => {
return (
<>
  <td>{mortgage_info.mbill &&  mortgage_info.mbill.rate}</td>



</>
)})}
</tr>    
<tr>
<td> Interest Paid</td>

{ new_mortgages && new_mortgages.map((mortgage_info, i) => {
return (
<>
  <td>{ mortgage_info.mbill && mortgage_info.mbill.interest_paid}</td>



</>
)})}
</tr>        
<tr>
<td> Principal Paid</td>

{ new_mortgages && new_mortgages.map((mortgage_info, i) => {
return (
<>
  <td>{ mortgage_info.mbill &&  mortgage_info.mbill.principal_paid}</td>



</>
)})}
</tr>
<tr>
<td> Remaining Balance</td>

{ new_mortgages && new_mortgages.map((mortgage_info, i) => {
return (
<>
  <td>{mortgage_info.mbill &&  mortgage_info.mbill.remaining_balance}</td>



</>
)})}
</tr>
<tr>
<td> Total Principal Paid</td>

{ new_mortgages && new_mortgages.map((mortgage_info, i) => {
return (
<>
  <td>{mortgage_info.mbill &&  mortgage_info.mbill.total_principal_payment}</td>



</>
)})}
</tr>
<tr>
<td> Total Interest Paid</td>

{ new_mortgages && new_mortgages.map((mortgage_info, i) => {
return (
<>
  <td>{mortgage_info.mbill &&  mortgage_info.mbill.total_interest_payment}</td>



</>
)})}
</tr>
</tbody>

</Table>}

                                </>
                            )
                          })}

              </>
    )
}
 
export default MortgageBills;