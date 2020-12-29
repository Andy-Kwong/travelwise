const mongoose = require('mongoose');
const debug = require('debug')('app:db:trip');
const event = require('./event');

const itinerarySchema = mongoose.Schema({
  title: String,
  description: String,
  events: [event.eventSchema],
  notes: String
})

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

const findAll = async () => Itinerary.find({});

const findOne = async (req, res) => {
  const id = req.body.id;
  const data = await Itinerary.findOne({id});
  res.send(data);
}

const insert = async (itineraries) => Itinerary.create(itineraries);

const insertEvent = async (itineraryId, event) => {
  const itinerary = await Itinerary.findById(itineraryId);
  itinerary.events.push(event);
  itinerary.save();
}

const removeEvent = async (itineraryId, eventId) => {
  const itinerary = await Itinerary.findById(itineraryId);
  const event = itinerary.events.id(eventId);
  event.remove();
  itinerary.save();
}

const updateItinerary = async (itineraryId, document) => {
  const itinerary = await Itinerary.findByIdAndUpdate(itineraryId, {
    $set: {
      title: document.title,
      description: document.description,
      events: document.events
    }
  }, { new: true });
  debug(itinerary);
}

module.exports = {
  itinerarySchema,
  findAll,
  findOne,
  insert,
  insertEvent,
  removeEvent,
  updateItinerary,
}
