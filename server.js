// dependencies
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();
require('pretty-error').start();

// config
const PORT = process.env.PORT || 3000
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/profile-games'

// db
mongoose.connect(mongoURI, { useMongoClient: true });

const db = mongoose.connection;
db.on('error', (err) => console.log('Mongo error:', err));
db.on('connected', () => console.log('Mongo connected at', mongoURI));
db.on('disconnected', () => console.log('Mongo disconnected'));
mongoose.Promise = global.Promise;

// controllers
const usersController = require('./controllers/users');

// middleware ----------------------------------------

// enable req.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// enable static assests
app.use(express.static('public'));

// enable sessions
app.use(session({
  secret: "homestarrunner.net... it's dot com!",
  resave: true,
  saveUninitialized: false,
  maxAge: 2592000000
}));

// enable controllers
app.use('/users', usersController);

// ------------------------------------------------------

// testing
// app.get('/', async (req, res) => {
//   await res.send('Hey! App is loading!');
// });

// listen
app.listen(PORT, () => console.log('Profile Games is running on port', PORT));
