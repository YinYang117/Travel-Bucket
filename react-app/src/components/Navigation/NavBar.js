//ORIGINAL
// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import LogoutButton from './auth/LogoutButton';
// import DemoButton from './auth/DemoButton';
// import LoginFormModal from './LoginFormModal';
// //import { login } from '../../store/session';

// const NavBar = () => {
//   return (
//     <nav className="nav-container">
//       <ul className="nav-bar-left">
//         <li className="nav-list">
//           <NavLink to='/' exact={true} activeClassName='active'>
//             Home
//           </NavLink>
//         </li>
//       </ul>
//       <ul className="nav-bar-right">
//         <li className="nav-list">
//           <NavLink to='/login' exact={true} activeClassName='active'>
//             Login
//           </NavLink>
//         </li>
//         <li className="nav-list">
//           <NavLink to='/sign-up' exact={true} activeClassName='active'>
//             Sign Up
//           </NavLink>
//         </li>
//         <li className="nav-list">
//           <NavLink to='/users' exact={true} activeClassName='active'>
//             Users
//           </NavLink>
//         </li>
//         <li className="nav-list">
//           <LogoutButton />
//         </li>
//         <li>
//           <DemoButton />
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default NavBar;

import React from 'react';
import { NavLink } from 'react-router-dom';
// import LogoutButton from '../auth/LogoutButton';
import { useSelector } from "react-redux";
import DemoButton from '../auth/DemoButton';
import LoginFormModal from '../LoginFormModal';
import ProfileButton from './ProfileButton';
import SignUpFormModal from '../SignUpModal';
import AddATripModal from '../AddATripModal';
// import { login } from '../../store/session';

const NavBar = () => {
  const user = useSelector(state => state.session.user);

  let sessionLinks;
  if (user) {
    sessionLinks = (
      <ul className="logged-in-nav">
        <li className="nav button1">
          <AddATripModal/>
        </li>
        {/* <NavLink to={`/users/${user.id}`}>User Profile</NavLink> */}
        <li className="nav button2">
          <NavLink to="/Home" exact={true} className="trips">
            Trips
          </NavLink>
        </li>
        {/* <li className="nav-list">
          <LogoutButton />
        </li> */}
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
        {/* <NavLink to='/sign-up' exact={true} activeClassName='active'>
          Sign Up
        </NavLink> */}
      </ul>
    );
  }

  return (
    <nav className="nav-container">
      <ul className="nav-bar-left">
        <li className="nav-list">
          <NavLink to='/Home' exact={true} className="nav-link">
            <img src="/icon.png" className="icon" alt="Travel Bucket Icon" />
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
