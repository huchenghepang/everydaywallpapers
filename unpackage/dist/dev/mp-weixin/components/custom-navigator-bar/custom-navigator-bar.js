"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "custom-navigator-bar",
  props: {
    title: {
      default: "标题"
    }
  },
  setup(__props) {
    let statusBarHeight = utils_system.getTopStatusBarInfo().statusBarHeight;
    let CustomNavigatorBarHeight = utils_system.getTitleBarHeight();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.s(`height:${common_vendor.unref(statusBarHeight)}px`),
        b: common_vendor.t(__props.title),
        c: common_vendor.p({
          type: "search",
          size: "20",
          color: "#7C827E"
        }),
        d: common_vendor.s(`height:${common_vendor.unref(CustomNavigatorBarHeight) - 15}px`),
        e: common_vendor.s(`height:${common_vendor.unref(CustomNavigatorBarHeight)}px`),
        f: common_vendor.s(`height:${common_vendor.unref(statusBarHeight) + common_vendor.unref(CustomNavigatorBarHeight)}px`)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-75a19753"]]);
wx.createComponent(Component);
