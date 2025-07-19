// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './componests/NavComp/Nav';
import Home from './componests/HomeComp/Home';
import Login from './componests/LoginComp/Login';
import User from './componests/UserComp/user';
import Register from './componests/RegisterComp/Register'
import Result from './componests/ReseltComp/Result';
import Footer from './componests/FooterComp/Footer';
import TravelForm from './componests/AssitantComp/Assistant';
import Profile from './componests/ProfileComp/Profile';
import Admin from './componests/AdminComp/Admin';
import ManageUser from './componests/MangeComp/Manage-user';
// import other pages as you create them

function App() {
  return (
    <> 
     
     
     
    <Router>
      
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/user" element={<User/>} />            
        <Route path="/manage-user" element={<ManageUser/>} />            
        <Route path="/admin" element={<Admin/>} />            
        <Route path="/profile" element={<Profile/>} />            
        <Route path="/assistant" element={<TravelForm/>} />            
        
        <Route path="/result" element={<Result/>} />        
        <Route path="/register" element={<Register/>} />  

         
      
      </Routes>
        <div className="page-content"></div>
       <Footer/>
    </Router></>
   
  
  );
}

export default App;

