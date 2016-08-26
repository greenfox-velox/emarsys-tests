'use strict';
const dueDate = require('./dueDateCalculator');
const tape = require('tape');

const date1 = new Date('2016.08.25,12:30');
const date2 = new Date('2016.08.25,15:12');
const date3 = new Date('2016.08.25,09:45');
const date4 = new Date('2016.08.26,16:30');

tape('test hours to milliseconds converter', t => {
  t.deepEqual(dueDate.hoursToMilliseconds(1), 3600000);
  t.deepEqual(dueDate.hoursToMilliseconds(5), 18000000);
  t.deepEqual(dueDate.hoursToMilliseconds(11), 39600000);
  t.end();
});

tape('test current time to double value converter', t => {
  t.deepEqual(dueDate.currentTimeDouble(date1), 12.5);
  t.deepEqual(dueDate.currentTimeDouble(date2), 15.2);
  t.deepEqual(dueDate.currentTimeDouble(date3), 9.75);
  t.deepEqual(dueDate.currentTimeDouble(date4), 16.5);
  t.end();
});

tape('test work hours left of current working day', t => {
  t.deepEqual(dueDate.workhoursLeftOfDay(date1), 4);
  t.deepEqual(dueDate.workhoursLeftOfDay(date2), 1);
  t.deepEqual(dueDate.workhoursLeftOfDay(date3), 7);
  t.deepEqual(dueDate.workhoursLeftOfDay(date4), 0);
  t.end();
});

tape('test work hours left of current working week', t => {
  t.deepEqual(dueDate.workhoursLeftOfWeek(date1), 12);
  t.deepEqual(dueDate.workhoursLeftOfWeek(date2), 9);
  t.deepEqual(dueDate.workhoursLeftOfWeek(date3), 15);
  t.deepEqual(dueDate.workhoursLeftOfWeek(date4), 0);
  t.end();
});

tape('test hours to add due to end of day', t => {
  t.deepEqual(dueDate.hoursToAddDueToEndOfDay(date1, 3), 0);
  t.deepEqual(dueDate.hoursToAddDueToEndOfDay(date2, 15), 32);
  t.deepEqual(dueDate.hoursToAddDueToEndOfDay(date3, 54), 96);
  t.deepEqual(dueDate.hoursToAddDueToEndOfDay(date4, 15), 32);
  t.end();
});

tape('test adding sleeptime', t => {
  t.deepEqual(dueDate.addSleepTime(date1, 3), new Date('2016.08.25,15:30'));
  t.deepEqual(dueDate.addSleepTime(date2, 15), new Date('2016.08.27,14:12'));
  t.deepEqual(dueDate.addSleepTime(date3, 70), new Date('2016.09.02,15:45'));
  t.deepEqual(dueDate.addSleepTime(date4, 15), new Date('2016.08.28,15:30'));
  t.end();
});

tape('test hours to add due to end of week', t => {
  t.deepEqual(dueDate.hoursToAddDueToEndOfWeek(date1, 3), 0);
  t.deepEqual(dueDate.hoursToAddDueToEndOfWeek(date2, 15), 48);
  t.deepEqual(dueDate.hoursToAddDueToEndOfWeek(date3, 70), 96);
  t.deepEqual(dueDate.hoursToAddDueToEndOfWeek(date4, 15), 48);
  t.end();
});

tape('test adding weekends', t => {
  const upDate1 = new Date('2016.08.25,15:30');
  const upDate2 = new Date('2016.08.27,14:12');
  const upDate3 = new Date('2016.09.02,15:45');
  const upDate4 = new Date('2016.08.28,15:30');
  t.deepEqual(dueDate.addWeekends(date1, 3, upDate1), new Date('2016.08.25,15:30'));
  t.deepEqual(dueDate.addWeekends(date2, 15, upDate2), new Date('2016.08.29,14:12'));
  t.deepEqual(dueDate.addWeekends(date3, 70, upDate3), new Date('2016.09.06,15:45'));
  t.deepEqual(dueDate.addWeekends(date4, 15, upDate4), new Date('2016.08.30,15:30'));
  t.end();
});

tape('test main function: get due date', t => {
  t.deepEqual(dueDate.getDueDate(date1, 3), new Date('2016.08.25,15:30'));
  t.deepEqual(dueDate.getDueDate(date1, 8), new Date('2016.08.26,12:30'));
  t.deepEqual(dueDate.getDueDate(date1, 12), new Date('2016.08.26,16:30'));
  t.deepEqual(dueDate.getDueDate(date1, 32), new Date('2016.08.31,12:30'));
  t.end();
});
