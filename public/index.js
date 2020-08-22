const express = require('express');
const fs = require('fs');
var path = require('path');
const functions = require('firebase-functions');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/timestamp', (req, res) => {
  res.sendFile(path.join(__dirname + '/timestamp.html'));
});

const PORT_LISTENING = 3000;

app.listen(process.env.PORT || PORT_LISTENING, () =>
  console.log('Localhost started on port: ' + PORT_LISTENING)
);

exports.app = functions.https.onRequest(app);