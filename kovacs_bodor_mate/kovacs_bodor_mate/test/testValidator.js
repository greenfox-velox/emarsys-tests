'use strict';

const test = require('tape');

const dueDateGenerator = require('../calculateDueDate');

const myGenerator = dueDateGenerator();

const wrongDate = ['2013-09-08', 'nvdsmvdsv', 748923, '2015-03-25T15:00:00.000Z', '12/21/2013' ];

const wrongTimeInput = [ 34.56, '2013-09-08', 'dcqrbe', -9, '6'];

test('correct date input value', function (t) {
  t.true(myGenerator.isValid('2015-03-25T15:00:00'));
  t.end();
});

wrongDate.forEach(function(e, i) {
  test('incorrect date input value' + i, function (t) {
    t.deepEqual(myGenerator.isValid(e, 1), ('Wrong input date format! Accepted format: YYYY-MM-DDTHH:mm:ss'));
    t.end();
  });
});

test('turnAroundTime correct input value', function (t) {
  t.true(myGenerator.isValid('2015-03-25T15:00:00', 2));
  t.end();
});

test('incorrect intervallum with correct turnaround 1', function (t) {
  t.deepEqual(myGenerator.isValid('2015-03-25T05:00:00', 1), ('Input date time out of working hours!'));
  t.end();
});

test('incorrect intervallum with correct turnaround 2', function (t) {
  t.deepEqual(myGenerator.isValid('2015-03-25T17:00:00', 1), ('Input date time out of working hours!'));
  t.end();
});

test('incorrect intervallum weekend with correct turnaround 3', function (t) {
  t.deepEqual(myGenerator.isValid('2016-03-26T16:00:00', 1), ('Input date time out of working hours!'));
  t.end();
});

wrongTimeInput.forEach(function(e, i) {
  test('turnAroundTime with incorrect input value' + i, function (t) {
    t.deepEqual(myGenerator.isValid('2015-03-25T15:00:00', e), ('Wrong turnaround time type!'));
    t.end();
  });
});
