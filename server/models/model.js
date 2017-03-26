var mongoose = require('mongoose');
var _ = require('underscore');

mongoose.Promise = require('q').Promise;

module.exports = function(wagner) {
  mongoose.connect('mongodb://localhost:27017/todo');

  wagner.factory('db', function() {
    return mongoose;
  });

//   var Category =
//     mongoose.model('Task', require('./TaskSchema'), 'tasks');
//   var User =
//     mongoose.model('User', require('./UserSchema'), 'users');

  var models = {
    Task: mongoose.model('Task', require('./TaskSchema'), 'tasks'),
    User: mongoose.model('User', require('./UserSchema'), 'users')
  };

  // To ensure DRY-ness, register factories in a loop
  _.each(models, function(value, key) {
    wagner.factory(key, function() {
      return value;
    });
  });

  //wagner.factory('Product', require('./product'));

  return models;
};