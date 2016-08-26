'use strict'

const moment = require('moment');
const validation = require('./validation');
const config = require('./config');

const calculation = (function() {

  function calculateDueDate(submitDate, turnaroundTime) {
    if(validation.areInputsInvalid(submitDate, turnaroundTime)) {
      return validation.showErrorMessage(submitDate);
    }
    let deadLine = moment(submitDate, config.submitDateFormat);
    let remaningWork = turnaroundTime;
    while (remaningWork >= 0) {
      deadLine.add(1, 'hour');
      if (isWorkingPeriod(deadLine)) {
        remaningWork--;
      }
    }
    doCorrectTheDeadline(deadLine, remaningWork);
    return deadLine.format(config.submitDateFormat[0]);
  }

  function isWorkingPeriod(deadLine) {
    return isWorkingDay(deadLine.format('dddd')) && isWorkingTime(deadLine.format('HH'));
  }

  function isWorkingDay(day) {
    return day !== config.weekend.start && day !== config.weekend.end;
  }

  function isWorkingTime(hour) {
    return hour >= config.workingtime.start && hour < config.workingtime.end;
  }

  function doCorrectTheDeadline(deadLine, remaningWork) {
    deadLine.add(remaningWork, 'hour');
  }

  return {
    calculateDueDate,
  };
 }());

module.exports = calculation;
