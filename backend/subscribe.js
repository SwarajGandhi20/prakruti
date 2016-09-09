'use strict';
let mongoose = require('./db');

let subscriberModel = mongoose.model('subscriberList', { email: String });

let addToSubscriberList = (email) => {
  let user = new subscriberModel({ email: email });
  user.save((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Successfully subscribe to the channel.');
    }
  });

};

module.exports = {
  addToSubscriberList: addToSubscriberList
}
