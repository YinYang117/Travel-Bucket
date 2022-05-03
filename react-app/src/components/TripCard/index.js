import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as tripActions from "../store/trip"

function TripCard ({trip}) {
    // does this need curly brackets ???
    return (
       <>
            <div></div>
            <div>{trip.destination}</div>
       </> 
    )
}