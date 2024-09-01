// src/components/layout/Header.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Avatar } from '@mui/material';
import { useHistory } from 'react-router-dom';
import "./Header.css";
import { openModal } from '../../action/modalAction';
import { logout } from '../../action/userActions'; // Import the logout action
import Login from '../Login';
import SignUp from '../SignUp'; // Import Signup component

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const openModalHandle = (component) => {
    dispatch(openModal("open", component));
  };

  const handleLogout = () => {
    dispatch(logout());
    history.push('/'); // Redirect to home page after logout
  };

  return (
    <div className="header">
      <img 
        src="https://media.istockphoto.com/id/1190336085/photo/one-like-social-media-notification-with-heart-icon.webp?a=1&b=1&s=612x612&w=0&k=20&c=4EeR6KidL5OLLFi_PN8aolZXD42H4-wgNwsd49dmOpE=" 
        className="header_logo" 
        alt="logo" 
      />
      <div className="header_center">
        <input type="text" />
        <SearchIcon />
      </div>
      <div className="header_right">
        <p>Live the Healthy Lifestyle</p>
        <LanguageIcon />
      </div>
      <div className="dropdown">
        <ExpandMoreIcon className="dropdownbtn" />
        <div className="dropdown-content">
          {userInfo ? (
            <>
              <span>Account</span>
              <span onClick={handleLogout}>Log Out</span> {/* Add onClick handler for logout */}
            </>
          ) : (
            <>
              <span onClick={() => openModalHandle(<SignUp />)}>Sign Up</span> {/* Open signup modal */}
              <span onClick={() => openModalHandle(<Login />)}>Log In</span> {/* Open login modal */}
            </>
          )}
          <span>Help</span>
        </div>
      </div>
      <Avatar />
    </div>
  );
};

export default Header;


