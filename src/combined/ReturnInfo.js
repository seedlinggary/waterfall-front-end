

import React, { useState } from 'react'
import PnL from './PnL';
import ParentMortgage from '../mortgageCaluclator/ParentMortgage';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import FamilyTree from '../multiwaterfall/FamilyTree';
import PNLSetInfo from '../profitlosses/PNLSetInfo'
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';

const ReturnInfo = ({resp, respTotal, date}) => {


            return ( 
                <> 
 <Tabs
id="uncontrolled-tab-example"
className="mb-3"
>


{resp && Object.entries(resp).map( ([k, v],index) => {
    return (
      <Tab eventKey={k} title={k}>
        {/* <Tab eventKey="home" title="Home">
          HI
</Tab> */}
   <h3>{date} {k}</h3>
            { Object.entries(v).map( ([key, value],i) => {
              return (
        <div>
          <Table striped bordered hover>
    <thead>
    <tr>         
            <th colSpan={4}>{key}</th>           
          </tr>    

            <tr>
            
            <th>#</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Gross sqr footage</th>
            <th>Net sqr footage</th>
            <th>Unit amount</th>
            <th>Date</th>
          </tr>
          </thead>
          <tbody>
          {Object.entries(value['seperate_costs']).map( ([key2, value2],index) => {
              return (
                <tr>
                <td>{index + 1}</td>
                <td>{value2['name']}</td>
                <td>{value2['amount'].toLocaleString()}</td>
                <td>{value2['gross_sqr_footage'].toLocaleString()}</td>
                <td>{value2['net_sqr_footage'].toLocaleString()}</td>
                <td>{value2['unit_amount'].toLocaleString()}</td>
                <td>{value2['date']}</td>
              
              </tr>
            )
            })}
          
            <tr>
              <td>Total</td>
              <td>-</td>
              <td>{value['totals'].toLocaleString()}</td>
              <td>{value['gross_sqr_footage'].toLocaleString()}</td>
              <td>{value['net_sqr_footage'].toLocaleString()}</td>
              <td>{value['unit_amount'].toLocaleString()}</td>
            </tr>
           
          </tbody>
          </Table>
        </div>
       )
      } )}
                <h4>Totals</h4>
              <Table striped bordered hover>
    <thead>
            <tr>

            <th>#</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Gross sqr footage</th>
            <th>Net sqr footage</th>
            <th>Unit amount</th>
                            </tr>
          </thead>
          <tbody>
    {respTotal && respTotal[k]['communal_totals'] &&Object.entries(respTotal[k]['communal_totals']).map( ([key3, value3],index) => {
              return (
                <tr>
                <td>{index + 1}</td>
                <td>{key3}</td>
                <td>{value3['totals'].toLocaleString()}</td>
                <td>{value3['gross_sqr_footage'].toLocaleString()}</td>
                <td>{value3['net_sqr_footage'].toLocaleString()}</td>
                <td>{value3['unit_amount'].toLocaleString()}</td>
              
              </tr>
            )
            })}
          
          <tr>
              <td>Total</td>
              <td>-</td>
              <td>{respTotal[k]['totals'].toLocaleString()}</td>
              <td>{respTotal[k]['gross_sqr_footage'].toLocaleString()}</td>
              <td>{respTotal[k]['net_sqr_footage'].toLocaleString()}</td>
              <td>{respTotal[k]['unit_amount'].toLocaleString()}</td>

            </tr>
           
          </tbody>
          </Table>
          <hr></hr>

   </Tab>
  )
  })}

</Tabs>
              </>
    )
}
 
export default ReturnInfo;
