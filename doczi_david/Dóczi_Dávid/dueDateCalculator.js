'use strict';
var dueDateCalculator = (function () {

  var hours = 60 * 60 * 1000;
  var saturday = 6;
  var sunday = 0;
  var dayStarting = 9;
  var dayEnding = 17;

  function nextHour(date) {
    return new Date(date.getTime() + hours)
  }

  function isWorkingDay(date) {
    var day = date.getDay();
    return day !== saturday && day !== sunday;
  }

  function isWorkingHour(date) {
    var hour = date.getHours();
    return hour >= dayStarting && hour < dayEnding;
  }

  function isValidInput(date) {
    return isWorkingDay(date) && isWorkingHour(date);
  }

  function calculateDueDate(submitDate, turnaroundTime) {
    var workLeft = turnaroundTime;
    var now = new Date(submitDate);
    while (workLeft > 0) {
      now = nextHour(now);
      if (isValidInput(now)) {workLeft-- ;}
    }
    return now;
  }

  return {
    hours : hours,
    saturday : saturday,
    sunday : sunday,
    dayStarting : dayStarting,
    dayEnding : dayEnding,
    nextHour :nextHour,
    isWorkingDay : isWorkingDay,
    isWorkingHour :isWorkingHour,
    isValidInput : isValidInput,
    calculateDueDate : calculateDueDate
  }
}) ();

module.exports = dueDateCalculator;
