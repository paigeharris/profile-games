// dependencies
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const moment = require('moment');
const mongoose = require('mongoose');
const morgan = require('morgan');
const session = require('express-session');
const io = require('socket.io').listen(server);
const db = mongoose.connection;
require('pretty-error').start();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/games';
const PORT = process.env.PORT || 3000;

// db
mongoose.connect (mongoURI , { useMongoClient: true });
db.on('open', () => {});
mongoose.Promise = global.Promise;

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected:', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));

// enable morgan
app.use(morgan('tiny'));
app.use(express.static('public'));

// enable req.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
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
app.use ( '/games' , gamesController );
app.use('/users', usersController);
app.use('/sessions', sessionsController);

// listeners
app.listen( PORT , () =>{
  console.log( "Listening on PORT: " , PORT);
});

io.listen(server);
