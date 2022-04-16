import React from 'react'
import axios from 'axios';
import './Form.css'

function Form(props) {

    const sumDuration = parseInt(props.form.mn) + (parseInt(props.form.hr) * 60); 

    const records = (event) => {
        event.preventDefault();
        axios({
          method: "POST",
          data: {
            activityName: props.form.actTypes,
            timestamp: props.form.date,
            duration: sumDuration,
            calories: props.form.cal,
            description: props.form.des,
          },
          withCredentials: true,
          url: "http://localhost:4000/users/me/records",
        }).then((res) => {
          console.log(res);
          props.setForm({
            actTypes: '',
            date: '',
            hr: 0,
            mn: 0,
            cal: 0,
            des: ""
          });
          props.setActivityForm(false);
        });
      };

  return (
    <>
        <div className='form-actType'>
            <label>Activity Type: </label> 
            <input type="text" value={props.form.actTypes} name="actTypes" onChange={props.handleChange} required />
        </div>
        <div className='form-date'>
            <label>Date:</label> 
            <input type="date" value={props.form.date} name="date" onChange={props.handleChange}  required/> 
        </div>
        <div>
            <label>Duration:</label> <br/>
            <input type="number" value={props.form.hr} name="hr" onChange={props.handleChange} min={0} max={24} required></input>
            <label>Hr:</label> 
            <input type="number" value={props.form.mn} name="mn" onChange={props.handleChange} min={0} max={59} required></input>
            <label>Mn:</label>  
        </div>
        <div>
            <label>Calorie: </label>
            <input type="number" value={props.form.cal} name="cal" onChange={props.handleChange} min={0} max={9999}/>
            <label>cals </label>
        </div>
        <div>
            <label >Description: </label> <br/>
            <textarea name="des" cols="30" rows="3" value={props.form.des} onChange={props.handleChange}></textarea>
        </div>
        <button onClick={records}>Add</button>
    </>
  )
}

export default Form