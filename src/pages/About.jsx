import React from 'react';
import { Link } from 'react-router-dom';
import teamImage from '../assets/team.jpg';
import '../about.css';

export default function About() {
  return (
    <div className="about-wrapper">
      <div className="about-container">
        <div className="about-header">
          <h1 className="about-title">Welcome to DishDelights</h1>
          <p className="about-subtitle">Your Culinary Journey Starts Here</p>
        </div>
        
        <div className="about-content">
          <div className="about-text-section">
            <h2 className="section-title">Our Story</h2>
            <p className="section-text">
              DishDelights was born from a passion for bringing people together through 
              the joy of cooking. We believe that every meal is an opportunity to create 
              something special.
            </p>
            
            <h2 className="section-title">Our Mission</h2>
            <p className="section-text">
              To inspire home cooks of all skill levels to explore new flavors, 
              techniques, and cuisines while building their confidence in the kitchen.
            </p>

            <div className="feature-grid">
              <Link to="/dishdelights" className="feature-card recipe-link">
                <h3>Recipe Collection</h3>
                <p>Explore our curated collection of recipes from around the world</p>
              </Link>
              <Link to="/personalfavorites" className="feature-card recipe-link">
                <h3>Save Favorites</h3>
                <p>Create your personal cookbook with your favorite recipes</p>
              </Link>
              <a 
                href="https://www.facebook.com/groups/568916226010104" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="feature-card recipe-link"
              >
                <h3>Join Our Community</h3>
                <p>Connect with fellow food lovers, share recipes and cooking tips on Facebook</p>
              </a>
            </div>
          </div>

          <div className="about-image-section">
            <img 
              src={teamImage} 
              alt="Our culinary team" 
              className="about-main-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}