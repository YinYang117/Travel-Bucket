import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import DemoButton from '../auth/DemoButton';
import LoginFormModal from '../LoginFormModal';
import ProfileButton from './ProfileButton';
import SignUpFormModal from '../SignUpModal';
import AddATripModal from '../AddATripModal';

const NavBar = () => {
  const user = useSelector(state => state.session.user);

  let sessionLinks;
  if (user) {
    sessionLinks = (
      <ul className="logged-in-nav">
        <li className="nav button1">
          <AddATripModal/>
        </li>
        <li className="nav button2">
          <NavLink to="/Home" exact={true} className="trips">
            Trips
          </NavLink>
        </li>

        <li className="nav button3">
          <ProfileButton/>
        </li>
      </ul>
    );
  } else {
    sessionLinks = (
      <ul className="logged-out-nav">
        <li className="nav button1">
          <DemoButton />
        </li>
        <li className="nav button2">
          <LoginFormModal />
        </li>
        <li className="nav button3">
          <SignUpFormModal/>
        </li>
      </ul>
    );
  }

  return (
    <nav className="nav-container">
      <ul className="nav-bar-left">
        <li className="nav-list">
          <NavLink to='/Home' exact={true} className="nav-link">
            <img src="/static/icon.png" className="icon" alt="Travel Bucket Icon" />
            <h2 id="travel">Travel Bucket</h2>
          </NavLink>
        </li>
      </ul>
      <ul className="nav-bar-right">
        <li>{sessionLinks}</li>
      </ul>
    </nav>
  );
}

export default NavBar;
