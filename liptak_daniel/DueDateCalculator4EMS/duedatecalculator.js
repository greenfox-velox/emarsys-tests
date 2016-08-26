'use strict';

const ticketTimeCalculator = () => {
  const moment = require('moment');

  const checkIssueInput = (timeOfIssue) => {
    if ((timeOfIssue.hours() < 9 || timeOfIssue.hours() >= 17) || timeOfIssue.day() === 0 || timeOfIssue.day() === 6) {
      return 'Issue can be created in working hours';
    }
  };

  const getDueDate = (now, turnaroundTime) => {
    for (let hour = 0; hour < turnaroundTime; hour++) {
      if (now.day() === 5 && now.hours() === 16) {
        now.add(65, 'hour');
      } else if (now.hours() === 16) {
        now.add(17, 'hour');
      } else {
        now.add(1, 'hour');
      }
    }
    return now.format('llll');
  };

  const calculateDueDate = (submitDate, turnaroundTime) => {
    let result = '';
    const validDateFormats = ['YYYY-MM-DD HH:mm', 'YYYY/MM/DD HH:mm'];
    const now = moment(submitDate, validDateFormats, true);
    if (now.format() === 'Invalid date' || turnaroundTime.match(/^\d+$/) === null) {
      result = 'Invalid date or turnaround time';
    } else if (checkIssueInput(now)) {
      result = checkIssueInput(now);
    } else {
      result = getDueDate(now, turnaroundTime);
    }
    return result;
  };

  return {
    calculateDueDate,
  };
};

module.exports = ticketTimeCalculator;
