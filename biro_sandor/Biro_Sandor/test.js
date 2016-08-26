'use strict';

var tape = require('tape');
var dueDateCalculator = require('./dueDateCalculator.js');

tape(function(t) {
  t.deepEqual(dueDateCalculator.calculate('2016-08-22 09:00', 0.25), 'August 22, 2016 9:15 AM');
  t.deepEqual(dueDateCalculator.calculate('2016-08-26 14:00', 4), 'August 29, 2016 10:00 AM');
  t.deepEqual(dueDateCalculator.calculate('2016-08-26 11:00', 8), 'August 29, 2016 11:00 AM');
  t.deepEqual(dueDateCalculator.calculate('2016-08-25 09:00', 40), 'September 1, 2016 9:00 AM');
  t.deepEqual(dueDateCalculator.calculate('2016-08-25 10:00', 47), 'September 2, 2016 9:00 AM');
  t.deepEqual(dueDateCalculator.calculate('2016-08-26 11:00', 126), 'September 19, 2016 9:00 AM');
  t.end();
});
