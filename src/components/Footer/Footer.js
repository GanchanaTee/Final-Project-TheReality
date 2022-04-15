import React from 'react'
import './Footer.css'

import { FaLinkedin, FaGithubSquare } from "react-icons/fa";

function Footer() {
  return (
    <div className='footer-container-end'>
      <div className='footer'>
        <span>
             Built by Ganchana Youpaisan
        </span>
        <div className='footer-icons'>
          <FaLinkedin size="25px" className='footer-icon footer-icon-align'/>
          <FaGithubSquare size="25px" className='footer-icon'/>
        </div>
      </div>
    </div>
  )
}

export default Footer