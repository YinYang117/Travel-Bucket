import React, { useState } from "react";
import "./PlacesAutocomplete.css"
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

const PlacesAutocomplete = ({ destination, setDestination, setLongitude, setLatitude }) => {
  const [open, setOpen] = useState(false)
  const {
    ready,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete();

  const handleInput = (e) => {
    setValue(e.target.value);
    setDestination(e.target.value)
    setOpen(true)
  };

  const handleSelect = async (val) => {
    const results = await getGeocode({ address: val })
    const { lat, lng } = await getLatLng(results[0])
    console.log("THIS IS LAT< LNG------", lat, lng)
    setLatitude(lat)
    setLongitude(lng)
    setValue(val, false)
    setDestination(val)
    setOpen(false)
  };

  return (
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
  );
};

export default PlacesAutocomplete;
