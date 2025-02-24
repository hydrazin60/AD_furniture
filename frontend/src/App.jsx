import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// navbar
import Home from './pages/Home';
import About from './pages/About';
import Contract from './pages/Contract';
import Services from './pages/Services';
import Admin from './pages/Admin';
import Login from './features/auth/Login';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        {/* Navigation Bar */}
        <nav className="bg-teal-500 p-4 fixed top-0 left-0 right-0 z-50"> {/* Added fixed, top-0, left-0, right-0, and z-50 */}
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-white font-bold text-xl">AD FURNITURE</div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleMobileMenu} className="text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-4">
              <li>
                <Link to="/" className="text-white hover:bg-black hover:text-white p-2 rounded">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white hover:bg-black hover:text-white p-2 rounded">
                  About
                </Link>
              </li>
             
              <li>
                <Link to="/services" className="text-white hover:bg-black hover:text-white p-2 rounded">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contract" className="text-white hover:bg-black hover:text-white p-2 rounded">
                  Contract
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-white hover:bg-black hover:text-white p-2 rounded">
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-white hover:bg-black hover:text-white p-2 rounded">
                  Login
                </Link>
              </li>
            </ul>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute top-16 left-0 w-full bg-teal-500 z-10 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
              <ul className="flex flex-col space-y-2 p-4">
                <li>
                  <Link to="/" className="text-white hover:bg-black hover:text-white p-2 rounded" onClick={toggleMobileMenu}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-white hover:bg-black hover:text-white p-2 rounded" onClick={toggleMobileMenu}>
                    About
                  </Link>
                </li>
                
                <li>
                  <Link to="/services" className="text-white hover:bg-black hover:text-white p-2 rounded" onClick={toggleMobileMenu}>
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/contract" className="text-white hover:bg-black hover:text-white p-2 rounded" onClick={toggleMobileMenu}>
                    Contract
                  </Link>
                </li>
                <li>
                <Link to="/admin" className="text-white hover:bg-black hover:text-white p-2 rounded">
                  Admin Dashboard
                </Link>
              </li>
                <li>
                  <Link to="/login" className="text-white hover:bg-black hover:text-white p-2 rounded" onClick={toggleMobileMenu}>
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container mx-auto p-4 pt-16"> {/* Added pt-16 to account for fixed navbar height */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contract" element={<Contract />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;