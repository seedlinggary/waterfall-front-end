import React, { useState,useEffect } from 'react'
import Table from 'react-bootstrap/Table'
// import Investor from './Investor';
import Form from 'react-bootstrap/Form';

const ComparedLayout = ({all_properties,generalType,dateTypeInfo,billName, bAttributes, newInfo, property_variables}) => {
    const [catagoriesName, setCatagoreisName] = useState()
    const [numb, setnumb] = useState(0)



    function GetCatagories(all_properties,generalType,dateTypeInfo) {
        let catgories_name = {}
        if (all_properties){
            Object.entries(all_properties).map( ([property, info1],index) => {
 {    info1[generalType] && info1[generalType][dateTypeInfo] &&           Object.entries(info1[generalType][dateTypeInfo]).map( ([catagories, info],index) => {
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
                
                
            })}
        })
            setCatagoreisName(catgories_name)
              }
      }
    
      useEffect(() => {
        if (all_properties){
            GetCatagories(all_properties,generalType,dateTypeInfo)
            // console.log(catagoriesName)
            // setMortgages(new_mortgages)
            // edit_times(returned_pandl)
        }
    }, [all_properties,generalType,dateTypeInfo]);
    // useEffect(() => {
    //         if (numb == 0){

    //             property_variables.push({'pinfo':{'name': 'original'}})
    //             setnumb(1)
    //         }
    
        
    // }, [property_variables]);

            return ( 
                <> 
        {all_properties && Object.entries(all_properties).map( ([name, dateType],index) => {
                    return(
                        <>
                        <br></br>
                        <h3>{name}</h3>
                        <Table striped bordered hover responsive>

<thead>
    <tr>
    <th>#</th>
    <th>Catagories</th>
    {  (bAttributes || billName)&&  <th>Name</th>}
    {  ( billName)&&  <th> other Name</th>}
    {dateType && dateType[generalType] && dateType[generalType][dateTypeInfo] && (dateType['date_order'][generalType][dateTypeInfo]).map( (dates,index) => {

        // {dateType && dateType[generalType] && dateType[generalType][dateTypeInfo] && Object.entries(dateType[generalType][dateTypeInfo]).map( ([dates, value2],index) => {
            return(
                <>
                <th> {  dates }</th>
                </>
            )
        })}

    </tr>
</thead>
<tbody>
        {newInfo && <tr><th colSpan={3}>General Info</th></tr> }
{  newInfo &&<tr>
    {<td>1</td>}
{ newInfo && <td>{newInfo}</td>}
{  (bAttributes || billName)&&  <th>-</th>}
{  (billName)&&  <th> - </th>}

{dateType && dateType[generalType] && dateType[generalType][dateTypeInfo] && newInfo && dateType['date_order'][generalType][dateTypeInfo].map( (dates,index) => {
            return(
                <>
                {/* <td>{index + 1}</td>
                <td>{newInfo}</td> */}
                {/* <td>{dateType[generalType][dateTypeInfo][dates][newInfo]}</td> */}
                {(dateType[generalType][dateTypeInfo][dates][newInfo] &&<td>  {dateType[generalType][dateTypeInfo][dates][newInfo].toLocaleString()}</td>) || ( <td> 0</td>)}

                </>
            )
        })}


 </tr>
}
<br></br>

{  bAttributes &&
<>
{<tr><th colSpan={3}>Catagory Info</th></tr> }
{catagoriesName && Object.entries(catagoriesName).map( ([catagory, value2],index) => {

return(
    <>
    
    
    {(catagory != 'date' && catagory != 'irr_List' && catagory != 'levered_irr_List')&& catagory == bAttributes && value2.map((name,i) => {
        return(
            <>
      {      <tr>
            <td> {i}</td>
            <td> {catagory}</td>
            <td> {name}</td>
            {  (billName)&&  <th> - </th>}

            { dateType['date_order'][generalType][dateTypeInfo].map( (dates,index) => {
            return(
                <>
                {(dateType[generalType][dateTypeInfo][dates] && dateType[generalType][dateTypeInfo][dates][`${catagory}`] && dateType[generalType][dateTypeInfo][dates][`${catagory}`][`${name}`] &&dateType[generalType][dateTypeInfo][dates][`${catagory}`][`${name}`]['original'] &&<td> {dateType[generalType][dateTypeInfo][dates][`${catagory}`][`${name}`]['original'].toLocaleString()}</td>) || <td>0</td>}
                {(dateType[generalType][dateTypeInfo][dates] && dateType[generalType][dateTypeInfo][dates][`${catagory}`] && dateType[generalType][dateTypeInfo][dates][`${catagory}`][`${name}`] && !isNaN(dateType[generalType][dateTypeInfo][dates][`${catagory}`][`${name}`]) &&<td> {dateType[generalType][dateTypeInfo][dates][`${catagory}`][`${name}`].toLocaleString()}</td>) }
                {/* {!value2[`${catagory}`] || !value2[`${catagory}`][`${name}`] || <td> 0</td>} */}
                </>
            )
        })}
        
</tr> }
    </>
        )
      })}

    </>
)
})}
 </>
}
<br></br>
{  billName &&
<>
{<tr><th colSpan={3}>Bill Info</th></tr> }

{catagoriesName && Object.entries(catagoriesName).map( ([catagory, value2],index) => {

return(
    <>
    
    {(catagory != 'date' && catagory != 'irr_List' && catagory != 'levered_irr_List') && value2.map((name,i) => {
        return(
            <>
      {  name== billName &&  

<>
{ property_variables.map( (prop_info,index) => {
            return(
                <>
        <tr>
            <td> {i}</td>
            <td> {catagory}</td>
            <td> {name}</td>
                 <td> {prop_info.pinfo.name}</td>
                 { dateType['date_order'][generalType][dateTypeInfo].map( (dates,index) => {
                    return(
                        <>
                {(dateType[generalType][dateTypeInfo][dates] && dateType[generalType][dateTypeInfo][dates][`${catagory}`] && dateType[generalType][dateTypeInfo][dates][`${catagory}`][`${name}`] &&dateType[generalType][dateTypeInfo][dates][`${catagory}`][`${name}`][prop_info.pinfo.name] &&<td> {dateType[generalType][dateTypeInfo][dates][`${catagory}`][`${name}`][prop_info.pinfo.name].toLocaleString()}</td>)|| <td>0</td>}

                </>
            )
        })}

</tr> 
</>
            )
        })}
                
        <tr>
            <td> {i}</td>
            <td> {catagory}</td>
            <td> {name}</td>
                 <td> Original</td>
                 { dateType['date_order'][generalType][dateTypeInfo].map( (dates,index) => {
                    return(
                        <>
                {(dateType[generalType][dateTypeInfo][dates] && dateType[generalType][dateTypeInfo][dates][`${catagory}`] && dateType[generalType][dateTypeInfo][dates][`${catagory}`][`${name}`] &&dateType[generalType][dateTypeInfo][dates][`${catagory}`][`${name}`]['original'] &&<td> {dateType[generalType][dateTypeInfo][dates][`${catagory}`][`${name}`]['original'].toLocaleString()}</td>)|| <td>0</td>}

                </>
            )
        })}

</tr> 


</>


}
    </>
        )
      })}

    </>
)
})}
 </>
}
</tbody>

</Table>
                        </>
                    )
                })}

        </>
    )
}
 
export default ComparedLayout;