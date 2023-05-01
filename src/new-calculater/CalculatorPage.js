import { useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import Tabs from 'react-bootstrap/Tabs';
import Row from 'react-bootstrap/Row';
// import Tabs from 'react-bootstrap/Tabs';
import NewCalculator ,{SendApi} from "./Calculator"
import Alert from 'react-bootstrap/Alert';  
import Table from 'react-bootstrap/Table';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function CalculatorPage (){
    const [amountOfWaterfalls, setAmountOfWaterfalls] = useState([0])
    console.log(amountOfWaterfalls)
    function addWaterfall() {
        console.log(amountOfWaterfalls.length)
        setAmountOfWaterfalls([...amountOfWaterfalls, amountOfWaterfalls.length ]);
        console.log(amountOfWaterfalls.length)
      }
    const [showError, setShowError] = useState(true);
    return(
    // <> 
    <>
        {showError &&  <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
            <Alert.Heading>Warning!</Alert.Heading>
            <p>
            This website does not take responsibility for any information given or provided. Please compare your waterfall results against your own information for accurecy.
            </p>
        </Alert>}
        <div>
                    {/* <p>{pageID}</p> */}
        {/* <button onClick={addWaterfall}>Add Waterfall</button> */}
        </div>
         {amountOfWaterfalls.map((arr,i) => <NewCalculator key={arr} pageID={i} amountOfWaterfalls={amountOfWaterfalls} setAmountOfWaterfalls={setAmountOfWaterfalls} />)}
         <Row>
      <Col md={{ span: 2, offset: 3 }}>   
      <Button variant="success" onClick={SendApi}>
        Create Waterfall
      </Button>

      
      </Col>  <Col md={{ span: 2, offset: 2 }}>   
      <Button variant="success" onClick={downloadcsv}>
        Download .xlsx File
      </Button>

    </Col>  
               </Row>
      {/* </Col> */}
        <Col></Col>
    {/* </Row> */}

    
      
      
      {isPending && <div> Loading... </div>}
              {error && <div> error loading... </div>}
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

          {new_investor_profits && new_investor_profits.map((profit, index) => (
            <th key={index}>{profit.toLocaleString()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>

              { waterfall_resp && waterfall_resp.map((year, id) =>  
               
               <tr>
                               <td>{id + 1}  {new_splits  && new_splits[id] && <div>Hurdle:{new_splits[id].hurdle.toLocaleString()} Split:{new_splits[id].limited_partner_percent.toLocaleString()}/{new_splits[id].sponsor_percent.toLocaleString()}</div>}</td>

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
          {respective_returns && respective_returns.map((profit, index) => (
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
          {respective_returns && cap_by_yr.map((capital, index) => (
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
            // const [cap_by_yr,setCapByYr] = useState(null)
            // const [total_returned,setTotalReturned] = useState(null)
        
               
           
      ))}
        </tr>
      </tbody>
      {total_returned && <div>    <tbody>
        <tr>
        <th>Total returned</th>

        <Table striped>
            <tbody>
            <tr>
        <td> Sponsor </td>
        <td>{total_returned.sponsor.toLocaleString()}</td>
        </tr>       <tr>
        <td>LP </td>
        <td>{total_returned.lp.toLocaleString()}</td>
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

          {new_investor_profits && new_investor_profits.map((profit, index) => (
            <th key={index}>{profit.toLocaleString()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>

              { waterfall_resp && waterfall_resp.map((year, id) =>  
               
               <tr>
                               <td>{id + 1}  {new_splits  && new_splits[id] && <div>Hurdle:{new_splits[id].hurdle.toLocaleString()} Split:{new_splits[id].limited_partner_percent.toLocaleString()}/{new_splits[id].sponsor_percent.toLocaleString()}</div>}</td>

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
                            <td>{inf.hurdle_top_amount}</td>
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
          {respective_returns && respective_returns.map((profit, index) => (
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
          {respective_returns && cap_by_yr.map((capital, index) => (
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
      {total_returned && <div>    <tbody>
        <tr>
        <th>Total returned</th>

        <Table striped>
            <tbody>
            <tr>
        <td> Sponsor </td>
        <td>{total_returned.sponsor.toLocaleString()}</td>
        </tr>       <tr>
        <td>LP </td>
        <td>{total_returned.lp.toLocaleString()}</td>
        </tr>
            </tbody>
            </Table>
   
        </tr>
      </tbody></div>}
  
    </Table>
</div>
      </Tab>
      {investor_returns && 
      <Tab eventKey="profile" title="Each persons return">
      <div>        <Table responsive striped="columns">
      <thead>
        <tr>
        <th>Investor</th>
        
        { investor_returns && investor_returns.map((investor_return, id) =>  
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

              { investor_returns && investor_returns.map((investor_return, id) =>  
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
    // </>
    // </>
    )
    }
export default CalculatorPage