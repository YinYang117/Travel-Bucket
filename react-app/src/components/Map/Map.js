import React from "react";
import { useSelector } from "react-redux";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import "@reach/combobox/styles.css";
import { useDispatch } from "react-redux";
import "./Map.css";
import PlacesAutocomplete from "../PlacesAutocomplete";
import AutoEditTrip from "../AutoEditTrip";

const libraries = ["places"];
const Maps = ({ apiKey, showInModal, tripId, destination, setDestination, setLongitude, setLatitude, showAutoEdit, destinationEdit, setDestinationEdit, setEditLng, setEditLat }) => {
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries,
  });

  return (
    <>
      {showInModal && isLoaded && (
        <PlacesAutocomplete destination={destination} setDestination={setDestination} setLongitude={setLongitude} setLatitude={setLatitude} showAutoEdit={showAutoEdit} />
      )}
      {tripId && isLoaded && (
        <Map tripId={tripId} />
      )}
      {showAutoEdit && isLoaded && (
        <AutoEditTrip destinationEdit={destinationEdit} setDestinationEdit={setDestinationEdit} setEditLng={setEditLng} setEditLat={setEditLat} />
      )}
    </>
  )
};

const containerStyle = {
  width: "700px",
  height: "700px",
};

const Map = ({ tripId }) => {
  const trip = useSelector((state) => state?.trips[tripId]);
  const long = parseFloat(trip?.lng)
  const latit = parseFloat(trip?.lat)

  const center = {
    lat: latit,
    lng: long,
  };

  return (
      <div className="maps-container">
        <div className="maps">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
          </GoogleMap>
        </div>
      </div>
  );
};

export default React.memo(Maps);
