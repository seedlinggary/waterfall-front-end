import React, { useState } from 'react';
import Calculator from './Calculator';

function FamilyTree() {

    
    const [pId, setParentId] = useState(null);
    const [tree, setTree] = useState({});
    const [names, setNames] = useState({});
    const formatTree = (tree, parentId = null) => {
        const parent = tree[parentId];
        if (!parent) return null;
      
        const formattedChildren = parent.children.map((childId) =>
          formatTree(tree, childId)
        );
      
        return {
          id: parent.id,
          name: names[parent.id],
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
      const newId = Date.now();
      setTree((prevTree) => {
        // Create a new person object with a unique ID
        const newPerson = { id: newId, children: [] };
        // if ()
        if (parentId === null) {
          // If there is no parent, set the new person as the root of the tree
          setParentId(newId)
          setNames((prevNames) => ({ ...prevNames, [newId]: "" }));
          return { [newId]: newPerson };
        } else {
          // If there is a parent, update its children array
          const parent = prevTree[parentId];
          const newChildren = [...parent.children, newId];
          const updatedParent = { ...parent, children: newChildren };
          setTree((prevTree) => ({ ...prevTree, [parentId]: updatedParent }));
          setNames((prevNames) => ({ ...prevNames, [newId]: "" }));
          return { ...prevTree, [newId]: newPerson };
        }
      });
      console.log(tree)
      console.log(formatTree(tree,pId))
      console.log(unformatTree(formatTree(tree,pId)))
    };
  
    const editName = (id, name) => {
      setNames((prevNames) => ({ ...prevNames, [id]: name }));
    };
  
    const renderPerson = (person) => {
      return (
        <div key={person.id}>
          <input
            type="text"
            value={names[person.id]}
            placeholder="Enter name"
            onChange={(e) => editName(person.id, e.target.value)}
          />
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
        <Calculator></Calculator>
      </div>
    );
}
export default FamilyTree