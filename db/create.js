require('dotenv').config();
const debug = require('debug')('app:db:create');
const trip = require('./trip');
const itinerary = require('./itinerary');
const event = require('./event');

const createEvent = async (req, res) => {
  debug(req.body);
}

module.exports = {
  createEvent,
}
