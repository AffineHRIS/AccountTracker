// Bring in our dependencies
var app = require('express')();
var login = require('./login');
var accountAPI = require('./accountAPI');
var msaAPI = require('./msaAPI');
var sowAPI = require('./sowAPI');
var profitabilityAPI = require('./profitabilityAPI');

var access = require('./var.js');
access.myFunc1();
    app.use(bodyParser.json());
    app.use(function (req, res, next) {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
        // Pass to next layer of middleware
        next();
    });

//  Connect all our routes to our application
app.use('/', login);
app.use('/', accountAPI);
app.use('/', msaAPI);
app.use('/', sowAPI);
app.use('/', profitabilityAPI);
app.use('/uploads', express.static('uploads/'));

// Main route sends our HTML file
app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});


// Turn on that server!
app.listen(3200, function() {
  console.log('App listening on port 3200');
});
