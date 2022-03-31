import {useEffect} from 'react'
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';

import logo from '../../assets/images/My-Reality2.png'

const Navbar = () => {

  function animation(){
    var tabsNewAnim = $('#navbarSupportedContent');
    var activeItemNewAnim = tabsNewAnim.find('.active');
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight() + 10;
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();
    $(".hori-selector").css({
      "top":itemPosNewAnimTop.top + "px", 
      "left":itemPosNewAnimLeft.left + "px",
      "height": activeWidthNewAnimHeight + "px",
      "width": activeWidthNewAnimWidth + "px"
    });
    $("#navbarSupportedContent").on("click","li",function(e){
      $('#navbarSupportedContent ul li').removeClass("active");
      $(this).addClass('active');
      var activeWidthNewAnimHeight = $(this).innerHeight();
      var activeWidthNewAnimWidth = $(this).innerWidth();
      var itemPosNewAnimTop = $(this).position();
      var itemPosNewAnimLeft = $(this).position();
      $(".hori-selector").css({
        "top":itemPosNewAnimTop.top + "px", 
        "left":itemPosNewAnimLeft.left + "px",
        "height": ( activeWidthNewAnimHeight + 10) + "px",
        "width": activeWidthNewAnimWidth + "px"
      });
    });
  }

  useEffect(() => {
    animation();
    $(window).on('resize', function(){
      setTimeout(function(){ animation(); }, 500);
    });
    
  }, []);

  return (
  <nav className="navbar-container navbar-mainbg ">
    <div className='navbar-parent'>
      <div className='nav-main-logo'>
        <NavLink className="navbar-brand navbar-logo" to="/" exact>
          <img src={logo} alt="no internet"/>
        </NavLink>
        <span>My <span>Reality</span></span>
      </div>
      <div className='nav-menu'>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <div className="hori-selector">
              <div className="left"></div>
              <div className="right"></div>
            </div>
            <li className="nav-item active">
              <NavLink className="nav-link" to="/" exact>
                Home
              </NavLink>
            </li>         
            <li className="nav-item">
              <NavLink className="nav-link" to="/login" exact>
                 Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
      {/* <button 
        className="navbar-toggler"
        onClick={ function(){
          setTimeout(function(){ animation(); });
        }}
        type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fas fa-bars text-white"></i>
      </button> */}
 
      
  </nav>
  )
}
export default Navbar;