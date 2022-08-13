const { WechatyBuilder } = require("wechaty");
const setSchedule = require("./schedule");
const commonConfig = require("./utils/config");
const { config } = commonConfig;
const untils = require("./utils");
const superagent = require("./server");
const log4 = require("./log4");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function initTaskBot() {
  log4.info(`自动提醒助手开始初始化，创建定时任务`);
  setSchedule(config.scheduleTime, async () => {
    let wechatExchange =
      (await bot.Contact.find({ name: config.targetNickName })) ||
      (await bot.Contact.find({ alias: config.targetName })); // 目标联系人
    let one = await superagent.getOne(); //每日一句
    let weather = await superagent.getTXweather(); //天气
    let today = await untils.formatDate(new Date()); //今天日期
    let memorialDay = untils.getDay(config.memorialDay); //纪念日天数
    let sweetWord = await superagent.getSweetWord();
    if (sweetWord && today && weather && one && wechatExchange) {
      let wechartMessage = `${config.sweetName}你好呀🥰\n\n今天是${today}\n\n我们在一起的第${memorialDay}天💞\n\n今日${config.targetCity}天气:\n${weather.weatherTips}\n${weather.todayWeather}\n\n每日一句:\n${one}\n\n每日土味情话：\n${sweetWord}\n\n——爱你的${config.fromName}`;
      try {
        log4.info(wechartMessage);
        await delay(2000); //延迟发送，不能太快
        await wechatExchange.say(wechartMessage);
      } catch (e) {
        log4.error(e.message);
      }
    } else {
      log4.error("发送信息不完整,不允许发送！！！");
    }
  });
}
function onScan(qrcode, status) {
  require("qrcode-terminal").generate(qrcode);
  const qrcodeImageUrl = [
    "https://api.qrserver.com/v1/create-qr-code/?data=",
    encodeURIComponent(qrcode),
  ].join("");
  log4.info("登录二维码地址", qrcodeImageUrl);
  console.log(qrcodeImageUrl);
}

async function onLogin(user) {
  const date = new Date();
  log4.info(`当前登录用户:${user}`);
  log4.info(`当前容器时间:${date}`);
  await initTaskBot();
}

function onLogout(user) {
  log4.info(`${user}用户登出`);
}

const bot = WechatyBuilder.build({
  name: "WechatEveryDay",
  puppet: "wechaty-puppet-wechat",
  puppetOptions: {
    uos: true,
  },
});

bot.on("scan", onScan);
bot.on("login", onLogin);
bot.on("logout", onLogout);

bot
  .start()
  .then(() => {
    log4.info("---开始登陆微信----");
  })
  .catch((e) => {
    log4.error("---登录微信异常---", e.message);
  });
