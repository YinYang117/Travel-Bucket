import React, { useState, useEffect } from "react";
import { Modal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import * as tripActions from "../../store/trip";
import { useHistory } from "react-router-dom";

import usePlacesAutocomplete from "use-places-autocomplete";
import "./AddATrip.css";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  MarkerClusterer,
  InfoWindow,
} from "@react-google-maps/api";
import MapContainer from "../Map";

function AddATripModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  // const key = useSelector(state => state.map.key)

  const [ownerId, setOwnerId] = useState(sessionUser?.id);
  const [showInModal, setShowInModal] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [longitude, setLongitude] = useState(0.0);
  const [latitude, setLatitude] = useState(0.0);
  const [imageUrl, setImageUrl] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // const { isLoaded } = useLoadScript({
  //   id: "google-map-script",
  //   googleMapsApiKey: apiKey,
  //   libraries,
  // });

  const url =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  // useEffect (() => {
  //     const placesLibraryScript = document.getElementById("places-script");
  //     let key;
  //     const getKey = async () => {
  //       const res = await fetch("/api/map/key", {
  //         method: "POST",
  //       });

  //       if (res.ok) {
  //         const data = await res.json();
  //         key = data.googleMapsAPIKey;
  //         placesLibraryScript.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&callback=initMap`;
  //       }
  //     };
  //     getKey();
  // },[])

  useEffect(() => {
    let errors = [];
    if (!imageUrl.match(url)) errors.push("Please enter a valid URL.");
    if (!imageUrl.length) errors.push("Please enter a URL.");
    if (!name.length) errors.push("Please enter a name.");
    if (!destination.length) errors.push("Please enter a destination.");
    if (!startDate.length) errors.push("Please enter a startDate.");
    if (!endDate.length) errors.push("Please enter a endDate.");

    setErrors(errors);
  }, [name, startDate, destination, endDate, imageUrl]);

  const submitNewTrip = () => {
    setHasSubmitted(true);
    if (errors.length > 0) return;

    const newTripData = {};
    setOwnerId(sessionUser.id);
    newTripData.ownerId = ownerId;
    newTripData.name = name;
    newTripData.destination = destination;
    newTripData.lat = latitude;
    newTripData.lng = longitude;
    newTripData.imageUrl = imageUrl;
    newTripData.startDate = startDate;
    newTripData.endDate = endDate;

    dispatch(tripActions.newTrip(newTripData))
      .then(() => {
        setName("");
        setDestination("");
        setImageUrl("");
        setStartDate("");
        setEndDate("");
        setErrors([]);
        setShowModal(false);
        history.push("/Home");
        // need a .then and redirect IF you add a new trip while on another trip details page
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const showing = () => {
    setShowModal(true);
    setShowInModal(true);
  };

  return (
    <>
      <button className="AddATripButton" onClick={showing}>
        Add A Trip
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="formContainer3">
            <h1 id="trip-add"> Add A Trip </h1>
            <form
              className="new-trip-form"
              onSubmit={(e) => {
                e.preventDefault();
                submitNewTrip();
              }}
            >
              <ul className="new-trip-errors">
                {hasSubmitted &&
                  errors.map((error, idx) => <li key={idx}>{error}</li>)}
              </ul>
              <label className="triplabel">Trip Name:</label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="new-trip-name"
                placeholder="Trip Name"
                value={name}
              />
              <label className="triplabel">Trip Destination:</label>
              <MapContainer
                showInModal={showInModal}
                setDestination={setDestination}
                destination={destination}
                setLongitude={setLongitude}
                setLatitude={setLatitude}
              />
              <label className="triplabel">Trip Main Image URL:</label>
              <input
                onChange={(e) => setImageUrl(e.target.value)}
                type="text"
                className="new-trip-image"
                placeholder="Image Url"
                value={imageUrl}
              />
              <label className="triplabel">Trip Start:</label>
              <input
                onChange={(e) => setStartDate(e.target.value)}
                type="date"
                className="new-trip-start-date"
                value={startDate}
              />
              <label className="triplabel">Trip End:</label>
              <input
                onChange={(e) => setEndDate(e.target.value)}
                type="date"
                className="new-trip-end-date"
                value={endDate}
              />
              <button id="new-trip-submit" type="submit">
                Submit New Trip
              </button>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}

export default AddATripModal;
