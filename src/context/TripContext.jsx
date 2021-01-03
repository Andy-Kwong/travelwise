import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {getTripById, getTripsByUser} from "./api";

const TripContext = createContext();

export const TripContextProvider = ({ children }) => {
  const [tripData, setTripData] = useState(null);
  const [userTrips, setUserTrips] = useState(null);
  const [menuSelection, setMenuSelection] = useState('Profile')

  useEffect(() => {
    const getTrip = async () => {
      const tripId = '5ff2463d6badc20eaabe76bb'
      const newTripData = await getTripById(tripId);
      setTripData(newTripData);

      const owner = 'Andy Kwong';
      const tripsByUser = await getTripsByUser(owner);
      setUserTrips(tripsByUser.data);
      //console.log('tripsByUser', tripsByUser);
    }
    getTrip();
  }, [])

  return (
    <TripContext.Provider
      value={{
        tripData,
        setTripData,
        userTrips,
        setUserTrips,
        menuSelection,
        setMenuSelection,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export default TripContext;

TripContextProvider.protoTypes = {
  children: PropTypes.node.isRequired,
}
