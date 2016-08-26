'use strict';

const moment = require('moment');
const addBusinessDays = require('moment-business').addWeekDays;
const today = moment(new Date());
const workingHoursPerDay = 8;

const calculator = (function() {
  function convertTurnaroundTime(turnaroundTime) {
    const turnaroundDays = Math.floor(turnaroundTime / workingHoursPerDay);
    const turnaroundHours = turnaroundTime % workingHoursPerDay;
    return {turnaroundDays: turnaroundDays, turnaroundHours: turnaroundHours};
  }

  function calculateDueDate(submitDate, turnaroundTime) {
    let timeToResolve = submitDate;
    if (!submitDate) {
      return {
        status: 'error',
        error: 'Input date is false'
      };
    } else if (!moment(submitDate).isValid()) {
      return {
        status: 'error',
        error: 'Submit date is invalid'
      };
    } else if (moment(submitDate).diff(today) > 0) {
      return {
        status: 'error',
        error: 'Submit date is in future'
      };
    } else if (!turnaroundTime) {
      return timeToResolve;
    } else if (turnaroundTime < 0) {
      return {
        status: 'error',
        error: 'TurnaroundTime is negative'
      };
    } else if (moment(submitDate).format('H') < 9 || moment(submitDate).format('H') > 17) {
      return {
        status: 'error',
        error: 'Submit time is out of boundaries (9AM to 5PM)'
      };
    } else if (moment(submitDate).format('dddd') === 'Sunday' || moment(submitDate).format('dddd') === 'Saturday') {
      return {
        status: 'error',
        error: 'Submit day is not workday (Monday through Friday)'
      };
    }
    const tTdays = convertTurnaroundTime(turnaroundTime).turnaroundDays;
    const tThours = convertTurnaroundTime(turnaroundTime).turnaroundHours;
    timeToResolve = addBusinessDays(moment(submitDate), tTdays).add(tThours, 'hours').format();
    if (moment(timeToResolve).format('H') > 17) {
      timeToResolve = moment(timeToResolve).add(16, 'hours').format();
    }
    return timeToResolve;
  }

  return {
    calculateDueDate,
    convertTurnaroundTime
  };
})();

module.exports = calculator;
