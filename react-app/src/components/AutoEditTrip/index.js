import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AutoEditTrip.css"
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



const AutoEditTrip = ({destinationEdit, setDestinationEdit, setEditLat, setEditLng}) => {
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
  setDestinationEdit(e.target.value)
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
        setEditLat(lat)
        setEditLng(lng)
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
        setDestinationEdit(val)
        setOpen(false)




};


  return (
    <>
        <Combobox onSelect={handleSelect}>
          <ComboboxInput value={destinationEdit} onChange={handleInput} disabled={!ready} />
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

export default AutoEditTrip;