const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());

let storedPosition = 1;

app.post('/setPosition', (req, res) => {
  const { position } = req.body;
  storedPosition = position;
  res.json({ message: 'Position set successfully.' });
});

app.get('/getPosition', (req, res) => {
  res.json({ position: storedPosition });
});

module.exports = app;