const mongoose = require('mongoose');
const debug = require('debug')('app:db:itinerary');
const event = require('./event');

const itinerarySchema = mongoose.Schema({
  title: String,
  description: String,
  events: [event.eventSchema]
})

const ItineraryModel = mongoose.model('Itinerary', itinerarySchema);

const findAll = async () => ItineraryModel.find({});

const findOne = async (req, res) => {
  const id = req.body.id;
  const data = await ItineraryModel.findOne({id});
  res.send(data);
}

const insert = async (itineraries) => ItineraryModel.create(itineraries);

const insertEvent = async (itineraryId, event) => {
  const itinerary = await ItineraryModel.findById(itineraryId);
  itinerary.events.push(event);
  itinerary.save();
}

const removeEvent = async (itineraryId, eventId) => {
  const itinerary = await ItineraryModel.findById(itineraryId);
  const event = itinerary.events.id(eventId);
  event.remove();
  itinerary.save();
}

const updateItinerary = async (itineraryId, document) => {
  const itinerary = await ItineraryModel.findByIdAndUpdate(itineraryId, {
    $set: {
      title: document.title,
      description: document.description,
      events: document.events
    }
  }, { new: true })
  debug(itinerary);
}
