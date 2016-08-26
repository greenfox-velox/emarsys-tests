'use strict';

var calculateDueDate = require('./duedatecalc');
var tape = require('tape');

tape ('due date is on the same day', function (t) {
  t.deepEqual(calculateDueDate.calculateDueDate('2016-08-23 11:00:02', 1), ('2016-08-23 12:00:02'));
  t.end();
});

tape ('turnaround time is exactly one working day', function (t) {
  t.deepEqual(calculateDueDate.calculateDueDate('2016-08-23 11:00:02', 8), ('2016-08-24 11:00:02'));
  t.end();
});

tape ('due date should not be after 17pm', function (t) {
  t.deepEqual(calculateDueDate.calculateDueDate('2016-08-23 16:00:02', 2), ('2016-08-24 10:00:02'));
  t.end();
});

tape ('due date should not fall on a saturday', function (t) {
  t.deepEqual(calculateDueDate.calculateDueDate('2016-08-26 16:00:02', 1), ('2016-08-29 09:00:02'));
  t.end();
});

tape ('due date should not fall on a sunday', function (t) {
  t.deepEqual(calculateDueDate.calculateDueDate('2016-08-26 16:00:02', 16), ('2016-08-30 16:00:02'));
  t.end();
});

tape ('turnaround time is more than a week', function (t) {
  t.deepEqual(calculateDueDate.calculateDueDate("2016-08-16 11:00:02", 89), ('2016-08-31 12:00:02'));
  t.end();
});
