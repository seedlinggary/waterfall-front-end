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
            <Route path="*" element={<NotFound />} />

          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
    </div>
  );
}

export default App;
