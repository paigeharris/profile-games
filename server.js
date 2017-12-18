const http = require('http');
const express = require('express');
const app = express();

const moment = require('moment');
const mongoose = require('mongoose');
const morgan = require('morgan');
const session = require('express-session');


const db = mongoose.connection;
require('pretty-error').start();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/games';
const PORT = process.env.PORT || 3000;

//Set mongoose Promise Library
mongoose.Promise = global.Promise;

// Connect to Mongo
mongoose.connect(mongoURI, {
  useMongoClient: true
});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));

// Open the connection to mongo
db.on('open', () => {});

// Middleware
app.use(express.urlencoded({
  extended: false
})); // extended: false - does not allow nested objects in query strings
app.use(express.json()); // returns middleware that only parses JSON

// Use morgan
app.use(morgan('tiny'));

app.use(express.static('public'));

//Routes
const gamesController = require('./controllers/games.js');
const usersController = require('./controllers/users');
const sessionsController = require('./controllers/sessions');

// enable sessions
app.use(session({
  secret: "homestarrunner.net... it's dot com!",
  resave: true,
  saveUninitialized: false,
  maxAge: 2592000000
}));

// enable controllers
app.use('/games', gamesController);
app.use('/users', usersController);
app.use('/sessions', sessionsController);


// app.listen(PORT, () => {
//   console.log("Listening on PORT: ", PORT);
// });

const server = app.listen(PORT);
const io = require('socket.io').listen(server);

// io.listen(server);


io.sockets.on('connection', function (socket) {
    socket.on('myClick', function (data) {
        socket.broadcast.emit('myClick', data);
        console.log("fudge");
    });
});
