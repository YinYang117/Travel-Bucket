
// import useOnclickOutside from "react-cool-onclickoutside";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./PlacesAutocomplete.css"
import { getKey } from '../../store/map';

import {
  GoogleMap,
  useLoadScript,
  Marker,
  MarkerClusterer,
  InfoWindow,
} from "@react-google-maps/api";


import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

// import { useDispatch, useSelector } from "react-redux";
// import * as tripActions from "../../store/trip";

// const PlacesAutocomplete = () => {
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestions,
//   } = usePlacesAutocomplete({
//     requestOptions: {
//       /* Define search scope here */
//     },
//     debounce: 300,
//   });
//   const ref = useOnclickOutside(() => {
//     // When user clicks outside of the component, we can dismiss
//     // the searched suggestions by calling this method
//     clearSuggestions();
//   });

//   const handleInput = (e) => {
//     // Update the keyword of the input element
//     setValue(e.target.value);
//   };

//   const handleSelect =
//     ({ description }) =>
//     () => {
//       // When user selects a place, we can replace the keyword without request data from API
//       // by setting the second parameter to "false"
//       setValue(description, false);
//       clearSuggestions();

//       // Get latitude and longitude via utility functions
//       getGeocode({ address: description }).then((results) => {
//         const { lat, lng } = getLatLng(results[0]);
//         console.log("📍 Coordinates: ", { lat, lng });
//       });
//     };

//   const renderSuggestions = () =>
//     data.map((suggestion) => {
//       const {
//         place_id,
//         structured_formatting: { main_text, secondary_text },
//       } = suggestion;
//     });

//   return (
//     <div ref={ref}>
//       <input
//         value={value}
//         onChange={handleInput}
//         disabled={!ready}
//         placeholder="Where are you going?"
//       />
//       {/* We can use the "status" to decide whether we should display the dropdown or not */}
//       {status === "OK" && <ul>{renderSuggestions()}</ul>}
//     </div>
//   );
// };


const PlacesAutocomplete = ({destination, setDestination, setLongitude, setLatitude}) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)


  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete();

//   const key = useSelector(state => state.map.key)
// console.log("THIS IS KEY FOR THE HOME--------", key)

// value == destination

const handleInput = (e) => {
  setValue(e.target.value);
  setDestination(e.target.value)
  setOpen(true)
};

const handleSelect = async (val) => {
  // setValue(val, false);
  // console.log("THIS IS VAL------", val)

  // getGeocode({ address: val }).then((results) => {
  //   const { lat, lng } = getLatLng(results[0]);
  //   console.log("Coordinates: ", { lat, lng });
  // });

  // setSelected 

  // console.log("THIS IS VAL-------", val)

  const results = await getGeocode({ address: val })
        const { lat, lng } = await getLatLng(results[0])
        console.log("THIS IS LAT< LNG------", lat, lng)
        setLatitude(lat)
        setLongitude(lng)
        // setSelected({ lat, lng })
        const zoom = 10

        // const res = await fetch(`/api/map/${lat}/${lng}/${zoom}`)
        // if (res.ok) {
        //     const data = await res.json()
        //     console.log("THIS IS DATA--------", data)

        //     // setCityMarkers(data.places)
        // }
        setValue(val, false)
        // console.log("THIS IS DESTINATION--------", destination)
        setDestination(val)
        setOpen(false)




};


  return (
    <>
        <Combobox onSelect={handleSelect}>
          <ComboboxInput value={destination} onChange={handleInput} disabled={!ready} />
          {open && (
            <ComboboxPopover portal={false}>
                <ComboboxList>
                  {status === "OK" &&
                    data.map(({ place_id, description }) => (
                      <ComboboxOption key={place_id} value={description} className="option" />
                    ))}
                </ComboboxList>
            </ComboboxPopover>
          )}
        </Combobox>
    </>
  );
};

export default PlacesAutocomplete;
