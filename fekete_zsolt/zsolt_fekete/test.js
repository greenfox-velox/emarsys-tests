'use strict';

const tape = require('tape');
const config = require('./config')
const calculation = require('./calculation');
const validation = require('./validation');

const BASE_FRIDAY = '2016-08-26 09:00:00';

tape('EmptySubmitShouldBeInvalid', function (t) {
  t.true(validation.isSubmitDateInvalid());
  t.end();
});

tape('EmptySubmitErrorMessage', function (t) {
  t.deepEqual(calculation.calculateDueDate  ('', 1), config.submitError);
  t.end();
});

tape('SubmitIsNotAcceptedDateformat', function (t) {
  let invalidFormat = '2015.02.03 11:11:11';
  t.true(validation.isSubmitDateInvalid(invalidFormat));
  t.end();
});

tape('SubmitIsNotAcceptedDateformatReturnCorrectMessage', function (t) {
  let invalidFormat = '2015.02.03 11:11:11';
  t.deepEqual(calculation.calculateDueDate  (invalidFormat, 1), config.submitError);
  t.end();
});

tape('SubmitIsAcceptedDateformat(YYYY-MM-DD)', function (t) {
  t.false(validation.isSubmitDateInvalid(BASE_FRIDAY));
  t.end();
});

tape('SubmitIsAcceptedDateformat(DD-MM-YYYY)', function (t) {
  let otherAcceptedFormat = '03-02-2015 11:11:11';
  t.false(validation.isSubmitDateInvalid(otherAcceptedFormat));
  t.end();
});

tape('SubmitIsNotAcceptedDateformatWithoutTime', function (t) {
  let dateWithOutTime = '2016-08-26';
  t.true(validation.isSubmitDateInvalid(dateWithOutTime ));
  t.end();
});

tape('SubmitIsAcceptedDateformatWithOtherCharacter', function (t) {
  t.true(validation.isSubmitDateInvalid(BASE_FRIDAY + 'TEST'));
  t.end();
});

tape('EmptyTurnaroundShouldBeInvalid', function (t) {
  t.true(validation.isTurnaroundTimeInvalid(''));
  t.end();
});

tape('EmptyTurnaroundReturnCorrectMessage', function (t) {
  t.deepEqual(calculation.calculateDueDate  (BASE_FRIDAY, ''), config.turnaroundError);
  t.end();
});

tape('StringTurnaroundShouldBeInvalid', function (t) {
  t.true(validation.isTurnaroundTimeInvalid('1'));
  t.end();
});

tape('StringTurnaroundReturnCorrectMessage', function (t) {
  t.deepEqual(calculation.calculateDueDate  (BASE_FRIDAY, '1'), config.turnaroundError);
  t.end();
});

tape('NumberTurnaroundShouldBeInvalid', function (t) {
  t.false(validation.isTurnaroundTimeInvalid(1));
  t.end();
});

tape('isFloatTurnaroundShouldBeValid', function (t) {
  t.false(validation.isTurnaroundTimeInvalid(1.5));
  t.end();
});

tape('FloatTurnaroundCalculationShoudWork', function (t) {
  let expectedTime = '2016-08-26 10:30:00';
  t.deepEqual(calculation.calculateDueDate  (BASE_FRIDAY, 1.5),expectedTime);
  t.end();
});

tape('itShouldCalculetFineWithLessThanOne', function (t) {
  let expectedTime = '2016-08-26 09:30:00';
  t.deepEqual(calculation.calculateDueDate  (BASE_FRIDAY, 0.5), expectedTime);
  t.end();
});

tape('8HoursShouldBeOneDay', function (t) {
  let dayBeforeFriday = '2016-08-25 09:00:00';
  t.deepEqual(calculation.calculateDueDate  (dayBeforeFriday, 8), BASE_FRIDAY);
  t.end();
});

tape('itShouldtCalculateWithWeekend', function (t) {
  let monday = '2016-08-29 09:00:00';
  t.deepEqual(calculation.calculateDueDate  (BASE_FRIDAY, 8), monday);
  t.end();
});

tape('itShouldtWorkWhenAggregateFloatandMinutesCauseNewHour', function (t) {
  let friday = '2016-08-26 09:30:00';
  let monday = '2016-08-29 09:00:00';
  t.deepEqual(calculation.calculateDueDate  (friday , 7.5), monday);
  t.end();
});

tape('40HoursShouldBeOneWeek', function (t) {
  let nextFriday = '2016-09-02 09:00:00';
  t.deepEqual(calculation.calculateDueDate  (BASE_FRIDAY , 40), nextFriday );
  t.end();
});

tape('160HoursShouldBe4Week', function (t) {
  let threeWeek = '2016-09-23 09:00:00';
  t.deepEqual(calculation.calculateDueDate  (BASE_FRIDAY, 160), threeWeek);
  t.end();
});
