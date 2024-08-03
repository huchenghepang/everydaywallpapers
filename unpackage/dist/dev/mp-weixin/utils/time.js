"use strict";
function timeAgo(timestamp) {
  const now = /* @__PURE__ */ new Date();
  const past = new Date(timestamp);
  const secondsPast = (now.getTime() - past.getTime()) / 1e3;
  if (secondsPast < 60) {
    return `${Math.round(secondsPast)} 秒前`;
  } else if (secondsPast < 3600) {
    return `${Math.round(secondsPast / 60)} 分钟前`;
  } else if (secondsPast < 86400) {
    return `${Math.round(secondsPast / 3600)} 小时前`;
  } else if (secondsPast < 604800) {
    return `${Math.round(secondsPast / 86400)} 天前`;
  } else if (secondsPast < 2419200) {
    return `${Math.round(secondsPast / 604800)} 周前`;
  } else if (secondsPast < 31536e3) {
    const monthsPast = (now.getFullYear() - past.getFullYear()) * 12 + (now.getMonth() - past.getMonth());
    return `${monthsPast} 月前`;
  } else {
    const yearsPast = now.getFullYear() - past.getFullYear();
    return `${yearsPast} 年前`;
  }
}
exports.timeAgo = timeAgo;
