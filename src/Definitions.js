import React, { useState } from 'react'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
const Definitions = () => {
    return ( 
        <div >
                    <h1></h1>
          <Row>
        <Col></Col>
        <Col xs={9}>    <Card className="text-center" bg="dark"key="Info" text="white">
      <Card.Body>
        <Card.Text>
         <h1>Definitions</h1>
        </Card.Text>
      </Card.Body>
     
    </Card>
</Col>
        <Col></Col>
        <h1></h1>
       
        </Row>

        <h3> Here are the definitions and explinations for all of the potential inputs:</h3>
             

             {/* <h5> Note: ALWAYS SET THE PREFERRED RETURN TO 1.0/ 0.0 and hurdle amount</h5> */}
            

             <h5> Note: some inputs are reliable on other inputs</h5>
             <h5> Note: if irr_pari_passu is false, 99% of time you want Hurdle Bar IRR return for LP</h5>
             <h5> Note: Similarly iff irr_pari_passu is True, 99% of time you want Hurdle Bar IRR return for total Invested</h5>
             <h5> Note: Similarly iff irr_pari_passu is False, You can choose to pay the GP capital and GP Princial</h5>
           

             <h5> Note: ALL PERCENTAGES ARE INPUTED AS DECIMAL PLACE NUMBERS FROM 0.0 - 1.0</h5>
             <br></br>

             <Container>
             <Row>
        <Col md={{ span: 3, offset: 3 }}></Col>
                <Tab.Container id="left-tabs-example" defaultActiveKey="second">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column" >
          {/* <Nav.Item>
              <Nav.Link eventKey="first"></Nav.Link>
            </Nav.Item> */}
            <Nav.Item>
              <Nav.Link eventKey="second"  >Year of profit</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third">Waterfall Info</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fourth">Split Hurdle Info</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fifth">Fees</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="sixth">Investors</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
          {/* <Tab.Pane eventKey="first">
                    <Tabs
                defaultActiveKey="profile"
                id="justify-tab-example"
                className="mb-3"
                justify
                >
                <Tab eventKey="home" title="Home">
                <p>dfghdfgdfgh</p>
                </Tab>
                <Tab eventKey="profile" title="hggfh">
                <p>dfghdfgdfgh</p>
                </Tab>
                <Tab eventKey="longer-tab" title="L">
                <p>dfghdfgdfgh</p>
                </Tab>
                
                </Tabs>
            </Tab.Pane> */}
            <Tab.Pane eventKey="second">
      
                <h6>Please input for each year the amount of profit you have made.</h6>
                <h6>Input how frequently you will be paying ditributions</h6>
                <h6>You may also add many years at the same time with increments for both time and money.</h6>
             
                
            </Tab.Pane>
            <Tab.Pane eventKey="third">
            
            <h5> General information about the waterfall</h5>
            {/* <h6>Note: percentage of ownership goes coresponding to how much cash was invested respectively.</h6> */}
            <h7>GP amount sponsored: How much cash did the GP invest for this waterfall distribution.</h7>
             <br></br>

             <h7>LP amout sponsored:  How much cash did the LP invest for this waterfall distribution. (If you put in investors, this section will be ignored.)</h7>
             <br></br>


             <h6>Type of Split: How are the splits going to be calculated</h6>
             

             <h7>Straight Split: how you put it in will how it will be split up, ex: if you set up a split of 80/20 it will be 80/20</h7>
             <br></br>

             <h7>Split plus percentage: The GP/Sponsor Percentage of Leftover Cash will be added to the split, ex: if the GP/SPonsor comitted 10% and the split is 80/20 then the new calculation will actually be 70/30</h7>
             <br></br>

             <h7>Split percentage of owned: The GP/Sponsor Percentage of Leftover Cash will be proportianlly added to the split, ex: if the GP/SPonsor comitted 10% and the split is 80/20 then the new calculation will actually be 72/28 (10% of 80 is added to 20)</h7>
             <br></br>
             <br></br>

             <h6>Way in which to split: Once you have calculated the actual split, how do you calculate how it is split</h6>

             <h7>Hurdle Bar IRR return for total Invested: split the combined amount in thus hurdle according to the split, ex: if you set up a split of 80/20 for 200$ then the split is 160/40</h7>
             <br></br>

             <h7>Hurdle Bar IRR return for LP: The LP gets the whole amount and the GP gets his percentage on top of his cut and the LP's amount, ex:  if you set up a split of 80/20 for 100$ then the lp gets 100 while the GP gets 25$. 25 is 20% of 125.</h7>
             <br></br>
             <br></br>
             <h6>Typle of Hurdle: How will we be doing the math for the hurdle</h6>
             

             <h7>Non Yearly Compound:  the hurdle rate is the same every year no compounding interest </h7>
             <br></br>

             <h7>IRR Yearly Compund: The hurdle compounds interest every year for every hurdle. It will always pay off everything but the capital amount invested then go to the next hurdle.</h7>
             <br></br>

             <h7>Pay Down Capital Paydown IRR: The hurdle compounds interest every year for every hurdle. It will always pay off everything. Once the capital amount invested is changed (by being payed off) it will affect nect years hurdle.</h7>
             <br></br>

             <h7>IRR Parris Passu: Would you like the GP/Sponosor to get his share of the preferred return? IF True it will change given IRR for not only the lp put for the GP as well (NOTE: this has major affects and would love to hear your feedback a: if this is needed b: if this should be split into 2 different catagories)</h7>
             <br></br>

             <h7>Pay GP preferred: If IRR Parris Passu is false would you like to pay the preferred return to the GP or not? </h7>
             <br></br>
             <h7>Pay GP Principal: If IRR Parris Passu is false would you like to pay the capital back to the GP or not? </h7>
             <br></br>

             <h7>Capital Pari Passu: If true, will pay back the capital evenly. If False will pay back the capital first to the LP then GP. </h7>
             <br></br>

             <h7> Principal After preferred: If true, will start paying back the capital starting year 1 after the preferred return is payed. </h7>
             <br></br>

             <h7> Year Start paying back capital: At the beginng of which year would you like to start paying down capital? </h7>
             <br></br>
             <br></br>


                      </Tab.Pane>
            <Tab.Pane eventKey="fourth">
            <h5> General information about each Split</h5>             

             <h6> Note: ALL PERCENTAGES ARE INPUTED AS DECIMAL PLACE NUMBERS FROM 0.0 - 1.0</h6>
             

             <h6> Note: THE LAST HURDLE POINT SHOULD BE 0, THIS WILL MAKE IT TO INCLUDE ALL FUTURE POINTS</h6>

             <h7>LP's take of the cut: Percentage going to the LP  </h7>
             <br></br>
             <h7>GP's take of the cut: Percentage going to the GP  </h7>
             <br></br>
             <h7>Hurdle Point: At what point do you finish this hurdle? </h7>
          </Tab.Pane>
            <Tab.Pane eventKey="fifth">
            <h6>Type of Fee: There are many types of fees.</h6>
             
            <h7>capital: Charge a feee based on capital recieved. This fee is commulitive from year to year.</h7>
             <br></br>
             <h7>catch up: After you return all capital and the preferred return you can charge a fee. This fee is commulitive from year to year.</h7>
             <br></br>

             <h7>Hurdle: After you pass a hurdle you can now charge a fee. This fee is not commulitive from year to year.</h7>
             <br></br>

             <h7>Year you would like to collect: What year would you like to collect this fee in? if youd like to collect it in every year type x.</h7>
             <br></br>
             <h7>Before which hurdle would you like to recieve this fee?: Before which hurdle would like to recieve this fee? the first hurdle is the preferred return</h7>
             <br></br>
             <h7>Name of company that would recieve this fee: Who would you like to recieve this conpensation?</h7>
             <br></br>
             
             <h7>Type Cash or Percentage: Some times you may charge a set fee in cash, other times you may want to charge based on percentage of the hurdle/capital you have just passed.</h7>
             <br></br>
             
             <h7>The amount you would like to recieve: How much would you like to recieve? for percentage write in decimal points.</h7>
             <br></br>

      
                    </Tab.Pane>
            <Tab.Pane eventKey="sixth">
            <h6> Note: If sharing this information with others, use fake names and emails.</h6>

            <h7>Name of investor you are paying back: What is the name of the investor. </h7>
             <br></br>
             <h7>Investor email: What is his email. (currently not being used, but will hopefully implement in future)</h7>
             <br></br>
             <h7>Amount Invested: How much was invested?</h7>
             <br></br>
             
             <h7>Country of Origin: What country is this investor from?</h7>
             <br></br>
             
             <h7>Tax withholding percentage: How much would you like to withhold from this investor on a yearly basis?</h7>
             <br></br>            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>

      </Row>
    </Container>
    <br></br>
    <br></br>

        </div>   
     );
}
 
export default Definitions;