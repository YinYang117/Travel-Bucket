import React, { useState, useEffect } from "react";
import "./TripCard.css"


function TripCard ({trip}) {
    // does this need curly brackets ???
    return (
       <>
            <div>{trip.name}</div>
            <div>{trip.destination}</div>
            <img src={trip.imageUrl} alt={`image for ${trip.name}`} className="image"/>
            <div>{trip.startDate}</div>
            <div>{trip.endDate}</div>
       </> 
    )
}

export default TripCard;