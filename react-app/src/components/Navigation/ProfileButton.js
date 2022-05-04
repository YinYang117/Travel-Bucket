import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from "react-router-dom";
import './Navigation.css'
import LogoutButton from "../auth/LogoutButton";
//import User from "../User";

function ProfileButton() {
    const user = useSelector(state => state.session.user);
    //console.log(user)
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    // const logout = (e) => {
    //     e.preventDefault();
    //     dispatch(sessionActions.logout());
    //     // return <Redirect to="/" />
    //     // return history.push("/")
    // };

    return (
        <>
            <button onClick={openMenu}>
                User Profile
                {/* <i className="fa-solid fa-book-journal-whills" style={{ fontSize: "25px" }} /> */}
            </button>
            {showMenu && (
                <ul className="profile-dropdown">

                    <li>
                        <strong>User Id</strong> {user.id}
                    </li>
                    <li>
                        <strong>Username</strong> {user.username}
                    </li>
                    <li>
                        <strong>Email</strong> {user.email}
                    </li>
                    <LogoutButton />
                </ul>
            )}
        </>
    );
}

export default ProfileButton;
