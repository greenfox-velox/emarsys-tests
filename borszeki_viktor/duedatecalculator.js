'use strict';

const workStartingHour = 9;
const workEndingHour = 17;
const saturday = 6;
const sunday = 0;
const addHour = date => date.setTime(date.getTime() + (60 * 60 * 1000));

const calculateDueDate = (submitDate, turnaroundTime) => {
 const date = new Date(submitDate);
 let hoursToWork = turnaroundTime;
 if (date.getHours() < workStartingHour
    || date.getHours() >= workEndingHour
    || date.getDay() === saturday
    || date.getDay() === sunday) {
   throw new Error('A problem can only be reported during working hours!');
 }
 while (hoursToWork > 0) {
   if (date.getHours() >= workStartingHour
      && date.getHours() < workEndingHour
      && date.getDay() !== saturday
      && date.getDay() !== sunday) {
     addHour(date);
     hoursToWork --;
   } else {
     addHour(date);
   }
 }
 return date;
};

module.exports.calculateDueDate = calculateDueDate;
