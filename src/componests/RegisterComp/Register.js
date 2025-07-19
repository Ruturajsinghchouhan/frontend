// /components/Register.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

function Register()
{
   const [output,setOutput]=useState(null);
   const [name,setName]=useState(null);
   const [email,setEmail]=useState(null);
   const [password,setPassword]=useState(null);

   
   const HandleSubmit =()=>{
     
    const userDetail ={"name":name,"email":email,"password":password};
    console.log(userDetail);
    if(name==null)
    {
        setOutput("name is required");
    }   
    else if(email==null)
    {
        setOutput("email is required");
        
    }    
    else if(password==null)
    {
        setOutput("password is required");
    }    
    else if(password.length<=4 || password.length>10)
    {
        setOutput("password length must be in between 5-10 char")
    }    
    else
    {
    //Write web services suing a axios tool
     axios.post("https://backend-wf81.onrender.com/user/save",userDetail).then((response)=>{
        setOutput("User Register Successfully");
        setName("");
        setEmail("");
        setPassword("");
     }).catch((error)=>{
        //console.log(error);
        setOutput("User not Register Successfully");
     });
     
   }
}

  return (
    <div className="register-container">
      <h2>Create Your Account</h2>
      <font style={{"color":"blue"}}>{output}</font>
      <form onSubmit={HandleSubmit}>
        <input className='inputname'
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input className='inputname'
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input className='inputname'
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="button" class="btn btn-primary" onClick={HandleSubmit}>Register</button>
        <p>
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
