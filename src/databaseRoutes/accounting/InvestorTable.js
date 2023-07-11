import React, { useState } from 'react'
import apiRequest from '../../ApiRequest'
import Table from 'react-bootstrap/Table';
import Investor from './Investor';
import Form from 'react-bootstrap/Form';
import EditTable from './EditTable';

const InvestorTable = ({investors, setInvestors}) => {

    // const [longestProfit, setLongestProfit] = useState(getLongestProfit(investors))
    const [longestTax, setLongestTax] = useState(true)
    const [ind, setIn] = useState(0)
    const [inde, setInd] = useState(0)
    const [vestor, seVestor] = useState()
    const [prof, setProf] = useState(false)
    const [tx, setTx] = useState(false)

    const [modalShow, setModalShow] = useState(false);
    function HandleInvestorChange(data, mortgageInfoType, InvestorID) {
        let keyvalue = mortgageInfoType.toString()
        setInvestors(s => {
            const newPandL = s.slice();
            newPandL[InvestorID][`${keyvalue}`] = data;
            console.log(newPandL[InvestorID][`${keyvalue}`])
            
            return newPandL;
          });

      }

      function handleProfitChange(data, index, mortgageInfoType, InvestorID) {
        let keyvalue = mortgageInfoType.toString()
        console.log(InvestorID)
        let updatedList = investors[InvestorID].profits.map((item, i) => 
          {
            if (i == index){
              return {...item, [`${keyvalue}`] : data}; //gets everything that was already in item, and updates "done"
            }
            return item; // else return unmodified item 
          });
          
    
      setInvestors(s => {
          const newInvestors = s.slice();
          newInvestors[InvestorID].profits = updatedList;
    
          return newInvestors;
        });
      }; 
      function handleTaxChange(data, index, mortgageInfoType, InvestorID) {
        let keyvalue = mortgageInfoType.toString()

        let updatedList = investors[InvestorID].tax_brackets.map((item, i) => 
          {
            if (i == index){
              return {...item, [`${keyvalue}`] : data}; //gets everything that was already in item, and updates "done"
            }
            return item; // else return unmodified item 
          });

      setInvestors(s => {
          const newInvestors = s.slice();
          newInvestors[InvestorID].tax_brackets = updatedList;
    
          return newInvestors;
        });
      }; 
    function getLongestProfit(investors) {
        let investor_length = 0
        investors.map((investor,i) => {
            if (investor.profits.length > investor_length){
                investor_length = investor['profits'].length
            }
          })
          let array_list = []
          for(let i = 0; i < investor_length; i++){
              array_list.push(i)
            }
            // setLongestProfit(array_list)
            return array_list
        }
        function getLongestTax(investors) {
            let investor_length = 0
            investors.map((investor,i) => {
                if (investor.tax_brackets.length > investor_length){
                    investor_length = investor['tax_brackets'].length
                }
              })
              let array_list = []
              for(let i = 0; i < investor_length; i++){
                  array_list.push(i)
                }
                // setLongestProfit(array_list)
                return array_list
            }
        // console.log(getLongestProfit(investors))
            return ( 
                <> 
 {investors && <Table striped responsive>

                        <thead>
                        <tr>
                          <th>#</th>
                          <th>First Name</th>
                          {investors && getLongestProfit(investors).map((profit,i) => {
                            return(
                                <>
                                <th> profit </th>
                                </>
                            )
                          })}
                          {investors[0] && investors[0].original_profit && <th> total profit </th>}
                          {investors[0] && investors[0].original_profit && <th>total capital </th>}
                          {investors && getLongestTax(investors).map((tax,i) => {
                            return(
                                <>
                           <th> tax bracket </th>
                           {investors && investors[0].original_profit && <th>amount taken profit </th>}
                            {investors && investors[0].original_profit && <th> amount taken capital </th>}
                                

                                </>
                            )
                          })}
                          {investors[0] && investors[0].original_profit && <th> tax taken profit </th>}
                          {investors[0] && investors[0].original_profit && <th>tax taken capital </th>}
                          {investors[0] && investors[0].original_profit && <th> profit returned </th>}
                          {investors[0] && investors[0].original_profit && <th>capital returned </th>}
                        </tr>
                      </thead>
                      <tbody>
    {investors.map((investor, i) => {
                    return (
                        <>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{investor.name}</td>
                          {investor.profits && getLongestProfit(investors).map((profit,index) => {
                            return(
                                <>
                                {investor.profits[index] && <td> {investor.profits[index].amount}<div onClick={() => {
                                  setTx(false)
                                  setIn(i)
                                  setInd(index)
                                  seVestor(investor)
                                  setModalShow(true)}} >&#9432; </div> </td>} 
            {/* <Form.Group controlId="formGridEmail">
            <Form.Control  value={investor.profits[index].amount} onChange={(e) => handleProfitChange(e.target.value, index,'amount', i)} />
          </Form.Group>  </td>} */}
                                {!investor.profits[index] && <td></td>}
                                {investor.profits[index] &&<EditTable
  show={modalShow}
  onHide={() => {
    setModalShow(false)}}
  investor={vestor}
  index={inde}
  handleProfitChange={handleProfitChange}
  handleTaxChange={handleTaxChange}
  i={ind}
  tx={tx}
/>}

                                </>
                            )
                          })}
                              {investors && investors[0].original_profit && <td> {investor.original_profit} </td>}
                              {investors && investors[0].original_profit && <td>{investor.original_capital} </td>}
                          {investor.tax_brackets && getLongestTax(investors).map((tax,index) => {
                            return(
                                <>
                                {investor.tax_brackets[index] && <td>   {investor.tax_brackets[index].tax_rate} <div onClick={() => {
                                  setTx(true)
                                  setIn(i)
                                  setInd(index)
                                  seVestor(investor)
                                  setModalShow(true)}} >&#9432; </div> </td>} 
                                  {investor.tax_brackets[index] &&<EditTable
                                  show={modalShow}
                                  onHide={() => {
                                    setModalShow(false)}}
                                  investor={vestor}
                                  index={inde}
                                  handleTaxChange={handleTaxChange}
                                  handleProfitChange={handleProfitChange}

                                  i={ind}
                                  tx={tx}
                                />}
          {/* <Form.Group controlId="formGridEmail">
            <Form.Control  value={investor.tax_brackets[index].tax_rate} onChange={(e) => handleTaxChange(e.target.value, index,'tax_rate', i)} />
          </Form.Group> </td>} */}
                                {!investor.tax_brackets[index] && <td></td>}
                                {investors && investor.tax_brackets[index] && investor.tax_brackets[index].amount_taken_profit &&  <td> {investor.tax_brackets[index].amount_taken_profit} </td>}
                                { investors && investor.tax_brackets[index] && investor.tax_brackets[index].amount_taken_profit && <td> {investor.tax_brackets[index].amount_taken_capital} </td>}
                                {investors && !investor.tax_brackets[index]  &&  <td>  </td>}
                                { investors && !investor.tax_brackets[index]  && <td>  </td>}
                                
                                </>
                            )
                          })}
                          {investors[i] && investors[i].original_profit && <td> {investors[i].tax_taken_profit}</td>}
                          {investors[i] && investors[i].original_profit && <td>{investors[i].tax_taken_capital} </td>}
                          {investors[i] && investors[i].original_profit && <td> {investors[i].profit_returned}</td>}
                          {investors[i] && investors[i].original_profit && <td>{investors[i].capital_returned}</td>}

                        </tr>
                      
                      </>
                    )})}
                   
                      </tbody>

    </Table>}

              </>
    )
}
 
export default InvestorTable;