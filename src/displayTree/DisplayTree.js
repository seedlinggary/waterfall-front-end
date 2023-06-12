import React, {useEffect} from 'react';
import { Tree as D3Tree } from 'react-d3-tree';
import { useState } from 'react';
function DisplayTree({ tree }) {
  // if (tree == null) {
  //   // console.log('null')
  // } else {
  //   const nodeStyles = {
  //       waterfall: {
  //         shapeProps: {
  //           className: 'waterfallTree',
  //         },
  //       },
  //       gp: {
  //         shapeProps: {
  //           className: 'gpTree',
  //         },
  //       },
  //       LP: {
  //         shapeProps: {
  //           className: 'lpTree',
  //         },
  //       },
  //     };
  useEffect(() => {
    // This code will run after the component has mounted

    // Perform any asynchronous operations or fetch data here
    const circles = document.getElementsByTagName('circle');
  for (let i = 0; i < circles.length; i++) { 
  // let colorClass = colorClass
  const circle = circles[i];
  console.log(circle.nextSibling.childNodes[0].textContent)
  if (circle.nextSibling.childNodes[0].textContent=='Waterfall'){
    circle.setAttribute('class','waterfallTree')
  }else if(circle.nextSibling.childNodes[0].textContent=='GP'){
    circle.setAttribute('class','gpTree')
  }else if(circle.nextSibling.childNodes[0].textContent=='LP'){
    circle.setAttribute('class','lpTree')
  }
  //   circle.attr(colorClass);
  }
  }, [tree]); // The empty dependency array ensures the effect only runs once on mount

    console.log(tree)
     return (
      <div style={{ width: '100%', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <D3Tree data={tree} 
        
        collapsible={false}
        // rootNodeClassName="node__root"
        // branchNodeClassName="node__branch"
        // leafNodeClassName="node__leaf"
        orientation="vertical" translate={{ x: 375, y: 20 }} 
        />
      </div>
    );
  }
// }
// }
export default DisplayTree;
