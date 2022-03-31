import './App.css';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' 

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Profile/>} />
          <Route path="/login" element={<Login/>} />
        </Routes> 
      </div>
    </Router>
  );
}

export default App;
