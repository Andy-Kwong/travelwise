const express = require('express');
const path = require('path');
const debug = require('debug')('app:server:server')

function createServer() {
  const app = express();
  app.use(express.static(path.join(__dirname, '..', 'public')));
  app.use(express.json());
  app.get('*', (req, res) => {
    debug(`getting id: ${req.params}`);
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  })
  return app;
}

module.exports = createServer;
