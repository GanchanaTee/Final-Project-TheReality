import './App.css';
import Profile from './view/Profile/Profile';
import Login from './view/Login/Login';
import Register from './view/Register/Register';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import TestUser from './components/TestUser/TestUser';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' 
import { useState } from 'react';

function App() {
  
  const [isLogin, setIsLogin] =useState(false)

  return (
    <Router>
      <div className="App">
        <Navbar isLogin={isLogin} setIsLogin={setIsLogin}/>
        <Routes>
          <Route path="/" element={<Profile setIsLogin={setIsLogin}/>} />
          <Route path="/login" element={<Login setIsLogin={setIsLogin}/>}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/user' element={<TestUser />}/>
        </Routes>
        <Footer/> 
      </div>
    </Router>
  );
}

export default App;
