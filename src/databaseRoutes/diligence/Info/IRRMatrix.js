import React, { useState,useEffect } from 'react'
import apiRequest from '../../../ApiRequest'
import Table from 'react-bootstrap/Table'
// import Investor from './Investor';
import Form from 'react-bootstrap/Form';

const IRRMatrix = ({dateType, date_list}) => {
    const [catagoriesName, setCatagoreisName] = useState()
    const [infoPerTime, setInfoPerYear] = useState(['property_value','total','closing_costs', 'selling_total'])


            return ( 
                <> 
{dateType && <Table striped bordered hover responsive>

<thead>
    <tr>
    <th>#</th>
    <th>Dates</th>
    <th>IRR Unlevered</th>
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
{ date_list &&  date_list.map( (dates,index) => {
                return(
                <>

                    <tr>
                    <td> {index}</td>
                    <td> {dates}</td>
                    {/* <td> {dateType[dates]['irr']}</td> */}
                    {(dateType[dates]['irr'] &&<td> % {(dateType[dates]['irr'] * 100).toLocaleString()}</td>) || ( <td> 0</td>)}

                    {dateType[dates]['irr_List'] && dateType[dates]['irr_List'].map( (info,index) => {
            return(
                <>
                {/* <td> {  info.toLocal }</td> */}
                {(info &&<td> {info.toLocaleString()}</td>) || ( <td> 0</td>)}

                </>
            )
        })}

 
                    <td></td>
                  </tr>
                </>
            )
        })}


</tbody>

</Table>}   {dateType && <Table striped  bordered hover responsive>

<thead>
    <tr>
    <th>#</th>
    <th>Dates</th>
    <th>IRR Levered</th>
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
{ date_list &&  date_list.map( (dates,index) => {
                return(
                <>

                    <tr>
                    <td> {index}</td>
                    <td> {dates}</td>
                    {(dateType[dates]['levered_irr'] &&<td> % {(dateType[dates]['levered_irr'] * 100).toLocaleString()}</td>) || ( <td> 0</td>)}

                    {/* <td> {dateType[dates]['levered_irr']}</td> */}
                    {dateType[dates]['levered_irr_List'] && dateType[dates]['levered_irr_List'].map( (info,index) => {
            return(
                <>
                {(info &&<td> {info.toLocaleString()}</td>) || ( <td> 0</td>)}
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
 
export default IRRMatrix;