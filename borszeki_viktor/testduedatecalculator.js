'use strict';

var test = require('tape');
const calculateDueDate = require('./duedatecalculator')

test('test beginning of week', function(t){
 const submitDate = "August 1, 2016 10:0:00"
 const actual = calculateDueDate.calculateDueDate(submitDate, 10)
 const expected = new Date('Aug 2 2016 12:00:00 GMT+0200')
 t.deepEqual(actual, expected);
 t.end();
});

test('test end of week', function(t){
 const submitDate = "August 12, 2016 16:00:00"
 const actual = calculateDueDate.calculateDueDate(submitDate, 2)
 const expected = new Date('Aug 15 2016 10:00:00 GMT+0200')
 t.deepEqual(actual, expected);
 t.end();
});

test('test with minutes', function(t){
 const submitDate = "August 17, 2016 09:42:00"
 const actual = calculateDueDate.calculateDueDate(submitDate, 4)
 const expected = new Date('Aug 17 2016 13:42:00 GMT+0200')
 t.deepEqual(actual, expected);
 t.end();
});

test('test with more than a week', function(t){
 const submitDate = "August 16, 2016 12:00:00"
 const actual = calculateDueDate.calculateDueDate(submitDate, 42)
 const expected = new Date('Aug 23 2016 14:00:00 GMT+0200')
 t.deepEqual(actual, expected);
 t.end();
});
