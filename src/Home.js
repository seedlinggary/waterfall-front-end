import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Figure from 'react-bootstrap/Figure';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';

const Home = () => {
    const [index, setIndex] = useState(0);
    const mystyle = {
        color: "white",
        backgroundColor: "#f4f4f4",
        padding: "10px",
      };
      const mainboxstyle = {
        color: "black",
        padding: "10px",
        backgroundColor: "#d4f6f0",

      };
      const bottomstyle = {
        color: "black",
        padding: "10px",
        backgroundColor: "#f4f4f4",

      };
    //   const mainboxstyle = {
    //     color: "black",
    //     padding: "10px",
    //     backgroundColor: "#f4f4f4",

    //   };
    //   const bottomstyle = {
    //     color: "black",
    //     padding: "10px",
    //     backgroundColor: "#f4f8fc",

    //   };
      
      
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    const navigate = useNavigate();
  function handleClick(path) {
    navigate(path);
  }
    return ( 
        <>
        <div style={mystyle}>
                <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
      <Figure>
      <Figure.Image
        width={710}
        height={200}
        // alt="171x180"
        alt='header background'
        src={require('./pictures/jason-hawke-iSmekgHuBN4-unsplash.jpg')}
      />
    </Figure>
       

      </Carousel.Item>
      <Carousel.Item>
       <Figure>
      <Figure.Image
        width={600}
        height={200}
        alt='header background'
        src={require('./pictures/samuel-jeronimo-I3itbpJLA4g-unsplash.jpg')}
      />
    
    </Figure>
       
      </Carousel.Item>
     
      <Carousel.Item>
      <Figure>
      <Figure.Image
        width={730}
        height={200}
        alt='header background'
        src={require('./pictures/sam-jotham-sutharson-ZUlFdRghSz8-unsplash.jpg')}
      />
    </Figure>
       

      </Carousel.Item>
    </Carousel>
    <Row>
        <Col></Col>
        <Col xs={9}>    <Card className="text-center" bg="dark"key="Info" text="white">
      <Card.Body>
        <Card.Title><h2>Welcome To Distribution Resolution</h2></Card.Title>
        <Card.Text>
         We help you calculate distributions to your investors.
        </Card.Text>
        <Button variant="outline-primary" onClick={() => handleClick("calculator")}>Calculator</Button>
      </Card.Body>
     
    </Card>
</Col>
        <Col></Col>
        <h1></h1>
       
        </Row>
        </div>  

        <Container>
        <h1></h1>
       <br></br>
        <Row>
        <Col sm={{ span: 5, offset: 1 }}>
           <Row>
        <Col sm={{ span: 6, offset: 0 }}> <Figure>
      <Figure.Image
        width={1710}
        height={1800}
        alt="card"
        src={require('./pictures/sketching.jpg')}
      />
      
    </Figure></Col>
        <Col sm={{ span: 6, offset: 0 }}><h2> Create and edit waterfall distributions in seconds with our templates.</h2></Col>
      </Row>
      </Col>
        <Col sm={{ span: 5, offset: 1 }}> 
        <Row>
        <Col sm={{ span: 6, offset: 0 }}><Figure>
      <Figure.Image
        width={1710}
        height={1800}
        alt="card"
        src={require('./pictures/kelly-sikkema-HymOWIY2o3s-unsplash.jpg')}
      />
      
    </Figure></Col>
        <Col sm={{ span: 6, offset: 0 }}><h4> Easily understand all different types of waterfalls and how they would affect your different cash flows.</h4></Col>
      </Row>
</Col>
      </Row>
      <h1></h1>
      <Row>
        <Col sm={{ span: 5, offset: 1 }}>
        <Row>
        <Col sm={{ span: 6, offset: 0 }}><Figure>
      <Figure.Image
        width={1710}
        height={1800}
        alt="card"
        src={require('./pictures/afshin-t2y-9iMwtLr1WvI-unsplash.jpg')}
      />
      
    </Figure></Col>
        <Col sm={{ span: 6, offset: 0 }}><h4> Send these waterfalls to clients or co-workers so they can see exactly what the breakdown is and how they can make money.</h4></Col>
      </Row>
      </Col>
        <Col sm={{ span: 5, offset: 1 }}>
        <Row>
        <Col sm={{ span: 6, offset: 0 }}><Figure>
      <Figure.Image
        width={1710}
        height={1800}
        alt="card"
        src={require('./pictures/new-data-services-0tSiofevpUs-unsplash.jpg')}
      />
      
    </Figure></Col>
        <Col sm={{ span: 6, offset: 0 }}><h4> A comprehessive system that has all of your data in one place.</h4></Col>
      </Row></Col>
      </Row>
      <h1></h1>
       <br></br>
    </Container>
      <div style={mainboxstyle}>
    
      <Row>
 
        <Col md={{ span: 5, offset: 1 }}>  
        <h1></h1>
        <br></br>
        <h1></h1>
        <br></br>
        <h1></h1>
        <br></br>
        <h1></h1>
        <br></br>
        <h1></h1>
        <br></br>
        <h1></h1>
        <br></br>
        <h1></h1>
        <br></br>
        <Card>
      <Card.Body>
        <Card.Title> Before checking out the calculator, make sure you know how everything works and what you are expected to do.</Card.Title>
        <Card.Text>
         
        </Card.Text>
        <Button variant="primary" onClick={() => handleClick("workflow")}>Work Flow</Button>
      </Card.Body>
    </Card></Col>
        <Col md={{ span: 3, offset: 2 }}>   <img
          className="d-block w-100"
          src={require('./pictures/sketching.jpg')}
                    alt="Second slide"
        /></Col>
      </Row>
      <h1></h1>
       <br></br>

      <Row>
        <Col md={{ span: 3, offset: 1 }}> 
        <img
          className="d-block w-100"
          src={require('./pictures/afshin-t2y-9iMwtLr1WvI-unsplash.jpg')}
                    alt="Second slide"
        />
    </Col>
        <Col md={{ span: 5, offset: 2 }}>  
        <h1></h1>
        <br></br>
        <h1></h1>
        <br></br>
        <h1></h1>
        <br></br>
        <h1></h1>
        <br></br>
        <h1></h1>
        <br></br>
        <h1></h1>
        <br></br>
        <h1></h1>
        <br></br>
        <Card>
      <Card.Body>
        <Card.Title>See what we are all about!</Card.Title>
        <Card.Text>
         
        </Card.Text>
        <Button variant="primary" onClick={() => handleClick("about")}>About</Button>
      </Card.Body>
    </Card></Col>
      </Row>
      <h1></h1>
       <br></br>

      <Row>
        <Col md={{ span: 5, offset: 1 }}> 
        <h1></h1>
        <br></br>
        <h1></h1>
        <br></br>
        <h1></h1>
        <br></br>
        <h1></h1>
        <br></br>
        <h1></h1>
        <br></br>
        <h1></h1>
        <br></br>
        <h1></h1>
        <br></br> <Card>
      <Card.Body>
        <Card.Title> Contact Us. We would like to hear from you!</Card.Title>
        <Card.Text>
         
        </Card.Text>
        <Button variant="primary" onClick={() => handleClick("contact")}>Contact</Button>
      </Card.Body>
    </Card></Col>
        <Col md={{ span: 3, offset: 2 }}>   <img
          className="d-block w-100"
          src={require('./pictures/kelly-sikkema-HymOWIY2o3s-unsplash.jpg')}
                    alt="Second slide"
        /></Col>
      </Row>
  
     
      </div>
      <div style={bottomstyle}>
        <h1></h1>
        <br></br>
      <Row>
      <Col md={{ span: 2, offset: 2 }}>    <Card >
      <Card.Img variant="top" alt='card' src={require('./pictures/brian-tromp-B4VXQIJ_oew-unsplash.jpg')} />
      <Card.Body>
        <Card.Title>Mom's Review</Card.Title>
        <Card.Text>
         "I couldn't believe my eyes. It all made sense and happened so quickly."
        </Card.Text>
      </Card.Body>

   
    </Card></Col>  <Col md={{ span: 2, offset: 1 }}>    <Card>
      <Card.Img variant="top" alt="card" src={require('./pictures/m-cooper-vwIthdobS3o-unsplash.jpg')} />
      <Card.Body>
        <Card.Title>Adina's Review</Card.Title>
        <Card.Text>
          "So many features. It took a second to understand exactly how to edit and use. Now I can't work without it."
        </Card.Text>
      </Card.Body>

     
    </Card></Col>  <Col md={{ span: 2, offset: 1 }}>    <Card >
      <Card.Img alt="card" variant="top"  src={require('./pictures/jakob-owens-DhS2f0QO7z4-unsplash.jpg')} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>

    </Card></Col>  
               </Row>
      </div>
        </>
     );
}
 
export default Home;