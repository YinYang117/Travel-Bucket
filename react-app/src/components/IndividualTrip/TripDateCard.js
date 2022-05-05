import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { Modal } from "../../context/Modal";


function TripDateCard () {

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    return (
        <>
            <div>
                <h1>This is a Trip date Card</h1>  
            </div> 
        </>
    )
}

export default TripDateCard;