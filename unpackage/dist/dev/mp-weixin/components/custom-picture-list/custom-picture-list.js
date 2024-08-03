"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_time = require("../../utils/time.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "custom-picture-list",
  props: {
    imageList: {
      require: true,
      default: []
    },
    isMore: {
      default: false
    },
    pagePath: {
      default: "/pages/categoryinfolist/categoryinfolist"
    },
    navigatorFrag: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    let props = __props;
    const isMorePicUrl = common_vendor.computed(() => {
      if (props.isMore && props.imageList.length !== 0) {
        return props.imageList[props.imageList.length - 1].picurl || "";
      }
    });
    function tabPage(pagePath, classid, title) {
      if (props.navigatorFrag) {
        common_vendor.index.navigateTo({
          url: pagePath + "?classid=" + classid + "&title=" + title
        });
      } else {
        common_vendor.index.switchTab({
          url: pagePath
        });
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(__props.imageList, (item, index, i0) => {
          return common_vendor.e({
            a: __props.isMore ? index !== __props.imageList.length - 1 : true
          }, (__props.isMore ? index !== __props.imageList.length - 1 : true) ? {
            b: item.picurl,
            c: common_vendor.t(common_vendor.unref(utils_time.timeAgo)(item.updateTime)),
            d: common_vendor.t(item.name),
            e: common_vendor.o(($event) => tabPage(__props.pagePath, item._id, item.name), item._id),
            f: item._id
          } : {});
        }),
        b: __props.isMore
      }, __props.isMore ? {
        c: isMorePicUrl.value,
        d: common_vendor.p({
          type: "more-filled",
          size: "30"
        })
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8f7deecb"]]);
wx.createComponent(Component);
