import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Figure from 'react-bootstrap/Figure';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom";
const Workflow = () => {
     const navigate = useNavigate();
     function handleClick(path) {
       navigate(path);
     }
     const numstyle = {
          color: "black",
          fontSize: "100px",
          padding: "10px",
        };
    return ( 
        <div >
                  <h1></h1>

            <Row>
        <Col></Col>
        <Col xs={9}>  
        
          <Card className="text-center" bg="dark"key="Info" text="white">
      <Card.Body>
        <Card.Title>Welcome to the Work Flow</Card.Title>
        <Card.Text>
         We are going to go through step by step each part of the process of making your own waterfall.
         Please check out the definitions page so you can understand each of the options.
        </Card.Text>
        <Button variant="outline-primary" onClick={() => handleClick("/calculator")}>Calculator</Button>
      </Card.Body>
     
    </Card>
</Col>
        <Col></Col>
        <h1></h1>
       
        </Row>
        <Row>
        <Col xs={{ span: 5, offset: 1 }}>
        <Row>
        <Col md={{ span: 1, offset: 8 }} style={numstyle}>1</Col>
      </Row> 
       <h3>You need to know what a waterfall distribution is. If you don't know what it is, Google and Youtube videos can offer great explinations.</h3>
    </Col>
        <Col xs={{ span: 3, offset: 2 }}>   <img
          className="d-block w-100"
          src={require('./pictures/new-data-services-0tSiofevpUs-unsplash.jpg')}
                    alt="Second slide"
        /></Col>
      </Row>
      <Row>
        <Col xs={{ span: 3, offset: 1 }}> 
        <img
          className="d-block w-100"
          src={require('./pictures/afshin-t2y-9iMwtLr1WvI-unsplash.jpg')}
                    alt="Second slide"
        />
    </Col>
        <Col xs={{ span: 5, offset: 2 }}> 
        <Row>
        <Col md={{ span: 1, offset: 2 }} style={numstyle}>2</Col>
      </Row> 
      <h3>Even if you know what a waterfall distribution is, there are many different types. It is a good idea to look over all of the possible inputs and see what you can (or cannot) do.</h3>

        <Button variant="primary" onClick={() => handleClick("/definitions")}>definitions</Button>
   
    </Col>
      </Row>

      <Row>
        <Col xs={{ span: 5, offset: 1 }}>
        <Row>
        <Col md={{ span: 1, offset: 8 }} style={numstyle}>3</Col>
      </Row> 
      <h3>Now we will go over to the calculator and start with the years of profit. Add in the profit amount. To add a year, press the blue button. You can also add in many years at one time with incremental increases to both the amount and time.</h3>
</Col>
        <Col xs={{ span: 3, offset: 2 }}>   <img
          className="d-block w-100"
          src={require('./pictures/kelly-sikkema-HymOWIY2o3s-unsplash.jpg')}
                    alt="Second slide"
        /></Col>
      </Row>
      <Row>
        <Col xs={{ span: 3, offset: 1 }}> 
        <img
          className="d-block w-100"
          src={require('./pictures/sketching.jpg')}
                    alt="Second slide"
        />
    </Col>
        <Col xs={{ span: 5, offset: 2 }}> 
        <Row>
        <Col md={{ span: 1, offset: 2 }} style={numstyle}>4</Col>
      </Row> 
      <h3>Now the hardest part. If you are new, we recommend you try out our pre built waterfall options, either Promote Waterfall or Cash Flow Waterfall. Make sure you input the top line as well with basic information about your waterfall.</h3>
      </Col>
      </Row>

      <Row>
        <Col xs={{ span: 5, offset: 1 }}>
        <Row>
        <Col md={{ span: 1, offset: 8 }} style={numstyle}>5</Col>
      </Row> 
       <h3>Next will be the splitting of each hurdle. The first split is the Preferred Return. Depending on your selections in the previous section, the GP will or will not get a portion of this. Click the 'add more hurdles' to add more hurdles.</h3>
       </Col>
        <Col xs={{ span: 3, offset: 2 }}>   <img
          className="d-block w-100"
          src={require('./pictures/new-data-services-0tSiofevpUs-unsplash.jpg')}
                    alt="Second slide"
        /></Col>
      </Row>
      <Row>
        <Col xs={{ span: 3, offset: 1 }}> 
        <img
          className="d-block w-100"
          src={require('./pictures/afshin-t2y-9iMwtLr1WvI-unsplash.jpg')}
                    alt="Second slide"
        />
    </Col>
        <Col xs={{ span: 5, offset: 2 }}> 
        <Row>
        <Col md={{ span: 1, offset: 2 }} style={numstyle}>6</Col>
      </Row> 
      <h3> This next section is optional. Many times there can be different fees taken from a distribution in a certain year. This section lets you take portions of profit after reaching certain criteria and set it aside for different companies. </h3>
      </Col>
      </Row>
      <Row>
        <Col xs={{ span: 5, offset: 1 }}>
        <Row>
        <Col md={{ span: 1, offset: 8 }} style={numstyle}>7</Col>
      </Row> 
       <h3>Similar to the previous section, this section is optional as well. This section allows you to divvy up the LP's portion of profit per investor. If using this section, make sure to add in ALL investors. If you do not, it will mess up your waterfall distribution.</h3>
       </Col>
        <Col xs={{ span: 3, offset: 2 }}>   <img
          className="d-block w-100"
          src={require('./pictures/kelly-sikkema-HymOWIY2o3s-unsplash.jpg')}
                    alt="Second slide"
        /></Col>
      </Row>
      <Row>
        <Col xs={{ span: 3, offset: 1 }}> 
        <img
          className="d-block w-100"
          src={require('./pictures/sketching.jpg')}
                    alt="Second slide"
        />
    </Col>
        <Col xs={{ span: 5, offset: 2 }}> 
        <Row>
        <Col md={{ span: 1, offset: 2 }} style={numstyle}>8</Col>
      </Row> 
      <h3> If you would like to see sample inputs, please check the side bar (Sample Inputs button). This will input sample data that you can play around with to see exactly how each of the sections work. </h3>
      </Col>
      </Row>      <Row>
        <Col xs={{ span: 5, offset: 1 }}>
        <Row>
        <Col md={{ span: 1, offset: 8 }} style={numstyle}>9</Col>
      </Row> 
       <h3>Lastly, agree to the terms and conditions and hit the green button to create your distribution. If you added Investors, a seperate tab will appear with their distributions.</h3>
       </Col>
        <Col xs={{ span: 3, offset: 2 }}>   <img
          className="d-block w-100"
          src={require('./pictures/new-data-services-0tSiofevpUs-unsplash.jpg')}
                    alt="Second slide"
        /></Col>
      </Row>
        </div>   
     );
}
 
export default Workflow;