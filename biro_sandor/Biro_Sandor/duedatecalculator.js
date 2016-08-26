'use strict';

var moment = require('moment');

var workingHours = 8;
var workingHourEnds = 17;

var dueDateCalculator = (function (date, turnAroundTime) {

  function calculate (date, turnAroundTime) {
    var turnAroundTimeInDay = turnAroundTime / workingHours;
    var submitDate = moment(date);
    increaseDate(turnAroundTime, submitDate, turnAroundTimeInDay);
    addRestDayInHoursToDate(turnAroundTime, date, submitDate, turnAroundTimeInDay);
    increaseHours(submitDate);
    return submitDate.format('LLL');
  }

  function getDays(turnAroundTime, turnAroundTimeInDay) {
    var days = Math.floor(turnAroundTimeInDay);
    return days;
  }

  function getHours(turnAroundTime, turnAroundTimeInDay) {
    var restDay = turnAroundTimeInDay - getDays(turnAroundTime, turnAroundTimeInDay);
    var restDayInHour = workingHours * restDay;
    return restDayInHour;
  }

  function isWeekend (submitDate) {
    if(submitDate.isoWeekday() > 5) {
      submitDate.add(2, 'days');
    };
  }

  function increaseDate (turnAroundTime, submitDate, turnAroundTimeInDay) {
    for (var i = 1; i <= getDays(turnAroundTime, turnAroundTimeInDay); i++){
      if(submitDate.isoWeekday() > 5) {
        submitDate.add(2, 'days');
        i--;
      } else {
        submitDate.add(1, 'days');
      };
    };
    return submitDate;
  }

  function increaseHours (submitDate) {
    if (submitDate.format('H') >= workingHourEnds) {
      submitDate.add(16, 'hours');
    };
    isWeekend(submitDate);
    return submitDate;
  }

  function addRestDayInHoursToDate (turnAroundTime, date, submitDate, turnAroundTimeInDay) {
    var hour = getHours(turnAroundTime, turnAroundTimeInDay);
    submitDate.add(hour, 'hours');
    isWeekend(submitDate);
    return submitDate;
  }

  return {
    calculate: calculate,
    getDays: getDays,
    getHours: getHours,
    isWeekend: isWeekend,
    increaseDate: increaseDate,
    increaseHours: increaseHours,
    addRestDayInHoursToDate: addRestDayInHoursToDate
  }
}) ();

module.exports = dueDateCalculator;
