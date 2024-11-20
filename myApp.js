let express = require('express');
let app = express();
let path = require('path');

// console.log('Hello World');

// app.get('/', (req, res) => {
//   return res.send('Hello Express')
// })

app.get('/', (req, res) => {
  let absolutePath = __dirname + '/views/index.html';
  return res.status(200).sendFile(absolutePath);
});

let publicPath = __dirname + '/public';
app.use('/public', express.static(publicPath));

app.get('/json', (req, res) => {
  res.json({ message: 'Hello json' });
});

module.exports = app;
