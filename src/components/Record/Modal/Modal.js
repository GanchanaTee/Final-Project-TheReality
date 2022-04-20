import React,{useState, useEffect} from 'react'
import './Modal.css'
import { FaTimes, FaEdit, FaRegSave, FaTrashAlt } from "react-icons/fa";

import axios from 'axios';

function Modal(props) {
  const [data, setData] = useState();
  const [canEdit, setCanEdit] = useState(false);
  const [form, setForm] = useState({
    actTypes: '',
    date: '',
    duration: 0,
    cal: 0,
    des: ""
  });
  const searchID = props.modelID;

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  useEffect( () => {
    let isMounted = true;
    axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:3000/users/me/records/${searchID}`,
      }).then((res) => {
        if(isMounted) setData(res.data);  
      });
      return () => { isMounted = false}
  },[searchID]);

  async function deletePost(e) {
    await axios({
      method: "DELETE",
      withCredentials: true,
      url: `http://localhost:3000/users/me/records/${searchID}`,
    });
    props.setModalEditOpen(false)
  };

  const toEdit = () => {
    setForm({
      actTypes: data[0].activityName,
      date: data[0].timestamp.slice(0,10),
      duration: data[0].duration,
      cal: data[0].calories,
      des: data[0].description
    });
    setCanEdit(!canEdit);
  };

  const save = () => {
    axios({
      method: "PUT",
      data: {
        activityName: form.actTypes,
        timestamp: new Date(form.date)  ,
        duration: parseInt(form.duration) ,
        calories: parseInt(form.cal) ,
        description: form.des,
      },
      withCredentials: true,
      url: `http://localhost:3000/users/me/records/${searchID}`,
    }).then((res) => {
      // console.log(res);
    });
    // setCanEdit(!canEdit);
    props.setModalEditOpen(false)
  };

  return (
    <div className='model-container'>
      <div className='model-content'>
        <span>Your Record</span> <br/>
        Activity Name:{ data && ( canEdit ? 
          <input type='text' placeholder='Enter Your Activity Name' 
          name="actTypes" value={form.actTypes} 
          onChange={handleChange}/>
          : <div>{data[0].activityName}</div>)}
        Date:{ data && ( canEdit ?
          <input type='date' placeholder='Enter Date' 
          name="date" value={form.date} 
          onChange={handleChange}/>
          : <div>{data[0].timestamp.slice(0,10)}</div>)}
        duration:{ data && ( canEdit ? 
          <input type='number' placeholder='Enter your activity duration' 
          name="duration" value={form.duration} 
          onChange={handleChange}/>
          : <div>{data[0].duration} min</div>)} 
        Calories:{ data && ( canEdit ? 
        <input type='number' placeholder='Enter your activity calories' 
        name="cal" value={form.cal} 
        onChange={handleChange}/>
        : <div>{data[0].calories} cal</div>)} 
        Description:{ data && ( canEdit ? 
        <input type='text' placeholder='Enter your activity description' 
        name="des" value={form.des} 
        onChange={handleChange}/>
        : <div>{data[0].description}</div>)}
        <div className='model-content-btn'>
          { canEdit ? 
          <button className='iconModal' onClick={save}><FaRegSave size="2rem" className="colorFontAS"/></button>
          : <button className='iconModal' onClick={toEdit}><FaEdit size="2rem" className="colorFontAS"/></button>}
          <button className='iconModal' onClick={deletePost}><FaTrashAlt size="2rem" className="colorFontAS"/></button>
        </div>
      </div>
      <div className='modal-icon'>
        <button className="iconModal" onClick={() => props.setModalEditOpen(false)}>
          <FaTimes className="colorFontAS" size="1rem" />
        </button>
      </div>
    </div>
  )
}

export default Modal ;