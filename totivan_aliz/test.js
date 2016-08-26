'use strict';

var tape = require('tape');
var dueDateCalculator = require('./dueDateCalculator');

tape('it should give back the same date if the turnaround time is zero', function(t) {
  t.deepEqual(dueDateCalculator.dueDateCalculator('2016/02/02 13:33:00', 0), '2016/02/02 13:33:00');
  t.end();
});

tape('due date is in the same day', function(t) {
  t.deepEqual(dueDateCalculator.dueDateCalculator('2016/02/02 13:33:00', 1), '2016/02/02 14:33:00');
  t.end();
});

tape('due date fits exactly in one working day', function(t) {
  t.deepEqual(dueDateCalculator.dueDateCalculator('2016/02/02 09:00:00', 8), '2016/02/02 17:00:00');
  t.end();
});

tape('due date overflows to the next day', function(t) {
  t.deepEqual(dueDateCalculator.dueDateCalculator('2016/02/02 09:01:00', 8), '2016/02/03 09:01:00');
  t.end();
});

tape('due date overflows to the next week', function(t) {
  t.deepEqual(dueDateCalculator.dueDateCalculator('2016/08/19 09:01:00', 8), '2016/08/22 09:01:00');
  t.end();
});

tape('due date overflows to two weeks', function(t) {
  t.deepEqual(dueDateCalculator.dueDateCalculator('2016/08/19 09:01:00', 48), '2016/08/29 09:01:00');
  t.end();
});

tape('due date overflows to more than a month', function(t) {
  t.deepEqual(dueDateCalculator.dueDateCalculator('2016/08/19 09:01:00', 168), '2016/09/19 09:01:00');
  t.end();
});
