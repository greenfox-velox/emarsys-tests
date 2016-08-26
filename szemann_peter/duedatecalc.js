'use strict';

var moment = require('moment-business-days');

var dueDateCalc = (function(submit, hours) {

  var hoursToAdd;
  var daysToAdd;
  var expiryDate;
  var parsedResult;
  var workdayLength = 8;
  var workdayStart = 9;
  var workdayEnd = 17;
  var offDutyHours = 16;
  var weekendHours = 48;
  var friday = 5;

  var parseTurnaround = function(hours) {
    hoursToAdd = hours % workdayLength;
    daysToAdd = Math.floor(hours / workdayLength);
    return;
  }

  var parseDate = function(date) {
    parsedResult = moment(date).toDate();
    parsedResult = moment(date).format('MM/DD/YY HH:mm');
    console.log('The ticket has to be resolved by: ' + parsedResult);
    return;
  }

  var addHours = function(date, hours) {
    return moment(date).add(hours, 'h');
  }

  var checkAddedHours = function(date) {
    var parsed = moment(date).toDate();
    var amount = parsed.getHours();
    if (amount >= workdayEnd || amount < workdayStart) {
      checkDayOfWeek(date);
    } else {
      addBusinessDays(date);
    }
  }

  var checkDayOfWeek = function(date) {
    if (moment(date).weekday() === friday) {
      date = addHours(date, (weekendHours + offDutyHours));
      addBusinessDays(date);
    } else {
      date = addHours(date, offDutyHours);
      addBusinessDays(date);
    }
  }

  var addBusinessDays = function(date) {
    expiryDate = moment(date).businessAdd(daysToAdd);
    parseDate(expiryDate);
  }

  var getDueDate = function(submitDate, hoursToResolve) {
    parseTurnaround(hoursToResolve);
    expiryDate = addHours(submitDate, hoursToAdd);
    checkAddedHours(expiryDate);
  }

  return {
    getDueDate: getDueDate,
    addHours: addHours,
    addBusinessDays: addBusinessDays
  };

}) ();

var trialShort = 1472026500000;

console.log(dueDateCalc.getDueDate(trialShort, 15));
console.log(dueDateCalc.addHours(trialShort, 2));

module.exports = dueDateCalc;
