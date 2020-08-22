const express = require('express');
const fs = require('fs');
var path = require('path');

const app = express();

app.get('/', (req, res) => {
  //   fs.readFile('./index.html', 'utf8', (err, html) => {
  //     if (err) {
  //       res.status(500).send('<h1>Unexpected Error</h1>');
  //     }
  //     res.send(html);
  //   });

  res.sendFile(path.join(__dirname + '/index.html'));
});

const PORT_LISTENING = 3000;

app.listen(process.env.PORT || PORT_LISTENING, () =>
  console.log('Localhost started on port: ' + PORT_LISTENING)
);
