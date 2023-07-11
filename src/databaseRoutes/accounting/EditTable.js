import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function EditTable(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {!props.tx &&props.investor && props.investor.profits && props.investor.profits[props.index] &&
                        <Row className="mb-3">
                        
                    <Form.Group controlId="formGridEmail">
                        <Form.Label> {props.index + 1}'s worth : </Form.Label >
            <Form.Control  value={props.investor.profits[props.index].amount} onChange={(e) => props.handleProfitChange(e.target.value, props.index,'amount', props.i)} />
          </Form.Group>      
                    < Form.Group as={Col}  >    <Form.Check 
                    type="switch"
                    id="custom-switch"
                    label="is this capital return?"
                    checked={props.investor.profits[props.index].capital}
            
                    onChange={(e) => props.investor.profits[props.index].capital ? props.handleProfitChange(false, props.index,'capital', props.i) : props.handleProfitChange(true, props.index,'capital', props.i)}
                  />        </Form.Group>
          
                    
                      </Row>
 }
       {props.tx && props.investor && props.investor.tax_brackets && props.investor.tax_brackets[props.index] &&
                        <Row className="mb-3">
                        
                  <Form.Label> {props.index + 1}'s worth : </Form.Label >
          <Form.Group controlId="formGridEmail">
            <Form.Control  value={props.investor.tax_brackets[props.index].tax_rate} onChange={(e) => props.handleTaxChange(e.target.value, props.index,'tax_rate', props.i)} />
          </Form.Group>
          <Form.Group as={Col}  >
              <Form.Label> Order which taxes should be first.</Form.Label >
              <Form.Control  value={props.investor.tax_brackets[props.index].order} id={props.index}  onChange={(e) => props.handleTaxChange(e.target.value, props.index,'order', props.i)}/>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
          <Form.Check 
          type="switch"
          id="custom-switch"
          label="Tax Capital returned?"
          checked={props.investor.tax_brackets[props.index].on_capital}
  
          onChange={(e) => props.investor.tax_brackets[props.index].on_capital ? props.handleTaxChange(false, props.index,'on_capital', props.i) : props.handleTaxChange(true, props.index,'on_capital', props.i)}
        />        </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
          <Form.Check 
          type="switch"
          id="custom-switch"
          label="Tax on total earnings?"
          checked={props.investor.tax_brackets[props.index].on_original}
  
          onChange={(e) => props.investor.tax_brackets[props.index].on_original ? props.handleTaxChange(false, props.index,'on_original', props.i) : props.handleTaxChange(true, props.index,'on_original', props.i)}
        />        </Form.Group>

          
                      </Row>
 }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditTable