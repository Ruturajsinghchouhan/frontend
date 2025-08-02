import './Login.css';
import { useState } from 'react';
import { userApi } from '../../apiUrl';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [output, setOutput] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const HandleSubmit = () => {
    const userDetail = { email, password };
    axios.post(userApi + 'login', userDetail).then((response) => {
      const userDetail = response.data.userList;
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('_id', userDetail._id);
      localStorage.setItem('name', userDetail.name);
      localStorage.setItem('email', userDetail.email);
      localStorage.setItem('password', userDetail.password);
      localStorage.setItem('role', userDetail.role);
      localStorage.setItem('status', userDetail.status);
      localStorage.setItem('info', userDetail.info);

      userDetail.role === 'user' ? navigate('/user') : navigate('/admin');
    }).catch((err) => {
      setOutput('Login unsuccessful 😔');
      setEmail('');
      setPassword('');
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {output && <p className="auth-message">{output}</p>}
        <h2 className="auth-title">Login</h2>
        <form className="auth-form">
          <div className="auth-field">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="auth-field">
            <label htmlFor="pwd">Password:</label>
            <input
              type="password"
              id="pwd"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="button" className="auth-btn" onClick={HandleSubmit}>
            Login
          </button>
          <p className="auth-footer">
            Not registered? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
