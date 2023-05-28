import React from 'react';
import { Tree as D3Tree } from 'react-d3-tree';

function DisplayTree({ tree }) {
  if (tree == null) {
    // console.log('null')
  } else {
    
//     if(tree&& D3Tree){
//     const circles = document.querySelectorAll("circle")
//     circles.forEach((circle) => {
//         console.log(circle)
//         circle.attr('class', function() {
//     return `node ${d.data.colorClass}`;
//   });})}
const circles = document.getElementsByTagName('circle');
for (let i = 0; i < circles.length; i++) { 
  // let colorClass = colorClass
  const circle = circles[i];
  console.log(circle.nextSibling.childNodes[0].textContent)
  if (circle.nextSibling.childNodes[0].textContent=='waterfall'){
    circle.setAttribute('class','waterfallTree')
  }else if(circle.nextSibling.childNodes[0].textContent=='gp'){
    circle.setAttribute('class','gpTree')
  }else if(circle.nextSibling.childNodes[0].textContent=='LP'){
    circle.setAttribute('class','lpTree')
  }
  // circle.attr(colorClass);
}

    console.log(tree)
     return (
      <div style={{ width: '100%', height: '500px' }}>
        <D3Tree data={tree} 
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        orientation="vertical" translate={{ x: 50, y: 250 }} />
      </div>
    );
  }
}
// }
export default DisplayTree;
