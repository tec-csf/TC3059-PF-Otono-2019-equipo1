'use strict';

// Make the comunication with a server to create petitions
const express = require('express');
// Make the paths for the paths to create the petitions
const path = require('path');
// Parses the information in the body of petitions
const bodyParser = require('body-parser');
// Cross-Origin Resource Sharing needed for express to get headers
const cors = require('cors');
// Strategy for authenticating with a JSON Web Token.
const passport = require('passport');
// MongoDB object modeling tool designed to work in an asynchronous environment.
const mongoose = require('mongoose');
// Configuration of the database
const config = require('./config/database');

// Connect to the database
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Connect to the database and log out if it was successful
mongoose.connection.on("connected", () => {
  console.log("Connected to the database " + config.database);
});

// Logout if the connect was failed
mongoose.connection.on("error", err => {
  console.log("Database error: " + err);
});

// Start our server app to make the petitions
const app = express();

// get all the routes for make the petitions in the backend
const alumnos = require('./routes/alumnos');
const profesores = require('./routes/profesores');

// Constants
const PORT = 3100;
const HOST = '0.0.0.0';

// CORS Middleware its for make the routes to create the petitions
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware to grab the data that we send or recive
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/alumnos', alumnos);
app.use('/profesores', profesores);

// Index Route / show as invalid end point
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);