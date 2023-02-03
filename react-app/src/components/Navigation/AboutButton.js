import React, { useState, useEffect } from "react";
import { AboutModal } from "../../context/AboutModal";
import githublogo from "./githublogo.png";
import './Navigation.css';

function AboutButton() {
    const [showMenu, setShowMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = () => setShowMenu(false);
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    return (
        <>
            <button className="about-us" onClick={() => setShowModal(true)}>
                About Us
            </button>
            {showModal && (
                <AboutModal onClose={() => setShowModal(false)}>
                    <div className="formContainer12">
                        <div className="github">
                            <img src={githublogo} alt="Github"/>
                            <a href="https://github.com/YinYang117" target="_blank" rel="noreferrer noopener">Ryan</a>
                        </div>
                        <div className="github">
                            <img src={githublogo} alt="Github"/>
                            <a href="https://github.com/huyennguuyen" target="_blank" rel="noreferrer noopener">Huyen</a>
                        </div>
                        <div className="github">
                            <img src={githublogo} alt="Github"/>
                            <a href="https://github.com/kickylau" target="_blank" rel="noreferrer noopener">Kicky</a>
                        </div>
                        <div className="github">
                            <img src={githublogo} alt="Github"/>
                            <a href="https://github.com/suwanshree" target="_blank" rel="noreferrer noopener">Suwan</a>
                        </div>
                    </div>
                </AboutModal>
            )}
        </>
    );
}

export default AboutButton;
