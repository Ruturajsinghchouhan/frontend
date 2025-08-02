import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './user.css';

function User() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');

    if (!token) {
      navigate('/login');
    } else {
      setUser({ name, email });
    }
  }, [navigate]);

  const handleSearch = () => {
    navigate('/assistant');
  };

  return (
    <div className="user-container">
      <div className="profile-card">
        <div className="profile-header">
          <h2>👋 Welcome, <span className="username">{user.name}</span></h2>
          <p>Your personalized travel dashboard</p>
        </div>

        <div className="profile-info">
          <div className="info-item">
            <label>Email:</label>
            <span>{user.email}</span>
          </div>
        </div>

        <div className="profile-actions">
          <button onClick={handleSearch} className="btn-search">
            🔍 Search Travel Options
          </button>
        </div>

        <hr className="divider" />

        <div className="recent-section">
          <h4>🧳 Recent Trips</h4>
          <p className="empty-msg">You haven’t searched yet. Start exploring!</p>
        </div>
      </div>
    </div>
  );
}

export default User;
