import './Style/navbar.css';
import React, { useEffect, useState } from 'react';

import { HashLink as Link } from 'react-router-hash-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import { BASE_URL } from './URL';
import './Animation.css';
function Navbar(props) {
  const [userData,setUserData]=useState(null)
 const [loading,setLoading]=useState(true)
  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = Cookies.get('token');
       
       
        
        const response = await fetch(`${BASE_URL}/profile`, {
          headers: {
            Authorization: token
          }
        });

        if (response.ok) {
          const data = await response.json();
          //console.log(data);
          setUserData(data);
          
        } else {
          throw new Error('Failed to fetch profile');
        }
      } catch (error) {
        console.error(error);
      } finally{
        setLoading(true);
      }
    }

    fetchProfile();
  }, []);

  

 

  const [isOpen, setIsOpen] = useState(false);
  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = (event) => {
    if (event.target.closest('.navbar-dropdown')) return;
    setIsOpen(false);
  };
function handleLogOut(){
    Cookies.remove('token');
    setUserData(null);
}
if(!loading){
  return <div className="loading-container">
  <div className="loading-spinner"></div>
</div>
}
  return (
    <div className="navbar-container">
      <ul id="navbar">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="#about">About</Link>
        </li>
        <li>
          <Link to="#services">Services</Link>
        </li>
        {userData ? (
          <div className="profile">
           
            <li onClick={handleDropdown}>
            <p>{userData.user.name}</p>
            </li>
            <li onClick={handleDropdown}>
              <FontAwesomeIcon className="profile-icon" icon={faUserCircle} size="xl" />
            </li>
          </div>
        ) : (
          <li>
            <Link to="/user/registration">Reg/LogIn</Link>
          </li>
        )}
      </ul>

      {isOpen && (
        <ul className="navbar-vertical" onClick={handleOutsideClick}>
          <li>
            <Link className="" to="/user/profile">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/user/booking">Booking History</Link>
          </li>
          <li>
            <Link to='/' onClick={()=>{handleLogOut()}}>LogOut</Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Navbar;



