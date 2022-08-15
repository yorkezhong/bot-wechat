## 基于 wechaty 开发的自动发送微信消息机器人

### 1. 简介

给女朋友/男朋友定时发送动态消息，包含每日一句，情话，天气播报，纪念日倒计时等功能

- [√] 定时任务发送消息
- [√] 情话播报
- [√] 天气播报
- [√] 纪念日倒计时
- [√] 每日一句中英文
- [√] Docker 部署
- [√] Pm2 部署
- [√] log4 按天分割记录运行日志
- [×] 人工智能聊天

### 2. 配置

所有配置项均在 `config/index.json` 文件中

```js
{
  "logPath": "log", //日志路径
  "logModel": "info", //日志输出级别
  "targetName": "xxxx", //女朋友微信备注名
  "targetNickName": "xxxx", //女朋友微信昵称
  "sweetName": "宝贝", //女朋友的亲切称呼
  "fromName": "傻瓜", //你的称呼
  "memorialDay": "2021/10/01", //纪念日开始时间
  "targetCity": "广州", //天气目标城市
  "scheduleTime": "00 00 08 * * *", //定时任务时间  每天的8点0分0秒发送
  "txApiKey": "xxxxxx" //天行数据apikey:https://www.tianapi.com/signup.html?source=474284281
}
```

### 3. 开发调试
**node版本>=16**

1. `git clone` 源码地址
2. 安装依赖:`npm install` 
3. 本地运行:`npm run start`

### 4.程序运行日志

1. 采用 `log4js` 按天分割记录运行日志
2. 可按日志级别进行日志输出 `info, warn, error, debug`

### 5. 部署安装

#### 5.1 Docker

1. 下载 `docker` 工具
2. 构建镜像：`docker image build -t wechat-bot .`
3. 查看构建好的镜像：`docker images`
4. 启动镜像容器:`docker run wechat-bot`

#### 5.2 PM2

1. 全局安装 `pm2` 工具 `npm install pm2 -g`
2. 创建 `pm2` 配置文件：`pm2 start pm2.config.js`
3. 查看运行的服务:`pm2 list`
4. 查看运行日志 :`pm2 logs`

### 6. 数据来源

1. 金山词霸每日一句：http://open.iciba.com/dsapi/
2. 情话：http://api.tianapi.com/txapi/saylove/
3. 天气：http://api.tianapi.com/txapi/tianqi/

### 7. 实现效果

```
宝贝你好呀🥰

今天是2022年8月14日 08:00 星期日

我们在一起的第317天💞

今日广州天气:
天气炎热，适宜着短衫、短裙、短裤、薄型T恤衫、敞领短袖棉衫等夏季服装。疫情防控不松懈，出门请佩戴口罩。
今天雷阵雨转多云
温度:24℃/32℃
南风 6

每日一句:
Don't stop. Don't hide. Follow the light, and you'll find tomorrow.
不要停下，不要逃避，沿着光明前行，你会找到明天。

每日土味情话：
你的容颜应该申请吉尼斯纪录。

——爱你的xx
```
