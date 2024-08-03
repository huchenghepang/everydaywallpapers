"use strict";
const common_vendor = require("../common/vendor.js");
const BASE_URL = "https://tea.qingnian8.com/api/bizhi";
function requestapi(newurl, method = "get", data = {}, header = {}) {
  let url = BASE_URL + newurl;
  header["access-key"] = "15970460916";
  return new Promise((reslove, reject) => {
    common_vendor.index.request({
      url,
      method,
      data,
      header,
      success(res) {
        if (res.data.errCode === 0) {
          reslove(res.data);
        } else if (res.data.errCode === 400) {
          common_vendor.index.showModal({
            title: "请求出现错误",
            content: res.data.errMsg,
            showCancel: false
          });
          reject(res.data);
        } else {
          common_vendor.index.showModal({
            title: res.data.errMsg,
            icon: "none"
          });
          reject(res.data);
        }
      },
      fail(err) {
        reject(err);
      }
    });
  });
}
exports.requestapi = requestapi;
