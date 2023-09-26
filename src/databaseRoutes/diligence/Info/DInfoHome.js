import React, { useState,useEffect } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {reactLocalStorage} from 'reactjs-localstorage';
import useFetch from '../../../useFetch';
import { useNavigate, useLocation , Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import OperatingStatement from './OperatingStatement';
import MortgageBills from '../../mortgage/MortgageBills';
import IRRInfo from './IRRInfo';
import IRRMatrix from './IRRMatrix';
import Pervariable from './PerVariable';
import Spinner from 'react-bootstrap/Spinner';
import apiRequest from '../../../ApiRequest'
import Button from 'react-bootstrap/Button';

const DInfoHome = () => {
  const location = useLocation()

  const company = location.state.company
  const deal = location.state.deal
  const diligence_id = location.state.diligence_id
  const returned_mortgages = location.state.returned_mortgages
  const diligence = location.state.diligence
  const [myPropertyVariables] = useState(diligence.attributes)

  const [InvestorReturns, setInvestorReturns] = useState(null)
  const [pnlDateType, setPNLDateType] = useState()
  const [mortgageDateType, setMortgageDateType] = useState()
  const [historicalDateType, setHistoricalDateType] = useState()
  const [capRate, setCapRate] = useState()
  const [pnldateList, setPnlDateList] = useState()
  const [historicaldateList, setHistoricalDateList] = useState()
  const [mortgagedateList, setMortgageDateList] = useState()
  const [irr_info, setIrrInfo] = useState(['cap_rate','property_value','cash_flow','closing_costs', 'selling_total', 'mortgage_payments', 'levered_total','financing_funding','financing_fees','mortgage_paid_back','permanent_financing'])
  const [cf_info, setCFInfo] = useState(['cap_rate','property_value','noi','cash_flow','free_clear_return', 'mortgage_payments', 'cash_flow_after_financing', 'dscr','debt_yield','gross_reversion_value','reversion_selling_costs','permanent_financing','financing_funding','financing_fees','levered_cash_flow','cash_on_cash_return'])
  // let irr_info = ['cap_rate','property_value','total','closing_costs', 'selling_total', 'mortgage_payments', 'levered_total','mortgage_orginal_total','mortgage_paid_back','permanent_financing']
  // let cf_info = ['cap_rate','property_value','total','closing_costs', 'selling_total', 'mortgage_payments', 'levered_total','mortgage_orginal_total','mortgage_paid_back','permanent_financing']
  let cookie = reactLocalStorage.get('cookie')
  const requestOptions = {
      method: 'GET',
      headers: { 
      'x-access-token': cookie},
  };
  function handleDateType(data) {
    if (returned_info){
      setPNLDateType(returned_info['pnl_info'][`${data}`])
      setMortgageDateType(returned_info['mortgage_info'][`${data}`])
      setHistoricalDateType(returned_info['historical_info'][`${data}`])
      setCapRate(returned_info['cap_rate'])
      setPnlDateList(returned_info['date_order']['pnl_info'][`${data}`])
      setHistoricalDateList(returned_info['date_order']['historical_info'][`${data}`])
      setMortgageDateList(returned_info['date_order']['mortgage_info'][`${data}`])
          }
  }
  const { data: returned_info, e, isP} = useFetch(`/diligence/organized_bill/${company.id}/${deal.id}/${diligence_id}` , requestOptions)
  const SendApi = async (e) => {
    // setGraphTree(formatTree(tree,pId))
    //   e.preventDefault();
      let info = returned_info 
      console.log(info)
      let a = await apiRequest('POST',info,`/distribution/results/${company.id}/${deal.id}/${diligence_id}`)
      setInvestorReturns(a)
    //   navigate(0)
    } 
    useEffect(() => {
      if (returned_info){
        handleDateType('year_to_date')
        SendApi()
          // setMortgages(new_mortgages)
          // edit_times(returned_info)
          
      }
  }, [returned_info]);  
     useEffect(() => {
    
      SendApi()
        // setMortgages(new_mortgages)
        // edit_times(returned_info)
        
    
}, []); 

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
<div className="p-2"><h1>{!InvestorReturns && <Spinner animation="border" variant="primary" />}{InvestorReturns && <Link to={`/investorReturnsHome/`} state={{'company': company, 'deal':deal, 'diligence_id':diligence_id, 'returned_mortgages':returned_mortgages, 'diligence':diligence, 'tree':InvestorReturns['distribution_tree'], 'Pid':InvestorReturns['parent_id'], 'treeDetails':InvestorReturns['distribution_results']}}>
 
 <h5> Advance Metrics</h5>
 </Link>} </h1></div>
      <div className="p-2 ms-auto">
      <Form.Group as={Col} >
      <Button onClick={() => {
                SendApi()
    }}>Send Info </Button>
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
<Tabs
      defaultActiveKey="OpStat"
      id="uncontrolled-tab-example"
      transition={false}
      className="mb-3"
    >
      <Tab eventKey="OpStat" title="Operating Statement">
      
        <OperatingStatement dateType={pnlDateType} debt={false} date_list={pnldateList}/>

      </Tab>
      <Tab eventKey="Debt" title="Debt Info">
<hr></hr>
<OperatingStatement dateType={mortgageDateType} debt={true} date_list={mortgagedateList}/>
<MortgageBills returned_mortgages={returned_mortgages} />


        </Tab>
        <Tab eventKey="IrrMatrix" title="IRR Matrix" >
        <hr></hr>
        <IRRInfo dateType={pnlDateType} capRate={capRate} info_to_set={irr_info} date_list={pnldateList}/>
        <IRRMatrix dateType={pnlDateType} date_list={pnldateList} />
      </Tab>
      <Tab eventKey="HistoricalOS" title="Historical Operating Statement" >
        <hr></hr>
        <OperatingStatement dateType={historicalDateType} debt={false}  date_list={historicaldateList}/>
      </Tab>
      <Tab eventKey="PropertyCF" title="Property CF" >
        <hr></hr>
        <IRRInfo dateType={pnlDateType} capRate={capRate} info_to_set={cf_info} date_list={pnldateList}/>
              </Tab>
              <Tab eventKey="PerVariable" title="Per Variable" >
        <hr></hr>
        <Pervariable dateType={pnlDateType} attributes={myPropertyVariables} date_list={pnldateList}/>
              </Tab>
    </Tabs>
    {!returned_info && <Spinner animation="border" variant="primary" />}

              </>
    )
}
 
export default DInfoHome;