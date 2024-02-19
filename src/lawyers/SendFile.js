import React, { useState, useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Figure from 'react-bootstrap/Figure';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import {reactLocalStorage} from 'reactjs-localstorage';
import useFetch from '../useFetch';
import apiRequest from '../ApiRequest'
import DownloadFile from '../DownloadFile';
import Form from 'react-bootstrap/Form';


const SendFile = () => {
    const [investors_llc, setInvestorsLLC] = useState('MHP INVESTORS LLC')
    const [investorsBelton, setInvestorsBelton] = useState('BELTON')
    const [date, setDate] = useState('November 23, 2018')
    const [investors_llc_location, setInvestorsLLCLocation] = useState('Missouri')
    const [managers_llc, setManagersLLC] = useState('MHP Manager LLC')
    const [managers_llc_location, setManagersLLCLocation] = useState('Illinois')
    const [manager_name, setManagerName] = useState('John Doe')
    const [manager_title, setManagerTitle] = useState('Manager')
    let email = reactLocalStorage.get('email')
    const navigate = useNavigate();

            
      let cookie = reactLocalStorage.get('cookie')
      const requestOptions = {
          method: 'GET',
          headers: { 
          'x-access-token': cookie},
      };
    const { data: companies, error, isPending} = useFetch(`/company` , requestOptions)
    const { data: investments, e, isP} = useFetch(`/investor/investor_investments` , requestOptions)
    const activateProperty = async e => {
        let info = {
            'MHP INVESTORS LLC': investors_llc,
            'BELTON' : investorsBelton,
            'November 23, 2018': date,
            'Missouri' : investors_llc_location,
            'MHP Managr LLC' : managers_llc,
            'Illinois' : managers_llc_location,
            'John Doe' : manager_name,
            'Manager' : manager_title





        }
        let a =  DownloadFile('POST',info,`/lawyer/downloadfile`)
        // navigate(0)
          }
    return (
      <>
      
      {/* <CompanyHome companyt={companies[0]} ></CompanyHome> */}
      {investments && <Link to={`/ChartHome/`} state={investments}>
      
      <h5> Investment Details</h5>
      </Link>}
      <Button
                Button variant="outline-success" size="sm"  onClick={activateProperty}>
            download file
          </Button>


          <Row className="mb-3">

          <Form.Group as={Col}  >
              <Form.Label>11. Proposed Name of FUN/Syndication</Form.Label >
              <Form.Control  value={investors_llc} onChange={(e) => setInvestorsLLC(e.target.value)}/>
            </Form.Group>
            <Form.Group as={Col}  >
              <Form.Label>Belton???</Form.Label >
              <Form.Control  value={investorsBelton} onChange={(e) => setInvestorsBelton(e.target.value)}/>
            </Form.Group>
            <Form.Group as={Col}  >
              <Form.Label>14. Date Organized or incorparated</Form.Label >
              <Form.Control  value={date} onChange={(e) => setDate(e.target.value)}/>
            </Form.Group>
            <Form.Group as={Col}  >
              <Form.Label>12. State of Organization or Incorporation</Form.Label >
              <Form.Control  value={investors_llc_location} onChange={(e) => setInvestorsLLCLocation(e.target.value)}/>
            </Form.Group>
            <Form.Group as={Col}  >
              <Form.Label>2. name GP holding Company</Form.Label >
              <Form.Control  value={managers_llc} onChange={(e) => setManagersLLC(e.target.value)}/>
            </Form.Group>
            <Form.Group as={Col}  >
              <Form.Label>6. State of Organizatioon for the llc/LP</Form.Label >
              <Form.Control  value={managers_llc_location} onChange={(e) => setManagersLLCLocation(e.target.value)}/>
            </Form.Group>
            <Form.Group as={Col}  >
              <Form.Label>9.a. Name of Asset Manager/Holding Company for GP's or Contact</Form.Label >
              <Form.Control  value={manager_name} onChange={(e) => setManagerName(e.target.value)}/>
            </Form.Group>
            <Form.Group as={Col}  >
              <Form.Label>9.b. Conatact Title</Form.Label >
              <Form.Control  value={manager_title} onChange={(e) => setManagerTitle(e.target.value)}/>
            </Form.Group>



            </Row>
      </>
    )
}
 
export default SendFile;