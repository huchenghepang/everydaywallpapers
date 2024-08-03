"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "common-push",
  props: {
    title: {
      require: true,
      default: "标题"
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.title)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-91a31fe7"]]);
wx.createComponent(Component);
