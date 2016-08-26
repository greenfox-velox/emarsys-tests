'use strict';

var calculateDueDate = require('./duedate').calculateDueDate;
var tape = require('tape');

tape('test monday, turnaround:15minutes', function(t) {
  t.deepEqual(calculateDueDate('2016-08-22 10:00', 0.25), 'Monday, August 22, 2016 10:15 AM');
  t.end();
});
tape('test monday, turnaround:1', function(t) {
  t.deepEqual(calculateDueDate('2016-08-22 10:00', 1), 'Monday, August 22, 2016 11:00 AM');
  t.end();
});
tape('test friday, turnaround:15minutes', function(t) {
  t.deepEqual(calculateDueDate('2016-08-26 16:45', 0.25), 'Monday, August 29, 2016 9:00 AM');
  t.end();
});
tape('test friday, turnaround:1', function(t) {
  t.deepEqual(calculateDueDate('2016-08-26 16:45', 1), 'Monday, August 29, 2016 9:45 AM');
  t.end();
});
tape('test turnaround:10', function(t) {
  t.deepEqual(calculateDueDate('2016-08-22 10:00', 10), 'Tuesday, August 23, 2016 12:00 PM');
  t.end();
});
tape('test due on the same week', function(t) {
  t.deepEqual(calculateDueDate('2016-08-22 10:00', 30), 'Thursday, August 25, 2016 4:00 PM');
  t.end();
});
tape('test if hours turn around after 17:00', function(t) {
  t.deepEqual(calculateDueDate('2016-08-24 16:00', 10), 'Friday, August 26, 2016 10:00 AM');
  t.end();
});
tape('test if hours turn around at 17:00', function(t) {
  t.deepEqual(calculateDueDate('2016-08-24 16:00', 1), 'Thursday, August 25, 2016 9:00 AM');
  t.end();
});
tape('test if due date on weekend the days turn around', function(t) {
  t.deepEqual(calculateDueDate('2016-08-24 16:00', 24), 'Monday, August 29, 2016 4:00 PM');
  t.end();
});
tape('test friday with turnaround:20', function(t) {
  t.deepEqual(calculateDueDate('2016-08-26 14:00', 20), 'Wednesday, August 31, 2016 10:00 AM');
  t.end();
});
tape('test friday with turnaround:40', function(t) {
  t.deepEqual(calculateDueDate('2016-08-26 14:00', 40), 'Friday, September 2, 2016 2:00 PM');
  t.end();
});
tape('test friday with turnaround:47', function(t) {
  t.deepEqual(calculateDueDate('2016-08-26 14:00', 47), 'Monday, September 5, 2016 1:00 PM');
  t.end();
});
tape('test moday with turnaround:40', function(t) {
  t.deepEqual(calculateDueDate('2016-08-29 14:00', 40.5), 'Monday, September 5, 2016 2:30 PM');
  t.end();
});
tape('test monday with turnaround:83', function(t) {
  t.deepEqual(calculateDueDate('2016-08-22 14:00', 83), 'Tuesday, September 6, 2016 9:00 AM');
  t.end();
});
tape('test friday with turnaround:83', function(t) {
  t.deepEqual(calculateDueDate('2016-08-26 14:00', 83), 'Monday, September 12, 2016 9:00 AM');
  t.end();
});
tape('test friday with turnaround:100', function(t) {
  t.deepEqual(calculateDueDate('2016-08-26 14:00', 100), 'Wednesday, September 14, 2016 10:00 AM');
  t.end();
});
tape('test friday with turnaround:107', function(t) {
  t.deepEqual(calculateDueDate('2016-08-26 14:00', 107), 'Thursday, September 15, 2016 9:00 AM');
  t.end();
});
tape('test incorrect time, after 17', function(t) {
  t.deepEqual(calculateDueDate('2016-08-26 18:00', 10), 'Date or time is out of working hours');
  t.end();
});
tape('test incorrect time, before 9', function(t) {
  t.deepEqual(calculateDueDate('2016-08-26 8:00', 10), 'Date or time is out of working hours');
  t.end();
});
tape('test incorrect date, weekend', function(t) {
  t.deepEqual(calculateDueDate('2016-08-28 14:00', 10), 'Date or time is out of working hours');
  t.end();
});
