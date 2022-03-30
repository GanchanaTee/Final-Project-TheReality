import React from 'react'
import './Form.css'

function Form(props) {
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
            <textarea name="des" cols="40" rows="3" value={props.form.des} onChange={props.handleChange}></textarea>
        </div>
        <button type="submit" className="button">Add</button>
    </>
  )
}

export default Form