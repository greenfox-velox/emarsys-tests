var inputDate = new Date();
var turnaroundTime = 8;

var listWeekDays = [1, 2, 3, 4, 5, 6, 0];
var listWeekDaysNeeded = [];
var possiblyNeededMoreLists = 2;

function fillListWeekDaysNeeded(turnaroundTime) {
  var daysOfWeek = Math.floor(turnaroundTime / listWeekDays.length);
  for (var j = 0; j < daysOfWeek + possiblyNeededMoreLists; j++) {
    for (var i = 0; i < listWeekDays.length; i++) {
      listWeekDaysNeeded.push(listWeekDays[i]);
    }
  };
  return listWeekDaysNeeded;
};

function addWeekendtoWorkDays(date, turnaroundTime, originalWeekday) {
  var day = date.getDate();
  var workingHours = 8;
  for (var i = originalWeekday - 1; i < (originalWeekday + Math.ceil(turnaroundTime / workingHours)); i++) {
    if (listWeekDaysNeeded[i] == 6) {
      day += 2;
      date.setDate(day);
    };
  };
  return date;
};

function calculateDueDate (date, turnaroundTime){
  var hours = date.getHours();
  var day = date.getDate();
  var originalWeekday = date.getDay();
  var sum = hours + turnaroundTime;
  if (sum < 17) {
    date.setHours(sum);
    return date;
  };
    var diff = sum - 17;
    ++day;
    while (diff - 8 >= 0) {
      diff = diff - 8;
      ++day;
    } date.setHours(9 + diff);
    date.setDate(day);
    fillListWeekDaysNeeded(turnaroundTime);
    addWeekendtoWorkDays(date, turnaroundTime, originalWeekday);
    var weekDay = date.getDay();
    if (weekDay === 6) {
      date.setDate(day + 2);
    } else if (weekDay === 0) {
      date.setDate(day + 1);
    }
    return date;
};

calculateDueDate(inputDate, turnaroundTime);

module.exports = {
  listWeekDays : listWeekDays,
  listWeekDaysNeeded : listWeekDaysNeeded,
  fillListWeekDaysNeeded: fillListWeekDaysNeeded,
  addWeekendtoWorkDays: addWeekendtoWorkDays,
  inputDate : inputDate,
  turnaroundTime : turnaroundTime,
  calculateDueDate : calculateDueDate
}
