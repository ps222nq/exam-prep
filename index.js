'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');

let app = express();
let port = process.env.PORT || 8000;

app.engine('hbs', exphbs({
    defaultLayout: 'index',
    extname: 'hbs',
    helpers: {
        json: function(context) {
            return JSON.stringify(context);
        }
    }
}));
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

app.get('/', function(req, res) {
    res.render('home/home');
});

app.listen(port, function() {
    console.log('server listening on port ' + port);
});