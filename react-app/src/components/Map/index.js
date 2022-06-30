import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getKey } from '../../store/map';
import PlacesAutocomplete from '../PlacesAutocomplete';
import Mapss from "../Home"
import Maps from './Map';

const MapContainer = ({showInModal, tripId, destination, setDestination, setLongitude, setLatitude, setEditLat, setEditLng, showAutoEdit, setDestinationEdit, destinationEdit}) => {
    const key = useSelector(state => state.map.key)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!key) {
            dispatch(getKey())
        }
    }, [dispatch, key])

    if (!key) return null

    // console.log("THIS IS SHOWMAP IN CONTAINER--------", showMap)

    return (
        <>
            <Maps apiKey={key} showInModal={showInModal} tripId={tripId} setDestination={setDestination} 
            destination={destination} setLongitude={setLongitude} setLatitude={setLatitude} setEditLat={setEditLat} 
            setEditLng={setEditLng} showAutoEdit={showAutoEdit} desitnationEdit={destinationEdit} setDestinationEdit={setDestinationEdit}/>
            {/* <Mapss apiKey={key} /> */}
        </>
        
    )
}

export default MapContainer;