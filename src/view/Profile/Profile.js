import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { FaTimes, FaPlus } from "react-icons/fa";

import AddActivity from '../../components/AddActivity/AddActivity'
import Record from '../../components/Record/Record';
import ProfileData from '../../components/ProfileData/ProfileData';
import './Profile.css'

function Profile(props) {

  const [activityForm, setActivityForm] = useState(false);
  const [data, setData] = useState(null);
  const [profileData, setProfileData] = useState({
    displayName: "",
    aboutMe: "",
    favorite: "",
    minGoal: 0
  });

  const getProfileAPI = () => {
    axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:3000/users/me",
        }).then((res) => {
        setData(res.data);      
        });
  };

  useEffect( () => {
    let isMounted = true;
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3000/users/me",
      }).then((res) => {
        if(isMounted) setData(res.data);      
      });
      return () => { isMounted = false}
  },[data]);

  const handleProfileChange = e => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    })
  }

  const toggleForm = () => {
    setActivityForm(!activityForm)
  }

  return (
    <div className='profile-container'>
      <div className='profile-parent'>
        <div className='profile-box'>
          <ProfileData profileData={profileData} handleProfileChange={handleProfileChange} setProfileData={setProfileData} data={data} getProfileAPI={getProfileAPI}/>
        </div>
        <div className='content-box'>
          { activityForm ? <AddActivity setActivityForm={setActivityForm}/> : <Record setIsLogin={props.setIsLogin} data={data}/> }
        </div>
        <div className='button-box'>
        { activityForm ? <FaTimes onClick={toggleForm}/>  : <FaPlus onClick={toggleForm}/>}
        </div>
      </div>
    </div>
  )
}

export default Profile