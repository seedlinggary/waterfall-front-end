import React, { useState } from 'react';
import Calculator from '../multiwaterfall/Calculator';
import Investor from '../multiwaterfall/Investor';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import PayoutFrequency from '../multiwaterfall/PayoutFrequency';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import WaterfallPopover from './WaterfallPopover';
function ReturnInvestors({pId, setParentId,tree, setTree,waterfall, setWaterfall,lp, setLP, gp, setGP,payoutFrequency, setPayoutFrequency}) {

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const [waterfallShow, setwaterfallShow] = React.useState(false);

    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    const formatTree = (tree, parentId = null) => {
        const parent = tree[parentId];
        if (!parent) return null;
      
        const formattedChildren = parent.children.map((childId) =>
          formatTree(tree, childId)
        );
      
        return {
          id: parent.id,
          waterfall: waterfall[parent.id] ? waterfall[parent.id] : null ,
          lp: lp[parent.id] ? lp[parent.id] : null ,
          gp: gp[parent.id] ? gp[parent.id] : null,
          children: formattedChildren.length ? formattedChildren : null,
        };
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

          newGP[key2]= value2['gp']
        }else if (value2['lp']){
          newLP[key2]= value2['lp']
        }else if (value2['waterfall']){
          newWaterfall[key2]= value2['waterfall']
        }
        })
        setGP(newGP)
        setLP(newLP)
        setWaterfall(newWaterfall)
        setTree(flatTree)
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
            setLP((prevNames) => ({ ...prevNames, [newId]: {'name': "bary",
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
  
    
    function getChildName(childID) {
        let givenID = 1
        if (lp[childID]) {
            givenID = `${lp[childID]['name']} - ${childID} / Ownership %${ lp[childID]['percentage_ownership']}`
        } else if (gp[childID]) {
            givenID = `${gp[childID]['name']} - ${childID} / Ownership %${ gp[childID]['percentage_ownership']}`
        }else if (waterfall[childID]) {
            givenID = `${waterfall[childID]['name']} - ${childID} / Ownership %${ waterfall[childID]['percentage_ownership']}`
        }
        return givenID;
      }



    const renderPerson = (person) => {
      return (
        <div key={person.id}>
          <Tabs
      defaultActiveKey="1"
      id="fun"
      className="mb-3"
      justify
    >

{ lp[person.id] && lp[person.id]['profit_recieved'] && Object.entries(lp[person.id]['profit_recieved']).map( ([year, funds],index) => {
    return(


        <Tab eventKey={year} title={year}>
        <div key={year}>
            <h3> Year {year}</h3>
        <h3> Total Funds Recieved - {funds.totals} </h3>
        <h3> Capital Returned - {funds.capital_returned}</h3>    
        <h3> Taxable Funds - {funds.taxable_distribution} </h3>
       <h3> Total Tax Withheld - {funds.tax_withheld}</h3>
       <h3> Total Funds Recieved After Tax - {funds.funds_after_tax}</h3>
       <h3> ROI (post tax not including capital returned) - {funds.roi}%</h3>
       <h3> IRR (post tax including capital returned) - {funds.irr}%</h3>

<hr></hr>
        </div>
    </Tab> 
    )
    
            })}
            { lp[person.id] && lp[person.id]['profit_recieved'] && 
            
            <Tab eventKey='totals' title='totals'>
            <div >
                <h3> Total asset accumulation</h3>
            <h3> Total Funds Recieved - {lp[person.id]['profit_recieved'][Object.keys(lp[person.id]['profit_recieved'])[Object.keys(lp[person.id]['profit_recieved']).length-1]].accumulation.total_totals} </h3>
            <h3> Capital Returned - {lp[person.id]['profit_recieved'][Object.keys(lp[person.id]['profit_recieved'])[Object.keys(lp[person.id]['profit_recieved']).length-1]].accumulation.total_capital_returned}</h3>    
            <h3> Taxable Funds - {lp[person.id]['profit_recieved'][Object.keys(lp[person.id]['profit_recieved'])[Object.keys(lp[person.id]['profit_recieved']).length-1]].accumulation.total_taxable_distribution} </h3>
           <h3> Total Tax Withheld - {lp[person.id]['profit_recieved'][Object.keys(lp[person.id]['profit_recieved'])[Object.keys(lp[person.id]['profit_recieved']).length-1]].accumulation.total_taxes_paid}</h3>
           <h3> Total Funds Recieved After Tax - {lp[person.id]['profit_recieved'][Object.keys(lp[person.id]['profit_recieved'])[Object.keys(lp[person.id]['profit_recieved']).length-1]].accumulation.total_funds_after_taxes}</h3>
           <h3> Total ROI (post tax not including capital returned) - {lp[person.id]['profit_recieved'][Object.keys(lp[person.id]['profit_recieved'])[Object.keys(lp[person.id]['profit_recieved']).length-1]].accumulation.roi}%</h3>
           <h3> Total IRR (post tax including capital returned) - {lp[person.id]['profit_recieved'][Object.keys(lp[person.id]['profit_recieved'])[Object.keys(lp[person.id]['profit_recieved']).length-1]].accumulation.irr}%</h3>
    
    <hr></hr>
            </div>
        </Tab> 
    
            }
{ gp[person.id] && gp[person.id]['profit_recieved'] && Object.entries(gp[person.id]['profit_recieved']).map( ([year, funds],index) => {
    return(


        <Tab eventKey={year} title={year}>
        <div key={year}>
            <h3> Year {year}</h3>
        <h3> Total Funds Recieved - {funds.totals} </h3>
        <h3> Capital Returned - {funds.capital_returned}</h3>    
        <h3> Taxable Funds - {funds.taxable_distribution} </h3>
       <h3> Total Tax Withheld - {funds.tax_withheld}</h3>
       <h3> Total Funds Recieved After Tax - {funds.funds_after_tax}</h3>
       <h3> ROI (post tax not including capital returned) - {funds.roi}%</h3>
       <h3> IRR (post tax including capital returned) - {funds.irr}%</h3>

<hr></hr>
        </div>
    </Tab> 
    // {index == gp[person.id]['profit_recieved'].length - 1 && <h1> hello world</h1>}
    )
    
            })}
            { gp[person.id] && gp[person.id]['profit_recieved'] && 
            
            <Tab eventKey='totals' title='totals'>
            <div >
                <h3> Total asset accumulation</h3>
            <h3> Total Funds Recieved - {gp[person.id]['profit_recieved'][Object.keys(gp[person.id]['profit_recieved'])[Object.keys(gp[person.id]['profit_recieved']).length-1]].accumulation.total_totals} </h3>
            <h3> Capital Returned - {gp[person.id]['profit_recieved'][Object.keys(gp[person.id]['profit_recieved'])[Object.keys(gp[person.id]['profit_recieved']).length-1]].accumulation.total_capital_returned}</h3>    
            <h3> Taxable Funds - {gp[person.id]['profit_recieved'][Object.keys(gp[person.id]['profit_recieved'])[Object.keys(gp[person.id]['profit_recieved']).length-1]].accumulation.total_taxable_distribution} </h3>
           <h3> Total Tax Withheld - {gp[person.id]['profit_recieved'][Object.keys(gp[person.id]['profit_recieved'])[Object.keys(gp[person.id]['profit_recieved']).length-1]].accumulation.total_taxes_paid}</h3>
           <h3> Total Funds Recieved After Tax - {gp[person.id]['profit_recieved'][Object.keys(gp[person.id]['profit_recieved'])[Object.keys(gp[person.id]['profit_recieved']).length-1]].accumulation.total_funds_after_taxes}</h3>
           <h3> Total ROI (post tax not including capital returned) - {gp[person.id]['profit_recieved'][Object.keys(gp[person.id]['profit_recieved'])[Object.keys(gp[person.id]['profit_recieved']).length-1]].accumulation.roi}%</h3>
           <h3> Total IRR (post tax including capital returned) - {gp[person.id]['profit_recieved'][Object.keys(gp[person.id]['profit_recieved'])[Object.keys(gp[person.id]['profit_recieved']).length-1]].accumulation.irr}%</h3>

    <hr></hr>
            </div>
        </Tab> 
    
            }



{ waterfall[person.id] && waterfall[person.id]['profit_recieved'] && Object.entries(waterfall[person.id]['profit_recieved']).map( ([year, funds],index) => {
    return(


      <Tab eventKey={year} title={year}>
        <div key={year}>
            <h3> Year {year}</h3>
          <h3> Total Funds Recieved - {funds.totals} </h3>
            <Row>
   <Col md={{ span: 4, offset: 1 }}>   

        <h3> LP profit - {funds.lp_profit}</h3>    
        <h3> LP capital Returned - {funds.lp_capital_returned} </h3>
       <h3> LP Total Recieved - {funds.lp_total}</h3>

      </Col>  


      <Col md={{ span: 4, offset: 2 }}>   
       <h3> GP profit - {funds.gp_profit}</h3>    
        <h3> GP capital Returned - {funds.gp_capital_returned} </h3>
       <h3> GP Total Recieved - {funds.gp_total}</h3>

    </Col>  
               </Row>


<hr></hr>
        </div>
    </Tab> 
    )
    
            })}


</Tabs>
{ waterfall[person.id] && waterfall[person.id]['profit_recieved'] &&
<>
      <Button variant="primary" onClick={() => setwaterfallShow(true)} >
        Waterfall Details
      </Button>

      <WaterfallPopover
        show={waterfallShow}
        onHide={() => setwaterfallShow(false)}
        profit_recieved={waterfall[person.id]['profit_recieved'][Object.keys(waterfall[person.id]['profit_recieved'])[Object.keys(waterfall[person.id]['profit_recieved']).length-1]].accumilation}
        profits= {waterfall[person.id]['profit_recieved']}
      />
    </>}
    
    { waterfall[person.id] && waterfall[person.id]['profit_recieved'] &&
<>
      {/* {waterfall[person.id]['profit_recieved'][Object.keys(waterfall[person.id]['profit_recieved'])[Object.keys(waterfall[person.id]['profit_recieved']).length-1]]} */}
    </>}

{waterfall[person.id] && <Calculator waterfall={waterfall} key={person.id} setWaterfall={setWaterfall} personId={person.id} payoutFrequency={payoutFrequency}  />}
          {lp[person.id] && <Investor investor={lp} setInvestor={setLP} key={person.id} personId={person.id} payoutFrequency={payoutFrequency}/>}
          {gp[person.id] && <Investor investor={gp} setInvestor={setGP} key={person.id} personId={person.id} payoutFrequency={payoutFrequency}/>}

          {person.children && person.children.length > 0 && (
            <div>
                <Tabs
      defaultActiveKey="profile"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
              {person.children.map((childId) => (

                <Tab key={childId} eventKey={getChildName(childId)} title={getChildName(childId)}>
                <div key={childId}>{renderPerson(tree[childId])}</div>
                </Tab>
              ))}

</Tabs>
            </div>
          )}

              
        </div>
      );
    };
  
    const rootPerson = Object.values(tree)[0];
  
    return (
      <div>
        {rootPerson && renderPerson(rootPerson)}
      </div>
    );
}
export default ReturnInvestors