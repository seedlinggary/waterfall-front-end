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

const InvestorHome = ({}) => {
    let email = reactLocalStorage.get('email')
    // const { company } =useParams();
    const location = useLocation()
    const [dealInvestments, setDealInvestments] = useState()
    const [totalInvested, setTotalInvested] = useState(0)
    const [totalReturned, setTotalReturneds] = useState(0)

    const investments = location.state 
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
      function GetOrginizedInvestments(investments) {
        let ogranizedByDeal = {}
        let total_invested = 0
        let total_returned = 0
        investments.map((investment, i) => {
            // !("key" in obj)
            // if (!ogranizedByDeal[investment.distribution.del_id]){
              if (investment.distribution){
                if (!(investment.distribution.deal_id in ogranizedByDeal)){

                ogranizedByDeal[investment.distribution.deal_id] = [investment]
            }else {
                ogranizedByDeal[investment.distribution.deal_id].push(investment)
            }
            total_invested += investment.distribution.total_value
            investment.distribution.profits.map((profit, i) => {
                total_returned += profit.payed_distributions
            })
          }
        })
        // let  investTotal = investment.distribution.total_value +
        setDealInvestments(ogranizedByDeal)
        setTotalReturneds(total_returned)
        setTotalInvested(total_invested)

      }
        


      useEffect(() => {
        console.log(investments)
        if (investments){
            GetOrginizedInvestments(investments)
        }
      }, []);

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
        <Link to={`/ChartHome/`} state={investments}>
    
    <h5> Investment Details</h5>
    </Link>
      </Card.Body>
     
    </Card>
</Col>
        <Col></Col>
        <h1></h1>
       
        </Row>
        </div>  
        <Row>
        <Col md={{ span: 10, offset: 1 }}>  
      
        <h1> total invested: {totalInvested}</h1>
        <h1> total returned: {totalReturned}</h1>
        <Accordion defaultActiveKey={['0']} alwaysOpen>
        {investments && investments.map((investment, i) => {
          {investment.distribution && <>
            return (
                <Accordion.Item eventKey={i}>

                <Accordion.Header>{investment.user.email}</Accordion.Header>
                <Accordion.Body>

                Invested amount {investment.distribution.total_value}
                Investment date  {investment.distribution.date_funds_recieved}
                deal id  {investment.distribution.deal_id}
                {/* <Link to={`/dealhome/`} state={{'company': company, 'deal':deal}}>
 
                <h5> deal {deal.name}</h5>
                </Link> */}
                    {/* hello you are a {company.profession.name} */}
                </Accordion.Body>
              </Accordion.Item>
                    )</>}
      })} 
      
              {dealInvestments && Object.entries(dealInvestments).map( ([deal_id, deal],i) => {
            return (
                <Accordion.Item eventKey={i}>
                    <Accordion.Header>{deal[0].user.email} {deal_id}</Accordion.Header>
                <Accordion.Body>


                    <Link to={`/InvestmentDetails/`} state={deal}>
    
                    <h5> Investment Details</h5>
                    </Link>
              {deal && deal.map((investment, i) => {
                            return (
                                <>

                                Invested amount {investment.distribution.total_value}
                                Investment date  {investment.distribution.date_funds_recieved}
                                    {/* hello you are a {company.profession.name} */}

                            </>
                                    )
                    })} 
                </Accordion.Body>
              </Accordion.Item>
                    )
      })} 



    </Accordion>
    </Col>
    </Row>

        </>
     );
}
 
export default InvestorHome;