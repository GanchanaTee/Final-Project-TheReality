import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Record.css'

import ListRecord from '../ListRecords/ListRecords'

function Record(props) {

  const [formRecords,setFormRecords] = useState([]);
  const setLogged =  props.setIsLogin;

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/users/me/records",
    }).then((res) => {
      setFormRecords(res.data);
      setLogged(true)
      // console.log(res.data);
    });
  },[setLogged, formRecords]);
  // Warning unmount formRecords

  const currentMin = formRecords.reduce( (totalMin, record) => {
    return totalMin + record.duration
  },0);

  return (
    <div className='record-container'>
        <div className='top-plus'>
          <div className='data-result'>
            GOAL
            <br/>
            {props.data && props.data.durationGoal} min
          </div>
          <div className='data-result'>
            CURRENT TOTAL
            <br/>
            {currentMin} min
          </div>
        </div>
        <div className='data-activity'>
        <div className='data-activity-user'>
          DATE
        </div>
        <div className='data-activity-user'>
          ACTIVITY
        </div>
        <div className='data-activity-user'>
          TIMES
        </div>
        <div className='data-activity-user'>
          CALORIES
        </div>
        <div className='data-activity-user'>
          
        </div>
      </div>
      {formRecords.map((formRecord) => 
             <ListRecord 
               key={formRecord._id}
               id={formRecord._id} 
               actName={formRecord.activityName}
               date={formRecord.timestamp}
               duration={formRecord.duration}
               calories={formRecord.calories}
               description={formRecord.description}
              //  setModalEditOpen={setModalEditOpen}
                />  
          )}
    </div>
  )
}

export default Record