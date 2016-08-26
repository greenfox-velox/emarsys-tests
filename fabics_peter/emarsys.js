'use strict';

function getExceptions(inputedDate){
  if (inputedDate.getHours() >= 17 ||  inputedDate.getHours() < 9 || inputedDate.getDay() == 6 || inputedDate.getDay() == 0){
    return true
  }
}

function CalculateDueDate (submitDate, turnaroundTime) {
  var inputedDate = new Date(submitDate);
  if (getExceptions(inputedDate)) {
    return ("This msg from the CalculateDueDate method. I get a wrong input")
  } else{
    var minutes = turnaroundTime * 60;
    while (minutes > 0){
      inputedDate.setTime(inputedDate.getTime() + (((1)*60*1000)))
      if (!(getExceptions(inputedDate))){
        minutes --;
      }
    }
  }
  return inputedDate
}

console.log(CalculateDueDate("2016-08-26 16:59:00", 1));

module.exports.CalculateDueDate = CalculateDueDate;
