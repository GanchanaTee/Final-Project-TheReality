import React, {useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {

  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");

  let navigate = useNavigate();

  const register = () => {
    axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
        displayName: registerName
      },
      withCredentials: true,
      url: "http://localhost:4000/users/register",
    }).then((res) => {
      console.log(res);
      if(res.data === "User Created"){
        navigate("/login");
      };
    });
  };

  return (
    <div className='login-container'>
      <div className='center'>
        <h1>Register</h1>
        <div className='form'>
          <div className='form-text'>
          <input onChange={(e) => setRegisterUsername(e.target.value)} required/>
            <span></span>
            <label>Username</label>
          </div>
          <div className='form-text'>
          <input onChange={(e) => setRegisterPassword(e.target.value)} required/>
            <span></span>
            <label>Password</label>
          </div>
          <div className='form-text'>
          <input onChange={(e) => setRegisterName(e.target.value)} required/>
            <span></span>
            <label>Your Name</label>
          </div>
          <button onClick={register} className='submit-btn'>Submit</button>
          <div className="signup_link">
            Are you member? <Link to='/login'>Log in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register