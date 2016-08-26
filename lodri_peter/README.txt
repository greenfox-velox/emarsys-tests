Due Date Calculator

author: Peter Lodri
date: 2016 08 25


packages used:
  - mocha
  - moment

1. run npm install
2. for tests simply run mocha
3. you can set up specific working conditions via a simple object eg.:

      example_setUp = {START_DAY: 'Tuesday',
                      END_DAY: 'Friday',
                      WORKING_DAYS: 4,
                      WORKING_HOURS: 6,
                      START_HOUR: 10,
                      WEEKEND: ['Saturday', 'Sunday', 'Monday']}

      if you did not specify all of them, it has the defaults given in the specification.
