import React, {  useState,useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const User = () => {
  const [inquiererName, setInquirerName] = useState("JoeShmo")
  const [bodyEmail, setBodyEmail] = useState('mybody')
  const [email, setEmail] = useState('myemail@gmail.com')

  const handleNameChange = e => {
    e.preventDefault();
 
    setInquirerName(s => {
      var subjectEncoded = encodeURIComponent(e.target.value);
      return subjectEncoded;
    });
  };
  const handleBodyChange = e => {
    e.preventDefault();
 
    setBodyEmail(s => {
      var subjectEncoded = encodeURIComponent(e.target.value);
      return subjectEncoded;
    });
  };
  const handleEmailChange = e => {
    e.preventDefault();
 
    setEmail(s => {
      var subjectEncoded = encodeURIComponent(e.target.value);
      return subjectEncoded;
    });
  };
  const buttonstyle = {
    // display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '7px',
    textAlign: 'center',
    outline: 'none',
    textDecoration: 'none !important',
    color: '#ffffff ',
    width: '200px',
    height: '32px',
    borderRadius: '16px',
    backgroundColor: '#0A66C2',
    fontFamily: '"SF Pro Text", Helvetica, sans-serif',
    textDecoration: 'none',
  };

    return ( 
        <div >
          <h1></h1>
          <br></br>
<Row>
<Col></Col>
<Col xs={9}>  

<Card className="text-center" bg="dark"key="Info" text="white">
<Card.Body>
<Card.Text>
<h3> If you notice any errors or discrepencies, please contact me at Gary@distributionresolution.com or (201) 685 3403.</h3>
             <h3> Please give me feedback on how I could improve this website. Your help is greatly appreciated.</h3>
             <a
    style={buttonstyle}
    href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=gary-schwartz-749941211"
    target="_blank"
    >
    Follow me on LinkedIn
  </a>
</Card.Text>
</Card.Body>

</Card>
</Col>
<Col></Col>
<h1></h1>
<br></br>
</Row>

             <Row>
        <Col xs={{ span: 3, offset: 1 }}> 
        <img
          className="d-block w-100"
          src={require('./pictures/artem-riasnianskyi-lYnGCjTCRj4-unsplash.jpg')}
                    alt="Second slide"
        />
    </Col>
        <Col xs={{ span: 5, offset: 2 }}> 
     
      <Form>
   <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Smith.Joe@email.com" onChange={handleEmailChange}/>
        </Form.Group>

        <Form.Group as={Col} >
          <Form.Label>Name</Form.Label>
          <Form.Control placeholder="Joe Smith"  onChange={handleNameChange} />
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Your message</Form.Label>
        <Form.Control as="textarea" rows={3}  placeholder="Your Message" onChange={handleBodyChange}/>
      </Form.Group>
      <Button variant="outline-primary" type="submit"  href={`mailto:seedling.gary@gmail.com?subject=Website%20email%20from:%20${inquiererName}%20${email}&body=${bodyEmail}`}>
        Send Feedback
      </Button>
    </Form>
   
    </Col>
      </Row>
      <h1></h1>
          <br></br><h1></h1>
          <br></br>
          <h1></h1>
          <br></br>
          <h1></h1>
          <br></br>
        </div>   
     );
}
 
export default User;



