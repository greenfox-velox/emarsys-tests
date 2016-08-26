'use strict';

var tape = require('tape');
var ticketTimeCalculator = require('./duedatecalculator');

tape('submit date at 9 AM', (t) => {
  t.equal(ticketTimeCalculator().calculateDueDate('2016-08-26 09:00', '1'), 'Fri, Aug 26, 2016 10:00 AM');
  t.end();
});

tape('submit date at 5 PM', (t) => {
  t.equal(ticketTimeCalculator().calculateDueDate('2016-09-26 17:00', '1'), 'Issue can be created in working hours');
  t.end();
});

tape('due date expected same day as submit date', (t) => {
  t.equal(ticketTimeCalculator().calculateDueDate('2016-11-29 09:15', '5'), 'Tue, Nov 29, 2016 2:15 PM');
  t.end();
});

tape('due date expected over the submit date', (t) => {
  t.equal(ticketTimeCalculator().calculateDueDate('2016-11-29 09:15', '9'), 'Wed, Nov 30, 2016 10:15 AM');
  t.end();
});

tape('due date expected on friday', (t) => {
  t.equal(ticketTimeCalculator().calculateDueDate('2016-12-01 11:15', '11'), 'Fri, Dec 2, 2016 2:15 PM');
  t.end();
});

tape('due date expected over the weekend from thursday', (t) => {
  t.equal(ticketTimeCalculator().calculateDueDate('2016-12-01 11:15', '14'), 'Mon, Dec 5, 2016 9:15 AM');
  t.end();
});

tape('due date expected over the weekend from friday', (t) => {
  t.equal(ticketTimeCalculator().calculateDueDate('2017-02-10 11:15', '10'), 'Mon, Feb 13, 2017 1:15 PM');
  t.end();
});

tape('due date expected in the next month', (t) => {
  t.equal(ticketTimeCalculator().calculateDueDate('2017-01-31 11:15', '10'), 'Wed, Feb 1, 2017 1:15 PM');
  t.end();
});

tape('due date expected on leap day', (t) => {
  t.equal(ticketTimeCalculator().calculateDueDate('2024-02-28 11:15', '10'), 'Thu, Feb 29, 2024 1:15 PM');
  t.end();
});

tape('turnaround time is not a number', (t) => {
  t.equal(ticketTimeCalculator().calculateDueDate('2016-08-24 11:15', 'd'), 'Invalid date or turnaround time');
  t.end();
});

tape('turnaround time is a float', (t) => {
  t.equal(ticketTimeCalculator().calculateDueDate('2016-08-24 11:15', '0.5'), 'Invalid date or turnaround time');
  t.end();
});

tape('turnaround time is nothing', (t) => {
  t.equal(ticketTimeCalculator().calculateDueDate('2016-08-24 11:15', ''), 'Invalid date or turnaround time');
  t.end();
});

tape('submit date is sunday', (t) => {
  t.equal(ticketTimeCalculator().calculateDueDate('2016-08-28 11:15', '4'), 'Issue can be created in working hours');
  t.end();
});

tape('submit date is saturday', (t) => {
  t.equal(ticketTimeCalculator().calculateDueDate('2016-08-27 12:15', '42'), 'Issue can be created in working hours');
  t.end();
});

tape('due date expected over the year', (t) => {
  t.equal(ticketTimeCalculator().calculateDueDate('2016-08-24 11:15', '896'), 'Fri, Jan 27, 2017 10:15 AM');
  t.end();
});

tape('invalid submit date', (t) => {
  t.equal(ticketTimeCalculator().calculateDueDate('2016-8-24 11:15', '85'), 'Invalid date or turnaround time');
  t.end();
});

tape('submi date is not a string', (t) => {
  t.equal(ticketTimeCalculator().calculateDueDate({}, '896'), 'Invalid date or turnaround time');
  t.end();
});
