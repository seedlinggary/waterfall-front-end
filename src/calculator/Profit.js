import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";

const Profit = ({ profit, setProfit}) => {
  const [years, setYears] = useState(4)
  const [startingAmount, setStartingAmount] = useState(2000)
  const [mulitplicationAmount, setMulitplicationAmount] = useState(.02)

    const addMultiYears = e =>{
      let sumTotal = startingAmount
      let newProfit = [
        {
          value: {'profit' : startingAmount},
                  type: "",
      id: 0       }

      ];
      for (let i = 0; i < years - 1 ; i++) {
        sumTotal = sumTotal * (Number(mulitplicationAmount) + 1)
        newProfit.push({
          value: {'profit' : sumTotal},
                  type: "",
      id: i +1       })
      }
      setProfit(newProfit)
    }
    const deleteYear = e => {
      setProfit(profits=> profits.filter((s,i)=>(i != e.target.id)))
        }

    const addProfit = () => {
        setProfit(s => {
          const lastId = s[s.length - 1].id;
          return [
            ...s,
            {
                value: {'profit' : 1000},
                    type: "",
            }
          ];
        });
      };

      const handleProfitChange = e => {
        e.preventDefault();
        let index = e.target.id;
        if (e.target.id > 0){
            index = e.target.id
        }else{
            index = 0
        }

        setProfit(s => {
          const newProfit = s.slice();
          newProfit[index].value.profit = e.target.value;
    
          return newProfit;
        });
      };
            
        
            return ( 
 
                <>
                   <Row className="mb-3">
        
        {/* <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>% owned by this waterfall</Form.Label>
            <Form.Control  placeholder={percentage_investment_owned} onChange={(e) => setPercentageInvestmentOwned(e.target.value)} />
          </Form.Group>         */}
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Years would like to add</Form.Label>
            <Form.Control  placeholder={years} onChange={(e) => setYears(e.target.value)} />
          </Form.Group>        
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>First years worth of profit</Form.Label>
            <Form.Control  placeholder={startingAmount} onChange={(e) => setStartingAmount(e.target.value)} />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Profit percentage increase per year</Form.Label>
            <Form.Control  placeholder={mulitplicationAmount} onChange={(e) => setMulitplicationAmount(e.target.value)} />
          </Form.Group>  
        </Row>
        <Button  variant="outline-primary" onClick={addMultiYears}>add Multiple years</Button>

      {profit.map((item, i) => {
                    return (
                        
        <div key={i}>
                  <Row className="mb-3">
              <Form.Group as={Col}  >
              <Form.Label>Year {i + 1}'s worth of profit: {profit.length > 1 &&<Button variant="danger" id={i} onClick={deleteYear}>
            Delete Year
          </Button> } </Form.Label >
              <Form.Control  placeholder={item.value.profit} id={i}  onChange={handleProfitChange}/>
            </Form.Group>
            
          
            </Row>
      </div>
                    )
      })} 
          <Button  variant="outline-primary" onClick={addProfit}>add one more year of profit</Button>
          </>
    )
}
 
export default Profit;