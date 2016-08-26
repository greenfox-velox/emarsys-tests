var duedatecalculator = require('../duedatecalc');
var moment = require('moment-business-days');

var assert = require('chai').assert;

describe('dueDateCalculator tests', function() {
  var trialLong = 1472220900000;

  it('should add correct amount of hours', function() {
    var trialShortHours = 1472026500000;
    var hoursShort = 1472033700000;
    assert.equal(duedatecalculator.addHours(trialShortHours, 2), hoursShort);
  });

});
