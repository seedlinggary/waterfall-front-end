import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
 
// CSS Modules, react-datepicker-cssmodules.css// 
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
const Profit = ({ profit, setProfit,profitFrequency, setProfitFrequency}) => {
  const [years, setYears] = useState(4)
  const [startingAmount, setStartingAmount] = useState(2000)
  const [mulitplicationAmount, setMulitplicationAmount] = useState(.02)
  const [dateMulitplicationAmount, setDateMulitplicationAmount] = useState(1)
  const [typeDateMultiplicationAMount, setTypeDateMulitplicationAmount] = useState("year")
  const [rate, setRate] = useState(profitFrequency.rate)
  const [startDate, setStartDate] = useState(profitFrequency.rate.set_date)
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  function addDateMultiplication(datesumTotal) {
    if (typeDateMultiplicationAMount == 'year'){
      var newdatesumTotal  = new Date(datesumTotal.setFullYear(datesumTotal.getFullYear() + dateMulitplicationAmount));
   } else if(typeDateMultiplicationAMount == 'quater') {
    var newdatesumTotal  = new Date(datesumTotal.setMonth(datesumTotal.getMonth() + (dateMulitplicationAmount * 3)));
   } else if(typeDateMultiplicationAMount == 'month') {
    var newdatesumTotal  = new Date(datesumTotal.setMonth(datesumTotal.getMonth() + dateMulitplicationAmount));
   } else if(typeDateMultiplicationAMount == 'day') {
    var newdatesumTotal  = new Date(datesumTotal.setDate(datesumTotal.getDate() + dateMulitplicationAmount));
   }
       return newdatesumTotal;
  }
    const addMultiYears = e =>{
      let sumTotal = startingAmount
      let datesumTotal = new Date(profitFrequency.start_date.setFullYear(profitFrequency.start_date.getFullYear() + 0))

      let newProfit = [
        {
          value: {'profit' : startingAmount,
                  'date': datesumTotal},
                  type: "",
      id: 0       }

      ];
      for (let i = 0; i < years - 1 ; i++) {
        sumTotal = sumTotal * (Number(mulitplicationAmount) + 1)
        datesumTotal = addDateMultiplication(datesumTotal)
        newProfit.push({
          value: {'profit' : sumTotal,
                  'date': datesumTotal},
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
          // const lastId = s[s.length - 1].id;
          const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
          return [
            ...s,
            {
                value: {'profit' : 1000,
                          'date' : today},
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
 
      function handleDateChange(date, index) {
        setProfit(s => {
              const newProfit = s.slice();
              newProfit[index].value.date = date;
        
              return newProfit;
            });
      }
      const handleRateChange = e => {
  
        setProfitFrequency(s => {
          const newProfit = s;
          newProfit.rate = e.target.value;
          setRate(e.target.value)
          return newProfit;
        });

      };
      const handleStartDateChange = e => {
 
        setProfitFrequency(s => {
          const newProfit = s;
          newProfit.start_date = e;
          setStartDate(e)
          return newProfit;
        });
      };
         
        
            return ( 
 
                <>
                   <Row className="mb-3">
                   <Form.Group as={Col} >
      <Form.Label>Frequency of profit</Form.Label>
      <Form.Select aria-label="Default select example"   onChange={handleRateChange}>
            <option value={profitFrequency.rate}>{profitFrequency.rate } </option>
            <option value="Year">Year </option>
            <option value="Month">Month</option>
            <option value="Quater">Quater</option>
            <option value="Personalize">Personalize</option>
        </Form.Select>
        </Form.Group>
        {profitFrequency.rate  == 'Personalize' && 
            <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Start Date of given profit</Form.Label>
             <DatePicker selected={profitFrequency.start_date}  onChange={handleStartDateChange}  />
          </Form.Group>  
          }      
        </Row> 
       
        <Row className="mb-3">
        <hr></hr>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>{profitFrequency.rate }s would like to add</Form.Label>
            <Form.Control  value={years} onChange={(e) => setYears(e.target.value)} />
          </Form.Group>        
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>First {profitFrequency.rate }s worth of profit</Form.Label>
            <Form.Control  value={startingAmount} onChange={(e) => setStartingAmount(e.target.value)} />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Profit percentage increase per {profitFrequency.rate }</Form.Label>
            <Form.Control  value={mulitplicationAmount} onChange={(e) => setMulitplicationAmount(e.target.value)} />
          </Form.Group>  
        </Row>
        {profitFrequency.rate  == 'Personalize' &&
        <Row className="mb-3">

        <Form.Group as={Col} >
      <Form.Label>How often should profit be given</Form.Label>
      <Form.Select aria-label="Default select example"   onChange={(e) => setTypeDateMulitplicationAmount(e.target.value)}>
            <option value={typeDateMultiplicationAMount}>{typeDateMultiplicationAMount } </option>
            <option value="year">Year </option>
            <option value="month">Month</option>
            <option value="quater">Quater</option>
            <option value="day">Days</option>
        </Form.Select>
        </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>How many {typeDateMultiplicationAMount}s between each profit?</Form.Label>
            <Form.Control  value={dateMulitplicationAmount} onChange={(e) => setDateMulitplicationAmount(e.target.value)} />
          </Form.Group> 
          
        </Row>
}
        <Button  variant="outline-primary" onClick={addMultiYears}>add multiple {profitFrequency.rate }s</Button>
        <p></p> 
          <hr></hr>
      {profit.map((item, i) => {
                    return (
                        
        <div key={i}>
                  <Row className="mb-3">
              <Form.Group as={Col}  >
              <Form.Label>{profitFrequency.rate } {i + 1}'s worth of profit: {profit.length > 1 &&<Button variant="danger" id={i} onClick={deleteYear}>
            Delete {profitFrequency.rate }
          </Button> } </Form.Label >
              <Form.Control  value={item.value.profit} id={i}  onChange={handleProfitChange}/>
            </Form.Group>
            {profitFrequency.rate == 'Personalize' && 
            <Form.Group as={Col} controlId="formGridEmail" >
            <Form.Label>Date of given profit</Form.Label>
            <DatePicker selected={item.value.date} onChange={(date) => handleDateChange(date, i)} />

          </Form.Group>  
          }
            </Row>
      </div>
                    )
      })} 
          <Button  variant="outline-primary" onClick={addProfit}>add one more {profitFrequency.rate } of profit</Button>
          </>
    )
}
 
export default Profit;


