

import React, { useState,useEffect } from 'react'
import apiRequest from '../../ApiRequest'
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {reactLocalStorage} from 'reactjs-localstorage';
import { useNavigate } from "react-router-dom";
import useFetch from '../../useFetch';

let base64 = require('base-64');

const CreateProposal = ({distribution_ID, proposal,profits}) => {
    console.log(proposal)
    const [information, setInformation] = useState(proposal ? proposal.information : 'Lorem Ipstum')
    const [distributionID, setDistributionID] = useState(distribution_ID )
    const [proposal_id, setProposalID] = useState(proposal ? proposal.id : '')

    const navigate = useNavigate()

  
      
    const SendApi = async (e) => {
    //   e.preventDefault();
      let info = {"information": information,
      'distribution_id': distributionID,
      'proposal_id': proposal_id,
                  
                 }
                 console.log(info)
      let a = await apiRequest('POST',info,`/distribution/proposal`)


        navigate(0)
    } 
      

    return ( 
        <div className="blog-list">

<Row className="mb-3">

<Form.Group as={Row} controlId="formGridEmail">
<Form.Label column sm="2">Your Proposal</Form.Label>
<Col sm="10">
{console.log(profits)}
{(!profits || !profits[profits.length - 1] || !profits[profits.length - 1].contributions) &&<Form.Control as="textarea" rows={3}  value={information} onChange={(e) => setInformation(e.target.value)}/>}
{profits && profits[profits.length - 1] && profits[profits.length - 1].contributions && <Form.Control as="textarea" rows={3}  value={information} />}
</Col>
</Form.Group>
</Row>


<Button variant="primary" onClick={SendApi}>
        Create Proposal
      </Button>
   </div>   
     );
}
 
export default CreateProposal;