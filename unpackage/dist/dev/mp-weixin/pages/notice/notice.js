"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
const _sfc_main = {
  __name: "notice",
  setup(__props) {
    let noticeInfo = common_vendor.ref({});
    async function getNoticeInfo(id) {
      let result = await api_apis.reqNoticeDetail({
        id
      });
      if (result.errCode == 0) {
        noticeInfo.value = result.data;
      }
    }
    common_vendor.onLoad((e) => {
      getNoticeInfo(e.id);
      common_vendor.index.setNavigationBarTitle({
        title: e.title
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(noticeInfo).title),
        b: common_vendor.t(common_vendor.unref(noticeInfo).author),
        c: common_vendor.unref(noticeInfo).content
      };
    };
  }
};
wx.createPage(_sfc_main);
