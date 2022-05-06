import { useState, createContext } from 'react';

export const TripContext = createContext();

export const TripProvider = props => {
    const [currentTrip, setCurrentTrip] = useState({});

    return (
        <TripContext.Provider
            value={{ currentTrip, setCurrentTrip }}
        >
            {props.children}
        </TripContext.Provider>
    )
}