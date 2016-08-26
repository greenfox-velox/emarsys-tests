
const config = {
  submitDateFormat :['YYYY-MM-DD HH:mm:ss', 'DD-MM-YYYY HH:mm:ss'],
  submitError : 'SubmitDate must be follow these formats: YYYY-MM-DD HH:mm:ss or DD-MM-YYYY HH:mm:ss!',
  turnaroundError : 'TurnaroundTime type must be number!',
  workingtime: {start: 9, end: 17},
  weekend : {start: 'Saturday', end: 'Sunday'},
};

module.exports = config;
