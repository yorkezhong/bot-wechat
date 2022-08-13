const log4js = require("log4js");
const pathConf = require("./utils/config");
log4js.configure({
  appenders: {
    datefileout: {
      type: "dateFile",
      filename: pathConf.logPtah,
      alwaysIncludePattern: true,
      pattern: "yyyy-MM-dd.log",
      encoding: "utf-8",
      layout: {
        type: "pattern",
        pattern: "[%d{yyyy-MM-dd hh:mm:ss}] [%p] %m",
      },
    },
  },
  categories: {
    default: { appenders: ["datefileout"], level: pathConf.config.logModel },
  },
});
module.exports = log4js.getLogger();
