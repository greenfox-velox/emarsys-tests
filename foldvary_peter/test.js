const dueDatecalculator = require('./due_date_calculator').calculateDueDate;
const turnaroundTimeConverter = require('./due_date_calculator').convertTurnaroundTime;
const assert = require('assert');

describe('Test dueDatecalculator with different inputs', function() {
  it('return if called', function(done) {
    assert(dueDatecalculator());
    done();
  });

  it('Simple case: submitDate + turnaroundTime (3h) stay in the same day. Return with the correct time of resolve', function(done) {
    const expected = '2016-08-25T15:03:58+02:00';
    const actual = dueDatecalculator('2016-08-25T12:03:58+02:00', 3);
    assert.equal(actual, expected);
    done();
  });

  it('Normal case: submitDate + turnaroundTime (2d 3h) stay in the same week. Return with the correct time of resolve', function(done) {
    const expected = '2016-08-24T15:03:58+02:00';
    const actual = dueDatecalculator('2016-08-22T12:03:58+02:00', 19);
    assert.equal(actual, expected);
    done();
  });

  it('Normal one weekend case: submitDate (friday) + turnaroundTime (2d 3h) stay in the same week. Return with the correct time of resolve', function(done) {
    const expected = '2016-08-23T15:03:58+02:00';
    const actual = dueDatecalculator('2016-08-19T12:03:58+02:00', 19);
    assert.equal(actual, expected);
    done();
  });

  it('Normal n weekend case: submitDate + turnaroundTime (15d) turn to another week. Return with the correct time of resolve', function(done) {
    const expected = '2016-08-24T15:03:58+02:00';
    const actual = dueDatecalculator('2016-08-03T15:03:58+02:00', 120);
    assert.equal(actual, expected);
    done();
  });

  it('Normal n weekend case end after 17:00: submitDate + turnaroundTime (15d + 3h) turn to next day morning. Return with the correct time of resolve', function(done) {
    const expected = '2016-08-25T10:03:58+02:00';
    const actual = dueDatecalculator('2016-08-03T15:03:58+02:00', 123);
    assert.equal(actual, expected);
    done();
  });
});

describe('Test dueDatecalculator error handling with different inputs', function() {
  it('return with error message if called without date', function(done) {
    const expected = {status: 'error', error: 'Input date is false'};
    assert.deepEqual(dueDatecalculator(), expected);
    done();
  });

  it('return with input date if called falsy turnaroundTime', function(done) {
    const expected = '2016-08-25T14:03:58+02:00';
    const actual = dueDatecalculator(expected, 0);
    assert.equal(actual, expected);
    done();
  });

  it('return error if submitDate is invalid format (18. month)', function(done) {
    const actual = dueDatecalculator('2016-18-25T14:03:58+02:00', 0);
    const expected = {status: 'error', error: 'Submit date is invalid'};
    assert.deepEqual(actual, expected);
    done();
  });

  it('return error if submitDate is in the future', function(done) {
    const actual = dueDatecalculator('2116-08-25T14:03:58+02:00', 0);
    const expected = {status: 'error', error: 'Submit date is in future'};
    assert.deepEqual(actual, expected);
    done();
  });

  it('return error if turnaroundTime is negative', function(done) {
    const actual = dueDatecalculator('2016-08-25T14:03:58+02:00', -1);
    const expected = {status: 'error', error: 'TurnaroundTime is negative'};
    assert.deepEqual(actual, expected);
    done();
  });

  it('return error if submit time (20:03) is out of boundaries (9AM to 5PM)', function(done) {
    const actual = dueDatecalculator('2016-08-24T20:03:58+02:00', 1);
    const expected = {status: 'error', error: 'Submit time is out of boundaries (9AM to 5PM)'};
    assert.deepEqual(actual, expected);
    done();
  });

  it('return error if submit day (sunday) is not workday (Monday through Friday)', function(done) {
    const actual = dueDatecalculator('2016-08-21T14:03:58+02:00', 1);
    const expected = {status: 'error', error: 'Submit day is not workday (Monday through Friday)'};
    assert.deepEqual(actual, expected);
    done();
  });
});

describe('Test turnaroundTimeConverter with different inputs', function() {
  it('calculate correctly how many days and hours (8h/d) is the turnaroundTime (3h)', function(done) {
    const actual = turnaroundTimeConverter(3);
    const expected = {turnaroundDays: 0, turnaroundHours: 3};
    assert.deepEqual(actual, expected);
    done();
  });

  it('calculate correctly how many days and hours (8h/d) is the turnaroundTime (19h)', function(done) {
    const actual = turnaroundTimeConverter(19);
    const expected = {turnaroundDays: 2, turnaroundHours: 3};
    assert.deepEqual(actual, expected);
    done();
  });

  it('calculate correctly how many days and hours (8h/d) is the turnaroundTime (19h 30m)', function(done) {
    const actual = turnaroundTimeConverter(19.5);
    const expected = {turnaroundDays: 2, turnaroundHours: 3.5};
    assert.deepEqual(actual, expected);
    done();
  });
});
