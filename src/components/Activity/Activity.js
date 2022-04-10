import React, {useState, useEffect} from 'react'

import running from '../../assets/images/running.png'
import swimming from '../../assets/images/swiming.png'
import walking from '../../assets/images/walk.png'
import weight from '../../assets/images/weight.png'
import biking from '../../assets/images/bike.png'
import batminton from '../../assets/images/batminton.png'


import preButton from '../../assets/images/arrow-left-color.png'
import nextButton from '../../assets/images/arrow-right-color.png'

import './Activity.css'
import Timer from './Timer/Timer'
import Form from './Form/Form'

function Activity() {

    const ACITIVITIES_TYPE = [
      {label: 'Running', actSrc: running },
      {label: 'Swimming', actSrc: swimming },
      {label: 'Walking', actSrc: walking },
      {label: 'Weight', actSrc: weight },
      {label: 'Biking', actSrc: biking },
      {label: 'Batminton', actSrc: batminton },
    ]

    const [slideAct, setSlideAct] =useState (0);
    const [seconds, setSeconds] = useState(0);
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

    const next = () => {
      if (slideAct === (ACITIVITIES_TYPE.length-1)) {
        setSlideAct(0)
      } else {
        const nextSide = slideAct + 1
        setSlideAct(nextSide)
      }
    }

    const previous = () => {
      if (slideAct === 0) {
        setSlideAct(ACITIVITIES_TYPE.length-1)
      } else {
        const nextSide = slideAct - 1
        setSlideAct(nextSide)
      }
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
      actTypes: ACITIVITIES_TYPE[slideAct].label,
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
                        <img src={preButton} alt='no internet' className='logo-button' onClick={previous}/>
                        <img src={ACITIVITIES_TYPE[slideAct].actSrc} alt='no internet' className='logo-img'/>
                        <img src={nextButton} alt='no internet'className='logo-button' onClick={next}/>
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