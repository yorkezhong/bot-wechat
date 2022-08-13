const httpResquest = require("../utils/http");
const commonConfig = require("../utils/config");
const log4 = require("../log4");
const { config, oneApi, txApi } = commonConfig;
async function getOne() {
  // 获取每日一句
  try {
    let oneRes = "";
    let response = await httpResquest({ url: oneApi, method: "GET" });
    console.log("response", response,config);
    if (response.note && response.content) {
      oneRes = `${response.content}\n${response.note}`;
      log4.info("获取每日一句成功:", oneRes);
      return oneRes;
    }
    log4.error("获取每日一句失败!!!");
    return oneRes;
  } catch (err) {
    log4.error("获取每日一句失败!!!");
    return err;
  }
}
//获取天气
async function getTXweather() {
  try {
    let content = await httpResquest({
      url: txApi + "tianqi/",
      method: "GET",
      params: {
        key: config.txApiKey,
        city: config.targetCity,
      },
    });
    if (content.code === 200) {
      let todayInfo = content.newslist[0];
      let obj = {
        weatherTips: todayInfo.tips,
        todayWeather: `今天${todayInfo.weather}\n温度:${todayInfo.lowest}/${todayInfo.highest}\n${todayInfo.wind} ${todayInfo.windspeed}`,
      };
      log4.info("获取天行天气成功:", todayInfo.tips);
      return obj;
    }
  } catch (err) {
    log4.error("获取天行天气失败:", err);
  }
}
// 获取情话
async function getSweetWord() {
  try {
    let content = await httpResquest({
      url: txApi + "saylove/",
      method: "GET",
      params: { key: config.txApiKey },
    });
    if (content.code === 200) {
      let sweet = content.newslist[0].content;
      let resultStr = sweet.replace("\r\n", "<br>");
      log4.info("获取土味情话成功:", resultStr);
      return resultStr;
    } else {
      return "你很像一款游戏。我的世界";
    }
  } catch (err) {
    log4.error("获取土味情话失败:", err);
  }
}

module.exports = {
  getOne,
  getTXweather,
  getSweetWord,
};
