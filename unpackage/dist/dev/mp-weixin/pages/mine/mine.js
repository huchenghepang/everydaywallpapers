"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_icons + commonPush)();
}
const commonPush = () => "../../components/common-push/common-push.js";
const _sfc_main = {
  __name: "mine",
  setup(__props) {
    const userInfo = common_vendor.ref({});
    function goPage(type) {
      if (type) {
        let title;
        if (type == "score") {
          title = "我的评分";
        } else if (type == "download") {
          title = "我的下载";
        }
        common_vendor.index.navigateTo({
          url: "/pages/categoryinfolist/categoryinfolist?type=" + type + "&title=" + title
        });
      }
    }
    async function getUserInfo() {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      let result = await api_apis.reqUserInfo();
      common_vendor.index.hideLoading();
      if (result.errCode == 0) {
        userInfo.value = result.data;
      }
    }
    common_vendor.onLoad(() => {
      getUserInfo();
    });
    return (_ctx, _cache) => {
      var _a, _b, _c;
      return {
        a: common_assets._imports_0,
        b: common_vendor.t(userInfo.value.IP),
        c: common_vendor.t(((_a = userInfo.value.address) == null ? void 0 : _a.city) || ((_b = userInfo.value.address) == null ? void 0 : _b.province) || ((_c = userInfo.value.address) == null ? void 0 : _c.country)),
        d: common_vendor.p({
          type: "download-filled",
          size: "20"
        }),
        e: common_vendor.t(userInfo.value.downloadSize),
        f: common_vendor.p({
          type: "arrow-right",
          size: "20"
        }),
        g: common_vendor.o(($event) => goPage("download")),
        h: common_vendor.p({
          type: "star-filled",
          size: "20"
        }),
        i: common_vendor.t(userInfo.value.scoreSize),
        j: common_vendor.p({
          type: "arrow-right",
          size: "20"
        }),
        k: common_vendor.o(($event) => goPage("score")),
        l: common_vendor.p({
          type: "contact",
          size: "20"
        }),
        m: common_vendor.p({
          type: "notification-filled",
          size: "20"
        }),
        n: common_vendor.p({
          type: "flag-filled",
          size: "20"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7c2ebfa5"]]);
wx.createPage(MiniProgramPage);
