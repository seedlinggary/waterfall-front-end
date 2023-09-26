

import React, { useState } from 'react'

import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';

const Pervariable = ({ dateType, attributes, date_list}) => {


            return ( 
                <> 
 <Tabs
id="uncontrolled-tab-example"
className="mb-3"
>


{dateType && date_list &&  date_list.map( (date,index) => {
    return (
      <Tab eventKey={date} title={date}>
        {/* <Tab eventKey="home" title="Home">
          HI
</Tab> */}
   <h3>{date}</h3>
            {typeof dateType[date] === 'object'  && Object.entries(dateType[date]).map( ([battribute_name, battribute_totals],i) => {
                
              return (
        <div>
            { isNaN(battribute_name) && typeof battribute_totals === 'object' && !Array.isArray(battribute_totals) &&
          <Table striped bordered hover>
    <thead>
    <tr>         
            {/* <th colSpan={4}>{i}</th>            */}
          </tr>    

            <tr>
            
            <th>#</th>
            <th>Name</th>
            <th>Amount</th>
            {attributes && attributes.map( (attribute,i) => {
                    return(
                    <th>{attribute.pinfo.name}</th>
                    )
            })}
          </tr>
          </thead>
          <tbody>
          {battribute_totals && typeof battribute_totals === 'object' &&Object.entries(battribute_totals).map( ([name, info],index) => {
              return (
                <tr>
                    {/* {console.log(name)}
                    {console.log(info)} */}
                <td>{index + 1}</td>
                <td>{name}</td>
              {(info['original'] &&<td>  {info['original'].toLocaleString()}</td>) || ( <td> 0</td>)}
                {attributes && attributes.map( (attribute,i) => {
                    return(
                    // <th>{info[attribute.pinfo.name]}</th>
                    <>
                    {(info[attribute.pinfo.name] &&<td>  {info[attribute.pinfo.name].toLocaleString()}</td>) || ( <td> 0</td>)}
                    </>
                    )
            })}
              </tr>
            )
            })}
                  
          
          </tbody>
          </Table>
            }
        </div>
       )
      } )}


   </Tab>
  )
  })}

</Tabs>
              </>
    )
}
 
export default Pervariable;
