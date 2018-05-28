const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const config = require('./app/config/config');
const cors = require('cors');
const app = express();
app.use(morgan('dev'));                                         // log every request to the console
app.use(cors());
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
require('./app/router/router')(app);
var db;
if(process.env.NODE_ENV === "test"){
	db =mongoose.connect(config.test_db, { useMongoClient: true });
	app.listen(config.test_port, function(err){
	  if(err) throw err;
	  console.log("App listening on port "+config.test_port);
	});
}else{
	 db =mongoose.connect(config.db, { useMongoClient: true });
        app.listen(config.port, function(err){
	  if(err) throw err;
	  console.log("App listening on port "+config.port);
	});

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + config.db);
});

module.exports = app;
}
