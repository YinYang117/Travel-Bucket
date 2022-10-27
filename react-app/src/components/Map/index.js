import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getKey } from '../../store/map';
import Maps from './Map';

const MapContainer = ({showInModal, tripId, destination, setDestination, setLongitude, setLatitude, setEditLat, setEditLng, showAutoEdit, setDestinationEdit, destinationEdit}) => {
    const key = useSelector(state => state.map.key)
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (!key) dispatch(getKey())
    }, [dispatch, key])

    if (!key) return null

    return (
        <>
            <Maps apiKey={key} showInModal={showInModal} tripId={tripId} setDestination={setDestination} destination={destination} setLongitude={setLongitude} setLatitude={setLatitude} setEditLat={setEditLat} setEditLng={setEditLng} showAutoEdit={showAutoEdit} desitnationEdit={destinationEdit} setDestinationEdit={setDestinationEdit}/>
        </>
    )
}

export default MapContainer;
