const mongoose = require('mongoose');
const debug = require('debug')('app:db:trip');
const itinerary = require('./itinerary');

const tripSchema = mongoose.Schema({
  title: String,
  owner: String,
  itineraries: [itinerary.itinerarySchema],
  notes: String,
  order: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Itinerary'
  }]
})

const Trip = mongoose.Model('Trip', tripSchema);

const findAll = async () => Trip.find({});

const findAllByUser = async (owner) => Trip.find({ owner: owner });

const createTrip = async (document) => Trip.create(document);

const updateTrip = async (tripId, document) => {
  const trip = await Trip.findByIdAndUpdate(tripId, {
    $set: {
      title: document.title,
      itineraries: document.itineraries,
      notes: document.notes,
      order: document.order
    }
  }, { new: true });

  debug(trip);
}

const deleteTrip = async (tripId) => {
  try {
    await Trip.deleteOne({_id: tripId})
    debug('Successfully delete trip', tripId);
  } catch (err) {
    debug(err);
  }
}

module.exports = {
  findAll,
  findAllByUser,
  createTrip,
  updateTrip,
  deleteTrip,
}
