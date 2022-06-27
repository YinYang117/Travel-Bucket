// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// import useOnclickOutside from "react-cool-onclickoutside";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getKey } from '../../store/map';

import {
  GoogleMap,
  useLoadScript,
  Marker,
  MarkerClusterer,
  InfoWindow,
} from "@react-google-maps/api";


import usePlacesAutocomplete from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

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


const PlacesAutocomplete = ({setShowInModal}) => {
  const dispatch = useDispatch()

//   const key = useSelector(state => state.map.key)
// console.log("THIS IS KEY FOR THE HOME--------", key)

const {
  ready,
  value,
  suggestions: { status, data },
  setValue,
} = usePlacesAutocomplete();

const handleInput = (e) => {
  setValue(e.target.value);
};

const handleSelect = (val) => {
  setValue(val, false);
};
// useEffect(() => {
//   if (!key) {
//       dispatch(getKey())
//   }
// }, [dispatch, key])

// const libraries= ["places"];
// const { isLoaded } = useLoadScript({
//   id: "places-script",
//   googleMapsApiKey: key,
//   libraries,

// })



  return (
    <>
        <Combobox onSelect={handleSelect} aria-labelledby="demo">
          <ComboboxInput value={value} onChange={handleInput} disabled={!ready} />
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" &&
                data.map(({ place_id, description }) => (
                  <ComboboxOption key={place_id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
    </>
  );
};

export default PlacesAutocomplete;
