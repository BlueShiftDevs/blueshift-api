const express = require('express');
const client = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const url = require('./app/config/db').url;

// instantiate express app
const app = express();

// set up mongoose connection
const mongoose = require('mongoose');
mongoose.connect(url, { useMongoClient: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const port = 8000;

// adds bodyparser to unencode posts
app.use(bodyParser.json());
//app.use(express.bodyParser);



// connect to database
//client.connect(url, (err, database) => {

// import routes, passing in express app and database
//require('./app/routes')(app, database);
app.use('/cards', require('./app/routes/cards'))

// start listening at port 8000
app.listen(port, () => {
    console.log('We are live on ' + port);
});
//});