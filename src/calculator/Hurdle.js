import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
const Hurdle = ({arr, setArr}) => {
  
    // const inputArr = [
    //     {
    //         value: {'hurdle' : .08,
    //                 'sponsor_percent' : 0,
    //                 'limited_partner_percent' : 1},
    //                 type: "",
    //     id: 0       },
    
    
    //   ];
    //     const [arr, setArr] = useState(inputArr);

    const deleteHurdle = e => {
        setArr(hurdles=> hurdles.filter((s,i)=>(i != e.target.id)))
          }
  
    const addInput = () => {
        setArr(s => {
          const lastId = s[s.length - 1].id;
          return [
            ...s,
            {
                value: {'limited_partner_percent' : 0,
                        'sponsor_percent' : 1,
                    'hurdle' : 0.0},
                    type: ""
            }
          ];
        });
      };

      const handleLPChange = e => {
        e.preventDefault();
        let index = e.target.id;
        if (e.target.id > 0){
            index = e.target.id
        }else{
            index = 0
        }
        setArr(s => {
          const newArr = s.slice();
          newArr[index].value.limited_partner_percent = e.target.value;
    
          return newArr;
        });
      };   
      const handleGPChange = e => {
        e.preventDefault();
    
        let index = e.target.id;
        if (e.target.id > 0){
            index = e.target.id
        }else{
            index = 0
        }
        setArr(s => {
          const newArr = s.slice();
          newArr[index].value['sponsor_percent'] = e.target.value;
    
          return newArr;
        });
      };
      const handleIRRChange = e => {
        e.preventDefault();
    
        let index = e.target.id;
        if (e.target.id > 0){
            index = e.target.id
        }else{
            index = 0
        }
        setArr(s => {
          const newArr = s.slice();
          newArr[index].value['hurdle'] = e.target.value;
          return newArr;
        });
      };
              
            return ( 
        <div > 
 

    <Button  variant="primary" onClick={addInput}>add more  hurdles</Button>
    <p> The first hurdle will be the preferred return.</p>
      {arr.map((item, i) => {
                    return (
                        
        <div>
           {i == 0 && <h3>Preferred Return: </h3>}
           {i != 0 && <h3>Hurdle {i}: <Button variant="danger" id={i} onClick={deleteHurdle}>
            Delete Hurdle
          </Button> </h3>}
                  <Row className="mb-3">
                  {i != 0 && <>   <Form.Group as={Col}  >
              <Form.Label>LP's take of the cut </Form.Label >
              <Form.Control  value={item.value.limited_partner_percent} id={i}  onChange={handleLPChange}/>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>GP's take of the cut (Promote amount)</Form.Label>
              <Form.Control  value={item.value.sponsor_percent}  id={i} onChange={handleGPChange}/>
            </Form.Group></>}
           
            <Form.Group as={Col} >
              <Form.Label>Hurdle top amount</Form.Label>
              <Form.Control  value={item.value.hurdle} id={i} onChange={handleIRRChange} />
            </Form.Group>
            </Row>
      </div>
                    )
      })} 
   
      </div>   
    )
}
 
export default Hurdle;