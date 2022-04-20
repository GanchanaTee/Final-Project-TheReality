import React,{useState} from 'react'
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

import './Login.css'

function Login(props) {

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  let navigate = useNavigate();

  const login = () => {
    axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:3000/users/login",
    }).then((res) => {
      console.log(res.data);
      if(res.data === "Successfully Authenticated"){
        props.setIsLogin(true);
        navigate("/");
      };
    });
  };


  return (
    <div className='login-container'>
      <div className='center'>
        <h1>Log In</h1>
        <div className='form'>
          <div className='form-text'>
            <input onChange={(e) => setLoginUsername(e.target.value)} required/>
            <span></span>
            <label>Username</label>
          </div>
          <div className='form-text'>
            <input onChange={(e) => setLoginPassword(e.target.value)} type="password" required/>
            <span></span>
            <label>Password</label>
          </div>
          <button onClick={login} className='submit-btn'>Submit</button>
          <div className="signup_link">
            Not a member? <Link to='/register'>Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login