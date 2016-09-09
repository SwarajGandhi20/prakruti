'use strict';
let express = require('express');
let exphbs  = require('express-handlebars');
let bodyParser = require('body-parser');
let subscriberList = require('./backend/subscribe');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('home');
});

app.post('/subscribe', (request, response) => {
  console.log(request.body);
  // console.log(request.params, request.body);
  subscriberList.addToSubscriberList();
  response.end();
});


app.get('/', (req, res) => {
  res.render('home');
});


app.listen(8000, () => {
  console.log('App is listning on port 8000');
})
