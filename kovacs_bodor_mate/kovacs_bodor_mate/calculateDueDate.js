'use strict';
const moment = require('moment');

const dueDateGenerator = function() {
  const START_WORK = 9;
  const END_WORK = 17;
  const WORKING_HOURS = END_WORK - START_WORK;
  const DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss';
  const SATURDAY = 6;
  const SUNDAY = 7;

  function isValidInputDateFormat(date) {
    return moment(date, DATE_FORMAT, true).isValid();
  }

  function isValidTurnAroundTime(hours) {
    return (typeof(hours) === 'number' && (hours % 1) === 0 && hours > 0);
  }

  function isValidInputIntervallum(date){
    const workHours = date.hours() >= START_WORK && date.hours() < END_WORK;
    const workDays = date.isoWeekday() !== SATURDAY && date.isoWeekday() !== SUNDAY;
    return workHours && workDays;
  }

  function isValid(inputDate, turnAroundTime) {
    const convertInputDate = moment(inputDate, DATE_FORMAT);
    if (!isValidInputDateFormat(inputDate)) {
      return 'Wrong input date format! Accepted format: ' + DATE_FORMAT;
    }
    else if (!isValidTurnAroundTime(turnAroundTime)) {
      return 'Wrong turnaround time type!';
    }
    else if (!isValidInputIntervallum(convertInputDate)) {
      return 'Input date time out of working hours!';
    }
    return 'ok';
  }

  function hoursInDate(date) {
    return moment(date, DATE_FORMAT).hours();
  }

  function dateAddValueCal(date, hours) {
    let daysToWork = Math.floor(hours / WORKING_HOURS);
    let hoursToWorkLastDay = hours % WORKING_HOURS;
    const leftOverHours = END_WORK - hoursInDate(date) - hoursToWorkLastDay;
    if (leftOverHours <= 0) {
      daysToWork++;
      hoursToWorkLastDay = (START_WORK - leftOverHours) - hoursInDate(date);
    }
    return {
      daysToWork: daysToWork,
      hoursToWorkLastDay: hoursToWorkLastDay,
    };
  }

  function dayCounter(date) {
    if (date.isoWeekday() === 5) {
      date.add(3, 'days');
    }
    else {
      date.add(1, 'days');
    }
    return date;
  }

  function dueDateCalculator(inputDate, turnAroundTime) {
    if (isValid(inputDate, turnAroundTime) === 'ok') {
      const dueDayDate = moment(inputDate, DATE_FORMAT);
      const input = dateAddValueCal(inputDate, turnAroundTime);
      let i = 0;
      while (i < input.daysToWork) {
        i++;
        dayCounter(dueDayDate);
      }
      return dueDayDate.add(input.hoursToWorkLastDay, 'hours').format(DATE_FORMAT);
    }
    return isValid(inputDate, turnAroundTime);
  }

  return {
    isValid: isValid,
    dueDateCalculator: dueDateCalculator,
  }
};

module.exports = dueDateGenerator;
