import React from 'react'

import './Record.css'

function Record() {
  return (
    <div className='record-container'>
        <div className='top-plus'>
          <div className='data-result'>
            GOAL
            <br/>
            5000 min
          </div>
          <div className='data-result'>
            CURRENT TOTAL
            <br/>
            50 min
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
      </div>
      <div className='data-activity'>
        <div className='data-activity-user'>
          13 / 06 /2022
        </div>
        <div className='data-activity-user'>
          RUN
        </div>
        <div className='data-activity-user'>
          30 min
        </div>
        <div className='data-activity-user'>
          324
        </div>
      </div>
    </div>
  )
}

export default Record