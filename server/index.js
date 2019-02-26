const express = require('express');
const parser = require('body-parser');
const path = require('path');
const cors = require('cors');

const PORT = 4000;

const app = express();

app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, '../build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log('App is listening on PORT:', PORT);
});


