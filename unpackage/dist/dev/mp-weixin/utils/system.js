"use strict";
const common_vendor = require("../common/vendor.js");
const SYSTEM_INFO = common_vendor.index.getSystemInfoSync();
function getSystemInfo() {
  let { safeAreaInsets } = SYSTEM_INFO;
  return safeAreaInsets;
}
function getTopStatusBarInfo() {
  let { statusBarHeight } = SYSTEM_INFO;
  return {
    // 顶部状态栏高度
    statusBarHeight: statusBarHeight || 20
  };
}
function getTitleBarHeight() {
  if (common_vendor.index.getMenuButtonBoundingClientRect) {
    let { height, top } = common_vendor.index.getMenuButtonBoundingClientRect();
    return height + (top - SYSTEM_INFO.statusBarHeight) * 2;
  } else {
    return 40;
  }
}
exports.getSystemInfo = getSystemInfo;
exports.getTitleBarHeight = getTitleBarHeight;
exports.getTopStatusBarInfo = getTopStatusBarInfo;
