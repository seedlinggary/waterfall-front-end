import React, {  useState,useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure';

const User = () => {


    return ( 
        <div >
                  <h1></h1>
        <br></br>

                   <Row>
        <Col></Col>
        <Col xs={9}>  
        
        <Figure>
      <Figure.Image
        width={710}
        height={800}
        alt="171x180"
        src={require('./pictures/ben-spray-gEvMA8O6Et4-unsplash.jpg')}
      />
    
    </Figure>
        {/* <Card.Img variant="top" src={require('./pictures/ben-spray-gEvMA8O6Et4-unsplash.jpg')} /> */}
        
        <h3>Here at Distribution Resolution, we are all about making your life easier. We take complex problems and give you answers. We streamline productivity to save you time and money. When someone has all of their data in one place, not only does it streamline productivity, it creates the ability for smarter decision making.</h3>
     
</Col>
        <Col></Col>
        <h1></h1>
        <br></br>
        <h1></h1>
        <br></br>
        <div>
      <Row>
      <Col md={{ span: 2, offset: 2 }}>    <Card >
          
      <Card.Img variant="top"  src={require('./pictures/brian-tromp-B4VXQIJ_oew-unsplash.jpg')} />
      <Card.Body>
        <Card.Title>Mom's Review</Card.Title>
        <Card.Text>
         "I couldn't believe my eyes. It all made sense and happened so quickly."
        </Card.Text>
      </Card.Body>

   
    </Card></Col>  <Col md={{ span: 2, offset: 1 }}>    <Card>
      <Card.Img variant="top"  src={require('./pictures/m-cooper-vwIthdobS3o-unsplash.jpg')} />
      <Card.Body>
        <Card.Title>Adina's Review</Card.Title>
        <Card.Text>
          "So many features. It took a second to understand exactly how to edit and use. Now I can't work without it."
        </Card.Text>
      </Card.Body>

     
    </Card></Col>  <Col md={{ span: 2, offset: 1 }}>    <Card >
      <Card.Img variant="top"  src={require('./pictures/jakob-owens-DhS2f0QO7z4-unsplash.jpg')} />
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
        </Row>
        <h1></h1>
        <br></br>
  
        </div>   
     );
}
 
export default User;