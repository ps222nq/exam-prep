'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const questionModel = require('./models/Question');

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

app.get('/quiz', function(req, res){
    let jsoninput = '[{"questionText":"Which process will regularly analyse incident data to identify discernible trends?","answerAlternatives":[{"answerAlternativeId":"A","answerAlternativeText":"Service level management"},{"answerAlternativeId":"B","answerAlternativeText":"Problem management"},{"answerAlternativeId":"C","answerAlternativeText":"Change management"},{"answerAlternativeId":"D","answerAlternativeText":"Event management "}],"rightAnswer":{"answerAlternativeId":"B","answerAlternativeText":"Problem management"}},{"questionText":"Which one of the following would be the MOST useful in helping to define roles and responsibilities in an organizational structure?","answerAlternatives":[{"answerAlternativeId":"A","answerAlternativeText":"RACI model"},{"answerAlternativeId":"B","answerAlternativeText":"Incident model"},{"answerAlternativeId":"C","answerAlternativeText":"Continual service improvement (CSI) approach"},{"answerAlternativeId":"D","answerAlternativeText":"The Deming Cycle "}],"rightAnswer":{"answerAlternativeId":"A","answerAlternativeText":"RACI model"}}]';
    let input = JSON.parse(jsoninput);

    let data = {questions: input};
    res.render('home/quiz', data)
});

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(404).render('error/404');
});

app.listen(port, function() {
    console.log('server listening on port ' + port);
});