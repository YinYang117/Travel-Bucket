import React, {
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { useSelector } from "react-redux";
import { TripContext } from "../../context/Trip";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  MarkerClusterer,
  InfoWindow,
} from "@react-google-maps/api";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useDispatch} from "react-redux";
import "./Map.css";
import pin from "./pin.png";
import AddATripModal from "../AddATripModal";
import * as tripActions from "../../store/trip";
import PlacesAutocomplete from "../PlacesAutocomplete";

const libraries = ["places"];
const Maps = ({ apiKey, showInModal, tripId, destination, setDestination, setLongitude, setLatitude}) => {
  // const [showInModal, setShowInModal] = useState(true)
  // const [showMap, setShowMap] = useState(true)
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries,
  });

  return (
    <>
      {showInModal && isLoaded && (
        <PlacesAutocomplete destination={destination} setDestination={setDestination} setLongitude={setLongitude} setLatitude={setLatitude}/>
      )}

      {tripId && isLoaded && (
        <Map tripId={tripId}/>
      )}

      
    </>

  )
};




const containerStyle = {
  width: "700px",
  height: "700px",
};

const Map = ({tripId}) => {
  const dispatch = useDispatch()
  // setNoShowInModal(false)
  // const [selected, setSelected] = useState(false);
  // const [cityMarkers, setCityMarkers] = useState([]);
  // const [selectedMarker, setSelectedMarker] = useState(null);
  const trip = useSelector((state) => state?.trips[tripId]);
  console.log("THIS IS TRIPID---------", tripId)
  // const currentTrip = useSelector((state) => state.map.trip);
  console.log("THIS IS CURRENT TRIP----------", trip)
  // const mapRef = useRef();
  // const center = useMemo(
  //   () => ({
  //     lat: parseFloat(currentTrip?.lat),
  //     lng: parseFloat(currentTrip?.lng),
  //   }),
  //   [currentTrip]
  // );

  // useEffect(() => {
  //   dispatch(tripActions.loadATrip(tripId));
  // })

  // useEffect(() => {
  //   (async () => {
  //     const res = await fetch(
  //       `/api/map/${currentTrip?.lat}/${currentTrip?.lng}/${5}`
  //     );
  //     if (res.ok) {
  //       const data = await res.json();
  //       if (data.places.length > 0) {
  //         setCityMarkers(data.places);
  //       }
  //     }
  //   })();
  //   setSelected(true);
  // }, [currentTrip]);

  // const onLoad = useCallback((map) => (mapRef.current = map), []);
  // const trackNewCenter = async () => {
  //   setSelectedMarker(null);
  //   const lat = mapRef.current?.getCenter().lat();
  //   const lng = mapRef.current?.getCenter().lng();
  //   const zoom = mapRef.current?.getZoom();
  //   if (lat && lng) {
  //     const res = await fetch(`/api/map/${lat}/${lng}/${zoom}`);
  //     if (res.ok) {
  //       const data = await res.json();
  //       if (data.places.length > 0) {
  //         setCityMarkers(data.places);
  //       }
  //     }
  //   }
  // };



  const long = parseFloat(trip?.lng)
  const latit = parseFloat(trip?.lat)

  console.log("THIS IS LONG=================", long)
  console.log("THIS IS LAT==================", latit)

  const center = {
    lat: latit,
    lng: long,
  };

  return (
    <>
    {/* {setShowInModal(false) && ( */}
      <div className="maps-container">
        <div className="maps">
          <div>
            {/* <PlacesAutocomplete
              setCityMarkers={setCityMarkers}
              setSelected={(position) => {
                setSelected(true);
                mapRef.current?.panTo(position);
              }}
            /> */}
          </div>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            // onLoad={onLoad}
            // onCenterChanged={trackNewCenter}
            // onClick={() => setSelectedMarker(null)}
          >
            {/* {selected && (
              <MarkerClusterer>
                {(clusterer) =>
                  cityMarkers?.map((mark, i) => (
                    <Marker
                      key={mark.id}
                      position={{
                        lat: parseFloat(mark.lat),
                        lng: parseFloat(mark.lng),
                      }}
                      icon={pin}
                      clusterer={clusterer}
                      onClick={() => setSelectedMarker(mark)}
                    >
                      {selectedMarker && mark.id === selectedMarker.id ? (
                        <InfoWindow>
                          <>
                            <div>{selectedMarker.info}</div>
                            <div>{selectedMarker.location}</div>
                            <div>{selectedMarker.address}</div>
                          </>
                        </InfoWindow>
                      ) : null}
                    </Marker>
                  ))
                }
              </MarkerClusterer>
            )} */}
          </GoogleMap>
        </div>
      </div>
    {/* )} */}
    </>
  );
};


export default React.memo(Maps);
