import { useRef, useState, useEffect } from "react";
import { FaCheck, FaInfoCircle, FaTimes } from "react-icons/fa";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import './Register.css';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,16}/;

function Register() {

  const [registerName, setRegisterName] = useState("");

  let navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  const register = () => {
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
        setErrMsg("Invalid Entry");
        return;
    };
      axios({
        method: "POST",
        data: {
          username: user,
          password: pwd,
          displayName: registerName
        },
        withCredentials: true,
        url: "https://backendthereality.vercel.app/users/register",
      }).then((res) => {
        console.log(res);
        setSuccess(true);
        setUser('');
        setPwd('');
        setRegisterName('');
        if(res.data === "User Created"){
          navigate("/login");
        };
      }).catch((error) => {
        if(error.message === 'Request failed with status code 409') {
          setErrMsg('Username Taken');
        }
        if(error.message === 'Network Error') {
          setErrMsg('Network Error');
        }

      })
  };

  return (
    <div className='register-container'>
      <div className='center'>
        <h1>Register</h1>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <div className='form-register'>
          <div className='form-register-text'>
          <label htmlFor="username">
            Username:
            <FaCheck className={validName ? "valid" : "hide"} />
            <FaTimes className={validName || !user ? "hide" : "invalid"} />
          </label>
          <br/>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            className="register-input"
          />
          <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
              <FaInfoCircle />
              4 to 24 characters. Must begin with a letter.<br />
          </p>
          </div>
          <div className='form-register-text'>
          <label htmlFor="password">
            Password:
            <FaCheck className={validPwd ? "valid" : "hide"} />
            <FaTimes className={validPwd || !pwd ? "hide" : "invalid"} />
          </label>
          <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              className="register-input"
          />
          <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
              <FaInfoCircle />
              8 to 24 characters. Must include uppercase and lowercase letters and a number
          </p>
          </div>
          <div className='form-register-text'>
            <label>Your Name:</label>
            <input onChange={(e) => setRegisterName(e.target.value)} autoComplete="off" required className="register-input"/>
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