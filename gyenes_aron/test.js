'use strict';

var tape = require('tape');
var calculateDueDate = require('./duedate');

tape('dueDateOnSameDay', function(t) {
  t.deepEqual(calculateDueDate('2016-08-22 09:30', 2), '2016-08-22 11:30');
  t.end();
});

tape('dueDateOnNextDay', function(t) {
  t.deepEqual(calculateDueDate('2016-08-22 09:30', 10), '2016-08-23 11:30');
  t.end();
});

tape('dueDateinTwoDaysSameWeek', function(t) {
  t.deepEqual(calculateDueDate('2016-08-22 09:30', 30), '2016-08-25 15:30');
  t.end();
});

tape('dueDateNextWeek', function(t) {
  t.deepEqual(calculateDueDate('2016-08-24 09:30', 34), '2016-08-30 11:30');
  t.end();
});

tape('dueDateNextWeekStartingDateOnFriday', function(t) {
  t.deepEqual(calculateDueDate('2016-08-26 09:30', 10), '2016-08-29 11:30');
  t.end();
});

tape('dueDateInMoreThanOneWeek', function(t) {
  t.deepEqual(calculateDueDate('2016-08-24 09:30', 100), '2016-09-09 13:30');
  t.end();
});

tape('dueDateInMoreThanOneWeekStartingDateOnFriday', function(t) {
  t.deepEqual(calculateDueDate('2016-08-26 14:00', 147), '2016-09-22 09:00');
  t.end();
});

tape('invalidInputFormat', function(t) {
  t.deepEqual(calculateDueDate('2016-08', 2), 'Please input a date between 9AM and 5PM in "YYYY-MM-DD HH:mm" format!');
  t.end();
});

tape('invalidInputDate', function(t) {
  t.deepEqual(calculateDueDate('2016-08-22 05:30', 2), 'Please input a date between 9AM and 5PM in "YYYY-MM-DD HH:mm" format!');
  t.end();
});
