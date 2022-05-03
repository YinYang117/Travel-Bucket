
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import DemoButton from './auth/DemoButton';

const NavBar = () => {
  return (
    <nav className="nav-container">
      <ul className="nav-bar-left">
        <li className="nav-list">
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
      </ul>
      <ul className="nav-bar-right">
        <li className="nav-list">
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li className="nav-list">
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li className="nav-list">
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li className="nav-list">
          <LogoutButton />
        </li>
        <li>
          <DemoButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
