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
      <div className="profile-card shadow">
        <div className="profile-header">
          <h2>👤 Welcome, {user.name}</h2>
          <p>Your travel dashboard</p>
        </div>

        <div className="profile-info">
          <p><strong>Email:</strong> {user.email}</p>
        </div>

        <div className="profile-actions">
          <button onClick={handleSearch} className="btn btn-primary">🔍 Search Travel Options</button>
        </div>

        <hr />

        <div className="recent-section">
          <h5>🧳 Recent Trips</h5>
          <p style={{ color: "#888" }}>You haven’t searched yet. Start exploring!</p>
        </div>
      </div>
    </div>
  );
}

export default User;
