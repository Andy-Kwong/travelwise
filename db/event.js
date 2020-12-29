const mongoose = require('mongoose');
const debug = require('debug')('app:db:event');

const eventSchema = mongoose.Schema({
  title: String,
  content: String,
  link: String,
  location: String,
  time: Number,
  notes: String
});

const EventModel = mongoose.model('Event', eventSchema);

const findAll = async () => EventModel.find({});

const findOne = async (req, res) => {
  const id = req.body.id
  const data = await EventModel.findOne({id});
  res.send(data);
}

const insert = async (events) => EventModel.create(events);

module.exports = {
  findAll,
  findOne,
  insert,
  eventSchema,
}
