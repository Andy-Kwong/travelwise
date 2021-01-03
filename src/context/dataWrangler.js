// Convert inbound itinerary array to object
export const tripWranglerInbound = (data) => {
  const it = data.itineraries;
  const itObject = {};
  for (let i = 0; i < it.length; i++) {
    itObject[it[i]._id] = it[i];
  }
  data.itineraries = itObject;
  console.log(data);
  return data;
}

// Convert outbound itinerary object to array
export const tripWranglerOutbound = (updatedData) => {
  const it = Object.values(updatedData.itineraries);
  const outboundData = { ...updatedData };
  outboundData.itineraries = it;
  console.log(outboundData);
  return outboundData;
}
