'use strict';
var moment = require('moment');

function calculateDueDate(submitDate, turnaroundTime) {
  var currentTime = moment(submitDate);
  for (var i = 1; i <= turnaroundTime; i++) {
    currentTime.add(1, 'hours');
    if (currentTime.format('HH') === (17).toString()) {
      currentTime.add(16, 'hours');
    }
    if (currentTime.weekday() > 5) {
      currentTime.add(2, 'days');
    }
  }
  return currentTime.format('YYYY-MM-DD HH:mm:ss');
}

module.exports.calculateDueDate = calculateDueDate;
