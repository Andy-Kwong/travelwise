import axios from 'axios';
import { tripWranglerOutbound, tripWranglerInbound } from "./dataWrangler";

export const getTripById = async (tripId) => {
  try {
    let tripData = await axios.get(`api/trip/${tripId}`);
    tripData = tripWranglerInbound(tripData.data);
    return tripData;
  } catch (err) {
    console.log(err);
  }
}

export const updateTrip = async (tripId, updatedData) => {
  let newTripData = tripWranglerOutbound(updatedData);
  try {
    await axios.put(`/api/trip/${tripId}`, newTripData);
  } catch (err) {
    console.log(err);
  }
}

export const getTripsByUser = async (user) => {
  try {
    const trips = await axios.get(`/api/user/${user}/trips`);
    return trips;
  } catch (err) {
    console.log(err);
  }
}
