import React from 'react';
import { Tree as D3Tree } from 'react-d3-tree';

function DisplayTree({ tree }) {
  if (tree == null) {
    // console.log('null')
  } else {
    console.log(tree)
     return (
      <div style={{ width: '100%', height: '500px' }}>
        <D3Tree data={tree} orientation="vertical" translate={{ x: 50, y: 250 }} />
      </div>
    );
  }
}
// }
export default DisplayTree;
