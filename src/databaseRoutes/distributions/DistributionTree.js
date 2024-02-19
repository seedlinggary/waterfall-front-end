import React, { useState,useEffect } from 'react';
import Calculator from './Calculator';
import Investor from './Investor';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import PayoutFrequency from './PayoutFrequency';
import DisplayTree from '../../displayTree/DisplayTree';
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import apiRequest from '../../ApiRequest'
import { useNavigate } from "react-router-dom";
import useFetch from '../../useFetch';
import {reactLocalStorage} from 'reactjs-localstorage';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CreateProposal from '../proposal/CreateProposal';
import ProposalInfo from '../proposal/ProposalInfo';


function DistributionTree({deal, company, diligence_id, newPid=null, new_unformatted_tree=null, live_info=false, investmentDetails=[], distributionTree=false}) {
    // function DistributionTree({pId, setParentId,tree, setTree,waterfall, setWaterfall,lp, setLP, gp, setGP,payoutFrequency, setPayoutFrequency}) {
      const timeElapsed = Date.now();
      const today = new Date(timeElapsed);
      
      const navigate = useNavigate()
      
      const [incomingDistrTree, setIncomingDistrTree] = useState();
      // const [pId, setParentId] = useState(12212);
      const [pId, setParentId] = useState(newPid ? newPid : 12212);
      const [tree, setTree] = useState({ [pId]: { id: pId, children: [] } });
    const [waterfall, setWaterfall] = useState({});
    const [lp, setLP] = useState({});
    const [gp, setGP] = useState({});
    const [payoutFrequency, setPayoutFrequency] = useState({ 'start_date' : today,
    'payout_type': 'Year',
    'payout_frequency': 'year',
    'mulitplicationAmount' : .02,
    'startingAmount' : 2000,
    'transactions': [],
  })
  
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    useEffect(() => {
          if (newPid){
            setParentId(newPid)
            setTree({ [pId]: { id: pId, children: [] } })  
              if (new_unformatted_tree){
                unformatTree(new_unformatted_tree)
               
            }
            
          }
      }, []);
    
    const handleShow = () => setShow(true);

    let cookie = reactLocalStorage.get('cookie')
    const requestOptions = {
        method: 'GET',
        headers: { 
        'x-access-token': cookie},
    };
    

      // const { data: distributionTree, er, isPend} = useFetch(`/distribution/${company.id}/${deal.id}/${diligence_id}` , requestOptions)
      
    
    useEffect(() => {
      if (distributionTree && !newPid ){
          // setMortgages(new_mortgages)
          unformatTree(distributionTree[0])
          setParentId(distributionTree[1])
          console.log('hiiiiiiiiiiii')
      }
  }, [distributionTree]);
  const ShowInvestmentDetails = (investmentdetails) => {
    return ( 
      <>
      Total Returns Per Year
      <Tabs
      defaultActiveKey="profile"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
             { investmentdetails.map( (info,index) => {
        return(
<Tab eventKey={index} title={index}>
          <div>
            {/* {info.contributions == 'Totals' && console.log(info)} */}
           {/* {info.distribution_date} */}
          {info.contributions && <p> total contribution to date {info.contributions.toLocaleString()}</p>}
         {info.percentage_ownership && <p> % ownership {info.percentage_ownership}</p>}
          {info.payed_distributions && <p> payed distribution {info.payed_distributions.toLocaleString()}</p>}
         { info.contributions && <p> total contribution to date {info.contributions.toLocaleString()}</p>}
          {info.lp_contributions && <p>Total Lp contribution {info.lp_contributions}</p>}
          {info.gp_contributions && <p>Total Gp contribution {info.gp_contributions}</p>}
          {info.lp_principal_returned && <p>Total Lp capital return {info.lp_principal_returned.toLocaleString()}</p>}
          {info.gp_principal_returned && <p>Total Gp capital return {info.gp_principal_returned.toLocaleString()}</p>}
          {info.lp_profit && <p>Total Lp profit {info.lp_profit.toLocaleString()}</p>}
          {info.gp_profit && <p>Total Gp profit {info.gp_profit.toLocaleString()}</p>}
          {info.lp_total_distribution && <p>Total Lp distribution {info.lp_total_distribution.toLocaleString()}</p>}
          {info.gp_total_distribution && <p>Total Gp distribution {info.gp_total_distribution.toLocaleString()}</p>}
          </div>
          </Tab>
        )
        })}


</Tabs>

</>
      )}
    // const [waterfall_info, setWaterfallInfo] = useState()
    const formatTree = (tree, parentId = null) => {
        const parent = tree[parentId];
        if (!parent) return null;
      
        const formattedChildren = parent.children.map((childId) =>
          formatTree(tree, childId)
        );
        
        let name="tree";
        let attributes={'':"Investment Tree"}
        let colorClass = "default-color";
        if (waterfall[parent.id]) {
          let my_attributes = {'name': waterfall[parent.id].name}
          if (waterfall[parent.id].amount_gp_invested && waterfall[parent.id].amount_lp_invested){
            my_attributes['gp_invested'] = waterfall[parent.id].amount_gp_invested
            my_attributes['lp_invested'] = waterfall[parent.id].amount_lp_invested
          }
          if (waterfall[parent.id]['percentage_ownership']){
            my_attributes['ownership %'] = waterfall[parent.id].percentage_ownership.toLocaleString()
          }
          name = 'Waterfall';
          attributes = my_attributes;
          colorClass = 'waterfall-color';
          // symbolType= "diamond";
        }
      
        if (lp[parent.id]) {
          let my_attributes = {'name': lp[parent.id].name}
          if (lp[parent.id].amount_invested ){
            my_attributes['amount'] = lp[parent.id].amount_invested
          }
          if (lp[parent.id]['percentage_ownership']){
            my_attributes['ownership %'] = lp[parent.id].percentage_ownership.toLocaleString()
          }

          name = 'LP';
          attributes = my_attributes
          colorClass = 'lp-color';
          
        }
      
        if (gp[parent.id]) {
          let my_attributes = {'name': gp[parent.id].name}
          if (gp[parent.id].amount_invested){
            my_attributes['amount'] = gp[parent.id].amount_invested
          }
          if (gp[parent.id]['percentage_ownership']){
            my_attributes['ownership %'] = gp[parent.id].percentage_ownership.toLocaleString()
          }


          name = 'GP';
          attributes = my_attributes
          colorClass = 'gp-color';
          // [parent.id].selectAll
     
        }
       
        
        return {
          id: parent.id,
          name:name,
          saved_to_db: parent.saved_to_db ? parent.saved_to_db : false,
          attributes,
          // colorClass: colorClass,
          waterfall: waterfall[parent.id] ? waterfall[parent.id] : null ,
          lp: lp[parent.id] ? lp[parent.id]  : null ,
          gp: gp[parent.id] ? gp[parent.id] : null,
          children: formattedChildren.length ? formattedChildren : null,
        };
      };

      const [graphTree, setGraphTree] =useState(formatTree(tree,pId))
      const unformatTree = (tree) => {
        const flatTree = {};
       
        const addPerson = (person, parentId = null) => {
          const { id, name, waterfall, lp, gp, children } = person;
          flatTree[id] = { id, name, waterfall, lp, gp, children: [],saved_to_db:  true,  };
         
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
          // console.log(value2)
        if (value2['gp']){
          let new_date =new Date(value2['gp']['date_funds_recieved'])
          value2['gp']['date_funds_recieved'] = new_date
          value2['gp']['saved_in_db'] = true
          newGP[key2]= value2['gp']
        }else if (value2['lp']){
          let new_date =new Date(value2['lp']['date_funds_recieved'])
          value2['lp']['date_funds_recieved'] = new_date
          value2['lp']['saved_in_db'] = true
          newLP[key2]= value2['lp']
        }else if (value2['waterfall']){
          let new_date =new Date(value2['waterfall']['date_funds_recieved'])
          value2['waterfall']['date_funds_recieved'] = new_date
          value2['waterfall']['saved_in_db'] = true

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
      const addPerson = (parentId, investor_type) => {
      const newId = Date.now().toString();
      setTree((prevTree) => {
        // Create a new person object with a unique ID
        const newPerson = { id: newId, children: [] };
        // if ()
        if (parentId === null) {
          // If there is no parent, set the new person as the root of the tree
          setParentId(newId)
          setLP((prevNames) => ({ ...prevNames, [newId]: "" }));
          return { [newId]: newPerson };
        } else {
          // If there is a parent, update its children array
          const parent = prevTree[parentId];
          const newChildren = [...parent.children, newId];
          const updatedParent = { ...parent, children: newChildren };
          setTree((prevTree) => ({ ...prevTree, [parentId]: updatedParent }));
          if (investor_type == 'lp'){
            setLP((prevNames) => ({ ...prevNames, [newId]: {'name': "Bary",
            "email": "yahoo@all.com",
            "country_of_origin": "US",
            "tax_percentage_withheld": .07,
            "amount_invested": '',
            "date_funds_recieved": today,
            "year_bought_in": 0} }));

          } else if (investor_type == 'gp'){
            setGP((prevNames) => ({ ...prevNames, [newId]: {'name': "Gary",
            "email": "yahoo@all.com",
            "country_of_origin": "US",
            "tax_percentage_withheld": .07,
            "amount_invested": '',
            "date_funds_recieved": today,
            "year_bought_in": 0} }));
          }else if (investor_type == 'waterfall'){
            setWaterfall((prevNames) => ({ ...prevNames, [newId]: {"name": "Gary's LLC",
            "date_funds_recieved": today,
            'irr_parri_passu': true,
            'pay_gp_principal': false,
            'pay_gp_prefered': false,
            'type_of_split': "split_plus_percentage",
            'capital_parri_passu': false,
            'type_of_hurdle': "irr_yearly_compund",
            'way_in_which_to_split' : "investor_in_the_irr",
            'principal_after_preffered': false,
            'yr_strt_capital_payback': (10000 - 1),
            'year_bought_in': 0,
            "email": "yahoo@all.com",
            "splits": [
             {
                 'hurdle' : .08,
                         'sponsor_percent' : 0,
                         'limited_partner_percent' : 1 },
         
         
           ],
            "amount_gp_invested": '',
            "amount_lp_invested": '',
            "fees": [
             {
                 'year' : 1000,
                 'before_what_hurdle' : 1,
                 'who_gets_this_fee' : 'NEED AN INPUT',
                 'percentage_or_cash' : 324,
                 'type_transaction' : 'cash',
                 'type_of_fee' : 'hurdle'
             }
             
           ]
           } }));
          }
        
          return { ...prevTree, [newId]: newPerson };
        }
      });
    };
    const SendApi = async (e) => {
      // setGraphTree(formatTree(tree,pId))
      //   e.preventDefault();
        let info = formatTree(tree,pId)
       
        console.log(tree)
        console.log(pId)
        console.log(info)
        if (!live_info){

          let a = await apiRequest('POST',info,`/distribution/${company.id}/${deal.id}/${diligence_id}`)
        } else{
          let a = await apiRequest('POST',info,`/distribution/live/${company.id}/${deal.id}/${diligence_id}`)

        }
        navigate(0)
      } 
      const DeleteInvestorApi = async (distribution_id) => {
        // setGraphTree(formatTree(tree,pId))
        //   e.preventDefault();
          let info = {distribution_id : distribution_id}
         

         
            let a = await apiRequest('POST',info,`/distribution/investor/delete/${company.id}/${deal.id}`)

        if (a){

          navigate(0)
        }
        } 
   
      const handleDelete = (id) => {
        if(tree[id].saved_to_db){
          console.log(tree[id])
          DeleteInvestorApi(id)
        }
        else{
        console.log(tree[id])
        let newTree =[]
        setTree((prevTree) => {
          const treeCopy = { ...prevTree };
         
          const removePerson = (personId) => {
            const children = tree[personId].children;
            if (children){

              children.forEach((childId) => removePerson(childId));
            }
            newTree.push(personId)
            // console.log(newTree) ;
            Object.entries(treeCopy).map( ([k, v],index) => {
              // v.children.map((childId) => {
              //   delete treeCopy[childId]
              // })
              let newChildren = treeCopy[k].children.filter((s,i)=>(s != personId))
              treeCopy[k].children = newChildren
              // treeCopy.children.filter((s,i)=>(s != personId))

            }) 
            delete treeCopy[personId];
          };
         
          removePerson(id);
         
          return treeCopy;
        });
      }
        // setTree((prevTree) => {
        //   const treeCopy = { ...prevTree };
        //   newTree.map((childId) => (
        //     // console.log(treeCopy[childId])
        //     delete treeCopy[childId]
        //   ))
          
        //   console.log(prevTree) ;
        //   return treeCopy
        // })
      }; 
      
      const renderPerson = (person, parent_id) => {
      return (
        <div key={person.id}>
              <Accordion defaultActiveKey="0" flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header>

        {waterfall[person.id] && waterfall[person.id]['name'] && <h3>Waterfall Name: {waterfall[person.id]['name']}</h3>  }
          {waterfall[parent_id.id] && lp[person.id] && lp[person.id]['name'] && <h3>LP name: {lp[person.id]['name']} </h3>  }
          {waterfall[parent_id.id] && gp[person.id] && gp[person.id]['name'] && <h3>GP name: {gp[person.id]['name']} </h3>  }
          {!waterfall[parent_id.id] && lp[person.id] && lp[person.id]['name'] && <h3>Investor name: {lp[person.id]['name']} </h3>  }
          {waterfall[person.id] && waterfall[person.id]['percentage_ownership'] && <h3> -  Ownership %{ waterfall[person.id]['percentage_ownership'].toLocaleString()}</h3>  }
          {lp[person.id] && lp[person.id]['percentage_ownership'] && <h3> - Ownership %{lp[person.id]['percentage_ownership'].toLocaleString()}</h3>  }
          {gp[person.id] && gp[person.id]['percentage_ownership'] && <h3> - Ownership %{gp[person.id]['percentage_ownership'].toLocaleString()}</h3>  }
          {/* {waterfall[person.id] && waterfall[person.id]['profit_recieved'] && <h3> -  { JSON.stringify(waterfall[person.id]['profit_recieved'])}</h3>  }
          {lp[person.id] && lp[person.id]['profit_recieved'] && <h3> - {JSON.stringify(lp[person.id]['profit_recieved'])}</h3>  }
          {gp[person.id] && gp[person.id]['profit_recieved'] && <h3> - {JSON.stringify(gp[person.id]['profit_recieved'])}</h3>  } */}
          {person.id != 12212 && <Button variant="outline-danger" onClick={() => handleDelete(person.id)}>Delete Me
          
          </Button>}
          {(lp[person.id] && lp[person.id].saved_in_db ) && <ProposalInfo distribution_ID={person.id} proposal={lp[person.id].proposal} profits={investmentDetails[person.id]}></ProposalInfo> }
          {(gp[person.id] && gp[person.id].saved_in_db ) && <ProposalInfo distribution_ID={person.id} proposal={gp[person.id].proposal} profits={investmentDetails[person.id]}></ProposalInfo>}
          {( waterfall[person.id] && waterfall[person.id].saved_in_db ) && <ProposalInfo distribution_ID={person.id} proposal={waterfall[person.id].proposal} profits={investmentDetails[person.id]}></ProposalInfo>}
          {person.id}
          {(person.id == 12212 || newPid== person.id) && <h3> Your Investment Tree</h3> }
        </Accordion.Header>
        <Accordion.Body>
          {waterfall[person.id] && <Calculator waterfall={waterfall}  setWaterfall={setWaterfall} personId={person.id} payoutFrequency={payoutFrequency} live_info={live_info} />}
          {lp[person.id] && <Investor investor={lp} setInvestor={setLP} personId={person.id} payoutFrequency={payoutFrequency} live_info={live_info}/>}
          {gp[person.id] && <Investor investor={gp} setInvestor={setGP} personId={person.id} payoutFrequency={payoutFrequency} live_info={live_info}/>}
          {waterfall[person.id] &&           <Row>
      <Col md={{ span: 2, offset: 3 }}>   
      <Button onClick={() => addPerson(person.id, 'lp')}>Add LP</Button>
      </Col>
      <Col md={{ span: 2, offset: 2 }}>   
      <Button onClick={() => addPerson(person.id, 'gp')}>Add GP</Button>

    </Col>  
               </Row>}

               {  !waterfall[person.id]  &&           <Row>
      <Col md={{ span: 2, offset: 3 }}>   
      <Button onClick={() => addPerson(person.id, 'lp')}>Add Investor</Button>
      </Col>
    <Col md={{ span: 2, offset: 2 }}>   
    <Button onClick={() => addPerson(person.id, 'waterfall')}>Add Waterfall</Button>
    </Col>  
               </Row>}
          {/* <Row>
      <Col md={{ span: 2, offset: 1 }}>   
      <Button onClick={() => addPerson(person.id, 'lp')}>Add LP</Button>
      </Col>
      <Col md={{ span: 2, offset: 2 }}>   
      <Button onClick={() => addPerson(person.id, 'gp')}>Add GP</Button>

    </Col>  
    <Col md={{ span: 2, offset: 2 }}>   
    <Button onClick={() => addPerson(person.id, 'waterfall')}>Add waterfall</Button>
    </Col>  
               </Row> */}

{newPid && investmentDetails && investmentDetails[person.id] && ShowInvestmentDetails(investmentDetails[person.id])
}
   <hr></hr>
          {person.children && person.children.length > 0 && (
            <ul>
              {person.children.map((childId) => (
                <li key={childId}>{renderPerson(tree[childId], person)}</li>
              ))}
            </ul>
          )}
           </Accordion.Body>
      </Accordion.Item>
    </Accordion>
        </div>
      );
    };
  
    const rootPerson = Object.values(tree)[0];
  
    return (
      <div>
        {/* <PayoutFrequency payoutFrequency={payoutFrequency} setPayoutFrequency={setPayoutFrequency}/> */}
        {/* <Button onClick={() => addPerson(null)}>Create New Tree</Button> */}
        <hr></hr>
        {rootPerson && renderPerson(rootPerson, 0)}
        <hr></hr>
        <Button onClick={() => {
                SendApi()
    }}>Send Info </Button>
        <Button onClick={() => {
          handleShow()
                // SendApi()
                setGraphTree(formatTree(tree,pId))
    }}>Investment Tree Visual</Button>
    <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Investment Tree</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          
          <DisplayTree tree={graphTree}/></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    
    {/* <DisplayTree tree={graphTree}/> */}
    
      </div>
    );
}
export default DistributionTree