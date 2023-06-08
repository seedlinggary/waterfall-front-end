import Home from '../Home';
import { generateSitemap } from 'react-sitemap-generator';

import { useEffect } from 'react';
import About from '../About';
import ComingSoon from '../ComingSoon';
import Contact from '../Contact';
import Calculator from '../calculator/Calculator';
import Workflow from '../Workflow';
import NotFound from '../NotFound';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Definitions from '../Definitions';
import MortgageCalculator from '../mortgageCaluclator/MortgageCalculator';
import DynamicMortgage from '../mortgageCaluclator/DynamicMortgage';
import Disclaimer from '../Disclaimer';
import ParentCalculator from '../mortgageCaluclator/ParentMortgage';
import ParentPandL from '../profitlosses/ParentPandL';
import FamilyTree from '../multiwaterfall/FamilyTree';
import ParentCombined from '../combined/ParentCombined';
const SitemapGenerator = () => {
    useEffect(() => {
      generateSitemap(
        // Specify the base URL of your website
        'https://example.com',
        // Pass the Router component with your routes
        <Router>
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
              <Route path="/multimortgage" element={<ParentCalculator />} />
              <Route path="/pandl" element={<ParentPandL />} />
              <Route path="/famtree" element={<FamilyTree />} />
              <Route path="/parentcombined" element={<ParentCombined />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </Router>,
        // Specify the output path for the generated sitemap.xml file
        './public/sitemap.xml'
      );
    }, []);
  
    return null;
  };
  
  export default SitemapGenerator;
  