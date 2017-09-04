//Import
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const wagner = require('wagner-core');
const models = require('./server/models/model')(wagner);
const cors = require('cors');

// Get our API routes
const api = require('./server/routes/api');

const app = express();


// const originsWhitelist = [
//   'http://localhost:4200',      //this is my front-end url for development
//    'http://www.myproductionurl.com'
// ];
// const corsOptions = {
//   origin: function(origin, callback){
//         var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
//         callback(null, isWhitelisted);
//   },
//   credentials:true
// }
// //here is the magic
// app.use(cors(corsOptions));

// app.use(cors());

// app.options('*', cors());

// Parsers for POST data
console.log("json test");
app.use(bodyParser.json());
console.log("encoding test");
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));


// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


// Set our api routes
app.use('/api', api(wagner));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));