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

let getAllSubscriberList = () => {
  subscriberModel.find({}, (err, user) => {
    let userMap = {};
    if(err) {
      console.log(err);
    } else {
      user.forEach((user) => {
        if(user.email) {
          userMap[user._id] = user;
        }
      });
      console.log('userMap '+JSON.stringify(userMap));
    }
    return userMap;
  });
};

module.exports = {
  addToSubscriberList: addToSubscriberList,
  getAllSubscriberList: getAllSubscriberList
}
