import React, {useState, useEffect} from 'react'
import runningImage from '../../assets/images/running-color.png'
import preButton from '../../assets/images/arrow-left-color.png'
import nextButton from '../../assets/images/arrow-right-color.png'

import './Activity.css'
import Timer from './Timer/Timer'
import Form from './Form/Form'

function Activity() {

    const [seconds, setSeconds] = useState(898);
    const [isActive, setIsActive] = useState(false);
    const [form, setForm] = useState({
      actTypes: '',
      date: '',
      hr: 0,
      mn: 0,
      cal: 0,
      des: ""
    })

    const handleChange = e => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      })
    }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const Finsih = () => {
    const hrTimer = Math.floor(seconds/3600);
    const mnTimer = (Math.floor( seconds/60 )) % 60;
    const todayDate = new Date()
    const convertdate = (date) => {
      const arrayDate = todayDate.toLocaleDateString().split('/')
      const sufferDate = [arrayDate[2], 
                          (arrayDate[0] < 10 ? '0' : '') + arrayDate[0], 
                          (arrayDate[1] < 10 ? '0' : '') + arrayDate[1],]
      return sufferDate.join('-')
    }
    const newDate = convertdate(todayDate)
    console.log(newDate)
    setForm({
      ...form,
      hr: hrTimer,
      mn: mnTimer,
      actTypes: 'Running',
      date: newDate
    });
    setSeconds(0)
    setIsActive(false)
  }

  return (
    <div className='acitivity-container'>
        <div className='acitivity-parent'>
            <div className='activity-right'>
                <Timer seconds={seconds} setIsActive={setIsActive} isActive={isActive} setSeconds={setSeconds}/>
                <div className='acitivity-right-logo'>
                    <span>Activity Type</span>
                    <div>
                        <img src={preButton} alt='no internet' className='logo-button'/>
                        <img src={runningImage} alt='no internet' className='logo-img'/>
                        <img src={nextButton} alt='no internet'className='logo-button'/>
                    </div>
                </div>
                <div className='acitivity-right-finish'>
                    <button className='button' onClick={Finsih}>
                        RECORD
                    </button>
                </div>
            </div>
            <div className='activity-left'>
                <div className='activity-left-content'>
                    <h2>Your Activity</h2>
                    <form className='activity-form'>
                        <Form form={form} setForm={setForm} handleChange={handleChange} />
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Activity