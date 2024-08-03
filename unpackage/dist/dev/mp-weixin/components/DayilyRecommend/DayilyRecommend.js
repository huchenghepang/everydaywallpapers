"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat)();
}
const _sfc_main = {
  __name: "DayilyRecommend",
  props: {
    title: {
      type: String,
      required: true,
      default: "每日推荐"
    }
  },
  setup(__props) {
    let RandomWallList = common_vendor.ref([]);
    function saveImageList() {
      common_vendor.index.setStorage({
        key: "imageList",
        data: RandomWallList.value,
        success() {
        },
        fail() {
        }
      });
    }
    const getRandomWallList = async () => {
      let result = await api_apis.reqRandomWall();
      RandomWallList.value = result.data;
      saveImageList();
    };
    common_vendor.onLoad(() => {
      getRandomWallList();
    });
    function goDetail(e) {
      let currentIndex = e.target.dataset.index;
      common_vendor.index.navigateTo({
        url: `/pages/detail/detail?currentIndex=${currentIndex}`
      });
    }
    common_vendor.onHide(() => {
      saveImageList();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.title),
        b: common_vendor.p({
          type: "calendar",
          size: "30"
        }),
        c: common_vendor.p({
          date: Date.now(),
          format: "dd日"
        }),
        d: common_vendor.f(common_vendor.unref(RandomWallList), (item, index, i0) => {
          return {
            a: item.smallPicurl,
            b: index,
            c: item._id
          };
        }),
        e: common_vendor.o(goDetail)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1f6451fb"]]);
wx.createComponent(Component);
