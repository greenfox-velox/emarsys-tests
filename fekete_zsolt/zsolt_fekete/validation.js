'use strict'

const config = require('./config');
const moment = require('moment');

const validation = (function() {

  function areInputsInvalid(submitDate, turnaroundTime) {
    return (isSubmitDateInvalid(submitDate) || (isTurnaroundTimeInvalid(turnaroundTime)));
  }

  function isSubmitDateInvalid(submitDate) {
    return (!moment(submitDate, config.submitDateFormat, true).isValid());
  }

  function isTurnaroundTimeInvalid(turnaroundTime) {
    return typeof turnaroundTime !== 'number';
  }

  function showErrorMessage(submitDate) {
    if (isSubmitDateInvalid(submitDate)){
      return config.submitError;
    }
    return  config.turnaroundError;
  }

  return {
    areInputsInvalid,
    isSubmitDateInvalid,
    isTurnaroundTimeInvalid,
    showErrorMessage,
 };
 }());

module.exports = validation;
