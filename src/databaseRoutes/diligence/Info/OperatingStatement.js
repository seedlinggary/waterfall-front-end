import React, { useState,useEffect } from 'react'
import apiRequest from '../../../ApiRequest'
import Table from 'react-bootstrap/Table'
// import Investor from './Investor';
import Form from 'react-bootstrap/Form';

const OperatingStatement = ({dateType,debt,date_list}) => {
    const [catagoriesName, setCatagoreisName] = useState()

    function GetCatagories(dateType) {
        let catgories_name = {}
        if (dateType){
            Object.entries(dateType).map( ([catagories, info],index) => {
                    { info && Object.entries(info).map( ([names, inf],index) => {
                        if (catgories_name[`${names}`]){

                        }else{
                            catgories_name[`${names}`] = []
                        }

                       {inf && Object.entries(inf).map( ([name, amount],index) => {
                           if (catgories_name[`${names}`].includes(name)){

                            }else{
                                catgories_name[`${names}`].push(name)
                            }

                    })}
                    // catgories_name[`${names}`].pop()
                    
                })}
                // delete catgories_name['total']  
                
                
            })
            setCatagoreisName(catgories_name)
              }
      }
    
      useEffect(() => {
        if (dateType){
            GetCatagories(dateType)
            // setMortgages(new_mortgages)
            // edit_times(returned_pandl)
        }
    }, [dateType]);
            return ( 
                <> 
{dateType && <Table striped bordered hover responsive>

        <thead>
            <tr>
            <th>#</th>
            <th>Catagories</th>
            <th>Bills</th>
                {date_list &&  date_list.map( (dates,index) => {
                    return(
                        <>
                        <th> {  dates }</th>
                        </>
                    )
                })}

            </tr>
        </thead>
        <tbody>
        {catagoriesName && Object.entries(catagoriesName).map( ([catagory, value2],index) => {

                    return(
                        <>
                        
                        
                        {(catagory != 'date' && catagory != 'irr_List' && catagory != 'levered_irr_List') && value2.map((name,i) => {
                            return(
                                <>
                                    <tr>
                                    <td> {i}</td>
                                    <td> {catagory}</td>
                                    <td> {name}</td>
                                    { date_list &&  date_list.map( (date,index) => {
                                    return(
                                        <>
                                        {(dateType[date] && dateType[date][`${catagory}`] && dateType[date][`${catagory}`][`${name}`] &&dateType[date][`${catagory}`][`${name}`]['original'] &&<td> {dateType[date][`${catagory}`][`${name}`]['original'].toLocaleString()}</td>) || (dateType[date] && dateType[date][`${catagory}`] && dateType[date][`${catagory}`][`${name}`] && !isNaN(dateType[date][`${catagory}`][`${name}`]) &&<td> {dateType[date][`${catagory}`][`${name}`].toLocaleString()}</td>)  || ( debt &&<td> 0</td>)|| ( !debt && <td> 0</td>)}
                                        {/* {(dateType[date] && dateType[date][`${catagory}`] && dateType[date][`${catagory}`][`${name}`] && !isNaN(dateType[date][`${catagory}`][`${name}`]) &&<td> {dateType[date][`${catagory}`][`${name}`].toLocaleString()}</td>)  || ( debt &&<td> 0</td>)} */}
                                        {/* {!value2[`${catagory}`] || !value2[`${catagory}`][`${name}`] || <td> 0</td>} */}
                                        {/* {console.log(dateType[date][`${catagory}`])} */}
                                        </>
                                    )
                                })}
                        </tr>
                        {/* <tr><td></td></tr>  */}
                        </>
                            )
                        })}
                         {/* {(catagory != 'date' || catagory != 'irr_List' || catagory != 'levered_irr_List' ) || <tr> */}
                        {/* // {(catagory != 'date' && catagory != 'irr_List' && catagory != 'levered_irr_List')  &&
                        // 
                        //   <td> total</td>
                        //   <td> total</td>
                        //   <td> total</td>
                        //   { date_list &&  date_list.map( (date,index) => {
                        //             return(
                        //                 <>
                        //                 {console.log(dateType[date][`${catagory}`])}
                        //                 {dateType[date][`${catagory}`] && dateType[date][`${catagory}`].total &&<td> {dateType[date][`${catagory}`]['total'].toLocaleString()}</td>}
                        //                 {!dateType[date][`${catagory}`]  &&<td> 0</td>}
                        //                 </>
                        //             )
                        //         })}
                        //   </tr>
                        //   } */}
{        (catagory != 'date' && catagory != 'irr_List' && catagory != 'levered_irr_List'  && catagory != 'date' && catagory != 'irr_List' && catagory != 'levered_irr_List'  && catagory != 'date' && catagory != 'irr_List' && catagory != 'levered_irr_List' &&catagory != 'noi' && catagory != 'dscr' && catagory != 'cap_rate'&& catagory != 'property_value' &&catagory != 'cash_flow' && catagory != 'free_clear_return' && catagory != 'mortgage_payments'&& catagory != 'cash_flow_after_financing' &&catagory != 'debt_yield' && catagory != 'gross_reversion_value' && catagory != 'reversion_selling_costs' && catagory != 'permanent_financing'&& catagory != 'financing_funding' &&catagory != 'financing_fees' && catagory != 'levered_cash_flow' && catagory != 'cash_on_cash_return') &&        <tr>
                            <td></td>
                        </tr>}
                        </>
                    )
                })}

                {    debt &&     <> <tr>
                          <td> interest_paid</td>
                          <td> total</td>
                          <td> total</td>
                          { date_list &&  date_list.map( (date,index) => {
                                    return(
                                        <>
                                        {dateType[date] && dateType[date].interest_paid &&<td> {dateType[date].interest_paid.toLocaleString()}</td>}
                                        {!dateType[date].interest_paid  &&<td> 0</td>}
                                        </>
                                    )
                                })}
                          </tr>
                          
                          <tr>
                          <td> principal_paid</td>
                          <td> total</td>
                          <td> total</td>
                          { date_list &&  date_list.map( (date,index) => {
                                    return(
                                        <>
                                        {dateType[date] && dateType[date].principal_paid &&<td> {dateType[date].principal_paid}</td>}
                                        {!dateType[date].principal_paid  &&<td> 0</td>}
                                        </>
                                    )
                                })}
                          </tr></>
}
                          <tr>
                          <td> combined total</td>
                          <td> Cash Flow</td>
                          <td> Cash Flow</td>
                          { date_list &&  date_list.map( (date,index) => {
                                    return(
                                        <>
                                        {dateType[date] && dateType[date].cash_flow &&<td> {dateType[date].cash_flow.toLocaleString()}</td>}
                                        {!dateType[date].cash_flow  &&<td> 0</td>}
                                        {/* {value2 && value2.total &&<td> {value2.interest_paid}</td>}
                                        {!value2.total  &&<td> 0</td>}
                                        {value2 && value2.total &&<td> {value2.principal_paid}</td>}
                                        {!value2.total  &&<td> 0</td>} */}
                                        </>
                                    )
                                })}
                          </tr>
<tr>
                          <td> combined total</td>
                          <td> NOI</td>
                          <td> NOI</td>
                          { date_list &&  date_list.map( (date,index) => {
                                    return(
                                        <>
                                        {dateType[date] && dateType[date].noi &&<td> {dateType[date].noi.toLocaleString()}</td>}
                                        {!dateType[date].noi  &&<td> 0</td>}
                                        {/* {value2 && value2.total &&<td> {value2.interest_paid}</td>}
                                        {!value2.total  &&<td> 0</td>}
                                        {value2 && value2.total &&<td> {value2.principal_paid}</td>}
                                        {!value2.total  &&<td> 0</td>} */}
                                        </>
                                    )
                                })}
                          </tr>
</tbody>

</Table>}              </>
    )
}
 
export default OperatingStatement;