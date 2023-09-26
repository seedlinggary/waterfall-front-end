

import React, { useState,useEffect } from 'react'
import apiRequest from '../../ApiRequest'
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {reactLocalStorage} from 'reactjs-localstorage';
import { useNavigate } from "react-router-dom";
import useFetch from '../../useFetch';
import DatePicker from 'react-datepicker';

let base64 = require('base-64');

const EditDiligence = ({deal,company,diligence}) => {
    const [investmentLength, setInvestmentLength] = useState(diligence.length_of_investment)
    const [numUnits, setNumUnits] = useState(diligence.number_of_units)
    const [gsf, setGSF] = useState(diligence.gsf)
    const [nsf, setNSF] = useState(diligence.nsf)
    const [reversion_closing_costs, setReversionClosingCosts] = useState(diligence.reversion_closing_costs)
    const [occupancyRate, setOccupancyRate] = useState(diligence.occupancy_rate)
    const [myPropertyVariables, setMyPropertyVariables] = useState(diligence.attributes)
    // const [myPropertyVariables, setMyPropertyVariables] = useState(propertyVariables.map((propertyVariable, i) =>  ({'name': propertyVariable.pinfo.name, 'amount': 500, 'id':propertyVariable.id})))
    const [dealStartDate, setStartDate] = useState(create_proper_time(diligence.deal_start_date))
    const [capRates, setCapRates] = useState(diligence.caprates)
  // console.log(dealStartDate)
    
  function create_proper_time(bad_time){
    const good_array = bad_time.split('-').join(',').split('T').join(',').split(':').join(',').split(',');
    // console.log(good_array)
    return new Date(Date.UTC(good_array[0],good_array[1] -1,good_array[2],good_array[3],good_array[4],good_array[5]))
  }

    const navigate = useNavigate()
  
    // function InitialPropertyVariables() {
    //   let newPropertyVariables = propertyVariables.map((propertyVariable, i) =>  ({'name': propertyVariable.name, 'amount': 500}))
        
    //     return newPropertyVariables

    // }
    function handlePropertyVariableChange(data, mortgageInfoType, i) {
      let keyvalue = mortgageInfoType.toString()
      setMyPropertyVariables(s => {
          const newExpenses = s.slice();
          newExpenses[i][`${keyvalue}`] = data;
    
          return newExpenses;
        });

    }
    function handleCapRateChange(data, i) {
      setCapRates(s => {
          const newCapRates = s.slice();
          newCapRates[i] = data;
    
          return newCapRates;
        });

    }
    function GetCapRateAmount(investmentLength) {
      let new_num = (investmentLength)%12
      let num = Math.floor(Number(investmentLength)/12) + 1
      if (new_num){
        num+=1
      }
      setCapRates([...Array(num).keys()])

    }

    const SendApi = async (e) => {
    //   e.preventDefault();
      let info = {"length_of_investment": investmentLength,
      'number_of_units': numUnits,
      'gsf': gsf,
      'nsf':nsf,
      'occupancy_rate':occupancyRate,
      'deal_start_date': dealStartDate.toUTCString(),
      'cap_rates': capRates,
      'reversion_closing_costs': reversion_closing_costs,
      'myPropertyVariables':  myPropertyVariables
                  
                 }
      // let new_date = new Date(dealStartDate.toUTCString())
      // console.log(new_date.toUTCString())
      let a = await apiRequest('POST',info,`/diligence/${company.id}/${deal.id}/${diligence.id}`)
      navigate(0)
    } 
      
    let cookie = reactLocalStorage.get('cookie')
    const requestOptions = {
        method: 'GET',
        headers: { 
        'x-access-token': cookie},
    };

    // const { data: ptypes, error, isPending} = useFetch(`/ptype/` , requestOptions)
    useEffect(() => {
      let new_num = (investmentLength)%12
      let num = Math.floor(Number(investmentLength)/12) + 1
      if (new_num){
        num+=1
      }
      let new_array =([...Array(num).keys()])

      if (investmentLength && (capRates.length == 0 || diligence.caprates.length != new_array.length )){
        GetCapRateAmount(investmentLength)
      }
  }, [,investmentLength]);
  useEffect(() => {
    if (dealStartDate){

    }


}, [dealStartDate]);

    return ( 
        <div className="blog-list">

<Row className="mb-3">

<Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Prospective Purchase Date</Form.Label>
             <DatePicker selected={dealStartDate}  onChange={(e) =>{
              
              
              setStartDate(e)
              }}  />
          </Form.Group> 
       
{/* <Form.Group as={Col} controlId="formGridEmail">
<Form.Label>Occupancy Rate</Form.Label>
<Form.Control  value={occupancyRate} onChange={(e) => setOccupancyRate(e.target.value)}/>
</Form.Group> */}
<Form.Group as={Col} controlId="formGridEmail">
<Form.Label>Length Of Investment In Months</Form.Label>
<Form.Control type="number" value={investmentLength} onChange={(e) => setInvestmentLength(e.target.value)}/>
</Form.Group>
<Form.Group as={Col} controlId="formGridEmail">
<Form.Label>Reversion Closing Costs</Form.Label>
<Form.Control type="number" value={reversion_closing_costs} onChange={(e) => setReversionClosingCosts(e.target.value)}/>
</Form.Group>
</Row>

<Row className="mb-3">
{myPropertyVariables && myPropertyVariables.map((propertyvariable, i) => {
                    return (
                        
        <>
                  {/* <Row className="mb-3"> */}
  

          <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>{propertyvariable.pinfo.name}</Form.Label>
        <Form.Control type="number" value={propertyvariable.amount} onChange={(e) => handlePropertyVariableChange(e.target.value,'amount',i)} />


          </Form.Group>         
      </>
                    )
                    })}
                       </Row>
  <Row className="mb-3">
{investmentLength && capRates.map((cap_rate, i) => {
                    return (
                        
        < >
                  {/* <Row className="mb-3"> */}
  

          <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Cap Rate year {i}</Form.Label>
        <Form.Control type="number" value={cap_rate.percentage} onChange={(e) => handleCapRateChange(e.target.value,i)} />


          </Form.Group>         
      </>
                    )
                    })}
                       </Row>
<Button variant="primary" onClick={SendApi}>
        Submit
      </Button>
   </div>   
     );
}
 
export default EditDiligence;