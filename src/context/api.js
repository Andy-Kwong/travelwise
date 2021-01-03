import axios from 'axios';

const getTripById = async (tripId) => {
  const data = await axios.get(`api/trip/${tripId}`);
  return data;
}
