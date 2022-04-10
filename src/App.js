import './App.css';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Navbar from './components/Navbar/Navbar'

import TestUser from './components/TestUser/TestUser';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' 

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Profile/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/user' element={<TestUser />}/>
        </Routes> 
      </div>
    </Router>
  );
}

export default App;
