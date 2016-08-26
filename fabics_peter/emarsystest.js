'use strict';

var tape = require('tape');
var CalculateDueDate = require('./emarsys.js');


tape('Test #1: Basic friday +1 hour', function(t){
  var InputDate = 'August 26, 2016 09:00:00'
  var actual = CalculateDueDate.CalculateDueDate(InputDate, 1)
  var expected = new Date('Aug 26 2016 10:00:00 GMT+0200 (CEST)')
  t.deepEqual(actual, expected);
  t.end();
});

tape('Test #2: Basic friday +1 hour', function(t){
  var InputDate = 'August 23, 2016 14:12:00'
  var actual = CalculateDueDate.CalculateDueDate(InputDate, 16)
  var expected = new Date('Aug 25 2016 14:12:00 GMT+0200 (CEST)')
  t.deepEqual(actual, expected);
  t.end();
});

tape('Test #3: Checking if its turns to the next day', function(t){
  var InputDate = 'August 26, 2016 16:59:00'
  var actual = CalculateDueDate.CalculateDueDate(InputDate, 1)
  var expected = new Date('Mon Aug 29 2016 9:59:00 GMT+0200 (CEST)')
  t.deepEqual(actual, expected);
  t.end();
});

tape('Test #4: It should not stops at 17:00', function(t){
  var InputDate = 'August 26, 2016 16:00:00'
  var actual = CalculateDueDate.CalculateDueDate(InputDate, 1)
  var expected = new Date('Aug 29 2016 9:00:00 GMT+0200 (CEST)')
  t.deepEqual(actual, expected);
  t.end();
});

tape('Test #5: Its calculating with weekend', function(t){
  var InputDate = '2016-08-26 16:59:00'
  var actual = CalculateDueDate.CalculateDueDate(InputDate, 1)
  var expected = new Date('Mon Aug 29 2016 09:59:00 GMT+0200 (CEST)')
  t.deepEqual(actual, expected);
  t.end();
});

tape('Test #6:Also with weekend', function(t){
  var InputDate = '2016-08-26 16:20:00'
  var actual = CalculateDueDate.CalculateDueDate(InputDate, 1)
  var expected = new Date('Mon Aug 29 2016 09:20:00 GMT+0200 (CEST)')
  t.deepEqual(actual, expected);
  t.end();
});

tape('Test #7: Testing weekend with higher number', function(t){
  var InputDate = '2016-08-26 16:20:00'
  var actual = CalculateDueDate.CalculateDueDate(InputDate, 5)
  var expected = new Date('Mon Aug 29 2016 13:20:00 GMT+0200 (CEST)')
  t.deepEqual(actual, expected);
  t.end();
});

tape('Test #8: Weekend plus 1 day', function(t){
  var InputDate = '2016-08-26 16:20:00'
  var actual = CalculateDueDate.CalculateDueDate(InputDate, 9)
  var expected = new Date('Mon Aug 30 2016 09:20:00 GMT+0200 (CEST)')
  t.deepEqual(actual, expected);
  t.end();
});
tape('Test #9: Testing 2 week', function(t){
  var InputDate = '2016-08-26 14:00:00'
  var actual = CalculateDueDate.CalculateDueDate(InputDate, 107)
  var expected = new Date('Mon Sep 15 2016 09:00:00 GMT+0200 (CEST)')
  t.deepEqual(actual, expected);
  t.end();
});
