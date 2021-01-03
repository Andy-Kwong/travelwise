const mongoose = require('mongoose');
const debug = require('debug')('app:db:trip');
const itinerary = require('./itinerary');

const tripSchema = mongoose.Schema({
  title: String,
  owner: String,
  itineraries: [itinerary.itinerarySchema],
  notes: String,
  dates: String,
  order: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Itinerary'
  }]
})

const Trip = mongoose.model('Trip', tripSchema);

const findAll = async () => Trip.find({});

const findAllByUser = async (req, res) => {
  const owner = req.params.user;
  try {
    const trips = await Trip.find({ owner: owner });
    res.send(trips).status(200);
  } catch (err) {
    console.log(err);
  }

}

const findOne = async (req, res) => {
  try {
    const data = await Trip.findById(req.params.tripId);
    res.send(data).status(200);
  } catch (err) {
    res.status(500);
    debug(err);
  }
}

const createTrip = async (document) => Trip.create(document);

const updateTrip = async (req, res) => {
  const document = req.body;
  debug('req.body._id:', req.body._id);
  try {
    const trip = await Trip.findByIdAndUpdate(req.body._id, {
      $set: {
        title: document.title,
        itineraries: document.itineraries,
        notes: document.notes,
        order: document.order
      }
    }, { new: true });
    debug(trip);
    res.end().status(200);
  } catch (err) {
    debug(err);
    res.end().status(500);
  }
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
  findOne,
  createTrip,
  updateTrip,
  deleteTrip,
}
