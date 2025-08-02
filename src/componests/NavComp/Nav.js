import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');
  const role = localStorage.getItem('role');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">🧭 Travel Assistant</Link>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <ul className={`nav-items ${menuOpen ? 'active' : ''}`}>
        {token ? (
          <>
            {role === 'admin' ? (
              <>
                <li><Link to="/admin">Admin Panel</Link></li>
                <li><Link to="/manage-user">Manage-user</Link></li>
              </>
            ) : (
              <>
                {/* <li><Link to="/profile">My Profile</Link></li> */}
                <li><Link to="/user">Home</Link></li>
              </>
            )}
            <li><span className="nav-name">Hi, {name}</span></li>
            <li><button className="nav-btn" onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
