const express         = require ( 'express' );
const app             = express();
const moment          = require ( 'moment' );
const mongoose        = require ( 'mongoose' );
const morgan          = require ( 'morgan' );
const session 	      = require ('session');
const io	            = require ('socket.io')(app);

const db              = mongoose.connection;
require( 'pretty-error' ).start();

const mongoURI        = process.env.MONGODB_URI || 'mongodb://localhost/profile-games';
const PORT            = process.env.PORT || 3004;

//Set mongoose Promise Library
mongoose.Promise      = global.Promise;

// Connect to Mongo
mongoose.connect ( mongoURI , { useMongoClient: true});

// Error / success
db.on( 'error', ( err ) => console.log( err.message + ' is Mongod not running?' ));
db.on( 'connected', () => console.log( 'mongo connected: ', mongoURI ));
db.on( 'disconnected', () => console.log( 'mongo disconnected' ));

// Open the connection to mongo
db.on( 'open' , ()=>{});

// Middleware
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON

// Use morgan
app.use ( morgan ( 'tiny' ) );

app.use( express.static( 'public' ));


//Routes
const gamesController = require( './controllers/holidayController.js' );
app.use ( '/games' , gamesController );

app.listen( PORT , () =>{
  console.log( "Listening on PORT: " , PORT);
});

io.listen(port);
