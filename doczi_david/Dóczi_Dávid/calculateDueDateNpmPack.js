// Found this npm package. Yey:)
'use strict';

var calculator = require('./node_modules/calculateduedate/app/calculateDueDate');

var dueDate = calculator.calculateDueDate(new Date(2016, 2, 1, 12, 2), 2)

console.log(dueDate.toString());
