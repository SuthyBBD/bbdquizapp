const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist/bbdquiz'));

app.listen(process.env.PORT || 3000);
console.log('app deployed');

app.get('/register', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/bbdquiz/index.html'));
})
app.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/bbdquiz/index.html'));
})
app.get('/quiz', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/bbdquiz/index.html'));
})
app.get('/welcome', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/bbdquiz/index.html'));
})

app.get('/api/*', function(req, res) {
  console.log('we got here boy');
  res.send('hello world');
})
