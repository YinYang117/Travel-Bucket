import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from "react-router-dom";
import './Navigation.css'
import LogoutButton from "../auth/LogoutButton";
import { ProfileModal } from "../../context/ProfileModal";
//import User from "../User";

function ProfileButton() {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);
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
            <button className="User-Profile" onClick={() => setShowModal(true)}>
                {/* <button onClick={openMenu}> */}
                User Profile
            </button>
            {showModal && (
                <ProfileModal onClose={() => setShowModal(false)}>
                    <div className="formContainer11">
                        <ul className="profile-dropdown">
                            <li className="dropdown-list">
                                <strong>User Id</strong> {user.id}
                            </li>
                            <li className="dropdown-list">
                                <strong>Username</strong> {user.username}
                            </li>
                            <li className="dropdown-list">
                                <strong>Email</strong> {user.email}
                            </li>
                            <li className="logout">
                                <LogoutButton/>
                            </li>
                        </ul>
                    </div>
                </ProfileModal>
            )}
        </>
    );
}

export default ProfileButton;
