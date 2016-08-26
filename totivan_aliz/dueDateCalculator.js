'use strict';

var moment = require('moment');

const dateFormat = 'YYYY/MM/DD HH:mm:ss';
const workingHours = {
  start: 9,
  end: 17
};
const workingDaysIndex = {
  start: 1,
  end: 5
};

function dueDateCalculator(submitDate, turnaroundHours) {
  var date = moment(submitDate, dateFormat);
  while (turnaroundHours > 0) {
    date.add(1, 'hours');
    if (isWorkingHours(date) && isWeekDay(date)) {
      turnaroundHours--;
    }
  }
  return date.format(dateFormat);
}

function isWorkingHours(date) {
  var start = date.clone().hour(workingHours.start).minute(0);
  var end = date.clone().hour(workingHours.end).minute(0);
  var isNotWorkingHours = date.isBefore(start, 'minute') || date.isAfter(end, 'minute');
  return !isNotWorkingHours;
}

function isWeekDay(date) {
  return date.day() >= workingDaysIndex.start && date.day() <= workingDaysIndex.end;
}

module.exports.dueDateCalculator = dueDateCalculator;
