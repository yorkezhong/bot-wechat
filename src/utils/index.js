function getDay(date) {
  let nowDate = new Date();
  let memorialDay = new Date(date);
  let diffDay = parseInt(
    Math.abs(nowDate.getTime() - memorialDay.getTime()) / 1000 / 60 / 60 / 24
  );
  return diffDay;
}

function formatDate(date) {
  let tempDate = new Date(date);
  let year = tempDate.getFullYear();
  let month = tempDate.getMonth() + 1;
  let day = tempDate.getDate();
  let hour = tempDate.getHours();
  let min = tempDate.getMinutes();
  let week = tempDate.getDay();
  let dateMaps = {
    0: "星期日",
    1: "星期一",
    2: "星期二",
    3: "星期三",
    4: "星期四",
    5: "星期五",
    6: "星期六",
  };
  let weekStr = dateMaps[week];
  if (hour < 10) hour = "0" + hour;
  if (min < 10) min = "0" + min;
  return `${year}年${month}月${day}日 ${hour}:${min} ${weekStr}`;
}

module.exports = {
  getDay,
  formatDate,
};
