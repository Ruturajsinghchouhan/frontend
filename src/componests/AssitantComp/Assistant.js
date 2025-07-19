import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Assistant.css';

function TravelForm() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const cities = [
    'Indore', 'Goa', 'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad',
    'Pune', 'Kolkata', 'Chennai', 'Jaipur', 'Ahmedabad', 'Lucknow',
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (from && to && date) {
      navigate('/result', {
        state: {
          from: from.toLowerCase(),
          to: to.toLowerCase(),
          date,
        },
      });
    }
  };

  return (
    <>
    <div className='travel-box'>
  <div className="assistant-form-container">
    <h1 className="assistant-title">Welcome to Travel Assistant 🧳</h1>
    <form onSubmit={handleSearch} className="assistant-form">
      <div className="assistant-input-group">
        <input
          type="text"
          list="city-list"
          className="assistant-input"
          placeholder="From (e.g., Indore)"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          required
        />
      </div>

      <div className="assistant-input-group">
        <input
          type="text"
          list="city-list"
          className="assistant-input"
          placeholder="To (e.g., Goa)"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
      </div>

      <div className="assistant-input-group">
        <input
          type="date"
          className="assistant-input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="assistant-submit-btn">Search</button>
    </form>

    <datalist id="city-list">
      {cities.map((city, index) => (
        <option value={city} key={index} />
      ))}
    </datalist>
  </div>
</div>

 </>
    
  );
}

export default TravelForm;
