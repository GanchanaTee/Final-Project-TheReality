import React, {useState} from 'react';
import axios from 'axios';
import './ProfileData.css'
function ProfileData(props) {
  
  const [toggleEdit, setToggleEdit] = useState(false);

    const editProfileAPI= () => {
        axios({
            method: "PUT",
            data: {
              favorite: props.profileData.favorite,
              aboutMe: props.profileData.aboutMe,
              displayName: props.profileData.displayName,
              durationGoal: props.profileData.minGoal
            },
            withCredentials: true,
            url: "http://localhost:3000/users/edit",
          }).then((res) => {
            // console.log(res);
          });
    };
    const initProfileDataForm = () => {
      props.setProfileData({
        displayName: props.data.displayName,
        aboutMe: props.data.aboutMe,
        favorite: props.data.favorite,
        minGoal : props.data.durationGoal
      }); 
      setToggleEdit(!toggleEdit);
    };

    const editProfileData = () => {
        editProfileAPI();
        setToggleEdit(false);
        props.getProfileAPI();
    };

    return (
        <div className='profile-right-container'>
        <div>
          <img src={require("../../assets/images/PROFILE.png")} alt='profile-pic' className='pro-pic' />
        </div>

        {/* data profile */}
        <div className='data-profile'>
          <div className='data-profile-user'>
          { toggleEdit ?
              <>Name : <input type='text' placeholder='Enter Your Name' 
              name="displayName" value={props.profileData.displayName} 
              onChange={props.handleProfileChange} className='profile-input'/> </>
              :(props.data ? <span>Welcome Back, {props.data.displayName}</span> : <></>)}
          </div>    
          <div className='data-profile-user'>
            AboutMe :
            <br/>
            {toggleEdit ?
                <input type='text' placeholder='Entre your about me' 
                name="aboutMe" value={props.profileData.aboutMe} 
                onChange={props.handleProfileChange} className='profile-input'/>
                : (props.data ? <p>{props.data.aboutMe}</p> : <></>)}
          </div>
          <div className='data-profile-user'>
            Favourite :
            <br/>
            { toggleEdit ? 
                <input type='text' placeholder='Enter your favourite activity' 
                name="favorite" value={props.profileData.favorite} 
                onChange={props.handleProfileChange} className='profile-input'/>
                : (props.data ? <p>{props.data.favorite}</p> : null)
            }
          </div>
          {toggleEdit && <div className='data-profile-user'>
            Minutes Goal :
            <br/>
              <input type='text' placeholder='Enter your miniute goal' 
              name="minGoal" value={props.profileData.minGoal} 
              onChange={props.handleProfileChange} className='profile-input'/>
          </div>}
          <div className='profile-button'>
            { !toggleEdit ? 
              <button type="button" className="profile-btn" onClick={initProfileDataForm}>edit</button> 
              : 
              <button type='button' className='profile-btn' onClick={editProfileData}>Submit</button>
            }
          </div>
        </div>
      </div>
    )
    
}

export default ProfileData;