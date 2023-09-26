import React, { useState,useEffect } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {reactLocalStorage} from 'reactjs-localstorage';
import { useNavigate, useLocation , Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Spinner from 'react-bootstrap/Spinner';
import apiRequest from '../../ApiRequest'
import Button from 'react-bootstrap/Button';
import ReturnInvestors from './ReturnInvestors';

const InvestorReturnsHome = () => {
  const location = useLocation()

  const company = location.state.company
  const deal = location.state.deal
  const diligence_id = location.state.diligence_id
  const returned_mortgages = location.state.returned_mortgages
  const diligence = location.state.diligence
  const treeBackend = location.state.tree
  const pidBackend = location.state.Pid
  const treeDetails = location.state.treeDetails
  const [myPropertyVariables] = useState(diligence.attributes)

  const [investmentDetails, setInvestmentDetails] = useState()
  const [pId, setParentId] = useState(12212);
  const [tree, setTree] = useState({ [12212]: { id: 12212, children: [] } });
  const [waterfall, setWaterfall] = useState({});
  const [lp, setLP] = useState({});
  const [gp, setGP] = useState({});
  const [payoutFrequency, setPayoutFrequency] = useState({ 'start_date' : 1,
  'payout_type': 'Year',
  'payout_frequency': 'year',
  'mulitplicationAmount' : .02,
  'startingAmount' : 2000,
  'transactions': [],
      })

  let cookie = reactLocalStorage.get('cookie')
  const requestOptions = {
      method: 'GET',
      headers: { 
      'x-access-token': cookie},
  };
  const unformatTree = (tree) => {
    const flatTree = {};
   
    const addPerson = (person, parentId = null) => {
      const { id, name, waterfall, lp, gp, children } = person;
      flatTree[id] = { id, name, waterfall, lp, gp, children: [] };
     
      if (parentId) {
        flatTree[parentId].children.push(id);
      }
     
      if (children) {
        children.forEach((child) => addPerson(child, id));
      }
    };
   
    addPerson(tree);
    
    let newLP = {}
    let newGP = {}
    let newWaterfall = {}
    Object.entries(flatTree).map( ([key2, value2],index) => {
    if (value2['gp']){
      let new_date =new Date(value2['gp']['date_funds_recieved'])
      value2['gp']['date_funds_recieved'] = new_date
      newGP[key2]= value2['gp']
    }else if (value2['lp']){
      let new_date =new Date(value2['lp']['date_funds_recieved'])
      value2['lp']['date_funds_recieved'] = new_date
      newLP[key2]= value2['lp']
    }else if (value2['waterfall']){
      let new_date =new Date(value2['waterfall']['date_funds_recieved'])
      value2['waterfall']['date_funds_recieved'] = new_date

      newWaterfall[key2]= value2['waterfall']
    }
    })
    setGP(newGP)
    setLP(newLP)
    setWaterfall(newWaterfall)
    setTree(flatTree)
    console.log(flatTree)
    return flatTree;
  };
  const SendApi = async (e) => {
    // setGraphTree(formatTree(tree,pId))
    //   e.preventDefault();
      let info = treeBackend 
      console.log(info)
      let a = await apiRequest('POST',info,`/distribution/results/${company.id}/${deal.id}/${diligence_id}`)
    //   navigate(0)
    } 
  useEffect(() => {
    if (treeBackend){
      handleDateType('year_to_date')
        // setMortgages(new_mortgages)
        // edit_times(returned_info)
        unformatTree(treeBackend)
        setParentId(pidBackend)
    }
}, [treeBackend]);
function handleDateType(data) {
    if (treeDetails){
        setInvestmentDetails(treeDetails[`${data}`])
          }
  }
            return ( 
                <> 
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

<div className="p-2"><h1>Advanced Metrics </h1></div>
      <div className="p-2 ms-auto">
      <Form.Group as={Col} >
      {/* <Button onClick={() => {
                SendApi()
    }}>Send Info </Button> */}
      <Form.Select aria-label="Default select example"   onChange={(e) => handleDateType(e.target.value)}>
            <option value="year_to_date">Year to date</option>
            <option value="month">Month</option>
            <option value="quarter">Quarter</option>
            <option value="year">Year </option>
        </Form.Select>
        </Form.Group>
      </div>
      <div className="p-2"></div>

    </Stack>

<br></br>
<ReturnInvestors pId={pId} setParentId={setParentId} tree={tree} setTree={setTree} waterfall={waterfall} setWaterfall={setWaterfall} lp={lp} setLP={setLP} gp={gp} setGP={setGP}payoutFrequency={payoutFrequency} setPayoutFrequency={setPayoutFrequency} investmentDetails={investmentDetails}></ReturnInvestors>
              </>
    )
}
 
export default InvestorReturnsHome;