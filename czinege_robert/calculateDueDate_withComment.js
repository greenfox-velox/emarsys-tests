'use strict'

let moment = require('moment');

// My assumptions based on specification:
// The format of the date coming from the issue tracking system is given, however now it is unknown.
// If it would be known, a parser would turn it into the format I use in this solution. Therefore, I did not wrote validation for the format of the submitDateTime.
// Similarly, I assumed, that the turnaround time can not be negative, and the submit time cannot be in the future. I assumed this is taken care of by the issue tracking system, therefore I focused on the algorithm instead of these validations.
// It was given in the specification, that a submit can only be done on businessdays in working hours, therefore I don't validate the input params for this.


// This is the main function which is tested and returns the final due date & time.
function calculateDueDate(submitDateTime, turnaround) {
// Basic format variables, can be changed here for different display format
  const HOUR_FORMAT = 'HH:mm:ss';
  const SUBMIT_DT_FORMAT = 'YYYY-MM-DD HH:mm:ss';
  const DUE_DATE_FORMAT = 'ddd, YYYY-MM-DD HH:mm:ss';

// Static working hours, can be set here for different working hours. Right now it only works, when start & end is on the same day.
  const WORK_HOURS_START = moment('09:00:00', HOUR_FORMAT);
  const WORK_HOURS_END = moment('17:00:00', HOUR_FORMAT);

// Getting which day of the week is the submit day 
  let submitDay = moment(submitDateTime, SUBMIT_DT_FORMAT).isoWeekday();
  
// Turning the turnaround time into a duration used by the moment.
  let turnaroundDuration = moment.duration(createTurnaroundDuration(submitDay, turnaround, WORK_HOURS_START, WORK_HOURS_END, HOUR_FORMAT));

// Initial dueDate calc
  let dueDate = moment(submitDateTime, SUBMIT_DT_FORMAT).add(turnaroundDuration);

// Getting the time part of the initially calculated due date.
  let dueTime = dueDate.format(HOUR_FORMAT);

// Checking if the initial due time is in workhours /starting and ending is included/
  let duringWorkHours = moment(dueTime, HOUR_FORMAT).isBetween(WORK_HOURS_START, WORK_HOURS_END, null, '[]');

// This 'if' checks, if the initial due time is during work hours, if it is not, then calculates the overtime, adds a day and sets the new time according to start time + overtime.
  if (duringWorkHours) {
    dueDate.add(jumpOverIfNotBusinessDay(dueDate));
  } else {
    let remainingOvertime = calculateOvertime(dueTime, WORK_HOURS_END, HOUR_FORMAT);
    let newTimeOnNextDay = setNewTime(WORK_HOURS_START, remainingOvertime);

    dueDate.add(jumpOverIfNotBusinessDay(dueDate));
    dueDate.add(1, 'days');
    dueDate.add(jumpOverIfNotBusinessDay(dueDate)).set(newTimeOnNextDay);
  }

// Tests are written to check on this exact format.
  return dueDate.format(DUE_DATE_FORMAT);
};
  
// ------------------------------------------------------------

// Sets the new due time on the next day
function setNewTime(workStartHour, remainingOvertime) {
  let newDueTime = workStartHour.add(remainingOvertime, 'seconds');
  let newTime = {
    'hour': newDueTime.hour(),
    'minute': newDueTime.minute(),
    'second': newDueTime.second()
  };
  return newTime;
};

// Calculates the remaining overtime after end of work hours
function calculateOvertime(dueTime, endHour, format) {
  const REMAINING_OVERTIME = moment(dueTime, format).diff(endHour, 'seconds');
  return REMAINING_OVERTIME;
};

// If the due date is a weekend day, sets the new due day to the next business day. 
function jumpOverIfNotBusinessDay(dueDate) {
  const DAY_OF_WEEK = dueDate.isoWeekday();
  const SATURDAY = 6;
  const SUNDAY = 7;
  const FROM_NEXT_MONDAY = 8;

  if (DAY_OF_WEEK === SATURDAY || DAY_OF_WEEK === SUNDAY) {
    var daysTillNextMonday = (FROM_NEXT_MONDAY - DAY_OF_WEEK);
  }
  return { 'days': daysTillNextMonday};
};

// Creates the duration to be added to the submit date from the turnaround hours.
function createTurnaroundDuration(submitWeekDay, turnaround, workHoursStart, workHoursEnd, format) {
  const WORK_HOURS = moment(workHoursEnd, format).diff(workHoursStart, 'hours');
  const WORKING_DAYS_PER_WEEK = 5;
  let turnaroundTime = {};
  let remainingHours = turnaround;
  //Calculates the number of whole weeks
  turnaroundTime.weeks = parseInt(turnaround / (WORK_HOURS * WORKING_DAYS_PER_WEEK));

  if (turnaroundTime.weeks > 0) {
    remainingHours = (turnaround - (turnaroundTime.weeks * (WORK_HOURS * WORKING_DAYS_PER_WEEK)));
  }

  turnaroundTime.days = parseInt(remainingHours / WORK_HOURS);
  
  const END_WEEKDAY = (turnaroundTime.days + submitWeekDay);

  turnaroundTime.days += addWeekendDaysIfRemainingDaysLoopWeekend(END_WEEKDAY);

  turnaroundTime.hours = remainingHours % WORK_HOURS;

  return turnaroundTime;
};

//Checks if a weekend is looped by the remaining days after whole weeks.
function addWeekendDaysIfRemainingDaysLoopWeekend(sumWeekDay) {
  let extraDays = 0;
  const DAYS_IN_A_WEEK = 7;
  const WEEKEND_DAYS = 2;
  
  if (sumWeekDay > DAYS_IN_A_WEEK) {
    extraDays = (sumWeekDay % DAYS_IN_A_WEEK) * WEEKEND_DAYS;
  } else if (sumWeekDay === DAYS_IN_A_WEEK) {
    extraDays = WEEKEND_DAYS;
  }
  
  return extraDays;
};

module.exports.calculateDueDate = calculateDueDate;