'use strict';

const ticketTimeCalculator = require('./duedatecalculator');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Give a date (format:yyyy-mm-dd hh:mm): ', (inputSubmitDate) => {
  rl.question('Give a turnaround time (should be given in hour/only accepted integer/): ', (answerTaTime) => {
    console.log(ticketTimeCalculator().calculateDueDate(inputSubmitDate, answerTaTime));
    rl.close();
  });
});
