'use strict';

const dueDateCalculator = (function () {
  const closingTime = 17;
  const hoursWorkedPerDay = 8;
  const hoursWorkedPerWeek = 40;
  const hoursBetweenTwoShifts = 16;
  const weekendHours = 48;
  const lastWorkingDayOfWeek = 5;

  function hoursToMilliseconds(hours) {
    return hours * 60 * 60 * 1000;
  }

  function currentTimeDouble(date) {
    const currentTime = date.getHours() + (date.getMinutes() / 60);
    return currentTime;
  }

  function workhoursLeftOfDay(date) {
    const fullHoursLeft = Math.floor(closingTime - currentTimeDouble(date));
    return fullHoursLeft;
  }

  function workhoursLeftOfWeek(date) {
    const daysLeftApartFromToday = lastWorkingDayOfWeek - date.getDay();
    var fullHoursLeft = Math.floor(closingTime - currentTimeDouble(date));
    fullHoursLeft += daysLeftApartFromToday * hoursWorkedPerDay;
    return fullHoursLeft;
  }

  function hoursToAddDueToEndOfDay(date, turnaround) {
    let hoursToAdd;
    if (workhoursLeftOfDay(date) >= turnaround) {
      hoursToAdd = 0;
    } else {
      const hoursLeftForNextDays = turnaround - workhoursLeftOfDay(date);
      const numberOfDaysLeft = Math.ceil(hoursLeftForNextDays / hoursWorkedPerDay);
      hoursToAdd = numberOfDaysLeft * hoursBetweenTwoShifts;
    }
    return hoursToAdd;
  }

  function addSleepTime(date, turnaround) {
    const turnaroundMS = hoursToMilliseconds(turnaround);
    const additionalMS = hoursToMilliseconds(hoursToAddDueToEndOfDay(date, turnaround));
    return new Date(date.getTime() + turnaroundMS + additionalMS);
  }

  function hoursToAddDueToEndOfWeek(date, turnaround) {
    let hoursToAdd;
    if (workhoursLeftOfWeek(date) >= turnaround) {
      hoursToAdd = 0;
    } else {
      const hoursLeftForNextWeeks = turnaround - workhoursLeftOfWeek(date);
      const numberOfWeeksLeft = Math.ceil(hoursLeftForNextWeeks / hoursWorkedPerWeek);
      hoursToAdd = numberOfWeeksLeft * weekendHours;
    }
    return hoursToAdd;
  }

  function addWeekends(date, turnaround, dateModifiedWithSleeptime) {
    const additionalMS = hoursToMilliseconds(hoursToAddDueToEndOfWeek(date, turnaround));
    return new Date(dateModifiedWithSleeptime.getTime() + additionalMS);
  }

  function getDueDate(date, turnaround) {
    const dateModifiedWithSleeptime = addSleepTime(date, turnaround);
    const dateModifiedWithWeekends = addWeekends(date, turnaround, dateModifiedWithSleeptime);
    return dateModifiedWithWeekends;
  }

  return {
    hoursToMilliseconds: hoursToMilliseconds,
    currentTimeDouble: currentTimeDouble,
    workhoursLeftOfDay: workhoursLeftOfDay,
    workhoursLeftOfWeek: workhoursLeftOfWeek,
    hoursToAddDueToEndOfDay: hoursToAddDueToEndOfDay,
    addSleepTime: addSleepTime,
    hoursToAddDueToEndOfWeek: hoursToAddDueToEndOfWeek,
    addWeekends: addWeekends,
    getDueDate: getDueDate
  };
}());

module.exports = dueDateCalculator;
