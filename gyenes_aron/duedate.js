'use strict';

var moment = require('moment');
var startOfWorkday = 9;
var endOfWorkday = 17;
var hoursInOffice = 8;
var hoursNotInOffice = 16;
var weekendDays = 2;
var weekDays = 5;

function calculateDueDate(inputdate, turnaroundTime) {
  var startingDay = moment(inputdate).format('dddd');
  var startingDate = moment(inputdate);
  var startingHour = startingDate.hour();
  var dateToBeResolved = startingDate.add(turnaroundTime, 'hours');

  if (startingHour < startOfWorkday || startingHour > endOfWorkday) {
    return 'Please input a date between 9AM and 5PM in "YYYY-MM-DD HH:mm" format!';
  }

  if (turnaroundTime > hoursInOffice) {
    var turnaroundDays = Math.floor(turnaroundTime / hoursInOffice);
    if (turnaroundDays >= weekDays) {
      var turnaroundWeeks = Math.floor(turnaroundDays / weekDays);
      if (startingDay === 'Friday') {
        turnaroundDays = turnaroundDays % weekDays + weekendDays;
      } else {
        turnaroundDays = turnaroundDays % weekDays;
      }
    }
    var turnaroundHours = turnaroundTime % hoursInOffice;
    dateToBeResolved.subtract(turnaroundTime, 'hours');
    dateToBeResolved.add(turnaroundWeeks, 'weeks');
    dateToBeResolved.add(turnaroundDays, 'days');
    dateToBeResolved.add((turnaroundHours), 'hours');
  }

  if (dateToBeResolved.hour() < startOfWorkday || dateToBeResolved.hour() >= endOfWorkday) {
    dateToBeResolved.add(hoursNotInOffice, 'hours');
  }

  if (dateToBeResolved.format('dddd') === 'Saturday' || dateToBeResolved.format('dddd') === 'Sunday') {
    dateToBeResolved.add(weekendDays, 'days');
  }

  return dateToBeResolved.format('YYYY-MM-DD HH:mm');
}

module.exports = calculateDueDate;
