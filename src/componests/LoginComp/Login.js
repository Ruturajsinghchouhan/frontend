import './Login.css';
import { useState } from 'react';
import { userApi } from '../../apiUrl';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();

  const [output, setOutput] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const HandleSubmit = () => {
    const userDetail = { email, password };
console.log(userDetail);
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
    <>
<div className="login-wrapper">
  <div className="login-box">
    {output && <p className="login-output">{output}</p>}
    <h1>Login</h1>
    <form>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="pwd">Password:</label>
        <input
          type="password"
          id="pwd"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="button" onClick={HandleSubmit}>Login</button>
    </form>
  </div>
</div>

    </>
  );
}

export default Login;
