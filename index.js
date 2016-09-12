'use strict';
let express = require('express');
let exphbs  = require('express-handlebars');
let bodyParser = require('body-parser');
let subscriberList = require('./backend/subscribe');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  partialsDir: [
    'views/partials/'
  ]
}));

app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/causes', (request, response) => {
  response.render('layouts/causes');
});

app.get('/about', (request, response) => {
  response.render('layouts/about');
});

app.get('/contact', (request, response) => {
  response.render('layouts/contact');
})

app.get('/list', (request, response) => {
  let userMap = subscriberList.getAllSubscriberList();
  response.end();
})

app.post('/subscribe', (request, response) => {
  let email = request.body.email;
  subscriberList.addToSubscriberList(email);
  response.end();
});


app.listen(8000, () => {
  console.log('App is listning on port 8000');
})
