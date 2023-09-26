import React, { useState,useEffect } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {reactLocalStorage} from 'reactjs-localstorage';
import useFetch from '../../useFetch';
import { useNavigate, useLocation , Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import ComparedLayout from './ComparedLayout';


const CompareDiligence = () => {
  const location = useLocation()

  const company = location.state.company
  const deal = location.state.deal
  const all_properties = location.state.all_properties
  const returned_mortgages = location.state.returned_mortgages
  const diligence = location.state.diligence
  const property_variables = location.state.property_variables
//   const [myPropertyVariables] = useState(diligence.attributes)
  const [generalType, setGeneralType] = useState('pnl_info')
  const [dateType, setDateType] = useState('year_to_date')
  const [propertyVariables, setPropertyVariables] = useState('one')
//   const [propertyVariables, setPropertyVariables] = useState(diligence.attributes[0].pinfo.name)
  
const [newInfo, setNewInfo] = useState()
const [bAttributes, setBAttributes] = useState()
const [billName, setBillName] = useState()
const [info_list, setNewInfoList] = useState()
const [bAttributesList, setBAttributesList] = useState()
const [billNameList, setBillNameList] = useState()

const [capRate, setCapRate] = useState()
  const [irr_info, setIrrInfo] = useState(['cap_rate','property_value','total','closing_costs', 'selling_total', 'mortgage_payments', 'levered_total','mortgage_orginal_total','mortgage_paid_back','permanent_financing'])
  const [cf_info, setCFInfo] = useState(['cap_rate','property_value','noi','cash_flow','free_clear_return', 'mortgage_payments', 'cash_flow_after_financing', 'dscr','debt_yield','cash_on_cash_return'])
  let cookie = reactLocalStorage.get('cookie')
  const requestOptions = {
      method: 'GET',
      headers: { 
      'x-access-token': cookie},
  };
  function handleInfoSelect() {
    let new_info_list = [null]
    let new_battributes = [null]
    let new_bill_name = [null]
    Object.entries(all_properties).map( ([property_name, property],index) => {
        Object.entries(property[generalType]['year']).map( ([dt_tpye, dte],index) => {
            Object.entries(dte).map( ([general_info_name, general_info],index) => {
                if (!isNaN(general_info) ){
                    if (!new_info_list.includes(general_info_name)){

                        new_info_list.push(general_info_name)
                    }
                    // new_battributes.push(b_type)
                }else if (general_info_name instanceof Array){

                }else{
                    if (!new_battributes.includes(general_info_name) ){
                        new_battributes.push(general_info_name)
                    }
                    Object.entries(general_info).map( ([b_type, b_info],index) => {
                        if (!isNaN(b_info) ){
                            // console.log(b_type,b_info)
                            if (!new_battributes.includes(b_type)){
                                // console.log(btype)
                                // new_battributes.push(b_type)
                            }
                            // new_battributes.push(b_type)
                        }else{

                            // Object.entries(b_info).map( ([name_type, name_info],index) => {
                               
        
                                    
                                if (!new_bill_name.includes(b_type) && isNaN(b_type) ){
        
                                    new_bill_name.push(b_type)
                                }
                            
                            // })
                            
                            }



                            })

                   
        
                }
            })
        // }
        })
        })
        setNewInfoList(new_info_list)
        setBAttributesList(new_battributes)
        setBillNameList(new_bill_name)
        if (info_list){
            setNewInfo(info_list[0])
        }else{
            setNewInfo(null)
        }
        if (bAttributesList){
            setBAttributes(bAttributesList[0])
        }else{
            setBAttributes(null)
        }
        if (billNameList){
            setBillName(billNameList[0])
        }else{
            setBillName(null)
        }
  }
//   const { data: returned_info, e, isP} = useFetch(`/diligence/organized_bill/${company.id}/${deal.id}/${diligence_id}` , requestOptions)
  useEffect(() => {
    if (all_properties){

        handleInfoSelect()
    }
}, [all_properties,generalType,dateType]);

            return ( 
                <>
{       all_properties &&             <> 
    {/* <h1>Advanced Metrics </h1> */}
    <Stack direction="horizontal" gap={3}>
    <div className="p-2"></div>
    <div className="p-2"></div>
    <div className="p-2"></div>
    <div className="p-2"></div>
    <div className="p-2"></div>
    <div className="p-2"></div>
    <div className="p-2"></div>
    <div className="p-2"></div>
    <div className="p-2"></div>
    <div className="p-2"></div>
    <div className="p-2"></div>
    <div className="p-2"></div>

    <div className="p-2"><h1>Comparing Advanced Metrics </h1></div>
        <div className="p-2 ms-auto">
        <Form.Group as={Col} >
        
        <Form.Select aria-label="Default select example"   onChange={(e) => setGeneralType(e.target.value)}>
                <option value="pnl_info">PNL info </option>
                <option value="mortgage_info">Mortgage info</option>
                <option value="historical_info">Historical Info</option>
            </Form.Select>
            </Form.Group>

            <Form.Group as={Col} >
        
        <Form.Select aria-label="Default select example"   onChange={(e) => setDateType(e.target.value)}>
                <option value="year_to_date">Year to date</option>
                <option value="month">Month</option>
                <option value="quarter">Quarter</option>
                <option value="year">Year </option>
            </Form.Select>
            </Form.Group>
            <Form.Group as={Col} >
        
        <Form.Select aria-label="Default select example"   onChange={(e) => setNewInfo(e.target.value)}>
        <option value={newInfo}>{newInfo}</option>

        {info_list && info_list.map((info, i) => {
                        return (
                            
                            <option value={info}>{info} </option>
                        )
        })} 
                {/* <option value="year">Year </option>
                <option value="month">Month</option>
                <option value="quarter">Quarter</option>
                <option value="year_to_date">Year to date</option> */}
            </Form.Select>
            </Form.Group>
            <Form.Group as={Col} >
        
        <Form.Select aria-label="Default select example"   onChange={(e) => setBAttributes(e.target.value)}>
        <option value={bAttributes}>{bAttributes}</option>

        {bAttributesList && bAttributesList.map((battribute, i) => {
                        return (
                            
                            <option value={battribute}>{battribute} </option>
                        )
        })}     
            </Form.Select>
            </Form.Group>
            <Form.Group as={Col} >
        
        <Form.Select aria-label="Default select example"   onChange={(e) => setBillName(e.target.value)}>
        <option value={billName}>{billName}</option>

        {billNameList && billNameList.map((name, i) => {
                        return (
                            
                            <option value={name}>{name} </option>
                        )
        })}     
            </Form.Select>
            </Form.Group>
        </div>
        <div className="p-2"></div>

        </Stack>

        <ComparedLayout  all_properties={all_properties} generalType={generalType} dateTypeInfo={dateType} billName={billName} bAttributes={bAttributes} newInfo={newInfo} property_variables={property_variables}/>
            
                </>}
                </>
    )
}
 
export default CompareDiligence;