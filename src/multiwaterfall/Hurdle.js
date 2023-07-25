import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
const Hurdle = ({waterfall, setWaterfall ,personId}) => {

  const addHurdle = () => {

    const newHurdle =  
    [...waterfall[personId].splits,
      {'limited_partner_percent' : 0,
      'sponsor_percent' : 1,
  'hurdle' : 0.0}
]
console.log(newHurdle)

const newWaterfall= Object.assign(waterfall[personId],{splits:newHurdle})
setWaterfall(prevState => ({
  ...prevState,
  [`${personId}`]: newWaterfall
}))
};


  const deleteHurdle = e => {
      const newHurdle =  waterfall[personId].splits.filter((s,i)=>(i != e.target.id))
      
      const newWaterfall= Object.assign(waterfall[personId],{splits:newHurdle})
    setWaterfall(prevState => ({
      ...prevState,
      [`${personId}`]: newWaterfall
    }))
    };


    function handleHurdleChange(e, mortgageInfoType) {
      // console.log(!isNaN(parseFloat(e.target)))
      // if(!isNaN(parseFloat(e.target))){
      //   console.log(!isNaN(parseFloat(e.target)))
      // }else{


      let index = e.target.id;
        if (e.target.id > 0){
            index = e.target.id
        }else{
            index = 0
        }
      let keyvalue = mortgageInfoType.toString()
      let updatedList = waterfall[personId].splits.map((item, i) => 
        {
          if (i == index){
            return {...item, [`${keyvalue}`]: e.target.value}; //gets everything that was already in item, and updates "done"
          }
          return item; // else return unmodified item 
        });
        const newWaterfall= Object.assign(waterfall[personId],{splits:updatedList})
setWaterfall(prevState => ({
  ...prevState,
  [`${personId}`]: newWaterfall
}))
      }
              
            return ( 
        <div key={personId}> 
 

    <Button  variant="primary" onClick={addHurdle}>add more  hurdles</Button>
    <p> The first hurdle will be the preferred return.</p>
      {waterfall[personId].splits.map((item, i) => {
                    return (
                        
        <div key={i}>
           {i == 0 && <h3>Preferred Return: </h3>}
           {i != 0 && <h3>Hurdle {i}: <Button variant="danger" id={i} onClick={deleteHurdle}>
            Delete Hurdle
          </Button> </h3>}
                  <Row className="mb-3">
                  {i != 0 && <>   <Form.Group as={Col}  >
              <Form.Label>LP's take of the cut </Form.Label >
              <Form.Control type="number" step="any" value={item.limited_partner_percent} id={i}  onChange={(e) => handleHurdleChange(e,'limited_partner_percent')}/>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>GP's take of the cut (Promote amount)</Form.Label>
              <Form.Control type="number" step="any" value={item.sponsor_percent}  id={i} onChange={(e) => handleHurdleChange(e,'sponsor_percent')}/>
            </Form.Group></>}
           
            <Form.Group as={Col} >
              <Form.Label>Hurdle top amount</Form.Label>
              <Form.Control type="number" step="any" value={item.hurdle} id={i} onChange={(e) => handleHurdleChange(e,'hurdle')} />
            </Form.Group>
            </Row>
      </div>
                    )
      })} 
   
      </div>   
    )
}
 
export default Hurdle;