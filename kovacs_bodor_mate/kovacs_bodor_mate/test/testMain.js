'use strict';
const moment = require('moment');

const test = require('tape');

const dueDateGenerator = require('../calculateDueDate');

const myGenerator = dueDateGenerator();

test('Five hour change', function (t) {
  t.deepEqual(myGenerator.dueDateCalculator('2016-03-25T09:29:00', 5), ('2016-03-25T14:29:00'));
  t.end();
});

test('Four hour change, with day change', function (t) {
  t.deepEqual(myGenerator.dueDateCalculator('2016-03-24T12:29:00', 5), ('2016-03-25T09:29:00'));
  t.end();
});

test('Five hour change with weekend', function (t) {
  t.deepEqual(myGenerator.dueDateCalculator('2016-03-25T12:00:00', 5), ('2016-03-28T09:00:00'));
  t.end();
});

test('three day move with weekend and hour change', function (t) {
  t.deepEqual(myGenerator.dueDateCalculator('2016-03-25T15:00:00', 25), ('2016-03-30T16:00:00'));
  t.end();
});

test('one day move', function (t) {
  t.deepEqual(myGenerator.dueDateCalculator('2016-08-23T15:00:00', 8), ('2016-08-24T15:00:00'));
  t.end();
});

test('two day move with weekends', function (t) {
  t.deepEqual(myGenerator.dueDateCalculator('2016-08-25T15:00:00', 16), ('2016-08-29T15:00:00'));
  t.end();
});

test('three day move with weekend', function (t) {
  t.deepEqual(myGenerator.dueDateCalculator('2016-08-25T15:00:00', 24), ('2016-08-30T15:00:00'));
  t.end();
});

test('3 weeks move with hours move', function (t) {
  t.deepEqual(myGenerator.dueDateCalculator('2016-08-26T14:05:00', 107), ('2016-09-15T09:05:00'));
  t.end();
});

test('Validation working', function (t) {
  t.deepEqual(myGenerator.dueDateCalculator('2016-08-26T17:05:00', 3), ('Input date time out of working hours!'));
  t.end();
});
