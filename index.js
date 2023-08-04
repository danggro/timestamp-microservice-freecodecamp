// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/:date', function (req, res) {
  let date = parseInt(req.params.date);
  if (req.params.date.length !== 13) {
    date = Math.floor(new Date(req.params.date).getTime());
  }
  if (!date) {
    return res.json({
      error: 'Invalid Date',
    });
  }
  res.json({
    unix: date,
    utc: `${new Date(date).toUTCString()}`,
  });
});

app.get('/api/', function (req, res) {
  let date = Date.now();
  res.json({
    unix: date,
    utc: `${new Date(date).toUTCString()}`,
  });
});

// listen for requests :)
var listener = app.listen(5000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
