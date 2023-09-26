import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import apiRequest from '../../ApiRequest'
import { useNavigate } from "react-router-dom";
import useFetch from '../../useFetch';
import {reactLocalStorage} from 'reactjs-localstorage';
import DistributionTree from '../distributions/DistributionTree';
import DatePicker from 'react-datepicker';
import Form from 'react-bootstrap/Form';

function MultiTree({deal, company, diligence_id}) {
    // function DistributionTree({pId, setParentId,tree, setTree,waterfall, setWaterfall,lp, setLP, gp, setGP,payoutFrequency, setPayoutFrequency}) {

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  
  const navigate = useNavigate()

  const [pIdList, setParentIdList] = useState([]);
  const [tree_list, setTreeList] = useState([]);
  const [amountToDistribute, setamountToDistribute] = useState([]);
  const [distributionAnswers, setDistributionAnswers] = useState();
  let cookie = reactLocalStorage.get('cookie')
  const requestOptions = {
      method: 'GET',
      headers: { 
      'x-access-token': cookie},
  };
  
  const { data: distributionTrees, er, isPend} = useFetch(`/distribution/all_distributions/${company.id}/${deal.id}/${diligence_id}` , requestOptions)
  useEffect(() => {
    if (distributionTrees  ){
        // setMortgages(new_mortgages)
        // unformatTree(distributionTree[0])
        // setParentId(distributionTree[1])
        let all_ids = []
        let all_tree_lists = []
        let all_distributions = []
        distributionTrees[0].map((pid, i) => { 
            all_ids.push(pid.parent_id)
            all_tree_lists.push(pid.formated_tree)
            let new_list = []
            distributionTrees[1][pid.parent_id].map((dist, i) => { 
                let new_date =new Date(dist.distribution_date)

                new_list.push({'amount' :dist.payed_distributions, 'distribution_date': new_date, 'id': dist.id})
                
            })
            all_distributions.push(new_list)
        })
        setParentIdList(all_ids);
        setTreeList(all_tree_lists);
        setamountToDistribute(all_distributions)
        setDistributionAnswers(distributionTrees[1])
        let amount_to_dist = []
        
    }
}, [distributionTrees]);
        const AddTree = async (e) => {
            setParentIdList(previds => [...previds,timeElapsed]);
            setTreeList(treeInfo => [...treeInfo,null]);
            setamountToDistribute(distributions => [...distributions,[]]);
            } 
        const addTransaction = (i) => {
                const timeElapsed = Date.now();
                const today = new Date(timeElapsed);
                // console.log(today)
                // console.log(create_proper_time(today, false))
                // console.log(create_proper_time(today, true))
                const newtransactions =  
                [... amountToDistribute[i],
                {
                    'amount' : 1000,
                              'distribution_date' : today,
                }]
                setamountToDistribute(s => {
                    const newDistributions = s.slice();
                    newDistributions[i] = newtransactions
                    return newDistributions;
                });
              };
    function handleTransactionChange(data, i, index, mortgageInfoType) {
                let keyvalue = mortgageInfoType.toString()
                setamountToDistribute(s => {
                    const newtransactions = s.slice();
                    newtransactions[i][index][`${keyvalue}`] = data;
              
                    return newtransactions;
                  });
        
              }
              const sendApi = async (i, pid) => {
                let info = {'distributions':amountToDistribute[i], 'parent_id':pid}
                let a = await apiRequest('POST',info,`/distribution/results/live/${company.id}/${deal.id}`)
                setDistributionAnswers(a)
                console.log(a)
                // console.log()
              }
                
    return (
      <div>
        <hr></hr>
      
        <hr></hr>
        <Button onClick={() => {
                AddTree()
    }}>Add Tree </Button>
        {pIdList && pIdList.map((pid, i) => {   
        
        return (
          <>
                  <Button onClick={() => {
                addTransaction(i)
    }}>Add Transaction </Button>
          {amountToDistribute[i] && amountToDistribute[i].map((distributions, index) => {
return (
    <Row className="mb-3">
    {/* new Date(datesumTotal.setFullYear(datesumTotal.getFullYear() + dateMulitplicationAmount)) */}

<Form.Group as={Col} controlId="formGridEmail">
    <Form.Label>Date of Distribution</Form.Label>
    <DatePicker selected={distributions.distribution_date} onChange={(e) => handleTransactionChange(e, i, index, 'distribution_date')} showYearDropdown
      scrollableMonthYearDropdown />
  </Form.Group> 
  <Form.Group as={Col} controlId="formGridEmail">
    <Form.Label>Distribution Amount</Form.Label>
    <Form.Control type="number" value={distributions.amount} onChange={(e) => handleTransactionChange(e.target.value, i, index, 'amount')}/>
  </Form.Group>
  {distributions.id}
</Row>
)

          })}
<Button onClick={() => {
              sendApi(i, pid)
  }}>send Transactions </Button>
 
          <DistributionTree deal={deal} company={company} diligence_id={diligence_id} newPid={pid} new_unformatted_tree={tree_list[i]} live_info={true} investmentDetails={distributionAnswers}/>

          </>
        )
         } )}
    
      </div>
    );
}
export default MultiTree