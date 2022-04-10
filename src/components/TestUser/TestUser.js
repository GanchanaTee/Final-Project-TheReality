import React, {useState} from 'react';
import axios from 'axios';

function TestUser() {

  const [data, setData] = useState(null);
    
  const getUser = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/users/user",
    }).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  };

  const logOut = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/users/logout",
    });
    setData(null);
  }

  return (
    <div>
      <h1>Get User</h1>
      <button onClick={getUser}>Submit</button>
      {data ? <h1>Welcome Back {data.username}</h1> : null}
      <br/>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
}

export default TestUser