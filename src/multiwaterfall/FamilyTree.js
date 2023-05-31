import React, { useState } from 'react';
import Calculator from './Calculator';
import Investor from './Investor';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import PayoutFrequency from './PayoutFrequency';
import DisplayTree from '../displayTree/DisplayTree';
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function FamilyTree({pId, setParentId,tree, setTree,waterfall, setWaterfall,lp, setLP, gp, setGP,payoutFrequency, setPayoutFrequency}) {

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  
    // const [pId, setParentId] = useState(null);
    // const [tree, setTree] = useState({});
    // const [waterfall, setWaterfall] = useState({});
    // const [lp, setLP] = useState({});
    // const [gp, setGP] = useState({});
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const [payoutFrequency, setPayoutFrequency] = useState({ 'start_date' : today,
    // 'payout_frequency': 'day',
    // 'transactions': [],
    //     })
    
    
    // const [waterfall_info, setWaterfallInfo] = useState()
    const formatTree = (tree, parentId = null) => {
        const parent = tree[parentId];
        if (!parent) return null;
      
        const formattedChildren = parent.children.map((childId) =>
          formatTree(tree, childId)
        );
        
        let name="tree";
        let attributes={tset:"test"}
        let colorClass = "default-color";
        if (waterfall[parent.id]) {
          name = 'waterfall';
          attributes = waterfall[parent.id].amount_gp_invested;
          colorClass = 'waterfall-color';
          // symbolType= "diamond";
        }
      
        if (lp[parent.id]) {
          name = 'LP';
          attributes = lp[parent.id];
          colorClass = 'lp-color';
          
        }
      
        if (gp[parent.id]) {
          name = 'gp';
          attributes = gp[parent.id];
          colorClass = 'gp-color';
          // [parent.id].selectAll
     
        }
       
        
        return {
          id: parent.id,
          name:name,
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
            "amount_invested": '5',
            "year_bought_in": 1} }));

          } else if (investor_type == 'gp'){
            setGP((prevNames) => ({ ...prevNames, [newId]: {'name': "Gary",
            "email": "yahoo@all.com",
            "country_of_origin": "US",
            "tax_percentage_withheld": .07,
            "amount_invested": '5',
            "year_bought_in": 1} }));
          }else if (investor_type == 'waterfall'){
            setWaterfall((prevNames) => ({ ...prevNames, [newId]: {"name": "Gary's LLC",
            'irr_parri_passu': true,
            'pay_gp_principal': false,
            'pay_gp_prefered': false,
            'type_of_split': "split_plus_percentage",
            'capital_parri_passu': false,
            'type_of_hurdle': "irr_yearly_compund",
            'way_in_which_to_split' : "investor_in_the_irr",
            'principal_after_preffered': false,
            'yr_strt_capital_payback': (10000 - 1),
            'year_bought_in': 1,
            "splits": [
             {
                 'hurdle' : .08,
                         'sponsor_percent' : 0,
                         'limited_partner_percent' : 1 },
         
         
           ],
            "amount_gp_invested": '5',
            "amount_lp_invested": '5',
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
  
    const SendApi = (e) => {
      setGraphTree(formatTree(tree,pId))
      
      // let backend = 'http://127.0.0.1:5000'
      let backend = 'https://distributionresolutionapi.com'
      // let address = `/waterfall_calc`
      let address = `/family_tree`
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
          },
          body: JSON.stringify({'family_tree' : formatTree(tree,pId) })
      };
      fetch(`${backend}${address}`, requestOptions)
          .then(async response => {
              const isJson = response.headers.get('content-type')?.includes('application/json');
              const data = isJson && await response.json();
              // console.error('There was a response!', response);
              // check for error response
              if (!response.ok) {
                  // get error message from body or default to response status
                  const error = (data && data.message) || response.status;
                  return Promise.reject(error);
              }
  
              console.log(data)
              console.log(unformatTree(data))
              setIsPending(false)
              setError(null)
      return  data 
          })
          .catch(error => {
              console.error('There was an error!', error);
              setIsPending(false)
              setError(error.message)    
          }); 
  
      e.preventDefault();

      
      }    

    const renderPerson = (person) => {
      return (
        <div key={person.id}>
              <Accordion defaultActiveKey="0" flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header>


        {waterfall[person.id] && waterfall[person.id]['name'] && <h3>Waterfall Name: {waterfall[person.id]['name']}</h3>  }
          {lp[person.id] && lp[person.id]['name'] && <h3>LP name: {lp[person.id]['name']} </h3>  }
          {gp[person.id] && gp[person.id]['name'] && <h3>GP name: {gp[person.id]['name']} </h3>  }
          {waterfall[person.id] && waterfall[person.id]['percentage_ownership'] && <h3> -  Ownership %{ waterfall[person.id]['percentage_ownership'].toLocaleString()}</h3>  }
          {lp[person.id] && lp[person.id]['percentage_ownership'] && <h3> - Ownership %{lp[person.id]['percentage_ownership'].toLocaleString()}</h3>  }
          {gp[person.id] && gp[person.id]['percentage_ownership'] && <h3> - Ownership %{gp[person.id]['percentage_ownership'].toLocaleString()}</h3>  }
        </Accordion.Header>
        <Accordion.Body>
     
          {waterfall[person.id] && <Calculator waterfall={waterfall}  setWaterfall={setWaterfall} personId={person.id}  />}
          {lp[person.id] && <Investor investor={lp} setInvestor={setLP} personId={person.id}/>}
          {gp[person.id] && <Investor investor={gp} setInvestor={setGP} personId={person.id}/>}
          <Row>
      <Col md={{ span: 2, offset: 1 }}>   
      <Button onClick={() => addPerson(person.id, 'lp')}>Add LP</Button>
      </Col>
      <Col md={{ span: 2, offset: 2 }}>   
      <Button onClick={() => addPerson(person.id, 'gp')}>Add GP</Button>

    </Col>  
    <Col md={{ span: 2, offset: 2 }}>   
    <Button onClick={() => addPerson(person.id, 'waterfall')}>Add waterfall</Button>
    </Col>  
               </Row>
   <hr></hr>
          {person.children && person.children.length > 0 && (
            <ul>
              {person.children.map((childId) => (
                <li key={childId}>{renderPerson(tree[childId])}</li>
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
        <PayoutFrequency payoutFrequency={payoutFrequency} setPayoutFrequency={setPayoutFrequency}/>
        <Button onClick={() => addPerson(null)}>Create New Tree</Button>
        <hr></hr>
        {rootPerson && renderPerson(rootPerson)}
        <hr></hr>
        <Button onClick={() => {
          handleShow()
                SendApi()
                console.log(tree)
                console.log(formatTree(tree,pId))
                console.log(unformatTree(formatTree(tree,pId)))
                console.log(formatTree(unformatTree(formatTree(tree,pId)),pId))
    }}>See info</Button>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body><DisplayTree tree={graphTree}/></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    
    {/* <DisplayTree tree={graphTree}/> */}
    
      </div>
    );
}
export default FamilyTree