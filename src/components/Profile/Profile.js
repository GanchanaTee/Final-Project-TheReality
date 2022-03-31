import React, {useState} from 'react'

import { FaTimes, FaPlus } from "react-icons/fa";

import Activity from '../Activity/Activity'
import Record from '../Record/Record';
import './Profile.css'

function Profile() {

  const [actForm, setActForm] = useState(false)

  const toggleForm = () => {
    setActForm(!actForm)
  }

  return (
    <div className='profile-container'>
      <div className='profile-parent'>
        <div className='profile-box'>
        </div>
        <div className='content-box'>
          { actForm ? <Activity/> : <Record/> }
        </div>
        <div className='button-box'>
        { actForm ? <FaTimes onClick={toggleForm}/>  : <FaPlus onClick={toggleForm}/>}
        </div>
      </div>
    </div>
  )
}

export default Profile