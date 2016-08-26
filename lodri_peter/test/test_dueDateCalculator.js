'use strict';

const assert = require('chai').assert;
const moment = require('moment');
const dueDateCalc = require('../dueDateCalculator.js');

describe('Due Date Calculator Tests', function() {

  describe('# basic tests', function() {
    it('dueDateCalc imported', function() {
      assert(dueDateCalc);
    });

    describe('# casual cases', function() {
      it('should return "Monday 2:12PM" for a bug reported at "1:12PM Monday" with 1 hour turnaround', function() {
        const test1 = moment({hour: 13, minutes: 12}).day("Monday");
        const dueDate = dueDateCalc.calculateDate(test1, 1);
        assert.equal(moment(dueDate).format('dddd'), "Monday");
        assert.equal(moment(dueDate).day(), 1);
        assert.equal(moment(dueDate).hour(), 14);
        assert.equal(moment(dueDate).minute(), 12);
      });

      it('should return "Monday 2:12PM" for a bug reported at "2:12PM Friday" with 8 hour turnaround', function() {
        const test1 = moment({hour: 14, minutes: 12}).day("Friday");
        const dueDate = dueDateCalc.calculateDate(test1, 8);
        assert.equal(moment(dueDate).format('dddd'), "Monday");
        assert.equal(moment(dueDate).day(), 1);
        assert.equal(moment(dueDate).hour(), 14);
        assert.equal(moment(dueDate).minute(), 12);
        assert.isAbove(moment(test1).day(), moment(dueDate).day())
      });

      it('should return "Thursday 2:12PM" for a bug reported at "2:12PM Tuesday" with 16 hours turnaround', function() {
        const test1 = moment({hour: 14, minutes: 12}).day("Tuesday");
        const dueDate = dueDateCalc.calculateDate(test1, 16);
        assert.equal(moment(dueDate).format('dddd'), "Thursday");
        assert.equal(moment(dueDate).day(), 4);
        assert.equal(moment(dueDate).hour(), 14);
        assert.equal(moment(dueDate).minute(), 12);
      });

      it('should return "Monday 1:00PM" for a bug reported at "Monday 9:00AM" with 4 hours turnaround', function() {
        const test1 = moment({hour: 9, minutes: 0}).day("Monday");
        const dueDate = dueDateCalc.calculateDate(test1, 4);
        assert.equal(moment(dueDate).format('dddd'), "Monday");
        assert.equal(moment(dueDate).day(), 1);
        assert.equal(moment(dueDate).hour(), 13);
        assert.equal(moment(dueDate).minute(), 0);
      });

      it('should return "Wednesday 10:00AM" for a bug reported at "Friday 2:00PM" with 20 hours turnaround', function() {
        const test1 = moment({hour: 14, minutes: 0}).day("Friday");
        const dueDate = dueDateCalc.calculateDate(test1, 20);
        assert.equal(moment(dueDate).format('dddd'), "Wednesday");
        assert.equal(moment(dueDate).day(), 3);
        assert.equal(moment(dueDate).hour(), 10);
        assert.equal(moment(dueDate).minute(), 0);
      });

      it('should return "Tuesday 13:00PM" for a bug reported at "Wednesday 9:00AM" with 36 hours turnaround', function() {
        const test1 = moment({hour: 9, minutes: 0}).day("Wednesday");
        const dueDate = dueDateCalc.calculateDate(test1, 36);
        assert.equal(moment(dueDate).format('dddd'), "Tuesday");
        assert.equal(moment(dueDate).day(), 2);
        assert.equal(moment(dueDate).hour(), 13);
        assert.equal(moment(dueDate).minute(), 0);
      });

      it('should return " next week Wednesday 9:01AM" for a bug reported at "Wednesday 9:01AM" with 40 hours turnaround', function() {
        const test1 = moment({hour: 9, minutes: 1}).day("Wednesday");
        const dueDate = dueDateCalc.calculateDate(test1, 40);
        assert.equal(moment(dueDate).format('dddd'), "Wednesday");
        assert.equal(moment(dueDate).day(), 3);
        assert.equal(moment(dueDate).hour(), 9);
        assert.equal(moment(dueDate).minute(), 1);
        assert.isAbove(moment(dueDate).date(), moment(test1).date())
      });

      it('should return " next week Wednesday 9:00AM" for a bug reported at "Wednesday 9:00AM" with 40 hours turnaround', function() {
        const test1 = moment({hour: 9, minutes: 0}).day("Wednesday");
        const dueDate = dueDateCalc.calculateDate(test1, 40);
        assert.equal(moment(dueDate).format('dddd'), "Wednesday");
        assert.equal(moment(dueDate).day(), 3);
        assert.equal(moment(dueDate).hour(), 9);
        assert.equal(moment(dueDate).minute(), 0);
        assert.isAbove(moment(dueDate).date(), moment(test1).date())
      });

    });
  });

  describe('# Working rules: Tuesday to Friday, 6 hours a day, starting from 10AM', function() {
    before(function() {
      // setup for special working conditions
      const test1_setUp = {START_DAY: 'Tuesday',
                            WORKING_DAYS: 4,
                            WORKING_HOURS: 6,
                            START_HOUR: 10,
                            WEEKEND: ['Saturday', 'Sunday', 'Monday']}
      dueDateCalc.setUp(test1_setUp);
    });

    it('should have properties as described in the specification', function() {
      assert.equal(dueDateCalc.getConfig().WORKING_DAYS, 4);
      assert.equal(dueDateCalc.getConfig().START_DAY, 'Tuesday');
      assert.equal(dueDateCalc.getConfig().END_DAY, 'Friday');
      assert.equal(dueDateCalc.getConfig().WORKING_HOURS, 6);
      assert.equal(dueDateCalc.getConfig().START_HOUR, 10);
      assert.deepEqual(dueDateCalc.getConfig().WEEKEND, ['Saturday', 'Sunday', 'Monday']);
    });

    it('should return "Wednesday 10:00AM" for a bug reported at "Friday 10:00AM" with 12 hours turnaround', function() {
      const test1 = moment({hour: 10, minutes: 0}).day("Friday");
      const dueDate = dueDateCalc.calculateDate(test1, 12);
      assert.equal(moment(dueDate).format('dddd'), "Wednesday");
      assert.equal(moment(dueDate).day(), 3);
      assert.equal(moment(dueDate).hour(), 10);
      assert.equal(moment(dueDate).minute(), 0);
    });

    it('should return "next next Tuesday 16:00PM" for a bug reported at "Thursday 14:00AM" with 32 hours turnaround', function() {
      const test1 = moment({hour: 14, minutes: 0}).day("Thursday");
      const dueDate = dueDateCalc.calculateDate(test1, 32);
      assert.equal(moment(dueDate).format('dddd'), "Tuesday");
      assert.equal(moment(dueDate).day(), 2);
      assert.equal(moment(dueDate).hour(), 10);
      assert.equal(moment(dueDate).minute(), 0);
      assert.isAbove(moment(dueDate).format('M'), moment(test1).format('M'))
    });

    it('should return "Wednesday 11:00AM" for a bug reported at "Friday 12:00AM" with 11 hours turnaround', function() {
      const test1 = moment({hour: 12, minutes: 0}).day("Friday");
      const dueDate = dueDateCalc.calculateDate(test1, 11);
      assert.equal(moment(dueDate).format('dddd'), "Wednesday");
      assert.equal(moment(dueDate).day(), 3);
      assert.equal(moment(dueDate).hour(), 11);
      assert.equal(moment(dueDate).minute(), 0);
      assert.isAbove(moment(dueDate).date(), moment(test1).date())
    });

  });

  describe('# Working rules: Monday to Wednesday, 12 hours a day, starting from 8AM', function() {
    before(function() {
      // setup for special working conditions
      const test2_setUp = {START_DAY: 'Monday',
                            END_DAY: 'Wednesday',
                            WORKING_DAYS: 3,
                            WORKING_HOURS: 12,
                            START_HOUR: 8,
                            WEEKEND: ['Thursday','Friday','Saturday', 'Sunday']}
      dueDateCalc.setUp(test2_setUp);
    });

    it('should have properties as described in the specification', function() {
      assert.equal(dueDateCalc.getConfig().WORKING_DAYS, 3);
      assert.equal(dueDateCalc.getConfig().START_DAY, 'Monday');
      assert.equal(dueDateCalc.getConfig().END_DAY, 'Wednesday');
      assert.equal(dueDateCalc.getConfig().WORKING_HOURS, 12);
      assert.equal(dueDateCalc.getConfig().START_HOUR, 8);
      assert.deepEqual(dueDateCalc.getConfig().WEEKEND, ['Thursday','Friday','Saturday', 'Sunday']);
    });

    it('should return "Monday 10:00AM" for a bug reported at "Wednesday 12:00AM" with 10hours turnaround', function() {
      const test1 = moment({hour: 12, minutes: 0}).day("Wednesday");
      const dueDate = dueDateCalc.calculateDate(test1, 10);
      assert.equal(moment(dueDate).format('dddd'), "Monday");
      assert.equal(moment(dueDate).day(), 1);
      assert.equal(moment(dueDate).hour(), 10);
      assert.equal(moment(dueDate).minute(), 0);
      assert.isAbove(moment(dueDate).date(), moment(test1).date())
    });

    it('should return "Wednesday 10:00AM" for a bug reported at "Tuesday 8:00AM" with 14hours turnaround', function() {
      const test1 = moment({hour: 8, minutes: 0}).day("Tuesday");
      const dueDate = dueDateCalc.calculateDate(test1, 14);
      assert.equal(moment(dueDate).format('dddd'), "Wednesday");
      assert.equal(moment(dueDate).day(), 3);
      assert.equal(moment(dueDate).hour(), 10);
      assert.equal(moment(dueDate).minute(), 0);
      assert.isAbove(moment(dueDate).date(), moment(test1).date())
    });


  });
  describe('# Working rules: Wednesday to Sunday, 5 hours a day, starting from 9AM', function() {
    before(function() {
      // setup for special working conditions
      const test3_setUp = {START_DAY: 'Wednesday',
                            END_DAY: 'Sunday',
                            WORKING_DAYS: 5,
                            WORKING_HOURS: 5,
                            START_HOUR: 9,
                            WEEKEND: ['Monday','Tuesday']}
      dueDateCalc.setUp(test3_setUp);
    });

    it('should have properties as described in the specification', function() {
      assert.equal(dueDateCalc.getConfig().WORKING_DAYS, 5);
      assert.equal(dueDateCalc.getConfig().START_DAY, 'Wednesday');
      assert.equal(dueDateCalc.getConfig().END_DAY, 'Sunday');
      assert.equal(dueDateCalc.getConfig().WORKING_HOURS, 5);
      assert.equal(dueDateCalc.getConfig().START_HOUR, 9);
      assert.deepEqual(dueDateCalc.getConfig().WEEKEND, ['Monday','Tuesday']);
    });

    it('should return "Wednesday 9:25AM" for a bug reported at "Friday 10:25AM" with 14hours turnaround', function() {
      const test1 = moment({hour: 10, minutes: 25}).day("Friday");
      const dueDate = dueDateCalc.calculateDate(test1, 14);
      assert.equal(moment(dueDate).format('dddd'), "Wednesday");
      assert.equal(moment(dueDate).day(), 3);
      assert.equal(moment(dueDate).hour(), 9);
      assert.equal(moment(dueDate).minute(), 25);
      assert.isAbove(moment(dueDate).date(), moment(test1).date())
    });

    it('should return "Saturday 13:25AM" for a bug reported at "Saturday 9:25AM" with 4hours turnaround', function() {
      const test1 = moment({hour: 9, minutes: 25}).day("Saturday");
      const dueDate = dueDateCalc.calculateDate(test1, 4);
      assert.equal(moment(dueDate).format('dddd'), "Saturday");
      assert.equal(moment(dueDate).day(), 6);
      assert.equal(moment(dueDate).hour(), 13);
      assert.equal(moment(dueDate).minute(), 25);
      assert.equal(moment(dueDate).date(), moment(test1).date())
    });


  });

  describe('# Test with new Date()', function() {
    before(function() {
      // setup for special working conditions
      const test4_setUp = {START_DAY: 'Monday',
                            WORKING_DAYS: 5,
                            WORKING_HOURS: 8,
                            START_HOUR: 9,
                            WEEKEND: ['Saturday', 'Sunday']}
      dueDateCalc.setUp(test4_setUp);
    });

    it('should return "Monday 10:00AM" for a bug reported at "Thursday 10:00AM" with 16hours turnaround', function() {
      let test_date = new Date();
      test_date.setDate(25);
      test_date.setHours(10);
      test_date.setMinutes(0);

      const dueDate = dueDateCalc.calculateDate(test_date, 16);
      assert.equal(moment(dueDate).format('dddd'), "Monday");
      assert.equal(moment(dueDate).day(), 1);
      assert.equal(moment(dueDate).hour(), 10);
      assert.equal(moment(dueDate).minute(), 0);
      assert.isAbove(moment(dueDate).date(), moment(test_date).date())
    });


  });

});
