import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import PandL from '../../profitlosses/PandL';
import Accordion from 'react-bootstrap/Accordion';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
// import PNLSetInfo from './PNLSetInfo';
import Alert from 'react-bootstrap/Alert';
import Investor from './Investor';
import apiRequest from '../../ApiRequest'
import InvestorTable from './InvestorTable';
import UploadFIle from '../../Uploadfile';
import DownloadFile from '../../DownloadFile';

const Accounting = ({company}) => {
    const [investors, setInvestors] = useState([])

    const addInvestor = e => {
        setInvestors(s => {
            const newInvestor = s.slice();
            newInvestor.push({ 'name' : `investor ${newInvestor.length + 1}`,
            'profits': [],
            'tax_brackets': [],
        })
        return newInvestor;
    });
      }; 
      const deleteInvestor = e => {
        setInvestors(profits=> profits.filter((s,i)=>(i != e.target.id)))
          }

          const SendApi = async (e) => {
            let info = {"investors": investors,
                        
                       }
            let a =  apiRequest('POST',info,`/accounting/${company.id}`)
            setInvestors( await a)
          } 
          const DownloadCSV = async (e) => {
            let info = {"investors": investors,
                        
                       }
            let a =  DownloadFile('POST',info,`/accounting/${company.id}/downloadcsv`)
            // setInvestors( await a)
          } 
          
              
            return ( 
                <> 


 <Button  variant="outline-primary" onClick={addInvestor}>Add Investor</Button>

 <Accordion defaultActiveKey={['0']} alwaysOpen>
              {investors && investors.map((investor, i) => {
                    return (
                        
        <div key={i}>

<Accordion.Item eventKey={i}>
        <Accordion.Header>Investor #{i+1}: {investor.name}  &rarr;   <Button variant="outline-danger" size="sm" id={i} onClick={deleteInvestor}>
            Delete Me
          </Button></Accordion.Header> 
        <Accordion.Body>
        {/* <PandL pAndLs={pAndLs} setPandLs={setPandLs} PandLID={i}></PandL> */}
        {<Investor investors={investors} setInvestors={setInvestors} InvestorID={i}></Investor>}
        </Accordion.Body>
      </Accordion.Item>

 
      </div>
                    )
                })} 
   </Accordion>
                <Button  variant="outline-primary" onClick={SendApi}>Send Info</Button>

<InvestorTable investors={investors} setInvestors={setInvestors}></InvestorTable>

<UploadFIle setInvestors={setInvestors} apiextension={'accounting/investors/upload'}/>
<Button  variant="outline-primary" onClick={DownloadCSV}>Download CSV</Button>

              </>
    )
}
 
export default Accounting;