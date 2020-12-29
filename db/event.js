const mongoose = require('mongoose');
const debug = require('debug')('app:db:event');

const eventSchema = mongoose.Schema({
  title: String,
  content: String,
  link: String,
  location: String,
  address: String,
  time: Number,
  notes: String
});

const Event = mongoose.model('Event', eventSchema);

const findAll = async () => Event.find({});

const findOne = async (req, res) => {
  const id = req.body.id
  const data = await Event.findOne({id});
  res.send(data);
}

const insert = async (events) => Event.create(events);

module.exports = {
  findAll,
  findOne,
  insert,
  eventSchema,
}
