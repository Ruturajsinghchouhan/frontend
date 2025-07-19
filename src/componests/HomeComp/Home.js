import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="home-hero">
        <h1>Travel Assistant</h1>
        <p>Your personal guide to the cheapest and best travel options!</p>
        <p>Compare  Bus,  Train, and Flights in one place — with real-time prices.</p>

        <Link to="/register" className="home-btn">Find Best Travel Deals</Link>
      </div>

      <div className="home-features">
        <h2>Why Use Travel Assistant?</h2>
        <ul>
          <li>🔎 Search across multiple travel platforms instantly</li>
          <li>💸 Find cheapest tickets for your route</li>
          <li>🧠 Powered by AI to get smart suggestions</li>
          <li>🌐 Direct booking links from trusted sites</li>
          <li>📅 Easy date selection and filters</li>
        </ul>
      </div>

      
    </div>
  );
}

export default Home;