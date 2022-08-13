const superagent = require("superagent");
/**
 *
 * @param url 地址
 * @param method 方法
 * @param params 参数
 * @param data 数据
 * @param cookies 手动添加的cookies
 * @param spider 是否爬取页面
 * @returns {Promise}
 */
function httpResquest({ url, method, params, data, cookies, spider = false }) {
  return new Promise(function (resolve, reject) {
    superagent(method, url)
      .query(params)
      .send(data)
      .set("Content-Type", "application/x-www-form-urlencoded")
      .end(function (err, response) {
        if (err) {
          console.log("请求出错", err);
          reject(err);
        }
        if (spider) {
          resolve(response.text);
        } else {
          const res = JSON.parse(response.text);
          if (res.code !== 200 && !res.sid) {
            console.error("接口请求失败", res.msg || res.text);
            reject(null);
          }
          resolve(res);
        }
      });
  });
}

module.exports = httpResquest;
