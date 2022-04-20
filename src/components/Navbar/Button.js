import React from "react";
import { Link } from "react-router-dom";
import {FaUser, FaSignOutAlt} from "react-icons/fa";
import "./Button.css";
import axios from "axios";

function Button(props) {

  const logOut = () => {
    axios({
      method: "DELETE",
      withCredentials: true,
      url: "http://localhost:3000/users/logout",
    });
    props.setIsLogin(false);
  };

  const toggleButton = () => {
    if (props.type === 'login') {
      return (<Link to='login'>
        <button className="btn">
          <FaUser/>
          <span>Log In</span>
        </button>
      </Link>)
    } else {
      return (<Link to='login'>
        <button className="btn" onClick={logOut}>
          <FaSignOutAlt/>
          <span>Log Out</span>
        </button>
      </Link>)
    }
  }

  return (
    <>
      {toggleButton()}
    </>
  );
}

export default Button;