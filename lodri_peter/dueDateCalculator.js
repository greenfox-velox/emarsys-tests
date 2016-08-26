module.exports = (function() {
  'use strict';
  const moment = require('moment');

  let START_DAY = 'Monday';
  let END_DAY = 'Friday';
  let WORKING_DAYS = 5;
  let WORKING_HOURS = 8;
  let START_HOUR = 9;
  let END_HOUR = START_HOUR + WORKING_HOURS;
  let WEEKEND = ['Saturday', 'Sunday'];

  function getConfig(){
    return {START_DAY: START_DAY,
            END_DAY: END_DAY,
            WORKING_DAYS: WORKING_DAYS,
            WORKING_HOURS: WORKING_HOURS,
            START_HOUR: START_HOUR,
            WEEKEND: WEEKEND}
  }

  function setUp(config) {
    START_DAY = config.START_DAY || 'Monday';
    END_DAY  = config.END_DAY || 'Friday';
    WORKING_DAYS = config.WORKING_DAYS || 5;
    WORKING_HOURS = config.WORKING_HOURS || 8;
    START_HOUR = config.START_HOUR || 9;
    END_HOUR = config.END_HOUR || START_HOUR + WORKING_HOURS;
    WEEKEND = config.WEEKEND || ['Saturday', 'Sunday'];
  }

  function isWorkingDay(date) {
    let day = date.format('dddd');
    return WEEKEND.indexOf(day) >= 0 ? false : true;
  }

  function isWorkingHour(date) {
    let hour = date.hours();
    return hour >= START_HOUR && hour < END_HOUR;
  }

  function workCanBeDone(date) {
    return isWorkingDay(date) && isWorkingHour(date);
  }

  function calculateDate(submitDate, turnaround) {
    let remainingWork = turnaround;

    let currentDate = moment(submitDate);
    while (remainingWork > 0) {
      currentDate.add(1, 'hours');
      if (workCanBeDone(currentDate)) {
        remainingWork--;
      }
    }
    return currentDate._d;
  }

  return {
    getConfig: getConfig,
    setUp: setUp,
    calculateDate: calculateDate
  }

})();
