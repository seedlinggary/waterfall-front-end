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
function App() {

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
            {/* <Route path="/dynamicmortgage" element={<DynamicMortgage />} /> */}
            {/* <Route path="/multimortgage" element={<ParentCalculator />} /> */}
            <Route path="/pandl" element={<ParentPandL />} />
            {/* <Route path="/famtree" element={<FamilyTree />} /> */}
            <Route path="/parentcombined" element={<ParentCombined />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />

          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
    </div>
  );
}

export default App;
