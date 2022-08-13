const fs = require("fs");
const path = require("path");
const sep = path.sep;
const parentDir = `.${sep}`;
const configPath = path.join(
  process.cwd(),
  `${parentDir}config${sep}index.json`
);
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const logPtah = path.join(process.cwd(), `${parentDir}log${sep}wechat`);
const oneApi = "http://open.iciba.com/dsapi/"; // 金山词霸日一句
const txApi = "http://api.tianapi.com/txapi/"; // 天行URL
module.exports = {
  config,
  sep,
  parentDir,
  logPtah,
  oneApi,
  txApi,
};
