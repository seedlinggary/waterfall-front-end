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

const KOne = ({company}) => {
    const [Kone, setKOne] = useState([])

          
              
            return ( 
                <> 



<UploadFIle setInvestors={setKOne} apiextension={'accounting/kone/upload'}/>
{/* <Button  variant="outline-primary" onClick={DownloadCSV}>Download CSV</Button> */}

              </>
    )
}
 
export default KOne;