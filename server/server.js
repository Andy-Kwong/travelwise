const express = require('express');
const path = require('path');
const debug = require('debug')('app:server:server')
const trip = require('../db/trip');
const create = require('../db/create.js');

function createServer() {
  const app = express();
  app.use(express.static(path.join(__dirname, '..', 'build')));
  app.use(express.json());
  app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
    const trips = await trip.findAll();
    debug(trips);
    res.end();
  })
  app.get('/api/trip/:tripId', trip.findOne);
  app.put('/api/trip/:tripId', trip.updateTrip);
  app.get('/api/user/:user/trips', trip.findAllByUser);
  app.post('/api/event', create.createEvent);
  app.post('/api/itinerary', create.createItinerary);
  app.get('*', (req, res) => {
    debug(`getting id: ${req.params}`);
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  })
  return app;
}

module.exports = createServer;
