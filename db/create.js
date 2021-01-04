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
  }
}

module.exports = {
  createEvent,
}
