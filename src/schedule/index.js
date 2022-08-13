const schedule = require("node-schedule");
/**
其他规则见 https://www.npmjs.com/package/node-schedule
* * * * * *
┬ ┬ ┬ ┬ ┬ ┬
│ │ │ │ │ |
│ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
│ │ │ │ └───── month (1 - 12)
│ │ │ └────────── day of month (1 - 31)
│ │ └─────────────── hour (0 - 23)
│ └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
 */
function setSchedule(date, callback) {
  schedule.scheduleJob({ tz: "Asia/Shanghai", rule: date }, callback);
}
module.exports = setSchedule;
