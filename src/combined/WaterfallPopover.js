import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';

import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function WaterfallPopover(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
        
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Waterfall Info
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
        <Tabs
      defaultActiveKey="home"
      transition={false}
      id="noanim-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="General Waterfall Info">
        <div>        <Table responsive>
      <thead>
        <tr>
        <th>Hurdle</th>
        <th>info/yrs</th>
        { props.profits && Object.entries(props.profits).map( ([year, funds],index) => {
    return(

<th key={index}>{funds.totals}
            </th>
    )
    
            })}

        </tr>
      </thead>
      <tbody>
              { props.profit_recieved.profits && props.profit_recieved.profits.map((year, id) =>  
               
               <tr>
                               <td>{id + 1}  {props.profit_recieved.new_splits  && props.profit_recieved.new_splits[id] && <div>Hurdle:{props.profit_recieved.new_splits[id].hurdle.toLocaleString()} Split:{props.profit_recieved.new_splits[id].limited_partner_percent.toLocaleString()}/{props.profit_recieved.new_splits[id].sponsor_percent.toLocaleString()}</div>}</td>

                <td>
                                            <Table striped>
                                <tbody>
                                
                                <tr>
                            <td>capital_returned</td>
                            </tr>
                            
                          
                            <tr>
                            <td>Amount to distribute</td>
                            </tr>
                            <tr>
                            <td>Sponsor Share</td>
                            </tr>
                            <tr>
                            <td>LP share</td>
                            </tr>
                            
                                </tbody>
                                </Table>
                                </td>
               {year.map((inf, index) => (
                 <td key={index}> 

                    <Table striped>
                        <tbody>
                
                        <tr>
                            <td>{inf.capital_returned.toLocaleString()}  </td>
                            </tr>
                            
                    
                            <tr>
                            <td>{inf.amount_to_distribute_in_this_hurdle.toLocaleString()}</td>
                            </tr>
                            <tr>
                            <td>{inf.sponsor_share.toLocaleString()}</td>
                            </tr>
                            <tr>
                            <td>{inf.lp_share.toLocaleString()}</td>
                            </tr>
                            
                            {inf.fees && inf.fees.map((fee, index) => (
                                 <>
                                
                            <tr>
                            <td>{fee.name}: {fee.amount_given}/{fee.out_of}</td>
                            </tr>
                          
                                
                                 </>
                            ))
                            }
                        </tbody>
                        </Table>
                 </td>
               ))}
               
             </tr>
           )}
            </tbody>
            <tbody>
        <tr>
        <th>Yearly Respective Profits</th>
          {props.profit_recieved.respective_returns && props.profit_recieved.respective_returns.map((profit, index) => (
                            <td key={index}> 

                            <Table striped>
                                <tbody>
                                <tr>
                            <td> Sponsor distributions</td>
                            <td>{profit.sponsor.toLocaleString()}</td>
                            </tr>       <tr>
                            <td>LP distributions</td>
                            <td>{profit.lp.toLocaleString()}</td>
                            </tr>
                                </tbody>
                                </Table>
                         </td>
        
               
           
      ))}
        </tr>
      </tbody>          <tbody>
        <tr>
        <th>Total returned  capital till this point in year</th>
          {props.profit_recieved.respective_returns && props.profit_recieved.total_capital_returned_by_year.map((capital, index) => (
                            <td key={index}> 

                            <Table striped>
                                <tbody>
                                <tr>
                            <td> Sponsor Capital</td>
                            <td>{capital[1].toLocaleString()}</td>
                            </tr>       <tr>
                            <td>LP capital</td>
                            <td>{capital[0].toLocaleString()}</td>
                            </tr>
                                </tbody>
                                </Table>
                         </td>
            // const [total_capital_returned_by_year,setCapByYr] = useState(null)
            // const [total_returned,setTotalReturned] = useState(null)
        
               
           
      ))}
        </tr>
      </tbody>
      {props.profit_recieved.total_returned && <div>    <tbody>
        <tr>
        <th>Total returned</th>

        <Table striped>
            <tbody>
            <tr>
        <td> Sponsor </td>
        <td>{props.profit_recieved.total_returned.sponsor.toLocaleString()}</td>
        </tr>       <tr>
        <td>LP </td>
        <td>{props.profit_recieved.total_returned.lp.toLocaleString()}</td>
        </tr>
            </tbody>
            </Table>
   
        </tr>
      </tbody></div>}
  
    </Table>
</div>
      </Tab><Tab eventKey="in_depth" title="In Depth Waterfall">
        <div>        <Table responsive>
      <thead>
        <tr>
        <th>Hurdle</th>
        <th>info/yrs</th>
        { props.profits && Object.entries(props.profits).map( ([year, funds],index) => {
    return(

<th key={index}>{funds.totals}
            </th>
//       <Tab eventKey={year} title={year}>
//         <div key={year}>
//             <h3> Year {year}</h3>
//           <h3> Total Funds Recieved - {funds.totals} </h3>
//             <Row>
//    <Col md={{ span: 4, offset: 1 }}>   

//         <h3> LP profit - {funds.lp_profit}</h3>    
//         <h3> LP capital Returned - {funds.lp_capital_returned} </h3>
//        <h3> LP Total Recieved - {funds.lp_total}</h3>

//       </Col>  


//       <Col md={{ span: 4, offset: 2 }}>   
//        <h3> GP profit - {funds.gp_profit}</h3>    
//         <h3> GP capital Returned - {funds.gp_capital_returned} </h3>
//        <h3> GP Total Recieved - {funds.gp_total}</h3>

//     </Col>  
//                </Row>


// <hr></hr>
//         </div>
//     </Tab> 
    )
    
            })}
          {/* {props.profit_recieved.new_llc_profits && props.profit_recieved.new_llc_profits.map((profit, index) => (
            <th key={index}>{profit.toLocaleString()}
            </th>
          ))} */}
        </tr>
      </thead>
      <tbody>

              { props.profit_recieved.profits && props.profit_recieved.profits.map((year, id) =>  
               
               <tr>
                               <td>{id + 1}  {props.profit_recieved.new_splits  && props.profit_recieved.new_splits[id] && <div>Hurdle:{props.profit_recieved.new_splits[id].hurdle.toLocaleString()} Split:{props.profit_recieved.new_splits[id].limited_partner_percent.toLocaleString()}/{props.profit_recieved.new_splits[id].sponsor_percent.toLocaleString()}</div>}</td>

                <td>
                                            <Table striped>
                                <tbody>
                                {id == 0 && <><tr>
                            <td>gp_prehurdle  </td>
                            </tr>
                            
                            <tr>
                            <td>gp_hurdle_top_amount</td>
                            </tr>
                        </>}
                                <tr>
                            <td>capital_returned</td>
                            </tr>
                            
                            <tr>
                            <td>pre hurdle amount</td>
                            </tr>
                        
                            <tr>
                            <td>Amount to distribute</td>
                            </tr>
                            <tr>
                            <td>Sponsor Share</td>
                            </tr>
                            <tr>
                            <td>LP share</td>
                            </tr>
                            <tr>
                            <td>hurdle_top_amount</td>
                            </tr>
                            <tr>
                            <td>Money left to distribute</td>
                            </tr>
                            <tr>
                            <td>total up to date distributions</td>
                            </tr>
                                </tbody>
                                </Table>
                                </td>
               {year.map((inf, index) => (
                 <td key={index}> 

                    <Table striped>
                        <tbody>
                        {id == 0 && <><tr>
                            <td>{inf.gp_prehurdle.toLocaleString()}  </td>
                            </tr>
                            
                            <tr>
                            <td>{inf.gp_hurdle_top_amount.toLocaleString()}</td>
                            </tr>
                        </>}
                        <tr>
                            <td>{inf.capital_returned.toLocaleString()}  </td>
                            </tr>
                            
                            <tr>
                            <td>{inf.prehurdle.toLocaleString()}</td>
                            </tr>
                        
                            <tr>
                            <td>{inf.amount_to_distribute_in_this_hurdle.toLocaleString()}</td>
                            </tr>
                            <tr>
                            <td>{inf.sponsor_share.toLocaleString()}</td>
                            </tr>
                            <tr>
                            <td>{inf.lp_share.toLocaleString()}</td>
                            </tr>
                            <tr>
                            <td>{inf.hurdle_top_amount || 0}</td>
                            </tr>
                            <tr>
                            <td>{inf.money_left_to_distribute_after_hurdle.toLocaleString()}</td>
                            </tr>
                            <tr>
                            <td>{inf.total_up_to_date_amount_distributed_to_lp.toLocaleString()}</td>
                            </tr>
                            {inf.fees && inf.fees.map((fee, index) => (
                                 <>
                                
                            <tr>
                            <td>{fee.name}: {fee.amount_given.toLocaleString()}/{fee.out_of.toLocaleString()}</td>
                            </tr>
                          
                                
                                 </>
                            ))
                            }
                        </tbody>
                        </Table>
                 </td>
               ))}
               
             </tr>
           )}
            </tbody>
            <tbody>
        <tr>
        <th>Yearly Respective Profits</th>
          {props.profit_recieved.respective_returns && props.profit_recieved.respective_returns.map((profit, index) => (
                            <td key={index}> 

                            <Table striped>
                                <tbody>
                                <tr>
                            <td> Sponsor distributions</td>
                            <td>{profit.sponsor.toLocaleString()}</td>
                            </tr>       <tr>
                            <td>LP distributions</td>
                            <td>{profit.lp.toLocaleString()}</td>
                            </tr>
                                </tbody>
                                </Table>
                         </td>
        
               
           
      ))}
        </tr>
      </tbody>          <tbody>
        <tr>
        <th>Total returned  capital till this point in year</th>
          {props.profit_recieved.respective_returns && props.profit_recieved.total_capital_returned_by_year.map((capital, index) => (
                            <td key={index}> 

                            <Table striped>
                                <tbody>
                                <tr>
                            <td> Sponsor Capital</td>
                            <td>{capital[1].toLocaleString()}</td>
                            </tr>       <tr>
                            <td>LP capital</td>
                            <td>{capital[0].toLocaleString()}</td>
                            </tr>
                                </tbody>
                                </Table>
                         </td>               
           
      ))}
        </tr>
      </tbody>
      {props.profit_recieved.total_returned && <div>    <tbody>
        <tr>
        <th>Total returned</th>

        <Table striped>
            <tbody>
            <tr>
        <td> Sponsor </td>
        <td>{props.profit_recieved.total_returned.sponsor.toLocaleString()}</td>
        </tr>       <tr>
        <td>LP </td>
        <td>{props.profit_recieved.total_returned.lp.toLocaleString()}</td>
        </tr>
            </tbody>
            </Table>
   
        </tr>
      </tbody></div>}
  
    </Table>
</div>
      </Tab>
      {props.profit_recieved.investor_returns && 
      <Tab eventKey="profile" title="Each persons return">
      <div>        <Table responsive striped="columns">
      <thead>
        <tr>
        <th>Investor</th>
        
        { props.profit_recieved.investor_returns && props.profit_recieved.investor_returns.map((investor_return, id) =>  
        <>
               
               
               {id == 0 && investor_return[1].map((inv, index) => (
                <>
                <td> year # {index + 1}</td>
                 {inv.returns.map((inv, index) => (
                <>
                
                    <td>hurdle num</td>
                    <td>portion recieved</td>
                </>
                 ))}
                <td>Total year recieved</td>
                    <td>amount withheld</td>
                    <td>actual returned</td>
                    <td>percentage withheld</td>
                    <td>country</td>
                    <td>ownership %</td>
                    <td>capital returned</td>
                    
                </>
               
               ))}
             </>
        )}
        </tr>
      </thead>
      <tbody>

              { props.profit_recieved.investor_returns && props.profit_recieved.investor_returns.map((investor_return, id) =>  
               <tr>
               <td>{investor_return[0]}</td>
               {investor_return[1].map((inv, index) => (
                <>
                 <td> new year</td>
                 {inv.returns.map((inv, index) => (
                <>
                    <td>{inv.hurdle_num}</td>
                    <td>{inv.portion_recieved.toLocaleString()}</td>
                </>
                 ))}
                <td>{inv.total_investor_returned.toLocaleString()}</td>
                    <td >{inv.amount_withheld.toLocaleString()}</td>
                    <td>{inv.actual_returned.toLocaleString()}</td>
                    <td>{inv.percentage_withheld}</td>
                    <td>{inv.country_of_origin}</td>
                    <td>{inv.percentage_of_total}</td>
                    <td>{inv.capital_returned.toLocaleString()}</td>
                   
                </>
              
                ))}       
             </tr>
           )}
            </tbody>

  
    </Table>
</div>
      </Tab>
      }
    </Tabs>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

// function App() {
//   const [waterfallShow, setwaterfallShow] = React.useState(false);

//   return (
//     <>
//       <Button variant="primary" onClick={() => setwaterfallShow(true)}>
//         Launch vertically centered modal
//       </Button>

//       <WaterfallPopover
//         show={waterfallShow}
//         onHide={() => setwaterfallShow(false)}
//       />
//     </>
//   );
// }

// render(<App />);
export default WaterfallPopover