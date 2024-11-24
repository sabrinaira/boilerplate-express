let express = require('express');
let app = express();
let path = require('path');
let env = require('dotenv').config();
const bodyParser = require('body-parser');

// REST --> REpresentational State Transfer

// console.log('Hello World');

// app.get('/', (req, res) => {
//   return res.send('Hello Express')
// })

/** Implement a Root-Level Request Logger Middleware */
app.use(
  (middleware = (req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    return next();
  })
);

// middleware to handle URL encoded data using bodyParser
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  let absolutePath = __dirname + '/views/index.html';
  return res.status(200).sendFile(absolutePath);
});

/** Serve Static Assets */
let publicPath = __dirname + '/public';
app.use('/public', express.static(publicPath));

/** Serve JSON on a Specific Route */
app.get('/json', (req, res) => {
  let response = { message: 'Hello json' };
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    response.message = response.message.toUpperCase();
  }
  return res.json(response);
});

/** Chain Middleware to Create a Time Server */
const timeFunction = (req, res, next) => {
  req.time = new Date().toString();
  return next();
};

app.get('/now', timeFunction, (req, res) => {
  return res.status(200).json({ time: req.time });
});

/** Get Route Parameter Input from the Client */
app.get('/:word/echo', (req, res) => {
  return res.json({ echo: req.params.word });
});

/** Get Query Parameter Input from the Client */
app.get('/name', (req, res) => {
  // let firstName = req.query.first;
  // let lastName = req.query.last;

  //destructuring version
  let { first: firstName, last: lastName } = req.query;
  return res.json({ name: `${firstName} ${lastName}` });
});

/**
 * Use body-parser to Parse POST Requests
 * ---
 * In the following exercise you are going to receive data from a POST request, at the same /name route path.
 * If you want, you can use the method app.route(path).get(handler).post(handler).
 * This syntax allows you to chain different verb handlers on the same path route.
 * You can save a bit of typing, and have cleaner code.
 */

app.post('/name', (req, res) => {
  return res.json({ name: `${req.body.first} ${req.body.last}` });
});

module.exports = app;
