var test = require('tape');
var main = require('./duedate.js');

var inputDate = main.inputDate;

var testDateInput = new Date();
var testDateOutput = new Date();

test('calculateDueDate returns an object', function(t){
  var turnaroundTime = 8;
  testDateInput.setDate(15);
  t.equal(typeof main.calculateDueDate(testDateInput, turnaroundTime), 'object');
  t.equal(typeof main.calculateDueDate(inputDate, turnaroundTime), 'object');
  t.end();
});

test('calculateDueDate returns the following day and proper time if turnaroundTime is 8', function(t){
  var turnaroundTime = 8;
  testDateInput.setDate(15);
  testDateInput.setHours(9);
  testDateOutput.setDate(16);
  testDateOutput.setHours(9);
  t.deepEqual(main.calculateDueDate(testDateInput, turnaroundTime), testDateOutput);
  t.end();
});

test('calculateDueDate returns the same day and proper time if sum of turnaroundTime and inputHours is less than 17', function(t){
  var turnaroundTime = 7;
  testDateInput.setDate(15);
  testDateInput.setHours(9);
  testDateOutput.setDate(15)
  testDateOutput.setHours(16);
  t.deepEqual(main.calculateDueDate(testDateInput, turnaroundTime), testDateOutput);
  t.end();
});

test('calculateDueDate returns the proper day and proper time if sum of turnaroundTime and inputHours is more than 17', function(t){
  var turnaroundTime = 8;
  testDateInput.setDate(15);
  testDateInput.setHours(12);
  testDateOutput.setDate(16)
  testDateOutput.setHours(12);
  t.deepEqual(main.calculateDueDate(testDateInput, turnaroundTime), testDateOutput);
  t.end();
});

test('calculateDueDate skips weekend days', function(t){
  var turnaroundTime = 8;
  testDateInput.setDate(19);
  testDateInput.setHours(9);
  testDateOutput.setDate(22)
  testDateOutput.setHours(9);
  t.deepEqual(main.calculateDueDate(testDateInput, turnaroundTime), testDateOutput);
  t.end();
});

test('calculateDueDate skips weekend days through more weeks', function(t){
  var turnaroundTime = 56;
  testDateInput.setDate(15);
  testDateInput.setHours(9);
  testDateOutput.setDate(24)
  testDateOutput.setHours(9);
  t.deepEqual(main.calculateDueDate(testDateInput, turnaroundTime), testDateOutput);
  t.end();
});
