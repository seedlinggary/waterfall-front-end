import React, { useState } from 'react';
import Calculator from './Calculator';

function FamilyTree() {

    
    const [pId, setParentId] = useState(null);
    const [tree, setTree] = useState({});
    const [names, setNames] = useState({});
    const [waterfall, setWaterfall] = useState({});
    // const [waterfall_info, setWaterfallInfo] = useState()
    const formatTree = (tree, parentId = null) => {
        const parent = tree[parentId];
        if (!parent) return null;
      
        const formattedChildren = parent.children.map((childId) =>
          formatTree(tree, childId)
        );
      
        return {
          id: parent.id,
          name: names[parent.id],
          waterfall: waterfall[parent.id],
          children: formattedChildren.length ? formattedChildren : null,
        };
      };
      const unformatTree = (tree) => {
        const flatTree = {};
       
        const addPerson = (person, parentId = null) => {
          const { id, name, children } = person;
          flatTree[id] = { id, name, children: [] };
         
          if (parentId) {
            flatTree[parentId].children.push(id);
          }
         
          if (children) {
            children.forEach((child) => addPerson(child, id));
          }
        };
       
        addPerson(tree);
       
        return flatTree;
      };
      const addPerson = (parentId) => {
      const newId = Date.now().toString();
      setTree((prevTree) => {
        // Create a new person object with a unique ID
        const newPerson = { id: newId, children: [] };
        // if ()
        if (parentId === null) {
          // If there is no parent, set the new person as the root of the tree
          setParentId(newId)
          setNames((prevNames) => ({ ...prevNames, [newId]: "" }));
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
          "splits": [
           {
               'hurdle' : .08,
                       'sponsor_percent' : 0,
                       'limited_partner_percent' : 1 },
       
       
         ],
          "amount_gp_invested": 100000,
          "amount_lp_invested": 0,
          "fees": [
           {
               'year' : 1000,
               'before_what_hurdle' : 1,
               'who_gets_this_fee' : 'NEED AN INPUT',
               'percentage_or_cash' : 324,
               'type_transaction' : 'cash',
               'type_of_fee' : 'hurdle'
           }
           
         ],
         "investors": [
           {
           }
       
         ],
         } }));
          return { [newId]: newPerson };
        } else {
          // If there is a parent, update its children array
          const parent = prevTree[parentId];
          const newChildren = [...parent.children, newId];
          const updatedParent = { ...parent, children: newChildren };
          setTree((prevTree) => ({ ...prevTree, [parentId]: updatedParent }));
          setNames((prevNames) => ({ ...prevNames, [newId]: "" }));
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
          "splits": [
           {
               'hurdle' : .08,
                       'sponsor_percent' : 0,
                       'limited_partner_percent' : 1 },
       
       
         ],
          "amount_gp_invested": 100000,
          "amount_lp_invested": 0,
          "fees": [
           {
               'year' : 1000,
               'before_what_hurdle' : 1,
               'who_gets_this_fee' : 'NEED AN INPUT',
               'percentage_or_cash' : 324,
               'type_transaction' : 'cash',
               'type_of_fee' : 'hurdle'
           }
           
         ],
         "investors": [
           {
           }
       
         ],
         } }));
          return { ...prevTree, [newId]: newPerson };
        }
      });
      console.log(names)
      console.log(tree)
      console.log(formatTree(tree,pId))
      // console.log(unformatTree(formatTree(tree,pId)))
    };
  
    const editName = (id, name) => {
      setNames((prevNames) => ({ ...prevNames, [id]: name }));
    };
  
    const renderPerson = (person) => {
      const personId=person.id
      const test = 'test'
      console.log(personId)
      return (
        <div key={person.id}>
          {/* {console.log(person.id)} */}
          <Calculator waterfall={waterfall}  setWaterfall={setWaterfall} personId={personId} test={test}  />
          {/* <input
            type="text"
            value={names[waterfall.id]}
            placeholder="Enter name"
            onChange={(e) => editName(waterfall.id, e.target.value)}
          /> */}
          <button onClick={() => addPerson(person.id)}>Add Child</button>
          {person.children && person.children.length > 0 && (
            <ul>
              {person.children.map((childId) => (
                <li key={childId}>{renderPerson(tree[childId])}</li>
              ))}
            </ul>
          )}
        </div>
      );
    };
  
    const rootPerson = Object.values(tree)[0];
  
    return (
      <div>
        <button onClick={() => addPerson(null)}>Add First Person</button>
        {rootPerson && renderPerson(rootPerson)}
        {/* <Calculator /> */}
      </div>
    );
}
export default FamilyTree