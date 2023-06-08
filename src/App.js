import './App.css';
import SitemapGenerator from './component/SitemapGenerator';
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
function App() {

  return (
    <div>
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
        <SitemapGenerator />
        </div>
        <Footer />
      </div>
    </Router>
    </div>
  );
}

export default App;
