import React, { useState } from 'react';
import axios from 'axios';
import './Profile.css';

function Profile() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const email = localStorage.getItem("email"); // Assuming email is stored at login

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      const res = await axios.put('https://backend-wf81.onrender.com/user/update-profile', {
        email,
        name: username,
        password
      });

      if (res.data.status) {
        setMessage('Profile updated successfully!');
        setUsername('');
        setPassword('');
      } else {
        setMessage('Update failed. ' + res.data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage('Server error. Please try again later.');
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Update Profile</h2>
      <form onSubmit={handleUpdate} className="profile-form">
        <div className="form-group">
          <label>New Username</label>
          <input
            type="text"
            placeholder="Enter new username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="update-btn">Update</button>
        {message && <p className="update-msg">{message}</p>}
      </form>
    </div>
  );
}

export default Profile;
