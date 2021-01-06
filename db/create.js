require('dotenv').config();
const debug = require('debug')('app:db:create');
const trip = require('./trip');
const itinerary = require('./itinerary');
const event = require('./event');

const createEvent = async (req, res) => {
  debug(req.body);
  try {
    const insertResult = await event.insert(req.body);
    res.send(insertResult).status(200);
  } catch (err) {
    debug(err);
    res.end().status(500);
  }
}

const createItinerary = async (req, res) => {
  try {
    const insertResult = await itinerary.insert(req.body);
    res.send(insertResult).status(200);
  } catch (err) {
    debug(err);
    res.end().status(500);
  }
}

const createTrip = async (req, res) => {
  try {
    const insertResult = await trip.createTrip(req.body);
    res.send(insertResult).status(200);
  } catch (err) {
    debug(err);
    res.end().status(500);
  }
}

module.exports = {
  createEvent,
  createItinerary,
}
