'use strict';
var moment = require('moment');

var dueDateCalculator = (function() {
  function validateDate(date) {
    if (date.format('H') > 17 || date.format('H') < 9 || date.isoWeekday() === 6 || date.isoWeekday() === 7) {
      return false;
    }
    return true;
  }

  function inputsToConsole(date, turnAroundTime) {
    console.log('Input date: ', moment(date).format('LLLL'));
    console.log('Turn around time in hours: ', turnAroundTime);
  }

  function calculateSkippedWeekendDays(date, turnAroundTime) {
    if ((date.isoWeekday() + Math.floor(turnAroundTime / 8)) > 7) {
      return Math.floor((date.isoWeekday() + Math.floor(turnAroundTime / 8)) / 6) * 2;
    }
    return 0;
  }

  function addTurnAroundTime(date, turnAroundTime, skippedWeekendDays) {
    return moment(date).add(Math.floor(turnAroundTime / 8), 'day').add(turnAroundTime % 8, 'hour').add(skippedWeekendDays, 'day');
  }

  function checkForWeekend(dueDate) {
    if (dueDate.day() === 6 || dueDate.day() === 0) {
      dueDate = moment(dueDate).add(2, 'day');
    }
    return dueDate;
  }

  function checkForAfterWorkingHours(dueDate, endOfWorkingHours) {
    if (dueDate.format('H') >= endOfWorkingHours) {
      dueDate = moment(dueDate).add(16, 'hours');
    }
    return dueDate;
  }

  function calculateDueDate(inputDate, turnAroundTime) {
    var endOfWorkingHours = 17;
    var date = moment(inputDate);
    if (!validateDate(date)) {
      return ('Date or time is out of working hours');
    }
    var skippedWeekendDays = calculateSkippedWeekendDays(date, turnAroundTime);
    inputsToConsole(date, turnAroundTime);
    var dueDate = addTurnAroundTime(date, turnAroundTime, skippedWeekendDays);
    dueDate = checkForWeekend(dueDate);
    dueDate = checkForAfterWorkingHours(dueDate, endOfWorkingHours);
    dueDate = checkForWeekend(dueDate);
    console.log('Due date: ', moment(dueDate).format('LLLL'));
    return moment(dueDate).format('LLLL');
  }
  return {
    calculateDueDate: calculateDueDate
  }
})();

module.exports = dueDateCalculator;
