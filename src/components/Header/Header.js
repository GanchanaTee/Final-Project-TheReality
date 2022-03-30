import React, { useState } from 'react'
import logoImage from '../../assets/images/My-Reality2.png'
import logoHam from '../../assets/images/Hamburger_icon.png'
import './Header.css'



function Header() {

    const [showHeaderOptions, setShowHeaderOptions] = useState(false);

    const TOTAL_OPTIONS = ["Home", "My Activities", "Community", "Profile"]

    const getHeaderOptions = () => {
        return TOTAL_OPTIONS.map((option, i) => (
            <div key={option} className="header-option">
                <span>{TOTAL_OPTIONS[i]}</span>
            </div>
        ))
    };



  return (
    <div className='header-container'>
        <div className='header-parent'>
            <div className='header-logo'>
                <img src={logoImage} alt='no internet' />
                <span >The <span>Reality</span></span>
            </div>
            <div className='header-hamburger' onClick={() => setShowHeaderOptions(!showHeaderOptions)}>
                <button className="glow-on-hover" type="button">
                    <img src={logoHam} alt='no internet' />
                </button>   
            </div>
        </div>
        <div className={showHeaderOptions ? 'header-options show-hamburger-options' : 'header-options'}>
            {getHeaderOptions()}
        </div>
    </div>
  )
}

export default Header