import './App.css';
import Home from './Home';
import About from './About';
import ComingSoon from './ComingSoon';
import Contact from './Contact';
import Calculator from './calculator/Calculator';
import Workflow from './Workflow';
import NotFound from './NotFound';
import Navbar from './Navbar';
import Footer from './Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Definitions from './Definitions';
import MortgageCalculator from './mortgageCaluclator/MortgageCalculator';
import DynamicMortgage from './mortgageCaluclator/DynamicMortgage';
import Disclaimer from './Disclaimer';
import ParentCalculator from './mortgageCaluclator/ParentMortgage';
import ParentPandL from './profitlosses/ParentPandL';
import FamilyTree from './multiwaterfall/FamilyTree';
import ParentCombined from './combined/ParentCombined';
import SignIn from './databaseRoutes/users/SignIn';
import SignUp from './databaseRoutes/users/SignUp';
import ForgotPassword from './databaseRoutes/users/ForgotPassword';
import {reactLocalStorage} from 'reactjs-localstorage';
import UserHome from './databaseRoutes/users/UserHome';
import CompanyHome from './databaseRoutes/companies/CompanyHome';
import DealHome from './databaseRoutes/deal/DealHome';
import DiligenceHome from './databaseRoutes/diligence/DiliginceHome';
import DInfoHome from './databaseRoutes/diligence/Info/DInfoHome';
import CompareDiligence from './databaseRoutes/deal/CompareDiligence';
import Employees from './databaseRoutes/companies/Employees';
import InvestorReturnsHome from './databaseRoutes/diligence/InvestorReturnsHome';
import PropertyHome from './databaseRoutes/property.js/PropertyHome';

function App() {
  let email = reactLocalStorage.get('email')

  return (
    <div>
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/workflow" element={<Workflow />} />
            <Route path="/definitions" element={<Definitions />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/comingsoon" element={<ComingSoon />} />
            <Route path="/mortgagecalculator" element={<MortgageCalculator />} />
            <Route path="/pandl" element={<ParentPandL />} />
            <Route path="/parentcombined" element={<ParentCombined />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            {email &&<Route path="/userhome" element={<UserHome />} />}
            {email &&<Route path="/companyhome/"  element={<CompanyHome />} />}
            {email &&<Route path="/dealhome/"  element={<DealHome />} />}
            {email &&<Route path="/diligencehome/"  element={<DiligenceHome />} />}
            {email &&<Route path="/dinfohome/"  element={<DInfoHome />} />}
            {email &&<Route path="/comparediligence/"  element={<CompareDiligence />} />}
            {email &&<Route path="/employees/"  element={<Employees />} />}
            {email &&<Route path="/investorReturnsHome/"  element={<InvestorReturnsHome />} />}
            {email &&<Route path="/PropertyHome/"  element={<PropertyHome />} />}

          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
    </div>
  );
}

export default App;
