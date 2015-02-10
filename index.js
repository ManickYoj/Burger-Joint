// Utility Imports
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var numeral = require('numeral');

// Route Imports
var home = require('./routes/home');
var customer = require('./routes/customer');
var kitchen = require('./routes/kitchen');
var management = require('./routes/management');

// Config
var app = express();
var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
var PORT = process.env.PORT || 3000;
mongoose.connect(mongoURI);
mongoose.connection.db.dropCollection(mongoURI);
app.engine('hbs', hbs(
	{
		defaultLayout: 'base',
		partialsDir: __dirname + '/views/partials',
  		layoutsDir: __dirname + '/views/layouts',
  		extname: 'hbs',
  		helpers: {
        	currency: function(number) { return numeral(number).format('$0,0.00'); },
        	cents: function(number) { return numeral(number).format('0,0.00'); },
    	}
	}));
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routing Table
app.get('/', home);
app.get('/order', customer);
app.post('/order', customer.order);
app.get('/kitchen', kitchen);
app.post('/kitchen', kitchen.complete);
app.get('/ingredients', management);
app.post('/ingredients/:function', management.route);

// Listen
app.listen(PORT);