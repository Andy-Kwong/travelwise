require('dotenv').config();
const debug = require('debug')('app:seed');
const mongoose = require('mongoose');
const data = require('./testData');
const events = require('../db/event');
const itineraries = require('../db/itinerary');
const trips = require('../db/trip');

mongoose
  .connect('mongodb://localhost:27017/travelwise', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => debug('Connected to travelwise DB'));

const seedEvents = async () => {
  const itineraryDocument = { ...data };
  const keys = Object.keys(data.itineraries);
  debug(keys);
  for (let i = 0; i < keys.length; i++) {
    try {
      const res = await events.insert(data.itineraries[keys[i]].events);
      itineraryDocument.itineraries[keys[i]].events = res;
      await itineraries.insert(itineraryDocument.itineraries[keys[i]]);
      debug(res);
    } catch (err) {
      debug(err);
    }
  }

  try {
    const allItineraries = await itineraries.findAll();
    const itineraryIds = allItineraries.map(it => it._id);
    const tripRes = await trips.createTrip({
      title: 'Chicago 2021',
      owner: 'Andy Kwong',
      itineraries: allItineraries,
      notes: 'Plan for a one week trip to Chicago over Christmas 2021',
      dates: '12/23/2021 - 12/30/2021',
      photoUrl: 'https://images.unsplash.com/photo-1609433635932-6571b56f4fd4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      order: itineraryIds
    })
    debug(tripRes);
  } catch (err) {
    debug(err);
  }
  mongoose.disconnect();
};

// const seedItineraries = async () => {
//
// }

seedEvents();
