import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Record.css'

import ListRecord from './ListRecords/ListRecords'
import Modal from './Modal/Modal' ;
import { Vercel_URL } from '../../api/vercel';

function Record(props) {

  const [formRecords,setFormRecords] = useState([]);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modelID, setModelID] = useState();
  const setLogged =  props.setIsLogin;

  useEffect(() => {
    let isMounted = true;
    axios({
      method: "GET",
      withCredentials: true,
      // url: "http://localhost:3000/users/me/records",
      url: `${Vercel_URL}/users/me/records`,
    }).then((res) => {
      if (isMounted) {
        setFormRecords(res.data);
        setLogged(true)
      };
    });
    return () => { isMounted = false }
  },[setLogged]);

  const currentMin = formRecords.reduce( (totalMin, record) => {
    return totalMin + record.duration
  },0);

  return (
    <div className='record-container'>
      {modalEditOpen ? <Modal setModalEditOpen={setModalEditOpen} modelID={modelID}/> :
      (<>
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
              setModalEditOpen={setModalEditOpen}
              modalEditOpen={modalEditOpen}
              setModelID={setModelID}
                />  
          )}
      </>)}
    </div>
  )
}

export default Record