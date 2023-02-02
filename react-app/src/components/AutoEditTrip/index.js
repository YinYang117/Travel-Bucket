import React, { useState } from "react";
import "./AutoEditTrip.css"
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";

const AutoEditTrip = ({ destinationEdit, setDestinationEdit, setEditLat, setEditLng }) => {
  const [open, setOpen] = useState(false)
  const {
    ready,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete();

  const handleInput = (e) => {
    setValue(e.target.value);
    setDestinationEdit(e.target.value)
    setOpen(true)
  };

  const handleSelect = async (val) => {
    const results = await getGeocode({ address: val })
    const { lat, lng } = await getLatLng(results[0])
    setEditLat(lat)
    setEditLng(lng)
    setValue(val, false)
    setDestinationEdit(val)
    setOpen(false)
  };

  return (
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
  );
};

export default AutoEditTrip;
