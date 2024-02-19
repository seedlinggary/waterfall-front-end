import React, { useState,useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Figure from 'react-bootstrap/Figure';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, Link, useLocation  } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import {reactLocalStorage} from 'reactjs-localstorage';
import useFetch from '../useFetch';
import apiRequest from '../ApiRequest'

const InvestmentDetails = ({}) => {
    let email = reactLocalStorage.get('email')
    // const { company } =useParams();
    const location = useLocation()
    const [dealInvestments, setDealInvestments] = useState()
    const [totalInvested, setTotalInvested] = useState(0)
    const [totalReturned, setTotalReturneds] = useState(0)

    const dealInfo = location.state 
    const mystyle = {
        color: "white",
        backgroundColor: "#f4f4f4",
        padding: "10px",
      };

            
      let cookie = reactLocalStorage.get('cookie')
      const requestOptions = {
          method: 'GET',
          headers: { 
          'x-access-token': cookie},
      };
  
    //   const { data: deals, error, isPending} = useFetch(`/deal/${company.id}` , requestOptions)


    const navigate = useNavigate();
    function handleClick(path) {
        navigate(path);
      }

        



    return ( 
        <>
        <div style={mystyle}>
    <Row>
        <Col></Col>
        <Col xs={9}>    <Card className="text-center" bg="dark"key="Info" text="white">
      <Card.Body>
        <Card.Title><h2>Welcome To your investments </h2></Card.Title>
        <Card.Text>
          Here are all of your Investments. 
        </Card.Text>
        <Button variant="outline-primary" onClick={() => handleClick("parentcombined")}>Profit Distributor</Button>
      </Card.Body>
     
    </Card>
</Col>
        <Col></Col>
        <h1></h1>
       
        </Row>
        </div>  

        {dealInfo && dealInfo.map((investment, i) => {
                            return (
                                <>

                                Invested amount {investment.distribution.total_value}
                                Investment date  {investment.distribution.date_funds_recieved}
                                    {/* hello you are a {company.profession.name} */}

                            </>
                                    )
                    })} 
        </>
     );
}
 
export default InvestmentDetails;