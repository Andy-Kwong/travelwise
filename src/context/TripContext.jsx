import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getTripById } from "./api";
import { tripWranglerInbound } from './dataWrangler';
import axios from 'axios';

const TripContext = createContext();

export const TripContextProvider = ({ children }) => {
  const [tripData, setTripData] = useState(null);
  const [menuSelection, setMenuSelection] = useState('Profile')

  useEffect(() => {
    const getTrip = async () => {
      const tripId = '5fece0c5eb8dba4e6e02d697'
      const newTripData = getTripById(tripId);
      setTripData(newTripData);
    }
    getTrip();
  }, [])



  return (
    <TripContext.Provider
      value={{
        tripData,
        setTripData,
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
