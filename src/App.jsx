import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import DishDelights from './pages/DishDelights';
import PersonalFavorites from './pages/PersonalFavorite';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <header>
        <h1>DishDelights.</h1>
        <div className="burger-menu" onClick={toggleMenu}>
          <div className={`burger-bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`burger-bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`burger-bar ${isMenuOpen ? 'open' : ''}`}></div>
        </div>
        <nav className={isMenuOpen ? 'nav-open' : ''}>
          <ul>
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/dishdelights" className="nav-link">Recipes</Link></li>
            <li><Link to="/personalfavorites" className="nav-link">Personal Favorites</Link></li>
            <li><Link to="/about" className="nav-link">About</Link></li>
            <li><Link to="/contact" className="nav-link">Contacts</Link></li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dishdelights" element={<DishDelights />} />
        <Route path="/personalfavorites" element={<PersonalFavorites />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <footer className="main-footer">
        <p>
          <span className="footer-brand">DishDelights</span>
          <span className="footer-separator">&copy;</span>
          <span>{currentYear}</span>
        </p>
      </footer>
    </Router>
  );
}