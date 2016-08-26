'use strict';

var test = require('tape');
var calc = require('./calculateDueDate');
var calculate = calc.calculateDueDate;


test('1 - The submit is on Thursday, right on work start, less than a day turnaround', function (t) {
  t.deepLooseEqual(calculate('2016-08-18 09:00:00', 6), 'Thu, 2016-08-18 15:00:00');
  t.end();
});

test('2 - The submit is on Thursday, right on work start, one day turnaround', function (t) {
  t.deepLooseEqual(calculate('2016-08-18 09:00:00', 8), 'Fri, 2016-08-19 09:00:00');
  t.end();
});

test('3 - The submit is on Thursday, differenet from work start, less than a day turnaround, but due time is still in working hours', function (t) {
  t.deepLooseEqual(calculate('2016-08-18 14:00:00', 2), 'Thu, 2016-08-18 16:00:00');
  t.end();
});

test('4 - The submit is on Thursday, differenet from work start, less than a day turnaround, but due time is outside working hours', function (t) {
  t.deepLooseEqual(calculate('2016-08-18 14:00:00', 4), 'Fri, 2016-08-19 10:00:00');
  t.end();
});

test('5 - The submit is on Thursday, differenet from work start, more than a day turnaround, but due time is still in working hours', function (t) {
  t.deepLooseEqual(calculate('2016-08-18 14:00:00', 9), 'Fri, 2016-08-19 15:00:00');
  t.end();
});

test('6 - The submit is on Thursday, differenet from work start, more than a day turnaround, but due time is outside working hours', function (t) {
  t.deepLooseEqual(calculate('2016-08-18 14:00:00', 12), 'Mon, 2016-08-22 10:00:00');
  t.end();
});

test('7 - The submit is on Thursday, turnaround is whole week, due time is in working hours', function (t) {
  t.deepLooseEqual(calculate('2016-08-18 14:00:00', 40), 'Thu, 2016-08-25 14:00:00');
  t.end();
});

test('8 - The submit is on Thursday, turnaround is more than a week, due time is in working hours', function (t) {
  t.deepLooseEqual(calculate('2016-08-18 14:00:00', 48), 'Fri, 2016-08-26 14:00:00');
  t.end();
});

test('9 - The submit is on Monday, turnaround is more than 2 weeks with remaining days, the remaining days DOES NOT loop through a weekend, due time is outside working hours', function (t) {
  t.deepLooseEqual(calculate('2016-08-15 14:00:00', 100), 'Thu, 2016-09-01 10:00:00');
  t.end();
});

test('10 - The submit is on Tuesday, turnaround is more than 2 weeks with remaining days, the remaining days loop through a weekend, due time is outside working hours', function (t) {
  t.deepLooseEqual(calculate('2016-08-17 14:00:00', 100), 'Mon, 2016-09-05 10:00:00');
  t.end();
});

test('11 - The submit is on Thursday, turnaround is more than a week with remaining days, the remaining days loop through a weekend, due time is in working hours', function (t) {
  t.deepLooseEqual(calculate('2016-08-18 14:00:00', 56), 'Mon, 2016-08-29 14:00:00');
  t.end();
});

test('12 - The submit is on Thursday, turnaround is more than 2 weeks with remaining days, the remaining days loop through a weekend, due time is in working hours', function (t) {
  t.deepLooseEqual(calculate('2016-08-18 14:00:00', 96), 'Mon, 2016-09-05 14:00:00');
  t.end();
});

test('13 - The submit is on Thursday, turnaround is more than 2 weeks with remaining days, the remaining days loop through a weekend, due time is outside working hours', function (t) {
  t.deepLooseEqual(calculate('2016-08-18 14:00:00', 100), 'Tue, 2016-09-06 10:00:00');
  t.end();
});

test('14 - The submit is on Friday, turnaround is more than a day, falls on weekend, outside working hours', function (t) {
  t.deepLooseEqual(calculate('2016-08-19 14:00:00', 12), 'Tue, 2016-08-23 10:00:00');
  t.end();
});

test('15 - The submit is on last Friday of February, turnaround is more than a week, falls on weekend, outside working hours', function (t) {
  t.deepLooseEqual(calculate('2016-02-26 14:00:00', 44), 'Mon, 2016-03-07 10:00:00');
  t.end();
});

test('16 - The submit is on last Friday of February, turnaround is more than a week, loops trough weekend, outside working hours', function (t) {
  t.deepLooseEqual(calculate('2016-02-26 14:00:00', 60), 'Wed, 2016-03-09 10:00:00');
  t.end();
});

test('16 - The submit is on last Friday of February, turnaround is not integer, loops trough weekend, outside working hours', function (t) {
  t.deepLooseEqual(calculate('2016-03-09 09:00:00', 4.5), 'Wed, 2016-03-09 13:30:00');
  t.end();
});
