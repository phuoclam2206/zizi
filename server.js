var express  = require('express');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app      = express();
var port     = process.env.PORT || 3001;

var passport = require('passport');
var flash    = require('connect-flash');

// Config connect db
var mysql = require('mysql');
var dbconfig = require('./config/database');
var connection = mysql.createConnection(dbconfig.connection);
var modelsWaterReports = require('./models/models_water_reports');
connection.query('USE ' + dbconfig.database);

// configuration ===============================================================
// connect to our database

require('./config/passport')(passport); // pass passport for configuration



// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use('/public', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

// Global variable username of current user.
app.use(function(req, res, next){
	var currentTime = new Date();

	// returns the month (from 0 to 11)
	var month = currentTime.getMonth() + 1;

	// returns the year (four digits)
	var year = currentTime.getFullYear();
	if(req.user) {
		modelsWaterReports.sumDebt(month,year,req.user.id).then(function(result) {
			if(result && result.length > 0) {
				app.locals.sumDebt = result;
			} else {
				app.locals.sumDebt = 0;
			}
			app.locals.username = req.user.username;
			next();	
		});
	} else {
		next();	
	}
	
	
});
// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./app/routes_products.js')(app, passport); 
require('./app/routes_customers.js')(app, passport); 
require('./app/routes_owns.js')(app, passport);
require('./app/routes_water_reports')(app, passport);
require('./app/routes_input_water')(app, passport);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
