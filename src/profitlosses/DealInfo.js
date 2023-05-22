import React, { useState } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import DatePicker from 'react-datepicker';

const DealInfo = ({dealInfo, setDealInfo}) => {
  function handleDealInfoChange(data, mortgageInfoType) {
    let keyvalue = mortgageInfoType.toString()
      setDealInfo(prevState => ({
        ...prevState,
        [`${keyvalue}`]: data
    }));
  }

          return ( 
              <> 
                      <Row className="mb-3">
      <hr></hr>
      
      <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Name of deal?</Form.Label>
          <Form.Control  value={dealInfo.name} onChange={(e) => handleDealInfoChange(e.target.value,'name')} />
        </Form.Group>        

        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Address</Form.Label>
          <Form.Control  value={dealInfo.address} onChange={(e) => handleDealInfoChange(e.target.value,'address')} />
        </Form.Group>        

        <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Type of Deal</Form.Label>
      <Form.Select aria-label="Default select example"  onChange={(e) => handleDealInfoChange(e.target.value,'investment_type')}>
            <option value="multi_family">Multi Family</option>
            <option value="flip">Flip</option>
            <option value="rv">RV Park</option>
            <option value="other">other</option>
        </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail" >
            <Form.Label>Date of Purchase</Form.Label>
            <DatePicker selected={dealInfo.purchase_date} onChange={(date) => handleDealInfoChange(date,'purchase_date')} />

          </Form.Group>  

</Row>
                      <Row className="mb-3">
      
                      <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>GSF?</Form.Label>
          <Form.Control  value={dealInfo.gross_sqr_footage.toLocaleString()} onChange={(e) => handleDealInfoChange(e.target.value,'gross_sqr_footage')} />
        </Form.Group>        

        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>NSF?</Form.Label>
          <Form.Control  value={dealInfo.net_sqr_footage.toLocaleString()} onChange={(e) => handleDealInfoChange(e.target.value,'net_sqr_footage')} />
        </Form.Group>        

        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>How many units?</Form.Label>
          <Form.Control  value={dealInfo.unit_amount.toLocaleString()} onChange={(e) => handleDealInfoChange(e.target.value,'unit_amount')} />
        </Form.Group>        
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Purchase price?</Form.Label>
          <Form.Control  value={dealInfo.purchase_price.toLocaleString()} onChange={(e) => handleDealInfoChange(e.target.value,'purchase_price')} />
        </Form.Group>        

</Row>

            </>
  )
}
export default DealInfo;