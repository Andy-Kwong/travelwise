require('dotenv').config();
const mongoose = require('mongoose');
const debug = require('debug')('app:server:index');
const createServer = require('./server');

const port = 8080;

mongoose.connect('mongodb://localhost/travelwise',
  {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    debug('connected to travelwise');
    const app = createServer();
    app.listen(port, () => {
      debug(`Mussels on port ${port}`);
    })
  });
