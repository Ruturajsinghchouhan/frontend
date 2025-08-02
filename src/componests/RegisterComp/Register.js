import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

function Register() {
  const [output, setOutput] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const HandleSubmit = () => {
    const userDetail = { name, email, password };
    console.log(userDetail);

    if (!name) return setOutput("Name is required");
    if (!email) return setOutput("Email is required");
    if (!password) return setOutput("Password is required");
    if (password.length <= 4 || password.length > 10)
      return setOutput("Password length must be between 5–10 characters");

    axios.post("https://backend-wf81.onrender.com/user/save", userDetail)
      .then((response) => {
        setOutput("User registered successfully ✅");
        setName('');
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        setOutput("User registration failed ❌");
      });
  };

  return (
    <div className="form-wrapper">
      <div className="form-box">
        <h2>Register</h2>
        {output && <p className="form-output">{output}</p>}
        <form>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="button" onClick={HandleSubmit}>Register</button>
          <p>
            Already registered? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
