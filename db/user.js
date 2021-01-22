const mongoose = require('mongoose');
const debug = require('debug')('app:db:trip');
const trip = require('./trip');

const userSchema = mongoose.Schema({
  avatar: String,
  bio: String,
  phone: String,
  firstName: String,
  lastName: String,
  city: String,
  state: String,
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  }
});

const User = mongoose.model('User', userSchema);

const insert = async (user) => User.create(user);

const findByUsername = async (req, res) => {
  const username = req.body.id;
  const data = await User.findOne({ username });
  res.send(data);
}

const findByEmail = async (req, res) => {
  const email = req.body.id;
  const data = await User.findOne({ email });
  res.send(data);
}
