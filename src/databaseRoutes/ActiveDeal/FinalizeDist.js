import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function FinalizeDist(props) {

    function handleaccessChange(data, mortgageInfoType, key,value) {
        let keyvalue = mortgageInfoType.toString()
        let updatedList = props.distributionAnswers
        let floatValue = +data;
        updatedList[key][value.length - 1][`${keyvalue}`] = floatValue
        let updff = updatedList[key]
          props.setDistributionAnswers(prevState => ({
            ...prevState,
            [`${key}`] : updff
        }));
  
        console.log(props.distributionAnswers)
      }

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
        <h4>Centered Modal</h4>
     
            {props.distributionAnswers && Object.entries(props.distributionAnswers).map( ([key, value],index) => {
                return(
                <>

{ value && value[value.length - 1] &&  <Row className="mb-3">
        <h5>{key}</h5>
    {/* new Date(datesumTotal.setFullYear(datesumTotal.getFullYear() + dateMulitplicationAmount)) */}

    <Form.Group as={Col} controlId="formGridEmail">
    <Form.Label>Percentage Ownership {value.length - 2 >= 0 && <> last distributions percentage {value[value.length - 2].percentage_ownership}</>}</Form.Label>
    <Form.Control type="number" value={value[value.length - 1].percentage_ownership} onChange={(e) => handleaccessChange(e.target.value,'percentage_ownership',key,value)}  />
    </Form.Group> 
    { value[value.length - 1].gp_percentage_ownership !== null &&      <Form.Group as={Col} controlId="formGridEmail">
    <Form.Label>GP Percentage Ownership {value.length - 2 >= 0 && <> last distributions percentage {value[value.length - 2].gp_percentage_ownership}</>}</Form.Label>
    <Form.Control type="number" value={value[value.length - 1].gp_percentage_ownership} onChange={(e) => handleaccessChange(e.target.value,'gp_percentage_ownership',key,value)}  />
    </Form.Group> }
    { value[value.length - 1].lp_percentage_ownership !== null &&     <Form.Group as={Col} controlId="formGridEmail">
 <Form.Label>LP Percentage Ownership {value.length - 2 >= 0 && <> last distributions percentage {value[value.length - 2].lp_percentage_ownership}</>}</Form.Label>
    <Form.Control type="number" value={value[value.length - 1].lp_percentage_ownership} onChange={(e) => handleaccessChange(e.target.value,'lp_percentage_ownership',key,value)}  />
    </Form.Group> }
    <Form.Group as={Col} controlId="formGridEmail">
    <Form.Label>Payment will be</Form.Label>
    <Form.Control type="number" value={value[value.length - 1].payed_distributions} />
    </Form.Group>

</Row>}
                </>

                )
     
        
        }
          )}
      
        <Form.Group  controlId="formGridEmail">
          <Form.Check 
          type="switch"
          id="custom-switch"
          label="confirm and save to data"
          checked={props.confirmedDistribution}
          onChange={(e) => props.confirmedDistribution ? props.setConfirmedDistribution(false) : props.setConfirmedDistribution(true)}
        />        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {
              props.sendApi(props.i, props.pid, false)}}>Send Info</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FinalizeDist;