import React, { useState,useEffect } from 'react'
import apiRequest from '../../../ApiRequest'
import Table from 'react-bootstrap/Table'
// import Investor from './Investor';
import Form from 'react-bootstrap/Form';

const IRRInfo = ({dateType,capRate,info_to_set, date_list}) => {
    const [catagoriesName, setCatagoreisName] = useState()
    const [infoPerTime, setInfoPerYear] = useState(info_to_set)

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
                    catgories_name[`${names}`].pop()
                    
                })}
                delete catgories_name['total']  
                
                
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
            <th>Bills</th>
                { date_list &&  date_list.map( (dates,index) => {
                    return(
                        <>
                        <th> {  dates }</th>
                        </>
                    )
                })}

            </tr>
        </thead>
        <tbody>
            {/* <tr>
            <td></td>
            <td>Cap Rate</td>
            <td>{capRate * 100}</td>
            </tr> */}
        {infoPerTime && infoPerTime.map( (info,index) => {
                    return(
                        <>

                            <tr>
                            <td> {index}</td>
                            <td> {info}</td>
                                    { date_list &&  date_list.map( (dates,index) => {
                    return(
                        <>
                        {/* <td> {  dateType[dates][`${info}`] }</td> */}
                        {(dateType[dates] && dateType[dates][`${info}`] &&<td> { dateType[dates][`${info}`].toLocaleString()}</td>) || ( <td> 0</td>)}

                        </>
                    )
                })}

         
                            <td></td>
                          </tr>
                        </>
                    )
                })}


</tbody>

</Table>}              </>
    )
}
 
export default IRRInfo;